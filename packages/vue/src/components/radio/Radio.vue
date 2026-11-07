<script setup lang="ts">
import type { RadioAlign } from './types'
import { computed, inject, onMounted, shallowRef, useTemplateRef } from 'vue'
import { Tooltip } from '../tooltip'
import { RADIO_GROUP } from './context'

const {
  value,
  disabled = false,
  error = false,
  align = 'first',
} = defineProps<{
  value?: string | number
  disabled?: boolean
  error?: boolean
  align?: RadioAlign
}>()

const model = defineModel<string | number | null>({ default: null })

const group = inject(RADIO_GROUP, null)
const labelRef = useTemplateRef<HTMLElement>('label')
const labelText = shallowRef('')

const resolvedDisabled = computed(() => disabled || (group?.disabled.value ?? false))
const button = computed(() => group?.button.value ?? false)
const checked = computed(() => {
  const current = group ? group.model.value : model.value
  return value !== undefined && current === value
})

const classes = computed(() => ({
  'ud-radio--checked': checked.value,
  'ud-radio--disabled': resolvedDisabled.value,
  'ud-radio--error': error && !button.value && !checked.value,
  'ud-radio--align-center': align === 'center',
  'ud-radio--button': button.value,
}))

onMounted(() => {
  labelText.value = labelRef.value?.textContent?.trim() ?? ''
})

function onChange(event: Event) {
  const input = event.currentTarget as HTMLInputElement
  if (resolvedDisabled.value || value === undefined) {
    input.checked = checked.value
    return
  }
  if (group)
    group.model.value = value
  else model.value = value
  input.checked = true
}
</script>

<template>
  <label
    class="ud-radio"
    :class="classes"
  >
    <input
      class="ud-radio__input"
      type="radio"
      :name="group?.name"
      :checked="checked"
      :disabled="resolvedDisabled"
      :aria-invalid="error || undefined"
      @change="onChange"
    >
    <span
      v-if="!button"
      class="ud-radio__box"
    >
      <span
        v-if="checked"
        class="ud-radio__dot"
      />
    </span>
    <Tooltip
      v-if="button && $slots.default"
      only-overflow
      :content="labelText"
    >
      <span
        ref="label"
        class="ud-radio__label"
      ><slot /></span>
    </Tooltip>
    <span
      v-else-if="$slots.default"
      ref="label"
      class="ud-radio__label"
    ><slot /></span>
  </label>
</template>
