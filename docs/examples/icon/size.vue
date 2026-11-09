<script setup lang="ts">
import { Plus } from '@icon-park/vue-next'
</script>

<template>
  <div class="ud-demo-row icon-sizes">
    <span class="icon-size">
      <Plus :size="16" fill="currentColor" />
      <small>16</small>
    </span>
    <span class="icon-size">
      <Plus :size="24" fill="currentColor" />
      <small>24</small>
    </span>
    <span class="icon-size">
      <Plus :size="32" fill="currentColor" />
      <small>32</small>
    </span>
  </div>
</template>

<style scoped>
.icon-sizes {
  color: var(--ud-color-text);
}

.icon-size {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ud-color-text-secondary);
  font-size: 12px;
}
</style>
