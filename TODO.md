# Backlog

Deferred work. The implementation backlog is the Cascader, TreeSelect and
Transfer group at the end; the other items are blocked on artwork, test
tooling, or a dependency decision.

## Blocked on assets, measurements, or test tooling

- **Avatar** — anonymous external-company avatars need five brand illustrations that are not in the repo. Name tooltip, +N overflow, and the click-to-open remaining-people list are built; `more` still fires for hosts, and the `more` slot can replace the default list. Badge carries the 39 sampled collaboration tones and the 2px white ring for a collaborator badge around an avatar.
- **Loading** — illustration loading needs the 125×125 brand animation asset. The image placeholder is built as `Skeleton variant="image"` with an N200 fill, grey spinner, 48px minimum and 180×120 default.
- **Empty** — the brand illustrations are not in the repo. `image` and the `image` slot take the real artwork; the fallback outline is inferred.
- **Tests** — component tests need a DOM environment (jsdom or happy-dom) and `@vue/test-utils`; neither is installed, so only the plain-TS helpers are covered.

## Dependencies and remaining components

Two data-entry components still need dayjs, Form needs Zod, and Table needs TanStack Table. Each dependency still needs a yes before install.

- **data-entry**: Form, DatePicker, TimePicker
- **data-display**: Table

## Documentation

- **Docs site** — the docs package is now a VitePress site modelled on Element Plus docs. Pages live in `guide/` and `components/`; examples live in `docs/examples/<component>/` and are rendered by `:::demo <component>/<example>` through `Demo.vue`. Sidebar data is `docs/.vitepress/sidebar.ts`. Design specs stay at the repository root.
- **Component docs** — add one component page at a time. Pages cover usage, examples and handwritten API tables. Twenty-two pages exist (Icon, Button, Input, Select, Checkbox, Radio, Switch, Slider, Rate, Stepper, Avatar, Timeline, Card, Tabs, Tag, Badge, Tooltip, Popover, Collapse, Steps, Pagination, Breadcrumb); the remaining components in `packages/vue` still need pages.
- **Popover enter/leave** — CSS `<Transition>` under `Teleport` could stick at `opacity: 0` (enter-from never cleared). Animation removed until a reliable approach is found; duration is unspecified in the design anyway.

## Design

