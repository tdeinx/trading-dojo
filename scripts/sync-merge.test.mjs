import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(new URL('../sync-merge.js',import.meta.url),'utf8'),ctx);
const S=ctx.window.DojoSync;
const sim=(o)=>JSON.stringify({version:2,cash:10000,positions:{},journal:[],badges:{},totalTrades:0,realizedPnL:0,...o});
const tr=(id,pnl,closed,extra={})=>({id,pnl,r:pnl/100,closed,...extra});

// one side only -> taken as is; unrelated keys ignored
let m=S.merge({keys:{dojo_risk:{v:'{"a":1}',t:5},dojo_theme_v1:{v:'dark',t:9}}},null);
assert.equal(m.keys.dojo_risk.v,'{"a":1}');assert.equal(m.keys.dojo_theme_v1,undefined,'device prefs are not synced');assert.equal(m.changedRemote,true);
// newer wins for plain module progress
m=S.merge({keys:{dojo_state:{v:'old',t:1}}},{keys:{dojo_state:{v:'new',t:2}}});
assert.equal(m.keys.dojo_state.v,'new');assert.equal(m.changedLocal,true);assert.equal(m.changedRemote,false);
// journals from two devices are combined, cash recomputed from live trades only
const a=sim({journal:[tr('t1',200,'2026-11-10T10:00:00Z'),tr('r1',-100,'2026-11-10T11:00:00Z',{source:'replay'})],badges:{first_trade:true},positions:{p1:{id:'p1'}}});
const b=sim({journal:[tr('t2',-100,'2026-11-11T10:00:00Z'),tr('t1',200,'2026-11-10T10:00:00Z')],badges:{first_loss:true}});
m=S.merge({keys:{dojo_sim:{v:a,t:10}}},{keys:{dojo_sim:{v:b,t:20}}});
const out=JSON.parse(m.keys.dojo_sim.v);
assert.deepEqual(out.journal.map(t=>t.id),['t2','r1','t1'],'union, newest first, no duplicates');
assert.equal(out.cash,10100,'10000 + 200 - 100 from live trades; replay excluded');
assert.ok(out.badges.first_trade&&out.badges.first_loss,'badges combined');
assert.deepEqual(Object.keys(out.positions),[],'open positions come from the newer device');
// a reset on one device is respected: older trades do not come back
const reset=sim({resetAt:Date.parse('2026-11-12T00:00:00Z'),journal:[tr('t9',50,'2026-11-12T09:00:00Z')]});
m=S.merge({keys:{dojo_sim:{v:a,t:10}}},{keys:{dojo_sim:{v:reset,t:30}}});
const o2=JSON.parse(m.keys.dojo_sim.v);
assert.deepEqual(o2.journal.map(t=>t.id),['t9']);assert.equal(o2.cash,10050);assert.deepEqual({...o2.badges},{},'badges cleared by reset stay cleared');
// track lessons: completed on either device, best score kept
m=S.merge({keys:{dojo_track_forex:{v:'{"done":{"fx-a":0.8,"fx-b":1}}',t:1}}},{keys:{dojo_track_forex:{v:'{"done":{"fx-a":1,"fx-c":0.8}}',t:2}}});
assert.deepEqual({...JSON.parse(m.keys.dojo_track_forex.v).done},{'fx-a':1,'fx-b':1,'fx-c':0.8});
// identical values -> nothing to change
m=S.merge({keys:{dojo_risk:{v:'x',t:1}}},{keys:{dojo_risk:{v:'x',t:3}}});assert.equal(m.changedLocal,false);assert.equal(m.changedRemote,false);
// corrupt remote sim never wipes local
m=S.merge({keys:{dojo_sim:{v:a,t:1}}},{keys:{dojo_sim:{v:'{broken',t:9}}});assert.equal(m.keys.dojo_sim.v,a);
console.log('PASS: sync merge combines journals, badges and lessons, respects resets, recomputes cash and never syncs device prefs.');
