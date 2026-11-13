"""Aus Screencast-Frames Keynote-taugliche Loop-Videos bauen.
python3 build.py <key> <url>   (liest raw/<key>/d und raw/<key>/m, schreibt m/<key>/)"""
import json, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

KEY, URL = sys.argv[1], sys.argv[2]
RAW = f'raw/{KEY}'
OUT = f'm/{KEY}'
os.makedirs(OUT, exist_ok=True)
TMP = f'tmp/{KEY}'
os.makedirs(TMP, exist_ok=True)
FPS = 30
ENC = ['-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-profile:v', 'high', '-level', '4.1',
       '-pix_fmt', 'yuv420p', '-r', str(FPS), '-g', '60', '-movflags', '+faststart', '-an']
ESP, CREAM = (0x17, 0x11, 0x0C), (0xF3, 0xED, 0xE2)


def font(sz):
    for f in ['/usr/share/fonts/truetype/montserrat/Montserrat-Medium.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']:
        if os.path.exists(f):
            return ImageFont.truetype(f, sz)
    import glob
    return ImageFont.truetype(glob.glob('/usr/share/fonts/**/*.ttf', recursive=True)[0], sz)


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-1500:]); raise SystemExit('ffmpeg failed')


def bar_png():
    p = f'{TMP}/bar.png'
    W, H = 1440, 58
    im = Image.new('RGB', (W, H), (238, 234, 228))
    d = ImageDraw.Draw(im)
    for i, c in enumerate([(236, 106, 94), (244, 191, 79), (98, 197, 84)]):
        d.ellipse([24 + i * 28, 21, 40 + i * 28, 37], fill=c)
    pw = 640; px = (W - pw) // 2
    d.rounded_rectangle([px, 12, px + pw, H - 12], 17, fill=(255, 255, 255))
    f = font(21)
    t = URL
    tw = d.textlength(t, font=f)
    d.text((px + (pw - tw) / 2, 17), t, fill=(95, 88, 80), font=f)
    d.line([0, H - 1, W, H - 1], fill=(222, 216, 208))
    im.save(p)
    return p


def phone_png(bg):
    p = f'{TMP}/phone_{bg[0]}.png'
    W, H, bez, r = 636, 1320, 22, 70
    im = Image.new('RGBA', (W, H), bg + (255,))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, W - 1, H - 1], 92, fill=(18, 16, 15, 255))
    d.rounded_rectangle([2, 2, W - 3, H - 3], 90, outline=(72, 68, 64, 255), width=2)
    alpha = Image.new('L', (W, H), 255)
    ImageDraw.Draw(alpha).rounded_rectangle([bez, bez, W - bez - 1, H - bez - 1], r, fill=0)
    im.putalpha(alpha)
    # Dynamic Island
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([W // 2 - 62, bez + 14, W // 2 + 62, bez + 46], 16, fill=(8, 8, 8, 255))
    im.save(p)
    return p


def concat_list(dev, t0, t1):
    fr = json.load(open(f'{RAW}/{dev}/frames.json'))
    lst = f'{TMP}/{dev}_{t0:.2f}.txt'
    sel = [(n, t) for n, t in fr]
    # letztes Bild vor t0 als Start
    start = 0
    for i, (n, t) in enumerate(sel):
        if t <= t0: start = i
    lines = []
    for i in range(start, len(sel)):
        n, t = sel[i]
        if t > t1: break
        nt = sel[i + 1][1] if i + 1 < len(sel) else t1
        a, b2 = max(t, t0), min(nt, t1)
        if b2 <= a: continue
        lines.append(f"file '{os.path.abspath(RAW)}/{dev}/{n}'\nduration {b2 - a:.4f}")
    lines.append(lines[-1].split('\n')[0])
    open(lst, 'w').write('ffconcat version 1.0\n' + '\n'.join(lines) + '\n')
    return lst


def seg(dev, t0, t1, out, bg=None):
    lst = concat_list(dev, t0, t1)
    if dev == 'd':
        bar = bar_png()
        vf = f'[0:v]fps={FPS},scale=1440:900:flags=lanczos,setsar=1[v];[1:v][v]vstack=inputs=2,format=yuv420p'
        run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-i', bar, '-filter_complex', vf] + ENC + ['-t', f'{t1 - t0:.3f}', out])
    else:
        ph = phone_png(bg)
        c = '0x%02X%02X%02X' % bg
        vf = (f'[0:v]fps={FPS},scale=592:-2:flags=lanczos,crop=592:1276:0:0,setsar=1,pad=636:1320:22:22:color={c}[v];'
              f'[v][1:v]overlay=0:0,format=yuv420p')
        run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-loop', '1', '-i', ph, '-filter_complex', vf] + ENC + ['-t', f'{t1 - t0:.3f}', out])


def dur(f):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).decode())


