<script setup lang="ts">
import { Avatar, Badge, Button } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Badge round :count="3">
      <Avatar name="张三" />
    </Badge>
    <Badge dot dot-size="lg">
      <Avatar name="李四" shape="square" />
    </Badge>
    <Badge :count="8" color="green">
      <Button type="secondary">消息</Button>
    </Badge>
  </div>
</template>
