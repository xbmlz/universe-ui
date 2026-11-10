<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@universe-ui/vue'

const open = ref(['open'])
</script>

<template>
  <Collapse
    v-model="open"
    bordered
    hit-area="icon"
  >
    <CollapseItem
      name="loading"
      title="加载中"
      loading
    >
      不会展开。
    </CollapseItem>
    <CollapseItem
      name="disabled"
      title="禁用"
      disabled
    >
      不会展开。
    </CollapseItem>
    <CollapseItem
      name="closed"
      title="已折叠"
    >
      点击右侧箭头可展开。
    </CollapseItem>
    <CollapseItem
      name="open"
      title="已展开"
    >
      Here is the description content. Here is the description content. Here is the description content.
    </CollapseItem>
  </Collapse>
</template>
