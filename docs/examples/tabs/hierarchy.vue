<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const primary = ref('overview')
const secondary = ref('all')
</script>

<template>
  <div class="tabs-hierarchy">
    <Tabs v-model="primary" divider overflow="none">
      <Tab value="overview">概览</Tab>
      <Tab value="members">成员</Tab>
      <Tab value="logs">日志</Tab>
    </Tabs>
    <div class="tabs-hierarchy__body">
      <Tabs v-model="secondary" variant="capsule" size="sm" overflow="none">
        <Tab value="all">全部</Tab>
        <Tab value="mine">我创建的</Tab>
        <Tab value="shared">共享给我</Tab>
      </Tabs>
      <p class="tabs-hierarchy__text">
        {{ primary }} / {{ secondary }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.tabs-hierarchy {
  width: 100%;
}

.tabs-hierarchy__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 0 0;
}

.tabs-hierarchy__text {
  margin: 0;
  padding: 12px 16px;
  border-radius: var(--ud-radius-s);
  background: var(--ud-color-bg-3);
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
}
</style>
