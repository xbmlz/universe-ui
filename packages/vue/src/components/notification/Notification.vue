<script setup lang="ts">
import type { NotificationAction, NotificationColor, NotificationType } from './types'
import { Attention, CheckOne, Close, CloseOne, Info } from '@icon-park/vue-next'
import { computed, useSlots } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import Button from '../button/Button.vue'

const {
  type = 'info',
  title = '',
  content = '',
  closable = true,
  showIcon = true,
  color,
  actions = [],
} = defineProps<{
  type?: NotificationType
  title?: string
  content?: string
  closable?: boolean
  showIcon?: boolean
  color?: NotificationColor
  actions?: NotificationAction[]
}>()

const emit = defineEmits<{ close: [] }>()
const slots = useSlots()

const ICONS = {
  info: Info,
  success: CheckOne,
  error: CloseOne,
  warning: Attention,
}
const TYPE_COLOR: Record<NotificationType, NotificationColor> = {
  info: 'blue',
  success: 'green',
  warning: 'orange',
  error: 'red',
}

const stripe = computed(() => color ?? TYPE_COLOR[type])
const custom = computed(() => !!slots.custom)
const hasTitle = computed(() => !!title || !!slots.title)
const hasActions = computed(() => actions.length > 0 || !!slots.actions)

function actionType(action: NotificationAction, index: number) {
  return action.type ?? (index === actions.length - 1
    ? 'primary'
    : 'secondary')
}
</script>

<template>
  <div
    class="ud-notification"
    :class="[
      `ud-notification--${stripe}`,
      { 'ud-notification--custom': custom, 'ud-notification--closable': closable },
    ]"
    :role="type === 'error' ? 'alert' : 'status'"
  >
    <div
      v-if="custom"
      class="ud-notification__custom"
    >
      <slot name="custom" />
    </div>
    <div
      v-else
      class="ud-notification__main"
      :class="{ 'ud-notification__main--icon': showIcon, 'ud-notification__main--titled': hasTitle }"
    >
      <span
        v-if="showIcon"
        class="ud-notification__icon"
        :class="`ud-notification__icon--${type}`"
      >
        <slot name="icon"><ParkIcon
          :icon="ICONS[type]"
          theme="filled"
        /></slot>
      </span>
      <div
        v-if="hasTitle"
        class="ud-notification__title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="ud-notification__content">
        <slot>{{ content }}</slot>
      </div>
      <div
        v-if="hasActions"
        class="ud-notification__actions"
      >
        <slot name="actions">
          <Button
            v-for="(action, index) in actions"
            :key="action.text"
            :type="actionType(action, index)"
            @click="action.onClick?.($event)"
          >
            {{ action.text }}
          </Button>
        </slot>
      </div>
    </div>
    <button
      v-if="closable"
      type="button"
      class="ud-notification__close"
      aria-label="关闭"
      @click="emit('close')"
    >
      <ParkIcon :icon="Close" />
    </button>
  </div>
</template>
