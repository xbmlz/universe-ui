<script setup lang="ts">
import type { TimelineStatus } from './types'
import { Attention, Check, Close } from '@icon-park/vue-next'
import { computed, inject } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { TIMELINE_KEY } from './context'

const {
  title,
  time,
  status = 'wait',
} = defineProps<{
  title?: string
  time?: string
  status?: TimelineStatus
}>()

const timeline = inject(TIMELINE_KEY)
if (!timeline)
  throw new Error('TimelineItem must be used inside Timeline')

const { index, last } = timeline.register()

const side = computed<'left' | 'right'>(() => {
  if (timeline.direction.value === 'alternate') {
    return index.value % 2 === 0
      ? 'right'
      : 'left'
  }
  return timeline.direction.value
})

const first = computed(() => index.value === 0)
const hidden = computed(() => timeline.collapseTail.value > 0
  && !timeline.expanded.value
  && index.value >= timeline.ids.value.length - timeline.collapseTail.value)

const badge = computed(() => {
  if (status === 'success' || status === 'warning' || status === 'error' || status === 'failed' || status === 'loading')
    return status
  return 'dot'
})
</script>

<template>
  <li
    v-if="!hidden"
    class="ud-timeline__item"
    :class="[`is-${side}`, `is-${status}`]"
  >
    <div class="ud-timeline__rail">
      <span
        v-if="!first"
        class="ud-timeline__line ud-timeline__line--before"
        aria-hidden="true"
      />
      <span class="ud-timeline__dot">
        <slot name="icon">
          <span
            v-if="badge === 'loading'"
            class="ud-timeline__spinner"
            aria-hidden="true"
          />
          <ParkIcon
            v-else-if="badge === 'success'"
            :icon="Check"
          />
          <ParkIcon
            v-else-if="badge === 'warning'"
            :icon="Attention"
          />
          <ParkIcon
            v-else-if="badge === 'error' || badge === 'failed'"
            :icon="Close"
          />
        </slot>
      </span>
      <span
        v-if="!last && status !== 'failed'"
        class="ud-timeline__line ud-timeline__line--after"
        aria-hidden="true"
      />
    </div>
    <div class="ud-timeline__content">
      <div
        v-if="time || $slots.time"
        class="ud-timeline__time"
      >
        <slot name="time">
          {{ time }}
        </slot>
      </div>
      <div
        v-if="title || $slots.title"
        class="ud-timeline__title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="$slots.default"
        class="ud-timeline__description"
      >
        <slot />
      </div>
    </div>
  </li>
</template>
