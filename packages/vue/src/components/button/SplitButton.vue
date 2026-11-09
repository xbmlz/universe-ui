<script setup lang="ts">
import type { Component } from 'vue'
import type { DropdownPlacement } from '../dropdown/types'
import type { ButtonSize, ButtonType } from './types'
import { Down } from '@icon-park/vue-next'
import ParkIcon from '../../internal/park-icon.vue'
import Dropdown from '../dropdown/Dropdown.vue'
import Button from './Button.vue'

const {
  text = '',
  type = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  placement = 'bottom-end',
  menuWidth,
  ariaLabel = '更多操作',
  block = false,
} = defineProps<{
  text?: string
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  icon?: Component
  placement?: DropdownPlacement
  menuWidth?: number | string
  ariaLabel?: string
  block?: boolean
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
  select: [command: string | undefined]
}>()
</script>

<template>
  <span
    class="ud-split-button"
    :class="{ 'ud-split-button--block': block }"
  >
    <Button
      class="ud-split-button__main"
      :type="type"
      :size="size"
      :disabled="disabled"
      :loading="loading"
      :icon="icon"
      @click="emit('click', $event)"
    >
      <slot>{{ text }}</slot>
    </Button>
    <span class="ud-split-button__divider" />
    <Dropdown
      trigger="click"
      :placement="placement"
      :width="menuWidth"
      :disabled="disabled || loading"
      @select="emit('select', $event)"
    >
      <Button
        class="ud-split-button__toggle"
        :type="type"
        :size="size"
        :disabled="disabled || loading"
        icon-only
        :aria-label="ariaLabel"
      >
        <template #icon><ParkIcon :icon="Down" /></template>
      </Button>
      <template #menu><slot name="menu" /></template>
    </Dropdown>
  </span>
</template>
