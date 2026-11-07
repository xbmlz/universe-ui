import type { PaginationEntry } from './types'

/**
 * Near the start: the first five pages, then an ellipsis and the last page.
 * In the middle: the current page with two pages on each side.
 * At the end: the last page and the four pages before it.
 * The first and last pages stay visible. Examples are written in pagination.md.
 */
export function pagerEntries(current: number, pageCount: number): PaginationEntry[] {
  if (pageCount <= 6) {
    return Array.from({ length: pageCount }, (_, index) => ({
      kind: 'page' as const,
      page: index + 1,
    }))
  }

  const pages = (start: number, end: number): PaginationEntry[] => {
    const entries: PaginationEntry[] = []
    for (let page = start; page <= end; page++)
      entries.push({ kind: 'page', page })
    return entries
  }

  if (current <= 4) {
    return [
      ...pages(1, 5),
      { kind: 'next-more' },
      { kind: 'page', page: pageCount },
    ]
  }

  if (current >= pageCount - 3) {
    return [
      { kind: 'page', page: 1 },
      { kind: 'prev-more' },
      ...pages(pageCount - 4, pageCount),
    ]
  }

  return [
    { kind: 'page', page: 1 },
    { kind: 'prev-more' },
    ...pages(current - 2, current + 2),
    { kind: 'next-more' },
    { kind: 'page', page: pageCount },
  ]
}
