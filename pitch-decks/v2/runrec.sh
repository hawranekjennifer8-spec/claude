#!/bin/bash
cd /home/user/dk
for k in "$@"; do
  url=$(python3 -c "import json;print(json.load(open('cfg.json'))['$k']['url'])")
  nd=$(python3 -c "import json;print(json.dumps(json.load(open('cfg.json'))['$k']['needles']))")
  old=$(python3 -c "import json;print(json.load(open('cfg.json'))['$k']['old'] or '')")
  rm -rf raw/$k; mkdir -p raw/$k
  echo "== $k $(date +%T)"
  timeout 200 node rec.mjs $url raw/$k/d desktop "$nd" 2>&1 | tail -2
  timeout 160 node rec.mjs $url raw/$k/m mobile "$nd" 2>&1 | tail -2
  [ -n "$old" ] && timeout 120 node oldshot.mjs $old raw/$k 2>&1 | tail -2
  echo "done $k $(date +%T)"
done
echo ALLDONE
