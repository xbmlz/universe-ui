import { describe, expect, it } from 'vitest'
import { placePanel } from './placement'

const viewport = { width: 1000, height: 800 }
const panel = { width: 200, height: 240 }

describe('placePanel', () => {
  it('opens under the trigger and aligns its left edge', () => {
    expect(placePanel({
      top: 100,
      bottom: 132,
      left: 200,
      right: 480,
    }, panel, viewport)).toEqual({
      placement: 'bottom',
      top: 136,
      left: 200,
    })
  })

  it('opens upward when the bottom runs out', () => {
    const placed = placePanel({
      top: 700,
      bottom: 732,
      left: 200,
      right: 480,
    }, panel, viewport)
    expect(placed.placement).toBe('top')
    expect(placed.top).toBe(456)
  })

  it('prefers the bottom when the space is equal or the trigger is near the top', () => {
    expect(placePanel({
      top: 10,
      bottom: 42,
      left: 200,
      right: 480,
    }, panel, viewport).placement).toBe('bottom')
  })

  it('shifts left against the trigger right edge when the panel would leave the viewport', () => {
    expect(placePanel({
      top: 100,
      bottom: 132,
      left: 900,
      right: 980,
    }, panel, viewport).left).toBe(780)
  })

  it('keeps an 8px margin at the window edges', () => {
    expect(placePanel({
      top: 100,
      bottom: 132,
      left: 0,
      right: 20,
    }, panel, viewport).left).toBe(8)
  })

  it('never lets the panel leave the right margin when it is wider than the trigger', () => {
    const wide = { width: 960, height: 240 }
    expect(placePanel({
      top: 100,
      bottom: 132,
      left: 100,
      right: 400,
    }, wide, viewport).left).toBe(32)
  })
})
