# Phase 3: Components and Layouts Playbook

This playbook defines the slide layout archetypes, HTML patterns, and micro-interaction standards for Phase 3 of `super-slides`.

## 1. Canvas and Slide Container Structure

All slides reside inside the 16:9 matrix scaling canvas:

```html
<div class="deck-viewport" id="deck-viewport">
  <div class="deck-canvas" id="deck-canvas">
    <section class="slide slide-current" data-layout="hero">
      <!-- Slide Content -->
    </section>
  </div>
</div>
```

Every `<section class="slide">` represents one presentation frame. The active slide receives the `.slide-current` class.

## 2. The 6 Core Layout Archetypes

### 1. Layout-Hero
Used for title slides, section dividers, and high-impact conclusions.
- **Structure**: Overarching kicker tag, bold title (56-72px), concise subtitle (24-32px), and metadata footer.
- **HTML Pattern**:
```html
<section class="slide" data-layout="hero">
  <div class="slide-content hero-content">
    <span class="kicker">SYSTEM ARCHITECTURE</span>
    <h1 class="hero-title">Zero-Latency Event Fabric</h1>
    <p class="hero-subtitle">Bypassing DOM reflows to achieve predictable sub-millisecond execution</p>
    <div class="hero-meta">
      <span>Platform Engineering Team</span>
      <span class="meta-dot">&bull;</span>
      <span>Q4 Technical Review</span>
    </div>
  </div>
</section>
```

### 2. Layout-Split
Used for concept explanations pairing narrative rationale with an illustrative diagram or code block.
- **Structure**: 50/50 two-column asymmetric grid. Left column carries problem statement and key takeaways. Right column carries code or diagram.
- **HTML Pattern**:
```html
<section class="slide" data-layout="split">
  <div class="slide-header">
    <span class="kicker">EXECUTION PIPELINE</span>
    <h2>Direct-to-GPU Frame Dispatch</h2>
  </div>
  <div class="split-body">
    <div class="split-left">
      <p class="lead-text">Eliminate browser compositor latency by binding updates directly to transform layers.</p>
      <div class="stat-callout fragment">
        <span class="stat-number">0.4ms</span>
        <span class="stat-label">Compositor round-trip delay</span>
      </div>
    </div>
    <div class="split-right">
      <div class="code-container" data-prevent-slide-swipe>
        <pre><code>// Direct compositing bypass
const layer = canvas.getLayerContext();
layer.commitHardwareTransform(matrix);</code></pre>
      </div>
    </div>
  </div>
</section>
```

### 3. Layout-Bento
Used for metric summaries, feature overviews, and architecture modularity.
- **Structure**: 3 to 4 asymmetric cards arranged in a CSS Grid with clear hierarchy (one prominent primary card and supporting metric cards).
- **HTML Pattern**:
```html
<section class="slide" data-layout="bento">
  <div class="slide-header">
    <span class="kicker">SYSTEM METRICS</span>
    <h2>Performance Bounds Under Load</h2>
  </div>
  <div class="bento-grid">
    <div class="bento-card bento-hero">
      <h3>Deterministic P99 Latency</h3>
      <p class="card-metric">14.2ms</p>
      <p class="card-desc">Sustained across 100,000 continuous state shifts without GC spikes.</p>
    </div>
    <div class="bento-card">
      <h3>Memory Footprint</h3>
      <p class="card-metric">3.2 MB</p>
      <p class="card-desc">Zero external runtime allocations.</p>
    </div>
    <div class="bento-card">
      <h3>Frame Droppage</h3>
      <p class="card-metric">0.0%</p>
      <p class="card-desc">Zero compositor hitch over 60 FPS.</p>
    </div>
  </div>
</section>
```

### 4. Layout-Diagram
Used for deep technical architecture, data pipelines, and sequence workflows.
- **Structure**: Full-canvas layout dedicating 75%+ of available height to an inline native SVG diagram, framed by a concise header and takeaways.
- **HTML Pattern**:
```html
<section class="slide" data-layout="diagram">
  <div class="slide-header">
    <span class="kicker">DATA FLOW</span>
    <h2>Single-Flight Coalescing Topology</h2>
  </div>
  <div class="diagram-container">
    <svg viewBox="0 0 1200 675" class="diagram-svg">
      <!-- Standard 1200x675 vector geometry -->
    </svg>
  </div>
</section>
```

