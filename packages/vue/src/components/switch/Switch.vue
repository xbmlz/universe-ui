<script setup lang="ts">
import type { SwitchSize } from './types'
import { computed } from 'vue'
import Spin from '../spin/Spin.vue'

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
      <Spin
        v-if="loading"
        class="ud-switch__spinner"
        :style="{
          '--ud-spin-size': size === 'sm' ? '7px' : '11px',
          '--ud-spin-color': 'var(--ud-switch-spinner-color)',
        }"
        aria-hidden="true"
      />
    </span>
  </button>
</template>
