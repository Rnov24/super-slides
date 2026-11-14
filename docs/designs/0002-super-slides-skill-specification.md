# Super Slides: Unified AgentSkill for Zero-Dependency HTML Presentations

* **Author:** @rnov24
* **Status:** Approved
* **Date:** 2026-11-14

--------------------------------------------------------------------------------

## Overview

`super-slides` is a unified AgentSkill packaged for universal distribution via `npx skills` that equips AI coding agents (Antigravity, Claude Code, Cursor, Codex, OpenCode) with a structured, 4-phase human-in-the-loop pipeline to author self-contained, zero-dependency HTML presentations (`slides.html`). It synthesizes the visual exploration strengths of `frontend-slides`, the modular slide layout architectures of `html-ppt`, and the vector diagramming capabilities of `diagram-design` into a single, cohesive skill.

> [!NOTE]
> **Architecture Supersession**: This specification formally supersedes `0001-core-deck-engine.md`, transitioning the system from a standalone compiled TypeScript library to a zero-dependency AgentSkill template architecture that directly emits standalone HTML presentation artifacts.

The core deliverable of `super-slides` is an offline-first presentation that runs directly from a local `file://` path in any modern web browser without build steps, external network requests, or server dependencies.

## The Problem

Current methods for creating presentation decks with AI agents suffer from three failure modes:
1. **Context Window Exhaustion**: Comprehensive presentation skills that bundle layouts, themes, animations, and diagram instructions into monolithic skill files quickly exceed agent context windows, causing prompt fatigue and ignored design constraints.
2. **Fragile External CDN Dependencies**: AI coding agents routinely hallucinate external `<link>` and `<script>` CDN imports (e.g., Google Fonts, Tailwind, Reveal.js, Mermaid.js, Prism.js). When decks are presented offline, behind corporate firewalls, or on conference Wi-Fi, they break, fail to render fonts, or throw script errors.
3. **Pervasive AI Presentation Slop**: Unguided LLMs default to generic corporate presentation patterns: 3-column card layouts, floating glassmorphic cards, low-contrast purple/cyan gradients, bullet-point walls of text, em-dash-laden summaries, and ungrounded marketing buzzwords.

`super-slides` resolves these issues through progressive disclosure playbooks, strict zero-dependency offline enforcement, and a 4-phase creation workflow with mandatory human decision gates.

## Goals

* **Single-File Zero-Dependency Output**: Guarantee that all generated presentations are self-contained in a single `.html` file with 0 external network requests, using curated system font stacks and inline native SVG assets.
* **Progressive Disclosure Architecture**: Maintain a lean root entrypoint (`SKILL.md` < 180 lines) that dynamically routes the agent to phase-specific reference playbooks (`references/`), protecting context windows.
* **Enforced 4-Phase Pipeline**: Require human alignment gates after narrative outlining (Phase 1) and visual token discovery (Phase 2) before markup generation (Phase 3) and anti-slop auditing (Phase 4).
* **Viewport Invariance**: Deliver a responsive CSS Matrix Scaling runtime (`1920x1080` base canvas) ensuring pixel-perfect letterboxing across all display aspect ratios without vertical scrollbars.
* **Universal Agent Compatibility**: Comply fully with the `npx skills` packaging standard for instant installation across Antigravity, Claude Code, Cursor, Codex, and OpenCode.
* **Dual-Mode Presenter Support**: Deliver an in-page Speaker Notes HUD (`#speaker-hud` via key `N`) operable under `file://` offline protocols, with optional dual-window `BroadcastChannel` synchronization when served via localhost.

## Non-Goals

* Building a proprietary cloud presentation hosting service or real-time remote collaboration server.
* Supporting arbitrary non-standard aspect ratios in default templates (the engine standardizes strictly on 16:9).
* Emulating legacy Microsoft PowerPoint binary formats (`.pptx`) or proprietary macro scripts.
* Generating heavy client-side bundler configurations (e.g., Vite, Webpack, Next.js) for slide viewing.

## Open Questions & Technical Resolutions

* **Question 1: Brand Icon Strategy**: What is the most resilient fallback strategy for custom icons without inflating the single HTML file?
  * *Resolution*: Inline semantic SVG glyphs using standard `<path>` vectors. Base64 data URIs are permitted only for approved corporate logos under 15KB.
