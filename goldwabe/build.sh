#!/bin/sh
set -e
curl -sSL "$MEDIA_ZIP" -o /tmp/m.zip
unzip -o -q /tmp/m.zip "goldwabe/*" -d /tmp/x
rm -rf media && mv /tmp/x/goldwabe/media media
ls media | head
