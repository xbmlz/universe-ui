import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  { text: '指南', link: '/guide/' },
  { text: '组件', link: '/components/' },
]

export const sidebar: DefaultTheme.Sidebar = {
  '/guide/': [
    {
      text: '指南',
      items: [
        { text: '开始', link: '/guide/' },
        { text: '安装', link: '/guide/installation' },
        { text: '主题与 Dark Mode', link: '/guide/theming' },
      ],
    },
  ],
  '/components/': [
    {
      text: '基础',
      items: [
        { text: 'Icon 图标', link: '/components/icon' },
      ],
    },
    {
      text: '数据录入',
      items: [
        { text: 'Button 按钮', link: '/components/button' },
        { text: 'Input 输入框', link: '/components/input' },
        { text: 'Select 选择器', link: '/components/select' },
        { text: 'Checkbox 多选框', link: '/components/checkbox' },
        { text: 'Radio 单选框', link: '/components/radio' },
        { text: 'Switch 开关', link: '/components/switch' },
      ],
    },
    {
      text: '数据显示',
      items: [
        { text: 'Tag 标签', link: '/components/tag' },
        { text: 'Badge 徽标', link: '/components/badge' },
      ],
    },
  ],
}
