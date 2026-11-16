# Reference 06: Super-Slides Modular Library Architecture

This reference guides how the generative skill uses the modular template library in `library/` to construct consistent, production-grade 16:9 presentation decks.

---

## 1. Skills vs Templates

As established in ToseaAI/awesome-html-slide-skills, skills and templates have fundamentally distinct responsibilities:
- **Skills are generative**: A skill plans the narrative arc, chooses appropriate structures, maps arguments, enforces anti-slop rules, and conducts quality audits.
- **Templates are static ground truth**: Templates provide battle-tested, pre-verified CSS and HTML structures that satisfy geometry, typographic rhythm, and distribution constraints.

Therefore, `library/` is a modular template library inside the `super-slides` generative skill, not a separate skill. The skill reasons over the beat sheet, selects from the library, and populates the slots.

---

## 2. Locked Layout Doctrine

Adapted from op7418/guizang-ppt-skill (Swiss design system):
- The 15 components in `library/components/` constitute a **LOCKED SET**.
- Phase 3 selects strictly from these 15 locked layouts; it **never invents** an unverified layout or ad-hoc card cluster.
- Every layout has been mathematically verified in headless Chromium at 1920x1080 against R-11 (content span >= 65%, internal gap <= 150px, zero stage clipping, zero text-ink overflow).
- Body slides must adhere to the left-aligned title convention. Centered titles are reserved strictly for opening pole slides (`hero-claim.html`) or dedicated section dividers.

### The 15 Locked Layout Components
1. `hero-claim.html` (L01): Single bold thesis statement anchored by a verified metric chip.
2. `big-number.html` (L02): Metric-dominant headline card with 96px tabular numeral and benchmark pill.
3. `claim-proof.html` (L03): Asymmetric claim backed by a 3-tier empirical proof stack.
4. `split-media.html` (L05): 50/50 dual column contrasting narrative takeaways with an SVG inspection schematic.
5. `exec-summary.html` (L06): Strategic executive takeaway card with 3 categorized supporting points.
6. `sidebar-proof.html` (L07): 65/35 widescreen division with deep-dive analysis and an empirical proof sidebar.
7. `comparison.html` (L08): Two-column option evaluation with distinct visual weights and bottom decision tags.
8. `pros-cons.html` (L09): Balanced trade-off analysis framing strategic advantages against operational trade-offs.
9. `before-after.html` (L10): Baseline state vs modernized architecture comparison showing quantified deltas.
10. `matrix-2x2.html` (L11): Four-quadrant strategic landscape positioning architectures on coordinate axes.
11. `flow-sequence.html` (L13-L17): Linear 4-stage pipeline showing progressive stages and status indicators.
12. `data-proof.html` (L19/L20): Empirical SVG line/bar visualization anchored by an executive KPI badge.
13. `state-walkthrough.html` (L21): Stage SVG locked on the right (.locked-stage, fixed coordinate frame) with candidate table and causal rationale on the left.
14. `open-metrics.html` (L22): Three giant figures (180px+) across an open, breathable canvas with crisp hairline dividers and zero box containers.
15. `concept-visual.html` (L23): Formal principle or mathematical invariant on the left paired with a dual Valid vs Invalid counter-example schematic on the right.

### Selection Matrix (Slide Job to Pattern)
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
| Multi-step algorithm trace or state machine walkthrough | `state-walkthrough.html` | Never animate or translate the locked stage; never let table rows mismatch stage state. |
| Multi-metric performance or financial scorecard | `open-metrics.html` | Never wrap metrics in card boxes or drop shadows; preserve open breathable canvas. |
| Core invariant or architectural rule with counter-example | `concept-visual.html` | Never omit the invalid counter-example; keep valid vs invalid contrast immediate. |

