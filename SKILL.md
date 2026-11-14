---
name: super-slides
description: Create zero-dependency, animation-rich, single-file HTML presentations with 16:9 scaling, inline SVG diagrams, and strict anti-slop rules.
---

# Super Slides

Author zero-dependency, animation-rich, single-file HTML presentations (`slides.html`) running entirely offline from `file://` or `http://localhost`.

Follow this strict 4-phase state machine. Do not skip phases or advance through human gates without explicit approval.

## The 4-Phase Generation Pipeline

```
[Phase 1: Narrative Scripting] -> GATE 1 (Human Sign-Off)
  -> [Phase 2: Visual Taste Discovery] -> GATE 2 (Human Sign-Off)
  -> [Phase 3: Component Assembly]
  -> [Phase 4: Anti-Slop Audit] -> GATE 4 (Delivery)
```

### Phase 1: Narrative Scripting & Story Spine

1. Read `references/01-narrative-scripting.md`.
2. Formulate audience persona, core thesis, and slide count budget (strictly 6 to 12 slides).
3. Follow the 6-stage narrative spine: Hook -> Problem -> Friction -> Architecture -> Proof -> Call to Action.
4. Enforce the 1-Takeaway Rule: each slide delivers exactly one unambiguous takeaway.
5. Produce the Beat Sheet outline table mapping slide number, title, takeaway, and layout archetype.
6. **GATE 1 (Mandatory Human Sign-Off)**: Present the Beat Sheet to the user. Stop and await explicit approval before writing any design tokens or markup.

### Phase 2: Visual Taste Discovery & Token Definition

1. Read `references/02-visual-taste.md`.
2. Present 3 visual directions with distinct typography, mood, and palette choices:
   - High-Contrast Editorial (Charter serif, warm cream surface, deep ink)
   - Modern Terminal Dark (Cascadia/JetBrains mono, deep space dark, cyan/amber telemetry)
   - Clean Humanist (Avenir Next/Inter sans, crisp light/dark neutral, vibrant accent)
3. Use only system font stacks. Never import Google Fonts or external CDN stylesheets.
4. Define semantic CSS variables: `--bg`, `--surface`, `--surface-border`, `--text`, `--text-muted`, `--accent`, `--accent-alt`.
5. Validate WCAG 4.5:1 contrast across all text elements to prevent projector washout.
6. Assign layout blueprints (`Layout-Hero`, `Layout-Split`, `Layout-Bento`, `Layout-Diagram`, `Layout-Quote`, `Layout-Comparison`) to slides.
7. **GATE 2 (Mandatory Human Sign-Off)**: Output the selected token block and layout plan. Stop and await approval before generating presentation code.

### Phase 3: Component Assembly & Layout Construction

1. Read `references/03-components-and-layouts.md` and `references/04-svg-diagram-primitives.md`.
2. Base the output on `templates/deck-skeleton.html` and theme values from `templates/tokens.css`.
3. Assemble slides within `#deck-viewport` and `.deck-canvas` using 16:9 matrix scaling (1920x1080 base).
4. Implement interactive components and layouts:
   - Micro-interaction markup: bento card hover lift, accessible tabbed panels (`role="tab"`, `aria-selected`).
   - Add `data-prevent-slide-swipe` to any horizontally scrollable container (code blocks, data tables).
   - Add `data-transition="cut"` to slides requiring instant cuts without horizontal push animation.
   - Embed vector diagrams using native inline SVGs on the standardized 1200x675 canvas with the 12-column grid (`padding = 56px`, `gap = 16px`, `columnWidth = 76px`, `x = 56 + col * 92`).
   - Use stepped reveals via `.fragment` nodes where progressive build adds clarity.
5. Do not introduce floating docks, control bars, or external script libraries.

### Phase 4: Anti-Slop Deck Audit & Quality Filter

1. Read `references/05-anti-slop-deck-audit.md`.
2. Execute the 9 anti-slop verification rules:
   - R-01 (Purpose Test): Every card, badge, and line serves a stated functional purpose.
   - R-02 (Icon Sanity): No decorative emojis or generic floating icons.
   - R-03 (Text Economy): No paragraphs over 3 lines; no bullet-point walls.
   - R-04 (Zero Network): 0 external `<link>` or `<script>` tags; 100% self-contained.
   - R-05 (Em-Dash Ban): No em-dashes in slide titles or body copy.
   - R-06 (Aspect Containment): 16:9 matrix scaling verified; zero vertical page scrollbars.
   - R-07 (Contrast Guarantee): All text meets or exceeds WCAG 4.5:1 contrast.
   - R-09 (Keyboard Navigation): Validate Arrow keys, Space, Backspace, Fullscreen (F), Overview (O), Shortcuts (?).
   - R-10 (Print Fidelity): `@media print` renders exactly one 1920x1080 page per slide.
3. Fix any rule violations before output.
4. **GATE 4 (Final Delivery)**: Deliver the standalone, validated `slides.html`.

## Core Invariants

- **Zero External Dependencies**: Single `.html` file with zero network calls.
- **Dual-Modality Isolation**: Macro navigation via keyboard/touch; micro interactivity via pointer inside slides.
- **Matrix Scaling**: Responsive letterboxing maintaining 16:9 canvas at all viewports.
