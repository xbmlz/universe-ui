---
title: Tabs
description: 将平级信息模块化分类，并在同一层级内快速切换。
---

# Tabs 标签页

Tabs 把平级的信息收纳进一组页签，用户在同一层级内切换查看内容。按层级分为三种：一级标签页（Tab-line）、次级标签页（Tab-capsule）与卡片标签页（Tab-card）。

## 使用规则

- 需要对平级区域做收纳和展现，或在同一层次结构的内容组之间导航时使用。
- 同一页面建议只使用**一组**一级页签；必要时用 `large` 保持它高于 `medium`。一级页签的层级应始终高于二级页签，二级页签可以有多组。
- 页签文案要精简准确，能直接表达该页的内容；必要时可带图标或徽标。
- 一级页签默认带 3px 选中态指示器；配合分割线使用时，指示器下沿与分割线重合。
- 标签过多时优先滚动或收进「更多」，不要无限制地拉长标题（见「超长处理」）。

:::demo tabs/hierarchy 一级与次级页签的层级组合
:::

## 组成要素

1. **容器背景**：承载整组页签的背景。卡片标签页的内容面板由业务侧提供，组件只画页签行。
2. **标签页标题**：精简准确的文案，必要时附带图标，需明确区分选中态与未选中态。
3. **选中态指示器（可选）**：高亮当前页签，一级页签为 3px 品牌色下划线，宽度等于标题宽度，**不含徽标**。
4. **分割线（可选）**：区分页签与下方内容。
5. **徽标（可选）**：有新内容、未读、协同或数量变化且无需展开说明时，用点状或数字徽标提示。徽标位于标题右上角，**不占页签宽度**。
6. **翻页按钮（可选）**：空间不足时左右翻页。
7. **新增 & 关闭按钮（可选）**：卡片标签页用于增删页签。

## 一级标签页（Tab-line）

默认的线条式页签，建议同一页面只用一组。

:::demo tabs/basic 基础用法
:::

### 状态

状态配图是同一行里的四个「Tab」，从左到右为 Normal、Selected、Disable、Hover。图上把禁用写成 Disable，正文用的是 Disabled。

| 状态 | 文字 | 指示器 |
| --- | --- | --- |
| Normal | N900 Regular | 无 |
| Selected | B500 Medium | 3px 品牌色，宽等于标题 |
| Disable | N400 | 无，且不响应点击与键盘 |
| Hover | B500 | 无（只有选中项有指示器） |

选中态字重变粗，但组件用一个隐藏的 Medium 字重副本占位，切换时**页签宽度不会跳动**。

:::demo tabs/states 四种状态，顺序与配图一致
:::

### 尺寸

按标题字号分三档，配图为 2 倍图，下列数值已折算为 CSS px：

| 项 | Large | Medium | Small |
| --- | --- | --- | --- |
| 字号 | 16px | 14px | 12px |
| 标题之间的间距 | 28px | 28px | 28px |
| 文字行盒底 → 指示器底 | 12px | 12px | 8px |
| 指示器 | 3px 高，上圆角约 1.5px | 同左 | 同左 |

这张尺寸图是 2 倍导出。12 / 12 / 8 和 28 是图上的红色标注；指示器高度 3px 是标注旁边的蓝条量出来的（6px ÷ 2）。指示器宽度等于标题，图上没有单独标宽度。间距可调，满足 4N 原则即可。

:::demo tabs/sizes 三档尺寸
:::

### 热区

热区从**标题上侧到指示器下侧**，宽度与标题文案同宽；标签之间的间距不在热区内。这张热区图是 1 倍导出，色块量到宽 28px、高 47px。组件把标题作为按钮的唯一内容，横向不加内边距，因此点击区与指示器同宽。

### 分割线

开启 `divider` 后，指示器下沿正好压在分割线上，两者重合；分割线取 `--ud-color-divider`（配图取样 #DDDEDF）。分割线只在 `variant="line"` 下生效。

