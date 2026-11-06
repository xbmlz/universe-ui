<script setup lang="ts" vapor>
import { computed, nextTick, shallowRef, useTemplateRef } from 'vue'
import type { InputSize } from './types'

const model = defineModel<string>({ default: '' })

const {
  length = 6,
  size = 'md',
  separatorAfter,
  mask = false,
  disabled = false,
  error = false,
  fill = false,
  label,
  message,
} = defineProps<{
  length?: number
  size?: InputSize
  separatorAfter?: number[]
  mask?: boolean
  disabled?: boolean
  error?: boolean
  fill?: boolean
  label?: string
  message?: string
}>()

const rootRef = useTemplateRef<HTMLElement>('root')
const focused = shallowRef(false)
const indexes = computed(() => Array.from({ length }, (_, index) => index))
const complete = computed(() => model.value.length >= length)

function cellsIn(node?: EventTarget | null) {
  const source = node instanceof Element ? node : rootRef.value
  const root = source?.closest('.ud-input-otp') ?? rootRef.value
  return [...(root?.querySelectorAll<HTMLInputElement>('.ud-input-otp__cell') ?? [])]
}

function cursorIndex() {
  if (complete.value) return length - 1
  return model.value.length
}

function focusAt(index: number, from?: EventTarget | null) {
  nextTick(() => {
    cellsIn(from)[index]?.focus()
  })
}

const activeFlags = computed(() =>
  indexes.value.map((index) => {
    if (disabled || complete.value) return false
    if (index < model.value.length) return true
    return focused.value && index === model.value.length
  }),
)

function onFocusIn() {
  focused.value = true
}

function onFocusOut(event: FocusEvent) {
  const root = event.currentTarget
  const next = event.relatedTarget
  if (root instanceof Node && next instanceof Node && root.contains(next)) return
  queueMicrotask(() => {
    const active = document.activeElement
    if (root instanceof Node && active instanceof Node && root.contains(active)) return
    focused.value = false
  })
}

function focusFrom(event: Event, index: number) {
  const current = event.currentTarget
  if (!(current instanceof HTMLElement)) return
  const cells = current.closest('.ud-input-otp')?.querySelectorAll<HTMLInputElement>('input.ud-input-otp__cell')
  cells?.[index]?.focus()
}

function onCellMouseDown(event: MouseEvent, index: number) {
  const cursor = cursorIndex()
  if (index === cursor) return
  event.preventDefault()
  focusFrom(event, cursor)
}

function onCellFocus(event: FocusEvent, index: number) {
  focused.value = true
  const cursor = cursorIndex()
  if (index !== cursor) focusFrom(event, cursor)
}

function onKeydown(event: KeyboardEvent) {
  if (disabled) return
  if (event.key === 'Backspace' || event.key === 'Delete') {
    event.preventDefault()
    const nextValue = model.value.slice(0, -1)
    model.value = nextValue
    focusFrom(event, nextValue.length)
    return
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault()
    return
  }
  if (/^\d$/.test(event.key)) {
    event.preventDefault()
    if (model.value.length >= length) return
    const nextValue = (model.value + event.key).slice(0, length)
    model.value = nextValue
    focusFrom(event, Math.min(nextValue.length, length - 1))
  }
}

function onPaste(event: ClipboardEvent) {
  if (disabled) return
  event.preventDefault()
  const digits = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, length)
  if (!digits) return
  model.value = digits
  focusFrom(event, Math.min(digits.length, length - 1))
}

function focus() {
  focusAt(cursorIndex())
}

function clear() {
  model.value = ''
  focusAt(0)
}

defineExpose({ focus, clear })
</script>

<template>
  <div
    ref="root"
    class="ud-input-otp"
    :class="[
      `ud-input-otp--${size}`,
      {
        'ud-input-otp--error': error,
        'ud-input-otp--disabled': disabled,
        'ud-input-otp--complete': complete,
        'ud-input-otp--mask': mask,
        'ud-input-otp--fill': fill,
      },
    ]"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <div v-if="label" class="ud-input__label">{{ label }}</div>
    <div class="ud-input-otp__cells" role="group" :aria-label="label" :aria-invalid="error || undefined">
      <template v-for="index in indexes" :key="index">
        <span v-if="separatorAfter?.includes(index)" class="ud-input-otp__separator" aria-hidden="true">-</span>
        <input
          class="ud-input-otp__cell"
          :class="{ 'ud-input-otp__cell--active': activeFlags[index] }"
          :value="model[index] ?? ''"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="1"
          :disabled="disabled"
          :aria-label="`第 ${index + 1} 位`"
          @mousedown="onCellMouseDown($event, index)"
          @keydown="onKeydown"
          @paste="onPaste"
          @focus="onCellFocus($event, index)"
        />
      </template>
    </div>
    <p v-if="message" class="ud-input__message">{{ message }}</p>
  </div>
</template>
