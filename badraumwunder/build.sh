#!/bin/sh
# Badraumwunder – Konzeptseite. Echte Fotos, Grundriss-Skizzen und Logo-Vektor von badraumwunder.de liegen als Zip auf dem Higgsfield-CDN.
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/f55c5bff-722d-4dc1-a65a-6295c96dacb1.zip" -o /tmp/brw-media.zip
rm -rf img && unzip -o -q /tmp/brw-media.zip
ls img | wc -l
