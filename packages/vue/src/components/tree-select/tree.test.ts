import { describe, expect, it } from 'vitest'
import { collectValues, filterTree, findTreePath, flattenTree, subtreeState, toggleSubtree } from './tree'

const options = [
  {
    value: 'product',
    label: '产品部门',
    children: [
      {
        value: 'design',
        label: '设计',
        children: [
          { value: 'ui', label: '界面' },
          { value: 'ux', label: '体验' },
        ],
      },
      { value: 'dev', label: '研发' },
    ],
  },
  { value: 'ops', label: '运营' },
]

describe('findTreePath', () => {
  it('returns the chain down to the node', () => {
    expect(findTreePath(options, 'ui')?.map(node => node.value)).toEqual(['product', 'design', 'ui'])
  })

  it('returns null for a value outside the tree', () => {
    expect(findTreePath(options, 'nope')).toBeNull()
  })
})

describe('collectValues', () => {
  it('includes the node itself', () => {
    expect(collectValues(options[0]!).sort()).toEqual(['design', 'dev', 'product', 'ui', 'ux'])
  })
})

describe('flattenTree', () => {
  it('lists only the collapsed rows by default', () => {
    expect(flattenTree(options, new Set()).map(row => row.option.value)).toEqual(['product', 'ops'])
  })

  it('adds children once their parent is expanded', () => {
    expect(flattenTree(options, new Set(['product'])).map(row => `${row.option.value}:${row.depth}`)).toEqual([
      'product:0',
      'design:1',
      'dev:1',
      'ops:0',
    ])
  })
})

describe('filterTree', () => {
  it('keeps matching nodes and their ancestors', () => {
    const filtered = filterTree(options, '界面')
    expect(filtered.map(node => node.value)).toEqual(['product'])
    expect(filtered[0]!.children!.map(node => node.value)).toEqual(['design'])
  })

  it('keeps the whole subtree of a matching parent', () => {
    const filtered = filterTree(options, '产品')
    expect(filtered[0]!.children!.map(node => node.value)).toEqual(['design', 'dev'])
  })

  it('returns the tree untouched for an empty query', () => {
    expect(filterTree(options, '  ')).toBe(options)
  })
})

describe('subtreeState', () => {
  it('reports checked, unchecked and indeterminate', () => {
    expect(subtreeState(options[0]!, [])).toBe('unchecked')
    expect(subtreeState(options[0]!, ['product', 'design', 'dev', 'ui', 'ux'])).toBe('checked')
    expect(subtreeState(options[0]!, ['dev'])).toBe('indeterminate')
  })
})

describe('toggleSubtree', () => {
  it('adds every value in the subtree when checking', () => {
    expect(toggleSubtree([], options[0]!, true).sort()).toEqual(['design', 'dev', 'product', 'ui', 'ux'])
  })

  it('removes every value in the subtree when unchecking', () => {
    expect(toggleSubtree(['dev', 'ops'], options[0]!, false)).toEqual(['ops'])
  })
})
