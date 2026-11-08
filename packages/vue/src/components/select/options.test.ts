import { describe, expect, it } from 'vitest'
import { filterOptions, firstEnabledIndex, matchParts } from './options'

const options = [
  { value: 'a', label: 'Option 1' },
  { value: 'b', label: 'Option 2', disabled: true },
  { value: 'c', label: 'Grouped option' },
]

describe('filterOptions', () => {
  it('keeps every option when the query is empty', () => {
    expect(filterOptions(options, '')).toBe(options)
    expect(filterOptions(options, '   ')).toBe(options)
  })

  it('matches labels case-insensitively and trims the query', () => {
    expect(filterOptions(options, '  OPTION 1 ').map(option => option.value)).toEqual(['a'])
  })

  it('ignores the disabled flag while filtering', () => {
    expect(filterOptions(options, 'option 2').map(option => option.value)).toEqual(['b'])
  })
})

describe('firstEnabledIndex', () => {
  it('skips leading disabled options', () => {
    expect(firstEnabledIndex([
      { value: 'x', label: 'x', disabled: true },
      { value: 'y', label: 'y' },
    ])).toBe(1)
  })

  it('falls back to the first row when every option is disabled', () => {
    expect(firstEnabledIndex([
      { value: 'x', label: 'x', disabled: true },
    ])).toBe(0)
    expect(firstEnabledIndex([])).toBe(0)
  })
})

describe('matchParts', () => {
  it('returns the whole label unhighlighted without a query', () => {
    expect(matchParts('Option 1', '')).toEqual([
      { text: 'Option 1', match: false },
    ])
    expect(matchParts('Option 1', '   ')).toEqual([
      { text: 'Option 1', match: false },
    ])
  })

  it('splits around the first match and keeps the original casing', () => {
    expect(matchParts('Option 1', 'OPT')).toEqual([
      {
        text: 'Option 1'.slice(0, 0),
        match: false,
      },
      { text: 'Opt', match: true },
      { text: 'ion 1', match: false },
    ].filter(part => part.text))
  })

  it('highlights the query in the middle of the label', () => {
    expect(matchParts('Grouped option', 'option')).toEqual([
      { text: 'Grouped ', match: false },
      { text: 'option', match: true },
    ])
  })

  it('returns the whole label when nothing matches', () => {
    expect(matchParts('Option 1', 'zzz')).toEqual([
      { text: 'Option 1', match: false },
    ])
  })
})
