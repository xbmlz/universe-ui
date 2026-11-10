<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const large = ref(1)
const medium = ref(1)
const small = ref(1)
</script>

<template>
  <div class="tabs-sizes">
    <div class="tabs-sizes__row">
      <span class="tabs-sizes__label">Large</span>
      <Tabs v-model="large" size="lg" divider overflow="none">
        <Tab v-for="n in 6" :key="n" :value="n">Tab</Tab>
      </Tabs>
    </div>
    <div class="tabs-sizes__row">
      <span class="tabs-sizes__label">Medium</span>
      <Tabs v-model="medium" divider overflow="none">
        <Tab v-for="n in 6" :key="n" :value="n">Tab</Tab>
      </Tabs>
    </div>
    <div class="tabs-sizes__row">
      <span class="tabs-sizes__label">Small</span>
      <Tabs v-model="small" size="sm" divider overflow="none">
        <Tab v-for="n in 6" :key="n" :value="n">Tab</Tab>
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
  align-items: center;
  gap: 28px;
  min-width: 0;
}

.tabs-sizes__label {
  flex: none;
  width: 72px;
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
  white-space: nowrap;
}
</style>
