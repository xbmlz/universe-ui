<script setup lang="ts">
import { Avatar, Badge } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-col">
    <div class="ud-demo-row">
      <Badge round dot dot-size="lg" color="red"><Avatar name="张三" /></Badge>
      <Badge round dot dot-size="lg" color="grey"><Avatar name="李四" /></Badge>
      <Badge round dot dot-size="lg" color="green"><Avatar name="王五" /></Badge>
      <Badge round dot dot-size="lg" color="blue"><Avatar name="赵六" /></Badge>
    </div>
    <div class="ud-demo-row">
      <Badge round dot dot-size="lg" outline><Avatar name="张三" /></Badge>
      <Badge round dot dot-size="lg" color="grey" outline><Avatar name="李四" /></Badge>
    </div>
  </div>
</template>