:::demo tabs/divider 分割线与指示器重合
:::

### 徽标

配图有两行，标题都是「Tab」。第一行是数字胶囊：选中项为 9，后面两项为 99，再往后没有徽标，行尾 More 上是一颗点。第二行是点，钉在第 1、2、3 个和第 6 个标题的右上角。两种徽标都脱离文档流，所以**不占页签宽度，指示器也不会延伸到徽标下方**。数字胶囊高 14px，颜色是 #F54A45（`--ud-color-danger`）。示例按这个位置把徽标画在标题上；行尾 More 上的点还没接到溢出入口上。

`badge` 传 `true`（可简写为 `badge`）画点，传数字或字符串画计数胶囊；`0` 会显示为「0」，不会被当成关闭。

:::demo tabs/badge 数字徽标与点状徽标
:::

### 限定最大宽度

这两张配图都是**卡片页签**，不是线条页签。默认把单个标题限在 **240px**（`labelMaxWidth`），超出用省略号，悬停后用 Tooltip 显示全文。不限制最大宽度时标题会完整撑开整行，配图标为**避免**。

:::demo tabs/max-width 最大宽度与省略号
:::

### 超长处理

标签总宽超出容器时有两种策略，都由 `overflow` 控制：

- **`more`（默认）**：放不下的标签收进右侧 **More** 入口（文案 + 上下箭头，悬停/展开变蓝）。设计稿还描述了「页签替换」——从菜单里选中末尾标签时，把它临时替换到可见行末尾；点其它标签后列表恢复初始顺序。组件已实现这一行为。
- **`scroll`**：左右两端各一个翻页箭头，页签夹在中间；点击整页翻动，也支持横向滑动。设计稿把这种形式用于 Tab-line。

:::demo tabs/overflow-more 更多与页签替换
:::

:::demo tabs/overflow-scroll 翻页按钮
:::

`overflow="none"` 关闭任何溢出处理，适用于数量可控的场景。

## 次级标签页（Tab-capsule）

用于较小的内容区域，同一页面可以有多组，也能和一级页签配合使用。

### 状态

| 状态 | 文字 | 背景 |
| --- | --- | --- |
| Selected | B500 Regular | B100（配图取样 #D6E2FF） |
| Normal | N900 Regular | N900 10%（#E9E9EA） |
| Hover | B500 Regular | N900 10% |
| Disabled | N500 Regular | N900 10% |

### 尺寸

| 项 | Medium | Small |
| --- | --- | --- |
| 字号 | 14px | 12px |
| 高度 | 28px | 24px |
| 标签间距 | 12px | 8px |
| 最小宽度 | 48px | 48px |
| 左右内边距 | 8px | 8px |
| 圆角 | 6px | 6px |

宽度跟随文案自适应，小于 48px 时取最小宽度。尺寸图是 1 倍导出：图上标注间距 12px / 8px、最小宽度 48px；胶囊外框量到高 28px / 24px，圆角用 `--ud-radius-s`（6px）。图上的「Media」是中尺寸。胶囊没有 large，传 `size="lg"` 会按 medium 渲染。

:::demo tabs/capsule 次级标签页的状态与尺寸
:::

## 卡片标签页（Tab-card）

用于可添加、可关闭页签的场景。配图里选中页签是一个**与内容面板连成一体**的文件夹形状（上方两角圆角、下沿无边框），未选中页签之间用 1px 竖线分隔，每个页签带关闭按钮，末尾有新增按钮。

- 页签新增：点击 `+` 触发 `add`，由业务侧追加数据；数据多时可配合翻页。
- 页签删除：删除当前项后默认选中上一个可用项（组件内部处理），业务侧在 `close` 里移除数据。
- 隐藏删除：不传 `closable` 即可，设计稿称 `false-close`。
- 内容面板不属于组件：给面板加上边框、`border-top: 0` 和与选中页签相同的白底，即可接成一体（示例里有完整写法）。

