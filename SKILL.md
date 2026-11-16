---
name: super-slides
description: Create zero-dependency, animation-rich, single-file HTML presentations with 16:9 scaling, inline SVG diagrams, and strict anti-slop rules.
---

# Super Slides

Author zero-dependency, animation-rich, single-file HTML presentations (`slides.html`) running entirely offline from `file://` or `http://localhost`.

## Execution Mode Detection

The generator selects its execution mode directly from the user's initial prompt:
- **Autonomous One-Shot Mode (Default)**: Active when the user directly requests a presentation, topic deck, or notes conversion. Executes Phase 0 through Phase 4 in a single turn without pausing for intermediate gates.
- **Interactive Co-Design Mode**: Active only when the user explicitly asks for brainstorming, outline review, or step-by-step guidance. Pauses for confirmation at Gate 1 (Beat Sheet) and Gate 2 (Tokens/Layouts).

## The Generation Pipeline

```
[Phase 0: Routing & Escalation] -> [Phase 1: Narrative Scripting] -> [Gate 1*]
  -> [Phase 2: Visual Taste Discovery] -> [Gate 2*]
  -> [Phase 3: Component Assembly]
  -> [Phase 4: Anti-Slop Audit] -> [Gate 4: Delivery]
  (*Gates 1 and 2 pause for human sign-off only in Interactive Co-Design Mode)
```

### Phase 0: Raw Notes Distillation & Content-Type Routing

1. Distill raw notes into a single declarative thesis sentence.
2. Auto-calculate numerical deltas (differences, ratios, percentages) whenever raw data contains 2+ numbers.
3. Select ONE of 4 Narrative Arcs (see `references/01-narrative-scripting.md` for full stages and component maps):
   - **Algorithm Trace**: Hook -> Invariant -> Initial State -> Iterative Trace (Steps 1..N) -> Optimal State -> Complexity.
   - **Architecture Deep-Dive**: Bottleneck -> Failure Modes -> Architectural Shift -> Topology -> Data Flow -> Benchmarks.
   - **Concept Explainer**: Hook -> Definition -> Mechanism -> Parameter Comparison -> Practical Simulation -> Takeaway.
   - **Executive Pitch**: Hook -> Problem -> Friction -> Solution -> Proof -> CTA.
4. Enforce Mandatory Visual Escalation:
   - Chronology / stages: Never use bullet lists; escalate to Horizontal Pipeline (`flow-sequence.html`) or Step State Diagram (`state-walkthrough.html`).
   - Connected entities / networks: Escalate to inline SVG topology with state color coding (`state-walkthrough.html`, `split-media.html`).
   - 2+ metrics / numbers: Escalate to Giant Tabular Numerals 180px+ (`open-metrics.html`, `big-number.html`) or SVG Chart (`data-proof.html`).
   - Concept definitions: Escalate to formal invariant paired with Visual Counter-Example (`concept-visual.html`).
5. Visual Rhythm & Pacing Director: Alternate pole/release slides (quiet, giant numeral or single sharp thesis) with dense analytical slides (SVG schemas, tables, traces). Pole slides satisfy R-11 (vertical span >= 65%) via top+bottom spatial anchoring (title at y=72px, bottom context/proof chips at y=800-880px).
6. Interactive Explainability & Zero-Jump Canvas Locking: For multi-step walkthroughs, title card position, SVG stage, and vertex coordinates must be 100% pixel-identical across step slides; `.locked-stage` is excluded from stagger animations; Causal Decision Callout Badges sit directly on SVG edges/nodes.

### Phase 1: Narrative Scripting & Story Spine

1. Read `references/01-narrative-scripting.md`.
2. Formulate audience persona, core thesis, and slide count budget (strictly 6 to 12 slides).
3. Follow the selected narrative arc stages and the 1-Takeaway Rule (one declarative takeaway per slide).
4. Produce the Beat Sheet outline table mapping slide number, arc stage, title, takeaway, assigned layout, and rhythm role.
5. **Gate 1**: In Interactive Co-Design Mode, output the Beat Sheet and await human approval. In Autonomous One-Shot Mode, proceed directly to Phase 2.

### Phase 2: Visual Taste Discovery & Token Definition

1. Read `references/02-visual-taste.md`.
2. Propose or select visual direction using system font stacks and semantic palettes:
   - Modern Terminal Dark (`bold-signal`), Warm Pitch Editorial (`editorial-cream`), Serif Editorial (`ink-paper`), Swiss Clean Neutral (`apple-clean`).
3. Define semantic CSS variables: `--bg`, `--surface`, `--surface-border`, `--text`, `--text-muted`, `--accent`, `--accent-alt`.
4. Validate WCAG 4.5:1 contrast across all text elements to prevent projector washout.
5. Map locked components from `library/components/` to narrative beats.
6. **Gate 2**: In Interactive Co-Design Mode, output selected tokens and layout plan, and await approval. In Autonomous One-Shot Mode, proceed directly to Phase 3.

### Phase 3: Modular Library Assembly & Layout Construction

1. Read `library/README.md` and `references/06-modular-library.md`.
2. Select theme from `library/themes/` and motion preset from `library/animations/crossfade.css` (`calm` or `brisk`).
3. Base output on `templates/deck-skeleton.html` (inject theme tokens into `:root`, set motion preset on `#deck-viewport`).
4. Mount locked component `<section class="slide" data-layout="...">` blocks into `.deck-canvas` based on arc stages and visual escalation.
5. Apply Zero-Jump Canvas Locking and Causal Decision Badges on multi-step walkthroughs (`state-walkthrough.html`).
6. Replace sample copy with beat content. Enforce R-15: narrative prose paragraphs <= 40 words per slide. Data table cells and SVG labels are excluded from the 40-word limit (governed by 18px font floor).
7. Opt-in micro-motion (`library/animations/micro-motion.css`): at most one pattern per slide; strictly forbidden on pole slides.
8. Embed vector diagrams using native inline SVGs following editorial diagram discipline (1px hairlines, single accent, no shadows).
9. Verify all assembled slides pass P0-P2 requirements (R-11 content span >= 65%, max internal gap <= 150px, zero ink overflow).

### Phase 4: Anti-Slop Deck Audit & Quality Filter

1. Read `references/05-anti-slop-deck-audit.md`.
2. Execute the anti-slop verification rules:
   - R-01 (Purpose Test), R-02 (Icon Sanity), R-03 (Text Economy), R-04 (Zero Network), R-05 (Em-Dash Ban), R-06 (Aspect Containment), R-07 (Contrast Guarantee), R-09 (Keyboard Navigation), R-10 (Print Fidelity), R-11 (Vertical Fill >= 65%), R-15 (Prose Limit <= 40 words), R-17 (Stage Integrity flex-shrink: 0).
3. Fix any rule violations before output.
4. **Gate 4 (Final Delivery)**: Deliver the standalone, validated `slides.html`.

## Core Invariants

- **Zero External Dependencies**: Single `.html` file with zero network calls.
- **Dual-Modality Isolation**: Macro navigation via keyboard/touch; micro interactivity via pointer inside slides.
- **Matrix Scaling**: Responsive letterboxing maintaining 16:9 canvas at all viewports.
- **Zero Em-Dashes**: No em-dashes in slide titles, body copy, or code.
