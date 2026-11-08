export function useHeader() {
  const route = useRoute()

  const desktopLinks = computed(() => [{
    label: '概览',
    to: '/docs',
    active: route.path === '/docs'
  }, {
    label: '指南',
    to: '/docs/guides',
    active: route.path.startsWith('/docs/guides')
  }, {
    label: '组件',
    to: '/docs/components',
    active: route.path.startsWith('/docs/components')
  }, {
    label: '设计规范',
    to: 'https://open.feishu.cn/document/tools-and-resources/design-specification',
    target: '_blank'
  }])

  const mobileLinks = computed(() => desktopLinks.value)

  return {
    desktopLinks,
    mobileLinks
  }
}
