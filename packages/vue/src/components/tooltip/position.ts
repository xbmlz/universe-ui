export type TooltipPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom'

export interface AnchorRect {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
}

export interface BubbleSize {
  width: number
  height: number
}

export interface ViewportSize {
  width: number
  height: number
}

export interface PlacedTooltip {
  /** Resolved placement after viewport flip. */
  placement: TooltipPlacement
  top: number
  left: number
  /** Distance from the leading edge of the arrow axis (left for top/bottom, top for left/right). */
  arrow: number
}

/** 4px gap + 6px arrow, from the size figure. */
export const TOOLTIP_OFFSET = 10
/** Inferred viewport margin so the bubble does not kiss the window edge. */
export const TOOLTIP_MARGIN = 8
/** Keep the arrow tip inside the bubble's rounded corners. */
export const TOOLTIP_ARROW_INSET = 12

function sideOf(placement: TooltipPlacement): 'top' | 'bottom' | 'left' | 'right' {
  if (placement.startsWith('top'))
    return 'top'
  if (placement.startsWith('bottom'))
    return 'bottom'
  if (placement.startsWith('left'))
    return 'left'
  return 'right'
}

function flip(placement: TooltipPlacement): TooltipPlacement {
  const map: Record<TooltipPlacement, TooltipPlacement> = {
    top: 'bottom',
    topLeft: 'bottomLeft',
    topRight: 'bottomRight',
    bottom: 'top',
    bottomLeft: 'topLeft',
    bottomRight: 'topRight',
    left: 'right',
    leftTop: 'rightTop',
    leftBottom: 'rightBottom',
    right: 'left',
    rightTop: 'leftTop',
    rightBottom: 'leftBottom',
  }
  return map[placement]
}

function fits(
  placement: TooltipPlacement,
  rect: AnchorRect,
  bubble: BubbleSize,
  viewport: ViewportSize,
  offset: number,
  margin: number,
): boolean {
  const side = sideOf(placement)
  if (side === 'top')
    return rect.top - offset - bubble.height >= margin
  if (side === 'bottom')
    return rect.bottom + offset + bubble.height <= viewport.height - margin
  if (side === 'left')
    return rect.left - offset - bubble.width >= margin
  return rect.right + offset + bubble.width <= viewport.width - margin
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(min, value), max)
}

/**
 * Place the bubble for a requested placement. The size figure puts 4px between the
 * arrow tip and the trigger; with a 6px arrow that is a 10px outer offset. When the
 * preferred side overflows the viewport the placement flips to the opposite side,
 * keeping the alignment suffix (topLeft → bottomLeft).
 */
export function placeTooltip(
  rect: AnchorRect,
  bubble: BubbleSize,
  viewport: ViewportSize | number,
  preferred: TooltipPlacement = 'top',
  offset = TOOLTIP_OFFSET,
  margin = TOOLTIP_MARGIN,
): PlacedTooltip {
  const view: ViewportSize = typeof viewport === 'number'
    ? { width: viewport, height: Number.POSITIVE_INFINITY }
    : viewport

  let placement = preferred
  if (!fits(placement, rect, bubble, view, offset, margin)) {
    const opposite = flip(placement)
    if (fits(opposite, rect, bubble, view, offset, margin))
      placement = opposite
  }

  const side = sideOf(placement)
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  let top = 0
  let left = 0
  let arrow = 0

  if (side === 'top' || side === 'bottom') {
    top = side === 'top'
      ? rect.top - offset - bubble.height
      : rect.bottom + offset

    if (placement === 'topLeft' || placement === 'bottomLeft')
      left = rect.left
    else if (placement === 'topRight' || placement === 'bottomRight')
      left = rect.right - bubble.width
    else
      left = centerX - bubble.width / 2

    left = clamp(left, margin, view.width - bubble.width - margin)
    arrow = clamp(centerX - left, TOOLTIP_ARROW_INSET, bubble.width - TOOLTIP_ARROW_INSET)
  }
  else {
    left = side === 'left'
      ? rect.left - offset - bubble.width
      : rect.right + offset

    if (placement === 'leftTop' || placement === 'rightTop')
      top = rect.top
    else if (placement === 'leftBottom' || placement === 'rightBottom')
      top = rect.bottom - bubble.height
    else
      top = centerY - bubble.height / 2

    top = clamp(top, margin, Number.isFinite(view.height)
      ? view.height - bubble.height - margin
      : top)
    arrow = clamp(centerY - top, TOOLTIP_ARROW_INSET, bubble.height - TOOLTIP_ARROW_INSET)
  }

  return {
    placement,
    top,
    left,
    arrow,
  }
}
