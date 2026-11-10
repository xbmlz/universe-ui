<script setup lang="ts">
import { Button, Card } from '@universe-ui/vue'
import { Check, Close } from '@icon-park/vue-next'
import { ref } from 'vue'

const accepted = ref(false)
</script>

<template>
  <div class="action-list">
    <Card
      title="团队邀请"
      subtitle="3 位成员等待确认"
    >
      <template #extra>
        <Close
          :size="16"
          fill="var(--ud-color-icon-secondary)"
        />
      </template>
      <p class="action-text">确认后成员可以访问全部设计文件。</p>
      <template #footer>
        <span>剩余 7 天</span>
      </template>
      <template #actions>
        <Button size="sm">
          忽略
        </Button>
        <Button
          size="sm"
          type="primary"
          @click="accepted = true"
        >
          接受邀请
        </Button>
      </template>
    </Card>
    <p
      v-if="accepted"
      class="action-hint"
    >
      <Check
        :size="14"
        fill="var(--ud-color-success)"
      />
      邀请已接受
    </p>
  </div>
</template>

<style scoped>
.action-list {
  width: 100%;
  max-width: 360px;
}

.action-text {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
}

.action-hint {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 8px 0 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}
</style>
