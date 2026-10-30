#!/bin/sh
# HundeSalon & mehr – Konzeptseite. Echte Fotos und Logo-Vektor von hundesalon-und-mehr.de liegen als Zip auf dem Higgsfield-CDN.
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/da2cf422-b239-412c-8238-87ac87a96bb6.zip" -o /tmp/hs-media.zip
rm -rf img && unzip -o -q /tmp/hs-media.zip
ls img | wc -l
