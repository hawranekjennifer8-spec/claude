#!/bin/sh
# Webers Wikinger – Konzeptseite. Echte Fotos und Logo-Vektor von webers-wikinger.de liegen als Zip auf dem Higgsfield-CDN.
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/f7f92bfb-bf67-466e-b909-81aa1221cf0a.zip" -o /tmp/ww-media.zip
rm -rf img && unzip -o -q /tmp/ww-media.zip
ls img | wc -l
