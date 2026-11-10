---
title: Stepper
description: 在明确范围内按步长增减整数。
---

# Stepper 步进器

Stepper 用于在明确的数值范围内增减整数。左侧按钮减、右侧按钮加，中间字段可以直接输入。每次点击只走一个步长，所以它适合数值精确的小范围调整。

## 使用规则

- 仅用于有明确数值范围的数字增减，建议范围不超过 999。
- 数值必须是正整数，不支持小数点与负数。
- 随机生成或没有固定范围的数值输入请改用数字输入框 `InputNumber`。
- 与数字输入框的分工：步进器单次调整 1（可配），只接受正整数；数字输入框支持小数与负数，单次跳转的额度可配。
- 步进器常与实体单位搭配，例如「件」「份」「台」。

## 组成要素

1. **减数按钮**：减少数值，到达最小值时禁用。
2. **增数按钮**：增加数值，到达最大值时禁用。
3. **字段**：当前数值，默认居中。
4. **输入框**：承载字段，可直接键入数字。

尺寸取自 `stepper.md` 的尺寸说明图与状态图。两张图都是 2 倍图，下列数值已按 2 倍换算：

| 项 | 值 |
| --- | --- |
| 高度 | 28 / 32 / 40 px，与输入框规范一致 |
| 默认宽度 | 160 px，超过内容宽度时用 `width` 调整 |
| 按钮区宽度 | 40 px = 左右各 12 px 内边距 + 16 px 图标 |
| 字段宽度 | 控件宽 160 px 时为 80 px |
| 圆角 | Radius-S（6 px） |
| 图标 | 16 × 16 px，N600 |
| 文本 | 14 px Regular，N900 |

`stepper.md` 的尺寸图把「12px」标在按钮的左右内边距上、「16px」标在图标上，因此按钮是固定 40 px 宽，不随高度变化；这一条对 28 px 和 40 px 两个高度是推断值。

:::demo stepper/basic 基础用法
:::

## 数值范围

数值范围由 `min` 与 `max` 给出。到达最小值时减数按钮禁用，到达最大值时增数按钮禁用：

:::demo stepper/range 到达边界时对应按钮禁用
:::

字段的取值规则：

- 清空字段并离开时，字段回到最小值。
- 输入值超出范围并离开时，字段回到最近的边界值。
- 输入非法字符（符号、字母等）时，无效字符不会进入输入框。

`max` 未设置时增数按钮永不进入禁用态，这种用法与「必须有明确范围」的规则冲突，只建议在原型中使用。

## 尺寸

高度跟随输入框规范，共三档：

:::demo stepper/sizes 三种高度的步进器
:::

## 宽度

默认宽度 160 px。数值位数较多或需要与表单列宽对齐时，用 `width` 传入像素值或任意 CSS 长度：

:::demo stepper/width 默认宽度与可调宽度
:::

## 状态

| 状态 | 表现 |
| --- | --- |
| Normal | 边框 N400，字段文本 N900，按钮图标 N600 |
| Hover | 鼠标悬停在字段上时，字段四边变为 1px 品牌色 |
| Activated / Inputting | 字段获得焦点时保持品牌色边框，可键入数字 |
| Hover Button | 鼠标悬停在按钮上时，按钮变为品牌色图标 + 10% 品牌底色 + 1px 品牌描边 |
| Pressed Button | 按下按钮时底色加深到 20% 品牌色 |
| Input complete | 失焦后回到 Normal |
| Disable | 整体 N200 填充，边框保持 N400，图标与文本降到 N500 |
| Error | 字段四边变为 1px R500，下方显示错误文案 |

悬停与按下底色按配图取样取 `#ECF1FE` / `#D8E2FC`，落在 `--ud-color-brand-subtle-weak` / `--ud-color-brand-subtle-strong` 上。这一对比面包屑的 `--ud-color-brand-subtle`（#E4EBFB）更浅，设计稿没有统一取值，因此保留设计图的采样值，不向其它组件的 token 靠拢。

控件边框取样 N400（#BCBFC3），比输入框的 N300 深一档，用 `--ud-color-border-strong`；禁用态图标与数字取 N500（#8F9594），用 `--ud-color-icon-tertiary`。

`stepper.md` 一共列了 9 个状态，其中 Hover、Activated、Inputting、Hover Button、Pressed Button 是同一控件上的交互态，静态示例无法并列展示。下面的示例给出 Normal、Disabled、Readonly 与 Error 四种；**Readonly 是补全项**，设计稿没有这一态，配色沿用 Normal，仅阻止交互。

:::demo stepper/states 正常、禁用、只读与错误
:::

## 交互

- 单击减数 / 增数按钮按 `step` 增减，`step` 默认 1。
- 长按按钮：先走一步，按住 800 ms 后开始每 800 ms 连续增减，松开即停；到达边界后连续增减自动停止，按钮同时进入禁用态。
- 在字段内直接输入数字；非法字符不进入输入框。
- `↑` / `↓` 也可以增减，效果与两个按钮一致。

:::demo stepper/step 默认步长与自定义步长
:::

`stepper.md` 同时写了「数值必须是整数，不支持小数点」和「单击将逐步更改数值，允许十进制（可根据需求自定义）」。实现按前者处理：`step` 只接受整数增长量，字段也只接受数字字符。两句话的取舍记在 `TODO.md` 待设计确认。

## 使用场景

### 搭配实体单位

单位不属于控件本身，由使用方在控件外侧标注，这样同一套步进器可以复用在不同的业务字段上：

:::demo stepper/unit 搭配「份」「台」等单位
:::

### 配合标签与说明

与前后的表单字段对齐时使用 `label`、`required` 与 `message`，样式与 Input 一致：

:::demo stepper/label 标签、必填标记与说明文案
:::

## API

### Stepper Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前数值，清空字段时为 `null` | `number \| null` | `null` |
| `min` | 最小值 | `number` | `0` |
| `max` | 最大值 | `number` | - |
| `step` | 每次增减的数量 | `number` | `1` |
| `size` | 高度档位，对应 28 / 32 / 40 px | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `width` | 控件宽度，数字按 px 处理 | `number \| string` | `160` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readonly` | 是否只读 | `boolean` | `false` |
| `error` | 是否错误态，字段描边变为 R500 | `boolean` | `false` |
| `required` | 是否必填，`label` 前显示星号 | `boolean` | `false` |
| `label` | 控件上方的标签 | `string` | - |
| `message` | 控件下方的说明或错误文案 | `string` | - |

### 键盘操作

| 按键 | 说明 |
| --- | --- |
| `↑` | 增加一个 `step` |
| `↓` | 减少一个 `step` |
| `Tab` | 在非禁用按钮与字段之间移动焦点 |

### 样式变量

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `--ud-stepper-width` | 控件宽度 | `160px` |
| `--ud-stepper-height` | 控件高度，由 `size` 覆盖 | `32px` |
| `--ud-stepper-btn-width` | 按钮区宽度 | `40px` |
| `--ud-stepper-radius` | 圆角 | `--ud-radius-s` |
| `--ud-stepper-btn-hover-bg` | 按钮悬停底色，配图标注 B500 10%（取样 #ECF1FE） | `--ud-color-brand-subtle-weak` |
| `--ud-stepper-btn-pressed-bg` | 按钮按下底色，配图标注 B500 20%（取样 #D8E2FC） | `--ud-color-brand-subtle-strong` |
| `--ud-stepper-disabled-bg` | 禁用底色 | `--ud-color-fill-disabled` |
| `--ud-stepper-disabled-color` | 禁用时的图标与文本色 | `--ud-color-icon-tertiary` |
