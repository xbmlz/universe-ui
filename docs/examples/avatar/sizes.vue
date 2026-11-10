<script setup lang="ts">
import { Avatar } from '@universe-ui/vue'

const sizes = [20, 24, 32, 40] as const
</script>

<template>
  <div class="ud-demo-row">
    <div
      v-for="size in sizes"
      :key="size"
      class="avatar-size"
    >
      <Avatar
        name="林七七"
        :size="size"
      />
      <span class="avatar-size__label">{{ size }}</span>
    </div>
  </div>
</template>

<style>
.avatar-size {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.avatar-size__label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-caption);
}
</style>
