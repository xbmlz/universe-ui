<script setup lang="ts">
import type { SliderMarks } from './types'
import { useEventListener } from '@vueuse/core'
import { computed, onMounted, shallowRef, useTemplateRef } from 'vue'
import { clampNumber } from '../input/number'

/*
 * Specified in slider.md: dragging or clicking the rail sets the value, a second
 * thumb makes a range, clicking the rail moves the nearer thumb, a vertical form
 * is supported, and named nodes jump straight to their value. The doc gives no
 * pixel sizes, so every length in theme.css is inferred from the input scale.
 */
const {
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  readonly = false,
  vertical = false,
  showTooltip = true,
  marks,
  label,
  labelFormatter,
} = defineProps<{
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  readonly?: boolean
  vertical?: boolean
  showTooltip?: boolean
  marks?: SliderMarks
  label?: string
  labelFormatter?: (value: number) => string
}>()

const model = defineModel<number | [number, number]>({ default: 0 })

const trackRef = useTemplateRef<HTMLElement>('track')
const dragging = shallowRef<number | null>(null)
const focusedThumb = shallowRef<number | null>(null)
const windowTarget = shallowRef<Window | null>(null)
onMounted(() => {
  windowTarget.value = window
})

const blocked = computed(() => disabled || readonly)
const isRange = computed(() => Array.isArray(model.value))
const pair = computed<[number, number]>(() => {
  if (Array.isArray(model.value))
    return [model.value[0], model.value[1]]
  return [model.value, model.value]
})
const thumbs = computed(() => (isRange.value
  ? [0, 1]
  : [0]))
const span = computed(() => Math.max(Number.EPSILON, max - min))

function percent(value: number) {
  return (value - min) / span.value * 100
}

function valueAt(clientX: number, clientY: number) {
  const track = trackRef.value
  if (!track)
    return min
  const rect = track.getBoundingClientRect()
  const ratio = vertical
    ? (rect.bottom - clientY) / Math.max(1, rect.height)
    : (clientX - rect.left) / Math.max(1, rect.width)
  return clampNumber(min + Math.min(1, Math.max(0, ratio)) * span.value, { min, max, step })
}

function apply(index: number, value: number) {
  const low = Math.min(pair.value[0], pair.value[1])
  const high = Math.max(pair.value[0], pair.value[1])
  if (!isRange.value) {
    model.value = value
    return
  }
  model.value = index === 0
    ? [
        Math.min(value, high),
        high,
      ]
    : [
        low,
        Math.max(value, low),
      ]
}

function nearest(value: number) {
  if (!isRange.value)
    return 0
  return Math.abs(value - pair.value[0]) <= Math.abs(value - pair.value[1])
    ? 0
    : 1
}

function start(index: number, event: PointerEvent) {
  if (blocked.value || event.button !== 0)
    return
  event.preventDefault()
  event.stopPropagation()
  dragging.value = index
}

function onTrackDown(event: PointerEvent) {
  if (blocked.value || event.button !== 0)
    return
  event.preventDefault()
  const value = valueAt(event.clientX, event.clientY)
  const index = nearest(value)
  dragging.value = index
  apply(index, value)
}

function onMove(event: PointerEvent) {
  if (dragging.value == null || blocked.value)
    return
  apply(dragging.value, valueAt(event.clientX, event.clientY))
}

function stop() {
  dragging.value = null
}

function onThumbKeydown(index: number, event: KeyboardEvent) {
  if (blocked.value)
    return
  let direction = 0
  if (event.key === 'ArrowLeft' || (!vertical && event.key === 'ArrowDown')) {
    direction = -1
  }
  else if (event.key === 'ArrowRight' || (!vertical && event.key === 'ArrowUp')) {
    direction = 1
  }
  else if (vertical && event.key === 'ArrowDown') {
    direction = -1
  }
  else if (vertical && event.key === 'ArrowUp') {
    direction = 1
  }
  else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    apply(index, event.key === 'Home'
      ? min
      : max)
    return
  }
  else {
    return
  }

  event.preventDefault()
  apply(index, clampNumber(
    pair.value[isRange.value ? index : 0]! + direction * step,
    { min, max, step },
  ))
}

useEventListener(windowTarget, 'pointermove', onMove)
useEventListener(windowTarget, 'pointerup', stop)
useEventListener(windowTarget, 'pointercancel', stop)

const fillStyle = computed(() => {
  const low = percent(Math.min(pair.value[0], pair.value[1]))
  const high = percent(Math.max(pair.value[0], pair.value[1]))
  if (vertical) {
    return isRange.value
      ? { bottom: `${low}%`, height: `${high - low}%` }
      : { bottom: '0%', height: `${high}%` }
  }
  return { left: `${low}%`, width: `${high - low}%` }
})

function thumbStyle(index: number) {
  const value = percent(pair.value[isRange.value ? index : 0] ?? min)
  return vertical
    ? { bottom: `${value}%` }
    : { left: `${value}%` }
}

const markEntries = computed(() => Object.entries(marks ?? {}).map(([key, text]) => ({
  value: Number(key),
  text,
})))

function markStyle(value: number) {
  const position = percent(value)
  return vertical
    ? { bottom: `${position}%` }
    : { left: `${position}%` }
}

function pickMark(value: number) {
  if (blocked.value)
    return
  apply(nearest(value), value)
}

const activeValue = computed(() => pair.value[dragging.value ?? focusedThumb.value ?? 0] ?? min)
const bubbleStyle = computed(() => {
  const position = percent(activeValue.value)
  return vertical
    ? { bottom: `${position}%` }
    : { left: `${position}%` }
})
const bubbleText = computed(() => (labelFormatter
  ? labelFormatter(activeValue.value)
  : String(activeValue.value)))
</script>

<template>
  <div
    class="ud-slider"
    :class="{
      'ud-slider--vertical': vertical,
      'ud-slider--disabled': disabled,
      'ud-slider--readonly': readonly,
      'ud-slider--range': isRange,
    }"
  >
    <label
      v-if="label"
      class="ud-slider__label"
    >{{ label }}</label>
    <div
      ref="track"
      class="ud-slider__track"
      @pointerdown="onTrackDown"
    >
      <div class="ud-slider__rail">
        <span
          class="ud-slider__fill"
          :style="fillStyle"
        />
      </div>
      <span
        v-for="mark in markEntries"
        :key="mark.value"
        class="ud-slider__mark"
        :style="markStyle(mark.value)"
        @pointerdown.stop
        @click="pickMark(mark.value)"
      >
        <span class="ud-slider__mark-dot" />
        <span class="ud-slider__mark-label">{{ mark.text }}</span>
      </span>
      <button
        v-for="index in thumbs"
        :key="index"
        type="button"
        class="ud-slider__thumb"
        :style="thumbStyle(index)"
        role="slider"
        :aria-label="isRange ? (index === 0 ? '最小值' : '最大值') : (label ?? '取值')"
        :aria-valuenow="pair[isRange ? index : 0]"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-orientation="vertical ? 'vertical' : 'horizontal'"
        :aria-disabled="blocked || undefined"
        @pointerdown="start(index, $event)"
        @keydown="onThumbKeydown(index, $event)"
        @focus="focusedThumb = index"
        @blur="focusedThumb = null"
      />
      <span
        v-if="showTooltip && dragging != null"
        class="ud-slider__bubble"
        :style="bubbleStyle"
      >{{ bubbleText }}</span>
    </div>
  </div>
</template>
