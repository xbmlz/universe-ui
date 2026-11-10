<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Popover, Radio, RadioGroup } from '@universe-ui/vue'

const open = ref(false)
const name = ref('')
const visibility = ref('public')
</script>

<template>
  <div class="ud-demo-row">
    <Popover
      v-model:open="open"
      trigger="click"
      size="lg"
      title="新建分享"
      title-strong
    >
      <Button type="primary">自定义内容</Button>
      <template #content>
        <div class="popover-complex">
          <label class="popover-complex__field">
            <span>名称</span>
            <Input
              v-model="name"
              placeholder="请输入名称"
              style="min-width: 0"
            />
          </label>
          <div class="popover-complex__field">
            <span>可见范围</span>
            <RadioGroup
              v-model="visibility"
              direction="horizontal"
            >
              <Radio value="public">公开</Radio>
              <Radio value="private">仅自己</Radio>
            </RadioGroup>
          </div>
        </div>
      </template>
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
          创建
        </Button>
      </template>
    </Popover>
  </div>
</template>

<style scoped>
.popover-complex {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.popover-complex__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}
</style>
