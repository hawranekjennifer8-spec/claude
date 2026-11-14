#!/bin/bash
cd /home/user/dk
for k in "$@"; do
  url=$(python3 -c "import json;print(json.load(open('cfg.json'))['$k']['url'])")
  echo "== $k $(date +%T)"
  rm -rf m/$k tmp/$k
  python3 prep.py $k && python3 build.py $k $url 2>&1 | tail -12
  echo "built $k $(date +%T)"
done
echo BALLDONE
