"""Composite screenshots into browser / phone mockups (PNG with transparent shadow)."""
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONT = None
for f in ["/usr/share/fonts/truetype/montserrat/Montserrat-Medium.ttf",
          "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"]:
    try:
        FONT = ImageFont.truetype(f, 22); break
    except Exception:
        pass
if FONT is None:
    import glob
    cands = glob.glob("/usr/share/fonts/**/*.ttf", recursive=True)
    FONT = ImageFont.truetype(cands[0], 22)


def rmask(size, r):
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], r, fill=255)
    return m


def shadowed(img, blur=40, off=24, alpha=70, pad=80):
    W, H = img.size
    canvas = Image.new("RGBA", (W + pad * 2, H + pad * 2), (0, 0, 0, 0))
    sh = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    a = img.split()[-1].point(lambda v: v * alpha // 255)
    blk = Image.new("RGBA", img.size, (20, 12, 8, 255))
    blk.putalpha(a)
    sh.paste(blk, (pad, pad + off), blk)
    sh = sh.filter(ImageFilter.GaussianBlur(blur))
    canvas = Image.alpha_composite(canvas, sh)
    canvas.paste(img, (pad, pad), img)
    return canvas


def browser(src, out, url, crop_h=None, width=1440):
    s = Image.open(src).convert("RGB")
    if s.width != width:
        s = s.resize((width, round(s.height * width / s.width)), Image.LANCZOS)
    if crop_h:
        s = s.crop((0, 0, width, min(crop_h, s.height)))
    bar = 52
    W, H = width, s.height + bar
    win = Image.new("RGBA", (W, H), (255, 255, 255, 255))
    d = ImageDraw.Draw(win)
    d.rectangle([0, 0, W, bar], fill=(238, 234, 228, 255))
    for i, c in enumerate([(236, 106, 94), (244, 191, 79), (98, 197, 84)]):
        d.ellipse([22 + i * 26, 19, 36 + i * 26, 33], fill=c)
    pw = min(620, W - 300)
    px = (W - pw) // 2
    d.rounded_rectangle([px, 11, px + pw, bar - 11], 15, fill=(255, 255, 255, 255))
    tw = d.textlength(url, font=FONT)
    d.text((px + (pw - tw) / 2, 14), url, fill=(95, 88, 80), font=FONT)
    win.paste(s, (0, bar))
    win.putalpha(rmask(win.size, 18))
    shadowed(win).save(out)


def phone(src, out, top=0):
    s = Image.open(src).convert("RGB")
    sw = 780
    if s.width != sw:
        s = s.resize((sw, round(s.height * sw / s.width)), Image.LANCZOS)
    sh = 1688
    s = s.crop((0, top, sw, top + sh)) if s.height >= top + sh else s.crop((0, 0, sw, min(sh, s.height)))
    if s.height < sh:
        t = Image.new("RGB", (sw, sh), (0, 0, 0)); t.paste(s, (0, 0)); s = t
    bez = 30
    W, H = sw + bez * 2, sh + bez * 2
    body = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(body)
    d.rounded_rectangle([0, 0, W - 1, H - 1], 118, fill=(18, 16, 15, 255))
    d.rounded_rectangle([3, 3, W - 4, H - 4], 115, outline=(70, 66, 62, 255), width=3)
    scr = s.convert("RGBA")
    scr.putalpha(rmask(scr.size, 88))
    body.paste(scr, (bez, bez), scr)
    # dynamic island
    iw, ih = 230, 64
    d.rounded_rectangle([(W - iw) // 2, bez + 26, (W + iw) // 2, bez + 26 + ih], 32, fill=(8, 8, 8, 255))
    shadowed(body, blur=36, off=26, alpha=80, pad=90).save(out)


if __name__ == "__main__":
    kind = sys.argv[1]
    if kind == "browser":
        browser(sys.argv[2], sys.argv[3], sys.argv[4], int(sys.argv[5]) if len(sys.argv) > 5 else None)
    else:
        phone(sys.argv[2], sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 0)
