# Phase 3: SVG Diagram Primitives Playbook

This playbook provides mathematical standards, markup skeletons, and micro-interaction patterns for authoring inline native SVG diagrams in `super-slides`.

## 1. Mathematical Canvas Standards

### ViewBox Dimensions and Exceptions
- **Canonical Component Diagram**: `viewBox="0 0 1200 675"` (strict 16:9 aspect ratio). Component SVGs and standalone architectural diagrams must adhere to this coordinate space.
- **Full-Bleed Stage Diagrams**: Must strictly maintain 16:9 geometry (e.g. `1200x675` or `1920x1080` coordinate space) to prevent distortion across responsive letterboxing.
- **Documented Wide Ribbon Exception**: Wide ribbon charts (such as `data-proof.html` with `viewBox="0 0 1520 340"`) are documented exceptions reserved strictly for horizontal metric ribbons, throughput curves, and gauge bars.

Canonical diagram declaration:
```xml
<svg viewBox="0 0 1200 675" class="diagram-svg" role="img" aria-label="System Architecture Diagram">
```

### The 12-Column Grid Formula
To maintain symmetric left and right margins across the 1200px width:
- **Outer Padding**: 56px (left and right)
- **Column Width**: 76px
- **Inter-Column Gap**: 16px
- **Column Pitch**: $76\text{px} + 16\text{px} = 92\text{px}$

The X coordinate for any zero-indexed column (0 through 11) is calculated as:
$$x(\text{col}) = 56 + \text{col} \times 92$$

Verification:
- Column 0: $x = 56$, width = 76, right edge = 132
- Column 11: $x = 56 + 11 \times 92 = 1068$, width = 76, right edge = 1144
- Right Margin: $1200 - 1144 = 56\text{px}$ (exact symmetry with left margin)

Span width across $N$ columns:
$$\text{width}(N) = N \times 76 + (N - 1) \times 16 = N \times 92 - 16$$

## 2. Standard Marker Definitions

Include reusable SVG markers in `<defs>` at the top of each diagram:

```xml
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--accent)" />
  </marker>
  <marker id="arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--surface-border)" />
  </marker>
</defs>
```

**Rule: every connector `<path>` must carry `fill="none"`.** SVG fills an open polyline by implicitly closing it back to its start point, so a bent connector without `fill="none"` renders as a solid triangle instead of a line. Straight segments hide this, bent ones do not, so set it on all of them without exception.

## 3. The 5 Vector Archetype Skeletons

### Archetype 1: Pipeline Workflow
Sequential execution flow across multiple processing stages.

```xml
<svg viewBox="0 0 1200 675" class="diagram-svg">
  <defs>
    <marker id="arrow-pipe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--accent)" />
    </marker>
  </defs>

  <!-- Stage 1 (Cols 0-2: x=56, w=260) -->
  <g class="node interactive-node" transform="translate(56, 260)">
    <rect width="260" height="150" rx="12" fill="var(--surface)" stroke="var(--surface-border)" stroke-width="2"/>
    <text x="24" y="50" fill="var(--text)" font-size="22" font-weight="600">Ingestion</text>
    <text x="24" y="85" fill="var(--text-muted)" font-size="16">Raw event stream capture</text>
  </g>

  <!-- Connector 1 -> 2 -->
  <path d="M 316 335 L 420 335" fill="none" stroke="var(--accent)" stroke-width="3" marker-end="url(#arrow-pipe)" class="edge" />

  <!-- Stage 2 (Cols 4-7: x=424, w=352) -->
  <g class="node interactive-node" transform="translate(424, 260)">
    <rect width="352" height="150" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>
    <text x="24" y="50" fill="var(--text)" font-size="22" font-weight="600">Normalization</text>
    <text x="24" y="85" fill="var(--text-muted)" font-size="16">Schema validation and enrichments</text>
  </g>

  <!-- Connector 2 -> 3 -->
  <path d="M 776 335 L 880 335" fill="none" stroke="var(--accent)" stroke-width="3" marker-end="url(#arrow-pipe)" class="edge" />

  <!-- Stage 3 (Cols 9-11: x=884, w=260) -->
  <g class="node interactive-node" transform="translate(884, 260)">
    <rect width="260" height="150" rx="12" fill="var(--surface)" stroke="var(--surface-border)" stroke-width="2"/>
    <text x="24" y="50" fill="var(--text)" font-size="22" font-weight="600">Commit Store</text>
    <text x="24" y="85" fill="var(--text-muted)" font-size="16">Durable append-only log</text>
  </g>
</svg>
```

### Archetype 2: Architecture Stack
Tiered layers demonstrating system separation.

