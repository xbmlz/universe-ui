<script setup lang="ts">
import type { StepperSize } from './types'
import { Minus, Plus } from '@icon-park/vue-next'
import { computed, onBeforeUnmount, shallowRef, useId, useTemplateRef, watch } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'

/*
 * Specified in stepper.md: heights 28 / 32 / 40px follow the input scale, default
 * width 160px, Radius-S, 16x16 icons, 14px Regular text, integer values only, the
 * minus button disables at the minimum and the plus button at the maximum, clearing
 * the field and leaving sets the minimum, an out-of-range value becomes the nearest
 * bound, and a long press repeats at 800ms.
 */
const {
  min = 0,
  max,
  step = 1,
  size = 'md',
  disabled = false,
  readonly = false,
  error = false,
  required = false,
  label,
  message,
  width = 160,
} = defineProps<{
  min?: number
  max?: number
  step?: number
  size?: StepperSize
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  required?: boolean
  label?: string
  message?: string
  width?: number | string
}>()

const model = defineModel<number | null>({ default: null })

const inputId = useId()
const fieldRef = useTemplateRef<HTMLInputElement>('field')
const text = shallowRef('')

watch(
  () => model.value,
  (value) => {
    const next = value == null
      ? ''
      : String(value)
    if (text.value !== next)
      text.value = next
  },
  { immediate: true },
)

const downDisabled = computed(() => disabled || readonly || (min != null && (model.value ?? min) <= min))
const upDisabled = computed(() => disabled || readonly || (max != null && (model.value ?? max) >= max))
const rootStyle = computed(() => ({
  '--ud-stepper-width': typeof width === 'number'
    ? `${width}px`
    : width,
}))

function clamp(value: number) {
  let next = value
  if (min != null && next < min)
    next = min
  if (max != null && next > max)
    next = max
  return next
}

function setValue(value: number) {
  const next = clamp(value)
  model.value = next
  text.value = String(next)
}

function stepBy(direction: 1 | -1) {
  if (disabled || readonly)
    return
  if (direction === 1 && upDisabled.value)
    return
  if (direction === -1 && downDisabled.value)
    return
  setValue((model.value ?? min) + direction * step)
}

let delayTimer = 0
let repeatTimer = 0

function stopRepeat() {
  window.clearTimeout(delayTimer)
  window.clearInterval(repeatTimer)
  delayTimer = 0
  repeatTimer = 0
}

function beginRepeat(direction: 1 | -1) {
  repeatTimer = window.setInterval(stepBy, 800, direction)
}

function startRepeat(direction: 1 | -1, event: PointerEvent) {
  event.preventDefault()
  if (disabled || readonly)
    return
  if (event.button !== 0)
    return
  stepBy(direction)
  stopRepeat()
  delayTimer = window.setTimeout(beginRepeat, 800, direction)
}

onBeforeUnmount(stopRepeat)

function onInput(event: Event) {
  const field = event.target
  if (!(field instanceof HTMLInputElement))
    return
  const digits = field.value.replace(/\D/g, '')
  if (digits !== field.value)
    field.value = digits
  text.value = digits
  model.value = digits === ''
    ? null
    : Number(digits)
}

function onBlur() {
  if (text.value === '') {
    setValue(min)
    return
  }
  setValue(Number(text.value))
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    stepBy(1)
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    stepBy(-1)
  }
}
</script>

<template>
  <div
    class="ud-stepper"
    :class="[
      `ud-stepper--${size}`,
      {
        'ud-stepper--disabled': disabled,
        'ud-stepper--readonly': readonly,
        'ud-stepper--error': error,
      },
    ]"
    :style="rootStyle"
  >
    <label
      v-if="label"
      class="ud-input__label"
      :for="inputId"
    >
      <span
        v-if="required"
        class="ud-input__required"
        aria-hidden="true"
      >*</span>
      {{ label }}
    </label>
    <div class="ud-stepper__control">
      <button
        type="button"
        class="ud-stepper__btn"
        aria-label="减少"
        :disabled="downDisabled"
        @pointerdown="startRepeat(-1, $event)"
        @pointerup="stopRepeat"
        @pointerleave="stopRepeat"
        @pointercancel="stopRepeat"
      >
        <ParkIcon :icon="Minus" />
      </button>
      <input
        :id="inputId"
        ref="field"
        class="ud-stepper__field"
        :value="text"
        inputmode="numeric"
        role="spinbutton"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-valuenow="model ?? undefined"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-invalid="error || undefined"
        @input="onInput"
        @blur="onBlur"
        @keydown="onKeydown"
      >
      <button
        type="button"
        class="ud-stepper__btn"
        aria-label="增加"
        :disabled="upDisabled"
        @pointerdown="startRepeat(1, $event)"
        @pointerup="stopRepeat"
        @pointerleave="stopRepeat"
        @pointercancel="stopRepeat"
      >
        <ParkIcon :icon="Plus" />
      </button>
    </div>
    <p
      v-if="message"
      class="ud-input__message"
    >
      {{ message }}
    </p>
  </div>
</template>
