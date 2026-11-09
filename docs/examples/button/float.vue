<script setup lang="ts">
import { Plus } from '@icon-park/vue-next'
import { Button } from '@universe-ui/vue'
</script>

<template>
  <div
    style="
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;
      border: 1px dashed var(--ud-color-border);
      border-radius: var(--ud-radius-m);
      transform: translateZ(0);
    "
  >
    <Button float type="primary" :icon="Plus" aria-label="新建" />
  </div>
</template>
