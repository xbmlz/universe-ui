<script setup lang="ts">
import { Button } from '@universe-ui/vue'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <Button type="primary">主要按钮</Button>
    <Button type="danger">危险按钮</Button>
    <Button type="secondary-primary">蓝色次要按钮</Button>
    <Button type="secondary-danger">危险次要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="text">文字按钮</Button>
    <Button type="link">链接按钮</Button>
  </div>
</template>
