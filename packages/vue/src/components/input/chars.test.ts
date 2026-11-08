import { describe, expect, it } from 'vitest'
import { appendDigit, backspace, cellStates, cursorIndex, digitsOnly } from './chars'

describe('digitsOnly', () => {
  it('strips everything but digits and caps the length', () => {
    expect(digitsOnly('a1b2c3', 6)).toBe('123')
    expect(digitsOnly('1234567', 6)).toBe('123456')
  })
})

describe('appendDigit', () => {
  it('appends a digit until the code is full', () => {
    expect(appendDigit('12', '3', 6)).toBe('123')
    expect(appendDigit('12345', '6', 6)).toBe('123456')
    expect(appendDigit('123456', '7', 6)).toBeNull()
  })

  it('rejects keys that are not a single digit', () => {
    expect(appendDigit('12', 'a', 6)).toBeNull()
    expect(appendDigit('12', '', 6)).toBeNull()
  })
})

describe('backspace', () => {
  it('removes the last digit and stops at empty', () => {
    expect(backspace('123')).toBe('12')
    expect(backspace('')).toBe('')
  })
})

describe('cursorIndex', () => {
  it('points at the next free cell, or the last cell when the code is full', () => {
    expect(cursorIndex('', 6)).toBe(0)
    expect(cursorIndex('123', 6)).toBe(3)
    expect(cursorIndex('123456', 6)).toBe(5)
    expect(cursorIndex('1234567', 6)).toBe(5)
  })
})

describe('cellStates', () => {
  it('marks filled cells and the next free cell of a focused field', () => {
    expect(cellStates('12', 4, true, false)).toEqual([
      { filled: true, active: true },
      { filled: true, active: true },
      { filled: false, active: true },
      { filled: false, active: false },
    ])
  })

  it('marks no cell active while the field is blurred', () => {
    expect(cellStates('1', 3, false, false)).toEqual([
      { filled: true, active: true },
      { filled: false, active: false },
      { filled: false, active: false },
    ])
  })

  it('marks no cell active once the code is complete or the field is disabled', () => {
    expect(cellStates('123', 3, true, false).every(cell => !cell.active)).toBe(true)
    expect(cellStates('1', 3, true, true).every(cell => !cell.active)).toBe(true)
  })
})
