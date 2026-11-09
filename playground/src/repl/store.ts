import { File, mergeImportMap, useStore, useVueImportMap } from '@vue/repl'
import { computed, reactive, toRefs } from 'vue'
import welcomeCode from './welcome.vue?raw'

const localBase = `${location.origin}/src/repl`
const { importMap, vueVersion } = useVueImportMap()

const builtinImportMap = computed(() =>
  mergeImportMap(importMap.value, {
    imports: {
      'vue': `${localBase}/vue.ts`,
      '@universe-ui/vue': `${localBase}/universe-ui.ts`,
    },
  }),
)

const state = reactive({
  files: {
    'src/App.vue': new File('src/App.vue', welcomeCode),
  },
  mainFile: 'src/App.vue',
  activeFilename: 'src/App.vue',
  template: {
    welcomeSFC: welcomeCode,
  },
  builtinImportMap,
  vueVersion,
})

const rawHash = location.hash.replace(/^#/, '')
const serializedState = rawHash && !rawHash.startsWith('/') && rawHash.length > 32
  ? rawHash
  : undefined

export const store = useStore(toRefs(state), serializedState)

const DEFAULT_REPL_WELCOME = /const msg = ref\('Hello World!'\)[\s\S]*<input v-model="msg"\s*\/>/
const appFile = store.files['src/App.vue']

if (
  appFile
  && !appFile.code.includes('@universe-ui/vue')
  && DEFAULT_REPL_WELCOME.test(appFile.code)
) {
  appFile.code = welcomeCode
  store.setActive('src/App.vue')
}

export function resetExample() {
  const file = store.files['src/App.vue']
  if (!file) {
    store.addFile(new File('src/App.vue', welcomeCode))
  }
  else {
    file.code = welcomeCode
  }
  store.setActive('src/App.vue')
  history.replaceState({}, '', `${location.pathname}${location.search}`)
}
