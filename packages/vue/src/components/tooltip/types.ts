import type { TooltipPlacement } from './position'

export type { TooltipPlacement }

export interface TooltipProps {
  content: string
  /** Preferred placement; flips to the opposite side when that side does not fit. */
  placement?: TooltipPlacement
  onlyOverflow?: boolean
}
