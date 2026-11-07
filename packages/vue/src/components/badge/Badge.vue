<script setup lang="ts">
import type { BadgeColor, BadgeDotSize, BadgePlacement } from './types'
import { More } from '@icon-park/vue-next'
import { computed } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'

const {
  count,
  max = 999,
  dot = false,
  dotSize = 'md',
  color = 'red',
  outline = false,
  plain = false,
  showZero = false,
  hidden = false,
  round = false,
  placement = 'top-right',
} = defineProps<{
  count?: number | string
  max?: number
  dot?: boolean
  dotSize?: BadgeDotSize
  color?: BadgeColor
  outline?: boolean
  plain?: boolean
  showZero?: boolean
  hidden?: boolean
  round?: boolean
  placement?: BadgePlacement
}>()

const overflow = computed(() => typeof count === 'number' && count > max)

const visible = computed(() => {
  if (hidden)
    return false
  if (dot)
    return true
  if (count == null || count === '')
    return false
  return count !== 0 || showZero
})

const classes = computed(() => [
  'ud-badge__mark',
  dot
    ? ['ud-badge__mark--dot', `ud-badge__mark--${dotSize}`]
    : 'ud-badge__mark--count',
  plain && !dot
    ? 'ud-badge__mark--plain'
    : `ud-badge__mark--${color}`,
  { 'ud-badge__mark--outline': outline && dot },
])
</script>

<template>
  <span
    class="ud-badge"
    :class="[
      { 'ud-badge--wrap': !!$slots.default, 'ud-badge--round': round },
      `ud-badge--${placement}`,
    ]"
  >
    <slot />
    <span
      v-if="visible"
      :class="classes"
    >
      <template v-if="!dot">
        <ParkIcon
          v-if="overflow"
          class="ud-badge__more"
          :icon="More"
        />
        <template v-else>{{ count }}</template>
      </template>
    </span>
  </span>
</template>
