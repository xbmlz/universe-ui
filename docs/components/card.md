---
title: Card
description: 组织信息与操作的容器，通常也作为详细信息的入口。
---

# Card 卡片

Card 用于把同维度的信息聚合成一个容器，通过描边、背景或投影与页面分离。它既可以是纯展示的容器，也可以整块可点击，作为详情页的入口。

## 使用规则

- 需要组织信息、划分内容模块时使用，同维度信息聚合在一张卡片里更容易扫读。
- 不要滥用：卡片切分过细会让阅读效率下降，并浪费屏幕空间。
- 卡片背景与页面背景必须有足够对比度，靠背景差、描边或投影把两者分开；颜色太接近又没有投影，卡片就会与页面融为一体。
- 同一界面建议不超过 2 种圆角类型。
- 卡片内的内容、操作都可以自定义，卡片本身只负责容器、描边、圆角、投影和间距。

## 组成要素

1. **卡片容器**：承载内容的容器，尺寸由内容决定。
2. **卡片样式**：背景、圆角、描边、投影。
3. **卡片内容**：文本、图片、分割线、按钮及其它组件。

尺寸取自 `card.md` 的文字规范与状态配图。配图为 1.5 倍左右导出，下列数值按规范文字取整：

| 项 | 值 |
| --- | --- |
| 内容与容器边距 | 12 px，四边一致，可用 `padding` 覆盖 |
| 标题与内容间距 | 12 px |
| 内容模块内元素组间距 | 8–16 px，按 4N 原则取 |
| 文本与图片/操作最小间距 | 12 px |
| 标题 | 16 px Medium，N900，尽量单行 |
| 正文 | 14 px Regular，N900 |
| 辅助文本 / 副标题 | 12 px Regular，N600 |
| 圆角 | 4 / 6 / 8 / 10 px，面积越大取越大 |
| 描边 | 1 px 内描边，取 `style.md` 的 Border 2（卡片描边 #DEE0E3） |

:::demo card/basic 基础用法
:::

## 通用样式

### 背景

页面背景与卡片背景是一对：N00 页面用 N100 卡片，或反过来。两者同色时不推荐，除非再加描边或投影。

`surface` 提供 `white`（N00）与 `muted`（N100）两档。演示区本身是 N100 底色，所以大部分示例里的卡片是白色：

:::demo card/surface 页面背景与卡片背景的四种组合
:::

### 描边与投影

"无投影""小投影""大投影"三档对应 `shadow` 的 `none` / `s1`–`s2` / `s3`–`s5`。描边是一层 1 px 的内阴影，不占布局尺寸，可以和投影叠加。

`style.md` 把描边分成两层：可交互控件用 Border 1（#D0D3D6），卡片用 Border 2（#DEE0E3）。卡片描边比控件浅一档是规范里的有意设计，不是取值偏差。

:::demo card/borders 描边、投影与两者叠加
:::

### 圆角

圆角随卡片面积增大而增大，同一界面不要超过 2 种：

:::demo card/radius 圆角档位
:::

`radius` 默认 `s`（6 px）。这个默认值来自组成要素图里 226 px 方形卡片的实测圆角；状态图里 240×48 的列表卡片量到 4 px，对应新增的 `xs` 档。

## 内容说明

### 信息可配置

卡片内可以是文本、图标、图片、头像等任意组合。标题建议放在顶部，单行、完整展示；内容区交给使用方自定义：

:::demo card/media 图标 + 标题 + 辅助信息
:::

### 图片封面

`cover` 插槽铺满卡片顶部，不受 `padding` 影响；卡片本身 `overflow: hidden`，圆角会裁掉图片的直角：

:::demo card/cover 带封面的卡片
:::

### 操作可配置

操作项（文字、图标、主次按钮）放在卡片底部或右侧。底部用 `footer` 与 `actions` 两个插槽，`actions` 自动右对齐：

:::demo card/actions 底部操作区
:::

### 间距

卡片内的层级靠间距表达；卡片之间，带投影的间距 16 px，不带投影的 12 px：

:::demo card/spacing 卡片之间的间距
:::

## 状态

`card.md` 的状态表按"有无投影"分成两套：

