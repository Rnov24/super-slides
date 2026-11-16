# Phase 4: Anti-Slop Deck Audit Playbook

This playbook defines the 15 quality gate checks for Phase 4 of `super-slides`.

> R-08 (Speaker Notes Complete) was removed per author decision 2026-11-15, leaving 15 active rules (R-01 through R-07, R-09 through R-16).

Run every rule against the generated `slides.html` before delivering it. Fix any violation before Gate 4 delivery.

---

## R-01: Purpose Test

**Trigger:** Any badge, decorative icon, glassmorphic card, visual flourish, or line of text that cannot be tied to a specific informational or persuasive purpose in the narrative outline.

**Check:** For every visual element, ask: "What would the audience lose if this were removed?" If the answer is "nothing," remove it.

**Correction:** Delete the decorative element. Replace floating accent shapes, background gradients-for-gradients'-sake, and purely cosmetic dividers with meaningful whitespace or purposeful layout structure.

---

## R-02: Icon Sanity

**Trigger:** Decorative emojis (rocket ships, light bulbs, brains, trophy cups, magnifying glasses) or generic SVG icons with no semantic relationship to the slide's core concept.

**Check:** Grep the HTML output for emoji character ranges and `<svg>` elements that render universal stock symbols. Each icon must map to a specific entity, action, or metric named in the slide content.

**Correction:** Remove all decorative icons. Replace with inline SVG diagrams (see `references/04-svg-diagram-primitives.md`) or meaningful typographic hierarchy. If an icon is truly necessary, use a semantic `<title>` on the SVG and ensure it represents a named real-world component or action.

---

## R-03: Text Economy

**Trigger:** Any `<p>` block exceeding 3 lines of text at standard deck font sizes, or any slide with more than 5 discrete bullet-point list items.

**Check:** Measure every text block by visual line count at 1920x1080. Flag bullet lists with 6 or more items and paragraph blocks that wrap beyond 3 lines.

**Correction:** Split overstuffed slides into two slides (the narrative budget allows up to 12 slides). Distill bullet walls into 2 to 3 high-impact statements. Move supporting detail to a diagram or omit it entirely; the presenter voice delivers the nuance, not the slide copy.

---

## R-04: Zero Network

**Trigger:** Any `<link rel="stylesheet">`, `<link rel="preconnect">`, `<script src="...">`, `<img src="https://...">`, `@font-face` rule pointing to a remote URL, or any external URL in CSS `url()` values.

**Check:** Parse the HTML file. Assert that every `<link>` and `<script>` element is either (a) absent or (b) has a `src`/`href` pointing to a relative local path. Assert that no CSS contains `url(http` or `url(https`. Run `grep -E '(https?://)' slides.html` and confirm zero matches. Base64 font data URIs (`url(data:font/woff2;base64,...)`) are permitted and encouraged.

**Correction:** Replace CDN font imports with embedded base64 `@font-face` woff2 definitions or approved system font stacks. Replace CDN library scripts with the inline `DeckEngine` runtime. Encode any required small assets (logos under 15 KB) as base64 data URIs.

---

## R-05: Em-Dash Ban

**Trigger:** An em-dash character (`—`, Unicode U+2014) appearing in any slide title (`<h1>`, `<h2>`, `<h3>`), subtitle, or body copy paragraph.

**Check:** Run `grep -c $'\xe2\x80\x94' slides.html`. The count must be zero.

**Correction:** Rewrite the affected headline or sentence without an em-dash. Use a period, a colon, or restructure the sentence into two shorter clauses. Em-dashes in slide copy are a reliable signal of AI-generated filler prose.

---

## R-06: Aspect Containment

**Trigger:** Any viewport width or height setting that breaks the 16:9 letterbox constraint, or any slide that introduces a vertical scrollbar when the browser window is resized.

**Check:** Inspect the CSS for `.deck-canvas` and `.deck-viewport`. Confirm the base canvas dimensions are `1920px` by `1080px`. Confirm that `--deck-scale` is computed as `min(innerWidth / 1920, innerHeight / 1080)` and applied as `transform: scale(var(--deck-scale))`. Resize the browser window between ultra-wide (21:9), standard (16:9), laptop (16:10), and 4:3 aspect ratios and confirm zero vertical scrollbars appear.

**Correction:** Remove any `height: auto` or `overflow: visible` from `.deck-canvas` in the interactive presentation view (those rules exist only in `@media print`). Confirm the outer viewport is `position: fixed; inset: 0; overflow: hidden`.

---

## R-07: Contrast Guarantee

