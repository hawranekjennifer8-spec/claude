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

## @ramanstudio_ca – „LEVANTO“ Bad-Sanierung (01.11.2026, Jenny: „bombastisch“)
Video: referenzen/2026-11-01_ramanstudio_levanto-bad-sanierung.mp4 (+ Kontaktbogen).
- **Hero = Scroll-Bausequenz:** Beim Scrollen baut sich das Bad vom Rohbau auf („Bare board to red marble“ → „floor to ceiling“ → Walk-in-Dusche „lit from within“ → „Floating stone, warm brass“ → „Ready for the long soak“). Technik: Bildsequenz/Video, per ScrollTrigger auf Frames gemappt (canvas, 100–150 WebP-Frames), kurze Zeilen links oben wechseln pro Bauphase.
- **Herstellung für echte Betriebe:** Start-Frame = echtes Vorher-Foto (Rohbau/altes Bad), End-Frame = echtes Nachher-Foto derselben Kamera-Position → Image-to-Video mit Start+End-Frame (Higgsfield/Kling/Veo „first-last frame“), Bewegung: Kamera steht, Materialien „wachsen“ ein. Nichts dazuerfinden: nur Vorher/Nachher-Paare des Betriebs; KI erzeugt nur die Übergangsframes. Ohne Paar → Grundriss-Slider oder 3D-Planung → Foto.
- Danach: dunkle Sektionen mit Zahlen (Projekte · Jahre · Bauzeit), Laufband mit Leistungen, „Sie sehen den Stein, bevor wir ihn schneiden“ (Materialfreigabe), Leistungsraster, 4 Bauschritte, Projektgalerie, Formular „Kostenlose Vor-Ort-Beratung“.
- Präsentation: MacBook-POV, Hand am Trackpad, Farbverlauf-Hintergrund.

## @designby.abhay – „Obsidian“ Autoaufbereitung, Scroll-to-Wash (02.11.2026, Einblendung „Opus 5.5 + Higgsfield“)
Video: referenzen/2026-11-02_designby-abhay_obsidian-scroll-to-wash.mp4 (+ Kontaktbogen).
- **Hero = Scroll-Verwandlung am Produkt:** Schlammverkrustetes schwarzes SUV in dunkler Werkstatt mit Lichtbändern, Zeile „Scroll to wash it“. Beim Scrollen wäscht sich der Wagen sauber, ohne dass die Kamera wegspringt. Technik wie LEVANTO: Bildsequenz per ScrollTrigger auf Frames (canvas, WebP).
- **Kapitel statt Sektionen:** Danach fährt die Kamera in Makros: „Look closer.“ (Lack unter hellem Licht) → „Swirls out …“ (Polierkreise im Lack) → Finale im warmen Abendlicht vor dem Tor: „Keys back. Jaw drops.“ mit Buchungs-Hinweis. Das Scrollen erzählt den Ablauf der Dienstleistung vom Abgeben bis zur Übergabe.
- **Typo:** Eine Zeile gefüllt, die zweite als Kontur, mal links, mal rechts neben dem Motiv; kurze Sätze, kleine Unterzeile, unten eine feste Buchungsleiste.
- **Passt für:** Autoaufbereiter, Reinigung, Restaurierung, Polster, alles mit sichtbarem Vorher/Nachher.
- **Für echte Betriebe:** Wie bei LEVANTO nur echte Vorher/Nachher-Paare desselben Autos und derselben Kameraposition; KI erzeugt nur Übergangsframes. Fremde Marken-Logos und Kennzeichen unkenntlich machen. Reine KI-Bilder nicht als Kundenarbeit ausgeben.
- Präsentation: MacBook-POV im dunklen Raum, Hand am Trackpad, Ende mit Instagram-Handle.

## @uijonah – „Calibre“ Uhren-Website, Explosionsansicht (02.11.2026)
Video: referenzen/2026-11-02_uijonah_calibre-uhr-explosion.mov (+ Kontaktbogen).
- **Hero = ein Produkt, das beim Scrollen zerlegt wird:** Schwarze Skelett-Uhr auf Schwarz, Titel „Calibre“ groß und dünn daneben. Die Kamera taucht ins Uhrwerk („Six beats a second. Slowed twelve times.“), dann schwebt die Uhr in Einzelteile auseinander („102 parts. Nothing hidden.“), dann Oberflächen-Makro („Côtes de Genève“), zum Schluss wieder ganz: „Wear the Calibre“ mit Button.
- **Warum es wirkt:** Eine einzige Sache füllt den Bildschirm, jede Station belegt genau ein Qualitätsmerkmal in einem Satz. Weißraum ist hier Schwarz.
- **Technik:** Wie LEVANTO/Obsidian als Bildsequenz per ScrollTrigger; für echtes Drehen und Zerlegen alternativ 3D-Modell (three.js, GLB) nach PROFI-TIPPS-Regeln.
- **Passt für:** Schmuck (LUMINOSO: Stein, Fassung, Punze), Uhren, Technik, Handwerk. Zahlen und Fachbegriffe nur, wenn sie für das echte Produkt belegt sind.
- Präsentation: POV am Laptop im dunklen Raum, Hook „Pov: You mastered interactive websites“, Call-to-Action „comment BUILD for prompt“.

