<script setup lang="ts">
import type { ToastAction, ToastType } from './types'
import { Attention, CheckOne, Close, CloseOne, Info } from '@icon-park/vue-next'
import { computed } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import Spin from '../spin/Spin.vue'

const {
  type = 'info',
  content = '',
  closable = false,
  actions = [],
} = defineProps<{
  type?: ToastType
  content?: string
  closable?: boolean
  actions?: ToastAction[]
}>()

const emit = defineEmits<{ close: [] }>()

const ICONS = {
  info: Info,
  success: CheckOne,
  error: CloseOne,
  warning: Attention,
}
const icon = computed(() => (type === 'loading'
  ? null
  : ICONS[type]))
</script>

<template>
  <div
    class="ud-toast"
    :class="`ud-toast--${type}`"
    :role="type === 'error' ? 'alert' : 'status'"
  >
    <span class="ud-toast__icon">
      <slot name="icon">
        <Spin
          v-if="type === 'loading'"
          :size="16"
          label=""
        />
        <ParkIcon
          v-else-if="icon"
          :icon="icon"
          theme="filled"
        />
      </slot>
    </span>
    <div class="ud-toast__body">
      <div class="ud-toast__content">
        <slot>{{ content }}</slot>
      </div>
      <div
        v-if="actions.length || $slots.actions"
        class="ud-toast__actions"
      >
        <slot name="actions">
          <button
            v-for="action in actions"
            :key="action.text"
            type="button"
            class="ud-toast__action"
            @click="action.onClick?.($event)"
          >
            {{ action.text }}
          </button>
        </slot>
      </div>
    </div>
    <button
      v-if="closable"
      type="button"
      class="ud-toast__close"
      aria-label="关闭"
      @click="emit('close')"
    >
      <ParkIcon :icon="Close" />
    </button>
  </div>
</template>
