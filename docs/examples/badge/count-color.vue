<script setup lang="ts">
import { Avatar, Badge } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-col">
    <div class="ud-demo-row">
      <Badge round :count="5" color="red"><Avatar name="张三" /></Badge>
      <Badge round :count="5" color="grey"><Avatar name="李四" /></Badge>
      <Badge round :count="5" color="green"><Avatar name="王五" /></Badge>
      <Badge round :count="5" color="blue"><Avatar name="赵六" /></Badge>
    </div>
    <div class="ud-demo-row">
      <Badge round count="New" color="red"><Avatar name="张三" /></Badge>
      <Badge round :count="99" color="grey"><Avatar name="李四" /></Badge>
      <Badge round :count="8" plain><Avatar name="王五" /></Badge>
    </div>
  </div>
</template>

<style scoped>
/* Multi-character and text badges grow to the left, so widen the row to avoid collisions. */
.ud-demo-row {
  gap: 36px;
}
</style>
