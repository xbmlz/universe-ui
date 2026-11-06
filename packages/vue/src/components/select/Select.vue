<script setup lang="ts" vapor>
import { computed, inject, nextTick, onBeforeUnmount, onMounted, shallowRef, useId, useTemplateRef } from 'vue'
import { Check, Close, CloseOne, Down, Up } from '@icon-park/vue-next'
import ParkIcon from '../../internal/park-icon.vue'
import { INPUT_GROUP } from '../input/context'
import { Tooltip } from '../tooltip'
import type { InputSize } from '../input/types'
import type { SelectOption } from './types'

const model = defineModel<string | string[] | null>({ default: null })

const {
  options,
  size = 'md',
  multiple = false,
  disabled = false,
  readonly = false,
  error = false,
  required = false,
  clearable = false,
  filterable = false,
  loading = false,
  maxTagCount,
  label,
  placeholder = '请选择',
  message,
  emptyText = '无选项',
  noResultText = '无搜索结果',
  optionLines = 1,
} = defineProps<{
  options: SelectOption[]
  size?: InputSize
  multiple?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  required?: boolean
  clearable?: boolean
  filterable?: boolean
  loading?: boolean
  maxTagCount?: number
  label?: string
  placeholder?: string
  message?: string
  emptyText?: string
  noResultText?: string
  optionLines?: 1 | 2
}>()

const group = inject(INPUT_GROUP, undefined)
const resolvedSize = computed(() => group?.size.value ?? size)
const resolvedDisabled = computed(() => disabled || (group?.disabled.value ?? false))
const resolvedReadonly = computed(() => readonly || (group?.readonly.value ?? false))
const resolvedError = computed(() => error || (group?.error.value ?? false))

const rootRef = useTemplateRef<HTMLElement>('root')
const menuRef = useTemplateRef<HTMLElement>('menu')
const triggerRef = useTemplateRef<HTMLElement>('trigger')
const searchRef = useTemplateRef<HTMLInputElement>('search')
const open = shallowRef(false)
const query = shallowRef('')
const activeIndex = shallowRef(0)
const placement = shallowRef<'bottom' | 'top'>('bottom')
const align = shallowRef<'start' | 'end'>('start')

const selectedValues = computed(() => {
  if (multiple) return Array.isArray(model.value) ? model.value : []
  if (model.value == null || Array.isArray(model.value) || model.value === '') return []
  return [model.value]
})

const selectedOptions = computed(() =>
  selectedValues.value.map((value) => options.find((option) => option.value === value) ?? { value, label: value }),
)

const visibleTags = computed(() => {
  if (maxTagCount == null) return selectedOptions.value
  return selectedOptions.value.slice(0, maxTagCount)
})

const labelId = useId()
const hiddenTags = computed(() => selectedOptions.value.slice(visibleTags.value.length))
const hiddenCount = computed(() => hiddenTags.value.length)
const hasValue = computed(() => selectedValues.value.length > 0)
const singleLabel = computed(() => selectedOptions.value[0]?.label ?? '')
const showClear = computed(() => (clearable && hasValue.value || query.value.length > 0) && !resolvedDisabled.value && !resolvedReadonly.value)
const filteredOptions = computed(() => {
  const text = query.value.trim().toLowerCase()
  if (!filterable || !text) return options
  return options.filter((option) => option.label.toLowerCase().includes(text))
})
const searchPlaceholder = computed(() => {
  if (multiple && hasValue.value) return ''
  if (!multiple && hasValue.value && !query.value) return singleLabel.value
  return placeholder
})

function isSelected(value: string) {
  return selectedValues.value.includes(value)
}

function firstEnabled() {
  const index = filteredOptions.value.findIndex((option) => !option.disabled)
  return index < 0 ? 0 : index
}

function matchParts(labelText: string) {
  const text = query.value.trim()
  const index = text ? labelText.toLowerCase().indexOf(text.toLowerCase()) : -1
  if (!text || index < 0) return [{ text: labelText, match: false }]
  return [
    { text: labelText.slice(0, index), match: false },
    { text: labelText.slice(index, index + text.length), match: true },
    { text: labelText.slice(index + text.length), match: false },
  ].filter((part) => part.text)
}

