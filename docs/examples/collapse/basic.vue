<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@universe-ui/vue'

const open = ref(['a'])
</script>

<template>
  <Collapse
    v-model="open"
    hit-area="icon"
  >
    <CollapseItem
      name="a"
      title="标题一"
    >
      这里是折叠面板的说明内容。可同时展开多个面板。
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
