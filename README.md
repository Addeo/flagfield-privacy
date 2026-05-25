# Flagfield — Privacy Policy (multilingual)

Static HTML page based on `~/countries/docs/legal/privacy-policy.md`.

## Languages

en, ru, es, de, fr, uk, zh, hi, ar, pt, ja, ko, it, tr — switch in the header.

## URL routing

| Format | Example |
|--------|---------|
| Path | `https://YOUR_DOMAIN/ru` |
| Privacy path | `https://YOUR_DOMAIN/privacy/ru` |
| Query (legacy) | `https://YOUR_DOMAIN/?lang=ru` |
| Hash (`file://`) | `index.html#ru` |

Browser back/forward and the language dropdown stay in sync.

**Support:** supp0rt.serg@yandex.com

## Build (after editing `langs/*.html`)

```bash
npm run build
```

This regenerates `content.js` (embedded translations, works with `file://` and static hosts).

## Local preview

Open `index.html` directly in the browser, or:

```bash
python3 -m http.server 8765
```

Open http://localhost:8765/?lang=ru

## Deploy (GitHub Pages)

Push to `main` — GitHub Actions deploys automatically.

**One-time setup:** Repo → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.

**Live site:** https://addeo.github.io/flagfield-privacy/

Use as `privacyPolicyUrl`:

- `https://addeo.github.io/flagfield-privacy/`
- `https://addeo.github.io/flagfield-privacy/ru`

Manual deploy: `npm run predeploy`, then push `dist/` to `gh-pages`.

## Source of truth

Edit legal text in the countries repo: `docs/legal/privacy-policy.md`, then update matching `langs/*.html` here and run `npm run build`.
