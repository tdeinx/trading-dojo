/* Server-side quote relay for the practice lab.
   Browsers can't call the quote provider directly (it blocks cross-site requests),
   so the simulator asks this function instead. Read-only, no keys, short cache. */
const SYMBOL=/^[A-Z0-9^][A-Z0-9.=^-]{0,14}$/;
const MAX=24;

export async function fetchQuote(symbol,fetchImpl=fetch){
 const url=`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1m&range=1d`;
 try{
  const res=await fetchImpl(url,{headers:{'User-Agent':'Mozilla/5.0 (TradingDojo practice lab)','Accept':'application/json'},signal:AbortSignal.timeout(7000)});
  if(!res.ok)return null;
  const data=await res.json();const meta=data?.chart?.result?.[0]?.meta;
  const price=meta?.regularMarketPrice??meta?.previousClose;
  if(!Number.isFinite(price)||price<=0)return null;
  const prevClose=meta.chartPreviousClose??meta.previousClose??price;
  const closes=(data.chart.result[0].indicators?.quote?.[0]?.close||[]).filter(Number.isFinite).slice(-90);
  return {price,prevClose,closes,time:meta.regularMarketTime?new Date(meta.regularMarketTime*1000).toISOString():null,currency:meta.currency||null};
 }catch{return null;}
}

export async function handle(request,fetchImpl=fetch){
 const url=new URL(request.url);
 const symbols=[...new Set((url.searchParams.get('symbols')||'').split(',').map(s=>s.trim().toUpperCase()).filter(Boolean))];
 if(!symbols.length||symbols.length>MAX||!symbols.every(s=>SYMBOL.test(s)))
  return Response.json({error:`Pass 1 to ${MAX} symbols, e.g. ?symbols=AAPL,EURUSD=X`},{status:400});
 const entries=await Promise.all(symbols.map(async s=>[s,await fetchQuote(s,fetchImpl)]));
 return Response.json({quotes:Object.fromEntries(entries),fetched:new Date().toISOString()},{headers:{'Cache-Control':'public, max-age=10'}});
}

export default request=>handle(request);
