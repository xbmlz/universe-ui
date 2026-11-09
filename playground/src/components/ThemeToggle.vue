<script setup lang="ts">
import type { ThemeMode } from '@universe-ui/vue'
import { useTheme } from '@universe-ui/vue'

const { mode, setMode } = useTheme()

const options: Array<{ value: ThemeMode, label: string }> = [
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
  { value: 'auto', label: '自动' },
]
</script>

<template>
  <div
    class="theme-toggle"
    role="group"
    aria-label="主题"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="theme-toggle__option"
      :class="{ 'theme-toggle__option--active': mode === option.value }"
      @click="setMode(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
