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
  size,
  disabled = false,
  loading = false,
  icon,
  placement = 'bottom-start',
  menuWidth,
  block = false,
  ariaLabel = '更多操作',
} = defineProps<{
  text?: string
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  icon?: Component
  placement?: DropdownPlacement
  menuWidth?: number | string
  block?: boolean
  ariaLabel?: string
}>()

const emit = defineEmits<{
  select: [command: string | undefined]
}>()

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <span
    class="ud-menu-button"
    :class="{ 'ud-menu-button--block': block }"
  >
    <Dropdown
      v-model:open="open"
      trigger="click"
      :placement="placement"
      :width="menuWidth"
      :disabled="disabled || loading"
      @select="emit('select', $event)"
    >
      <Button
        :type="type"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        :block="block"
        :aria-label="ariaLabel"
        aria-haspopup="menu"
        :aria-expanded="open"
      >
        <ParkIcon
          v-if="icon"
          class="ud-menu-button__icon"
          :icon="icon"
        />
        <slot>{{ text }}</slot>
        <ParkIcon
          class="ud-menu-button__arrow"
          :icon="Down"
        />
      </Button>
      <template #menu><slot name="menu" /></template>
    </Dropdown>
  </span>
</template>
