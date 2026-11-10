<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const active = ref('1')
</script>

<template>
  <div class="tabs-divider">
    <Tabs v-model="active" divider overflow="none">
      <Tab v-for="n in 6" :key="n" :value="String(n)">Tab{{ n }}</Tab>
    </Tabs>
  </div>
</template>

<style scoped>
.tabs-divider {
  box-sizing: border-box;
  width: 100%;
  padding: 28px 32px 36px;
  border-radius: var(--ud-radius-m);
  background: var(--ud-color-bg-white);
  box-shadow: var(--ud-shadow-down-s1);
}
</style>
