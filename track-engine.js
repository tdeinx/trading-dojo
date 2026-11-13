/* Renders one market track from window.DOJO_TRACK (loaded from tracks/<id>.js).
   Every track follows the same five parts so learners always know where they are. */
(() => {
 const T = window.DOJO_TRACK; if(!T) return;
 const KEY = 'dojo_track_'+T.id, PASS = 0.8;
 const load = () => { try{ return JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ return {}; } };
 const save = s => { try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} };
 let progress = load(); progress.done = progress.done || {};
 const lessons = T.parts.flatMap((p,pi)=>p.lessons.map((l,li)=>({...l, part:p, pi, li})));
 let current = 0;
 const esc = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

 function block(b){
  if(b.h) return `<h3 class="tk-h">${b.h}</h3>`;
  if(b.p) return `<p class="tk-p">${b.p}</p>`;
  if(b.list) return `<ul class="tk-list">${b.list.map(i=>`<li>${i}</li>`).join('')}</ul>`;
  if(b.steps) return `<ol class="tk-steps">${b.steps.map(i=>`<li>${i}</li>`).join('')}</ol>`;
  if(b.callout) return `<div class="tk-callout ${b.callout.tone||'key'}"><div class="tk-callout-t">${b.callout.title}</div><div>${b.callout.text}</div></div>`;
  if(b.terms) return `<dl class="tk-terms">${b.terms.map(([t,d])=>`<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>`;
  if(b.table) return `<div class="tk-table-wrap"><table class="tk-table"><thead><tr>${b.table.head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${b.table.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if(b.example) return `<div class="tk-example"><div class="tk-example-t">${b.example.title}</div><div>${b.example.text}</div></div>`;
  if(b.decision){
   const id = 'd'+Math.random().toString(36).slice(2,8);
   return `<div class="tk-decision" id="${id}"><div class="tk-decision-label">Decision moment</div><p class="tk-p"><b>${b.decision.q}</b></p>
    ${b.decision.opts.map((o,i)=>`<button class="tk-opt" data-d="${id}" data-i="${i}">${String.fromCharCode(65+i)}. ${o.t}</button>`).join('')}
    <div class="tk-why" hidden></div></div>`;
  }
  if(b.drill){
   const d = b.drill, q = new URLSearchParams({symbol:d.symbol, interval:d.interval, drill:d.title}).toString();
   return `<div class="tk-drill"><div class="tk-drill-label">Replay drill</div><div class="tk-drill-t">${d.title}</div><p class="tk-p">${d.brief}</p>
    <ul class="tk-list">${d.rules.map(r=>`<li>${r}</li>`).join('')}</ul><a class="tk-drill-btn" href="replay.html?${q}">Run this drill on ${d.symbol} · ${d.interval} ↗</a></div>`;
  }
  return '';
 }

 function renderNav(){
  const done = lessons.filter(l=>progress.done[l.id]!=null).length;
  document.getElementById('tk-progress-txt').textContent = `${done} / ${lessons.length}`;
  document.getElementById('tk-progress-fill').style.width = (done/lessons.length*100)+'%';
  document.getElementById('sb-nav').innerHTML = T.parts.map((p,pi)=>`<div class="tk-part">Part ${pi+1} · ${p.title}</div>`+
   p.lessons.map(l=>{ const i = lessons.findIndex(x=>x.id===l.id), ok = progress.done[l.id]!=null;
    return `<div class="nav-item${i===current?' active':''}${ok?' completed':''}" data-i="${i}"><div class="nav-emoji">${ok?'✓':l.icon||'•'}</div><div class="nav-info"><div class="nav-name">${esc(l.title)}</div><div class="nav-sub">${l.minutes||5} min${ok?` · ${Math.round(progress.done[l.id]*100)}%`:''}</div></div></div>`;
   }).join('')).join('');
  document.querySelectorAll('#sb-nav .nav-item').forEach(el=>el.addEventListener('click',()=>select(+el.dataset.i)));
 }

 function select(i){
  current = Math.max(0, Math.min(i, lessons.length-1));
  const l = lessons[current];
  history.replaceState(null,'',`?t=${T.id}&l=${l.id}`);
  document.getElementById('content').innerHTML = `
   <div class="lesson-hero"><div class="tk-eyebrow">${esc(T.title)} · Part ${l.pi+1}: ${esc(l.part.title)}</div>
    <h1 class="tk-title">${esc(l.title)}</h1><p class="tk-lede">${l.lede||''}</p></div>
   <div class="tk-body">${l.blocks.map(block).join('')}</div>
   ${l.quiz?.length ? `<div class="tk-quiz"><div class="tk-quiz-t">Knowledge check</div><p class="tk-p">Score ${PASS*100}% or better to complete the lesson.</p>
    ${l.quiz.map((q,qi)=>`<fieldset class="tk-q"><legend>${qi+1}. ${q.q}</legend>${q.opts.map((o,oi)=>`<label class="tk-qo"><input type="radio" name="q${qi}" value="${oi}"/> ${o}</label>`).join('')}<div class="tk-why" hidden></div></fieldset>`).join('')}
    <button class="tk-submit" id="tk-submit">Check answers</button><div class="tk-result" id="tk-result" aria-live="polite"></div></div>` : ''}
   <div class="tk-pager">${current>0?`<button class="tk-pg" data-go="${current-1}">← ${esc(lessons[current-1].title)}</button>`:'<span></span>'}
    ${current<lessons.length-1?`<button class="tk-pg" data-go="${current+1}">${esc(lessons[current+1].title)} →</button>`:'<a class="tk-pg" href="tracks.html">Back to all tracks →</a>'}</div>
   <p class="tk-foot">Education only, not financial advice. Examples and drills use hypothetical or past prices and do not predict future results.</p>`;
  document.querySelectorAll('.tk-opt').forEach(btn=>btn.addEventListener('click',()=>{
   const box = document.getElementById(btn.dataset.d), bl = l.blocks.filter(b=>b.decision)[[...document.querySelectorAll('.tk-decision')].indexOf(box)];
   const o = bl.decision.opts[+btn.dataset.i]; box.querySelectorAll('.tk-opt').forEach(b=>b.classList.remove('picked','good','bad'));
   btn.classList.add('picked', o.ok?'good':'bad'); const why = box.querySelector('.tk-why'); why.hidden=false; why.innerHTML = (o.ok?'<b>Good call.</b> ':'<b>Think again.</b> ')+o.why;
  }));
  document.querySelectorAll('.tk-pg[data-go]').forEach(b=>b.addEventListener('click',()=>select(+b.dataset.go)));
  const submit = document.getElementById('tk-submit'); if(submit) submit.addEventListener('click',()=>grade(l));
  renderNav(); document.getElementById('content').scrollTop = 0; window.scrollTo(0,0);
 }

 function grade(l){
  let right = 0, answered = 0;
  l.quiz.forEach((q,qi)=>{
   const pick = document.querySelector(`input[name="q${qi}"]:checked`), fs = document.querySelectorAll('.tk-q')[qi], why = fs.querySelector('.tk-why');
   if(pick) answered++;
   const ok = pick && +pick.value===q.correct; if(ok) right++;
   fs.classList.toggle('good', !!ok); fs.classList.toggle('bad', !!pick && !ok);
   if(pick){ why.hidden=false; why.innerHTML = (ok?'<b>Correct.</b> ':`<b>Not quite.</b> The answer is "${q.opts[q.correct]}". `)+q.why; }
  });
  const res = document.getElementById('tk-result');
  if(answered < l.quiz.length){ res.textContent = `Answer all ${l.quiz.length} questions first.`; return; }
  const score = right/l.quiz.length;
  if(score >= PASS){ progress.done[l.id] = Math.max(score, progress.done[l.id]||0); save(progress); res.innerHTML = `<b>${right}/${l.quiz.length}.</b> Lesson complete.`; renderNav(); }
  else res.innerHTML = `<b>${right}/${l.quiz.length}.</b> Read the explanations, review the lesson, then try again.`;
 }

 document.title = `${T.title} Track · The Trading Dojo`;
 document.getElementById('tk-name').textContent = T.title;
 document.getElementById('tk-tag').textContent = T.tagline;
 const want = new URLSearchParams(location.search).get('l');
 const startAt = lessons.findIndex(l=>l.id===want);
 select(startAt>=0 ? startAt : Math.max(0, lessons.findIndex(l=>progress.done[l.id]==null)));
})();
