<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const counts = ref('a')
const dots = ref('a')
</script>

<template>
  <div class="tabs-badge">
    <Tabs v-model="counts" divider overflow="none">
      <Tab value="a" :badge="9">Tab</Tab>
      <Tab value="b" :badge="99">Tab</Tab>
      <Tab value="c" :badge="99">Tab</Tab>
      <Tab value="d">Tab</Tab>
      <Tab value="e">Tab</Tab>
    </Tabs>
    <Tabs v-model="dots" divider overflow="none">
      <Tab value="a" badge>Tab</Tab>
      <Tab value="b" badge>Tab</Tab>
      <Tab value="c" badge>Tab</Tab>
      <Tab value="d">Tab</Tab>
      <Tab value="e">Tab</Tab>
      <Tab value="f" badge>Tab</Tab>
    </Tabs>
  </div>
</template>

<style scoped>
.tabs-badge {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding-top: 16px;
}

.tabs-badge :deep(.ud-tabs) {
  width: auto;
}
</style>
