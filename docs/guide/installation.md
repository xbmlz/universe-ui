---
title: 安装
description: 在当前仓库或 Vue 3 项目中接入 Universe UI。
---

# 安装

## 在当前仓库中开发

文档和示例直接引用工作区中的源码。安装依赖后启动文档站或 playground：

```bash
pnpm install
pnpm docs:dev
```

`pnpm docs:dev` 启动 VitePress 文档站，默认地址是 `http://localhost:5173/`。

`pnpm dev` 启动 playground，用于在浏览器中检查组件的实际渲染。

## 使用组件

组件从 `@universe-ui/vue` 导出：

```vue
<script setup lang="ts">
import { Button } from '@universe-ui/vue'
</script>

<template>
  <Button type="primary">新建</Button>
</template>
```

:::warning 暂未发布
`@universe-ui/vue` 与 `@universe-ui/tokens` 目前是私有工作区包，还没有发布到 npm。Vue 钉在 `3.6.0-rc.14` 是为了验证 Vapor interop，在 `3.6.0` 稳定前不要把它们作为外部依赖分发。
:::

## 设计变量

颜色、圆角、阴影和字体来自 `@universe-ui/tokens`。在应用入口引入一次：

```css
@import "@universe-ui/tokens";
```

组件自身的主题变量位于各组件目录的 `theme.css`，由组件模块一并引入，不需要额外配置构建工具。

## 在 Vapor 应用中使用

组件本身不使用 Vapor 语法。Vapor 应用需要在挂载前注册 interop 插件：

```ts
import { createVaporApp, vaporInteropPlugin } from 'vue'
import App from './App.vue'
import '@universe-ui/tokens'

createVaporApp(App).use(vaporInteropPlugin).mount('#app')
```
