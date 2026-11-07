<script setup lang="ts">
import type { RadioDirection, RadioSize } from './types'
import { computed, provide, useId } from 'vue'
import { RADIO_GROUP } from './context'

const {
  disabled = false,
  direction = 'vertical',
  variant = 'default',
  size = 'md',
} = defineProps<{
  disabled?: boolean
  direction?: RadioDirection
  variant?: 'default' | 'button'
  size?: RadioSize
}>()

const model = defineModel<string | number | null>({ default: null })

const button = computed(() => variant === 'button')

provide(RADIO_GROUP, {
  model,
  name: useId(),
  disabled: computed(() => disabled),
  button,
  size: computed(() => size),
})
</script>

<template>
  <div
    class="ud-radio-group"
    :class="{
      'ud-radio-group--horizontal': direction === 'horizontal' && !button,
      'ud-radio-group--button': button,
    }"
    :data-size="button ? size : undefined"
    role="radiogroup"
  >
    <slot />
  </div>
</template>
