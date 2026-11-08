import { describe, expect, it } from 'vitest'
import { lineKind, stepStatus } from './status'

describe('stepStatus', () => {
  it('finishes the steps before the active one', () => {
    expect(stepStatus(0, 1)).toBe('finish')
  })

  it('marks the active step as in progress', () => {
    expect(stepStatus(1, 1)).toBe('process')
  })

  it('leaves the steps after the active one waiting', () => {
    expect(stepStatus(2, 1)).toBe('wait')
  })

  it('lets an explicit status win', () => {
    expect(stepStatus(2, 1, 'error')).toBe('error')
    expect(stepStatus(0, 1, 'process')).toBe('process')
  })
})

describe('lineKind', () => {
  it('mutes every connector of the dotted variant', () => {
    expect(lineKind('finish', undefined, true)).toBe('muted')
    expect(lineKind('finish', 'error', true)).toBe('muted')
  })

  it('turns red when the next step failed', () => {
    expect(lineKind('process', 'error', false)).toBe('danger')
  })

  it('uses brand blue after a finished step', () => {
    expect(lineKind('finish', 'process', false)).toBe('brand')
  })

  it('mutes the rest', () => {
    expect(lineKind('process', 'wait', false)).toBe('muted')
    expect(lineKind('wait', undefined, false)).toBe('muted')
  })
})
