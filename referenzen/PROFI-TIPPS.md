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
- **@aaltodigital – „I built this before my coffee got cold“ (Claude + Framer):**
  - Kaffee-Site als filmische Scroll-Reise vom Ursprung zum Produkt: Plantage im Nebel, rote Kaffeekirschen am Zweig, Kirschen fallen, Erntekorb, aufgeschnittene Kirsche („Two seeds per cherry“), grüne Bohnen fließen in den Röster, Röstflamme, schwebende Bohne, Shop.
  - Prinzip: Herkunft und Herstellung als Kapitel-Story, jedes Kapitel ein Vollbild-Moment mit kurzer Zeile.
  - Gebaut mit Framer.
- **@aaltodigital – „Websites can't have aura“ (Aura Maldives):**
  - Hotel- und Resort-Site, Hero mit Wasservilla und Steg.
  - Scroll führt durch die Glasfront ins Interieur, dann Schwarzblende, dann POV-Füße am Pool („Drift into Paradise“).
  - **Reel-Format = genau Jennys Look:** dunkler Raum, MacBook, Hand mit ROTEN NÄGELN am Trackpad, oben zweizeiliger Text („"Websites can't have aura" / The Website“), am Ende Abblende und IG-Logo.
  - Vorlage für Hotel-Sites (zusammen mit der Webild-Villa) und für Jennys eigene Reels.
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

## Claude-Skills (@alan.buildz – „5 must have Claude Skills“)
1. **Stop Slop** (github.com/hardikpandya/stop-slop): entfernt KI-Floskeln aus Texten (Füllwörter, „nicht X, sondern Y“, Gedankenstriche, Dreier-Listen). Für alle Website-, Post- und Ad-Texte, zusammen mit humanizer.
2. **OmniRoute** (Router, mehrere GitHub-Forks): leitet Claude Code bei erreichtem Limit an andere Modelle weiter. Läuft lokal auf dem eigenen Rechner, ist also hier in der Cloud nicht nutzbar. Optional später auf Jennys Mac.
3. **Apple Design Skill:** Apples Designsprache (klare Typo, viel Weißraum, Produkt im Fokus, Glas-Effekte, ruhige Animationen) als Skill. Kein fester Repo-Link, wird mit dem skill-creator selbst erzeugt.
4. **Task Observer** (github.com/rebelytics/one-skill-to-rule-them-all): beobachtet die Arbeit und gibt einen täglichen Rückblick mit Fehlern und Vorschlägen.
5. **Find Skills:** sucht zur Aufgabe („Ich will eine Landingpage bauen“) die passenden Skills (z. B. frontend-design, copywriting, seo-audit). Bei uns erledigen das SearchSkills und SearchPlugins.

## Arbeitsregeln (Verbote-Kit, Karpathy) → siehe CLAUDE.md im Repo-Hauptordner

## Recht (@itsmariahbrunner – „How to turn Claude into a legal team“)
- **Plugin `commercial-legal` von Anthropic:** In Claude unter Customize → Plugins hinzufügen.
  - Zuerst `/commercial-legal:cold-start-interview`: Rolle, Standort **Deutschland**, eigene Regeln (z. B. „automatische Verlängerungen und Kündigungsgebühren markieren“).
  - Dann `/commercial-legal:review vertrag.pdf`: markiert Klauseln nach den eigenen Regeln und schlägt Änderungen vor.
- Einsatz für Jenny: Webdesign-Kundenverträge, Hosting- und SaaS-Verträge (Shopify-Apps, Vercel, Higgsfield), NDAs.
- **Deutsches Recht beachten:**
  - automatische Vertragsverlängerung gegenüber Verbrauchern nur mit monatlicher Kündbarkeit (§ 309 Nr. 9 BGB)
  - Kündigungsbutton bei Online-Verträgen (§ 312k BGB)
- Das Plugin ersetzt keine Anwältin bzw. keinen Anwalt; es ist US-geprägt, deshalb immer Standort Deutschland angeben.

## KI-Marketing im Shop (@itsmariahbrunner – Alia by Dotdigital, Shopify-App)
- **Idee:** Besucher in Echtzeit segmentieren und je Segment ein anderes Pop-up zeigen:
  - Kaufbereite: Rubbellos
  - Wiederkehrende: Überraschungsrabatt
  - Besucher aus Paid Social: Aktionsrabatt
- Pop-ups im A/B-Test vergleichen.
- Versandkalender für Aktionen (z. B. Black Friday) mit steigenden Kosten pro Kontakt einplanen.
- **Pflicht für Deutschland (Magnifio, LUMINOSO, PYRO, ZOIA):**
  1. **Tracking und Segmentierung** (wiederkehrend, Quelle, Verhalten) erst nach Einwilligung im Cookie-Banner (§ 25 TDDDG). Das Pop-up-Tool darf vorher nicht tracken.
  2. **Newsletter** nur mit aktiver Einwilligung und Double-Opt-In (Art. 7 DSGVO, § 7 Abs. 2 UWG), dazu Link zur Datenschutzerklärung im Pop-up. Rabatt gegen Anmeldung ist erlaubt, wenn klar beschrieben.
  3. **Rabattangaben** („45 % Rabatt“, Streichpreise) beziehen sich auf den niedrigsten Preis der letzten 30 Tage (§ 11 PAngV).
  4. **Rubbellos und Überraschungsrabatt** sind Verkaufsförderung bzw. Gewinnspiel: Bedingungen klar und leicht zugänglich angeben (§ 6 DDG, § 5a UWG). Keine Fake-Countdowns und keine Schein-Knappheit (§ 5 UWG).
  5. **Kleinunternehmer:** keine USt ausweisen, Hinweis „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.“
  6. App-Anbieter in Datenschutzerklärung und AV-Vertrag aufnehmen.
- Umsetzung erst nach Jennys Freigabe (die App ist kostenpflichtig). Jede Änderung im Shop zuerst rechtlich prüfen.

## Regel 31.10.2026 – Jede Seite individuell (Jenny)
Keine „Massen-Webseite“: Webers Wikinger v1 war ein KAVOS-Klon (gleicher Aufbau, gleiches Reservierungs-Widget, nur Farben/Bilder getauscht) – „das merkt man sofort“. Ab jetzt pro Betrieb eigenes Konzept aus dessen echter Identität (Fassade, Logo-Form, Farben, Räume): eigene Palette, eigenes Schriftpaar, eigene Leit-Interaktion, eigener Reservierungs-/Kontaktweg. Vor dem Bauen im PROMPT.md festhalten, was sich von den bisherigen Seiten unterscheidet. Gemeinsam bleibt nur der Technik-Stack.
