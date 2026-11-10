<script setup lang="ts">
import type { CollapseHitArea, CollapseItemMode, CollapseName, CollapseTextPlacement } from './types'
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
  /** Override the parent Collapse hitArea. */
  hitArea?: CollapseHitArea
  /** Nested-table selected wash (B500*8%). Only with row hit area. */
  selected?: boolean
}>()

const collapse = inject(COLLAPSE_KEY)
const opened = computed(() => collapse?.isOpen(props.name) ?? false)
const caret = computed(() => collapse?.arrow() === 'filled')
const hit = computed(() => props.hitArea ?? collapse?.hitArea() ?? 'row')
const nested = computed(() => collapse?.nested() ?? false)
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
      'is-selected': selected,
      'is-disabled': disabled,
      'is-loading': loading,
      'ud-collapse__item--text': mode === 'text',
      'ud-collapse__text--right': mode === 'text' && textPlacement === 'right',
      [`ud-collapse__item--hit-${hit}`]: mode !== 'text',
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
    <div
      v-else
      class="ud-collapse__header"
      :class="{
        'is-selected': selected && hit === 'row' && nested,
      }"
    >
      <!-- Row: whole header is the control. -->
      <button
        v-if="hit === 'row'"
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

      <!-- Icon: only the arrow is the control; title is plain text. -->
      <template v-else-if="hit === 'icon'">
        <button
          v-if="caret"
          type="button"
          class="ud-collapse__icon-btn"
          :disabled="disabled || loading"
          :aria-expanded="opened"
          :aria-label="opened ? '收起' : '展开'"
          @click="onClick"
        >
          <span class="ud-collapse__icon">
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
        </button>
        <span class="ud-collapse__title">
          <slot name="title">{{ title }}</slot>
        </span>
        <button
          v-if="!caret"
          type="button"
          class="ud-collapse__icon-btn"
          :disabled="disabled || loading"
          :aria-expanded="opened"
          :aria-label="opened ? '收起' : '展开'"
          @click="onClick"
        >
          <span class="ud-collapse__icon">
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
      </template>

      <!-- Area: compact icon+title group; width follows content. -->
      <button
        v-else
        type="button"
        class="ud-collapse__area"
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
    </div>
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
