/* Merges Dojo progress from two devices. Pure functions, no network or storage.
   A snapshot is {keys:{name:{v:string,t:ms}}}. Newer wins by default; the trade journal,
   badges and track lessons are combined so nothing earned on either device is lost. */
(() => {
 const SYNC_KEY = /^dojo_(state|styles|risk|platforms|instruments|charts|learning_path|sim|sim_watch|track_[a-z]+)$/;
 const START = 10000;
 const parse = s => { try { return JSON.parse(s); } catch(e){ return null; } };
 const tradeId = t => t.id || `${t.symbol}|${t.closed}|${t.entry}`;

 function mergeSim(a, b, ta, tb){
  const A=parse(a), B=parse(b);
  if(!A || A.version!==2) return b; if(!B || B.version!==2) return a;
  const newer = tb>ta ? B : A, older = newer===A ? B : A;
  const resetAt = Math.max(A.resetAt||0, B.resetAt||0);
  const byId = new Map();
  for(const t of [...(older.journal||[]), ...(newer.journal||[])]) byId.set(tradeId(t), t);
  const journal = [...byId.values()].filter(t => !resetAt || new Date(t.closed).getTime() >= resetAt)
   .sort((x,y) => new Date(y.closed) - new Date(x.closed));
  const live = journal.filter(t => !t.source && Number.isFinite(t.pnl));
  const realized = live.reduce((s,t)=>s+t.pnl,0);
  const badges = resetAt && (newer.resetAt||0) >= resetAt ? {...newer.badges} : {...older.badges, ...newer.badges};
  return JSON.stringify({...newer, journal, badges, resetAt: resetAt||undefined,
   cash: START + realized, realizedPnL: realized, totalTrades: Math.max(A.totalTrades||0, B.totalTrades||0, journal.length)});
 }

 function mergeTrack(a, b, ta, tb){
  const A=parse(a)||{}, B=parse(b)||{}, done={...(A.done||{})};
  for(const [k,v] of Object.entries(B.done||{})) done[k]=Math.max(done[k]||0, v);
  return JSON.stringify({...(tb>ta?B:A), done});
 }

 function merge(local, remote){
  const L=(local&&local.keys)||{}, Rm=(remote&&remote.keys)||{}, out={};
  for(const k of new Set([...Object.keys(L), ...Object.keys(Rm)])){
   if(!SYNC_KEY.test(k)) continue;
   const l=L[k], r=Rm[k];
   if(!l){ out[k]=r; continue; } if(!r){ out[k]=l; continue; }
   if(l.v===r.v){ out[k]={v:l.v, t:Math.max(l.t,r.t)}; continue; }
   const t=Math.max(l.t||0, r.t||0);
   if(k==='dojo_sim') out[k]={v:mergeSim(l.v,r.v,l.t||0,r.t||0), t};
   else if(k.startsWith('dojo_track_')) out[k]={v:mergeTrack(l.v,r.v,l.t||0,r.t||0), t};
   else out[k] = (r.t||0) > (l.t||0) ? r : l;
  }
  const changedLocal = Object.keys(out).some(k => !L[k] || L[k].v!==out[k].v);
  const changedRemote = Object.keys(out).some(k => !Rm[k] || Rm[k].v!==out[k].v);
  return {keys:out, changedLocal, changedRemote};
 }

 const api={merge, SYNC_KEY};
 if(typeof window!=='undefined') window.DojoSync=api;
 if(typeof globalThis!=='undefined') globalThis.DojoSync=api;
})();
