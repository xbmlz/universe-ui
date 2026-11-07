<script setup lang="ts">
import type { ButtonSize } from './types'
import { computed, provide } from 'vue'
import { BUTTON_GROUP_SIZE } from './context'

const { size = 'md' } = defineProps<{
  size?: ButtonSize
}>()

provide(BUTTON_GROUP_SIZE, computed(() => size))
</script>

<template>
  <div
    class="ud-button-group"
    :data-size="size"
  >
    <slot />
  </div>
</template>
