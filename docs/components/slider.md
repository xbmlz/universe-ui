---
title: Slider
description: 在固定数值范围内拖动或点击滑轨来设置数值。
---

# Slider 滑块

Slider 用于在固定的数值范围内通过滑动滑块来设置数值。滑块经过的部分与未经过的部分需要有明显区分，用户也可以直接点击滑轨定位。

## 使用规则

- 适用于模糊数值的输入，例如音量、亮度、图像滤镜。
- 可选的数值少于四个时不要使用滑块，改用 Radio 单选框。

## 组成要素

滑轨是滑块的滑动范围，点击可直接设置数值；滑块表示当前数值，可拖曳；节点是常用的数据点，点击后滑块快速定位；拖动时滑块上方即时反馈当前数值。

滑轨高度 4px、滑块直径 16px，取自 `slider.md` 设计说明配图的 4Px / 16Px 标注；同一张图还把滑块套进一个 20px 的命中区，实现为滑块上的透明命中层，因此滑块外观仍是 16px。滑块描边默认 1px，悬停或拖动时变为 2px 品牌色，尺寸不变。

轨道盒高 32px 是推断值：配图的交互带只有 16px（正好等于滑块高度），但带节点时文案要挂在滑轨下方，16px 装不下，这一点记在 `TODO.md` 待设计确认。

:::demo slider/basic 拖动或点击滑轨设置数值
:::

## 变体

### 双滑块

用于设置范围数值。两个滑块可以互相穿越：右侧滑块可被滑到左侧，左侧滑块也可被滑到右侧。点击滑轨时，距离较近的滑块定位到点击处。

:::demo slider/range 双滑块
:::

### 竖向滑块

竖向单滑块多用于音量调节场景，竖向形态同样支持双滑块。

:::demo slider/vertical 竖向滑块
:::

### 带节点的滑块

需要向用户展示关键值的位置时使用带节点的滑块。点击节点或节点文案，滑块直接定位到节点处。

:::demo slider/marks 带节点的滑块
:::

## 状态

| 状态 | 表现 |
| --- | --- |
| Normal | 已选段品牌色，未选段中性灰，滑块白底 + 1px 中性描边 |
| Hover / Drag | 滑块描边变为 2px 品牌色；拖动时滑块上方显示数值气泡 |
| Disabled | 滑轨变浅，已选段与描边变为禁用灰，不可交互 |
| Readonly | 数值不可修改，键盘与指针操作均被拦截 |

`slider.md` 只定义了 Normal、Hover / Drag 与 Disabled 三种状态，Readonly 沿用禁用配色。

:::demo slider/states 正常、禁用与只读
:::

## 使用场景

### 配合输入框

需要输入确切数值时，滑块与输入框联动：滑动滑块时输入框数值随之变化，输入框数值改变时滑块也定位到对应位置。

:::demo slider/with-input 与输入框联动
:::

### 配合数值或图标

轨道两端的图标用于说明数值含义，例如音量。

:::demo slider/with-icon 图标与当前数值
:::

## API

### Slider Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前数值；传入数组即为双滑块 | `number \| [number, number]` | `0` |
| `min` | 最小值 | `number` | `0` |
| `max` | 最大值 | `number` | `100` |
| `step` | 步长 | `number` | `1` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readonly` | 是否只读 | `boolean` | `false` |
| `vertical` | 是否竖向显示 | `boolean` | `false` |
| `showTooltip` | 拖动时是否显示数值气泡 | `boolean` | `true` |
| `marks` | 节点及其文案，键为节点数值 | `SliderMarks` | - |
| `label` | 轨道上方的标签，同时作为单滑块的 `aria-label` | `string` | - |
| `labelFormatter` | 数值气泡的文案格式化函数 | `(value: number) => string` | - |

### 类型

```ts
type SliderValue = number | [number, number]

/** 键为节点数值，文案绘制在轨道下方。 */
type SliderMarks = Record<number, string>
```

### 键盘操作

| 按键 | 说明 |
| --- | --- |
| `←` / `→` | 按 `step` 减小或增大数值 |
| `↑` / `↓` | `↑` 增大、`↓` 减小数值，横向滑块的 `↑` / `↓` 与 `→` / `←` 等价 |
| `Home` / `End` | 跳到最小值或最大值 |
