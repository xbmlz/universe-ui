import type { ToastConfig, ToastOptions } from './types'
import { shallowReactive, shallowRef } from 'vue'

export interface ToastEntry extends Required<Omit<ToastOptions, 'onClose' | 'actions'>> {
  id: number
  actions: NonNullable<ToastOptions['actions']>
  onClose?: () => void
  /** Bumped when an identical toast is triggered again, restarting its timer. */
  revision: number
}

export const entries = shallowReactive<ToastEntry[]>([])
export const config = shallowRef<Required<Omit<ToastConfig, 'container'>> & Partial<Pick<ToastConfig, 'container'>>>({
  max: 2,
  top: 32,
  container: null,
})

let seed = 0

/**
 * Spec ranges: 0–40 characters take 3–5s (4–6s with actions), over 40 take 6–8s
 * (6–10s with actions), with a floor of 4s without actions and 6s with them.
 * The point inside each range is inferred; with actions the floor decides the
 * short bucket, otherwise the range middle. Loading stays until it is updated
 * or closed.
 */
export function defaultDuration(options: ToastOptions): number {
  if (options.type === 'loading')
    return 0
  const long = typeof options.content === 'string' && options.content.trim().length > 40
  if (options.actions?.length)
    return long ? 8000 : 6000
  return long ? 7000 : 4000
}

export function add(options: ToastOptions) {
  const type = options.type ?? 'info'
  const twin = entries.find(entry => entry.type === type && entry.content === options.content)
  if (twin) {
    const index = entries.indexOf(twin)
    entries[index] = { ...twin, revision: twin.revision + 1 }
    return twin.id
  }

  const entry: ToastEntry = {
    id: ++seed,
    type,
    content: options.content,
    duration: options.duration ?? defaultDuration(options),
    closable: options.closable
      ?? (typeof options.content === 'string' && options.content.trim().length > 20),
    actions: options.actions ?? [],
    onClose: options.onClose,
    revision: 0,
  }
  entries.push(entry)
  while (entries.length > config.value.max) remove(entries[0]!.id)
  return entry.id
}

export function update(id: number, options: Partial<ToastOptions>) {
  const index = entries.findIndex(entry => entry.id === id)
  if (index < 0)
    return
  const current = entries[index]!
  const type = options.type ?? current.type
  const duration = options.duration
    ?? (options.type && options.type !== current.type
      ? defaultDuration({
          ...current,
          ...options,
          type,
        })
      : current.duration)
  entries[index] = {
    ...current,
    ...options,
    type,
    duration,
    revision: current.revision + 1,
  } as ToastEntry
}

export function remove(id: number) {
  const index = entries.findIndex(entry => entry.id === id)
  if (index < 0)
    return
  const [entry] = entries.splice(index, 1)
  entry!.onClose?.()
}
