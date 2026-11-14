# Phase 2: Visual Taste Discovery and Token Definition Playbook

This playbook guides Phase 2 of presentation authoring in `super-slides`.

Once the narrative outline is approved at Gate 1, the agent establishes the visual language, typography, and semantic color tokens before generating markup.

## 1. Zero External Fonts Policy

All presentations must rely exclusively on native system font stacks.
Never inject external font CDNs (such as Google Fonts or Typekit) or `@font-face` remote URLs. System font stacks render instantly, guarantee offline reliability on `file://`, and eliminate font-swap layout shifts.

## 2. The 4 Curated System Font Stacks

Select one primary stack and one code stack from these four approved definitions:

### 1. Executive Editorial
Best for thought leadership, strategy, and narrative presentations:
```css
font-family: Charter, "Bitstream Charter", "Sitka Text", Cambria, Georgia, serif;
```

### 2. Modern Tech Grotesque
Best for product overviews, system designs, and corporate tech decks:
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### 3. Engineering Terminal
Best for deep-dive technical architecture, devtools, and infrastructure decks:
```css
font-family: "Cascadia Code", "Fira Code", "JetBrains Mono", Consolas, monospace;
```

### 4. Clean Humanist
Best for user experience, design systems, and modern SaaS narratives:
```css
font-family: "Avenir Next", "Segoe UI", Inter, Cantarell, sans-serif;
```

## 3. Semantic Token Structure

All color and styling decisions are mapped to standard CSS custom properties:

- `--bg`: Canvas background color.
- `--surface`: Card and container background color.
- `--surface-border`: Subtle border separating cards and panels.
- `--text`: Primary headline and high-priority body text color.
- `--text-muted`: Secondary metadata, captions, and supporting copy color.
- `--accent`: Primary highlight color for key metrics and active states.
- `--accent-alt`: Secondary highlight color for comparisons or status indicators.

## 4. Curated Visual Directions

Present the user with three distinct directions:

### Direction A: High-Contrast Editorial
- **Mood**: Authoritative, literary, thoughtful.
- **Palette**:
  - `--bg`: `#f8f6f1` (warm off-white cream)
  - `--surface`: `#ffffff` (crisp white)
  - `--surface-border`: `#e6e2d9` (warm stone)
  - `--text`: `#1a1a1a` (deep ink)
  - `--text-muted`: `#5a554e` (charcoal stone)
  - `--accent`: `#a33b20` (terracotta crimson)
  - `--accent-alt`: `#2b5c54` (deep pine green)
- **Primary Typography**: Executive Editorial (Charter serif)
- **Code Typography**: Engineering Terminal

### Direction B: Modern Terminal Dark
- **Mood**: High-velocity, technical, developer-native.
- **Palette**:
  - `--bg`: `#0a0d12` (deep obsidian black)
  - `--surface`: `#121820` (dark charcoal slate)
  - `--surface-border`: `#222d3d` (cool slate border)
  - `--text`: `#e6edf3` (bright white-gray)
  - `--text-muted`: `#8b949e` (muted gray)
  - `--accent`: `#38bdf8` (electric cyan)
  - `--accent-alt`: `#34d399` (emerald green)
- **Primary Typography**: Modern Tech Grotesque or Engineering Terminal
- **Code Typography**: Engineering Terminal

### Direction C: Clean Humanist
- **Mood**: Refined, accessible, product-focused.
- **Palette**:
  - `--bg`: `#ffffff` (pure white)
  - `--surface`: `#f4f6f8` (soft cool gray)
  - `--surface-border`: `#dfe3e8` (light neutral gray)
  - `--text`: `#111827` (deep slate)
  - `--text-muted`: `#4b5563` (slate gray)
  - `--accent`: `#2563eb` (cobalt blue)
  - `--accent-alt`: `#7c3aed` (violet)
- **Primary Typography**: Clean Humanist (Avenir Next / Inter)
- **Code Typography**: Engineering Terminal

## 5. WCAG 4.5:1 Contrast Guarantee

Conference projectors and sunny presentation rooms severely wash out low-contrast slides.
Every text element must maintain a minimum contrast ratio of 4.5:1 against its immediate background container:

$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$

Where $L_1$ is the relative luminance of the lighter color and $L_2$ is the relative luminance of the darker color.
- Never use low-contrast pastel gray text on dark backgrounds.
- Never place muted accent text directly on bright colored badges.
- When in doubt, increase font weight or deepen text darkness.

## 6. Gate 2: Human Sign-Off Protocol

Output the selected token definitions and the slide-to-layout assignment plan.

### Gate 2 Verification Checklist

- [ ] Has a specific system font stack been chosen?
- [ ] Are all semantic color tokens defined?
- [ ] Does every text token meet the 4.5:1 contrast floor?
- [ ] Are layout archetypes confirmed for all slides?

Do not generate `slides.html` markup until the user approves Gate 2.
