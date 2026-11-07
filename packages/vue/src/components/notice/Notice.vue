<script setup lang="ts">
import type { NoticeAction, NoticeActionPlacement, NoticeAlign, NoticeType } from './types'
import { Attention, CheckOne, Close, CloseOne, Info } from '@icon-park/vue-next'
import { computed, useSlots } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'

const {
  type = 'info',
  title = '',
  content = '',
  closable = false,
  actions = [],
  align = 'left',
  actionPlacement = 'end',
  showIcon = true,
  banner = false,
  maxLines,
} = defineProps<{
  type?: NoticeType
  title?: string
  content?: string
  closable?: boolean
  actions?: NoticeAction[]
  align?: NoticeAlign
  actionPlacement?: NoticeActionPlacement
  showIcon?: boolean
  banner?: boolean
  maxLines?: number
}>()

const emit = defineEmits<{ close: [] }>()
const open = defineModel<boolean>('open', { default: true })
const slots = useSlots()

const ICONS = {
  info: Info,
  success: CheckOne,
  error: CloseOne,
  warning: Attention,
}

const centered = computed(() => align === 'center')
const hasTitle = computed(() => !centered.value && (!!title || !!slots.title))
const hasActions = computed(() => actions.length > 0 || !!slots.actions)

function close() {
  open.value = false
  emit('close')
}
</script>

<template>
  <div
    v-if="open"
    class="ud-notice"
    :class="[
      `ud-notice--${type}`,
      {
        'ud-notice--center': centered,
        'ud-notice--titled': hasTitle,
        'ud-notice--follow': actionPlacement === 'follow' || centered,
        'ud-notice--banner': banner,
        'ud-notice--closable': closable,
      },
    ]"
    :role="type === 'error' ? 'alert' : 'status'"
  >
    <div class="ud-notice__main">
      <span
        v-if="showIcon"
        class="ud-notice__icon"
      >
        <slot name="icon"><ParkIcon
          :icon="ICONS[type]"
          theme="filled"
        /></slot>
      </span>
      <div class="ud-notice__body">
        <div
          v-if="hasTitle"
          class="ud-notice__title"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div
          class="ud-notice__content"
          :class="{ 'ud-notice__content--clamp': !!maxLines }"
          :style="maxLines ? { '-webkit-line-clamp': maxLines } : undefined"
        >
          <slot>{{ content }}</slot>
        </div>
        <div
          v-if="hasActions"
          class="ud-notice__actions"
        >
          <slot name="actions">
            <button
              v-for="action in actions"
              :key="action.text"
              type="button"
              class="ud-notice__action"
              @click="action.onClick?.($event)"
            >
              {{ action.text }}
            </button>
          </slot>
        </div>
      </div>
    </div>
    <button
      v-if="closable"
      type="button"
      class="ud-notice__close"
      aria-label="关闭"
      @click="close"
    >
      <ParkIcon :icon="Close" />
    </button>
  </div>
</template>
