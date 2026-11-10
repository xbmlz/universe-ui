<script setup lang="ts">
import { Button, Popover } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Popover
      title="加载中"
      loading
    >
      <Button type="secondary">悬停加载</Button>
    </Popover>
  </div>
</template>