* **Question 2: Cross-Window Presenter Sync over `file://`**: How should presenter notes communicate across windows given browser origin constraints?
  * *Resolution*: Modern Chromium/WebKit browsers treat `file://` windows with opaque origins (`origin: null`), blocking cross-window `BroadcastChannel`. Therefore, the **primary presenter interface is an in-page modal HUD overlay (`#speaker-hud`)** toggled by pressing `N`. Dual-window synchronization via `BroadcastChannel` is activated gracefully when hosted from `http://localhost`.

## Critical User Journeys (CUJs)

### CUJ 1: Developer Installs Skill & Requests Deck from Raw Notes
* **Given**: A developer with an AI coding agent (e.g., Antigravity, Claude Code, Cursor) and unstructured markdown notes or a PRD.
* **When**: The user runs `npx skills add <repo> -g` and prompts `"Build a 10-slide technical architecture deck for my project"`.
* **Then**: The agent detects `super-slides`, loads `references/01-narrative-scripting.md`, and produces an outline beat sheet with core takeaways and speaker notes for human approval before writing any HTML.

### CUJ 2: Human-in-the-Loop Visual Taste Discovery
* **Given**: An approved narrative outline from Phase 1.
* **When**: The agent proceeds to Phase 2.
* **Then**: The agent reads `references/02-visual-taste.md`, offers 3 concrete visual directions (e.g., High-Contrast Editorial, Modern Terminal Dark, Clean Humanist), validates WCAG 4.5:1 contrast, and asks the user to pick a direction without generating generic card layouts.

### CUJ 3: Offline Single-File Delivery & Presenter Execution
* **Given**: A fully generated `slides.html` file in the user's workspace.
* **When**: The user disconnects from Wi-Fi and double-clicks `slides.html` in Chrome/Safari.
* **Then**: The deck renders instantly with 0 HTTP network errors, auto-scales to the display aspect ratio, responds to keyboard navigation, displays speaker notes via `N`, and prints directly to a multi-page PDF via `Cmd+P` / `Ctrl+P`.

## Technical Plan (Architecture)

### 1. Architectural Overview & Component Boundaries

The `super-slides` repository is divided into two operational domains:
1. **The Authoring Engine (AgentSkill Interface)**: The instruction system loaded by AI agents during generation sessions.
2. **The Runtime Engine (Presentation Client)**: The zero-dependency HTML, CSS, and JS injected into the final `slides.html` artifact.

```text
+-----------------------------------------------------------------------------------+
|                           super-slides Skill Package                              |
+-----------------------------------------------------------------------------------+
|  SKILL.md (State Machine Router < 180 lines)                                      |
|    |                                                                              |
|    +--> Phase 1 Router: references/01-narrative-scripting.md                     |
|    +--> Phase 2 Router: references/02-visual-taste.md                             |
|    +--> Phase 3 Router: references/03-components-and-layouts.md                   |
|    |                    references/04-svg-diagram-primitives.md                   |
|    +--> Phase 4 Router: references/05-anti-slop-deck-audit.md                     |
+-----------------------------------------------------------------------------------+
                                         |
                                         | Generates
                                         v
+-----------------------------------------------------------------------------------+
|                          Self-Contained slides.html                               |
+-----------------------------------------------------------------------------------+
| [CSS Tokens & Reset]                                                              |
|   - System Font Stacks (Editorial / Grotesque / Monospace / Humanist)             |
|   - Semantic Color Properties (--bg, --surface, --text, --accent)                 |
|   - 16:9 Letterbox Container & Responsive Transform Scale Controller             |
|   - Print Media Stylesheet (@media print page breaks per slide)                  |
|                                                                                   |
| [Slide Markup Tree]                                                               |
|   - <section class="slide" data-layout="..." data-notes="...">                    |
|   - Native Inline SVGs (1200x675 Standardized Grid)                              |
|   - Stepped Fragment Nodes (.fragment)                                           |
|                                                                                   |
| [Lightweight Runtime Engine (<120 lines Vanilla JS)]                              |
|   - Keyboard Controller (ArrowRight, ArrowLeft, Space, Backspace, F, N, O)        |
|   - Fragment Stepper Engine (Revealing .fragment before advancing slides)         |
|   - Hash History Sync (window.location.hash = #slide-N)                          |
|   - Presenter Notes HUD (Toggleable Modal Reading data-notes via N)               |
|   - Optional Cross-Window BroadcastChannel Event Broadcaster                      |
+-----------------------------------------------------------------------------------+
```

