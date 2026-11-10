<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const largeLine = ref('a')
const mediumLine = ref('a')
const largeOverCapsule = ref('a')
const capsule = ref('1')

const lineLabels = ['Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab']
</script>

<template>
  <div class="tabs-hierarchy">
    <div class="tabs-hierarchy__pair">
      <p class="tabs-hierarchy__caption">
        Large-tab-line &gt; Medium-tab-line
      </p>
      <Tabs v-model="largeLine" size="lg" divider overflow="none">
        <Tab v-for="(label, index) in lineLabels" :key="`lg-${index}`" :value="String.fromCharCode(97 + index)">
          {{ label }}
        </Tab>
      </Tabs>
      <Tabs v-model="mediumLine" divider overflow="none">
        <Tab v-for="(label, index) in lineLabels" :key="`md-${index}`" :value="String.fromCharCode(97 + index)">
          {{ label }}
        </Tab>
      </Tabs>
    </div>
    <div class="tabs-hierarchy__pair">
      <p class="tabs-hierarchy__caption">
        Large-tab-line &gt; Tab-capsule
      </p>
      <Tabs v-model="largeOverCapsule" size="lg" divider overflow="none">
        <Tab v-for="(label, index) in lineLabels" :key="`lg2-${index}`" :value="String.fromCharCode(97 + index)">
          {{ label }}
        </Tab>
      </Tabs>
      <div class="tabs-hierarchy__capsule">
        <Tabs v-model="capsule" variant="capsule" overflow="more">
          <Tab value="1">Tab 1</Tab>
          <Tab value="2">Tab 2</Tab>
          <Tab value="3">Tab 3</Tab>
          <Tab value="4">Tab 4</Tab>
          <Tab value="5">Tab 5</Tab>
          <Tab value="6">Tab 6</Tab>
          <Tab value="7">Tab 7</Tab>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs-hierarchy {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 32px 48px;
}

.tabs-hierarchy__pair {
  display: flex;
  width: max-content;
  max-width: 100%;
  flex-direction: column;
  gap: 16px;
}

.tabs-hierarchy__caption {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
}

.tabs-hierarchy__capsule {
  width: 360px;
}
</style>
