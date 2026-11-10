<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const active = ref('overview')
</script>

<template>
  <div class="tabs-basic">
    <Tabs v-model="active" divider>
      <Tab value="overview">概览</Tab>
      <Tab value="detail">明细</Tab>
      <Tab value="settings">设置</Tab>
    </Tabs>
    <p class="tabs-basic__panel">
      当前标签页：{{ active }}
    </p>
  </div>
</template>

<style scoped>
.tabs-basic {
  width: 100%;
}

.tabs-basic__panel {
  margin: 16px 0 0;
  padding: 16px;
  border-radius: var(--ud-radius-s);
  background: var(--ud-color-bg-1);
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
}
</style>
