---
title: Button
description: 触发操作、提交表单或打开链接的基础按钮。
---

# Button 按钮

按钮用于触发一个操作。按钮类型表达操作的优先级：同一区域通常只保留一个主要按钮，危险操作使用危险类型，并通过文案明确操作结果。

## 按钮类型

### 基础类型

#### 基础按钮

使用 `type` 指定按钮类型。默认类型是 `secondary`。`primary` 用于页面主操作，`danger` 用于不可逆操作；`secondary-*` 是带品牌色的次要按钮，`text` 和 `link` 用于低优先级的行内操作。

:::demo button/basic 基础按钮
:::
:::demo button/type 按钮类型
:::

#### 尺寸与间距

中号（`md`）是常规表单和弹窗页脚的主要尺寸；小号和超小号用于列表行内操作。

:::demo button/size 尺寸从 xl 到 xs
:::

#### 去除底色的次要按钮

在浅灰背景上，可用 `ghost` 隐藏次要按钮的底色，同时保留描边。`ghost` 只对 `secondary` 生效。

:::demo button/ghost 去除底色的次要按钮
:::

#### 文字按钮

文字按钮默认无底色，悬停时出现背景；链接按钮的热区就是文字本身，悬停时文字变色。

:::demo button/text-link 文字按钮与链接按钮
:::

#### 链接按钮

链接按钮使用 `type="link"`，用于跳转或打开外部内容；文案应直接描述目标。

#### 图标按钮

图标可以放在文案左侧或右侧。图标按钮仅以图标触发操作，包含默认、无边框和轮廓等形态。图标含义必须明确，并应提供 `aria-label`，悬停提示通过 `Tooltip` 补充。

:::demo button/icon 按钮中的图标
:::
:::demo button/icon-button 图标按钮
:::

#### 更多按钮

“更多”按钮没有独立组件，用 `Button` 组合 `Dropdown` 即可；触发方式建议使用 `click`。

:::demo button/more 更多按钮
:::

#### 悬浮按钮

`float` 把按钮固定在页面角落，默认位于右下角。图标悬浮按钮应提供 `aria-label` 或 `Tooltip`。

:::demo button/float 悬浮按钮
:::

### 按钮组类型

#### 分裂按钮

`SplitButton` 把主操作与更多操作分开。菜单内容通过 `menu` 插槽传入，通常由 `DropdownItem` 组成。

:::demo button/split 分裂按钮
:::

#### 通栏分裂按钮

`SplitButton` 的 `block` 会让主按钮占满剩余宽度，下拉按钮保持原宽度。

:::demo button/split-block 通栏分裂按钮
:::

#### 菜单按钮

`MenuButton` 把整颗按钮作为一个热区，点击打开下拉菜单，没有分割线。它适合把同类操作收进一个入口。

:::demo button/menu 菜单按钮
:::

#### 按钮组

`ButtonGroup` 把多个按钮合并为一组，组内按钮共享 `size`。

:::demo button/group 按钮组
:::

### 特殊类型

#### 切换按钮

传入 `selected` 让按钮进入选中态；按钮保持无状态，由宿主在点击时切换。传入 `selected` 时会同时设置 `aria-pressed`。

:::demo button/selected 选中态切换
:::

#### 全圆角按钮

`round` 将按钮设为全圆角；常规操作链路中避免使用，并保持链路上下流程一致。

:::demo button/round 全圆角按钮
:::

## 组件相关模式/场景

### 交互状态

加载状态会保留按钮占位；`disabled` 禁用交互。`block` 让按钮占满容器宽度。

:::demo button/state 加载、禁用与通栏
:::

### 内容

#### 按钮常见文案

按钮标签应简短、清晰描述操作；同一产品或场景内优先使用统一的行为文案。

#### 按钮中的图标

图标仅在其含义易识别时使用；图标在左用于强调功能，图标在右用于跳转、展开或外部链接。避免按钮左右同时出现图标。

### 适配

国际化场景文案过长时优先精简文案，不要换行或省略。空间有限时可用更多、分裂按钮、菜单按钮收纳，或用 Tooltip 替代常驻文本。

