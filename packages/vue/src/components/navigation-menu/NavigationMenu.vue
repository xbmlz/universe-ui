<script setup lang="ts">
import type { NavMenuItem, NavMenuOrientation } from './types'
import { Down, Left, Right } from '@icon-park/vue-next'
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { placePanel } from '../../internal/placement'
import { nextLayerZ } from '../dialog/scroll-lock'

/*
 * Specified in navigation-menu.md: the horizontal bar is 56px tall with 24px inline
 * padding, a 40px gap between the brand and the nav, 32px between the tabs, 16px
 * label text, a 3px selected indicator as wide as the label, and 320px as the widest
 * a label may get. The overflow "更多" menu and the dropdown follow Dropdown. Menu
 * padding and panel metrics are inferred from the side-nav figure.
 */
const {
  items,
  orientation = 'horizontal',
  autoOverflow = true,
  collapsible = false,
  defaultExpandedKeys = [],
  maxVisible,
  moreText = '更多',
  label = '导航菜单',
} = defineProps<{
  items: NavMenuItem[]
  /** Horizontal web bar or vertical web/desktop navigation. */
  orientation?: NavMenuOrientation
  /** Collapse the horizontal bar to its first three items when the nav/action gap runs out. */
  autoOverflow?: boolean
  /** Shows the bottom collapse control on a vertical navigation. */
  collapsible?: boolean
  /** Vertically expanded branches at first render. */
  defaultExpandedKeys?: string[]
  maxVisible?: number
  moreText?: string
  label?: string
}>()

const model = defineModel<string>({ default: '' })
const collapsed = defineModel<boolean>('collapsed', { default: false })

const rootRef = useTemplateRef<HTMLElement>('root')
const tabsRef = useTemplateRef<HTMLElement>('tabs')
const panelRef = useTemplateRef<HTMLElement>('panel')
const subPanelRef = useTemplateRef<HTMLElement>('sub-panel')
const windowTarget = shallowRef<Window | null>(null)
const openKey = shallowRef('')
const subKey = shallowRef('')
const overflowOpen = shallowRef(false)
const autoCount = shallowRef<number | null>(null)
const expandedKeys = shallowRef([...defaultExpandedKeys])
const panelStyle = shallowRef<Record<string, string>>({})
const subPanelStyle = shallowRef<Record<string, string>>({})
const subAnchor = shallowRef<DOMRect | null>(null)
let layer = 0

const vertical = computed(() => orientation === 'vertical')

const visibleCount = computed(() => {
  if (maxVisible != null)
    return Math.min(items.length, maxVisible)
  if (orientation === 'horizontal' && autoCount.value != null)
    return Math.min(items.length, autoCount.value)
  return items.length
})

const visibleItems = computed(() => items.slice(0, visibleCount.value))

interface VerticalRow {
  item: NavMenuItem
  depth: number
  hasChildren: boolean
  expanded: boolean
  containsActive: boolean
}

function containsActive(item: NavMenuItem): boolean {
  if (item.key === model.value)
    return true
  return item.children?.some(containsActive) ?? false
}

const verticalRows = computed<VerticalRow[]>(() => {
  const rows: VerticalRow[] = []
  const walk = (list: NavMenuItem[], depth = 0) => {
    for (const item of list) {
      const hasChildren = !!item.children?.length
      const expanded = hasChildren && expandedKeys.value.includes(item.key)
      rows.push({
        item,
        depth,
        hasChildren,
        expanded,
        containsActive: containsActive(item),
      })
      if (expanded && !collapsed.value)
        walk(item.children!, depth + 1)
    }
  }
  walk(items)
  return rows
})

const overflowItems = computed(() => (visibleCount.value >= items.length
  ? []
  : items.slice(visibleCount.value)))

const overflowActive = computed(() => overflowItems.value.some(item => item.key === model.value))

let autoObserver: ResizeObserver | undefined
let autoFrame = 0

function scheduleAutoLayout() {
  if (autoFrame || typeof requestAnimationFrame === 'undefined')
    return
  autoFrame = requestAnimationFrame(() => {
    autoFrame = 0
    measureAuto()
  })
}

