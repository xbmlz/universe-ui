---
title: Radio
description: 在一组互斥选项中选择一个的控件。
---

# Radio 单选框

Radio 用于从一组互斥选项中选择一个。与 RadioGroup 一起使用时，组内选项共享一个值。

## 控件类型

### 基础单选

#### 使用场景

从一组直接展开的选项中选择单个选项；选项不宜过多，建议在 6 个以内。

:::demo radio/group 单选组
:::

#### 状态说明

单选框有未选中、已选中两个状态；disabled 禁用，error 显示错误描边。

:::demo radio/disabled 禁用状态
:::

#### 点击区域

单选框及描述内容整体可点击，热区最小高度 22px；独立使用时热区为 16×16px。

#### 尺寸说明

单选框固定为 16×16px，描述文字为 14px；单选框与文字间距建议 8px。

#### 位置说明

建议使用竖排；选项文本过短或空间较小时可横排。多行描述支持首行对齐和整体居中对齐。

:::demo radio/align 首行对齐与整体居中
:::

### 按钮型单选

#### 尺寸说明

按钮型单选提供 sm、md、lg 三种尺寸。

:::demo radio/button 按钮型尺寸
:::

#### 状态说明

按钮型单选有未选中、已选中和禁用状态；选中态使用品牌色区分。

#### 使用场景

适合突出选项本身、需要强调用户选择的场景。

#### 长文本缺省规则

长文本超出按钮宽度时使用省略号，hover 后通过 Tooltip 展示完整内容，不应折行。

:::demo radio/long-text 长文本省略
:::

## API

### Radio Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 独立使用时的选中值 | `string \| number \| null` | `null` |
| `value` | 选项值 | `string \| number` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `error` | 是否显示错误状态 | `boolean` | `false` |
| `align` | 与文本的对齐方式 | `first \| center` | `first` |

### Radio Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 单选框文案 |

### RadioGroup Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 选中值 | `string \| number \| null` | `null` |
| `disabled` | 是否禁用组内所有选项 | `boolean` | `false` |
| `direction` | 排列方向 | `vertical \| horizontal` | `vertical` |
| `variant` | 样式 | `default \| button` | `default` |
| `size` | 按钮样式下的尺寸 | `sm \| md \| lg` | `md` |

### RadioGroup Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 组内的 `Radio` 列表 |
