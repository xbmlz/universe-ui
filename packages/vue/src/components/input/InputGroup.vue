<script setup lang="ts">
import type { InputSize } from './types'
import { computed, provide, useId } from 'vue'
import { INPUT_GROUP } from './context'

const {
  size = 'md',
  disabled = false,
  readonly = false,
  error = false,
  required = false,
  label,
  message,
} = defineProps<{
  size?: InputSize
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  required?: boolean
  label?: string
  message?: string
}>()

const labelId = useId()

provide(INPUT_GROUP, {
  size: computed(() => size),
  disabled: computed(() => disabled),
  readonly: computed(() => readonly),
  error: computed(() => error),
})
</script>

<template>
  <div
    class="ud-input-group"
    :class="[
      `ud-input-group--${size}`,
      {
        'ud-input-group--error': error,
        'ud-input-group--disabled': disabled,
        'ud-input-group--readonly': readonly,
      },
    ]"
  >
    <div
      v-if="label"
      class="ud-input__label"
    >
      <span
        v-if="required"
        class="ud-input__required"
        aria-hidden="true"
      >*</span>
      <span :id="labelId">{{ label }}</span>
    </div>
    <div
      class="ud-input-group__fields"
      role="group"
      :aria-labelledby="label ? labelId : undefined"
    >
      <slot />
    </div>
    <p
      v-if="message"
      class="ud-input__message"
    >
      {{ message }}
    </p>
  </div>
</template>
