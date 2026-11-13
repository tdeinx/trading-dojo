/* Small enhancements to the existing academy. Lesson data and scoring stay in each module. */
document.addEventListener('DOMContentLoaded',()=>{
 if('serviceWorker' in navigator&&!['localhost','127.0.0.1'].includes(location.hostname))navigator.serviceWorker.register('/sw.js').catch(()=>{});
 const main=document.querySelector('.content-area,.entry-wrap,.terminal,#main,main');
 if(main){if(!main.id)main.id='main';main.setAttribute('role','main');const skip=document.createElement('a');skip.href='#'+main.id;skip.className='skip-link';skip.textContent='Skip to content';document.body.prepend(skip);}
 const bar=document.querySelector('.topbar');
 if(bar&&!document.body.classList.contains('page-dashboard')){
  const nav=document.createElement('nav');nav.className='academy-nav';nav.setAttribute('aria-label','Academy modules');
  const pages=[['dashboard.html','Dashboard'],['instruments.html','01 Instruments'],['styles.html','02 Styles'],['platforms.html','03 Platforms'],['charts-module.html','04 Charts'],['risk-module.html','05 Risk'],['dna-quiz.html','06 Trader DNA'],['sim-entry.html','07 Practice'],['tracks.html','08 Tracks']];
  const current=location.pathname.split('/').pop().replace('.html','');
  nav.innerHTML=pages.map(([url,label])=>`<a href="${url}"${(url.replace('.html','')===current||((current==='simulator'||current==='replay'||current==='options-lab')&&url==='sim-entry.html')||(current==='track'&&url==='tracks.html'))?' aria-current="page"':''}>${label}</a>`).join('');bar.after(nav);
 }
 // Existing div-based lesson selectors become keyboard accessible, including lazy-built rows.
 const accessible=()=>document.querySelectorAll('.nav-item[onclick],.nav-item:not([role]),.ticker-row[onclick],.logo[onclick]').forEach(el=>{
  if(el.tagName==='A'||el.tagName==='BUTTON')return;
  el.setAttribute('role','button');el.tabIndex=0;
  if(!el.dataset.keyboard){el.dataset.keyboard='true';el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});}
 });accessible();
 const area=document.querySelector('.sidebar-nav,#sb-nav,.ticker-list');if(area)new MutationObserver(accessible).observe(area,{childList:true,subtree:true});
 // Native names for existing calculator and order controls.
 const labelInputs=()=>document.querySelectorAll('input,select').forEach(el=>{if(el.labels?.length||el.getAttribute('aria-label'))return;const label=el.closest('.ot-field,.calc-field')?.querySelector('.ot-field-label,.calc-label')?.textContent||el.placeholder||el.id.replaceAll('-',' ');el.setAttribute('aria-label',label);});
 labelInputs();const lessonArea=document.querySelector('.content-area');if(lessonArea)new MutationObserver(labelInputs).observe(lessonArea,{childList:true,subtree:true});
 // Dashboard links can open the exact next unfinished lesson without changing its storage format.
 const lesson=new URLSearchParams(location.search).get('lesson');
 if(lesson!==null&&/^\d+$/.test(lesson)){
  const idx=Number(lesson);const total=document.querySelectorAll('.sidebar .nav-item').length;
  if(idx<total){if(typeof selectLesson==='function')selectLesson(idx);else if(typeof selectStyle==='function')selectStyle(idx);if(typeof buildSidebar==='function')buildSidebar();}
 }
 const theme=document.getElementById('dojo-theme-btn');if(theme)theme.setAttribute('aria-label','Switch light and dark appearance');
 const module=window.ACADEMY_MODULES?.find(m=>m.href.replace('.html','')===location.pathname.split('/').pop().replace('.html',''));
 const showLevels=()=>{if(!module)return;document.querySelectorAll('.lesson-hero,.mod-hero').forEach(hero=>{if(hero.querySelector('.content-level'))return;const label=document.createElement('span');label.className='content-level';label.textContent='Course depth: '+module.level;hero.appendChild(label);});};
 showLevels();if(lessonArea)new MutationObserver(showLevels).observe(lessonArea,{childList:true,subtree:true});
});
