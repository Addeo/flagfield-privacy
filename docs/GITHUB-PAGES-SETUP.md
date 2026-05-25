# GitHub Pages — one-time setup

The site is deployed automatically to the `gh-pages` branch on every push to `main`.

## Enable the site (required once)

1. Open https://github.com/Addeo/flagfield-privacy/settings/pages
2. **Build and deployment** → **Source**: **Deploy from a branch**
3. **Branch**: `gh-pages` → folder **`/ (root)`** → **Save**
4. Wait 1–2 minutes

## Live URLs

| Page | URL |
|------|-----|
| English (default) | https://addeo.github.io/flagfield-privacy/ |
| Russian | https://addeo.github.io/flagfield-privacy/ru |
| Privacy alias | https://addeo.github.io/flagfield-privacy/privacy.html |

Use in the app: `privacyPolicyUrl: 'https://addeo.github.io/flagfield-privacy/'`

## Optional: GitHub Actions source

Instead of branch deploy, you can use **Source: GitHub Actions** and the `deploy-pages` workflow variant — only one source can be active.
