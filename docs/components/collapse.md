---
title: Collapse
description: 折叠或展开相关内容，节省可视面积。
---

# Collapse 折叠面板

折叠面板用于折叠或展开相关内容。信息区域有限、且部分内容可隐藏时，可用它收纳内容。

## 使用规则

- **优点**：渐进展开，让用户先看关键信息，同时节省页面面积。
- **缺点**：增加交互成本，隐藏内容容易被忽略。
- **建议**：表单、信息详情等空间有限或内容复杂的场景。

## 组成要素

1. **标题信息**
2. **折叠状态**：箭头表示展开 / 折叠
3. **展开面板**
4. **分割线（可选）**
5. **背景（可选）**

## 线性箭头

箭头在容器右侧，尺寸建议 **16×16**，颜色 N600（`--ud-color-icon-secondary`）。向上表示展开，向下表示折叠。标题行高度量到约 **48px**，左右内边距约 **16px**。下面示例用 **图标热区**：只有箭头可点，悬停箭头出现 N900*10% 底。

:::demo collapse/basic 默认可同时展开多项（图标热区）
:::

## 面性箭头

箭头在标题左侧，默认间距 **8px**，尺寸建议 **10×10**。向下表示展开，向右表示折叠。展开内容与**标题**左对齐（不是与箭头对齐）。表格、表单、列表等较复杂场景建议用面性箭头。同样是图标热区。

:::demo collapse/caret 左侧面性箭头（图标热区）
:::

## 手风琴

默认可以同时展开多个面板。需要聚焦单一详情时用 `accordion`，同时只展开一项。

:::demo collapse/accordion 手风琴
:::

## 分割线与背景

按场景可加分割线（1px，`--ud-color-divider`）和标题背景（N100 / `--ud-color-bg-2`）。

:::demo collapse/style 基础 / 分割线 / 分割线+背景
:::

## 状态

支持加载中、禁用、折叠、展开。加载中与禁用时不可切换。

:::demo collapse/states 加载、禁用与展开
:::

## 热区

交互图给出三种热区。父级 `hitArea` 设默认，单项可覆盖。

| 热区 | 说明 |
| --- | --- |
| `row`（默认） | 整行可点。无背景时仅变手指；`filled` 时 Hover N900*10% / Pressed N900*20%。`nested` 时用嵌套表 wash：Hover N900*8%，`selected` 为 B500*8%。 |
| `icon` | 仅箭头可点，图标按钮 Hover N900*10% / Pressed N900*20%。 |
| `area` | 箭头+标题组成的紧凑热区，宽度随内容，尺寸可再靠样式自定义。 |

:::demo collapse/hit-area 图标 / 整行 / 嵌套表 / 区域
:::

## 文本展开 / 收起

大段落文本可用 `mode="text"`。折叠行数用 `lines`（规范建议 3 或 5）。触发文案默认「展开 / 收起」；折叠时触发项可在左下或右下（`text-placement`）；展开后「收起」单独一行，与文本间距 **4px**。不需要收起时设 `allow-collapse={false}`。

:::demo collapse/text 左下与右下触发
:::

## API

### Collapse

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前展开项的 `name` 列表 | `CollapseName[]` | `[]` |
| `arrow` | `line` 线性（右）/ `filled` 面性（左） | `CollapseArrow` | `line` |
| `accordion` | 手风琴，只展开一项 | `boolean` | `false` |
| `bordered` | 标题行底部分割线 | `boolean` | `false` |
| `filled` | 标题行 N100 背景 | `boolean` | `false` |
| `hitArea` | 热区：`row` / `icon` / `area` | `CollapseHitArea` | `row` |
| `nested` | 嵌套表 wash（row 热区下的 a8 / select） | `boolean` | `false` |

| 插槽 | 说明 |
| --- | --- |
| 默认 | `CollapseItem` 列表 |

### CollapseItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 唯一标识（必填） | `string \| number` | — |
| `title` | 标题 | `string` | — |
| `disabled` | 禁用 | `boolean` | `false` |
| `loading` | 加载中 | `boolean` | `false` |
| `mode` | `panel` 面板 / `text` 段落折叠 | `CollapseItemMode` | `panel` |
| `lines` | 文本模式折叠行数 | `number` | `3` |
| `textPlacement` | 文本模式触发位置 | `left \| right` | `left` |
| `allowCollapse` | 文本模式展开后是否保留「收起」 | `boolean` | `true` |
| `hitArea` | 覆盖父级热区 | `CollapseHitArea` | — |
| `selected` | 嵌套表选中底（B500*8%） | `boolean` | `false` |

| 插槽 | 说明 |
| --- | --- |
| 默认 | 面板内容，或文本模式正文 |
| `title` | 自定义标题 |

## 样式说明

| 项 | 实现 |
| --- | --- |
| 标题行高 | 量到约 48px（线性箭头图，divider 到 divider） |
| 标题左右 padding | 量到约 16px |
| 线性箭头 | 16px，右侧 |
| 面性箭头 | 10px，左侧，与标题间距 8px |
| 内容区 padding | 16px；面性箭头时左侧 34px（16 + 10 + 8）与标题对齐 |
| 展开动效 | 0.2s（规范未写时长，属推断） |