### 2. The 4-Phase Generation Pipeline

#### Phase 1: Narrative Scripting & Story Spine
* **Agent Context Loaded**: `references/01-narrative-scripting.md`.
* **Responsibility**: Frame audience persona, core thesis, and slide count budget (strictly 6–12 slides). Enforce the **1-Takeaway Rule**: every slide must feature exactly one key insight and a presenter voice script stored in `data-notes`.
* **Gate 1**: The agent yields execution to the human user with the complete Beat Sheet. No visual design or code is written until Gate 1 is approved.

#### Phase 2: Visual Taste Discovery & Token Definition
* **Agent Context Loaded**: `references/02-visual-taste.md`.
* **Responsibility**: Establish design tokens before generating markup:
  * Curated System Font Stacks:
    1. *Executive Editorial*: `Charter, "Bitstream Charter", "Sitka Text", Cambria, Georgia, serif`
    2. *Modern Tech Grotesque*: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    3. *Engineering Terminal*: `"Cascadia Code", "Fira Code", "JetBrains Mono", Consolas, monospace`
    4. *Clean Humanist*: `"Avenir Next", "Segoe UI", Inter, Cantarell, sans-serif`
  * Semantic Palette Variables: `--bg`, `--surface`, `--text`, `--text-muted`, `--accent`, `--accent-alt`.
  * Contrast Verification: Enforce minimum 4.5:1 WCAG AA contrast ratio against conference projector washout.
* **Gate 2**: The agent outputs a preview token block and layout assignments per slide for human sign-off.

#### Phase 3: Component Assembly & Layout Construction
* **Agent Context Loaded**: `references/03-components-and-layouts.md` and `references/04-svg-diagram-primitives.md`.
* **Responsibility**: Assemble the complete `slides.html` file using 6 layout blueprints:
  1. `Layout-Hero`: High-impact typographic title with single subtitle and metadata tag.
  2. `Layout-Split`: 50/50 asymmetry with narrative headline left, vector illustration right.
  3. `Layout-Bento`: 3–4 asymmetric metric and architecture cards with clear hierarchy.
  4. `Layout-Diagram`: Full-canvas technical architecture or sequence diagram.
  5. `Layout-Quote`: Focus slide with high-contrast conviction statement.
  6. `Layout-Comparison`: Side-by-side Before/After or Versus matrix.
* **SVG Primitive Standards**:
  * Standardized `viewBox="0 0 1200 675"`.
  * Mathematical 12-Column Grid Alignment:
    $$\text{padding} = 56\text{px}, \quad \text{gap} = 16\text{px}, \quad \text{columnWidth} = 76\text{px}$$
    $$x(\text{col}) = 56 + \text{col} \times 92 \quad (\text{yielding symmetric } 56\text{px left/right margins})$$
  * Reusable marker definitions (`<marker id="arrow">`).
  * 5 vector archetype skeletons (Pipeline, Architecture Stack, 2x2 Matrix, Timeline, Metric Highlights).

#### Phase 4: Anti-Slop Deck Audit & Quality Filter
* **Agent Context Loaded**: `references/05-anti-slop-deck-audit.md`.
* **Responsibility**: Run the 10 Anti-Slop Audit checks prior to presenting the deck:
  1. *R-01 Purpose Test*: Every badge, card, and line must serve a stated functional purpose.
  2. *R-02 Icon Sanity*: Ban generic decorative emojis and meaningless rocket/brain/lightbulb SVGs.
  3. *R-03 Text Economy*: Zero paragraphs exceeding 3 lines; ban bullet-point walls.
  4. *R-04 Zero Network*: 0 external `<link>` or `<script>` tags; zero CDN dependencies.
  5. *R-05 Em-Dash Ban*: Ban AI-filler em-dashes (`—`) in slide headlines and body copy.
  6. *R-06 Aspect Containment*: Verify 16:9 matrix scaling works without vertical scrollbars.
  7. *R-07 Contrast Guarantee*: Ensure text contrast passes 4.5:1.
  8. *R-08 Speaker Notes Complete*: Every slide must contain presenter scripts in `data-notes`.
  9. *R-09 Keyboard Navigation*: Validate Arrow keys, Space, Backspace, Fullscreen (`F`), Notes (`N`), Overview (`O`).
  10. *R-10 Print Fidelity*: Verify `@media print` renders exactly one 1920x1080 page per slide.
