<script setup lang="ts">
import type { TabValue } from './types'
import { Close } from '@icon-park/vue-next'
import { computed, inject, onBeforeUnmount, onMounted, shallowRef, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { TABS } from './context'

const { value, disabled = false, badge = false, closable = false } = defineProps<{
  value: TabValue
  disabled?: boolean
  /** A character badge; `true` draws a dot that does not add width. */
  badge?: string | number | boolean
  /** Card tabs can close the selected item; closing selects the previous item by default. */
  closable?: boolean
}>()

const emit = defineEmits<{ close: [] }>()
const tabs = inject(TABS, null)
/*
 * A bare `badge` attribute reaches the component as "" because the prop's type
 * union starts with String. Treat that as the dot shorthand; `0` stays a count.
 */
const hasBadge = computed(() => badge !== false && badge != null)
const isDotBadge = computed(() => badge === true || badge === '')
const selected = computed(() => tabs?.model.value === value)
const button = useTemplateRef<HTMLButtonElement>('button')
const host = shallowRef<HTMLElement | null>(null)

const record = {
  value,
  button,
  host,
  disabled: () => disabled,
  label: () => button.value?.querySelector('.ud-tab__text')?.textContent?.trim() ?? '',
}

function onClick() {
  if (disabled || !tabs)
    return
  tabs.model.value = value
}

function onClose(event: MouseEvent) {
  event.stopPropagation()
  if (selected.value && tabs) {
    const index = tabs.items.findIndex(item => item.value === value)
    const previous = tabs.items
      .slice(0, Math.max(0, index))
      .reverse()
      .find(item => !item.disabled())
    if (previous)
      tabs.model.value = previous.value
  }
  emit('close')
}

onMounted(() => {
  host.value = button.value?.closest('.ud-tab-shell') ?? button.value
  tabs?.register(record)
})
onBeforeUnmount(() => tabs?.unregister(value))
watch(() => value, (next, previous) => {
  if (previous !== undefined)
    tabs?.unregister(previous)
  record.value = next
  tabs?.register(record)
}, { flush: 'post' })
</script>

<template>
  <div
    v-if="closable"
    class="ud-tab-shell"
    :class="{ 'ud-tab-shell--selected': selected }"
  >
    <button
      ref="button"
      type="button"
      role="tab"
      class="ud-tab"
      :class="{ 'ud-tab--selected': selected }"
      :aria-selected="selected"
      :tabindex="selected || tabs?.model.value == null ? 0 : -1"
      :disabled="disabled"
      @click="onClick"
    >
      <span class="ud-tab__label">
        <span class="ud-tab__text"><slot /></span>
        <span
          class="ud-tab__sizer"
          aria-hidden="true"
        ><slot /></span>
      </span>
      <!--
        The label clips long text with overflow:hidden, so the indicator lives on the
        button instead: it spans the label width but must not be clipped by it.
      -->
      <span
        v-if="selected"
        class="ud-tab__indicator"
        aria-hidden="true"
      />
      <span
        v-if="hasBadge"
        class="ud-tab__badge"
        :class="{ 'ud-tab__badge--dot': isDotBadge }"
      >{{ isDotBadge ? '' : badge }}</span>
    </button>
    <button
      type="button"
      class="ud-tab__close"
      aria-label="关闭标签页"
      :disabled="disabled"
      @click="onClose"
    >
      <ParkIcon :icon="Close" />
    </button>
  </div>
  <button
    v-else
    ref="button"
    type="button"
    role="tab"
    class="ud-tab"
    :class="{ 'ud-tab--selected': selected }"
    :aria-selected="selected"
    :tabindex="selected || tabs?.model.value == null ? 0 : -1"
    :disabled="disabled"
    @click="onClick"
  >
    <span class="ud-tab__label">
      <span class="ud-tab__text"><slot /></span>
      <span
        class="ud-tab__sizer"
        aria-hidden="true"
      ><slot /></span>
    </span>
    <span
      v-if="selected"
      class="ud-tab__indicator"
      aria-hidden="true"
    />
    <span
      v-if="hasBadge"
      class="ud-tab__badge"
      :class="{ 'ud-tab__badge--dot': isDotBadge }"
    >{{ isDotBadge ? '' : badge }}</span>
  </button>
</template>
