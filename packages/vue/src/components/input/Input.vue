<script setup lang="ts">
import { CloseOne } from '@icon-park/vue-next'
import { computed, inject, onBeforeUnmount, onMounted, shallowRef, useId, useTemplateRef } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { INPUT_GROUP } from './context'

const {
  type = 'text',
  size = 'md',
  disabled = false,
  readonly = false,
  error = false,
  required = false,
  borderless = false,
  clearable = false,
  label,
  placeholder,
  message,
} = defineProps<{
  type?: 'text' | 'password'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  required?: boolean
  borderless?: boolean
  clearable?: boolean
  label?: string
  placeholder?: string
  message?: string
}>()

const model = defineModel<string>({ default: '' })

const group = inject(INPUT_GROUP, undefined)
const resolvedSize = computed(() => group?.size.value ?? size)
const resolvedDisabled = computed(() => disabled || (group?.disabled.value ?? false))
const resolvedReadonly = computed(() => readonly || (group?.readonly.value ?? false))
const resolvedError = computed(() => error || (group?.error.value ?? false))

const inputId = useId()
const fieldRef = useTemplateRef<HTMLInputElement>('field')
const addonBeforeRef = useTemplateRef<HTMLElement>('addonBefore')
const addonAfterRef = useTemplateRef<HTMLElement>('addonAfter')
const addonFloor = shallowRef('0px')

let addonObserver: ResizeObserver | undefined

function syncAddonFloor() {
  const before = addonBeforeRef.value?.offsetWidth ?? 0
  const after = addonAfterRef.value?.offsetWidth ?? 0
  addonFloor.value = `${Math.max(before, after)}px`
  for (const node of [addonBeforeRef.value, addonAfterRef.value]) {
    if (!node)
      continue
    const label = node.querySelector('.ud-input-addon__label')
    const text = (label ?? node).textContent ?? ''
    node.toggleAttribute('data-single', [
      ...text.trim(),
    ].length === 1)
  }
}

onMounted(() => {
  const nodes = [addonBeforeRef.value, addonAfterRef.value].filter(node => node !== null)
  if (!nodes.length || typeof ResizeObserver === 'undefined')
    return
  addonObserver = new ResizeObserver(syncAddonFloor)
  nodes.forEach(node => addonObserver?.observe(node))
  syncAddonFloor()
})

onBeforeUnmount(() => {
  addonObserver?.disconnect()
})

function focus() {
  fieldRef.value?.focus()
}

function clear() {
  model.value = ''
  fieldRef.value?.focus()
}

defineExpose({ focus })
</script>

<template>
  <div
    class="ud-input"
    :class="[
      `ud-input--${resolvedSize}`,
      {
        'ud-input--error': resolvedError,
        'ud-input--disabled': resolvedDisabled,
        'ud-input--readonly': resolvedReadonly,
        'ud-input--borderless': borderless,
      },
    ]"
    :style="$slots['addon-before'] || $slots['addon-after'] ? { '--ud-input-field-min': addonFloor } : undefined"
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
    <div class="ud-input__control">
      <span
        v-if="$slots['addon-before']"
        ref="addonBefore"
        class="ud-input__addon ud-input__addon--before"
      >
        <span class="ud-input__addon-label"><slot name="addon-before" /></span>
      </span>
      <div class="ud-input__main">
        <span
          v-if="$slots.prefix"
          class="ud-input__affix"
        ><slot name="prefix" /></span>
        <input
          :id="inputId"
          ref="field"
          v-model="model"
          class="ud-input__field"
          :type="type"
          :placeholder="placeholder"
          :disabled="resolvedDisabled"
          :readonly="resolvedReadonly"
          :required="required"
          :aria-invalid="resolvedError || undefined"
          :aria-describedby="message ? `${inputId}-message` : undefined"
        >
        <span
          v-if="(clearable && !resolvedDisabled && !resolvedReadonly && model) || $slots.suffix"
          class="ud-input__suffix"
        >
          <button
            v-if="clearable && !resolvedDisabled && !resolvedReadonly && model"
            type="button"
            class="ud-input__clear"
            aria-label="清除"
            @mousedown.prevent
            @click="clear"
          >
            <ParkIcon
              :icon="CloseOne"
              theme="filled"
            />
          </button>
          <span
            v-if="$slots.suffix"
            class="ud-input__icons"
          ><slot name="suffix" /></span>
        </span>
        <span
          v-if="$slots.tag"
          class="ud-input__tag"
        ><slot name="tag" /></span>
      </div>
      <span
        v-if="$slots['addon-after']"
        ref="addonAfter"
        class="ud-input__addon ud-input__addon--after"
      >
        <span class="ud-input__addon-label"><slot name="addon-after" /></span>
      </span>
    </div>
    <p
      v-if="message"
      :id="`${inputId}-message`"
      class="ud-input__message"
    >
      {{ message }}
    </p>
  </div>
</template>
