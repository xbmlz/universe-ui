<script setup lang="ts">
import { Switch } from '@universe-ui/vue'
import { ref } from 'vue'

const large = ref(true)
const small = ref(false)
</script>

<template>
  <div class="ud-demo-col">
    <div class="switch-size-row">
      <span>大尺寸</span>
      <Switch v-model="large" size="md" />
    </div>
    <div class="switch-size-row">
      <span>小尺寸</span>
      <Switch v-model="small" size="sm" />
    </div>
  </div>
</template>

<style scoped>
.switch-size-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 240px;
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
}
</style>
