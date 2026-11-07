<script setup lang="ts">
import type { TagColor, TagSize, TagVariant } from './types'
import { Close } from '@icon-park/vue-next'
import { computed } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'

const {
  variant = 'property',
  size = 'md',
  color = 'neutral',
  solid = false,
  closable = false,
  disabled = false,
} = defineProps<{
  variant?: TagVariant
  size?: TagSize
  color?: TagColor
  solid?: boolean
  closable?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{ close: [event: MouseEvent] }>()

const classes = computed(() => [
  'ud-tag',
  `ud-tag--${variant}`,
  `ud-tag--${color}`,
  variant === 'option' && `ud-tag--${size}`,
  {
    'ud-tag--solid': solid && variant === 'property',
    'ud-tag--disabled': disabled,
  },
])

function onClose(event: MouseEvent) {
  if (disabled)
    return
  emit('close', event)
}
</script>

<template>
  <span
    :class="classes"
    :aria-disabled="disabled || undefined"
  >
    <span
      v-if="$slots.icon"
      class="ud-tag__icon"
    ><slot name="icon" /></span>
    <span
      v-if="$slots.default"
      class="ud-tag__label"
    ><slot /></span>
    <button
      v-if="closable"
      type="button"
      class="ud-tag__close"
      aria-label="移除"
      :disabled="disabled"
      @click="onClose"
    >
      <ParkIcon :icon="Close" />
    </button>
  </span>
</template>
