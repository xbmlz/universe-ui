---
title: Icon
description: 使用 IconPark 图标，并在组件中统一控制尺寸与颜色。
---

# Icon 图标

Universe UI 不单独封装图标组件。图标直接使用 [IconPark](https://iconpark.oceanengine.com/) 的 Vue 3 组件；`Button`、`MenuButton`、`Tag`、`Badge` 等组件的 `icon` 属性接收任意图标组件。

## 基础用法

从 `@icon-park/vue-next` 按需导入图标。`size` 控制图标尺寸，`fill="currentColor"` 让图标跟随所在的文字颜色。

:::demo icon/basic 基础图标
:::

## 尺寸

独立图标建议使用 16、20、24 或 32px。按钮内的图标会跟随按钮尺寸自动缩放：`xl` / `lg` 为 20px，`md` / `sm` / `xs` 为 16 / 14px。

:::demo icon/size 图标尺寸
:::

## 在组件中使用

`Button`、`MenuButton`、`Tag`、`Badge` 等组件通过 `icon` 属性接收 IconPark 组件。图标按钮的各种形态和交互要求统一见 [Button 图标按钮](/components/button)。

## 无障碍

- 纯装饰图标不额外提供文字，避免重复朗读。
- 图标按钮必须提供 `aria-label`，`Tooltip` 只能作为补充提示。
- 不要只用颜色或图标表达状态；关键状态应同时提供文字。
