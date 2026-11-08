<script setup lang="ts">
import type { PopoverPlacement, PopoverSize, PopoverTrigger, PopoverType } from './types'
import { Attention, CheckOne, CloseOne, Info } from '@icon-park/vue-next'
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, useSlots, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { nextLayerZ } from '../dialog/scroll-lock'
import Spin from '../spin/Spin.vue'

const props = withDefaults(defineProps<{
  title?: string
  content?: string
  trigger?: PopoverTrigger
  placement?: PopoverPlacement
  size?: PopoverSize
  width?: number | string
  loading?: boolean
  type?: PopoverType
  showArrow?: boolean
  titleStrong?: boolean
  disabled?: boolean
}>(), {
  title: '',
  content: '',
  trigger: 'hover',
  placement: 'top',
  size: 'sm',
  showArrow: true,
  titleStrong: false,
  disabled: false,
  loading: false,
})

const open = defineModel<boolean>('open', { default: false })

const slots = useSlots()
const triggerRef = useTemplateRef<HTMLElement>('trigger')
const cardRef = useTemplateRef<HTMLElement>('card')
const bodyRef = useTemplateRef<HTMLElement>('body')
const side = shallowRef<PopoverPlacement>('top')
const divided = shallowRef(false)
const cardStyle = shallowRef<Record<string, string>>({})
const windowTarget = shallowRef<Window | null>(null)
onMounted(() => {
  windowTarget.value = window
})

const ICONS = {
  info: Info,
  success: CheckOne,
  warning: Attention,
  error: CloseOne,
}

const hasIcon = computed(() => !!props.type || !!slots.icon)
const hasTitle = computed(() => !!props.title || !!slots.title)
const hasBody = computed(() => props.loading || !!props.content || !!slots.content)
const hasFooter = computed(() => !!slots.footer)

let timer = 0
let layer = 0
let observer: ResizeObserver | undefined

const SIDES: PopoverPlacement[] = ['top', 'bottom', 'left', 'right']
const SAFE = 16
const OFFSET = 10

function fits(next: PopoverPlacement, rect: DOMRect, width: number, height: number) {
  if (next === 'top')
    return rect.top - OFFSET - height >= SAFE
  if (next === 'bottom')
    return rect.bottom + OFFSET + height <= window.innerHeight - SAFE
  if (next === 'left')
    return rect.left - OFFSET - width >= SAFE
  return rect.right + OFFSET + width <= window.innerWidth - SAFE
}

function place() {
  const trigger = triggerRef.value
  const card = cardRef.value
  if (!trigger || !card)
    return
  const rect = trigger.getBoundingClientRect()
  const width = card.offsetWidth
  const height = card.offsetHeight
  const order = [
    props.placement,
    ...SIDES.filter(item => item !== props.placement),
  ]
  const next = order.find(item => fits(item, rect, width, height)) ?? props.placement
  const vw = window.innerWidth
  const vh = window.innerHeight
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  let top = 0
  let left = 0
  if (next === 'top') {
    top = rect.top - OFFSET - height
    left = centerX - width / 2
  }
  else if (next === 'bottom') {
    top = rect.bottom + OFFSET
    left = centerX - width / 2
  }
  else if (next === 'left') {
    left = rect.left - OFFSET - width
    top = centerY - height / 2
  }
  else {
    left = rect.right + OFFSET
    top = centerY - height / 2
  }
  if (next === 'top' || next === 'bottom') {
    if (left < SAFE)
      left = Math.max(SAFE, Math.min(rect.left, vw - SAFE - width))
    else if (left + width > vw - SAFE)
      left = Math.max(SAFE, Math.min(rect.right - width, vw - SAFE - width))
  }
  else if (top < SAFE) {
    top = Math.max(SAFE, Math.min(rect.top, vh - SAFE - height))
  }
  else if (top + height > vh - SAFE) {
    top = Math.max(SAFE, Math.min(rect.bottom - height, vh - SAFE - height))
  }
  left = Math.min(Math.max(SAFE, left), Math.max(SAFE, vw - width - SAFE))
  top = Math.min(Math.max(SAFE, top), Math.max(SAFE, vh - height - SAFE))
  side.value = next
  const style: Record<string, string> = {
    'top': `${top}px`,
    'left': `${left}px`,
    'zIndex': String(layer),
    '--ud-popover-arrow-x': `${Math.min(Math.max(16, centerX - left), Math.max(16, width - 16))}px`,
    '--ud-popover-arrow-y': `${Math.min(Math.max(16, centerY - top), Math.max(16, height - 16))}px`,
  }
  if (props.width != null) {
    style.width = typeof props.width === 'number'
      ? `${props.width}px`
      : props.width
    style.maxWidth = 'none'
  }
  cardStyle.value = style
  const body = bodyRef.value
  divided.value = !!body && body.scrollHeight > body.clientHeight + 1
}

