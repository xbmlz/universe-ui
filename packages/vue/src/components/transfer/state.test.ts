import { describe, expect, it } from 'vitest'
import { allChecked, availableItems, chosenItems, matchingItems, moveLeft, moveRight } from './state'

const data = [
  { key: 'a', label: '邮件' },
  { key: 'b', label: '短信', description: '每天一条' },
  { key: 'c', label: '站内信', disabled: true },
]

describe('matchingItems', () => {
  it('keeps every item that matches the search, chosen or not', () => {
    expect(matchingItems(data, '').map(item => item.key)).toEqual(['a', 'b', 'c'])
    expect(matchingItems(data, '短').map(item => item.key)).toEqual(['b'])
  })
})

describe('availableItems', () => {
  it('keeps only the keys that have not been moved', () => {
    expect(availableItems(data, ['a'], '').map(item => item.key)).toEqual(['b', 'c'])
  })

  it('filters by its own search', () => {
    expect(availableItems(data, [], '短').map(item => item.key)).toEqual(['b'])
    expect(availableItems(data, [], 'MAIL')).toEqual([])
  })
})

describe('chosenItems', () => {
  it('keeps the data order for the chosen keys', () => {
    expect(chosenItems(data, ['c', 'a']).map(item => item.key)).toEqual(['a', 'c'])
  })
})

describe('moveRight', () => {
  it('adds the checked keys in the data order', () => {
    expect(moveRight(data, ['c'], ['a'])).toEqual(['a', 'c'])
  })

  it('ignores checked keys that are already chosen', () => {
    expect(moveRight(data, ['a'], ['a'])).toEqual(['a'])
  })
})

describe('moveLeft', () => {
  it('removes the checked keys', () => {
    expect(moveLeft(['a', 'b', 'c'], ['a', 'c'])).toEqual(['b'])
  })
})

describe('allChecked', () => {
  it('needs every enabled visible row checked', () => {
    expect(allChecked(data, ['a'])).toBe(false)
    expect(allChecked(data, ['a', 'b'])).toBe(true)
    expect(allChecked(data, ['a', 'b', 'c'])).toBe(true)
    expect(allChecked([], [])).toBe(false)
  })
})
