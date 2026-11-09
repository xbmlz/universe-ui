<script setup lang="ts">
import { Tag } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-col">
    <div class="ud-demo-row">
      <Tag>透明底色</Tag>
      <Tag solid>不透明底色</Tag>
      <Tag disabled>禁用</Tag>
    </div>
    <div class="ud-demo-row">
      <Tag color="blue">蓝色透明</Tag>
      <Tag color="blue" solid>蓝色实心</Tag>
      <Tag color="green" solid>绿色实心</Tag>
    </div>
  </div>
</template>
