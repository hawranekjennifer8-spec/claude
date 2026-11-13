"""Nachbearbeitung: Videos starten automatisch (stumm, Endlosschleife), Fade-Übergänge, eindeutige Shape-IDs.
python3 post.py <raw.pptx> <final.pptx>"""
import re, sys, zipfile

src, dst = sys.argv[1], sys.argv[2]
zin = zipfile.ZipFile(src)
zout = zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED)


def timing(spids):
    n = [3]
    def nid():
        n[0] += 1; return n[0]
    calls = ''
    for i, sp in enumerate(spids):
        a, b = nid(), nid()
        calls += (f'<p:par><p:cTn id="{a}" presetID="1" presetClass="mediacall" presetSubtype="0" fill="hold" nodeType="{"afterEffect" if i == 0 else "withEffect"}">'
                  f'<p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:cmd type="call" cmd="playFrom(0.0)"><p:cBhvr>'
                  f'<p:cTn id="{b}" dur="indefinite" fill="hold"/><p:tgtEl><p:spTgt spid="{sp}"/></p:tgtEl></p:cBhvr></p:cmd></p:childTnLst></p:cTn></p:par>')
    vids = ''
    for sp in spids:
        c = nid()
        vids += (f'<p:video><p:cMediaNode vol="0" mute="1"><p:cTn id="{c}" repeatCount="indefinite" fill="hold" display="0">'
                 f'<p:stCondLst><p:cond delay="indefinite"/></p:stCondLst></p:cTn><p:tgtEl><p:spTgt spid="{sp}"/></p:tgtEl></p:cMediaNode></p:video>')
    return ('<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst>'
            '<p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>'
            '<p:par><p:cTn id="3" fill="hold"><p:stCondLst><p:cond delay="indefinite"/><p:cond evt="onBegin" delay="0"><p:tn val="2"/></p:cond></p:stCondLst><p:childTnLst>'
            '<p:par><p:cTn id="99" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>'
            + calls +
            '</p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par>'
            '</p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>'
            '<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq>'
            + vids +
            '</p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>')


import hashlib
first, dup = {}, {}
for it in zin.infolist():
    if it.filename.startswith('ppt/media/'):
        h = hashlib.sha1(zin.read(it.filename)).hexdigest()
        if h in first: dup[it.filename.split('/')[-1]] = first[h].split('/')[-1]
        else: first[h] = it.filename
for it in zin.infolist():
    if it.filename.startswith('ppt/media/') and it.filename.split('/')[-1] in dup:
        continue
    data = zin.read(it.filename)
    if it.filename.endswith('.rels') and dup:
        x = data.decode('utf8')
        for a, b in dup.items():
            x = x.replace('../media/' + a + '"', '../media/' + b + '"')
        data = x.encode('utf8')
    if re.match(r'ppt/slides/slide\d+\.xml$', it.filename):
        x = data.decode('utf8')
        # eindeutige IDs
        cnt = [1]
        def rid(m):
            cnt[0] += 1
            return f'<p:cNvPr id="{cnt[0]}"'
        x = re.sub(r'<p:cNvPr id="\d+"', rid, x)
        # IDs der Videos (p:pic mit videoFile)
        spids = []
        for pic in re.finditer(r'<p:pic>.*?</p:pic>', x, re.S):
            if 'a:videoFile' in pic.group(0):
                spids.append(re.search(r'<p:cNvPr id="(\d+)"', pic.group(0)).group(1))
        # Klick-Aktion entfernen (Keynote startet sonst erst auf Tippen)
        x = re.sub(r'<a:hlinkClick r:id="" action="ppaction://media"/>', '', x)
        x = re.sub(r'<p:timing>.*?</p:timing>', '', x, flags=re.S)
        x = re.sub(r'<p:transition[^>]*/>|<p:transition.*?</p:transition>', '', x, flags=re.S)
        add = '<p:transition spd="med"><p:fade/></p:transition>'
        if spids:
            add += timing(spids)
        x = x.replace('</p:clrMapOvr>', '</p:clrMapOvr>' + add, 1) if '</p:clrMapOvr>' in x else x.replace('</p:sld>', add + '</p:sld>')
        data = x.encode('utf8')
    zout.writestr(it, data)
zout.close()
print('post ok', dst)
