#!/bin/sh
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/7b8618f8-ea47-43c5-9473-eab5567c4112.zip" -o /tmp/m.zip
unzip -o -q /tmp/m.zip "goldwabe/*" -d /tmp/x
rm -rf media && mv /tmp/x/goldwabe/media media
ls media | head
