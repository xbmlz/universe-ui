<script setup lang="ts">
import type { TabsItem } from './context'
import type { TabsOverflow, TabsSize, TabsVariant, TabValue } from './types'
import { Left, More, Plus, Right } from '@icon-park/vue-next'
import { computed, nextTick, onBeforeUnmount, onMounted, provide, shallowReactive, shallowRef, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { Dropdown, DropdownItem } from '../dropdown'
import { TABS } from './context'
import { fitTabs } from './layout'

const {
  variant = 'line',
  size = 'md',
  divider = false,
  overflow = 'more',
  addable = false,
  labelMaxWidth = 240,
} = defineProps<{
  variant?: TabsVariant
  size?: TabsSize
  divider?: boolean
  /** `more` replaces overflow with a hover menu; `scroll` exposes icon paging controls. */
  overflow?: TabsOverflow
  /** Shows the card-tab add control. */
  addable?: boolean
  /** Specified maximum width for a tab label. */
  labelMaxWidth?: number
}>()

const emit = defineEmits<{ add: [] }>()

const model = defineModel<TabValue | null>({ default: null })
const rootRef = useTemplateRef<HTMLElement>('root')
const viewportRef = useTemplateRef<HTMLElement>('viewport')
const items = shallowReactive<TabsItem[]>([])
const overflowing = shallowRef(false)
const hiddenValues = shallowRef<TabValue[]>([])
const promoted = shallowRef<TabValue | null>(null)
const canScrollBack = shallowRef(false)
const canScrollForward = shallowRef(false)

function register(item: TabsItem) {
  if (!items.some(current => current.value === item.value))
    items.push(item)
  scheduleLayout()
}

function unregister(value: TabValue) {
  const index = items.findIndex(item => item.value === value)
  if (index >= 0)
    items.splice(index, 1)
  scheduleLayout()
}

provide(TABS, { model, items, register, unregister })

const resolvedSize = computed(() => (variant === 'capsule' && size === 'lg'
  ? 'md'
  : size))

const moreItems = computed(() => items.filter(item => hiddenValues.value.includes(item.value)))

function onKeydown(event: KeyboardEvent) {
  const keys = [
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
  ]
  if (!keys.includes(event.key))
    return
  const available = items.filter(item => !item.disabled() && !item.host.value?.hidden)
  if (!available.length)
    return
  const index = available.findIndex(item => item.button.value === document.activeElement)
  let next = index
  if (event.key === 'ArrowRight')
    next = (index + 1) % available.length
  if (event.key === 'ArrowLeft')
    next = (index - 1 + available.length) % available.length
  if (event.key === 'Home')
    next = 0
  if (event.key === 'End')
    next = available.length - 1
  event.preventDefault()
  model.value = available[next]!.value
  available[next]!.button.value?.focus()
}

let frame = 0
let observer: ResizeObserver | undefined

function scheduleLayout() {
  if (frame || typeof requestAnimationFrame === 'undefined')
    return
  frame = requestAnimationFrame(() => {
    frame = 0
    layout()
  })
}

function showAll() {
  for (const item of items) {
    if (item.host.value) {
      item.host.value.hidden = false
      item.host.value.classList.remove('ud-tab--promoted')
    }
  }
}

function hide(item: TabsItem) {
  if (item.host.value)
    item.host.value.hidden = true
}

function layout() {
  const root = rootRef.value
  const viewport = viewportRef.value
  if (!root || !viewport || typeof getComputedStyle === 'undefined')
    return
  showAll()
  promoted.value = null

  if (overflow === 'none') {
    overflowing.value = false
    hiddenValues.value = []
    return
  }

  if (overflow === 'scroll') {
    overflowing.value = viewport.scrollWidth > viewport.clientWidth + 1
    canScrollBack.value = viewport.scrollLeft > 0
    canScrollForward.value = viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1
    hiddenValues.value = []
    return
  }

  const gap = Number.parseFloat(getComputedStyle(root).columnGap) || 0
  const controlWidth = 24
  /* Fractional widths avoid a one-pixel flip when the row sits on the fit boundary. */
  const widths = items.map(item => item.button.value?.getBoundingClientRect().width ?? 0)
  const fit = fitTabs(widths, gap, root.getBoundingClientRect().width, controlWidth)
  let visible = Math.max(0, fit.count)
  const selectedIndex = items.findIndex(item => item.value === model.value)

  if (fit.overflow && selectedIndex >= visible && selectedIndex >= 0) {
    visible = Math.max(1, visible)
    promoted.value = model.value
  }

  overflowing.value = fit.overflow
  hiddenValues.value = items.slice(visible).map(item => item.value)
  for (let index = visible; index < items.length; index++) hide(items[index]!)

  if (promoted.value != null) {
    const item = items.find(current => current.value === promoted.value)
    if (item?.host.value) {
      item.host.value.hidden = false
      item.host.value.classList.add('ud-tab--promoted')
      hiddenValues.value = hiddenValues.value.filter(value => value !== promoted.value)
    }
  }
}

function scroll(direction: -1 | 1) {
  const viewport = viewportRef.value
  if (!viewport)
    return
  viewport.scrollBy({ left: direction * viewport.clientWidth, behavior: 'smooth' })
}

function selectMore(index: number) {
  const item = moreItems.value[index]
  if (!item || item.disabled())
    return
  model.value = item.value
  nextTick(scheduleLayout)
}

function onScroll() {
  if (overflow === 'scroll')
    scheduleLayout()
}

onMounted(() => {
  layout()
  observer = new ResizeObserver(scheduleLayout)
  if (rootRef.value)
    observer.observe(rootRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (frame)
    cancelAnimationFrame(frame)
})

watch(() => [
  model.value,
  overflow,
  variant,
  resolvedSize.value,
], () => nextTick(scheduleLayout))
</script>

<template>
  <div
    ref="root"
    class="ud-tabs"
    :class="[
      `ud-tabs--${variant}`,
      `ud-tabs--${resolvedSize}`,
      { 'ud-tabs--divider': divider && variant === 'line' },
      { 'ud-tabs--overflowing': overflowing },
    ]"
    :style="{ '--ud-tabs-label-max': `${labelMaxWidth}px` }"
  >
    <div
      ref="viewport"
      class="ud-tabs__viewport"
      role="tablist"
      @keydown="onKeydown"
      @scroll="onScroll"
    >
      <slot />
    </div>
    <div
      v-if="overflowing && overflow === 'scroll'"
      class="ud-tabs__scroll"
    >
      <button
        type="button"
        class="ud-tabs__control"
        aria-label="向前滚动"
        :disabled="!canScrollBack"
        @click="scroll(-1)"
      >
        <ParkIcon :icon="Left" />
      </button>
      <button
        type="button"
        class="ud-tabs__control"
        aria-label="向后滚动"
        :disabled="!canScrollForward"
        @click="scroll(1)"
      >
        <ParkIcon :icon="Right" />
      </button>
    </div>
    <Dropdown
      v-else-if="overflowing && overflow === 'more'"
      class="ud-tabs__more"
      placement="bottom-end"
    >
      <button
        type="button"
        class="ud-tabs__control"
        aria-label="更多标签页"
        aria-haspopup="menu"
      >
        <ParkIcon :icon="More" />
      </button>
      <template #menu>
        <DropdownItem
          v-for="(item, index) in moreItems"
          :key="String(item.value)"
          :command="String(index)"
          :disabled="item.disabled()"
          :selected="item.value === model"
          @click="selectMore(index)"
        >
          {{ item.label() }}
        </DropdownItem>
      </template>
    </Dropdown>
    <button
      v-if="variant === 'card' && addable"
      type="button"
      class="ud-tabs__add"
      aria-label="新增标签页"
      @click="emit('add')"
    >
      <ParkIcon :icon="Plus" />
    </button>
  </div>
</template>
