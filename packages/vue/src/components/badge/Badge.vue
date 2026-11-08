<script setup lang="ts">
import type { Component } from 'vue'
import type { BadgeColor, BadgeCornerPlacement, BadgeDotSize, BadgePlacement } from './types'
import { More } from '@icon-park/vue-next'
import { computed, useSlots } from 'vue'
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
  icon,
  tone,
  ring = false,
  corner = false,
  cornerPlacement = 'top-right',
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
  icon?: Component
  /** A 1-based colour from the 39-colour collaboration palette. */
  tone?: number
  /** Draws the 2px white ring used by collaboration badges on avatars. */
  ring?: boolean
  /** Renders a corner ribbon instead of a mark on the top or bottom edge. */
  corner?: boolean
  cornerPlacement?: BadgeCornerPlacement
}>()

const slots = useSlots()
const overflow = computed(() => typeof count === 'number' && count > max)
const hasIcon = computed(() => !!icon || !!slots.icon)
const hasCornerContent = computed(() => !!count || count === 0 || !!slots.corner)

const visible = computed(() => {
  if (hidden || corner)
    return false
  if (dot)
    return true
  if (hasIcon.value)
    return true
  if (count == null || count === '')
    return false
  return count !== 0 || showZero
})
const cornerVisible = computed(() => corner && !hidden && hasCornerContent.value)
const resolvedTone = computed(() => (tone == null
  ? null
  : Math.min(39, Math.max(1, Math.round(tone)))))
const toneStyle = computed(() => (resolvedTone.value == null
  ? undefined
  : { '--ud-badge-bg': `var(--ud-collab-${resolvedTone.value})` }))

const classes = computed(() => [
  'ud-badge__mark',
  dot && !hasIcon.value
    ? ['ud-badge__mark--dot', `ud-badge__mark--${dotSize}`]
    : hasIcon.value
      ? 'ud-badge__mark--icon'
      : 'ud-badge__mark--count',
  plain && !dot
    ? 'ud-badge__mark--plain'
    : `ud-badge__mark--${color}`,
  {
    'ud-badge__mark--outline': outline && dot,
    'ud-badge__mark--ring': ring,
  },
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
      :style="toneStyle"
    >
      <template v-if="!dot">
        <slot name="icon">
          <ParkIcon
            v-if="hasIcon"
            :icon="icon"
          />
          <ParkIcon
            v-if="overflow"
            class="ud-badge__more"
            :icon="More"
          />
        </slot>
        <template v-if="!hasIcon && !overflow">{{ count }}</template>
      </template>
    </span>
    <span
      v-if="cornerVisible"
      class="ud-badge__corner"
      :class="`ud-badge__corner--${cornerPlacement}`"
    >
      <slot name="corner">{{ count }}</slot>
    </span>
  </span>
</template>
