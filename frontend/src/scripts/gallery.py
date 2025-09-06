# scripts/build_albums_json.py
# frontend/src/scripts/events.py
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "python_modules"))

import os, json
from dotenv import load_dotenv
import contentful

load_dotenv()
SPACE_ID = os.getenv("CONTENTFUL_SPACE_ID")
DELIVERY_TOKEN = os.getenv("CONTENTFUL_DELIVERY_TOKEN")
client = contentful.Client(SPACE_ID, DELIVERY_TOKEN, environment="master")

def _asset_url(a):
    try:
        return "https:" + a.url()
    except Exception:
        return None

def fetch_all():
    limit, skip, items = 1000, 0, []
    while True:
        page = client.entries({
            "content_type": "gallery",
            "order": "fields.category,-sys.createdAt",
            "include": 1, "limit": limit, "skip": skip
        })
        items += list(page)
        total = getattr(page, "total", len(page))
        skip += limit
        if skip >= total or len(page) == 0:
            break
    return items

def build_payload(entries):
    albums = {}
    for e in entries:
        album = getattr(e, "category", None) or "Uncategorized"
        media = getattr(e, "media", None)
        media_list = media if isinstance(media, list) else ([media] if media else [])
        urls = [u for a in media_list if (u := _asset_url(a))]
        item = {
            "id": e.sys.get("id"),
            "title": getattr(e, "title", ""),
            "album": album,
            "mediaUrls": urls,
        }
        albums.setdefault(album, []).append(item)

    return {
        "albums": [{"name": k, "count": len(v), "items": v} for k, v in albums.items()],
        "totalItems": sum(len(v) for v in albums.values()),
        "albumCount": len(albums),
    }

if __name__ == "__main__":
    data = build_payload(fetch_all())

    # Resolve project root from *this file’s* path:
    PROJECT_ROOT = Path(__file__).resolve().parents[2]   # repo root if script is in /scripts
    # Write to <repo>/frontend/public/albums.json
    out_path = PROJECT_ROOT / "public" / "albums.json"

    out_path.parent.mkdir(parents=True, exist_ok=True)
    with out_path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Wrote {out_path}")