| 状态 | 无投影卡片 | 有投影卡片 |
| --- | --- | --- |
| Normal | 描边 Border 2 | 描边 + Shadow-S-down |
| Hover | 描边变为 B500 | 描边保持，投影加深到 Shadow-M-down |
| Pressed | — | 投影加深到 Shadow-L-down |
| Selected | 描边 B500，常驻 | 描边 B500 |
| Dragging | 背景 95% 不透明 + Shadow-L-down | 同左 |

:::demo card/states 正常、悬停、选中与拖拽
:::

无投影卡片的悬停反馈用品牌色描边而不是投影，因为不加投影时几乎看不出变化。这一条对应用户在多个卡片并排时"加重选择状态"的说明，配图上标的标签就是 Selected，所以组件同时提供 `selected` 让选中态常驻。

## 交互

### 拖拽排序

`draggable` 打开原生拖拽事件，实际的重排由父级列表负责：`dragstart` / `dragend` 只把事件抛出去。拖起中的卡片用 `dragging` 标记，透明度和投影按规范变为 95% + Shadow-L-down。

下面的示例把拖拽落点放在包裹层处理，Card 只管自己的拖拽态：

:::demo card/draggable 拖拽重排
:::

## 无障碍

- `clickable` 时卡片带 `role="button"`、`tabindex="0"`，支持 `Enter` 与 `Space` 触发 `click`。
- 选中态通过 `aria-pressed` 暴露给读屏软件。
- 卡片整体可点击时，内部的按钮要阻止事件冒泡，否则会同时触发卡片点击。

## API

### Card Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 卡片标题 | `string` | - |
| `subtitle` | 标题下方的辅助信息 | `string` | - |
| `border` | 是否显示 1 px 内描边 | `boolean` | `true` |
| `shadow` | 投影档位，`none` 为无投影 | `'none' \| 's1' \| 's2' \| 's3' \| 's4' \| 's5'` | `'none'` |
| `radius` | 圆角档位 | `'xs' \| 's' \| 'm' \| 'l'` | `'s'` |
| `padding` | 内容与容器的边距，数字按 px 处理 | `number \| string` | `12` |
| `surface` | 卡片背景，`white` 为 N00，`muted` 为 N100 | `'white' \| 'muted'` | `'white'` |
| `hoverable` | 是否响应悬停与按下的投影变化 | `boolean` | `false` |
| `clickable` | 是否整块可点击，并加键盘可达性 | `boolean` | `false` |
| `selected` | 是否选中，显示 B500 描边 | `boolean` | `false` |
| `draggable` | 是否启用原生拖拽 | `boolean` | `false` |
| `dragging` | 是否处于拖拽中，应用 95% 透明与 Shadow-L-down | `boolean` | `false` |

### Card Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击卡片，仅 `clickable` 时触发 | `MouseEvent` |
| `dragstart` | 原生 `dragstart`，仅 `draggable` 时触发 | `DragEvent` |
| `dragend` | 原生 `dragend`，仅 `draggable` 时触发 | `DragEvent` |

### Card Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 卡片正文 |
| `cover` | 顶部封面，铺满宽度且不受 `padding` 影响 |
| `header` | 整个头部，会替换 `title` / `subtitle` / `extra` |
| `title` | 自定义标题 |
| `subtitle` | 自定义副标题 |
| `extra` | 头部右侧内容，如关闭按钮、更多操作 |
| `footer` | 底部左侧内容，如辅助说明 |
| `actions` | 底部右侧操作区，自动右对齐 |

### 样式变量

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `--ud-card-padding` | 内容边距，由 `padding` 覆盖 | `12px` |
| `--ud-card-gap` | 标题与内容、内容模块之间的间距 | `12px` |
| `--ud-card-radius` | 圆角，由 `radius` 覆盖 | `--ud-radius-s` |
| `--ud-card-bg` | 卡片背景，由 `surface` 覆盖 | `--ud-color-bg-white` |
| `--ud-card-border` | 描边颜色，配图取样 #DFE0E2 | `--ud-color-border-card` |
| `--ud-card-ring` | 当前描边颜色，悬停与选中时改为品牌色 | `--ud-card-border` |
| `--ud-card-shadow` | 当前投影 | `0 0 transparent` |
| `--ud-card-title-font-size` | 标题字号 | `--ud-font-size-h4` |
| `--ud-card-title-color` | 标题颜色 | `--ud-color-text` |
| `--ud-card-body-font-size` | 正文字号 | `--ud-font-size-body` |
| `--ud-card-subtitle-color` | 辅助文本颜色 | `--ud-color-text-secondary` |
