<script setup lang="ts">
import { Avatar, Badge } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Badge :count="5">
      <Avatar name="张三" />
    </Badge>
    <Badge :count="120" :max="99">
      <Avatar name="李四" />
    </Badge>
    <Badge :count="0" show-zero>
      <Avatar name="王五" />
    </Badge>
    <Badge :count="12" hidden>
      <Avatar name="赵六" />
    </Badge>
  </div>
</template>
