window.DOJO_TRACK = {
 id:'futures',
 title:'Futures',
 tagline:'Exchange-traded leverage, prop firm evaluations and contract rolls.',
 parts:[
 {title:'How the industry works', lessons:[
  {id:'fu-what', icon:'📄', minutes:7, title:'What a futures contract is',
   lede:'A futures contract is a standardized agreement to buy or sell something later, at a price agreed today. Traders use it for something else: fast, leveraged exposure to price.',
   blocks:[
    {p:'Futures began as a way for farmers and buyers to lock in prices. Today most trading is in financial futures, like stock indexes, and in commodities like oil and gold. Contracts trade on regulated exchanges such as CME Group, and a <b>clearinghouse</b> stands between every buyer and seller.'},
    {p:'Every contract is identical: same size, same expiration dates, same tick size. That standardization is what makes them liquid.'},
    {table:{head:['Contract','Symbol','Value of a 1-point move','Smallest tick'], rows:[
     ['E-mini S&P 500','ES','$50','0.25 point = $12.50'],
     ['Micro E-mini S&P 500','MES','$5','0.25 point = $1.25'],
     ['E-mini Nasdaq-100','NQ','$20','0.25 point = $5.00'],
     ['Micro E-mini Nasdaq-100','MNQ','$2','0.25 point = $0.50'],
     ['Micro Gold','MGC','$10 per $1','$0.10 = $1.00'],
     ['Micro WTI Crude Oil','MCL','$100 per $1','$0.01 = $1.00']
    ]}},
    {callout:{tone:'key', title:'Why micros matter', text:'Micro contracts are one tenth the size of the classic E-minis. For a learner with a small account they are the difference between being able to size correctly and not. Everything in this track uses micros.'}},
    {example:{title:'What one MES contract does', text:'The S&P 500 futures move 40 points in a day. One MES contract gains or loses 40 × $5 = $200. One ES contract would be $2,000. Same market, same move, ten times the money.'}}
   ],
   quiz:[
    {q:'What does one MES contract gain if the index futures rise 10 points?', opts:['$10','$50','$500','$5'], correct:1, why:'MES is $5 per point. 10 × $5 = $50.'},
    {q:'What stands between every futures buyer and seller?', opts:['Your broker\'s app','The clearinghouse','The SEC','Nobody'], correct:1, why:'The clearinghouse guarantees performance on both sides.'},
    {q:'How do micro E-minis compare to E-minis?', opts:['Twice the size','One tenth the size','The same size','Different market'], correct:1, why:'Micros are one tenth of the E-mini contract.'},
    {q:'MCL moves $0.80. What is the P&L for one contract?', opts:['$0.80','$8','$80','$800'], correct:2, why:'MCL is $100 per $1 move. $0.80 × 100 = $80.'}
   ]},
  {id:'fu-hours', icon:'🗓️', minutes:6, title:'Hours, expirations and rolling',
   lede:'Futures nearly never sleep, and every contract has an expiration date you need to manage.',
   blocks:[
    {p:'CME stock index futures trade from Sunday evening to Friday afternoon, nearly 23 hours a day: 6pm to 5pm Eastern, with a one-hour daily halt from 5pm to 6pm Eastern.'},
    {list:[
     '<b>Regular trading hours</b> for index futures line up with the stock market, 9:30am to 4pm Eastern. Most volume happens then.',
     '<b>Overnight</b> trading reacts to Asian and European news, often with thinner volume and wider swings per contract traded.'
    ]},
    {h:'Expiration and the roll'},
    {p:'Index futures expire quarterly: March, June, September and December, on the third Friday. Traders <b>roll</b> to the next contract roughly a week before expiration, when volume shifts. If you hold a position, you close the old contract and open the new one.'},
    {terms:[
     ['Front month','The contract closest to expiration that most people are trading.'],
     ['Continuous chart','A chart that stitches contracts together. Handy for analysis, but the price jumps at each roll may not match the contract you actually hold.'],
     ['Physical delivery','Some contracts, like crude oil, settle by delivering the commodity. Retail brokers typically force you to close before that becomes possible.']
    ]}
   ],
   quiz:[
    {q:'When does the daily trading halt occur for CME equity index futures?', opts:['Noon to 1pm Eastern','5pm to 6pm Eastern','Midnight to 1am Eastern','There is none'], correct:1, why:'Trading pauses for an hour each afternoon, 5pm to 6pm Eastern.'},
    {q:'Which months do index futures expire?', opts:['Every month','March, June, September, December','January and July','Only December'], correct:1, why:'Equity index futures run on a quarterly cycle.'},
    {q:'What is rolling?', opts:['Closing the expiring contract and opening the next one','Doubling your position','Moving your stop','Switching brokers'], correct:0, why:'Rolling keeps exposure as one contract nears expiration.'},
    {q:'Why might a continuous chart mislead you?', opts:['It shows the wrong market','It stitches contracts together, so prices at the roll may not match the contract you hold','It hides weekends','It is always delayed'], correct:1, why:'Back-adjusted or stitched data can differ from the actual contract you trade.'}
   ]},
  {id:'fu-margin', icon:'🏦', minutes:8, title:'Margin and daily settlement',
   lede:'Futures margin is not a down payment. It is a good-faith deposit, and it is settled in cash every single day.',
   blocks:[
    {terms:[
     ['Initial margin','The deposit the exchange requires to open a position overnight.'],
     ['Maintenance margin','The level your account must stay above. Below it, you get a margin call.'],
     ['Day-trading margin','A lower deposit many brokers allow for positions closed the same day. Set by the broker, not the exchange.'],
     ['Mark-to-market','At each daily settlement, gains are added to your account and losses are taken out, in cash.']
    ]},
    {callout:{tone:'warn', title:'You can lose more than you deposited', text:'If the market moves far enough fast enough, losses can exceed the cash in your account, and you owe the difference. Low day-trading margins make it easy to open far more contracts than your account can survive.'}},
    {example:{title:'Margin is not your risk', text:'A broker may let you day trade one MES with a small deposit. That says nothing about how much you should risk. The Dojo still sizes by the stop: 1% of a $10,000 account with a 10-point stop on MES is 2 contracts ($100 ÷ $50 per contract).'}},
    {decision:{q:'Your broker\'s day-trading margin lets you open 20 MES contracts with your $10,000. Your stop is 10 points away. What do you open?', opts:[
     {t:'20 contracts, the broker approved it', ok:false, why:'20 × $5 × 10 points = $1,000, or 10% of the account on one trade.'},
     {t:'2 contracts', ok:true, why:'$100 risk ÷ ($5 × 10 points) = 2 contracts. Margin limits what you can do, not what you should do.'},
     {t:'As many as fit in half the margin', ok:false, why:'Margin usage is not a risk rule.'}
    ]}}
   ],
   quiz:[
    {q:'What is mark-to-market in futures?', opts:['A broker fee','Daily cash settlement of gains and losses','A type of order','The roll date'], correct:1, why:'Gains and losses settle into your account at each daily settlement.'},
    {q:'Who sets day-trading margins?', opts:['The exchange','The broker','The SEC','The CFTC'], correct:1, why:'Day-trading margin is a broker policy.'},
    {q:'Can you lose more than your deposit in futures?', opts:['No, never','Yes, in a fast enough move','Only in gold','Only overnight in crude'], correct:1, why:'Losses are not capped at your deposit.'},
    {q:'$10,000 account, 1% risk, MNQ stop 25 points ($2 per point). How many contracts?', opts:['1','2','4','10'], correct:1, why:'Risk $100. Each contract risks 25 × $2 = $50. $100 ÷ $50 = 2.'}
   ]}
 ]},
 {title:'The business around it', lessons:[
  {id:'fu-business', icon:'🏢', minutes:7, title:'Brokers, costs and taxes',
   lede:'Futures are among the most heavily regulated retail markets in the US. Know the players and the bill.',
   blocks:[
    {list:[
     'In the US, futures brokers are <b>Futures Commission Merchants (FCMs)</b> or introducing brokers working through one. They are registered with the CFTC and must be NFA members. Check them in NFA BASIC.',
     'Exchanges like CME set contract specs and margins. Clearinghouses guarantee trades.'
    ]},
    {h:'What you pay'},
    {table:{head:['Cost','Notes'], rows:[
     ['Commission','Per contract, per side. Micros are cheaper in dollars but fees are larger as a share of the move.'],
     ['Exchange and NFA fees','Small per-contract charges passed through by the broker.'],
     ['Platform and data','Some platforms charge monthly for software and real-time exchange data.'],
     ['Slippage','Usually one tick or less on liquid contracts at normal hours. More on news and overnight.']
    ]}},
    {callout:{tone:'tip', title:'A US tax difference', text:'In the US, regulated futures contracts generally get "60/40" treatment under Section 1256 of the tax code: 60% of gains are taxed as long-term and 40% as short-term, regardless of holding time, and positions are marked to market at year end. This is general information, not tax advice. Ask a tax professional.'}},
    {example:{title:'Fees matter more on micros', text:'If round-trip fees on one MES are around a dollar or two, and your target is 8 points ($40), fees are a few percent of the win. On a 2-point scalp ($10), they can be 20% of it. Fee drag punishes frequent, tiny trades.'}}
   ],
   quiz:[
    {q:'What is an FCM?', opts:['A futures exchange','A registered futures broker that holds customer funds','A tax form','A type of contract'], correct:1, why:'FCMs handle customer accounts and funds for futures trading.'},
    {q:'Where do you check a futures broker\'s registration?', opts:['NFA BASIC','The app store','A forum','The broker\'s logo'], correct:0, why:'NFA BASIC lists registration and disciplinary history.'},
    {q:'Under Section 1256, how are US regulated futures gains generally taxed?', opts:['100% short-term','60% long-term, 40% short-term','Tax free','100% long-term'], correct:1, why:'That is the 60/40 rule. Get professional advice for your situation.'},
    {q:'Why do fees hurt small scalps more?', opts:['Fees are higher on small trades','Fixed per-contract fees are a bigger share of a small target','Scalps pay double','They don\'t'], correct:1, why:'The same fee is a larger percentage of a smaller win.'}
   ]},
  {id:'fu-prop', icon:'🎯', minutes:9, title:'Prop firm evaluations, honestly',
   lede:'Pay a fee, pass a test, trade the firm\'s money. Read the rules before you read the payout screenshots.',
   blocks:[
    {p:'Futures prop firms sell evaluations. You pay a monthly or one-time fee, trade under strict rules, and if you hit a profit target without breaking a rule, you get a "funded" account and a share of profits.'},
    {h:'Rules that decide most outcomes'},
    {terms:[
     ['Trailing drawdown','Your maximum loss limit moves up as your account makes new highs. A $2,000 trailing limit on a $50,000 account means one bad stretch after a good run can end the account.'],
     ['Daily loss limit','A hard stop for the day.'],
     ['Consistency rule','Some firms require that no single day makes up too large a share of profits.'],
     ['Payout rules','Minimum trading days, buffers and caps on withdrawals.']
    ]},
    {callout:{tone:'key', title:'How the business works', text:'Many "funded" accounts are simulated, with the firm paying traders out of its own revenue, a large share of which comes from evaluation and reset fees. That is not automatically wrong, but it means the firm earns whether you pass or fail. Prop firms are generally not regulated the way brokers are, so your protections are mostly the contract you sign.'}},
    {callout:{tone:'warn', title:'Red flags', text:'Rules that change mid-evaluation. Vague payout terms. Pressure to buy resets right after a fail. Firms that recently delayed or denied payouts in bulk. Search for recent reviews about payouts specifically, not about how easy the challenge is.'}},
    {callout:{tone:'tip', title:'Use the Dojo first', text:'The skills an evaluation tests are exactly what the Dojo measures: fixed risk, daily loss discipline, positive expectancy. If your journal does not show that over 100 trades, paying for an evaluation is paying to learn the same lesson.'}}
   ],
   quiz:[
    {q:'What is a trailing drawdown?', opts:['A fixed loss limit from the start balance','A loss limit that moves up as your account makes new highs','A fee','A broker margin call'], correct:1, why:'It follows your peak balance, which makes giving back gains dangerous.'},
    {q:'Where does a large share of many prop firms\' revenue come from?', opts:['Exchange rebates','Evaluation and reset fees','Government grants','Interest'], correct:1, why:'The firm earns on fees whether or not you pass.'},
    {q:'What protects you most in a prop firm relationship?', opts:['SIPC','The firm\'s contract and rules','NFA insurance','The exchange'], correct:1, why:'Prop firms are generally not regulated like brokers, so the contract governs.'},
    {q:'What should your Dojo journal show before you buy an evaluation?', opts:['One great week','Disciplined, positive-expectancy results over many trades','A big win','Nothing, just try'], correct:1, why:'The evaluation tests exactly that. Prove it for free first.'}
   ]}
 ]},
 {title:'Strategies, honestly presented', lessons:[
  {id:'fu-orb', icon:'🔔', minutes:9, title:'Opening range breakout',
   lede:'The first minutes after the cash open set a range. The breakout from it often sets the tone.',
   blocks:[
    {p:'Index futures trade all night, but the stock market\'s 9:30am Eastern open brings a surge of volume. The opening range breakout uses the first 15 minutes of that session.'},
    {steps:[
     '<b>Mark the range:</b> the high and low of 9:30 to 9:45am Eastern on the 5-minute chart.',
     '<b>Entry:</b> a 5-minute candle closes outside the range.',
     '<b>Stop:</b> the middle of the opening range.',
     '<b>Target:</b> 2R. If not hit by about 11:30am, close it. Midday is often slow.',
     '<b>One attempt per side.</b> If the first breakout fails, you are done for the day with this setup.'
    ]},
    {callout:{tone:'warn', title:'When it fails', text:'Chop days, where price breaks out, reverses, breaks the other way and reverses again. Huge opening ranges, where the stop is too wide. And news at 10am Eastern that hits right after you enter.'}},
    {drill:{title:'Opening range on MES', symbol:'MES', interval:'5m', brief:'Turn off "hide the date" so you can see the time of day. Step until you see the 9:30am Eastern open (shown in your local time), mark the first three candles, then trade the rules.', rules:['Range = first 15 minutes after the cash open','Candle close outside the range to enter','Stop at the range midpoint','One attempt per side, out by late morning']}}
   ],
   quiz:[
    {q:'What defines the opening range in this setup?', opts:['The overnight high and low','The 9:30 to 9:45am Eastern high and low','Yesterday\'s range','The first hour'], correct:1, why:'The first 15 minutes of the cash session.'},
    {q:'Where is the stop?', opts:['The far side of the range','The middle of the range','No stop','10 points fixed'], correct:1, why:'The midpoint keeps the stop reasonable while still being a meaningful failure point.'},
    {q:'The first breakout fails. What do the rules say?', opts:['Try again three times','You are done with the setup for the day','Double size','Reverse immediately'], correct:1, why:'One attempt per side prevents chop days from stacking losses.'},
    {q:'What kind of day hurts this setup most?', opts:['Strong trend days','Choppy, back-and-forth days','Holidays only','Days with no news'], correct:1, why:'Chop produces false breakouts in both directions.'}
   ]},
  {id:'fu-levels', icon:'📏', minutes:8, title:'Prior day levels',
   lede:'Yesterday\'s high, low and close are levels thousands of traders are watching. That alone makes them matter.',
   blocks:[
    {p:'Prior day high (PDH) and prior day low (PDL) work as reference points. Price often reacts the first time it tests them.'},
    {h:'Two ways to trade them'},
    {terms:[
     ['Rejection','Price reaches PDH, fails to close above it, and turns down. Short with the stop just above the high of the rejection.'],
     ['Acceptance','Price closes above PDH and then holds above it on a retest. Long with the stop back below the level.']
    ]},
    {steps:[
     'Mark PDH and PDL before the session.',
     'Wait for a clear reaction on the 15-minute chart: a rejection candle or a close and successful retest.',
     'Stop beyond the reaction candle or back through the level.',
     'Target 2R, or the opposite level if it is closer and still meets 2R.'
    ]},
    {callout:{tone:'warn', title:'When it fails', text:'Trend days blow through levels without pausing, so rejection trades get run over. Range days fake acceptance and fall back. Deciding in advance which one you are looking for, and journaling it, is how you learn which works for you.'}},
    {drill:{title:'Prior day levels on MNQ', symbol:'MNQ', interval:'15m', brief:'Use the warm-up to find the previous day\'s high and low (date visible). Trade only the first clean test of each.', rules:['Mark PDH and PDL before stepping','First test only','Choose rejection or acceptance before entering','Journal which one you chose']}}
   ],
   quiz:[
    {q:'Why do prior day highs and lows matter?', opts:['Exchanges enforce them','Many traders watch them, so price often reacts there','They are guaranteed support','They never break'], correct:1, why:'Widely watched levels attract orders and reactions.'},
    {q:'What is "acceptance" above PDH?', opts:['A touch of the level','A close above it that holds on a retest','A rejection','A gap down'], correct:1, why:'Acceptance means the market is trading comfortably beyond the level.'},
    {q:'What day type hurts rejection trades most?', opts:['Trend days','Range days','Holidays','Expiration day'], correct:0, why:'Trends push through levels without the expected reaction.'},
    {q:'Why decide rejection or acceptance before entering?', opts:['It is required by the exchange','So your journal can show which approach works for you','It changes the tick size','It doesn\'t matter'], correct:1, why:'Mixed approaches make your stats meaningless.'}
   ]},
  {id:'fu-oil', icon:'🛢️', minutes:8, title:'Crude oil after the inventory report',
   lede:'Every Wednesday at 10:30am Eastern, oil gets its weekly shock. Trade the reaction, not the number.',
   blocks:[
    {p:'The US Energy Information Administration publishes its weekly petroleum status report on Wednesdays at 10:30am Eastern (shifted on some holiday weeks). Crude oil futures often make a fast move on it.'},
    {steps:[
     'Be flat in crude before the release.',
     'Let the first 15-minute candle after the release finish. Mark its high and low.',
     'Enter on a later 15-minute close beyond that range.',
     'Stop on the other side of the first candle, or its midpoint if the candle is very large.',
     'Target 2R. Cut size if the first candle was huge.'
    ]},
    {callout:{tone:'key', title:'Same logic as gold', text:'This is the same reaction framework as the gold lesson in the Forex & Gold track. Event-driven markets reward patience after the event and punish guessing before it.'}},
    {drill:{title:'Crude oil reactions on MCL', symbol:'MCL', interval:'15m', brief:'With the date visible, step to a Wednesday mid-morning Eastern. Look for the outsized candle and trade the rules from there.', rules:['Never hold into the release','Entry only after the first 15-minute candle closes','Half size if that candle is huge','Journal whether the move continued']}}
   ],
   quiz:[
    {q:'When is the EIA weekly petroleum report usually released?', opts:['Monday 9am Eastern','Wednesday 10:30am Eastern','Friday 4pm Eastern','Daily at noon'], correct:1, why:'It comes out Wednesdays at 10:30am Eastern, with holiday shifts.'},
    {q:'What is the entry trigger?', opts:['Buying before the report','A later 15-minute close beyond the first post-release candle','Selling the release candle','Any candle after noon'], correct:1, why:'Wait for the reaction, then trade the follow-through.'},
    {q:'One MCL contract, stop 30 cents away. Dollar risk per contract?', opts:['$0.30','$3','$30','$300'], correct:2, why:'MCL is $100 per $1. $0.30 × 100 = $30.'},
    {q:'Why be flat before the release?', opts:['The market closes','The first move can jump past stops in either direction','Brokers require it','Oil stops trading'], correct:1, why:'Holding through is a coin flip with gap risk.'}
   ]}
 ]},
 {title:'Practice plan', lessons:[
  {id:'fu-plan', icon:'🗓️', minutes:6, title:'Practice like an evaluation',
   lede:'Use the Dojo to run a free, honest version of a prop firm test.',
   blocks:[
    {steps:[
     '<b>One setup, one market.</b> For example, opening range on MES.',
     '<b>Fixed risk:</b> 0.5% per trade.',
     '<b>Your own daily loss limit:</b> stop for the day after 2% lost or three losses, whichever comes first. The lab enforces three losses.',
     '<b>A drawdown line:</b> if your journal falls 6R from its peak, stop and review before trading again.',
     '<b>100 trades</b> through replay and live practice, reviewed every 20.'
    ]},
    {callout:{tone:'key', title:'What passing looks like', text:'Positive expectancy, at least 90% rule adherence, and a maximum drawdown you could live with inside a prop firm\'s trailing limit. The Stats tab shows all three.'}},
    {callout:{tone:'warn', title:'Practice is not live', text:'Real fills, data delays and pressure change results. If you move on to a paid evaluation or a live account, start smaller than you think you need to.'}}
   ],
   quiz:[
    {q:'What is the point of a personal drawdown line?', opts:['To trade more','To force a review before a bad stretch becomes a disaster','To earn badges','It has none'], correct:1, why:'It mirrors the trailing drawdown that ends most evaluations.'},
    {q:'Which three measures show you are evaluation-ready?', opts:['Win rate, trades per day, profit','Expectancy, rule adherence, max drawdown','Badges, XP, rank','Account size, leverage, contracts'], correct:1, why:'Those decide whether you survive and grow under strict rules.'},
    {q:'Why only one setup and one market at first?', opts:['It is more fun','So your stats measure one thing clearly','Exchanges limit you','Futures require it'], correct:1, why:'Clean data lets you trust the result.'},
    {q:'You hit your daily loss limit at 10:15am. What now?', opts:['One more trade to win it back','Done for the day, review the journal','Switch to crude','Double size'], correct:1, why:'Respecting the limit is the skill being tested.'}
   ]}
 ]},
 {title:'Risks specific to this market', lessons:[
  {id:'fu-risks', icon:'🧨', minutes:7, title:'What can hurt you in futures',
   lede:'Futures are efficient and transparent. They are also leveraged, fast and settled daily.',
   blocks:[
    {list:[
     '<b>Leverage you did not mean to take.</b> Low day-trading margins invite oversizing. Size by the stop, every time.',
     '<b>Overnight and weekend gaps.</b> Holding through the daily halt or the weekend can mean opening far past your stop.',
     '<b>Limits and halts.</b> Exchanges use price limits and circuit breakers in extreme moves, which can pause trading while you are stuck in a position.',
     '<b>Expiration and delivery.</b> Forgetting to roll can leave you in an expiring contract with thin liquidity, or facing forced closure by your broker on physically settled contracts.',
     '<b>Losses beyond your deposit.</b> Daily settlement takes cash from your account, and a large enough move can leave you owing the broker.'
    ]},
    {example:{title:'April 20, 2020', text:'The expiring May WTI crude oil futures contract settled at about negative $37 a barrel. Storage was nearly full, and holders who could not take delivery paid others to take their contracts. Traders who did not understand expiration and delivery lost far more than they thought was possible.'}},
    {callout:{tone:'key', title:'Your defense', text:'Trade micros, size by the stop, be flat or reduced through major events and weekends while learning, know your contract\'s roll date, and never hold a physically settled contract near expiration.'}}
   ],
   quiz:[
    {q:'What happened to May WTI crude futures on April 20, 2020?', opts:['Trading never opened','It settled at a negative price','It doubled','It was cancelled'], correct:1, why:'It settled around -$37 a barrel as storage filled.'},
    {q:'Why do low day-trading margins create risk?', opts:['They raise fees','They let you open far more contracts than your account can survive','They shorten trading hours','They don\'t'], correct:1, why:'Easy leverage tempts oversizing.'},
    {q:'What can happen if you forget to roll a physically settled contract?', opts:['Nothing','Forced closure or delivery problems in thin, expiring markets','You get a refund','It rolls automatically everywhere'], correct:1, why:'Expiring contracts get thin, and brokers force-close physical delivery risk.'},
    {q:'What is the core defense?', opts:['Bigger contracts','Micros sized by the stop, with care around events, weekends and rolls','No stops','Only trading overnight'], correct:1, why:'Size and awareness handle most of what can go wrong.'}
   ]}
 ]}
 ]
};
