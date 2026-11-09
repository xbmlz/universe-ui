<script setup lang="ts">
import { Button } from '@universe-ui/vue'
</script>

<template>
  <div
    class="ud-demo-row"
    style="padding: 16px; background: var(--ud-color-bg-1); border-radius: var(--ud-radius-m)"
  >
    <Button type="secondary">普通次要</Button>
    <Button type="secondary" ghost>透明次要</Button>
    <Button type="secondary" ghost disabled>禁用</Button>
  </div>
</template>
