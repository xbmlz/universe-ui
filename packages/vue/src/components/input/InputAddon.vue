<script setup lang="ts">
import type { InputAddonOption } from './types'
import { Check, Down, Up } from '@icon-park/vue-next'
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, onMounted, shallowRef, useTemplateRef } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { nextLayerZ } from '../dialog/scroll-lock'

const { options } = defineProps<{
  options: InputAddonOption[]
}>()

const model = defineModel<string>({ required: true })

const rootRef = useTemplateRef<HTMLElement>('root')
const menuRef = useTemplateRef<HTMLElement>('menu')
const open = shallowRef(false)
const placement = shallowRef<'bottom' | 'top'>('bottom')
const menuStyle = shallowRef<Record<string, string>>({})
const windowTarget = shallowRef<Window | null>(null)
let layer = 0
onMounted(() => {
  windowTarget.value = window
})

const current = computed(() => options.find(option => option.value === model.value) ?? options[0])

function place() {
  const root = rootRef.value
  const menu = menuRef.value
  if (!root || !menu)
    return
  const rect = root.getBoundingClientRect()
  const font = getComputedStyle(root.querySelector('.ud-input-addon__trigger') ?? root)
  // 5px keeps the same 4px outer gap the absolute menu used: the border is 1px.
  const gap = 5
  const height = menu.offsetHeight
  const spaceBelow = window.innerHeight - rect.bottom
  const above = spaceBelow < height + gap && rect.top > spaceBelow
  placement.value = above ? 'top' : 'bottom'
  menuStyle.value = {
    top: `${Math.round(above
      ? rect.top - gap - height
      : rect.bottom + gap)}px`,
    left: `${Math.round(rect.left)}px`,
    width: `${Math.round(rect.width)}px`,
    zIndex: String(layer),
    color: font.color,
    fontFamily: font.fontFamily,
    fontSize: font.fontSize,
    lineHeight: font.lineHeight,
  }
}

function toggle() {
  if (!open.value)
    layer = nextLayerZ()
  open.value = !open.value
  if (open.value)
    nextTick(place)
}

function choose(option: InputAddonOption) {
  model.value = option.value
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    open.value = false
    return
  }
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle()
  }
}

function onOutside(event: PointerEvent) {
  const root = rootRef.value
  if (!open.value || !root)
    return
  const target = event.target
  if (target instanceof Node && (root.contains(target) || menuRef.value?.contains(target)))
    return
  open.value = false
}

useEventListener(windowTarget, 'pointerdown', onOutside, { capture: true })
useEventListener(windowTarget, 'scroll', place, { capture: true, passive: true })
useEventListener(windowTarget, 'resize', place)
</script>

<template>
  <span
    ref="root"
    class="ud-input-addon"
  >
    <button
      type="button"
      class="ud-input-addon__trigger"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="toggle"
      @keydown="onKeydown"
    >
      <span class="ud-input-addon__label">{{ current?.label }}</span>
      <ParkIcon
        class="ud-input-addon__arrow"
        :icon="open ? Up : Down"
      />
    </button>
    <Teleport to="body">
      <div
        v-if="open"
        ref="menu"
        class="ud-input-addon__menu"
        :class="{ 'ud-input-addon__menu--top': placement === 'top' }"
        :style="menuStyle"
        role="listbox"
      >
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          class="ud-input-addon__option"
          :class="{ 'is-selected': option.value === model }"
          role="option"
          :aria-selected="option.value === model"
          @click="choose(option)"
        >
          <span>{{ option.label }}</span>
          <ParkIcon
            v-if="option.value === model"
            class="ud-input-addon__check"
            :icon="Check"
          />
        </button>
      </div>
    </Teleport>
  </span>
</template>
