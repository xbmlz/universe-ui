<script setup lang="ts">
import type { TimelineDirection, TimelineSpacing } from './types'
import { Down, Up } from '@icon-park/vue-next'
import { computed, nextTick, onBeforeUnmount, provide, shallowRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import Spin from '../spin/Spin.vue'
import { TIMELINE_KEY } from './context'

const props = withDefaults(defineProps<{
  direction?: TimelineDirection
  spacing?: TimelineSpacing
  /** Collapse this many trailing nodes behind an expand control. */
  collapseTail?: number
  /** Prefix before the count. Default label is `已收起 N 个节点`. */
  expandText?: string
  collapseText?: string
  /** Shown with a spinner while `collapseLoading` is true. */
  loadingText?: string
  /** Host-driven loading while folded nodes are being prepared. */
  collapseLoading?: boolean
}>(), {
  direction: 'right',
  spacing: 'normal',
  collapseTail: 0,
  collapseText: '收起',
  // Figure copy: "It is unfolding."
  loadingText: '正在展开',
  collapseLoading: false,
})

const emit = defineEmits<{
  expand: []
  collapse: []
}>()

let seed = 0
const ids = shallowRef<number[]>([])
const expanded = shallowRef(false)
const expandRequested = shallowRef(false)

const hiddenCount = computed(() => Math.min(
  Math.max(0, props.collapseTail),
  Math.max(0, ids.value.length - 1),
))

// Figure copy: "N nodes are collected" — same string for normal and hover.
const expandLabel = computed(() => props.expandText
  ? `${props.expandText} ${hiddenCount.value} 个节点`
  : `已收起 ${hiddenCount.value} 个节点`)

provide(TIMELINE_KEY, {
  direction: computed(() => props.direction),
  spacing: computed(() => props.spacing),
  ids,
  expanded,
  collapseTail: computed(() => Math.max(0, props.collapseTail)),
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

function openExpanded() {
  expanded.value = true
  expandRequested.value = false
}

function onExpandClick() {
  if (props.collapseLoading || expandRequested.value)
    return
  expandRequested.value = true
  emit('expand')
  // Sync expand when the host does not flip collapseLoading in this turn.
  nextTick(() => {
    if (expandRequested.value && !props.collapseLoading)
      openExpanded()
  })
}

function onCollapseClick() {
  if (props.collapseLoading)
    return
  expanded.value = false
  expandRequested.value = false
  emit('collapse')
}

watch(() => props.collapseLoading, (loading, was) => {
  if (was && !loading && expandRequested.value)
    openExpanded()
})
</script>

<template>
  <ol
    class="ud-timeline"
    :class="[`ud-timeline--${props.direction}`, `ud-timeline--${props.spacing}`]"
  >
    <slot />
    <li
      v-if="hiddenCount && !expanded"
      class="ud-timeline__collapse"
    >
      <button
        type="button"
        class="ud-timeline__collapse-button"
        :class="{ 'is-loading': props.collapseLoading }"
        :disabled="props.collapseLoading"
        :aria-busy="props.collapseLoading || undefined"
        @click="onExpandClick"
      >
        <template v-if="props.collapseLoading">
          <span>{{ props.loadingText }}</span>
          <Spin
            size="sm"
            label="正在展开"
          />
        </template>
        <template v-else>
          <span>{{ expandLabel }}</span>
          <ParkIcon
            class="ud-timeline__collapse-chevron"
            :icon="Down"
          />
        </template>
      </button>
    </li>
    <li
      v-else-if="hiddenCount && expanded"
      class="ud-timeline__collapse"
    >
      <button
        type="button"
        class="ud-timeline__collapse-button"
        @click="onCollapseClick"
      >
        <span>{{ props.collapseText }}</span>
        <ParkIcon
          class="ud-timeline__collapse-chevron"
          :icon="Up"
        />
      </button>
    </li>
  </ol>
</template>
