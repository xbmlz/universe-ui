<script setup lang="ts">
import type { StepsDirection, StepStatus, StepsVariant } from './types'
import { computed, onBeforeUnmount, provide, shallowRef } from 'vue'
import { STEPS_KEY } from './context'

const props = withDefaults(defineProps<{
  direction?: StepsDirection
  variant?: StepsVariant
  clickable?: boolean
}>(), {
  direction: 'horizontal',
  variant: 'basic',
  clickable: false,
})

const active = defineModel<number>({ default: 0 })

let seed = 0
const ids = shallowRef<number[]>([])
const statuses = shallowRef<Record<number, StepStatus>>({})

provide(STEPS_KEY, {
  active,
  clickable: computed(() => props.clickable),
  direction: computed(() => props.direction),
  variant: computed(() => props.variant),
  ids,
  statuses,
  register() {
    const id = ++seed
    ids.value = [...ids.value, id]
    const index = computed(() => ids.value.indexOf(id))
    onBeforeUnmount(() => {
      ids.value = ids.value.filter(item => item !== id)
      const next = { ...statuses.value }
      delete next[id]
      statuses.value = next
    })
    return {
      id,
      index,
      setStatus(status: StepStatus) {
        if (statuses.value[id] === status)
          return
        statuses.value = { ...statuses.value, [id]: status }
      },
    }
  },
})
</script>

<template>
  <ol
    class="ud-steps"
    :class="[`ud-steps--${direction}`, `ud-steps--${variant}`, { 'is-clickable': clickable }]"
  >
    <slot />
  </ol>
</template>
