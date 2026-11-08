import { describe, expect, it } from 'vitest'
import { hexToHsv, hexToRgb, hsvToHex, hsvToRgb, parseHex, rgbToHex, rgbToHsv } from './color'

describe('parseHex', () => {
  it('expands three-digit hex and accepts a missing hash', () => {
    expect(parseHex('#abc')).toBe('#aabbcc')
    expect(parseHex('AABBCC')).toBe('#aabbcc')
    expect(parseHex('#FF0000')).toBe('#ff0000')
  })

  it('rejects anything that is not a hex colour', () => {
    expect(parseHex('zzz')).toBeNull()
    expect(parseHex('#12345')).toBeNull()
    expect(parseHex('rgb(1,2,3)')).toBeNull()
  })
})

describe('hexToRgb / rgbToHex', () => {
  it('reads and writes the three channels', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000')
    expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe('#0000ff')
  })

  it('rounds and clamps channel values', () => {
    expect(rgbToHex({ r: -10, g: 12.4, b: 300 })).toBe('#000cff')
  })
})

describe('rgbToHsv / hsvToRgb', () => {
  it('maps primaries to their hues', () => {
    expect(rgbToHsv({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 1, v: 1 })
    expect(rgbToHsv({ r: 0, g: 255, b: 0 }).h).toBe(120)
    expect(rgbToHsv({ r: 0, g: 0, b: 255 }).h).toBe(240)
  })

  it('drops saturation for greys and value for black', () => {
    expect(rgbToHsv({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, v: 1 })
    expect(rgbToHsv({ r: 0, g: 0, b: 0 })).toEqual({ h: 0, s: 0, v: 0 })
  })

  it('converts back from the hue wheel', () => {
    expect(hsvToRgb({ h: 0, s: 1, v: 1 })).toEqual({ r: 255, g: 0, b: 0 })
    expect(hsvToRgb({ h: 120, s: 1, v: 1 })).toEqual({ r: 0, g: 255, b: 0 })
    expect(hsvToRgb({ h: 240, s: 1, v: 1 })).toEqual({ r: 0, g: 0, b: 255 })
  })
})

describe('hexToHsv / hsvToHex', () => {
  it('round-trips a hex colour', () => {
    expect(hsvToHex(hexToHsv('#3366cc')!)).toBe('#3366cc')
    expect(hexToHsv('nope')).toBeNull()
  })
})
