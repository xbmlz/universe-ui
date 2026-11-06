<script setup lang="ts" vapor>
import { computed, onBeforeUnmount, onMounted, shallowRef, useTemplateRef } from 'vue'
import { Check, Down, Up } from '@icon-park/vue-next'
import ParkIcon from '../../internal/park-icon.vue'
import type { InputAddonOption } from './types'

const model = defineModel<string>({ required: true })

const { options } = defineProps<{
  options: InputAddonOption[]
}>()

const rootRef = useTemplateRef<HTMLElement>('root')
const open = shallowRef(false)
const placement = shallowRef<'bottom' | 'top'>('bottom')

const current = computed(() => options.find((option) => option.value === model.value) ?? options[0])

function place() {
  const root = rootRef.value
  if (!root) return
  const rect = root.getBoundingClientRect()
  const menu = root.querySelector('.ud-input-addon__menu')
  const height = menu instanceof HTMLElement ? menu.offsetHeight : 0
  const spaceBelow = window.innerHeight - rect.bottom
  placement.value = spaceBelow < height + 4 && rect.top > spaceBelow ? 'top' : 'bottom'
}

function toggle() {
  open.value = !open.value
  if (open.value) requestAnimationFrame(place)
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

function onDocPointerDown(event: PointerEvent) {
  const root = rootRef.value
  if (!open.value || !root) return
  if (event.target instanceof Node && root.contains(event.target)) return
  open.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointerDown)
})
</script>

<template>
  <span ref="root" class="ud-input-addon">
    <button
      type="button"
      class="ud-input-addon__trigger"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="toggle"
      @keydown="onKeydown"
    >
      <span class="ud-input-addon__label">{{ current?.label }}</span>
      <ParkIcon class="ud-input-addon__arrow" :icon="open ? Up : Down" />
    </button>
    <div v-if="open" class="ud-input-addon__menu" :class="{ 'ud-input-addon__menu--top': placement === 'top' }" role="listbox">
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
        <ParkIcon v-if="option.value === model" class="ud-input-addon__check" :icon="Check" />
      </button>
    </div>
  </span>
</template>
