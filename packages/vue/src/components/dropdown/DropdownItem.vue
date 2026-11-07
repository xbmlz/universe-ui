<script setup lang="ts">
import { Right } from '@icon-park/vue-next'
import { inject, nextTick, onBeforeUnmount, shallowRef, useSlots, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { nextLayerZ } from '../dialog/scroll-lock'
import { DROPDOWN_KEY } from './context'

const {
  command,
  hint = '',
  disabled = false,
  divided = false,
  danger = false,
  selected = false,
} = defineProps<{
  command?: string
  hint?: string
  disabled?: boolean
  divided?: boolean
  danger?: boolean
  selected?: boolean
}>()

const dropdown = inject(DROPDOWN_KEY, null)
const slots = useSlots()
const itemRef = useTemplateRef<HTMLElement>('item')
const subRef = useTemplateRef<HTMLElement>('sub')
const subOpen = shallowRef(false)
const subStyle = shallowRef<Record<string, string>>({})

let timer = 0
let layer = 0

function place() {
  const item = itemRef.value
  const sub = subRef.value
  if (!item || !sub)
    return
  const rect = item.getBoundingClientRect()
  const parent = item.closest('.ud-dropdown__menu')?.getBoundingClientRect()
  const width = sub.offsetWidth
  const height = sub.offsetHeight
  const safe = 16
  const anchorRight = parent?.right ?? rect.right
  const anchorLeft = parent?.left ?? rect.left
  let left = anchorRight
  if (left + width > window.innerWidth - safe)
    left = anchorLeft - width
  // The submenu content lines up with the parent item, so the panel starts one content padding above it.
  let top = rect.top - 8
  left = Math.min(Math.max(safe, left), Math.max(safe, window.innerWidth - width - safe))
  top = Math.min(Math.max(safe, top), Math.max(safe, window.innerHeight - height - safe))
  subStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    zIndex: String(layer),
  }
}

function openSub() {
  if (!slots.submenu || disabled)
    return
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    layer = nextLayerZ()
    subOpen.value = true
    nextTick(place)
  }, 100)
}

function closeSub() {
  if (!slots.submenu)
    return
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    subOpen.value = false
  }, 150)
}

function enterSub() {
  dropdown?.hold()
  openSub()
}

function leaveSub(event: PointerEvent) {
  closeSub()
  dropdown?.hide(event)
}

function onClick() {
  if (disabled || !dropdown)
    return
  if (slots.submenu) {
    openSub()
    return
  }
  dropdown.select(command)
  dropdown.close()
}

function bind(active: boolean) {
  if (active) {
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    return
  }
  window.removeEventListener('scroll', place, true)
  window.removeEventListener('resize', place)
}

function onSubChange() {
  bind(subOpen.value)
}

watch(subOpen, onSubChange)

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  bind(false)
})
</script>

<template>
  <div
    v-if="divided"
    class="ud-dropdown__divider"
    role="separator"
  />
  <div
    ref="item"
    class="ud-dropdown__item"
    :class="{
      'is-disabled': disabled,
      'is-danger': danger,
      'is-selected': selected,
      'is-active': subOpen,
    }"
    role="menuitem"
    :aria-disabled="disabled || undefined"
    :aria-haspopup="slots.submenu ? 'menu' : undefined"
    :data-dropdown="dropdown?.id"
    @pointerenter="openSub"
    @pointerleave="closeSub"
    @click="onClick"
  >
    <span
      v-if="slots.icon"
      class="ud-dropdown__icon"
    >
      <slot name="icon" />
    </span>
    <span class="ud-dropdown__label">
      <slot />
    </span>
    <span
      v-if="hint"
      class="ud-dropdown__hint"
    >{{ hint }}</span>
    <span
      v-if="slots.submenu"
      class="ud-dropdown__caret"
    >
      <ParkIcon :icon="Right" />
    </span>
    <Teleport to="body">
      <div
        v-if="subOpen"
        ref="sub"
        class="ud-dropdown__menu"
        role="menu"
        :data-dropdown="dropdown?.id"
        :style="subStyle"
        @pointerenter="enterSub"
        @pointerleave="leaveSub"
      >
        <slot name="submenu" />
      </div>
    </Teleport>
  </div>
</template>
