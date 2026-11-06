<script setup lang="ts" vapor>
import { computed, inject, shallowRef, useId, useTemplateRef, watch } from 'vue'
import { Down, Up } from '@icon-park/vue-next'
import ParkIcon from '../../internal/park-icon.vue'
import { INPUT_GROUP } from './context'

const model = defineModel<number | null>({ default: null })

const {
  size = 'md',
  min,
  max,
  step = 1,
  disabled = false,
  readonly = false,
  error = false,
  required = false,
  label,
  placeholder,
  message,
} = defineProps<{
  size?: 'sm' | 'md' | 'lg'
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  required?: boolean
  label?: string
  placeholder?: string
  message?: string
}>()

const group = inject(INPUT_GROUP, undefined)
const resolvedSize = computed(() => group?.size.value ?? size)
const resolvedDisabled = computed(() => disabled || (group?.disabled.value ?? false))
const resolvedReadonly = computed(() => readonly || (group?.readonly.value ?? false))
const resolvedError = computed(() => error || (group?.error.value ?? false))

const inputId = useId()
const fieldRef = useTemplateRef<HTMLInputElement>('field')
const text = shallowRef('')

const completeNumber = /^-?\d+(\.\d+)?$/
const partialNumber = /^-?\d*\.?$/

watch(
  () => model.value,
  (value) => {
    if (value == null) {
      if (text.value === '' || completeNumber.test(text.value)) text.value = ''
      return
    }
    if (Number(text.value) !== value) text.value = String(value)
  },
  { immediate: true },
)

const typeError = computed(() => text.value !== '' && !completeNumber.test(text.value) && !partialNumber.test(text.value))
const invalid = computed(() => resolvedError.value || typeError.value)
const shownMessage = computed(() => (typeError.value ? '输入类型错误' : message))

const upDisabled = computed(
  () => resolvedDisabled.value || resolvedReadonly.value || (max != null && model.value != null && model.value >= max),
)
const downDisabled = computed(
  () => resolvedDisabled.value || resolvedReadonly.value || (min != null && model.value != null && model.value <= min),
)

function focus() {
  fieldRef.value?.focus()
}

function decimalPlaces(value: number) {
  const source = String(value)
  const index = source.indexOf('.')
  return index === -1 ? 0 : source.length - index - 1
}

function clamp(value: number) {
  let next = value
  if (min != null && next < min) next = min
  if (max != null && next > max) next = max
  return Number(next.toFixed(decimalPlaces(step)))
}

function commit(value: number) {
  const next = clamp(value)
  text.value = String(next)
  model.value = next
}

function stepBy(direction: 1 | -1) {
  if (resolvedDisabled.value || resolvedReadonly.value) return
  if (direction === 1 && upDisabled.value) return
  if (direction === -1 && downDisabled.value) return
  commit((model.value ?? 0) + direction * step)
}

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  text.value = value
  if (value === '') {
    model.value = null
    return
  }
  if (completeNumber.test(value)) model.value = Number(value)
  else if (!partialNumber.test(value)) model.value = null
}

function onBlur() {
  if (completeNumber.test(text.value)) {
    commit(Number(text.value))
    return
  }
  if (text.value === '' || text.value === '-' || text.value === '.' || text.value.endsWith('.')) {
    const parsed = Number(text.value)
    if (text.value.endsWith('.') && Number.isFinite(parsed)) commit(parsed)
    else text.value = model.value == null ? '' : String(model.value)
  }
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

defineExpose({ focus })
</script>

<template>
  <div
    class="ud-input ud-input--number"
    :class="[
      `ud-input--${resolvedSize}`,
      {
        'ud-input--error': invalid,
        'ud-input--disabled': resolvedDisabled,
        'ud-input--readonly': resolvedReadonly,
      },
    ]"
  >
    <label v-if="label" class="ud-input__label" :for="inputId">
      <span v-if="required" class="ud-input__required" aria-hidden="true">*</span>
      {{ label }}
    </label>
    <div class="ud-input__control">
      <input
        :id="inputId"
        ref="field"
        class="ud-input__field"
        :value="text"
        inputmode="decimal"
        role="spinbutton"
        :placeholder="placeholder"
        :disabled="resolvedDisabled"
        :readonly="resolvedReadonly"
        :required="required"
        :aria-invalid="invalid || undefined"
        :aria-valuenow="model ?? undefined"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-describedby="shownMessage ? `${inputId}-message` : undefined"
        @input="onInput"
        @keydown="onKeydown"
        @blur="onBlur"
      />
      <span class="ud-input__stepper">
        <button
          type="button"
          class="ud-input__step"
          aria-label="增加"
          :disabled="upDisabled"
          @mousedown.prevent
          @click="stepBy(1)"
        >
          <ParkIcon :icon="Up" />
        </button>
        <button
          type="button"
          class="ud-input__step"
          aria-label="减少"
          :disabled="downDisabled"
          @mousedown.prevent
          @click="stepBy(-1)"
        >
          <ParkIcon :icon="Down" />
        </button>
      </span>
    </div>
    <p v-if="shownMessage" :id="`${inputId}-message`" class="ud-input__message">{{ shownMessage }}</p>
  </div>
</template>
