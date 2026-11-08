<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { zh_cn as zhCN } from '@nuxt/ui/locale'

const route = useRoute()
const { data: navigation } = await useFetch<ContentNavigationItem[]>('/api/navigation.json')

provide('navigation', computed(() => navigation.value ?? []))

useSeoMeta({
  ogSiteName: 'Universe UI',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

const showLayout = computed(() => route.path !== '/')
</script>

<template>
  <UApp :locale="zhCN">
    <NuxtLoadingIndicator color="var(--ud-color-brand)" :height="2" />

    <Header v-if="showLayout" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Footer v-if="showLayout" />
  </UApp>
</template>
