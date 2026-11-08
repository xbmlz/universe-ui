import { describe, expect, it } from 'vitest'
import { formatSize, matchesAccept } from './format'

describe('formatSize', () => {
  it('keeps bytes whole and scales the larger units', () => {
    expect(formatSize(0)).toBe('0 B')
    expect(formatSize(512)).toBe('512 B')
    expect(formatSize(2048)).toBe('2.0 KB')
    expect(formatSize(5 * 1024 * 1024)).toBe('5.0 MB')
  })
})

describe('matchesAccept', () => {
  it('accepts everything without a rule', () => {
    expect(matchesAccept({ name: 'a.png', type: 'image/png' }, '')).toBe(true)
  })

  it('matches suffixes', () => {
    expect(matchesAccept({ name: 'a.PNG', type: '' }, '.png,.jpg')).toBe(true)
    expect(matchesAccept({ name: 'a.pdf', type: '' }, '.png,.jpg')).toBe(false)
  })

  it('matches MIME families and exact types', () => {
    expect(matchesAccept({ name: 'a', type: 'image/png' }, 'image/*')).toBe(true)
    expect(matchesAccept({ name: 'a', type: 'image/png' }, 'application/pdf')).toBe(false)
  })
})
