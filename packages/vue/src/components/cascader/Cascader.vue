<script setup lang="ts">
import type { InputSize } from '../input/types'
import type { CascaderOption } from './types'
import { Check, Close, CloseOne, Down, Right, Up } from '@icon-park/vue-next'
import { useEventListener } from '@vueuse/core'
import { computed, inject, nextTick, onMounted, shallowRef, useTemplateRef } from 'vue'
import CheckBox from '../../internal/check-box.vue'
import ParkIcon from '../../internal/park-icon.vue'
import { placePanel } from '../../internal/placement'
import { nextLayerZ } from '../dialog/scroll-lock'
import { INPUT_GROUP } from '../input/context'
import { collectValues, findOptionPath, pathLabel, subtreeState } from './path'

/*
 * Specified in cascader.md: each column is 160px by default and the panel stays under
 * 720px, the panel opens below and left-aligned, flips above when the bottom runs out
 * and shifts left when the right edge runs out, a click on a child level closes the
 * panel in single mode and outside clicks close it in multiple mode, and the full
 * path is joined with "/" by default. Checking an any-level parent checks its children
 * and only the parent is shown as the result. Row padding and option height are inferred.
 */
const {
  options,
  multiple = false,
  changeOnSelect = false,
  showPath = false,
  separator = '/',
  size = 'md',
  disabled = false,
  readonly = false,
  error = false,
  required = false,
  clearable = false,
  label,
  placeholder = '请选择',
  message,
} = defineProps<{
  options: CascaderOption[]
  multiple?: boolean
  changeOnSelect?: boolean
  showPath?: boolean
  separator?: string
  size?: InputSize
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  required?: boolean
  clearable?: boolean
  label?: string
  placeholder?: string
  message?: string
}>()

const model = defineModel<string | string[] | null>({ default: null })

const group = inject(INPUT_GROUP, undefined)
const resolvedSize = computed(() => group?.size.value ?? size)
const resolvedDisabled = computed(() => disabled || (group?.disabled.value ?? false))
const resolvedReadonly = computed(() => readonly || (group?.readonly.value ?? false))
const resolvedError = computed(() => error || (group?.error.value ?? false))

const rootRef = useTemplateRef<HTMLElement>('root')
const panelRef = useTemplateRef<HTMLElement>('panel')
const windowTarget = shallowRef<Window | null>(null)
onMounted(() => {
  windowTarget.value = window
})

const open = shallowRef(false)
const activePath = shallowRef<number[]>([])
const panelStyle = shallowRef<Record<string, string>>({})
let layer = 0

const selectedValues = computed<string[]>(() => {
  if (Array.isArray(model.value))
    return model.value
  return model.value
    ? [model.value]
    : []
})

const columns = computed(() => {
  const result: CascaderOption[][] = [options]
  let level = options
  for (const index of activePath.value) {
    const option = level[index]
    if (!option?.children?.length)
      break
    level = option.children
    result.push(level)
  }
  return result
})

/** A selected ancestor hides its selected children, so the parent is the visible result. */
const displayValues = computed(() => selectedValues.value.filter((value) => {
  const path = findOptionPath(options, value)
  if (!path)
    return true
  return !path.slice(0, -1).some(node => selectedValues.value.includes(node.value))
}))

function labelOf(value: string) {
  const path = findOptionPath(options, value)
  if (!path)
    return value
  return pathLabel(showPath
    ? path
    : path.slice(-1), separator)
}

const display = computed(() => {
  if (!selectedValues.value.length)
    return ''
  if (multiple)
    return displayValues.value.map(labelOf).join('、')
  return labelOf(selectedValues.value[0]!)
})

const showClear = computed(() => clearable && selectedValues.value.length > 0 && !resolvedDisabled.value && !resolvedReadonly.value)
const hasTags = computed(() => multiple && displayValues.value.length > 0)

/** Base multi-select only lets a leaf be picked; any-level multi adds parent checkboxes. */
function showCheckbox(option: CascaderOption) {
  return multiple && (!option.children?.length || changeOnSelect)
}

function checkOn(option: CascaderOption) {
  if (changeOnSelect && option.children?.length)
    return subtreeState(option, selectedValues.value) === 'checked'
  return selectedValues.value.includes(option.value)
}

function checkMixed(option: CascaderOption) {
  return changeOnSelect && Boolean(option.children?.length) && subtreeState(option, selectedValues.value) === 'indeterminate'
}

function place() {
  const root = rootRef.value
  const panel = panelRef.value
  if (!root || !panel)
    return
  const field = root.querySelector('.ud-cascader__field') ?? root
  const rect = field.getBoundingClientRect()
  const placed = placePanel(
    {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
    },
    { width: panel.offsetWidth, height: panel.offsetHeight },
    { width: window.innerWidth, height: window.innerHeight },
  )
  panelStyle.value = {
    top: `${placed.top}px`,
    left: `${placed.left}px`,
    zIndex: String(layer),
  }
}

function openPanel() {
  if (resolvedDisabled.value || resolvedReadonly.value)
    return
  layer = nextLayerZ()
  const selected = displayValues.value[0]
  const path = selected
    ? findOptionPath(options, selected)
    : null
  if (path?.length) {
    const indices: number[] = []
    let level = options
    for (const node of path) {
      const index = level.indexOf(node)
      if (index < 0)
        break
      indices.push(index)
      level = node.children ?? []
    }
    activePath.value = indices
  }
  open.value = true
  nextTick(place)
}

