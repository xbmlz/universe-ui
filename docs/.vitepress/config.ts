import { defineConfig } from 'vitepress'
import { demoPlugin } from './plugins/demo'
import { nav, sidebar } from './sidebar'

const repo = 'https://github.com/xbmlz/universe-ui'

export default defineConfig({
  title: 'Universe UI',
  description: '飞书 Universe Design 的 Vue 组件库。',
  lang: 'zh-CN',
  cleanUrls: true,
  appearance: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav,
    sidebar,
    outline: { level: [2, 3], label: '本页目录' },
    socialLinks: [{ icon: 'github', link: repo }],
    editLink: {
      pattern: `${repo}/edit/main/docs/:path`,
      text: '在 GitHub 编辑此页',
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    footer: {
      message: '按飞书 Universe Design 规范实现',
    },
  },
  markdown: {
    config: md => md.use(demoPlugin),
  },
  vite: {
    resolve: {
      dedupe: ['vue'],
    },
    ssr: {
      noExternal: ['@universe-ui/vue'],
    },
  },
})
