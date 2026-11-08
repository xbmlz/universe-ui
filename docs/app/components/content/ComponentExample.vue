<script setup lang="ts">
import type { Component } from 'vue'
import { codeToHtml } from 'shiki'

const props = defineProps<{
  name: string
  description?: string
}>()

const modules = import.meta.glob('./examples/**/*.vue', { eager: true }) as Record<string, { default: Component }>
const sources = import.meta.glob('./examples/**/*.vue', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

function exampleSlug(path: string) {
  const file = path.split('/').pop()!.replace(/\.vue$/, '')
  return file.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

const example = computed(() => {
  const entry = Object.entries(modules).find(([path]) => exampleSlug(path) === props.name)
  return entry?.[1]?.default
})

const source = computed(() => {
  const entry = Object.entries(sources).find(([path]) => exampleSlug(path) === props.name)
  return entry?.[1] ?? ''
})

const expanded = ref(false)
const copied = ref(false)

const { data: highlighted } = await useAsyncData(`component-example-${props.name}`, () => codeToHtml(source.value, {
  lang: 'vue',
  themes: {
    light: 'github-light',
    dark: 'github-dark'
  },
  defaultColor: false
}))

async function copySource() {
  await navigator.clipboard.writeText(source.value)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1500)
}
</script>

<template>
  <div class="ud-docs-example not-prose my-6 overflow-hidden rounded-lg border border-muted bg-default">
    <div class="flex min-h-40 items-center justify-center border-b border-muted bg-elevated/30 p-6">
      <component :is="example" v-if="example" />
      <p v-else class="text-sm text-muted">
        示例 {{ name }} 未找到
      </p>
    </div>

    <div class="border-b border-muted px-4 py-3">
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm text-muted">
          {{ description ?? name }}
        </p>
        <div class="flex items-center gap-2">
          <UButton
            :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            :label="copied ? '已复制' : '复制代码'"
            color="neutral"
            variant="ghost"
            size="xs"
            @click="copySource"
          />
          <UButton
            :icon="expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
            :label="expanded ? '收起' : '展开'"
            color="neutral"
            variant="ghost"
            size="xs"
            @click="expanded = !expanded"
          />
        </div>
      </div>
    </div>

    <div class="ud-docs-example__code bg-elevated/20">
      <div v-if="highlighted" :class="expanded ? '' : 'max-h-80 overflow-hidden'" v-html="highlighted" />
      <div v-if="!expanded && source.split('\n').length > 14" class="pointer-events-none -mt-20 h-20 bg-gradient-to-t from-elevated to-transparent" />
    </div>
  </div>
</template>