async function measureAuto() {
  if (orientation !== 'horizontal' || maxVisible != null || !autoOverflow) {
    autoCount.value = null
    return
  }
  const tabs = tabsRef.value
  if (!tabs || typeof getComputedStyle === 'undefined')
    return
  autoCount.value = null
  await nextTick()
  const elements = [
    ...tabs.querySelectorAll<HTMLElement>('.ud-navigation-menu__item'),
  ]
  if (elements.length <= 3)
    return
  const gap = Number.parseFloat(getComputedStyle(tabs).columnGap) || 0
  const width = elements.reduce((sum, element) => sum + element.offsetWidth, 0)
    + gap * Math.max(0, elements.length - 1)
  /* navigation-menu.md: keep at least 40px before the action area; then only three remain. */
  if (width + 40 > tabs.clientWidth)
    autoCount.value = 3
}

onMounted(() => {
  windowTarget.value = window
  autoObserver = new ResizeObserver(scheduleAutoLayout)
  if (rootRef.value)
    autoObserver.observe(rootRef.value)
  if (tabsRef.value)
    autoObserver.observe(tabsRef.value)
  measureAuto()
})

onBeforeUnmount(() => {
  autoObserver?.disconnect()
  if (autoFrame)
    cancelAnimationFrame(autoFrame)
})

watch(() => [
  items,
  orientation,
  maxVisible,
  autoOverflow,
], measureAuto)

function findItem(list: NavMenuItem[], key: string): NavMenuItem | undefined {
  for (const item of list) {
    if (item.key === key)
      return item
    const found = item.children
      ? findItem(item.children, key)
      : undefined
    if (found)
      return found
  }
  return undefined
}

const openItem = computed(() => items.find(item => item.key === openKey.value))
const panelItems = computed(() => (overflowOpen.value
  ? overflowItems.value
  : openItem.value?.children ?? []))
const subItem = computed(() => findItem(items, subKey.value))
const subItems = computed(() => subItem.value?.children ?? [])

function placeSub() {
  const panel = panelRef.value
  const sub = subPanelRef.value
  if (!panel || !sub)
    return
  const anchor = subAnchor.value ?? panel.getBoundingClientRect()
  const width = sub.offsetWidth
  const height = sub.offsetHeight
  const panelRect = panel.getBoundingClientRect()
  const right = anchor.right + 4
  const left = right + width <= window.innerWidth - 16
    ? right
    : panelRect.left - width - 4
  const top = Math.min(
    window.innerHeight - height - 16,
    Math.max(16, anchor.top),
  )
  subPanelStyle.value = {
    top: `${top}px`,
    left: `${Math.max(16, left)}px`,
    zIndex: String(layer + 1),
  }
}

function place() {
  const root = rootRef.value
  const panel = panelRef.value
  if (!root || !panel)
    return
  const trigger = root.querySelector<HTMLElement>('.is-open') ?? root
  const rect = trigger.getBoundingClientRect()
  const side = vertical.value && collapsed.value
  const panelSize = { width: panel.offsetWidth, height: panel.offsetHeight }
  const placed = side
    ? {
        left: Math.min(window.innerWidth - panelSize.width - 16, rect.right + 4),
        top: Math.min(window.innerHeight - panelSize.height - 16, rect.top),
      }
    : placePanel(
        {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
        },
        panelSize,
        {
          width: window.innerWidth,
          height: window.innerHeight,
          /* Specified in dropdown.md: a 16px safe distance from the window edge. */
          margin: 16,
        },
      )
  panelStyle.value = {
    top: `${placed.top}px`,
    left: `${placed.left}px`,
    zIndex: String(layer),
  }
  nextTick(placeSub)
}

function showPanel(key: string, overflow = false) {
  overflowOpen.value = overflow
  openKey.value = overflow ? '' : key
  const item = items.find(entry => entry.key === key)
  if (!overflow && (!item?.children?.length)) {
    closePanel()
    return
  }
  layer = nextLayerZ()
  nextTick(place)
}

let hoverTimer: ReturnType<typeof setTimeout> | undefined

function cancelHover() {
  clearTimeout(hoverTimer)
  hoverTimer = undefined
}

/** Specified in dropdown.md: hovering for 300ms opens the panel, leaving closes it after 300ms. */
function hoverOpen(key: string, overflow = false) {
  cancelHover()
  hoverTimer = setTimeout(showPanel, 300, key, overflow)
}

