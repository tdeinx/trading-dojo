/* Trading Dojo lesson figures: setup diagrams, concept diagrams and interactive calculators.
   Everything is drawn as inline SVG with CSS classes, so it follows the light and dark themes.
   Setup diagrams don't hand-place exits: they simulate the trade on the drawn candles,
   so the picture always matches the rules. */
(() => {
 const R = (typeof window!=='undefined'&&window.DojoRisk)||globalThis.DojoRisk;
 const O = (typeof window!=='undefined'&&window.DojoOptions)||globalThis.DojoOptions;
 const esc = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const f1 = v => (Math.round(v*10)/10).toString();
 const money = v => (v<0?'-$':'$')+Math.abs(Math.round(v)).toLocaleString('en-US');

 function rng(seed){ let s=(seed%2147483646)+1; return ()=>(s=s*16807%2147483647)/2147483647; }

 /* Segments: [count, move per candle, noise, wick] or {gap:x}. */
 function candles(segs, seed=7, start=50){
  const r=rng(seed), C=[]; let price=start, gap=0;
  for(const sg of segs){
   if(!Array.isArray(sg)){ gap+=sg.gap||0; continue; }
   const [n,d,noise=0.3,wick=0.35]=sg;
   for(let i=0;i<n;i++){
    const o=price+gap, gapped=gap!==0; gap=0;
    const c=o+d+(r()-0.5)*2*noise;
    C.push({o,c,h:Math.max(o,c)+r()*wick+0.05,l:Math.min(o,c)-r()*wick-0.05,gapped});
    price=c;
   }
  }
  return C;
 }
 const hiOf=(C,a,b)=>Math.max(...C.slice(a,b+1).map(k=>k.h));
 const loOf=(C,a,b)=>Math.min(...C.slice(a,b+1).map(k=>k.l));
 function sma(C,p){ return C.map((_,i)=>i+1<p?null:C.slice(i+1-p,i+1).reduce((s,k)=>s+k.c,0)/p); }

 /* Resolve a trade spec against candles, then simulate it bar by bar. */
 function resolve(sp, C){
  const out={};
  if(sp.range){ const [a,b]=sp.range; out.range={a,b,hi:hiOf(C,a,b),lo:loOf(C,a,b)}; }
  let ei=sp.entry, side=sp.side||'long';
  if(sp.entry==='breakUp'||sp.entry==='breakDown'){
   const up=sp.entry==='breakUp'; side=up?'long':'short';
   ei=C.findIndex((k,i)=>i>out.range.b&&(up?k.c>out.range.hi:k.c<out.range.lo));
  }
  if(!(ei>=0)) return out;
  const entry=C[ei].c, st=sp.stop||{}, tg=sp.target||{rr:2};
  let stop = st.lowOf ? loOf(C,...st.lowOf)-(st.pad||0.2)
   : st.highOf ? hiOf(C,...st.highOf)+(st.pad||0.2)
   : st.mid ? (out.range.hi+out.range.lo)/2
   : st.rangeEdge ? (side==='long'?out.range.lo-(st.pad||0.2):out.range.hi+(st.pad||0.2))
   : Number.isFinite(st.value) ? st.value : entry+(side==='long'?-2:2);
  const risk=Math.abs(entry-stop);
  let target = tg.rangeOpp ? (side==='long'?out.range.hi-(tg.pad||0.1):out.range.lo+(tg.pad||0.1))
   : Number.isFinite(tg.value) ? tg.value : entry+(side==='long'?1:-1)*risk*(tg.rr||2);
  let exit=null;
  for(let j=ei+1;j<C.length;j++){
   const k=C[j];
   if(side==='long'){
    if(k.o<=stop){exit={i:j,price:k.o,reason:'gap'};break;}
    if(k.l<=stop){exit={i:j,price:stop,reason:'stop'};break;}
    if(k.h>=target){exit={i:j,price:target,reason:'target'};break;}
   }else{
    if(k.o>=stop){exit={i:j,price:k.o,reason:'gap'};break;}
    if(k.h>=stop){exit={i:j,price:stop,reason:'stop'};break;}
    if(k.l<=target){exit={i:j,price:target,reason:'target'};break;}
   }
  }
  const r = exit ? (exit.price-entry)*(side==='long'?1:-1)/risk : null;
  return Object.assign(out,{ei,entry,stop,target,side,exit,r,rr:Math.abs(target-entry)/risk});
 }

 /* One candle panel. extras: hlines, bands, vlines, notes, ma */
 function panel(C, T, sp, title, opt={}){
  const W=opt.w||360, H=opt.h||220, P={t:26,r:72,b:16,l:8};
  const levels=[];
  if(T&&T.ei>=0) levels.push(T.entry,T.stop,T.target);
  (sp.hlines||[]).forEach(h=>levels.push(h.price));
  (sp.bands||[]).forEach(b=>levels.push(b.lo,b.hi));
  const all=C.flatMap(k=>[k.h,k.l]).concat(levels.filter(Number.isFinite));
  let mn=Math.min(...all), mx=Math.max(...all); const padY=(mx-mn)*0.08||1; mn-=padY; mx+=padY;
  const iW=W-P.l-P.r, iH=H-P.t-P.b, slot=iW/C.length, bw=Math.max(2,slot*0.62);
  const x=i=>P.l+i*slot+slot/2, y=v=>P.t+(mx-v)/(mx-mn)*iH;
  let s=`<svg viewBox="0 0 ${W} ${H}" class="fg-svg" role="img" aria-label="${esc(title)}">`;
  s+=`<text x="${P.l}" y="15" class="fg-title">${esc(title)}</text>`;
  (sp.bands||[]).forEach(b=>{ s+=`<rect x="${P.l}" y="${y(b.hi)}" width="${iW}" height="${Math.max(1,y(b.lo)-y(b.hi))}" class="fg-band ${b.tone||'good'}"/>`; if(b.label) s+=`<text x="${P.l+4}" y="${y(b.hi)+11}" class="fg-small ${b.tone||'good'}">${esc(b.label)}</text>`; });
  if(T&&T.range){ const rg=T.range; s+=`<rect x="${x(rg.a)-slot/2}" y="${y(rg.hi)}" width="${(rg.b-rg.a+1)*slot}" height="${y(rg.lo)-y(rg.hi)}" class="fg-range"/><text x="${x(rg.a)-slot/2+3}" y="${y(rg.hi)-4}" class="fg-small">${esc(sp.rangeLabel||'Range')}</text>`; }
  (sp.vlines||[]).forEach(v=>{ s+=`<line x1="${x(v.i)-slot/2}" x2="${x(v.i)-slot/2}" y1="${P.t}" y2="${H-P.b}" class="fg-vline"/><text x="${x(v.i)-slot/2+3}" y="${H-P.b-4}" class="fg-small">${esc(v.label)}</text>`; });
  if(T&&T.ei>=0){
   const endI=T.exit?T.exit.i:C.length-1, x0=x(T.ei), x1=x(endI)+slot/2;
   s+=`<rect x="${x0}" y="${Math.min(y(T.entry),y(T.target))}" width="${x1-x0}" height="${Math.abs(y(T.target)-y(T.entry))}" class="fg-zone good"/>`;
   s+=`<rect x="${x0}" y="${Math.min(y(T.entry),y(T.stop))}" width="${x1-x0}" height="${Math.abs(y(T.stop)-y(T.entry))}" class="fg-zone bad"/>`;
  }
  if(sp.ma){ const m=sma(C,sp.ma); s+=`<polyline class="fg-ma" points="${m.map((v,i)=>v==null?'':`${x(i)},${y(v)}`).filter(Boolean).join(' ')}"/>`; }
  C.forEach((k,i)=>{ const up=k.c>=k.o, cls=up?'up':'down'; s+=`<line x1="${x(i)}" x2="${x(i)}" y1="${y(k.h)}" y2="${y(k.l)}" class="fg-wick ${cls}"/><rect x="${x(i)-bw/2}" y="${y(Math.max(k.o,k.c))}" width="${bw}" height="${Math.max(1,Math.abs(y(k.o)-y(k.c)))}" class="fg-body ${cls}"/>`; });
  const label=(v,txt,cls)=>`<line x1="${P.l}" x2="${W-P.r}" y1="${y(v)}" y2="${y(v)}" class="fg-level ${cls}"/><text x="${W-P.r+4}" y="${y(v)+3}" class="fg-lbl ${cls}">${esc(txt)}</text>`;
  (sp.hlines||[]).forEach(h=>{ s+=label(h.price,h.label,h.tone||'neutral'); });
  if(T&&T.ei>=0){
   s+=label(T.target,`Target ${f1(T.rr)}R`,'good')+label(T.entry,'Entry','entry')+label(T.stop,'Stop','bad');
   s+=`<circle cx="${x(T.ei)}" cy="${y(T.entry)}" r="3.6" class="fg-dot entry"/>`;
   if(T.exit){ const tone=T.r>0?'good':'bad'; const txt={target:'Target hit',stop:'Stopped out',gap:'Gap past stop'}[T.exit.reason];
    s+=`<circle cx="${x(T.exit.i)}" cy="${y(T.exit.price)}" r="4" class="fg-dot ${tone}"/>`;
    const tx=Math.min(x(T.exit.i)+6,W-P.r-58), ty=T.exit.reason==='target'?(T.side==='long'?y(T.exit.price)-7:y(T.exit.price)+13):(T.side==='long'?y(T.exit.price)+13:y(T.exit.price)-7);
    s+=`<text x="${tx}" y="${Math.max(24,Math.min(H-4,ty))}" class="fg-small ${tone} fg-strong">${txt} ${T.r>=0?'+':''}${f1(T.r)}R</text>`; }
  }
  (sp.notes||[]).forEach(n=>{ const k=C[n.i]; const v=Number.isFinite(n.price)?n.price:(n.at==='low'?k.l:k.h); const ny=Number.isFinite(n.price)?y(v)+3:(n.at==='low'?y(v)+12:y(v)-6); const nx=x(n.i)+(n.dx||0); s+=`<text x="${n.anchor?nx:Math.min(nx,W-P.r-40)}" y="${ny}" class="fg-small fg-strong" text-anchor="${n.anchor||'middle'}">${esc(n.text)}</text>`; });
  if(opt.endNote) s+=`<text x="${W-P.r+4}" y="${P.t-6}" class="fg-small fg-strong ${opt.endTone||''}">${esc(opt.endNote)}</text>`;
  return s+'</svg>';
 }

 function setupFig(f){
  const pan=(sp0,title)=>{ const C=candles(sp0.segs,sp0.seed||7,sp0.start||50); const T=resolve(sp0,C);
   const sp={...sp0,hlines:(sp0.hlines||[]).map(h=>({...h,price:h.highOf?hiOf(C,...h.highOf):h.lowOf?loOf(C,...h.lowOf):h.price}))};
   return {C,T,svg:panel(C,T,sp,title)}; };
  const w=pan(f.works,'When it works'), b=pan(f.fails,'When it fails');
  return {results:{works:w.T,fails:b.T}, html:`<div class="fg-pair"><div>${w.svg}<p class="fg-cap">${esc(f.works.text)}</p></div><div>${b.svg}<p class="fg-cap">${esc(f.fails.text)}</p></div></div>`};
 }

 /* Options: underlying daily candles to expiry, strikes, profit zone and the result at expiry. */
 function optionLegs(st,w){
  const legs=O.STRATEGIES[st].build(100,2.5,w||2);
  return legs.map(l=>({...l,entry:O.price(l.type,100,l.strike,30/365,0.3,0.04).price}));
 }
 function optionSetupFig(f){
  const legs=optionLegs(f.strategy,f.width), rp=O.riskProfile(legs), maxLoss=-rp.maxLoss;
  const strikes=[...new Set(legs.map(l=>l.strike))];
  const bands=[]; const be=rp.breakevens.slice().sort((a,b)=>a-b);
  const profitAbove = O.payoffAtExpiry(legs,200)>0, profitBelow=O.payoffAtExpiry(legs,1)>0;
  if(be.length===2) bands.push({lo:be[0],hi:be[1],tone:'good',label:'Profit zone at expiry'});
  else if(be.length===1) bands.push(profitAbove?{lo:be[0],hi:be[0]+12,tone:'good',label:'Profit zone at expiry'}:{lo:be[0]-12,hi:be[0],tone:'good',label:'Profit zone at expiry'});
  const pan=(sp,title)=>{
   const C=candles(sp.segs,sp.seed||5,100), last=C[C.length-1].c, pnl=O.payoffAtExpiry(legs,last), r=pnl/maxLoss;
   const hlines=strikes.map(k=>({price:k,label:`Strike ${k}`,tone:'neutral'}));
   return {pnl,r,svg:panel(C,null,{hlines,bands,vlines:[{i:C.length-1,label:'Expiry'}]},title,{endNote:`${money(pnl)} (${r>=0?'+':''}${f1(r)}R)`,endTone:pnl>=0?'good':'bad'})};
  };
  const w=pan(f.works,'When it works'), b=pan(f.fails,'When it fails');
  const name=O.STRATEGIES[f.strategy].name, legTxt=legs.map(l=>`${l.qty>0?'Buy':'Sell'} ${l.strike} ${l.type}`).join(' · ');
  return {results:{works:w,fails:b,maxLoss}, html:`<p class="fg-cap fg-legs"><b>${esc(name)}</b> on a $100 stock, 30 days: ${esc(legTxt)}. Max loss ${money(maxLoss)}, max gain ${Number.isFinite(rp.maxGain)?money(rp.maxGain):'unlimited'} per contract (modeled prices).</p>
   <div class="fg-pair"><div>${w.svg}<p class="fg-cap">${esc(f.works.text)}</p></div><div>${b.svg}<p class="fg-cap">${esc(f.fails.text)}</p></div></div>`};
 }

 /* ── Concept diagrams ── */
 function sessionsFig(f){
  const W=720,H=f.variant==='stocks'?165:215,P={l:110,r:16,t:46,b:28};
  const cfg = f.variant==='stocks'
   ? {start:4,end:20,rows:[['Pre-market',4,9.5,'muted'],['Regular session',9.5,16,'main'],['After-hours',16,20,'muted']],hi:[[9.5,10,'The open'],[15,16,'Last hour']]}
   : {start:17,end:41,rows:[['Sydney',17,26,'muted'],['Tokyo',19,28,'muted'],['London',27,36,'main'],['New York',32,41,'main']],hi:[[32,36,'London + New York overlap']]};
  const span=cfg.end-cfg.start, x=h=>P.l+(h-cfg.start)/span*(W-P.l-P.r), rowH=(H-P.t-P.b)/cfg.rows.length;
  const hr=h=>{ const t=((h%24)+24)%24, hh=Math.floor(t), mm=Math.round((t-hh)*60); const ap=hh<12?'am':'pm'; const h12=hh%12||12; return `${h12}${mm?':'+String(mm).padStart(2,'0'):''}${ap}`; };
  let s=`<svg viewBox="0 0 ${W} ${H}" class="fg-svg" role="img" aria-label="Trading sessions in Eastern time">`;
  s+=`<text x="8" y="16" class="fg-title">${f.variant==='stocks'?'US stock sessions (Eastern time)':'Forex sessions in a trading day (Eastern time, approximate)'}</text>`;
  cfg.hi.forEach(([a,b,l])=>{ s+=`<rect x="${x(a)}" y="${P.t-4}" width="${x(b)-x(a)}" height="${H-P.t-P.b+8}" class="fg-band warn"/><text x="${(x(a)+x(b))/2}" y="${H-6}" class="fg-small fg-strong" text-anchor="middle">${esc(l)}</text>`; });
  cfg.rows.forEach(([n,a,b,t],i)=>{ const yy=P.t+i*rowH+rowH*0.2; s+=`<text x="${P.l-8}" y="${yy+rowH*0.42}" class="fg-lbl neutral" text-anchor="end">${esc(n)}</text><rect x="${x(a)}" y="${yy}" width="${x(b)-x(a)}" height="${rowH*0.6}" class="fg-bar ${t}"/>`; });
  const step=f.variant==='stocks'?2:3;
  for(let h=cfg.start;h<=cfg.end;h+=step) s+=`<line x1="${x(h)}" x2="${x(h)}" y1="${P.t-6}" y2="${H-P.b}" class="fg-grid"/><text x="${x(h)}" y="${P.t-10}" class="fg-small" text-anchor="middle">${hr(h)}</text>`;
  return {html:s+'</svg>'};
 }

 function spreadFig(){
  const W=520,H=190;
  let s=`<svg viewBox="0 0 ${W} ${H}" class="fg-svg" role="img" aria-label="Bid, ask and spread">`;
  s+=`<text x="8" y="16" class="fg-title">The spread is paid the moment you enter</text>`;
  const rows=[['1.08530','',''],['1.08520','Ask: you buy here','bad'],['1.08515','Mid (the price on most charts)','neutral'],['1.08510','Bid: you sell here','good'],['1.08500','','']];
  rows.forEach(([p,l,t],i)=>{ const y=44+i*32; s+=`<line x1="120" x2="300" y1="${y}" y2="${y}" class="fg-grid"/><text x="110" y="${y+4}" class="fg-lbl neutral" text-anchor="end">${p}</text>`; if(l) s+=`<circle cx="210" cy="${y}" r="5" class="fg-dot ${t==='neutral'?'entry':t}"/><text x="310" y="${y+4}" class="fg-lbl ${t}">${esc(l)}</text>`; });
  s+=`<line x1="160" x2="160" y1="76" y2="140" class="fg-arrow"/><line x1="154" x2="166" y1="76" y2="76" class="fg-arrow"/><line x1="154" x2="166" y1="140" y2="140" class="fg-arrow"/><text x="152" y="104" class="fg-small fg-strong" text-anchor="end">Spread</text><text x="152" y="115" class="fg-small" text-anchor="end">1.0 pip</text>`;
  return {html:s+'</svg><p class="fg-cap">Buy at the ask and your position is valued at the bid, so every new trade starts slightly negative. On 1 standard lot of EUR/USD, that 1 pip is $10.</p>'};
 }

 function gapFig(f){
  const orders=f.variant==='orders';
  const segs=[[7,0.15,0.25],[3,-0.25,0.2],{gap:-4},[6,-0.35,0.35]];
  const C=candles(segs,11,52), gi=C.findIndex(k=>k.gapped), stop=C[gi-1].c-1.2, fill=C[gi].o;
  if(!orders){
   const sp={hlines:[{price:stop,label:'Your stop',tone:'bad'}],vlines:[{i:gi,label:f.label||'Weekend'}],notes:[{i:gi,price:fill,anchor:'end',dx:-14,text:'Opens here, below the stop'}]};
   return {html:`<div class="fg-solo">${panel(C,null,sp,'A gap skips your stop',{w:520})}</div><p class="fg-cap">You planned to lose from entry to the stop. Price opened below it, so the stop became a market order and filled at the open, about ${f1((stop-fill))} points worse than planned. That is why size matters even with a stop.</p>`};
  }
  const limit=stop-0.4;
  const a=panel(C,null,{hlines:[{price:stop,label:'Stop',tone:'bad'}],vlines:[{i:gi,label:'Overnight news'}],notes:[{i:gi,price:fill,anchor:'end',dx:-12,text:'Filled near the open'}]},'Stop order',{w:360});
  const b=panel(C,null,{hlines:[{price:stop,label:'Stop',tone:'bad'},{price:limit,label:'Limit',tone:'neutral'}],vlines:[{i:gi,label:'Overnight news'}],notes:[{i:gi,price:fill,anchor:'end',dx:-12,text:'No fill, still holding'}]},'Stop-limit order',{w:360});
  return {html:`<div class="fg-pair"><div>${a}<p class="fg-cap">Gets you out at the first available price. The loss is bigger than planned, but it stops.</p></div><div>${b}<p class="fg-cap">Price never trades back up to the limit, so nothing fills and the position keeps falling.</p></div></div>`};
 }

 function correlationFig(){
  const r=rng(21), n=40, a=[0], b=[0];
  for(let i=1;i<n;i++){ const common=(i===28?-2.2:(r()-0.48)*0.6); a.push(a[i-1]+common+(r()-0.5)*0.18); b.push(b[i-1]+common*1.1+(r()-0.5)*0.22); }
  const W=520,H=200,P={l:30,r:110,t:28,b:20}, all=a.concat(b), mn=Math.min(...all)-0.3, mx=Math.max(...all)+0.3;
  const x=i=>P.l+i/(n-1)*(W-P.l-P.r), y=v=>P.t+(mx-v)/(mx-mn)*(H-P.t-P.b), line=(d,c)=>`<polyline points="${d.map((v,i)=>`${x(i)},${y(v)}`).join(' ')}" class="fg-line ${c}"/>`;
  let s=`<svg viewBox="0 0 ${W} ${H}" class="fg-svg" role="img" aria-label="Correlated pairs"><text x="8" y="16" class="fg-title">Two trades, one bet against the dollar</text>`;
  s+=`<line x1="${x(28)}" x2="${x(28)}" y1="${P.t}" y2="${H-P.b}" class="fg-vline"/><text x="${x(28)+4}" y="${H-P.b-4}" class="fg-small">Strong US data</text>`;
  s+=line(a,'c1')+line(b,'c2')+`<text x="${W-P.r+6}" y="${y(a[n-1])+3}" class="fg-lbl c1">Long EUR/USD</text><text x="${W-P.r+6}" y="${y(b[n-1])+14}" class="fg-lbl c2">Long GBP/USD</text>`;
  return {html:s+'</svg><p class="fg-cap">Both pairs are priced against the US dollar, so they usually move together. One surprise can stop out both at once. Count them as one position when you add up risk.</p>'};
 }

 function thetaFig(){
  const W=520,H=210,P={l:44,r:20,t:28,b:30}, days=[...Array(61).keys()].map(i=>60-i), v=days.map(d=>O.price('call',100,100,Math.max(d,0.001)/365,0.3,0.04).price*100);
  const mx=Math.max(...v)*1.05, x=i=>P.l+i/60*(W-P.l-P.r), y=val=>P.t+(mx-val)/mx*(H-P.t-P.b);
  let s=`<svg viewBox="0 0 ${W} ${H}" class="fg-svg" role="img" aria-label="Time decay curve"><text x="8" y="16" class="fg-title">Time value of an at-the-money option melts faster near expiry</text>`;
  s+=`<rect x="${x(46)}" y="${P.t}" width="${x(60)-x(46)}" height="${H-P.t-P.b}" class="fg-band bad"/><text x="${x(46)+4}" y="${P.t+12}" class="fg-small bad fg-strong">Last 2 weeks</text>`;
  s+=`<polyline points="${v.map((val,i)=>`${x(i)},${y(val)}`).join(' ')}" class="fg-line c1"/>`;
  [60,45,30,14,7,0].forEach(d=>{ const i=60-d; s+=`<line x1="${x(i)}" x2="${x(i)}" y1="${H-P.b}" y2="${H-P.b+4}" class="fg-grid"/><text x="${x(i)}" y="${H-P.b+15}" class="fg-small" text-anchor="middle">${d}d</text>`; });
  [0,mx/2].forEach(val=>{ s+=`<text x="${P.l-6}" y="${y(val)+3}" class="fg-small" text-anchor="end">${money(val)}</text>`; });
  s+=`<text x="${W/2}" y="${H-2}" class="fg-small" text-anchor="middle">Days to expiration</text>`;
  const d30=O.price('call',100,100,30/365,0.3,0.04).price*100, d14=O.price('call',100,100,14/365,0.3,0.04).price*100;
  return {html:s+`</svg><p class="fg-cap">Modeled 100-strike call on a $100 stock, 30% volatility, price unchanged. It loses about ${money((d30-d14)/16)} a day between 30 and 14 days left, then about ${money(d14/14)} a day in the last two weeks.</p>`};
 }

 function payoffsFig(f){
  const list=f.strategies||Object.keys(O.STRATEGIES);
  const mini=st=>{ const legs=optionLegs(st,2), rp=O.riskProfile(legs), W=220,H=130,P={l:8,r:8,t:22,b:18};
   const xs=[...Array(81).keys()].map(i=>80+i*0.5), ys=xs.map(s=>O.payoffAtExpiry(legs,s)), mn=Math.min(...ys,0), mx=Math.max(...ys,0), rg=(mx-mn)||1;
   const x=s=>P.l+(s-80)/40*(W-P.l-P.r), y=v=>P.t+(mx-v)/rg*(H-P.t-P.b);
   let s=`<svg viewBox="0 0 ${W} ${H}" class="fg-svg" role="img" aria-label="${esc(O.STRATEGIES[st].name)} payoff"><text x="${P.l}" y="14" class="fg-title fg-mini">${esc(O.STRATEGIES[st].name)}</text>`;
   s+=`<line x1="${P.l}" x2="${W-P.r}" y1="${y(0)}" y2="${y(0)}" class="fg-grid"/><line x1="${x(100)}" x2="${x(100)}" y1="${P.t}" y2="${H-P.b}" class="fg-vline"/>`;
   for(let i=0;i<xs.length-1;i++){ const m=(ys[i]+ys[i+1])/2; s+=`<line x1="${x(xs[i])}" y1="${y(ys[i])}" x2="${x(xs[i+1])}" y2="${y(ys[i+1])}" class="fg-pay ${m>=0?'good':'bad'}"/>`; }
   const gainTxt=!Number.isFinite(rp.maxGain)?'unlimited':(st==='long_put'?money(rp.maxGain)+' if it hits $0':money(rp.maxGain));
   s+=`<text x="${P.l}" y="${H-4}" class="fg-small">Max loss ${money(-rp.maxLoss)} · max gain ${gainTxt}</text>`;
   return s+'</svg>'; };
  return {html:`<div class="fg-grid3">${list.map(mini).join('')}</div><p class="fg-cap">Profit or loss at expiration for one contract on a $100 stock (modeled prices, 30 days). The vertical line is today's price. Green is profit, red is loss.</p>`};
 }

 function rollFig(){
  const W=560,H=230,P={l:16,r:110,t:28,b:76}, n=40, r=rng(4); const front=[],next=[],vf=[],vn=[];
  let p=100; for(let i=0;i<n;i++){ p+= (r()-0.48)*0.6; front.push(p); next.push(p+0.9); const t=i/(n-1); vf.push(i<28?0.85:Math.max(0.05,0.85-(i-28)/10)); vn.push(i<26?0.1:Math.min(0.85,0.1+(i-26)/8)); }
  const mn=Math.min(...front)-0.5, mx=Math.max(...next)+0.5, x=i=>P.l+i/(n-1)*(W-P.l-P.r), y=v=>P.t+(mx-v)/(mx-mn)*(H-P.t-P.b), vy=H-P.b+12, vh=40;
  let s=`<svg viewBox="0 0 ${W} ${H}" class="fg-svg" role="img" aria-label="Futures roll"><text x="8" y="16" class="fg-title">Rolling: volume moves to the next contract before expiry</text>`;
  s+=`<rect x="${x(27)}" y="${P.t}" width="${x(34)-x(27)}" height="${H-P.t-12}" class="fg-band warn"/><text x="${x(27)+3}" y="${P.t+11}" class="fg-small fg-strong">Roll window</text>`;
  s+=`<line x1="${x(36)}" x2="${x(36)}" y1="${P.t}" y2="${H-12}" class="fg-vline"/><text x="${x(36)+3}" y="${P.t+24}" class="fg-small">Front month expires</text>`;
  s+=`<polyline points="${front.slice(0,37).map((v,i)=>`${x(i)},${y(v)}`).join(' ')}" class="fg-line c1"/><polyline points="${next.map((v,i)=>`${x(i)},${y(v)}`).join(' ')}" class="fg-line c2"/>`;
  s+=`<text x="${W-P.r+6}" y="${y(next[n-1])+3}" class="fg-lbl c2">Next contract</text><text x="${x(36)+6}" y="${y(front[36])+14}" class="fg-lbl c1">Front month</text>`;
  for(let i=0;i<n;i++){ const bw=(W-P.l-P.r)/n*0.38; if(i<37) s+=`<rect x="${x(i)-bw}" y="${vy+vh*(1-vf[i])}" width="${bw}" height="${vh*vf[i]}" class="fg-vol c1"/>`; s+=`<rect x="${x(i)}" y="${vy+vh*(1-vn[i])}" width="${bw}" height="${vh*vn[i]}" class="fg-vol c2"/>`; }
  s+=`<text x="${W-P.r+6}" y="${vy+vh-4}" class="fg-small">Daily volume</text>`;
  return {html:s+'</svg><p class="fg-cap">Each contract trades at its own price, so the next contract is often a little above or below the front month. Traders close the old contract and open the new one during the roll window, when volume shifts.</p>'};
 }

 function drawdownFig(){
  const W=560,H=220,P={l:50,r:120,t:28,b:22}, eq=[50000], r=rng(9);
  const path=[...Array(9)].map(()=>380).concat([...Array(7)].map(()=>-420));
  path.forEach(d=>eq.push(eq[eq.length-1]+d+(r()-0.5)*160));
  let peak=50000; const trail=eq.map(v=>{peak=Math.max(peak,v);return peak-2000;});
  const fail=eq.findIndex((v,i)=>v<=trail[i]);
  const cut=fail>0?fail+1:eq.length; eq.length=cut; trail.length=cut;
  const all=eq.concat(trail,[48000]), mn=Math.min(...all)-300, mx=Math.max(...all)+300, x=i=>P.l+i/(eq.length-1)*(W-P.l-P.r), y=v=>P.t+(mx-v)/(mx-mn)*(H-P.t-P.b);
  let s=`<svg viewBox="0 0 ${W} ${H}" class="fg-svg" role="img" aria-label="Trailing drawdown"><text x="8" y="16" class="fg-title">A trailing drawdown follows your best day, not your first</text>`;
  s+=`<line x1="${P.l}" x2="${W-P.r}" y1="${y(50000)}" y2="${y(50000)}" class="fg-level neutral"/><text x="${W-P.r+4}" y="${y(50000)+3}" class="fg-lbl neutral">Starting $50,000</text>`;
  s+=`<polyline points="${trail.map((v,i)=>`${x(i)},${y(v)}`).join(' ')}" class="fg-line bad fg-dash"/><text x="${W-P.r+4}" y="${y(trail[trail.length-1])-8}" class="fg-lbl bad">Loss limit</text><text x="${W-P.r+4}" y="${y(trail[trail.length-1])+3}" class="fg-small bad">($2,000 trailing)</text>`;
  s+=`<polyline points="${eq.map((v,i)=>`${x(i)},${y(v)}`).join(' ')}" class="fg-line c1"/>`;
  if(fail>0) s+=`<circle cx="${x(fail)}" cy="${y(eq[fail])}" r="5" class="fg-dot bad"/><text x="${x(fail)-6}" y="${y(eq[fail])+18}" class="fg-small bad fg-strong" text-anchor="end">Account fails here, still ${money(eq[fail]-50000)} above the start</text>`;
  [mx-300,50000,mn+300].forEach(v=>{ s+=`<text x="${P.l-6}" y="${y(v)+3}" class="fg-small" text-anchor="end">${money(v/1000)}k</text>`; });
  return {html:s+'</svg><p class="fg-cap">Illustration of a $2,000 trailing limit. Giving back gains after a good run can end the account while it still shows a profit. Many firms stop trailing at a set point, and rules differ, so read yours exactly.</p>'};
 }

 function custodyFig(){
  const W=600,H=190, box=(x,y,w,t,sub,cls='')=>`<rect x="${x}" y="${y}" width="${w}" height="44" class="fg-box ${cls}"/><text x="${x+w/2}" y="${y+19}" class="fg-lbl neutral fg-strong" text-anchor="middle">${esc(t)}</text><text x="${x+w/2}" y="${y+34}" class="fg-small" text-anchor="middle">${esc(sub)}</text>`, arrow=(x1,x2,y)=>`<line x1="${x1}" x2="${x2-6}" y1="${y}" y2="${y}" class="fg-arrow"/><polygon points="${x2},${y} ${x2-7},${y-4} ${x2-7},${y+4}" class="fg-arrowhead"/>`;
  let s=`<svg viewBox="0 0 ${W} ${H}" class="fg-svg" role="img" aria-label="Custody models"><text x="8" y="16" class="fg-title">Who holds the keys?</text>`;
  s+=`<text x="8" y="44" class="fg-lbl neutral fg-strong">Custodial</text>`+box(110,26,120,'You','an account login')+arrow(230,270,48)+box(270,26,150,'Exchange','holds the keys','warn')+arrow(420,460,48)+box(460,26,130,'Blockchain','')+`<text x="270" y="86" class="fg-small bad">Risk: freezes, hacks, the company failing</text>`;
  s+=`<text x="8" y="124" class="fg-lbl neutral fg-strong">Self-custody</text>`+box(110,106,310,'You','hold the keys (seed phrase)','warn')+arrow(420,460,128)+box(460,106,130,'Blockchain','')+`<text x="110" y="166" class="fg-small bad">Risk: lose or leak the seed phrase and it is gone for good</text>`;
  return {html:s+'</svg>'};
 }

 /* ── Interactive calculators ── */
 const MARKETS={
  'EUR/USD':{type:'forex',entry:1.085,stop:1.083,label:'EUR/USD (forex)'},
  'USD/JPY':{type:'forex',entry:150,stop:149.7,label:'USD/JPY (forex)'},
  'XAU/USD':{type:'forex',entry:2400,stop:2392,label:'Gold, XAU/USD'},
  'AAPL':{type:'stocks',entry:200,stop:196,label:'Stock (any US share)'},
  'MES':{type:'futures',entry:5800,stop:5790,label:'MES micro S&P 500 futures'},
  'MNQ':{type:'futures',entry:20500,stop:20475,label:'MNQ micro Nasdaq futures'},
  'MCL':{type:'futures',entry:70,stop:69.7,label:'MCL micro crude oil futures'},
  'BTC/USD':{type:'crypto',entry:90000,stop:88500,label:'Bitcoin, BTC/USD'}
 };
 function sizeCalc(f){
  const m=f.market||'EUR/USD';
  return {interactive:'size', html:`<div class="fg-calc" data-calc="size">
   <div class="fg-calc-t">Position size calculator</div>
   <div class="fg-row"><label>Market<select data-k="market">${Object.entries(MARKETS).map(([k,v])=>`<option value="${k}"${k===m?' selected':''}>${esc(v.label)}</option>`).join('')}</select></label>
   <label>Account ($)<input data-k="equity" type="number" value="${f.equity||10000}" min="100" step="100"/></label>
   <label>Risk (%)<input data-k="risk" type="number" value="${f.risk||1}" min="0.1" max="5" step="0.1"/></label></div>
   <div class="fg-row"><label>Entry<input data-k="entry" type="number" step="any" value="${MARKETS[m].entry}"/></label><label>Stop<input data-k="stop" type="number" step="any" value="${MARKETS[m].stop}"/></label></div>
   <div class="fg-out" data-out aria-live="polite"></div></div>`};
 }
 function sizeCompute(v){
  const cfg=MARKETS[v.market], s=R.spec(v.market,cfg.type,v.entry), per=R.usdPerUnitMove(s,v.entry,1);
  if(!(v.entry>0&&v.stop>0)||v.entry===v.stop) return {error:'Enter an entry and a different stop price.'};
  const sz=R.sizePosition({equity:v.equity,riskPct:v.risk,entry:v.entry,stop:v.stop,usdPerMove:per,step:s.step});
  const dist=Math.abs(v.entry-v.stop), perUnit=dist*per, notional=R.notionalUSD(s,sz.lots,v.entry,1);
  const distTxt = s.kind==='forex'&&v.market!=='XAU/USD' ? `${f1(dist/s.pip)} pips` : s.kind==='future' ? `${f1(dist)} points (${Math.round(dist/s.pip)} ticks)` : `$${dist.toFixed(2)}`;
  return {lots:sz.lots,unit:s.unit,riskUSD:sz.riskUSD,budget:sz.budget,perUnit,notional,distTxt,margin:notional/s.leverage,kind:s.kind};
 }
 function leverageCalc(){ return {interactive:'leverage', html:`<div class="fg-calc" data-calc="leverage"><div class="fg-calc-t">Leverage reality check (EUR/USD)</div>
   <div class="fg-row"><label>Account ($)<input data-k="equity" type="number" value="1000" min="100" step="100"/></label>
   <label>Leverage allowed<select data-k="lev"><option>20</option><option selected>50</option><option>100</option><option>500</option></select></label>
   <label>Position (standard lots)<input data-k="lots" type="number" value="1" min="0.01" step="0.01"/></label></div>
   <div class="fg-out" data-out aria-live="polite"></div></div>`}; }
 function leverageCompute(v){
  const notional=v.lots*100000*1.085, margin=notional/v.lev, pipVal=v.lots*10, wipe=v.equity/pipVal;
  return {notional,margin,pipVal,wipe,allowed:margin<=v.equity,riskOf20:pipVal*20/v.equity*100};
 }
 function optionCalc(){ return {interactive:'option', html:`<div class="fg-calc" data-calc="option"><div class="fg-calc-t">Option value explorer (one contract, modeled)</div>
   <div class="fg-row"><label>Type<select data-k="type"><option value="call">Call</option><option value="put">Put</option></select></label><label>Strike<input data-k="strike" type="number" value="100" step="1"/></label></div>
   <div class="fg-row fg-sliders"><label>Stock price <b data-show="spot"></b><input data-k="spot" type="range" min="80" max="120" step="0.5" value="100"/></label>
   <label>Days to expiry <b data-show="days"></b><input data-k="days" type="range" min="0" max="90" step="1" value="30"/></label>
   <label>Implied volatility <b data-show="iv"></b><input data-k="iv" type="range" min="10" max="100" step="1" value="30"/></label></div>
   <div class="fg-out" data-out aria-live="polite"></div><div data-chart></div></div>`}; }
 function optionCompute(v){
  const T=v.days/365, g=O.price(v.type,v.spot,v.strike,T,v.iv/100,0.04), intrinsic=v.type==='call'?Math.max(v.spot-v.strike,0):Math.max(v.strike-v.spot,0);
  const W=520,H=170,P={l:44,r:16,t:16,b:24}, xs=[...Array(81).keys()].map(i=>v.strike*0.8+i*v.strike*0.005);
  const now=xs.map(s=>O.price(v.type,s,v.strike,T,v.iv/100,0.04).price*100), exp=xs.map(s=>(v.type==='call'?Math.max(s-v.strike,0):Math.max(v.strike-s,0))*100);
  const mx=Math.max(...now,...exp)*1.05||1, x=s=>P.l+(s-xs[0])/(xs[xs.length-1]-xs[0])*(W-P.l-P.r), y=val=>P.t+(mx-val)/mx*(H-P.t-P.b);
  let svg=`<svg viewBox="0 0 ${W} ${H}" class="fg-svg" role="img" aria-label="Option value by stock price">`;
  svg+=`<polyline points="${exp.map((val,i)=>`${x(xs[i])},${y(val)}`).join(' ')}" class="fg-line neutral"/><polyline points="${now.map((val,i)=>`${x(xs[i])},${y(val)}`).join(' ')}" class="fg-line c1"/>`;
  svg+=`<line x1="${x(v.spot)}" x2="${x(v.spot)}" y1="${P.t}" y2="${H-P.b}" class="fg-vline"/><circle cx="${x(v.spot)}" cy="${y(g.price*100)}" r="4" class="fg-dot entry"/>`;
  svg+=`<text x="${P.l}" y="${H-6}" class="fg-small">$${f1(xs[0])}</text><text x="${W-P.r}" y="${H-6}" class="fg-small" text-anchor="end">$${f1(xs[xs.length-1])}</text><text x="${W/2}" y="${H-6}" class="fg-small" text-anchor="middle">Stock price</text>`;
  svg+=`<text x="${P.l+4}" y="${P.t+10}" class="fg-small c1 fg-strong">Value today</text><text x="${P.l+4}" y="${P.t+22}" class="fg-small">Value at expiry (intrinsic)</text>`;
  return {price:g.price*100,intrinsic:intrinsic*100,extrinsic:Math.max(0,g.price-intrinsic)*100,delta:g.delta,theta:g.theta*100,vega:g.vega*100,svg:svg+'</svg>'};
 }
 function expectancyCalc(f){ return {interactive:'expectancy', html:`<div class="fg-calc" data-calc="expectancy"><div class="fg-calc-t">Expectancy calculator</div>
   <div class="fg-row fg-sliders"><label>Win rate <b data-show="win"></b><input data-k="win" type="range" min="5" max="95" step="1" value="${f.win||50}"/></label>
   <label>Average win (R) <b data-show="aw"></b><input data-k="aw" type="range" min="0.05" max="5" step="0.05" value="${f.aw||2}"/></label>
   <label>Average loss (R) <b data-show="al"></b><input data-k="al" type="range" min="0.1" max="3" step="0.05" value="${f.al||1}"/></label></div>
   <div class="fg-out" data-out aria-live="polite"></div><div data-chart></div></div>`}; }
 function expectancyCompute(v){
  const p=v.win/100, e=p*v.aw-(1-p)*v.al, be=v.al/(v.aw+v.al);
  const W=520,H=180,P={l:40,r:16,t:16,b:34}, rrs=[...Array(60).keys()].map(i=>0.1+i*0.08), x=rr=>P.l+(rr-0.1)/(rrs[rrs.length-1]-0.1)*(W-P.l-P.r), y=w=>P.t+(1-w)*(H-P.t-P.b);
  let svg=`<svg viewBox="0 0 ${W} ${H}" class="fg-svg" role="img" aria-label="Break-even win rate">`;
  svg+=`<polygon points="${rrs.map(rr=>`${x(rr)},${y(1/(1+rr))}`).join(' ')} ${x(rrs[rrs.length-1])},${y(1)} ${x(0.1)},${y(1)}" class="fg-band good"/>`;
  svg+=`<polyline points="${rrs.map(rr=>`${x(rr)},${y(1/(1+rr))}`).join(' ')}" class="fg-line neutral"/>`;
  const rr=Math.min(v.aw/v.al,rrs[rrs.length-1]); svg+=`<circle cx="${x(rr)}" cy="${y(p)}" r="5" class="fg-dot ${e>0?'good':'bad'}"/>`;
  [0,0.5,1].forEach(w=>{ svg+=`<text x="${P.l-6}" y="${y(w)+3}" class="fg-small" text-anchor="end">${w*100}%</text>`; });
  [0.5,1,2,3,4].forEach(t=>{ svg+=`<line x1="${x(t)}" x2="${x(t)}" y1="${H-P.b}" y2="${H-P.b+3}" class="fg-grid"/><text x="${x(t)}" y="${H-P.b+12}" class="fg-small" text-anchor="middle">${t}:1</text>`; });
  svg+=`<text x="${W/2}" y="${H-6}" class="fg-small" text-anchor="middle">Average win ÷ average loss</text><text x="${W-P.r}" y="${P.t+12}" class="fg-small good fg-strong" text-anchor="end">Profitable above the line</text>`;
  return {e,be,per100:e*100,svg:svg+'</svg>'};
 }

 const RENDER={setup:setupFig,optionSetup:optionSetupFig,sessions:sessionsFig,spread:spreadFig,gap:gapFig,correlation:correlationFig,theta:thetaFig,payoffs:payoffsFig,roll:rollFig,drawdown:drawdownFig,custody:custodyFig,size:sizeCalc,leverage:leverageCalc,option:optionCalc,expectancy:expectancyCalc};
 function render(f){ const fn=RENDER[f.type]; if(!fn) throw new Error('Unknown figure '+f.type); return fn(f); }

 /* Browser: turn calculators live. */
 function mount(root){
  root.querySelectorAll('[data-calc]').forEach(el=>{
   const kind=el.dataset.calc, out=el.querySelector('[data-out]'), chart=el.querySelector('[data-chart]');
   const read=()=>{ const v={}; el.querySelectorAll('[data-k]').forEach(i=>{ const n=+i.value; v[i.dataset.k]= i.value!==''&&!isNaN(n) ? n : i.value; }); return v; };
   const upd=()=>{ const v=read(); el.querySelectorAll('[data-show]').forEach(b=>{ const k=b.dataset.show; b.textContent= k==='spot'?'$'+v.spot : k==='days'?v.days : k==='iv'?v.iv+'%' : k==='win'?v.win+'%' : f1(v[k])+'R'; });
    if(kind==='size'){ const r=sizeCompute(v); out.innerHTML= r.error?`<span class="bad">${r.error}</span>` : r.lots>0
      ? `<div class="fg-big">${r.lots} ${esc(r.unit)}</div><div class="fg-facts"><span>Stop distance <b>${r.distTxt}</b></span><span>Loss if stopped <b class="bad">${money(r.riskUSD)}</b> of ${money(r.budget)} allowed</span><span>Risk per ${r.unit==='contracts'?'contract':'unit'} <b>${r.perUnit<1?'$'+r.perUnit.toFixed(2):money(r.perUnit)}</b></span><span>Position value <b>${money(r.notional)}</b></span></div>`
      : `<div class="fg-big bad">0 ${esc(r.unit)}</div><p class="bad">Even one ${r.unit==='contracts'?'contract':'unit'} risks ${money(r.perUnit)}, more than your ${money(r.budget)} budget. Tighten the stop, use a smaller contract or skip the trade.</p>`; }
    if(kind==='leverage'){ const r=leverageCompute(v); out.innerHTML=`<div class="fg-facts"><span>Position value <b>${money(r.notional)}</b></span><span>Margin needed <b class="${r.allowed?'':'bad'}">${money(r.margin)}</b>${r.allowed?'':' (more than the account)'}</span><span>Each pip <b>${money(r.pipVal)}</b></span></div><p class="${r.wipe<100?'bad':''}">A move of <b>${f1(r.wipe)} pips</b> against you wipes out the whole account. A routine 20-pip stop would cost <b>${f1(r.riskOf20)}%</b> of it. The Dojo rule is 1%.</p>`; }
    if(kind==='option'){ const r=optionCompute(v); out.innerHTML=`<div class="fg-big">${money(r.price)} <small>per contract</small></div><div class="fg-split">${r.intrinsic>=1?`<span style="flex:${r.intrinsic}" class="fg-split-a">Intrinsic ${money(r.intrinsic)}</span>`:''}${r.extrinsic>=1?`<span style="flex:${r.extrinsic}" class="fg-split-b">Time value ${money(r.extrinsic)}</span>`:''}</div><div class="fg-facts"><span>Intrinsic value <b>${money(r.intrinsic)}</b></span><span>Time value <b>${money(r.extrinsic)}</b></span></div><div class="fg-facts"><span>Delta <b>${r.delta.toFixed(2)}</b></span><span>Theta per day <b class="bad">${money(r.theta)}</b></span><span>Vega per vol point <b>${money(r.vega)}</b></span></div>`; chart.innerHTML=r.svg; }
    if(kind==='expectancy'){ const r=expectancyCompute(v); out.innerHTML=`<div class="fg-big ${r.e>0?'good':'bad'}">${r.e>=0?'+':''}${r.e.toFixed(2)}R <small>per trade</small></div><div class="fg-facts"><span>Over 100 trades <b class="${r.e>0?'good':'bad'}">${r.per100>=0?'+':''}${f1(r.per100)}R</b></span><span>Break-even win rate <b>${Math.round(r.be*100)}%</b></span><span>At 1% risk, 100 trades ≈ <b>${r.per100>=0?'+':''}${f1(r.per100)}%</b> before costs</span></div>`; chart.innerHTML=r.svg; }
   };
   el.addEventListener('input',e=>{ if(kind==='size'&&e.target.dataset.k==='market'){ const m=MARKETS[e.target.value]; el.querySelector('[data-k=entry]').value=m.entry; el.querySelector('[data-k=stop]').value=m.stop; } upd(); });
   el.addEventListener('change',upd); upd();
  });
 }

 const api={render,mount,candles,resolve,sizeCompute,leverageCompute,optionCompute,expectancyCompute,MARKETS};
 if(typeof window!=='undefined')window.DojoFigures=api;
 if(typeof globalThis!=='undefined')globalThis.DojoFigures=api;
})();
