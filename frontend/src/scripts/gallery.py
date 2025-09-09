#!/usr/bin/env python3
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "python_modules"))

import os
import json
from collections import defaultdict
from dotenv import load_dotenv
import contentful

# ---------------------------
# Config / Environment
# ---------------------------
load_dotenv()

SPACE_ID = os.getenv("CONTENTFUL_SPACE_ID")
DELIVERY_TOKEN = os.getenv("CONTENTFUL_DELIVERY_TOKEN")
ENVIRONMENT = os.getenv("CONTENTFUL_ENV", "master")
CONTENT_TYPE_ID = os.getenv("CONTENTFUL_GALLERY_CT", "gallery")  # change if your CT id differs
OUTPUT_PATH = os.getenv("ALBUMS_JSON_PATH", "public/albums.json")

if not SPACE_ID or not DELIVERY_TOKEN:
    raise SystemExit("Missing CONTENTFUL_SPACE_ID or DELIVERY_TOKEN in environment.")

# Resolve links = True (default) so that fields like media/photos become Asset objects directly.
client = contentful.Client(
    SPACE_ID,
    DELIVERY_TOKEN,
    environment=ENVIRONMENT,
)

# ---------------------------
# Helpers
# ---------------------------
def _https_url(url: str | None) -> str | None:
    if not url:
        return None
    # Contentful Python SDK usually returns full https URL already.
    # Just in case we ever see //images.ctfassets.net/..., normalize to https.
    if url.startswith("//"):
        return "https:" + url
    return url

def asset_info(asset) -> dict | None:
    """
    Return a compact dict for an Asset (or None if missing).
    """
    if asset is None:
        return None

    # Defensive lookups
    a_id = getattr(asset, "id", None) or getattr(asset, "sys", {}).get("id")
    title = getattr(asset, "title", None) or getattr(asset, "fields", {}).get("title")
    url = _https_url(getattr(asset, "url", lambda: None)()) if callable(getattr(asset, "url", None)) else _https_url(getattr(asset, "url", None))

    # Details (width/height) live under file -> details -> image
    file_obj = getattr(asset, "file", None)
    file_name = None
    content_type = None
    width = None
    height = None
    if file_obj:
        file_name = getattr(file_obj, "file_name", None)
        content_type = getattr(file_obj, "content_type", None)
        details = getattr(file_obj, "details", None)
        if isinstance(details, dict):
            img = details.get("image")
            if isinstance(img, dict):
                width = img.get("width")
                height = img.get("height")

    return {
        "id": a_id,
        "title": title,
        "url": url,
        "fileName": file_name,
        "contentType": content_type,
        "width": width,
        "height": height,
    }

def photos_list(assets) -> list:
    """
    Convert a list (or None) of Asset objects/links to a list of URLs.
    """
    if not assets:
        return []
    urls = []
    for a in assets:
        info = asset_info(a)
        if info and info["url"]:
            urls.append(info["url"])
    return urls

# ---------------------------
# Fetch all Gallery entries (paginate)
# ---------------------------
def fetch_all_gallery_entries() -> list:
    entries = []
    limit = 100
    skip = 0
    while True:
        page = client.entries(
            {
                "content_type": CONTENT_TYPE_ID,
                "limit": limit,
                "skip": skip,
                "order": "sys.createdAt",  # oldest → newest (change to -sys.createdAt for reverse)
            }
        )
        batch = list(page)
        entries.extend(batch)
        if len(batch) < limit:
            break
        skip += limit
    return entries

# ---------------------------
# Transform → albums.json structure
# ---------------------------
def build_albums(entries: list) -> dict:
    """
    Build:
    {
      "albums": [
        {
          "name": "<category>",
          "count": <number_of_items>,
          "items": [
            {
              "id": "<entry_id>",
              "title": "<category or entry title>",
              "album": "<category>",
              "cover": "<cover_url_or_null>",
              "photos": ["<url>", ...],
              "assets": [ {id, title, url, ...}, ... ]  # optional rich objects for your UI
            }
          ]
        },
        ...
      ],
      "totalItems": <total_entry_count>,
      "albumCount": <distinct_categories>
    }
    """
    by_category = defaultdict(list)

    for e in entries:
        # Safe field access. With resolve_links=True, media/photos should be Asset objects.
        fields = getattr(e, "fields", lambda: {})()
        category = fields.get("category") or "Uncategorized"
        entry_id = getattr(e, "id", None) or getattr(e, "sys", {}).get("id")
        # Title fallback: category; adjust if your content type has its own "title" field.
        title = fields.get("title") or category

        media_asset = fields.get("media")  # Asset or None
        cover = None
        if media_asset:
            info = asset_info(media_asset)
            cover = info["url"] if info else None

        photos_assets = fields.get("photos")  # list[Asset] or None
        photo_urls = photos_list(photos_assets)
        photo_infos = [asset_info(a) for a in (photos_assets or []) if asset_info(a)]

        by_category[category].append(
            {
                "id": entry_id,
                "title": title,
                "album": category,
                "cover": cover,
                "photos": photo_urls,     # simple URL list (easy to consume)
                "assets": photo_infos,    # richer objects if you want dimensions/names
            }
        )

    albums = []
    for cat, items in by_category.items():
        albums.append(
            {
                "name": cat,
                "count": len(items),
                "items": items,
            }
        )

    # Sort albums alphabetically; sort items by title for stable output
    albums.sort(key=lambda a: a["name"].lower())
    for a in albums:
        a["items"].sort(key=lambda i: (i["title"] or "").lower())

    return {
        "albums": albums,
        "totalItems": sum(a["count"] for a in albums),
        "albumCount": len(albums),
    }

# ---------------------------
# Main
# ---------------------------
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
