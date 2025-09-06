# frontend/src/scripts/events.py
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "python_modules"))
import os, json
from datetime import datetime, timezone
from dotenv import load_dotenv
import contentful

load_dotenv()

SPACE_ID = os.getenv("CONTENTFUL_SPACE_ID")
DELIVERY_TOKEN = os.getenv("CONTENTFUL_DELIVERY_TOKEN")
ENVIRONMENT = os.getenv("CONTENTFUL_ENV", "master")

if not SPACE_ID or not DELIVERY_TOKEN:
    raise SystemExit("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_DELIVERY_TOKEN.")

# Your content type API ID
CONTENT_TYPE_ID = "churchEvents"

client = contentful.Client(SPACE_ID, DELIVERY_TOKEN, environment=ENVIRONMENT)

# ---------- helpers ----------

def _to_iso(v):
    """Normalize date/time values (datetime/str/locale-dict) to ISO8601 string."""
    if v is None:
        return ""
    if isinstance(v, datetime):
        return v.replace(tzinfo=v.tzinfo or timezone.utc).isoformat().replace("+00:00", "Z")
    if isinstance(v, str):
        return v
    if isinstance(v, dict):
        # locale-wrapped dict like {"en-US": "..."}
        for val in v.values():
            if isinstance(val, (str, datetime)):
                return _to_iso(val)
    return str(v)

def _iso_to_dt(s: str) -> datetime:
    """Parse ISO defensively; return max datetime on failure (so bad/missing goes last)."""
    if not s:
        return datetime.max.replace(tzinfo=timezone.utc)
    try:
        if s.endswith("Z"):
            s = s[:-1] + "+00:00"
        return datetime.fromisoformat(s)
    except Exception:
        try:
            main, _, tz = s.partition("+")
            if "." in main:
                main = main.split(".")[0]
            return datetime.fromisoformat(main + ("+" + tz if tz else ""))
        except Exception:
            return datetime.max.replace(tzinfo=timezone.utc)

def _fields_dict(entry):
    """Return a plain dict of fields for a Contentful entry (SDK uses a method)."""
    try:
        f = entry.fields()
        return f if isinstance(f, dict) else dict(f or {})
    except Exception:
        f = getattr(entry, "fields", None)
        if callable(f):
            f = f()
        return f or {}

def _camel_to_snake(name: str):
    out = []
    for ch in name:
        if ch.isupper():
            out.append('_')
            out.append(ch.lower())
        else:
            out.append(ch)
    s = ''.join(out)
    return s[1:] if s.startswith('_') else s

def _get_any(entry, fdict: dict, *ids):
    """Try attribute (snake), then dict (camel), then dict (snake); return first non-None."""
    for name in ids:
        snake = _camel_to_snake(name)
        val = getattr(entry, snake, None)
        if val is not None:
            return val
        if name in fdict and fdict.get(name) is not None:
            return fdict.get(name)
        if snake in fdict and fdict.get(snake) is not None:
            return fdict.get(snake)
    return None

def _looks_like_datetime(v) -> bool:
    iso = _to_iso(v)
    if not iso:
        return False
    try:
        _iso_to_dt(iso)
        return True
    except Exception:
        return False

def _auto_pick_datetime_field(fdict: dict):
    """Pick the first field that looks like a datetime; prefer names containing 'start'."""
    if not isinstance(fdict, dict):
        return None, None
    # Score fields: prefer ones whose key contains 'start'
    candidates = []
    for k, v in fdict.items():
        if _looks_like_datetime(v):
            score = 0
            lk = k.lower()
            if "start" in lk or "begin" in lk:
                score += 10
            if "date" in lk or "time" in lk:
                score += 2
            candidates.append((score, k, v))
    if not candidates:
        return None, None
    candidates.sort(key=lambda t: (-t[0], t[1]))  # best score first
    _, key, val = candidates[0]
    return key, val

# ---------- main logic ----------

def fetch_all():
    """Fetch all entries for churchEvents (no server-side order; we sort locally)."""
    limit, skip, items = 1000, 0, []
    while True:
        page = client.entries({
            "content_type": CONTENT_TYPE_ID,
            "include": 1,
            "limit": limit,
            "skip": skip,
        })
        items += list(page)
        total = getattr(page, "total", len(page))
        skip += limit
        if skip >= total or len(page) == 0:
            break
    return items

def build_payload(entries, debug=False):
    events = []
    for e in entries:
        f = _fields_dict(e)

        title = _get_any(e, f, "title") or ""
        start_raw = _get_any(e, f, "startTime", "start", "date", "startsAt", "start_time")
        end_raw   = _get_any(e, f, "endTime", "end", "endsAt", "end_time")
        location  = _get_any(e, f, "location") or ""
        description = _get_any(e, f, "description") or ""

        sys_obj = getattr(e, "sys", {}) or {}

        # Parse start into month/day/year
        start_iso = _to_iso(start_raw)
        start_dt = _iso_to_dt(start_iso) if start_iso else None

        ev = {
            "id": sys_obj.get("id"),
            "title": title or "",
            "start": start_iso,   # keep original ISO if you still want it
            "startMonth": start_dt.strftime("%B") if start_dt else "",
            "startDay": start_dt.day if start_dt else None,
            "startYear": start_dt.year if start_dt else None,
            "end": _to_iso(end_raw) if end_raw else None,
            "location": _to_iso(location) if isinstance(location, dict) else (location or ""),
            "description": _to_iso(description) if isinstance(description, dict) else (description or ""),
        }
        events.append(ev)

        if debug:
            print("\n[debug] Entry sys.id:", ev["id"])
            print("[debug] start ISO:", ev["start"])
            print("[debug] month/day/year:", ev["startMonth"], ev["startDay"], ev["startYear"])

    events.sort(key=lambda ev: _iso_to_dt(ev.get("start", "")))

    return {
        "events": events,
        "totalItems": len(events),
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }



if __name__ == "__main__":
    entries = fetch_all()
    data = build_payload(entries, debug=True)

    # You are running from: frontend/src/scripts/events.py
    # Write to frontend/public/events.json
    PROJECT_FRONTEND = Path(__file__).resolve().parents[2]
    out_path = PROJECT_FRONTEND / "public" / "events.json"

    out_path.parent.mkdir(parents=True, exist_ok=True)
    with out_path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\nWrote {out_path} with {data['totalItems']} events")