```xml
<svg viewBox="0 0 1200 675" class="diagram-svg">
  <!-- Layer 1: Client Edge (y=80, h=100, x=56, w=1088) -->
  <g class="node interactive-node" transform="translate(56, 80)">
    <rect width="1088" height="100" rx="12" fill="var(--surface)" stroke="var(--surface-border)" stroke-width="2"/>
    <text x="32" y="45" fill="var(--accent)" font-size="16" font-weight="700">PRESENTATION LAYER</text>
    <text x="32" y="75" fill="var(--text)" font-size="20">Edge CDN, Web Clients, Native Applications</text>
  </g>

  <!-- Layer 2: API Gateway & Service Mesh (y=210, h=140, x=56, w=1088) -->
  <g class="node interactive-node" transform="translate(56, 210)">
    <rect width="1088" height="140" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>
    <text x="32" y="45" fill="var(--accent)" font-size="16" font-weight="700">SERVICE FABRIC</text>
    <text x="32" y="75" fill="var(--text)" font-size="20">gRPC Gateway, Authentication, Load Balancing</text>
    <text x="32" y="105" fill="var(--text-muted)" font-size="16">Autonomous microservices orchestrated via Raft consensus</text>
  </g>

  <!-- Layer 3: Storage Engine (y=380, h=100, x=56, w=1088) -->
  <g class="node interactive-node" transform="translate(56, 380)">
    <rect width="1088" height="100" rx="12" fill="var(--surface)" stroke="var(--surface-border)" stroke-width="2"/>
    <text x="32" y="45" fill="var(--accent)" font-size="16" font-weight="700">STORAGE SUBSYSTEM</text>
    <text x="32" y="75" fill="var(--text)" font-size="20">Distributed Key-Value Store, Columnar Analytics Log</text>
  </g>
</svg>
```

### Archetype 3: 2x2 Matrix
Categorization grid across two orthogonal axes.

```xml
<svg viewBox="0 0 1200 675" class="diagram-svg">
  <!-- Grid Lines -->
  <line x1="600" y1="90" x2="600" y2="590" stroke="var(--surface-border)" stroke-width="2" stroke-dasharray="6 6"/>
  <line x1="160" y1="340" x2="1040" y2="340" stroke="var(--surface-border)" stroke-width="2" stroke-dasharray="6 6"/>

  <!-- Axis Labels -->
  <text x="600" y="60" text-anchor="middle" fill="var(--text-muted)" font-size="18">HIGH IMPACT &uarr;</text>
  <text x="600" y="625" text-anchor="middle" fill="var(--text-muted)" font-size="18">LOW IMPACT &darr;</text>
  <text x="120" y="346" text-anchor="end" fill="var(--text-muted)" font-size="18">&larr; COMPLEX</text>
  <text x="1080" y="346" text-anchor="start" fill="var(--text-muted)" font-size="18">SIMPLE &rarr;</text>

  <!-- Quadrant: High Impact / Simple (Top Right) -->
  <g class="node interactive-node" transform="translate(630, 110)">
    <rect width="400" height="200" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>
    <text x="24" y="45" fill="var(--accent)" font-size="16" font-weight="700">CORE FOCUS</text>
    <text x="24" y="80" fill="var(--text)" font-size="22" font-weight="600">In-Memory Transform Caching</text>
    <text x="24" y="115" fill="var(--text-muted)" font-size="16">Immediate 60% latency reduction with trivial footprint</text>
  </g>
</svg>
```

### Archetype 4: Timeline Milestones
Sequential chronological roadmap.

```xml
<svg viewBox="0 0 1200 675" class="diagram-svg">
  <!-- Baseline Track (x=56 to 1144, y=337) -->
  <line x1="56" y1="337" x2="1144" y2="337" stroke="var(--surface-border)" stroke-width="4"/>

  <!-- Milestone 1 -->
  <g class="node interactive-node" transform="translate(180, 220)">
    <circle cx="0" cy="117" r="16" fill="var(--bg)" stroke="var(--accent)" stroke-width="4"/>
    <text x="0" y="60" text-anchor="middle" fill="var(--accent)" font-size="16" font-weight="700">PHASE 1</text>
    <text x="0" y="85" text-anchor="middle" fill="var(--text)" font-size="20" font-weight="600">Foundation</text>
    <text x="0" y="165" text-anchor="middle" fill="var(--text-muted)" font-size="15">Matrix scale engine</text>
  </g>

  <!-- Milestone 2 -->
  <g class="node interactive-node" transform="translate(600, 220)">
    <circle cx="0" cy="117" r="16" fill="var(--accent)" stroke="var(--accent)" stroke-width="4"/>
    <text x="0" y="60" text-anchor="middle" fill="var(--accent)" font-size="16" font-weight="700">PHASE 2</text>
    <text x="0" y="85" text-anchor="middle" fill="var(--text)" font-size="20" font-weight="600">Vector Primitives</text>
    <text x="0" y="165" text-anchor="middle" fill="var(--text-muted)" font-size="15">Interactive SVG suite</text>
  </g>

  <!-- Milestone 3 -->
  <g class="node interactive-node" transform="translate(1020, 220)">
    <circle cx="0" cy="117" r="16" fill="var(--bg)" stroke="var(--surface-border)" stroke-width="4"/>
    <text x="0" y="60" text-anchor="middle" fill="var(--text-muted)" font-size="16" font-weight="700">PHASE 3</text>
    <text x="0" y="85" text-anchor="middle" fill="var(--text)" font-size="20" font-weight="600">Production</text>
    <text x="0" y="165" text-anchor="middle" fill="var(--text-muted)" font-size="15">Universal agent rollout</text>
  </g>
</svg>
```