### Graded Validation Checklist (P0 through P3)
Mirroring the Guizang audit framework:
- **P0 (Blocker / Structural Integrity)**:
  - R-11: Content vertical span >= 65% (>= 702px on 1080px stage).
  - R-11: Maximum internal gap across stacked flows <= 150px (measured via Range text-ink bands).
  - R-11: Zero text-ink overflow outside 1920x1080 canvas boundaries.
  - R-17: Stage integrity (`.deck-canvas` has `flex-shrink: 0`; viewport never distorts 16:9 ratio).
- **P1 (Visual Taste & Contract)**:
  - Three-tier token separation (components hold no raw colors or font families; themes hold no layout geometry).
  - Single accent budget (neutral canvas 80% to 90%, accent focal 5% to 10%, max 2 accent elements per slide).
  - Single theme per deck (never switch themes across slides).
  - Single motion timing per deck (`calm` or `brisk`).
- **P2 (Editorial & Graphic Discipline)**:
  - Editorial diagram discipline (Cathryn Lavery: 1px hairlines, no box shadows, 4px coordinate grid).
  - Left-aligned titles for all non-pole content slides.
  - No Mermaid or generic flowchart slop; use inline semantic SVG or HTML structures.
  - Text economy: max body words per component <= 40 words.
- **P3 (Polish & Accessibility)**:
  - Full `@media (prefers-reduced-motion: reduce)` fallbacks for all transitions and micro-motion.
  - Keyboard navigation and HUD operational.
  - Full `@media print` fidelity (one slide per 1920x1080 page).

---

## 3. The Three-Party Contract & Token Tiers

Adapted from FineSlides and aliang-shuzhi-html-ppt:
- **Content** has zero design authority.
- **Templates** have zero content authority.
- **Themes** have zero layout authority.

### Token Tier Architecture
1. **Tier 1: Primitives (Raw Values)**:
   Defined exclusively in `library/themes/*.css`. Raw hex codes, RGB/HSL values, and system font lists. Never referenced directly by components.
2. **Tier 2: Semantic Tokens (Meaning-Named)**:
   Named for purpose (`--bg`, `--surface`, `--surface-border`, `--text`, `--text-muted`, `--accent`, `--accent-soft`, `--font-display`, `--font-primary`, `--font-mono`). Re-theming a presentation requires editing semantic token mappings only.
3. **Tier 3: Component Derivations**:
   Computed locally inside component `<style>` blocks using `var(--*)`.

### Preset Discipline
Theme presets exist to protect aesthetics. Never write a literal hex color or font family by hand inside slide components. Protecting design integrity matters more than local ad-hoc styling freedom.

---

## 4. Consulting Grammar: Answer-First & The Slide Is The Argument

Adapted from SlideSpeak/presentation-design-prompts:
- **The slide is the argument**: A slide is not a passive data container; it is an active rhetorical thesis backed by structured evidence.
- **Answer-First Headlines**: Slide titles must state the conclusion, not the category. Use "Sub-Ten-Millisecond Latency Maintained Across Peak Ingestion Loads" instead of "Latency Benchmark Results".
- **Avoid-Lists**: Every theme in `library/themes/` carries an explicit avoid-list comment block. Models and authors must check the avoid-list before styling slides to prevent aesthetic regression.

---

## 5. Editorial Diagram Discipline

Adapted from Cathryn Lavery (diagram-design):
- **Single Accent Focus**: One accent color (`var(--accent)`) highlights the one or two critical elements that matter (the winning curve, the active processing stage, the key delta). Everything else remains neutral or muted.
- **1px Hairlines**: Use delicate 1px borders (`border: 1px solid var(--surface-border)`) and SVG grid lines with `stroke-width="1"` and `stroke-opacity="0.1"` to `"0.2"`. Never use heavy, clunky boxes.
- **Zero Shadows**: No `box-shadow`, no glow halos, no blurred elevation layers. Contrast is achieved through precise tonal planes and crisp lines.
- **4px Coordinate Grid**: All SVG coordinates, layout padding, margins, and gaps must snap to a 4px grid.
- **Zero Mermaid Slop**: Never generate automated flowchart diagrams with arbitrary node shapes and illegible label wraps. Use calibrated inline SVG or modular HTML step tracks.

---

