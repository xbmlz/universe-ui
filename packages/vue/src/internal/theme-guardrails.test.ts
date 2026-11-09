import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const colorCss = readFileSync(new URL('../../../tokens/src/color.css', import.meta.url), 'utf8')
const shadowCss = readFileSync(new URL('../../../tokens/src/shadow.css', import.meta.url), 'utf8')

function readBlock(source: string, selector: string): Map<string, string> {
  const start = source.indexOf(`${selector} {`)
  if (start === -1)
    throw new Error(`Missing ${selector} block`)

  const end = source.indexOf('\n}', start)
  if (end === -1)
    throw new Error(`Unclosed ${selector} block`)

  const body = source.slice(start, end)
  const vars = new Map<string, string>()
  for (const match of body.matchAll(/--(ud-[a-z0-9-]+):\s*([^;]+);/g)) {
    vars.set(`--${match[1]}`, match[2].trim())
  }
  return vars
}

const root = readBlock(colorCss, ':root')
const dark = readBlock(colorCss, '.dark')

function resolveVar(name: string, vars: Map<string, string>, seen = new Set<string>()): string {
  const value = vars.get(name)
  if (!value)
    throw new Error(`Missing ${name}`)

  const alias = value.match(/^var\((--ud-[a-z0-9-]+)\)$/)
  if (!alias)
    return value
  if (seen.has(name))
    throw new Error(`Circular alias for ${name}`)

  seen.add(name)
  return resolveVar(alias[1], vars, seen)
}

type Rgb = [number, number, number]

function parseColor(value: string): Rgb {
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex) {
    const digits = hex[1].length === 3
      ? [...hex[1]].map(char => char + char).join('')
      : hex[1]
    return [0, 2, 4].map(index => Number.parseInt(digits.slice(index, index + 2), 16)) as Rgb
  }

  const rgb = value.match(/^rgb\(\s*([\d.]+)[,\s]\s*([\d.]+)[,\s]\s*([\d.]+)\s*\)$/i)
  if (rgb) {
    return [
      Number(rgb[1]),
      Number(rgb[2]),
      Number(rgb[3]),
    ]
  }

  throw new Error(`Cannot parse colour: ${value}`)
}

