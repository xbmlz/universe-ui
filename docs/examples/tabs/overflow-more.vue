<script setup lang="ts">
import { ref } from 'vue'
import { Tab, Tabs } from '@universe-ui/vue'

const active = ref('tab1')
const labels = Array.from({ length: 17 }, (_, index) => `Tab ${index + 1}`)
</script>

<template>
  <div class="tabs-more">
    <Tabs v-model="active" overflow="more">
      <Tab
        v-for="(label, index) in labels"
        :key="label"
        :value="`tab${index + 1}`"
      >
        {{ label }}
      </Tab>
    </Tabs>
  </div>
</template>

<style scoped>
.tabs-more {
  width: 100%;
  max-width: 720px;
}
</style>
