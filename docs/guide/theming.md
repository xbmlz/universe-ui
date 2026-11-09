# 主题与 Dark Mode

Universe UI 的颜色、字体、圆角和阴影都通过 CSS 变量提供。light 值在 `:root`，dark 值在 `.dark`。组件只引用语义 token，不直接写颜色。

## 切换主题

把 `.dark` 加到 `html` 上即可。若和 VitePress 共用主题状态，使用 `vitepress-theme-appearance` 作为存储键（值为 `light` / `dark` / `auto`）：

```ts
document.documentElement.classList.toggle('dark', isDark)
localStorage.setItem('vitepress-theme-appearance', isDark ? 'dark' : 'light')
```

`@universe-ui/vue` 也导出了 `useTheme`。它会在 `onMounted` 后读取存储和系统偏好，只负责增删 `dark` class，不覆盖 VitePress 的切换逻辑：

```vue
<script setup lang="ts">
import { useTheme } from '@universe-ui/vue'

const { mode, setMode } = useTheme()
</script>
```

## 覆盖 token

优先覆盖语义 token，例如：

```css
:root {
  --ud-color-brand: #1456f0;
}
.dark {
  --ud-color-brand-text: #7aa2ff;
}
```

Playground 的 `src/App.vue` 里可以直接写组件代码，token CSS 会自动注入 iframe。Docs 的 demo 预览使用 `--ud-color-bg-2`，因此会跟随 VitePress 的 dark 开关。

## 约束

- 语义 token 在 light/dark 都必须有值；`pnpm test` 会检查 parity。
- 正文、次要文字、占位符、图标和 focus ring 有对比度下限。
- `--ud-color-white-a*`、头像/评分等装饰色是跨主题常量，已列入测试白名单。
- `.dark` 的值目前是推导值，设计评审后才会成为最终规范。
