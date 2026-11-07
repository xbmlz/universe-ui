<script setup lang="ts">
import type { SwitchSize } from './types'
import { computed } from 'vue'

const {
  size = 'md',
  disabled = false,
  loading = false,
} = defineProps<{
  size?: SwitchSize
  disabled?: boolean
  loading?: boolean
}>()

const model = defineModel<boolean>({ default: false })

const classes = computed(() => [
  'ud-switch',
  `ud-switch--${size}`,
  {
    'ud-switch--checked': model.value,
    'ud-switch--disabled': disabled,
    'ud-switch--loading': loading,
  },
])

function onClick() {
  if (disabled || loading)
    return
  model.value = !model.value
}
</script>

<template>
  <button
    :class="classes"
    type="button"
    role="switch"
    :aria-checked="model"
    :aria-busy="loading || undefined"
    :disabled="disabled"
    @click="onClick"
  >
    <span class="ud-switch__knob">
      <span
        v-if="loading"
        class="ud-switch__spinner"
        aria-hidden="true"
      />
    </span>
  </button>
</template>