**Trigger:** Any text element with a computed contrast ratio below 4.5:1 against its immediate background container, including text inside bento cards, SVG `<text>` nodes, comparison column headers, and kicker tags.

**Check:** Use the WCAG relative luminance formula to verify contrast for every distinct text color / background color pair used in the deck:
- `--text` on `--bg`
- `--text` on `--surface`
- `--text-muted` on `--surface`
- `--accent` text on `--bg` or `--surface`
- Any inverted text on `--accent` backgrounds

**Correction:** Darken text tokens or lighten background tokens until the 4.5:1 floor is met. For accent-colored text, prefer using the full accent on a neutral surface rather than the muted variant. Never compensate by increasing font size alone (the 4.5:1 threshold applies at all sizes in slide presentation context).

---

## R-09: Keyboard Navigation

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

## R-10: Print Fidelity

**Trigger:** Printing to PDF (`Ctrl+P` / `Cmd+P`) produces slides of incorrect dimensions, includes the shortcut HUD, includes navigation chrome, or causes slides to merge or split across pages.

**Check:** Trigger print preview and confirm:
- Each `<section class="slide">` renders as exactly one `1920px × 1080px` page.
- The `#shortcut-hud`, `#deck-announcer`, and any overview overlays are hidden (`display: none !important`).
- Fragment elements (`.fragment`) render at full opacity regardless of revealed state.
- No horizontal or vertical scroll clipping cuts off slide content.
- Ensure off-canvas slide hiding rules (`position: absolute`, `transform`, `visibility: hidden`) are cleanly reset in print media CSS.

**Correction:** Confirm the `@media print` block from the spec is present verbatim. Confirm the `@page` rule specifies `size: 1920px 1080px; margin: 0`. Confirm `.slide` carries `page-break-after: always !important; break-after: page !important` within the print block.

---

## R-11: Content-Span and Distribution Audit (≥65% Span, No Overflow, No Internal Void)

**Trigger:** Any slide that violates any of the three distribution rules:
1. **Overflow (Check A)**: Any visible text ink extends beyond the 1920×1080 stage boundaries (right edge > 1920px or bottom edge > 1080px). Measure TEXT INK with `Range.getBoundingClientRect()`, not element boxes: a numeral can overflow its own column box while the box itself stays inside the stage.
2. **Internal Void (Check B)**: In a stacked content flow (rows, sequence tracks, comparison lists, metrics rows, problem blocks), the vertical gap between consecutive visible content elements exceeds 150px, creating a chasm of dead space.
3. **Span Deficit (Check C)**: The visible content span — measured from the top of the kicker to the bottom of the last content element, excluding the deck footer — occupies less than 65% of the 1080px canvas height (< 702px).

**Scope of Check B:** Check B does NOT apply to pole layouts (hero, closing, quote, split), where the gap between the pole headline and the bottom-anchored element is the design itself, nor to terminal/code boxes, where the box (not its centered text) fills the space. Apply B only where content is meant to flow continuously.

**Check:** Measure in headless Chromium at the 1920×1080 stage with fragments revealed:
- **Check A (No Overflow)**: For every visible text element, select its contents with a Range and assert the ink rect lies inside the stage (`right <= 1920`, `bottom <= 1080`).
- **Check B (No Internal Void)**: In stacked flows only, collect visible leaf content elements (direct text nodes, SVGs, code terminals, rule dividers; excluding `.deck-footer`), sorted by top edge. Assert `maxInternalGap <= 150px`.
- **Check C (Content Span ≥ 65%)**: Compute `span = maxBottom - minTop` of content elements. Assert `span / 1080 >= 0.65` (≥ 702px).

**Correction:**
- **Avoid naive `space-between` voids**: Using `justify-content: space-between` across only two or three sparse groups pushes elements to the absolute canvas poles, creating empty internal voids (> 150px). Instead, group related elements into unified content blocks and distribute with balanced, moderate spacing (e.g., 40px to 96px).
- **Scale typography and track height**: Scale display typography up (hero titles ~120-150px, giant figures ~240-280px, metric numerals ~180-200px, sequence numbers ~100-112px, row titles ~40-44px). Increase track heights and row paddings so content naturally spans ≥ 65% of the canvas height.
- **Tighten multi-column widths**: In three-column layouts, ensure numerals and column containers leave comfortable margins on left and right borders without clipping.
- **Scale diagrams**: Full-bleed SVG diagrams must occupy ~80% of canvas area with large, legible text nodes (20px+). Never float small 40% SVGs in empty canvases.
- **Never add filler copy**: Never compensate for vertical space by adding filler sentences, extra bullets, or decorative card boxes. Scale and distribute.

---

