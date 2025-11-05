(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const SUPPORTED = ['uk','en','es','de','fr','pl','pt'];

  const GREETINGS = {
    uk: ["привіт", "добрий ранок", "хай", "доброго дня"],
    en: ["hi", "hello", "hey", "yo", "good morning"],
    es: ["hola", "buenas"],
    de: ["hi", "hallo", "moin"],
    fr: ["salut", "bonjour"],
    pl: ["cześć", "hej", "dzień dobry"],
    pt: ["olá", "oi", "bom dia"]
  };

  const I18N = { ...I18N = undefined }; // скорочено для прикладу, залиште ваш повний I18N об’єкт

  const getDict = (lang) => I18N[lang] || I18N.en;
  const t = (dict, path) => path.split('.').reduce((o,k)=> (o? o[k] : undefined), dict);

  function updateThemeButtonLabels(dict) {
    const lb = $('#theme-light'), db = $('#theme-dark'), group = $('#theme-switch');
    const lightTitle = t(dict,'theme.light'), darkTitle = t(dict,'theme.dark'), groupLabel = t(dict,'theme.label');
    if (lb) { lb.title = lightTitle; lb.setAttribute('aria-label', lightTitle); }
    if (db) { db.title = darkTitle; db.setAttribute('aria-label', darkTitle); }
    if (group && groupLabel) group.setAttribute('aria-label', groupLabel);
  }

  function applyTranslations(lang) {
    const dict = getDict(lang);
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

    $$('[data-i18n]').forEach(el => {
      if (el.hasAttribute('data-i18n-attr')) return;
      const key = el.getAttribute('data-i18n');
      const val = t(dict, key);
      if (typeof val === 'string') el.textContent = val;
    });
    $$('[data-i18n-attr]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const attr = el.getAttribute('data-i18n-attr');
      const val = t(dict, key);
      if (typeof val === 'string') el.setAttribute(attr, val);
    });

    updateThemeButtonLabels(dict);
    setGreetingSet(lang);

    const sel = $('#lang-select');
    if (sel && sel.value !== lang) sel.value = lang;
    setUrlLang(lang);
    fitHero();
  }

  function getUrlLang() {
    try {
      const ln = new URLSearchParams(location.search).get('lang');
      return ln && SUPPORTED.includes(ln.toLowerCase()) ? ln.toLowerCase() : null;
    } catch { return null; }
  }
  function setUrlLang(lang) {
    try {
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState({}, '', url);
    } catch {}
  }

  let twState = { stop:false, timer:0, index:0, char:0, words:GREETINGS.en };
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const node = $('#rotating');

  function setGreetingSet(lang) {
    twState.words = GREETINGS[lang] || GREETINGS.en;
    twState.index = 0; twState.char = 0;
    if (prefersReduced) { node.textContent = twState.words[0]; return; }
    stopTypewriter(); startTypewriter();
  }
  function startTypewriter(){ twState.stop=false; typeLoop(); }
  function stopTypewriter(){ twState.stop=true; if (twState.timer){ clearTimeout(twState.timer); twState.timer=0; } }
  function typeLoop(){
    if (twState.stop) return;
    const word = twState.words[twState.index];
    if (twState.char < word.length){
      node.textContent = word.slice(0, twState.char + 1);
      twState.char++; twState.timer = setTimeout(typeLoop, 90);
    } else {
      fitHero();
      twState.timer = setTimeout(() => backspace(word), 900);
    }
  }
  function backspace(word){
    if (twState.stop) return;
    if (twState.char > 0){
      twState.char--; node.textContent = word.slice(0, twState.char);
      twState.timer = setTimeout(() => backspace(word), 50);
    } else {
      twState.index = (twState.index + 1) % twState.words.length;
      twState.timer = setTimeout(typeLoop, 250);
    }
  }
  document.addEventListener('visibilitychange', () => {
    if (prefersReduced) return;
    if (document.hidden) stopTypewriter(); else startTypewriter();
  });

  function fitHero(){
    const title = document.querySelector('.hero-title');
    if (!title) return;
    const prefix = title.firstElementChild;
    const wrap = title.querySelector('.typewrap');
    if (!prefix || !wrap) return;

    wrap.style.fontSize = '';
    title.style.fontSize = '';

    const caretGap = 10;
    const max = title.clientWidth;
    const measure = () => prefix.offsetWidth + wrap.offsetWidth + caretGap;

    let total = measure();
    if (total <= max) return;

    let scale = 1.0;
    while (scale > 0.55 && total > max){
      scale -= 0.05;
      wrap.style.fontSize = scale + 'em';
      total = measure();
    }
    if (total <= max) return;

    const current = parseFloat(getComputedStyle(title).fontSize) || 32;
    let size = current;
    let guard = 0;
    while (size > 22 && total > max && guard < 24){
      size -= 1;
      title.style.fontSize = size + 'px';
      total = measure();
      guard++;
    }
  }
  window.addEventListener('resize', fitHero);

  const THEME_KEY='theme';
  function getPreferredTheme(){
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeToggle(theme);
  }
  function updateThemeToggle(theme){
    const lb = $('#theme-light'), db = $('#theme-dark');
    if (!lb || !db) return;
    lb.setAttribute('aria-pressed', String(theme==='light'));
    db.setAttribute('aria-pressed', String(theme==='dark'));
    lb.classList.toggle('active', theme==='light');
    db.classList.toggle('active', theme==='dark');
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getPreferredTheme());
    const urlLang = getUrlLang();
    const saved = localStorage.getItem('lang');
    const navLang = (navigator.language || '').slice(0,2).toLowerCase();
    const initial = urlLang || (SUPPORTED.includes(saved||'') ? saved : (SUPPORTED.includes(navLang) ? navLang : 'uk'));
    const sel = $('#lang-select');
    if (sel) sel.value = initial;
    applyTranslations(initial);

    sel && sel.addEventListener('change', (e) => applyTranslations(e.target.value));
    $("#theme-light").addEventListener('click', () => applyTheme('light'));
    $("#theme-dark").addEventListener('click', () => applyTheme('dark'));
  });

})();
