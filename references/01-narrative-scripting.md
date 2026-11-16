# Phase 0 & Phase 1: Content-Type Router and Narrative Scripting Playbook

This playbook governs Phase 0 (Raw Notes Distillation & Content-Type Routing) and Phase 1 (Narrative Scripting) in `super-slides`.

Before writing any HTML, CSS, or SVG code, the generator distills raw input notes, determines the execution mode, selects the appropriate narrative arc, enforces mandatory visual escalation, and constructs a balanced beat sheet where every slide delivers exactly one core takeaway.

---

## 1. Execution Mode Detection

The generator selects its execution mode based on the user's initial prompt:

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
   - Whenever input notes contain two or more numbers, costs, latency values, or capacities, the generator must calculate absolute differences, ratios, and percentage deltas:
     - Absolute Delta: `New - Old` (e.g., `38 km - 72 km = -34 km`).
     - Percentage Delta: `(Delta / Baseline) * 100` (e.g., `-47.2% cabling reduction`).
     - Ratio / Factor: `Baseline / New` (e.g., `1.89x efficiency gain`).
   - Derived deltas must be passed forward to visual components (`open-metrics.html`, `big-number.html`, `data-proof.html`), never hidden in running prose.

---

## 3. Content-Type Routing: The 4 Narrative Arcs

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
  - Concept Hook -> `hero-claim.html` (Pole)
  - Formal Rule / Invariant -> `concept-visual.html` (Analytical)
  - Initial State & Input -> `split-media.html` or `claim-proof.html` (Analytical)
  - Iterative State Trace -> `state-walkthrough.html` (Zero-Jump Locked Stage + Decision Table)
  - Final Optimal State -> `open-metrics.html` or `big-number.html` (Release / Metric Pole)
  - Complexity & Takeaway -> `exec-summary.html` or `sidebar-proof.html` (Synthesis)

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
  - Bottleneck -> `hero-claim.html` or `big-number.html` (Pole)
  - Failure Modes -> `pros-cons.html` or `split-media.html` (Analytical)
  - Architectural Shift -> `before-after.html` or `comparison.html` (Analytical)
  - Component Topology -> `split-media.html` or `claim-proof.html` (Analytical Schematic)
  - Data / State Flow -> `flow-sequence.html` or `sidebar-proof.html` (Pipeline Track)
  - Verification & Benchmarks -> `data-proof.html` or `open-metrics.html` (Empirical Proof)

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
  - Phenomenon Hook -> `hero-claim.html` (Pole)
  - First-Principles Definition -> `concept-visual.html` (Analytical)
  - Physical / Logical Mechanism -> `split-media.html` or `sidebar-proof.html` (Analytical)
  - Parameter Comparison -> `comparison.html` or `matrix-2x2.html` (Analytical)
  - Practical Application -> `flow-sequence.html` or `data-proof.html` (Analytical)
  - Key Takeaway -> `exec-summary.html` or `big-number.html` (Synthesis)

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
  - Hook -> `hero-claim.html` (Pole)
  - Problem -> `split-media.html` or `big-number.html` (Analytical)
  - Friction -> `comparison.html` or `pros-cons.html` (Analytical)
  - Solution -> `before-after.html` or `flow-sequence.html` (Analytical)
  - Proof -> `data-proof.html` or `open-metrics.html` (Empirical Proof)
  - Call to Action -> `exec-summary.html` or `claim-proof.html` (Synthesis)

---

## 4. Mandatory Visual Escalation Rules

To prevent passive bulleted lists and low-density text slides, the generator must enforce four mandatory visual escalations:

1. **Chronology / Stages -> Pipeline or Step Trace**:
   - If raw notes contain sequential steps, time stages, or execution phases:
   - NEVER format them as bullet points or bulleted card lists.
   - Escalate to `flow-sequence.html` (for pipelines up to 4 stages) or `state-walkthrough.html` (for detailed state steps).
2. **Entities / Distances / Networks -> Inline SVG Topology**:
   - If raw notes contain nodes, vertices, edges, physical hubs, or network hops:
   - Escalate to an inline semantic SVG diagram with coordinate-locked vertices and explicit state color classes (`state-visited`, `state-candidate`, `state-active`).
3. **2+ Metrics / Numbers -> Giant Tabular Numerals or SVG Chart**:
   - If raw notes contain numerical metrics, costs, or benchmark comparisons:
   - Auto-calculate deltas and escalate to `open-metrics.html` (180px+ tabular figures) or `data-proof.html` (calibrated SVG chart).
   - Never leave comparative numbers embedded inside body paragraphs.
