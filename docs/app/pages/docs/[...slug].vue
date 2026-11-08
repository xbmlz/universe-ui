<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()

definePageMeta({
  layout: 'docs'
})

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())

if (!page.value) {
  throw createError({ status: 404, statusText: 'Page not found', fatal: true })
}

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { findBreadcrumb, findSurround } = useNavigation(navigation)

const breadcrumb = computed(() => findBreadcrumb(page.value?.path as string))
const surround = computed(() => findSurround(page.value?.path as string))

const title = page.value?.navigation?.title ?? page.value?.title
const description = page.value?.description

useSeoMeta({
  titleTemplate: `%s - Universe UI`,
  title,
  ogTitle: `${title} - Universe UI`,
  description,
  ogDescription: description
})

const links = computed(() => [{
  icon: 'i-simple-icons-github',
  label: '在 GitHub 编辑此页',
  to: `https://github.com/cxc/universe-ui/edit/main/docs/content/${page.value?.stem}.md`,
  target: '_blank'
}])
</script>

<template>
  <UPage v-if="page">
    <UPageHeader :description="page.description">
      <template #headline>
        <UBreadcrumb :items="breadcrumb" />
      </template>

      <template #title>
        {{ page.navigation?.title ?? page.title }}
      </template>

      <template #links>
        <UButton
          v-for="link in page.links"
          :key="link.label"
          color="neutral"
          variant="outline"
          :target="link.target ?? (link.to.startsWith('http') ? '_blank' : undefined)"
          v-bind="link"
        />
        <UButton
          v-for="link in links"
          :key="link.label"
          color="neutral"
          variant="ghost"
          v-bind="link"
        />
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer v-if="page.body" :value="page" />

      <USeparator v-if="surround.filter(Boolean).length" />

      <UContentSurround :surround="surround as any" />
    </UPageBody>

    <template v-if="page.body?.toc?.links?.length" #right>
      <UContentToc :links="page.body.toc.links" highlight />
    </template>
  </UPage>
</template>
