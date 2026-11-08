import { describe, expect, it } from 'vitest'
import { findOptionPath, pathLabel } from './path'

const options = [
  {
    value: 'east',
    label: '华东',
    children: [
      {
        value: 'shanghai',
        label: '上海',
        children: [
          { value: 'pudong', label: '浦东' },
        ],
      },
      { value: 'hangzhou', label: '杭州' },
    ],
  },
  { value: 'west', label: '西部', disabled: true },
]

describe('findOptionPath', () => {
  it('returns the whole chain for a leaf', () => {
    expect(findOptionPath(options, 'pudong')?.map(option => option.value)).toEqual(['east', 'shanghai', 'pudong'])
  })

  it('returns the chain for an intermediate level', () => {
    expect(findOptionPath(options, 'east')?.map(option => option.value)).toEqual(['east'])
    expect(findOptionPath(options, 'hangzhou')?.map(option => option.value)).toEqual(['east', 'hangzhou'])
  })

  it('returns null for a value outside the tree', () => {
    expect(findOptionPath(options, 'north')).toBeNull()
    expect(findOptionPath([], 'east')).toBeNull()
  })
})

describe('pathLabel', () => {
  it('joins the levels with the separator', () => {
    expect(pathLabel(findOptionPath(options, 'pudong'), '/')).toBe('华东/上海/浦东')
    expect(pathLabel(findOptionPath(options, 'hangzhou'), ' > ')).toBe('华东 > 杭州')
  })

  it('is empty for a missing path', () => {
    expect(pathLabel(null, '/')).toBe('')
  })
})