4. **Concept Definitions -> Invariant + Visual Counter-Example**:
   - If raw notes define a theoretical principle, structural invariant, or design rule:
   - Escalate to `concept-visual.html`, pairing the formal rule text on the left with a dual Valid vs Invalid schematic on the right.

---

## 5. Visual Rhythm & Pacing Director

A monotonous presentation where every slide has identical visual density leads to audience fatigue. The generator orchestrates an alternating visual rhythm:

- **Pole / Release Slides**:
  - Quiet, high-impact slides featuring a single bold thesis (`hero-claim.html`) or giant open numbers (`open-metrics.html`).
  - Spatial Anchoring for R-11: Pole slides satisfy R-11 (vertical span >= 65%) by placing the top header at y=72px and bottom context/proof chips at y=800-880px, leaving the center open and uncluttered.
- **Analytical Slides**:
  - Dense, structured slides presenting diagrams, matrices, comparison tables, or algorithmic traces (`state-walkthrough.html`, `comparison.html`, `split-media.html`, `data-proof.html`).
- **Pacing Cadence**:
  - Avoid placing more than two analytical slides in succession without a pole or release slide to reset cognitive load.

---

## 6. Interactive Explainability: Zero-Jump Canvas Locking

For multi-step algorithmic traces or state progressions (`state-walkthrough.html`):

1. **Zero-Jump Canvas Locking**:
   - The title card position, SVG graph canvas (`.locked-stage`), viewBox (`0 0 760 620`), and all vertex (x, y) coordinates must remain 100% pixel-identical across consecutive step slides.
   - The `.locked-stage` container is strictly excluded from slide crossfade stagger animations. When transitioning between step slides, the background canvas and graph remain completely static; only edge highlights, candidate badges, and state table rows update.
2. **Causal Decision Callout Badges**:
   - Decision rationales must appear directly on the SVG canvas adjacent to the relevant nodes and edges:
     - Selection Badge: A pill callout near the newly chosen edge stating the exact selection rule (e.g., `Min Cut Edge: A-B (4 km)`).
     - Rejection Badge: A small red rejection badge (`x`) positioned on candidate edges that were evaluated but rejected to prevent cycle formation (e.g., `Cycle rejected: {A, B, C}`).
   - These in-canvas badges ensure immediate explainability without forcing the viewer to cross-reference side paragraphs.

---

## 7. Slide Count Budget & The 1-Takeaway Rule

- **Budget**: Strictly 6 to 12 slides. Every slide must earn its place.
- **The 1-Takeaway Rule**: Each slide conveys exactly one unambiguous, declarative conclusion.
  - Reject category headers (e.g., "Overview", "Architecture", "Conclusion").
  - Enforce active claim headlines (e.g., "Prim Cut Invariant Guarantees Zero-Cycle Global Minimum").

---

## 8. Beat Sheet Outline Schema

When generating or presenting the outline, use this structured schema:

| Slide # | Arc Stage | Slide Title | Core Takeaway | Assigned Layout | Rhythm Role |
|:---|:---|:---|:---|:---|:---|
| 1 | Concept Hook | Regional Fiber Optimization | Prim MST cuts cabling costs by 47% across 7 Cirebon distribution hubs | `hero-claim.html` | Pole |
| 2 | Formal Invariant | The Cut Property Guarantee | Greedily selecting the minimum crossing edge prevents cyclic partitions | `concept-visual.html` | Analytical |
| 3 | Initial State | Candidate Topology & Metrics | 7 hubs and 9 candidate fiber links prior to minimum spanning tree selection | `split-media.html` | Analytical |
| 4 | Step 01 Trace | Seed Cut Expansion from Hub A | Minimum link A-B (4 km) selected; cross-cut candidates updated | `state-walkthrough.html` | Analytical (Locked) |
| 5 | Step 02 Trace | Cut Frontier Expansion | Link B-D (6 km) added; redundant cycle candidate C-D rejected | `state-walkthrough.html` | Analytical (Locked) |
| 6 | Optimal State | Global Distance & Cost Telemetry | 38 km total backbone achieved vs 72 km initial mesh (-47.2% reduction) | `open-metrics.html` | Release (Pole) |
| 7 | Complexity | Binary Heap Scaling & Deployment | O(E log V) heap architecture ensures deterministic millisecond topology updates | `exec-summary.html` | Synthesis |
