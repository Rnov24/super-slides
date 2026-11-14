# Super Slides

Zero-dependency, anti-slop HTML presentation authoring skill for AI coding agents.

`super-slides` generates self-contained, animation-rich, 16:9 presentations (`slides.html`) running completely offline directly from `file://` paths or local servers, with zero external network requests or CDN dependencies.

## Quickstart

Install the skill across supported agents (Antigravity, Claude Code, Cursor, Codex, OpenCode):

```bash
npx skills add . -g --all
```

To verify installed skills:

```bash
npx skills ls -g
```

## Interaction Model

`super-slides` enforces a strict dual-modality interaction boundary:

- **Macro Deck Navigation (Keyboard and Touch)**: Horizontal slide translations and fragment reveals are controlled exclusively through keyboard shortcuts and touch swipe gestures.
- **Micro In-Slide Interactivity (Pointer / Mouse)**: The 1920x1080 slide canvas is reserved entirely for internal element interactions (bento card hover lift, tabbed inspections, SVG node highlights).
- **Zero Screen Clutter**: No persistent floating navigation docks, overlay arrows, or bottom control bars exist to obstruct content or cause accidental mis-clicks.

## Canonical Keyboard Navigation

| Key | Action |
|---|---|
| `ArrowRight` / `Space` / `PageDown` | Advance to next fragment or next slide |
| `ArrowLeft` / `Backspace` / `PageUp` | Return to previous fragment or previous slide |
| `Home` | Jump to first slide |
| `End` | Jump to last slide |
| `F` | Toggle fullscreen mode |
| `O` | Toggle slide grid overview mode |
| `?` | Toggle shortcut help overlay |

> Speaker notes intentionally omitted per author decision 2026-11-15.

## Cross-Window Synchronization

The runtime includes a lightweight `BroadcastChannel('super-slides-sync')` integration.
Note that cross-window presenter synchronization works only over `http://localhost`, never over `file://` (browsers enforce opaque origins `origin: null` on local file paths, preventing cross-window channel communication). When viewed offline via `file://`, the deck operates in self-contained single-window presentation mode.

## Architectural Decision: Golden Reference Deck

The single 8-slide golden example `examples/technical-architecture.html` (Packet 2) covers both the 0002 and 0003 demo checklists, so no separate `technical-deep-dive.html` file will be created.

## Offline Verification

Generated decks are verified against strict offline invariants:

1. **Zero External Requests**: Disconnect network or open DevTools Network tab. Confirm 0 failed HTTP/HTTPS requests.
2. **Viewport Invariance**: Resize browser window across ultra-wide, standard 16:9, 4:3, and portrait dimensions. The CSS transform matrix scale preserves 16:9 proportions with clean letterboxing and zero vertical page scrollbars.
3. **Automated Verification**: Run the project verification suite:

```bash
npm test
```
