<script setup lang="ts">
useSeoMeta({
  title: 'Universe UI',
  description: '飞书 Universe Design 的 Vue 组件库。'
})
</script>

<template>
  <UMain>
    <UContainer class="py-20 lg:py-28">
      <div class="max-w-3xl">
        <UBadge label="Vue 3 · Universe Design" color="primary" variant="subtle" class="mb-6" />
        <h1 class="text-5xl font-semibold tracking-tight text-highlighted sm:text-6xl">
          Universe UI
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
          按飞书 Universe Design 设计规范实现的 Vue 组件库。组件样式、尺寸和交互都从设计文档出发。
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <UButton label="开始使用" to="/docs/guides/installation" size="lg" />
          <UButton label="浏览组件" to="/docs/components/button" color="neutral" variant="outline" size="lg" />
        </div>
      </div>
    </UContainer>
  </UMain>
</template>
