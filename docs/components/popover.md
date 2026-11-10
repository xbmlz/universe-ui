---
title: Popover
description: 悬停或点击时在附近浮出的气泡卡片，可放标题、操作和复杂内容。
---

# Popover 气泡卡片

气泡卡片在鼠标移入或点击某个元素时，在附近用浮层展示更多内容。卡片里可以放标题、操作、复杂文本、表单等。

## 使用规则

需要对目标进一步操作，或需要了解更多信息时使用。提示性弱于 Dialog，适合二次确认等轻量场景。

## 组成要素

1. **标题（可选）**
2. **正文文本**
3. **图标（可选）**：标题或文本左侧，辅助说明属性
4. **操作按钮（可选）**
5. **内容区（可选）**：输入框、单选、下拉等
6. **容器背景**
7. **描边、投影**：`border-card` + Shadow/S4/down
8. **触发区域**：按钮、图标、文字链等

## 基础用法

悬停触发区 **100ms** 后出现；移出后延迟 **100ms** 消失。卡片本身也是触发区。

:::demo popover/basic 标题与正文
:::

## 包含标题与类型图标

可配表意图标，帮助识别提示类别：Info / Success / Warning / Error。标题尽量简短，展示不全时允许回行，建议最多两行。

:::demo popover/type 四类提示图标
:::

## 包含操作区

多用于二次确认。主操作建议在最右侧，按钮最多三个；宽度不够时可换行。用 `footer` 插槽放按钮；内容过高滚动时，组件会自动给操作区加上通栏分割线。

:::demo popover/action 点击触发与页脚按钮
:::

## 包含复杂内容区

`content` 插槽可自定义表单等内容。卡片内容与容器间距：小尺寸上下 12 / 左右 16；大尺寸上下 20 / 左右 24（也可用 4N）。

:::demo popover/complex 自定义内容区
:::

## 尺寸

| 项 | Small | Large |
| --- | --- | --- |
| 推荐宽度 | 280px | 280px |
| 最大宽 / 高 | 420 / 480 | 420 / 480 |
| 内容 padding | 12 × 16 | 20 × 24 |
| 标题 | 14px Medium | 复杂内容可用 16px Medium（`titleStrong`） |
| 正文 | 14px Regular | 14px Regular |

箭头宽 12、高 6；触发区到卡片间距 4px（实现里外缘偏移 10px = 4 + 6）。

:::demo popover/size 小尺寸与大尺寸
:::

## 位置

规范给出上下左右四个方位，优先与目标**居中对齐**；靠近页面角落时改为边缘对齐。三角箭头始终指向触发区中心。与页面安全边距 **16px**；首选侧放不下时按上下左右顺序尝试其它侧。

:::demo popover/placement 四个方位（点击打开）
:::

## 加载中

`loading` 时在正文区显示 Spin，宽度与加载完成后保持一致。

:::demo popover/loading 加载态
:::

## API

### Popover

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 是否显示 | `boolean` | `false` |
| `title` | 标题 | `string` | `''` |
| `content` | 正文 | `string` | `''` |
| `trigger` | `hover` / `click` | `PopoverTrigger` | `hover` |
| `placement` | `top` / `bottom` / `left` / `right` | `PopoverPlacement` | `top` |
| `size` | `sm` / `lg` | `PopoverSize` | `sm` |
| `width` | 固定宽度 | `number \| string` | — |
| `type` | 标题区类型图标 | `info \| success \| warning \| error` | — |
| `showArrow` | 是否显示箭头 | `boolean` | `true` |
| `titleStrong` | 标题用 16px Medium | `boolean` | `false` |
| `loading` | 加载中 | `boolean` | `false` |
| `disabled` | 禁用触发 | `boolean` | `false` |

| 插槽 | 说明 |
| --- | --- |
| 默认 | 触发区域 |
| `title` | 自定义标题 |
| `icon` | 自定义图标 |
| `content` | 自定义正文 / 复杂内容 |
| `footer` | 操作区 |

## 样式说明

| 项 | 实现 |
| --- | --- |
| 背景 | `--ud-color-bg-white`（规范 float） |
| 描边 | `--ud-color-border-card` |
| 投影 | `--ud-shadow-down-s4` |
| 圆角 | `--ud-radius-s`（图上约 6.5px ÷ 2 量到，用 6px） |
| 显隐动效 | 暂无（Teleport 下 Transition 曾卡在透明节点；规范未写时长） |
