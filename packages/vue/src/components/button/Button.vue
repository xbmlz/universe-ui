<script setup lang="ts">
import type { Component } from 'vue'
import type { ButtonFloatPosition, ButtonFloatSize, ButtonIconPosition, ButtonSize, ButtonType } from './types'
import { computed, inject, useSlots, useTemplateRef } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import Spin from '../spin/Spin.vue'
import { BUTTON_GROUP_SIZE } from './context'

const {
  type = 'secondary',
  size,
  disabled = false,
  loading = false,
  block = false,
  round = false,
  htmlType = 'button',
  icon,
  iconPosition = 'left',
  iconOnly = false,
  float = false,
  floatSize = 'md',
  floatPosition = 'bottom-right',
  floatOffset = 24,
} = defineProps<{
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  block?: boolean
  round?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  icon?: Component
  iconPosition?: ButtonIconPosition
  iconOnly?: boolean
  float?: boolean
  floatSize?: ButtonFloatSize
  floatPosition?: ButtonFloatPosition
  /** Inferred page edge offset for a fixed floating button, following the 4N rule. */
  floatOffset?: number | string
}>()

const groupSize = inject(BUTTON_GROUP_SIZE, undefined)
const slots = useSlots()
const buttonRef = useTemplateRef<HTMLButtonElement>('button')
const resolvedSize = computed(() => size ?? groupSize?.value ?? 'md')
const hasIcon = computed(() => !!icon || !!slots.icon)
const isIconOnly = computed(() => iconOnly || (hasIcon.value && !slots.default))
const floatClasses = computed(() => (float
  ? [`ud-button--float-${floatSize}`, `ud-button--float-${floatPosition}`]
  : []))
const classes = computed(() => [
  'ud-button',
  `ud-button--${type}`,
  `ud-button--${resolvedSize.value}`,
  {
    'ud-button--block': block,
    'ud-button--round': round,
    'ud-button--loading': loading,
    'ud-button--icon-only': isIconOnly.value,
    'ud-button--float': float,
  },
  ...floatClasses.value,
])
const style = computed(() => (float
  ? {
      '--ud-button-float-offset': typeof floatOffset === 'number'
        ? `${floatOffset}px`
        : floatOffset,
    }
  : undefined))

function onClick(event: MouseEvent) {
  if (!loading)
    return
  event.preventDefault()
  event.stopPropagation()
}

function focus() {
  buttonRef.value?.focus()
}

defineExpose({ focus })
</script>

<template>
  <button
    ref="button"
    :class="classes"
    :style="style"
    :type="htmlType"
    :disabled="disabled"
    :aria-busy="loading || undefined"
    @click="onClick"
  >
    <span
      v-if="hasIcon && iconPosition === 'left'"
      class="ud-button__icon"
    ><slot name="icon"><ParkIcon
      v-if="icon"
      :icon="icon"
    /></slot></span>
    <Spin
      v-if="loading"
      class="ud-button__spinner"
      :style="{
        '--ud-spin-size': '14px',
        '--ud-spin-color': 'var(--ud-button-spinner-color)',
      }"
      aria-hidden="true"
    />
    <span
      v-if="!isIconOnly"
      class="ud-button__label"
    ><slot /></span>
    <span
      v-if="hasIcon && iconPosition === 'right'"
      class="ud-button__icon"
    ><slot name="icon"><ParkIcon
      v-if="icon"
      :icon="icon"
    /></slot></span>
  </button>
</template>
