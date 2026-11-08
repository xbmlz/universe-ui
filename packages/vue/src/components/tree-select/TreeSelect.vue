<script setup lang="ts">
import type { InputSize } from '../input/types'
import type { TreeCheckState, TreeOption, TreeRow } from './types'
import { Close, CloseOne, Down, Right } from '@icon-park/vue-next'
import { useEventListener } from '@vueuse/core'
import { computed, inject, nextTick, onMounted, shallowRef, useTemplateRef, watch } from 'vue'
import CheckBox from '../../internal/check-box.vue'
import ParkIcon from '../../internal/park-icon.vue'
import { placePanel } from '../../internal/placement'
import { nextLayerZ } from '../dialog/scroll-lock'
import { INPUT_GROUP } from '../input/context'
import { collectValues, filterTree, findTreePath, flattenTree, subtreeState, toggleSubtree } from './tree'

/*
 * Specified in tree-select.md: the field follows the input scale (240-600px), the
 * field grows with the chosen items up to 188px and then scrolls, the panel is as
 * wide as the field, sits under 256px tall, and checking a parent checks its
 * children while partial children show a partial state. A single select chooses one
 * node and closes. Row sizes are inferred from the select menu.
 */
const {
  options,
  multiple = false,
  checkable = false,
  searchable = false,
  size = 'md',
  disabled = false,
  readonly = false,
  error = false,
  required = false,
  clearable = false,
  label,
  placeholder = '请选择',
  message,
  emptyText = '无选项',
} = defineProps<{
  options: TreeOption[]
  multiple?: boolean
  checkable?: boolean
  searchable?: boolean
  size?: InputSize
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  required?: boolean
  clearable?: boolean
  label?: string
  placeholder?: string
  message?: string
  emptyText?: string
}>()

const model = defineModel<string | string[] | null>({ default: null })

const group = inject(INPUT_GROUP, undefined)
const resolvedSize = computed(() => group?.size.value ?? size)
const resolvedDisabled = computed(() => disabled || (group?.disabled.value ?? false))
const resolvedReadonly = computed(() => readonly || (group?.readonly.value ?? false))
const resolvedError = computed(() => error || (group?.error.value ?? false))

const rootRef = useTemplateRef<HTMLElement>('root')
const panelRef = useTemplateRef<HTMLElement>('panel')
const searchRef = useTemplateRef<HTMLInputElement>('search')
const windowTarget = shallowRef<Window | null>(null)
onMounted(() => {
  windowTarget.value = window
})

const open = shallowRef(false)
const query = shallowRef('')
const expanded = shallowRef<Set<string>>(new Set())
const panelStyle = shallowRef<Record<string, string>>({})
let layer = 0

const selectedValues = computed<string[]>(() => {
  if (Array.isArray(model.value))
    return model.value
  return model.value
    ? [model.value]
    : []
})

const filtered = computed(() => (searchable
  ? filterTree(options, query.value)
  : options))

const allValues = computed(() => new Set(options.flatMap(option => collectValues(option))))

const expandedValues = computed(() => (query.value.trim() && searchable
  ? allValues.value
  : expanded.value))

const rows = computed<TreeRow[]>(() => flattenTree(filtered.value, expandedValues.value))

/** A parent hides its selected children, so the parent is the visible result. */
const displayValues = computed(() => selectedValues.value.filter((value) => {
  const path = findTreePath(options, value)
  if (!path)
    return true
  return !path.slice(0, -1).some(node => selectedValues.value.includes(node.value))
}))

const showClear = computed(() => clearable && selectedValues.value.length > 0 && !resolvedDisabled.value && !resolvedReadonly.value)

function labelOf(value: string) {
  return findTreePath(options, value)?.at(-1)?.label ?? value
}

function checkState(option: TreeOption): TreeCheckState {
  return subtreeState(option, selectedValues.value)
}

/** Checked parents report the subtree; plain multi-select keeps each row independent. */
function isChecked(option: TreeOption) {
  return checkable
    ? checkState(option) === 'checked'
    : selectedValues.value.includes(option.value)
}