## R-12: Flat-Background Check

**Trigger:** A slide canvas using a flat, uniform solid color fill without environmental depth, gradients, subtle lighting washes, or texture.

**Check:** Inspect the CSS background for `.deck-canvas` and the slide container. It must declare a layered radial or linear gradient, a fine geometric grid, a dot-matrix texture, or a warm tactile paper wash.

**Correction:** Add atmospheric radial lighting or subtle hairline grids (e.g. `radial-gradient(circle at 75% 25%, #2a2c35 0%, #13141a 50%, #0a0d12 100%)`). Never render content floating on flat, lifeless black or white.

---

## R-13: Action-Title Check

**Trigger:** Slide titles formatted as generic topic labels (such as "Overview", "Architecture", "The Problem", "System Metrics", "Comparison", or "Next Steps") rather than conclusion-led thesis statements.

**Check:** Read each `<h1>` and `<h2>` across all slides. Every title must communicate the key conclusion or takeaway of the slide in complete, decisive language.

**Correction:** Rewrite topic labels into action titles. For example, replace "System Metrics" with "Direct GPU Compositing Sustains 60 FPS Under Peak Load", or replace "The Problem" with "Three Architectural Bottlenecks Break AI Presentation Decks".

---

## R-14: Layout Variety Check

**Trigger:** More than one card grid in a presentation deck, or any two consecutive slides sharing the same structural layout without an algorithm walkthrough exception.

**Check:** Enumerate the structural layout type of each slide in the deck (`data-layout` attributes). Count how many slides use a card grid (max 1 allowed). Verify that no two consecutive slides share the same layout pattern, except when sequential slides illustrate multi-step state transitions.

**Exception:** Consecutive slides MAY use the same `data-layout="state-walkthrough"` when describing sequential steps of a single algorithm or state machine (e.g. Step 01 through Step 04 of a consensus round). This preserves pixel-locked stage continuity while table evaluations and state transitions progress without visual jumps.

**Correction:** Rebuild repetitive slides using alternative structural frames: Hero statements with proof phrase rows, full-width numbered feature rows, two-column split comparisons with center rules, horizontal step sequences (01→04) joined by rules, full-bleed diagrams without container cards, full-bleed code terminals, or standalone three-column metric rows on open field.

---

## R-15: Copy Budget Check

**Scope:** The 40-word budget applies strictly to prose narrative paragraphs (support sentences, lead explanations, and body copy blocks). Structured data table cells, tabular metrics, and inline SVG diagram labels are excluded from the prose word count; they are evaluated separately under projector legibility standards (minimum 18px font size for all data cells and diagram labels).

**Trigger:** Any slide containing more than 40 words of prose narrative body copy (titles, kickers, slide numbers, data table cells, and diagram labels excluded), or any body copy paragraph exceeding two lines at 1920x1080.

**Check:** Measure prose narrative body copy words per slide. Measure line count of all paragraph blocks. Verify that data table cells and diagram labels maintain the 18px minimum font size for low-contrast projector legibility.

**Correction:** Cut prose copy ruthlessly. Distill sentences into high-impact clauses. If narrative explanation exceeds 40 prose words, move structured values into data tables, split the slide, or let the spoken presenter voice carry the nuance.

---

## R-16: Projector Legibility Check

**Trigger:** Any Didone display typeface (such as Bodoni, Playfair, Didot) with extreme thick-to-thin stroke contrast used for headers or titles.

**Check:** Inspect embedded `@font-face` definitions and `--font-display` CSS variables. Render slide titles at 1280px viewport width and verify that no hairline strokes disappear or become unreadable.

**Correction:** Replace Didone faces with sturdy, consistent-weight geometric or grotesque display fonts: `Archivo Black`, `Sora 700`, `Space Grotesk`, or `Syne`. Confirm headers remain legible under low-contrast projector environments.

## R-17: Stage Integrity Check (No Flex Shrink)

**Trigger:** The 1920×1080 stage renders narrower than 16:9 at any viewport below 1920px wide (squished layout, black bars left and right, text columns clipping at the stage edge).

**Check:** `#deck-viewport` is `display: flex`, and a flex item shrinks by default. Assert the `.deck-canvas` rule contains `flex-shrink: 0`. Then render at a 1280×720 viewport and assert the canvas bounding box has the 16:9 aspect (`width / height ≈ 1.78`) and fills the viewport height.

**Correction:** Add `flex-shrink: 0` to `.deck-canvas`. Never size the stage with a percentage width or let the flex container shrink it; the matrix scale (`--deck-scale`) is the only mechanism that adapts the stage to the viewport.
