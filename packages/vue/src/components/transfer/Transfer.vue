<script setup lang="ts">
import type { TransferItem } from './types'
import { Close, Search } from '@icon-park/vue-next'
import { computed, shallowRef } from 'vue'
import CheckBox from '../../internal/check-box.vue'
import ParkIcon from '../../internal/park-icon.vue'
import { allChecked, chosenItems, matchingItems } from './state'

/*
 * Specified in transfer.md: the left panel lists every option with a checkbox, the
 * right panel mirrors the chosen keys, the optional search belongs to the left list,
 * the left header reads "全部选项（{已选}/{全部}）" and the right "已选（{已选}）" plus a clear action,
 * a chosen row carries a close button, and the card may be 544-960px wide and at least
 * 240px tall. The composition figure draws only a divider between the panels: a chosen
 * option shows on the right at once and the close button sends it back, so there is no
 * move button. Sizes around 24px are inferred.
 */
const {
  data,
  titles = ['全部选项', '已选'],
  searchable = false,
  height = 320,
  disabled = false,
  leftEmptyText = '无数据',
  rightEmptyText = '暂无已选项',
  label,
} = defineProps<{
  data: TransferItem[]
  titles?: [string, string]
  searchable?: boolean
  height?: number | string
  disabled?: boolean
  leftEmptyText?: string
  rightEmptyText?: string
  label?: string
}>()

const model = defineModel<string[]>({
  default: () => [],
})

const leftQuery = shallowRef('')

const selected = computed(() => model.value ?? [])
const leftItems = computed(() => matchingItems(data, leftQuery.value))
const rightItems = computed(() => chosenItems(data, selected.value))

const leftCheckedCount = computed(() => leftItems.value.filter(item => selected.value.includes(item.key)).length)
const leftAll = computed(() => allChecked(leftItems.value, selected.value))
const leftSome = computed(() => leftCheckedCount.value > 0 && !leftAll.value)

const rootStyle = computed(() => ({
  '--ud-transfer-height': typeof height === 'number'
    ? `${height}px`
    : height,
}))

function isSelected(key: string) {
  return selected.value.includes(key)
}

function toggle(item: TransferItem) {
  if (disabled || item.disabled)
    return
  model.value = isSelected(item.key)
    ? selected.value.filter(key => key !== item.key)
    : [...selected.value, item.key]
}

function toggleAll(checked: boolean) {
  if (disabled)
    return
  const keys = leftItems.value.filter(item => !item.disabled).map(item => item.key)
  model.value = checked
    ? [
        ...new Set([
          ...selected.value,
          ...keys,
        ]),
      ]
    : selected.value.filter(key => !keys.includes(key))
}

function removeKey(key: string) {
  if (disabled)
    return
  model.value = selected.value.filter(item => item !== key)
}

function clear() {
  if (disabled)
    return
  model.value = []
}
</script>

<template>
  <div
    class="ud-transfer"
    :class="{ 'ud-transfer--disabled': disabled }"
    :style="rootStyle"
  >
    <div
      v-if="label"
      class="ud-transfer__label"
    >
      {{ label }}
    </div>
    <div class="ud-transfer__body">
      <div class="ud-transfer__panel">
        <div
          v-if="searchable"
          class="ud-transfer__search-row"
        >
          <label class="ud-transfer__search">
            <ParkIcon
              class="ud-transfer__search-icon"
              :icon="Search"
            />
            <input
              class="ud-transfer__search-input"
              aria-label="搜索全部选项"
              placeholder="搜索"
              :value="leftQuery"
              :disabled="disabled"
              @input="leftQuery = ($event.target as HTMLInputElement).value"
            >
          </label>
        </div>
        <div class="ud-transfer__header">
          <button
            type="button"
            class="ud-transfer__all"
            :disabled="disabled"
            @click="toggleAll(!leftAll)"
          >
            <CheckBox
              :checked="leftAll"
              :indeterminate="leftSome"
              :disabled="disabled"
            />
            <span class="ud-transfer__count-label">{{ titles[0] }}（{{ leftCheckedCount }}/{{ leftItems.length }}）</span>
          </button>
        </div>
        <div class="ud-transfer__list">
          <button
            v-for="item in leftItems"
            :key="item.key"
            type="button"
            class="ud-transfer__row"
            :class="{ 'is-disabled': item.disabled || disabled }"
            :disabled="disabled || item.disabled"
            @click="toggle(item)"
          >
            <CheckBox
              :checked="isSelected(item.key)"
              :disabled="disabled || item.disabled"
            />
            <span class="ud-transfer__text">
              <span class="ud-transfer__title">{{ item.label }}</span>
              <span
                v-if="item.description"
                class="ud-transfer__description"
              >{{ item.description }}</span>
            </span>
          </button>
          <p
            v-if="!leftItems.length"
            class="ud-transfer__empty"
          >
            {{ leftEmptyText }}
          </p>
        </div>
      </div>

      <div class="ud-transfer__panel">
        <div class="ud-transfer__header ud-transfer__header--selected">
          <span class="ud-transfer__count-label">{{ titles[1] }}（{{ rightItems.length }}）</span>
          <button
            type="button"
            class="ud-transfer__clear"
            aria-label="清空已选"
            :disabled="disabled || !selected.length"
            @click="clear"
          >
            清空
          </button>
        </div>
        <div class="ud-transfer__list ud-transfer__list--selected">
          <div
            v-for="item in rightItems"
            :key="item.key"
            class="ud-transfer__row"
            :class="{ 'is-disabled': item.disabled || disabled }"
          >
            <span class="ud-transfer__text">
              <span class="ud-transfer__title">{{ item.label }}</span>
              <span
                v-if="item.description"
                class="ud-transfer__description"
              >{{ item.description }}</span>
            </span>
            <button
              type="button"
              class="ud-transfer__remove"
              :aria-label="`移除${item.label}`"
              :disabled="disabled || item.disabled"
              @click="removeKey(item.key)"
            >
              <ParkIcon :icon="Close" />
            </button>
          </div>
          <p
            v-if="!rightItems.length"
            class="ud-transfer__empty"
          >
            {{ rightEmptyText }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
