import { describe, expect, it } from 'vitest'
import { blurAction, clampNumber, decimalPlaces, inputValue } from './number'

describe('decimalPlaces', () => {
  it('counts the digits after the dot', () => {
    expect(decimalPlaces(1)).toBe(0)
    expect(decimalPlaces(10)).toBe(0)
    expect(decimalPlaces(0.1)).toBe(1)
    expect(decimalPlaces(1.25)).toBe(2)
  })
})

describe('clampNumber', () => {
  it('leaves a value inside the bounds alone', () => {
    expect(clampNumber(5, { min: 0, max: 10 })).toBe(5)
  })

  it('pulls a value back to the nearest bound', () => {
    expect(clampNumber(-1, { min: 0, max: 10 })).toBe(0)
    expect(clampNumber(12, { min: 0, max: 10 })).toBe(10)
  })

  it('rounds to the precision of the step', () => {
    expect(clampNumber(0.30000000000000004, { step: 0.1 })).toBe(0.3)
    expect(clampNumber(3.14)).toBe(3)
  })
})

describe('inputValue', () => {
  it('clears the model for empty text', () => {
    expect(inputValue('')).toBeNull()
  })

  it('reads a finished number', () => {
    expect(inputValue('12')).toBe(12)
    expect(inputValue('-3.5')).toBe(-3.5)
  })

  it('leaves the model alone while the text is still partial', () => {
    expect(inputValue('-')).toBeUndefined()
    expect(inputValue('.')).toBeUndefined()
    expect(inputValue('1.')).toBeUndefined()
  })

  it('clears the model for text that cannot become a number', () => {
    expect(inputValue('abc')).toBeNull()
    expect(inputValue('1.2.3')).toBeNull()
    expect(inputValue('1 2')).toBeNull()
  })
})

describe('blurAction', () => {
  it('commits a finished number', () => {
    expect(blurAction('12')).toEqual({ kind: 'commit', value: 12 })
    expect(blurAction('-3.5')).toEqual({ kind: 'commit', value: -3.5 })
  })

  it('commits a number that is only missing its decimals', () => {
    expect(blurAction('3.')).toEqual({ kind: 'commit', value: 3 })
  })

  it('falls back to the model for an empty or half-typed value', () => {
    expect(blurAction('')).toEqual({ kind: 'reset' })
    expect(blurAction('-')).toEqual({ kind: 'reset' })
    expect(blurAction('.')).toEqual({ kind: 'reset' })
  })

  it('leaves text the user is still typing alone', () => {
    expect(blurAction('abc')).toEqual({ kind: 'keep' })
    expect(blurAction('1 2')).toEqual({ kind: 'keep' })
  })
})
