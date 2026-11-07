<script setup lang="ts">
import type { CheckboxAlign } from './types'
import { computed, inject, onMounted, useTemplateRef, watch } from 'vue'
import { CHECKBOX_GROUP } from './context'

const {
  value,
  indeterminate = false,
  disabled = false,
  error = false,
  align = 'first',
} = defineProps<{
  value?: string | number
  indeterminate?: boolean
  disabled?: boolean
  error?: boolean
  align?: CheckboxAlign
}>()

const model = defineModel<boolean>({ default: false })

const group = inject(CHECKBOX_GROUP, null)
const inputRef = useTemplateRef<HTMLInputElement>('input')

const resolvedDisabled = computed(() => disabled || (group?.disabled.value ?? false))
const checked = computed(() => {
  if (group && value !== undefined)
    return group.model.value.includes(value)
  return model.value
})
const mixed = computed(() => indeterminate && !checked.value)

const classes = computed(() => ({
  'ud-checkbox--checked': checked.value,
  'ud-checkbox--indeterminate': mixed.value,
  'ud-checkbox--disabled': resolvedDisabled.value,
  'ud-checkbox--error': error && !checked.value && !mixed.value,
  'ud-checkbox--align-center': align === 'center',
}))

function syncMixed() {
  if (inputRef.value)
    inputRef.value.indeterminate = mixed.value
}

onMounted(syncMixed)
watch(mixed, syncMixed)

function onChange(event: Event) {
  const input = event.currentTarget as HTMLInputElement
  if (resolvedDisabled.value) {
    input.checked = checked.value
    return
  }
  const next = mixed.value ? true : input.checked
  if (group && value !== undefined) {
    const current = group.model.value
    group.model.value = next
      ? current.includes(value)
        ? current
        : [...current, value]
      : current.filter(item => item !== value)
    input.checked = next
    return
  }
  model.value = next
  input.checked = next
}
</script>

<template>
  <label
    class="ud-checkbox"
    :class="classes"
  >
    <input
      ref="input"
      class="ud-checkbox__input"
      type="checkbox"
      :checked="checked"
      :disabled="resolvedDisabled"
      :aria-invalid="error || undefined"
      :aria-checked="mixed ? 'mixed' : undefined"
      @change="onChange"
    >
    <span class="ud-checkbox__box">
      <svg
        v-if="checked"
        class="ud-checkbox__mark"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path
          d="M4.8 8.2 7 10.4 11.4 5.6"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span
        v-else-if="mixed"
        class="ud-checkbox__bar"
      />
    </span>
    <span
      v-if="$slots.default"
      class="ud-checkbox__label"
    ><slot /></span>
  </label>
</template>
