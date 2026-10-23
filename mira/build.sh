#!/bin/sh
set -e
curl -sSL "$MEDIA_ZIP" -o /tmp/m.zip
unzip -o -q /tmp/m.zip "mira/*" -d /tmp/x
rm -rf media && mv /tmp/x/mira/media media
ls media | head
