# Super Slides Core Deck Engine & Architecture

* **Author:** @team
* **Status:** Proposed
* **Date:** 2026-11-13

--------------------------------------------------------------------------------

## Overview

`super-slides` is a modular presentation platform engineered to create, render, and present animation-rich, zero-dependency HTML slide decks. It synthesizes visual presentation patterns from modern frontend toolchains, incorporating template engines, dynamic SVG diagramming, and synchronized presenter mode.

## The Problem

Traditional slide software (PowerPoint, Keynote, Google Slides) generates opaque, binary, or heavily abstracted formats that are hostile to version control, AI-assisted generation, and automated pipeline integration. Web-based alternatives frequently carry heavy runtime baggage, complex bundlers, or brittle CSS dependencies that degrade offline reliability and cross-platform fidelity.

`super-slides` provides an agent-friendly, code-grounded presentation framework that outputs self-contained HTML/CSS/JS slide decks with strict 16:9 viewports, theme customizability, and live dual-screen presentation synchronization.

## Goals

* **Zero-Dependency Production Output**: Generate standalone, single-file HTML presentations that run offline in any standard web browser without server or package dependencies.
* **Aspect-Ratio Invariance**: Guarantee strict 16:9 presentation canvas scaling across all viewport dimensions using CSS container queries and transform matrices.
* **Built-in Presenter Sync**: Provide dual-screen synchronization (speaker notes, preview, timer) via standard web `BroadcastChannel` APIs without network overhead.
* **Diagram & Theme Compatibility**: Natively integrate modular themes and inline SVG/Mermaid diagram definitions.

## Non-Goals

* Building a proprietary cloud hosting service or cloud presentation database.
* Supporting arbitrary non-standard aspect ratios in default templates (the engine defaults strictly to 16:9).
* Emulating low-level proprietary Microsoft PowerPoint macros or VBA scripts.

## Open Questions

* **Question 1**: Should slide themes be bundled as single-file CSS custom properties or dynamic ES modules?
* **Question 2**: How should code syntax highlighting be handled offline without heavy external library downloads?

## Critical User Journeys (CUJs)

### CUJ 1: Developer Creates and Previews Slide Deck

* **Given**: A project with slide markdown or template configurations.
* **When**: The user or AI agent triggers the deck generator.
* **Then**: A self-contained `index.html` file is generated, with immediate keyboard navigation (`Space`, `ArrowRight`, `ArrowLeft`) and smooth slide transitions.

### CUJ 2: Speaker Conducts Live Dual-Screen Presentation

* **Given**: A generated presentation deck open in an external display browser window.
* **When**: The speaker presses the `S` shortcut key on their laptop screen.
* **Then**: A synchronized Presenter Console opens in a separate window displaying slide timing, speaker notes, and upcoming slide previews synchronized in real time.

## Technical Plan (Architecture)

```text
+-------------------------------------------------------------+
|                     super-slides Core                       |
+-------------------------------------------------------------+
       |                                              |
       v                                              v
+-----------------------+                    +-----------------------+
|  Slide Engine         |                    |  Theme & Layouts      |
|  - 16:9 Stage Matrix  |                    |  - 30+ Page Layouts   |
|  - Nav State Machine  |                    |  - CSS Variables      |
|  - Keyboard Handler   |                    |  - Typography Bounds  |
+-----------------------+                    +-----------------------+
       |                                              |
       +----------------------+-----------------------+
                              |
                              v
             +----------------------------------+
             | BroadcastChannel Presenter Sync  |
             |  - Main Display Window           |
             |  - Speaker Console Window (Notes)|
             +----------------------------------+
                              |
                              v
             +----------------------------------+
             | Self-Contained HTML Output       |
             +----------------------------------+
```

## Non-Functional Requirements

* **Performance & Latency**: Slide navigation transitions must execute at a sustained 60 FPS with zero layout thrashing.
* **Offline First**: All fonts, themes, and presentation logic must function fully offline without external CDN reachability requirements.

## Detailed Implementation Plan

### Target Files to Create/Modify

#### 1. `src/engine/stage.ts` (Create)
* **Type / Scope**: TypeScript Module (Presentation Stage & Matrix Transform)
* **Proposed Changes**: Implement dynamic 16:9 letterboxing and resize listener.

#### 2. `src/engine/navigation.ts` (Create)
* **Type / Scope**: TypeScript Module (Slide Navigation State Machine)
* **Proposed Changes**: Manage active slide index, transitions, and history events.

#### 3. `src/engine/sync.ts` (Create)
* **Type / Scope**: TypeScript Module (Presenter Broadcast Channel)
* **Proposed Changes**: Synchronize active slide state, elapsed timers, and speaker notes between dual windows.

### Verification Plan

* **Compilation/Build**: `npm run build`
* **Unit Tests**: `npm test`
* **Linting**: `npm run lint`

--------------------------------------------------------------------------------

*Drafted with EGM*
