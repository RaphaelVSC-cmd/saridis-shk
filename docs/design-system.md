# Design System – Saridis SHK (Ingolstadt)
*V5.0 – Warm Light Canvas & Master Showcase Edition*

---

## 1. Brand Climate & Farb-Architektur (6 Rollen + 2 Akzente)

| Token | CSS-Variable | Farbwert | Verwendung |
|---|---|---|---|
| **Canvas** | `--color-canvas` | `#f9f8f5` | Warmer Travertin-Hintergrund, augenfreundlich, hochwertig |
| **Canvas Muted** | `--color-canvas-sub` | `#f1ede3` | Sektionstrennungen, Badge-Hintergründe, Footer-Top |
| **Surface** | `--color-surface` | `#ffffff` | Karten, Modals, Formularelemente, Clean White |
| **Border** | `--color-border` | `#e4ded2` | Feine 1px Linien, strukturierte Kanten |
| **Ink Primary** | `--color-ink` | `#16171a` | Hauptüberschriften, Display-Typo (Kontrast > 13:1 auf Canvas) |
| **Ink Muted** | `--color-ink-muted` | `#505561` | Fließtext, Beschreibungen (Kontrast 5.8:1 – WCAG AAA) |
| **Primary Accent** | `--color-accent-marine` | `#0b4f6c` | Tiefes Riviera-Marineblau für Buttons, Links, Markenanker |
| **Primary Hover** | `--color-accent-marine-hover` | `#083a50` | Interaktiver Hover-State |
| **Secondary Accent**| `--color-accent-brass` | `#b4793e` | Warmes Handwerks-Messing für Sterne, Siegel, Vorher/Nachher-Griffe |
| **Secondary Hover**| `--color-accent-brass-hover` | `#9c6530` | Hover für Messing-Elemente |
| **Focus Ring** | `--color-focus` | `#0b4f6c` | Barrierefreie 2px Outline mit 2px Offset |

---

## 2. Typografie (Taste Floor)

### Font-Stack:
```css
--font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-serif: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Hierarchie & Rhythmus:
- **Hero Display H1:** `clamp(2.5rem, 5vw + 1rem, 4.25rem)`, `font-weight: 800`, `letter-spacing: -0.035em`, `line-height: 1.1`
- **Section H2:** `clamp(2rem, 3.5vw + 0.5rem, 2.75rem)`, `font-weight: 700`, `letter-spacing: -0.025em`, `line-height: 1.2`
- **Card H3:** `clamp(1.25rem, 2vw, 1.5rem)`, `font-weight: 600`, `letter-spacing: -0.015em`, `line-height: 1.35`
- **Body Text:** `1rem (16px)` bis `1.125rem (18px)`, `font-weight: 400`, `line-height: 1.65`, `letter-spacing: normal`, max. `68ch` Breite
- **Label / Overline:** `0.8125rem (13px)`, `font-weight: 700`, `letter-spacing: 0.08em`, `text-transform: uppercase`

---

## 3. Spacing System (4px-Basis)
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```
*Regel:* Abstand oberhalb einer Überschrift ist stets ca. doppelt so groß wie der Abstand unterhalb der Überschrift zum Text.

---

## 4. Schatten & Tiefe (Soft Architectural Shadows)
```css
--shadow-sm: 0 1px 3px rgba(22, 23, 26, 0.05), 0 1px 2px rgba(22, 23, 26, 0.03);
--shadow-md: 0 4px 16px -2px rgba(22, 23, 26, 0.06), 0 2px 6px -1px rgba(22, 23, 26, 0.04);
--shadow-lg: 0 12px 32px -4px rgba(22, 23, 26, 0.08), 0 4px 12px -2px rgba(22, 23, 26, 0.04);
--shadow-xl: 0 24px 48px -8px rgba(22, 23, 26, 0.12), 0 8px 20px -4px rgba(22, 23, 26, 0.06);
```

---

## 5. Mobile-First & 3D-Fallback-Architektur
- **375px Zero-Collision Guarantee:**
  - Kein horizontaler Scrollbalken (`overflow-x: clip` auf `main`).
  - Alle Buttons: `max-width: 100%; white-space: normal; word-break: break-word;`.
  - Touch-Targets durchgehend `>= 48px x 48px`.
  - Der Vorher/Nachher-Inspektor unterstützt native Touch-Gesten (`touchstart`, `touchmove`, `touchend`) ohne Verzögerung.
- **Lenis Smooth Scroll:**
  - `duration: 0.9`
  - `smoothTouch: false` (zwingend für 100% natives Smartphone-Scrollen).
  - Synchronisiert mit GSAP ScrollTrigger via `gsap.ticker`.
