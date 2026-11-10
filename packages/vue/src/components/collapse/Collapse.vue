<script setup lang="ts">
import type { CollapseArrow, CollapseHitArea, CollapseName } from './types'
import { provide } from 'vue'
import { COLLAPSE_KEY } from './context'

const props = withDefaults(defineProps<{
  arrow?: CollapseArrow
  accordion?: boolean
  bordered?: boolean
  filled?: boolean
  /** Default hit area for items. Items may override. */
  hitArea?: CollapseHitArea
  /**
   * Nested-table wash: row hover uses N900*8%, selected items use B500*8%.
   * Only applies when hitArea is `row`.
   */
  nested?: boolean
}>(), {
  arrow: 'line',
  accordion: false,
  bordered: false,
  filled: false,
  hitArea: 'row',
  nested: false,
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
  hitArea: () => props.hitArea,
  nested: () => props.nested,
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
      'ud-collapse--nested': nested,
      [`ud-collapse--hit-${hitArea}`]: true,
    }"
  >
    <slot />
  </div>
</template>
