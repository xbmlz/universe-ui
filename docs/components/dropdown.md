---
title: Dropdown
description: 展开的一系列动作或操作列表。
---

# Dropdown 下拉菜单

下拉菜单用于收纳一组操作命令。页面上操作过多时，可用它折叠次要动作。

与 [Popover](/components/popover) 相比，Dropdown 侧重命令列表；与 [Select](/components/select) / Cascader 相比，点击后执行命令，触发区通常不回显选项。

## 组成要素

1. **触发区域**：按钮、图标或文本
2. **菜单内容**
3. **父级菜单项**（可选）：含下级箭头
4. **子级菜单项**（可选）
5. **容器背景**：Radius-S，Shadow-M-down

## 基础用法

默认 **悬停** 触发：悬停 **300ms** 后出现，移出 **300ms** 后或点击菜单项后关闭。菜单本身也是触发区。

:::demo dropdown/basic 悬停触发
:::

## 点击触发

`trigger="click"`：点击打开 / 关闭；点菜单外或选中项后关闭。

:::demo dropdown/click 点击打开
:::

## 级联菜单

部分条目有从属关系时用子菜单收纳。子菜单由 **Hover** 呼出；父级项不宜超过约 13 个。子级标题尽量简短。

:::demo dropdown/cascade 含子菜单
:::

## 分组

优先用通栏分割线分组（`divided`）。规范不推荐分组标题；若需要，优先改成级联，且避免与菜单标题同时使用。

:::demo dropdown/group 分割线分组
:::

## 图标、说明与已选

菜单项可带左侧图标、右侧辅助说明（`hint`）。强调不可逆操作可用 `danger`。`selected` 较少用于顶层，多见于子级展示当前属性；若选择结果要回显到触发区，应改用 Select。

:::demo dropdown/complex 图标、快捷键、危险项与已选
:::

组合按钮 / 菜单按钮触发见 [Button](/components/button) 的 SplitButton、MenuButton。

## 加载中

`loading` 时在菜单内显示 Spin，宽度与加载完成后保持一致。

:::demo dropdown/loading 加载态
:::

## 上下文菜单

`trigger="contextmenu"`：在非固定触发点右键打开，菜单出现在指针旁。层级不宜过深，级联最多两层。

:::demo dropdown/context 右键菜单
:::

## 尺寸与位置

| 项 | 说明 |
| --- | --- |
| 触发区到菜单 | **4px** |
| 宽度 | 按内容自适应，左右约 12px padding；最小 **55px**，最大 **420px**；可用 `width` 固定为 4 的倍数 |
| 高度 | 建议完整展示；限制时不超过 **480px**，超出可滚动 |
| 安全边距 | 距视口边缘 **16px** |
| 展开优先 | 左对齐向下；空间不足时依次尝试右对齐、向上、侧向 |

## API

### Dropdown Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `open` / `v-model:open` | 是否展开 | `boolean` | `false` |
| `trigger` | 触发方式 | `hover \| click \| contextmenu` | `hover` |
| `placement` | 首选方位；不传时按空间自动尝试 | `DropdownPlacement` | - |
| `width` | 固定菜单宽度 | `number \| string` | - |
| `loading` | 加载中 | `boolean` | `false` |
| `disabled` | 禁用触发 | `boolean` | `false` |

### Dropdown Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `select` | 点击菜单项（无子菜单时） | `(command?: string)` |

### Dropdown Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 触发区域 |
| `menu` | 菜单内容（`DropdownItem` 等） |

### DropdownItem Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `command` | 选中时回传的命令值 | `string` | - |
| `hint` | 右侧辅助说明 | `string` | `''` |
| `disabled` | 禁用 | `boolean` | `false` |
| `divided` | 项前显示通栏分割线 | `boolean` | `false` |
| `danger` | 危险样式 | `boolean` | `false` |
| `selected` | 已选样式 | `boolean` | `false` |

### DropdownItem Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 菜单项文案 |
| `icon` | 左侧图标 |
| `submenu` | 子菜单内容 |

### DropdownPlacement

`bottom-start` · `bottom-end` · `top-start` · `top-end` · `right-start` · `left-start`
