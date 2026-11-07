<script setup lang="ts">
import type { SkeletonVariant } from './types'
import { computed } from 'vue'

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
  width: toLength(width),
  height: toLength(height ?? (variant === 'circle'
    ? width
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
  />
</template>