function isIndeterminate(option: TreeOption) {
  return checkable && checkState(option) === 'indeterminate'
}

function hasChildren(option: TreeOption) {
  return Boolean(option.children?.length)
}

function isExpanded(option: TreeOption) {
  return expandedValues.value.has(option.value)
}

function place() {
  const root = rootRef.value
  const panel = panelRef.value
  if (!root || !panel)
    return
  const field = root.querySelector('.ud-tree-select__field') ?? root
  const rect = field.getBoundingClientRect()
  // Specified: the panel matches the field but may widen to 420px for long labels.
  const width = Math.min(420, Math.max(rect.width, panel.scrollWidth))
  const placed = placePanel(
    {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
    },
    { width, height: panel.offsetHeight },
    { width: window.innerWidth, height: window.innerHeight },
  )
  panelStyle.value = {
    top: `${placed.top}px`,
    left: `${placed.left}px`,
    width: `${width}px`,
    zIndex: String(layer),
  }
}

/** Specified: reopening the field expands down to the chosen level. */
function expandToSelected() {
  const ancestors = new Set(expanded.value)
  for (const value of selectedValues.value) {
    const path = findTreePath(options, value)
    path?.slice(0, -1).forEach(node => ancestors.add(node.value))
  }
  expanded.value = ancestors
}

function openPanel() {
  if (resolvedDisabled.value || resolvedReadonly.value)
    return
  layer = nextLayerZ()
  expandToSelected()
  open.value = true
  nextTick(() => {
    place()
    if (searchable)
      searchRef.value?.focus()
  })
}

function closePanel() {
  open.value = false
  query.value = ''
}

function toggle() {
  if (open.value)
    closePanel()
  else
    openPanel()
}

function onOutside(event: PointerEvent) {
  if (!open.value)
    return
  const target = event.target
  if (target instanceof Node && (rootRef.value?.contains(target) || panelRef.value?.contains(target)))
    return
  closePanel()
}

useEventListener(windowTarget, 'pointerdown', onOutside)
useEventListener(windowTarget, 'scroll', place, { capture: true, passive: true })
useEventListener(windowTarget, 'resize', place)

function toggleExpand(option: TreeOption) {
  if (!hasChildren(option))
    return
  const next = new Set(expanded.value)
  if (next.has(option.value))
    next.delete(option.value)
  else
    next.add(option.value)
  expanded.value = next
}

function toggleCheck(option: TreeOption, event: MouseEvent) {
  event.stopPropagation()
  if (option.disabled || resolvedDisabled.value || resolvedReadonly.value)
    return
  if (checkable) {
    const checked = checkState(option) !== 'checked'
    model.value = toggleSubtree(selectedValues.value, option, checked)
    return
  }
  model.value = selectedValues.value.includes(option.value)
    ? selectedValues.value.filter(value => value !== option.value)
    : [...selectedValues.value, option.value]
}

function onRow(row: TreeRow) {
  const option = row.option
  if (option.disabled || resolvedDisabled.value || resolvedReadonly.value)
    return
  if (multiple) {
    if (hasChildren(option))
      toggleExpand(option)
    if (!checkable) {
      model.value = selectedValues.value.includes(option.value)
        ? selectedValues.value.filter(value => value !== option.value)
        : [...selectedValues.value, option.value]
    }
    return
  }
  model.value = option.value
  closePanel()
}

function remove(event: MouseEvent, value: string) {
  event.stopPropagation()
  if (resolvedDisabled.value || resolvedReadonly.value)
    return
  model.value = selectedValues.value.filter(item => item !== value)
}

function clear(event: MouseEvent) {
  event.stopPropagation()
  model.value = multiple
    ? []
    : null
}

function onSearch(event: Event) {
  const field = event.target
  if (field instanceof HTMLInputElement)
    query.value = field.value
}

watch(() => options, () => {
  expanded.value = new Set()
}, { deep: true })
</script>

