<script setup lang="ts">
import type { Component } from 'vue'
import type { AvatarColor, AvatarKind } from '../avatar/types'
import type { TagColor, TagMarker, TagSize, TagStatus, TagVariant } from './types'
import { Close } from '@icon-park/vue-next'
import { computed, useSlots } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import Avatar from '../avatar/Avatar.vue'

const {
  variant = 'property',
  size = 'md',
  color = 'neutral',
  solid = false,
  closable = false,
  disabled = false,
  status = 'pending',
  marker = 'dot',
  statusIcon,
  icon,
  label = '',
  avatarName = '',
  avatarSrc,
  avatarKind = 'person',
  avatarColor = 'blue',
  twoTone = false,
} = defineProps<{
  variant?: TagVariant
  size?: TagSize
  color?: TagColor
  solid?: boolean
  closable?: boolean
  disabled?: boolean
  status?: TagStatus
  marker?: TagMarker
  statusIcon?: Component
  icon?: Component
  label?: string
  avatarName?: string
  avatarSrc?: string
  avatarKind?: AvatarKind
  avatarColor?: AvatarColor
  /** Two-tone avatar-tag background for organisation identities. */
  twoTone?: boolean
}>()

const emit = defineEmits<{ close: [event: MouseEvent] }>()
const slots = useSlots()

const STATUS_COLORS: Record<TagStatus, TagColor> = {
  pending: 'blue',
  success: 'green',
  failure: 'red',
  awaiting: 'orange',
  negative: 'neutral',
}
const AVATAR_SIZES: Record<TagSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 28,
}

const resolvedColor = computed(() => (variant === 'status'
  ? STATUS_COLORS[status]
  : color))
const hasIcon = computed(() => !!icon || !!slots.icon)
const hasLabel = computed(() => !!label || !!slots.default)
const iconOnly = computed(() => hasIcon.value && !hasLabel.value)
const markerVisible = computed(() => variant === 'status' && marker !== 'none')
const avatarSize = computed(() => AVATAR_SIZES[size])
const ariaLabel = computed(() => {
  if (!iconOnly.value)
    return undefined
  return label || undefined
})

const classes = computed(() => [
  'ud-tag',
  `ud-tag--${variant}`,
  `ud-tag--${resolvedColor.value}`,
  variant !== 'property' && `ud-tag--${size}`,
  {
    'ud-tag--solid': solid && (variant === 'property' || variant === 'status'),
    'ud-tag--disabled': disabled,
    'ud-tag--icon-only': iconOnly.value,
    'ud-tag--two-tone': twoTone && variant === 'avatar',
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
    :aria-label="ariaLabel"
    :aria-disabled="disabled || undefined"
  >
    <Avatar
      v-if="variant === 'avatar'"
      class="ud-tag__avatar"
      :src="avatarSrc"
      :name="avatarName"
      :kind="avatarKind"
      :color="avatarColor"
      :size="avatarSize"
    />
    <span
      v-if="markerVisible"
      class="ud-tag__status"
    >
      <slot name="status-icon">
        <ParkIcon
          v-if="statusIcon"
          :icon="statusIcon"
          theme="filled"
        />
        <span
          v-else-if="marker === 'dot'"
          class="ud-tag__dot"
        />
      </slot>
    </span>
    <span
      v-if="hasIcon"
      class="ud-tag__icon"
    ><slot name="icon"><ParkIcon
      v-if="icon"
      :icon="icon"
    /></slot></span>
    <span
      v-if="hasLabel"
      class="ud-tag__label"
    ><slot>{{ label }}</slot></span>
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
