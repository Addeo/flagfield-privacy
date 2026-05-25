const SUPPORT_EMAIL = 'supp0rt.serg@yandex.com';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'uk', label: 'Українська' },
  { code: 'zh', label: '中文' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ar', label: 'العربية' },
  { code: 'pt', label: 'Português' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'it', label: 'Italiano' },
  { code: 'tr', label: 'Türkçe' },
];

const LANG_CODES = new Set(LANGS.map((l) => l.code));

const TITLES = {
  en: 'Privacy Policy — Flagfield',
  ru: 'Политика конфиденциальности — Flagfield',
  es: 'Política de privacidad — Flagfield',
  de: 'Datenschutzerklärung — Flagfield',
  fr: 'Politique de confidentialité — Flagfield',
  uk: 'Політика конфіденційності — Flagfield',
  zh: '隐私政策 — Flagfield',
  hi: 'गोपनीयता नीति — Flagfield',
  ar: 'سياسة الخصوصية — Flagfield',
  pt: 'Política de Privacidade — Flagfield',
  ja: 'プライバシーポリシー — Flagfield',
  ko: '개인정보 처리방침 — Flagfield',
  it: 'Informativa sulla privacy — Flagfield',
  tr: 'Gizlilik Politikası — Flagfield',
};

const LANG_LABEL = {
  en: 'Language',
  ru: 'Язык',
  es: 'Idioma',
  de: 'Sprache',
  fr: 'Langue',
  uk: 'Мова',
  zh: '语言',
  hi: 'भाषा',
  ar: 'اللغة',
  pt: 'Idioma',
  ja: '言語',
  ko: '언어',
  it: 'Lingua',
  tr: 'Dil',
};

const CONTENT = window.PRIVACY_CONTENT || {};

const select = document.getElementById('lang-select');
const main = document.getElementById('privacy-content');
const footerContact = document.getElementById('footer-contact');

if (footerContact) {
  footerContact.href = `mailto:${SUPPORT_EMAIL}`;
  footerContact.textContent = SUPPORT_EMAIL;
}

for (const { code, label } of LANGS) {
  const opt = document.createElement('option');
  opt.value = code;
  opt.textContent = label;
  select.appendChild(opt);
}

function resolveLang(requested) {
  const code = (requested || '').toLowerCase().split('-')[0];
  if (LANG_CODES.has(code)) return code;
  const nav = (navigator.language || 'en').toLowerCase().split('-')[0];
  if (LANG_CODES.has(nav)) return nav;
  return 'en';
}

function langFromPathname(pathname) {
  const parts = pathname.replace(/\/$/, '').split('/').filter(Boolean);
  if (!parts.length) return null;

  const last = parts[parts.length - 1].toLowerCase();
  if (last === 'index.html' || last === 'privacy.html') {
    return null;
  }
  if (LANG_CODES.has(last)) return last;

  return null;
}

function langFromHash() {
  const raw = location.hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (!raw) return null;
  if (LANG_CODES.has(raw)) return raw;
  if (raw.startsWith('lang=')) {
    return resolveLang(raw.slice(5));
  }
  return null;
}

function readLangFromUrl() {
  try {
    const fromQuery = new URLSearchParams(location.search).get('lang');
    if (fromQuery) return resolveLang(fromQuery);
  } catch {
    /* ignore */
  }

  const fromHash = langFromHash();
  if (fromHash) return fromHash;

  try {
    const fromPath = langFromPathname(location.pathname);
    if (fromPath) return fromPath;
  } catch {
    /* ignore */
  }

  return resolveLang(null);
}

function getBasePath(pathname) {
  const parts = pathname.replace(/\/$/, '').split('/').filter(Boolean);
  if (!parts.length) return '/';

  const last = parts[parts.length - 1].toLowerCase();
  if (last === 'index.html' || last === 'privacy.html') {
    parts.pop();
  } else if (LANG_CODES.has(last)) {
    parts.pop();
  }

  return parts.length ? `/${parts.join('/')}` : '/';
}

function buildUrl(lang) {
  const url = new URL(location.href);

  if (url.protocol === 'file:') {
    url.hash = lang;
    url.search = '';
    return url;
  }

  const base = getBasePath(url.pathname);
  const prefix = base === '/' ? '' : base;
  url.pathname = `${prefix}/${lang}`.replace(/\/{2,}/g, '/');
  url.search = '';
  url.hash = '';
  return url;
}

function setDir(lang) {
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}

function getHtml(lang) {
  if (CONTENT[lang]) return CONTENT[lang];
  if (lang !== 'en' && CONTENT.en) {
    const note =
      lang === 'ru'
        ? 'Этот язык пока недоступен. Показана английская версия.'
        : 'This language is not available yet. Showing English.';
    return `<p class="lang-fallback" role="status">${note}</p>${CONTENT.en}`;
  }
  return '<p>Could not load policy. Run <code>npm run build</code>.</p>';
}

function loadLang(lang, { replaceHistory = true, pushHistory = false } = {}) {
  const resolved = CONTENT[lang] ? lang : 'en';
  setDir(resolved);
  document.title = TITLES[lang] || TITLES.en;
  select.value = lang;
  const labelEl = document.querySelector('.lang-switch label');
  if (labelEl) labelEl.textContent = LANG_LABEL[resolved] || LANG_LABEL.en;
  main.innerHTML = getHtml(lang);

  if (!replaceHistory && !pushHistory) return;

  try {
    const next = buildUrl(lang);
    if (pushHistory) {
      history.pushState({ lang }, '', next);
    } else {
      history.replaceState({ lang }, '', next);
    }
  } catch {
    /* file:// or restricted context */
  }
}

select.addEventListener('change', () => {
  loadLang(select.value, { replaceHistory: false, pushHistory: true });
});

window.addEventListener('popstate', () => {
  loadLang(readLangFromUrl(), { replaceHistory: false, pushHistory: false });
});

window.addEventListener('hashchange', () => {
  loadLang(readLangFromUrl(), { replaceHistory: false, pushHistory: false });
});

loadLang(readLangFromUrl(), { replaceHistory: true, pushHistory: false });
