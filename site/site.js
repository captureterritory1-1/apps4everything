// shared site js — reveals, time, counters

// Reveal-on-scroll
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
})();

// Live UTC clock in nav
(function () {
  function tick() {
    const el = document.querySelector('[data-utc-clock]');
    if (!el) return;
    const d = new Date();
    const hh = String(d.getUTCHours()).padStart(2, '0');
    const mm = String(d.getUTCMinutes()).padStart(2, '0');
    const ss = String(d.getUTCSeconds()).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss} UTC`;
  }
  tick();
  setInterval(tick, 1000);
})();

// Count-up numbers
function countUp(el, target, duration = 1400) {
  const start = performance.now();
  const from = 0;
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (target - from) * eased);
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
window.countUp = countUp;

// Theme toggle persistence
(function () {
  const saved = localStorage.getItem('afe-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  window.setTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('afe-theme', t);
  };
  window.getTheme = () => document.documentElement.getAttribute('data-theme') || 'light';
})();

// Tiny app data — shared across pages
window.APPS = [
  {
    num: '01', name: 'capture.territory', tag: 'fitness · gamified',
    logo: 'assets/logos/capture-logo.png',
    status: 'live',
    body: 'A gamified running app. Run to capture territories, unlock brand deals, freebies & discounts — and steal someone else’s turf if you’re fast enough.',
    short: 'Run. Claim turf. Earn rewards.',
    accent: ['run', 'claim', 'earn'],
    stack: ['React Native', 'Mapbox', 'Postgres'],
    url: 'https://captureterritory.com',
    appstore: 'https://apps.apple.com/in/app/capture-territory/id6760887152',
    preview: 'assets/previews/capture-preview.jpeg',
  },
  {
    num: '02', name: 'the.pantry', tag: 'kitchen · ai',
    logo: 'assets/logos/pantry-logo.png',
    status: 'live',
    body: 'Track what’s in your kitchen without thinking. Know what you have, what’s expiring, and what to buy next — auto-synced.',
    short: 'Your kitchen, but it remembers.',
    accent: ['stock', 'expiry', 'restock'],
    stack: ['Swift', 'Vision OCR', 'CloudKit'],
    url: '#',
    appstore: 'https://apps.apple.com/in/app/the-pantry/id6761057466',
    preview: 'assets/previews/pantry-preview.jpg',  },
  {
    num: '03', name: 'cashflow', tag: 'finance · split-pay',
    logo: 'assets/logos/cashflow-logo.png',
    status: 'live',
    body: 'Track expenses & income — and split money for group plans without the usual mess of receipts and chase-up reminders.',
    short: 'Money in. Money out. Money split.',
    accent: ['track', 'split', 'settle'],
    stack: ['Flutter', 'Plaid', 'Firebase'],
    url: '#',
    appstore: 'https://apps.apple.com/in/app/cashflow-1-0/id6761311662',
    preview: 'assets/previews/cashflow-preview.jpg',  },
  {
    num: '04', name: 'yeni', tag: 'learning · daily',
    logo: 'assets/logos/yeni-logo.png',
    status: 'live',
    body: 'One new thing every day. Quick, easy, no overwhelm — a small habit engineered to compound into something real.',
    short: 'One new thing. Every day.',
    accent: ['daily', 'tiny', 'compound'],
    stack: ['Next.js', 'OpenAI', 'Supabase'],
    url: '#',
    appstore: 'https://apps.apple.com/in/app/yeni-something-new-everyday/id6761651271',
    preview: 'assets/previews/yeni-preview.jpg',  },
  {
    num: '05', name: 'jain.dham', tag: 'spiritual · ai',
    logo: 'assets/logos/jaindham-logo.png',
    status: 'live',
    body: 'Jain temples worldwide, live darshan, daily prayers and events — plus instant guidance from an AI Jain assistant.',
    short: 'Temples, prayers, an AI guide.',
    accent: ['darshan', 'pray', 'discover'],
    stack: ['React Native', 'GPT-4', 'Mapbox'],
    url: '#',
    appstore: 'https://apps.apple.com/in/app/jaindham/id6762510686',
    preview: 'assets/previews/jaindham-preview.jpg',  },
];

// Builder log entries (shared)
window.LOG_ENTRIES = [
  { day: 'D10', date: '2026-04-25', title: 'jain.dham — shipped', body: 'AI assistant trained on tattvartha sutra. Live darshan stream working across iOS & Android. Onboarding cut from 7 screens to 3.', tags: ['ship', 'ai'] },
  { day: 'D08', date: '2026-04-23', title: 'yeni — a tiny habit engine', body: 'Decided against streaks. Streaks punish, compounding rewards. Now you just see a stack of "things you know now" growing.', tags: ['design', 'ship'] },
  { day: 'D06', date: '2026-04-21', title: 'cashflow — split-pay shipped', body: 'Plaid integration was the hard part. Splits settle in under 2s. Tested with a 14-person Goa trip. Survived.', tags: ['ship', 'fintech'] },
  { day: 'D04', date: '2026-04-19', title: 'the.pantry — receipt OCR works', body: 'Vision framework reads grocery receipts in <800ms. Auto-categorises 89% of items correctly. The 11% is mostly mangoes.', tags: ['build', 'ai'] },
  { day: 'D02', date: '2026-04-17', title: 'capture.territory — first run claimed', body: 'Closed-loop GPS detection for "captured" territory shapes. Field-tested in Cubbon Park. Lost the first race to a guy on a scooter.', tags: ['build', 'maps'] },
  { day: 'D01', date: '2026-04-16', title: 'apps for everything — kicking off', body: 'The premise: 5 apps, 10 days, all real, all shipped. No prototypes, no “ccoming soon.” If it’s on the site, it’s in your pocket.', tags: ['note', 'kickoff'] },
];
