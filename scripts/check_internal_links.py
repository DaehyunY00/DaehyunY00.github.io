#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from pathlib import Path

CONTENT_ROOT = Path("content")
STATIC_ROOT = Path("static")
LINK_PATTERN = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
IGNORE_PREFIXES = ("http://", "https://", "mailto:", "tel:", "javascript:")


def strip_link_target(raw_target: str) -> str:
    target = raw_target.strip().split()[0].strip("<>")
    target = target.split("#", 1)[0].split("?", 1)[0]
    return target


def candidate_paths(md_file: Path, target: str) -> list[Path]:
    if not target:
        return []

    if target.startswith("/"):
        normalized = target.lstrip("/")
        base_targets = [Path(normalized), CONTENT_ROOT / normalized, STATIC_ROOT / normalized]
    else:
        base_targets = [md_file.parent / target]

    results: list[Path] = []
    for base in base_targets:
        if base.suffix:
            results.append(base)
            if base.suffix == ".html":
                results.append(base.with_suffix(".md"))
        else:
            results.append(base)
            results.append(base.with_suffix(".md"))
            results.append(base / "index.md")
            results.append(base / "_index.md")

    return results


def main() -> int:
    md_files = sorted(CONTENT_ROOT.rglob("*.md"))
    errors: list[str] = []

    for md_file in md_files:
        text = md_file.read_text(encoding="utf-8")
        for raw in LINK_PATTERN.findall(text):
            cleaned = strip_link_target(raw)
            if not cleaned:
                continue
            if cleaned.startswith("#") or cleaned.startswith(IGNORE_PREFIXES):
                continue

            candidates = candidate_paths(md_file, cleaned)
            if not candidates:
                continue

            if not any(candidate.exists() for candidate in candidates):
                errors.append(f"[broken-link] {md_file}: {raw}")

    if errors:
        print("\n".join(errors))
        return 1

    print(f"internal link check passed ({len(md_files)} files scanned)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
