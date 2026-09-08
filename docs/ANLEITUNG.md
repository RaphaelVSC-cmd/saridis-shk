# Anleitung & Dokumentation – Saridis SHK

## 1. Übersicht & Zweck
Diese Website wurde für **Saridis SHK** (Sanitärtechnik & Heizungsbau) in Ingolstadt entwickelt. Sie basiert auf dem Framework von `website-generator-new` (v5.0 — Bespoke Craft, Problem-Solving & Legal Compliance Edition).

---

## 2. Projektstruktur
```
saridis-shk/
├── assets/
│   └── images/
│       ├── hero_master_bathroom.jpg    # 8K Meisterbadsanierung (Hero-Bühne)
│       ├── bad_vorher.jpg              # 80er-Jahre Bad vor Sanierung
│       ├── bad_nachher.jpg             # Fugenloses Traumbad nach Sanierung
│       └── meister_sanitaer.jpg        # Meisterhandwerk & Rohrleitungsbau
├── docs/
│   ├── lead-data.md                    # Unternehmens-DNA & Google-Rezensionen
│   ├── prd.md                          # Strategie, Grammatik & Fingerprint-Gate
│   ├── design-system.md                # 6 Farbrollen, Typografie & Spacing
│   ├── review.md                       # Code-Review gegen Refuse-List
│   ├── audit-report.md                 # 8-Säulen Master-Audit (100% GRÜN)
│   └── ANLEITUNG.md                    # Diese Datei
├── favicon.svg                         # Vektorbasiertes Wasser-/Wärme-Signet
├── index.html                          # Semantischer Master-Showcase Auftritt
├── style.css                           # Warm Light Canvas CSS-Architektur
├── app.js                              # Lenis, Vorher/Nachher Engine, Rechner, Modals
├── robots.txt                          # SEO Crawling-Anweisungen
├── sitemap.xml                         # XML-Sitemap für Google Search Console
└── README.md                           # Projektübersicht & GitHub-Präsentation
```

---

## 3. Lokale Vorschau starten
Um die Seite lokal im Browser zu öffnen:
1. Navigiere in das Projektverzeichnis:
   ```bash
   cd "g:\Meine Ablage\Personal\BusinessWebsites\Projekte\saridis-shk"
   ```
2. Öffne die `index.html` direkt im Browser (z. B. via Doppelklick) oder starte einen lokalen Webserver:
   ```bash
   npx serve .
   ```
   oder
   ```bash
   python -m http.server 8000
   ```

---

## 4. Kernfunktionen & Signature Feature
1. **Der Ingolstädter Bad-Inspektor:**
   - Touch- und mausfähiger Split-Screen Slider zum stufenlosen Vergleich vor/nach der Sanierung.
   - Hotspot-Pins heben die handwerklichen Details hervor (fugenlose Paneele, bodengleiche Walk-In Dusche, Thermostatarmatur).
   - Integrierter 3-Klick-Schnellkalkulator für Bauzeit und Budgetkorridor.
   - 1-Klick-Direktübergabe des konfigurierten Vorhabens an WhatsApp (`+49 1523 7384702`) oder das Kontaktformular.
2. **Rechts- & DSGVO-Module:**
   - Google Maps Zwei-Klick-Einbindung (wird vor Einwilligung nicht geladen).
   - TDDDG Cookie Consent-Banner mit gleichwertigen Buttons („Alle akzeptieren“ & „Nur notwendige“).
   - § 5 DDG Impressum & DSGVO Art. 13 Datenschutzerklärung als barrierefreie Modals.
   - Mobile Sticky Action Bar am Smartphone-Bildschirmrand (`z-index: 99999`).
