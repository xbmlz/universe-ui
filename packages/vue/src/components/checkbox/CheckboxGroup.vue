<script setup lang="ts" vapor>
import { computed, provide } from 'vue'
import { CHECKBOX_GROUP } from './context'
import type { CheckboxDirection } from './types'

const model = defineModel<(string | number)[]>({ default: () => [] })

const { disabled = false, direction = 'vertical' } = defineProps<{
  disabled?: boolean
  direction?: CheckboxDirection
}>()

provide(CHECKBOX_GROUP, {
  model,
  disabled: computed(() => disabled),
})
</script>

<template>
  <div
    class="ud-checkbox-group"
    :class="{ 'ud-checkbox-group--horizontal': direction === 'horizontal' }"
    role="group"
  >
    <slot />
  </div>
</template>
