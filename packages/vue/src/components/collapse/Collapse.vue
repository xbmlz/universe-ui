<script setup lang="ts">
import type { CollapseArrow, CollapseName } from './types'
import { provide } from 'vue'
import { COLLAPSE_KEY } from './context'

const props = withDefaults(defineProps<{
  arrow?: CollapseArrow
  accordion?: boolean
  bordered?: boolean
  filled?: boolean
}>(), {
  arrow: 'line',
  accordion: false,
  bordered: false,
  filled: false,
})

const open = defineModel<CollapseName[]>({
  default: () => [],
})

function isOpen(name: CollapseName) {
  return open.value.includes(name)
}

function toggle(name: CollapseName) {
  if (isOpen(name)) {
    open.value = open.value.filter(item => item !== name)
    return
  }
  open.value = props.accordion
    ? [name]
    : [...open.value, name]
}

provide(COLLAPSE_KEY, {
  arrow: () => props.arrow,
  isOpen,
  toggle,
})
</script>

<template>
  <div
    class="ud-collapse"
    :class="{
      'ud-collapse--line': arrow === 'line',
      'ud-collapse--caret': arrow === 'filled',
      'ud-collapse--bordered': bordered,
      'ud-collapse--filled': filled,
    }"
  >
    <slot />
  </div>
</template>
