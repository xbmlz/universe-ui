<script setup lang="ts">
import type { InputSize } from './types'
import { computed, nextTick, onBeforeUnmount, onMounted, useId, useTemplateRef, watch } from 'vue'

const {
  size = 'md',
  disabled = false,
  readonly = false,
  error = false,
  required = false,
  autosize = false,
  truncate = false,
  maxlength,
  label,
  placeholder,
  message,
} = defineProps<{
  size?: InputSize
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  required?: boolean
  /** Multiline: grows from single-line height with content. Otherwise a resizable textarea. */
  autosize?: boolean
  /** Truncate past maxlength. Otherwise keep the extra characters and show the error state. */
  truncate?: boolean
  maxlength?: number
  label?: string
  placeholder?: string
  message?: string
}>()

const model = defineModel<string>({ default: '' })

const fieldId = useId()
const fieldRef = useTemplateRef<HTMLTextAreaElement>('field')
const controlRef = useTemplateRef<HTMLElement>('control')
const countRef = useTemplateRef<HTMLElement>('count')
const count = computed(() => model.value.length)
const over = computed(() => maxlength != null && count.value > maxlength)
const invalid = computed(() => error || over.value)

// Single and multi-line padding differ. Always measure as single-line first so the line count depends only on content and does not flip between the two widths.
function fit() {
  const field = fieldRef.value
  const control = controlRef.value
  if (!field || !control || !autosize)
    return
  control.dataset.lines = 'single'
  field.style.setProperty('--ud-input-area-count-width', `${countRef.value?.offsetWidth ?? 0}px`)
  field.style.height = '0px'
  if (field.scrollHeight > field.clientHeight) {
    control.dataset.lines = 'multi'
  }
  const style = getComputedStyle(field)
  const border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
  const min = parseFloat(style.minHeight)
  // scrollHeight is rounded, so on scaled displays it can exceed the minimum height by a fraction of a pixel.
  const height = field.scrollHeight + border
  field.style.height = `${height - min < 1
    ? min
    : height}px`
}

function onInput(event: Event) {
  const field = event.currentTarget
  if (!(field instanceof HTMLTextAreaElement))
    return
  let next = field.value
  if (truncate && maxlength != null && next.length > maxlength) {
    next = next.slice(0, maxlength)
    field.value = next
  }
  model.value = next
  fit()
}

function focus() {
  fieldRef.value?.focus()
}

let resizeObserver: ResizeObserver | undefined
let lastWidth = 0

onMounted(() => {
  fit()
  if (!autosize || !controlRef.value)
    return
  resizeObserver = new ResizeObserver(([entry]) => {
    if (entry.contentRect.width === lastWidth)
      return
    lastWidth = entry.contentRect.width
    fit()
  })
  resizeObserver.observe(controlRef.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())

watch(
  () => model.value,
  (value) => {
    if (truncate && maxlength != null && value.length > maxlength) {
      model.value = value.slice(0, maxlength)
      return
    }
    nextTick(fit)
  },
)

defineExpose({ focus })
</script>

<template>
  <div
    class="ud-input-area"
    :class="[
      `ud-input-area--${size}`,
      {
        'ud-input-area--autosize': autosize,
        'ud-input-area--disabled': disabled,
        'ud-input-area--readonly': readonly,
        'ud-input-area--error': invalid,
        'ud-input-area--over': over,
      },
    ]"
  >
    <label
      v-if="label"
      class="ud-input__label"
      :for="fieldId"
    >
      <span
        v-if="required"
        class="ud-input__required"
        aria-hidden="true"
      >*</span>{{ label }}
    </label>
    <div
      ref="control"
      class="ud-input-area__control"
    >
      <textarea
        :id="fieldId"
        ref="field"
        class="ud-input-area__field"
        :value="model"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="truncate ? maxlength : undefined"
        :required="required"
        :aria-invalid="invalid || undefined"
        :aria-describedby="message ? `${fieldId}-message` : undefined"
        @input="onInput"
      />
      <span
        v-if="maxlength != null"
        ref="count"
        class="ud-input-area__count"
        :class="{ 'ud-input-area__count--filled': count > 0 }"
      >
        <span class="ud-input-area__count-value">{{ count }}</span>/{{ maxlength }}
      </span>
    </div>
    <p
      v-if="message"
      :id="`${fieldId}-message`"
      class="ud-input__message"
    >
      {{ message }}
    </p>
  </div>
</template>
