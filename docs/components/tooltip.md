---
title: Tooltip
description: 鼠标悬停时出现的轻量文字提示，用来解释操作或补充信息。
---

# Tooltip 文字提示

文字提示是一种文本标签，鼠标悬停在目标上时出现，用来提供轻量解释。

## 使用规则

- 解释按钮、图标等元素的含义时使用。
- 鼠标悬停出现，移出消失。

## 组成要素

1. **文本**：解释触发组件的含义或状态，尽量简短易懂。
2. **容器背景**：承载文本的深色底。
3. **投影**：建立空间层级，使用 Shadow/S4/down（`--ud-shadow-down-s4`）。
4. **触发区域**：通常是按钮或图标。

## 基础用法

鼠标悬停在触发区域上 **100ms** 后出现；移出后延迟 **100ms** 消失。气泡本身也是触发区，移入气泡时不会关掉。

:::demo tooltip/basic 悬停按钮出现提示
:::

## 用于解释操作

配图区分两类图标：

- **IconButton**：图标是按钮时，悬停跟随按钮的 hover 态。
- **Post script**：图标只是展示性补充说明时，悬停不变色，只出提示。

:::demo tooltip/icon IconButton 与补充说明图标
:::

## 用于展示更多信息

也可挂在按钮、头像、标签上，展示日期、姓名、状态等补充信息。

:::demo tooltip/more-info 按钮、头像与标签
:::

## 尺寸

规范写明：

| 项 | 值 |
| --- | --- |
| 字号 | 12px Regular |
| 左右内边距 | 12px |
| 上下内边距 | 8px |
| 箭头 | 宽 12px、高 6px |
| 箭头到触发区 | 4px |
| 最大宽度 | 320px（日历详情、弹窗详情等极端场景可到 400px） |

尺寸图是 2 倍导出。12 / 8 / 6 / 4 都是图上的红色标注。气泡底色取样为 `#1F2329`（`--ud-color-bg-inverse`），白字；圆角图上被标注挡住，实现用 `--ud-radius-s`（6px）。行高按气泡内容区高度估成 **12px**（与字号相同），不是 caption 的 20px 行高。

:::demo tooltip/size 尺寸示意（悬停浅蓝方块）
:::

长文案在 320px 内换行，高度随内容增高。

:::demo tooltip/long 长文案换行
:::

## 位置

位置图给出了 12 个方位，用 `placement` 指定。默认 `top`。首选侧放不下时翻到对侧，对齐后缀保留（例如 `topLeft` → `bottomLeft`）。

| 上 | 下 | 左 | 右 |
| --- | --- | --- | --- |
| `topLeft` / `top` / `topRight` | `bottomLeft` / `bottom` / `bottomRight` | `leftTop` / `left` / `leftBottom` | `rightTop` / `right` / `rightBottom` |

- 箭头指向触发区中心；气泡贴边时箭头仍留在圆角内侧。
- 气泡与视口边缘至少留 8px（实现里的安全边距）。

:::demo tooltip/placement 十二个方位（悬停浅蓝方块）
:::

## 仅溢出时显示

`onlyOverflow` 为 true 时，只有触发内容被截断（出现省略号）才弹出。Tabs 截断标题就是这种用法。

:::demo tooltip/overflow 截断才出现
:::

## API

### Tooltip

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `content` | 提示文案 | `string` | 必填 |
| `placement` | 弹出位置，见上方十二方位 | `TooltipPlacement` | `top` |
| `onlyOverflow` | 仅在内容溢出时显示 | `boolean` | `false` |

| 插槽 | 说明 |
| --- | --- |
| 默认 | 触发区域 |

## 样式说明

| 项 | 实现 |
| --- | --- |
| 背景 | `--ud-color-bg-inverse` |
| 文字 | `--ud-color-text-on-inverse` |
| 投影 | `--ud-shadow-down-s4` |
| 圆角 | `--ud-radius-s`（图上被标注挡住，属推断） |
| 显隐动效时长 | 0.15s（规范未写，属推断） |
