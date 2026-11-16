---
name: super-slides
description: Create zero-dependency, animation-rich, single-file HTML presentations with 16:9 scaling, inline SVG diagrams, and strict anti-slop rules.
---

# Super Slides

Author zero-dependency, animation-rich, single-file HTML presentations (`slides.html`) running entirely offline from `file://` or `http://localhost`.

## Execution Mode Detection

The generator selects its execution mode directly from the user's initial prompt:
- **Autonomous One-Shot Mode (Default)**: Active when the user requests a presentation, topic deck, or notes conversion directly. Executes Phase 0 through Phase 4 in a single turn without pausing for intermediate gates.
- **Interactive Co-Design Mode**: Active only when the user explicitly requests brainstorming, outline review, or step-by-step guidance. Pauses for confirmation at Gate 1 (Beat Sheet) and Gate 2 (Tokens/Layouts).

## The Generation Pipeline

```
[Phase 0: Distillation & Routing] -> [Phase 1: Narrative Scripting] -> [Gate 1*]
  -> [Phase 2: Visual Taste Discovery] -> [Gate 2*]
  -> [Phase 3: Modular Assembly]
  -> [Phase 4: Anti-Slop Audit] -> [Gate 4: Delivery]
  (*Gates 1 and 2 pause for human sign-off only in Interactive Co-Design Mode)
```

### Phase 0: Note-Distillation Protocol & Arc Routing

1. Distill raw notes into a single declarative thesis sentence.
2. Auto-calculate numerical deltas (differences, ratios, percentages) whenever raw data contains 2+ numbers.
3. Select ONE of 4 Narrative Arcs (see `references/01-narrative-scripting.md` for full stages):
   - **Algorithm Trace**: Hook -> Invariant -> Initial State -> Iterative Trace (Steps 1..N) -> Optimal State -> Complexity.
   - **Architecture Deep-Dive**: Bottleneck -> Failure Modes -> Architectural Shift -> Topology -> Data Flow -> Benchmarks.
   - **Concept Explainer**: Hook -> Definition -> Mechanism -> Parameter Comparison -> Practical Simulation -> Takeaway.
   - **Executive Pitch**: Hook -> Problem -> Friction -> Solution -> Proof -> CTA.
4. Enforce Mandatory Visual Escalation:
   - Chronology / stages: Never use bullet lists; escalate to `layouts/horizontal-track.html` or `layouts/split-canvas.html`.
   - Connected entities / networks: Escalate to inline SVG topology with state color coding (`diagrams/node-link-graph.html`).
   - 2+ metrics / numbers: Escalate to `layouts/pole-stat.html` (giant 220px+ numeral) or `diagrams/data-charts.html`.
   - Concept definitions: Escalate to formal invariant paired with counter-example (`diagrams/counter-example.html`).
5. Visual Rhythm & Pacing Director: Alternate pole/release slides (quiet, giant numeral or thesis) with dense analytical slides. Pole slides satisfy R-11 (vertical span >= 65%) via top+bottom spatial anchoring (title at y=72px, bottom chips at y=800-880px).
6. Zero-Jump Canvas Locking: For multi-step traces, title card position, SVG stage, and vertex coordinates must be 100% pixel-identical across step slides; `.locked-stage` is excluded from stagger animations; causal decision callout badges sit directly on the SVG canvas.

### Content-to-Visual Selection Matrix (Concise)

| Note Type / Slide Job | Preferred Layout (`library/layouts/`) | Preferred Diagram (`library/diagrams/`) | Pattern / Motion |
| :--- | :--- | :--- | :--- |
| Opening thesis, vision hook, closing pole | `pole-hero.html` | None (pure typography & anchors) | Forbidden on pole |
| Dominant headline metric, scale validation | `pole-stat.html` | None (220px+ figure + delta pill) | Forbidden on pole |
| Side-by-side trade-offs, 3-pillar pillars | `open-columns.html` | None (1px hairlines, no boxes) | `micro-stagger-group` |
| Ordered tenets, architecture principles | `numbered-rows.html` | None (01, 02 index numerals) | `micro-stagger-group` |
| State walkthrough, empirical case study | `split-canvas.html` | `node-link-graph.html` / anatomy | `path-draw`, `data-table` |
| Sequential pipeline, lifecycle stages | `horizontal-track.html` | `pipeline-flow.html` | `micro-connector-flow` |
| Telemetry curves, quadrant landscape | `full-diagram.html` | `data-charts.html` / `matrix-2x2.html` | `path-draw`, `bar-grow` |