function place() {
  const root = rootRef.value
  const menu = menuRef.value
  if (!root || !menu) return
  const field = root.querySelector('.ud-select__field')
  const rect = (field ?? root).getBoundingClientRect()
  const menuHeight = menu.offsetHeight
  const menuWidth = menu.offsetWidth
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  placement.value = spaceBelow < menuHeight + 4 && spaceAbove > spaceBelow ? 'top' : 'bottom'
  align.value = window.innerWidth - rect.left < menuWidth && rect.right >= menuWidth ? 'end' : 'start'
}

function openMenu() {
  if (resolvedDisabled.value || resolvedReadonly.value) return
  open.value = true
  activeIndex.value = firstEnabled()
  nextTick(() => {
    place()
    if (filterable) searchRef.value?.focus()
  })
}

function closeMenu() {
  open.value = false
  query.value = ''
}

function toggle() {
  if (open.value) closeMenu()
  else openMenu()
}

function onTriggerClick(event: MouseEvent) {
  if (resolvedDisabled.value || resolvedReadonly.value) return
  const target = event.target
  if (target instanceof Element && target.closest('.ud-select__clear, .ud-select__tag-remove')) return
  toggle()
}

function choose(option: SelectOption) {
  if (option.disabled || resolvedDisabled.value || resolvedReadonly.value) return
  if (multiple) {
    const current = Array.isArray(model.value) ? model.value : []
    model.value = current.includes(option.value)
      ? current.filter((value) => value !== option.value)
      : [...current, option.value]
    return
  }
  model.value = option.value
  closeMenu()
}

function remove(value: string, event: MouseEvent) {
  event.stopPropagation()
  if (!multiple || resolvedDisabled.value || resolvedReadonly.value) return
  const current = Array.isArray(model.value) ? model.value : []
  model.value = current.filter((item) => item !== value)
}

function clear(event: MouseEvent) {
  event.stopPropagation()
  query.value = ''
  model.value = multiple ? [] : null
  activeIndex.value = firstEnabled()
}

function onSearch(event: Event) {
  const field = event.target
  if (!(field instanceof HTMLInputElement)) return
  query.value = field.value
  if (!open.value) openMenu()
  activeIndex.value = firstEnabled()
  nextTick(place)
}

function move(step: number) {
  const list = filteredOptions.value
  if (!list.length) return
  let index = activeIndex.value
  for (let count = 0; count < list.length; count += 1) {
    index = (index + step + list.length) % list.length
    if (!list[index]?.disabled) break
  }
  activeIndex.value = index
  nextTick(() => {
    menuRef.value?.querySelector('.ud-select__option.is-active')?.scrollIntoView({ block: 'nearest' })
  })
}

function onKeydown(event: KeyboardEvent) {
  if (resolvedDisabled.value || resolvedReadonly.value) return
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!open.value) openMenu()
    else move(1)
    return
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!open.value) openMenu()
    else move(-1)
    return
  }
  if (event.key === 'Enter') {
    if (!open.value) {
      event.preventDefault()
      openMenu()
      return
    }
    const option = filteredOptions.value[activeIndex.value]
    if (!option) return
    event.preventDefault()
    choose(option)
    return
  }
  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    closeMenu()
  }
}

function onDocPointerDown(event: PointerEvent) {
  const root = rootRef.value
  if (!open.value || !root) return
  if (event.target instanceof Node && root.contains(event.target)) return
  closeMenu()
}

function focus() {
  triggerRef.value?.focus()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointerDown)
})

defineExpose({ focus })
</script>

