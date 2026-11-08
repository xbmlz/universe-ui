/** 0-1023 bytes, then one decimal of KB or MB. */
export function formatSize(bytes: number): string {
  if (bytes < 1024)
    return `${bytes} B`
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/**
 * Mirrors the `accept` attribute: a dot rule matches the suffix, `type/*` matches the
 * MIME family, and anything else must match the MIME type exactly.
 */
export function matchesAccept(file: { name: string, type: string }, accept: string): boolean {
  const rules = accept
    .split(',')
    .map(rule => rule.trim().toLowerCase())
    .filter(Boolean)
  if (!rules.length)
    return true
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return rules.some((rule) => {
    if (rule.startsWith('.'))
      return name.endsWith(rule)
    if (rule.endsWith('/*'))
      return type.startsWith(rule.slice(0, -1))
    return type === rule
  })
}