## @cesarbizn – „Harvey“ Sales-Agent für Claude Code (02.11.2026)
Video: referenzen/2026-11-02_cesarbizn_harvey-sales-agent.mov (+ Kontaktbogen). Deutsches Reel über ein GitHub-Projekt mit MIT-Lizenz laut Einblendung; Repo-Adresse nicht im Video erkannt, Code nicht geprüft.
- **Laut Video:** Du sagst, was du verkaufst → Harvey sucht Firmen über OpenStreetMap, liest deren Website und filtert (Beispiel: „No online booking“) → schreibt je Firma eine persönliche Mail (unter 75 Wörter) → Antworten landen vorbereitet im Postfach, du gibst frei. Läuft lokal mit Dashboard (Kontakte, Mails, Gespräche), alle 15 Minuten, Ruhezeiten nachts, über den Claude-Plan.
- **Idee für uns:** Website-Filter passt zu maps-lead-finder: lokale Betriebe ohne Online-Buchung oder gute Website finden und eine echte Beobachtung pro Betrieb notieren.
- **ACHTUNG Recht DE:** Unaufgeforderte Werbe-Mails sind nach § 7 UWG auch an Firmen ohne Einwilligung grundsätzlich unzulässig (Abmahnrisiko). Vollautomatisches Cold-Mailing nicht so übernehmen. Sauberer: nur Recherche und Entwurf, Kontakt per Brief oder Telefon im zulässigen Rahmen; vor Einsatz rechtlich klären.

## IMMER: echtes Logo + Logofarben, unverändert (02.11.2026)
Jennys Regel (mit Nachdruck): Auf jeder Kundenseite das **echte Logo des Betriebs unverändert** einsetzen (nicht neu zeichnen, nicht durch eine eigene Wortmarke ersetzen) und die **Farben aus diesem Logo unverändert** als Markenfarben der Seite nehmen. Anlass: Autolackiererei Götter v1 hatte eine selbst gesetzte Wortmarke „F. GÖTTER“ und Signalrot statt Logo und Logofarben. Im PROMPT.md vorab festhalten: Logo-Datei + Quelle, Hex-Werte aus dem Logo.

## IMMER-Regel + Referenz-Videos vom 07.11.2026 (gilt für ALLES: Webseiten, Stamore, Apps, Instagram, Videos, Bilder)
Jennys Taste. Er wird bei jeder Aufgabe automatisch angewendet, ohne Hinweis von ihr: Lenis + GSAP/ScrollTrigger, 21st.dev, Framer, alle Skills und Referenzen, smoothe flüssige Animationen, 4K-Bilder in hoch realistischer Auflösung und Liebe zum Detail.
- `2026-11-07-uiuxjam-komponenten.mp4` (@ui.ux.jam): Fertige Premium-Komponenten statt Eigenbau. Dazu gehören ein 3D Memory Album (Foto-Leiste neben großem Editorial-Porträt mit Riesen-Wortmarke), ein Card Folder (Karten 01/02/03 fächern auf), eine CMS Shuffle Gallery und Editorial-Raster.
- `2026-11-07-yllkaedits-*.mp4` (@yllkaedits, 4 Videos): Aus EINEM Produktfoto entsteht eine ganze Kampagne. Dazu gehören:
  - freigestellter Hero auf Weiß und Beauty-Porträt mit Produkt
  - Food-Styling, z. B. Lipgloss als tropfende Eiskugel, Stapel-Skulptur, Bonbon- oder Fruchtgummi-Bett, Handtuch-Muster, Honig-Makro
  - eine knallige Farbwelt, abgeleitet aus dem Produkt
- `2026-11-07-polanaeem-loop-bagel.mp4`: LOOP-Bagel. Beim Scrollen wird der Bagel Schicht für Schicht belegt („Built in layers“ → „Built to bite“). Die Sektionsfarbe wechselt mit jeder Schicht. Serif-Versalien, MacBook auf Holztisch.
- `2026-11-07-websitedesigners-interior.mp4`: Interior-Portfolio für 1,5k $. Dunkel-warm, 4K-Raumfotos, Outline-Wortmarke, „Choose the direction“ mit 3 Karten, „Let's talk about your project“.
- `2026-11-07-aimenwebs-barbershop.mp4`: „hard part“-Barbershop in Schwarz-Weiß. Dazu gehören:
  - 3D-Stuhl, dessen Licht der Maus folgt
  - Preisliste mit Dauer pro Leistung, Barber-Wahl „Four mirrors“, Mitgliedschaften
  - große 4,9 als Bewertung und freier Slot live („free at 2:40 PM“)
  - Buchung in unter einer Minute
