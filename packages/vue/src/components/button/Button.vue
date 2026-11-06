<script setup lang="ts" vapor>
import { computed, inject, useTemplateRef } from 'vue'
import { BUTTON_GROUP_SIZE } from './context'
import type { ButtonSize, ButtonType } from './types'

const {
  type = 'secondary',
  size,
  disabled = false,
  loading = false,
  block = false,
  round = false,
  htmlType = 'button',
} = defineProps<{
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  block?: boolean
  round?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
}>()

const groupSize = inject(BUTTON_GROUP_SIZE, undefined)
const buttonRef = useTemplateRef<HTMLButtonElement>('button')
const resolvedSize = computed(() => size ?? groupSize?.value ?? 'md')
const classes = computed(() => [
  'ud-button',
  `ud-button--${type}`,
  `ud-button--${resolvedSize.value}`,
  {
    'ud-button--block': block,
    'ud-button--round': round,
    'ud-button--loading': loading,
  },
])

function onClick(event: MouseEvent) {
  if (!loading) return
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
    :type="htmlType"
    :disabled="disabled"
    :aria-busy="loading || undefined"
    @click="onClick"
  >
    <span v-if="loading" class="ud-button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>
