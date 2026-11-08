<script setup lang="ts">
import type { ScrollBarAxis } from './types'
import { useEventListener } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, reactive, shallowRef, useTemplateRef } from 'vue'

/*
 * Specified in scroll-bar.md: the thumb hit area is 11px (7px visible plus 2px on
 * each side) with a 24px minimum, the track is 11px and overlaps the hit area, and
 * the outlined variant is 9px visible (7px fill plus a 1px inverse border). Thumb
 * height is the visible/total ratio of the view, clamped to the minimum.
 */
const {
  axis = 'vertical',
  styled = false,
  always = false,
  native = false,
} = defineProps<{
  axis?: ScrollBarAxis
  styled?: boolean
  always?: boolean
  /** Use the platform scrollbar so its visibility follows the OS preference. */
  native?: boolean
}>()

const viewRef = useTemplateRef<HTMLElement>('view')
const windowTarget = shallowRef<Window | null>(null)
onMounted(() => {
  windowTarget.value = window
})

const state = reactive({
  top: 0,
  left: 0,
  scrollHeight: 0,
  scrollWidth: 0,
  height: 0,
  width: 0,
})

let observer: ResizeObserver | undefined

function measure() {
  const view = viewRef.value
  if (!view)
    return
  state.top = view.scrollTop
  state.left = view.scrollLeft
  state.scrollHeight = view.scrollHeight
  state.scrollWidth = view.scrollWidth
  state.height = view.clientHeight
  state.width = view.clientWidth
}

onMounted(() => {
  measure()
  observer = new ResizeObserver(() => measure())
  if (viewRef.value)
    observer.observe(viewRef.value)
})

onBeforeUnmount(() => observer?.disconnect())

const showsVertical = computed(() => axis !== 'horizontal' && state.scrollHeight > state.height + 1)
const showsHorizontal = computed(() => axis !== 'vertical' && state.scrollWidth > state.width + 1)

const vertical = computed(() => {
  const corner = axis === 'both'
    ? 11
    : 0
  const track = Math.max(0, state.height - corner)
  const ratio = state.height / Math.max(1, state.scrollHeight)
  const thumb = Math.min(track, Math.max(24, Math.round(track * ratio)))
  const maxScroll = Math.max(0, state.scrollHeight - state.height)
  const offset = maxScroll > 0
    ? state.top / maxScroll * (track - thumb)
    : 0
  return { track, thumb, offset, maxScroll }
})

const horizontal = computed(() => {
  const corner = axis === 'both'
    ? 11
    : 0
  const track = Math.max(0, state.width - corner)
  const ratio = state.width / Math.max(1, state.scrollWidth)
  const thumb = Math.min(track, Math.max(24, Math.round(track * ratio)))
  const maxScroll = Math.max(0, state.scrollWidth - state.width)
  const offset = maxScroll > 0
    ? state.left / maxScroll * (track - thumb)
    : 0
  return { track, thumb, offset, maxScroll }
})

interface Drag {
  axis: 'v' | 'h'
  start: number
  scroll: number
  scale: number
}

let drag: Drag | null = null

function startDrag(axisName: 'v' | 'h', event: PointerEvent) {
  const view = viewRef.value
  if (!view || event.button !== 0)
    return
  event.preventDefault()
  const size = axisName === 'v'
    ? vertical.value
    : horizontal.value
  const travel = size.track - size.thumb
  drag = {
    axis: axisName,
    start: axisName === 'v'
      ? event.clientY
      : event.clientX,
    scroll: axisName === 'v'
      ? view.scrollTop
      : view.scrollLeft,
    scale: travel > 0
      ? size.maxScroll / travel
      : 0,
  }
}

function onMove(event: PointerEvent) {
  const view = viewRef.value
  if (!drag || !view || drag.scale === 0)
    return
  const delta = (drag.axis === 'v'
    ? event.clientY
    : event.clientX) - drag.start
  const next = drag.scroll + delta * drag.scale
  if (drag.axis === 'v')
    view.scrollTop = next
  else
    view.scrollLeft = next
}

function stopDrag() {
  drag = null
}

useEventListener(windowTarget, 'pointermove', onMove)
useEventListener(windowTarget, 'pointerup', stopDrag)
useEventListener(windowTarget, 'pointercancel', stopDrag)

function onTrack(axisName: 'v' | 'h', event: PointerEvent) {
  const view = viewRef.value
  if (!view || event.button !== 0)
    return
  const track = event.currentTarget
  if (!(track instanceof HTMLElement))
    return
  const rect = track.getBoundingClientRect()
  const size = axisName === 'v'
    ? vertical.value
    : horizontal.value
  const position = axisName === 'v'
    ? event.clientY - rect.top - size.thumb / 2
    : event.clientX - rect.left - size.thumb / 2
  const travel = size.track - size.thumb
  if (travel <= 0)
    return
  const next = Math.min(1, Math.max(0, position / travel)) * size.maxScroll
  if (axisName === 'v')
    view.scrollTop = next
  else
    view.scrollLeft = next
}
</script>

<template>
  <div
    class="ud-scrollbar"
    :class="{
      'ud-scrollbar--styled': styled,
      'ud-scrollbar--always': always,
      'ud-scrollbar--native': native,
      'ud-scrollbar--both': axis === 'both',
    }"
  >
    <div
      ref="view"
      class="ud-scrollbar__view"
      @scroll="measure"
    >
      <slot />
    </div>
    <div
      v-if="showsVertical"
      class="ud-scrollbar__track ud-scrollbar__track--vertical"
      @pointerdown="onTrack('v', $event)"
    >
      <span
        class="ud-scrollbar__thumb"
        :style="{ height: `${vertical.thumb}px`, transform: `translateY(${vertical.offset}px)` }"
        @pointerdown.stop="startDrag('v', $event)"
      />
    </div>
    <div
      v-if="showsHorizontal"
      class="ud-scrollbar__track ud-scrollbar__track--horizontal"
      @pointerdown="onTrack('h', $event)"
    >
      <span
        class="ud-scrollbar__thumb"
        :style="{ width: `${horizontal.thumb}px`, transform: `translateX(${horizontal.offset}px)` }"
        @pointerdown.stop="startDrag('h', $event)"
      />
    </div>
  </div>
</template>
