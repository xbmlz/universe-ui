<script setup lang="ts">
import type { ColorPickerSize } from './types'
import { Check, Down, Right } from '@icon-park/vue-next'
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, onMounted, shallowRef, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { placePanel } from '../../internal/placement'
import { nextLayerZ } from '../dialog/scroll-lock'
import { hexToHsv, hexToRgb, hsvToHex, parseHex, rgbToHex } from './color'
import { FULL_PALETTE } from './palette'

/*
 * Specified in color-picker.md: a swatch panel, an optional custom entry with a
 * saturation/value area, a hue slider and RGB values, and the no-colour option.
 * The panel closes right after a swatch is chosen. Panel padding, swatch size
 * and the 8px gap are measured at 2x from the limited-picker figure.
 */
const {
  swatches,
  columns = 6,
  allowCustom = true,
  allowNoColor = false,
  disabled = false,
  size = 'md',
  placeholder = '选择颜色',
  label,
  remember = true,
  storageKey,
} = defineProps<{
  swatches?: string[]
  columns?: number
  allowCustom?: boolean
  allowNoColor?: boolean
  disabled?: boolean
  size?: ColorPickerSize
  placeholder?: string
  label?: string
  /** Keep the most recently chosen colours available below the palette. */
  remember?: boolean
  /** Persist remembered colours in localStorage under this key. */
  storageKey?: string
}>()

const model = defineModel<string>({ default: '' })

const open = shallowRef(false)
const custom = shallowRef(false)
const hue = shallowRef(0)
const saturation = shallowRef(1)
const brightness = shallowRef(1)
const hexDraft = shallowRef('')
const dragging = shallowRef(false)
const recent = shallowRef<string[]>([])

const triggerRef = useTemplateRef<HTMLElement>('trigger')
const panelRef = useTemplateRef<HTMLElement>('panel')
const areaRef = useTemplateRef<HTMLElement>('area')
const windowTarget = shallowRef<Window | null>(null)
onMounted(() => {
  windowTarget.value = window
  if (remember && storageKey) {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
      if (Array.isArray(stored))
        recent.value = stored.filter(value => typeof value === 'string').slice(0, 8)
    }
    catch {
      recent.value = []
    }
  }
})

let layer = 0
const panelStyle = shallowRef<Record<string, string>>({})

const palette = computed(() => swatches ?? FULL_PALETTE)
const fullPalette = computed(() => palette.value.length > 12)
const current = computed(() => parseHex(model.value) ?? '')
const preview = computed(() => hsvToHex({
  h: hue.value,
  s: saturation.value,
  v: brightness.value,
}))
const previewRgb = computed(() => hexToRgb(preview.value) ?? { r: 0, g: 0, b: 0 })
const channels = computed(() => [
  { key: 'r', label: 'R', value: previewRgb.value.r },
  { key: 'g', label: 'G', value: previewRgb.value.g },
  { key: 'b', label: 'B', value: previewRgb.value.b },
] as const)
const cursorStyle = computed(() => ({
  left: `${saturation.value * 100}%`,
  top: `${(1 - brightness.value) * 100}%`,
}))

function sync() {
  const hsv = hexToHsv(model.value)
  if (!hsv)
    return
  hue.value = hsv.h
  saturation.value = hsv.s
  brightness.value = hsv.v
  hexDraft.value = (parseHex(model.value) ?? '').toUpperCase()
}

watch(model, () => {
  if (open.value)
    sync()
}, { immediate: true })

