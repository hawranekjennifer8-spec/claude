#!/bin/sh
# Lilly's Luxe Lounge – Konzeptseite. Echtes Logo von lillysluxelounge.com liegt als Zip auf dem Higgsfield-CDN.
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/aa5df45d-dc25-4ec3-868f-27445f5015db.zip" -o /tmp/ll-media.zip
rm -rf img && unzip -o -q /tmp/ll-media.zip
ls img | wc -l
