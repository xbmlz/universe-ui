# Universe UI — contributor guide

Vue component library for Feishu Universe Design. Components are normal SFCs.
Vue 3.6 is pinned so the same components run in a Vapor app and in a normal app.
Visual specification: `design`. Implemented colours and metrics:
`packages/tokens` (`src/index.css` aggregates them).

## Layout

- `design/` — Universe Design spec. `design-language/`, `component---data-entry/`,
  `component---data-display/`, `component---navigation/`, `component----feedback/`,
  `internationalization/`, `data-visualization/`, `responsive-design/`.
  Design docs stay at the repository root; component docs live under `docs/`.
- `packages/tokens/` — primitive and semantic CSS variables (`color.css`, `radius.css`,
  `shadow.css`, `font.css`). `tailwind.css` is optional; components must not depend on it.
- `packages/vue/` — components. Public API is `src/index.ts`. One component per
  `src/components/<name>/` (`*.vue`, `theme.css`, `types.ts`, `index.ts`).
  Shared internals live in `src/internal/` (`park-icon.vue` renders IconPark).
- `docs/` — Nuxt Content documentation site (`@universe-ui/docs`), adapted from
  Nuxt UI v4 docs. Content is split into `guides/` and `components/`; component
  pages are added one at a time. Live examples live in
  `docs/app/components/content/examples/` and their source is shown by
  `ComponentExample.vue`. Run it with `pnpm docs:dev`.
- `playground/` — Vite app for visual checks. `pnpm dev` runs it. It imports
  `@universe-ui/tokens`, not `tailwind.css`. `src/App.vue` is the shell plus the
  page CSS; one SFC per component group lives in `src/sections/`, and `src/demo.ts`
  exports the demo state factory each section calls once.

## Rules

- Design follows `design` strictly. Sizes, spacing, colour roles, states, and
  behaviour come from that spec. Element Plus and Nuxt UI are not a visual source.
- Code design can follow Element Plus and Nuxt UI throughout: component API, state,
  structure, and how behaviour is split. Do not add Reka or copy their CSS.
- Library SFCs use `<script setup lang="ts">`, `defineModel`, named slots,
  composables, and `provide` / `inject`. Do not add the `vapor` attribute, and
  do not set Vite `features.vapor`: that forces every script-setup SFC,
  including this library, into Vapor mode. A normal app uses `createApp`. A
  Vapor app calls `app.use(vaporInteropPlugin)` before mount so it can render
  these components. Vue stays on `3.6.0-rc.14` for that interop. Do not use
  Reka `as` / `as-child`.
- No Sass or Less. Tokens are three layers: primitive and semantic variables in
  `packages/tokens`, component variables in that component's `theme.css`.
  Component CSS is global, not `<style scoped>`, and uses tokens rather than raw colours.
- Icons come from IconPark through `packages/vue/src/internal/park-icon.vue`
  (default size `1em`). Do not add an icons package.
- Ask before adding any dependency. Time uses dayjs, tables use TanStack Table,
  form validation uses Zod. Those three still need a yes before install.
  Approved so far: `vitest` for tests, `@vueuse/core` for browser listeners.
- Tests are `packages/vue/src/**/*.test.ts`, next to the module they cover, run
  with `pnpm test` in a node environment. Cover the plain-TS helpers there; a
  `.vue` test would need a DOM environment that is not set up yet.
- Browser listeners use `@vueuse/core`'s `useEventListener` with a window ref
  (`shallowRef<Window | null>(null)` filled in `onMounted`), never `window`
  directly in setup: reading `window` during setup breaks SSR.
- Vue is pinned to `3.6.0-rc.14` for Vapor interop. Do not publish these
  packages as a dependency until `3.6.0` is stable.
- Keep comments sparse. A comment that records a measured or inferred value says so.
- Deferred work goes in `TODO.md` at the repository root. Add to it whenever a component ships with gaps.
- Write all code comments in English. User-facing strings (labels, placeholders) may stay Chinese.

## Specification

`design` is the spec. A number is specified only when it can be traced there.

- Read the component markdown first. Written sizes, spacing, colour roles, states,
  and behaviour win over a figure.
- Lengths and colours that appear only in a figure are measured from the downloaded
  image. Every figure is linked from the markdown file that cites it; the repository
  does not vendor spec images, so download the URL rather than expecting a local copy.
- Figures are 2× raster exports (commonly ~2048px wide for ~1024 CSS px). Divide raw
  pixels by that scale. When the figure has its own dimension callouts, read the scale
  from those. A pixel count is not a CSS length until the scale is known.
- Map a sampled colour onto an existing token. Older figures draw brand blue as
  `#3370FF`; use `--ud-color-brand`. Do not invent a hover, active, or disabled colour
  with `color-mix()`.
- If neither the text nor the figure states a number, it is unspecified. Leave it
  unimplemented, or implement it and label it as inferred. Never describe an inference
  as the spec.
- When reporting a visual value, say which it is: **specified** (written in
  `design`), **measured** (from a figure, scale applied), or **inferred**
  (and from what).
- After a visual change, measure the rendered component in the browser against the
  written spec and the measured figure. A screenshot that only shows the screen is
  not that check.

## Commands

- `pnpm install` — install the workspace.
- `pnpm dev` — run the playground.
- `pnpm lint` — ESLint (`@antfu/eslint-config`, same shape as reka-ui).
- `pnpm typecheck` — `tsc` over the plain TypeScript in `packages/vue/src`; `.vue`
  files are resolved through a shim, so SFC internals are not checked.
- `pnpm test` — Vitest over `packages/vue/src/**/*.test.ts`.

## Pitfalls

- Treating a 2× specification PNG as 1× doubles every length.
- IconPark glyphs do not fill the viewBox. The canvas padding counts when matching
  a measured gap.
- An unfocused window can make `element.matches(':focus')` false while
  `:focus-within` is still true. Do not key a visible state only on `:focus`.
- Vite can miss a file change when several files are written in the same second and
  keep serving a stale transform. Touch the file mtime if the playground stays blank
  after an edit.
- Semi Design's default theme is Douyin, not Feishu. Do not depend on Semi CSS.
  Element Plus and Nuxt UI are references for component structure only. Do not
  import their themes or treat their metrics as the spec.
