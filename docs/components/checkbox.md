---
title: Checkbox
description: 在一组独立选项中选择任意多个的控件。
---

# Checkbox 多选框

Checkbox 用于选择一个或多个互相独立的选项。与 CheckboxGroup 一起使用时，组内选项共享一个数组值。

## 控件类型

### 使用场景

复选框用于在一组选项中选择一项或多项；单独使用时表示两种状态切换。选项较多时使用父级复选框全选。

:::demo checkbox/basic 单独使用
:::

:::demo checkbox/group 多选框组
:::

### 状态说明

复选框有未选中、已选中、部分选中三个状态；部分选中适用于父级复选框，表示子集中有部分已选和部分未选。

:::demo checkbox/indeterminate 三种状态
:::

:::demo checkbox/parent 父级复选框与半选
:::

:::demo checkbox/disabled 禁用与错误
:::

### 点击区域

复选框及描述内容整体可点击，热区最小高度 22px；独立使用时热区为 16×16px。

### 尺寸说明

复选框固定为 16×16px，描述文字为 14px；复选框与文字间距建议 8px。选项竖排间距 8px，横排间距 24px。

### 位置说明

建议使用竖排；选项文本过短或空间较小时可横排。多行描述支持首行对齐和整体居中对齐。

:::demo checkbox/align 首行对齐与整体居中
:::

## API

### Checkbox Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 独立使用时的选中状态 | `boolean` | `false` |
| `value` | 在 `CheckboxGroup` 中的值 | `string \| number` | - |
| `indeterminate` | 是否显示半选状态 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `error` | 是否显示错误状态 | `boolean` | `false` |
| `align` | 与文本的对齐方式 | `first \| center` | `first` |

### Checkbox Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 复选框文案 |

### CheckboxGroup Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 选中值数组 | `(string \| number)[]` | `[]` |
| `disabled` | 是否禁用组内所有选项 | `boolean` | `false` |
| `direction` | 排列方向 | `vertical \| horizontal` | `vertical` |

### CheckboxGroup Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 组内的 `Checkbox` 列表 |
