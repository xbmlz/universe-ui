<script setup lang="ts">
import type { CardRadius, CardShadow, CardSurface } from './types'
import { computed } from 'vue'

/*
 * Specified in card.md: content padding 12px, a 12px gap between the title and the
 * content, an N300 1px inner border, and Shadow-S/M/L-down for the normal, hover and
 * drag states. The radius per card size is left to the scenario; the default `m`
 * (8px) follows the layout radius scale and is inferred.
 */
const {
  shadow = 'none',
  border = true,
  radius = 'm',
  padding = 12,
  surface = 'white',
  hoverable = false,
  clickable = false,
  draggable = false,
  dragging = false,
  title,
  subtitle,
} = defineProps<{
  shadow?: CardShadow
  border?: boolean
  radius?: CardRadius
  padding?: number | string
  /** N00 white by default; use muted on an N00 page to keep the card separated. */
  surface?: CardSurface
  hoverable?: boolean
  clickable?: boolean
  /** Enables native drag events; the parent list owns the reorder operation. */
  draggable?: boolean
  /** The caller is moving this card; applies the specified 95% opacity and L shadow. */
  dragging?: boolean
  title?: string
  subtitle?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
  dragstart: [event: DragEvent]
  dragend: [event: DragEvent]
}>()

const classes = computed(() => [
  'ud-card',
  `ud-card--shadow-${shadow}`,
  `ud-card--radius-${radius}`,
  `ud-card--surface-${surface}`,
  {
    'ud-card--border': border,
    'ud-card--hoverable': hoverable,
    'ud-card--clickable': clickable,
    'ud-card--dragging': dragging,
  },
])

const style = computed(() => ({
  '--ud-card-padding': typeof padding === 'number'
    ? `${padding}px`
    : padding,
}))

function onClick(event: MouseEvent) {
  if (clickable)
    emit('click', event)
}

function onDragStart(event: DragEvent) {
  emit('dragstart', event)
}

function onDragEnd(event: DragEvent) {
  emit('dragend', event)
}
</script>

<template>
  <article
    class="ud-card"
    :class="classes"
    :style="style"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    :draggable="draggable || undefined"
    @click="onClick"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @keydown.enter="clickable && emit('click', $event as unknown as MouseEvent)"
    @keydown.space.prevent="clickable && emit('click', $event as unknown as MouseEvent)"
  >
    <div
      v-if="$slots.cover"
      class="ud-card__cover"
    >
      <slot name="cover" />
    </div>
    <header
      v-if="$slots.header || title || $slots.title || subtitle || $slots.subtitle || $slots.extra"
      class="ud-card__header"
    >
      <div class="ud-card__titles">
        <div
          v-if="title || $slots.title"
          class="ud-card__title"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div
          v-if="subtitle || $slots.subtitle"
          class="ud-card__subtitle"
        >
          <slot name="subtitle">
            {{ subtitle }}
          </slot>
        </div>
      </div>
      <div
        v-if="$slots.extra"
        class="ud-card__extra"
      >
        <slot name="extra" />
      </div>
    </header>
    <div class="ud-card__body">
      <slot />
    </div>
    <footer
      v-if="$slots.footer || $slots.actions"
      class="ud-card__footer"
    >
      <slot name="footer" />
      <div
        v-if="$slots.actions"
        class="ud-card__actions"
      >
        <slot name="actions" />
      </div>
    </footer>
  </article>
</template>
