# Phase 1: Narrative Scripting and Story Spine Playbook

This playbook guides Phase 1 of presentation authoring in `super-slides`.

Before writing any HTML, CSS, or SVG code, the agent must define a compelling story arc, enforce a strict slide count budget, and establish an outline where every slide delivers exactly one core takeaway.

## 1. Audience and Thesis Framing

Begin by identifying three foundational elements:
- **Audience Persona**: Who is in the room? (e.g., Executive Leadership, Senior Engineers, Conference Attendees)
- **Core Thesis**: What single truth must the audience believe by the end?
- **Context Boundary**: What specific problem or system is under discussion?

## 2. The 6-Stage Narrative Spine

Every persuasive presentation follows this 6-stage arc:

1. **Hook**: Grab attention with a counter-intuitive observation, urgent reality, or critical metric.
2. **Problem**: Clarify the painful limitation of the status quo.
3. **Friction**: Explain why conventional fixes fail and where hidden complexities lie.
4. **Architecture**: Reveal the structural breakthrough, design model, or solution mechanism.
5. **Proof**: Provide concrete evidence: performance metrics, benchmark data, or architectural validation.
6. **Call to Action**: Conclude with a decisive next step, key takeaway, or roadmap horizon.

## 3. The Slide Count Budget: 6 to 12 Slides

Slide budgets are strictly enforced:
- Minimum: 6 slides (covers the 6 narrative stages concisely).
- Maximum: 12 slides (expands the Architecture or Proof stages without diluting attention).
- Any request exceeding 12 slides must be challenged and condensed. Brevity commands respect.

## 4. The 1-Takeaway Rule

Every slide must convey exactly one distinct takeaway:
- If a slide attempts to convey two takeaways, divide it into two slides or drop the secondary thought.
- State the takeaway as a complete, declarative sentence in the beat sheet.
- Avoid vague headlines like "Overview" or "Next Steps". Use actionable statements such as "Sub-40ms latency requires bypassing runtime reflection".

## 5. Beat Sheet Outline Schema

Format the narrative outline using this structured schema:

| Slide # | Narrative Stage | Slide Title | Core Takeaway | Assigned Layout |
|---|---|---|---|---|
| 1 | Hook | Zero-Latency Architecture | Memory bottlenecks disappear when layout reflows are eliminated | Layout-Hero |
| 2 | Problem | The Hidden Cost of DOM Churn | Traditional UI widgets trigger 60fps frame drops under high load | Layout-Split |
| 3 | Friction | Why Naive Virtualization Fails | Offscreen DOM retention still degrades compositor memory | Layout-Comparison |
| 4 | Architecture | The Layered Compositing Model | Isolating hit-testing to GPU transform layers preserves 60fps | Layout-Diagram |
| 5 | Proof | Benchmark Results Across Devices | Frame times remain under 16ms even on low-power mobile runtimes | Layout-Bento |
| 6 | Call to Action | Immediate Integration Path | Drop in the unified runtime engine without external build steps | Layout-Quote |

## 6. Gate 1: Human Sign-Off Protocol

The agent must output the completed Beat Sheet to the user and halt.

### Gate 1 Verification Checklist

- [ ] Does the outline follow the 6-stage narrative spine?
- [ ] Is the slide budget strictly between 6 and 12 slides?
- [ ] Does every slide adhere to the 1-Takeaway Rule?
- [ ] Are tentative layout archetypes mapped logically to content needs?

Do not write design tokens or code until the user approves Gate 1.
