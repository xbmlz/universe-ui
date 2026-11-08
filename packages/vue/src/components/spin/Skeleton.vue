<script setup lang="ts">
import type { SkeletonVariant } from './types'
import { computed } from 'vue'
import Spin from './Spin.vue'

const {
  variant = 'text',
  width,
  height,
  rows = 1,
} = defineProps<{
  variant?: SkeletonVariant
  width?: number | string
  height?: number | string
  rows?: number
}>()

function toLength(value: number | string | undefined) {
  return typeof value === 'number'
    ? `${value}px`
    : value
}

const style = computed(() => ({
  width: toLength(width ?? (variant === 'image'
    ? 180
    : undefined)),
  height: toLength(height ?? (variant === 'circle'
    ? width
    : variant === 'image'
      ? 120
      : undefined)),
}))
</script>

<template>
  <div
    v-if="variant === 'text' && rows > 1"
    class="ud-skeleton-paragraph"
    :style="{ width: toLength(width) }"
    aria-hidden="true"
  >
    <span
      v-for="row in rows"
      :key="row"
      class="ud-skeleton ud-skeleton--text"
      :style="{ height: toLength(height) }"
    />
  </div>
  <span
    v-else
    class="ud-skeleton"
    :class="`ud-skeleton--${variant}`"
    :style="style"
    aria-hidden="true"
  >
    <Spin
      v-if="variant === 'image'"
      size="sm"
      color="grey"
      label=""
    />
  </span>
</template>
