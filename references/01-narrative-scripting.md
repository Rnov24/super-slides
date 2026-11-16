# Reference 01: Narrative Scripting & Content-Type Router Playbook

This playbook governs Phase 0 (Raw Notes Distillation & Content-Type Routing) and Phase 1 (Narrative Scripting) in `super-slides`.

Before writing any HTML, CSS, or SVG code, the generator distills raw input notes, determines the execution mode, selects the appropriate narrative arc, enforces mandatory visual escalation, and constructs a balanced beat sheet where every slide delivers exactly one core takeaway.

---

## 1. Execution Mode Detection

The generator selects its execution mode directly from the user's initial prompt:

1. **Autonomous One-Shot Mode (Default)**:
   - Trigger: The user provides a topic, draft notes, or a direct deck creation prompt (e.g., "Build a deck about...", "Convert these notes into slides...").
   - Behavior: The generator autonomously executes Phase 0 through Phase 4 in a single turn without pausing for intermediate confirmation gates. It distills notes, routes the arc, selects components, writes `slides.html`, runs verification, and delivers the finished file.
2. **Interactive Co-Design Mode**:
   - Trigger: The user explicitly requests an outline, brainstorming, or review step first (e.g., "Give me an outline first", "Let's brainstorm the structure", "Show me the beat sheet before coding").
   - Behavior: The generator presents the Beat Sheet at Gate 1, pauses for human approval, presents tokens and layouts at Gate 2, and proceeds to assembly only after explicit confirmation.

---

## 2. Phase 0: Raw Notes Distillation & Metric Delta Derivation

Given raw, unstructured, or terse prompt notes, the generator performs two mandatory preprocessing steps:

1. **Single-Sentence Thesis Distillation**:
   - Extract the central premise into one unambiguous declarative sentence (e.g., "Minimum spanning tree optimization reduces regional fiber cabling by 47% while maintaining zero-partition fault tolerance").
2. **Automated Metric Delta Calculation**:
   - Whenever input notes contain two or more numbers, costs, latency values, or capacities, the generator must calculate absolute differences, ratios, and percentage deltas directly from the source numbers:
     - Absolute Delta: `New - Old` (e.g., `38 km - 72 km = -34 km`).
     - Percentage Delta: `(Delta / Baseline) * 100` (e.g., `-47.2% cabling reduction`).
     - Ratio / Factor: `Baseline / New` (e.g., `1.89x efficiency gain`).
   - Derived deltas must be passed forward to visual components (`layouts/pole-stat.html`, `diagrams/data-charts.html`, `patterns/data-table.css`), never hidden in running prose.

---

## 3. The Action Title Formula

Slide titles must never be passive category tags. Slide titles must be active, declarative claims stating the conclusion or causal finding:

- **Banned category titles**: "Overview", "Architecture", "The Problem", "System Metrics", "Next Steps", "Comparison".
- **Action Title Formula**: `[Subject / Mechanism] + [Active Verb] + [Quantified Outcome or Invariant]`
  - "Direct GPU Compositing Eliminates DOM Reflow Latency"
  - "Prim Cut Invariant Guarantees Zero-Cycle Global Minimum"
  - "Off-Heap Ring Buffers Sustain 240 GB/s Throughput"
  - "Tail Latency Remains Deterministic Past 100k Concurrent Connections"

---

## 4. Content-Type Routing: The 4 Narrative Arcs

Rather than forcing all topics into an executive sales pitch, the generator classifies the material into one of four domain-specific narrative arcs:

### Arc 1: Algorithm Trace
- **When to Use**: Computational procedures, greedy algorithms, graph traversals, state machines, protocol lifecycles, and sorting/search logic.
- **Ordered Stages**:
  1. *Concept Hook*: Practical problem framing and operational objective.
  2. *Formal Rule / Invariant*: The mathematical cut property, invariant rule, or termination condition.
  3. *Initial State & Input*: Input graph, matrix, or array with unvisited elements.
  4. *Iterative State Trace (Steps 1..N)*: Step-by-step state progression with candidate evaluations and cycle rejection.
  5. *Final Optimal State*: Global converged state, total cost, and quantified optimization delta.
  6. *Complexity & Takeaway*: Big-O asymptotic analysis, data structures used, and production recommendations.
- **Preferred Component Mappings**:
  - Concept Hook -> `layouts/pole-hero.html`
  - Formal Rule / Invariant -> `diagrams/counter-example.html` or `layouts/split-canvas.html`
  - Initial State & Input -> `layouts/split-canvas.html`
  - Iterative State Trace -> `layouts/split-canvas.html` (with `data-locked-stage`) + `diagrams/node-link-graph.html` + `patterns/data-table.css`
  - Final Optimal State -> `layouts/pole-stat.html` or `layouts/open-columns.html`
  - Complexity & Takeaway -> `layouts/numbered-rows.html` or `patterns/callout-strip.css`

### Arc 2: Architecture Deep-Dive
- **When to Use**: Distributed systems, microservices redesigns, database internals, cloud infrastructure, and OS/compiler engines.
- **Ordered Stages**:
  1. *Bottleneck*: Critical production limitation, latency wall, or scaling ceiling.
  2. *Failure Modes*: Root cause analysis of why existing patterns break under load.
  3. *Architectural Shift*: Foundational design transition (e.g., sync RPC to event log, polling to push).
  4. *Component Topology*: Structural topology of services, queues, and storage engines.
  5. *Data / State Flow*: End-to-end request lifecycle and message propagation.
  6. *Verification & Benchmarks*: Empirical load tests, throughput curves, and SLA compliance.
