import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const dir=new URL('../tracks/',import.meta.url);
const reg={window:{}};vm.runInNewContext(fs.readFileSync(new URL('index.js',dir),'utf8'),reg);
let total=0;
for(const meta of reg.window.DOJO_TRACKS){
 const file=new URL(meta.id+'.js',dir);
 if(!meta.ready){continue;}
 assert.ok(fs.existsSync(file),`ready track ${meta.id} needs tracks/${meta.id}.js`);
 const src=fs.readFileSync(file,'utf8');
 assert.ok(!/[—]|--/.test(src),`${meta.id}: no em dashes or double dashes in course copy`);
 const ctx={window:{}};vm.runInNewContext(src,ctx);const T=ctx.window.DOJO_TRACK;
 assert.equal(T.id,meta.id);assert.equal(T.parts.length,5,`${meta.id}: five parts`);
 const ids=new Set();let n=0;
 for(const p of T.parts)for(const l of p.lessons){
  n++;assert.ok(!ids.has(l.id),`duplicate lesson id ${l.id}`);ids.add(l.id);
  assert.ok(l.blocks.length,`${l.id} has content`);assert.ok(l.quiz.length>=4,`${l.id} has 4+ questions`);
  for(const q of l.quiz){assert.ok(q.correct>=0&&q.correct<q.opts.length,`${l.id}: answer index`);assert.ok(q.why,`${l.id}: explanation`);}
  for(const b of l.blocks){if(b.drill){assert.ok(['5m','15m','1h','1d'].includes(b.drill.interval));assert.ok(b.drill.rules.length);}
   if(b.decision)assert.equal(b.decision.opts.filter(o=>o.ok).length,1,`${l.id}: one right decision`);}
 }
 assert.equal(n,meta.lessons,`${meta.id}: registry lesson count matches`);total+=n;
}
console.log(`PASS: ${total} track lessons validated (structure, answers, decisions, drills, no em dashes).`);
