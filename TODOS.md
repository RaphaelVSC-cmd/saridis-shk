# Aufgaben-Checkliste – Saridis SHK (Ingolstadt)

## Phase 0: Diagnose & Lead-Inkubation
- [x] Unternehmensdaten verifiziert (Saridis SHK, Geibelstr. 22, 85055 Ingolstadt, 01523 7384702)
- [x] Öffnungszeiten analysiert (Mo–Fr bis 20 Uhr, Sa 08–18 Uhr)
- [x] Google-Bewertungen analysiert (12 Rezensionen, 5.0 ⭐, Zitate im Wortlaut)
- [x] `docs/lead-data.md` erstellt

## Phase 1: Strategie & PRD
- [x] Grammatik: Master Showcase / Split Stage Hybrid gewählt
- [x] Brand Climate (Warm Light Canvas `data-theme="light"`, Travertin & Messing) definiert
- [x] Dual Signature Features konzipiert:
  - Signature Feature 1: Taktiler Vorher/Nachher Bad-Inspektor mit DIN 18534 Detail-Pins
  - Signature Feature 2: 60fps 3D Sanitär- & Armaturen-Studio mit PVD-Finish-Switcher und Wassersimulation
- [x] Fingerprint-Gate gegen bestehende Projekte geprüft (6/6 Kriterien erfüllt)
- [x] `docs/prd.md` & `scrollcraft/builds/saridis-shk/BRIEF.md` erstellt

## Phase 2: Design-System & Architektur
- [x] ScrollCraft-Design-Tokens (--sc-canvas, --sc-surface, --sc-ink, --sc-accent, --sc-accent-brass) definiert
- [x] Typografie & Spacing (4px Basis, optisches Kerning) festgelegt
- [x] Mobile-First Standards (375px & 390px Zero-Collision) definiert
- [x] `docs/design-system.md` erstellt

## Phase 3: Bespoke Code-Build
- [x] Individuelles Vektor-Favicon `favicon.svg` (Marine & Messing Tropfen/Flamme Signet)
- [x] `index.html` mit ScrollCraft-Architektur, Multi-Plane Layered Hero Depth, Vorher/Nachher-Inspektor, 3D-Armaturen-Studio, Quick-Configurator mit WhatsApp-Direktanbindung, Two-Click Maps, DSGVO Consent Banner, Impressum & Datenschutz Modals (§ 5 DDG, DSGVO Art. 13)
- [x] `style.css` mit Warm Light Canvas, Master Showcase Layouts, 3D Canvas Styling, PVD-Swatches, barrierefreien Focus-States
- [x] `app.js` mit Three.js WebGL-Studio (prozedurale Designer-Armatur, Touch-Orbit, 4 PVD-Oberflächen, Partikel-Wassersimulation, Visibility-Observer), Vorher/Nachher Drag- & Touch-Engine, Quick-Configurator Logik, WhatsApp-Übergabe, Consent Manager, Modal-Management
- [x] Lokales Three.js (`assets/js/three.min.js`) für 100% DSGVO-Konformität ohne externe CDN-Abfragen

## Phase 4: Code-Review & ScrollCraft Audit
- [x] `docs/review.md` erstellt und alle Refuse-List Kriterien geprüft
- [x] Keine unerlaubten CDNs, keine Layout-Shifts, 60fps Mobile-Optimierung

## Phase 5: Test & Mobile-First QA
- [x] Test auf 375px, 768px, 1440px
- [x] Touch-Interaktion des Sliders und des 3D-Studios verifiziert
- [x] Modal- und Consent-Verhalten verifiziert

## Phase 5.5: Blockierendes 8-Säulen-Audit (`website-audit-pro`)
- [x] Alle 8 Säulen geprüft und `docs/audit-report.md` aktualisiert
- [x] 100% 🟢 GRÜN

## Phase 6: Git & GitHub Deployment
- [x] Git Repository initialisiert & commited
- [x] GitHub Repo aktualisiert: `https://github.com/RaphaelVSC-cmd/saridis-shk`

## Phase 7: Dokumentation
- [x] `docs/ANLEITUNG.md` & `README.md` erstellt

## Phase 8: Notion CRM Sync & Saxer-Skripte
- [x] Notion Lead Karte in `Sparrings-Camp (Übungs-Leads)` angelegt
- [x] Saxer-Telefonskript & 60s Loom-Skript hinterlegt
