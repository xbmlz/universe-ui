import { defineEventHandler } from 'h3'
import { queryCollectionNavigation } from '@nuxt/content/server'
import type { ContentNavigationItem } from '@nuxt/content'

function compact(items: ContentNavigationItem[]): ContentNavigationItem[] {
  return items.map((item) => {
    const { stem, children, ...rest } = item
    const entries = Object.entries(rest).filter(([, value]) => value !== null)

    return {
      ...Object.fromEntries(entries),
      ...(children ? { children: compact(children) } : {})
    } as ContentNavigationItem
  })
}

export default defineEventHandler(async (event) => {
  return compact(await queryCollectionNavigation(event, 'docs', ['category', 'description']))
})
