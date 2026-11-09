<script setup lang="ts">
import { Avatar, Badge } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Badge round :count="3" placement="top-right">
      <Avatar name="张三" />
    </Badge>
    <Badge round :count="3" placement="bottom-right">
      <Avatar name="李四" />
    </Badge>
  </div>
</template>
