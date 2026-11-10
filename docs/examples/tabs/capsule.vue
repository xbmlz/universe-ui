<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const active = ref('tab2')
const medium = ref('a')
const small = ref('a')
</script>

<template>
  <div class="tabs-capsule">
    <div class="tabs-capsule__row">
      <span class="tabs-capsule__label">状态：Normal / Selected / Disabled / Hover</span>
      <Tabs v-model="active" variant="capsule" overflow="none">
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3" disabled>Tab 3</Tab>
        <Tab value="tab4">Tab 4</Tab>
      </Tabs>
    </div>
    <div class="tabs-capsule__row">
      <span class="tabs-capsule__label">Medium · 14px / 28px 高 / 12px 间距</span>
      <Tabs v-model="medium" variant="capsule" overflow="none">
        <Tab value="a">Tab 1</Tab>
        <Tab value="b">Tab 2</Tab>
        <Tab value="c">Tab 3</Tab>
      </Tabs>
    </div>
    <div class="tabs-capsule__row">
      <span class="tabs-capsule__label">Small · 12px / 24px 高 / 8px 间距</span>
      <Tabs v-model="small" variant="capsule" size="sm" overflow="none">
        <Tab value="a">Tab 1</Tab>
        <Tab value="b">Tab 2</Tab>
        <Tab value="c">Tab 3</Tab>
      </Tabs>
    </div>
  </div>
</template>

<style scoped>
.tabs-capsule {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
}

.tabs-capsule__row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.tabs-capsule__label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}
</style>
