<script setup lang="ts">
import { Button } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-stack">
    <div class="ud-demo-row">
      <Button type="primary" loading>加载中</Button>
      <Button type="primary" disabled>禁用</Button>
      <Button type="secondary" round>全圆角</Button>
    </div>
    <Button type="secondary" block>通栏按钮</Button>
  </div>
</template>
