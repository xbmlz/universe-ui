<script setup lang="ts">
import { Button } from '@universe-ui/vue'
import { ref } from 'vue'

const view = ref('list')
const filter = ref(true)
</script>

<template>
  <div class="ud-demo-stack">
    <div class="ud-demo-row">
      <Button :selected="view === 'list'" @click="view = 'list'">列表</Button>
      <Button :selected="view === 'board'" @click="view = 'board'">看板</Button>
      <Button :selected="view === 'table'" @click="view = 'table'">表格</Button>
    </div>
    <div class="ud-demo-row">
      <Button type="text" :selected="filter" @click="filter = !filter">已筛选</Button>
      <Button type="text" :selected="!filter" @click="filter = !filter">全部</Button>
    </div>
  </div>
</template>