- **Figures win over tokens** — where a figure samples a value one neutral or brand step away from the shared token (stepper border at N400 vs N300, slider rail and rate star at #D7D9DB, stepper button washes at #ECF1FE / #D8E2FC), add the sampled value as its own token instead of snapping the component onto the nearest existing role. Only differences inside the same step (≤3/255, e.g. the rate yellow #FFC60A vs #FFC60C) keep the existing token.
- **Dark theme** — `docs/design` has no dark palette. The `.dark` values in `packages/tokens/src/color.css` are inferred from the light neutral roles and need a design review before they become normative.
- **Button tokens** — `success` hover/pressed and ghost background tokens are missing; the button infers hover/pressed from the green ramp and uses `--ud-color-fill-secondary` for ghost hover. Needs design tokens before it is normative.
- **Button tooltip** — `Button` has no tooltip prop; docs compose `Tooltip`, which has no focus/ARIA and no wrapper layout hook.
- **Button float** — website/message float styles and a `floatShape` option are not implemented; `float` always uses full radius.
- **Tag avatar sizes** — the size callout states 2px start padding, 4px gap, 8px end padding and 24px height only for the `md` tag. `xs`/`sm`/`lg` keep the 2px end padding because no figure states their values. Needs a decision before those sizes are normative.
- **Tag avatar Disabled** — the 40% avatar fade is inferred from the state figure, and the container fill stays unchanged. Confirm against the design whether the fill should lighten too.
- **Badge multi-char height** — `badge.md` says 14px in "尺寸说明" and 16px in "位置说明". The figure measures 20×14px for "99", so 14px is implemented; the 16px line needs to be corrected at the source.
- **Badge count cap** — the spec only collapses counts above 999 to "···" and never defines a `max+` form, so the `max` prop was removed. If a configurable cap is wanted later it needs a spec line first.
- **Slider track height** — the interaction figure paints the rail inside a 16px band, which is exactly the thumb height, but a 16px track leaves the mark labels 28px outside the component box. The track is 32px so the labels stay inside. Needs a decision: shrink to the 16px band and give the label its own row, or accept the 32px box.
- **Slider vertical marks** — the 带节点 figure is horizontal only, so the vertical mark offset (dot beside the rail, label to its right) is inferred from the horizontal one.
- **Slider readonly** — `slider.md` defines Normal, Hover/Drag and Disabled only. Readonly reuses the disabled colours and blocks both pointer and keyboard input; that mapping is inferred.
- **Rate selected yellow** — the rate figures sample #FFC60A while `--ud-yellow-500` is #FFC60C. That is a 2/255 difference inside one yellow step, so the token is kept as is; a separate star token would only duplicate the yellow.
- **Brand wash family** — the figures do not agree on one brand wash: breadcrumb samples #E4EBFB / #D1DEFB, the stepper step buttons sample #ECF1FE / #D8E2FC. All four are tokens now (`brand-subtle`, `brand-subtle-active`, `brand-subtle-weak`, `brand-subtle-strong`). Design should collapse them to one pair.
- **Rate 好评差评** — `rate.md` lists it as a second control type (112px minimum width, filled selected button, regular and small sizes). Only the star rating is built; no component covers it yet.
- **Rate disabled / readonly** — the state figure covers Normal, Hover/Pressed and Selected only. Both extra states reuse the disabled text colour and are inferred.
- **Stepper step units** — `stepper.md` says values must be integers with no decimal point, then also allows a configurable decimal step. The component treats `step` as an integer increment and only accepts digits in the field. Needs one wording from design.
- **Stepper button width** — the 12px + 16px + 12px callout is measured on the 32px control only. The 40px button width is applied unchanged at 28px and 40px; that is inferred.
- **Stepper readonly** — the nine documented states have no readonly form. It reuses the normal colours and blocks pointer and keyboard input.
- **Card hover label** — the state table's middle column is titled "Hover & Pressed" but the two figures under it are labelled "Normal" and "Selected", and the surrounding text says the B500 frame is for "加重选择状态". Both readings are implemented: a shadowless card turns its frame to B500 on hover, and `selected` keeps it on. Design should say which one the table meant.
- **Card radius default** — the default moved from `m` (8px) to `s` (6px) because the composition figure's 226px card measures 6px and the list card 4px, with no figure showing 8px. That is a visible change for any caller that relied on the old default.
- **Card padding** — the figures put the icon about 20px from the frame edge on a ~1.5x export, which lands near 14px; the prose says 12px throughout. The implementation follows the prose.
- **Card shadow strength** — Shadow-S/M/L are built from 2–6% alpha layers, so a shadow-only card is almost indistinguishable from a flat one in the docs preview. That is the token as specified, but the "仅投影" example reads as if it has no shadow.
- **Tabs brand blue** — every Tabs figure samples #3370FF (B500 in the original Feishu palette) for the selected ink, indicator and capsule text, while `design/design-language/color.md` explicitly defines the project brand colour as #1456F0 and the shared token is `--ud-color-brand: #1456f0`. The component uses the shared token so Tabs matches Button, Input and Slider on the same page. Needs a decision: either the figures are an older palette and should be republished, or the whole brand ramp has to move.
- **Tabs capsule B100** — the capsule state figure samples #D6E2FF for Selected. `--ud-color-brand-subtle-strong` is #D8E2FC (from the stepper pressed figure), a ≤3/255 difference, so it is reused rather than adding a fifth brand-wash token. This also means the "Brand wash family" item now covers three figures instead of two.
- **Tabs badge clipping in scroll mode** — the badge sits above the text and is absolutely positioned. `overflow="scroll"` puts `overflow-x:auto` on the viewport, which clips anything above it. Callers using badges with paging need top padding on the container; a component-level fix needs a spec for how much vertical space the row reserves.
- **Tabs card panel** — the type-overview figure samples a #F8F9FA panel under the selected card tab, while the selected tab shell is white so a continuous surface needs the same fill. The docs example therefore uses `--ud-color-bg-white` with `border-top: 0`. Tabs still only renders the tab row; the spec presents the panel as part of the control, so it may need a `panel` slot, and design should confirm white vs #F8F9FA.
- **Tabs card visual change** — the previous implementation drew each card tab as its own bordered 6px pill, which matches no figure. It now draws one continuous row with a folder-shaped selected tab, vertical rules between the others and a bottom rule joining the caller's panel. This is a visible change for existing callers.
- **Tabs focus ring** — no figure specifies a focus style on tabs; the 2px `--ud-color-focus-ring` outline is borrowed from Button.
- **Tabs size labels** — `tabs.md` calls the capsule sizes "中尺寸 14px / 小尺寸 12px" while its callout labels them "Media / Small"; the component maps them to `md` / `sm` and downgrades `lg` to `md`.

## Complex components (keep for now)

- **Cascader** — base single-select clicking a selectable parent should also expand its children while keeping the panel open, and there is no "parent not selectable" mode (`cascader.md` state rules). Any-level multi-select is built. No search field is required by the doc, and lazy-loaded levels are not built.
- **TreeSelect** — the chosen tags scroll inside a 188px field, as the doc allows, but the "fixed height keeps only the overflow count" variant is not offered.
- **TreeSelect** — rows are a flat list with indentation; there is no custom node slot for icons or avatars.
- **Transfer** — the left panel lists every option with a checkbox (checked = chosen) and the right panel mirrors the chosen keys, so a check shows on the right at once and the right close button sends it back; the floating move button was removed because the composition figure draws only a divider. That no-move reading is inferred from the figure + interaction text and should be confirmed against a figure that shows a selection.
- **Transfer** — only the flat list option area is built: the optional tree structure, custom group layout, drag-reorder of chosen rows, and the breadcrumb/custom header slot are not implemented.
