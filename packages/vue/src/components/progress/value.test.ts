import { describe, expect, it } from 'vitest'
import { clampPercent, defaultInfoPlacement, progressInfo, showsInfo } from './value'

describe('clampPercent', () => {
  it('keeps the value inside 0-100', () => {
    expect(clampPercent(-5)).toBe(0)
    expect(clampPercent(150)).toBe(100)
    expect(clampPercent(33.3)).toBe(33.3)
  })
})

describe('progressInfo', () => {
  it('rounds the default text to a whole percent', () => {
    expect(progressInfo(33.3)).toBe('33%')
    expect(progressInfo(100)).toBe('100%')
  })

  it('uses the custom format when one is given', () => {
    expect(progressInfo(50, value => `${value}/100`)).toBe('50/100')
  })
})

describe('defaultInfoPlacement', () => {
  it('puts a line on the right and a circle on the left', () => {
    expect(defaultInfoPlacement('line')).toBe('right')
    expect(defaultInfoPlacement('circle')).toBe('left')
  })

  it('keeps an explicit placement', () => {
    expect(defaultInfoPlacement('circle', 'right')).toBe('right')
    expect(defaultInfoPlacement('line', 'left')).toBe('left')
  })
})

describe('showsInfo', () => {
  it('shows the number for a normal line', () => {
    expect(showsInfo({
      variant: 'line',
      status: 'normal',
      showInfo: true,
      indeterminate: false,
    })).toBe(true)
    expect(showsInfo({
      variant: 'line',
      status: 'error',
      showInfo: true,
      indeterminate: false,
    })).toBe(true)
  })

  it('hides the number for a finished or failed circle', () => {
    expect(showsInfo({
      variant: 'circle',
      status: 'success',
      showInfo: true,
      indeterminate: false,
    })).toBe(false)
    expect(showsInfo({
      variant: 'circle',
      status: 'error',
      showInfo: true,
      indeterminate: false,
    })).toBe(false)
  })

  it('hides the number while indeterminate or when showInfo is off', () => {
    expect(showsInfo({
      variant: 'line',
      status: 'normal',
      showInfo: true,
      indeterminate: true,
    })).toBe(false)
    expect(showsInfo({
      variant: 'line',
      status: 'normal',
      showInfo: false,
      indeterminate: false,
    })).toBe(false)
  })
})
