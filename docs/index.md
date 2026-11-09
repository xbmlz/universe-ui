---
layout: home

hero:
  name: Universe UI
  text: 飞书 Universe Design 的 Vue 组件库
  tagline: 尺寸、间距、颜色与状态都从 design/ 规范出发
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/
    - theme: alt
      text: 浏览组件
      link: /components/

features:
  - title: 规范优先
    details: 组件的尺寸、间距、颜色角色和状态严格对齐飞书 Universe Design，而不是从其他组件库的主题出发。
  - title: 普通 SFC
    details: 组件保持普通单文件组件写法，同一套代码既能用于常规 Vue 应用，也能通过 interop 插件运行在 Vapor 应用中。
  - title: 三层 Token
    details: 底层与语义变量集中在 @universe-ui/tokens，组件级变量落在各组件 theme.css，避免颜色和尺寸散落在样式里。
---
