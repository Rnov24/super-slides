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
- The 12 components in `library/components/` constitute a **LOCKED SET**.
- Phase 3 selects strictly from these 12 locked layouts; it **never invents** an unverified layout or ad-hoc card cluster.
- Every layout has been mathematically verified in headless Chromium at 1920x1080 against R-11 (content span >= 65%, internal gap <= 150px, zero stage clipping, zero text-ink overflow).
- Body slides must adhere to the left-aligned title convention. Centered titles are reserved strictly for opening pole slides (`hero-claim.html`) or dedicated section dividers.

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

When executing Phase 3 in `SKILL.md`:
1. **Read `library/README.md`**: Consult the compact index and selection matrix to map each beat to its locked component.
2. **Select Theme**: Pick exactly ONE theme from `library/themes/` based on the audience and room environment.
3. **Select Animation**: Pick ONE timing preset (`calm` or `brisk`) from `library/animations/crossfade.css`.
4. **Assemble Skeleton**: Base the deck on `templates/deck-skeleton.html`. Inject the selected theme CSS into `:root` and motion preset into `#deck-viewport`.
5. **Populate Component Markup**: For each slide, copy the component `<section class="slide" data-layout="...">` and its `<style>` block into `.deck-canvas`.
6. **Insert Beat Content**: Replace illustrative sample copy with actual beat sheet text, keeping prose concise (<= 40 body words per slide).
7. **Run P0-P2 Audit**: Verify text-ink span (>= 65%), internal gaps (<= 150px), and boundary containment.

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
