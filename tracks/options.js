window.DOJO_TRACK = {
 id:'options',
 title:'Options',
 tagline:'Contracts, premiums and the Greeks, with defined-risk strategies first.',
 parts:[
 {title:'How the industry works', lessons:[
  {id:'op-what', icon:'📜', minutes:7, title:'What an option actually is',
   lede:'An option is a contract with a deadline. Almost everything confusing about options comes from the deadline.',
   blocks:[
    {p:'An option gives the buyer the <b>right, but not the obligation</b>, to buy or sell something at a set price until a set date. The seller takes the other side and accepts the <b>obligation</b> if the buyer uses that right.'},
    {terms:[
     ['Call','The right to buy the underlying at the strike price. Calls gain value when the underlying rises.'],
     ['Put','The right to sell the underlying at the strike price. Puts gain value when the underlying falls.'],
     ['Strike','The price written into the contract.'],
     ['Expiration','The last day the contract exists. After that it is either exercised or worthless.'],
     ['Premium','The price of the option. The buyer pays it, the seller collects it.'],
     ['Multiplier','A standard US equity option covers 100 shares, so a premium of $2.50 costs $250 per contract.']
    ]},
    {h:'Buyers and sellers live in different worlds'},
    {table:{head:['','Buyer','Seller'], rows:[
     ['Pays or receives','Pays the premium','Receives the premium'],
     ['Best case','Large, sometimes unlimited gain','Keeps the premium'],
     ['Worst case','Loses the premium','Large losses, unlimited for an uncovered call'],
     ['Time is','Working against you','Working for you']
    ]}},
    {example:{title:'Reading one contract', text:'"AAPL 30-day 200 call at $4.00" means: the right to buy 100 Apple shares at $200 each, for the next 30 days, costing $400. If Apple is at $210 at expiration, the call is worth about $10 per share ($1,000), a $600 profit. If Apple is at $195, it expires worthless and the buyer loses the full $400.'}},
    {callout:{tone:'key', title:'The deadline changes everything', text:'With shares, being right eventually is enough. With an option, you need to be right <b>by a date</b> and, usually, <b>by enough</b> to cover the premium. Many option buyers are right about direction and still lose money.'}}
   ],
   quiz:[
    {q:'What does buying a put give you?', opts:['The obligation to buy shares','The right to sell the underlying at the strike','A dividend','Ownership of 100 shares'], correct:1, why:'A put is the right to sell at the strike price until expiration.'},
    {q:'A US equity option is quoted at $1.80. What does one contract cost?', opts:['$1.80','$18','$180','$1,800'], correct:2, why:'One contract covers 100 shares: $1.80 × 100 = $180.'},
    {q:'Who has the obligation in an options contract?', opts:['The buyer','The seller','The exchange','Nobody'], correct:1, why:'The buyer holds the right. The seller must perform if the buyer exercises.'},
    {q:'You buy a call, the stock rises, but you still lose money. What is the most likely reason?', opts:['Calls lose when stocks rise','The rise was too small or too slow to overcome the premium and time decay','Options cannot be sold','The exchange closed'], correct:1, why:'You need enough move, soon enough, to beat what you paid.'}
   ]},
  {id:'op-market', icon:'🏛️', minutes:7, title:'How listed options trade',
   lede:'Behind every options trade is a clearinghouse, a market maker and a calendar.',
   blocks:[
    {p:'US-listed options trade on more than a dozen exchanges, run by operators such as Cboe, Nasdaq, NYSE and others. Every listed contract is cleared by the <b>Options Clearing Corporation (OCC)</b>, which stands between buyers and sellers and guarantees performance. You never need to worry about the specific person on the other side defaulting.'},
    {p:'<b>Market makers</b> quote bid and ask prices on thousands of contracts at once and hedge their exposure, usually by trading the underlying shares. They earn the spread. On busy names like SPY that spread is a penny or two. On thin contracts it can be a large share of the option\'s price.'},
    {h:'The calendar'},
    {list:[
     '<b>Monthly options</b> expire on the third Friday of the month.',
     '<b>Weekly options</b> expire on other Fridays, and on the most active products there are expirations on other weekdays too.',
     '<b>Zero-days-to-expiration (0DTE)</b> trades open and close on the expiration day itself. Cboe reported that in August 2025, 0DTE contracts were a record 62% of all SPX options volume, with retail traders estimated at about half of that.'
    ]},
    {h:'American and European style'},
    {terms:[
     ['American style','Can be exercised any day up to expiration. Most single-stock and ETF options, including SPY, are American style. That means short positions can be assigned early.'],
     ['European style','Can only be exercised at expiration. Index options such as SPX are European style and settle in cash, not shares.']
    ]},
    {callout:{tone:'warn', title:'About 0DTE', text:'Same-day options move extremely fast because there is almost no time value left to cushion them. A position can go from a gain to a total loss in minutes. That is why the Dojo lab starts at 7 days and focuses on defined-risk structures.'}}
   ],
   quiz:[
    {q:'What does the OCC do?', opts:['Sets stock prices','Clears listed options and guarantees performance','Approves your account','Regulates crypto'], correct:1, why:'The OCC is the central clearinghouse for US-listed options.'},
    {q:'When do standard monthly options expire?', opts:['First Monday','Third Friday','Last day of the month','Every day'], correct:1, why:'Standard monthly equity options expire on the third Friday.'},
    {q:'SPY options are American style. What does that mean for a seller?', opts:['They can never be assigned','They can be assigned before expiration','They settle in cash only','They have no strike'], correct:1, why:'American-style options can be exercised early, so sellers can be assigned early.'},
    {q:'What share of SPX options volume did Cboe report as 0DTE in August 2025?', opts:['About 10%','About 25%','About 62%','100%'], correct:2, why:'0DTE reached a record 62.4% of SPX volume that month.'}
   ]},
  {id:'op-price', icon:'💲', minutes:8, title:'What you are paying for in a premium',
   lede:'Every premium is two things: what the option is worth right now, and what it might be worth before it expires.',
   blocks:[
    {terms:[
     ['Intrinsic value','What the option would be worth if exercised now. A 100 call with the stock at 106 has $6 of intrinsic value. Out-of-the-money options have none.'],
     ['Extrinsic (time) value','Everything above intrinsic value. It pays for time and uncertainty, and it shrinks to zero by expiration.']
    ]},
    {table:{head:['Moneyness','Call (stock at 100)','Put (stock at 100)'], rows:[
     ['In the money (ITM)','Strike below 100','Strike above 100'],
     ['At the money (ATM)','Strike near 100','Strike near 100'],
     ['Out of the money (OTM)','Strike above 100','Strike below 100']
    ]}},
    {h:'What makes extrinsic value bigger'},
    {list:[
     '<b>More time.</b> A 60-day option costs more than a 7-day option at the same strike.',
     '<b>Higher implied volatility (IV).</b> IV is the market\'s price for expected movement. When traders expect big moves, every option gets more expensive.',
     '<b>Closer to the money.</b> At-the-money options carry the most time value.'
    ]},
    {h:'IV crush'},
    {example:{title:'The earnings trap', text:'Before an earnings report, IV is often elevated because a big move is expected. After the report, the uncertainty is gone and IV can drop sharply overnight. A trader who bought calls before earnings can see the stock rise and still lose money, because the collapse in IV took more out of the premium than the move added.'}},
    {callout:{tone:'tip', title:'In the lab', text:'The options lab estimates IV from recent historical volatility of the underlying. As the drill moves forward and volatility changes, you can watch vega move your P&L even when price barely moves.'}}
   ],
   quiz:[
    {q:'Stock at $52, you own the 50 call trading at $3.10. How much is extrinsic value?', opts:['$0.00','$1.10','$2.00','$3.10'], correct:1, why:'Intrinsic is $2.00 (52 minus 50). The rest, $1.10, is extrinsic.'},
    {q:'What happens to extrinsic value by expiration?', opts:['It doubles','It goes to zero','It becomes intrinsic','It stays the same'], correct:1, why:'Time value fully decays by expiration.'},
    {q:'Implied volatility rises across the market. What happens to option premiums, all else equal?', opts:['They fall','They rise','Only puts change','Nothing'], correct:1, why:'Higher expected movement makes optionality more valuable.'},
    {q:'You bought calls before earnings. The stock rose 2% but your calls lost value. Most likely cause?', opts:['A broker error','IV crush after the report','Calls lose on up moves','Assignment'], correct:1, why:'The drop in implied volatility outweighed the small price gain.'}
   ]},
  {id:'op-greeks', icon:'🔣', minutes:9, title:'The Greeks, in plain language',
   lede:'The Greeks tell you how your position will react before it happens.',
   blocks:[
    {terms:[
     ['Delta','How much the option price changes for a $1 move in the underlying. A 0.50 delta call gains about $0.50 per share, or $50 per contract, for each $1 rise. Delta also works as a rough gut-check of how likely the option is to finish in the money.'],
     ['Gamma','How fast delta changes as price moves. High near the money and near expiration, which is why short-dated options can swing wildly.'],
     ['Theta','What one day of time does to the price. Long options usually have negative theta: they lose a little every day.'],
     ['Vega','How much the price changes when implied volatility moves one point.']
    ]},
    {h:'Position Greeks'},
    {p:'For a multi-leg position, Greeks add up. A bull call spread has positive delta like a call, but the short leg cancels much of the theta and vega. That is a big part of why spreads behave more calmly than single options.'},
    {example:{title:'Reading the lab panel', text:'Your position shows Delta 40, Theta/day -$6, Vega $12. That means: about +$40 if the stock rises $1, about -$6 for each day that passes with nothing happening, and about +$12 if implied volatility rises one point. Before you step forward a day, you should be able to say which of those will dominate.'}},
    {decision:{q:'You hold a long call with 5 days left. Price has not moved for a week. What is eating your position?', opts:[
     {t:'Delta', ok:false, why:'Delta matters when price moves. Price hasn\'t moved.'},
     {t:'Theta, and it accelerates as expiration gets close', ok:true, why:'Time decay is fastest in the final days, especially for at-the-money options.'},
     {t:'Nothing, options only change when price moves', ok:false, why:'Options lose time value every day, whether price moves or not.'}
    ]}},
    {drill:{lab:'options', title:'Watch the Greeks work', symbol:'SPY', strategy:'long_call', brief:'Open a long call drill and step forward one day at a time for two weeks without closing. Before each step, predict the change from delta and theta, then compare.', rules:['30-day expiry','Write down delta and theta at entry','Step one day at a time','Note the day theta clearly outweighed delta']}}
   ],
   quiz:[
    {q:'Your call has a delta of 0.30. The stock rises $2. Roughly how much does the option gain per contract?', opts:['$0.60','$6','$60','$600'], correct:2, why:'0.30 × $2 = $0.60 per share, × 100 shares = $60.'},
    {q:'What does negative theta mean?', opts:['The position gains from time passing','The position loses value as time passes','IV is falling','The option is a put'], correct:1, why:'Negative theta is daily time decay working against you.'},
    {q:'When is gamma highest?', opts:['Deep out of the money, far from expiry','Near the money and close to expiration','Only on puts','Never on calls'], correct:1, why:'Near-the-money short-dated options have delta that changes very fast.'},
    {q:'Why does a spread usually decay more slowly than a single long option?', opts:['Spreads never expire','The short leg offsets much of the long leg\'s theta and vega','Spreads have no delta','The OCC pays the decay'], correct:1, why:'Position Greeks add, so the short leg cancels part of the exposure.'}
   ]}
 ]},
 {title:'The business around it', lessons:[
  {id:'op-access', icon:'🔑', minutes:7, title:'Approval levels, costs and the new day-trading rules',
   lede:'Before you can trade options, your broker decides what you are allowed to trade.',
   blocks:[
    {p:'Under FINRA Rule 2360, a broker must approve an account for options before you trade them, and you must receive a booklet called <b>Characteristics and Risks of Standardized Options</b>. Brokers sort strategies into approval levels. The names differ by broker, but the ladder usually looks like this:'},
    {table:{head:['Typical level','What it allows'], rows:[
     ['1','Covered calls and cash-secured puts'],
     ['2','Buying calls and puts'],
     ['3','Spreads (defined-risk combinations)'],
     ['4 and up','Uncovered (naked) selling, which needs margin and can lose more than the account']
    ]}},
    {h:'What it costs'},
    {list:[
     '<b>Commissions and contract fees.</b> Often a fee per contract, charged on every leg, opening and closing.',
     '<b>The bid-ask spread.</b> Usually the biggest real cost. On a four-leg iron condor you cross it four times to open and four times to close.',
     '<b>Assignment fees</b> at some brokers.'
    ]},
    {callout:{tone:'key', title:'The pattern day trader rule is going away', text:'For decades, US margin accounts flagged as "pattern day traders" needed $25,000 in equity. In 2026 the SEC approved FINRA\'s change eliminating that test and the $25,000 minimum, replacing it with new intraday margin standards. The change took effect on June 4, 2026, but firms may phase it in until October 20, 2027, so your broker may still apply the old rule for a while. Ask them.'}},
    {callout:{tone:'warn', title:'Not a green light', text:'Fewer restrictions on day trading do not make day trading options easier to do well. They remove a speed bump. Your own rules have to do that job now.'}}
   ],
   quiz:[
    {q:'What must a broker do before you trade options?', opts:['Nothing','Approve the account for options and provide the options risk disclosure booklet','Charge a $25,000 deposit','Register you with the OCC'], correct:1, why:'FINRA Rule 2360 requires approval and the disclosure document.'},
    {q:'Which approval level usually covers uncovered (naked) selling?', opts:['The lowest','The highest','None, it is illegal','Only for puts'], correct:1, why:'Naked selling carries the largest risk, so it sits at the top of the ladder.'},
    {q:'What happened to the $25,000 pattern day trader minimum?', opts:['It was raised to $50,000','It was eliminated in 2026, with a phase-in period for firms','It only applies to crypto','Nothing changed'], correct:1, why:'FINRA replaced it with intraday margin standards effective June 4, 2026, with phase-in allowed until October 2027.'},
    {q:'On a four-leg position, why does the bid-ask spread matter so much?', opts:['It only applies once','You pay it on every leg, in and out','Brokers waive it','It is refunded at expiry'], correct:1, why:'Each leg crosses the spread on entry and exit, so costs multiply.'}
   ]},
  {id:'op-assign', icon:'📬', minutes:8, title:'Exercise, assignment and expiration day',
   lede:'If you sell options, someday you will be assigned. It is better to understand it before it happens.',
   blocks:[
    {p:'<b>Exercise</b> is the buyer using the right. <b>Assignment</b> is the seller being chosen to fulfill it. Assignment is random among sellers of that contract.'},
    {list:[
     'At expiration, the OCC automatically exercises equity options that are at least $0.01 in the money, unless the holder instructs otherwise.',
     'If you are short an in-the-money put at expiration, you will likely buy 100 shares per contract. Short an in-the-money call, you will likely sell (or go short) 100 shares.',
     'American-style options can be assigned <b>early</b>. It is most common for in-the-money short calls just before an ex-dividend date, when the dividend is worth more than the option\'s remaining time value.'
    ]},
    {h:'Pin risk'},
    {p:'When the stock closes right at your short strike on expiration day, you may not know whether you will be assigned until after the close. You could wake up Monday with a stock position you did not plan, exposed to a weekend gap.'},
    {callout:{tone:'warn', title:'The spread trap', text:'In a spread, if your short leg is assigned early you still hold the long leg as protection, but now you hold shares too. Most brokers handle this, but you need to act: close or exercise appropriately. Many traders close spreads before expiration day specifically to avoid pin and assignment risk.'}},
    {callout:{tone:'tip', title:'A simple habit', text:'Close or roll any short option that is near or in the money before the final day. The last few cents of premium are rarely worth the operational risk.'}}
   ],
   quiz:[
    {q:'At expiration, what happens to an equity option $0.05 in the money?', opts:['It expires worthless','It is typically exercised automatically','The broker refunds it','It rolls to next month'], correct:1, why:'The OCC auto-exercises equity options at least $0.01 in the money unless instructed otherwise.'},
    {q:'When is early assignment on a short call most likely?', opts:['Right after you open it','Just before an ex-dividend date, when it is in the money','On weekends','Never'], correct:1, why:'Holders may exercise early to capture the dividend.'},
    {q:'What is pin risk?', opts:['A broker fee','Uncertainty about assignment when price closes near your short strike at expiration','Losing your PIN','Interest on margin'], correct:1, why:'You may not know your share position until after the market closes.'},
    {q:'What simple habit avoids most expiration-day problems?', opts:['Hold everything to the last second','Close or roll short options near the money before the final day','Use more contracts','Turn off notifications'], correct:1, why:'Closing early gives up a little premium to remove assignment and gap risk.'}
   ]},
  {id:'op-redflags', icon:'🚩', minutes:6, title:'The options hype machine',
   lede:'Options marketing sells two dreams: the lottery ticket and the paycheck. Both leave out the losses.',
   blocks:[
    {h:'The lottery ticket'},
    {p:'Screenshots of a $200 call turning into $20,000 travel far. The thousands of $200 calls that went to zero do not. Cheap, far out-of-the-money, short-dated options are cheap because they usually expire worthless.'},
    {h:'The paycheck'},
    {p:'"Sell options and collect weekly income" courses show a long line of small wins. Selling premium does win often. But the losses, when they come, can erase months of wins in one move, and uncovered selling can lose far more than the account.'},
    {callout:{tone:'warn', title:'Red flags', text:'Guaranteed weekly or monthly income. Win rates shown without average loss. Only winning trades posted. Pressure to trade 0DTE every day. Paid alerts with no complete, verifiable record. "This one trick" to avoid losses.'}},
    {callout:{tone:'key', title:'The only honest scoreboard', text:'Win rate means nothing without the size of the average win and the average loss. A 90% win rate with an average win of $50 and an average loss of $600 loses money. That is why the Dojo measures every options trade in R, where 1R is the position\'s maximum loss.'}}
   ],
   quiz:[
    {q:'Why are far out-of-the-money, short-dated options so cheap?', opts:['Market makers are generous','They usually expire worthless','They have no risk','The OCC subsidizes them'], correct:1, why:'Low prices reflect low odds of finishing in the money.'},
    {q:'A strategy wins 90% of the time, averaging +$50, and loses 10% averaging -$600. What is the expectancy per trade?', opts:['+$45','-$15','+$5','$0'], correct:1, why:'0.9 × 50 = 45. 0.1 × -600 = -60. 45 - 60 = -$15 per trade.'},
    {q:'What does 1R mean for an options trade in the Dojo?', opts:['One contract','The position\'s maximum loss','One day','One percent of the premium'], correct:1, why:'Measuring in R makes different structures comparable.'},
    {q:'An alert service shows only its winning trades. What can you conclude?', opts:['It is profitable','Nothing reliable','It is regulated','It never loses'], correct:1, why:'Without the losers you cannot judge expectancy.'}
   ]}
 ]},
 {title:'Strategies, honestly presented', lessons:[
  {id:'op-buying', icon:'🎟️', minutes:8, title:'Buying calls and puts',
   lede:'The simplest options trade, and the hardest one to win consistently.',
   blocks:[
    {p:'A long call or long put has a fixed maximum loss (the premium) and a large potential gain. It suits one situation: you expect a <b>big move, soon</b>.'},
    {h:'Rules for the Dojo version'},
    {steps:[
     '<b>Have a price target and a timeframe</b> from the chart before you look at options.',
     '<b>Buy enough time:</b> an expiration comfortably past your timeframe, at least 30 days in the lab.',
     '<b>Prefer near the money.</b> Far out-of-the-money options need huge moves.',
     '<b>Size by premium:</b> the premium is your max loss, so contracts = risk budget ÷ premium per contract.',
     '<b>Exit</b> when your target is hit, when the chart proves the idea wrong, or when half your time is gone without the move.'
    ]},
    {callout:{tone:'warn', title:'When it fails', text:'Slow moves, sideways markets and falling volatility. You can be right on direction and still lose to theta and vega.'}},
    {drill:{lab:'options', title:'Long calls on PLTR', symbol:'PLTR', strategy:'long_call', brief:'Only open a call when the daily chart shows a clear uptrend and you can name a target. Close at the target, at the invalidation level, or at half the time.', rules:['30 or 45 days to expiry','Write the target and invalidation level first','Exit at half the time if nothing has happened','Log whether direction was right even on losers']}}
   ],
   quiz:[
    {q:'When does buying a call make the most sense?', opts:['You expect a slow drift up over a year','You expect a big move up, soon','You expect nothing to happen','You want weekly income'], correct:1, why:'Long options need size and speed to overcome premium and decay.'},
    {q:'Max loss on a long put?', opts:['Unlimited','The premium paid','The strike price','Zero'], correct:1, why:'The most a buyer can lose is the premium.'},
    {q:'Why buy more time than your expected timeframe?', opts:['Longer options are cheaper','To leave room if the move takes longer, and because decay is fastest near expiry','It is required','To avoid commissions'], correct:1, why:'Extra time reduces the damage from decay and late moves.'},
    {q:'Account risk budget is $250 and a call costs $1.20. How many contracts?', opts:['1','2','20','208'], correct:1, why:'Each contract costs $120. $250 ÷ $120 = 2 contracts.'}
   ]},
  {id:'op-debit', icon:'📈', minutes:9, title:'Debit spreads',
   lede:'Give up the unlimited upside you were unlikely to get, and pay much less for the trade.',
   blocks:[
    {p:'A <b>bull call spread</b> buys a call and sells a higher-strike call with the same expiration. A <b>bear put spread</b> buys a put and sells a lower-strike put. You pay a net debit, which is your maximum loss. Your maximum gain is the width between strikes minus that debit.'},
    {example:{title:'The math', text:'Stock at 100. Buy the 100 call for $4.00, sell the 105 call for $1.80. Net debit $2.20, or $220 per spread. Max gain: $5.00 width minus $2.20 = $2.80, or $280. Breakeven at expiration: $102.20.'}},
    {h:'Rules'},
    {steps:[
     '<b>Direction first:</b> a trend or setup on the daily chart with a target.',
     '<b>Short strike near your target.</b> The spread pays the most if price reaches it.',
     '<b>30 to 60 days</b> to expiration.',
     '<b>Size by debit:</b> it is your max loss.',
     '<b>Take profit</b> at 50% to 75% of max gain. The last part of the gain takes the longest to collect.',
     '<b>Close</b> if the underlying breaks the level that invalidates your idea.'
    ]},
    {callout:{tone:'key', title:'Why traders like them', text:'The short leg pays for part of the long leg, offsets time decay and reduces the hit from falling volatility. You trade a capped upside for a much better chance of making money on a moderate move.'}},
    {drill:{lab:'options', title:'Bull call spreads on SPY', symbol:'SPY', strategy:'bull_call_spread', brief:'Open spreads only in uptrends. Use the strike buttons to place the short strike near a realistic target.', rules:['30 to 45 days','Short strike near your target','Take profit at half the max gain','Close on a break of the trend']}}
   ],
   quiz:[
    {q:'In a 50/55 bull call spread bought for $2.00, what is the max gain per spread?', opts:['$200','$300','$500','Unlimited'], correct:1, why:'Width $5.00 minus $2.00 debit = $3.00, or $300.'},
    {q:'What is the max loss of a debit spread?', opts:['The width','The net debit paid','Unlimited','Zero'], correct:1, why:'You can lose only what you paid.'},
    {q:'Where should the short strike usually go?', opts:['Far below the price','Near your price target','At zero','Anywhere'], correct:1, why:'Placing it near your target captures most of the expected move.'},
    {q:'Why take profit at 50% to 75% of max gain?', opts:['It is required','The remaining gain takes the most time and risk to collect','Spreads expire early','Brokers force it'], correct:1, why:'The last part of a spread\'s value only arrives near expiration.'}
   ]},
  {id:'op-credit', icon:'🧾', minutes:9, title:'Credit spreads',
   lede:'Get paid up front to be wrong slowly. Lose bigger when you are wrong fast.',
   blocks:[
    {p:'A <b>bull put credit spread</b> sells a put below the current price and buys a further out-of-the-money put for protection. You collect a credit. If the stock stays above the short strike, both expire worthless and you keep it.'},
    {example:{title:'The math', text:'Stock at 100. Sell the 95 put for $1.20, buy the 90 put for $0.40. Credit $0.80, or $80. Max loss: width $5.00 minus $0.80 = $4.20, or $420. Breakeven: $94.20. You risk $420 to make $80.'}},
    {callout:{tone:'key', title:'This breaks the 1:2 rule, by design', text:'Credit spreads win often but risk far more than they make. The Dojo\'s 1:2 reward-to-risk rule does not fit them. What has to be true instead is positive <b>expectancy</b>: with $80 wins and $420 losses, you need to win more than about 84% of the time, after costs, just to break even. Your journal is the only way to know if you do.'}},
    {h:'Rules'},
    {steps:[
     '<b>Neutral to bullish chart:</b> price above a support level, short strike below that support.',
     '<b>30 to 45 days</b> to expiration.',
     '<b>Size by max loss</b>, not credit.',
     '<b>Take profit</b> at about 50% of the credit.',
     '<b>Close</b> if price breaks the short strike. Do not wait to see if it comes back.'
    ]},
    {drill:{lab:'options', title:'Bull put credit spreads on IWM', symbol:'IWM', strategy:'bull_put_spread', brief:'Only sell put spreads when price is holding above support. Track your win rate against the break-even win rate the lab implies.', rules:['Short strike below support','Close at 50% of credit','Close if the short strike is breached','After 20 trades, compare your win rate to the break-even rate']}}
   ],
   quiz:[
    {q:'Sell a 50 put for $1.00, buy a 45 put for $0.30. What is the max loss per spread?', opts:['$70','$430','$500','Unlimited'], correct:1, why:'Width $5.00 minus $0.70 credit = $4.30, or $430.'},
    {q:'Why does the Dojo judge credit spreads by expectancy instead of the 1:2 rule?', opts:['They have no risk','They risk more than they make, so the win rate decides everything','They never lose','The rule is outdated'], correct:1, why:'High win rate, small win, large loss: only expectancy shows if it works.'},
    {q:'Credit $80, max loss $420. Roughly what win rate breaks even before costs?', opts:['50%','66%','84%','99%'], correct:2, why:'420 ÷ (420 + 80) ≈ 84%.'},
    {q:'Price breaks below your short put strike. What do the rules say?', opts:['Wait for a bounce','Close the trade','Sell another spread','Remove the long put'], correct:1, why:'The trade idea was price holding above that level. It no longer is.'}
   ]},
  {id:'op-condor', icon:'🦅', minutes:8, title:'Iron condors',
   lede:'Bet that a market stays inside a range, with protection on both sides.',
   blocks:[
    {p:'An <b>iron condor</b> combines a bull put credit spread below the price and a bear call credit spread above it. If price stays between the short strikes until expiration, you keep the whole credit. Max loss is the width of one side minus the credit.'},
    {h:'When it works and when it fails'},
    {list:[
     '<b>Works:</b> range-bound markets, especially when implied volatility is high and falling.',
     '<b>Fails:</b> strong trends and sudden shocks. One side gets run over.',
     '<b>Costs:</b> four legs means four spreads to cross on entry and four on exit. On thin underlyings this alone can ruin the trade.'
    ]},
    {h:'Rules'},
    {steps:[
     'Use liquid underlyings: index ETFs are the usual choice.',
     'Place short strikes outside a clear range on the chart.',
     '30 to 45 days to expiration.',
     'Take profit at about 50% of the credit.',
     'If price reaches one short strike, close the whole condor or that side. Decide which in advance.'
    ]},
    {drill:{lab:'options', title:'Iron condors on SPY', symbol:'SPY', strategy:'iron_condor', brief:'Only open condors when the warm-up candles show a sideways market. Skip trending drills entirely and step through them to study.', rules:['Sideways chart only','Short strikes outside the range','Close at 50% of credit','Exit if a short strike is touched']}}
   ],
   quiz:[
    {q:'What does an iron condor profit from?', opts:['A big move up','A big move down','Price staying inside a range','Rising volatility'], correct:2, why:'It collects premium if price stays between the short strikes.'},
    {q:'What usually breaks an iron condor?', opts:['A quiet market','A strong trend or shock through a short strike','Time passing','Falling IV'], correct:1, why:'Trends push price through one side.'},
    {q:'Why prefer liquid underlyings for condors?', opts:['They are more exciting','Four legs means the bid-ask cost is paid many times','They expire faster','They have no assignment'], correct:1, why:'Costs multiply with legs. Wide spreads can eat the whole credit.'},
    {q:'Each side is $5 wide and the total credit is $1.20. What is the max loss per condor?', opts:['$120','$380','$500','$1,000'], correct:1, why:'Only one side can lose at expiration: $5.00 minus $1.20 = $3.80, or $380.'}
   ]}
 ]},
 {title:'Practice plan', lessons:[
  {id:'op-plan', icon:'🗓️', minutes:6, title:'Your options practice plan',
   lede:'Options give you many ways to express one idea. Practice one way until the numbers speak.',
   blocks:[
    {steps:[
     '<b>Choose one structure</b> to start. Debit spreads are the friendliest: defined risk, moderate decay, clear targets.',
     '<b>Choose one or two underlyings</b> with tight markets, like SPY or IWM.',
     '<b>Fix your risk</b> per trade as a percentage of the practice account. The lab sizes contracts by max loss.',
     '<b>Run 30 options lab drills</b>, then review: win rate, average win and loss in R, and how often you followed your exit rules.',
     '<b>Only then add a second structure</b>, and journal them separately by setup name.'
    ]},
    {callout:{tone:'key', title:'How the Dojo scores options', text:'1R is the position\'s maximum loss. A spread risking $300 that makes $150 is +0.5R. This lets you compare a long call, a debit spread and a condor on the same scale, and it feeds the same graduation gate as the rest of your practice.'}},
    {callout:{tone:'warn', title:'Model versus market', text:'The lab models premiums from historical volatility. Real markets add skew, earnings events and wider spreads on less liquid strikes. If you move to a broker\'s paper account next, expect prices and fills to look different.'}}
   ],
   quiz:[
    {q:'Which structure does the plan suggest starting with?', opts:['Naked puts','Debit spreads','0DTE lottery calls','Ratio spreads'], correct:1, why:'Defined risk, moderate decay and clear targets make them the friendliest starting point.'},
    {q:'A condor risking $400 makes $100. What is the result in R?', opts:['+0.25R','+1R','+4R','-0.25R'], correct:0, why:'$100 ÷ $400 = +0.25R.'},
    {q:'Why journal structures separately?', opts:['For tax reasons','So each structure\'s stats are meaningful','The lab requires it','To make more trades'], correct:1, why:'Mixed results hide which structure works for you.'},
    {q:'What is the main difference you should expect between the lab and a real broker?', opts:['None','Real prices include skew, events and wider spreads on some strikes','The lab is always more expensive','Real options never expire'], correct:1, why:'The lab uses a model. Markets are messier.'}
   ]}
 ]},
 {title:'Risks specific to this market', lessons:[
  {id:'op-risks', icon:'🧨', minutes:8, title:'What can hurt you with options',
   lede:'Options let you control risk precisely, or hide it completely. These are the ways it hides.',
   blocks:[
    {list:[
     '<b>Uncovered (naked) short options.</b> A short call has no limit on loss. A short put can lose almost the entire strike value. One gap can exceed your account.',
     '<b>Total loss is normal.</b> Long options routinely expire worthless. A 100% loss on a position is not a disaster in options; oversizing it is.',
     '<b>Gaps through spreads.</b> A spread caps your loss, but price can gap from comfortable to maximum loss overnight, with no chance to exit in between.',
     '<b>IV crush.</b> Around earnings and events, falling volatility can wipe out gains from a correct directional call.',
     '<b>Liquidity.</b> Wide bid-ask spreads on thin strikes can cost more than the edge in the trade.',
     '<b>Assignment and pin risk.</b> Covered in Part 2. They turn an options position into a stock position you did not plan.',
     '<b>0DTE speed.</b> Extreme gamma means seconds matter. The same-day product is a different sport.'
    ]},
    {callout:{tone:'key', title:'Your defense', text:'Trade defined-risk structures only until your journal says otherwise. Size so the maximum loss is the planned risk, every time. Avoid holding short options through earnings and expiration day. Prefer liquid underlyings.'}}
   ],
   quiz:[
    {q:'What is the maximum loss on an uncovered short call?', opts:['The premium','The strike price','Unlimited in theory','Zero'], correct:2, why:'The underlying can keep rising with no cap.'},
    {q:'Your bull put spread is safe at Friday\'s close. Monday it opens far below your long strike. What happened to your loss?', opts:['It is unlimited','It is at the defined max loss, reached by a gap','Nothing, spreads ignore gaps','It is refunded'], correct:1, why:'The spread caps the loss, but a gap can take you straight to it.'},
    {q:'You correctly predicted the direction after earnings and still lost. Most likely cause?', opts:['Assignment','IV crush','Gamma','Commissions only'], correct:1, why:'The drop in implied volatility outweighed the move.'},
    {q:'What is the main defense the Dojo recommends?', opts:['Higher leverage','Defined-risk structures sized by max loss','Only 0DTE','Holding through every event'], correct:1, why:'Defined risk plus proper sizing makes the worst case known before you enter.'}
   ]}
 ]}
 ]
};
