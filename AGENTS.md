# Universe UI — contributor guide

Vue Vapor component library for Feishu Universe Design.
Visual specification: `docs/design`. Implemented colours and metrics:
`packages/tokens` (`src/index.css` aggregates them).

## Layout

- `docs/design/` — Universe Design spec. `design-language/`, `component---data-entry/`,
  `component---data-display/`, `component---navigation/`, `component----feedback/`,
  `internationalization/`, `data-visualization/`, `responsive-design/`.
  Design docs stay here; do not put them at `docs/` root.
- `packages/tokens/` — primitive and semantic CSS variables (`color.css`, `radius.css`,
  `shadow.css`, `font.css`). `tailwind.css` is optional; components must not depend on it.
- `packages/vue/` — components. Public API is `src/index.ts`. One component per
  `src/components/<name>/` (`*.vue`, `theme.css`, `types.ts`, `index.ts`).
  Shared internals live in `src/internal/` (`park-icon.vue` renders IconPark).
- `playground/` — Vite app for visual checks. `pnpm dev` runs it. It imports
  `@universe-ui/tokens`, not `tailwind.css`.

## Rules

- Vue SFCs use `<script setup lang="ts" vapor>`, `defineModel`, named slots,
  composables, and `provide` / `inject`. Do not use Reka `as` / `as-child`.
  Vapor's missing features are constraints; work around them in the component.
- No Sass or Less. Tokens are three layers: primitive and semantic variables in
  `packages/tokens`, component variables in that component's `theme.css`.
  Component CSS is global, not `<style scoped>`, and uses tokens rather than raw colours.
- Icons come from IconPark through `packages/vue/src/internal/park-icon.vue`
  (default size `1em`). Do not add an icons package.
- Ask before adding any dependency. Time uses dayjs, tables use TanStack Table,
  form validation uses Zod. Those three still need a yes before install.
- Vue is pinned to `3.6.0-rc.14`. Do not publish these packages as a dependency
  until `3.6.0` is stable.
- Keep comments sparse. A comment that records a measured or inferred value says so.

## Specification

`docs/design` is the spec. A number is specified only when it can be traced there.

- Read the component markdown first. Written sizes, spacing, colour roles, states,
  and behaviour win over a figure.
- Lengths and colours that appear only in a figure are measured from the downloaded
  image. Local copies live in `D:\Data\cache\temp\ud-spec`.
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
  `docs/design`), **measured** (from a figure, scale applied), or **inferred**
  (and from what).
- After a visual change, measure the rendered component in the browser against the
  written spec and the measured figure. A screenshot that only shows the screen is
  not that check.

## Commands

- `pnpm install` — install the workspace.
- `pnpm dev` — run the playground.

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
  Element Plus cannot be skinned to this spec.
