# super-slides Dual-Modality Interaction & Motion Architecture

* **Author:** @rnov24
* **Date:** 2026-11-14

## Overview

`super-slides` introduces a dual-modality interaction and motion architecture designed for technical presentations. It establishes an absolute architectural boundary between two operational planes:

1. **Macro Presentation Navigation (Keyboard/Swipe Driven):** Manages directional slide-push transitions with smooth cubic-bezier easing, transition throttling, and input debounce protection. This replaces instant jump cuts from legacy presentation tools while maintaining zero external runtime dependencies.
2. **Micro In-Slide Interactivity (Mouse/Pointer Driven):** Enables deep content engagement within individual slides—including hover reveals, interactive bento card expansion, SVG diagram node highlighting, and tabs/drawers—without visual interference from persistent floating control docks.

The core value proposition is zero-latency presentation control for the speaker paired with app-grade fidelity for interactive slide demonstrations, operating within a lean, vanilla web platform standard (<150 LOC, 60 FPS guaranteed).

## Analysis

### 1. Modality Separation & Zero-Dock Architecture
Floating navigation docks and overlay buttons obstruct slide content, trigger unintended click events during demonstrations, and degrade presentation aesthetics. By strictly assigning macro deck navigation to keyboard inputs (and edge swipe gestures on touch devices), slide surfaces become fully available for interactive content. Micro-interactions (hovering over bento cards, clicking tab toggles, inspecting SVG data flows) execute with zero modal interference. To prevent presenter lockout when presenting without a physical keyboard, a non-intrusive shortcut HUD is accessible via `?` key or a discrete corner tap-target.

### 2. Motion Performance & 60 FPS Compositing Guarantees
Animating DOM elements with complex nested subtrees (such as SVG diagrams with hundreds of nodes or cards with backdrop filters) causes dropped frames if the browser performs continuous hit-testing and style recalculations during translation.
* **Pointer Event Suppression:** During macro transitions, the viewport root applies a `.is-transitioning` class that enforces `pointer-events: none !important` across all slide contents. This eliminates pointer hit-testing and prevents stationary mouse cursors from triggering layout recalculations during motion.
* **Layer Management & Virtualization:** Transitions utilize hardware-composited `transform: translate3d(x, 0, 0)` with `cubic-bezier(0.2, 0.8, 0.2, 1.0)` over 280ms. Layer promotion (`will-change: transform`) is applied strictly to the active and incoming target slides immediately before transition start and removed immediately upon transition completion. Non-adjacent offscreen slides are assigned `content-visibility: hidden` and `visibility: hidden` to eliminate layout overhead.

### 3. Transition Throttling & Debounce Coalescing
Rapid key mashing by a presenter can induce animation race conditions or create disorienting backlogs of queued transitions.
* **Target Coalescing:** The macro controller implements a single-flight transition lock with target index coalescing. If a user presses `ArrowRight` while a transition is active, subsequent inputs do not spawn parallel animations or queue up sequential delays. Instead, the current transition commits immediately to its terminal state, and the controller initiates a single transition directly toward the coalesced target index.
* **Dual-Resolution Safety Timeout:** Browsers suspend or delay CSS `transitionend` events when a tab is backgrounded or minimized. To eliminate the risk of a permanently frozen `isTransitioning = true` state, the transition manager runs a companion fallback timer (`setTimeout` for duration + 40ms). Whichever event fires first finalizes the transition state to `IDLE`.

### 4. Touch-Gesture Parity & Conflict Resolution
Touch interfaces must support natural horizontal swiping without interfering with scrollable micro-widgets inside slides.
* **Directional Threshold:** A macro swipe requires a horizontal displacement (`|deltaX| > 40px`) with an angle constraint (`|deltaX| > 1.5 * |deltaY|`) within a 300ms window.
* **Micro Scroll Exception:** Containers inside a slide that require horizontal scrolling (e.g. wide code blocks, horizontal metric carousels, SVG pan/zoom canvases) carry a `data-prevent-slide-swipe` attribute. The macro touch listener checks `e.target.closest('[data-prevent-slide-swipe]')`; if matched, slide navigation is bypassed and local touch scrolling proceeds uninhibited.

