---
title: 指南
description: 安装 Universe UI，并在 Vue 应用中开始使用。
---

# 指南

Universe UI 是飞书 Universe Design 的 Vue 组件库。组件的尺寸、间距、颜色角色和状态都以仓库根目录 `design/` 下的规范与设计图为准，而不是从其他组件库的主题出发。

## 设计规范优先

- 组件的视觉值必须能追溯到 `design/`：写在规范里的值是 **specified**，从 2× 设计图量出来的是 **measured**，两者都没有、只能推断的值会明确标注为 **inferred**。
- 颜色、圆角、阴影和字体来自 `@universe-ui/tokens`，组件级变量落在各自的 `theme.css`。
- 不引入 Sass、Less 或第三方组件主题；组件样式是全局 CSS，使用 `--ud-*` 变量。

## 组件写法

- 组件是普通单文件组件：`<script setup lang="ts">`、`defineModel`、具名插槽和 provide/inject。
- 同一套组件既可用于常规 Vue 应用，也可通过 `vaporInteropPlugin` 运行在 Vapor 应用中。
- Vue 当前钉在 `3.6.0-rc.14`，在 3.6 正式版发布前不要把这些包作为依赖对外发布。

## 下一步

- [安装与接入](/guide/installation)
- [浏览组件](/components/)