function closePanel() {
  open.value = false
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

function toggleValue(option: CascaderOption) {
  if (multiple) {
    model.value = selectedValues.value.includes(option.value)
      ? selectedValues.value.filter(value => value !== option.value)
      : [...selectedValues.value, option.value]
    return
  }
  model.value = option.value
}

/** Checking an any-level parent unions or removes its whole subtree. */
function toggleCheck(option: CascaderOption) {
  if (option.disabled || resolvedDisabled.value || resolvedReadonly.value)
    return
  if (option.children?.length) {
    const checked = subtreeState(option, selectedValues.value) !== 'checked'
    const values = collectValues(option)
    model.value = checked
      ? [
          ...new Set([
            ...selectedValues.value,
            ...values,
          ]),
        ]
      : selectedValues.value.filter(value => !values.includes(value))
    return
  }
  toggleValue(option)
}

function onOption(option: CascaderOption, index: number, column: number) {
  if (option.disabled || resolvedDisabled.value || resolvedReadonly.value)
    return
  activePath.value = [
    ...activePath.value.slice(0, column),
    index,
  ]
  nextTick(place)
  if (option.children?.length) {
    // Any-level single select treats the parent as a result but keeps the panel open.
    if (changeOnSelect && !multiple)
      toggleValue(option)
    return
  }
  toggleValue(option)
  if (!multiple && !changeOnSelect)
    closePanel()
}

/** Specified: any-level single select opens the next level on hover. */
function onHover(option: CascaderOption, index: number, column: number) {
  if (multiple || !changeOnSelect || option.disabled || resolvedDisabled.value || resolvedReadonly.value)
    return
  if (!option.children?.length)
    return
  if (activePath.value[column] === index)
    return
  activePath.value = [
    ...activePath.value.slice(0, column),
    index,
  ]
  nextTick(place)
}

function removeValue(value: string) {
  if (resolvedDisabled.value || resolvedReadonly.value)
    return
  const option = findOptionPath(options, value)?.at(-1)
  if (changeOnSelect && option?.children?.length) {
    const values = collectValues(option)
    model.value = selectedValues.value.filter(item => !values.includes(item))
    return
  }
  model.value = selectedValues.value.filter(item => item !== value)
}

function clear(event: MouseEvent) {
  event.stopPropagation()
  model.value = multiple
    ? []
    : null
}
</script>

<template>
  <div
    ref="root"
    class="ud-cascader"
    :class="[
      `ud-cascader--${resolvedSize}`,
      {
        'ud-cascader--disabled': resolvedDisabled,
        'ud-cascader--readonly': resolvedReadonly,
        'ud-cascader--error': resolvedError,
        'ud-cascader--open': open,
        'ud-cascader--tags': hasTags,
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
    <div class="ud-cascader__field">
      <div
        class="ud-cascader__trigger"
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
          v-if="!hasTags"
          class="ud-cascader__value"
          :class="{ 'is-placeholder': !selectedValues.length }"
        >{{ display || placeholder }}</span>
        <span
          v-else
          class="ud-cascader__tags"
        >
          <span
            v-for="value in displayValues"
            :key="value"
            class="ud-cascader__tag"
          >
            <span class="ud-cascader__tag-label">{{ labelOf(value) }}</span>
            <button
              v-if="!resolvedDisabled && !resolvedReadonly"
              type="button"
              class="ud-cascader__tag-remove"
              :aria-label="`移除${labelOf(value)}`"
              @click.stop="removeValue(value)"
            >
              <ParkIcon :icon="Close" />
            </button>
          </span>
        </span>
        <span class="ud-cascader__suffix">
          <button
            v-if="showClear"
            type="button"
            class="ud-cascader__clear"
            aria-label="清除"
            @click="clear"
          >
            <ParkIcon
              :icon="CloseOne"
              theme="filled"
            />
          </button>
          <ParkIcon
            class="ud-cascader__arrow"
            :icon="open ? Up : Down"
          />
        </span>
      </div>
    </div>
    <Teleport to="body">
      <div
        v-if="open"
        ref="panel"
        class="ud-cascader__panel"
        :class="`ud-cascader__panel--${resolvedSize}`"
        :style="panelStyle"
      >
        <div
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          class="ud-cascader__column"
        >
          <button
            v-for="(option, optionIndex) in column"
            :key="option.value"
            type="button"
            class="ud-cascader__option"
            :class="{
              'is-active': activePath[columnIndex] === optionIndex,
              'is-selected': selectedValues.includes(option.value),
            }"
            :disabled="option.disabled"
            @click="onOption(option, optionIndex, columnIndex)"
            @pointerenter="onHover(option, optionIndex, columnIndex)"
          >
            <span
              v-if="showCheckbox(option)"
              class="ud-cascader__check"
              @click.stop="toggleCheck(option)"
            >
              <CheckBox
                :checked="checkOn(option)"
                :indeterminate="checkMixed(option)"
                :disabled="option.disabled"
              />
            </span>
            <span class="ud-cascader__label">{{ option.label }}</span>
            <!-- Measured: a chosen leaf keeps a check mark at the end of its row. -->
            <ParkIcon
              v-if="!multiple && selectedValues.includes(option.value)"
              class="ud-cascader__mark"
              :icon="Check"
            />
            <ParkIcon
              v-if="option.children?.length"
              class="ud-cascader__next"
              :icon="Right"
            />
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
