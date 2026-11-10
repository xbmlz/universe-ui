<script setup lang="ts">
import type { Component } from 'vue'
import { Star } from '@icon-park/vue-next'
import { computed, shallowRef } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'

/*
 * Specified in rate.md: a 32x32 item with a 16px gap, a 28px icon that grows to 32px
 * on hover, N300 for unselected and Y500 for hover/selected, a default step of 1 with
 * an optional 0.5 step (left half gives half, right half gives a whole star), and a
 * hint that sits 12px under the stars and stays after selection. The default hints
 * come from the hint figure, which also shows a "click to rate" line before any
 * choice is made; a half star reuses the next whole star's hint.
 */
const {
  count = 5,
  allowHalf = false,
  clearable = true,
  disabled = false,
  readonly = false,
  showText = false,
  texts,
  emptyText = '点击评分',
  icon = Star,
  label = '评分',
} = defineProps<{
  count?: number
  allowHalf?: boolean
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  showText?: boolean
  texts?: string[]
  emptyText?: string
  icon?: Component
  label?: string
}>()

const model = defineModel<number>({ default: 0 })

const DEFAULT_TEXTS = ['很差', '较差', '一般', '较好', '很好']

const hover = shallowRef<number | null>(null)
const items = computed(() => Array.from({ length: count }, (_, index) => index))
const display = computed(() => hover.value ?? model.value)
const interactive = computed(() => !disabled && !readonly)

const text = computed(() => {
  if (!showText)
    return ''
  if (display.value <= 0)
    return emptyText
  /* A half star reads as the next whole star, per rate.md. */
  const index = Math.min(count - 1, Math.ceil(display.value) - 1)
  return (texts ?? DEFAULT_TEXTS)[index] ?? ''
})

function valueAt(index: number, event: PointerEvent | MouseEvent) {
  if (!allowHalf)
    return index + 1
  const item = event.currentTarget
  if (!(item instanceof HTMLElement))
    return index + 1
  const rect = item.getBoundingClientRect()
  return event.clientX - rect.left < rect.width / 2
    ? index + 0.5
    : index + 1
}

function onHover(event: PointerEvent, index: number) {
  if (!interactive.value)
    return
  hover.value = valueAt(index, event)
}

function pick(event: MouseEvent, index: number) {
  if (!interactive.value)
    return
  const value = valueAt(index, event)
  model.value = clearable && value === model.value
    ? 0
    : value
}

/* A key press has no pointer position, so it always takes the whole star. */
function pickKeyboard(index: number) {
  if (!interactive.value)
    return
  model.value = clearable && model.value === index + 1
    ? 0
    : index + 1
}

function fillPercent(index: number) {
  return Math.min(1, Math.max(0, display.value - index)) * 100
}
</script>

<template>
  <div
    class="ud-rate"
    :class="{ 'ud-rate--disabled': disabled, 'ud-rate--readonly': readonly }"
  >
    <div
      class="ud-rate__stars"
      role="radiogroup"
      :aria-label="label"
      :aria-disabled="disabled || undefined"
    >
      <span
        v-for="index in items"
        :key="index"
        class="ud-rate__item"
        role="radio"
        :aria-checked="model === index + 1 || (allowHalf && model === index + 0.5)"
        :aria-label="`${index + 1} 分`"
        :tabindex="interactive ? 0 : -1"
        @pointermove="onHover($event, index)"
        @pointerleave="hover = null"
        @click="pick($event, index)"
        @keydown.enter.prevent="pickKeyboard(index)"
        @keydown.space.prevent="pickKeyboard(index)"
      >
        <span class="ud-rate__icon ud-rate__icon--base">
          <ParkIcon
            :icon="icon"
            theme="filled"
          />
        </span>
        <span
          class="ud-rate__icon ud-rate__icon--fill"
          :style="{ clipPath: `inset(0 ${100 - fillPercent(index)}% 0 0)` }"
        >
          <ParkIcon
            :icon="icon"
            theme="filled"
          />
        </span>
      </span>
    </div>
    <span
      v-if="showText && text"
      class="ud-rate__text"
    >{{ text }}</span>
  </div>
</template>
