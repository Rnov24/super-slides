# Phase 4: Anti-Slop Deck Audit Playbook

This playbook defines the 9 quality gate checks for Phase 4 of `super-slides`.

> R-08 (Speaker Notes Complete) was removed per author decision 2026-11-15, leaving 9 rules (R-01 through R-07, R-09, R-10).

Run every rule against the generated `slides.html` before delivering it. Fix any violation before Gate 4 delivery.

---

## R-01 — Purpose Test

**Trigger:** Any badge, decorative icon, glassmorphic card, visual flourish, or line of text that cannot be tied to a specific informational or persuasive purpose in the narrative outline.

**Check:** For every visual element, ask: "What would the audience lose if this were removed?" If the answer is "nothing," remove it.

**Correction:** Delete the decorative element. Replace floating accent shapes, background gradients-for-gradients'-sake, and purely cosmetic dividers with meaningful whitespace or purposeful layout structure.

---

## R-02 — Icon Sanity

**Trigger:** Decorative emojis (rocket ships, light bulbs, brains, trophy cups, magnifying glasses) or generic SVG icons with no semantic relationship to the slide's core concept.

**Check:** Grep the HTML output for emoji character ranges and `<svg>` elements that render universal stock symbols. Each icon must map to a specific entity, action, or metric named in the slide content.

**Correction:** Remove all decorative icons. Replace with inline SVG diagrams (see `references/04-svg-diagram-primitives.md`) or meaningful typographic hierarchy. If an icon is truly necessary, use a semantic `<title>` on the SVG and ensure it represents a named real-world component or action.

---

## R-03 — Text Economy

**Trigger:** Any `<p>` block exceeding 3 lines of text at standard deck font sizes, or any slide with more than 5 discrete bullet-point list items.

**Check:** Measure every text block by visual line count at 1920x1080. Flag bullet lists with 6 or more items and paragraph blocks that wrap beyond 3 lines.

**Correction:** Split overstuffed slides into two slides (the narrative budget allows up to 12 slides). Distill bullet walls into 2 to 3 high-impact statements. Move supporting detail to a diagram or omit it entirely; the presenter voice delivers the nuance, not the slide copy.

---

## R-04 — Zero Network

**Trigger:** Any `<link rel="stylesheet">`, `<link rel="preconnect">`, `<script src="...">`, `<img src="https://...">`, `@font-face` rule pointing to a remote URL, or any external URL in CSS `url()` values.

**Check:** Parse the HTML file. Assert that every `<link>` and `<script>` element is either (a) absent or (b) has a `src`/`href` pointing to a relative local path. Assert that no CSS contains `url(http` or `url(https`. Run `grep -E '(https?://)' slides.html` and confirm zero matches.

**Correction:** Replace CDN font imports with the approved system font stacks from `references/02-visual-taste.md`. Replace CDN library scripts with the inline `DeckEngine` runtime. Encode any required small assets (logos under 15 KB) as base64 data URIs.

---

## R-05 — Em-Dash Ban

**Trigger:** An em-dash character (`—`, Unicode U+2014) appearing in any slide title (`<h1>`, `<h2>`, `<h3>`), subtitle, or body copy paragraph.

**Check:** Run `grep -c $'\xe2\x80\x94' slides.html`. The count must be zero.

**Correction:** Rewrite the affected headline or sentence without an em-dash. Use a period, a colon, or restructure the sentence into two shorter clauses. Em-dashes in slide copy are a reliable signal of AI-generated filler prose.

---

## R-06 — Aspect Containment

**Trigger:** Any viewport width or height setting that breaks the 16:9 letterbox constraint, or any slide that introduces a vertical scrollbar when the browser window is resized.

**Check:** Inspect the CSS for `.deck-canvas` and `.deck-viewport`. Confirm the base canvas dimensions are `1920px` by `1080px`. Confirm that `--deck-scale` is computed as `min(innerWidth / 1920, innerHeight / 1080)` and applied as `transform: scale(var(--deck-scale))`. Resize the browser window between ultra-wide (21:9), standard (16:9), laptop (16:10), and 4:3 aspect ratios and confirm zero vertical scrollbars appear.

**Correction:** Remove any `height: auto` or `overflow: visible` from `.deck-canvas` in the interactive presentation view (those rules exist only in `@media print`). Confirm the outer viewport is `position: fixed; inset: 0; overflow: hidden`.

---

## R-07 — Contrast Guarantee

**Trigger:** Any text element with a computed contrast ratio below 4.5:1 against its immediate background container, including text inside bento cards, SVG `<text>` nodes, comparison column headers, and kicker tags.

**Check:** Use the WCAG relative luminance formula to verify contrast for every distinct text color / background color pair used in the deck:
- `--text` on `--bg`
- `--text` on `--surface`
- `--text-muted` on `--surface`
- `--accent` text on `--bg` or `--surface`
- Any inverted text on `--accent` backgrounds

**Correction:** Darken text tokens or lighten background tokens until the 4.5:1 floor is met. For accent-colored text, prefer using the full accent on a neutral surface rather than the muted variant. Never compensate by increasing font size alone (the 4.5:1 threshold applies at all sizes in slide presentation context).

---

## R-09 — Keyboard Navigation

**Trigger:** Any keyboard shortcut listed in the README or shortcut HUD that does not function correctly during a live walkthrough.

**Check:** Manually verify or audit the `DeckEngine` source for each binding:
- `ArrowRight` / `Space` / `PageDown`: advance fragment or slide forward
- `ArrowLeft` / `Backspace` / `PageUp`: reverse fragment or slide backward
- `Home`: jump to slide 1
- `End`: jump to final slide
- `F`: toggle fullscreen via `requestFullscreen()`
- `O`: toggle `body.overview-mode`
- `?`: toggle `#shortcut-hud` visibility

Also verify that none of these bindings fire when the focus is inside `input`, `textarea`, or `[contenteditable]`.

**Correction:** Confirm the event listener uses `{ capture: true }` on the `window` and contains the editable-target guard: `if (e.target.closest('input, textarea, [contenteditable]')) return;`

---

## R-10 — Print Fidelity

**Trigger:** Printing to PDF (`Ctrl+P` / `Cmd+P`) produces slides of incorrect dimensions, includes the shortcut HUD, includes navigation chrome, or causes slides to merge or split across pages.

**Check:** Trigger print preview and confirm:
- Each `<section class="slide">` renders as exactly one `1920px × 1080px` page.
- The `#shortcut-hud`, `#deck-announcer`, and any overview overlays are hidden (`display: none !important`).
- Fragment elements (`.fragment`) render at full opacity regardless of revealed state.
- No horizontal or vertical scroll clipping cuts off slide content.

**Correction:** Confirm the `@media print` block from the spec is present verbatim. Confirm the `@page` rule specifies `size: 1920px 1080px; margin: 0`. Confirm `.slide` carries `page-break-after: always !important; break-after: page !important` within the print block.
