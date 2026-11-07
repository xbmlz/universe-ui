<script setup lang="ts">
import { nextTick, onBeforeUnmount, shallowRef, useTemplateRef, watch } from 'vue'
import { nextLayerZ } from '../dialog/scroll-lock'

const { content, onlyOverflow = false } = defineProps<{
  content: string
  onlyOverflow?: boolean
}>()

const triggerRef = useTemplateRef<HTMLElement>('trigger')
const bubbleRef = useTemplateRef<HTMLElement>('bubble')
const shown = shallowRef(false)
const placement = shallowRef<'top' | 'bottom'>('top')
const bubbleStyle = shallowRef<Record<string, string>>({})

let timer = 0
let layer = 0

function overflowing() {
  const trigger = triggerRef.value
  if (!trigger)
    return false
  const box = trigger.firstElementChild instanceof HTMLElement
    ? trigger.firstElementChild
    : trigger
  if (box.scrollWidth > box.clientWidth + 1)
    return true
  // Under line-clamp, scrollHeight is the clamped height, so compare against an unclamped copy.
  const clone = box.cloneNode(true)
  if (!(clone instanceof HTMLElement) || !box.parentElement)
    return false
  clone.style.position = 'absolute'
  clone.style.visibility = 'hidden'
  clone.style.display = 'block'
  clone.style.height = 'auto'
  clone.style.webkitLineClamp = 'unset'
  clone.style.width = `${box.clientWidth}px`
  box.parentElement.append(clone)
  const over = clone.scrollHeight > box.clientHeight + 1
  clone.remove()
  return over
}

function place() {
  const trigger = triggerRef.value
  const bubble = bubbleRef.value
  if (!trigger || !bubble)
    return
  const rect = trigger.getBoundingClientRect()
  const width = bubble.offsetWidth
  const height = bubble.offsetHeight
  // Specified: 4px from the trigger, arrow 6px tall. The arrow tip sits 4px from the trigger.
  const offset = 10
  let nextPlacement: 'top' | 'bottom' = 'top'
  let top = rect.top - offset - height
  if (top < 8) {
    nextPlacement = 'bottom'
    top = rect.bottom + offset
  }
  const center = rect.left + rect.width / 2
  let left = center - width / 2
  left = Math.min(Math.max(8, left), window.innerWidth - width - 8)
  const arrow = Math.min(Math.max(12, center - left), width - 12)
  placement.value = nextPlacement
  bubbleStyle.value = {
    'top': `${top}px`,
    'left': `${left}px`,
    'zIndex': String(layer),
    '--ud-tooltip-arrow-left': `${arrow}px`,
  }
}

function show() {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    if (!content || (onlyOverflow && !overflowing()))
      return
    layer = nextLayerZ()
    shown.value = true
    nextTick(place)
  }, 100)
}

function hide() {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    shown.value = false
  }, 100)
}

watch(shown, (value) => {
  if (value) {
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    return
  }
  window.removeEventListener('scroll', place, true)
  window.removeEventListener('resize', place)
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  window.removeEventListener('scroll', place, true)
  window.removeEventListener('resize', place)
})
</script>

<template>
  <span
    ref="trigger"
    class="ud-tooltip"
    @pointerenter="show"
    @pointerleave="hide"
  >
    <slot />
    <Teleport to="body">
      <Transition name="ud-tooltip">
        <span
          v-if="shown"
          ref="bubble"
          class="ud-tooltip__bubble"
          :class="`ud-tooltip__bubble--${placement}`"
          role="tooltip"
          :style="bubbleStyle"
          @pointerenter="show"
          @pointerleave="hide"
        >
          {{ content }}
          <span class="ud-tooltip__arrow" />
        </span>
      </Transition>
    </Teleport>
  </span>
</template>
