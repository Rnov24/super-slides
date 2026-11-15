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

### Phase 3: Modular Library Assembly & Layout Construction

1. Read `library/README.md` and `references/06-modular-library.md`.
2. Select one theme for the entire deck from `library/themes/` (`bold-signal`, `editorial-cream`, `ink-paper`, `apple-clean`).
3. Select one motion timing preset for the deck from `library/animations/crossfade.css` (`calm` or `brisk`).
4. For each narrative beat, select a locked component from `library/components/` matching the slide job in the selection matrix. Never invent unverified slide layouts.
5. Base output on `templates/deck-skeleton.html`:
   - Inject the selected theme token block into `:root`.
   - Apply the motion preset to `#deck-viewport` (`data-motion="calm"` or `"brisk"`).
   - Mount each selected component's `<section class="slide" data-layout="...">` and `<style>` block into `.deck-canvas`.
6. Replace illustrative sample copy with narrative beat sheet text. Enforce text economy (<= 40 body words per slide).
7. Opt-in micro-motion (`library/animations/micro-motion.css`): at most one pattern per slide; strictly forbidden on pole slides.
8. Embed vector diagrams using native inline SVGs following editorial diagram discipline (1px hairlines, single accent, no shadows).
9. Verify all assembled slides pass P0-P2 requirements (R-11 content span >= 65%, max internal gap <= 150px, zero ink overflow).

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
