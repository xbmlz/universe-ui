export interface TabsFit {
  count: number
  overflow: boolean
}

/** Greedily keeps a prefix of tabs; an overflow control takes one gap plus controlWidth. */
export function fitTabs(
  widths: number[],
  gap: number,
  available: number,
  controlWidth: number,
): TabsFit {
  const total = widths.reduce((sum, width, index) => sum + width + (index ? gap : 0), 0)
  if (total <= available)
    return { count: widths.length, overflow: false }

  const content = Math.max(0, available - gap - controlWidth)
  let used = 0
  let count = 0
  for (const width of widths) {
    const next = used + width + (count ? gap : 0)
    if (next > content)
      break
    used = next
    count++
  }
  return { count, overflow: true }
}