function hoverClose() {
  cancelHover()
  hoverTimer = setTimeout(closePanel, 300)
}

function closePanel() {
  cancelHover()
  openKey.value = ''
  subKey.value = ''
  subAnchor.value = null
  overflowOpen.value = false
}

function openSub(item: NavMenuItem, event?: MouseEvent) {
  if (!vertical.value || !collapsed.value || !item.children?.length) {
    subKey.value = ''
    subAnchor.value = null
    return
  }
  const target = event?.currentTarget
  if (target instanceof HTMLElement)
    subAnchor.value = target.getBoundingClientRect()
  subKey.value = item.key
  nextTick(placeSub)
}

function onPanelOptionEnter(item: NavMenuItem, event: MouseEvent) {
  openSub(item, event)
}

function onPanelOptionClick(item: NavMenuItem, event: MouseEvent) {
  if (item.children?.length) {
    openSub(item, event)
    return
  }
  select(item.key)
}

function select(key: string) {
  model.value = key
  closePanel()
}

function toggleItem(item: NavMenuItem) {
  if (vertical.value) {
    if (item.children?.length) {
      const index = expandedKeys.value.indexOf(item.key)
      expandedKeys.value = index >= 0
        ? expandedKeys.value.filter(key => key !== item.key)
        : [...expandedKeys.value, item.key]
      return
    }
    select(item.key)
    return
  }
  if (openKey.value === item.key) {
    closePanel()
    return
  }
  if (item.children?.length)
    showPanel(item.key)
  else
    select(item.key)
}

function onVerticalEnter(item: NavMenuItem) {
  if (!collapsed.value || !item.children?.length)
    return
  hoverOpen(item.key)
}

function onVerticalClick(item: NavMenuItem) {
  if (!collapsed.value || !item.children?.length) {
    toggleItem(item)
    return
  }
  showPanel(item.key)
}

function toggleOverflow() {
  if (overflowOpen.value)
    closePanel()
  else
    showPanel(model.value, true)
}

function onOutside(event: PointerEvent) {
  const target = event.target
  if (
    target instanceof Node
    && (
      rootRef.value?.contains(target)
      || panelRef.value?.contains(target)
      || subPanelRef.value?.contains(target)
    )
  ) {
    return
  }
  closePanel()
}

useEventListener(windowTarget, 'pointerdown', onOutside)
useEventListener(windowTarget, 'scroll', place, { capture: true, passive: true })
useEventListener(windowTarget, 'resize', () => {
  place()
  placeSub()
})

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape')
    closePanel()
}

useEventListener(windowTarget, 'keydown', onKey)
</script>