* **Gate 4**: Final delivery of `slides.html`.

### 3. Client-Side Runtime Engine Specifications

*See [0003-dual-modality-interaction-architecture.md](./0003-dual-modality-interaction-architecture.md) for detailed transition mechanics, input isolation, and gesture handling.*

```javascript
// Minimal Runtime Engine (<120 lines Vanilla JS)
class DeckEngine {
  constructor() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.currentIndex = 0;
    this.notesHud = document.getElementById('speaker-hud');
    this.isOverview = false;
    try {
      this.syncChannel = new BroadcastChannel('super-slides-sync');
      this.syncChannel.onmessage = (e) => this.goTo(e.data.index, false);
    } catch (_) {
      this.syncChannel = null; // file:// opaque origin fallback
    }
    this.init();
  }

  init() {
    this.updateScale();
    window.addEventListener('resize', () => this.updateScale());
    window.addEventListener('keydown', (e) => this.handleKey(e));
    const initialIndex = parseInt(window.location.hash.replace('#slide-', ''), 10) - 1;
    this.goTo(isNaN(initialIndex) ? 0 : initialIndex, false);
  }

  updateScale() {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    document.documentElement.style.setProperty('--deck-scale', scale);
  }

  get activeSlide() { return this.slides[this.currentIndex]; }

  stepForward() {
    const nextFrag = this.activeSlide?.querySelector('.fragment:not(.revealed)');
    if (nextFrag) { nextFrag.classList.add('revealed'); return; }
    this.goTo(this.currentIndex + 1);
  }

  stepBackward() {
    const revealedFrags = Array.from(this.activeSlide?.querySelectorAll('.fragment.revealed') || []);
    if (revealedFrags.length > 0) { revealedFrags[revealedFrags.length - 1].classList.remove('revealed'); return; }
    this.goTo(this.currentIndex - 1);
  }

  goTo(index, broadcast = true) {
    if (index < 0 || index >= this.slides.length) return;
    this.slides[this.currentIndex]?.classList.remove('active');
    this.currentIndex = index;
    this.activeSlide.classList.add('active');
    window.location.hash = `#slide-${index + 1}`;
    if (this.notesHud) this.notesHud.textContent = this.activeSlide.dataset.notes || '(No speaker notes)';
    if (broadcast && this.syncChannel) this.syncChannel.postMessage({ index });
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  }

  toggleNotes() {
    if (this.notesHud) this.notesHud.classList.toggle('visible');
  }

  toggleOverview() {
    this.isOverview = !this.isOverview;
    document.body.classList.toggle('overview-mode', this.isOverview);
  }

  handleKey(e) {
    if (['ArrowRight', 'Space', 'PageDown'].includes(e.code)) { e.preventDefault(); this.stepForward(); }
    else if (['ArrowLeft', 'Backspace', 'PageUp'].includes(e.code)) { e.preventDefault(); this.stepBackward(); }
    else if (e.code === 'Home') { e.preventDefault(); this.goTo(0); }
    else if (e.code === 'End') { e.preventDefault(); this.goTo(this.slides.length - 1); }
    else if (e.key === 'f' || e.key === 'F') this.toggleFullscreen();
    else if (e.key === 'n' || e.key === 'N') this.toggleNotes();
    else if (e.key === 'o' || e.key === 'O') this.toggleOverview();
  }
}
document.addEventListener('DOMContentLoaded', () => { window.deck = new DeckEngine(); });
```

### 4. Print Media Stylesheet Specification

```css
@page {
  size: 1920px 1080px;
  margin: 0;
}
@media print {
  html, body {
    overflow: visible !important;
    height: auto !important;
    background: #ffffff !important;
  }
  .deck-viewport {
    display: block !important;
    position: static !important;
    overflow: visible !important;
    width: 1920px !important;
    height: auto !important;
    background: transparent !important;
  }
  .deck-canvas {
    transform: none !important;
    width: 1920px !important;
    height: auto !important;
    position: static !important;
    overflow: visible !important;
  }
  .slide {
    display: block !important;
    page-break-after: always !important;
    break-after: page !important;
    width: 1920px !important;
    height: 1080px !important;
    position: relative !important;
    overflow: hidden !important;
  }
  .fragment {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
  }
  .speaker-hud, .deck-controls, .overview-overlay {
    display: none !important;
  }
}
```

--------------------------------------------------------------------------------

## Alternatives Considered

### Alternative A: Markdown-Based Runtimes (Slidev / Marp)
* **Pros**: Concise markdown syntax, wide developer ecosystem, existing CLI tools.
* **Cons**: Requires local Node.js environments, heavy npm dependency trees, and persistent dev server processes. Presentations cannot be opened directly via `file://` by non-technical stakeholders or sent as single standalone HTML files.
* **Reason for Rejection**: Rejected: violates the zero-setup, single-file offline distribution requirement.

