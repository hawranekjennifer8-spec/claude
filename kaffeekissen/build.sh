#!/bin/sh
# Kaffee & Kissen – Konzeptseite v5 (Hero: schnelle Bilder, Platzhalter, kürzerer Scroll). Code + Medien liegen als Zip auf dem Higgsfield-CDN
# (Quelle: Higgsfield-Website-Repo „kaffee-kissen-konzept", public/ + src/site-body.html).
set -e
C="https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h"
curl -sSL "$C/6f34efc0-4040-40bd-9247-3c5119a74e96.zip" -o /tmp/kk-media.zip
curl -sSL "$C/82d8e3bb-5d6f-429c-82d0-c7dbf15b5b0c.zip" -o /tmp/kk-code.zip
rm -rf /tmp/kkx && mkdir -p /tmp/kkx
unzip -o -q /tmp/kk-media.zip -d /tmp/kkx
unzip -o -q /tmp/kk-code.zip -d /tmp/kkx
rm -rf img fonts vendor
mv /tmp/kkx/kaffeekissen/media img
mv /tmp/kkx/kaffeekissen/fonts fonts
mv /tmp/kkx/kaffeekissen/vendor vendor
cp /tmp/kkx/kaffeekissen/index.html /tmp/kkx/kaffeekissen/404.html /tmp/kkx/kaffeekissen/site.css /tmp/kkx/kaffeekissen/site.js .
curl -sSL "$C/caf3b796-3f4d-424e-8b36-f7097f30001a.zip" -o /tmp/kk-hero5.zip
unzip -o -q /tmp/kk-hero5.zip -d .
cp img/favicon.png img/apple-touch-icon.png img/og.jpg .
ls; ls img | wc -l
