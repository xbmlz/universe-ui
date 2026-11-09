<script setup lang="ts">
import { Plus, Search, SettingTwo } from '@icon-park/vue-next'
</script>

<template>
  <div class="ud-demo-row icon-demo">
    <Plus :size="24" fill="currentColor" />
    <Search :size="24" fill="currentColor" />
    <SettingTwo :size="24" fill="currentColor" />
  </div>
</template>

<style scoped>
.icon-demo {
  color: var(--ud-color-text);
}
</style>
