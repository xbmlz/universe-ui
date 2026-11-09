---
title: Badge
description: 在图标、头像或按钮角上叠加数字、圆点或角标的徽标。
---

# Badge 徽标

Badge 把数字、圆点或角标叠加在宿主元素上，用于提示未读数量、在线状态或活动标记。

## 控件类型

### 点状徽标

#### 使用场景

当功能模块更新、信息未读、人员在线协同等只需提示状态、不需要具体数量时使用。

:::demo badge/dot 点状徽标尺寸
:::

#### 通用样式规则

红色表示未处理、模块更新或强提醒；灰色表示未读弱提示；绿色表示已读；蓝色表示新应用或应用可更新；多色用于人员实时协同。

:::demo badge/dot-color 点状颜色与描边
:::

提供 sm、md、lg 三种尺寸，对应 6×6px、8×8px、10×10px；头像上建议使用 10×10px。

提供仅填充、仅内描边、填充加描边三种样式；协同徽标使用 ring。

与头像组合时位于右上角或右下角（协同徽标用右下角），以头像中心为圆心、45° 与圆周的交点为徽标中心；与文字组合时位于文字右侧 2px；与图标组合时按对角线定位。

:::demo badge/placement 右上角与右下角
:::

:::demo badge/floating 头像、方形头像与按钮
:::

### 字符徽标

#### 使用场景

需要明确告知新增数量（如 99、999）、未读总数或状态文本（如 New）时使用。

:::demo badge/count 单字符、多字符与极限
:::

红色表示重要或强提示；灰色表示弱提示；绿色和蓝色用于协同或应用状态。

:::demo badge/count-color 字符颜色与浅色底
:::

单字符使用 14×14px 正圆；多字符是高度 14px 的全圆角矩形，字符与容器左右间距 4px，宽度随字符自适应；超过 999 时用「···」展示；纯数字字符徽标建议不小于 12px。

> 规范「位置说明」写多字符高度为 16px，与「尺寸说明」的 14px 及配图实测（单字符 14×14px、「99」为 20×14px）不一致，此处按 14px 实现。

头像和图标位于右上角，宽度增加时向左侧延伸；文字位于右上角，与文字间距 2px。

### 图标徽标

#### 使用场景

用于特殊状态提示，如勿扰模式、话题等；图标需具备通用性和直观性。

:::demo badge/icon 图标徽标
:::

#### 通用样式规则

图标徽标容器统一为 14×14px，内部图标图形为 8×8px，并按 4N 规则缩放。

位于图标或头像的右上角或右下角，以形状对角线交点为中心。

角标通常出现在列表、卡片上，用于强调特殊状态；形状可为三角形、矩形、旗帜形或异形。

:::demo badge/corner 角标徽标与协作色
:::

## API

### Badge Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `count` | 显示的数字或文本 | `number \| string` | - |
| `dot` | 是否显示圆点 | `boolean` | `false` |
| `dotSize` | 圆点尺寸 | `sm \| md \| lg` | `md` |
| `color` | 徽标颜色 | `red \| grey \| green \| blue` | `red` |
| `outline` | 圆点是否使用描边样式 | `boolean` | `false` |
| `plain` | 是否使用浅色底 | `boolean` | `false` |
| `showZero` | 计数为 0 时是否显示 | `boolean` | `false` |
| `hidden` | 是否隐藏徽标 | `boolean` | `false` |
| `round` | 宿主为圆形时启用；徽标中心落在头像 45° 对角线与圆周的交点，否则按宿主包围盒右上角定位 | `boolean` | `false` |
| `placement` | 徽标位置 | `top-right \| bottom-right` | `top-right` |
| `icon` | 徽标内的图标 | `Component` | - |
| `tone` | 协作色板色号，范围 1–39 | `number` | - |
| `ring` | 是否显示协作徽标的白色描边 | `boolean` | `false` |
| `corner` | 是否渲染角标 | `boolean` | `false` |
| `cornerPlacement` | 角标所在角 | `top-left \| top-right \| bottom-left \| bottom-right` | `top-right` |

### Badge Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 徽标宿主内容 |
| `icon` | 徽标内的图标内容 |
| `corner` | 角标内容 |
