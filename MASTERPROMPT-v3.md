# Masterprompt v3: Konzept-Websites für echte Betriebe (J.H. Digital Atelier)

Gilt für jede neue Konzept- oder Kunden-Website. Ziel: Senior-Webdesign auf 35.000-€-Niveau, bei dem jede Aussage stimmt und jedes Bild zum echten Betrieb gehört.

## 1. Quellen zuerst, dann Text

1. Alle Quellen des Betriebs sichern, bevor eine Zeile Text entsteht:
   - die eigene Website mit allen Unterseiten (Start, Über uns, Leistungen, Referenzen, Impressum, Datenschutz)
   - Instagram: Bio, Highlights, Posts
   - das Google-Unternehmensprofil: Öffnungszeiten, Telefon, Kategorie, Bewertungen
   - Bestell- oder Speisekarten-Seiten (z. B. speisekarte.de, eigener Bestellshop)
2. Eine Faktentabelle anlegen (Fakt → Quelle → Datum). Nur Fakten aus dieser Tabelle kommen auf die Seite.
3. **Nichts erfinden**, nämlich:
   - keine Zahlen, Jahre, Projektanzahlen, Preise, Zeiten oder Adressen
   - keine Zutaten, die nicht auf der Karte stehen
   - keine Personen, Rollen oder Abläufe (z. B. „bestellt wird an der Theke“)
   - keine Zertifikate
   - keine Begriffe, die der Betrieb nicht selbst verwendet (z. B. „Salon“)
4. Widersprechen sich Quellen (z. B. „20 Jahre / 40 Projekte“ vs. „35 Jahre / 150 Projekte“), die Angabe der Hauptseite nehmen und den Widerspruch Jenny melden.
5. Impressum und Recht:
   - Angaben exakt aus dem Original übernehmen: Name, Anschrift, Geschäftsführer, HRB, Steuer-Nr., USt-IdNr.
   - Auf Konzeptseiten kein eigenes Impressum erfinden. Stattdessen der Hinweis „Konzept-Entwurf von J.H. Digital Atelier · keine offizielle Website“.
6. Bewertungen:
   - Nur echte Google-Bewertungen verwenden.
   - Deutsche Originale wörtlich übernehmen, fremdsprachige sinngetreu übersetzen und als übersetzt kennzeichnen.
   - Sterne und Anzahl exakt laut Google.
7. Marketing-Headlines dürfen formuliert werden, aber nur aus dem Material des Betriebs: Claim, Bio, Logo-Text (z. B. „Made with love“, „Stay sexy – Stay al dente“, „Uns geht's ums Bauen“).

## 2. Bilder: echt, besser, nie erfunden

1. Immer das echte Logo und die echten Bilder des Betriebs verwenden. Quellen: Website, Instagram, Google-Profil „Vom Inhaber“.
2. Erlaubt ist professionelles Nachbearbeiten:
   - Licht und Weißabgleich
   - Schärfe
   - Farbe appetitlicher machen
   - störende Kleinigkeiten entfernen
   - sauberer Untergrund
   - Hochskalieren auf 4K
3. Verboten:
   - das Gericht, den Teller, den Raum oder die Fassade verändern
   - neue Szenen generieren, die es im Betrieb nicht gibt
4. Fehlen echte Bilder für ein Element (z. B. ein Gericht), dann:
   - Platzhalter klar als „Bildvorschlag“ kennzeichnen, oder
   - Jenny melden, dass vor Ort fotografiert werden sollte.
   - Fotos von Gästen aus Google-Bewertungen nur nach Rücksprache verwenden (Rechte liegen bei den Gästen).
5. Ein Bild gehört genau zu einem Gericht oder Produkt. Kein Bild doppelt für zwei verschiedene Gerichte.
6. **Bildfokus:**
   - Für jedes Bild in jedem Rahmen (Hero, Bogenrahmen, Hover-Frame, Thumbnail, Handy) `object-position` auf das Hauptmotiv setzen.
   - Das Motiv (Essen, Getränk, Produkt) sitzt mittig und vollständig sichtbar, nicht abgeschnitten unten, links oder rechts.
   - Jeden Ausschnitt auf PC und Handy per Screenshot prüfen.

## 3. Gestaltung und Animation (Senior-Niveau)

1. **Individuelles Intro je Branche:**
   - Café: Latte Art zeichnet sich in eine Tasse, dann Zoom in die Tasse.
   - Imkerei: Waben füllen sich mit Honig, eine Biene fliegt durch.
   - Bau: Ein Kran setzt den Namen ab, dann fährt die Kamera in die Szene.
   - Pasta: Eine Spirale zeichnet sich, die Gabel dreht sich, dann öffnet sich ein Vorhang.
2. Die fünf Pflicht-Elemente: Scroll-Story, butterweiche Animationen, Hero-Video, Hover-Reveal, Object Breakdown.
3. **Technik:**
   - Lenis Smooth-Scroll plus GSAP ScrollTrigger mit Scrub.
   - Nur `transform` und `opacity` animieren.
   - Scharfe 2K/4K-Stills statt unscharfer Frame-Sequenzen.
   - Easing `expo.out` / `power3`.
   - Gestaffelte Text-Reveals Zeile für Zeile.
   - Parallax auf Bildern.
   - Bild-Reveals über `clip-path`.
4. **Qualität:**
   - Nichts überlappt (Text, Bilder, Biene, Navigation).
   - Keine Wortumbrüche in Headlines.
   - Kein horizontaler Overflow auf dem Handy (`html{overflow-x:hidden}`, `body{overflow-x:clip}`, damit `sticky` funktioniert).
   - `ScrollTrigger.refresh()` nach dem Laden der Fonts.
5. Testen auf 1280×720, 1440×900, 1920×1080 und iPhone, jeden Abschnitt per Screenshot.

## 4. Portfolio

1. Jede neue Konzeptseite kommt ins Portfolio.
2. Vorschau als echte Bildschirmaufnahme (1280×800, 24 s, flüssiges Scrollen nach dem Intro). Sie startet per Autoplay, sobald die Folie offen ist.
3. Kennzeichnung: „Konzept-Entwurf · nicht beauftragt“.
4. Betriebe, bei denen Jenny gerade selbst pitcht, vorher herausnehmen.
