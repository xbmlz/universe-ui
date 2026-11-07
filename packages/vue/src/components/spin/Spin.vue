<script setup lang="ts">
import type { SpinColor, SpinDirection, SpinSize } from './types'
import { computed, onBeforeUnmount, shallowRef, watch } from 'vue'

const {
  spinning = true,
  size,
  color = 'brand',
  tip,
  direction = 'vertical',
  delay = 0,
  label = '加载中',
} = defineProps<{
  spinning?: boolean
  size?: SpinSize | number
  color?: SpinColor
  tip?: string
  direction?: SpinDirection
  delay?: number
  label?: string
}>()

const shown = shallowRef(spinning && delay <= 0)
let timer: ReturnType<typeof setTimeout> | undefined

watch(() => [spinning, delay] as const, ([active, wait]) => {
  clearTimeout(timer)
  if (!active) {
    shown.value = false
  }
  else if (wait > 0) {
    timer = setTimeout(() => { shown.value = true }, wait)
  }
  else {
    shown.value = true
  }
}, { immediate: true })

onBeforeUnmount(() => clearTimeout(timer))

const resolvedSize = computed(() => size ?? 'md')
const indicatorClasses = computed(() => [
  'ud-spin',
  `ud-spin--${color}`,
  `ud-spin--${direction}`,
  typeof resolvedSize.value === 'string' && `ud-spin--${resolvedSize.value}`,
])

const indicatorStyle = computed(() => (typeof resolvedSize.value === 'number'
  ? { '--ud-spin-size': `${resolvedSize.value}px` }
  : undefined))
</script>

<template>
  <div
    v-if="$slots.default"
    class="ud-spin-container"
    :aria-busy="shown || undefined"
  >
    <slot />
    <div
      v-if="shown"
      class="ud-spin-container__mask"
    >
      <div
        :class="indicatorClasses"
        :style="indicatorStyle"
        role="status"
        :aria-label="tip ? undefined : label"
      >
        <svg
          class="ud-spin__ring"
          viewBox="0 0 40 40"
          aria-hidden="true"
        >
          <circle
            cx="20"
            cy="20"
            r="14"
            pathLength="100"
          />
        </svg>
        <span
          v-if="tip"
          class="ud-spin__tip"
        >{{ tip }}</span>
      </div>
    </div>
  </div>
  <div
    v-else-if="shown"
    :class="indicatorClasses"
    :style="indicatorStyle"
    role="status"
    :aria-label="tip ? undefined : label"
  >
    <svg
      class="ud-spin__ring"
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="14"
        pathLength="100"
      />
    </svg>
    <span
      v-if="tip"
      class="ud-spin__tip"
    >{{ tip }}</span>
  </div>
</template>
