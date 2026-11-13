/* Options pricing for the Dojo options lab. Black-Scholes, no dividends.
   Educational model: real option prices also reflect skew, dividends, early exercise
   and supply and demand, so the lab says "modeled" wherever it shows a price. */
(() => {
 const MULT = 100;
 function ncdf(x){ // Abramowitz-Stegun 7.1.26 via erf, accurate to ~1e-7
  const t=1/(1+0.3275911*Math.abs(x)/Math.SQRT2);
  const y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x/2);
  return x>=0?(1+y)/2:(1-y)/2;
 }
 const npdf = x => Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);

 /* type 'call'|'put', S spot, K strike, T years, sigma vol, r rate. Returns per-share price and Greeks.
    theta is per calendar day, vega per 1 vol point (0.01). */
 function price(type,S,K,T,sigma,r=0.04){
  if(T<=1e-6||sigma<=0){
   const intrinsic=type==='call'?Math.max(S-K,0):Math.max(K-S,0);
   return {price:intrinsic,delta:type==='call'?(S>K?1:0):(S<K?-1:0),gamma:0,theta:0,vega:0};
  }
  const sq=Math.sqrt(T),d1=(Math.log(S/K)+(r+sigma*sigma/2)*T)/(sigma*sq),d2=d1-sigma*sq,disc=Math.exp(-r*T);
  const gamma=npdf(d1)/(S*sigma*sq),vega=S*npdf(d1)*sq/100;
  if(type==='call'){
   const p=S*ncdf(d1)-K*disc*ncdf(d2);
   return {price:p,delta:ncdf(d1),gamma,vega,theta:(-S*npdf(d1)*sigma/(2*sq)-r*K*disc*ncdf(d2))/365};
  }
  const p=K*disc*ncdf(-d2)-S*ncdf(-d1);
  return {price:p,delta:ncdf(d1)-1,gamma,vega,theta:(-S*npdf(d1)*sigma/(2*sq)+r*K*disc*ncdf(-d2))/365};
 }

 /* Legs: {type, strike, qty (+long/-short), entry (per-share premium)} */
 function positionValue(legs,S,T,sigma,r){
  let value=0,delta=0,gamma=0,theta=0,vega=0;
  for(const l of legs){const g=price(l.type,S,l.strike,T,sigma,r);value+=g.price*l.qty;delta+=g.delta*l.qty;gamma+=g.gamma*l.qty;theta+=g.theta*l.qty;vega+=g.vega*l.qty;}
  return {value:value*MULT,delta:delta*MULT,gamma:gamma*MULT,theta:theta*MULT,vega:vega*MULT};
 }
 const entryCost = legs => legs.reduce((s,l)=>s+l.entry*l.qty,0)*MULT; // positive = debit paid
 function payoffAtExpiry(legs,S){ return legs.reduce((s,l)=>s+(l.type==='call'?Math.max(S-l.strike,0):Math.max(l.strike-S,0))*l.qty,0)*MULT - entryCost(legs); }

 /* Max loss and gain across a wide price grid (exact for these piecewise-linear payoffs at the kinks). */
 function riskProfile(legs){
  const ks=[...new Set(legs.map(l=>l.strike))].sort((a,b)=>a-b);
  const pts=[0,...ks,ks[ks.length-1]*3];
  const vals=pts.map(S=>payoffAtExpiry(legs,S));
  const netCalls=legs.filter(l=>l.type==='call').reduce((s,l)=>s+l.qty,0);
  const unlimitedUp=netCalls>0, unlimitedLoss=netCalls<0;
  const breakevens=[];
  for(let i=0;i<pts.length-1;i++){const a=vals[i],b=vals[i+1];if(a===0)breakevens.push(pts[i]);else if(a*b<0)breakevens.push(pts[i]+(pts[i+1]-pts[i])*(-a)/(b-a));}
  return {maxLoss:unlimitedLoss?-Infinity:Math.min(...vals),maxGain:unlimitedUp?Infinity:Math.max(...vals),breakevens:[...new Set(breakevens.map(b=>+b.toFixed(4)))]};
 }

 /* Annualized historical volatility from daily closes. */
 function histVol(closes){
  const rs=[];for(let i=1;i<closes.length;i++)if(closes[i]>0&&closes[i-1]>0)rs.push(Math.log(closes[i]/closes[i-1]));
  if(rs.length<2)return NaN;const m=rs.reduce((s,x)=>s+x,0)/rs.length;
  return Math.sqrt(rs.reduce((s,x)=>s+(x-m)**2,0)/(rs.length-1))*Math.sqrt(252);
 }

 /* Strategy builders. Strikes snap to an increment; width in strike units. */
 const snap=(x,inc)=>Math.round(x/inc)*inc;
 function strikeStep(S){return S<25?0.5:S<100?1:S<250?2.5:S<1000?5:10;}
 const STRATEGIES={
  long_call:{name:'Long call',bias:'Bullish',defined:true,build:(S,inc)=>[{type:'call',strike:snap(S,inc),qty:1}]},
  long_put:{name:'Long put',bias:'Bearish',defined:true,build:(S,inc)=>[{type:'put',strike:snap(S,inc),qty:1}]},
  bull_call_spread:{name:'Bull call spread',bias:'Bullish',defined:true,build:(S,inc,w=1)=>{const k=snap(S,inc);return [{type:'call',strike:k,qty:1},{type:'call',strike:k+w*inc,qty:-1}];}},
  bear_put_spread:{name:'Bear put spread',bias:'Bearish',defined:true,build:(S,inc,w=1)=>{const k=snap(S,inc);return [{type:'put',strike:k,qty:1},{type:'put',strike:k-w*inc,qty:-1}];}},
  bull_put_spread:{name:'Bull put credit spread',bias:'Neutral to bullish',defined:true,build:(S,inc,w=1)=>{const k=snap(S*0.97,inc);return [{type:'put',strike:k,qty:-1},{type:'put',strike:k-w*inc,qty:1}];}},
  iron_condor:{name:'Iron condor',bias:'Neutral',defined:true,build:(S,inc,w=1)=>{const lo=snap(S*0.95,inc),hi=snap(S*1.05,inc);return [{type:'put',strike:lo-w*inc,qty:1},{type:'put',strike:lo,qty:-1},{type:'call',strike:hi,qty:-1},{type:'call',strike:hi+w*inc,qty:1}];}}
 };

 const api={MULT,ncdf,price,positionValue,entryCost,payoffAtExpiry,riskProfile,histVol,strikeStep,snap,STRATEGIES};
 if(typeof window!=='undefined')window.DojoOptions=api;
 if(typeof globalThis!=='undefined')globalThis.DojoOptions=api;
})();
