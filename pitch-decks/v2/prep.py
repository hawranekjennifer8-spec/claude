"""Statische Medien: alte Seite (Browser/Handy), QR-Code.  python3 prep.py <key>"""
import json, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont
KEY = sys.argv[1]
cfg = json.load(open('cfg.json'))[KEY]
RAW, OUT = f'raw/{KEY}', f'm/{KEY}'
os.makedirs(OUT, exist_ok=True)


def font(sz):
    for f in ['/usr/share/fonts/truetype/montserrat/Montserrat-Medium.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']:
        if os.path.exists(f):
            return ImageFont.truetype(f, sz)
    import glob
    return ImageFont.truetype(glob.glob('/usr/share/fonts/**/*.ttf', recursive=True)[0], sz)


def browser(src, out, url):
    s = Image.open(src).convert('RGB').resize((1440, 900), Image.LANCZOS)
    W, H = 1440, 58
    im = Image.new('RGB', (W, 958), (238, 234, 228))
    d = ImageDraw.Draw(im)
    for i, c in enumerate([(236, 106, 94), (244, 191, 79), (98, 197, 84)]):
        d.ellipse([24 + i * 28, 21, 40 + i * 28, 37], fill=c)
    pw = 640; px = (W - pw) // 2
    d.rounded_rectangle([px, 12, px + pw, H - 12], 17, fill=(255, 255, 255))
    f = font(21); tw = d.textlength(url, font=f)
    d.text((px + (pw - tw) / 2, 17), url, fill=(95, 88, 80), font=f)
    im.paste(s, (0, 58))
    im.save(out)


def phone(src, out):
    W, H, bez, r = 636, 1320, 22, 70
    s = Image.open(src).convert('RGB')
    s = s.resize((592, round(s.height * 592 / s.width)), Image.LANCZOS).crop((0, 0, 592, 1276))
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    body = Image.new('L', (W, H), 0)
    ImageDraw.Draw(body).rounded_rectangle([0, 0, W - 1, H - 1], 92, fill=255)
    dark = Image.new('RGBA', (W, H), (18, 16, 15, 255))
    im.paste(dark, (0, 0), body)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([2, 2, W - 3, H - 3], 90, outline=(72, 68, 64, 255), width=2)
    m = Image.new('L', s.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, s.width - 1, s.height - 1], r, fill=255)
    im.paste(s, (bez, bez), m)
    d.rounded_rectangle([W // 2 - 62, bez + 14, W // 2 + 62, bez + 46], 16, fill=(8, 8, 8, 255))
    im.save(out)


if cfg['old']:
    browser(f'{RAW}/old_d.png', f'{OUT}/old_b.png', cfg['old'])
    phone(f'{RAW}/old_m.png', f'{OUT}/old_p.png')
subprocess.run(['node', '-e', f"require('qrcode').toFile('{OUT}/qr.png','https://{cfg['url']}',{{width:1200,margin:1,color:{{dark:'#17110C',light:'#FFFFFF'}}}},e=>{{if(e)throw e}})"], check=True)
print('prep ok', KEY)
