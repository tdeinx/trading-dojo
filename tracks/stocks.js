window.DOJO_TRACK = {
 id:'stocks',
 title:'Stocks',
 tagline:'Ownership, earnings, gaps and the rules of the US market.',
 parts:[
 {title:'How the industry works', lessons:[
  {id:'st-what', icon:'🏛️', minutes:7, title:'How the stock market really works',
   lede:'When you buy a share, the price you get comes from a network of exchanges, market makers and rules you never see.',
   blocks:[
    {p:'A share is a small piece of ownership in a company. Shares are listed on exchanges like the NYSE and Nasdaq, but US stocks actually trade across many venues: over a dozen exchanges, plus off-exchange venues and wholesale market makers.'},
    {terms:[
     ['NBBO','The National Best Bid and Offer: the best buy and sell prices across all exchanges at that moment. Brokers are generally required to seek the best execution for your orders against it.'],
     ['Market maker','A firm that continuously quotes bids and offers and profits from the spread. Many retail orders are filled by wholesale market makers.'],
     ['ETF','An exchange-traded fund. It trades like a stock but holds a basket, like SPY for the S&P 500.'],
     ['Float','The shares available for public trading. Low-float stocks can move violently on small volume.']
    ]},
    {h:'What actually moves a stock'},
    {list:[
     '<b>Earnings</b> and guidance, reported quarterly.',
     '<b>The overall market</b>: most stocks move with the index on most days.',
     '<b>Sector and news</b>: an upgrade, a lawsuit, a product launch, a competitor\'s report.',
     '<b>Flows</b>: index rebalances, options hedging and fund buying can move price without new information.'
    ]},
    {callout:{tone:'key', title:'Why trade SPY first', text:'Index ETFs like SPY are extremely liquid, have penny-wide spreads, and can\'t go to zero because one company failed. They are where the Dojo recommends starting before single stocks.'}}
   ],
   quiz:[
    {q:'What is the NBBO?', opts:['A stock exchange','The best bid and offer across all exchanges','A broker fee','An index'], correct:1, why:'It is the market-wide best price at a given moment.'},
    {q:'What is an ETF like SPY?', opts:['One company','A fund holding a basket, traded like a stock','A futures contract','A bond'], correct:1, why:'SPY tracks the S&P 500 and trades like a single stock.'},
    {q:'Why can low-float stocks move violently?', opts:['They are regulated differently','Few shares are available, so modest buying or selling moves price a lot','They have no earnings','They trade 24 hours'], correct:1, why:'Thin supply means small flows have big effects.'},
    {q:'On most days, what explains a large part of a stock\'s move?', opts:['Its logo','The overall market','The weather','The CEO\'s social media'], correct:1, why:'Most stocks are strongly tied to the broad market.'}
   ]},
  {id:'st-hours', icon:'🕘', minutes:6, title:'Hours, settlement and extended sessions',
   lede:'The regular session is only part of the day, and the other parts behave differently.',
   blocks:[
    {table:{head:['Session','Typical hours (Eastern)','What it is like'], rows:[
     ['Pre-market','From as early as 4am to 9:30am','Thin volume, wide spreads, reactions to overnight news and earnings.'],
     ['Regular','9:30am to 4pm','Most volume. The open and the last hour are the busiest.'],
     ['After-hours','4pm to about 8pm','Earnings releases. Thin and jumpy.']
    ]}},
    {p:'Extended hours vary by broker, and some brokers offer overnight sessions on selected stocks. Liquidity outside regular hours is much lower, and many brokers accept only limit orders then.'},
    {callout:{tone:'tip', title:'Settlement is T+1', text:'Since May 28, 2024, most US stock trades settle one business day after the trade date. Settlement matters for cash accounts: selling and rebuying before funds settle can trigger violations at some brokers.'}},
    {h:'The open is its own animal'},
    {p:'The first 15 to 30 minutes often have the day\'s largest ranges as overnight orders and news get absorbed. That is opportunity and danger. Many experienced traders wait for the first range to form before acting, which is exactly what the opening range lesson does.'}
   ],
   quiz:[
    {q:'When is the regular US stock session?', opts:['8am to 5pm Eastern','9:30am to 4pm Eastern','24 hours','Noon to 8pm'], correct:1, why:'The regular session runs 9:30am to 4pm Eastern.'},
    {q:'What is the settlement cycle for most US stock trades since May 2024?', opts:['T+0','T+1','T+2','T+3'], correct:1, why:'The US moved to one-day settlement on May 28, 2024.'},
    {q:'Why are many brokers limit-order-only outside regular hours?', opts:['Market orders are illegal','Liquidity is thin and spreads are wide, so market orders could fill badly','Exchanges are closed','For tax reasons'], correct:1, why:'Limit orders protect you from poor fills in thin markets.'},
    {q:'When do earnings reports usually come out?', opts:['During lunch','Before the open or after the close','On weekends only','At 9:30am exactly'], correct:1, why:'Companies typically report outside regular hours.'}
   ]},
  {id:'st-orders', icon:'🧾', minutes:8, title:'Order types and what really fills',
   lede:'The order you choose decides what price you get, and whether your stop protects you.',
   blocks:[
    {terms:[
     ['Market order','Fill now at the best available price. Fast, but the price is not guaranteed.'],
     ['Limit order','Fill only at your price or better. The price is guaranteed, the fill is not.'],
     ['Stop order','Becomes a market order once the stop price trades. Gets you out, but can fill well past the stop in a fast move or a gap.'],
     ['Stop-limit order','Becomes a limit order at the stop. Controls price, but may not fill at all if price jumps past your limit.']
    ]},
    {example:{title:'The earnings gap', text:'You hold a stock at $100 with a stop at $95. After hours the company misses earnings. The next morning it opens at $82. Your stop triggers at the open and fills near $82, not $95. A stop-limit at $95 might not fill at all, leaving you holding as it keeps falling. Neither order can make the gap not have happened. Only position size can.'}},
    {callout:{tone:'key', title:'Rule of thumb', text:'Use limit orders to enter, especially in thin names and outside regular hours. Use stop orders to exit when being out matters more than the exact price. Size every position so a gap well past your stop is survivable.'}}
   ],
   quiz:[
    {q:'Which order guarantees price but not a fill?', opts:['Market','Limit','Stop','None'], correct:1, why:'A limit order only fills at your price or better.'},
    {q:'A stock gaps from $100 to $82 through your $95 stop order. Roughly where do you get out?', opts:['$95','$100','Near $82','You don\'t'], correct:2, why:'The stop becomes a market order and fills near the opening price.'},
    {q:'What is the risk of a stop-limit order in a gap?', opts:['It fills too fast','It may not fill at all','It doubles the position','None'], correct:1, why:'If price jumps past your limit, there may be no fill.'},
    {q:'What is the only real protection against gaps?', opts:['A tighter stop','Smaller position size','Market orders','Trading after hours'], correct:1, why:'Size limits the damage when price skips your stop.'}
   ]}
 ]},
 {title:'The business around it', lessons:[
  {id:'st-business', icon:'🏦', minutes:8, title:'Brokers, protections and the rules that bind you',
   lede:'Commission-free does not mean free, and the rules around margin and day trading just changed.',
   blocks:[
    {list:[
     '<b>Payment for order flow.</b> Many commission-free brokers route orders to wholesale market makers who pay for them. You pay through execution quality instead of a commission. Brokers publish routing reports under SEC Rule 606.',
     '<b>SIPC protection</b> covers up to $500,000 per customer, including up to $250,000 in cash, if a member broker fails. It does not protect against market losses.',
     '<b>Margin:</b> under Regulation T, you can generally borrow up to 50% of a stock purchase. Borrowed money amplifies losses and charges interest.'
    ]},
    {callout:{tone:'key', title:'Day trading rules changed in 2026', text:'The old pattern day trader rule required $25,000 in a margin account to day trade freely. In 2026 the SEC approved FINRA\'s replacement of that rule with new intraday margin standards, effective June 4, 2026. Firms may phase it in until October 20, 2027, so your broker might still apply the old limits. Check with them directly.'}},
    {h:'Taxes in one paragraph'},
    {p:'In the US, gains on stocks held a year or less are short-term and taxed as ordinary income. The <b>wash sale rule</b> disallows a loss if you buy the same or a substantially identical security within 30 days before or after the sale. Active traders run into it constantly. This is general information, not tax advice.'}
   ],
   quiz:[
    {q:'How does a commission-free broker using payment for order flow make money on your trade?', opts:['It doesn\'t','Market makers pay the broker to route your orders to them','The SEC pays it','From SIPC'], correct:1, why:'The cost shows up in execution quality rather than a commission.'},
    {q:'What does SIPC protect against?', opts:['Market losses','A member broker failing, up to set limits','Bad trades','Taxes'], correct:1, why:'SIPC covers missing customer assets if a broker fails, not investment losses.'},
    {q:'What did the 2026 FINRA change replace?', opts:['T+1 settlement','The pattern day trader rule and its $25,000 minimum','SIPC limits','Earnings reporting'], correct:1, why:'Intraday margin standards replaced the PDT rule, with a phase-in period.'},
    {q:'You sell a stock at a loss and buy it back 10 days later. What tax rule applies?', opts:['None','The wash sale rule may disallow the loss','Section 1256','Mark-to-market'], correct:1, why:'Rebuying within 30 days triggers the wash sale rule.'}
   ]},
  {id:'st-redflags', icon:'🚩', minutes:6, title:'Pumps, dumps and chat rooms',
   lede:'Social media made it cheap to move small stocks. Someone is always on the other side of the hype.',
   blocks:[
    {list:[
     '<b>Pump and dump:</b> promoters build hype in a thinly traded stock, then sell into the buying they created.',
     '<b>Paid alert rooms</b> that profit when members buy what the organizer already owns.',
     '<b>Penny and OTC stocks</b> with little public information and easy manipulation.',
     '<b>Impersonation:</b> fake accounts posing as known traders or analysts.'
    ]},
    {callout:{tone:'warn', title:'Red flags', text:'"About to explode." Urgent buy-now messages. Tiny companies with huge claims. Posts from accounts that appeared recently. Promoters who never disclose whether they own the stock.'}},
    {callout:{tone:'key', title:'A simple filter', text:'If you can\'t explain why the stock would move without mentioning the post that told you about it, you are the exit liquidity. Stick to liquid stocks and ETFs while you learn.'}}
   ],
   quiz:[
    {q:'How does a pump and dump work?', opts:['A company buys back shares','Promoters hype a thin stock and sell into the buying they created','The SEC halts trading','Index funds rebalance'], correct:1, why:'The promoters are the sellers on the other side of the hype.'},
    {q:'Why are low-volume OTC stocks easy to manipulate?', opts:['They trade 24 hours','Little money is needed to move the price, and information is thin','They have no shares','They are insured'], correct:1, why:'Thin trading and little disclosure make them vulnerable.'},
    {q:'What does "exit liquidity" mean here?', opts:['A broker product','The buyers early sellers need to sell to','A margin call','An ETF'], correct:1, why:'Late buyers provide the buying that lets insiders sell.'},
    {q:'What should you trade while learning?', opts:['Penny stocks','Liquid stocks and ETFs','OTC stocks only','Whatever is trending'], correct:1, why:'Liquid names give fair fills and resist manipulation.'}
   ]}
 ]},
 {title:'Strategies, honestly presented', lessons:[
  {id:'st-orb', icon:'🔔', minutes:8, title:'Opening range breakout',
   lede:'Let the open settle, then trade the first real expansion.',
   blocks:[
    {steps:[
     '<b>Pick a liquid name:</b> SPY or a large stock with news or high volume.',
     '<b>Mark the range:</b> high and low of the first 15 minutes (9:30 to 9:45am Eastern) on the 5-minute chart.',
     '<b>Entry:</b> a 5-minute close outside the range, in the direction of the overall market if you can tell it.',
     '<b>Stop:</b> the middle of the range.',
     '<b>Target:</b> 2R. Out by late morning if it hasn\'t worked.'
    ]},
    {callout:{tone:'warn', title:'When it fails', text:'Choppy opens, giant opening ranges that make the stop too wide, and fakeouts that reverse straight back into the range. One attempt per side.'}},
    {drill:{title:'Opening range on SPY', symbol:'SPY', interval:'5m', brief:'Turn off "hide the date" so you can find the regular-session open in your local time. Mark the first three candles and apply the rules.', rules:['First 15 minutes define the range','Close outside the range to enter','Stop at the midpoint','One attempt per side']}}
   ],
   quiz:[
    {q:'What defines the opening range?', opts:['Pre-market high and low','The first 15 minutes of the regular session','Yesterday\'s close','The first hour'], correct:1, why:'9:30 to 9:45am Eastern.'},
    {q:'Where does the stop go?', opts:['Far side of the range','Midpoint of the range','No stop','$1 fixed'], correct:1, why:'It keeps risk reasonable at a meaningful failure point.'},
    {q:'What is the most common failure?', opts:['Trend days','Fakeouts that reverse back into the range','Holidays','Dividends'], correct:1, why:'False breakouts are the main loser.'},
    {q:'Why prefer liquid names?', opts:['They are cheaper','Tight spreads and fair fills','They never gap','Required by law'], correct:1, why:'Spreads and slippage eat small edges in thin stocks.'}
   ]},
  {id:'st-swing', icon:'📐', minutes:8, title:'Daily pullback swing',
   lede:'For people with jobs: one decision per evening, a few trades a month.',
   blocks:[
    {p:'Swing trading holds for days to weeks. The daily chart filters intraday noise, and you can plan trades after the close.'},
    {steps:[
     '<b>Trend:</b> the stock is above a rising 50-day moving average, making higher highs and higher lows.',
     '<b>Pullback:</b> price pulls back toward the 20-day average or prior breakout level on lighter volume.',
     '<b>Entry:</b> the day after a candle closes back up from that area.',
     '<b>Stop:</b> below the pullback low.',
     '<b>Target:</b> 2R or the prior high, whichever is further. Avoid holding through earnings unless that is your plan.'
    ]},
    {callout:{tone:'warn', title:'Swing risk is gap risk', text:'You will hold overnight and through weekends. Every swing trade must be sized for a gap past the stop, and an earnings date inside the trade window changes the risk completely.'}},
    {drill:{title:'Daily pullbacks on AAPL', symbol:'AAPL', interval:'1d', brief:'Each candle is one day. Step slowly and only trade when the trend checklist is clearly met.', rules:['Above a rising 50-day average','Entry after a turn from the pullback area','Stop below the pullback low','Note any gap that hit your stop']}}
   ],
   quiz:[
    {q:'Why does swing trading suit people with jobs?', opts:['It is riskless','Decisions can be made after the close on daily charts','It requires no stops','It is faster'], correct:1, why:'The daily chart lets you plan outside market hours.'},
    {q:'Where is the stop on a pullback swing long?', opts:['At the entry price','Below the pullback low','Above the prior high','None'], correct:1, why:'Below the pullback low, the trend idea has failed.'},
    {q:'What is the main extra risk of holding overnight?', opts:['Commissions','Gaps past the stop','Dividends','Settlement'], correct:1, why:'Overnight news can open the stock far from your stop.'},
    {q:'An earnings date falls inside your planned holding period. What should you do?', opts:['Ignore it','Treat it as a deliberate decision: exit before, reduce size, or accept the gap risk knowingly','Remove the stop','Double the size'], correct:1, why:'Earnings can gap a stock far past any stop.'}
   ]},
  {id:'st-gap', icon:'⛰️', minutes:8, title:'Trading gaps',
   lede:'When a stock opens far from yesterday\'s close, something changed. Trade what happens next, not the gap itself.',
   blocks:[
    {p:'A gap is an open well above or below the previous close, usually after earnings or news. Two outcomes dominate: the gap <b>holds and extends</b>, or it <b>fades</b> back toward the prior close.'},
    {steps:[
     'Do nothing for the first 15 minutes. Mark the range.',
     '<b>Gap and go:</b> a gap up that holds above the opening range and breaks its high is a long with the stop below the range.',
     '<b>Gap fade:</b> a gap up that breaks below the opening range low is a short toward the prior close, with the stop above the range.',
     'Choose which one you are watching for before the open. Journal it.'
    ]},
    {callout:{tone:'warn', title:'When it fails', text:'Big news gaps can trend all day in either direction. Volume matters: a gap on enormous volume is more likely to be real information than a drift on light volume.'}},
    {drill:{title:'Gaps on TSLA', symbol:'TSLA', interval:'15m', brief:'With the date visible, look for drills where a new day opens far from the previous close. Wait for the first candle, then apply one of the two plans.', rules:['No trade in the first 15 minutes','Pick gap-and-go or fade before entering','Stop beyond the opening range','Journal the gap size and outcome']}}
   ],
   quiz:[
    {q:'What is a gap?', opts:['A broker outage','An open far from the previous close','A missing candle','A dividend'], correct:1, why:'Price jumps between sessions, usually on news.'},
    {q:'A gap up breaks below its opening range low. Which plan applies?', opts:['Gap and go','Gap fade','Neither','Buy more'], correct:1, why:'Failure to hold the opening range points to a fade.'},
    {q:'Why wait 15 minutes?', opts:['It is a rule of the exchange','The opening range shows whether buyers or sellers control the gap','To save fees','For settlement'], correct:1, why:'The first range reveals early control.'},
    {q:'What makes a gap more likely to reflect real information?', opts:['Low volume','Very high volume','A small gap','Friday afternoon'], correct:1, why:'Heavy volume shows real participation.'}
   ]}
 ]},
 {title:'Practice plan', lessons:[
  {id:'st-plan', icon:'🗓️', minutes:6, title:'Your stocks practice plan',
   lede:'Pick the style that fits your hours, then let 100 trades tell you the truth.',
   blocks:[
    {steps:[
     '<b>Match style to schedule.</b> Can\'t watch the open? Do daily swings. Free mornings? Opening range.',
     '<b>One setup, one or two symbols.</b> SPY plus one large stock.',
     '<b>Fixed risk</b> of 0.5% to 1%.',
     '<b>Replay first</b>, live practice second. Daily swing drills let you get months of decisions in an afternoon.',
     '<b>Review every 20 trades.</b> Rule adherence first, expectancy second.'
    ]},
    {callout:{tone:'key', title:'Swing traders, count differently', text:'A daily swing trader may take 3 to 6 trades a month. Getting to 100 in live practice takes over a year. That is why replay drills on daily charts matter: they let you build the sample size quickly before you rely on live results.'}}
   ],
   quiz:[
    {q:'You work 9 to 5 Eastern. Which style fits best?', opts:['Opening range scalping','Daily swing trading','0DTE options','Pre-market momentum'], correct:1, why:'Daily swings can be planned after the close.'},
    {q:'Why use replay for daily swing practice?', opts:['It is more profitable','You can make many months of decisions quickly','It has no rules','It replaces journaling'], correct:1, why:'Replay compresses time so your sample grows fast.'},
    {q:'What do you check first at each 20-trade review?', opts:['Profit','Rule adherence','Win rate','Badges'], correct:1, why:'If rules weren\'t followed, the other numbers don\'t describe the strategy.'},
    {q:'How many symbols does the plan suggest at first?', opts:['One or two','Ten','Every stock that moves','None'], correct:0, why:'Focus produces clean data.'}
   ]}
 ]},
 {title:'Risks specific to this market', lessons:[
  {id:'st-risks', icon:'🧨', minutes:7, title:'What can hurt you in stocks',
   lede:'Single stocks carry risks indexes smooth out.',
   blocks:[
    {list:[
     '<b>Earnings and news gaps</b> that skip your stop.',
     '<b>Trading halts.</b> Limit up-limit down rules pause a stock for a few minutes after sharp moves, and news halts can last longer. You cannot exit during a halt.',
     '<b>Short squeezes.</b> Short sellers face unlimited upside risk, and heavily shorted stocks can rise violently as shorts are forced to buy.',
     '<b>Concentration.</b> One company can fall 50% on a single report. Indexes rarely do.',
     '<b>Thin stocks.</b> Wide spreads and little depth turn small edges into losses.',
     '<b>Margin.</b> Borrowed money can force sales at the worst time.'
    ]},
    {callout:{tone:'key', title:'Your defense', text:'Start with index ETFs and large, liquid stocks. Size for gaps. Know the earnings date of anything you hold. Avoid shorting heavily shorted, low-float names while learning.'}}
   ],
   quiz:[
    {q:'What happens during a trading halt?', opts:['You can still exit','You cannot trade the stock until it resumes','Prices freeze forever','Your stop fills at your price'], correct:1, why:'No trading occurs during the halt.'},
    {q:'Why is shorting a heavily shorted stock dangerous?', opts:['It is illegal','A squeeze can force many shorts to buy at once, driving price sharply up','Short sellers earn dividends','It never moves'], correct:1, why:'Forced buying fuels violent rallies with unlimited loss potential for shorts.'},
    {q:'Why is single-stock risk higher than index risk?', opts:['Indexes are regulated','One company can collapse on one report','Stocks trade fewer hours','It isn\'t'], correct:1, why:'Indexes spread company-specific risk across many names.'},
    {q:'What should you always know about a stock you hold?', opts:['The CEO\'s age','Its next earnings date','Its logo color','Its ticker history'], correct:1, why:'Earnings are the most common source of gaps.'}
   ]}
 ]}
 ]
};