### 无障碍

按钮文字与背景对比度应满足 4.5:1；禁用按钮无需满足对比度。按钮应支持 `Tab` 聚焦、`Enter` 或 `Space` 激活。

## API

### Button Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 按钮类型 | `primary \| danger \| success \| secondary-primary \| secondary-danger \| secondary \| text \| link` | `secondary` |
| `size` | 按钮尺寸 | `xl \| lg \| md \| sm \| xs` | `md` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `loading` | 是否显示加载状态 | `boolean` | `false` |
| `ghost` | 是否隐藏次要按钮底色，仅 `secondary` 生效 | `boolean` | `false` |
| `selected` | 是否处于选中态；传入时同时设置 `aria-pressed` | `boolean` | - |
| `block` | 是否占满容器宽度 | `boolean` | `false` |
| `round` | 是否使用全圆角 | `boolean` | `false` |
| `htmlType` | 原生按钮类型 | `button \| submit \| reset` | `button` |
| `icon` | IconPark 图标组件 | `Component` | - |
| `iconPosition` | 图标位置 | `left \| right` | `left` |
| `iconOnly` | 是否仅显示图标 | `boolean` | `false` |
| `float` | 是否固定悬浮 | `boolean` | `false` |
| `floatSize` | 悬浮按钮尺寸 | `lg \| md \| sm` | `md` |
| `floatPosition` | 悬浮位置 | `bottom-right \| bottom-left \| top-right \| top-left` | `bottom-right` |
| `floatOffset` | 悬浮按钮距页面边缘的距离；默认值按 4N 规则推断 | `number \| string` | `24` |

### Button Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 原生点击事件；加载状态下会被阻止 | `MouseEvent` |

### Button Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 按钮文案 |
| `icon` | 自定义图标内容 |

### Button Exposes

| 名称 | 说明 |
| --- | --- |
| `focus` | 让按钮获得焦点 |

### ButtonGroup Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 组内按钮的尺寸 | `xl \| lg \| md \| sm \| xs` | `md` |

### SplitButton Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `text` | 主按钮文案 | `string` | `''` |
| `type` | 按钮类型 | `ButtonType` | `primary` |
| `size` | 按钮尺寸 | `ButtonSize` | `md` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `loading` | 是否显示加载状态 | `boolean` | `false` |
| `icon` | 主按钮图标 | `Component` | - |
| `placement` | 菜单弹出位置 | `DropdownPlacement` | `bottom-end` |
| `menuWidth` | 菜单宽度 | `number \| string` | - |
| `block` | 是否占满容器宽度，主按钮拉伸、下拉按钮宽度不变 | `boolean` | `false` |
| `ariaLabel` | 展开按钮的无障碍标签 | `string` | `'更多操作'` |

### SplitButton Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击主按钮 | `MouseEvent` |
| `select` | 选择菜单项 | `command: string \| undefined` |

### MenuButton Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `text` | 按钮文案 | `string` | `''` |
| `type` | 按钮类型 | `ButtonType` | `primary` |
| `size` | 按钮尺寸 | `ButtonSize` | 继承 `ButtonGroup` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `loading` | 是否显示加载状态 | `boolean` | `false` |
| `icon` | 前缀图标 | `Component` | - |
| `placement` | 菜单弹出位置 | `DropdownPlacement` | `bottom-start` |
| `menuWidth` | 菜单宽度 | `number \| string` | - |
| `block` | 是否占满容器宽度 | `boolean` | `false` |
| `open` | 菜单是否展开，支持 `v-model:open` | `boolean` | `false` |
| `ariaLabel` | 菜单触发按钮的无障碍标签 | `string` | `'更多操作'` |

### MenuButton Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `select` | 选择菜单项 | `command: string \| undefined` |

### MenuButton Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 按钮文案，覆盖 `text` |
| `menu` | 下拉菜单内容 |

`type` 与 `placement` 的默认值设计文档未指定，当前按同类组件推断。

### SplitButton Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 主按钮文案，优先于 `text` |
| `menu` | 下拉菜单内容 |
