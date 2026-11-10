<script setup lang="ts">
import { Rate } from '@universe-ui/vue'
import { ref } from 'vue'

const selected = ref(3)
const disabled = ref(4)
const readonly = ref(5)
</script>

<template>
  <div class="ud-demo-stack">
    <div class="rate-row">
      <span class="rate-label">Selected</span>
      <Rate
        v-model="selected"
        show-text
      />
    </div>
    <div class="rate-row">
      <span class="rate-label">Disabled</span>
      <Rate
        v-model="disabled"
        disabled
        show-text
      />
    </div>
    <div class="rate-row">
      <span class="rate-label">Readonly</span>
      <Rate
        v-model="readonly"
        readonly
        show-text
      />
    </div>
  </div>
</template>

<style scoped>
.rate-row {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.rate-label {
  width: 80px;
  color: var(--ud-color-text);
  font-size: var(--ud-font-size-body);
  white-space: nowrap;
  /* The label lines up with the 32px star row, not with the hint under it. */
  line-height: 32px;
}
</style>
