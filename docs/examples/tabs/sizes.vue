<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const large = ref('a')
const medium = ref('a')
const small = ref('a')
</script>

<template>
  <div class="tabs-sizes">
    <div class="tabs-sizes__row">
      <span class="tabs-sizes__label">Large · 16px</span>
      <Tabs v-model="large" size="lg" divider overflow="none">
        <Tab value="a">Tab 1</Tab>
        <Tab value="b">Tab 2</Tab>
        <Tab value="c">Tab 3</Tab>
      </Tabs>
    </div>
    <div class="tabs-sizes__row">
      <span class="tabs-sizes__label">Medium · 14px</span>
      <Tabs v-model="medium" divider overflow="none">
        <Tab value="a">Tab 1</Tab>
        <Tab value="b">Tab 2</Tab>
        <Tab value="c">Tab 3</Tab>
      </Tabs>
    </div>
    <div class="tabs-sizes__row">
      <span class="tabs-sizes__label">Small · 12px</span>
      <Tabs v-model="small" size="sm" divider overflow="none">
        <Tab value="a">Tab 1</Tab>
        <Tab value="b">Tab 2</Tab>
        <Tab value="c">Tab 3</Tab>
      </Tabs>
    </div>
  </div>
</template>

<style scoped>
.tabs-sizes {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
}

.tabs-sizes__row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.tabs-sizes__label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  white-space: nowrap;
}
</style>
