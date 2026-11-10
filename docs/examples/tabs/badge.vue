<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const counts = ref('a')
const dots = ref('a')
</script>

<template>
  <div class="tabs-badge">
    <div class="tabs-badge__row">
      <span class="tabs-badge__label">数字徽标</span>
      <Tabs v-model="counts" divider overflow="none">
        <Tab value="a" :badge="9">Tab 1</Tab>
        <Tab value="b" :badge="99">Tab 2</Tab>
        <Tab value="c">Tab 3</Tab>
      </Tabs>
    </div>
    <div class="tabs-badge__row">
      <span class="tabs-badge__label">点状徽标</span>
      <Tabs v-model="dots" divider overflow="none">
        <Tab value="a" badge>Tab 1</Tab>
        <Tab value="b" badge>Tab 2</Tab>
        <Tab value="c">Tab 3</Tab>
      </Tabs>
    </div>
    <p class="tabs-badge__note">
      徽标位于文字右上角、不占标签宽度，选中态指示器也只覆盖文字本身。
    </p>
  </div>
</template>

<style scoped>
.tabs-badge {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 28px;
  padding-top: 20px;
}

.tabs-badge__row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.tabs-badge__label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}

.tabs-badge__note {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body);
}
</style>
