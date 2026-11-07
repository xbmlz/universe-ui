<script setup lang="ts">
import type { PaginationSize } from './types'
import { DoubleLeft, DoubleRight, Left, More, Right } from '@icon-park/vue-next'
import { computed, getCurrentInstance, shallowRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import Select from '../select/Select.vue'
import { pagerEntries } from './pager'

const props = withDefaults(defineProps<{
  total?: number
  pageSizes?: number[]
  size?: PaginationSize
  disabled?: boolean
  showTotal?: boolean
  showSizes?: boolean
  showJumper?: boolean
}>(), {
  total: 0,
  pageSizes: () => [10, 20, 50, 100],
  size: 'md',
  disabled: false,
})

const page = defineModel<number>('page', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 10 })

const draft = shallowRef('')
const moreHover = shallowRef<'prev-more' | 'next-more' | ''>('')

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / Math.max(1, pageSize.value))))
const entries = computed(() => pagerEntries(page.value, pageCount.value))
const compact = computed(() => props.size === 'sm')
const instance = getCurrentInstance()

function passed(name: 'showTotal' | 'showSizes' | 'showJumper') {
  const raw = instance?.vnode.props
  const kebab = name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
  if (raw && (name in raw || kebab in raw))
    return Boolean(props[name])
  return !compact.value
}

const totalShown = computed(() => passed('showTotal'))
const sizesShown = computed(() => passed('showSizes'))
const jumperShown = computed(() => passed('showJumper'))
const jumperDisabled = computed(() => props.disabled || pageCount.value <= 1)
const sizeOptions = computed(() => props.pageSizes.map(size => ({
  value: String(size),
  label: `${size} 条/页`,
})))
const sizeValue = computed({
  get: () => String(pageSize.value),
  set: (value: string | string[] | null) => {
    if (typeof value !== 'string')
      return
    const next = Number(value)
    if (Number.isFinite(next) && next > 0)
      pageSize.value = next
  },
})

watch(pageCount, (count) => {
  if (page.value > count)
    page.value = count
  if (page.value < 1)
    page.value = 1
})

watch(page, () => {
  draft.value = ''
})

function go(next: number) {
  if (props.disabled)
    return
  const clamped = Math.min(pageCount.value, Math.max(1, next))
  if (clamped !== page.value)
    page.value = clamped
}

function onDraft(event: Event) {
  const value = event.target instanceof HTMLInputElement
    ? event.target.value
    : ''
  draft.value = value.replace(/\D/g, '')
}

function commit() {
  if (jumperDisabled.value)
    return
  if (draft.value === '')
    return
  const value = Number(draft.value)
  if (value > pageCount.value) {
    go(pageCount.value)
    draft.value = ''
    return
  }
  go(value <= 0
    ? 1
    : value)
}

function jumpWidth() {
  const extra = Math.max(0, draft.value.length - 2)
  return `${48 + extra * 8}px`
}
</script>

<template>
  <nav
    class="ud-pagination"
    :class="{ 'ud-pagination--sm': compact }"
    aria-label="分页"
  >
    <span
      v-if="totalShown"
      class="ud-pagination__total"
    >共 {{ total }} 条</span>
    <div class="ud-pagination__pager">
      <button
        type="button"
        class="ud-pagination__btn"
        aria-label="上一页"
        :disabled="disabled || page <= 1"
        @click="go(page - 1)"
      >
        <ParkIcon :icon="Left" />
      </button>
      <template
        v-for="(entry, index) in entries"
        :key="`${entry.kind}-${entry.page ?? index}`"
      >
        <button
          v-if="entry.kind === 'page'"
          type="button"
          class="ud-pagination__btn"
          :class="{ 'is-current': entry.page === page }"
          :aria-current="entry.page === page ? 'page' : undefined"
          :disabled="disabled"
          @click="go(entry.page ?? page)"
        >
          {{ entry.page }}
        </button>
        <button
          v-else
          type="button"
          class="ud-pagination__btn"
          :aria-label="entry.kind === 'next-more' ? '向后 5 页' : '向前 5 页'"
          :disabled="disabled"
          @pointerenter="moreHover = entry.kind"
          @pointerleave="moreHover = ''"
          @click="go(page + (entry.kind === 'next-more' ? 5 : -5))"
        >
          <ParkIcon :icon="moreHover === entry.kind ? (entry.kind === 'next-more' ? DoubleRight : DoubleLeft) : More" />
        </button>
      </template>
      <button
        type="button"
        class="ud-pagination__btn"
        aria-label="下一页"
        :disabled="disabled || page >= pageCount"
        @click="go(page + 1)"
      >
        <ParkIcon :icon="Right" />
      </button>
    </div>
    <Select
      v-if="sizesShown"
      v-model="sizeValue"
      class="ud-pagination__sizes"
      :options="sizeOptions"
      size="sm"
      :disabled="disabled"
    />
    <label
      v-if="jumperShown"
      class="ud-pagination__jumper"
    >
      跳转至
      <input
        class="ud-pagination__jump"
        inputmode="numeric"
        autocomplete="off"
        :value="draft"
        :disabled="jumperDisabled"
        :style="{ width: jumpWidth() }"
        @input="onDraft"
        @keydown.enter.prevent="commit"
      >
      页
    </label>
  </nav>
</template>
