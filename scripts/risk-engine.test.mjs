import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(new URL('../risk-engine.js',import.meta.url),'utf8'),ctx);
const R=ctx.window.DojoRisk;
const near=(a,b,eps=1e-6,msg)=>assert.ok(Math.abs(a-b)<eps,msg||`${a} != ${b}`);

// Specs
const eu=R.spec('EUR/USD','forex'),uj=R.spec('USD/JPY','forex'),eg=R.spec('EUR/GBP','forex'),au=R.spec('XAU/USD','forex'),st=R.spec('AAPL','stocks');
assert.equal(eu.pip,0.0001);assert.equal(uj.pip,0.01);assert.equal(au.kind,'metal');assert.equal(st.kind,'stock');
near(eu.spread,0.0001);

// Value of a move: 1 micro lot EUR/USD is $0.10 per pip
near(R.usdPerUnitMove(eu,1.08)*eu.pip,0.10);
// USD/JPY micro lot at 150: 1000 * 0.01 / 150 = $0.0667 per pip
near(R.usdPerUnitMove(uj,150)*uj.pip,1000*0.01/150);
// EUR/GBP converts through GBP/USD
near(R.usdPerUnitMove(eg,0.85,1.27)*eg.pip,0.127);
// Gold: $1 per ounce per $1 move
assert.equal(R.usdPerUnitMove(au,2400),1);

// Plan validation
assert.equal(R.validatePlan({side:'long',entry:100,stop:NaN,target:110}).ok,false,'stop required');
assert.equal(R.validatePlan({side:'long',entry:100,stop:101,target:110}).ok,false,'long stop below entry');
assert.equal(R.validatePlan({side:'short',entry:100,stop:99,target:90}).ok,false,'short stop above entry');
assert.equal(R.validatePlan({side:'short',entry:100,stop:102,target:105}).ok,false,'short target below entry');
near(R.validatePlan({side:'long',entry:100,stop:98,target:106}).rr,3);

// Sizing: $10,000 at 1% = $100 risk. Stock with $2 stop distance = 50 shares.
let s=R.sizePosition({equity:10000,riskPct:1,entry:100,stop:98,usdPerMove:1});
assert.equal(s.lots,50);near(s.riskUSD,100);
// EUR/USD 20 pip stop at 1% of $10,000: $100 / ($0.10*20) = 50 micro lots
s=R.sizePosition({equity:10000,riskPct:1,entry:1.0800,stop:1.0780,usdPerMove:R.usdPerUnitMove(eu,1.08)});
assert.equal(s.lots,50);
// Gold $8 stop at 1%: 100/8 = 12 oz (rounded down, never up)
s=R.sizePosition({equity:10000,riskPct:1,entry:2400,stop:2392,usdPerMove:1});
assert.equal(s.lots,12);assert.ok(s.riskUSD<=100);
// Stop too wide for budget gives zero, not a forced minimum
assert.equal(R.sizePosition({equity:100,riskPct:1,entry:500,stop:400,usdPerMove:1}).lots,0);

// Fills include spread
near(R.entryFill(eu,'long',1.08),1.08005);near(R.entryFill(eu,'short',1.08),1.07995);

// Stops tighten only
const lp={side:'long',entry:100,stop:98,initialStop:98,target:106,lots:10};
assert.equal(R.canMoveStop(lp,97,101).ok,false,'cannot widen long stop');
assert.equal(R.canMoveStop(lp,99,101).ok,true);
assert.equal(R.canMoveStop(lp,102,101).ok,false,'long stop must sit below price');
const sp={side:'short',entry:100,stop:102,initialStop:102,target:94,lots:10};
assert.equal(R.canMoveStop(sp,103,99).ok,false);assert.equal(R.canMoveStop(sp,101,99).ok,true);

// Exits
assert.deepEqual({...R.checkExit(lp,97.9,98.5)},{reason:'stop',price:98});
assert.deepEqual({...R.checkExit(lp,96,99)},{reason:'gap',price:96},'big jump past stop fills at market');
assert.deepEqual({...R.checkExit(lp,106.2,105)},{reason:'target',price:106});
assert.equal(R.checkExit(lp,101,100),null);
assert.deepEqual({...R.checkExit(sp,102.1,101.5)},{reason:'stop',price:102});
assert.deepEqual({...R.checkExit(sp,93.5,95)},{reason:'target',price:94});

// P&L
near(R.pnlUSD(lp,98,1),-20);near(R.pnlUSD(sp,94,1),60);

// Rules
assert.deepEqual({...R.rulesAtEntry({riskPct:1,rr:2})},{stop:true,risk:true,rr:true});
assert.deepEqual({...R.rulesAtEntry({riskPct:2,rr:1.5})},{stop:true,risk:false,rr:false});

// Daily loss lock counts today's losses only
const now=new Date('2026-11-12T15:00:00').getTime();
const j=[{pnl:-10,closed:'2026-11-12T10:00:00'},{pnl:-10,closed:'2026-11-12T11:00:00'},{pnl:5,closed:'2026-11-12T12:00:00'},{pnl:-10,closed:'2026-11-11T11:00:00'}];
assert.equal(R.lossesToday(j,now),2);

// Stats and graduation
const journal=[];for(let i=0;i<100;i++)journal.push({pnl:i%2?-100:200,r:i%2?-1:2,ruleAdherent:i<95,closed:new Date(now+i*1000).toISOString()});
const st2=R.stats(journal);
assert.equal(st2.n,100);near(st2.winRate,0.5);near(st2.expectancy,0.5);near(st2.avgWinR,2);near(st2.avgLossR,-1);near(st2.profitFactor,2);near(st2.adherence,0.95);assert.equal(st2.grad.passed,true);
journal[0].ruleAdherent=false;for(let i=90;i<100;i++)journal[i].ruleAdherent=false;assert.equal(R.stats(journal).grad.passed,false,'adherence under 90% blocks graduation');
const dd=R.stats([{pnl:1,r:2,closed:'2026-01-01'},{pnl:-1,r:-1,closed:'2026-01-02'},{pnl:-1,r:-1,closed:'2026-01-03'},{pnl:1,r:1,closed:'2026-01-04'}]);near(dd.maxDrawdownR,2);
assert.equal(R.stats([]).n,0);assert.equal(R.stats([]).grad.passed,false);

console.log('PASS: risk engine sizing, brackets, spread fills, tighten-only stops, gap exits, daily loss lock, stats and graduation gate.');
