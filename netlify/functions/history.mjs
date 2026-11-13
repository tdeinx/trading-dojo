/* Historical candles for replay drills. Read-only relay, cached for an hour. */
const SYMBOL=/^[A-Z0-9^][A-Z0-9.=^-]{0,14}$/;
const RANGES={'5m':'60d','15m':'60d','1h':'730d','1d':'5y'};
const MAX_BARS=4000; // keeps responses light on phones while leaving months of variety

const rd=v=>Number(v.toPrecision(7));
export function toBars(data){
 const r=data?.chart?.result?.[0];const t=r?.timestamp||[];const q=r?.indicators?.quote?.[0]||{};
 const bars=[];
 for(let i=0;i<t.length;i++){
  const o=q.open?.[i],h=q.high?.[i],l=q.low?.[i],c=q.close?.[i];
  if([o,h,l,c].every(Number.isFinite)&&h>=l)bars.push({t:t[i]*1000,o:rd(o),h:rd(Math.max(h,o,c)),l:rd(Math.min(l,o,c)),c:rd(c)});
 }
 return bars;
}

export async function handle(request,fetchImpl=fetch){
 const url=new URL(request.url);
 const symbol=(url.searchParams.get('symbol')||'').trim().toUpperCase();
 const interval=url.searchParams.get('interval')||'5m';
 if(!SYMBOL.test(symbol)||!RANGES[interval])return Response.json({error:'Pass symbol and interval (5m, 15m, 1h or 1d).'},{status:400});
 try{
  const res=await fetchImpl(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${RANGES[interval]}`,
   {headers:{'User-Agent':'Mozilla/5.0 (TradingDojo replay)','Accept':'application/json'},signal:AbortSignal.timeout(9000)});
  if(!res.ok)return Response.json({error:'History unavailable right now.'},{status:502});
  const bars=toBars(await res.json()).slice(-MAX_BARS);
  if(!bars.length)return Response.json({error:'No history returned.'},{status:502});
  return Response.json({symbol,interval,bars},{headers:{'Cache-Control':'public, max-age=3600'}});
 }catch{return Response.json({error:'History unavailable right now.'},{status:502});}
}

export default request=>handle(request);
