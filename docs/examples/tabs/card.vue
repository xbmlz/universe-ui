<script setup lang="ts">
import { computed, ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

interface TabItem {
  value: string
  label: string
}

const items = ref<TabItem[]>([
  { value: 'tab1', label: 'Tab 1' },
  { value: 'tab2', label: 'Tab 2' },
  { value: 'tab3', label: 'Tab 3' },
])
const active = ref<string | null>('tab1')
let next = 4

const activeLabel = computed(() => items.value.find(item => item.value === active.value)?.label ?? '—')

function add() {
  const value = `tab${next}`
  items.value.push({ value, label: `Tab ${next}` })
  active.value = value
  next += 1
}

function remove(value: string) {
  const index = items.value.findIndex(item => item.value === value)
  if (index < 0)
    return
  items.value.splice(index, 1)
  // Tabs already moves the selection to the previous enabled tab on close.
  if (!items.value.some(item => item.value === active.value))
    active.value = items.value[Math.max(0, index - 1)]?.value ?? null
}
</script>

<template>
  <div class="tabs-card">
    <Tabs
      v-model="active"
      variant="card"
      addable
      overflow="none"
      @add="add"
    >
      <Tab
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        closable
        @close="remove(item.value)"
      >
        {{ item.label }}
      </Tab>
    </Tabs>
    <div class="tabs-card__panel">
      {{ activeLabel }} 的内容区。选中的页签与内容面板连成一体，未选中的页签之间用竖线分隔。
    </div>
  </div>
</template>

<style scoped>
.tabs-card {
  width: 100%;
}

.tabs-card__panel {
  box-sizing: border-box;
  min-height: 88px;
  padding: 16px;
  border: 1px solid var(--ud-color-border-card);
  border-top: 0;
  border-radius: 0 0 var(--ud-radius-s) var(--ud-radius-s);
  background: var(--ud-color-bg-white);
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
}
</style>
