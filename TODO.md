# Backlog

Deferred work, collected per component. Group A has a clear spec and can be done
directly. Group B needs a decision, assets, or is a feature of its own. Group C
lists the components with a spec in `docs/design` but no implementation yet.

## A. Clear spec

- **Toast** — duration by text length. Spec ranges: without actions, 0–40 chars 3–5s, 40–80 chars 6–8s; with actions, 0–40 chars 4–6s, 40–80 chars 6–10s. Today it uses fixed defaults (4s, 6s with actions). The picked point inside each range is inferred, not specified.
- **Notice** — show a Tooltip on the ellipsis when text is clamped. Reuse the `only-overflow` Tooltip that Radio uses.
- **Dialog** — adaptive width mode: width follows the viewport with a 180px gap on each side (specified default), clamped by min/max width.
- **Drawer** — header actions: show at most three, turn the third into a "more" button, and collect the rest in its menu. Today the `actions` slot renders whatever it gets.
- **Button, Select, Switch** — replace their hand-drawn spinners with `Spin`. Check each one's measured size still matches.
- **Tag** — the other 10 colours. The written spec says 13 palettes for property tags; the figure shows 12 (neutral + 11 colour). Settle the count against the figures first, then measure each swatch and add primitive tokens as needed (palette decision: "measure"). Each colour needs an opaque variant for non-standard backgrounds (specified).
- **Tag** — condition the colours on the four tag types from the spec (property / option / status / avatar). Option tags are low-saturation and must not carry system-level meaning; status tags map blue=pending, green=success, red=failure, orange=awaiting action, grey=negative.
- **Tag** — interactive icon as an optional part (the property-tag figures pair a text tag with an icon tag for every colour).
- **Tag** — status tags (with a status icon or dot).
- **Tag** — avatar tags. Avatar now exists. Spec adds hover / pressed / disabled states and a two-colour organization variant.
- **Toast** — merge toasts with identical content into one (specified suggestion).
- **Toast** — surface a close button when text exceeds 20 chars (specified suggestion).
- **Spin** — optional delayed display, recommended at least 1000ms (specified in loading.md); no delay option today.
- **Dropdown** — contextual menu. It opens beside the pointer, prefers right then down, and when the bottom runs out it aligns to the 16px page edge instead of the pointer.
- **Button** — icon, float, round, and split-button-with-menu variants (`button_icon.md`, `button_float.md`, `button_round.md`, `button_splitbutton_menu.md`). Text and basic variants exist.
- **Collapse** — text expand/collapse (“展开/收起”) for a paragraph, usually 3 or 5 lines, with the trigger at the lower left or right and a 4px gap once expanded.

## B. Needs a decision or more work

- **Dialog** — switching between level 1 and level 2 inside one dialog (same width, height anchored on the header). Needs an interaction and API design.
- **Notification, Toast service** — custom content through the service API. Needs a choice: render function or component.
- **Toast** — 72px top offset in the PC client, and placement inside dialogs or separate windows. Depends on the host; `toast.config({ top })` covers it for now.
- **Badge, Avatar** — 39-colour collaboration badge (2px white ring). Needs the 39-colour palette.
- **Badge** — icon badges and corner badges. The spec leaves colours to the scenario.
- **Avatar** — Japanese names should use the first character of the surname. The code cannot tell Japanese names from Chinese ones, so it uses the Chinese rule (last two characters).
- **Avatar** — five random avatars for anonymous external companies, a name tooltip on hover, and a member list from "+N". These can be composed today with `Tooltip` and the `more` event.
- **Loading** — illustration loading. Needs the 125×125 brand illustration animation asset.
- **Loading** — image loading placeholder: N200 fill, grey spinner, minimum 48, default 180×120. Build it into the image component when that exists.
- **Tabs** — overflow scrolling and the "more" dropdown, badges on tabs (including the fixed-width case), card tabs with add and close.
- **Drawer** — in the PC client, switch between overlay and push with the window size. The spec gives no breakpoint.
- **Drawer** — header tabs that overflow go into "more", opened on hover. Depends on the Tabs overflow work above.
- **Progress** — upload card layouts with captions and actions. These are business compositions, not part of the component.

## C. Remaining components (spec exists, not started)

20 components still to build. Do the small data-display ones first (Placeholder,
Empty, Timeline, Card), then the entry components that need dependency decisions
(dayjs for DatePicker / TimePicker, Zod for Form, TanStack Table for Table —
each still needs a yes before install).

- **data-entry**: Form, DatePicker, TimePicker, Upload, Cascader, TreeSelect, Transfer, Slider, Stepper, Rate, ColorPicker
- **data-display**: Table, Card, Empty, ImageViewer, Placeholder, Timeline
- **navigation**: Anchor, ScrollBar, NavigationMenu

Note: there is no `image.md` in `docs/design`; the Loading image-placeholder work
under Group B expects an image component. Check with the spec source before
building one.

## Environment

- pnpm 12.4.2 pinned by the repo ships a launcher without a shebang. On macOS `pnpm install` and `pnpm dev` fail with ENOEXEC. Run pnpm through `sh`, or run `vite` inside `playground/`.
