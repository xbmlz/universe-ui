<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@universe-ui/vue'

const open = ref(['a'])
</script>

<template>
  <Collapse
    v-model="open"
    accordion
  >
    <CollapseItem
      name="a"
      title="面板一"
    >
      手风琴模式下同时只会展开一项。
    </CollapseItem>
    <CollapseItem
      name="b"
      title="面板二"
    >
      打开这一项时，其它项会收起。
    </CollapseItem>
    <CollapseItem
      name="c"
      title="面板三"
    >
      第三项内容。
    </CollapseItem>
  </Collapse>
</template>
