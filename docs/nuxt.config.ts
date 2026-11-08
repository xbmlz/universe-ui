export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/content'],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN'
      },
      title: 'Universe UI',
      meta: [
        { name: 'description', content: '飞书 Universe Design 的 Vue 组件库。' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  ui: {
    fonts: false
  },

  icon: {
    serverBundle: {
      collections: ['lucide', 'simple-icons']
    },
    clientBundle: {
      icons: [
        'lucide:book-open',
        'lucide:external-link',
        'lucide:square-code',
        'simple-icons:github'
      ]
    }
  },

  content: {
    experimental: {
      sqliteConnector: 'native'
    },
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'css', 'json', 'ts', 'typescript', 'vue']
        }
      }
    }
  },


  compatibilityDate: '2025-07-15'
})
