---
title: Select
description: 从选项列表中选择一个或多个值的控件。
---

# Select 选择器

Select 用于从一组选项中取值。单选返回 `string`，多选返回 `string[]`，未选择时为 `null`。

## 控件类型

### 类型总览

| 类型 | 说明 |
| --- | --- |
| 基础选择 | 单选、多选、清除、搜索和状态 |
| 复杂内容选择 | 选项带说明、头像、标签等复合内容 |
| 差异化选择框 | 下划线或无边界触发器 |

### 基础选择

#### 使用场景

单选点击选项后立即同步结果；多选保留多个值，`maxTagCount` 折叠多余的已选标签。

:::demo select/basic 单选
:::
:::demo select/multiple 多选
:::

#### 状态与交互说明

菜单展开后默认激活第一个选项，支持 `enter` 键选中和方向键切换。`disabled`、`readonly`、`error`、`loading` 以及空列表状态由组件统一处理。

:::demo select/state 状态与交互
:::

##### 清除（可选）

选择完成后，鼠标 hover 到选择框时出现清除按钮，可快速清除全部内容。

:::demo select/clear 清除
:::

##### 搜索（可选）

`filterable` 让触发器变成搜索框，按选项文本过滤。

:::demo select/filterable 搜索
:::

##### 选项详情（可选）

通过 `suffix` 插槽在触发器右侧提供说明图标或信息入口。

:::demo select/detail 选项详情
:::

##### 扩展菜单（可选）

通过 `menu-footer` 插槽在菜单底部提供新建或扩展操作。

:::demo select/create 扩展菜单
:::

#### 通用样式规则

##### 样式与尺寸说明

选择框提供 `sm`、`md`、`lg` 三种尺寸；建议宽度 240px–600px。

:::demo select/size 尺寸
:::

##### 位置说明

下拉菜单优先向下弹出并与选择框左对齐；底部空间不足时向上弹出。

### 复杂内容选择

选项可以通过 `option` 插槽渲染说明、头像、标签等复合内容，并通过 `optionLines` 控制单行或两行。

:::demo select/complex 复杂内容选择
:::

### 差异化选择框

下划线选择框用于分割线列表或表格场景；无边界选择框用于筛选、排序和主题切换。

:::demo select/variants 下划线与无边界选择框
:::

## API

### Select Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 选中值；多选时为数组 | `string \| string[] \| null` | `null` |
| `options` | 选项列表 | `SelectOption[]` | - |
| `size` | 尺寸 | `sm \| md \| lg` | `md` |
| `multiple` | 是否多选 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readonly` | 是否只读 | `boolean` | `false` |
| `error` | 是否显示错误状态 | `boolean` | `false` |
| `required` | 是否显示必填标记 | `boolean` | `false` |
| `clearable` | 是否显示清除按钮 | `boolean` | `false` |
| `filterable` | 是否可搜索 | `boolean` | `false` |
| `loading` | 是否显示加载状态 | `boolean` | `false` |
| `maxTagCount` | 多选时最多直接显示的标签数 | `number` | - |
| `label` | 字段标签 | `string` | - |
| `placeholder` | 占位文本 | `string` | `'请选择'` |
| `message` | 辅助或错误文案 | `string` | - |
| `emptyText` | 无选项时的文案 | `string` | `'无选项'` |
| `noResultText` | 搜索无结果时的文案 | `string` | `'无搜索结果'` |
| `optionLines` | 选项行数 | `1 \| 2` | `1` |
| `variant` | 选择框样式 | `default \| underline \| borderless` | `default` |

### Select Slots

| 名称 | 说明 |
| --- | --- |
| `suffix` | 触发器尾部内容，位于清除按钮和箭头之前 |
| `option` | 自定义选项内容，插槽参数为 `option`、`selected` |
| `menu-footer` | 下拉菜单底部内容 |

### Select Exposes

| 名称 | 说明 |
| --- | --- |
| `focus` | 让选择器获得焦点 |

### 类型

```ts
interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}
```