### 5. Layout-Quote
Used for core convictions, design principles, and thesis anchoring.
- **Structure**: Large, high-contrast pull-quote (40-52px), attribution badge, and context note.
- **HTML Pattern**:
```html
<section class="slide" data-layout="quote">
  <div class="quote-container">
    <blockquote class="quote-text">
      "True velocity is not typing speed; it is the elimination of unnecessary architectural layers."
    </blockquote>
    <div class="quote-author">
      <span class="author-name">Principal Systems Architect</span>
      <span class="author-title">Core Runtime Group</span>
    </div>
  </div>
</section>
```

### 6. Layout-Comparison
Used for Before vs After, Deprecated vs Proposed, or Trade-off analyses.
- **Structure**: Two side-by-side cards with mirrored structures and contrasting badges.
- **HTML Pattern**:
```html
<section class="slide" data-layout="comparison">
  <div class="slide-header">
    <span class="kicker">TRADE-OFF MATRIX</span>
    <h2>State Synchronization Strategies</h2>
  </div>
  <div class="comparison-grid">
    <div class="comparison-column card-negative">
      <span class="column-badge badge-dim">PREVIOUS APPROACH</span>
      <h3>Global Polling Loop</h3>
      <ul class="comparison-list">
        <li>Continuous timer interruptions</li>
        <li>12% CPU overhead in idle state</li>
        <li>Prone to race conditions on network blips</li>
      </ul>
    </div>
    <div class="comparison-column card-positive">
      <span class="column-badge badge-accent">PROPOSED ENGINE</span>
      <h3>Atomic Broadcast Channel</h3>
      <ul class="comparison-list">
        <li>Zero idle CPU utilization</li>
        <li>Local memory channel messaging</li>
        <li>Deterministic single-flight delivery</li>
      </ul>
    </div>
  </div>
</section>
```

## 3. Micro-Interaction Markup Patterns

Micro-interactions operate purely via pointer events without interfering with macro slide navigation.

### Bento Hover Lift
Apply hardware-accelerated subtle elevation on interactive cards:
```css
.bento-card {
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  padding: 32px;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
  will-change: transform;
}

.bento-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}
```

### Interactive Tabbed Panels
For in-slide content inspection (such as switching between TypeScript, Go, and Rust snippets):
```html
<div class="tab-widget">
  <div role="tablist" class="tab-buttons">
    <button role="tab" aria-selected="true" class="tab-btn active" data-tab="tab-1">Client SDK</button>
    <button role="tab" aria-selected="false" class="tab-btn" data-tab="tab-2">Edge Worker</button>
  </div>
  <div class="tab-panels">
    <div role="tabpanel" id="tab-1" class="tab-panel active">
      <pre><code>// Client SDK snippet</code></pre>
    </div>
    <div role="tabpanel" id="tab-2" class="tab-panel">
      <pre><code>// Edge Worker snippet</code></pre>
    </div>
  </div>
</div>
```

## 4. Touch-Scroll Isolation: `data-prevent-slide-swipe`

Horizontal gestures navigate slides by default.
Any horizontally scrollable container inside a slide (such as wide code blocks, tables, or carousels) must carry the `data-prevent-slide-swipe` attribute:

```html
<div class="code-scroll-view" data-prevent-slide-swipe>
  <pre><code>// Very wide line of code that scrolls horizontally</code></pre>
</div>
```

The touch controller queries `e.target.closest('[data-prevent-slide-swipe]')` and allows native content scrolling when present.

## 5. Instant Cut Slides: `data-transition="cut"`

For live-coding demonstrations, terminal output changes, or rapidly alternating comparison slides, horizontal sliding transitions can cause disorientation.
Add `data-transition="cut"` to the slide element:

```html
<section class="slide" data-layout="split" data-transition="cut">
  <!-- Instantaneous cut on advance/reverse -->
</section>
```

When either the active slide or the incoming slide carries `data-transition="cut"`, the runtime engine executes an instantaneous switch (0ms) and skips `will-change: transform` layer promotion.

## 6. Progressive Fragment Stepping

Elements carrying the `.fragment` class remain visually dimmed or hidden until stepped into:
```html
<div class="step-card fragment">
  <h4>Step 1: Ingest Signal</h4>
</div>
<div class="step-card fragment">
  <h4>Step 2: Coalesce Indices</h4>
</div>
```

Forward navigation reveals the next unrevealed `.fragment` on the current slide before pushing to the next slide.

## 7. Zero Persistent Navigation Chrome

Never add floating buttons, sticky bottom navigation bars, or left/right arrow icons.
Slide navigation is handled through keyboard shortcuts (`Arrow` keys, `Space`, `Backspace`) and edge swipes. The slide canvas remains 100% clean for content presentation.
