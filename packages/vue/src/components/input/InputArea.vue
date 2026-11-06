<script setup lang="ts" vapor>
import { computed, nextTick, onBeforeUnmount, onMounted, useId, useTemplateRef, watch } from 'vue'
import type { InputSize } from './types'

const model = defineModel<string>({ default: '' })

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
  /** 多行：从单行高度随内容增高。否则为可拖拽的文本域。 */
  autosize?: boolean
  /** 超出 maxlength 时截断。否则保留超出字符并进入错误态。 */
  truncate?: boolean
  maxlength?: number
  label?: string
  placeholder?: string
  message?: string
}>()

const fieldId = useId()
const fieldRef = useTemplateRef<HTMLTextAreaElement>('field')
const controlRef = useTemplateRef<HTMLElement>('control')
const countRef = useTemplateRef<HTMLElement>('count')
const count = computed(() => model.value.length)
const over = computed(() => maxlength != null && count.value > maxlength)
const invalid = computed(() => error || over.value)

// 单行和多行的留白不同。每次都先按单行量，行数只由内容决定，不会在两种宽度之间来回跳。
function fit() {
  const field = fieldRef.value
  const control = controlRef.value
  if (!field || !control || !autosize) return
  control.dataset.lines = 'single'
  field.style.setProperty('--ud-input-area-count-width', `${countRef.value?.offsetWidth ?? 0}px`)
  field.style.height = '0px'
  if (field.scrollHeight > field.clientHeight) {
    control.dataset.lines = 'multi'
  }
  const style = getComputedStyle(field)
  const border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
  const min = parseFloat(style.minHeight)
  // scrollHeight 是取整后的值，缩放屏下会比最小高度多出零点几像素。
  const height = field.scrollHeight + border
  field.style.height = `${height - min < 1 ? min : height}px`
}

function onInput(event: Event) {
  const field = event.currentTarget
  if (!(field instanceof HTMLTextAreaElement)) return
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
  if (!autosize || !controlRef.value) return
  resizeObserver = new ResizeObserver(([entry]) => {
    if (entry.contentRect.width === lastWidth) return
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
    <label v-if="label" class="ud-input__label" :for="fieldId">
      <span v-if="required" class="ud-input__required" aria-hidden="true">*</span>{{ label }}
    </label>
    <div ref="control" class="ud-input-area__control">
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
      <span v-if="maxlength != null" ref="count" class="ud-input-area__count" :class="{ 'ud-input-area__count--filled': count > 0 }">
        <span class="ud-input-area__count-value">{{ count }}</span>/{{ maxlength }}
      </span>
    </div>
    <p v-if="message" :id="`${fieldId}-message`" class="ud-input__message">{{ message }}</p>
  </div>
</template>
