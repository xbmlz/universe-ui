import { describe, expect, it } from 'vitest'
import { fontRatio, groupLines, initials, textUnits } from './text'

describe('initials', () => {
  it('uses the last two characters for a Chinese personal name', () => {
    expect(initials('林七七', 'person')).toBe('七七')
  })

  it('uses the first character of the surname for an explicit Japanese name', () => {
    expect(initials('工藤新一', 'person', 'ja')).toBe('工')
  })

  it('uses the first letters of the first and last word for a Latin name', () => {
    expect(initials('John Smith', 'person')).toBe('JS')
    expect(initials('wang jun', 'person')).toBe('WJ')
  })

  it('uses a single letter when a Latin name has one word', () => {
    expect(initials('Memo', 'person')).toBe('M')
  })

  it('pulls the first two characters for an app, regardless of the script', () => {
    expect(initials('飞书', 'app')).toBe('飞书')
    expect(initials('Lark Suite', 'app')).toBe('LA')
  })

  it('keeps the whole text for a group and trims the input', () => {
    expect(initials(' 研发  ', 'group')).toBe('研发')
  })

  it('returns an empty string for blank input', () => {
    expect(initials('   ', 'person')).toBe('')
  })
})

describe('groupLines', () => {
  it('counts a wide character as two units and wraps at four', () => {
    expect(groupLines('研发')).toEqual(['研发'])
    expect(groupLines('研发测试')).toEqual(['研发', '测试'])
  })

  it('stops at two lines', () => {
    expect(groupLines('研发测试abcdef')).toEqual(['研发', '测试'])
  })

  it('packs Latin characters four per line', () => {
    expect(groupLines('abcdefgh')).toEqual(['abcd', 'efgh'])
  })
})

describe('textUnits', () => {
  it('adds two units for wide characters', () => {
    expect(textUnits('研')).toBe(2)
    expect(textUnits('a研')).toBe(3)
  })
})

describe('fontRatio', () => {
  it('shifts between the wide and Latin personal ratios', () => {
    expect(fontRatio('七七', 'person')).toBeCloseTo(274 / 640)
    expect(fontRatio('JS', 'person')).toBeCloseTo(340 / 640)
  })

  it('steps down as group text gets wider', () => {
    // A wide character counts as two units, so a single one already takes the 2-unit step.
    expect(fontRatio('a', 'group')).toBeCloseTo(116 / 208)
    expect(fontRatio('研', 'group')).toBeCloseTo(92 / 208)
    expect(fontRatio('研发', 'group')).toBeCloseTo(72 / 208)
    expect(fontRatio('研发测试中心', 'group')).toBeCloseTo(60 / 208)
  })
})
