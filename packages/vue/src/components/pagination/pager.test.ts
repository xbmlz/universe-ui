import { describe, expect, it } from 'vitest'
import { pagerEntries } from './pager'

function pages(entries: ReturnType<typeof pagerEntries>) {
  return entries.map(entry => entry.kind === 'page'
    ? entry.page
    : entry.kind)
}

describe('pagerEntries', () => {
  it('lists every page when they all fit', () => {
    expect(pages(pagerEntries(1, 6))).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('keeps the first five plus the last page near the start', () => {
    expect(pages(pagerEntries(1, 20))).toEqual([1, 2, 3, 4, 5, 'next-more', 20])
    expect(pages(pagerEntries(4, 20))).toEqual([1, 2, 3, 4, 5, 'next-more', 20])
  })

  it('centres the current page in the middle', () => {
    expect(pages(pagerEntries(10, 20))).toEqual([
      1,
      'prev-more',
      8,
      9,
      10,
      11,
      12,
      'next-more',
      20,
    ])
  })

  it('keeps the last five plus the first page near the end', () => {
    expect(pages(pagerEntries(18, 20))).toEqual([1, 'prev-more', 16, 17, 18, 19, 20])
    expect(pages(pagerEntries(20, 20))).toEqual([1, 'prev-more', 16, 17, 18, 19, 20])
  })

  it('switches from the start to the middle on the page after four', () => {
    expect(pages(pagerEntries(5, 20))).toEqual([
      1,
      'prev-more',
      3,
      4,
      5,
      6,
      7,
      'next-more',
      20,
    ])
  })

  it('handles a zero page count', () => {
    expect(pagerEntries(1, 0)).toEqual([])
  })
})
