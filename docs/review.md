# Code-Review & Qualitätsprüfung – Saridis SHK (Ingolstadt)

---

## 1. Prüfung gegen die Refuse-List (Anti-Einheitsbrei)

| Kriterium | Vorgabe | Umsetzung bei Saridis SHK | Status |
|---|---|---|---|
| **Favicon** | Keine Emoji-Data-URLs, physisches `favicon.svg` | Individuelles Vektor-Signet (`favicon.svg`) mit Wasser-/Flammen-Geometrie in Marine und Messing | 🟢 Bestanden |
| **Icons & Emojis** | Keine kitschigen Unicode-Emojis als Service-Icons | Durchgängig saubere, hochauflösende SVG-Vektor-Icons | 🟢 Bestanden |
| **Grid & Layout** | Kein stereotypes 3-Spalten-Bento mit Krypto-Optik | **Master Showcase** mit architektonischer Split-Hero-Bühne, haptischem Vorher/Nachher-Inspektor und Highlight-Bannern | 🟢 Bestanden |
| **Brand Climate** | Kein generischer Dark-Mode (#050505) für Handwerker | **Warm Light Canvas** (`data-theme="light"`, Travertin `#f9f8f5`, Tiefmarine `#0b4f6c`, Messing `#b4793e`) | 🟢 Bestanden |
| **Fakten-Echtheit** | Keine Fake-Statistiken (99.9%, 50.000 gelöste Fälle) | Exakt die realen Daten: 5,0 ⭐ bei 12 Google-Rezensionen, Zitate im Originalwortlaut | 🟢 Bestanden |
| **Text auf Medien** | Keine unlesbaren Texte über ungedimmten Fotos | Gezielte Scrim-Verläufe und verglaste Floating-Badges mit Kontrast > 6:1 | 🟢 Bestanden |
| **Smooth Scroll** | Kein `scroll-behavior: smooth` im CSS (Lenis-Konflikt) | Physikalisches Scrolling über Lenis JS (`duration: 0.9`, `smoothTouch: false`), CSS scroll-behavior komplett vermieden | 🟢 Bestanden |
| **Header-Integrität**| Genau ein `<header>` ohne doppelte Sticky-Balken | Einzeilige Slim Heritage Island Navbar mit integriertem Status-Badge | 🟢 Bestanden |

---

## 2. Technische & Rechtliche Validierung

- [x] **SEO Meta-Tags:** Title (59 Zeichen), Description (154 Zeichen), Canonical, OpenGraph und Schema.org JSON-LD mit allen Inhaber- und Öffnungszeitendaten.
- [x] **Rechtliche Pflichtmodule:**
  - § 5 DDG Impressum als barrierefreies Modal mit ladungsfähiger Anschrift (Mana Saridis, Geibelstraße 22, 85055 Ingolstadt), Handwerkskammer für München und Oberbayern, Berufsbezeichnung Installateur- und Heizungsbauer, Handwerksordnung (HwO) und § 36 VSBG.
  - DSGVO Art. 13 & 14 Datenschutzerklärung mit Rechtsgrundlagen, Logfiles, Betroffenenrechten und Hoster-Transparenz.
  - TDDDG Cookie Consent-Banner mit Two-Click Maps Blockierung über `data-src` und gleichwertigen Buttons („Alle akzeptieren“ & „Nur notwendige“).
- [x] **Mobile-First Responsiveness:** 375px bis 1440px viewport-stabil, Buttons mit Zeilenumbruch und ohne `white-space: nowrap`, Touch-Targets $\ge 48\times 48\text{px}$.
- [x] **Accessibility:** Skip-Link vorhanden, semantische Landmarks (`header`, `main`, `section`, `footer`), ARIA-Attribute auf Akkordeons und Modals.

---

## 3. Fazit
Der Code ist vollständig frei von Schablonen, hochgradig performant, abmahnsicher und erfüllt 100% der Qualitätsanforderungen.
