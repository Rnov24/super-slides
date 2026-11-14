# Design Specifications

## Overview
This directory serves as the centralized repository for Elephant-Goldfish Model (EGM) technical specifications, design documents, and architecture proposals for `super-slides`.

## Interface
- [Design Sitemap](./SITEMAP.md): Index and lifecycle tracking registry for all design specifications.
- [0001: Core Slide Deck Engine & Architecture](./0001-core-deck-engine.md): Foundational design for offline-first 16:9 presentation runtime.

## Invariants
- Every proposed architectural change or core feature addition must have a corresponding EGM design document in this directory.
- Specifications must adhere to the EGM design doc schema before submission to review.
- Active design proposals must be indexed within [SITEMAP.md](./SITEMAP.md).

## Side Effects
- Documents architectural decisions and binds future implementation tasks to verified specifications.

## Verification
- Run: `npm test`
