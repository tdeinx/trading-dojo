import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const ctx={window:{}};ctx.globalThis=ctx;vm.createContext(ctx);
for(const f of ['risk-engine.js','options-engine.js','figures.js','tracks/figures.js'])vm.runInContext(fs.readFileSync(new URL(f,root),'utf8'),ctx);
const F=ctx.window.DojoFigures, MAP=ctx.window.DOJO_FIGURES;
// lessons and anchors exist
const lessons={};for(const f of fs.readdirSync(new URL('tracks/',root))){if(['index.js','figures.js'].includes(f))continue;const c={window:{}};vm.runInNewContext(fs.readFileSync(new URL('tracks/'+f,root),'utf8'),c);for(const p of c.window.DOJO_TRACK.parts)for(const l of p.lessons)lessons[l.id]=l;}
let n=0,setups=0;const report=[];
for(const [id,list] of Object.entries(MAP)){
 const l=lessons[id];assert.ok(l,`figure lesson ${id} exists`);
 for(const {at,fig} of list){
  n++;
  if(at.startsWith('before:')){const t=at.slice(7);assert.ok(l.blocks.some(b=>b[t]),`${id}: has a ${t} block for ${at}`);}
  else if(!['start','end'].includes(at))assert.ok(l.blocks.some(b=>b.h===at),`${id}: heading "${at}" exists`);
  const out=F.render(fig);assert.ok(/<svg|data-calc/.test(out.html),`${id}: ${fig.type} renders`);
  assert.ok(!/NaN|undefined|Infinity/.test(out.html.replace(/unlimited/g,'')),`${id}: ${fig.type} has no NaN/undefined in output`);
  if(fig.type==='setup'){setups++;const w=out.results.works,f=out.results.fails;
   report.push(`${id}: works ${w.exit?.reason} ${w.r?.toFixed(2)}R | fails ${f.exit?.reason} ${f.r?.toFixed(2)}R | rr ${w.rr?.toFixed(2)}`);
   assert.equal(w.exit?.reason,'target',`${id}: works panel must reach target`);
   assert.ok(['stop','gap'].includes(f.exit?.reason),`${id}: fails panel must hit the stop`);
   assert.ok(f.r<=-0.99,`${id}: fails loses at least 1R`);}
  if(fig.type==='optionSetup'){setups++;const r=out.results;report.push(`${id}: works ${r.works.pnl.toFixed(0)} fails ${r.fails.pnl.toFixed(0)}`);
   assert.ok(r.works.pnl>0,`${id}: option works panel profits`);assert.ok(r.fails.pnl<0,`${id}: option fails panel loses`);}
 }
}
// calculators compute sensibly
const s=F.sizeCompute({market:'EUR/USD',equity:10000,risk:1,entry:1.085,stop:1.083});assert.equal(s.lots,50);
const m=F.sizeCompute({market:'MES',equity:10000,risk:1,entry:5800,stop:5790});assert.equal(m.lots,2);
const lv=F.leverageCompute({equity:1000,lev:500,lots:1});assert.equal(Math.round(lv.wipe),100);
const ex=F.expectancyCompute({win:90,aw:0.1,al:1});assert.ok(ex.e<0);
const op=F.optionCompute({type:'call',strike:100,spot:100,days:30,iv:30});assert.ok(op.price>0&&op.theta<0);
if(process.argv.includes('-v'))console.log(report.join('\n'));
console.log(`PASS: ${n} lesson figures render; ${setups} setup diagrams simulate correctly (works hits target, fails hits stop); calculators verified.`);
