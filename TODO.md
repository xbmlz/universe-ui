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

- **Docs site** — the docs package now uses the Nuxt UI v4 docs app structure with Nuxt Content. Guides and Components are wired, and Button is the first component page. Design specs live outside the site at the repository root.
- **Component docs** — add one component page at a time. Each page should follow the Button page shape: overview, features, anatomy, usage guidance, examples, API, and accessibility. Examples use `ComponentExample`, resolved by name from `docs/app/components/content/examples/`, with live preview and Shiki-highlighted source from the same SFC.

## Design

- **Dark theme** — `docs/design` has no dark palette. The `.dark` values in `packages/tokens/src/color.css` are inferred from the light neutral roles and need a design review before they become normative.

## Complex components (keep for now)

- **Cascader** — base single-select clicking a selectable parent should also expand its children while keeping the panel open, and there is no "parent not selectable" mode (`cascader.md` state rules). Any-level multi-select is built. No search field is required by the doc, and lazy-loaded levels are not built.
- **TreeSelect** — the chosen tags scroll inside a 188px field, as the doc allows, but the "fixed height keeps only the overflow count" variant is not offered.
- **TreeSelect** — rows are a flat list with indentation; there is no custom node slot for icons or avatars.
- **Transfer** — the left panel lists every option with a checkbox (checked = chosen) and the right panel mirrors the chosen keys, so a check shows on the right at once and the right close button sends it back; the floating move button was removed because the composition figure draws only a divider. That no-move reading is inferred from the figure + interaction text and should be confirmed against a figure that shows a selection.
- **Transfer** — only the flat list option area is built: the optional tree structure, custom group layout, drag-reorder of chosen rows, and the breadcrumb/custom header slot are not implemented.