## 6. Showcase & Isolated Render Pattern

Adapted from lewislulu/html-ppt-skill:
- Every layout component and theme is validated in an isolated DOM / iframe environment to prevent CSS cross-contamination.
- `.img-frame` primitive: Owns the aspect ratio (`--img-ratio`) and crop mode:
  - Letterbox (`object-fit: contain`, never cropped) for architectural schematics, interface screenshots, and diagrams.
  - Fill (`object-fit: cover`) for contextual photographs and brand visuals.

---

## 7. The Phase 3 Assembly Workflow

When executing Phase 3 in `SKILL.md`, do not select components at random from a flat list. Follow this systematic workflow rooted in the narrative arc and visual pacing:

1. **Arc Stage Mapping & Content-Type Routing**:
   - Identify the Narrative Arc selected in Phase 0 (Algorithm Trace, Architecture Deep-Dive, Concept Explainer, or Executive Pitch).
   - Map each beat in the Beat Sheet to its preferred locked component as specified in `references/01-narrative-scripting.md` and the Selection Matrix.
2. **Mandatory Visual Escalation Enforcement**:
   - Check raw content against the four escalation triggers before placing markup:
     - Chronology or progressive stages: strictly forbidden to use bullet lists; must use `flow-sequence.html` or `state-walkthrough.html`.
     - Connected entities or network graphs: must use inline SVG topology with state color classes (`state-visited`, `state-candidate`, `state-active`).
     - Two or more metrics: auto-calculate deltas and escalate to `open-metrics.html` (180px+ tabular numerals) or `data-proof.html` (calibrated chart). Never bury numbers in sentences.
     - Formal concept definition: must pair the invariant with a dual Valid vs Invalid schematic in `concept-visual.html`.
3. **Visual Rhythm & Pacing Arrangement**:
   - Alternate pole/release slides (`hero-claim.html`, `open-metrics.html`) with dense analytical slides (`state-walkthrough.html`, `split-media.html`, `comparison.html`).
   - Validate spatial anchoring on pole slides: top header at y=72px and bottom context/proof chips at y=800-880px ensure full R-11 compliance (vertical span >= 65%) without cluttering the center.
4. **Zero-Jump Canvas Locking for Multi-Step Slides**:
   - When sequencing multiple step slides (e.g., algorithm iterations with `state-walkthrough.html`):
     - Lock the title card position, `.locked-stage` container, and SVG vertex coordinates to 100% pixel-identical positions across all step slides.
     - Ensure `.locked-stage` is excluded from CSS transition stagger animations, eliminating position jumps between slides.
     - Position Causal Decision Callout Badges directly on the SVG canvas adjacent to relevant edges and nodes (green/accent pill for chosen edge with selection rationale, small red cross badge for cycle-rejected edges).
5. **Select Theme**: Pick exactly ONE theme from `library/themes/` based on audience persona and environment (`bold-signal`, `editorial-cream`, `ink-paper`, `apple-clean`).
6. **Select Animation**: Pick ONE timing preset (`calm` or `brisk`) from `library/animations/crossfade.css`.
7. **Assemble Skeleton**: Base the deck on `templates/deck-skeleton.html`. Inject the selected theme CSS into `:root` and motion preset into `#deck-viewport`.
8. **Populate Component Markup**: For each slide, copy the component `<section class="slide" data-layout="...">` and its `<style>` block into `.deck-canvas`.
9. **Insert Beat Content & Text Economy**: Replace illustrative sample copy with actual beat sheet text. Enforce R-15: narrative prose paragraphs must not exceed 40 words per slide. Data table cells and SVG labels are excluded from the 40-word limit and must respect the 18px font floor.
10. **Run P0-P2 Audit**: Verify text-ink span (>= 65%), internal gaps (<= 150px), and boundary containment.

---

## 8. Further Reading (Design Catalogs)

