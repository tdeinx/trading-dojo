window.DOJO_TRACK = {
 id:'forex',
 title:'Forex & Gold',
 tagline:'The biggest market in the world, and the metal everyone watches.',
 parts:[
 {title:'How the industry works', lessons:[
  {id:'fx-market', icon:'🌐', minutes:7, title:'What the forex market actually is',
   lede:'There is no forex building and no single exchange. Understanding who is on the other side of your trade changes how you think about it.',
   blocks:[
    {p:'Forex (foreign exchange) is the trading of one currency for another. Unlike stocks, there is no central exchange. Trading happens <b>over the counter</b>: banks, dealers and brokers quote prices to each other and to their clients across a global network of electronic platforms.'},
    {p:'It is the largest financial market in the world. The Bank for International Settlements surveys it every three years. Its April 2025 survey measured average turnover of about <b>$9.6 trillion per day</b>, up 28% from 2022, with the US dollar on one side of roughly 89% of all trades.'},
    {h:'Who trades it'},
    {list:[
     '<b>Central banks</b> manage reserves and sometimes intervene to move their own currency.',
     '<b>Large dealer banks</b> make markets: they quote buy and sell prices and earn the difference.',
     '<b>Funds and asset managers</b> trade currencies directly or hedge foreign investments.',
     '<b>Companies</b> convert revenue and costs. An importer paying a supplier in euros is a currency buyer whether it cares about charts or not.',
     '<b>Retail traders</b> like you. A tiny slice of total volume, trading through brokers who aggregate orders or take the other side themselves.'
    ]},
    {h:'Reading a quote'},
    {p:'Currencies trade in pairs. In <b>EUR/USD 1.0850</b>, the euro is the <b>base</b> currency and the dollar is the <b>quote</b> currency: one euro costs 1.0850 dollars. Buying EUR/USD means buying euros and selling dollars at the same time. If the price rises, the euro strengthened against the dollar.'},
    {terms:[
     ['Majors','Pairs with the US dollar and another major currency: EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD, NZD/USD.'],
     ['Crosses','Pairs without the dollar, like EUR/GBP or EUR/JPY.'],
     ['Exotics','A major currency against a smaller or emerging one, like USD/ZAR. Wider spreads, sharper moves.'],
     ['Bid / Ask','The price you can sell at, and the higher price you can buy at. The gap is the spread.']
    ]},
    {callout:{tone:'key', title:'Why this matters to you', text:'Size and liquidity mean your orders will not move EUR/USD. But "the market" you see on a retail platform is your broker\'s price feed. Which broker you use, and how it makes money, matters more in forex than in almost any other market. Part 2 covers this.'}}
   ],
   quiz:[
    {q:'In the quote GBP/USD 1.2700, what does 1.2700 mean?', opts:['One dollar costs 1.27 pounds','One pound costs 1.27 dollars','The spread is 1.27 pips','The pair rose 1.27% today'], correct:1, why:'GBP is the base currency. The price tells you how many units of the quote currency (USD) one pound costs.'},
    {q:'Where does most forex trading take place?', opts:['On the New York Stock Exchange','On one central forex exchange in London','Over the counter between banks, dealers and brokers','Only through central banks'], correct:2, why:'There is no single exchange. Prices are quoted across a decentralized dealer network.'},
    {q:'Roughly what share of all FX trades had the US dollar on one side in the 2025 BIS survey?', opts:['About 25%','About 50%','About 89%','100%'], correct:2, why:'The dollar was on one side of about 89% of trades, which is why US data moves almost every pair.'},
    {q:'You buy EUR/USD. What are you doing?', opts:['Buying euros and selling dollars','Buying dollars and selling euros','Buying both currencies','Lending euros to the broker'], correct:0, why:'Buying a pair means buying the base and selling the quote.'}
   ]},
  {id:'fx-sessions', icon:'🕐', minutes:6, title:'Sessions: when price actually moves',
   lede:'Forex is open around the clock on weekdays, but it is not equally alive around the clock.',
   blocks:[
    {p:'The spot forex market opens Sunday around 5pm Eastern and closes Friday around 5pm Eastern. In between, trading follows the sun through four main financial centers.'},
    {table:{head:['Session','Approx. hours (Eastern)','What to expect'], rows:[
     ['Sydney','5pm to 2am','Quiet. AUD and NZD pairs most active.'],
     ['Tokyo','7pm to 4am','JPY pairs active. EUR/USD often drifts in a range.'],
     ['London','3am to 12pm','The largest center. Volume and volatility jump at the open.'],
     ['New York','8am to 5pm','US data releases. The London overlap is the busiest window of the day.']
    ]}},
    {p:'Hours shift by about an hour when the US, UK and Australia move clocks for daylight saving, and they don\'t all change on the same date. Check a session clock in your platform rather than memorizing times.'},
    {callout:{tone:'tip', title:'The overlap', text:'Roughly 8am to noon Eastern, London and New York are both open. Spreads are usually tightest and moves largest. Many of the strategies in Part 3 are built around this window, or around the quiet hours just before it.'}},
    {h:'Gold keeps similar hours'},
    {p:'Gold trades nearly 24 hours on weekdays as well. It tends to be most active during London and New York hours, and it often reacts sharply to US economic data at 8:30am Eastern.'},
    {decision:{q:'You live on the West Coast and can only trade 6pm to 9pm Pacific. You want to trade EUR/USD breakouts. What is the honest assessment?', opts:[
     {t:'Perfect, forex is 24 hours so any time works', ok:false, why:'Open is not the same as active. 6pm to 9pm Pacific is the Asian session, when EUR/USD is usually at its quietest.'},
     {t:'That window is mostly the quiet Asian session. Either pick a pair that is active then, like USD/JPY or AUD/USD, or pick a strategy that suits quiet ranges', ok:true, why:'Match the market and the strategy to the hours you actually have. That is a real edge most beginners skip.'},
     {t:'Use higher leverage to make up for smaller moves', ok:false, why:'Leverage does not create opportunity. It only magnifies results, including losses.'}
    ]}}
   ],
   quiz:[
    {q:'When does the spot forex week open?', opts:['Monday 9:30am Eastern','Sunday around 5pm Eastern','Monday midnight UTC','It never closes'], correct:1, why:'The week opens Sunday evening Eastern time as Asia-Pacific markets start Monday.'},
    {q:'Which window is usually the busiest for EUR/USD?', opts:['Sydney open','Tokyo lunch','The London and New York overlap','Friday after 5pm Eastern'], correct:2, why:'Two of the largest centers trading at once brings the most volume and tightest spreads.'},
    {q:'Why should you check session times in your platform instead of memorizing them?', opts:['They change every week','Daylight saving shifts them, on different dates in different countries','Brokers set their own sessions','Sessions only apply to gold'], correct:1, why:'The US, UK and Australia change clocks on different dates, so session times drift by an hour at points in the year.'},
    {q:'At what time do many US data releases hit, moving gold and the dollar?', opts:['8:30am Eastern','3am Eastern','5pm Eastern','Midnight Eastern'], correct:0, why:'Major US releases like jobs and inflation reports typically come out at 8:30am Eastern.'}
   ]},
  {id:'fx-pips', icon:'🧮', minutes:8, title:'Pips, lots and what a move is worth',
   lede:'If you can\'t say what one pip costs you before you enter, you don\'t know your risk.',
   blocks:[
    {p:'A <b>pip</b> is the standard unit of movement. For most pairs it is the fourth decimal place (0.0001). For yen pairs it is the second (0.01). Many brokers quote one more digit, called a pipette or fractional pip.'},
    {table:{head:['Lot','Units of base currency','EUR/USD value per pip'], rows:[
     ['Standard','100,000','$10.00'],
     ['Mini','10,000','$1.00'],
     ['Micro','1,000','$0.10']
    ]}},
    {p:'That table only holds when the <b>dollar is the quote currency</b> (EUR/USD, GBP/USD, AUD/USD). When the dollar is the base, like USD/JPY, the pip value depends on the price. One standard lot of USD/JPY at 150.00 is worth 100,000 × 0.01 ÷ 150 ≈ <b>$6.67 per pip</b>.'},
    {h:'Gold is quoted in dollars per ounce'},
    {p:'XAU/USD at 2,400.00 means one troy ounce costs $2,400. Contract sizes vary by broker, but the math is simple: <b>a $1 move is worth $1 per ounce you hold</b>. A standard 100-ounce lot makes $100 per dollar of movement, and gold can move $20 to $40 in a busy day.'},
    {example:{title:'Sizing a trade the Dojo way', text:'Account: $10,000. Rule: risk 1%, so $100. Trade: buy EUR/USD at 1.0850, stop at 1.0830. That is 20 pips. Each micro lot is $0.10 per pip, so one micro lot risks $2. $100 ÷ $2 = <b>50 micro lots</b> (half a standard lot). The same $100 risk on gold with an $8 stop is $100 ÷ $8 ≈ <b>12 ounces</b>. The practice lab does this math for you, but you should be able to do it on paper.'}},
    {callout:{tone:'warn', title:'Rookie mistake', text:'Choosing a lot size first and a stop second. Your stop goes where the trade is proven wrong. Then the size is calculated so that stop costs exactly your planned risk.'}}
   ],
   quiz:[
    {q:'What is one pip on EUR/USD?', opts:['0.01','0.0001','1.00','0.1%'], correct:1, why:'For non-yen pairs a pip is the fourth decimal place.'},
    {q:'One micro lot of EUR/USD moves 30 pips in your favor. Roughly what did you make?', opts:['$0.30','$3.00','$30.00','$300.00'], correct:1, why:'A micro lot is $0.10 per pip. 30 × $0.10 = $3.00.'},
    {q:'You hold 5 ounces of gold. Price rises from $2,400 to $2,412. What is your gain?', opts:['$12','$60','$120','$600'], correct:1, why:'$12 move × 5 ounces = $60.'},
    {q:'Account $5,000, risk 1%, EUR/USD stop is 25 pips. How many micro lots?', opts:['5','20','25','50'], correct:1, why:'Risk is $50. Each micro lot risks 25 × $0.10 = $2.50. $50 ÷ $2.50 = 20 micro lots.'},
    {q:'What should you decide first?', opts:['Lot size','Stop location','Leverage','Target'], correct:1, why:'Stop location comes from the chart. Size is derived from it.'}
   ]},
  {id:'fx-gold', icon:'🥇', minutes:7, title:'Gold: the market inside the market',
   lede:'Gold trades like a currency with no central bank and no interest payments. That shapes what moves it.',
   blocks:[
    {p:'The XAU in XAU/USD is the ISO code for one troy ounce of gold. Retail platforms usually offer it as spot gold. Professionals and many US traders use <b>gold futures</b> on COMEX instead, where contract specs are set by the exchange.'},
    {table:{head:['Contract','Size','Notes'], rows:[
     ['Spot XAU/USD (broker)','Varies by broker','No expiry. Pricing, spreads and overnight fees set by the broker.'],
     ['Gold futures (GC)','100 oz','Exchange traded and centrally cleared. Expires and rolls.'],
     ['Micro gold futures (MGC)','10 oz','Same market, one tenth the size.'],
     ['1-ounce gold futures (1OZ)','1 oz','Smallest exchange-traded size.']
    ]}},
    {callout:{tone:'warn', title:'If you are in the US', text:'Leveraged over-the-counter spot gold is restricted for US retail traders, and most US brokers do not offer XAU/USD the way offshore sites advertise it. US traders usually get gold exposure through gold futures or gold ETFs. Be wary of any offshore broker that lets you open an XAU/USD account from the US with high leverage.'}},
    {h:'What tends to move gold'},
    {list:[
     '<b>Real interest rates.</b> Gold pays no interest. When inflation-adjusted yields rise, holding gold costs more in missed income, and gold often weakens. When they fall, gold often strengthens.',
     '<b>The US dollar.</b> Gold is priced in dollars, so a weaker dollar tends to lift the gold price and a stronger one tends to weigh on it.',
     '<b>Fear and safe-haven demand.</b> Geopolitical shocks and financial stress can send buyers into gold.',
     '<b>Central bank buying.</b> Many central banks hold gold in reserves, and their buying trends can support prices for years.',
     '<b>Data days.</b> US inflation, jobs and Federal Reserve decisions often cause the day\'s largest moves.'
    ]},
    {p:'None of these is a rule. They are pressures. On any given day one can overwhelm the others, which is why your stop matters more than your opinion.'}
   ],
   quiz:[
    {q:'What does XAU represent?', opts:['A gold mining stock index','One troy ounce of gold','A gold ETF','100 ounces of gold'], correct:1, why:'XAU is the code for one troy ounce of gold.'},
    {q:'How big is one standard COMEX gold futures contract (GC)?', opts:['1 oz','10 oz','100 oz','1,000 oz'], correct:2, why:'GC is 100 ounces. MGC is 10, and 1OZ is 1.'},
    {q:'Real interest rates rise sharply. What pressure does that usually put on gold?', opts:['Upward, because gold pays more interest','Downward, because holding gold means giving up more yield','None at all','It forces futures to expire'], correct:1, why:'Gold pays no yield, so higher real yields raise the opportunity cost of holding it.'},
    {q:'A US resident finds an offshore site offering XAU/USD at 500:1 leverage. What is the best response?', opts:['Sign up, more leverage means more profit','Treat it as a red flag and check registration with the NFA first','Use it only for small trades','Ask in a Telegram group if it is legit'], correct:1, why:'US-regulated access to leveraged spot gold is restricted. An offshore offer like that is outside US protections.'}
   ]}
 ]},
 {title:'The business around it', lessons:[
  {id:'fx-brokers', icon:'🏦', minutes:8, title:'Who you are really trading with',
   lede:'In forex, your broker is often the other side of your trade. That is not automatically bad, but you should know it.',
   blocks:[
    {p:'Retail forex brokers generally run one of two models, and many run a mix.'},
    {terms:[
     ['Dealing desk (market maker)','The broker quotes you a price and takes the other side of your trade. It may hedge some of that risk with banks. It profits from the spread, and when clients as a group lose.'],
     ['No dealing desk (STP/ECN)','The broker passes orders to liquidity providers and earns a markup or commission. Spreads float and can be very tight, with a commission on top.']
    ]},
    {h:'What you pay'},
    {list:[
     '<b>Spread:</b> the gap between bid and ask, paid on every trade. It widens in quiet hours and around news.',
     '<b>Commission:</b> common on raw-spread accounts, charged per lot.',
     '<b>Swap (rollover):</b> interest charged or paid for holding overnight. Covered in the next lesson.',
     '<b>Slippage:</b> the difference between the price you expected and the price you got, especially on stops in fast markets.'
    ]},
    {h:'How to check a broker in the US'},
    {steps:[
     'The firm should be registered with the CFTC as a Retail Foreign Exchange Dealer (RFED) or Futures Commission Merchant (FCM).',
     'It should be a member of the National Futures Association. Look it up by name in <b>NFA BASIC</b>, the free search on nfa.futures.org.',
     'Read any disciplinary history listed there.',
     'Outside the US, check the regulator\'s own register (for example the FCA in the UK), not a logo on the broker\'s website.'
    ]},
    {callout:{tone:'key', title:'US leverage limits', text:'For US retail forex, the NFA caps leverage at 50:1 on major currency pairs and 20:1 on others. Offshore brokers advertising 500:1 or 1000:1 are outside those rules and outside US protections.'}},
    {callout:{tone:'tip', title:'The number brokers have to show you', text:'Regulators in many countries require brokers to disclose what share of retail accounts lose money. On UK and EU sites for leveraged products that warning is a majority, often far above half. Read it before you deposit. It is the most honest number on the site.'}}
   ],
   quiz:[
    {q:'In a dealing-desk model, who is usually on the other side of your trade?', opts:['The central bank','The broker','Another retail trader picked at random','Nobody, trades are virtual'], correct:1, why:'A market maker takes the other side and manages that risk itself.'},
    {q:'Where do you verify a US forex broker\'s registration?', opts:['The broker\'s homepage','NFA BASIC on the NFA website','A YouTube review','The app store rating'], correct:1, why:'NFA BASIC shows registration status and disciplinary history.'},
    {q:'What is the US retail leverage cap on major forex pairs?', opts:['10:1','50:1','100:1','500:1'], correct:1, why:'The NFA limit is 50:1 for majors and 20:1 for other pairs.'},
    {q:'Which cost is most likely to grow around a big news release?', opts:['The account opening fee','The spread and slippage','The NFA membership fee','The swap rate'], correct:1, why:'Liquidity thins around releases, so spreads widen and stops can fill worse.'}
   ]},
  {id:'fx-leverage', icon:'⚖️', minutes:7, title:'Leverage, margin and overnight costs',
   lede:'Leverage is the feature forex is sold on. It is also how most accounts die.',
   blocks:[
    {p:'<b>Margin</b> is the deposit your broker holds while a position is open. At 50:1 leverage, margin is 2% of the position\'s value. One standard lot of EUR/USD at 1.0800 controls $108,000, so it needs about $2,160 of margin.'},
    {p:'Here is the part that gets misunderstood: <b>leverage does not set your risk. Position size and stop distance do.</b> A $10,000 account risking 1% with a 20-pip stop takes half a standard lot whether the broker allows 50:1 or 500:1. High leverage only lets you take sizes that would be reckless.'},
    {example:{title:'How a margin call actually happens', text:'A trader puts $1,000 in and buys 2 standard lots of EUR/USD with high offshore leverage. Each pip is now worth $20. A 50-pip move against them is a $1,000 loss, the whole account, from a move EUR/USD can make in an afternoon. The broker closes the position automatically (a stop-out) before the balance goes negative, if it can.'}},
    {h:'Swap: the overnight charge'},
    {p:'Holding a spot forex position past about 5pm Eastern rolls it to the next day, and you pay or receive the interest-rate difference between the two currencies, plus the broker\'s markup. Most retail traders pay more than they receive.'},
    {list:[
     'Swaps are often charged <b>three times on Wednesday night</b> to cover the weekend, because of how spot currency settles. Check your broker\'s schedule.',
     'Gold also carries an overnight financing charge at most brokers, and it can be significant over weeks.',
     'Spreads often widen sharply for a few minutes around the 5pm Eastern rollover. Tight stops near that time can get hit by the spread alone.'
    ]},
    {decision:{q:'Your broker offers 50:1. You have $2,000 and a setup with a 30-pip stop on EUR/USD. What size keeps you inside the Dojo rule?', opts:[
     {t:'1 standard lot, the leverage allows it', ok:false, why:'1 standard lot at 30 pips is $300 of risk, 15% of the account on one trade.'},
     {t:'About 6 micro lots', ok:true, why:'1% is $20. Each micro lot risks 30 × $0.10 = $3. $20 ÷ $3 ≈ 6 micro lots.'},
     {t:'Whatever uses half the available margin', ok:false, why:'Margin usage is not a risk rule. The stop and your risk percentage decide size.'}
    ]}}
   ],
   quiz:[
    {q:'At 50:1 leverage, what percentage of a position\'s value is required as margin?', opts:['0.5%','2%','5%','50%'], correct:1, why:'1 ÷ 50 = 2%.'},
    {q:'Two traders each risk 1% with a 20-pip stop. One broker offers 50:1, the other 500:1. Who is taking more risk?', opts:['The one at 500:1','The one at 50:1','Neither, risk is the same','Impossible to say'], correct:2, why:'Risk is set by size and stop distance. Leverage only limits how large a size you can open.'},
    {q:'On which night are spot forex swaps often charged three times?', opts:['Monday','Wednesday','Friday','Sunday'], correct:1, why:'Settlement conventions push the weekend charge onto Wednesday night at most brokers.'},
    {q:'Why can a tight stop get hit around 5pm Eastern without a real move?', opts:['Markets close for an hour','Spreads widen during the daily rollover','Brokers delete stops at 5pm','Gold stops trading'], correct:1, why:'Liquidity is thin at rollover and spreads can briefly jump.'}
   ]},
  {id:'fx-scams', icon:'🚩', minutes:7, title:'Scams and red flags',
   lede:'Forex attracts more fraud than almost any market. Knowing the patterns protects you and the people you bring into this.',
   blocks:[
    {p:'Because forex is global, available all week and easy to market with screenshots, it is a favorite wrapper for schemes that have little to do with trading.'},
    {h:'Patterns to know'},
    {list:[
     '<b>"Education" sold through recruiting.</b> In 2025 the FTC and the State of Nevada sued IM Mastery Academy, alleging the company took more than $1.2 billion from consumers through income claims and a recruiting structure, while the overwhelming majority of participants lost money or earned little.',
     '<b>Signal groups.</b> Paid Telegram or Discord rooms posting entries with no verified track record. Screenshots of wins are not a track record.',
     '<b>Account managers.</b> Someone offers to trade your account for a profit split. Unregistered, this is often illegal and frequently ends with the money gone.',
     '<b>Romance and "pig butchering" scams.</b> A new online friend introduces a trading platform that shows huge gains. The platform is fake and withdrawals never arrive.',
     '<b>Bots promising fixed returns.</b> No trading system produces a guaranteed monthly percentage.'
    ]},
    {callout:{tone:'warn', title:'Red flags checklist', text:'Guaranteed or monthly returns. Pressure to recruit. Lifestyle marketing. "Limited spots." Requests to send crypto to a personal wallet. Unregistered firms. Withdrawal fees you only learn about when you try to withdraw.'}},
    {h:'What to do'},
    {steps:[
     'Look up any firm or person handling money in NFA BASIC.',
     'Check the CFTC\'s list of unregistered foreign entities (the RED list) on cftc.gov.',
     'Never send money to an individual to "trade for you."',
     'Report fraud to the CFTC or the FTC at reportfraud.ftc.gov.'
    ]},
    {callout:{tone:'key', title:'The Dojo standard', text:'This course will never sell you signals, promise returns, or ask you to recruit. If you teach others what you learn here, hold yourself to the same line.'}}
   ],
   quiz:[
    {q:'A group shows 30 winning trade screenshots and charges $99 a month. What is that evidence of?', opts:['A proven strategy','Nothing reliable, screenshots can be selected or faked','A regulated advisor','Guaranteed future profits'], correct:1, why:'Selected winners say nothing about the losers. A real track record is complete and independently verified.'},
    {q:'What was the core allegation in the FTC\'s 2025 case against IM Mastery Academy?', opts:['It charged high spreads','It used income claims and recruiting while most participants lost money or earned little','It was not open on weekends','It traded gold without a license'], correct:1, why:'The FTC alleged deceptive income claims and a recruitment-driven model.'},
    {q:'A new online friend says their platform made 40% last month and offers to help you join. What is the likely situation?', opts:['A great opportunity','A common romance or "pig butchering" scam','A regulated fund','A broker promotion'], correct:1, why:'This is the classic pattern: relationship first, fake platform second, money gone third.'},
    {q:'Where can you report suspected trading fraud?', opts:['Only to the broker','The CFTC or the FTC','Nowhere, crypto and forex are unregulated','The app store'], correct:1, why:'The CFTC handles commodity and forex fraud, and the FTC takes consumer fraud reports.'}
   ]}
 ]},
 {title:'Strategies, honestly presented', lessons:[
  {id:'fx-pullback', icon:'📐', minutes:9, title:'Trend pullback',
   lede:'Join a trend that already exists, after price pauses, with your risk defined by the last swing.',
   blocks:[
    {p:'Trend pullback is the most widely taught setup in trading, which is a reason to learn it well, not a reason to think it is special. It works when markets trend. It loses when they chop.'},
    {h:'Rules'},
    {steps:[
     '<b>Define the trend.</b> On the 1-hour chart, price is making higher highs and higher lows (for longs) and is above a rising 50-period moving average.',
     '<b>Wait for the pullback.</b> Price pulls back toward the moving average or a prior breakout level. No entry while it is extended.',
     '<b>Wait for the turn.</b> A candle closes back in the trend direction from that area.',
     '<b>Stop:</b> just beyond the pullback\'s swing low (for longs).',
     '<b>Target:</b> at least 2R, or the previous swing high if it is further.'
    ]},
    {callout:{tone:'warn', title:'When it fails', text:'In a range, every "pullback" is just the middle of the range and every "turn" fails. If the 50-period average is flat and price keeps crossing it, the condition in step 1 is not met. Skipping that trade is the strategy working.'}},
    {decision:{q:'EUR/USD is in a clean uptrend on the 1-hour chart. Price just made a big push higher and is far above the moving average. What now?', opts:[
     {t:'Buy now before it runs further', ok:false, why:'That is chasing. Your stop would have to be far away, so either the size is tiny or the risk is too big.'},
     {t:'Wait for a pullback toward the average or prior structure, then a candle that turns back up', ok:true, why:'Patience gives a closer stop, a better R:R and confirmation that buyers are still there.'},
     {t:'Short it, it has gone up too much', ok:false, why:'"Too high" is not a setup. Fighting a clean trend without a reversal plan is a common way to lose.'}
    ]}},
    {drill:{title:'Trend pullbacks on EUR/USD', symbol:'EUR/USD', interval:'1h', brief:'Run at least 5 drills. Only trade when step 1 is clearly true. Log "Trend pullback" as the setup.', rules:['No trade if the 50-period average is flat','Stop beyond the pullback swing','Target 2R minimum','Write one line on why the trend qualified']}}
   ],
   quiz:[
    {q:'What must be true before looking for a trend pullback long?', opts:['Price is falling fast','Higher highs, higher lows and a rising average','RSI is above 70','It is Friday'], correct:1, why:'The setup only exists inside an established uptrend.'},
    {q:'Where does the stop go on a pullback long?', opts:['A fixed 10 pips away','Just beyond the pullback\'s swing low','At the moving average','No stop, it is a trend'], correct:1, why:'Below that swing low, the pullback has failed and the trade idea is wrong.'},
    {q:'In what market condition does this setup tend to fail?', opts:['Strong trends','Sideways, choppy ranges','During the London session','On gold'], correct:1, why:'In a range there is no trend to rejoin, so pullback entries keep failing.'},
    {q:'You skip five pullback setups because the average was flat. Did you follow the strategy?', opts:['No, you missed trades','Yes, the filter is part of the strategy','Only if they would have lost','Only on gold'], correct:1, why:'Filters are rules. Skipping trades that fail them is execution, not hesitation.'}
   ]},
  {id:'fx-breakout', icon:'🚪', minutes:9, title:'Session breakout',
   lede:'Use the quiet hours to mark a range, then trade the first real expansion when the big money arrives.',
   blocks:[
    {p:'Before London opens, many pairs drift in a tight range during the Asian session. When London volume arrives, price often breaks out of that range. The setup tries to catch that expansion.'},
    {h:'Rules'},
    {steps:[
     '<b>Mark the range.</b> On the 15-minute chart, mark the high and low of the quiet overnight hours before London opens.',
     '<b>Filter it.</b> Skip days when the range is already unusually wide, or a major data release is due in the next hour.',
     '<b>Entry:</b> a 15-minute candle closes outside the range during the first few hours of London.',
     '<b>Stop:</b> back inside the range, at the midpoint or the opposite side.',
     '<b>Target:</b> 2R. Close the trade if it has not worked by the New York lunch hour.'
    ]},
    {callout:{tone:'warn', title:'The fakeout', text:'The most common failure: price pokes out of the range, triggers breakout traders, then reverses through the whole range. Requiring a candle close outside the range, not just a touch, filters some of these. It will never filter all of them, and the stop is what keeps fakeouts small.'}},
    {example:{title:'Why the midpoint stop matters', text:'With a 30-pip range and a stop at the opposite side, your risk is over 30 pips. A midpoint stop cuts it to around 15, doubling the size you can take for the same dollar risk. The trade-off: more trades get stopped by normal noise. Neither choice is "right." Pick one and journal it so your stats can tell you.'}},
    {drill:{title:'London breakouts on GBP/USD', symbol:'GBP/USD', interval:'15m', brief:'Use the drill\'s warm-up candles to find a quiet range before a burst of activity. Turn off "hide the date" for these drills so you can see the time of day.', rules:['Candle close outside the range only','Stop at the range midpoint','One attempt per range','Journal fakeouts honestly']}}
   ],
   quiz:[
    {q:'What is the session breakout setup trying to catch?', opts:['The quiet Asian drift','The expansion when London volume arrives','The weekend gap','Swap payments'], correct:1, why:'It uses the quiet range as a launch pad for the London expansion.'},
    {q:'What is a fakeout?', opts:['A broker error','Price breaks out of the range, then reverses back through it','A trade with no stop','A trade that hits target instantly'], correct:1, why:'Fakeouts are the main way this setup loses.'},
    {q:'Why skip days with an already-wide overnight range?', opts:['Wide ranges always break','The stop would be large and much of the move may already be done','The broker forbids it','Wide ranges only happen on gold'], correct:1, why:'Large ranges mean large stops and less room left to run.'},
    {q:'A high-impact US release is due in 20 minutes. What do the rules say?', opts:['Double the size','Skip or wait until after the release','Remove the stop','Enter early to beat it'], correct:1, why:'News can blow through ranges both ways. The filter exists for this.'}
   ]},
  {id:'fx-range', icon:'↔️', minutes:8, title:'Range fade',
   lede:'When a market is going nowhere, sell the top of nowhere and buy the bottom.',
   blocks:[
    {p:'Markets spend a lot of time in ranges. Range fading is the mirror image of breakout trading: you bet the edges hold.'},
    {h:'Rules'},
    {steps:[
     '<b>Find a real range:</b> at least two clear touches of both the top and the bottom, with a flat moving average.',
     '<b>Entry:</b> at an edge, after a candle rejects it (a long wick or a close back inside).',
     '<b>Stop:</b> just beyond the edge, outside the range.',
     '<b>Target:</b> the opposite edge, or the midpoint if the range is narrow.'
    ]},
    {callout:{tone:'key', title:'The rule tension', text:'A narrow range often cannot give you 2R. If the opposite edge is only 1.5× your risk away, the Dojo rule says skip it, or the lab logs a rule break. That is deliberate. Many range trades are low R:R, high win-rate trades, and you need your own data to know whether that trade-off works for you.'}},
    {callout:{tone:'warn', title:'When it fails', text:'Every range ends in a breakout. The trade that fades the edge right before the breakout is the one that hurts. Your stop beyond the edge is not optional here.'}},
    {drill:{title:'Range fades on AUD/USD', symbol:'AUD/USD', interval:'15m', brief:'Look for drills that start inside a quiet, sideways stretch. If the warm-up shows a trend, skip trading and step through to study it.', rules:['Two touches of each edge before trading','Enter only after a rejection candle','Stop outside the range','Note when a range broke and what it looked like before']}}
   ],
   quiz:[
    {q:'What confirms a range worth fading?', opts:['One touch of the top','At least two clear touches of both edges and a flat average','A strong trend','A news release'], correct:1, why:'Repeated touches show the edges are being defended.'},
    {q:'Where does the stop go on a fade at the range top?', opts:['Just above the range top','At the midpoint','Below the range bottom','No stop needed'], correct:0, why:'If price is accepted above the top, the range is broken and the idea is wrong.'},
    {q:'Your fade target is only 1.4× your risk. What do the Dojo rules say?', opts:['Take it, ranges are safe','Skip it, or accept a logged rule break','Widen the target past the range','Double the size'], correct:1, why:'The 1:2 rule applies. Your stats will show whether lower R:R fades work for you, but the trade is logged as a break.'},
    {q:'How does every range eventually end?', opts:['It never ends','In a breakout','At the weekend','At the swap time'], correct:1, why:'Ranges don\'t last forever, which is why the stop is essential.'}
   ]},
  {id:'fx-gold-news', icon:'⚡', minutes:9, title:'Gold after the data',
   lede:'Don\'t gamble on the number. Trade what the market does after it.',
   blocks:[
    {p:'Gold often makes its biggest move of the day on US inflation, jobs or Federal Reserve news. Holding a position into the release is a coin flip with widened spreads and possible slippage. This setup waits.'},
    {h:'Rules'},
    {steps:[
     '<b>Be flat into the release.</b> No open gold trades a few minutes before.',
     '<b>Let the first 15-minute candle after the release finish.</b> Mark its high and low.',
     '<b>Entry:</b> a later 15-minute candle closes beyond that first candle\'s range.',
     '<b>Stop:</b> on the other side of the first candle, or its midpoint if that candle was huge.',
     '<b>Target:</b> 2R. Cut size in half if the first candle was more than twice a normal candle.'
    ]},
    {callout:{tone:'warn', title:'Why size goes down, not up', text:'News candles are big, so stops are wide. The math cuts your size automatically, and that is correct. The temptation on news days is to keep the size and shrink the stop to fit. That is how a $100 planned loss becomes a $400 slippage loss.'}},
    {decision:{q:'CPI is out in 3 minutes. You are long gold with a tight stop and a small profit. What do you do?', opts:[
     {t:'Hold, the trend is up', ok:false, why:'The release can move gold $20 in seconds, and your tight stop may fill far beyond its price.'},
     {t:'Close or reduce before the release, then reassess after the first candle', ok:true, why:'You keep your profit and trade the reaction instead of guessing the number.'},
     {t:'Add to the position for a bigger win', ok:false, why:'That turns a plan into a bet on a number you can\'t know.'}
    ]}},
    {drill:{title:'Gold reaction trades', symbol:'XAU/USD', interval:'15m', brief:'Look for drills where one 15-minute candle is far larger than the ones around it. Treat it as the release candle and run the rules from there.', rules:['Never enter during the big candle','Entry only on a later close beyond its range','Half size if the candle was huge','Journal whether the move continued or reversed']}}
   ],
   quiz:[
    {q:'Why avoid holding gold through a major US release?', opts:['Gold markets close for news','Spreads widen and price can jump past your stop','Brokers ban it','Swap is charged triple'], correct:1, why:'Thin liquidity plus a sudden move means slippage and gap risk.'},
    {q:'What is the entry trigger in this setup?', opts:['Buying the instant the number prints','A later 15-minute close beyond the first post-release candle\'s range','Selling the opening candle','Any candle after lunch'], correct:1, why:'You wait for the market to show its hand, then trade the follow-through.'},
    {q:'The first post-release candle is three times normal size. What do the rules say about size?', opts:['Double it','Cut it in half','Keep it the same with a tighter stop','Skip the stop'], correct:1, why:'Wide stops with normal size means oversized risk. The rule halves size.'},
    {q:'What is the classic news-day mistake?', opts:['Waiting for the first candle','Keeping size and shrinking the stop to fit','Journaling the trade','Using 1% risk'], correct:1, why:'A stop placed to fit a size, not the chart, gets hit by normal post-news swings.'}
   ]}
 ]},
 {title:'Practice plan', lessons:[
  {id:'fx-plan', icon:'🗓️', minutes:6, title:'Your 100-trade plan',
   lede:'Knowledge is not a skill. Reps with rules and honest records are.',
   blocks:[
    {p:'You now know four setups. The fastest way to learn nothing is to rotate between all four, on six markets, at three risk levels. You will have 100 trades and no idea what works.'},
    {h:'The plan'},
    {steps:[
     '<b>Pick one setup</b> and at most two markets. Example: trend pullback on EUR/USD and XAU/USD.',
     '<b>Fix your risk</b> at 0.5% or 1% for all 100 trades.',
     '<b>Use replay drills</b> to get your first 30 trades quickly, then add live practice in the lab during the hours you can actually trade.',
     '<b>Journal every trade</b> with the setup tag and one line on why. The lab does the numbers.',
     '<b>Review every 20 trades.</b> Look at rule adherence first, then expectancy. Change one thing at a time, and only between blocks of 20.'
    ]},
    {callout:{tone:'key', title:'Reading your stats', text:'<b>Expectancy</b> is your average result per trade in R. +0.2R means that, on average, each trade made 20% of what you risked. Below 30 trades it is mostly noise. If you are under 90% rule adherence, your stats measure your discipline, not your strategy.'}},
    {h:'If the numbers say no'},
    {p:'Negative expectancy after 100 rule-following trades is not failure. It is information you got for free instead of with real money. Change the setup, the market or the timeframe, and run another 100. Many people who trade for a living say they went through several of these cycles. The ones who skipped them paid for the lesson with their account.'},
    {callout:{tone:'warn', title:'Graduation is not a promise', text:'Passing the Dojo gate means you followed a process with a positive edge in practice. Live trading adds real money, real emotion and real costs. If you go live, start at the smallest size your broker allows and expect results to be worse at first.'}}
   ],
   quiz:[
    {q:'What is the main reason to trade only one setup for 100 trades?', opts:['It is more exciting','So your stats measure that setup instead of a mix','Brokers require it','It guarantees profit'], correct:1, why:'Mixed setups make the numbers meaningless.'},
    {q:'Your expectancy is +0.25R over 100 trades. What does that mean?', opts:['You won 25% of trades','On average each trade made a quarter of what you risked','You made 25% on the account','You broke 25% of the rules'], correct:1, why:'Expectancy is average R per trade.'},
    {q:'Rule adherence is 70%. What do your stats mostly measure?', opts:['The strategy','Your discipline','The broker','Luck only'], correct:1, why:'With that many rule breaks, results reflect behavior, not the setup.'},
    {q:'After 100 disciplined trades, expectancy is negative. Best next step?', opts:['Go live to see if it is different','Change one variable and run another 100','Quit trading forever','Raise risk to 5%'], correct:1, why:'Treat it as data. Adjust and test again before risking real money.'}
   ]}
 ]},
 {title:'Risks specific to this market', lessons:[
  {id:'fx-risks', icon:'🧨', minutes:8, title:'What can hurt you in forex and gold',
   lede:'Your stop handles normal risk. These are the ones it does not fully handle.',
   blocks:[
    {h:'Weekend gaps'},
    {p:'The market closes Friday afternoon and reopens Sunday evening. News over the weekend can make Sunday open far from Friday\'s close. Your stop then fills at the first available price, which can be well past it. The lab simulates this as a "gap" exit.'},
    {h:'Central bank shocks'},
    {example:{title:'January 15, 2015', text:'The Swiss National Bank suddenly dropped its cap on the franc\'s value against the euro. The franc jumped by double-digit percentages within minutes, with almost no trading at prices in between. Stops filled far beyond where they were set, many retail accounts went negative, and some brokers were seriously damaged or failed. One announcement did that to a major currency.'}},
    {h:'Hidden doubling through correlation'},
    {p:'Long EUR/USD and long GBP/USD at 1% each is not two separate 1% bets. Both are mostly bets against the dollar. A strong US data release can stop both at once. Long gold and short USD/JPY can be the same dollar bet too. Count correlated positions as one when you think about total risk.'},
    {h:'Spread and liquidity traps'},
    {list:[
     'Spreads widen at the 5pm Eastern rollover, before major releases and during holidays.',
     'Exotic pairs can have spreads many times wider than majors, all day.',
     'Thin markets let stops fill worse than planned.'
    ]},
    {h:'Counterparty risk'},
    {p:'Your money sits with your broker. If the broker fails, how much of it is protected depends on where it is regulated. Offshore accounts may have no meaningful protection at all.'},
    {callout:{tone:'key', title:'Your defense', text:'Size small enough that a gap of two or three times your stop distance would hurt but not end you. Avoid stacking correlated trades. Be flat or reduced into weekends and major releases until your journal says you can handle them.'}}
   ],
   quiz:[
    {q:'Why can a stop fill far beyond its price on a Sunday open?', opts:['Stops are disabled on Sunday','Price can open past the stop after weekend news, and fills at the first available price','Brokers move stops on weekends','Sunday trades are free'], correct:1, why:'That is gap risk. A stop is an order, not a guarantee of price.'},
    {q:'What does the January 2015 Swiss franc event teach?', opts:['Central banks never surprise markets','A single policy change can move a major currency far past stops in minutes','Stops always protect you fully','Only exotic pairs are risky'], correct:1, why:'Size and leverage have to account for moves your stop can\'t catch.'},
    {q:'You are long EUR/USD and long GBP/USD, 1% each. What is the honest view of your risk?', opts:['Two unrelated 1% risks','Closer to a 2% bet against the dollar','0.5% total','No risk, they cancel'], correct:1, why:'Both pairs are largely driven by the dollar, so they tend to move together.'},
    {q:'What best protects you from gap and shock risk?', opts:['Higher leverage','Position sizes small enough to survive a gap well past the stop','Removing stops','Trading only exotics'], correct:1, why:'Size is the one control that still works when price skips your stop.'}
   ]}
 ]}
 ]
};
