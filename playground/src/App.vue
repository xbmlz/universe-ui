<script setup lang="ts">
import { useTheme } from '@universe-ui/vue'
import { Repl } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'
import { computed, ref, useTemplateRef, watchEffect } from 'vue'
import ConsolePanel from './components/ConsolePanel.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import { useConsole } from './repl/console'
import { resetExample, store } from './repl/store'
import { tokensCss } from './repl/tokens'

const { resolved } = useTheme()
const replRef = useTemplateRef<InstanceType<typeof Repl>>('repl')
const showConsole = ref(false)
const { logs, clearLogs } = useConsole()

const darkTokensCss = tokensCss.replace(/\.dark\s*\{/g, ':root {')

const previewCss = computed(() =>
  [
    tokensCss,
    resolved.value === 'dark'
      ? darkTokensCss
      : '',
    `:root { color-scheme: ${resolved.value}; }`,
  ].join('\n'),
)

const previewOptions = computed(() => ({
  showRuntimeError: true,
  headHTML: `
    <style>${previewCss.value}</style>
    <style>
      html, body {
        margin: 0;
        background: var(--ud-color-bg-page);
        color: var(--ud-color-text);
        font-family: var(--ud-font-family);
      }
    </style>
  `,
}))

watchEffect(() => {
  const serialized = store.serialize()
  if (!serialized)
    return
  const hash = serialized.startsWith('#')
    ? serialized
    : `#${serialized}`
  if (location.hash !== hash)
    history.replaceState({}, '', hash)
})

watchEffect(() => {
  store.serialize()
  clearLogs()
})

function refresh() {
  clearLogs()
  replRef.value?.reload()
}

function reset() {
  resetExample()
  refresh()
}
</script>

<template>
  <div class="repl-shell">
    <header class="repl-header">
      <div class="repl-header__brand">
        <span class="repl-header__mark">U</span>
        <div>
          <strong>Universe UI Playground</strong>
          <small>Vue SFC REPL · @universe-ui/vue</small>
        </div>
      </div>
      <div class="repl-header__actions">
        <button
          type="button"
          class="repl-button"
          @click="reset"
        >
          重置示例
        </button>
        <button
          type="button"
          class="repl-button"
          :class="{ 'repl-button--active': showConsole }"
          @click="showConsole = !showConsole"
        >
          Console
        </button>
        <button
          type="button"
          class="repl-button"
          @click="refresh"
        >
          刷新
        </button>
        <ThemeToggle />
      </div>
    </header>
    <div class="repl-body">
      <Repl
        ref="repl"
        :key="resolved"
        :store="store"
        :editor="Monaco"
        :theme="resolved"
        preview-theme
        auto-resize
        :preview-options="previewOptions"
      />
      <ConsolePanel
        v-if="showConsole"
        :logs="logs"
        @clear="clearLogs"
      />
    </div>
  </div>
</template>
