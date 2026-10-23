#!/bin/sh
set -e
curl -sSL "$MEDIA_ZIP" -o /tmp/m.zip
unzip -o -q /tmp/m.zip "steinwerk/*" -d /tmp/x
rm -rf media && mv /tmp/x/steinwerk/media media
ls media | head
