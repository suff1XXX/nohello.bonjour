(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const SUPPORTED = ['uk','en','es','de','fr','pl','pt'];

  // Rotating greetings
  const GREETINGS = {
    uk: ["привіт", "добрий ранок", "хай", "доброго дня"],
    en: ["hi", "hello", "hey", "yo", "good morning"],
    es: ["hola", "buenas"],
    de: ["hi", "hallo", "moin"],
    fr: ["salut", "bonjour"],
    pl: ["cześć", "hej", "dzień dobry"],
    pt: ["olá", "oi", "bom dia"]
  };

  // i18n with locale names
  const I18N = {
    uk: {
      nav: { why:"Навіщо", examples:"Приклади", how:"Як писати", messages:"Приклади повідомлень", faq:"Питання" },
      ui: { language:"Мова" },
      theme: { label:"Тема", light:"Світла тема", dark:"Темна тема" },
      hero: { prefix:"Не починайте з", tagline:"Одразу пишіть суть — так швидше для всіх.", sr:"Не починайте з привіт — одразу ставте питання." },
      names: { you:"Богдана", them:"Богдан" },
      why: {
        title:"Чому не варто писати просто «привіт»",
        p1:"«Привіт» без контексту зупиняє діалог: співрозмовник чекає деталей, а ви — відповіді.",
        p2:"Менше уточнень — більше результату.",
        p3:"Можна відповісти асинхронно, коли зручно."
      },
      examples: {
        title:"Приклади",
        badTitle:"Погано",
        bad1:"Привіт",
        bad2:"Привіт! 👋",
        bad3:"Є хвилинка?",
        bad4:"…час минає, контексту немає…",
        goodTitle:"Краще",
        good1:"Привіт! Потрібна допомога: збірка падає на кроці тестів. Пробував(ла) чистити кеш і перезапускати. Лог: посилання.",
        good2:"Ок — перегляну після дзвінка і відпишусь."
      },
      how: {
        title:"Як написати повідомлення",
        s1:"1–2 речення про задачу та мету.",
        s2:"Що вже пробували: кроки/команди, текст помилки, версії, посилання/скріни.",
        s3:"Очікуваний результат і орієнтир у часі."
      },
      messages: {
        title:"Приклади повідомлень",
        e1:"Привіт, як ся маєш? Чи не підкажеш, до якого терміну це треба буде зробити?",
        e2:"Привіт! Сподіваюся, у тебе все добре. Мені потрібно обговорити наступний реліз, коли в тебе буде хвилинка 🙂",
        e3:"Хай, якщо не зайнятий, не міг би ти оновити інструкцію по деплою?",
        e4:"Доброго дня! Чи зможеш сьогодні переглянути лог білду? Падає на кроці тестів, посилання на лог всередині.",
        e5:"Будь ласка, глянь мій PR #123 (валідація форм). Особливо цікавить продуктивність і i18n.",
        e6:"Маєш можливість підказати, хто відповідає за модуль платежів? Потрібна консультація щодо webhooks."
      },
      faq: {
        title:"Питання",
        q1:"Це неввічливо?",
        a1:"Будьте ввічливими і конкретними: «Привіт! Можеш допомогти з …? Контекст: …».",
        q2:"А якщо спершу треба спитати, чи зручно?",
        a2:"Надішліть питання і додайте: «коли буде зручно, глянь, будь ласка».",
        q3:"А якщо тема особиста?",
        a3:"Коротко позначте тему і запропонуйте дзвінок: «Привіт! Є особисте питання про … — зручно сьогодні поговорити?»"
      },
      footer: {
        note:"Зроблено з повагою до часу — вашого і чужого.",
        credit:"Розроблен Suff1XXX. Відкритий код на GitHub.",
        warn:"Якщо ви побачите URL цього сайту в чиємусь статусі/біо, будьте готові, що вас проігнорують, якщо напишете лише «Привіт!»."
      }
    },

    en: {
      nav:{ why:"Why", examples:"Examples", how:"How", messages:"Message examples", faq:"FAQ" },
      ui:{ language:"Language" },
      theme:{ label:"Theme", light:"Light theme", dark:"Dark theme" },
      hero:{ prefix:"Please don't start with", tagline:"Ask your question up front — it's faster for everyone.", sr:"Don't start with hi — ask your question up front." },
      names:{ you:"Alex", them:"Taylor" },
      why:{ title:"Why a bare “hi” isn't helpful", p1:"A “hi” with no details freezes the chat.", p2:"Fewer back‑and‑forths, more results.", p3:"People can answer asynchronously." },
      examples:{ title:"Examples", badTitle:"Not great", bad1:"Hi", bad2:"Hey! 👋", bad3:"Got a minute?", bad4:"…time passes, no context…", goodTitle:"Better", good1:"Hi! Need a hand: the build fails on the test step. Tried clearing cache and rerunning. Log: link.", good2:"Got it — I'll check after my call and get back to you." },
      how:{ title:"How to write", s1:"One–two sentences with the task and goal.", s2:"What you've tried: steps, error, versions, links/screenshots.", s3:"Expected outcome and time frame." },
      messages:{ title:"Message examples", e1:"Hi, hope you're doing well. Could you tell me by when this needs to be done?", e2:"Hi! I need to discuss the next release when you have a moment 🙂", e3:"Hey, if you're not busy, could you update the deployment guide?", e4:"Good morning! Could you check the build log today? It fails on the test step; link inside.", e5:"Please take a look at my PR #123 (form validation). I'm especially interested in performance and i18n.", e6:"Do you know who owns the payments module? I need advice on webhooks." },
      faq:{ title:"FAQ", q1:"Isn't that rude?", a1:"Be polite and specific: “Hi! Could you help with …? Context: …”.", q2:"What if I must check if it's a good time?", a2:"Send the question and add “whenever convenient, please take a look.”", q3:"What if it's private?", a3:"Briefly state the topic and offer a call." },
      footer:{ note:"Made with respect for everyone's time.", credit:"Built by Suff1XXX. Open source on GitHub.", warn:"If you see this site's URL in someone's status/bio, expect to be ignored if you just say “Hi!”." }
    },

    es: {
      nav:{ why:"Por qué", examples:"Ejemplos", how:"Cómo", messages:"Ejemplos de mensaje", faq:"FAQ" },
      ui:{ language:"Idioma" },
      theme:{ label:"Tema", light:"Tema claro", dark:"Tema oscuro" },
      hero:{ prefix:"No empieces con", tagline:"Plantea tu pregunta desde el inicio.", sr:"No empieces con hola: plantea tu pregunta desde el inicio." },
      names:{ you:"Lucía", them:"Carlos" },
      why:{ title:"Por qué un «hola» a secas no ayuda", p1:"Un «hola» sin contexto congela la conversación.", p2:"Menos ida y vuelta, más resultados.", p3:"Se puede responder de forma asíncrona." },
      examples:{ title:"Ejemplos", badTitle:"Mal", bad1:"Hola", bad2:"¡Hola! 👋", bad3:"¿Tienes un minuto?", bad4:"…pasa el tiempo, no hay contexto…", goodTitle:"Mejor", good1:"¡Hola! Necesito una mano: la build falla en los tests. Limpié caché y reintenté. Log: enlace.", good2:"Ok, lo reviso después de la llamada y te aviso." },
      how:{ title:"Cómo escribir", s1:"1–2 frases con la tarea.", s2:"Qué probaste y datos.", s3:"Resultado y plazo." },
      messages:{ title:"Ejemplos de mensaje", e1:"Hola, ¿me podrías decir para cuándo debería estar esto?", e2:"¡Hola! Necesito hablar del próximo release cuando tengas un momento 🙂", e3:"Hey, si no estás ocupado, ¿podrías actualizar la guía de despliegue?", e4:"Buenos días, ¿puedes ver el log del build? Falla en los tests.", e5:"Por favor revisa mi PR #123. Rendimiento e i18n.", e6:"¿Quién es el responsable del módulo de pagos? Necesito orientación sobre webhooks." },
      faq:{ title:"FAQ", q1:"¿Descortés?", a1:"Amable y específico.", q2:"¿Buen momento?", a2:"Envía la pregunta con nota.", q3:"¿Personal?", a3:"Propón una llamada." },
      footer:{ note:"Hecho con respeto por el tiempo de todos.", credit:"Hecho por Suff1XXX. Código abierto en GitHub.", warn:"Si ves esta URL en un bio, quizá te ignoren si solo dices «Hola»." }
    },

    de: {
      nav:{ why:"Warum", examples:"Beispiele", how:"Wie", messages:"Beispielnachrichten", faq:"FAQ" },
      ui:{ language:"Sprache" },
      theme:{ label:"Thema", light:"Helles Thema", dark:"Dunkles Thema" },
      hero:{ prefix:"Bitte fang nicht mit", tagline:"Schreibe dein Anliegen sofort.", sr:"Nicht mit Hi anfangen – Anliegen sofort schreiben." },
      names:{ you:"Lena", them:"Jonas" },
      why:{ title:"Warum ein „Hi“ nicht hilft", p1:"Ohne Kontext stoppt es.", p2:"Weniger Ping‑Pong.", p3:"Asynchron antworten." },
      examples:{ title:"Beispiele", badTitle:"Nicht gut", bad1:"Hi", bad2:"Hey! 👋", bad3:"Hast du kurz Zeit?", bad4:"…kein Kontext…", goodTitle:"Besser", good1:"Hi! Build bricht beim Testschritt ab. Cache geleert, neu gestartet. Log: Link.", good2:"Alles klar — schaue später rein." },
      how:{ title:"Wie schreiben", s1:"1–2 Sätze Aufgabe/Ziel.", s2:"Was probiert, Details.", s3:"Ergebnis und Zeitrahmen." },
      messages:{ title:"Beispielnachrichten", e1:"Hi, kannst du sagen, bis wann das fertig sein soll?", e2:"Hi! Ich müsste den nächsten Release kurz besprechen, wenn du Zeit hast 🙂", e3:"Hey, falls du frei bist, könntest du die Deployment-Anleitung aktualisieren?", e4:"Guten Morgen! Magst du heute den Build‑Log prüfen? Fehler im Testschritt.", e5:"Bitte Review PR #123. Performance und i18n.", e6:"Wer verantwortet das Zahlungsmodul? Rat zu Webhooks." },
      faq:{ title:"FAQ", q1:"Unhöflich?", a1:"Höflich + konkret.", q2:"Guter Zeitpunkt?", a2:"Frage + Hinweis.", q3:"Privat?", a3:"Call vorschlagen." },
      footer:{ note:"Mit Respekt für eure Zeit.", credit:"Erstellt von Suff1XXX. Open Source auf GitHub.", warn:"Mit dieser URL im Bio wirst du ignoriert, wenn du nur „Hi“ schreibst." }
    },

    fr: {
      nav:{ why:"Pourquoi", examples:"Exemples", how:"Comment", messages:"Exemples de messages", faq:"FAQ" },
      ui:{ language:"Langue" },
      theme:{ label:"Thème", light:"Thème clair", dark:"Thème sombre" },
      hero:{ prefix:"Ne commencez pas par", tagline:"Dites ce dont vous avez besoin dès le départ.", sr:"Ne commencez pas par salut — posez votre question." },
      names:{ you:"Camille", them:"Louis" },
      why:{ title:"Pourquoi « salut » seul n’aide pas", p1:"Sans contexte, ça fige.", p2:"Moins d’allers‑retours.", p3:"Réponses asynchrones." },
      examples:{ title:"Exemples", badTitle:"Pas top", bad1:"Salut", bad2:"Salut ! 👋", bad3:"Une minute ?", bad4:"…pas de contexte…", goodTitle:"Mieux", good1:"Salut ! La build échoue aux tests. Cache vidé, relancé. Log : lien.", good2:"Ok — je regarde après mon appel." },
      how:{ title:"Comment écrire", s1:"1–2 phrases but/objectif.", s2:"Tentatives et détails.", s3:"Résultat et délai." },
      messages:{ title:"Exemples de messages", e1:"Salut, saurais‑tu pour quand il faut faire ça ?", e2:"Salut ! On peut parler du prochain release quand tu as une minute 🙂", e3:"Hey, si tu n’es pas pris, pourrais‑tu mettre à jour le guide de déploiement ?", e4:"Bonjour ! Peux‑tu vérifier le log du build ? Ça échoue aux tests.", e5:"Peux‑tu relire le PR #123 ? Perf et i18n.", e6:"Qui gère le module paiements ? Besoin d’un avis sur les webhooks." },
      faq:{ title:"FAQ", q1:"Impoli ?", a1:"Poli + précis.", q2:"Bon moment ?", a2:"Question + note.", q3:"Privé ?", a3:"Proposer un appel." },
      footer:{ note:"Fait avec respect pour le temps de chacun.", credit:"Développé par Suff1XXX. Open source sur GitHub.", warn:"Avec cette URL dans une bio, tu risques d’être ignoré si tu dis juste « Salut »." }
    },

    pl: {
      nav:{ why:"Dlaczego", examples:"Przykłady", how:"Jak pisać", messages:"Przykładowe wiadomości", faq:"FAQ" },
      ui:{ language:"Język" },
      theme:{ label:"Motyw", light:"Jasny", dark:"Ciemny" },
      hero:{ prefix:"Nie zaczynaj od", tagline:"Napisz od razu, o co chodzi.", sr:"Nie zaczynaj od cześć — zadaj pytanie." },
      names:{ you:"Ania", them:"Piotr" },
      why:{ title:"Dlaczego „cześć” nie pomaga", p1:"Bez kontekstu stopuje rozmowę.", p2:"Mniej doprecyzowań.", p3:"Asynchronicznie, kiedy wygodnie." },
      examples:{ title:"Przykłady", badTitle:"Słabo", bad1:"Cześć", bad2:"Hej! 👋", bad3:"Masz chwilę?", bad4:"…brak kontekstu…", goodTitle:"Lepiej", good1:"Cześć! Build sypie się na testach. Cache czyszczony, restart. Log: link.", good2:"OK — sprawdzę później." },
      how:{ title:"Jak pisać", s1:"1–2 zdania o celu.", s2:"Co próbowałeś i dane.", s3:"Wynik i termin." },
      messages:{ title:"Przykładowe wiadomości", e1:"Cześć, dasz znać, do kiedy to ma być zrobione?", e2:"Cześć! Chciałbym omówić następne wydanie, kiedy będziesz miał chwilę 🙂", e3:"Hej, jeśli nie jesteś zajęty, zaktualizujesz instrukcję wdrożenia?", e4:"Dzień dobry! Zerkniesz dziś w log builda? Sypie się na testach.", e5:"Proszę o review PR #123. Performance i i18n.", e6:"Kto odpowiada za moduł płatności? Konsultacja nt. webhooks." },
      faq:{ title:"FAQ", q1:"Niegrzeczne?", a1:"Uprzejmie i konkretnie.", q2:"Dobry czas?", a2:"Pytanie + notka.", q3:"Prywatne?", a3:"Zaproponuj rozmowę." },
      footer:{ note:"Z szacunkiem dla czasu wszystkich.", credit:"Stworzone przez Suff1XXX. Open source na GitHubie.", warn:"Z tą URL w bio możesz zostać zignorowany, jeśli napiszesz tylko „Cześć”." }
    },

    pt: {
      nav:{ why:"Por quê", examples:"Exemplos", how:"Como", messages:"Exemplos de mensagem", faq:"FAQ" },
      ui:{ language:"Idioma" },
      theme:{ label:"Tema", light:"Claro", dark:"Escuro" },
      hero:{ prefix:"Não comece com", tagline:"Diga logo o que precisa.", sr:"Não comece com olá — diga logo sua pergunta." },
      names:{ you:"Ana", them:"João" },
      why:{ title:"Por que “olá” não ajuda", p1:"Sem contexto, congela.", p2:"Menos vai‑e‑vem.", p3:"Resposta assíncrona." },
      examples:{ title:"Exemplos", badTitle:"Ruim", bad1:"Olá", bad2:"Oi! 👋", bad3:"Tem um minuto?", bad4:"…sem contexto…", goodTitle:"Melhor", good1:"Olá! O build falha nos testes. Limpei cache e tentei de novo. Log: link.", good2:"Beleza — vejo depois." },
      how:{ title:"Como escrever", s1:"1–2 frases sobre a tarefa.", s2:"O que tentou + dados.", s3:"Resultado e prazo." },
      messages:{ title:"Exemplos de mensagem", e1:"Olá, consegue dizer para quando isso precisa ficar pronto?", e2:"Oi! Preciso falar do próximo release quando tiver um tempinho 🙂", e3:"E aí, se não estiver ocupado, atualiza o guia de deploy?", e4:"Bom dia! Pode ver o log do build hoje? Falha nos testes.", e5:"Revisar PR #123. Performance e i18n.", e6:"Quem cuida do módulo de pagamentos? Orientação sobre webhooks." },
      faq:{ title:"FAQ", q1:"Grosseria?", a1:"Educado e específico.", q2:"Bom momento?", a2:"Pergunta + nota.", q3:"Pessoal?", a3:"Proponha uma chamada." },
      footer:{ note:"Feito com respeito ao tempo de todos.", credit:"Desenvolvido por Suff1XXX. Código aberto no GitHub.", warn:"Com essa URL no bio, talvez ignorem se disser apenas “Olá”." }
    }
  };

  // i18n helpers
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

    // Update labels, theme button labels, rotating set
    updateThemeButtonLabels(dict);
    setGreetingSet(lang);

    // sync select and URL
    const sel = $('#lang-select');
    if (sel && sel.value !== lang) sel.value = lang;
    setUrlLang(lang);

    // fit headline after translation
    fitHero();
  }

  // URL lang
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

  // Typewriter
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
      fitHero(); // ensure fits when the word is complete
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

  // Single-line auto-fit for hero
  function fitHero(){
    const title = document.querySelector('.hero-title');
    if (!title) return;
    const prefix = title.firstElementChild; // prefix span
    const wrap = title.querySelector('.typewrap');
    if (!prefix || !wrap) return;

    // reset sizes
    wrap.style.fontSize = '';
    title.style.fontSize = '';

    const caretGap = 10; // small extra spacing
    const max = title.clientWidth;
    const measure = () => prefix.offsetWidth + wrap.offsetWidth + caretGap;

    let total = measure();
    if (total <= max) return;

    // Step 1: shrink typed part down to 55%
    let scale = 1.0;
    while (scale > 0.55 && total > max){
      scale -= 0.05;
      wrap.style.fontSize = scale + 'em';
      total = measure();
    }
    if (total <= max) return;

    // Step 2: shrink overall hero font-size (not below 22px)
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

  // Theme
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

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    // Theme first
    applyTheme(getPreferredTheme());

    // Language: URL > saved > navigator > uk
    const urlLang = getUrlLang();
    const saved = localStorage.getItem('lang');
    const navLang = (navigator.language || '').slice(0,2).toLowerCase();
    const initial = urlLang || (SUPPORTED.includes(saved||'') ? saved : (SUPPORTED.includes(navLang) ? navLang : 'uk'));
    const sel = $('#lang-select');
    if (sel) sel.value = initial;
    applyTranslations(initial);

    // Events
    sel && sel.addEventListener('change', (e) => applyTranslations(e.target.value));
    $("#theme-light").addEventListener('click', () => applyTheme('light'));
    $("#theme-dark").addEventListener('click', () => applyTheme('dark'));
  });
})();