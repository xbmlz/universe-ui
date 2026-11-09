<script setup lang="ts">
import { Avatar, Badge } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Badge round :count="9">
      <Avatar name="张三" />
    </Badge>
    <Badge round :count="99">
      <Avatar name="李四" />
    </Badge>
    <Badge round :count="999">
      <Avatar name="王五" />
    </Badge>
    <Badge round :count="1000">
      <Avatar name="赵六" />
    </Badge>
    <Badge round :count="0" show-zero>
      <Avatar name="钱七" />
    </Badge>
    <Badge round :count="8" hidden>
      <Avatar name="孙八" />
    </Badge>
  </div>
</template>

<style scoped>
/* Multi-character badges grow to the left, so the row needs extra room to stay legible. */
.ud-demo-row {
  gap: 28px;
}
</style>
