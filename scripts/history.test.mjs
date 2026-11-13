import assert from 'node:assert/strict';
import {handle,toBars} from '../netlify/functions/history.mjs';
const sample={chart:{result:[{timestamp:[1,2,3,4],indicators:{quote:[{open:[10,11,null,12],high:[11,12,13,11],low:[9,10,11,13],close:[10.5,11.5,12,12.5]}]}}]}};
const bars=toBars(sample);
assert.equal(bars.length,2,'drops bars with gaps and inverted high/low');
assert.deepEqual({...bars[0]},{t:1000,o:10,h:11,l:9,c:10.5});
let seen='';
const ok=async u=>{seen=u;return {ok:true,json:async()=>sample};};
let res=await handle(new Request('https://x/h?symbol=gc=f&interval=1h'),ok);
assert.equal(res.status,200);assert.ok(seen.includes('interval=1h&range=730d'));assert.ok(seen.includes('GC%3DF'));
assert.equal((await res.json()).bars.length,2);
for(const q of ['?symbol=AAPL&interval=1m','?symbol=../x&interval=5m','?interval=5m'])assert.equal((await handle(new Request('https://x/h'+q),ok)).status,400,q);
assert.equal((await handle(new Request('https://x/h?symbol=AAPL'),async()=>{throw new Error('x');})).status,502);
assert.equal((await handle(new Request('https://x/h?symbol=AAPL'),async()=>({ok:true,json:async()=>({})}))).status,502);
// caps very long histories to the most recent 4,000 candles
const many={chart:{result:[{timestamp:Array.from({length:5000},(_,i)=>i),indicators:{quote:[{open:Array(5000).fill(1),high:Array(5000).fill(2),low:Array(5000).fill(0.5),close:Array(5000).fill(1.5)}]}}]}};
const capped=await (await handle(new Request('https://x/h?symbol=BTC-USD&interval=1h'),async()=>({ok:true,json:async()=>many}))).json();
assert.equal(capped.bars.length,4000);assert.equal(capped.bars[3999].t,4999000,'keeps the most recent bars');
console.log('PASS: history relay builds clean candles, maps ranges, rejects bad input and fails safely.');
