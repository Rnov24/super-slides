# Reference 03: High-Precision SVG Diagram Rules

This reference establishes the mechanical and visual rules for authoring inline SVG diagrams in `super-slides`.

All vector diagrams must follow editorial diagram discipline (adapted from Cathryn Lavery and systems engineering standards). Automated flowchart generators, uncalibrated lines, and generic icon slop are strictly banned.

---

## 1. Geometric Grid & Canonical ViewBoxes

1. **4px Coordinate Grid Snap**:
   - All vertex centers, edge endpoints, box coordinates, and radii must snap to a 4px coordinate grid (e.g., 120, 160, 240, 280, 460).
   - Never use arbitrary sub-pixel floating coordinates.
2. **Canonical ViewBox**:
   - Standard 16:9 diagram viewBox is strictly `0 0 1200 675`.
   - Permitted wide-band exceptions:
     - Split canvas right pane: `0 0 760 520`
     - Full diagram dedicated canvas: `0 0 1720 680`
   - Every `<svg>` element must specify `viewBox` and `preserveAspectRatio="xMidYMid meet"`.

---

## 2. The Opaque Halo Pill Rule (Anti-Slicing)

A diagram line or connector must NEVER slice through text labels:
- **Mandatory Opaque Background**: EVERY text label inside an SVG diagram must sit on an OPAQUE background pill with `fill="var(--surface)"`.
- **Translucent Soft Fills Banned**: Never use translucent fills (such as `rgba(..., 0.1)`) behind labels. Lines underneath bleed through translucent pills, ruining projector legibility.
- **Anti-Crossing Paint Order**: In the SVG DOM, all label pills and text elements must be painted AFTER (below in document order) all intersecting lines and connector paths. Alternatively, connector paths must be rerouted around the label with a minimum 8px clearance.

```xml
<!-- CORRECT Opaque Halo Pill Pattern -->
<line x1="160" y1="200" x2="480" y2="200" stroke="var(--surface-border)" stroke-width="2" />
<rect x="280" y="186" width="80" height="28" rx="14" fill="var(--surface)" stroke="var(--surface-border)" stroke-width="1" />
<text x="320" y="205" text-anchor="middle" font-family="var(--font-mono)" font-size="12" font-weight="700" fill="var(--text)">4 km</text>
```

---

## 3. Stroke Animation with pathLength="100"

All animated paths, curves, and traversing lines must declare `pathLength="100"`:
- Declaring `pathLength="100"` normalizes the path stroke length to a percentage basis, regardless of complex bezier coordinate lengths.
- Enables deterministic CSS stroke drawing animations without calculating manual pixel lengths:
```xml
<path d="M 120 560 Q 600 550 1000 535 T 1620 510" fill="none" stroke="var(--accent)" stroke-width="4" pathLength="100" class="path-draw" />
```

---

## 4. Orthogonal Elbow Connectors

Connectors linking nodes, subsystems, or callout cards must use orthogonal elbow geometry:
- Never draw diagonal lines slicing across unrelated components.
- Use horizontal and vertical legs joined by circular fillets with radius `r=8`:
```xml
<!-- Orthogonal Elbow Connector (r=8) -->
<path d="M 280 160 L 460 160 Q 468 160 468 168 L 468 280" fill="none" stroke="var(--surface-border)" stroke-width="2" />
```
- Maintain a 6px to 10px gap between arrow terminations and target boundaries.

---

## 5. Diagram Complexity Budget Ceilings

To preserve instant scannability, every standalone diagram must observe strict complexity limits:
- Maximum 9 nodes or subsystem blocks.
- Maximum 12 connector arrows.
- Maximum 2 accent-orange focal elements.
- Maximum 2 decision callout badges.
- If a system exceeds these ceilings, split into an overview diagram followed by a detailed drill-down slide.

---

## 6. Zero Elevation Shadows and Flat Tonal Planes

- Drop shadows, glow halos, and blurry elevation filters and blur filters are strictly BANNED across all SVG elements.
- Depth and hierarchy are achieved exclusively through:
  - 1px hairlines (`stroke="var(--surface-border)" stroke-width="1"`).
  - Tonal contrast between `var(--bg)` and `var(--surface)`.
  - Focused accent strokes (`stroke="var(--accent)" stroke-width="3"` or `4`).
