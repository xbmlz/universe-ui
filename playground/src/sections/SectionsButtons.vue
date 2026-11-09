<script setup lang="ts">
import { Search } from '@icon-park/vue-next'
import { Button, ButtonGroup, DropdownItem, MenuButton, SplitButton, Tooltip } from '@universe-ui/vue'
import { ref, useTemplateRef } from 'vue'
import { useDemo } from '../demo'

const { types } = useDemo()
const view = ref('list')

// The template ref belongs to this panel, so the focus button drives its own primary button.
const primaryRef = useTemplateRef<{ focus: () => void }>('primary')

function focusPrimary() {
  primaryRef.value?.focus()
}
</script>

<template>
  <section class="panel">
    <h2>基础按钮</h2>
    <div class="row">
      <Button
        ref="primary"
        type="primary"
      >
        主要
      </Button>
      <Button
        v-for="item in types.slice(1)"
        :key="item.type"
        :type="item.type"
      >
        {{ item.label }}
      </Button>
    </div>
    <div class="row">
      <Button
        type="primary"
        disabled
      >
        禁用
      </Button>
      <Button
        type="primary"
        loading
      >
        保存中
      </Button>
      <Button
        type="secondary"
        round
      >
        全圆角
      </Button>
      <button
        class="text-action"
        type="button"
        @click="focusPrimary"
      >
        聚焦主要按钮
      </button>
    </div>
    <ButtonGroup>
      <Button type="primary">
        确定
      </Button>
      <Button>取消</Button>
    </ButtonGroup>
    <ButtonGroup size="sm">
      <Button type="primary">
        发送
      </Button>
      <Button>取消</Button>
    </ButtonGroup>
  </section>

  <section class="panel">
    <h2>补全变体</h2>
    <div class="row">
      <Button
        :selected="view === 'list'"
        @click="view = 'list'"
      >
        列表
      </Button>
      <Button
        :selected="view === 'board'"
        @click="view = 'board'"
      >
        看板
      </Button>
    </div>
    <div
      class="row"
      style="background: var(--ud-color-bg-1); padding: 12px; border-radius: 8px"
    >
      <Button type="secondary">
        普通次要
      </Button>
      <Button
        type="secondary"
        ghost
      >
        透明次要
      </Button>
    </div>
    <div class="row">
      <MenuButton
        type="secondary"
        text="更多"
      >
        <template #menu>
          <DropdownItem command="edit">
            编辑
          </DropdownItem>
          <DropdownItem command="copy">
            复制
          </DropdownItem>
        </template>
      </MenuButton>
      <Tooltip
        content="搜索"
        style="flex: 0 0 auto"
      >
        <Button
          type="secondary"
          icon-only
          :icon="Search"
          aria-label="搜索"
        />
      </Tooltip>
    </div>
    <SplitButton
      text="保存"
      type="primary"
      block
    >
      <template #menu>
        <DropdownItem command="save-as">
          另存为
        </DropdownItem>
        <DropdownItem command="export">
          导出
        </DropdownItem>
      </template>
    </SplitButton>
  </section>

  <section class="panel">
    <h2>主题</h2>
    <div class="row theme-green">
      <Button type="primary">
        改品牌色
      </Button>
      <Button type="secondary-primary">
        描边跟着变
      </Button>
    </div>
    <div class="row">
      <Button
        type="primary"
        style="--ud-button-bg: #ff811a; --ud-button-bg-hover: #ed6d0c; --ud-button-bg-active: #ff811a"
      >
        只改这一颗
      </Button>
    </div>
  </section>
</template>
