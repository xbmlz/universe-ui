<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@universe-ui/vue'

const basic = ref(['a'])
const bordered = ref(['a'])
const filled = ref(['a'])
</script>

<template>
  <div class="collapse-style">
    <section>
      <h4>基础</h4>
      <Collapse v-model="basic">
        <CollapseItem
          name="a"
          title="已展开"
        >
          无分割线、无标题背景。
        </CollapseItem>
        <CollapseItem
          name="b"
          title="标题"
        >
          第二项。
        </CollapseItem>
      </Collapse>
    </section>
    <section>
      <h4>分割线</h4>
      <Collapse
        v-model="bordered"
        bordered
      >
        <CollapseItem
          name="a"
          title="已展开"
        >
          标题行底部带 1px 分割线（`--ud-color-divider`）。
        </CollapseItem>
        <CollapseItem
          name="b"
          title="标题"
        >
          第二项。
        </CollapseItem>
      </Collapse>
    </section>
    <section>
      <h4>分割线 + 背景</h4>
      <Collapse
        v-model="filled"
        bordered
        filled
      >
        <CollapseItem
          name="a"
          title="已展开"
        >
          标题行使用 N100 背景（`--ud-color-bg-2`）。
        </CollapseItem>
        <CollapseItem
          name="b"
          title="标题"
        >
          第二项。
        </CollapseItem>
      </Collapse>
    </section>
  </div>
</template>

<style scoped>
.collapse-style {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.collapse-style h4 {
  margin: 0 0 8px;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  font-weight: var(--ud-font-weight-regular);
}
</style>
