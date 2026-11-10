<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const active = ref('tab1')
const labels = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab 6', 'Tab 7', 'Tab 8', 'Tab 9']
</script>

<template>
  <div class="tabs-scroll">
    <div class="tabs-scroll__frame">
      <Tabs v-model="active" divider overflow="scroll">
        <Tab
          v-for="(label, index) in labels"
          :key="label"
          :value="`tab${index + 1}`"
        >
          {{ label }}
        </Tab>
      </Tabs>
    </div>
    <p class="tabs-scroll__note">
      点击左右箭头整页翻动，也可以直接横向滑动。设计稿把页签滚动用于 Tab-line。
    </p>
  </div>
</template>

<style scoped>
.tabs-scroll {
  width: 100%;
}

.tabs-scroll__frame {
  width: 100%;
  max-width: 360px;
  padding-top: 24px;
}

.tabs-scroll__note {
  margin: 16px 0 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body);
}
</style>
