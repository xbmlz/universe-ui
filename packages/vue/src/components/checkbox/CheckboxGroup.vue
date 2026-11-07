<script setup lang="ts">
import type { CheckboxDirection } from './types'
import { computed, provide } from 'vue'
import { CHECKBOX_GROUP } from './context'

const { disabled = false, direction = 'vertical' } = defineProps<{
  disabled?: boolean
  direction?: CheckboxDirection
}>()

const model = defineModel<(string | number)[]>({
  default: () => [],
})

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
