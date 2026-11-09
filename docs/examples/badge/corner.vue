<script setup lang="ts">
import { Avatar, Badge } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Badge corner corner-placement="top-right" count="新品">
      <Avatar name="张三" shape="square" :size="48" />
    </Badge>
    <Badge corner corner-placement="bottom-right" count="HOT" color="red">
      <Avatar name="李四" shape="square" :size="48" />
    </Badge>
    <Badge :count="2" ring :tone="2">
      <Avatar name="王五" />
    </Badge>
  </div>
</template>
