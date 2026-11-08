export interface Rgb {
  r: number
  g: number
  b: number
}

export interface Hsv {
  /** Degrees, 0-360. */
  h: number
  /** 0-1. */
  s: number
  /** 0-1. */
  v: number
}

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i

/** Accepts #abc / abc / #aabbcc / aabbcc and returns #aabbcc, or null. */
export function parseHex(input: string): string | null {
  const match = HEX.exec(input.trim())
  if (!match)
    return null
  const body = match[1]!.toLowerCase()
  const full = body.length === 3
    ? body.split('').map(char => char + char).join('')
    : body
  return `#${full}`
}

export function hexToRgb(hex: string): Rgb | null {
  const parsed = parseHex(hex)
  if (!parsed)
    return null
  return {
    r: Number.parseInt(parsed.slice(1, 3), 16),
    g: Number.parseInt(parsed.slice(3, 5), 16),
    b: Number.parseInt(parsed.slice(5, 7), 16),
  }
}

function channel(value: number) {
  return Math.round(Math.min(255, Math.max(0, value)))
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const body = [r, g, b].map((value) => {
    const channelValue = channel(value).toString(16)
    return channelValue.length === 1
      ? `0${channelValue}`
      : channelValue
  })
  return `#${body.join('')}`
}

export function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const red = channel(r) / 255
  const green = channel(g) / 255
  const blue = channel(b) / 255
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === red)
      h = ((green - blue) / delta) % 6
    else if (max === green)
      h = (blue - red) / delta + 2
    else
      h = (red - green) / delta + 4
    h *= 60
    if (h < 0)
      h += 360
  }

  return {
    h,
    s: max === 0
      ? 0
      : delta / max,
    v: max,
  }
}

export function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const hue = ((h % 360) + 360) % 360
  const saturation = Math.min(1, Math.max(0, s))
  const value = Math.min(1, Math.max(0, v))
  const chroma = value * saturation
  const secondary = chroma * (1 - Math.abs((hue / 60) % 2 - 1))
  const base = value - chroma

  const parts: [number, number, number] = (() => {
    if (hue < 60)
      return [chroma, secondary, 0]
    if (hue < 120)
      return [secondary, chroma, 0]
    if (hue < 180)
      return [0, chroma, secondary]
    if (hue < 240)
      return [0, secondary, chroma]
    if (hue < 300)
      return [secondary, 0, chroma]
    return [chroma, 0, secondary]
  })()

  return {
    r: channel((parts[0] + base) * 255),
    g: channel((parts[1] + base) * 255),
    b: channel((parts[2] + base) * 255),
  }
}

export function hexToHsv(hex: string): Hsv | null {
  const rgb = hexToRgb(hex)
  return rgb
    ? rgbToHsv(rgb)
    : null
}

export function hsvToHex(hsv: Hsv): string {
  return rgbToHex(hsvToRgb(hsv))
}
