export interface DropdownPoint {
  x: number
  y: number
}

export interface DropdownSize {
  width: number
  height: number
}

/** Specified page safe gap for a contextual menu. */
export const DROPDOWN_SAFE_GAP = 16

/**
 * Position a contextual menu beside the pointer. It prefers the space to the
 * right and below; when the bottom is short, the menu aligns its bottom edge to
 * the 16px page safe area instead of following the pointer.
 */
export function placeContextMenu(
  point: DropdownPoint,
  menu: DropdownSize,
  viewport: DropdownSize,
) {
  const gap = 4
  const safe = DROPDOWN_SAFE_GAP
  let left = point.x + gap
  if (left + menu.width > viewport.width - safe)
    left = point.x - gap - menu.width
  let top = point.y + gap
  if (top + menu.height > viewport.height - safe)
    top = viewport.height - safe - menu.height

  return {
    left: Math.min(Math.max(safe, left), Math.max(safe, viewport.width - menu.width - safe)),
    top: Math.min(Math.max(safe, top), Math.max(safe, viewport.height - menu.height - safe)),
  }
}
