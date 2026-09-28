# Instead of Scrolling

A reading room of 54 philosophers, psychologists and novelists, built to open instead of a feed.

Open `site/index.html` in any browser. It is a single self-contained file: no install, no server, works offline (fonts load from Google Fonts when online and fall back to system serifs otherwise).

Each thinker has the same sections:

- **Life**: who they were, told as a story
- **Big ideas**: their main teachings, explained from the ground up
- **The books**: what they wrote, and which parts matter
- **In their words**: quotes, each with its source
- **Never said it**: famous quotes that are fake or garbled, and where they really came from
- **The case against**: the strongest criticism, including the ugly parts of their lives
- **Where to start**: one real book to read next, usually with a recommended translation

The site also has search, theme filters, an "Open someone at random" button, eight reading paths that follow an argument across centuries, a lifespan timeline, a "mark as finished" tracker (stored in your browser only), adjustable text size, and light and dark themes.

## Editing

Content lives in `data/*.js`, one file per era, loaded in filename order. Each thinker is one object; the fields are visible in any existing entry. Prose fields support a small Markdown subset: blank lines for paragraphs, `*italic*`, `**bold**`, `- ` lists and `> ` quotes.

```bash
python3 build.py              # rebuild site/index.html
python3 build.py --fragment   # also write site/artifact.html (no <html>/<head>/<body> wrapper)
```

## Accuracy

About 78,000 words compressing contested bodies of thought. Quotes were checked against their sources as far as possible; translations vary, so wording may differ from the edition you own. Where an attribution was uncertain it was left out or flagged. Treat it as a well-informed introduction, and go to the books.