- Feedback Zahnwelt: Arztpraxen müssen seriös, vertrauenswürdig und medizinisch wirken, „keine Spielothek“.

## Taste-Erweiterung 15./16.11.2026 (IMMER vor dem Erstellen ansehen – Webseiten, Content, Bilder, Videos, Feeds, Branding)
Jennys Wort: „ERWEITERUNG – damit unsere Bilder, Videos und Content generell besser werden.“ Café Va Liés und Kanti findet sie „richtig gut, edel und ästhetisch“. Diese Richtung ist der Maßstab.
- `2026-11-15_cafe-va-lies_feed.png`: Salbeigrün, Dunkeloliv, Pfirsich-Creme und Kaffeebraun. Makro-Food (Espresso aus dem Siebträger, Crema-Blasen, Croissant-Waben, Latte-Art) wechselt sich mit Typo-Kacheln ab. Dort steht ein freigestelltes Produkt auf einer Farbfläche, Script und Serif-Versalien sind gemischt, dazu vertikale Streifen und eine Linien-Illustration.
- `2026-11-16_kantiyenikoy_feed-*.png`: Kanti, wie in der Kanti-Regel beschrieben (Creme + Rot, Blitz, Hände, Typo-Kacheln, Handschrift-Notizen).
- `2026-11-15_arwa-designstudio_*` (@arwa.designstudio): Brandings mit eigenem Charakter oder Maskottchen und einer Signalfarbe. Beispiele:
  - MELTO-Eis: lila Plüschfigur, tropfende Schoko/Karamell, Logo als Prägung im Eis, Logo-Schürze
  - Full Cup: Kobaltblau, tropfendes Logo-Muster
  - weitere: FURMO, Pollos, Cloud, Mazoji
  - Präsentation als Collage abgerundeter Kacheln mit echten Mockups
- `2026-11-15_studio-sevd_luxury-color-palettes.mp4`: Pro Marke 4–5 Töne mit Hex.
  - HEMLABEL: #191617 #ACA297 #F6F6F6 #462A21
  - Streetwear: #210E13 #5A1717 #F1F3F3 #BF915E #C2B5A3
  - state of her: #141414 #CDE1DB #F8F8F2 #59514F #DDDAC9
  - PRINCE: #171717 #DDD0CC #5C4D48 #143040 #451313
  - SEIDO: #1F1C17 #7D7B62 #F6F2EF #956E50 #D9CEB9
  - Twenty OhNine: #3D121F #EDEAE2 #2D1E1C #F5EAD1
- `2026-11-15_studio-sevd_me-vs-my-portfolio.mp4`: Portfolio als Raster aus Farbflächen, die sich mit Marken-Mockups füllen. Jedes Projekt hat eine eigene Farbwelt.
- `2026-11-15_studio-sevd_mockup-quellen.mp4`: Mockup-Quellen lummi.ai, mockups.supply, madebyattic.com, moyo-studio.com, createom.com.
- `2026-11-15_niki-aroca_brand-farben.mp4`: Jede Markenfarbe bekommt einen Namen und eine Rolle. Beispiele: Velvet Red / Starlight White / Cosmic Lilac, Blue Hour / Porcelain White / Solar Orange, Midnight Merlot / Ember Orange / Daybreak Yellow.
- `2026-11-15_stephanni-wolski_moodboards.mp4`: Retro-Editorial-Moodboards in Bordeaux, Orange, Oliv und Creme. Motive: Dalmatiner, Gingham, Streifen, Rosen, Hände mit Nägeln. Erst entsteht das Moodboard, dann der Content.

**Anwendung pro Marke:**
- benannte Farbpalette mit Hex
- Signature-Element bzw. Charakter
- echte Mockups
- Feed-Wechsel aus Makro-Foto und Typo-Kachel

Nie 1:1 kopieren. Immer mit dem echten Logo und den echten Daten des Betriebs arbeiten.

## @blochsocialhaus – Mock-Feeds und Content-Strategie (16.11.2026)
- Mock-Feeds `2026-11-16_blochsocialhaus_mockfeed-*`: 3x3-Raster, in der Mitte die Studio-Logo-Kachel („MOCK FEED“), darunter die Farbpalette als Streifen. Jede Marke ist Ton in Ton gehalten:
  - **Kaffee** (Karamell/Mokka): Espresso-Makro mit Nutzen-Pills, Latte-Art mit Suchleiste, „will you … get coffee with me?“ mit Ring-Box, Bohnen mit „Good days start here.“, Hand mit Iced Latte und Accessoires
  - **Beauty** (Bronze/Nude): Glitzer-Textur, Produkt-Flatlay, Glow-Porträt, „Made to GLOW“ über Puder-Textur
  - **Haar** (Sand/Taupe): Schaum-Makro, Zopf vor Riesen-Typo „WASH STYLE SHINE“, Haar-Welle
  - **Skincare** (Pfirsich/Creme): Schaum mit „clean, gentle, honest.“, Tropfen aus der Tube, Glow-Lippen, echte Menschen mit Produkt
