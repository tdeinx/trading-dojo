/**
 * DOJO ENGINE v1.0
 * Shared gamification layer for The Trading Dojo
 * Include this script in every module page
 * Handles: XP animations, rank system, streak counter,
 *          module complete moments, nav injection, back-to-hub button
 */

// ═══════════════════════════════════════════════
// RANK SYSTEM
// ═══════════════════════════════════════════════
const RANKS = [
  { name: 'Rookie',      minXP: 0,    emoji: '🥋', color: '#8A8070' },
  { name: 'Apprentice',  minXP: 500,  emoji: '⚔️',  color: '#4CC9A8' },
  { name: 'Warrior',     minXP: 1500, emoji: '🥷',  color: '#C9A84C' },
  { name: 'Strategist',  minXP: 3000, emoji: '🦉',  color: '#8B6FD4' },
  { name: 'Elite',       minXP: 5000, emoji: '🐉',  color: '#4C8BC9' },
  { name: 'Sensei',      minXP: 8000, emoji: '🏆',  color: '#F0CC7A' },
];

function getRank(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXP) rank = r;
    else break;
  }
  return rank;
}

function getNextRank(xp) {
  for (let i = 0; i < RANKS.length; i++) {
    if (xp < RANKS[i].minXP) return RANKS[i];
  }
  return null; // already Sensei
}

function getRankProgress(xp) {
  const current = getRank(xp);
  const next = getNextRank(xp);
  if (!next) return 100;
  const range = next.minXP - current.minXP;
  const progress = xp - current.minXP;
  return Math.min((progress / range) * 100, 100);
}

// ═══════════════════════════════════════════════
// GLOBAL XP STATE
// ═══════════════════════════════════════════════
function getTotalXP() {
  let total = 0;
  try {
    const keys = ['dojo_instruments','dojo_styles','dojo_platforms','dojo_charts','dojo_risk'];
    keys.forEach(k => {
      const s = JSON.parse(localStorage.getItem(k) || '{}');
      if (s.totalXP) total += s.totalXP;
    });
    // DNA quiz XP
    const dojo = JSON.parse(localStorage.getItem('dojo_state') || '{}');
    if (dojo.xp) total += dojo.xp;
  } catch(e) {}
  return total;
}

// ═══════════════════════════════════════════════
// XP POP ANIMATION
// ═══════════════════════════════════════════════
function showXPPop(amount, anchorEl) {
  const pop = document.createElement('div');
  pop.className = 'dojo-xp-pop';
  pop.textContent = '+' + amount + ' XP';

  // Position near anchor or center-top
  if (anchorEl) {
    const rect = anchorEl.getBoundingClientRect();
    pop.style.left = (rect.left + rect.width / 2) + 'px';
    pop.style.top  = (rect.top + window.scrollY - 10) + 'px';
  } else {
    pop.style.right = '24px';
    pop.style.top = '80px';
    pop.style.left = 'auto';
  }

  document.body.appendChild(pop);
  requestAnimationFrame(() => {
    pop.classList.add('dojo-xp-pop-animate');
  });
  setTimeout(() => pop.remove(), 1200);
}

// ═══════════════════════════════════════════════
// STREAK SYSTEM
// ═══════════════════════════════════════════════
let _streak = 0;

function updateStreak(correct) {
  if (correct) {
    _streak++;
    if (_streak === 2) showStreakNotif('🔥 Streak: 2 — Keep going!', 'streak');
    else if (_streak === 3) showStreakNotif('🔥🔥 Streak: 3 — You\'re locked in!', 'streak-hot');
    else if (_streak >= 5) showStreakNotif('🔥🔥🔥 Streak: ' + _streak + ' — UNSTOPPABLE', 'streak-fire');
  } else {
    if (_streak >= 3) showStreakNotif('💀 Streak lost. Refocus.', 'streak-dead');
    _streak = 0;
  }
}

