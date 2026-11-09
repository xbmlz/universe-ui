<script setup lang="ts">
import { Plus, Search } from '@icon-park/vue-next'
import { Button } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Button type="primary" :icon="Plus">
      新建
    </Button>
    <Button type="secondary" :icon="Search" icon-position="right">
      搜索
    </Button>
  </div>
</template>
