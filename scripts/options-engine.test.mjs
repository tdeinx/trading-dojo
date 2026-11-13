import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(new URL('../options-engine.js',import.meta.url),'utf8'),ctx);
const O=ctx.window.DojoOptions;const near=(a,b,e=1e-3,m)=>assert.ok(Math.abs(a-b)<e,m||`${a} vs ${b}`);

// Textbook values: S=100 K=100 T=1 sigma=0.2 r=0.05
const c=O.price('call',100,100,1,0.2,0.05),p=O.price('put',100,100,1,0.2,0.05);
near(c.price,10.4506,2e-3);near(p.price,5.5735,2e-3);
near(c.delta,0.6368,2e-3);near(p.delta,-0.3632,2e-3);near(c.gamma,0.01876,2e-4);near(c.vega,0.3752,2e-3);
// put-call parity: C - P = S - K e^{-rT}
near(c.price-p.price,100-100*Math.exp(-0.05),2e-3);
// theta negative for long options; call theta per day ~ -6.414/365
assert.ok(c.theta<0&&p.theta<0);near(c.theta,-6.414/365,3e-3);
// expiry -> intrinsic
assert.equal(O.price('call',105,100,0,0.2).price,5);assert.equal(O.price('put',105,100,0,0.2).price,0);
// more time and more vol make options worth more
assert.ok(O.price('call',100,100,0.5,0.3).price>O.price('call',100,100,0.1,0.3).price);
assert.ok(O.price('put',100,100,0.5,0.4).price>O.price('put',100,100,0.5,0.2).price);

// Spreads: bull call 100/110 paid 4.00 => max loss 400, max gain 600, breakeven 104
const legs=[{type:'call',strike:100,qty:1,entry:6},{type:'call',strike:110,qty:-1,entry:2}];
assert.equal(O.entryCost(legs),400);
let rp=O.riskProfile(legs);near(rp.maxLoss,-400);near(rp.maxGain,600);assert.deepEqual([...rp.breakevens],[104]);
// Long call: max loss = premium, unlimited gain
rp=O.riskProfile([{type:'call',strike:100,qty:1,entry:3}]);near(rp.maxLoss,-300);assert.equal(rp.maxGain,Infinity);
// Naked short call: unlimited loss
assert.equal(O.riskProfile([{type:'call',strike:100,qty:-1,entry:3}]).maxLoss,-Infinity);
// Iron condor credit 1.00 with 5-wide wings => max loss 400, two breakevens
rp=O.riskProfile([{type:'put',strike:90,qty:1,entry:0.5},{type:'put',strike:95,qty:-1,entry:1},{type:'call',strike:105,qty:-1,entry:1},{type:'call',strike:110,qty:1,entry:0.5}]);
near(rp.maxLoss,-400);near(rp.maxGain,100);assert.equal(rp.breakevens.length,2);near(rp.breakevens[0],94);near(rp.breakevens[1],106);

// Every built-in strategy is defined risk
for(const [k,s] of Object.entries(O.STRATEGIES)){
 const L=s.build(100,O.strikeStep(100)).map(l=>({...l,entry:O.price(l.type,100,l.strike,30/365,0.25).price}));
 assert.ok(Number.isFinite(O.riskProfile(L).maxLoss),`${k} must have a finite max loss`);
}
// Position value at T=0 equals expiry payoff plus cost
near(O.positionValue(legs,107,0,0.2).value-O.entryCost(legs),O.payoffAtExpiry(legs,107));
// Historical vol of a 1%/day alternating series ~ 0.01*sqrt(252)
const closes=[100];for(let i=0;i<60;i++)closes.push(closes[i]*(i%2?0.99:1.01));
near(O.histVol(closes),0.01*Math.sqrt(252),0.01);
console.log('PASS: options engine prices, Greeks, parity, spreads, condors, breakevens, defined risk and volatility.');