function place() {
  const trigger = triggerRef.value
  const panel = panelRef.value
  if (!trigger || !panel)
    return
  const rect = trigger.getBoundingClientRect()
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

function show() {
  if (disabled)
    return
  sync()
  layer = nextLayerZ()
  custom.value = palette.value.length === 0
  open.value = true
  nextTick(place)
}

function close() {
  if (custom.value && remember.value && current.value)
    rememberColor(current.value)
  open.value = false
  dragging.value = false
}

function toggle() {
  if (open.value)
    close()
  else
    show()
}

function onOutside(event: PointerEvent) {
  if (!open.value)
    return
  const target = event.target
  if (target instanceof Node && (triggerRef.value?.contains(target) || panelRef.value?.contains(target)))
    return
  close()
}

useEventListener(windowTarget, 'pointerdown', onOutside)
useEventListener(windowTarget, 'scroll', place, { capture: true, passive: true })
useEventListener(windowTarget, 'resize', place)

function rememberColor(color: string) {
  if (!remember.value)
    return
  recent.value = [
    color,
    ...recent.value.filter(item => item !== color),
  ].slice(0, 8)
  if (storageKey) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(recent.value))
    }
    catch {
      // Storage can be unavailable in privacy mode; the in-memory list still works.
    }
  }
}

function pick(swatch: string) {
  const parsed = parseHex(swatch)
  if (!parsed)
    return
  rememberColor(parsed)
  model.value = parsed
  close()
}

function clear() {
  model.value = ''
  close()
}

function openCustom() {
  custom.value = true
  nextTick(place)
}

function isSelected(swatch: string) {
  return current.value === parseHex(swatch)
}

/** Light swatches need a dark check to stay visible on the selected fill. */
function isLight(swatch: string) {
  const rgb = hexToRgb(swatch)
  if (!rgb)
    return false
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 180
}

function readArea(event: PointerEvent) {
  const area = areaRef.value
  if (!area)
    return
  const rect = area.getBoundingClientRect()
  saturation.value = Math.min(1, Math.max(0, (event.clientX - rect.left) / Math.max(1, rect.width)))
  brightness.value = 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / Math.max(1, rect.height)))
  model.value = preview.value
}

function startArea(event: PointerEvent) {
  if (event.button !== 0)
    return
  event.preventDefault()
  dragging.value = true
  readArea(event)
}

function onMove(event: PointerEvent) {
  if (dragging.value)
    readArea(event)
}

function stopDrag() {
  dragging.value = false
}

useEventListener(windowTarget, 'pointermove', onMove)
useEventListener(windowTarget, 'pointerup', stopDrag)
useEventListener(windowTarget, 'pointercancel', stopDrag)

function onHue(event: Event) {
  const field = event.target
  if (!(field instanceof HTMLInputElement))
    return
  hue.value = Number(field.value)
  model.value = preview.value
}

function selectText(event: Event) {
  const field = event.target
  if (field instanceof HTMLInputElement)
    field.select()
}

function onHexInput(event: Event) {
  const field = event.target
  if (field instanceof HTMLInputElement)
    hexDraft.value = field.value
}

function onHexCommit(event: Event) {
  const field = event.target
  if (!(field instanceof HTMLInputElement))
    return
  const parsed = parseHex(field.value)
  if (!parsed) {
    resetHex()
    return
  }
  model.value = parsed
  const hsv = hexToHsv(parsed)
  if (hsv) {
    hue.value = hsv.h
    saturation.value = hsv.s
    brightness.value = hsv.v
  }
}

function resetHex() {
  hexDraft.value = (parseHex(model.value) ?? preview.value).toUpperCase()
}

function onChannel(channel: 'r' | 'g' | 'b', event: Event) {
  const field = event.target
  if (!(field instanceof HTMLInputElement))
    return
  const value = Number.parseInt(field.value, 10)
  if (Number.isNaN(value))
    return
  const next = {
    ...previewRgb.value,
    [channel]: Math.min(255, Math.max(0, value)),
  }
  model.value = rgbToHex(next)
}
</script>

