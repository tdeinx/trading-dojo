import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const context={window:{}};vm.createContext(context);
for(const file of ['academy-data.js','learning-path.js'])vm.runInContext(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8'),context);
const modules=context.window.ACADEMY_MODULES,path=context.window.DojoPath;
const empty=()=>modules.map(()=>({}));
for(const id of [undefined,'','__proto__','bonds'])assert.equal(path.nextActivity(modules,empty(),id).needsChoice,true);
const expected={stocks:0,options:1,futures:4,forex:3,crypto:2};
for(const [id,index] of Object.entries(expected)){
 const result=path.nextActivity(modules,empty(),id);assert.equal(result.needsChoice,false);assert.equal(result.moduleIndex,0);assert.equal(result.lessonIndex,index);
 const saved=JSON.parse(JSON.stringify({instrument:id}));assert.equal(path.nextActivity(modules,empty(),saved.instrument).lessonIndex,index);
 const states=empty();states[0]={completed:{[index]:0},totalXP:0};assert.equal(path.nextActivity(modules,states,id).moduleIndex,1,'A finished selected market moves forward even with zero quiz points');
 assert.equal(Object.keys(states[0].completed).length,1,'Choosing a market must not erase other lesson history');
}
const states=empty();states[0]={completed:{1:5,3:2}};states[1]={completed:{0:5}};assert.equal(path.nextActivity(modules,states,'options').lessonIndex,1);assert.equal(path.nextActivity(modules,states,'crypto').lessonIndex,2);
states[1]={completed:Object.fromEntries(modules[1].lessons.map((_,i)=>[i,5]))};assert.equal(path.nextActivity(modules,states,'options').moduleIndex,2);states[2]={quizScore:0};assert.equal(path.nextActivity(modules,states,'options').moduleIndex,3,'A submitted platform quiz with zero score is still a finished activity');
for(const i of [3,4])states[i]={completed:Object.fromEntries(modules[i].lessons.map((_,j)=>[j,5]))};states[5]={traderDNA:'sniper'};assert.equal(path.nextActivity(modules,states,'options').moduleIndex,6);assert.equal(modules[6].detail,'Stocks, forex & gold · Stop & target required','Do not imply options/futures/crypto simulation exists');
assert.ok(modules.every(m=>typeof m.level==='string'&&m.level.length));
console.log('PASS: five instrument routes, remembered preference, invalid preference, zero-score completion, shared-course continuation, preserved history and truthful simulator scope.');
