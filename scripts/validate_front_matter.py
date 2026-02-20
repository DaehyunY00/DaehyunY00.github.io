#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from pathlib import Path

CONTENT_ROOT = Path("content")

COMMON_FIELDS = [
    "title",
    "date",
    "tags",
    "categories",
    "summary",
    "draft",
    "toc",
    "description",
]

PAPER_FIELDS = [
    "paper_title",
    "authors",
    "venue",
    "year",
    "arxiv",
    "code",
    "related_work",
]

def extract_front_matter(md_text: str) -> str | None:
    lines = md_text.splitlines()
    if not lines or lines[0].strip() != "+++":
        return None

    buffer: list[str] = []
    for line in lines[1:]:
        if line.strip() == "+++":
            return "\n".join(buffer)
        buffer.append(line)
    return None


def has_key(front_matter: str, key: str) -> bool:
    return bool(re.search(rf"^\s*{re.escape(key)}\s*=", front_matter, re.MULTILINE))


def parse_list_field(front_matter: str, key: str) -> list[str]:
    match = re.search(
        rf"^\s*{re.escape(key)}\s*=\s*\[(.*?)\]",
        front_matter,
        re.MULTILINE | re.DOTALL,
    )
    if not match:
        return []

    items = []
    for raw in match.group(1).split(","):
        value = raw.strip().strip('"').strip("'")
        if value:
            items.append(value)
    return items


def required_fields_for(front_matter: str) -> list[str]:
    required = list(COMMON_FIELDS)
    tags = {tag.lower() for tag in parse_list_field(front_matter, "tags")}
    if "paper-review" in tags or "paper" in tags:
        required.extend(PAPER_FIELDS)
    return required


def main() -> int:
    files = sorted(
        p for p in CONTENT_ROOT.rglob("*.md") if p.name != "_index.md" and p.name != "_index.en.md"
    )
    errors: list[str] = []

    for path in files:
        raw = path.read_text(encoding="utf-8")
        front_matter = extract_front_matter(raw)

        if front_matter is None:
            errors.append(f"[front-matter] {path}: TOML front matter(+++ ... +++) is missing.")
            continue

        required = required_fields_for(front_matter)
        missing = [field for field in required if not has_key(front_matter, field)]
        if missing:
            errors.append(
                f"[front-matter] {path}: missing required fields -> {', '.join(missing)}"
            )

    if errors:
        print("\n".join(errors))
        return 1

    print(f"front matter validation passed ({len(files)} files checked)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
