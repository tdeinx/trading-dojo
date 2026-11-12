(() => {
 const read=key=>{try{const value=JSON.parse(localStorage.getItem(key)||'{}');return value&&typeof value==='object'?value:{};}catch{return {};}};
 const modules=window.ACADEMY_MODULES;
 const states=modules.map(m=>read(m.storage));
 const completed=(m,s)=>m.kind==='lessons'?Object.keys(s.completed||{}).filter(k=>/^\d+$/.test(k)&&Number(k)<m.lessons.length).length:m.kind==='platforms'?(s.quizScore!=null?1:0):m.kind==='dna'?(s.traderDNA?1:0):0;
 const totalXP=states.slice(0,6).reduce((sum,s,i)=>sum+Math.max(0,Number(i===5?s.xp:s.totalXP)||0),0);
 const rank=window.DojoEngine.getRank(totalXP), nextRank=window.DojoEngine.getNextRank(totalXP);
 document.getElementById('dash-rank').textContent=rank.name;
 document.getElementById('dash-xp').textContent=totalXP.toLocaleString()+' XP';
 document.getElementById('dash-completed').textContent=modules.reduce((n,m,i)=>n+(m.kind==='lessons'?completed(m,states[i]):0),0)+' / 22';
 const rankProgress=Math.round(window.DojoEngine.getRankProgress(totalXP));
 document.getElementById('rank-fill').style.width=rankProgress+'%';document.getElementById('rank-track').setAttribute('aria-valuenow',rankProgress);
 document.getElementById('rank-caption').textContent=nextRank?`${totalXP.toLocaleString()} / ${nextRank.minXP.toLocaleString()} XP to ${nextRank.name}`:'Sensei rank achieved. Keep sharpening your process.';
 const nextIndex=modules.findIndex((m,i)=>m.kind!=='sim'&&completed(m,states[i])<(m.kind==='lessons'?m.lessons.length:1));
 const next=modules[nextIndex<0?6:nextIndex];const s=states[nextIndex]||{};
 const lessonIdx=next.kind==='lessons'?next.lessons.findIndex((_,idx)=>!Object.hasOwn(s.completed||{},idx)):0;
 const started=states.some(s=>Number(s.totalXP)>0||Number(s.xp)>0||Object.keys(s.completed||{}).length>0);
 document.getElementById('next-module').textContent='Up next / '+next.short;
 document.getElementById('next-title').textContent=next.kind==='lessons'?next.lessons[Math.max(0,lessonIdx)]:next.name;
 document.getElementById('next-desc').textContent=next.description;
 document.getElementById('continue-link').href=next.href+(next.kind==='lessons'?'?lesson='+Math.max(0,lessonIdx):'');
 document.getElementById('continue-label').textContent=started?'Continue training':'Start learning';
 document.getElementById('next-detail').textContent=next.kind==='lessons'?`Lesson ${Math.max(0,lessonIdx)+1} of ${next.lessons.length} · Knowledge check included`:next.detail;
 const list=document.getElementById('dashboard-modules');
 modules.forEach((m,i)=>{
  const done=completed(m,states[i]);const max=m.kind==='lessons'?m.lessons.length:1;
  const status=m.kind==='sim'?'Practice':done>=max?'Complete':done>0?'In progress':i===nextIndex?'Up next':'Explore';
  const a=document.createElement('a');a.className='module-row';a.href=m.href;
  // Module strings are authored curriculum data; saved user values are assigned with textContent below.
  a.innerHTML=`<span class="module-num">${String(i+1).padStart(2,'0')}</span><div><span class="module-name">${m.name}</span><p class="module-desc">${m.description}</p><p class="module-meta">${m.detail}</p></div><span class="module-status ${status==='Complete'?'complete':status==='Up next'?'next':status==='In progress'?'in-progress':''}">${status}</span>`;
  list.appendChild(a);
 });
 if(states[5].traderDNA){const el=document.getElementById('dna-result');el.hidden=false;const names={sniper:'The Sniper',momentum:'The Momentum Rider',strategist:'The Strategist',quant:'The Quant',hodler:'The Hodler',degen:'The Degen'};el.textContent=names[states[5].traderDNA]||String(states[5].traderDNA);document.getElementById('dna-link').textContent='Revisit your Trader DNA →';}
})();