- Reel `2026-11-16_blochsocialhaus_content-friseur.mp4` („everything I would post for a hair salon“), daraus die Content-Säulen:
  1. Ergebnisse und Vorher/Nachher
  2. Erinnerungen („Zeit für ein Refresh“)
  3. Tipps und Produktempfehlungen – genau die Fragen, die Kunden googeln
  4. Die Person hinter dem Betrieb: Expertise, Persönlichkeit, Erlebnis
  5. Leistungen klar zeigen: was, für wen und was man buchen muss, um das Ergebnis zu bekommen
  
  Leitsatz: **Strategy > pretty pictures.**
- **Recht (DE):** Mock-Feeds nur mit eigenen Marken, echten Kunden oder als „Konzept“ gekennzeichnet. Keine fremden Markenlogos und keine fremden Produktfotos (Urheber- und Markenrecht, Irreführung nach UWG).

## Taste-Erweiterung 17.11.2026 – Website-Reels (@textura.eu, @ariana.porcelana)
Ziel: besser, kreativer, smoother und professioneller als die Konkurrenz. Videos und Kontaktbögen: `referenzen/2026-11-17_*`.

**@textura.eu – „How I build websites like these in 5 minutes with Claude“**
- Präsentation: MacBook schräg im dunklen Raum, Hintergrund in der Signalfarbe der jeweiligen Seite (Rot, Neon-Limette, Violett). Hook „Watch it to the end“, Outro „Comment ‚Prompt‘“ + IG-Handle.
- Gezeigte Seiten: Partikel-Kugel in Lila mit Stern im Zentrum; „The handoffs run themselves.“ mit grün leuchtenden Lichtbahnen und schwebenden UI-Karten; Fintech „Money that moves with you“ – Karte steht auf violettem Licht-Wasser.
- Workflow: Prompt-/Template-Bibliothek **Getlayers** (Hero-Prompts mit Live-Vorschau, „Copy prompt“, Source Code, Tags landing page / three.js / next.js; Beispiel „AI Studio“: Chrome-Stern im Dunkeln mit Partikeln und Kameraflug) → Prompt in den AI-Builder / Claude → Seite fertig.
- Für uns: vor jedem Hero zusätzlich Getlayers durchsuchen (neben 21st.dev, MotionSites, Prompt Motion …); Three.js-Heros mit Partikeln, Licht und Kamerabewegung als Wow-Moment.

**@ariana.porcelana – „Client said ‚surprise me‘ so I did THIS..“**
- Hook: Person am beleuchteten Keyboard, danach POV mit Hand am Trackpad, die Seite scrollt.
- Scroll-Story für ein Mango-Collagen-Shot, Ursprung → Produkt → Mensch: Wolken „Grown closer to the sun.“ → Insel/Meer → Mangos am Baum „Never cold-stored. Never hurried.“ → Bewegungsunschärfe „When it lets go, we're ready.“ → Mango schwebt am Strand „Sunlight, undone and bottled.“ → Flasche am Strand „Everything the tree made. In 75 ml.“ → freigestellte Flasche dreht sich auf hellem Grund → Model am Strand mit der Flasche.
- Stil: handschriftliche Pinsel-Typo, warme Sonnenfarben, vollflächige Film-Szenen mit weichen Übergängen, kurze poetische Zeilen pro Szene. Outro IG-Logo + Handle.

**Regeln daraus (gilt ab sofort für Websites, Konzeptseiten, Portfolio, Reels)**
1. Scroll-Storytelling vom Ursprung zum Produkt: Natur/Herkunft → Handwerk/Ernte → Produkt → Mensch, der es genießt.
2. Pro Szene nur eine kurze, poetische Zeile – keine Textblöcke im Hero.
3. Vollflächige Film-Szenen mit weichen Übergängen (Blur/Bewegungsunschärfe als Übergang), echte Bilder des Betriebs als Basis.
4. Präsentation der Seiten in Reels/Portfolio: MacBook im dunklen Raum, farbiges Licht passend zur Seite, Hand am Trackpad, Hook-Satz + Outro mit Handle.
5. Wow-Hero (Partikel, Licht, 3D-Objekt) aus Prompt-Bibliotheken (Getlayers, 21st.dev, MotionSites) als Startpunkt – nie 1:1, immer mit echtem Logo, echten Farben und Daten des Betriebs.
