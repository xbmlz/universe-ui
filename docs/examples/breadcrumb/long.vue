<script setup lang="ts">
import type { BreadcrumbItem } from '@universe-ui/vue'
import { Breadcrumb } from '@universe-ui/vue'

const items: BreadcrumbItem[] = [
  { label: '首页', href: '#' },
  { label: '这是一个超过十个中文字符的超长层级名称', href: '#' },
  { label: '当前页' },
]
</script>

<template>
  <Breadcrumb :items="items" />
</template>
