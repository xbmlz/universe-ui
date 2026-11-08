import type { ContentNavigationItem } from '@nuxt/content'
import { findPageBreadcrumb, findPageChildren } from '@nuxt/content/utils'
import { mapContentNavigation } from '@nuxt/ui/utils/content'

export function useNavigation(navigation: Ref<ContentNavigationItem[] | undefined>) {
  const route = useRoute()

  const rootNavigation = computed(() => navigation.value?.[0]?.children ?? [])

  const navigationByCategory = computed(() => {
    if (route.path === '/docs') {
      return findPageChildren(navigation.value, '/docs', { indexAsChild: true })
    }

    const section = route.path.split('/')[2] || 'guides'
    return findPageChildren(navigation.value, `/docs/${section}`, { indexAsChild: true })
  })

  function findSurround(path: string): [ContentNavigationItem | undefined, ContentNavigationItem | undefined] {
    const items = navigationByCategory.value
      .flatMap(item => item.children ?? [item])
      .filter(item => item.path && item.path !== `/docs/${path.split('/')[2]}`)

    const index = items.findIndex(item => item.path === path)
    if (index === -1) {
      return [undefined, undefined]
    }

    return [items[index - 1], items[index + 1]]
  }

  function findBreadcrumb(path: string) {
    return mapContentNavigation(findPageBreadcrumb(navigation.value, path, { indexAsChild: true }))
      .map(({ icon: _icon, ...link }) => link)
  }

  return {
    rootNavigation,
    navigationByCategory,
    findSurround,
    findBreadcrumb
  }
}
