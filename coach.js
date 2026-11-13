/* Sensei: rules-based journal review. Pure function over journal entries.
   Each finding has a priority (lower = more important), a title, what the numbers show and one thing to do. */
(() => {
 const avg = a => a.length ? a.reduce((s,x)=>s+x,0)/a.length : 0;
 const fmtR = v => (v>=0?'+':'')+v.toFixed(2)+'R';
 const pct = v => Math.round(v*100)+'%';
 const byKey = (list,key) => list.reduce((m,t)=>{ const k=key(t); (m[k]=m[k]||[]).push(t); return m; },{});

 function review(journal){
  const J = (journal||[]).filter(t=>Number.isFinite(t.r)).sort((a,b)=>new Date(a.closed)-new Date(b.closed));
  const n = J.length, out = [];
  if(n < 5) return {n, findings:[{p:0, tone:'info', title:'Not enough trades yet', text:`Sensei needs at least 5 journaled trades to look for patterns. You have ${n}. Use replay drills to build a sample quickly.`, action:'Take 5 planned trades in replay or live practice, then come back.'}]};

  // 1. Discipline first
  const breaks = J.filter(t=>!t.ruleAdherent), adh = 1-breaks.length/n;
  if(adh < 0.9){
   const brR = avg(breaks.map(t=>t.r)), okR = avg(J.filter(t=>t.ruleAdherent).map(t=>t.r));
   out.push({p:1, tone:'warn', title:'Rule breaks are muddying your results',
    text:`You followed the rules on ${pct(adh)} of trades. Rule-break trades averaged ${fmtR(brR)}, versus ${fmtR(okR)} when you followed the rules.`,
    action:'For the next 20 trades, skip any plan that turns a rule chip red. Your stats only describe your strategy once your discipline is consistent.'});
  }

  // 2. Losses bigger than planned
  const losers = J.filter(t=>t.r<0), bigLosses = losers.filter(t=>t.r < -1.15);
  if(losers.length >= 3 && bigLosses.length/losers.length >= 0.2){
   const gaps = bigLosses.filter(t=>t.exitReason==='gap').length;
   out.push({p:2, tone:'warn', title:'Some losses are larger than your plan',
    text:`${bigLosses.length} of ${losers.length} losing trades lost more than 1.15R${gaps?`, ${gaps} of them from gaps through the stop`:''}. Average loss: ${fmtR(avg(losers.map(t=>t.r)))}.`,
    action: gaps ? 'Reduce size or stay flat into weekends and big news releases, where gaps happen.' : 'Check for widened stops or late exits. A planned loss should land close to -1R.'});
  }

  // 3. Cutting winners short
  const winners = J.filter(t=>t.r>0), earlyWins = winners.filter(t=>t.exitReason==='manual' && t.r < 1);
  if(winners.length >= 4 && earlyWins.length/winners.length >= 0.4){
   out.push({p:3, tone:'warn', title:'You may be cutting winners short',
    text:`${earlyWins.length} of ${winners.length} winning trades were closed by hand before reaching even 1R. Average win: ${fmtR(avg(winners.map(t=>t.r)))}.`,
    action:'For the next 10 winners, let the target or the stop decide. If you want to manage trades, write a rule (like a trailing stop) and journal it as its own setup.'});
  }

  // 4. Tilt: what happens right after a loss
  const afterLoss = [], afterWin = []; for(let i=1;i<n;i++) (J[i-1].r<0?afterLoss:afterWin).push(J[i]);
  if(afterLoss.length >= 4 && afterWin.length >= 3){
   const brL = afterLoss.filter(t=>!t.ruleAdherent).length/afterLoss.length, brW = afterWin.filter(t=>!t.ruleAdherent).length/afterWin.length;
   const riskL = avg(afterLoss.map(t=>t.riskPct||0)), riskW = avg(afterWin.map(t=>t.riskPct||0));
   if(brL - brW > 0.2 || riskL > riskW*1.2){
    out.push({p:2, tone:'warn', title:'Watch the trade after a loss',
     text:`After a loss, you broke a rule ${pct(brL)} of the time and risked ${riskL.toFixed(2)}% on average. After a win: ${pct(brW)} and ${riskW.toFixed(2)}%.`,
     action:'After any loss, take a 15-minute break and reread your plan before the next trade. Revenge trades rarely follow rules.'});
   }
  }

  // 5. Best and worst setups (need samples)
  const setups = Object.entries(byKey(J,t=>t.setup||'Unlabeled')).filter(([,l])=>l.length>=5).map(([k,l])=>({k,n:l.length,e:avg(l.map(t=>t.r))})).sort((a,b)=>b.e-a.e);
  if(setups.length >= 2){
   const best = setups[0], worst = setups[setups.length-1];
   if(best.e - worst.e > 0.3) out.push({p:4, tone:'info', title:'Your setups are not equal',
    text:`${best.k} averages ${fmtR(best.e)} over ${best.n} trades. ${worst.k} averages ${fmtR(worst.e)} over ${worst.n}.`,
    action: worst.e < 0 ? `Pause ${worst.k} and put those reps into ${best.k} until you have 30 more trades of it.` : `Keep both, but favor ${best.k} and look for what separates its best trades.`});
  }

  // 6. Markets
  const markets = Object.entries(byKey(J,t=>t.symbol)).filter(([,l])=>l.length>=5).map(([k,l])=>({k,n:l.length,e:avg(l.map(t=>t.r))}));
  const badMkt = markets.filter(m=>m.e < -0.2).sort((a,b)=>a.e-b.e)[0];
  if(badMkt && markets.length>=2) out.push({p:5, tone:'info', title:`${badMkt.k} is costing you`,
   text:`${badMkt.n} trades on ${badMkt.k} average ${fmtR(badMkt.e)}.`, action:`Take ${badMkt.k} off your list for the next block of 20 trades, or study 10 replay drills on it without trading.`});

  // 7. Direction bias
  const longs = J.filter(t=>t.side==='long'), shorts = J.filter(t=>t.side==='short');
  if(longs.length>=5 && shorts.length>=5){
   const el=avg(longs.map(t=>t.r)), es=avg(shorts.map(t=>t.r));
   if(Math.abs(el-es) > 0.4) out.push({p:6, tone:'info', title:`You trade ${el>es?'longs':'shorts'} better`,
    text:`Longs average ${fmtR(el)} over ${longs.length} trades. Shorts average ${fmtR(es)} over ${shorts.length}.`,
    action:`Look at your ${el>es?'short':'long'} losers. Are they against the bigger trend? Consider trading only with the trend for a block of trades.`});
  }

  // 8. Risk creep
  const over = J.filter(t=>(t.riskPct||0) > 1);
  if(over.length/n >= 0.15) out.push({p:3, tone:'warn', title:'Risk is creeping above 1%',
   text:`${over.length} of ${n} trades risked more than 1% of the account.`, action:'Set the risk selector to 1% or lower and leave it there for the next 20 trades.'});

  // 9. Positive reinforcement and sample-size honesty
  const e = avg(J.map(t=>t.r));
  if(!out.some(f=>f.tone==='warn')) out.push({p:7, tone:'good', title:'Clean execution so far',
   text:`Rules followed on ${pct(adh)} of trades, with expectancy of ${fmtR(e)} over ${n}.`, action:'Keep the process the same. Change nothing until your next 20-trade review.'});
  if(n < 30) out.push({p:8, tone:'info', title:'Small sample', text:`${n} trades is still a small sample. Patterns here are hints, not proof.`, action:'Keep going to 30, then 100. The picture sharpens fast.'});

  return {n, expectancy:e, adherence:adh, findings:out.sort((a,b)=>a.p-b.p).slice(0,5)};
 }

 const api={review};
 if(typeof window!=='undefined')window.DojoCoach=api;
 if(typeof globalThis!=='undefined')globalThis.DojoCoach=api;
})();