### Phase 1: Narrative Scripting & Story Spine

1. Read `references/01-narrative-scripting.md`.
2. Formulate audience persona, core thesis, and slide count budget (strictly 6 to 12 slides).
3. Follow the selected narrative arc stages and the 1-Takeaway Rule (one declarative takeaway per slide).
4. Apply the Action Title Formula: `[Subject] + [Active Verb] + [Outcome]`.
5. Produce the Beat Sheet outline table mapping slide number, arc stage, action title, takeaway, layout/diagram, and rhythm role.
6. **Gate 1**: In Interactive Co-Design Mode, output the Beat Sheet and await human approval. In Autonomous One-Shot Mode, proceed directly to Phase 2.

### Phase 2: Visual Taste Discovery & Token Definition

1. Read `references/02-visual-taste.md`.
2. Propose or select visual direction using system font stacks or base64 fonts:
   - Modern Terminal Dark (`bold-signal`), Warm Pitch Editorial (`editorial-cream`), Serif Editorial (`ink-paper`), Swiss Clean Neutral (`apple-clean`).
3. Define semantic CSS variables: `--bg`, `--surface`, `--surface-border`, `--text`, `--text-muted`, `--accent`, `--accent-ink`, `--accent-on`, `--state-*`.
4. Validate WCAG 4.5:1 contrast across all text elements to prevent projector washout.
5. Map layouts, diagrams, and patterns to narrative beats.
6. **Gate 2**: In Interactive Co-Design Mode, output selected tokens and layout plan, and await approval. In Autonomous One-Shot Mode, proceed directly to Phase 3.

### Phase 3: Modular Assembly & Layout Construction

1. Read `library/README.md`.
2. Base output on `templates/deck-skeleton.html`.
3. Inline required base64 font snippets from `library/fonts/` into `<!-- FONTS: ... -->` as specified by the chosen theme header:
   - `bold-signal.css` requires `archivo-black.css` and `space-grotesk.css`.
   - `editorial-cream.css` requires `sora.css` and `dm-sans.css`.
   - `ink-paper.css` and `apple-clean.css` use native system font stacks.
4. Inject selected theme tokens into `:root` and set motion preset on `#deck-viewport` (`data-motion="calm"` or `"brisk"`).
5. Mount selected layout `<section class="slide" data-layout="...">` blocks into `.deck-canvas`.
6. Embed inline SVG diagram archetypes from `library/diagrams/` and optional CSS patterns from `library/patterns/`.
7. Enforce Zero-Jump Canvas Locking and Causal Decision Badges on multi-step walkthroughs (`split-canvas.html`).
8. Replace sample copy with beat content. Enforce R-15: narrative prose paragraphs <= 40 words per slide. Data table cells and SVG labels are excluded from the 40-word limit (governed by 18px font floor).
9. Opt-in state motion (`library/animations/state-motion.css`): at most one pattern per slide; strictly forbidden on pole slides.
10. Verify all assembled slides pass P0-P2 requirements (R-11 content span >= 65%, max internal gap <= 150px, zero ink overflow).

### Phase 4: Anti-Slop Deck Audit & Quality Filter

1. Read `references/04-anti-slop-audit.md`.
2. Execute the anti-slop verification rules:
   - R-01 (Purpose Test), R-02 (Icon Sanity), R-03 (Text Economy), R-04 (Zero Network), R-05 (Em-Dash Ban), R-06 (Aspect Containment), R-07 (Contrast Guarantee >= 4.5:1), R-09 (Keyboard Navigation), R-10 (Print Fidelity), R-11 (Vertical Fill >= 65%, Gap <= 150px), R-14 (Layout Variety with Walkthrough Exception), R-15 (Prose Limit <= 40 words), R-16 (18px Floor), R-17 (Stage Integrity flex-shrink: 0).
3. Fix any rule violations before output.
4. **Gate 4 (Final Delivery)**: Deliver the standalone, validated `slides.html`.

## Core Invariants

- **Zero External Dependencies**: Single `.html` file with zero network calls; fonts base64-embedded.
- **Dual-Modality Isolation**: Macro navigation via keyboard/touch; micro interactivity via pointer inside slides.
- **Matrix Scaling**: Responsive letterboxing maintaining 16:9 canvas at all viewports.
- **Zero Em-Dashes**: No em-dashes in slide titles, body copy, diagram labels, or code.
