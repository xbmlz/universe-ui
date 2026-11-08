---
title: Button
description: 触发操作、提交表单或打开链接的基础按钮。
category: component
navigation:
  title: Button 按钮
links:
  - label: 设计规范
    icon: i-lucide-external-link
    to: https://open.feishu.cn/document/tools-and-resources/design-specification/component---data-entry/button/button-overview
    target: _blank
---

## 基础用法

按钮类型表达操作的优先级。同一区域通常只保留一个主要按钮。

::component-example{name="button-type-example" description="按钮类型"}
::

## 尺寸

中号（`md`）是常规表单和弹窗页脚的主要尺寸；小号和超小号用于列表行内操作。

::component-example{name="button-size-example" description="尺寸从 xl 到 xs"}
::

## 图标

只有图标含义明确时才使用图标。仅图标按钮应提供 `aria-label`。

::component-example{name="button-icon-example" description="左侧图标与仅图标按钮"}
::

## 状态与宽度

加载状态会保留按钮占位；危险操作使用对应类型，并通过文案明确操作结果。

::component-example{name="button-state-example" description="加载、禁用、圆角和通栏"}
::

## 按钮组与分裂按钮

同一按钮组内尽量保持尺寸一致。分裂按钮把主操作和更多操作分开。

::component-example{name="button-group-example" description="按钮组与分裂按钮"}
::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `primary \| danger \| secondary-primary \| secondary-danger \| secondary \| text \| link` | `secondary` | 按钮类型 |
| `size` | `xl \| lg \| md \| sm \| xs` | `md` | 按钮尺寸 |
| `disabled` | `boolean` | `false` | 禁用状态 |
| `loading` | `boolean` | `false` | 加载状态 |
| `block` | `boolean` | `false` | 通栏宽度 |
| `round` | `boolean` | `false` | 全圆角 |
| `htmlType` | `button \| submit \| reset` | `button` | 原生按钮类型 |
| `icon` | `Component` | - | IconPark 图标组件 |
| `iconPosition` | `left \| right` | `left` | 图标位置 |
| `iconOnly` | `boolean` | `false` | 仅显示图标 |

### Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 按钮文案 |
| `icon` | 自定义图标内容 |
