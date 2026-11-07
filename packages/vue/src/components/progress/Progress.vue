<script setup lang="ts">
import type { ProgressInfoPlacement, ProgressStatus, ProgressVariant } from './types'
import { computed } from 'vue'

const {
  percent = 0,
  variant = 'line',
  status = 'normal',
  showInfo = true,
  infoPlacement,
  indeterminate = false,
  height,
  format,
  label = '进度',
} = defineProps<{
  percent?: number
  variant?: ProgressVariant
  status?: ProgressStatus
  showInfo?: boolean
  infoPlacement?: ProgressInfoPlacement
  indeterminate?: boolean
  height?: number
  format?: (percent: number) => string
  label?: string
}>()

const value = computed(() => Math.min(100, Math.max(0, percent)))
const info = computed(() => (format
  ? format(value.value)
  : `${Math.round(value.value)}%`))
const placement = computed(() => infoPlacement ?? (variant === 'circle'
  ? 'left'
  : 'right'))
const iconOnly = computed(() => variant === 'circle' && status !== 'normal' && !indeterminate)
const infoVisible = computed(() => showInfo && !indeterminate && !iconOnly.value && (variant === 'line' || status !== 'error'))

const classes = computed(() => [
  'ud-progress',
  `ud-progress--${variant}`,
  `ud-progress--${status}`,
  `ud-progress--info-${placement.value}`,
  { 'ud-progress--indeterminate': indeterminate },
])

const style = computed(() => ({
  '--ud-progress-value': String(value.value),
  ...(height
    ? { '--ud-progress-height': `${height}px` }
    : {}),
}))
</script>

<template>
  <div
    :class="classes"
    :style="style"
    role="progressbar"
    :aria-label="label"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="indeterminate ? undefined : value"
    :aria-valuetext="indeterminate ? undefined : info"
  >
    <span
      v-if="infoVisible && placement === 'left'"
      class="ud-progress__info"
    >{{ info }}</span>
    <span
      v-if="variant === 'line'"
      class="ud-progress__track"
    >
      <span class="ud-progress__bar" />
    </span>
    <svg
      v-else-if="status === 'success' && !indeterminate"
      class="ud-progress__icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="8"
      />
      <path d="M4.6 8.2 6.9 10.5 11.4 6" />
    </svg>
    <svg
      v-else-if="status === 'error' && !indeterminate"
      class="ud-progress__icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="8"
      />
      <path d="M5.6 5.6 10.4 10.4M10.4 5.6 5.6 10.4" />
    </svg>
    <svg
      v-else
      class="ud-progress__ring"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <circle
        class="ud-progress__ring-track"
        cx="8"
        cy="8"
        r="7"
      />
      <circle
        class="ud-progress__ring-bar"
        cx="8"
        cy="8"
        r="7"
        pathLength="100"
      />
    </svg>
    <span
      v-if="infoVisible && placement === 'right'"
      class="ud-progress__info"
    >{{ info }}</span>
  </div>
</template>