function showStreakNotif(msg, type) {
  const el = document.getElementById('dojo-streak-notif');
  if (!el) return;
  el.textContent = msg;
  el.className = 'dojo-streak-notif show ' + type;
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ═══════════════════════════════════════════════
// MODULE COMPLETE OVERLAY
// ═══════════════════════════════════════════════
function showModuleComplete(opts) {
  // opts: { moduleName, xpEarned, message, nextHref, nextLabel }
  const overlay = document.createElement('div');
  overlay.className = 'dojo-complete-overlay';
  overlay.innerHTML = `
    <div class="dojo-complete-card">
      <div class="dcc-glow"></div>
      <div class="dcc-emoji">🥋</div>
      <div class="dcc-eyebrow">Module Complete</div>
      <div class="dcc-title">${opts.moduleName}</div>
      <div class="dcc-xp">+${opts.xpEarned} XP Earned</div>
      <div class="dcc-rank" id="dcc-rank-display"></div>
      <div class="dcc-msg">${opts.message || 'You survived. Most traders don\'t.'}</div>
      <div class="dcc-btns">
        ${opts.nextHref ? `<a href="${opts.nextHref}" class="dcc-btn-primary">${opts.nextLabel || 'Next Module →'}</a>` : ''}
        <a href="index.html" class="dcc-btn-ghost">Back to Hub</a>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  // Rank display
  const xp = getTotalXP();
  const rank = getRank(xp);
  const next = getNextRank(xp);
  const pct  = getRankProgress(xp);
  const rankEl = overlay.querySelector('#dcc-rank-display');
  if (rankEl) {
    rankEl.innerHTML = `
      <div class="dcc-rank-row">
        <span class="dcc-rank-emoji">${rank.emoji}</span>
        <span class="dcc-rank-name" style="color:${rank.color}">${rank.name}</span>
      </div>
      <div class="dcc-rank-bar-wrap">
        <div class="dcc-rank-bar"><div class="dcc-rank-fill" style="width:${pct}%;background:${rank.color}"></div></div>
        ${next ? `<span class="dcc-rank-next">${xp} / ${next.minXP} XP → ${next.name}</span>` : '<span class="dcc-rank-next">Max Rank Achieved 🏆</span>'}
      </div>`;
  }

  requestAnimationFrame(() => overlay.classList.add('show'));

  // Close on backdrop click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('show');
  });
}

// ═══════════════════════════════════════════════
// RANK BADGE (injected into topbar)
// ═══════════════════════════════════════════════
function injectRankBadge() {
  const topbarRight = document.querySelector('.topbar-right');
  if (!topbarRight || document.getElementById('dojo-rank-badge')) return;

  const xp = getTotalXP();
  const rank = getRank(xp);

  const badge = document.createElement('div');
  badge.id = 'dojo-rank-badge';
  badge.className = 'dojo-rank-badge';
  badge.style.setProperty('--rank-color', rank.color);
  badge.innerHTML = `
    <span class="drb-emoji">${rank.emoji}</span>
    <div class="drb-info">
      <div class="drb-name">${rank.name}</div>
      <div class="drb-xp">${xp.toLocaleString()} XP</div>
    </div>`;

  topbarRight.insertBefore(badge, topbarRight.firstChild);
}

function updateRankBadge() {
  const badge = document.getElementById('dojo-rank-badge');
  if (!badge) return;
  const xp = getTotalXP();
  const rank = getRank(xp);
  badge.style.setProperty('--rank-color', rank.color);
  const emojiEl = badge.querySelector('.drb-emoji');
  const nameEl  = badge.querySelector('.drb-name');
  const xpEl    = badge.querySelector('.drb-xp');
  if (emojiEl) emojiEl.textContent = rank.emoji;
  if (nameEl)  nameEl.textContent  = rank.name;
  if (xpEl)    xpEl.textContent    = xp.toLocaleString() + ' XP';
}

// ═══════════════════════════════════════════════
// BACK TO HUB BUTTON (injected into topbar)
// ═══════════════════════════════════════════════
function injectBackToHub() {
  const logo = document.querySelector('.logo');
  if (!logo || document.getElementById('dojo-back-hub')) return;
  const btn = document.createElement('a');
  btn.id = 'dojo-back-hub';
  btn.className = 'dojo-back-hub';
  btn.href = 'index.html';
  btn.innerHTML = '← Hub';
  logo.parentNode.insertBefore(btn, logo);
}

// ═══════════════════════════════════════════════
// MODULE NAV (add to topbar nav-links)
// ═══════════════════════════════════════════════
function injectModuleNav() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) {
    // Create nav if doesn't exist in topbar
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;
    const nav = document.createElement('ul');
    nav.className = 'nav-links dojo-injected-nav';
    nav.innerHTML = buildNavHTML();
    topbar.insertBefore(nav, topbar.querySelector('.topbar-right') || topbar.lastChild);
  } else {
    navLinks.innerHTML = buildNavHTML();
  }
}

function buildNavHTML() {
  const pages = [
    { href:'instruments.html',  label:'Instruments' },
    { href:'styles.html',       label:'Styles' },
    { href:'platforms.html',    label:'Platforms' },
    { href:'charts-module.html',label:'Charts' },
    { href:'risk-module.html',  label:'Risk' },
    { href:'dna-quiz.html',     label:'DNA Quiz' },
    { href:'simulator.html',    label:'Simulator' },
  ];
  const current = window.location.pathname.split('/').pop() || 'index.html';
  return pages.map(p => `<li><a href="${p.href}" ${current===p.href?'class="active"':''}>${p.label}</a></li>`).join('');
}

// ═══════════════════════════════════════════════
// INJECT GLOBAL CSS
// ═══════════════════════════════════════════════
function injectStyles() {
  if (document.getElementById('dojo-engine-styles')) return;
  const style = document.createElement('style');
  style.id = 'dojo-engine-styles';
  style.textContent = `
    /* XP POP */
    .dojo-xp-pop {
      position: absolute;
      font-family: 'Cinzel', serif;
      font-size: 1rem;
      font-weight: 700;
      color: #3DBA72;
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
      transform: translateY(0) scale(1);
      text-shadow: 0 0 20px rgba(61,186,114,0.6);
      letter-spacing: 0.1em;
    }
    .dojo-xp-pop-animate {
      animation: dojo-xp-float 1.1s ease forwards;
    }
    @keyframes dojo-xp-float {
      0%   { opacity: 1; transform: translateY(0) scale(1.2); }
      60%  { opacity: 1; transform: translateY(-40px) scale(1); }
      100% { opacity: 0; transform: translateY(-70px) scale(0.8); }
    }

    /* STREAK NOTIF */
    .dojo-streak-notif {
      position: fixed;
      top: 70px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      opacity: 0;
      background: #13131C;
      border: 1px solid rgba(201,168,76,0.4);
      padding: 10px 22px;
      font-family: 'Cinzel', serif;
      font-size: 0.78rem;
      letter-spacing: 0.12em;
      color: #C9A84C;
      z-index: 999;
      clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
      transition: all 0.3s ease;
      white-space: nowrap;
    }
    .dojo-streak-notif.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .dojo-streak-notif.streak-hot  { color: #E05252; border-color: rgba(224,82,82,0.4); }
    .dojo-streak-notif.streak-fire { color: #F0CC7A; border-color: rgba(240,204,122,0.5); }
    .dojo-streak-notif.streak-dead { color: #8A8070; border-color: rgba(138,128,112,0.3); }

    /* RANK BADGE */
    .dojo-rank-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #13131C;
      border: 1px solid rgba(201,168,76,0.15);
      padding: 6px 12px;
      clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
      cursor: default;
    }
    .drb-emoji { font-size: 1.1rem; line-height: 1; }
    .drb-info  { display: flex; flex-direction: column; }
    .drb-name  {
      font-family: 'Cinzel', serif;
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--rank-color, #C9A84C);
      line-height: 1.2;
    }
    .drb-xp {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.58rem;
      color: #8A8070;
      line-height: 1.2;
    }

    /* BACK TO HUB */
    .dojo-back-hub {
      font-family: 'Cinzel', serif;
      font-size: 0.6rem;
      letter-spacing: 0.15em;
      color: #7A5E24;
      text-decoration: none;
      padding: 6px 10px;
      border: 1px solid rgba(201,168,76,0.12);
      transition: all 0.2s;
      white-space: nowrap;
    }
    .dojo-back-hub:hover { color: #C9A84C; border-color: rgba(201,168,76,0.3); }

    /* INJECTED NAV */
    .dojo-injected-nav {
      display: flex;
      gap: 4px;
      list-style: none;
    }
    .dojo-injected-nav a {
      font-family: 'Cinzel', serif;
      font-size: 0.62rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #8A8070;
      text-decoration: none;
      padding: 6px 10px;
      border: 1px solid transparent;
      transition: all 0.2s;
    }
    .dojo-injected-nav a:hover,
    .dojo-injected-nav a.active {
      color: #C9A84C;
      border-color: rgba(201,168,76,0.2);
      background: rgba(201,168,76,0.05);
    }
    @media(max-width: 900px) { .dojo-injected-nav { display: none; } }

    /* MODULE COMPLETE OVERLAY */
    .dojo-complete-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10,10,15,0.92);
      backdrop-filter: blur(12px);
      z-index: 9000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    .dojo-complete-overlay.show { opacity: 1; }

    .dojo-complete-card {
      background: #13131C;
      border: 1px solid rgba(201,168,76,0.3);
      padding: 48px 52px;
      text-align: center;
      max-width: 480px;
      width: 90%;
      position: relative;
      animation: dojo-card-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
      clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
    }
    @keyframes dojo-card-in {
      from { transform: scale(0.8) translateY(30px); opacity: 0; }
      to   { transform: scale(1) translateY(0); opacity: 1; }
    }

    .dcc-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center top, rgba(201,168,76,0.08) 0%, transparent 70%);
      pointer-events: none;
    }
    .dcc-emoji {
      font-size: 3.5rem;
      display: block;
      margin-bottom: 14px;
      animation: dojo-bounce 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
    }
    @keyframes dojo-bounce {
      from { transform: scale(0.5); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }
    .dcc-eyebrow {
      font-family: 'Cinzel', serif;
      font-size: 0.62rem;
      letter-spacing: 0.3em;
      color: #7A5E24;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .dcc-title {
      font-family: 'Cinzel Decorative', serif;
      font-size: 1.6rem;
      font-weight: 700;
      color: #C9A84C;
      margin-bottom: 12px;
      line-height: 1.2;
    }
    .dcc-xp {
      font-family: 'Share Tech Mono', monospace;
      font-size: 1.1rem;
      color: #3DBA72;
      margin-bottom: 16px;
      letter-spacing: 0.1em;
    }
    .dcc-rank {
      background: rgba(201,168,76,0.05);
      border: 1px solid rgba(201,168,76,0.15);
      padding: 12px 16px;
      margin-bottom: 16px;
    }
    .dcc-rank-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .dcc-rank-emoji { font-size: 1.4rem; }
    .dcc-rank-name {
      font-family: 'Cinzel', serif;
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
    .dcc-rank-bar-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .dcc-rank-bar {
      width: 200px;
      height: 4px;
      background: #22222E;
      border-radius: 2px;
      overflow: hidden;
    }
    .dcc-rank-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 1s ease 0.5s;
    }
    .dcc-rank-next {
      font-family: 'Cinzel', serif;
      font-size: 0.58rem;
      letter-spacing: 0.1em;
      color: #8A8070;
    }
    .dcc-msg {
      font-size: 0.95rem;
      color: #8A8070;
      font-weight: 300;
      line-height: 1.6;
      margin-bottom: 28px;
      font-family: 'Rajdhani', sans-serif;
    }
    .dcc-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
    .dcc-btn-primary {
      font-family: 'Cinzel', serif;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #0A0A0F;
      background: linear-gradient(135deg, #C9A84C, #F0CC7A);
      border: none;
      padding: 12px 28px;
      cursor: pointer;
      clip-path: polygon(7px 0%, 100% 0%, calc(100% - 7px) 100%, 0% 100%);
      text-decoration: none;
      transition: all 0.22s;
      display: inline-block;
    }
    .dcc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.25); }
    .dcc-btn-ghost {
      font-family: 'Cinzel', serif;
      font-size: 0.7rem;
      letter-spacing: 0.13em;
      color: #C9A84C;
      background: transparent;
      border: 1px solid rgba(201,168,76,0.4);
      padding: 11px 22px;
      cursor: pointer;
      clip-path: polygon(7px 0%, 100% 0%, calc(100% - 7px) 100%, 0% 100%);
      text-decoration: none;
      transition: all 0.22s;
      display: inline-block;
    }
    .dcc-btn-ghost:hover { background: rgba(201,168,76,0.07); }

    /* CORRECT ANSWER FLASH */
    @keyframes dojo-correct-flash {
      0%   { box-shadow: 0 0 0 0 rgba(61,186,114,0.6); }
      50%  { box-shadow: 0 0 0 8px rgba(61,186,114,0); }
      100% { box-shadow: 0 0 0 0 rgba(61,186,114,0); }
    }
    .dojo-correct-flash {
      animation: dojo-correct-flash 0.6s ease;
    }

    /* RANK UP BANNER */
    .dojo-rankup {
      position: fixed;
      top: 70px;
      left: 50%;
      transform: translateX(-50%) translateY(-30px);
      opacity: 0;
      background: linear-gradient(135deg, #13131C, #1A1A24);
      border: 2px solid rgba(201,168,76,0.5);
      padding: 14px 28px;
      font-family: 'Cinzel Decorative', serif;
      font-size: 0.85rem;
      color: #C9A84C;
      z-index: 999;
      clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
      transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
      text-align: center;
      white-space: nowrap;
    }
    .dojo-rankup.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;
  document.head.appendChild(style);
}

// ═══════════════════════════════════════════════
// RANK UP CHECK
// ═══════════════════════════════════════════════
let _lastRankIdx = -1;

function checkRankUp(prevXP, newXP) {
  const prevRank = getRank(prevXP);
  const newRank  = getRank(newXP);
  if (newRank.name !== prevRank.name) {
    showRankUp(newRank);
  }
}

function showRankUp(rank) {
  let el = document.getElementById('dojo-rankup-banner');
  if (!el) {
    el = document.createElement('div');
    el.id = 'dojo-rankup-banner';
    el.className = 'dojo-rankup';
    document.body.appendChild(el);
  }
  el.innerHTML = `${rank.emoji} RANK UP — ${rank.name.toUpperCase()}`;
  el.style.color = rank.color;
  el.style.borderColor = rank.color + '80';
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3500);
}

// ═══════════════════════════════════════════════
// INIT — call on every module page
// ═══════════════════════════════════════════════
function dojoEngineInit(opts) {
  opts = opts || {};
  injectStyles();

  // Streak notif container
  if (!document.getElementById('dojo-streak-notif')) {
    const notif = document.createElement('div');
    notif.id = 'dojo-streak-notif';
    notif.className = 'dojo-streak-notif';
    document.body.appendChild(notif);
  }

  // Back to hub + rank badge + nav
  injectBackToHub();
  injectRankBadge();
  if (opts.injectNav !== false) injectModuleNav();

  // Update rank badge whenever XP changes
  window.addEventListener('dojo-xp-updated', () => {
    updateRankBadge();
  });
}

// ═══════════════════════════════════════════════
// PUBLIC API — call these from module pages
// ═══════════════════════════════════════════════
window.DojoEngine = {
  init: dojoEngineInit,
  showXPPop,
  updateStreak,
  showModuleComplete,
  getTotalXP,
  getRank,
  checkRankUp,
  updateRankBadge,
};

// Auto-init if not disabled
if (!window.DOJO_ENGINE_MANUAL_INIT) {
  document.addEventListener('DOMContentLoaded', () => dojoEngineInit());
}
