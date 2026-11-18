"""Generate the template photos with kie.ai (GPT Image 2.5, 10 credits = $0.05 each) and save them as webp.

    node tools/templates/build.mjs                      # writes prompts.json
    python tools/templates/images.py --dry-run          # list what would be made and the cost
    python tools/templates/images.py                    # make every missing image (3 per template)
    python tools/templates/images.py --only dentistry --names hero --force   # redo one
    node tools/templates/build.mjs                      # rebuild so pages use img/*.webp

Output: templates/<slug>/img/{hero,clinic,detail}.webp (originals kept in tools/templates/raw/, not deployed).
Existing webp files are skipped unless --force. Uses the shared client youtube/daily-science-dose/pipeline/kie.py
(KIE_API_KEY from the workspace .env; never printed).
"""
import argparse
import json
import os
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))  # ainoor/
WS = os.path.dirname(ROOT)                      # workspace
sys.path.insert(0, os.path.join(WS, "youtube", "daily-science-dose", "pipeline"))
import kie  # noqa: E402

# name -> (kie aspect, final webp size). Hero is cropped from 2:3 to 4:5.
SIZES = {"hero": ("2:3", (800, 1000)), "clinic": ("3:2", (1200, 800)), "detail": ("1:1", (900, 900))}
CREDITS_EACH = 10
SUFFIX = " Natural, realistic skin and proportions, no plastic look. Shot on a full-frame camera, 35mm lens."


def to_webp(src, dst, size):
    im = Image.open(src).convert("RGB")
    tw, th = size
    scale = max(tw / im.width, th / im.height)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    left = (im.width - tw) // 2
    top = max(0, round((im.height - th) * 0.25))  # keep faces: crop more from the bottom
    im.crop((left, top, left + tw, top + th)).save(dst, "WEBP", quality=82, method=6)


def make(slug, name, prompt):
    aspect, size = SIZES[name]
    raw_dir = os.path.join(HERE, "raw", slug)
    os.makedirs(raw_dir, exist_ok=True)
    raw = os.path.join(raw_dir, f"{name}.png")
    kie.image(prompt + SUFFIX, raw, aspect=aspect)
    out_dir = os.path.join(ROOT, "templates", slug, "img")
    os.makedirs(out_dir, exist_ok=True)
    to_webp(raw, os.path.join(out_dir, f"{name}.webp"), size)
    return f"{slug}/{name}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma-separated slugs")
    ap.add_argument("--names", default="hero,clinic,detail")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--workers", type=int, default=4)
    a = ap.parse_args()

    prompts = json.load(open(os.path.join(HERE, "prompts.json"), encoding="utf-8"))
    slugs = a.only.split(",") if a.only else list(prompts)
    jobs = []
    for slug in slugs:
        for name in a.names.split(","):
            webp = os.path.join(ROOT, "templates", slug, "img", f"{name}.webp")
            if os.path.exists(webp) and not a.force:
                continue
            jobs.append((slug, name, prompts[slug][name]))

    cost = len(jobs) * CREDITS_EACH
    print(f"{len(jobs)} images, {cost} credits (${cost * 0.005:.2f})")
    if a.dry_run or not jobs:
        for j in jobs:
            print(" ", j[0], j[1])
        return
    bal = kie.credits()
    print("balance before:", bal)
    if bal is not None and float(bal) < cost:
        sys.exit("not enough credits")
    failed = []
    with ThreadPoolExecutor(a.workers) as ex:
        futs = {ex.submit(make, *j): j for j in jobs}
        for f in as_completed(futs):
            try:
                print("done", f.result(), flush=True)
            except Exception as e:  # keep going; report at the end
                failed.append(futs[f][:2])
                print("FAILED", futs[f][0], futs[f][1], str(e)[:200], flush=True)
    print("balance after:", kie.credits())
    if failed:
        print("failed:", ", ".join(f"{s}/{n}" for s, n in failed))
        sys.exit(1)


if __name__ == "__main__":
    main()
