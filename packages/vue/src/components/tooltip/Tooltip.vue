<script setup lang="ts">
import type { TooltipPlacement } from './types'
import { useEventListener } from '@vueuse/core'
import { nextTick, onBeforeUnmount, onMounted, shallowRef, useTemplateRef } from 'vue'
import { nextLayerZ } from '../dialog/scroll-lock'
import { placeTooltip } from './position'

/* Inline the prop type so Vue can emit a runtime props declaration; an imported
 * interface alone leaves `placement` as a fallthrough attribute and always tops. */
const props = withDefaults(defineProps<{
  content: string
  placement?: TooltipPlacement
  onlyOverflow?: boolean
}>(), {
  placement: 'top',
  onlyOverflow: false,
})

const triggerRef = useTemplateRef<HTMLElement>('trigger')
const bubbleRef = useTemplateRef<HTMLElement>('bubble')
// `window` does not exist while rendering on the server, so the target stays null until mount.
const windowTarget = shallowRef<Window | null>(null)
onMounted(() => {
  windowTarget.value = window
})
const shown = shallowRef(false)
const placement = shallowRef<TooltipPlacement>(props.placement)
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
  if (!shown.value)
    return
  const trigger = triggerRef.value
  const bubble = bubbleRef.value
  if (!trigger || !bubble)
    return
  const rect = trigger.getBoundingClientRect()
  const placed = placeTooltip({
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    width: rect.width,
    height: rect.height,
  }, {
    width: bubble.offsetWidth,
    height: bubble.offsetHeight,
  }, {
    width: window.innerWidth,
    height: window.innerHeight,
  }, props.placement)
  placement.value = placed.placement
  bubbleStyle.value = {
    'top': `${placed.top}px`,
    'left': `${placed.left}px`,
    'zIndex': String(layer),
    '--ud-tooltip-arrow-along': `${placed.arrow}px`,
  }
}

function show() {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    if (!props.content || (props.onlyOverflow && !overflowing()))
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

// The bubble has to follow the trigger while it is open. Listeners stay bound for the
// component's lifetime and `place` returns early when the bubble is hidden; that costs
// one function call per scroll, and useEventListener unbinds them on scope dispose.
useEventListener(windowTarget, 'scroll', place, { capture: true, passive: true })
useEventListener(windowTarget, 'resize', place)

onBeforeUnmount(() => {
  window.clearTimeout(timer)
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
          {{ props.content }}
          <span class="ud-tooltip__arrow" />
        </span>
      </Transition>
    </Teleport>
  </span>
</template>