### Archetype 5: Metric Highlights
Quantitative telemetry cards with trend metrics.

```xml
<svg viewBox="0 0 1200 675" class="diagram-svg">
  <!-- Metric Card 1 (Cols 0-3: x=56, w=352) -->
  <g class="node interactive-node" transform="translate(56, 180)">
    <rect width="352" height="315" rx="16" fill="var(--surface)" stroke="var(--surface-border)" stroke-width="2"/>
    <text x="32" y="60" fill="var(--text-muted)" font-size="16" font-weight="600">INPUT LATENCY</text>
    <text x="32" y="140" fill="var(--accent)" font-size="64" font-weight="700">1.2ms</text>
    <text x="32" y="190" fill="var(--accent-alt)" font-size="18">&darr; 84% reduction vs baseline</text>
    <text x="32" y="240" fill="var(--text-muted)" font-size="15">Zero event queue backlog</text>
  </g>

  <!-- Metric Card 2 (Cols 4-7: x=424, w=352) -->
  <g class="node interactive-node" transform="translate(424, 180)">
    <rect width="352" height="315" rx="16" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>
    <text x="32" y="60" fill="var(--text-muted)" font-size="16" font-weight="600">MEMORY ALLOCATION</text>
    <text x="32" y="140" fill="var(--text)" font-size="64" font-weight="700">0 KB</text>
    <text x="32" y="190" fill="var(--accent-alt)" font-size="18">0 GC sweeps per transition</text>
    <text x="32" y="240" fill="var(--text-muted)" font-size="15">Static class recycling</text>
  </g>

  <!-- Metric Card 3 (Cols 8-11: x=792, w=352) -->
  <g class="node interactive-node" transform="translate(792, 180)">
    <rect width="352" height="315" rx="16" fill="var(--surface)" stroke="var(--surface-border)" stroke-width="2"/>
    <text x="32" y="60" fill="var(--text-muted)" font-size="16" font-weight="600">BUNDLE FOOTPRINT</text>
    <text x="32" y="140" fill="var(--text)" font-size="64" font-weight="700">&lt;12KB</text>
    <text x="32" y="190" fill="var(--accent)" font-size="18">100% self-contained</text>
    <text x="32" y="240" fill="var(--text-muted)" font-size="15">Zero runtime dependencies</text>
  </g>
</svg>
```

## 4. Micro-Interactions and Hover Illumination

To enhance diagram clarity without runtime scripts:

### Node Hover Focus
```css
g.interactive-node {
  cursor: pointer;
  transition: transform 180ms ease;
}

g.interactive-node rect {
  transition: stroke 180ms ease, fill 180ms ease;
}

g.interactive-node:hover rect {
  stroke: var(--accent) !important;
}
```

#### Zero-Shadow Rule (Editorial Diagram Discipline)
SVG diagram primitives strictly forbid elevation blur filters, glow halos, and faux depth shading. Contrast and visual hierarchy are established exclusively through stroke color transitions (`var(--surface-border)` to `var(--accent)`), calibrated stroke weights, and clean tonal fills, matching Reference 06.

### Connected Edge Illumination
```css
path.edge {
  transition: stroke 180ms ease, stroke-width 180ms ease;
}

path.edge:hover {
  stroke: var(--accent) !important;
  stroke-width: 4px !important;
}
```

### Tooltip Popovers
Use native SVG `<title>` nodes for instant accessible hover tooltips without script overhead:
```xml
<g class="node interactive-node" transform="translate(56, 260)">
  <title>Ingestion Stage: Ingests 250,000 events/sec via memory-mapped buffers</title>
  <rect width="260" height="150" rx="12" fill="var(--surface)"/>
  <!-- Text Elements -->
</g>
```

## 5. CSS Containment and Hit-Test Isolation Rules

Complex SVGs containing hundreds of nodes can cause cursor hit-test thrashing during slide transitions.
Enforce these containment rules:

1. **Root Containment**: Apply `contain: paint layout` to `.diagram-svg`.
2. **Hit-Test Suppression**: Non-interactive decorative elements (background grid lines, connector arrows, static labels) must carry `pointer-events: none`.
3. **Selective Activation**: Apply `pointer-events: auto` or `all` only to elements with explicit hover states (`.interactive-node`).
4. **Transition Invariant**: During macro slide movement, the root `#deck-viewport.is-transitioning` class globally applies `pointer-events: none !important`, suppressing all SVG hit-tests and preserving 60 FPS compositor speed.
