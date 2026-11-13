/* Course routing uses the existing lesson indexes and never changes quiz or XP history. */
(() => {
 const instruments=[
  {id:'stocks',name:'Stocks',lesson:0,description:'Understand ownership, shares, exchanges and what moves a stock.'},
  {id:'options',name:'Options',lesson:1,description:'Get to know calls, puts, strike prices, premiums and expiration.'},
  {id:'futures',name:'Futures',lesson:4,description:'Learn contract basics, margin, mark-to-market and rollover.'},
  {id:'forex',name:'Forex',lesson:3,description:'Explore currency pairs, pips, lots and leverage.'},
  {id:'crypto',name:'Crypto',lesson:2,description:'Explore digital assets, blockchain, wallets and exchanges.'}
 ];
 const getInstrument=id=>instruments.find(i=>i.id===id)||null;
 const lessonDone=(state,index)=>Object.hasOwn(state?.completed||{},index);
 function nextActivity(modules,states,id){
  const selected=getInstrument(id);
  if(!selected)return {needsChoice:true,moduleIndex:0,lessonIndex:null,selected:null};
  if(!lessonDone(states[0],selected.lesson))return {needsChoice:false,moduleIndex:0,lessonIndex:selected.lesson,selected};
  for(let index=1;index<modules.length;index++){
   const m=modules[index],s=states[index]||{};
   if(m.kind==='lessons'){const lessonIndex=m.lessons.findIndex((_,i)=>!lessonDone(s,i));if(lessonIndex!==-1)return {needsChoice:false,moduleIndex:index,lessonIndex,selected};}
   if(m.kind==='platforms'&&s.quizScore==null)return {needsChoice:false,moduleIndex:index,lessonIndex:null,selected};
   if(m.kind==='dna'&&!s.traderDNA)return {needsChoice:false,moduleIndex:index,lessonIndex:null,selected};
   if(m.kind==='sim')return {needsChoice:false,moduleIndex:index,lessonIndex:null,selected};
  }
  return {needsChoice:false,moduleIndex:modules.length-1,lessonIndex:null,selected};
 }
 window.DojoPath={instruments,getInstrument,lessonDone,nextActivity};
})();
