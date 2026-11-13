/* Figures placed into track lessons. at: 'start' (after the first block), 'end',
   'before:drill' | 'before:decision' | 'before:callout', or a heading's text (placed after that heading and its first block). */
(() => {
 const pullbackW = {segs:[[10,0.8,0.3],[5,-0.6,0.25],[2,0.5,0.2],[12,0.6,0.3]], ma:8, entry:16, stop:{lowOf:[12,15],pad:0.25}, target:{rr:2}};
 const pullbackF = {segs:[[10,0.8,0.3],[5,-0.6,0.25],[2,0.5,0.2],[12,-0.55,0.3]], ma:8, entry:16, stop:{lowOf:[12,15],pad:0.25}, target:{rr:2}};
 const breakoutW = (label,vl) => ({segs:[[12,0,0.3,0.25],[10,0.7,0.25]], range:[0,11], rangeLabel:label, vlines:[{i:12,label:vl}], entry:'breakUp', stop:{mid:true}, target:{rr:2}});
 const breakoutF = (label,vl) => ({segs:[[12,0,0.3,0.25],[2,0.9,0.15],[9,-0.7,0.3]], range:[0,11], rangeLabel:label, vlines:[{i:12,label:vl}], entry:'breakUp', stop:{mid:true}, target:{rr:2}});
 const osc = [[4,0.6,0.2],[4,-0.6,0.2],[4,0.6,0.2],[4,-0.6,0.2],[3,0.6,0.15]];
 const rangeW = label => ({segs:[...osc,[8,-0.55,0.2]], range:[0,18], rangeLabel:label, side:'short', entry:18, stop:{highOf:[0,18],pad:0.25}, target:{rangeOpp:true,pad:0.15}});
 const rangeF = label => ({segs:[...osc,[8,0.65,0.2]], range:[0,18], rangeLabel:label, side:'short', entry:18, stop:{highOf:[0,18],pad:0.25}, target:{rangeOpp:true,pad:0.15}});
 const newsW = vl => ({segs:[[10,0.05,0.3,0.3],[1,4,0.2,0.4],[2,1.0,0.2],[8,0.7,0.3]], range:[10,10], rangeLabel:'First candle after', vlines:[{i:10,label:vl}], entry:'breakUp', stop:{mid:true}, target:{rr:2}});
 const newsF = vl => ({segs:[[10,0.05,0.3,0.3],[1,4,0.2,0.4],[1,1.2,0.15],[8,-0.9,0.3]], range:[10,10], rangeLabel:'First candle after', vlines:[{i:10,label:vl}], entry:'breakUp', stop:{mid:true}, target:{rr:2}});
 const orbW = {segs:[[8,0.05,0.2,0.2],[1,1.2,0.2,0.5],[1,-1.5,0.2,0.5],[1,0.8,0.2,0.5],[2,0.8,0.15],[8,0.5,0.3]], range:[8,10], rangeLabel:'Opening range', vlines:[{i:8,label:'9:30 open'}], entry:'breakUp', stop:{mid:true}, target:{rr:2}};
 const orbF = {segs:[[8,0.05,0.2,0.2],[1,1.2,0.2,0.5],[1,-1.5,0.2,0.5],[1,0.8,0.2,0.5],[2,0.8,0.15],[8,-0.7,0.3]], range:[8,10], rangeLabel:'Opening range', vlines:[{i:8,label:'9:30 open'}], entry:'breakUp', stop:{mid:true}, target:{rr:2}};

 window.DOJO_FIGURES = {
  /* ── Forex & Gold ── */
  'fx-sessions':[{at:'start', fig:{type:'sessions', variant:'fx'}}],
  'fx-pips':[{at:'end', fig:{type:'size', market:'EUR/USD'}}],
  'fx-brokers':[{at:'What you pay', fig:{type:'spread'}}],
  'fx-leverage':[{at:'before:decision', fig:{type:'leverage'}}],
  'fx-pullback':[{at:'Rules', fig:{type:'setup', works:{...pullbackW, text:'The pullback holds above the swing low, buyers return, and the trend carries price to 2R.'}, fails:{...pullbackF, text:'The "turn" was only a pause. The trend breaks and the stop below the swing low keeps the loss at 1R.'}}}],
  'fx-breakout':[{at:'Rules', fig:{type:'setup', works:{...breakoutW('Asian range','London open'), text:'London volume pushes price out of the quiet range and it keeps going.'}, fails:{...breakoutF('Asian range','London open'), text:'The classic fakeout: a close above the range, then a full reversal. The midpoint stop caps the damage.'}}}],
  'fx-range':[{at:'Rules', fig:{type:'setup', works:{...rangeW('Range'), text:'Price rejects the top edge again and rotates back to the bottom. Note the target is under 2R, which the Dojo logs as a rule break.'}, fails:{...rangeF('Range'), text:'Every range ends eventually. This one breaks out the top, and the stop just above the edge is what saves the account.'}}}],
  'fx-gold-news':[{at:'Rules', fig:{type:'setup', works:{...newsW('Data release'), text:'The first candle after the release sets the range. A later close above it leads to follow-through.'}, fails:{...newsF('Data release'), text:'The first push fades and reverses through the range. Half size on huge candles keeps this loss small.'}}}],
  'fx-plan':[{at:'The plan', fig:{type:'expectancy', win:45, aw:2, al:1}}],
  'fx-risks':[{at:'Weekend gaps', fig:{type:'gap', label:'Weekend'}},{at:'Hidden doubling through correlation', fig:{type:'correlation'}}],

  /* ── Options ── */
  'op-what':[{at:'end', fig:{type:'payoffs', strategies:['long_call','long_put']}}],
  'op-price':[{at:'What makes extrinsic value bigger', fig:{type:'theta'}}],
  'op-greeks':[{at:'before:decision', fig:{type:'option'}}],
  'op-redflags':[{at:'end', fig:{type:'expectancy', win:90, aw:0.1, al:1}}],
  'op-buying':[{at:'before:drill', fig:{type:'optionSetup', strategy:'long_call', works:{segs:[[22,0.55,0.6]], seed:3, text:'A big move up before expiry. The call is worth far more than its premium.'}, fails:{segs:[[22,0.03,0.6]], seed:3, text:'Price drifts sideways. Time decay takes the whole premium even though nothing went "wrong".'}}}],
  'op-debit':[{at:'before:drill', fig:{type:'optionSetup', strategy:'bull_call_spread', width:2, works:{segs:[[22,0.32,0.5]], seed:6, text:'A moderate rise to the short strike earns close to the maximum gain.'}, fails:{segs:[[22,-0.25,0.5]], seed:6, text:'Price falls. The loss stops at the debit you paid, never more.'}}}],
  'op-credit':[{at:'before:drill', fig:{type:'optionSetup', strategy:'bull_put_spread', width:2, works:{segs:[[22,0.08,0.5]], seed:8, text:'Price holds above the short put. Both puts expire worthless and you keep the credit.'}, fails:{segs:[[22,-0.45,0.5]], seed:8, text:'Price drops through both strikes. You lose the full width minus the credit, several times what you could make.'}}}],
  'op-condor':[{at:'before:drill', fig:{type:'optionSetup', strategy:'iron_condor', width:2, works:{segs:[[22,0.02,0.45]], seed:2, text:'Price stays between the short strikes. The full credit is kept.'}, fails:{segs:[[22,0.5,0.45]], seed:2, text:'A trend runs straight through the call side and the condor takes its maximum loss.'}}}],
  'op-plan':[{at:'end', fig:{type:'payoffs'}}],

  /* ── Futures ── */
  'fu-what':[{at:'end', fig:{type:'size', market:'MES'}}],
  'fu-hours':[{at:'Expiration and the roll', fig:{type:'roll'}}],
  'fu-prop':[{at:'Rules that decide most outcomes', fig:{type:'drawdown'}}],
  'fu-orb':[{at:'before:drill', fig:{type:'setup', works:{...orbW, seed:12, text:'The first 15 minutes set the range, then a decisive close above it runs to 2R.'}, fails:{...orbF, seed:12, text:'The breakout fails and falls back through the midpoint. One attempt per side, then you are done.'}}}],
  'fu-levels':[{at:'before:drill', fig:{type:'setup', works:{segs:[[10,0.4,0.3],[4,-0.6,0.2],[4,0.62,0.15],[1,-0.6,0.1,0.6],[8,-0.55,0.3]], seed:15, hlines:[{highOf:[0,9],label:'Prior day high',tone:'neutral'}], vlines:[{i:10,label:'Next day'}], side:'short', entry:18, stop:{highOf:[14,18],pad:0.25}, target:{rr:2}, text:'Price tests yesterday\'s high, fails to close above it, and rolls over.'}, fails:{segs:[[10,0.4,0.3],[4,-0.6,0.2],[4,0.62,0.15],[1,-0.6,0.1,0.6],[8,0.6,0.3]], seed:15, hlines:[{highOf:[0,9],label:'Prior day high',tone:'neutral'}], vlines:[{i:10,label:'Next day'}], side:'short', entry:18, stop:{highOf:[14,18],pad:0.25}, target:{rr:2}, text:'A trend day ignores the level and runs through it. The rejection trade gets stopped.'}}}],
  'fu-oil':[{at:'before:drill', fig:{type:'setup', works:{...newsW('EIA report'), seed:21, text:'The report candle sets the range and a later close beyond it follows through.'}, fails:{...newsF('EIA report'), seed:21, text:'The first move reverses. Being flat into the report and trading the reaction keeps this a planned 1R loss.'}}}],
  'fu-plan':[{at:'end', fig:{type:'expectancy', win:45, aw:2, al:1}}],

  /* ── Stocks ── */
  'st-what':[{at:'end', fig:{type:'size', market:'AAPL'}}],
  'st-hours':[{at:'start', fig:{type:'sessions', variant:'stocks'}}],
  'st-orders':[{at:'before:callout', fig:{type:'gap', variant:'orders'}}],
  'st-orb':[{at:'before:drill', fig:{type:'setup', works:{...orbW, seed:31, text:'A clean opening range and a decisive break above it.'}, fails:{...orbF, seed:31, text:'A fakeout back into the range. The midpoint stop keeps it to 1R.'}}}],
  'st-swing':[{at:'before:drill', fig:{type:'setup', works:{...pullbackW, seed:33, text:'Daily candles: the pullback finds buyers near the average and the trend resumes over the next weeks.'}, fails:{...pullbackF, seed:33, text:'The trend breaks. On daily charts this can take days, so size for overnight gaps too.'}}}],
  'st-gap':[{at:'before:drill', fig:{type:'setup', works:{segs:[[8,0.1,0.3],{gap:4},[1,1.0,0.3,0.6],[1,-1.1,0.3,0.6],[1,0.7,0.3,0.6],[2,0.8,0.15],[8,0.5,0.3]], seed:35, range:[8,10], rangeLabel:'First 15 minutes', vlines:[{i:8,label:'Gap up'}], entry:'breakUp', stop:{rangeEdge:true}, target:{rr:2}, text:'Gap and go: the gap holds above its opening range and extends.'}, fails:{segs:[[8,0.1,0.3],{gap:4},[1,1.0,0.3,0.6],[1,-1.1,0.3,0.6],[1,0.7,0.3,0.6],[2,0.7,0.15],[10,-0.8,0.3]], seed:35, range:[8,10], rangeLabel:'First 15 minutes', vlines:[{i:8,label:'Gap up'}], entry:'breakUp', stop:{rangeEdge:true}, target:{rr:2}, text:'The gap fades back toward yesterday\'s close. The stop below the opening range limits the loss.'}}}],
  'st-plan':[{at:'end', fig:{type:'expectancy', win:40, aw:2.2, al:1}}],

  /* ── Crypto ── */
  'cr-market':[{at:'before:callout', fig:{type:'size', market:'BTC/USD'}}],
  'cr-custody':[{at:'start', fig:{type:'custody'}}],
  'cr-trend':[{at:'before:drill', fig:{type:'setup', works:{...pullbackW, seed:41, text:'A clean pullback in a crypto uptrend. Same rules, wider stop, smaller size.'}, fails:{...pullbackF, seed:41, text:'The trend rolls over. With a fixed 1% risk, a wide crypto stop still costs exactly 1R.'}}}],
  'cr-breakout':[{at:'before:drill', fig:{type:'setup', works:{segs:[[6,0.1,1.0,0.8],[6,0,0.5,0.4],[6,0,0.18,0.12],[10,0.6,0.3]], seed:43, range:[12,17], rangeLabel:'Squeeze', entry:'breakUp', stop:{mid:true}, target:{rr:2}, text:'Candles shrink into a tight range, then expand. The breakout runs.'}, fails:{segs:[[6,0.1,1.0,0.8],[6,0,0.5,0.4],[6,0,0.18,0.12],[1,0.7,0.1],[9,-0.6,0.3]], seed:43, range:[12,17], rangeLabel:'Squeeze', entry:'breakUp', stop:{mid:true}, target:{rr:2}, text:'A breakout that liquidates late buyers and snaps back. The midpoint stop is hit.'}}}],
  'cr-range':[{at:'before:drill', fig:{type:'setup', works:{...rangeW('Weekend range'), seed:45, text:'A sleepy weekend range holds and the fade rotates to the far side.'}, fails:{...rangeF('Weekend range'), seed:45, text:'Volume returns and the range breaks. The stop outside the edge does its job.'}}}],
  'cr-plan':[{at:'end', fig:{type:'expectancy', win:40, aw:2, al:1}}]
 };
})();
