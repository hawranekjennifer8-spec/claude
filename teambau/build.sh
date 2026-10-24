#!/bin/sh
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/e812ab9d-1a9c-4bbe-ab7f-45232b79e8db.zip" -o /tmp/m.zip
unzip -o -q /tmp/m.zip "teambau/*" -d /tmp/x
rm -rf media && mv /tmp/x/teambau/media media
ls media | head -40
