<script setup lang="ts">
import { Button } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-stack">
    <div class="ud-demo-row">
      <Button type="text">编辑</Button>
      <Button type="text">删除</Button>
      <Button type="text" disabled>禁用</Button>
    </div>
    <div class="ud-demo-row" style="align-items: baseline">
      <span>创建完成后可以在</span>
      <Button type="link">任务列表</Button>
      <span>中查看进度。</span>
    </div>
  </div>
</template>
