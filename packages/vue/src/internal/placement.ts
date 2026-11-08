export interface PanelAnchor {
  top: number
  bottom: number
  left: number
  right: number
}

export interface PanelSize {
  width: number
  height: number
}

export interface PanelViewport {
  width: number
  height: number
  /** Distance kept from the window edge. */
  margin?: number
  /** Gap between the trigger and the panel. */
  gap?: number
}

export interface PanelPlacement {
  placement: 'top' | 'bottom'
  top: number
  left: number
}

/**
 * Universe Design puts a floating panel under the trigger and aligns its left edge.
 * When the bottom runs out it opens upward; when the right edge runs out it shifts
 * left so the panel still fits. The 8px margin and 4px gap are inferred from the
 * select menu, which the cascader spec says to follow.
 */
export function placePanel(anchor: PanelAnchor, panel: PanelSize, viewport: PanelViewport): PanelPlacement {
  const margin = viewport.margin ?? 8
  const gap = viewport.gap ?? 4
  const below = viewport.height - anchor.bottom
  const above = anchor.top
  const placement: 'top' | 'bottom' = below < panel.height + gap && above > below
    ? 'top'
    : 'bottom'

  let left = anchor.left
  if (left + panel.width > viewport.width - margin && anchor.right - panel.width >= margin)
    left = anchor.right - panel.width
  left = Math.max(margin, Math.min(left, viewport.width - panel.width - margin))

  const top = placement === 'top'
    ? anchor.top - gap - panel.height
    : anchor.bottom + gap

  return {
    placement,
    top: Math.round(top),
    left: Math.round(left),
  }
}
