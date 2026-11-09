---
title: Switch
description: 在两个互斥状态之间切换的开关。
---

# Switch 开关

Switch 用于立即生效的布尔状态切换，例如开启通知或启用某项配置。需要随表单提交时，优先考虑 Checkbox。

## 控件状态

开关最终展示开启、关闭两种状态；用于立即生效的布尔状态切换。

:::demo switch/basic 开启与关闭
:::

## 样式规则说明

### 尺寸规则

大尺寸用于空间较大的位置，与标题或主副标题搭配；小尺寸用于空间较小、与一句话搭配的场景；不建议用大小表达父子级关系。

:::demo switch/sizes 大尺寸与小尺寸
:::

### 状态说明

开关为开、关两种状态，每种状态都有 normal、disabled、loading。

:::demo switch/disabled 禁用状态
:::

:::demo switch/loading 加载状态
:::

### 使用场景示例

根据实际场景选择大尺寸或小尺寸；开关跟随的文案应为静态肯定句。

:::demo switch/usage 设置场景
:::

## 使用示例（正反案例）

纯开关场景操作后立即生效，不需要再搭配保存按钮；表单中的开关操作后应对其他字段产生实时影响。

## API

### Switch Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 开关状态 | `boolean` | `false` |
| `size` | 尺寸 | `sm \| md` | `md` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `loading` | 是否显示加载状态 | `boolean` | `false` |
