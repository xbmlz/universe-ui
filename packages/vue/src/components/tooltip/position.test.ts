import { describe, expect, it } from 'vitest'
import { placeTooltip } from './position'

const bubble = { width: 100, height: 40 }
const viewport = { width: 1000, height: 800 }

describe('placeTooltip', () => {
  it('sits above the trigger when there is room', () => {
    expect(placeTooltip({
      top: 100,
      bottom: 120,
      left: 400,
      right: 500,
      width: 100,
      height: 20,
    }, bubble, viewport)).toEqual({
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
      right: 500,
      width: 100,
      height: 20,
    }, bubble, viewport)
    expect(placed.placement).toBe('bottom')
    expect(placed.top).toBe(40)
  })

  it('keeps the bubble inside the viewport and pins the arrow inside it', () => {
    const placed = placeTooltip({
      top: 100,
      bottom: 120,
      left: 980,
      right: 1020,
      width: 40,
      height: 20,
    }, bubble, viewport)
    expect(placed.left).toBe(892)
    expect(placed.arrow).toBe(88)
  })

  it('never lets the arrow leave the rounded ends of the bubble', () => {
    const placed = placeTooltip({
      top: 100,
      bottom: 120,
      left: 0,
      right: 20,
      width: 20,
      height: 20,
    }, bubble, viewport)
    expect(placed.left).toBe(8)
    expect(placed.arrow).toBe(12)
  })

  it('places topLeft against the trigger start', () => {
    const placed = placeTooltip({
      top: 200,
      bottom: 220,
      left: 300,
      right: 340,
      width: 40,
      height: 20,
    }, bubble, viewport, 'topLeft')
    expect(placed).toMatchObject({
      placement: 'topLeft',
      top: 150,
      left: 300,
    })
  })

  it('places left with a vertical center and a side arrow', () => {
    const placed = placeTooltip({
      top: 200,
      bottom: 240,
      left: 400,
      right: 440,
      width: 40,
      height: 40,
    }, bubble, viewport, 'left')
    expect(placed.placement).toBe('left')
    expect(placed.left).toBe(290)
    expect(placed.top).toBe(200)
    expect(placed.arrow).toBe(20)
  })

  it('flips left to right when the left side does not fit', () => {
    const placed = placeTooltip({
      top: 200,
      bottom: 240,
      left: 20,
      right: 60,
      width: 40,
      height: 40,
    }, bubble, viewport, 'left')
    expect(placed.placement).toBe('right')
    expect(placed.left).toBe(70)
  })

  it('preserves the alignment suffix when flipping', () => {
    const placed = placeTooltip({
      top: 10,
      bottom: 30,
      left: 300,
      right: 340,
      width: 40,
      height: 20,
    }, bubble, viewport, 'topLeft')
    expect(placed.placement).toBe('bottomLeft')
  })
})