<template>
  <div
    ref="root"
    class="ud-select"
    :style="{ '--ud-select-option-lines': String(optionLines) }"
    :class="[
      `ud-select--${resolvedSize}`,
      {
        'ud-select--multiple': multiple,
        'ud-select--tags': multiple && hasValue,
        'ud-select--collapsed': maxTagCount != null,
        'ud-select--open': open,
        'ud-select--disabled': resolvedDisabled,
        'ud-select--readonly': resolvedReadonly,
        'ud-select--error': resolvedError,
        'ud-select--top': placement === 'top',
        'ud-select--end': align === 'end',
      },
    ]"
  >
    <div v-if="label" class="ud-input__label">
      <span v-if="required" class="ud-input__required" aria-hidden="true">*</span><span :id="labelId">{{ label }}</span>
    </div>
    <div class="ud-select__field">
    <div
      ref="trigger"
      class="ud-select__trigger"
      role="combobox"
      :tabindex="resolvedDisabled ? -1 : 0"
      :aria-expanded="open"
      :aria-labelledby="label ? labelId : undefined"
      :aria-required="required || undefined"
      :aria-disabled="resolvedDisabled || undefined"
      :aria-invalid="resolvedError || undefined"
      @click="onTriggerClick"
      @keydown="onKeydown"
    >
      <span
        class="ud-select__value"
        :class="{
          'is-placeholder': !hasValue,
          'is-dim': open && !multiple && hasValue && !filterable,
        }"
      >
        <template v-if="multiple && hasValue">
          <span v-for="option in visibleTags" :key="option.value" class="ud-select__tag">
            <span class="ud-select__tag-label">{{ option.label }}</span>
            <button
              v-if="!resolvedDisabled && !resolvedReadonly"
              type="button"
              class="ud-select__tag-remove"
              :aria-label="`移除${option.label}`"
              @click="remove(option.value, $event)"
            >
              <ParkIcon :icon="Close" />
            </button>
          </span>
          <span v-if="hiddenCount > 0" class="ud-select__tag ud-select__more">
            +{{ hiddenCount }}
            <span class="ud-select__more-pop" role="tooltip">
              <span v-for="option in hiddenTags" :key="option.value" class="ud-select__tag">{{ option.label }}</span>
            </span>
          </span>
        </template>
        <input
          v-if="filterable && open"
          ref="search"
          class="ud-select__search"
          :value="query"
          :placeholder="searchPlaceholder"
          @click.stop
          @input="onSearch"
          @keydown.stop="onKeydown"
        />
        <span v-else-if="!(multiple && hasValue)" class="ud-select__single">{{ hasValue ? singleLabel : placeholder }}</span>
      </span>
      <span class="ud-select__suffix">
        <button v-if="showClear" type="button" class="ud-select__clear" aria-label="清除" @click="clear">
          <ParkIcon :icon="CloseOne" theme="filled" />
        </button>
        <ParkIcon class="ud-select__arrow" :icon="open ? Up : Down" />
      </span>
    </div>
    <div v-if="open" ref="menu" class="ud-select__menu" role="listbox" :aria-label="label">
      <div v-if="loading" class="ud-select__loading">
        <span class="ud-select__spinner" aria-hidden="true" />
      </div>
      <div v-else-if="!filteredOptions.length" class="ud-select__empty">{{ query ? noResultText : emptyText }}</div>
      <template v-else>
        <button
          v-for="(option, index) in filteredOptions"
          :key="option.value"
          type="button"
          class="ud-select__option"
          :class="{
            'is-active': index === activeIndex,
            'is-selected': isSelected(option.value),
            'is-disabled': option.disabled,
          }"
          role="option"
          :aria-selected="isSelected(option.value)"
          :disabled="option.disabled"
          @mouseenter="activeIndex = index"
          @click="choose(option)"
        >
          <Tooltip only-overflow :content="option.label">
            <span class="ud-select__option-label">
              <template v-for="(part, partIndex) in matchParts(option.label)" :key="partIndex">
                <span v-if="part.match" class="ud-select__match">{{ part.text }}</span>
                <template v-else>{{ part.text }}</template>
              </template>
            </span>
          </Tooltip>
          <ParkIcon v-if="isSelected(option.value)" class="ud-select__check" :icon="Check" size="16" />
        </button>
      </template>
    </div>
    </div>
    <p v-if="message" class="ud-select__message">{{ message }}</p>
  </div>
</template>
