# Backlog

Deferred work. The implementation backlog is the Cascader, TreeSelect and
Transfer group at the end; the other items are blocked on artwork, test
tooling, or a dependency decision.

## Blocked on assets, measurements, or test tooling

- **Avatar** — anonymous external-company avatars need five brand illustrations that are not in the repo. The name tooltip and the +N overflow list are built, and `more` is exposed for a host popover. Badge now carries the 39 sampled collaboration tones and the 2px white ring for a collaborator badge around an avatar.
- **Loading** — illustration loading needs the 125×125 brand animation asset. The image placeholder is built as `Skeleton variant="image"` with an N200 fill, grey spinner, 48px minimum and 180×120 default.
- **Empty** — the brand illustrations are not in the repo. `image` and the `image` slot take the real artwork; the fallback outline is inferred.
- **Tests** — component tests need a DOM environment (jsdom or happy-dom) and `@vue/test-utils`; neither is installed, so only the plain-TS helpers are covered.

## Dependencies and remaining components

Two data-entry components still need dayjs, Form needs Zod, and Table needs TanStack Table. Each dependency still needs a yes before install.

- **data-entry**: Form, DatePicker, TimePicker
- **data-display**: Table

## Documentation

- **Docs site** — the docs package is now a VitePress site modelled on Element Plus docs. Pages live in `guide/` and `components/`; examples live in `docs/examples/<component>/` and are rendered by `:::demo <component>/<example>` through `Demo.vue`. Sidebar data is `docs/.vitepress/sidebar.ts`. Design specs stay at the repository root.
- **Component docs** — add one component page at a time. Pages cover usage, examples and handwritten API tables. Eight pages exist (Button, Input, Select, Checkbox, Radio, Switch, Tag, Badge); the remaining components in `packages/vue` still need pages.

## Design

- **Dark theme** — `docs/design` has no dark palette. The `.dark` values in `packages/tokens/src/color.css` are inferred from the light neutral roles and need a design review before they become normative.
- **Button tokens** — `success` hover/pressed and ghost background tokens are missing; the button infers hover/pressed from the green ramp and uses `--ud-color-fill-secondary` for ghost hover. Needs design tokens before it is normative.
- **Button tooltip** — `Button` has no tooltip prop; docs compose `Tooltip`, which has no focus/ARIA and no wrapper layout hook.
- **Button float** — website/message float styles and a `floatShape` option are not implemented; `float` always uses full radius.
- **Tag avatar sizes** — the size callout states 2px start padding, 4px gap, 8px end padding and 24px height only for the `md` tag. `xs`/`sm`/`lg` keep the 2px end padding because no figure states their values. Needs a decision before those sizes are normative.
- **Tag avatar Disabled** — the 40% avatar fade is inferred from the state figure, and the container fill stays unchanged. Confirm against the design whether the fill should lighten too.
- **Badge multi-char height** — `badge.md` says 14px in "尺寸说明" and 16px in "位置说明". The figure measures 20×14px for "99", so 14px is implemented; the 16px line needs to be corrected at the source.
- **Badge count cap** — the spec only collapses counts above 999 to "···" and never defines a `max+` form, so the `max` prop was removed. If a configurable cap is wanted later it needs a spec line first.

## Complex components (keep for now)

- **Cascader** — base single-select clicking a selectable parent should also expand its children while keeping the panel open, and there is no "parent not selectable" mode (`cascader.md` state rules). Any-level multi-select is built. No search field is required by the doc, and lazy-loaded levels are not built.
- **TreeSelect** — the chosen tags scroll inside a 188px field, as the doc allows, but the "fixed height keeps only the overflow count" variant is not offered.
- **TreeSelect** — rows are a flat list with indentation; there is no custom node slot for icons or avatars.
- **Transfer** — the left panel lists every option with a checkbox (checked = chosen) and the right panel mirrors the chosen keys, so a check shows on the right at once and the right close button sends it back; the floating move button was removed because the composition figure draws only a divider. That no-move reading is inferred from the figure + interaction text and should be confirmed against a figure that shows a selection.
- **Transfer** — only the flat list option area is built: the optional tree structure, custom group layout, drag-reorder of chosen rows, and the breadcrumb/custom header slot are not implemented.
