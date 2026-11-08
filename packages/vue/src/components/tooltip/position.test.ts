import { describe, expect, it } from 'vitest'
import { placeTooltip } from './position'

const bubble = { width: 100, height: 40 }

describe('placeTooltip', () => {
  it('sits above the trigger when there is room', () => {
    expect(placeTooltip({
      top: 100,
      bottom: 120,
      left: 400,
      width: 100,
    }, bubble, 1000)).toEqual({
      placement: 'top',
      top: 50,
      left: 400,
      arrow: 50,
    })
  })

  it('flips below when the bubble would leave the top margin', () => {
    const placed = placeTooltip({
      top: 10,
      bottom: 30,
      left: 400,
      width: 100,
    }, bubble, 1000)
    expect(placed.placement).toBe('bottom')
    expect(placed.top).toBe(40)
  })

  it('keeps the bubble inside the viewport and pins the arrow inside it', () => {
    const placed = placeTooltip({
      top: 100,
      bottom: 120,
      left: 980,
      width: 40,
    }, bubble, 1000)
    expect(placed.left).toBe(892)
    expect(placed.arrow).toBe(88)
  })

  it('never lets the arrow leave the rounded ends of the bubble', () => {
    const placed = placeTooltip({
      top: 100,
      bottom: 120,
      left: 0,
      width: 20,
    }, bubble, 1000)
    expect(placed.left).toBe(8)
    expect(placed.arrow).toBe(12)
  })
})
