# Super-Slides Modular Library

A zero-network, tokenized layout, diagram, and theme library for building offline-first 16:9 presentation decks.

This library replaces monolithic layout boxes with unboxed spatial layouts (`library/layouts/`), high-precision inline SVG diagram archetypes (`library/diagrams/`), reusable CSS micro-patterns (`library/patterns/`), state motion primitives (`library/animations/`), and embedded base64 fonts (`library/fonts/`).

---

## 1. Quick Mapping Index: Note Type -> Layout + Diagram + Animation

| Raw Note Type | Spatial Layout (`library/layouts/`) | Inline Diagram (`library/diagrams/`) | Pattern / Motion Primitive |
| :--- | :--- | :--- | :--- |
| Opening thesis, vision hook, closing pole | `pole-hero.html` | None (pure typography & anchors) | Forbidden on pole |
| Headline metric, scale validation | `pole-stat.html` | None (220px+ figure + delta pill) | Forbidden on pole |
| Side-by-side trade-offs, 3-pillar pillars | `open-columns.html` | None (1px hairlines, no boxes) | `micro-stagger-group` |
| Ordered tenets, architecture principles | `numbered-rows.html` | None (01, 02 index numerals) | `micro-stagger-group` |
| Multi-step state trace, empirical case study | `split-canvas.html` | `node-link-graph.html` / anatomy | `path-draw`, `data-table.css` |
| Sequential pipeline, processing lifecycle | `horizontal-track.html` | `pipeline-flow.html` | `micro-connector-flow` |
| Telemetry curves, quadrant positioning | `full-diagram.html` | `data-charts.html` / `matrix-2x2.html` | `path-draw`, `bar-grow` |
| Invariant rule with counter-example | `split-canvas.html` | `counter-example.html` | `callout-strip.css` |

---

## 2. Complete Layout and Diagram Catalog

### The 7 Spatial Layouts (`library/layouts/`)
1. `pole-hero.html`: Open-field opening and closing pole slide; bold thesis with generous breathing room and bottom spatial anchoring.
2. `pole-stat.html`: Giant number (220px+) paired with a sharp, unambiguous causal thesis and baseline delta chip.
3. `open-columns.html`: 2 or 3 open columns separated by 1px vertical hairlines without card boxes.
4. `numbered-rows.html`: Full-width vertical stacked rows with large index numerals (01, 02, 03) and right-aligned telemetry pills.
5. `split-canvas.html`: Asymmetrical 40/60 or 35/65 division; supports `data-locked-stage` for zero-jump state traces.
6. `horizontal-track.html`: Linear 3 to 4 stage pipeline sequence joined by horizontal connector arrows.
7. `full-diagram.html`: Concise header plus 75% screen height dedicated exclusively to an inline SVG stage.

### The 7 High-Precision SVG Diagram Archetypes (`library/diagrams/`)
1. `node-link-graph.html`: Network and tree topology graph with 4 state classes (`.state-idle`, `.state-candidate`, `.state-active`, `.state-committed`, `.state-rejected`).
2. `data-charts.html`: Dual-panel quantitative comparison featuring categorical bar delta benchmarks and telemetry latency curves.
3. `mechanism-anatomy.html`: Central engine architecture block with orthogonal elbow connectors (r=8) and peripheral callout pills.
4. `counter-example.html`: Dual-panel comparative diagram contrasting a Valid Invariant against an Invalid Counter-Case.
5. `pipeline-flow.html`: Multi-stage sequential stream processing flow with travelling dots animation.
6. `architecture-stack.html`: Four-tier vertical architectural system stack with labeled boundary interfaces.
7. `matrix-2x2.html`: Four-quadrant strategic positioning landscape on coordinate axes with 1 highlighted target quadrant.

### The 3 CSS Micro-Patterns (`library/patterns/`)
1. `accent-focal-block.css`: Single full-bleed accent-colored block (`var(--accent)` with `var(--accent-on)` text); max 1 per deck.
2. `data-table.css`: Projector-optimized table with >= 20px font floor, tabular numbers, and total/delta summary rows.
3. `callout-strip.css`: Strategic conclusion or operational SLA banner strip with a solid accent border.

---

