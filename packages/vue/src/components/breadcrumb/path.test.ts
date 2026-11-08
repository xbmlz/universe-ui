import { describe, expect, it } from 'vitest'
import { hiddenCrumbs, visibleCrumbs } from './path'

const items = [
  { label: 'Home' },
  { label: 'Project' },
  { label: 'Sub-project' },
  { label: 'Folder' },
  { label: 'Current' },
]

describe('hiddenCrumbs', () => {
  it('hides the middle crumbs after the root', () => {
    expect(hiddenCrumbs(items, 1).map(item => item.label)).toEqual(['Project'])
  })

  it('never hides the first or the last crumb', () => {
    expect(hiddenCrumbs(items, 10).map(item => item.label)).toEqual(['Project', 'Sub-project', 'Folder'])
    expect(hiddenCrumbs(items, 0)).toEqual([])
  })

  it('has nothing to hide with fewer than three crumbs', () => {
    expect(hiddenCrumbs([
      { label: 'A' },
      { label: 'B' },
    ], 5)).toEqual([])
  })
})

describe('visibleCrumbs', () => {
  it('keeps every crumb with their original index when nothing is hidden', () => {
    expect(visibleCrumbs(items, 0).map(entry => entry.index)).toEqual([0, 1, 2, 3, 4])
  })

  it('keeps the root and the tail, with indices counted from the full list', () => {
    expect(visibleCrumbs(items, 1).map(entry => entry.index)).toEqual([0, 2, 3, 4])
  })

  it('handles an empty list', () => {
    expect(visibleCrumbs([], 0)).toEqual([])
  })
})
