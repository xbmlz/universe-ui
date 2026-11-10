<script setup lang="ts">
import { Card } from '@universe-ui/vue'
</script>

<template>
  <div class="card-basic">
    <Card title="季度汇报">
      <p>本季度共完成 12 次迭代，平均交付周期从 9 天缩短到 6 天。</p>
      <p>下季度重点是补齐移动端适配。</p>
    </Card>
  </div>
</template>

<style scoped>
.card-basic {
  width: 100%;
  max-width: 360px;
}

.card-basic p {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
}
</style>
