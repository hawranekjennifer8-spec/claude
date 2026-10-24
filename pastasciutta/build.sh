#!/bin/sh
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/e812ab9d-1a9c-4bbe-ab7f-45232b79e8db.zip" -o /tmp/m1.zip
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/7934f968-f7fc-4207-9a1e-8ff8dea7584d.zip" -o /tmp/m3.zip
rm -rf /tmp/x && mkdir -p /tmp/x
unzip -o -q /tmp/m1.zip "pastasciutta/*" -d /tmp/x
unzip -o -q /tmp/m3.zip "pastasciutta/*" -d /tmp/x
rm -rf media && mv /tmp/x/pastasciutta/media media
ls media | head -60
