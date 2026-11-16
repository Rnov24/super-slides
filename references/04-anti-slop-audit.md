# Reference 04: Anti-Slop Deck Audit & Quality Filter

This playbook defines the definitive verification checklist (P0 through P3) for `super-slides`.

Every generated deck must undergo this audit before final delivery. Any violation must be corrected before presenting the presentation to the user.

---

## 1. Graded Validation Tiers (P0 through P3)

### Priority P0: Blocker / Structural Integrity
- **R-11 (Vertical Content Span >= 65%)**:
  - Measured from the top of the kicker to the bottom-most content element (excluding the deck footer).
  - The content span must be at least 702px on the 1080px stage (>= 65%).
  - Top-heavy floating slides with blank lower halves fail this check.
  - Pole slides (`layouts/pole-hero.html`, `layouts/pole-stat.html`) satisfy R-11 via top+bottom spatial anchoring (title at y=72px to bottom context chips at y=800-880px).
- **R-11 (Maximum Internal Gap <= 150px)**:
  - Across vertically stacked flows, the maximum gap between consecutive text-ink bands must not exceed 150px.
  - `layouts/horizontal-track.html` is exempt from this gap rule when measured standalone: its middle band is the diagram slot by design, so measure the gap only when the layout is composed with a diagram (for example `diagrams/pipeline-flow.html`).
- **R-11 (Zero Stage Ink Overflow)**:
  - All text and visual elements must remain strictly within the 1920x1080 canvas boundaries (bottom ink <= 1024px).
- **R-17 (Stage Canvas Integrity)**:
  - `.deck-canvas` must declare `flex-shrink: 0`.
  - Viewport letterboxing must preserve 16:9 aspect ratio at all window dimensions without distorting slide content.

### Priority P1: Visual Taste & Design Contract
- **R-04 (Zero External Network Calls)**:
  - Zero external `<link>` or `<script>` tags.
  - All fonts embedded as base64 woff2 data URIs or using native system font stacks.
  - 100% functional from `file://` or `http://localhost` offline.
- **R-07 (WCAG 4.5:1 Contrast Floor)**:
  - All text pairings meet or exceed 4.5:1 contrast against their immediate background.
- **Three-Tier Token Architecture**:
  - Themes contain tokens only; components use semantic tokens (`var(--*)`).
- **Single Accent Budget**:
  - Canvas remains 80% to 90% neutral.
  - Primary accent occupies 5% to 10% max (at most 2 focal elements per slide).

### Priority P2: Editorial & Graphic Discipline
- **R-01 (Purpose Test)**: Every badge, line, chip, and metric serves an explicit functional purpose.
- **R-02 (Icon Sanity)**: No decorative emojis, floating icons, or generic clip-art.
- **R-05 (Strict Em-Dash Ban)**: Zero em-dashes across all slide titles, body copy, and diagram labels. Use colons, hyphens, or commas instead.
- **R-14 (Layout Variety & Walkthrough Exception)**:
  - No two consecutive slides share the same layout structure, EXCEPT for consecutive multi-step state walkthrough slides using `layouts/split-canvas.html` with `.locked-stage`.
- **R-15 (Text Economy & Prose Limits)**:
  - Narrative body paragraphs must not exceed 40 words per slide.
  - Data table cells and SVG diagram labels are excluded from this 40-word limit.
- **R-16 (Projector Legibility Floor)**:
  - Body text never goes below 18px. Never shrink body text to 10px-14px to fix crowding.

### Priority P3: Navigation & Accessibility
- **R-06 (Aspect Containment)**: 16:9 canvas maintains scale; zero window scrollbars.
- **R-09 (Keyboard Navigation & HUD)**:
  - Arrow keys, Space, Backspace, Home, End, F (fullscreen), O (overview), and ? (HUD) fully operational.
- **R-10 (Print Fidelity)**:
  - `@media print` renders each slide as a standalone 1920x1080 page without clipping.
- **Reduced Motion Fallback**:
  - `@media (prefers-reduced-motion: reduce)` resets transitions, zeroing duration and transforms.

---

## 2. Pre-Delivery Audit Execution Steps

1. Run automated test suite: `npm test`.
2. Inspect rendered slides in headless Chromium at 1920x1080.
3. Validate text-ink bounding boxes for R-11 content span (>= 65%) and internal gaps (<= 150px).
4. Verify that no text element overflows y=1024px.
5. Confirm zero em-dashes in presentation source code.
