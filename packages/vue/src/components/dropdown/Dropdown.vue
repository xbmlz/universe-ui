<script setup lang="ts">
import type { DropdownPlacement, DropdownTrigger } from './types'
import { computed, nextTick, onBeforeUnmount, provide, shallowRef, useId, useTemplateRef, watch } from 'vue'
import { nextLayerZ } from '../dialog/scroll-lock'
import Spin from '../spin/Spin.vue'
import { DROPDOWN_KEY } from './context'

const props = withDefaults(defineProps<{
  trigger?: DropdownTrigger
  placement?: DropdownPlacement
  width?: number | string
  loading?: boolean
  disabled?: boolean
}>(), {
  trigger: 'hover',
  loading: false,
  disabled: false,
})

const emit = defineEmits<{
  select: [command: string | undefined]
}>()

const open = defineModel<boolean>('open', { default: false })

const id = useId()
const triggerRef = useTemplateRef<HTMLElement>('trigger')
const menuRef = useTemplateRef<HTMLElement>('menu')
const menuStyle = shallowRef<Record<string, string>>({})

let timer = 0
let layer = 0

const ORDER: DropdownPlacement[] = [
  'bottom-start',
  'bottom-end',
  'top-start',
  'top-end',
  'right-start',
  'left-start',
]

const menuClass = computed(() => ({
  'is-fixed': props.width != null,
}))

function fits(placement: DropdownPlacement, rect: DOMRect, width: number, height: number) {
  const gap = 4
  const safe = 16
  if (placement === 'bottom-start')
    return rect.bottom + gap + height <= window.innerHeight - safe && rect.left + width <= window.innerWidth - safe
  if (placement === 'bottom-end')
    return rect.bottom + gap + height <= window.innerHeight - safe && rect.right - width >= safe
  if (placement === 'top-start')
    return rect.top - gap - height >= safe && rect.left + width <= window.innerWidth - safe
  if (placement === 'top-end')
    return rect.top - gap - height >= safe && rect.right - width >= safe
  if (placement === 'right-start')
    return rect.right + gap + width <= window.innerWidth - safe && rect.top + height <= window.innerHeight - safe
  return rect.left - gap - width >= safe && rect.top + height <= window.innerHeight - safe
}

function place() {
  const trigger = triggerRef.value
  const menu = menuRef.value
  if (!trigger || !menu)
    return
  const rect = trigger.getBoundingClientRect()
  const width = menu.offsetWidth
  const height = menu.offsetHeight
  const order = props.placement
    ? [
        props.placement,
        ...ORDER.filter(item => item !== props.placement),
      ]
    : ORDER
  const placement = order.find(item => fits(item, rect, width, height)) ?? order[0]
  const gap = 4
  const safe = 16
  let top = 0
  let left = 0
  if (placement === 'bottom-start' || placement === 'bottom-end') {
    top = rect.bottom + gap
    left = placement.endsWith('start')
      ? rect.left
      : rect.right - width
  }
  else if (placement === 'top-start' || placement === 'top-end') {
    top = rect.top - gap - height
    left = placement.endsWith('start')
      ? rect.left
      : rect.right - width
  }
  else if (placement === 'right-start') {
    left = rect.right + gap
    top = rect.top
  }
  else {
    left = rect.left - gap - width
    top = rect.top
  }
  left = Math.min(Math.max(safe, left), Math.max(safe, window.innerWidth - width - safe))
  top = Math.min(Math.max(safe, top), Math.max(safe, window.innerHeight - height - safe))
  const style: Record<string, string> = {
    top: `${top}px`,
    left: `${left}px`,
    zIndex: String(layer),
  }
  if (props.width != null) {
    style['--ud-dropdown-width'] = typeof props.width === 'number'
      ? `${props.width}px`
      : props.width
  }
  menuStyle.value = style
}

function show() {
  if (props.trigger !== 'hover' || props.disabled)
    return
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    open.value = true
  }, 300)
}

function hold() {
  if (props.trigger !== 'hover')
    return
  window.clearTimeout(timer)
  open.value = true
}

function hide(event?: PointerEvent) {
  if (props.trigger !== 'hover')
    return
  const next = event?.relatedTarget
  if (next instanceof Element && (triggerRef.value?.contains(next) || next.closest(`[data-dropdown="${id}"]`)))
    return
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    open.value = false
  }, 300)
}

function onClick() {
  if (props.trigger !== 'click' || props.disabled)
    return
  open.value = !open.value
}

function onPointerDown(event: PointerEvent) {
  const target = event.target
  if (!(target instanceof Element))
    return
  if (triggerRef.value?.contains(target) || target.closest(`[data-dropdown="${id}"]`))
    return
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    open.value = false
}

function bind(active: boolean) {
  if (active) {
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    document.addEventListener('keydown', onKeydown)
    if (props.trigger === 'click')
      document.addEventListener('pointerdown', onPointerDown, true)
    return
  }
  window.removeEventListener('scroll', place, true)
  window.removeEventListener('resize', place)
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onPointerDown, true)
}

function close() {
  open.value = false
}

function select(command: string | undefined) {
  emit('select', command)
}

provide(DROPDOWN_KEY, { id, close, hold, hide, select })

watch(open, (value) => {
  if (value)
    layer = nextLayerZ()
  bind(value)
  if (value)
    nextTick(place)
})

watch(() => [props.placement, props.width, props.loading], () => {
  if (open.value)
    nextTick(place)
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  bind(false)
})
</script>

<template>
  <span
    ref="trigger"
    class="ud-dropdown-ref"
    :class="{ 'is-open': open }"
    @pointerenter="show"
    @pointerleave="hide"
    @click="onClick"
  >
    <slot />
    <Teleport to="body">
      <Transition name="ud-dropdown">
        <div
          v-if="open"
          ref="menu"
          class="ud-dropdown__menu"
          :class="menuClass"
          role="menu"
          :data-dropdown="id"
          :style="menuStyle"
          @pointerenter="hold"
          @pointerleave="hide"
        >
          <slot name="menu" />
          <div
            v-if="loading"
            class="ud-dropdown__loading"
          >
            <Spin label="加载中" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </span>
</template>
