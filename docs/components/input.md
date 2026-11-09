---
title: Input
description: 文本输入框及其尺寸、状态、附加内容和复合输入。
---

# Input 输入框

Input 家族包含基础文本输入、多行输入、数字输入、验证码输入，以及用于组合多个控件的输入组。

## 组件类型

### 类型总览

| 类型 | 说明 |
| --- | --- |
| 基础输入框 | 单一文本录入，支持状态、清除、密码和无边界形态 |
| 数字输入框 | 仅录入有明确范围的数值 |
| 带图标输入框 | 用前缀图标说明输入类型，或用尾部图标提供控制 |
| 带属性输入框 | 固定或可切换的前缀/后缀，适合单位和语言属性 |
| 组合输入框 | 多个强关联输入或单字符结构 |
| 长文本输入框 | 多行文本、字符计数和截断 |

### 基础输入框

#### 使用场景

最常用的文本输入框，仅支持基本的信息录入，没有附加功能。

:::demo input/basic 基础输入框
:::

#### 状态说明

输入框有 Normal、Hover、Activated、Inputting、Input complete、Disabled、Error 七个状态。`disabled` 禁止输入，`readonly` 只读，`error` 与 `message` 展示校验失败，`clearable` 在有内容时显示清除按钮。

:::demo input/state 输入框状态
:::

#### 差异化样式规则 - 无边界输入框

作为输入能力嵌入组件时使用；容器无描边、无底色。

:::demo input/borderless 无边界输入框
:::

#### 差异化样式规则 - 密码输入框

`type="password"` 隐藏输入内容，并保留清除操作。

:::demo input/password 密码输入框
:::

#### 尺寸说明

输入框高度为 28px、32px、40px，对应 `sm`、`md`、`lg`。建议最小宽度 240px，最大宽度 600px。

:::demo input/size 输入框尺寸
:::

### 数字输入框

仅录入数字且有明确范围时使用。`InputNumber` 支持 `min`、`max`、`step`、`disabled`、`readonly` 和错误状态。

:::demo input/number 数字输入框
:::

### 带图标输入框

前缀图标用于说明输入类型，尾部图标用于提供操作。图标与文字间距为 8px，图标距输入框边缘为 12px。

:::demo input/icon 带图标输入框
:::

### 带属性输入框

固定或可切换的前缀/后缀用于展示单位和属性。

:::demo input/addon 固定与可切换属性
:::

#### 差异化样式规则 - 标签输入框

同一标题下输入内容相同但属性不同时，使用标签展示属性。

:::demo input/tag 标签输入框
:::

### 组合输入框

不同输入框组合承载强关联内容；`InputGroup` 统一尺寸和状态。

:::demo input/group 组合输入框
:::

#### 差异化样式规则 - 单字符组合输入框

单字符组合用于验证码等有固定结构的信息，`InputChars` 支持分隔符、遮罩和粘贴。

:::demo input/chars 单字符组合输入框
:::

### 长文本输入框

`InputArea` 承载多行文本；`autosize` 随内容增高，`maxlength` 配合 `truncate` 控制字符计数。

:::demo input/textarea 长文本输入框
:::

## API

### Input Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 输入内容 | `string` | `''` |
| `type` | 输入类型，`password` 隐藏输入内容 | `text \| password` | `text` |
| `size` | 输入框尺寸 | `sm \| md \| lg` | `md` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readonly` | 是否只读 | `boolean` | `false` |
| `error` | 是否显示错误状态 | `boolean` | `false` |
| `required` | 是否在标签前显示必填标记 | `boolean` | `false` |
| `borderless` | 是否去掉边框 | `boolean` | `false` |
| `clearable` | 是否显示清除按钮 | `boolean` | `false` |
| `label` | 字段标签 | `string` | - |
| `placeholder` | 占位文本 | `string` | - |
| `message` | 字段下方的辅助或错误文案 | `string` | - |

### Input Slots

| 名称 | 说明 |
| --- | --- |
| `prefix` | 输入框内部的左侧内容 |
| `suffix` | 输入框内部的右侧内容 |
| `addon-before` | 输入框左侧的附加区域 |
| `addon-after` | 输入框右侧的附加区域 |
| `tag` | 输入框内叠加的标签内容 |

### Input Exposes

| 名称 | 说明 |
| --- | --- |
| `focus` | 让输入框获得焦点 |

### InputArea Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 输入内容 | `string` | `''` |
| `size` | 尺寸 | `sm \| md \| lg` | `md` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readonly` | 是否只读 | `boolean` | `false` |
| `error` | 是否显示错误状态 | `boolean` | `false` |
| `required` | 是否显示必填标记 | `boolean` | `false` |
| `autosize` | 是否随内容自动增高 | `boolean` | `false` |
| `truncate` | 超过 `maxlength` 时是否截断 | `boolean` | `false` |
| `maxlength` | 最大字符数 | `number` | - |
| `label` | 字段标签 | `string` | - |
| `placeholder` | 占位文本 | `string` | - |
| `message` | 辅助或错误文案 | `string` | - |

### InputNumber Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 数字值 | `number \| null` | `null` |
| `size` | 尺寸 | `sm \| md \| lg` | `md` |
| `min` | 最小值 | `number` | - |
| `max` | 最大值 | `number` | - |
| `step` | 步长 | `number` | `1` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readonly` | 是否只读 | `boolean` | `false` |
| `error` | 是否显示错误状态 | `boolean` | `false` |
| `required` | 是否显示必填标记 | `boolean` | `false` |
| `label` | 字段标签 | `string` | - |
| `placeholder` | 占位文本 | `string` | - |
| `message` | 辅助或错误文案 | `string` | - |

### InputChars Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 输入内容 | `string` | `''` |
| `length` | 单元格数量 | `number` | `6` |
| `size` | 尺寸 | `sm \| md \| lg` | `md` |
| `separatorAfter` | 在第几个单元格后插入分隔符 | `number[]` | - |
| `mask` | 是否遮罩输入内容 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `error` | 是否显示错误状态 | `boolean` | `false` |
| `fill` | 是否使用填充样式 | `boolean` | `false` |
| `label` | 字段标签 | `string` | - |
| `message` | 辅助或错误文案 | `string` | - |

### InputChars Exposes

| 名称 | 说明 |
| --- | --- |
| `focus` | 聚焦到当前光标单元格 |
| `clear` | 清空输入并聚焦第一个单元格 |

### InputAddon Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前选项值 | `string` | - |
| `options` | 可选项列表 | `InputAddonOption[]` | - |

### InputGroup Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 组内控件尺寸 | `sm \| md \| lg` | `md` |
| `disabled` | 是否禁用组内控件 | `boolean` | `false` |
| `readonly` | 是否只读 | `boolean` | `false` |
| `error` | 是否显示错误状态 | `boolean` | `false` |
| `required` | 是否显示必填标记 | `boolean` | `false` |
| `label` | 字段标签 | `string` | - |
| `message` | 辅助或错误文案 | `string` | - |

### 类型

```ts
interface InputAddonOption {
  value: string
  label: string
}
```
