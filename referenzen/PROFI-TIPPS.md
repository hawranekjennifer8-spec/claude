# Profi-Tipps & Werkzeuge aus Jennys Referenz-Videos (laufend ergänzen)

> Vor JEDER neuen oder überarbeiteten Website, jedem Reel und jedem Feed lesen. Pro Nische auswählen, was passt, und im Projekt-Prompt begründen.

## Design & Layout
- **@zachex – Editorial Layouts:**
  - Blog/Übersicht: Titel links, Karten in vier Spalten, einige darunter versetzt.
  - Bilder sprechen lassen: nur EIN kurzer Absatz pro Block.
  - Bilder über das Layout verteilen, mit angeschnittenen Kanten.
  - Split-Screen: eine Hälfte vollflächiges Bild, der ganze Text auf der anderen Seite.
  - Riesige Wortmarke am Seitenende (z. B. „VISKN“).
- **@katarina.uxdesign – Claude + Ubernatural:**
  - Editoriale Seiten mit großer Serif-Typo, schwebenden Objekten, tiefem Blau und weichen Farbverläufen.
  - Präsentiert auf dem MacBook mit Hand am Trackpad in farbigem Licht.
- **@design4me_:** fertige Premium-Interaktionen (Hover Water, Box Grid, Spiral Gallery, Hanging Card, Image Trail, Runaround Text) statt Eigenbau.
- **@blochsocialhaus – „1 photo? No problem.“:**
  - 3×3-Feed aus einem einzigen Produktfoto, in einer Farbwelt (Braun/Caramel).
  - Mischung aus Produkt, Textur-Close-up, typografischer Kachel, Lifestyle-Hand mit Nägeln, Mock-up-Kachel („will you … get coffee with me?“).

## Technik & Qualität (@iamformed – „Deine Claude Code Website wird niemand kaufen …“)
1. **Playwright CLI:** Die Seite wird im echten Browser selbst getestet (Klicks, Formulare, Handy- und Desktop-Ansicht), damit sie nicht nur schön aussieht, sondern auch funktioniert.
2. **Supabase MCP Server:** echte Datenbank hinter der Seite (Formulare, Buchungen, Login), wenn ein Projekt das braucht.
3. **Strix:** KI-Sicherheitstest, der Sicherheitslücken sucht, vor jedem Launch mit Backend.
4. **Referenzseiten:** Große Marken-Seiten (z. B. Apple-Produktseiten) als Maßstab für Aufbau und Detailtiefe nehmen.
5. **UI-Komponenten und Design-Dateien:** fertige High-End-Bausteine aus Komponenten-Bibliotheken (z. B. 3D-/Shader-Effekte wie „Crystalized Ball“) einsetzen.

## Marke & Content (@jamieegabrielle – Brand Kit)
- Ein **Brand Kit** im KI-Tool anlegen (gezeigt in einem Studio-Tool, vermutlich ElevenLabs):
  - Logos, Farben und viele echte Referenzfotos
  - Guidelines mit Empfehlungen und Verboten (z. B. „never use neon, no glows, no 3D text, natural light, warm and moody“)
- Jede Grafik oder jedes Reel-Cover mit dem Kit erzeugen. So bleibt alles eine Marke, statt jedes Mal neu zu würfeln.
- Für J.H. Digital Atelier: Brand Kit = Logo, Farben, die 9 Glam-Fotos und die Regeln aus dem Masterprompt.

## PR & Sichtbarkeit (@itsmariahbrunner – „How to turn Claude into a PR team“)
- **GitHub-Repo NEWSJACK** (elvisun/newsjack, kostenlos), ein KI-PR-Agent mit diesen Skills:
  - `/voice-extractor`: Personal Brand, Expertise und Hintergrund erfassen
  - `/newsjack-setup` und `/newsjack-detector`: passende aktuelle News finden
  - `/angle-generator`: eigenen Story-Winkel finden
  - `/find-journalists` bzw. Journalist-Fit-Check: passende Redakteure in der Branche finden
- Ziel: Jenny und Kunden in Fachmedien und Presse bringen (Backlinks und Vertrauen, auch gut für SEO).
- Ohne Claude Code gibt es den Prompt aus ihrem Leitfaden (Kommentar „PUBLICATION“).

## SEO
- Claude SEO (Daniel Agrici), siehe seo/SEO-PLAN.md. Prüfung läuft täglich.

## Null-Fehler-Standard (Jenny, 30.10.2026 – gilt immer)
- **Bilder:** keine unscharfen Bilder.
- **Videos:** keine hängenden Videos.
- **Layout:**
  - keine Lücken oder Leerräume in der Seite
  - nichts falsch formatiert
  - nichts überlappt
- **Fehlerseiten:** keine 404- oder Error-Seiten und keine kaputten Links.
- **Gefühl:** Alles wirkt souverän, flüssig animiert und high-end, wie von einem Senior-Webdesigner mit Marketing-Gespür.
- **Schriften:** mehrere, bewusst kombinierte Schriftarten, nie 08/15.
- **Ziel:** die Nummer 1 werden. Dafür jede Referenz, jeden Skill und jeden Connector nutzen und mit Jennys Vorlieben und Abneigungen abgleichen.