### Alternative B: Reveal.js / Heavy Third-Party Presentation Frameworks
* **Pros**: Battle-tested slide transitions, broad third-party plugin library.
* **Cons**: Relies on external CDN assets for fonts, themes, and plugins. Highly vulnerable to CSP blocking, corporate proxy failures, and offline rendering breakage. CSS specificity conflicts make bespoke SVG diagram embedding brittle.
* **Reason for Rejection**: Rejected: introduces external network dependencies and runtime complexity that violate the offline-first invariant.

### Alternative C: Monolithic Single `SKILL.md` File Architecture
* **Pros**: Simple single-file distribution model for the skill author.
* **Cons**: Consumes over 2,000 lines of prompt context, overwhelming the agent's active memory window. Leads to context dilution, prompt fatigue, hallucinated coordinates, and dropped constraints.
* **Reason for Rejection**: Rejected: unmaintainable for LLM context budgets; progressive disclosure structure with modular playbooks is strictly required.

--------------------------------------------------------------------------------

## Non-Functional Requirements

### Security & Privacy
* **Zero Remote Network Calls**: Decks emit zero outgoing HTTP/S requests; no telemetry, tracking pixels, or third-party fonts.
* **Safe Local Execution**: The runtime script executes exclusively in local browser memory without accessing filesystem APIs or requiring elevated permissions.

### Performance & Latency
* **Immediate Cold Start**: `slides.html` must render in under 100ms when loaded locally from disk.
* **60 FPS Animation Budget**: All slide transitions and fragment reveals must be hardware-accelerated (`transform` and `opacity` only).

--------------------------------------------------------------------------------

## Detailed Implementation Plan

### Target Files to Create / Modify

#### 1. `SKILL.md` (Create)
* **Type / Scope**: Root AgentSkill Configuration & Router (<180 lines)
* **Proposed Specifications**:
  * YAML Frontmatter:
    ```yaml
    name: super-slides
    description: Create zero-dependency, animation-rich, single-file HTML presentations with 16:9 scaling, inline SVG diagrams, and strict anti-slop rules.
    ```
  * Router State Machine: Defines Phase 1 through 4 execution transitions, prompting the agent to read each relative playbook before presenting mandatory human decision gates.

#### 2. `package.json` (Create)
* **Type / Scope**: Package & Distribution Manifest
* **Proposed Specifications**:
  ```json
  {
    "name": "super-slides",
    "version": "1.0.0",
    "description": "Zero-dependency, anti-slop HTML presentation authoring skill",
    "skills": "./SKILL.md",
    "scripts": {
      "test": "node tests/verify-deck.mjs"
    }
  }
  ```

#### 3. `README.md` (Create)
* **Type / Scope**: Root Documentation & Quickstart
* **Proposed Specifications**: Quickstart guide (`npx skills add . -g --all`), layout archetype gallery, keyboard navigation mapping, and offline verification instructions.

#### 4. `references/01-narrative-scripting.md` (Create)
* **Type / Scope**: Phase 1 Reference Playbook
* **Proposed Specifications**: Narrative structure formulas (Hook -> Problem -> Friction -> Architecture -> Proof -> Call to Action), 6–12 slide budget constraints, 1-Takeaway rule, and speaker notes scripting templates.

#### 5. `references/02-visual-taste.md` (Create)
* **Type / Scope**: Phase 2 Reference Playbook
* **Proposed Specifications**: Curated system font stacks (Editorial, Modern Tech Grotesque, Monospace, Humanist), semantic token definitions (`--bg`, `--surface`, `--text`, `--accent`), and WCAG 4.5:1 contrast validation formulas.

