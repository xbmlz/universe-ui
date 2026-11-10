---
title: Timeline
description: 按时间顺序垂直展示一系列事件，适合追溯与操作记录。
---

# Timeline 时间轴

时间轴用于对一系列信息做时间排序并垂直展示。阶段完成的具体时间点是重要元素。

## 何时使用

| 组件 | 使用目的 | 节点数量 | 语言风格 |
| --- | --- | --- | --- |
| **时间轴 Timeline** | 事件追溯；阶段完成时间点是重要元素 | 希望记录详细清晰 | 陈述句，字数多。如「订单已提交」「商品出库」 |
| **步骤条 Steps** | 填表场景，明确步骤、降低负担 | 节点尽量少 | 祈使句，字数少。如「选择收货地址」 |

可按场景选择正序或倒序（由调用方控制子项顺序）。

## 组成要素

1. **连接线**：串联节点
2. **节点标签**：圆点标签，或可自定义的图标标签
3. **节点标题（可选）**：短语，中文建议 2–7 字，不建议换行
4. **节点时间（可选）**：完成时间戳，组合可自行配置
5. **节点辅助信息（可选）**：陈述句，可含文字链、可点击人员等

## 控件类型

### 按结构

内容可在轴线右侧（默认）、左侧，或左右交替（`direction="alternate"`）。

:::demo timeline/basic 右侧连续流程
:::

:::demo timeline/direction 左侧结构
:::

:::demo timeline/alternate 左右交替
:::

### 按属性

- **连续时间轴**：有预设节点、个数可控（如资产履历）。用 `finish` / `process` / `wait` 表示进度。
- **断点时间轴**：无预设节点、可无限追加（如操作记录）。节点多为已发生事件。

:::demo timeline/breakpoint 断点 / 操作记录
:::

### 含校验节点

校验结果用 `success` / `warning` / `error` / `failed`。`failed` 表示流程可能终止，连接线不再向下延伸。

:::demo timeline/validate 成功、警示、出错与失败
:::

## 节点状态

### 无需校验

| 状态 | `status` | 说明 |
| --- | --- | --- |
| 已完成 | `finish` | 完成节点 |
| 当前 | `process` | 进行中 |
| 未到达 | `wait`（默认） | 之后的流程节点 |
| 加载中 | `loading` | 节点信息加载中 |

:::demo timeline/states 完成 / 进行 / 加载 / 未到达
:::

### 校验节点

| 状态 | `status` | 说明 |
| --- | --- | --- |
| 成功 | `success` | 完成且校验通过 |
| 警示 / 出错 | `warning` / `error` | 有异常，但不阻断后续 |
| 失败 | `failed` | 校验失败；连接线截断 |

### 自定义节点

`icon` 插槽可替换节点图形。

:::demo timeline/custom 自定义图标
:::

## 尺寸与间距

宽度随场景自适应。节点上下间距遵循 4N：`compact` **16px**、`normal` **24px**（默认）、`loose` **32px**。

:::demo timeline/spacing 紧凑 / 普通 / 宽松
:::

## 折叠

可用 `collapse-tail` 折叠末端若干节点。交互图三种状态的文案是：

| 状态 | 文案（规范英文） | 默认中文 |
| --- | --- | --- |
| Normal | N nodes are collected + ↓ | 已收起 N 个节点 + ↓ |
| Hover | 同 Normal，仅变品牌色 | 同左 |
| Loading | It is unfolding. + spinner | 正在展开 + spinner |

Loading 用 `collapse-loading` 由宿主控制异步展开。

:::demo timeline/collapse 折叠、悬停与 loading
:::

## API

### Timeline Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `direction` | 内容相对轴线的位置；`alternate` 为左右交替 | `right \| left \| alternate` | `right` |
| `spacing` | 相邻节点间距 | `compact \| normal \| loose` | `normal` |
| `collapseTail` | 折叠末端节点个数；为 0 时不折叠 | `number` | `0` |
| `expandText` | 自定义展开文案前缀；不传时为「已收起 N 个节点」 | `string` | - |
| `collapseText` | 收起按钮文案 | `string` | `收起` |
| `loadingText` | 展开 loading 文案（规范：It is unfolding.） | `string` | `正在展开` |
| `collapseLoading` | 展开过程 loading；为 true 时显示 spinner 且暂不展开节点 | `boolean` | `false` |

### Timeline Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `expand` | 点击展开触发器；可在回调里把 `collapseLoading` 设为 true 做异步 | - |
| `collapse` | 点击收起 | - |

### Timeline Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 子级 `TimelineItem` |

### TimelineItem Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 节点标题 | `string` | - |
| `time` | 节点时间 | `string` | - |
| `status` | 节点状态 | `wait \| process \| finish \| success \| warning \| error \| failed \| loading` | `wait` |

### TimelineItem Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 辅助信息 |
| `title` | 自定义标题 |
| `time` | 自定义时间 |
| `icon` | 自定义节点图标 |
