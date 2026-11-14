# Goldfish Annotated Review Report

**Status:** resolved  
**Target:** `docs/designs/0002-super-slides-skill-specification.md` (`Lines 1-309`)

## Reviewer Status

| Reviewer | Status |
| --- | --- |
| `egm-design` | completed |
| `egm-structural` | completed |
| `egm-implementation-readiness` | completed |
| `egm-zoom-out` | completed |
| `egm-codebase-details` | completed |

---

## Prioritized Findings & AI Suggestions

### 1. Inviable Dual-Window `BroadcastChannel` Sync over `file://` Protocol [`egm-design`, `egm-zoom-out`] - Severity: Blocker
* **Affected Scope:** [Lines 42, 60, 102, 164, 188](file:///D:/Projects/super-slides/docs/designs/0002-super-slides-skill-specification.md#L42-L188) (Technical Plan & Open Questions)
* **Discrepancy Description:** The specification mandates offline execution directly from local `file://` URLs while relying on `BroadcastChannel` for cross-window presenter console synchronization. In modern Chromium and WebKit browsers, documents loaded via `file://` are assigned opaque origins (`origin: null`), preventing `BroadcastChannel` instances in different windows from communicating.
* **Rationale:** Relying on `BroadcastChannel` as the primary offline presenter sync mechanism causes silent communication failure when opened directly from local disk.
* **AI Suggestion:** PROPOSE FIX
* **Justification:** Decouple the primary offline presenter interface from multi-window communication. Standardize on the in-page toggleable HUD overlay (`#speaker-hud` via key `N`) as the primary offline presenter mechanism. Clarify that dual-window `BroadcastChannel` sync is supported when hosted on `http://localhost`.
* **Proposed Edit:**
  * Location: Lines 42, 60, 102, 164
  * Change: Update Open Question 2 and runtime engine documentation to define in-page overlay as primary offline interface and dual-window broadcast as a localhost-enhanced mode.

---

### 2. Zero-Decision Rule Violations across Implementation Plan [`egm-implementation-readiness`] - Severity: Blocker
* **Affected Scope:** [Lines 234-290](file:///D:/Projects/super-slides/docs/designs/0002-super-slides-skill-specification.md#L234-L290) (Section "Detailed Implementation Plan")
* **Discrepancy Description:** The implementation plan leaves critical architectural, visual, and code decisions to the implementer (omitting `SKILL.md` transition tables, layout CSS structures, SVG archetype skeletons, and theme variable values).
* **Rationale:** Violates the Implementation Readiness Standard by leaving design choices to the implementer.
* **AI Suggestion:** PROPOSE FIX
* **Justification:** Expand the Detailed Implementation Plan to include concrete CSS layout wireframes, token values, SVG archetype definitions, and the state router transition table.
* **Proposed Edit:**
  * Location: Section "Detailed Implementation Plan"
  * Change: Provide explicit code structures, layout schemas, and token definitions for all 12 planned files.

---

### 3. Stepped Fragment Animation Logic Absent from Runtime Engine [`egm-structural`, `egm-implementation-readiness`] - Severity: Blocker
* **Affected Scope:** [Lines 96, 181-198](file:///D:/Projects/super-slides/docs/designs/0002-super-slides-skill-specification.md#L96-L198) (Client-Side Runtime Engine Specifications)
* **Discrepancy Description:** Line 96 specifies `Stepped Fragment Nodes (.fragment.fade-in)`, but `DeckEngine` contains no state management or handlers for stepping through fragments before advancing slide indices.
* **Rationale:** Slides with bullet points or progressive diagrams cannot reveal elements incrementally.
* **AI Suggestion:** PROPOSE FIX
* **Justification:** Add `currentFragmentIndex`, `stepForward()`, and `stepBackward()` methods to `DeckEngine` to intercept forward/backward navigation events.
* **Proposed Edit:**
  * Location: Lines 158-199
  * Change: Incorporate fragment state management into `DeckEngine` and wire it into the keyboard event listener.

---

### 4. Mathematical Flaw in 12-Column SVG Coordinate Grid Formula [`egm-codebase-details`] - Severity: Major
* **Affected Scope:** [Lines 135-136](file:///D:/Projects/super-slides/docs/designs/0002-super-slides-skill-specification.md#L135-L136) (SVG Primitive Standards)
* **Discrepancy Description:** The formula `x = 100 * col + gap` on a 1200px canvas overflows the canvas boundaries when non-zero gutters are added across 12 columns.
* **Rationale:** Causes rendered SVG diagrams to clip on the right edge.
* **AI Suggestion:** PROPOSE FIX
* **Justification:** Standardize the formula to include canvas padding and gutter distribution: `columnWidth = (1200 - 2 * padding - 11 * gap) / 12`, with `x = padding + col * (columnWidth + gap)`.
* **Proposed Edit:**
  * Location: Line 136
  * Change: Replace with: `Column coordinates: padding = 48px, gap = 16px, columnWidth = 76px. x = 48 + col * 92`.

---

### 5. Incomplete Runtime API Stubs in Feature Specification [`egm-structural`, `egm-zoom-out`] - Severity: Major
* **Affected Scope:** [Lines 158-199](file:///D:/Projects/super-slides/docs/designs/0002-super-slides-skill-specification.md#L158-L199) (Runtime Engine)
* **Discrepancy Description:** `DeckEngine` invokes un-implemented methods (`this.readHash()`, `this.updateNotes()`, `this.toggleFullscreen()`, `this.toggleNotes()`, `this.toggleOverview()`).
* **Rationale:** Incomplete code snippet creates ambiguity for implementers.
* **AI Suggestion:** PROPOSE FIX
* **Justification:** Provide the complete, working <120-line implementation including all helper methods.
* **Proposed Edit:**
  * Location: Lines 158-199
  * Change: Replace with complete, syntactically functional JavaScript implementation.

---

### 6. Unresolved Contradiction with `docs/architecture/README.md` and `0001` [`egm-codebase-details`, `egm-zoom-out`] - Severity: Major
* **Affected Scope:** [Lines 61-105](file:///D:/Projects/super-slides/docs/designs/0002-super-slides-skill-specification.md#L61-L105); `docs/architecture/README.md`; `docs/designs/SITEMAP.md`
* **Discrepancy Description:** `0001-core-deck-engine.md` specifies a TypeScript library with modular classes, while `0002` specifies an AgentSkill generating inline HTML/JS without explicitly marking `0001` superseded.
* **Rationale:** Multiple conflicting architecture blueprints cause confusion for contributors and agents.
* **AI Suggestion:** PROPOSE FIX
* **Justification:** Explicitly state in `0002` and `SITEMAP.md` that `0002` supersedes the standalone TypeScript engine in `0001` with the self-contained AgentSkill template runtime.
* **Proposed Edit:**
  * Location: Overview section of `0002` and `docs/designs/SITEMAP.md`
  * Change: Add supersession note and update sitemap status for `0001` to `Superseded`.

---

### 7. Print Media Stylesheet Incompatibility with CSS Transform Scaling [`egm-design`, `egm-codebase-details`] - Severity: Major
* **Affected Scope:** [Lines 91, 152, 272, 307-309](file:///D:/Projects/super-slides/docs/designs/0002-super-slides-skill-specification.md#L91-L309) (Print Stylesheet)
* **Discrepancy Description:** Standard browser print engines clip all pages except the active slide when a parent container has `transform: scale(...)` and `overflow: hidden`.
* **Rationale:** Causes `Ctrl+P` PDF export to fail or produce only a single broken slide.
* **AI Suggestion:** PROPOSE FIX
* **Justification:** Specify explicit print reset CSS rules in `templates/deck-skeleton.html`.
* **Proposed Edit:**
  * Location: Line 91 and Section 1
  * Change: Add explicit `@media print { html, body { overflow: visible !important; } .deck-viewport { display: block !important; overflow: visible !important; } .deck-canvas { transform: none !important; width: 1920px !important; height: auto !important; } .slide { display: block !important; page-break-after: always; break-after: page; width: 1920px !important; height: 1080px !important; } .speaker-hud, .deck-controls { display: none !important; } }`.

---

### 8. Lack of Automated Verification and CI Test Strategy [`egm-implementation-readiness`] - Severity: Major
* **Affected Scope:** [Lines 291-309](file:///D:/Projects/super-slides/docs/designs/0002-super-slides-skill-specification.md#L291-L309) (Verification Plan)
* **Discrepancy Description:** Verification Plan relies entirely on manual human interactions ("Disconnect Wi-Fi", "Press N", "Press O") with zero automated test scripts.
* **Rationale:** Regressions in offline zero-dependency rules or scaling cannot be caught automatically.
* **AI Suggestion:** PROPOSE FIX
* **Justification:** Add a lightweight automated validation test script (`tests/verify-deck.mjs`) that parses generated HTML files to verify 0 external `<link>`/`<script>` tags, 16:9 canvas dimensions, and slide counts.
* **Proposed Edit:**
  * Location: Section "Target Files" and "Verification Plan"
  * Change: Add `tests/verify-deck.mjs` and wire to `npm test`.

---

### 9. Informal Maintainer Attribution in Alternatives Considered [`egm-design`] - Severity: Nit
* **Affected Scope:** [Lines 208, 213, 218](file:///D:/Projects/super-slides/docs/designs/0002-super-slides-skill-specification.md#L208-L218)
* **Discrepancy Description:** Rejections use informal "Rejected by author:" phrasing without issue/PR citations.
* **Rationale:** Violates feature-spec-standard formatting guidelines.
* **AI Suggestion:** PROPOSE FIX
* **Justification:** Replace with objective technical trade-off phrasing.
* **Proposed Edit:**
  * Location: Lines 208, 213, 218
  * Change: Replace "Rejected by author: [reason]" with "Rejected: [objective technical reason]".

---

### 10. Duplicate Sitemap Registration Proposal [`egm-structural`, `egm-codebase-details`] - Severity: Nit
* **Affected Scope:** [Lines 286-289](file:///D:/Projects/super-slides/docs/designs/0002-super-slides-skill-specification.md#L286-L289)
* **Discrepancy Description:** Implementation plan proposes modifying sitemap to register `0002` with status `Proposed`, but `0002` is already registered.
* **Rationale:** Redundant modification proposal.
* **AI Suggestion:** PROPOSE FIX
* **Justification:** Update the task to reflect updating status to `Approved` and marking `0001` as `Superseded`.
* **Proposed Edit:**
  * Location: Item 13 in Implementation Plan
  * Change: Specify updating `0002` status to `Approved` and `0001` to `Superseded`.

---

### 11. Discrepancy in Keyboard Shortcut Documentation [`egm-structural`] - Severity: Nit
* **Affected Scope:** [Lines 99, 191-197, 303](file:///D:/Projects/super-slides/docs/designs/0002-super-slides-skill-specification.md#L99-L303)
* **Discrepancy Description:** Keyboard shortcut listings are inconsistent between architecture diagram, runtime code, and verification plan.
* **Rationale:** Minor documentation divergence.
* **AI Suggestion:** PROPOSE FIX
* **Justification:** Standardize the complete shortcut mapping across all sections.
* **Proposed Edit:**
  * Location: Lines 99, 191, 303
  * Change: Harmonize the key list across all three sections.