- **Preferred Component Mappings**:
  - Bottleneck -> `layouts/pole-hero.html` or `layouts/pole-stat.html`
  - Failure Modes -> `layouts/open-columns.html`
  - Architectural Shift -> `diagrams/matrix-2x2.html` or `layouts/split-canvas.html`
  - Component Topology -> `diagrams/architecture-stack.html` or `diagrams/mechanism-anatomy.html`
  - Data / State Flow -> `layouts/horizontal-track.html` or `diagrams/pipeline-flow.html`
  - Verification & Benchmarks -> `diagrams/data-charts.html` or `layouts/full-diagram.html`

### Arc 3: Concept Explainer
- **When to Use**: Core computer science concepts, scientific phenomena, cryptographic primitives, and design patterns.
- **Ordered Stages**:
  1. *Phenomenon Hook*: Paradoxical observation or real-world manifestation.
  2. *First-Principles Definition*: Mathematical foundation or formal definition.
  3. *Physical / Logical Mechanism*: Internal mechanics and causal drivers.
  4. *Parameter Comparison*: Behavior across differing regimes, parameters, or edge cases.
  5. *Practical Application*: Concrete implementation or production trade-off.
  6. *Key Takeaway*: Core mental model and rule of thumb.
- **Preferred Component Mappings**:
  - Phenomenon Hook -> `layouts/pole-hero.html`
  - First-Principles Definition -> `diagrams/counter-example.html`
  - Physical / Logical Mechanism -> `diagrams/mechanism-anatomy.html`
  - Parameter Comparison -> `layouts/open-columns.html` or `diagrams/matrix-2x2.html`
  - Practical Application -> `diagrams/pipeline-flow.html` or `layouts/horizontal-track.html`
  - Key Takeaway -> `layouts/numbered-rows.html` or `layouts/pole-stat.html`

### Arc 4: Executive Pitch
- **When to Use**: Product launches, venture funding pitches, board presentations, and business transformation proposals.
- **Ordered Stages**:
  1. *Hook*: Urgent commercial disruption or undeniable market opportunity.
  2. *Problem*: Systemic inefficiency and quantified financial waste.
  3. *Friction*: Why status-quo solutions and incumbent vendors fail.
  4. *Solution*: The transformative product, platform, or operational model.
  5. *Proof*: Customer validation, unit economics, and benchmark ROI.
  6. *Call to Action*: Immediate deployment roadmap, pilot scope, or capital ask.
- **Preferred Component Mappings**:
  - Hook -> `layouts/pole-hero.html`
  - Problem -> `layouts/pole-stat.html` or `layouts/split-canvas.html`
  - Friction -> `layouts/open-columns.html`
  - Solution -> `layouts/horizontal-track.html` or `patterns/accent-focal-block.css`
  - Proof -> `diagrams/data-charts.html` or `layouts/open-columns.html`
  - Call to Action -> `layouts/numbered-rows.html` + `patterns/callout-strip.css`

---

## 5. Slide Count Budget & The 1-Takeaway Rule

- **Budget**: Strictly 6 to 12 slides. Every slide must earn its place.
- **The 1-Takeaway Rule**: Each slide conveys exactly one unambiguous, declarative conclusion.

---

## 6. Beat Sheet Outline Schema

When generating or presenting the outline, use this structured schema:

| Slide # | Arc Stage | Action Title | Core Takeaway | Assigned Layout / Diagram | Rhythm Role |
|:---|:---|:---|:---|:---|:---|
| 1 | Concept Hook | Regional Fiber Optimization | Prim MST cuts cabling costs by 47% across 7 Cirebon distribution hubs | `layouts/pole-hero.html` | Pole |
| 2 | Formal Invariant | The Cut Property Guarantee | Greedily selecting the minimum crossing edge prevents cyclic partitions | `diagrams/counter-example.html` | Analytical |
| 3 | Initial State | Candidate Topology & Metrics | 7 hubs and 9 candidate fiber links prior to minimum spanning tree selection | `layouts/split-canvas.html` | Analytical |
| 4 | Step 01 Trace | Seed Cut Expansion from Hub A | Minimum link A-B (4 km) selected; cross-cut candidates updated | `layouts/split-canvas.html` + `diagrams/node-link-graph.html` | Analytical (Locked) |
| 5 | Step 02 Trace | Cut Frontier Expansion | Link B-D (6 km) added; redundant cycle candidate C-D rejected | `layouts/split-canvas.html` + `diagrams/node-link-graph.html` | Analytical (Locked) |
| 6 | Optimal State | Global Distance & Cost Telemetry | 38 km total backbone achieved vs 72 km initial mesh (-47.2% reduction) | `layouts/pole-stat.html` | Release (Pole) |
| 7 | Complexity | Binary Heap Scaling & Deployment | O(E log V) heap architecture ensures deterministic millisecond topology updates | `layouts/numbered-rows.html` | Synthesis |
