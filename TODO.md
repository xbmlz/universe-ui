# Backlog

Deferred work, collected per component. Finish the remaining components first, then come back here.
Group A has a clear spec and can be done directly. Group B needs a decision, assets, or is a feature of its own.

## A. Clear spec

- **Toast** — duration by text length. Spec ranges: 0–40 chars 3–5s, 40–80 chars 6–8s. Today it uses fixed defaults (4s, 6s with actions).
- **Notice** — show a Tooltip on the ellipsis when text is clamped. Reuse the `only-overflow` Tooltip that Radio uses.
- **Dialog** — adaptive width mode: width follows the viewport with a 180px gap on each side (specified default), clamped by min/max width.
- **Drawer** — header actions: show at most three, turn the third into a "more" button, and collect the rest in its menu. Today the `actions` slot renders whatever it gets.
- **Button, Select, Switch** — replace their hand-drawn spinners with `Spin`. Check each one's measured size still matches.
- **Tag** — the other 10 colours. Measure them from the Tag figures and add primitive tokens as needed (palette decision: "measure").
- **Tag** — status tags (with a status icon or dot).
- **Tag** — avatar tags. Avatar now exists.
- **Dropdown** — contextual menu. It opens beside the pointer, prefers right then down, and when the bottom runs out it aligns to the 16px page edge instead of the pointer.
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

## Environment

- pnpm 12.4.2 pinned by the repo ships a launcher without a shebang. On macOS `pnpm install` and `pnpm dev` fail with ENOEXEC. Run pnpm through `sh`, or run `vite` inside `playground/`.
