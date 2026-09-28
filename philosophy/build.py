#!/usr/bin/env python3
"""
Bundles the philosophy reader into one self-contained HTML file.

    python3 build.py              # writes site/index.html (open it in any browser)
    python3 build.py --fragment   # also writes site/artifact.html, the same page
                                  # without <html>/<head>/<body>, for hosts that
                                  # supply their own document skeleton

No dependencies. Content lives in data/*.js, loaded in filename order.
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC, DATA, OUT = ROOT / "src", ROOT / "data", ROOT / "site"


def main() -> None:
    template = (SRC / "template.html").read_text()
    data = "\n".join(p.read_text() for p in sorted(DATA.glob("*.js")))
    fragment = (
        template.replace("{{STYLES}}", (SRC / "styles.css").read_text())
        .replace("{{DATA}}", data)
        .replace("{{MOTIFS}}", (SRC / "motifs.js").read_text())
        .replace("{{APP}}", (SRC / "app.js").read_text())
    )
    head, body = fragment.split("<!--BODY-->")
    OUT.mkdir(exist_ok=True)
    full = (
        '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        f"{head}</head>\n<body>{body}</body>\n</html>\n"
    )
    (OUT / "index.html").write_text(full)
    print(f"site/index.html  {len(full) // 1024} KB")
    if "--fragment" in sys.argv:
        (OUT / "artifact.html").write_text(head + body)
        print("site/artifact.html written")


if __name__ == "__main__":
    main()
