import type { BreadcrumbItem } from './types'

export interface BreadcrumbEntry {
  item: BreadcrumbItem
  index: number
}

/** The first and last crumbs always stay visible, so at most `items.length - 2` can hide. */
export function hiddenCrumbs(items: BreadcrumbItem[], hiddenCount: number): BreadcrumbItem[] {
  const count = Math.min(hiddenCount, Math.max(0, items.length - 2))
  return items.slice(1, 1 + count)
}

/** The crumbs to render: the root, then the overflow button, then the tail. */
export function visibleCrumbs(items: BreadcrumbItem[], hiddenCount: number): BreadcrumbEntry[] {
  const count = hiddenCrumbs(items, hiddenCount).length
  if (count === 0)
    return items.map((item, index) => ({ item, index }))

  const first = items[0]
  if (!first)
    return []

  return [
    { item: first, index: 0 },
    ...items.slice(1 + count).map((item, offset) => ({
      item,
      index: offset + 1 + count,
    })),
  ]
}
