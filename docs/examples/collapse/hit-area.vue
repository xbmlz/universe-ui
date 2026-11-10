<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@universe-ui/vue'

const iconLine = ref<Array<string | number>>([])
const iconCaret = ref<Array<string | number>>([])
const row = ref(['a'])
const area = ref<Array<string | number>>([])
const nested = ref(['b'])
</script>

<template>
  <div class="collapse-hit">
    <section>
      <h4>图标热区</h4>
      <p>只有箭头是按钮；悬停箭头出现 N900*10% 圆角底，按下为 N900*20%。点标题无效。</p>
      <div class="collapse-hit__pair">
        <Collapse
          v-model="iconLine"
          hit-area="icon"
          bordered
        >
          <CollapseItem
            name="a"
            title="Title"
          >
            线性箭头在右侧，仅箭头可点。
          </CollapseItem>
        </Collapse>
        <Collapse
          v-model="iconCaret"
          hit-area="icon"
          arrow="filled"
          bordered
        >
          <CollapseItem
            name="a"
            title="Title"
          >
            面性箭头在左侧，仅箭头可点。
          </CollapseItem>
        </Collapse>
      </div>
    </section>

    <section>
      <h4>整行热区（有背景）</h4>
      <p>整行可点；有背景时 Hover N900*10% / Pressed N900*20%。</p>
      <Collapse
        v-model="row"
        hit-area="row"
        bordered
        filled
      >
        <CollapseItem
          name="a"
          title="已展开"
        >
          整行都是热区。
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
      <h4>整行热区（嵌套表格）</h4>
      <p>Hover N900*8%；选中项 B500*8%。悬停到箭头时图标另有一层 wash。</p>
      <Collapse
        v-model="nested"
        hit-area="row"
        nested
      >
        <CollapseItem
          name="a"
          title="未选中"
        >
          普通行。
        </CollapseItem>
        <CollapseItem
          name="b"
          title="选中行"
          selected
        >
          selected 时整行浅蓝底。
        </CollapseItem>
      </Collapse>
    </section>

    <section>
      <h4>区域热区</h4>
      <p>热区包住箭头+标题，宽度随内容，可自定义。</p>
      <Collapse
        v-model="area"
        hit-area="area"
        arrow="filled"
        bordered
      >
        <CollapseItem
          name="a"
          title="Title"
        >
          只有左侧箭头与标题是热区，行内空白不可点。
        </CollapseItem>
        <CollapseItem
          name="b"
          title="另一项"
        >
          第二项。
        </CollapseItem>
      </Collapse>
    </section>
  </div>
</template>

<style scoped>
.collapse-hit {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.collapse-hit h4 {
  margin: 0 0 4px;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  font-weight: var(--ud-font-weight-regular);
}

.collapse-hit p {
  margin: 0 0 8px;
  color: var(--ud-color-text-placeholder);
  font-size: var(--ud-font-size-body-sm);
}

.collapse-hit__pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 640px) {
  .collapse-hit__pair {
    grid-template-columns: 1fr;
  }
}
</style>
