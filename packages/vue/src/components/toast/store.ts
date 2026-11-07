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
export const config = shallowRef<Required<ToastConfig>>({ max: 2, top: 32 })

let seed = 0

/**
 * Spec: at least 4s without actions and 6s with actions; loading stays until closed.
 */
export function defaultDuration(options: ToastOptions) {
  if (options.type === 'loading')
    return 0
  return options.actions?.length ? 6000 : 4000
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
    closable: options.closable ?? false,
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