Reference catalogs for layout patterns and chart structures:
- `huashu-design`: 80+ style library with six-thumbnail to three-direction exploration.
- `dashi-ppt-skill`: 1,020 layout catalog with ready-made quantitative chart layouts (radar, waterfall, treemap, funnel, heatmap, Sankey, Gantt) and business frameworks (SWOT, Porter Five Forces, PEST, BMC).
- `open-slide`: 1920x1080 canvas engine with live in-browser layout inspector.
- `visual-explainer`: Dark-first technical aesthetics and systems typography.

---

## 9. Primary Research Sources

The modular library architecture was built on findings from:
- SLIDE.md: Separation of design tokens and layout structure (github.com/mosuzzzz/slide.md)
- FineSlides: Three-party contract: content has zero design authority, template has zero content authority (github.com/d-k-e/fineslides)
- html-deck-builder: Micro-motion patterns and single-file HTML presentations (typingmind)
- qiaomu-ppt: Layout pattern library and slide selection matrix (github.com/joeseesun/qiaomu-ppt)
- Slidev: Theme architecture and modular slide layouts (sli.dev)
- kami: Parchment design system and serif-led hierarchy (cabird)
- aliang-shuzhi-html-ppt: Three-tier token architecture and Swiss minimal keynotes (aliang)
- YC / Sequoia Pitch Structure: Transformation and proof storytelling frameworks (via slaide.de)
- guizang-ppt-skill: Locked layouts and graded P0-P3 validation (op7418)
- diagram-design: Editorial diagram discipline (cathrynlavery)
- presentation-design-prompts: Theme avoid-lists and consulting grammar (SlideSpeak)
- html-ppt-skill: Isolated render showcase and image frame primitive (lewislulu)
- awesome-html-slide-skills: Generative skills vs static template libraries (ToseaAI)

---

## 10. Second-Wave Deep-Read Adoptions (2026-11-15)

Findings from the full deep read of all six reference repos (not just their READMEs), folded in after Packet 8b-2. These strengthen the audit rules; they do not change the locked component set.

- **Weight ladder + 18px body floor** (guizang): bigger type is thinner, smaller type is bolder (display >= 8vw weight 200; body 16-20px weight 400-500, never 300). Body text never goes below 18px on a slide; never shrink to 10-13px to fix crowding, cut copy or change layout instead. This is the enforcement behind R-16 (projector legibility).
- **Split contrast variables** (guizang): a theme that wants a verified accent separates it into `--accent` (blocks, lines, dots), `--accent-ink` (small text on light surfaces, darkened until it clears 4.5:1), `--accent-display` (large titles and KPIs), and `--accent-on` (text sitting on an accent fill). New themes should publish their WCAG / APCA pairs per variable; existing theme files keep their current single `--accent` until a theme revision adopts the split.
- **Overflow-fix ladder** (guizang): when a slide overflows, fix mechanically in order. 1-40px: nudge one gap tighter by 20-40px, never delete content. 40-90px: compact gaps or one block height. 90-160px: reduce the title slightly or compress one paragraph. Over 160px: switch to a higher-capacity locked layout, or remove/merge content deliberately. Never fix overflow by shrinking body text below 18px.
- **Diagram budget ceilings** (diagram-design): a diagram component holds at most 9 nodes, 12 arrows, 2 accent elements, and 2 callouts; past that, split into overview + detail. Connectors are orthogonal elbows (r=8) with an opaque mask and a 6-10px gap behind every arrow label; no line transits behind a non-endpoint box. Before drawing, ask whether the reader learns more from the diagram than from one well-written paragraph; if not, do not draw.
- **Style discovery shape** (frontend-slides, huashu-design): when a deck needs a new visual direction, generate 3 previews (1 safe preset, 1 bold template, 1 wildcard) that look like real first slides with no workflow text or template names on them, and build the full deck only after the user picks one. The 4-theme isolated render in Packet 8b-2 is the small version of this.
- **Theme picker language** (visual-explainer): the four themes map to four aesthetic families, dark-first technical (bold-signal), warm pitch (editorial-cream), serif editorial (ink-paper), Swiss data (apple-clean). Use that language when presenting the theme choice.
