import { onScopeDispose, shallowRef } from 'vue'

export interface ConsoleLog {
  level: string
  text: string
}

function formatArg(value: unknown): string {
  if (typeof value === 'string')
    return value
  if (typeof value === 'bigint')
    return `${value}n`
  if (value instanceof Error)
    return `${value.name}: ${value.message}`

  try {
    return JSON.stringify(value, (_key, item) => {
      if (typeof item === 'bigint')
        return `${item}n`
      if (typeof item === 'function')
        return `[Function ${item.name || 'anonymous'}]`
      if (item instanceof Error)
        return `${item.name}: ${item.message}`
      return item
    }) ?? String(value)
  }
  catch {
    return String(value)
  }
}

export function useConsole() {
  const logs = shallowRef<ConsoleLog[]>([])

  const handler = (event: MessageEvent) => {
    const data = event.data
    if (!data || typeof data !== 'object' || data.action !== 'console')
      return

    if (data.level === 'clear') {
      logs.value = []
      return
    }

    const args = Array.isArray(data.args)
      ? data.args
      : [data.args]
    const text = args.map(formatArg).join(' ')
    logs.value = [
      ...logs.value.slice(-499),
      {
        level: String(data.level || 'log'),
        text,
      },
    ]
  }

  window.addEventListener('message', handler)
  onScopeDispose(() => window.removeEventListener('message', handler))

  const clearLogs = () => {
    logs.value = []
  }

  return { logs, clearLogs }
}
