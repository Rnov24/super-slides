# System Architecture & Subsystem Contracts

## Overview
This package defines the core runtime interfaces, subsystem boundaries, and architectural invariants governing the `super-slides` presentation generation and rendering pipeline.

## Interface
- `StageRenderer`: Viewport scaling controller enforcing strict 16:9 ratio letterboxing across arbitrary display resolutions.
- `NavigationStateMachine`: Unidirectional state machine managing active slide indices, slide fragments, and presentation history.
- `PresenterSyncChannel`: BroadcastChannel wrapper coordinating dual-window synchronization between primary projector output and speaker console.
- `ThemeRegistry`: CSS token provider defining color palettes, typography scales, and CSS layout grids.

## Invariants
- Presentations must maintain a strict 16:9 aspect ratio irrespective of parent container or browser dimensions.
- State transitions must be atomic; slide indices cannot enter negative values or exceed total slide count.
- All presentation outputs must remain executable without an active internet connection or external server runtime.

## Side Effects
- Mutates DOM nodes within the container stage element.
- Emits cross-window messages via `BroadcastChannel('super-slides-sync')`.
- Stores slide index state in URL hash and local session storage.

## Verification
- Run: `npm test`
