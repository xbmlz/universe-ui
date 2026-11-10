<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@universe-ui/vue'

const open = ref(['a'])
</script>

<template>
  <Collapse
    v-model="open"
    arrow="filled"
    hit-area="icon"
  >
    <CollapseItem
      name="a"
      title="标题一"
    >
      面性箭头在标题左侧；展开内容与标题左对齐（不是与箭头对齐）。
    </CollapseItem>
    <CollapseItem
      name="b"
      title="标题二"
    >
      第二项的内容。
    </CollapseItem>
    <CollapseItem
      name="c"
      title="标题三"
    >
      第三项的内容。
    </CollapseItem>
  </Collapse>
</template>
