import { describe, expect, it } from 'vitest'
import { parseThemeMode, resolveTheme } from './theme'

describe('resolveTheme', () => {
  it('keeps explicit modes', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
  })

  it('resolves auto from the system preference', () => {
    expect(resolveTheme('auto', true)).toBe('dark')
    expect(resolveTheme('auto', false)).toBe('light')
  })
})

describe('parseThemeMode', () => {
  it('accepts the values shared with VitePress', () => {
    expect(parseThemeMode('light')).toBe('light')
    expect(parseThemeMode('dark')).toBe('dark')
    expect(parseThemeMode('auto')).toBe('auto')
  })

  it('falls back to auto for missing or unknown values', () => {
    expect(parseThemeMode(null)).toBe('auto')
    expect(parseThemeMode(undefined)).toBe('auto')
    expect(parseThemeMode('sepia')).toBe('auto')
  })
})
