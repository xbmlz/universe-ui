<script setup lang="ts">
import { Plus } from '@icon-park/vue-next'
import { Select } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref<string | null>(null)
const options = ref([
  { value: 'design', label: '设计' },
  { value: 'develop', label: '研发' },
])

function createOption() {
  const option = { value: 'pm', label: '产品' }
  if (!options.value.some(item => item.value === option.value))
    options.value = [...options.value, option]
  value.value = option.value
}
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 320px">
    <Select
      v-model="value"
      :options="options"
      filterable
      placeholder="搜索或新建选项"
    >
      <template #menu-footer>
        <button type="button" class="select-create" @click="createOption">
          <Plus :size="16" fill="currentColor" />
          新建选项
        </button>
      </template>
    </Select>
  </div>
</template>

<style scoped>
.select-create {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  width: calc(100% - 8px);
  margin: 4px;
  padding: 6px 8px;
  border: 0;
  border-top: 1px solid var(--ud-color-border);
  border-radius: 0;
  background: transparent;
  color: var(--ud-color-brand-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
</style>
