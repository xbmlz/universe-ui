import type { NotificationConfig, NotificationOptions } from './types'
import { shallowReactive, shallowRef } from 'vue'

export interface NotificationEntry extends NotificationOptions {
  id: number
  duration: number
  /** Bumped on update, restarting the timer. */
  revision: number
}

/** Newest first, so the latest notification sits at the top (inferred). */
export const entries = shallowReactive<NotificationEntry[]>([])
export const config = shallowRef<Required<NotificationConfig>>({ max: 0, top: 16, right: 16 })

let seed = 0

/** Spec: closes after 4s by default; notifications that need interaction stay until closed. */
export function defaultDuration(options: NotificationOptions) {
  return options.actions?.length ? 0 : 4000
}

export function add(options: NotificationOptions) {
  const entry: NotificationEntry = {
    ...options,
    id: ++seed,
    duration: options.duration ?? defaultDuration(options),
    revision: 0,
  }
  entries.unshift(entry)
  const limit = config.value.max
  if (limit > 0) {
    while (entries.length > limit)
      remove(entries[entries.length - 1]!.id)
  }
  return entry.id
}

export function update(id: number, options: Partial<NotificationOptions>) {
  const index = entries.findIndex(entry => entry.id === id)
  if (index < 0)
    return
  const current = entries[index]!
  entries[index] = {
    ...current,
    ...options,
    duration: options.duration ?? current.duration,
    revision: current.revision + 1,
  }
}

export function remove(id: number) {
  const index = entries.findIndex(entry => entry.id === id)
  if (index < 0)
    return
  const [entry] = entries.splice(index, 1)
  entry!.onClose?.()
}
