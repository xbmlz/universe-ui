<script setup lang="ts">
import type { StepStatus } from './types'
import { Check, Close, Right } from '@icon-park/vue-next'
import { computed, inject, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { STEPS_KEY } from './context'

const props = defineProps<{
  title: string
  description?: string
  status?: StepStatus
}>()

const steps = inject(STEPS_KEY)
if (!steps)
  throw new Error('StepsItem must be used inside Steps')

const { id, index, setStatus } = steps.register()

const status = computed<StepStatus>(() => {
  if (props.status)
    return props.status
  if (index.value < steps.active.value)
    return 'finish'
  if (index.value === steps.active.value)
    return 'process'
  return 'wait'
})

watch(status, value => setStatus(value), { immediate: true })

const dotted = computed(() => steps.variant.value === 'simple' && steps.direction.value === 'vertical')
const textual = computed(() => steps.variant.value === 'simple' && steps.direction.value === 'horizontal')
const last = computed(() => index.value === steps.ids.value.length - 1)
const nextStatus = computed(() => {
  const following = steps.ids.value[index.value + 1]
  return following == null
    ? undefined
    : steps.statuses.value[following]
})
const lineKind = computed(() => {
  if (dotted.value)
    return 'muted'
  if (nextStatus.value === 'error')
    return 'danger'
  if (status.value === 'finish')
    return 'brand'
  return 'muted'
})

function pick() {
  if (!steps.clickable.value)
    return
  steps.active.value = index.value
}
</script>

<template>
  <li
    class="ud-steps__item"
    :class="`is-${status}`"
    :aria-current="status === 'process' ? 'step' : undefined"
    :role="steps.clickable.value ? 'button' : undefined"
    :tabindex="steps.clickable.value ? 0 : undefined"
    @click="pick"
    @keydown.enter.prevent="pick"
    @keydown.space.prevent="pick"
  >
    <div
      v-if="!textual"
      class="ud-steps__rail"
    >
      <span class="ud-steps__node">
        <slot name="icon">
          <ParkIcon
            v-if="!dotted && status === 'finish'"
            :icon="Check"
          />
          <ParkIcon
            v-else-if="!dotted && status === 'error'"
            :icon="Close"
          />
          <template v-else-if="!dotted">
            {{ index + 1 }}
          </template>
        </slot>
      </span>
      <span
        v-if="!last"
        class="ud-steps__line"
        :class="`is-${lineKind}`"
      />
    </div>
    <div class="ud-steps__main">
      <div class="ud-steps__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="description || $slots.description"
        class="ud-steps__description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
    <span
      v-if="textual && !last"
      class="ud-steps__sep"
      aria-hidden="true"
    >
      <ParkIcon :icon="Right" />
    </span>
  </li>
</template>