<template>
  <div
    class="ud-color-picker"
    :class="[`ud-color-picker--${size}`, { 'ud-color-picker--disabled': disabled }]"
  >
    <label
      v-if="label"
      class="ud-input__label"
    >{{ label }}</label>
    <button
      ref="trigger"
      type="button"
      class="ud-color-picker__trigger"
      :disabled="disabled"
      :aria-expanded="open"
      @click="toggle"
    >
      <span
        class="ud-color-picker__chip"
        :class="{ 'is-empty': !current }"
        :style="current ? { background: current } : undefined"
      />
      <span
        class="ud-color-picker__text"
        :class="{ 'is-placeholder': !current }"
      >{{ current || placeholder }}</span>
      <ParkIcon
        class="ud-color-picker__arrow"
        :icon="Down"
      />
    </button>
    <Teleport to="body">
      <div
        v-if="open"
        ref="panel"
        class="ud-color-picker__panel"
        :class="{ 'is-custom': custom, 'is-full': !custom && fullPalette }"
        :style="panelStyle"
      >
        <template v-if="custom">
          <div
            ref="area"
            class="ud-color-picker__area"
            :style="{ background: `hsl(${hue} 100% 50%)` }"
            @pointerdown="startArea"
          >
            <span class="ud-color-picker__area-white" />
            <span class="ud-color-picker__area-black" />
            <span
              class="ud-color-picker__cursor"
              :style="cursorStyle"
            />
          </div>
          <div class="ud-color-picker__hue-row">
            <span
              class="ud-color-picker__current"
              :style="{ background: preview }"
            />
            <input
              class="ud-color-picker__hue"
              type="range"
              min="0"
              max="360"
              aria-label="色相"
              :value="Math.round(hue)"
              @input="onHue"
            >
          </div>
          <div class="ud-color-picker__fields">
            <label class="ud-color-picker__field is-hex">
              <span class="ud-color-picker__field-label">HEX</span>
              <input
                class="ud-color-picker__value"
                :value="hexDraft || preview.toUpperCase()"
                aria-label="HEX 色值"
                @focus="selectText"
                @input="onHexInput"
                @change="onHexCommit"
                @blur="resetHex"
              >
            </label>
            <label
              v-for="channel in channels"
              :key="channel.key"
              class="ud-color-picker__field"
            >
              <span class="ud-color-picker__field-label">{{ channel.label }}</span>
              <input
                class="ud-color-picker__value"
                :aria-label="channel.label"
                :value="channel.value"
                @focus="selectText"
                @input="onChannel(channel.key, $event)"
              >
            </label>
          </div>
        </template>
        <template v-else>
          <div
            class="ud-color-picker__grid"
            :style="{ gridTemplateColumns: `repeat(${columns}, var(--ud-color-picker-swatch))` }"
          >
            <button
              v-if="allowNoColor"
              type="button"
              class="ud-color-picker__swatch is-none"
              aria-label="取消颜色"
              @click="clear"
            />
            <button
              v-for="(swatch, index) in palette"
              :key="swatch"
              type="button"
              class="ud-color-picker__swatch"
              :class="{
                'is-first-row': fullPalette && index < columns,
                'is-light': isLight(swatch),
                'is-selected': isSelected(swatch),
              }"
              :style="{ background: swatch }"
              :aria-label="swatch"
              @click="pick(swatch)"
            >
              <ParkIcon
                v-if="isSelected(swatch)"
                class="ud-color-picker__check"
                :icon="Check"
                :size="12"
              />
            </button>
          </div>
          <div
            v-if="recent.length"
            class="ud-color-picker__recent"
          >
            <span class="ud-color-picker__recent-label">最近使用</span>
            <div class="ud-color-picker__recent-list">
              <button
                v-for="swatch in recent"
                :key="`recent-${swatch}`"
                type="button"
                class="ud-color-picker__swatch"
                :class="{ 'is-light': isLight(swatch), 'is-selected': isSelected(swatch) }"
                :style="{ background: swatch }"
                :aria-label="`最近使用 ${swatch}`"
                @click="pick(swatch)"
              >
                <ParkIcon
                  v-if="isSelected(swatch)"
                  class="ud-color-picker__check"
                  :icon="Check"
                  :size="12"
                />
              </button>
            </div>
          </div>
          <div
            v-if="allowCustom"
            class="ud-color-picker__footer"
          >
            <button
              type="button"
              class="ud-color-picker__more"
              @click="openCustom"
            >
              <span class="ud-color-picker__rainbow" />
              <span class="ud-color-picker__more-text">自定义颜色</span>
              <ParkIcon
                class="ud-color-picker__more-arrow"
                :icon="Right"
              />
            </button>
          </div>
        </template>
      </div>
    </Teleport>
  </div>
</template>
