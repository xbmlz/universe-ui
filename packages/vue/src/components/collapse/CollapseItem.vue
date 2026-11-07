<script setup lang="ts">
import type { CollapseName } from './types'
import { Down, RightOne } from '@icon-park/vue-next'
import { computed, inject } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import Spin from '../spin/Spin.vue'
import { COLLAPSE_KEY } from './context'

const props = defineProps<{
  name: CollapseName
  title?: string
  disabled?: boolean
  loading?: boolean
}>()

const collapse = inject(COLLAPSE_KEY)
const opened = computed(() => collapse?.isOpen(props.name) ?? false)
const caret = computed(() => collapse?.arrow() === 'filled')
const locked = computed(() => props.disabled || props.loading)

function onClick() {
  if (locked.value)
    return
  collapse?.toggle(props.name)
}
</script>

<template>
  <div
    class="ud-collapse__item"
    :class="{ 'is-open': opened }"
  >
    <button
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
    <div class="ud-collapse__body">
      <div class="ud-collapse__content">
        <div class="ud-collapse__inner">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
