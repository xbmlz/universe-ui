import { describe, expect, it } from 'vitest'
import { lockScroll, nextDialogId, nextLayerZ, unlockScroll } from './scroll-lock'

describe('nextLayerZ', () => {
  it('returns a higher layer each time', () => {
    const first = nextLayerZ()
    const second = nextLayerZ()
    expect(second).toBeGreaterThan(first)
  })
})

describe('nextDialogId', () => {
  it('uses the dialog prefix and never repeats', () => {
    const first = nextDialogId()
    const second = nextDialogId()
    expect(first).toMatch(/^ud-dialog-\d+$/)
    expect(second).not.toBe(first)
  })
})

describe('scroll lock without a document', () => {
  it('does not throw when there is nothing to lock', () => {
    expect(() => lockScroll()).not.toThrow()
    expect(() => unlockScroll()).not.toThrow()
  })
})
