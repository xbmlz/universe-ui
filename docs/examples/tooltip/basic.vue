<script setup lang="ts">
import { Button, Tooltip } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Tooltip content="新建文档">
      <Button type="primary">新建</Button>
    </Tooltip>
    <Tooltip content="取消当前操作">
      <Button type="secondary">取消</Button>
    </Tooltip>
  </div>
</template>
