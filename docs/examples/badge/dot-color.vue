<script setup lang="ts">
import { Avatar, Badge } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-col">
    <div class="ud-demo-row">
      <Badge dot color="red"><Avatar name="张三" /></Badge>
      <Badge dot color="grey"><Avatar name="李四" /></Badge>
      <Badge dot color="green"><Avatar name="王五" /></Badge>
      <Badge dot color="blue"><Avatar name="赵六" /></Badge>
    </div>
    <div class="ud-demo-row">
      <Badge dot outline><Avatar name="张三" /></Badge>
      <Badge dot color="grey" outline><Avatar name="李四" /></Badge>
    </div>
  </div>
</template>
