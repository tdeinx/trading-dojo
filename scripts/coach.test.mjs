import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(new URL('../coach.js',import.meta.url),'utf8'),ctx);
const C=ctx.window.DojoCoach;
let t0=Date.parse('2026-01-01');
const mk=(r,o={})=>({r,pnl:r*100,ruleAdherent:true,riskPct:1,side:'long',symbol:'EUR/USD',setup:'Trend pullback',exitReason:r>0?'target':'stop',closed:new Date(t0+=3600e3).toISOString(),...o});
const titles=j=>C.review(j).findings.map(f=>f.title);

assert.equal(C.review([mk(1)]).findings[0].title,'Not enough trades yet');
// clean journal -> positive note
let j=[mk(2),mk(-1),mk(2),mk(-1),mk(2),mk(2),mk(-1)];
assert.ok(titles(j).includes('Clean execution so far'));
// rule breaks
j=[mk(2),mk(-1),mk(-1.5,{ruleAdherent:false,riskPct:2}),mk(-1,{ruleAdherent:false}),mk(2),mk(-1,{ruleAdherent:false}),mk(1)];
assert.equal(C.review(j).findings[0].title,'Rule breaks are muddying your results');
// big losses from gaps
j=[mk(-1),mk(-2,{exitReason:'gap'}),mk(-1),mk(-1.8,{exitReason:'gap'}),mk(2),mk(2)];
const big=C.review(j).findings.find(f=>f.title==='Some losses are larger than your plan');assert.ok(big&&/gaps/.test(big.text));
// cutting winners
j=[mk(0.4,{exitReason:'manual'}),mk(0.5,{exitReason:'manual'}),mk(0.3,{exitReason:'manual'}),mk(2),mk(-1),mk(-1)];
assert.ok(titles(j).includes('You may be cutting winners short'));
// tilt after losses
j=[];for(let i=0;i<5;i++){j.push(mk(2));j.push(mk(-1));j.push(mk(-1,{ruleAdherent:false,riskPct:2}));}
assert.ok(titles(j).includes('Watch the trade after a loss'));
// setups compared
j=[];for(let i=0;i<6;i++){j.push(mk(i%2?2:-1,{setup:'Breakout'}));j.push(mk(-1,{setup:'Range fade'}));}
const s=C.review(j).findings.find(f=>f.title==='Your setups are not equal');assert.ok(s&&/Pause Range fade/.test(s.action));
// only top 5, sorted by priority
assert.ok(C.review(j).findings.length<=5);
const ps=[...C.review(j).findings.map(f=>f.p)];assert.equal(JSON.stringify(ps),JSON.stringify([...ps].sort((a,b)=>a-b)));
// ignores entries without numeric R
assert.equal(C.review([{r:NaN},{},mk(1)]).n,1);
console.log('PASS: Sensei flags rule breaks, oversized losses, gaps, cut winners, tilt, setup and market gaps, and stays quiet on thin samples.');
