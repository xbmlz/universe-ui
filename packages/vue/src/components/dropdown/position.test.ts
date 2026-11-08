import { describe, expect, it } from 'vitest'
import { placeContextMenu } from './position'

const viewport = { width: 1000, height: 800 }
const menu = { width: 200, height: 300 }

describe('placeContextMenu', () => {
  it('opens to the right and below the pointer when there is room', () => {
    expect(placeContextMenu({ x: 300, y: 200 }, menu, viewport)).toEqual({ left: 304, top: 204 })
  })

  it('flips left when the right side is too narrow', () => {
    expect(placeContextMenu({ x: 900, y: 200 }, menu, viewport)).toEqual({ left: 696, top: 204 })
  })

  it('aligns to the bottom safe edge instead of the pointer', () => {
    expect(placeContextMenu({ x: 300, y: 700 }, menu, viewport)).toEqual({ left: 304, top: 484 })
  })
})