#### 6. `references/03-components-and-layouts.md` (Create)
* **Type / Scope**: Phase 3 Layout Reference Playbook
* **Proposed Specifications**: HTML structure and CSS grid rules for the 6 core layouts (`Layout-Hero`, `Layout-Split`, `Layout-Bento`, `Layout-Diagram`, `Layout-Quote`, `Layout-Comparison`).

#### 7. `references/04-svg-diagram-primitives.md` (Create)
* **Type / Scope**: Phase 3 Vector Primitives Playbook
* **Proposed Specifications**: Standardized 1200x675 canvas coordinate rules, 12-column grid formulas (`x = 48 + col * 92`), marker definitions, and complete SVG templates for Pipeline, Architecture Stack, 2x2 Matrix, Timeline, and Metric Highlights.

#### 8. `references/05-anti-slop-deck-audit.md` (Create)
* **Type / Scope**: Phase 4 Quality Inspection Playbook
* **Proposed Specifications**: The 10 Anti-Slop presentation audit rules (R-01 through R-10) with exact regex triggers and correction instructions.

#### 9. `templates/deck-skeleton.html` (Create)
* **Type / Scope**: Core Client Runtime Boilerplate
* **Proposed Specifications**: Clean standalone HTML5 boilerplate bundling the `<120 lines` `DeckEngine` runtime, responsive 16:9 matrix scaling CSS, toggleable speaker notes HUD, and `@media print` rules.

#### 10. `templates/tokens.css` (Create)
* **Type / Scope**: Modular Styling Tokens
* **Proposed Specifications**: Ready-to-use semantic CSS variable bundles for Dark Mode, Light Editorial, and High-Contrast Engineering Terminal themes.

#### 11. `examples/technical-architecture.html` (Create)
* **Type / Scope**: Complete Working Showcase Deck
* **Proposed Specifications**: Complete 8-slide technical presentation demonstrating zero-dependency inline SVGs, layout archetypes, presenter notes HUD, and matrix scaling.

#### 12. `examples/executive-pitch.html` (Create)
* **Type / Scope**: Complete Working Showcase Deck
* **Proposed Specifications**: Complete 6-slide editorial investor/product presentation demonstrating typography-driven layout and metric highlights.

#### 13. `tests/verify-deck.mjs` (Create)
* **Type / Scope**: Automated CI Validation Script
* **Proposed Specifications**: Node.js script parsing HTML files in `examples/` to verify: 0 external `<link>`/`<script>` tags, 1920x1080 canvas attributes, speaker notes presence, and valid CSS selectors.

#### 14. `docs/designs/SITEMAP.md` (Modify)
* **Type / Scope**: EGM Design Registry
* **Proposed Specifications**: Mark `0001-core-deck-engine.md` as `Superseded` and promote `0002-super-slides-skill-specification.md` to `Approved`.

### Verification Plan

* **Automated Test Execution**:
  * Run `npm test` (`node tests/verify-deck.mjs`).
  * Verify automated assertions pass: 0 HTTP network requests, 16:9 canvas dimensions, valid fragments, and non-empty speaker notes.
* **Skill Packaging & Discovery**:
  * Execute `npx skills add . -g --all` from the workspace root.
  * Run `npx skills ls -g` to verify `super-slides` resolves across all supported agents.
* **Offline Zero-Dependency Test**:
  * Open `examples/technical-architecture.html` and `examples/executive-pitch.html` directly from `file://` in browser.
  * Confirm 0 failed network requests in browser console and 100% correct font and SVG rendering.
* **Responsive Scaling & Letterbox Test**:
  * Resize browser window between 4:3, 16:9, 16:10, and portrait mobile dimensions.
  * Verify `transform: scale(var(--deck-scale))` preserves 16:9 proportions with zero vertical scrollbars.
* **Presenter Controls & Key Bindings**:
  * Press `ArrowRight`, `ArrowLeft`, `Space`, `Backspace`, `PageDown`, `PageUp` for fragment and slide stepping.
  * Press `F` to verify fullscreen toggle.
  * Press `N` to verify in-page speaker notes HUD overlay.
  * Press `O` to verify grid overview zoom.
* **Print & PDF Export Test**:
  * Trigger `Ctrl+P` / `Cmd+P` print preview.
  * Confirm exactly 1 clean 1920x1080 page per slide with controls and HUD hidden.
