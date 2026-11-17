/* Trading Dojo accounts: optional sign-in that saves progress to Firebase and syncs it across devices.
   Stays completely dormant until firebase-config.js sets window.DOJO_FIREBASE. */
const CFG = window.DOJO_FIREBASE;
const SYNC = window.DojoSync;
if (CFG && CFG.apiKey && SYNC) start();

async function start(){
 const V = '10.14.1', base = `https://www.gstatic.com/firebasejs/${V}`;
 // ── UI ──
 const css = document.createElement('style');
 css.textContent = `.acct-btn{margin-left:auto;font:700 0.68rem 'DM Sans',sans-serif;letter-spacing:0.08em;text-transform:uppercase;padding:6px 12px;border:1px solid var(--gold,#2046F5);background:transparent;color:var(--gold,#2046F5);cursor:pointer;white-space:nowrap}
.acct-btn.on{border-color:var(--green,#13884F);color:var(--green,#13884F)}
.acct-btn.err{border-color:var(--red,#CC303D);color:var(--red,#CC303D)}
.acct-float{position:fixed;right:14px;bottom:14px;z-index:900;background:var(--panel,#fff);box-shadow:0 4px 14px rgba(0,0,0,0.18);padding:10px 14px}
.acct-modal{position:fixed;inset:0;background:rgba(10,12,20,0.55);display:flex;align-items:center;justify-content:center;z-index:1000;padding:16px}
.acct-card{background:var(--panel,#fffefa);color:var(--text,#131313);max-width:400px;width:100%;padding:24px;border:1px solid var(--border,#ddd);font-family:'DM Sans',sans-serif}
.acct-card h2{font-family:'Barlow Condensed',sans-serif;font-size:1.6rem;margin-bottom:6px}
.acct-card p{font-size:0.88rem;line-height:1.5;color:var(--text-dim,#555);margin-bottom:14px}
.acct-card button,.acct-card input{width:100%;font:inherit;font-size:0.92rem;padding:11px 12px;margin-bottom:10px;border:1px solid var(--border-b,#bbb);background:var(--ink,#fff);color:var(--text,#131313)}
.acct-card .primary{background:var(--gold,#2046F5);color:#fff;border-color:var(--gold,#2046F5);font-weight:700;cursor:pointer}
.acct-card .ghost{cursor:pointer;font-weight:600}
.acct-card .or{text-align:center;font-size:0.75rem;color:var(--text-faint,#888);margin:4px 0 10px}
.acct-card .msg{font-size:0.85rem;min-height:1.2em;margin-bottom:6px}
.acct-card .fine{font-size:0.72rem;color:var(--text-faint,#888);margin:6px 0 0}`;
 document.head.appendChild(css);
 const btn = document.createElement('button'); btn.className='acct-btn'; btn.type='button';
 const nav = document.querySelector('.academy-nav');
 const small = matchMedia('(max-width: 768px)').matches;
 if(nav && !small){ nav.style.display='flex'; nav.appendChild(btn); } else { btn.classList.add('acct-float'); document.body.appendChild(btn); }
 let ready=false;
 btn.textContent='Save progress';
 const early = () => { if(!ready) earlyModal(); };
 btn.addEventListener('click', early);
 function earlyModal(){
  const m=document.createElement('div'); m.className='acct-modal';
  m.innerHTML=`<div class="acct-card" role="dialog" aria-modal="true"><h2>Save your progress</h2><p data-t>Loading sign-in…</p><button class="ghost" data-x>Close</button></div>`;
  m.querySelector('[data-x]').onclick=()=>m.remove(); m.addEventListener('click',e=>{ if(e.target===m) m.remove(); }); document.body.appendChild(m);
  if(failed) m.querySelector('[data-t]').textContent='Sign-in could not load. Check your connection, or pause an ad or tracker blocker for this site, then refresh.';
 }
 let failed=false, mods;
 try{ mods = await Promise.all([import(`${base}/firebase-app.js`), import(`${base}/firebase-auth.js`), import(`${base}/firebase-firestore.js`)]); }
 catch(e){ failed=true; btn.title='Sign-in could not load'; return; }
 const [{initializeApp}, A, F] = mods;
 const app = initializeApp(CFG), auth = A.getAuth(app), db = F.getFirestore(app);
 ready=true; btn.removeEventListener('click', early);
 const META = 'dojo_sync_meta', EMAIL = 'dojo_signin_email';
 const rawSet = Storage.prototype.setItem, rawRemove = Storage.prototype.removeItem;
 const readMeta = () => { try { return JSON.parse(localStorage.getItem(META)||'{}'); } catch(e){ return {}; } };
 const writeMeta = m => { try { rawSet.call(localStorage, META, JSON.stringify(m)); } catch(e){} };
 let user = null, pushTimer = null, applying = false, state = 'idle';

 // Record when each synced key changes, and push shortly after.
 Storage.prototype.setItem = function(k, v){ rawSet.call(this, k, v); if(this===localStorage && !applying && SYNC.SYNC_KEY.test(k)){ const m=readMeta(); m[k]=Date.now(); writeMeta(m); schedule(); } };
 Storage.prototype.removeItem = function(k){ rawRemove.call(this, k); if(this===localStorage && !applying && SYNC.SYNC_KEY.test(k)){ const m=readMeta(); delete m[k]; writeMeta(m); schedule(); } };

 function snapshot(){
  const m=readMeta(), keys={};
  for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(SYNC.SYNC_KEY.test(k)) keys[k]={v:localStorage.getItem(k), t:m[k]||1}; }
  return {keys};
 }
 const ref = () => F.doc(db, 'progress', user.uid);
 async function push(keys){
  const size = JSON.stringify(keys).length;
  if(size > 900000){ setState('error','Your journal is too large to sync'); return; }
  await F.setDoc(ref(), {keys, email:user.email||null, updatedAt:F.serverTimestamp()});
 }
 function schedule(){ if(!user) return; clearTimeout(pushTimer); setState('saving'); pushTimer=setTimeout(syncNow, 2500); }
 async function syncNow(){
  if(!user) return;
  try{
   const snap = await F.getDoc(ref()), remote = snap.exists() ? snap.data() : null;
   const merged = SYNC.merge(snapshot(), remote);
   if(merged.changedLocal){
    applying = true; const m=readMeta();
    for(const [k,e] of Object.entries(merged.keys)){ if(localStorage.getItem(k)!==e.v){ rawSet.call(localStorage,k,e.v); m[k]=e.t; } }
    writeMeta(m); applying = false;
   }
   if(merged.changedRemote || !remote) await push(merged.keys);
   setState('synced');
   return merged.changedLocal;
  }catch(e){ applying=false; setState('error','Could not sync right now'); return false; }
 }

 // Email link sign-in landing.
 if(A.isSignInWithEmailLink(auth, location.href)){
  let email = localStorage.getItem(EMAIL) || prompt('Confirm the email you used to sign in');
  if(email){ try{ await A.signInWithEmailLink(auth, email, location.href); rawRemove.call(localStorage, EMAIL); }catch(e){ alert('That sign-in link has expired or was already used. Request a new one.'); } }
  const clean = new URL(location.href); ['apiKey','oobCode','mode','lang','continueUrl'].forEach(p=>clean.searchParams.delete(p)); history.replaceState(null,'',clean);
 }

 A.onAuthStateChanged(auth, async u => {
  user = u; render();
  if(!u) return;
  const first = !sessionStorage.getItem('dojo_synced_'+u.uid);
  const changed = await syncNow();
  sessionStorage.setItem('dojo_synced_'+u.uid, '1');
  if(changed && first) location.reload();
 });
 addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='hidden' && user && pushTimer){ clearTimeout(pushTimer); pushTimer=null; syncNow(); } });

 btn.addEventListener('click', () => user ? accountMenu() : signInModal());

 function setState(s, why){ state=s; btn.title=why||''; render(); }
 function render(){
  btn.classList.toggle('on', !!user && state!=='error'); btn.classList.toggle('err', state==='error');
  btn.textContent = !user ? 'Save progress' : state==='saving' ? 'Saving…' : state==='error' ? 'Sync issue' : '✓ Synced';
 }
 function modal(html){
  const m=document.createElement('div'); m.className='acct-modal'; m.innerHTML=`<div class="acct-card" role="dialog" aria-modal="true">${html}</div>`;
  m.addEventListener('click', e=>{ if(e.target===m) m.remove(); }); document.body.appendChild(m); return m;
 }
 function signInModal(){
  const m = modal(`<h2>Save your progress</h2><p>Sign in to keep your lessons, practice journal and stats, and pick up on any device.</p>
   <button class="primary" data-g>Continue with Google</button><div class="or">or get a sign-in link by email</div>
   <input type="email" placeholder="you@example.com" autocomplete="email" data-e/><button class="ghost" data-l>Email me a link</button>
   <div class="msg" aria-live="polite" data-m></div><button class="ghost" data-x>Not now</button>
   <p class="fine">We store your email and Dojo progress only. Practice is still free without an account.</p>`);
  const msg = t => m.querySelector('[data-m]').textContent = t;
  m.querySelector('[data-x]').onclick = () => m.remove();
  m.querySelector('[data-g]').onclick = async () => {
   try{ await A.signInWithPopup(auth, new A.GoogleAuthProvider()); m.remove(); }
   catch(e){ msg(e.code==='auth/popup-blocked'?'Your browser blocked the sign-in window. Allow popups or use the email link.':e.code==='auth/popup-closed-by-user'?'':'Google sign-in did not finish. Try the email link instead.'); }
  };
  m.querySelector('[data-l]').onclick = async () => {
   const email = m.querySelector('[data-e]').value.trim();
   if(!/^\S+@\S+\.\S+$/.test(email)){ msg('Enter a valid email.'); return; }
   try{ await A.sendSignInLinkToEmail(auth, email, {url: location.origin+location.pathname+location.search, handleCodeInApp:true});
    rawSet.call(localStorage, EMAIL, email); msg('Check your inbox for a sign-in link. Open it on this device.'); }
   catch(e){ msg('Could not send the link right now. Try again in a minute.'); }
  };
 }
 function accountMenu(){
  const m = modal(`<h2>Your account</h2><p>Signed in as <b>${(user.email||'your account').replace(/[<>&]/g,'')}</b>. Progress saves automatically and syncs across your devices.</p>
   <button class="primary" data-s>Sync now</button><button class="ghost" data-o>Sign out</button><button class="ghost" data-x>Close</button>
   <p class="fine">Signing out keeps your progress on this device too.</p>`);
  m.querySelector('[data-x]').onclick = () => m.remove();
  m.querySelector('[data-s]').onclick = async () => { await syncNow(); m.remove(); };
  m.querySelector('[data-o]').onclick = async () => { await syncNow(); await A.signOut(auth); m.remove(); };
 }
 render();
}
