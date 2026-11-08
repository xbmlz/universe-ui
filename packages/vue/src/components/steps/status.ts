import type { StepStatus } from './types'

/** A step before the active one is finished, the active one is in progress, the rest wait. */
export function stepStatus(index: number, active: number, explicit?: StepStatus): StepStatus {
  if (explicit)
    return explicit
  if (index < active)
    return 'finish'
  if (index === active)
    return 'process'
  return 'wait'
}

/** The connector after a step: red when the next step failed, brand after a finished step, otherwise muted. */
export function lineKind(status: StepStatus, nextStatus: StepStatus | undefined, dotted: boolean): 'muted' | 'danger' | 'brand' {
  if (dotted)
    return 'muted'
  if (nextStatus === 'error')
    return 'danger'
  if (status === 'finish')
    return 'brand'
  return 'muted'
}