<template>
  <nav
    ref="root"
    class="ud-navigation-menu"
    :class="[
      `ud-navigation-menu--${orientation}`,
      { 'ud-navigation-menu--collapsed': vertical && collapsed },
    ]"
    :aria-label="label"
  >
    <div class="ud-navigation-menu__brand">
      <slot name="brand" />
    </div>
    <div
      v-if="!vertical"
      ref="tabs"
      class="ud-navigation-menu__tabs"
    >
      <div
        v-for="item in visibleItems"
        :key="item.key"
        class="ud-navigation-menu__item"
        :class="{ 'is-active': model === item.key, 'is-open': openKey === item.key }"
        @mouseenter="item.children?.length && hoverOpen(item.key)"
        @mouseleave="hoverClose()"
      >
        <button
          type="button"
          class="ud-navigation-menu__link"
          :aria-current="model === item.key ? 'page' : undefined"
          :aria-expanded="item.children?.length ? openKey === item.key : undefined"
          @click="toggleItem(item)"
        >
          <span class="ud-navigation-menu__label">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="ud-navigation-menu__badge"
          >{{ item.badge }}</span>
          <ParkIcon
            v-if="item.children?.length"
            class="ud-navigation-menu__arrow"
            :icon="Down"
          />
        </button>
      </div>
      <div
        v-if="overflowItems.length"
        class="ud-navigation-menu__item"
        :class="{ 'is-active': overflowActive, 'is-open': overflowOpen }"
        @mouseenter="hoverOpen(model, true)"
        @mouseleave="hoverClose()"
      >
        <button
          type="button"
          class="ud-navigation-menu__link"
          :aria-expanded="overflowOpen"
          @click="toggleOverflow"
        >
          <span class="ud-navigation-menu__label">{{ moreText }}</span>
          <ParkIcon
            class="ud-navigation-menu__arrow"
            :icon="Down"
          />
        </button>
      </div>
    </div>
    <div
      v-else
      class="ud-navigation-menu__side-list"
    >
      <div
        v-for="row in verticalRows"
        :key="row.item.key"
        class="ud-navigation-menu__side-item"
        :class="{
          'is-active': row.containsActive,
          'is-open': row.expanded,
          'is-collapsed': collapsed,
        }"
        :style="{ '--ud-nav-depth': row.depth }"
        :title="collapsed ? row.item.label : undefined"
        @mouseenter="onVerticalEnter(row.item)"
        @mouseleave="hoverClose()"
      >
        <button
          type="button"
          class="ud-navigation-menu__side-link"
          :aria-current="model === row.item.key ? 'page' : undefined"
          :aria-expanded="row.hasChildren ? row.expanded : undefined"
          @click="onVerticalClick(row.item)"
        >
          <span
            v-if="row.item.icon"
            class="ud-navigation-menu__side-icon"
          >
            <ParkIcon :icon="row.item.icon" />
          </span>
          <span
            v-else
            class="ud-navigation-menu__side-icon ud-navigation-menu__side-icon--fallback"
            aria-hidden="true"
          >{{ row.item.label.slice(0, 1) }}</span>
          <span
            v-if="!collapsed"
            class="ud-navigation-menu__side-label"
          >{{ row.item.label }}</span>
          <span
            v-if="!collapsed && row.item.badge"
            class="ud-navigation-menu__side-badge"
          >{{ row.item.badge }}</span>
          <ParkIcon
            v-if="!collapsed && row.hasChildren"
            class="ud-navigation-menu__side-arrow"
            :icon="Down"
          />
        </button>
      </div>
    </div>
    <div class="ud-navigation-menu__actions">
      <slot name="actions" />
    </div>
    <div
      v-if="vertical"
      class="ud-navigation-menu__footer"
    >
      <slot name="footer" />
      <button
        v-if="collapsible"
        type="button"
        class="ud-navigation-menu__collapse"
        :aria-label="collapsed ? '展开侧边导航' : '收起侧边导航'"
        :title="collapsed ? '展开' : '收起'"
        @click="collapsed = !collapsed"
      >
        <ParkIcon :icon="collapsed ? Right : Left" />
      </button>
    </div>
    <Teleport to="body">
      <div
        v-if="openKey || overflowOpen"
        ref="panel"
        class="ud-navigation-menu__panel"
        :class="{ 'ud-navigation-menu__panel--side': vertical && collapsed }"
        :style="panelStyle"
        @mouseenter="cancelHover()"
        @mouseleave="hoverClose()"
      >
        <button
          v-for="item in panelItems"
          :key="item.key"
          type="button"
          class="ud-navigation-menu__option"
          :class="{ 'is-active': model === item.key }"
          @mouseenter="onPanelOptionEnter(item, $event)"
          @click="onPanelOptionClick(item, $event)"
        >
          <span class="ud-navigation-menu__option-label">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="ud-navigation-menu__badge"
          >{{ item.badge }}</span>
          <ParkIcon
            v-if="item.children?.length"
            class="ud-navigation-menu__option-arrow"
            :icon="Right"
          />
        </button>
      </div>
      <div
        v-if="subItems.length"
        ref="sub-panel"
        class="ud-navigation-menu__panel ud-navigation-menu__panel--sub"
        :style="subPanelStyle"
        @mouseenter="cancelHover()"
        @mouseleave="hoverClose()"
      >
        <button
          v-for="item in subItems"
          :key="item.key"
          type="button"
          class="ud-navigation-menu__option"
          :class="{ 'is-active': model === item.key }"
          @click="select(item.key)"
        >
          <span class="ud-navigation-menu__option-label">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="ud-navigation-menu__badge"
          >{{ item.badge }}</span>
        </button>
      </div>
    </Teleport>
  </nav>
</template>