### 5. Input Interception & Focus Invariants
Macro navigation keys (`ArrowRight`, `ArrowLeft`, `PageDown`, `PageUp`, `Home`, `End`, `Space`) are bound at the window capture phase. They take precedence over in-slide interactive widgets so that an expanded bento card or activated tab cannot hijack presentation flow. An exception is made only when keyboard focus resides inside an editable input element (`input`, `textarea`, `[contenteditable]`), where presentation navigation is bypassed to allow text editing.

## Goals vs. Non-Goals

### In-Scope Goals
* **Deterministic Directional Motion:** Smooth horizontal slide push transitions using `translate3d` with direction-aware offsets (+100% for next, -100% for previous).
* **Zero External Dependencies:** Built entirely with standard HTML5, CSS3 transitions, and vanilla JavaScript. No external motion or animation libraries.
* **Compositor Hit-Test Isolation:** Enforce `pointer-events: none` during transitions to guarantee consistent 60 FPS performance across complex SVGs and bento grids.
* **Race Condition & Freeze Protection:** Single-flight transition locking, target-index coalescing, and dual-trigger completion safeguards (CSS `transitionend` + safety timeout).
* **Touch Swipe Parity:** Native touch swipe navigation on mobile/tablet viewports with container exclusion via `data-prevent-slide-swipe`.
* **Accessibility Compliance:** Strict respect for `prefers-reduced-motion: reduce`, instantly bypassing transitions to zero-duration cuts.
* **Per-Slide Transition Overrides:** Support `data-transition="push|cut"` to allow specific slides (such as live coding terminal screens) to opt for instant cuts.

### Out-of-Scope Non-Goals
* **No Intrusive Persistent Dock:** Floating control bars, persistent arrow overlays, and bottom dock chrome are completely excluded from default presentation view.
* **No Complex Multi-Stage Queues:** No sequential stacking of queued animations; transitions do not play out in a backlog queue.
* **No Non-Standard Physics Engines:** Spring physics, bounce simulations, and custom WebGL transitions are out of scope.
* **No Custom Audio/Video Frame Sync:** Media playback timing within slides is managed by standard HTML5 media APIs, not the macro slide transition engine.

## Alternatives Weighed

* **CSS View Transitions API (`document.startViewTransition`):**
  * *Rejected by author:* While modern and declarative, native View Transitions cross-document/same-document support varies across older browser engines and webviews, and does not provide granular control over directional sub-layer DOM transforms without complex named pseudos (`::view-transition-group`). The transform-class approach ensures universal compatibility with zero polyfills.
* **Sequential Animation Queuing:**
  * *Rejected by author:* Queuing up keypresses so that 5 rapid clicks trigger 5 successive 280ms animations creates a 1.4-second unresponsive lag where the presenter cannot stop the slide progression. Target coalescing with immediate completion provides superior operational control.
* **Persistent Bottom Control Dock:**
  * *Rejected by author:* Consumes 48–64px of vertical screen real estate, causes accidental clicks when interacting with bottom-row bento cards, and distracts audiences during technical presentations. Replaced by keyboard shortcuts, touch swipes, and an on-demand HUD (`?` key).
* **Global Scroll-Jacking (Mousewheel Slide Advancement):**
  * *Rejected by author:* Intercepting vertical mouse wheel events to advance slides causes severe usability conflicts when slides contain scrollable code blocks or text panels. Mousewheel navigation is explicitly rejected.

## Key Decisions & Staging for Next Steps

1. **Adopt CSS Transform-Class Architecture:** Implement transition mechanics via three CSS classes (`.slide-current`, `.slide-incoming`, `.is-transitioning`) managed by a ~120-line standalone JavaScript module.
2. **Standardize Viewport Canvas Contract:** Enforce fixed-aspect container geometry (`position: relative; overflow: hidden;`) and absolute child slide positioning (`position: absolute; inset: 0;`).
3. **Carry Forward to `/egm-draft`:**
   - Formalize the JavaScript transition manager API (`SlideDeck.next()`, `SlideDeck.prev()`, `SlideDeck.goTo(index)`).
   - Document the lifecycle event schema (`slidetransitionstart`, `slidetransitionend`).
   - Define the CSS layout specifications and `prefers-reduced-motion` media query blocks.
