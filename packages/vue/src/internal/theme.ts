import type { Ref } from 'vue'
import { useEventListener, usePreferredDark } from '@vueuse/core'
import { computed, onMounted, shallowRef, watch } from 'vue'

export const THEME_STORAGE_KEY = 'vitepress-theme-appearance'
export type ThemeMode = 'auto' | 'light' | 'dark'

export function resolveTheme(mode: ThemeMode, prefersDark: boolean): 'light' | 'dark' {
  return mode === 'auto'
    ? (prefersDark ? 'dark' : 'light')
    : mode
}

export function parseThemeMode(value: string | null | undefined): ThemeMode {
  return value === 'light' || value === 'dark' || value === 'auto'
    ? value
    : 'auto'
}

export interface UseThemeReturn {
  mode: Ref<ThemeMode>
  isDark: Ref<boolean>
  resolved: Ref<'light' | 'dark'>
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}

const mode = shallowRef<ThemeMode>('auto')

export function useTheme(): UseThemeReturn {
  const prefersDark = usePreferredDark()
  const isDark = computed(
    () => mode.value === 'dark' || (mode.value === 'auto' && prefersDark.value),
  )
  const resolved = computed<'light' | 'dark'>(() => (isDark.value ? 'dark' : 'light'))
  const target = shallowRef<Window | null>(null)

  function apply() {
    if (typeof document === 'undefined')
      return
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  function setMode(next: ThemeMode) {
    mode.value = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    }
    catch {
      // Storage can be unavailable in private or sandboxed contexts.
    }
    apply()
  }

  function toggle() {
    setMode(isDark.value ? 'light' : 'dark')
  }

  onMounted(() => {
    target.value = window
    let stored: string | null = null
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY)
    }
    catch {
      stored = null
    }
    mode.value = parseThemeMode(stored)
    apply()
  })

  watch([mode, prefersDark], apply)
  useEventListener(target, 'storage', (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY)
      return
    mode.value = parseThemeMode(event.newValue)
    apply()
  })

  return {
    mode,
    isDark,
    resolved,
    setMode,
    toggle,
  }
}
