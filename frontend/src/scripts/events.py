# scripts/build_albums_json.py
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "python_modules"))

import os
import json
from dotenv import load_dotenv
import contentful
from contentful.asset import Asset

# -----------------------------------------------------------------------------
# Config / Client
# -----------------------------------------------------------------------------
load_dotenv()
SPACE_ID = os.getenv("CONTENTFUL_SPACE_ID")
DELIVERY_TOKEN = os.getenv("CONTENTFUL_DELIVERY_TOKEN")
ENVIRONMENT = os.getenv("CONTENTFUL_ENVIRONMENT", "master")

if not SPACE_ID or not DELIVERY_TOKEN:
    raise SystemExit(
        "Missing env: CONTENTFUL_SPACE_ID and/or CONTENTFUL_DELIVERY_TOKEN."
    )

client = contentful.Client(SPACE_ID, DELIVERY_TOKEN, environment=ENVIRONMENT)

# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------
def _ensure_asset(a):
    """
    Return a Contentful Asset instance, even if `a` is a link stub or dict.
    """
    if not a:
        return None
    if isinstance(a, Asset):
        return a

    # Try to get sys.id if it's a dict-like or resource object
    asset_id = None
    try:
        asset_id = a.sys.get("id")
    except Exception:
        pass
    if not asset_id:
        asset_id = getattr(a, "id", None)

    if asset_id:
        try:
            return client.asset(asset_id)
        except Exception:
            return None
    return None


def _asset_url(a):
    a = _ensure_asset(a)
    if not a:
        return None
    try:
        return "https:" + a.url()
    except Exception:
        return None


def _asset_info(a):
    a = _ensure_asset(a)
    if not a:
        return None
    try:
        url = _asset_url(a)
        if not url:
            return None

        fields = getattr(a, "fields", {}) or {}
        file_ = fields.get("file") or {}
        details = file_.get("details") or {}
        image = details.get("image") or {}

        return {
            "id": a.sys.get("id"),
            "url": url,
            "contentType": file_.get("contentType"),
            "fileName": file_.get("fileName"),
            "width": image.get("width"),
            "height": image.get("height"),
            "title": fields.get("title") or "",
            "description": fields.get("description") or "",
        }
    except Exception:
        return None

# -----------------------------------------------------------------------------
# Fetch / Build
# -----------------------------------------------------------------------------
def fetch_all():
    limit, skip, items = 1000, 0, []
    while True:
        page = client.entries({
            "content_type": "gallery",
            "order": "fields.category,-sys.createdAt",
            "include": 2,   # resolve linked assets
            "limit": limit,
            "skip": skip,
        })
        page_items = list(page)
        items += page_items
        total = getattr(page, "total", len(page_items))
        skip += limit
        if skip >= total or len(page_items) == 0:
            break
    return items


def build_payload(entries):
    albums_by_category = {}

    for e in entries:
        # Category
        category = getattr(e, "category", None)
        if not category:
            try:
                category = (e.fields() or {}).get("category")
            except Exception:
                pass
        category = category or "Uncategorized"

        # Cover
        cover_asset = getattr(e, "media", None)
        if not cover_asset:
            try:
                cover_asset = (e.fields() or {}).get("media")
            except Exception:
                pass
        cover = _asset_info(cover_asset)

        # Photos
        photos_field = getattr(e, "photos", None)
        if photos_field is None:
            try:
                photos_field = (e.fields() or {}).get("photos")
            except Exception:
                pass

        if isinstance(photos_field, list):
            photos_assets = photos_field
        elif photos_field:
            photos_assets = [photos_field]
        else:
            photos_assets = []

        photos = [ai for ai in (_asset_info(a) for a in photos_assets) if ai]

        if not photos and cover:
            photos = [cover]

        item = {
            "id": e.sys.get("id"),
            "title": category,
            "album": category,
            "cover": cover,
            "photos": photos,
            "mediaUrls": [p["url"] for p in photos if p and p.get("url")],
        }

        albums_by_category.setdefault(category, []).append(item)

    return {
        "albums": [
            {"name": cat, "count": len(items), "items": items}
            for cat, items in albums_by_category.items()
        ],
        "totalItems": sum(len(v) for v in albums_by_category.values()),
        "albumCount": len(albums_by_category),
    }

# -----------------------------------------------------------------------------
# Main
# -----------------------------------------------------------------------------
def main():
    entries = fetch_all_gallery_entries()
    data = build_albums(entries)

    # Always write into project root / public/albums.json (or env override)
    PROJECT_ROOT = Path(__file__).resolve().parents[2]
    output_rel = OUTPUT_PATH  # e.g. "public/albums.json"
    out_path = PROJECT_ROOT / output_rel

    out_path.parent.mkdir(parents=True, exist_ok=True)

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Wrote {out_path} with {data['albumCount']} album(s), {data['totalItems']} item(s).")

if __name__ == "__main__":
    main()
