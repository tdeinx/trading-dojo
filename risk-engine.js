/* Trading Dojo risk engine.
   Pure functions only: no DOM, no storage, no network. The simulator calls these,
   and scripts/risk-engine.test.mjs checks the math. */
(() => {
 const RULES={maxRiskPct:1,minRR:2,maxDailyLosses:3};
 const STOCK={kind:'stock',unit:'shares',lotUnits:1,step:1,leverage:1,decimals:2,spread:0.02,pip:0.01};
 const PAIRS={
  'EUR/USD':{spreadPips:1.0,leverage:50},
  'GBP/USD':{spreadPips:1.5,leverage:50},
  'USD/JPY':{spreadPips:1.0,leverage:50},
  'AUD/USD':{spreadPips:1.2,leverage:50},
  'USD/CAD':{spreadPips:1.5,leverage:50},
  'EUR/GBP':{spreadPips:1.5,leverage:50},
 };
 const GOLD={kind:'metal',unit:'oz',lotUnits:1,step:1,leverage:20,decimals:2,spread:0.30,pip:0.01};

 function spec(symbol,type){
  if(symbol==='XAU/USD')return {...GOLD,base:'XAU',quote:'USD'};
  if(type==='forex'||PAIRS[symbol]){
   const [base,quote]=symbol.split('/');const jpy=quote==='JPY';const pip=jpy?0.01:0.0001;const cfg=PAIRS[symbol]||{spreadPips:2,leverage:20};
   return {kind:'forex',unit:'micro lots',lotUnits:1000,step:1,leverage:cfg.leverage,decimals:jpy?3:5,pip,spread:cfg.spreadPips*pip,base,quote};
  }
  return {...STOCK};
 }

 /* USD gained or lost per 1.0 move in price, per one lot (share, micro lot or ounce).
    quoteToUSD converts the quote currency to dollars: 1 for EUR/USD or gold,
    1/price for USD/JPY, the GBP/USD rate for EUR/GBP. */
 function usdPerUnitMove(s,price,quoteToUSD){
  if(s.kind==='stock'||s.kind==='metal')return s.lotUnits;
  if(s.quote==='USD')return s.lotUnits;
  if(s.base==='USD')return s.lotUnits/price;
  return s.lotUnits*(quoteToUSD||NaN);
 }

 function notionalUSD(s,lots,price,quoteToUSD){
  if(s.kind==='forex'){
   if(s.base==='USD')return lots*s.lotUnits;
   if(s.quote==='USD')return lots*s.lotUnits*price;
   return lots*s.lotUnits*price*(quoteToUSD||NaN);
  }
  return lots*s.lotUnits*price;
 }

 /* Fill prices include the spread: a long pays the ask, a short sells the bid. */
 function bidAsk(s,mid){return {bid:mid-s.spread/2,ask:mid+s.spread/2};}
 function entryFill(s,side,mid){const q=bidAsk(s,mid);return side==='long'?q.ask:q.bid;}
 function exitMark(s,side,mid){const q=bidAsk(s,mid);return side==='long'?q.bid:q.ask;}

 function validatePlan({side,entry,stop,target}){
  const errors=[];
  if(!(side==='long'||side==='short'))errors.push('Choose long or short.');
  if(!Number.isFinite(entry)||entry<=0)errors.push('A current price is needed.');
  if(!Number.isFinite(stop)||stop<=0)errors.push('Every trade needs a stop loss.');
  if(!Number.isFinite(target)||target<=0)errors.push('Every trade needs a profit target.');
  if(errors.length)return {ok:false,errors,rr:null};
  if(side==='long'){if(stop>=entry)errors.push('For a long, the stop goes below the entry price.');if(target<=entry)errors.push('For a long, the target goes above the entry price.');}
  else{if(stop<=entry)errors.push('For a short, the stop goes above the entry price.');if(target>=entry)errors.push('For a short, the target goes below the entry price.');}
  const rr=Math.abs(target-entry)/Math.abs(entry-stop);
  return {ok:!errors.length,errors,rr:errors.length?null:rr};
 }

 /* How many lots keep the loss at the stop inside riskPct of equity. */
 function sizePosition({equity,riskPct,entry,stop,usdPerMove,step=1}){
  const budget=equity*riskPct/100;const perLot=Math.abs(entry-stop)*usdPerMove;
  if(!(budget>0)||!(perLot>0)||!Number.isFinite(perLot))return {lots:0,riskUSD:0,budget};
  const lots=Math.floor(budget/perLot/step+1e-9)*step;
  return {lots,riskUSD:lots*perLot,budget};
 }

 /* Stops can only be tightened toward profit, never widened. */
 function canMoveStop(pos,newStop,mark){
  if(!Number.isFinite(newStop)||newStop<=0)return {ok:false,reason:'Enter a price.'};
  if(pos.side==='long'){
   if(newStop<pos.stop)return {ok:false,reason:'Moving a stop further away turns a plan into a hope. Stops only move toward profit.'};
   if(newStop>=mark)return {ok:false,reason:'A long stop must stay below the current bid.'};
  }else{
   if(newStop>pos.stop)return {ok:false,reason:'Moving a stop further away turns a plan into a hope. Stops only move toward profit.'};
   if(newStop<=mark)return {ok:false,reason:'A short stop must stay above the current ask.'};
  }
  return {ok:true};
 }

 /* Checks a fresh mark against the bracket. A price that jumped well past the stop
    since the last check fills at the worse price, so learners meet gap risk. */
 function checkExit(pos,mark,prevMark){
  const risk=Math.abs(pos.entry-pos.initialStop);
  if(pos.side==='long'){
   if(mark<=pos.stop){const gapped=Number.isFinite(prevMark)&&prevMark>pos.stop&&pos.stop-mark>risk*0.5;return {reason:gapped?'gap':'stop',price:gapped?mark:pos.stop};}
   if(mark>=pos.target)return {reason:'target',price:pos.target};
  }else{
   if(mark>=pos.stop){const gapped=Number.isFinite(prevMark)&&prevMark<pos.stop&&mark-pos.stop>risk*0.5;return {reason:gapped?'gap':'stop',price:gapped?mark:pos.stop};}
   if(mark<=pos.target)return {reason:'target',price:pos.target};
  }
  return null;
 }

 /* Replay exits use a whole candle. If a candle opens past the stop it fills at the open (gap).
    If one candle touches both stop and target, we can't know which came first, so the
    stop wins. That keeps replay results honest instead of flattering. */
 function checkBarExit(pos,bar,spread=0){
  const half=spread/2;
  if(pos.side==='long'){
   const lo=bar.l-half,hi=bar.h-half,op=bar.o-half;
   if(op<=pos.stop)return {reason:'gap',price:op};
   if(lo<=pos.stop)return {reason:'stop',price:pos.stop};
   if(op>=pos.target)return {reason:'target',price:op};
   if(hi>=pos.target)return {reason:'target',price:pos.target};
  }else{
   const lo=bar.l+half,hi=bar.h+half,op=bar.o+half;
   if(op>=pos.stop)return {reason:'gap',price:op};
   if(hi>=pos.stop)return {reason:'stop',price:pos.stop};
   if(op<=pos.target)return {reason:'target',price:op};
   if(lo<=pos.target)return {reason:'target',price:pos.target};
  }
  return null;
 }

 function pnlUSD(pos,exitPrice,usdPerMove){
  const dir=pos.side==='long'?1:-1;return (exitPrice-pos.entry)*dir*pos.lots*usdPerMove;
 }

 function sameDay(a,b){const x=new Date(a),y=new Date(b);return x.getFullYear()===y.getFullYear()&&x.getMonth()===y.getMonth()&&x.getDate()===y.getDate();}
 function lossesToday(journal,now=Date.now()){return journal.filter(t=>!t.source&&t.pnl<0&&sameDay(t.closed,now)).length;}

 function rulesAtEntry({riskPct,rr}){
  return {stop:true,risk:riskPct<=RULES.maxRiskPct+1e-9,rr:rr>=RULES.minRR-1e-9};
 }

 function stats(journal){
  const n=journal.length,rs=journal.map(t=>t.r).filter(Number.isFinite);
  const wins=journal.filter(t=>t.pnl>0),losses=journal.filter(t=>t.pnl<=0);
  const avg=a=>a.length?a.reduce((s,x)=>s+x,0)/a.length:0;
  const grossWin=wins.reduce((s,t)=>s+t.pnl,0),grossLoss=Math.abs(losses.reduce((s,t)=>s+t.pnl,0));
  let peak=0,cum=0,maxDD=0;
  for(const t of [...journal].sort((a,b)=>new Date(a.closed)-new Date(b.closed))){cum+=Number.isFinite(t.r)?t.r:0;peak=Math.max(peak,cum);maxDD=Math.max(maxDD,peak-cum);}
  const adherent=journal.filter(t=>t.ruleAdherent).length;
  const expectancy=avg(rs),adherence=n?adherent/n:0;
  const grad={needed:100,done:Math.min(n,100),adherenceOk:adherence>=0.9,expectancyOk:expectancy>0};
  grad.passed=n>=100&&grad.adherenceOk&&grad.expectancyOk;
  return {n,wins:wins.length,losses:losses.length,winRate:n?wins.length/n:0,
   avgWinR:avg(wins.map(t=>t.r).filter(Number.isFinite)),avgLossR:avg(losses.map(t=>t.r).filter(Number.isFinite)),
   expectancy,totalR:rs.reduce((s,x)=>s+x,0),profitFactor:grossLoss?grossWin/grossLoss:(grossWin>0?Infinity:0),
   maxDrawdownR:maxDD,adherence,grad};
 }

 const api={RULES,spec,usdPerUnitMove,notionalUSD,bidAsk,entryFill,exitMark,validatePlan,sizePosition,canMoveStop,checkExit,checkBarExit,pnlUSD,lossesToday,rulesAtEntry,stats};
 if(typeof window!=='undefined')window.DojoRisk=api;
 if(typeof globalThis!=='undefined')globalThis.DojoRisk=api;
})();
