<script setup lang="ts">
import { Avatar, Badge } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-col">
    <div class="ud-demo-row">
      <Badge :count="5" color="red"><Avatar name="张三" /></Badge>
      <Badge :count="5" color="grey"><Avatar name="李四" /></Badge>
      <Badge :count="5" color="green"><Avatar name="王五" /></Badge>
      <Badge :count="5" color="blue"><Avatar name="赵六" /></Badge>
    </div>
    <div class="ud-demo-row">
      <Badge count="New" color="red"><Avatar name="张三" /></Badge>
      <Badge count="99+" color="grey"><Avatar name="李四" /></Badge>
      <Badge :count="8" plain><Avatar name="王五" /></Badge>
    </div>
  </div>
</template>
