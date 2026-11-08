<script setup lang="ts">
import type { CollapseItemMode, CollapseName, CollapseTextPlacement } from './types'
import { Down, RightOne, Up } from '@icon-park/vue-next'
import { computed, inject } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import Spin from '../spin/Spin.vue'
import { COLLAPSE_KEY } from './context'

const props = defineProps<{
  name: CollapseName
  title?: string
  disabled?: boolean
  loading?: boolean
  /** `text` folds a paragraph and omits the panel header. */
  mode?: CollapseItemMode
  /** Collapsed line count for text mode. The spec suggests 3 or 5 lines. */
  lines?: number
  textPlacement?: CollapseTextPlacement
  /** Whether text mode keeps the "收起" action after expansion. */
  allowCollapse?: boolean
}>()

const collapse = inject(COLLAPSE_KEY)
const opened = computed(() => collapse?.isOpen(props.name) ?? false)
const caret = computed(() => collapse?.arrow() === 'filled')
const locked = computed(() => props.disabled || props.loading)
const textStyle = computed(() => ({
  '-webkit-line-clamp': opened.value
    ? undefined
    : (props.lines ?? 3),
}))

function onClick() {
  if (locked.value)
    return
  collapse?.toggle(props.name)
}
</script>

<template>
  <div
    class="ud-collapse__item"
    :class="{
      'is-open': opened,
      'ud-collapse__item--text': mode === 'text',
      'ud-collapse__text--right': mode === 'text' && textPlacement === 'right',
    }"
  >
    <div
      v-if="mode === 'text'"
      class="ud-collapse__text"
    >
      <div
        class="ud-collapse__text-content"
        :class="{ 'is-clamped': !opened }"
        :style="textStyle"
      >
        <slot />
      </div>
      <button
        v-if="(allowCollapse ?? true) || !opened"
        type="button"
        class="ud-collapse__text-toggle"
        :disabled="disabled"
        :aria-expanded="opened"
        @click="onClick"
      >
        <span>{{ opened ? '收起' : '展开' }}</span>
        <ParkIcon
          class="ud-collapse__text-chevron"
          :icon="opened ? Up : Down"
        />
      </button>
    </div>
    <button
      v-else
      type="button"
      class="ud-collapse__trigger"
      :disabled="disabled"
      :aria-expanded="opened"
      @click="onClick"
    >
      <span
        v-if="caret"
        class="ud-collapse__icon"
      >
        <Spin
          v-if="loading"
          :size="10"
          label="加载中"
        />
        <ParkIcon
          v-else
          class="ud-collapse__chevron"
          :icon="RightOne"
          theme="filled"
        />
      </span>
      <span class="ud-collapse__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span
        v-if="!caret"
        class="ud-collapse__icon"
      >
        <Spin
          v-if="loading"
          :size="16"
          label="加载中"
        />
        <ParkIcon
          v-else
          class="ud-collapse__chevron"
          :icon="Down"
        />
      </span>
    </button>
    <div
      v-if="mode !== 'text'"
      class="ud-collapse__body"
    >
      <div class="ud-collapse__content">
        <div class="ud-collapse__inner">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
