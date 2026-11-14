# Super Slides Documentation Blueprint

## System Overview
`super-slides` is a modular presentation platform engineered for generating, styling, and presenting zero-dependency, animation-rich HTML slide decks. It incorporates template-driven slide layouts, dynamic SVG diagrams, synchronized dual-screen presenter controls, and offline-first rendering.

This documentation tree provides Elephant-Goldfish Model (EGM) architectural contracts, subsystem specifications, and formal design documents to guide both human contributors and AI coding agents.

## Subdirectories & System Boundaries
- [Architecture & Runtime Contracts](./architecture/README.md) - Core presentation engine interfaces, viewport scaling invariants, and presenter sync channels.
- [Design Specifications & RFCs](./designs/README.md) - Active technical specifications, feature proposals, and architectural decision records.

## Global Invariants
- All presentation output decks must remain zero-dependency and executable purely within standard web browsers offline.
- Every major architectural decision or subsystem addition must trace back to an approved design specification in `./designs/`.
- Cross-window communication between presentation displays must exclusively utilize local Web standard APIs (`BroadcastChannel`, `localStorage`) without external server mediation.

## Global Side Effects
- Emits real-time state broadcasts across browser windows via `BroadcastChannel`.
- Writes presentation assets and static HTML decks to local filesystem output targets.

## System Verification
- Run: `npm test`
