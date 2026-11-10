<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const without = ref('a')
const withLine = ref('a')
</script>

<template>
  <div class="tabs-divider">
    <div class="tabs-divider__row">
      <span class="tabs-divider__label">不带分割线</span>
      <Tabs v-model="without" overflow="none">
        <Tab value="a">Tab 1</Tab>
        <Tab value="b">Tab 2</Tab>
        <Tab value="c">Tab 3</Tab>
      </Tabs>
    </div>
    <div class="tabs-divider__row">
      <span class="tabs-divider__label">带分割线（指示器与分割线重合）</span>
      <Tabs v-model="withLine" divider overflow="none">
        <Tab value="a">Tab 1</Tab>
        <Tab value="b">Tab 2</Tab>
        <Tab value="c">Tab 3</Tab>
      </Tabs>
      <div class="tabs-divider__panel">
        分割线把标签行与下方内容分开，选中态指示器的下沿正好压在分割线上。
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs-divider {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 32px;
}

.tabs-divider__row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.tabs-divider__label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}

.tabs-divider__panel {
  padding: 12px 0 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
}
</style>
