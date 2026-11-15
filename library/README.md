# Super-Slides Modular Library

A zero-network, tokenized component and theme library for building offline-first 16:9 presentation decks.

This document serves as the progressive loading index for the generative skill. Following the progressive loading pattern (zarazhangrui/frontend-slides), the agent reads this compact index first to select the single matching component per narrative beat, rather than loading all component templates into context at once. The component files in `library/components/` contain the full, self-contained layout designs.

---

## 1. Compact Component Index (Locked Layout Set)

The library provides 12 locked layout components. Phase 3 selects strictly from this set; it never invents ad-hoc slide structures.

- `hero-claim.html` (L01): Single bold thesis statement anchored by a verified metric chip.
- `big-number.html` (L02): Metric-dominant headline card with 96px tabular numeral and benchmark pill.
- `claim-proof.html` (L03): Asymmetric claim backed by a 3-tier empirical proof stack.
- `split-media.html` (L05): 50/50 dual column contrasting narrative takeaways with an SVG inspection schematic.
- `exec-summary.html` (L06): Strategic executive takeaway card with 3 categorized supporting points.
- `sidebar-proof.html` (L07): 65/35 widescreen division with deep-dive analysis and an empirical proof sidebar.
- `comparison.html` (L08): Two-column option evaluation with distinct visual weights and bottom decision tags.
- `pros-cons.html` (L09): Balanced trade-off analysis framing strategic advantages against operational trade-offs.
- `before-after.html` (L10): Baseline state vs modernized architecture comparison showing quantified deltas.
- `matrix-2x2.html` (L11): Four-quadrant strategic landscape positioning architectures on coordinate axes.
- `flow-sequence.html` (L13-L17): Linear 4-stage pipeline showing progressive stages and status indicators.
- `data-proof.html` (L19/L20): Empirical SVG line/bar visualization anchored by an executive KPI badge.

---

## 2. Selection Matrix (Slide Job to Pattern)

Adapted from the qiaomu-ppt selection matrix. Map the narrative beat to its optimal locked component:

| Slide Job / Narrative Beat | Preferred Component | What to Avoid |
| :--- | :--- | :--- |
| Core thesis, deck opening, vision hook | `hero-claim.html` | Never use bullet lists, card grids, or split columns on opening poles. |
| Single headline metric, scale validation | `big-number.html` | Never crowd with multiple competing numbers; one metric dominates. |
| Strategic claim needing empirical backing | `claim-proof.html` | Never present assertions without tiered evidentiary proof points. |
| Technical capability paired with schematic | `split-media.html` | Never let columns float at unequal heights; keep spans aligned. |
| High-level executive synthesis | `exec-summary.html` | Never exceed 3 supporting points; maintain clean vertical flow. |
| In-depth case study with side telemetry | `sidebar-proof.html` | Never invert column ratios; keep 65% primary, 35% telemetry. |
| Deciding between two distinct paths | `comparison.html` | Never make both columns visually identical; emphasize the winner. |
| Strategic trade-off and risk review | `pros-cons.html` | Never hide operational costs or downplay genuine trade-offs. |
| Demonstrating transformation outcome | `before-after.html` | Never omit the middle intervention lever; show the causal link. |
| Market or architectural positioning | `matrix-2x2.html` | Never place targets off-quadrant or omit labeled axes. |
| End-to-end execution pipeline or workflow | `flow-sequence.html` | Never exceed 4-5 stages in one slide; avoid text-heavy step cards. |
| Benchmark telemetry or throughput curve | `data-proof.html` | Never show unlabelled curves without baseline comparisons. |

---

## 3. Theme Picker

Themes define tokens only (Tier 1 primitives -> Tier 2 semantics). Decks pick exactly ONE theme across all slides:

- `bold-signal.css`: Deep obsidian canvas (`#0A0D12`), crisp white ink, electric orange signal accent (`#FF5722`), mono typography. Pick for technical audiences, developer keynotes, and dark viewing environments.
- `editorial-cream.css`: Warm cream canvas (`#F8F6F1`), charcoal ink, terracotta accent (`#B33927`), deep pine secondary (`#2B5C54`). Pick for executive reviews, investment pitches, and conference room projectors.
- `ink-paper.css`: Classical warm parchment canvas (`#F5F4ED`), deep carbon ink (`#121820`), single ink-blue accent (`#1B365D`), authoritative serif headlines. Pick for academic, architectural, and research publications.
- `apple-clean.css`: Modern off-white canvas (`#FBFBFD`), graphite ink (`#1D1D1F`), signature Cupertino blue accent (`#0A84FF`), native system font stack. Pick for product announcements and design reviews.

*Future Theme Candidate*: `sage.css` (monochromatic desaturated green, flat administrative contrast, zero elevation shadows) is documented as a planned addition. Do not generate or import it until formally specified.

---

## 4. Animation and Motion Model Picker

Motion timing is defined deck-wide in `library/animations/crossfade.css`:

- `calm` (`data-motion="calm"`): ~450ms total transition. Pick for executive reviews, formal board decks, and bright projector displays.
- `brisk` (`data-motion="brisk"`): ~240ms total transition. Pick for rapid developer demos, technical walkthroughs, and interactive reviews.

### Micro-Motion Rules (`library/animations/micro-motion.css`)
- Opt-in patterns: Staggered fade-up, vertical telemetry ticker, animated SVG travelling dots, horizontal marquee.
- Rule 1: Maximum ONE micro-motion pattern per slide.
- Rule 2: Strictly forbidden on pole slides (`hero-claim.html`, quote, or major title slides).
- Rule 3: Must always respect `@media (prefers-reduced-motion: reduce)`.
- Rule 4: Zero horizontal push transforms or 3D translations.

---

## 5. Architectural Invariants and Hard Rules

1. **One Component Per Slide**: A slide selects exactly one locked layout from `library/components/`.
2. **One Theme Per Deck**: The chosen theme applies to the entire presentation. Never mix themes across slides.
3. **One Motion Timing Per Deck**: Animation preset (`calm` or `brisk`) is applied to `:root`.
4. **No Card Grids**: Never revert to generic multi-card dashboard slop.
5. **Token References Only**: Components contain zero hardcoded colors or literal fonts. All styles reference `var(--*)`.
6. **R-11 Distribution Compliance**: Every assembled slide must pass content span >= 65%, max internal gap <= 150px, and zero ink overflow.

---

## 6. Architectural Decision: Crossfade vs View Transitions API

- **Decision**: The super-slides motion engine strictly retains its custom zero-dependency crossfade with scale settle.
- **Evaluation**: The browser-native CSS View Transitions API was evaluated. While it provides elegant element morphing in modern Chromium, it introduces non-standard behavior when loaded directly via `file://` offline protocols, breaks cross-browser consistency in standalone single-file packages, and fails to handle dual-modality touch-pointer events cleanly.
- **Outcome**: The View Transitions API is explicitly rejected. All transitions remain offline-compatible via standard CSS opacity and transform transitions.
