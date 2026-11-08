<script setup lang="ts">
import { Button, ButtonGroup } from '@universe-ui/vue'
import { useTemplateRef } from 'vue'
import { useDemo } from '../demo'

const { types } = useDemo()

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
