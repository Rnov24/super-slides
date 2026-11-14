# Design Artifacts Sitemap

This sitemap registers and tracks the lifecycle of all Elephant-Goldfish Model (EGM) specifications and design proposals for `super-slides`.

## Active Specifications

| ID | Title | Status | Author | Target Subsystem | File Link |
|---|---|---|---|---|---|
| 0001 | Core Slide Deck Engine & Architecture | Superseded | @team | Engine / Runtime | [0001-core-deck-engine.md](./0001-core-deck-engine.md) |
| 0002 | Super Slides AgentSkill Specification | Approved | @rnov24 | Skill / Authoring & Runtime Engine | [0002-super-slides-skill-specification.md](./0002-super-slides-skill-specification.md) |
| 0003 | Dual-Modality Interaction & Motion Architecture | Proposed | @rnov24 | Runtime Engine / Motion & Interaction | [0003-dual-modality-interaction-architecture.md](./0003-dual-modality-interaction-architecture.md) |

## Reports & Audits

- [2026-11-13 Drift Report](./2026-11-13_DRIFT_REPORT.md): Initial drift baseline comparing specifications against fresh workspace.
- [Round 1 Goldfish Review Report (Resolved)](../../goldfish_review_report.md): Multi-lens audit resolving blockers on offline origin, fragment state, and implementation readiness.

## Specification Lifecycle Stages

* **Draft**: Initial ideation and authoring in progress.
* **Proposed**: Ready for multi-lens Goldfish critique (`/egm-review`).
* **In Review**: Addressing feedback from automated critics and peer reviewers.
* **Approved**: Architecture frozen; ready for AI/human implementation (`/egm-drift-report`).
* **Superseded**: Replaced by a subsequent architectural revision.