<template>
  <div
    ref="root"
    class="ud-tree-select"
    :class="[
      `ud-tree-select--${resolvedSize}`,
      {
        'ud-tree-select--disabled': resolvedDisabled,
        'ud-tree-select--readonly': resolvedReadonly,
        'ud-tree-select--error': resolvedError,
        'ud-tree-select--open': open,
        'ud-tree-select--multiple': multiple,
      },
    ]"
  >
    <div
      v-if="label"
      class="ud-input__label"
    >
      <span
        v-if="required"
        class="ud-input__required"
        aria-hidden="true"
      >*</span>
      {{ label }}
    </div>
    <div
      class="ud-tree-select__field"
      role="combobox"
      :tabindex="resolvedDisabled ? -1 : 0"
      :aria-expanded="open"
      :aria-disabled="resolvedDisabled || undefined"
      :aria-invalid="resolvedError || undefined"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
      @keydown.escape.prevent="closePanel"
    >
      <span
        v-if="!multiple || !displayValues.length"
        class="ud-tree-select__value"
        :class="{ 'is-placeholder': !displayValues.length }"
      >{{ displayValues.length ? labelOf(displayValues[0]!) : placeholder }}</span>
      <span
        v-else
        class="ud-tree-select__tags"
      >
        <span
          v-for="value in displayValues"
          :key="value"
          class="ud-tree-select__tag"
        >
          <span class="ud-tree-select__tag-label">{{ labelOf(value) }}</span>
          <button
            v-if="!resolvedDisabled && !resolvedReadonly"
            type="button"
            class="ud-tree-select__tag-remove"
            :aria-label="`移除${labelOf(value)}`"
            @click="remove($event, value)"
          >
            <ParkIcon :icon="Close" />
          </button>
        </span>
      </span>
      <span class="ud-tree-select__suffix">
        <button
          v-if="showClear"
          type="button"
          class="ud-tree-select__clear"
          aria-label="清除"
          @click="clear"
        >
          <ParkIcon
            :icon="CloseOne"
            theme="filled"
          />
        </button>
        <ParkIcon
          class="ud-tree-select__arrow"
          :icon="Down"
        />
      </span>
    </div>
    <Teleport to="body">
      <div
        v-if="open"
        ref="panel"
        class="ud-tree-select__panel"
        :class="`ud-tree-select__panel--${resolvedSize}`"
        :style="panelStyle"
      >
        <div
          v-if="searchable"
          class="ud-tree-select__search"
        >
          <input
            ref="search"
            class="ud-tree-select__search-input"
            :value="query"
            placeholder="搜索"
            @click.stop
            @input="onSearch"
            @keydown.escape.prevent="closePanel"
          >
        </div>
        <div class="ud-tree-select__tree">
          <div
            v-if="!rows.length"
            class="ud-tree-select__empty"
          >
            {{ emptyText }}
          </div>
          <button
            v-for="row in rows"
            :key="row.option.value"
            type="button"
            class="ud-tree-select__row"
            :class="{
              'is-selected': selectedValues.includes(row.option.value),
              'is-disabled': row.option.disabled,
            }"
            :style="{ paddingLeft: `${8 + row.depth * 16}px` }"
            :disabled="row.option.disabled"
            @click="onRow(row)"
          >
            <span
              class="ud-tree-select__arrow-slot"
              :class="{ 'is-open': isExpanded(row.option) }"
              @click.stop="toggleExpand(row.option)"
            >
              <ParkIcon
                v-if="hasChildren(row.option)"
                :icon="isExpanded(row.option) ? Down : Right"
              />
            </span>
            <span
              v-if="multiple"
              class="ud-tree-select__check"
              @click="toggleCheck(row.option, $event)"
            >
              <CheckBox
                :checked="isChecked(row.option)"
                :indeterminate="isIndeterminate(row.option)"
                :disabled="row.option.disabled"
              />
            </span>
            <span class="ud-tree-select__label">{{ row.option.label }}</span>
          </button>
        </div>
      </div>
    </Teleport>
    <p
      v-if="message"
      class="ud-input__message"
    >
      {{ message }}
    </p>
  </div>
</template>
