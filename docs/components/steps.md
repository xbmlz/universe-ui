---
title: Steps
description: 引导用户按步骤完成任务的导航条。
---

# Steps 步骤条

步骤条用于引导用户按步骤完成任务。需要完成复杂任务时，可拆成有先后关系的一系列步骤；只展示流程状态、不做操作引导时，应使用 [Timeline](/components/timeline)。

## 使用规则

- 节点个数建议 **3–7**；大于 7 步应优先优化任务流程。
- 标题用祈使句，简短清晰，尽量一行，最多两行。
- 辅助说明最多两行，超出优先改文案。

## 组成要素

1. **步骤节点**：图形化展示每个节点状态
2. **标题**：步骤标题文本
3. **辅助说明（可选）**
4. **连接线**：串联节点

## 控件类型

按位置分横向 / 纵向；每类又有基础步骤条与空间有限时的简单步骤条。

### 基础步骤条

横向在内容上方，节点等宽自适应，推荐步骤间距 **24px**；纵向在内容左侧，按最大步骤等高自适应，间距用 4 的倍数。

:::demo steps/basic 横向基础
:::

:::demo steps/vertical 纵向基础
:::

:::demo steps/description 带辅助说明
:::

可根据需求自定义节点图标。

:::demo steps/custom 自定义图标
:::

### 简单步骤条

用于页面空间受限、或不需要强调步骤条时。推荐标题带数字前缀。横向为文字 + 箭头分隔；纵向为点状节点，标题首行与节点中心对齐。

:::demo steps/simple 横向文字与纵向点状
:::

## 交互

通常配合「上一步 / 下一步」。`clickable` 时节点可点：点击后，前序默认已完成，后续默认未开始；不可点时 Hover 无变化。

:::demo steps/clickable 可点击节点与步进按钮
:::

单项可用 `status` 覆盖推算状态，例如出错。

:::demo steps/error 错误状态
:::

若只需切换内容、不改变步骤状态，可搭配分页 Tab（见 Tabs）。

## 与 Timeline 对比

| | Steps | Timeline |
| --- | --- | --- |
| 用途 | 引导完成任务（如表单） | 事件追溯 |
| 节点 | 通常 3–7 | 可详细、可累计 |
| 文案 | 祈使句，字数少 | 陈述句，字数多 |

## API

### Steps Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` / `v-model` | 当前步骤索引（从 0 起） | `number` | `0` |
| `direction` | 方向 | `horizontal \| vertical` | `horizontal` |
| `variant` | 基础 / 简单 | `basic \| simple` | `basic` |
| `clickable` | 节点是否可点击切换 | `boolean` | `false` |

### Steps Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 子级 `StepsItem` |

### StepsItem Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `string` | - |
| `description` | 辅助说明 | `string` | - |
| `status` | 覆盖状态；不传时由当前索引推算 | `wait \| process \| finish \| error` | - |

### StepsItem Slots

| 名称 | 说明 |
| --- | --- |
| `icon` | 自定义节点图标 |
| `title` | 自定义标题 |
| `description` | 自定义辅助说明 |
