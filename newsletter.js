/* Dojo tips signup (AWeber). Asks once, after real progress, and never on arrival.
   Pages fire `dojo:milestone` events ({kind:'lesson'|'trade'}); a few minutes of browsing also counts. */
(() => {
 const LIST = 'awlist6225246';                         // AWeber list (unique_list_id)
 const TAGS = 'trading-dojo,dojo-tips';
 const DONE = '/subscribed.html';
 const KEY = 'dojo_nl';                                 // {subscribed, dismissedAt, shownAt, seconds, trades}
 const read = () => { try { return JSON.parse(localStorage.getItem(KEY)||'{}'); } catch(e){ return {}; } };
 const write = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch(e){} };
 const DAY = 864e5;

 function eligible(){
  const s = read();
  if(s.subscribed) return false;
  if(s.dismissedAt && Date.now()-s.dismissedAt < 30*DAY) return false;
  if(document.querySelector('.acct-modal, .nl-modal')) return false;
  return true;
 }

 /* Posts to AWeber through a hidden frame so the visitor stays on the page. */
 function subscribe({email, name='', source='popup'}){
  return new Promise(resolve => {
   const id = 'nl-frame-'+Date.now(), f = document.createElement('iframe');
   f.name = id; f.hidden = true; f.title = 'Newsletter signup';
   const form = document.createElement('form');
   form.method = 'post'; form.action = 'https://www.aweber.com/scripts/addlead.pl'; form.target = id; form.hidden = true;
   const u = new URLSearchParams(location.search), utm = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].map(p=>u.get(p)).filter(Boolean).join('|');
   const fields = {listname:LIST, redirect:location.origin+DONE, meta_redirect_onlist:location.origin+DONE+'?already=1',
    meta_adtracking:'Trading Dojo '+source, meta_tags:TAGS+',dojo-'+source, meta_required:'email', email, name,
    'custom utm':utm, 'custom referrer':document.referrer};
   for(const [k,v] of Object.entries(fields)){ const i=document.createElement('input'); i.type='hidden'; i.name=k; i.value=v; form.appendChild(i); }
   let finished=false; const done=()=>{ if(finished) return; finished=true; const s=read(); s.subscribed=Date.now(); write(s); setTimeout(()=>{ f.remove(); form.remove(); },1500); resolve(true); };
   f.addEventListener('load', done); setTimeout(done, 6000);
   document.body.append(f, form); form.submit();
  });
 }

 function popup(){
  if(!eligible()) return;
  const s = read(); s.shownAt = Date.now(); write(s);
  if(!document.getElementById('nl-css')){ const css=document.createElement('style'); css.id='nl-css'; css.textContent=`
.nl-modal{position:fixed;right:16px;bottom:16px;z-index:950;max-width:360px;width:calc(100% - 32px);background:var(--panel,#fffefa);color:var(--text,#131313);border:1px solid var(--border-b,#ccc);box-shadow:0 10px 30px rgba(0,0,0,0.18);padding:20px;font-family:'DM Sans',sans-serif;animation:nlIn .25s ease-out}
@keyframes nlIn{from{transform:translateY(12px);opacity:0}to{transform:none;opacity:1}}
@media (prefers-reduced-motion:reduce){.nl-modal{animation:none}}
.nl-modal h2{font-family:'Barlow Condensed',sans-serif;font-size:1.45rem;line-height:1.1;margin:0 26px 6px 0}
.nl-modal p{font-size:0.86rem;line-height:1.5;color:var(--text-dim,#555);margin:0 0 12px}
.nl-modal input{width:100%;font:inherit;font-size:0.95rem;padding:11px 12px;min-height:44px;margin-bottom:8px;border:1px solid var(--border-b,#bbb);background:var(--ink,#fff);color:var(--text,#131313);box-sizing:border-box}
.nl-modal button.go{width:100%;min-height:44px;font:inherit;font-weight:700;font-size:0.92rem;background:var(--gold,#2046F5);color:#fff;border:1px solid var(--gold,#2046F5);cursor:pointer}
.nl-modal .x{position:absolute;top:10px;right:10px;background:none;border:none;font-size:1.3rem;line-height:1;cursor:pointer;color:var(--text-dim,#555);padding:6px}
.nl-modal .fine{font-size:0.72rem;color:var(--text-faint,#888);margin:8px 0 0}
.nl-modal .msg{font-size:0.85rem;min-height:1.1em;margin-bottom:4px}
.nl-modal :focus-visible{outline:2px solid var(--gold,#2046F5);outline-offset:2px}`; document.head.appendChild(css); }
  const m = document.createElement('div'); m.className='nl-modal'; m.setAttribute('role','dialog'); m.setAttribute('aria-labelledby','nl-h');
  m.innerHTML = `<button class="x" aria-label="Close">×</button><h2 id="nl-h">Get Dojo tips by email</h2>
   <p>One practice drill and one market lesson a month. No signals, no hype, nothing to buy.</p>
   <form novalidate><label class="sr" style="position:absolute;left:-9999px" for="nl-name">First name</label><input id="nl-name" name="name" placeholder="First name (optional)" autocomplete="given-name"/>
   <label class="sr" style="position:absolute;left:-9999px" for="nl-email">Email</label><input id="nl-email" name="email" type="email" placeholder="you@example.com" autocomplete="email" required/>
   <div class="msg" aria-live="polite"></div><button class="go" type="submit">Send me tips</button></form>
   <p class="fine">Unsubscribe anytime. Education only, not financial advice.</p>`;
  document.body.appendChild(m);
  const close = () => { const st=read(); if(!st.subscribed){ st.dismissedAt=Date.now(); write(st); } m.remove(); };
  m.querySelector('.x').onclick = close;
  document.addEventListener('keydown', function esc(e){ if(e.key==='Escape'&&document.body.contains(m)){ close(); document.removeEventListener('keydown',esc); } });
  m.querySelector('form').onsubmit = async e => {
   e.preventDefault();
   const email = m.querySelector('#nl-email').value.trim(), name = m.querySelector('#nl-name').value.trim();
   if(!/^\S+@\S+\.\S+$/.test(email)){ m.querySelector('.msg').textContent='Enter a valid email.'; return; }
   m.querySelector('.go').disabled = true; m.querySelector('.go').textContent='Sending…';
   await subscribe({email, name, source:'popup'});
   m.innerHTML = `<button class="x" aria-label="Close">×</button><h2>Almost there</h2><p>Check your inbox and tap the confirmation link to start getting Dojo tips.</p>`;
   m.querySelector('.x').onclick = () => m.remove();
  };
  setTimeout(()=>m.querySelector('#nl-email')?.focus({preventScroll:true}), 50);
 }

 // Triggers: first passed lesson, third trade, or about four minutes of total browsing.
 addEventListener('dojo:milestone', e => {
  const s = read();
  if(e.detail?.kind==='trade'){ s.trades=(s.trades||0)+1; write(s); if(s.trades>=3) setTimeout(popup, 2500); }
  if(e.detail?.kind==='lesson') setTimeout(popup, 1800);
 });
 let tick = setInterval(() => {
  if(document.visibilityState!=='visible') return;
  const s = read(); s.seconds=(s.seconds||0)+15; write(s);
  if(s.seconds>=240){ clearInterval(tick); popup(); }
 }, 15000);

 window.DojoNewsletter = {subscribe, popup};
})();
