import assert from 'node:assert/strict';
import {handle} from '../netlify/functions/quote.mjs';
const calls=[];
const fake=async url=>{calls.push(url);
 if(url.includes('BAD'))return {ok:false,json:async()=>({})};
 if(url.includes('THROW'))throw new Error('network');
 return {ok:true,json:async()=>({chart:{result:[{meta:{regularMarketPrice:url.includes('GC%3DF')?2412.5:101.25,chartPreviousClose:100,regularMarketTime:1763000000,currency:'USD'},indicators:{quote:[{close:[99,null,100.5,101.25]}]}}]}})};
};
let res=await handle(new Request('https://x/.netlify/functions/quote?symbols=aapl,GC=F,BAD,THROW,AAPL'),fake);
assert.equal(res.status,200);
const body=await res.json();
assert.deepEqual(Object.keys(body.quotes),['AAPL','GC=F','BAD','THROW'],'uppercased and de-duplicated');
assert.equal(body.quotes.AAPL.price,101.25);assert.equal(body.quotes['GC=F'].price,2412.5);assert.equal(body.quotes.AAPL.prevClose,100);
assert.deepEqual(body.quotes.AAPL.closes,[99,100.5,101.25],'intraday closes skip gaps');assert.equal(body.quotes.BAD,null);assert.equal(body.quotes.THROW,null,'provider failures return null, never crash');
assert.equal(calls.length,4);
for(const bad of ['','?symbols=','?symbols=../../etc','?symbols=A%20B','?symbols='+Array.from({length:30},(_,i)=>'X'+i).join(',')]){
 res=await handle(new Request('https://x/q'+bad),fake);assert.equal(res.status,400,`rejects ${bad}`);
}
console.log('PASS: quote relay batches, normalizes, rejects bad symbols and survives provider failures.');
