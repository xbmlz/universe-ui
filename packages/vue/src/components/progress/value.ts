import type { ProgressInfoPlacement, ProgressStatus, ProgressVariant } from './types'

export function clampPercent(percent: number): number {
  return Math.min(100, Math.max(0, percent))
}

export function progressInfo(percent: number, format?: (percent: number) => string): string {
  return format
    ? format(percent)
    : `${Math.round(percent)}%`
}

/** A circle keeps its info on the left, a line on the right; an explicit placement wins. */
export function defaultInfoPlacement(variant: ProgressVariant, placement?: ProgressInfoPlacement): ProgressInfoPlacement {
  return placement ?? (variant === 'circle'
    ? 'left'
    : 'right')
}

/** A finished or failed circle shows only its icon, and an indeterminate bar shows no number. */
export function showsInfo(options: {
  variant: ProgressVariant
  status: ProgressStatus
  showInfo: boolean
  indeterminate: boolean
}): boolean {
  const iconOnly = options.variant === 'circle' && options.status !== 'normal' && !options.indeterminate
  return options.showInfo
    && !options.indeterminate
    && !iconOnly
    && (options.variant === 'line' || options.status !== 'error')
}