:::demo tabs/card 新增与关闭
:::

## 交互与无障碍

- 页签是原生 `button[role="tab"]`，采用 roving tabindex：只有选中项（或未选中时的第一项）可 Tab 聚焦。
- `←` / `→` 在可用页签间循环，`Home` / `End` 跳到首尾；禁用项和被隐藏的项会被跳过。
- `Enter` / `Space` 由原生按钮触发选中。
- 焦点环沿用 `--ud-color-focus-ring`（取自 Button，设计规范未单独给出，属推断）。

## API

### Tabs

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前选中项的值 | `string \| number \| null` | `null` |
| `variant` | 页签类型：`line` / `capsule` / `card` | `TabsVariant` | `line` |
| `size` | 尺寸：`lg` / `md` / `sm`；胶囊无 `lg` | `TabsSize` | `md` |
| `divider` | 显示分割线，仅 `line` 生效 | `boolean` | `false` |
| `overflow` | 溢出策略：`more` / `scroll` / `none` | `TabsOverflow` | `more` |
| `addable` | 显示卡片页签的新增按钮 | `boolean` | `false` |
| `labelMaxWidth` | 单个标题的最大宽度（px） | `number` | `240` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 选中项变化 | `TabValue \| null` |
| `add` | 点击新增按钮 | — |

| 插槽 | 说明 |
| --- | --- |
| 默认 | 一组 `Tab` |

### Tab

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 页签唯一值 | `string \| number` | 必填 |
| `disabled` | 禁用 | `boolean` | `false` |
| `badge` | `true` 画点；数字/字符串画计数徽标 | `boolean \| string \| number` | `false` |
| `closable` | 显示关闭按钮（卡片页签） | `boolean` | `false` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `close` | 点击关闭按钮；组件已把选中项移到上一个可用页签 | — |

| 插槽 | 说明 |
| --- | --- |
| 默认 | 页签标题 |

## 样式变量

全部定义在组件根节点，可按场景覆盖：

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `--ud-tabs-font-size` | 标题字号 | `--ud-font-size-body` |
| `--ud-tabs-line-height` | 标题行高 | `--ud-line-body` |
| `--ud-tabs-gap` | 页签间距（线条 28 / 胶囊 12·8 / 卡片 0） | `28px` |
| `--ud-tabs-bottom` | 文字行盒底到指示器底 | `12px`（sm 为 8px） |
| `--ud-tabs-indicator-height` | 指示器高度 | `3px` |
| `--ud-tabs-indicator-radius` | 指示器上圆角 | `1.5px` |
| `--ud-tabs-color` | 常态文字 | `--ud-color-text` |
| `--ud-tabs-color-active` | 选中 / 悬停文字与指示器 | `--ud-color-brand` |
| `--ud-tabs-color-disabled` | 禁用文字 | `--ud-color-text-disabled` |
| `--ud-tabs-divider` | 分割线 | `--ud-color-divider` |
| `--ud-tabs-height` | 胶囊高度 | `28px`（sm 24px） |
| `--ud-tabs-padding-inline` | 胶囊左右内边距 | `8px` |
| `--ud-tabs-bg` | 胶囊常态背景 | `--ud-color-text-a10` |
| `--ud-tabs-bg-active` | 胶囊选中背景 | `--ud-color-brand-subtle-strong` |
| `--ud-tabs-label-max` | 由 `labelMaxWidth` 写入 | `240px` |

> **配色说明**：配图里的品牌蓝取样为 #3370FF（飞书原色板的 B500），而 `design/design-language/color.md` 明确规定本项目品牌色为 #1456F0。组件统一走 `--ud-color-brand`，不为单个组件另设一套蓝；这条差异已记入 `TODO.md` 待设计确认。胶囊选中背景 #D6E2FF 与 `--ud-color-brand-subtle-strong`（#D8E2FC）相差 ≤3/255，视为同档。
