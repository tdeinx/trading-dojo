(() => {
 const read=key=>{try{const value=JSON.parse(localStorage.getItem(key)||'{}');return value&&typeof value==='object'?value:{};}catch{return {};}};
 const modules=window.ACADEMY_MODULES,states=modules.map(m=>read(m.storage)),path=window.DojoPath;
 let preference=read('dojo_learning_path').instrument;
 const completed=(m,s)=>m.kind==='lessons'?m.lessons.filter((_,i)=>path.lessonDone(s,i)).length:m.kind==='platforms'?(s.quizScore!=null?1:0):m.kind==='dna'?(s.traderDNA?1:0):0;
 const totalXP=states.slice(0,6).reduce((sum,s,i)=>{const n=Number(i===5?s.xp:s.totalXP);return sum+(Number.isFinite(n)?Math.max(0,n):0);},0);
 const rank=window.DojoEngine.getRank(totalXP),nextRank=window.DojoEngine.getNextRank(totalXP);
 document.getElementById('dash-rank').textContent=rank.name;
 document.getElementById('dash-xp').textContent=totalXP.toLocaleString()+' XP';
 document.getElementById('dash-completed').textContent=modules.reduce((n,m,i)=>n+(m.kind==='lessons'?completed(m,states[i]):0),0)+' / 22';
 const rankProgress=Math.round(window.DojoEngine.getRankProgress(totalXP));
 document.getElementById('rank-fill').style.width=rankProgress+'%';document.getElementById('rank-track').setAttribute('aria-valuenow',rankProgress);
 document.getElementById('rank-caption').textContent=nextRank?`${totalXP.toLocaleString()} / ${nextRank.minXP.toLocaleString()} XP to ${nextRank.name}`:'Sensei rank achieved. Keep sharpening your process.';
 const choices=document.getElementById('market-options');
 choices.innerHTML=path.instruments.map(i=>`<button type="button" class="market-option" data-instrument="${i.id}" aria-pressed="false"><strong>${i.name}</strong><span>Foundation lesson</span><span class="market-check" aria-hidden="true">↗</span></button>`).join('');
 const render=()=>{
  const route=path.nextActivity(modules,states,preference),selected=route.selected,next=modules[route.moduleIndex];
  document.querySelectorAll('[data-instrument]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.instrument===selected?.id)));
  document.getElementById('market-selection').textContent=selected?`Your starting market: ${selected.name}. You can switch anytime.`:'Pick the instrument you want to learn first. The rest of the academy stays open.';
  document.getElementById('next-module').textContent=route.needsChoice?'Your first rep / You choose':`Up next / ${next.short} · ${next.level}`;
  document.getElementById('next-title').textContent=route.needsChoice?'Start with your market.':next.kind==='lessons'?next.lessons[route.lessonIndex]:next.name;
  document.getElementById('next-desc').textContent=route.needsChoice?'Stocks, options, futures, forex or crypto. Choose your starting point above.':route.moduleIndex===0?selected.description:next.description;
  document.getElementById('continue-link').href=route.needsChoice?'#market-choice':next.href+(route.lessonIndex!==null?'?lesson='+route.lessonIndex:'');
  document.getElementById('continue-label').textContent=route.needsChoice?'Choose a market':route.moduleIndex===0?`Learn ${selected.name}`:'Continue training';
  document.getElementById('next-detail').textContent=route.needsChoice?'5 instruments · Switch whenever you want':route.moduleIndex===0?'Your chosen foundation lesson · 5-question knowledge check':next.kind==='lessons'?`Lesson ${route.lessonIndex+1} of ${next.lessons.length} · ${selected.name} is your starting market`:next.detail;
  document.getElementById('welcome-copy').textContent=selected?`Start with ${selected.name.toLowerCase()}. Build your knowledge one lesson at a time.`:'Choose where your training begins. Build your knowledge one lesson at a time.';
  const list=document.getElementById('dashboard-modules');list.replaceChildren();
  modules.forEach((m,i)=>{
   const done=completed(m,states[i]),max=m.kind==='lessons'?m.lessons.length:1;
   let status=m.kind==='sim'?'Practice':done>=max?'Complete':done>0?'In progress':i===route.moduleIndex?'Up next':'Explore';
   let detail=`${m.level} · ${m.detail}`,href=m.href;
   if(i===0){status=selected?(path.lessonDone(states[0],selected.lesson)?'Your market complete':'Your market'):'Choose a market';href=selected?m.href+'?lesson='+selected.lesson:'#market-choice';detail=`${m.level} · ${selected?'Your market: '+selected.name+' · ':''}5 instrument lessons available`;}
   const a=document.createElement('a');a.className='module-row';a.href=href;
   a.innerHTML=`<span class="module-num">${String(i+1).padStart(2,'0')}</span><div><span class="module-name">${m.name}</span><p class="module-desc">${m.description}</p><p class="module-meta">${detail}</p></div><span class="module-status ${status.includes('complete')||status==='Complete'?'complete':i===route.moduleIndex?'next':''}">${status}</span>`;
   list.appendChild(a);
  });
 };
 choices.addEventListener('click',event=>{
  const button=event.target.closest('[data-instrument]');if(!button||!path.getInstrument(button.dataset.instrument))return;
  preference=button.dataset.instrument;let saved=true;
  try{localStorage.setItem('dojo_learning_path',JSON.stringify({instrument:preference}));}catch{saved=false;}
  render();document.getElementById('market-selection').textContent=`${path.getInstrument(preference).name} selected. `+(saved?'This browser will remember your choice.':'Your choice works for this visit; browser storage is unavailable.');
 });
 render();
 if(states[5].traderDNA){const el=document.getElementById('dna-result');el.hidden=false;const names={sniper:'The Sniper',momentum:'The Momentum Rider',strategist:'The Strategist',quant:'The Quant',hodler:'The Hodler',degen:'The Degen'};el.textContent=names[states[5].traderDNA]||String(states[5].traderDNA);document.getElementById('dna-link').textContent='Revisit your Trader DNA →';}
})();
