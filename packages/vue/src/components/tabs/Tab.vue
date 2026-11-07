<script setup lang="ts">
import type { TabValue } from './types'
import { computed, inject } from 'vue'
import { TABS } from './context'

const { value, disabled = false } = defineProps<{
  value: TabValue
  disabled?: boolean
}>()

const tabs = inject(TABS, null)
const selected = computed(() => tabs?.model.value === value)

function onClick() {
  if (disabled || !tabs)
    return
  tabs.model.value = value
}
</script>

<template>
  <button
    type="button"
    role="tab"
    class="ud-tab"
    :class="{ 'ud-tab--selected': selected }"
    :aria-selected="selected"
    :tabindex="selected || tabs?.model.value == null ? 0 : -1"
    :disabled="disabled"
    @click="onClick"
  >
    <span class="ud-tab__label">
      <span class="ud-tab__text"><slot /></span>
      <span
        class="ud-tab__sizer"
        aria-hidden="true"
      ><slot /></span>
    </span>
  </button>
</template>
