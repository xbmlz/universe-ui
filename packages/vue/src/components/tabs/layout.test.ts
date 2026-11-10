import { describe, expect, it } from 'vitest'
import { fitTabs } from './layout'

describe('fitTabs', () => {
  it('shows every tab when the full row fits', () => {
    expect(fitTabs([40, 50, 60], 28, 220, 24)).toEqual({ count: 3, overflow: false })
  })

  it('reserves the overflow control and its gap', () => {
    expect(fitTabs([40, 50, 60], 28, 170, 24)).toEqual({ count: 2, overflow: true })
  })

  it('reserves a wider More trigger the same way', () => {
    expect(fitTabs([40, 50, 60], 28, 200, 56)).toEqual({ count: 1, overflow: true })
  })

  it('can hide every tab when the width is too small', () => {
    expect(fitTabs([40], 28, 30, 24)).toEqual({ count: 0, overflow: true })
  })
})
