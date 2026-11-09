<script setup lang="ts">
import type { Component } from 'vue'
import { computed, ref } from 'vue'
import SourceCode from './SourceCode.vue'

const props = defineProps<{
  path: string
  description?: string
}>()

const modules = import.meta.glob('../../../examples/**/*.vue', { eager: true }) as Record<string, { default: Component }>
const sources = import.meta.glob('../../../examples/**/*.vue', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

const file = `../../../examples/${props.path}.vue`
const example = computed(() => modules[file]?.default)
const source = sources[file] ?? ''
const collapsible = source.split('\n').length > 12

const expanded = ref(false)
const copied = ref(false)

async function copySource() {
  await navigator.clipboard.writeText(source)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1500)
}
</script>

<template>
  <div class="ud-demo">
    <div class="ud-demo__preview">
      <component :is="example" v-if="example" />
      <p v-else class="ud-demo__missing">
        示例 {{ path }} 未找到
      </p>
    </div>

    <div class="ud-demo__toolbar">
      <span class="ud-demo__description">{{ description ?? path }}</span>
      <div class="ud-demo__actions">
        <button type="button" @click="copySource">
          {{ copied ? '已复制' : '复制代码' }}
        </button>
        <button v-if="collapsible" type="button" @click="expanded = !expanded">
          {{ expanded ? '收起' : '展开' }}
        </button>
      </div>
    </div>

    <div class="ud-demo__code" :class="{ 'is-expanded': expanded || !collapsible }">
      <Suspense v-if="source">
        <SourceCode :code="source" />
      </Suspense>
      <div v-else class="ud-demo__missing">
        示例 {{ path }} 没有源码
      </div>
    </div>
  </div>
</template>