def loop(src, out, target, xf=0.6, crf='22'):
    d = dur(src)
    n = max(1, int((target - xf) // (d - xf)) + 1) if d < target else 1
    if n == 1:
        os.replace(src, out); return
    ins = []
    for _ in range(n): ins += ['-i', src]
    fc, prev, off = [], '[0:v]', 0.0
    for i in range(1, n):
        off += d - xf
        lab = f'[x{i}]'
        fc.append(f'{prev}[{i}:v]xfade=transition=fade:duration={xf}:offset={off:.3f}{lab}')
        prev = lab
    enc = [crf if v == '22' else v for v in ENC]
    run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fc), '-map', prev] + enc + [out])


def poster(src, t, out):
    run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{t:.2f}', '-i', src, '-frames:v', '1', out])


def marks(dev):
    return {k: v for k, v in json.load(open(f'{RAW}/{dev}/marks.json'))}


md, mm = marks('d'), marks('m')
# Desktop
seg('d', md['nav'], md['intro_end'], f'{TMP}/intro1.mp4')
loop(f'{TMP}/intro1.mp4', f'{OUT}/intro.mp4', 58)
poster(f'{OUT}/intro.mp4', min(4.5, md['intro_end'] - md['nav'] - 0.5), f'{OUT}/intro_p.png')
seg('d', md['intro_end'] - 4.0, md['intro_end'], f'{TMP}/hero1.mp4')
loop(f'{TMP}/hero1.mp4', f'{OUT}/hero.mp4', 45, xf=0.8)
poster(f'{OUT}/hero.mp4', 1.0, f'{OUT}/hero_p.png')
seg('d', md['intro_end'] - 1.0, md['end'] + 1.6, f'{TMP}/full1.mp4')
loop(f'{TMP}/full1.mp4', f'{OUT}/full.mp4', 2 * dur(f'{TMP}/full1.mp4') - 1, crf='25')
poster(f'{OUT}/full.mp4', 0.5, f'{OUT}/full_p.png')
for i in (1, 2, 3):
    k = f'hl{i}'
    if k not in md:
        print('MISSING', k); continue
    seg('d', md[k] - 2.4, md[k] + 2.5, f'{TMP}/h{i}a.mp4')
    loop(f'{TMP}/h{i}a.mp4', f'{OUT}/h{i}.mp4', 45)
    poster(f'{OUT}/h{i}.mp4', 2.6, f'{OUT}/h{i}_p.png')
# Handy
seg('m', mm['nav'], mm['intro_end'], f'{TMP}/pintro1.mp4', ESP)
loop(f'{TMP}/pintro1.mp4', f'{OUT}/pintro.mp4', 58)
poster(f'{OUT}/pintro.mp4', min(4.5, mm['intro_end'] - mm['nav'] - 0.5), f'{OUT}/pintro_p.png')
seg('m', mm['nav'], mm['end'] + 1.2, f'{TMP}/ph1.mp4', CREAM)
loop(f'{TMP}/ph1.mp4', f'{OUT}/ph_c.mp4', 2 * dur(f'{TMP}/ph1.mp4') - 1)
poster(f'{OUT}/ph_c.mp4', 6.0, f'{OUT}/ph_c_p.png')
for f in sorted(os.listdir(OUT)):
    if f.endswith('.mp4'):
        print(f, round(dur(f'{OUT}/{f}'), 1), 's', round(os.path.getsize(f'{OUT}/{f}') / 1e6, 1), 'MB')
