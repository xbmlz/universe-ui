export interface AnchorRect {
  top: number
  bottom: number
  left: number
  width: number
}

export interface BubbleSize {
  width: number
  height: number
}

export interface PlacedTooltip {
  placement: 'top' | 'bottom'
  top: number
  left: number
  arrow: number
}

/**
 * Specified: the bubble sits 10px from the trigger (4px gap plus the 6px arrow), the
 * arrow stays inside the bubble, and the bubble keeps an 8px viewport margin.
 */
export function placeTooltip(
  rect: AnchorRect,
  bubble: BubbleSize,
  viewportWidth: number,
  offset = 10,
  margin = 8,
): PlacedTooltip {
  let placement: 'top' | 'bottom' = 'top'
  let top = rect.top - offset - bubble.height
  if (top < margin) {
    placement = 'bottom'
    top = rect.bottom + offset
  }

  const center = rect.left + rect.width / 2
  let left = center - bubble.width / 2
  left = Math.min(Math.max(margin, left), viewportWidth - bubble.width - margin)
  const arrow = Math.min(Math.max(12, center - left), bubble.width - 12)

  return {
    placement,
    top,
    left,
    arrow,
  }
}
