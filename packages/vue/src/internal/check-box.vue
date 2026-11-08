<script setup lang="ts">
const {
  checked = false,
  indeterminate = false,
  disabled = false,
} = defineProps<{
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <span
    class="ud-check-box"
    :class="{
      'is-checked': checked,
      'is-indeterminate': indeterminate && !checked,
      'is-disabled': disabled,
    }"
    aria-hidden="true"
  >
    <svg
      v-if="checked"
      class="ud-check-box__mark"
      viewBox="0 0 16 16"
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
      v-else-if="indeterminate"
      class="ud-check-box__bar"
    />
  </span>
</template>

<style>
/* The same visual as Checkbox (16px, radius XS, brand fill + white check) so row checkboxes match the design in tree, cascader and transfer. */
.ud-check-box {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 1px solid var(--ud-color-icon-tertiary);
  border-radius: var(--ud-radius-xs);
  background: var(--ud-color-bg-white);
  color: var(--ud-color-white);
}

.ud-check-box.is-checked,
.ud-check-box.is-indeterminate {
  border-color: var(--ud-color-brand);
  background: var(--ud-color-brand);
}

.ud-check-box__mark {
  display: block;
  width: 16px;
  height: 16px;
}

.ud-check-box__bar {
  width: 8px;
  height: 2px;
  background: currentColor;
}

.ud-check-box.is-disabled {
  border-color: var(--ud-color-text-disabled);
  background: var(--ud-color-fill-disabled);
  color: var(--ud-color-fill-disabled);
}

.ud-check-box.is-disabled.is-checked,
.ud-check-box.is-disabled.is-indeterminate {
  border-color: var(--ud-color-text-disabled);
  background: var(--ud-color-text-disabled);
  color: var(--ud-color-fill-disabled);
}
</style>
