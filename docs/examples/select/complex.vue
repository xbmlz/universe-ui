<script setup lang="ts">
import { Select } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref<string | null>('design')
const options = [
  { value: 'design', label: '设计团队' },
  { value: 'develop', label: '研发团队' },
  { value: 'pm', label: '产品团队' },
]
const descriptions: Record<string, string> = {
  design: '负责视觉规范与组件样式',
  develop: '负责组件实现与接口',
  pm: '负责需求与验收标准',
}
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 380px">
    <Select
      v-model="value"
      :options="options"
      :option-lines="2"
      placeholder="选择团队"
    >
      <template #option="{ option }">
        <span class="select-option">
          <span class="select-option__avatar">{{ option.label.slice(0, 1) }}</span>
          <span class="select-option__body">
            <span class="select-option__title">{{ option.label }}</span>
            <span class="select-option__desc">{{ descriptions[option.value] }}</span>
          </span>
          <span class="select-option__tag">团队</span>
        </span>
      </template>
    </Select>
  </div>
</template>

<style scoped>
.select-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.select-option__avatar {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--ud-radius-full);
  background: var(--ud-color-fill-secondary);
  color: var(--ud-color-text);
  font-size: 12px;
}

.select-option__body {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  flex-direction: column;
}

.select-option__title {
  color: var(--ud-color-text);
}

.select-option__desc {
  overflow: hidden;
  color: var(--ud-color-text-secondary);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-option__tag {
  flex: none;
  padding: 0 6px;
  border-radius: var(--ud-radius-xs);
  background: var(--ud-color-fill-secondary);
  color: var(--ud-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
</style>