function luminance([red, green, blue]: Rgb): number {
  const channels = [red, green, blue].map((channel) => {
    const value = channel / 255
    return value <= 0.03928
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function contrast(foreground: Rgb, background: Rgb): number {
  const [lighter, darker] = [
    luminance(foreground),
    luminance(background),
  ].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}

const constantPrimitives = new Set([
  '--ud-blue-7',
  '--ud-purple-500',
  '--ud-turquoise-600',
  '--ud-green-600',
  '--ud-lime-600',
  '--ud-yellow-500',
  '--ud-yellow-600',
  '--ud-orange-600',
  '--ud-carmine-500',
])

const primitivePattern = /^--ud-(?:blue|red|green|orange|yellow|purple|turquoise|lime|carmine|collab)-\d+$/
const feedbackFills = new Set(['--ud-green-50', '--ud-red-50', '--ud-orange-50'])
const constantSemanticPattern = /^--ud-color-white-a\d+$/

function themeFiles(): string[] {
  const directory = fileURLToPath(new URL('../components', import.meta.url))
  return readdirSync(directory, { recursive: true })
    .map(String)
    .filter(file => file.endsWith('theme.css'))
    .map(file => join(directory, file))
}

function cssFiles(): string[] {
  const directory = fileURLToPath(new URL('../../../../playground/src', import.meta.url))
  return readdirSync(directory, { recursive: true })
    .map(String)
    .filter(file => file.endsWith('.css'))
    .map(file => join(directory, file))
}

describe('token parity', () => {
  it('gives every semantic token a dark value', () => {
    const missing = [
      ...root.keys(),
    ].filter((name) => {
      const semantic = name.startsWith('--ud-color-') || name.startsWith('--ud-tag-')
      return (semantic || feedbackFills.has(name))
        && !constantSemanticPattern.test(name)
        && !dark.has(name)
    })
    expect(missing).toEqual([])
  })

  it('resolves every component colour reference in both themes', () => {
    const problems = new Set<string>()
    for (const file of themeFiles()) {
      const source = readFileSync(file, 'utf8')
      const localNames = new Set(
        [
          ...source.matchAll(/--(ud-[a-z0-9-]+):/g),
        ].map(match => `--${match[1]}`),
      )

      for (const match of source.matchAll(/var\((--ud-[a-z0-9-]+)\)/g)) {
        const name = match[1]
        if (localNames.has(name))
          continue

        const semantic = name.startsWith('--ud-color-') || name.startsWith('--ud-tag-')
        const primitive = primitivePattern.test(name)
        if (!semantic && !primitive)
          continue

        if (!root.has(name))
          problems.add(`${file}: ${name} missing in :root`)
        if (semantic && !constantSemanticPattern.test(name) && !dark.has(name))
          problems.add(`${file}: ${name} missing in .dark`)
        if (primitive && !feedbackFills.has(name) && !constantPrimitives.has(name) && !dark.has(name))
          problems.add(`${file}: ${name} missing in .dark`)
      }
    }
    expect([...problems]).toEqual([])
  })

  it('declares a colour scheme per theme', () => {
    expect(root.has('--ud-color-bg-1')).toBe(true)
    expect(colorCss).toMatch(/color-scheme: light/i)
    expect(colorCss).toMatch(/color-scheme: dark/i)
    expect(shadowCss).toMatch(/\.dark\s*\{/)
  })
})

describe('contrast', () => {
  const pairs = [
    {
      label: 'light text on surface',
      theme: 'light',
      fg: '--ud-color-text',
      bg: '--ud-color-bg-surface',
      min: 4.5,
    },
    {
      label: 'light secondary on surface',
      theme: 'light',
      fg: '--ud-color-text-secondary',
      bg: '--ud-color-bg-surface',
      min: 4.5,
    },
    {
      label: 'light brand text on surface',
      theme: 'light',
      fg: '--ud-color-brand-text',
      bg: '--ud-color-bg-surface',
      min: 4.5,
    },
    {
      label: 'light inverse on brand',
      theme: 'light',
      fg: '--ud-color-text-inverse',
      bg: '--ud-color-brand',
      min: 4.5,
    },
    {
      label: 'dark text on surface',
      theme: 'dark',
      fg: '--ud-color-text',
      bg: '--ud-color-bg-surface',
      min: 4.5,
    },
    {
      label: 'dark text on recessed surface',
      theme: 'dark',
      fg: '--ud-color-text',
      bg: '--ud-color-bg-1',
      min: 4.5,
    },
    {
      label: 'dark secondary on surface',
      theme: 'dark',
      fg: '--ud-color-text-secondary',
      bg: '--ud-color-bg-surface',
      min: 4.5,
    },
    {
      label: 'dark placeholder on surface',
      theme: 'dark',
      fg: '--ud-color-text-placeholder',
      bg: '--ud-color-bg-surface',
      min: 4.5,
    },
    {
      label: 'dark icon on surface',
      theme: 'dark',
      fg: '--ud-color-icon',
      bg: '--ud-color-bg-surface',
      min: 4.5,
    },
    {
      label: 'dark brand text on surface',
      theme: 'dark',
      fg: '--ud-color-brand-text',
      bg: '--ud-color-bg-surface',
      min: 4.5,
    },
    {
      label: 'dark focus ring on surface',
      theme: 'dark',
      fg: '--ud-color-focus-ring',
      bg: '--ud-color-bg-surface',
      min: 3,
    },
    {
      label: 'dark danger text on surface',
      theme: 'dark',
      fg: '--ud-color-danger-text',
      bg: '--ud-color-bg-surface',
      min: 4.5,
    },
    {
      label: 'dark success text on surface',
      theme: 'dark',
      fg: '--ud-color-success-text',
      bg: '--ud-color-bg-surface',
      min: 4.5,
    },
    {
      label: 'dark warning text on surface',
      theme: 'dark',
      fg: '--ud-color-warning-text',
      bg: '--ud-color-bg-surface',
      min: 4.5,
    },
    {
      label: 'light danger text on surface (large/graphic)',
      theme: 'light',
      fg: '--ud-color-danger-text',
      bg: '--ud-color-bg-surface',
      min: 3,
    },
  ] as const

  it('meets the design thresholds in both themes', () => {
    const failures: string[] = []
    const darkWithPrimitives = new Map([
      ...root,
      ...dark,
    ])
    for (const pair of pairs) {
      const vars = pair.theme === 'light'
        ? root
        : darkWithPrimitives
      const ratio = contrast(
        parseColor(resolveVar(pair.fg, vars)),
        parseColor(resolveVar(pair.bg, vars)),
      )
      if (ratio < pair.min)
        failures.push(`${pair.label}: ${ratio.toFixed(2)} < ${pair.min}`)
    }
    expect(failures).toEqual([])
  })
})

describe('component CSS', () => {
  const allowlist = [
    /[/\\]color-picker[/\\]theme\.css$/,
    /[/\\]imageviewer[/\\]theme\.css$/,
  ]

  it('does not introduce raw colours outside the allowlist', () => {
    const violations: string[] = []
    for (const file of [
      ...themeFiles(),
      ...cssFiles(),
    ]) {
      if (allowlist.some(pattern => pattern.test(file)))
        continue

      const source = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
      const matches = source.match(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/gi)
      if (matches)
        violations.push(`${file}: ${matches.join(', ')}`)
    }
    expect(violations).toEqual([])
  })
})
