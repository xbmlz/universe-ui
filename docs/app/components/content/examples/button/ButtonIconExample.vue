<script setup lang="ts">
import { Plus, Search } from '@icon-park/vue-next'
import { Button } from '@universe-ui/vue'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <Button type="primary" :icon="Plus">新建</Button>
    <Button type="secondary" :icon="Search">搜索</Button>
    <Button type="secondary" icon-only :icon="Search" aria-label="搜索" />
  </div>
</template>