## 3. Theme Picker & Font Requirements

Themes define semantic tokens only. Decks select exactly ONE theme across all slides. The theme header specifies the required font files in `library/fonts/`:

- `bold-signal.css` (Dark Engineering):
  - Required Fonts: `archivo-black.css`, `space-grotesk.css`
  - Canvas: `#0a0d12` (dark radial gradient), white ink, focal orange accent (`#FF5722`), cyan secondary (`#38bdf8`).
- `editorial-cream.css` (Executive Pitch & Strategic Review):
  - Required Fonts: `sora.css`, `dm-sans.css`
  - Canvas: `#f8f6f1` (warm cream paper), charcoal ink, terracotta accent (`#b33927`), pine secondary (`#2b5c54`).
- `ink-paper.css` (Classical Academic & Research):
  - Required Fonts: none (uses native system serif stack: Charter, Georgia, serif).
  - Canvas: `#f5f4ed` (parchment), carbon ink, single ink-blue accent (`#1b365d`).
- `apple-clean.css` (Minimalist Swiss Precision):
  - Required Fonts: none (uses native system font stack: -apple-system, SF Pro).
  - Canvas: `#fbfbfd` (clean neutral), graphite ink, signature blue accent (`#0A84FF`).

---

## 4. Animation & Motion Model Picker

Motion timing is defined deck-wide in `library/animations/crossfade.css`:
- `calm` (`data-motion="calm"`): ~450ms total transition. Best for executive reviews, formal board decks, and bright projector displays.
- `brisk` (`data-motion="brisk"`): ~240ms total transition. Best for rapid walkthroughs, technical demos, and interactive reviews.

### State Motion Primitives (`library/animations/state-motion.css`)
- **5 Micro-Primitives**:
  1. `path-draw`: Stroke drawing animation with `pathLength="100"`.
  2. `bar-grow`: Quantitative vertical bar growth from bottom.
  3. `node-beacon`: Concentric ripple ring pulsing on active nodes.
  4. `focus-dim`: Dims non-focal elements to 25% opacity.
  5. `stagger`: Smooth fade-up (10px / 40ms) on `.stagger-item`.
- **4 Micro-Motion Patterns**:
  1. Staggered fade-up group (`.micro-stagger-group`).
  2. Vertical telemetry ticker (`.micro-ticker`).
  3. Animated SVG travelling dots (`.micro-connector-flow`).
  4. Horizontal marquee ribbon (`.micro-marquee`).
- **5 State Classes**:
  `.state-idle`, `.state-candidate`, `.state-active`, `.state-committed`, `.state-rejected`.
- **Rules**:
  - Maximum ONE micro-motion pattern per slide.
  - Strictly forbidden on pole slides (`layouts/pole-hero.html`, `layouts/pole-stat.html`).
  - Full `@media (prefers-reduced-motion: reduce)` fallback required.

---

## 5. The Six Architectural Invariants

1. **Zero Box Prison**: Never enclose content inside card boxes. Content sits openly on the canvas, delineated by 1px hairlines.
2. **One Theme Per Deck**: The chosen theme tokens apply across all slides. Never switch themes between slides.
3. **One Motion Timing Per Deck**: Animation preset (`calm` or `brisk`) is applied to `#deck-viewport`.
4. **Token References Only**: Components contain zero hardcoded colors or fonts. All styles reference `var(--*)`.
5. **R-11 Distribution Compliance**: Every slide must satisfy vertical content span >= 65%, internal gaps <= 150px, and zero stage ink overflow.
6. **Zero External Dependencies**: Standalone single-file HTML execution offline with zero external network requests.

---

## 6. Architectural Decision: Rejection of View Transitions API

- **Decision**: The super-slides motion engine strictly retains its custom zero-dependency asynchronous crossfade model with scale settle.
- **Evaluation**: The browser-native CSS View Transitions API was evaluated. While it provides element morphing in modern Chromium, it introduces non-standard behavior when loaded from `file://` offline protocols, breaks cross-browser consistency in self-contained single-file decks, and fails to handle dual-modality touch-pointer events cleanly.
- **Outcome**: The View Transitions API is explicitly rejected. All transitions remain offline-compatible via standard CSS opacity and transform transitions.