function show() {
  if (props.trigger !== 'hover' || props.disabled)
    return
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    open.value = true
  }, 100)
}

function hide() {
  if (props.trigger !== 'hover')
    return
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    open.value = false
  }, 100)
}

function onClick() {
  if (props.trigger !== 'click' || props.disabled)
    return
  open.value = !open.value
}

function onPointerDown(event: PointerEvent) {
  if (!open.value)
    return
  const target = event.target
  if (!(target instanceof Node))
    return
  if (triggerRef.value?.contains(target) || cardRef.value?.contains(target))
    return
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    open.value = false
}

useEventListener(windowTarget, 'scroll', place, { capture: true, passive: true })
useEventListener(windowTarget, 'resize', place)
useEventListener(windowTarget, 'keydown', onKeydown)
useEventListener(windowTarget, 'pointerdown', onPointerDown, { capture: true })

watch(open, (value) => {
  if (value) {
    layer = nextLayerZ()
    nextTick(place)
  }
})

watch(() => [
  props.placement,
  props.width,
  props.loading,
  props.content,
  props.title,
  props.size,
  props.type,
], () => {
  if (open.value)
    nextTick(place)
})

watch(cardRef, (card) => {
  observer?.disconnect()
  if (!card)
    return
  observer ??= new ResizeObserver(() => place())
  observer.observe(card)
  if (bodyRef.value)
    observer.observe(bodyRef.value)
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  observer?.disconnect()
})
</script>

<template>
  <span
    ref="trigger"
    class="ud-popover-ref"
    @pointerenter="show"
    @pointerleave="hide"
    @click="onClick"
  >
    <slot />
    <Teleport to="body">
      <Transition name="ud-popover">
        <div
          v-if="open"
          ref="card"
          class="ud-popover"
          :class="[`ud-popover--${side}`, `ud-popover--${size}`, { 'ud-popover--divided': divided }]"
          role="dialog"
          :style="cardStyle"
          @pointerenter="show"
          @pointerleave="hide"
        >
          <div class="ud-popover__panel">
            <div class="ud-popover__main">
              <span
                v-if="hasIcon"
                class="ud-popover__icon"
                :class="type ? `ud-popover__icon--${type}` : undefined"
              >
                <slot name="icon">
                  <ParkIcon
                    v-if="type"
                    :icon="ICONS[type]"
                    theme="filled"
                  />
                </slot>
              </span>
              <div class="ud-popover__text">
                <div
                  v-if="hasTitle"
                  class="ud-popover__title"
                  :class="{ 'ud-popover__title--strong': titleStrong }"
                >
                  <slot name="title">{{ title }}</slot>
                </div>
                <div
                  v-if="loading"
                  class="ud-popover__loading"
                >
                  <Spin label="加载中" />
                </div>
                <div
                  v-else-if="hasBody"
                  ref="body"
                  class="ud-popover__body"
                >
                  <slot name="content">{{ content }}</slot>
                </div>
              </div>
            </div>
            <div
              v-if="hasFooter"
              class="ud-popover__footer"
            >
              <slot name="footer" />
            </div>
          </div>
          <span
            v-if="showArrow"
            class="ud-popover__arrow"
          />
        </div>
      </Transition>
    </Teleport>
  </span>
</template>
