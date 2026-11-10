<script setup lang="ts">
import { ref } from 'vue'
import { Button, Popover } from '@universe-ui/vue'

const open = ref(false)
</script>

<template>
  <div class="ud-demo-row">
    <Popover
      v-model:open="open"
      trigger="click"
      type="info"
      title="确认删除？"
      content="删除后不可恢复，请确认是否继续。"
    >
      <Button type="secondary">二次确认</Button>
      <template #footer>
        <Button
          type="secondary"
          size="sm"
          @click="open = false"
        >
          取消
        </Button>
        <Button
          type="primary"
          size="sm"
          @click="open = false"
        >
          确认
        </Button>
      </template>
    </Popover>
  </div>
</template>
