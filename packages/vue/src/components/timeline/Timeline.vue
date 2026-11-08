<script setup lang="ts">
import type { TimelineDirection, TimelineSpacing } from './types'
import { computed, onBeforeUnmount, provide, shallowRef } from 'vue'
import { TIMELINE_KEY } from './context'

const {
  direction = 'right',
  spacing = 'normal',
  collapseTail = 0,
  expandText = '展开',
  collapseText = '收起',
} = defineProps<{
  direction?: TimelineDirection
  spacing?: TimelineSpacing
  /** Collapse this many trailing nodes behind an expand control. */
  collapseTail?: number
  expandText?: string
  collapseText?: string
}>()

let seed = 0
const ids = shallowRef<number[]>([])
const expanded = shallowRef(false)

const hiddenCount = computed(() => Math.min(
  Math.max(0, collapseTail),
  Math.max(0, ids.value.length - 1),
))

provide(TIMELINE_KEY, {
  direction: computed(() => direction),
  spacing: computed(() => spacing),
  ids,
  expanded,
  collapseTail: computed(() => Math.max(0, collapseTail)),
  register() {
    const id = ++seed
    ids.value = [...ids.value, id]
    onBeforeUnmount(() => {
      ids.value = ids.value.filter(item => item !== id)
    })
    return {
      id,
      index: computed(() => ids.value.indexOf(id)),
      last: computed(() => ids.value.indexOf(id) === ids.value.length - 1),
    }
  },
})
</script>

<template>
  <ol
    class="ud-timeline"
    :class="[`ud-timeline--${direction}`, `ud-timeline--${spacing}`]"
  >
    <slot />
    <li
      v-if="hiddenCount && !expanded"
      class="ud-timeline__collapse"
    >
      <button
        type="button"
        class="ud-timeline__collapse-button"
        @click="expanded = true"
      >
        {{ expandText }} {{ hiddenCount }} 个节点
      </button>
    </li>
    <li
      v-else-if="hiddenCount && expanded"
      class="ud-timeline__collapse"
    >
      <button
        type="button"
        class="ud-timeline__collapse-button"
        @click="expanded = false"
      >
        {{ collapseText }}
      </button>
    </li>
  </ol>
</template>
