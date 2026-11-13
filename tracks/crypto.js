window.DOJO_TRACK = {
 id:'crypto',
 title:'Crypto',
 tagline:'A 24/7 market with its own custody, exchange and scam risks.',
 parts:[
 {title:'How the industry works', lessons:[
  {id:'cr-what', icon:'🔗', minutes:7, title:'What you are actually trading',
   lede:'Crypto assets are entries on public ledgers. The ledger is the product, and who controls the keys decides who owns the asset.',
   blocks:[
    {p:'A blockchain is a shared ledger maintained by a network of computers. Transactions are signed with <b>private keys</b>. Whoever controls the key controls the asset.'},
    {terms:[
     ['Bitcoin (BTC)','The first and largest crypto asset, with a fixed maximum supply. New issuance is cut in half roughly every four years in an event called the halving. The most recent was in April 2024.'],
     ['Ether (ETH)','The native asset of Ethereum, a blockchain that runs programs (smart contracts) used for tokens and applications.'],
     ['Solana (SOL)','A fast, low-fee blockchain popular for trading activity and new tokens.'],
     ['Stablecoin','A token designed to hold a steady value, usually $1, backed by reserves.'],
     ['Token','An asset issued on top of a blockchain, from established projects to brand-new meme coins.']
    ]},
    {h:'Where it trades'},
    {terms:[
     ['Centralized exchange (CEX)','A company that holds your assets and matches orders, like a broker. Convenient, but you rely on them.'],
     ['Decentralized exchange (DEX)','Smart contracts that let you trade from your own wallet. No company holds your funds, but bugs, scams and bad prices are your problem.'],
     ['Spot ETFs','Since January 2024, US investors can buy spot bitcoin ETFs in a normal brokerage account, with ether ETFs following later in 2024.']
    ]},
    {callout:{tone:'key', title:'The Dojo focus', text:'This track trains on the three most liquid names, BTC, ETH and SOL. Thousands of smaller tokens exist. Most are thinly traded, easy to manipulate and lose most of their value over time.'}}
   ],
   quiz:[
    {q:'Who controls a crypto asset?', opts:['The government','Whoever controls the private key','The exchange logo','The blockchain developers'], correct:1, why:'Control of the key equals control of the asset.'},
    {q:'What is the bitcoin halving?', opts:['Price cut in half','New issuance cut in half, roughly every four years','A tax rule','An exchange fee'], correct:1, why:'The reward for new blocks halves periodically.'},
    {q:'What is the main trade-off of a centralized exchange?', opts:['No trade-off','Convenience in exchange for trusting the company with your assets','It is always cheaper','It never gets hacked'], correct:1, why:'You rely on the exchange to safeguard your funds.'},
    {q:'Since when can US investors buy spot bitcoin ETFs in a brokerage account?', opts:['2014','January 2024','2030','Never'], correct:1, why:'Spot bitcoin ETFs launched in January 2024.'}
   ]},
  {id:'cr-market', icon:'🌙', minutes:6, title:'A market that never closes',
   lede:'24/7 trading changes risk, rest and the meaning of a "session."',
   blocks:[
    {list:[
     '<b>No closing bell.</b> Price moves at 3am on a Sunday. Your stop works then too, and so do news shocks.',
     '<b>Liquidity rhythms.</b> Volume is usually heavier when US and European markets are open and thinner on weekends.',
     '<b>Correlation.</b> Major coins often move together, and at times they move with risk assets like tech stocks.',
     '<b>Volatility.</b> Daily moves of several percent are normal for BTC and larger for smaller coins. Stops must be wider, so position sizes must be smaller.'
    ]},
    {example:{title:'Sizing for crypto volatility', text:'On a $10,000 account risking 1% ($100), a BTC trade with a $1,500 stop is about 0.066 BTC. The same 1% risk on a stock with a $2 stop is 50 shares. The risk is identical. Only the position size changes.'}},
    {callout:{tone:'warn', title:'Rest is a risk control', text:'Trading a market that never stops can turn into never stopping. Set hours you trade and hours you don\'t, and use stops so you can sleep.'}}
   ],
   quiz:[
    {q:'When is crypto liquidity usually thinner?', opts:['Weekday afternoons in New York','Weekends','During US data releases','Never'], correct:1, why:'Weekend volume is typically lighter.'},
    {q:'Why are crypto position sizes usually smaller for the same risk?', opts:['Exchanges limit them','Stops must be wider due to volatility','Crypto has no stops','Taxes'], correct:1, why:'Wider stops mean fewer units for the same dollar risk.'},
    {q:'$10,000 account, 1% risk, ETH stop $80 away. Roughly how much ETH?', opts:['0.125 ETH','1.25 ETH','12.5 ETH','125 ETH'], correct:1, why:'$100 ÷ $80 = 1.25 ETH.'},
    {q:'Why set trading hours in a 24/7 market?', opts:['Exchanges require it','Constant trading erodes judgment and rest','Prices freeze at night','For taxes'], correct:1, why:'Fatigue is a real risk in a market with no close.'}
   ]},
  {id:'cr-custody', icon:'🔐', minutes:7, title:'Custody: not your keys, not your coins',
   lede:'In crypto, the biggest losses often have nothing to do with price.',
   blocks:[
    {terms:[
     ['Custodial','An exchange or app holds your keys. Easy to use. If the company fails or freezes withdrawals, your access depends on them.'],
     ['Self-custody','You hold the keys in a wallet, often protected by a seed phrase of 12 or 24 words. Nobody can freeze it. Nobody can recover it if you lose the phrase or give it away.']
    ]},
    {example:{title:'November 2022', text:'FTX, then one of the world\'s largest crypto exchanges, halted withdrawals and filed for bankruptcy. Customers who held assets there lost access overnight. It was a reminder that a trading account at an exchange is a promise from a company, not a balance on the blockchain in your name.'}},
    {callout:{tone:'warn', title:'Seed phrase rules', text:'Never type it into a website. Never share it with "support." Never store it as a photo or in cloud notes. Any request for your seed phrase is a theft attempt.'}},
    {callout:{tone:'tip', title:'A practical split', text:'Many people keep a small trading balance on a reputable exchange and move longer-term holdings to self-custody. Whatever you choose, know which risk you are taking.'}}
   ],
   quiz:[
    {q:'What happened to FTX in November 2022?', opts:['It went public','It halted withdrawals and filed for bankruptcy','It became an ETF','It merged with a bank'], correct:1, why:'Customer funds were trapped when the exchange collapsed.'},
    {q:'Someone from "wallet support" asks for your seed phrase to fix an issue. What is it?', opts:['Normal procedure','A theft attempt','A security upgrade','Required by law'], correct:1, why:'Legitimate support never needs your seed phrase.'},
    {q:'What is the trade-off of self-custody?', opts:['None','Nobody can freeze it, and nobody can recover it if you lose the phrase','It is always free','It is insured'], correct:1, why:'Full control means full responsibility.'},
    {q:'What does a balance on an exchange actually represent?', opts:['Coins on the blockchain in your name','A promise from the company','A bank deposit','Insured savings'], correct:1, why:'The exchange holds the assets. You hold a claim.'}
   ]}
 ]},
 {title:'The business around it', lessons:[
  {id:'cr-business', icon:'⚖️', minutes:7, title:'Regulation, taxes and leverage',
   lede:'The rules around crypto are newer and still changing. Here is what is settled enough to rely on.',
   blocks:[
    {list:[
     '<b>Stablecoin law.</b> The GENIUS Act, signed July 18, 2025, created the first US federal framework for payment stablecoins: only permitted issuers may issue them, reserves must back them 1:1 with assets like cash or short-term Treasuries, and issuers cannot pay interest just for holding them.',
     '<b>Exchanges.</b> US platforms typically register as money services businesses and hold state licenses. Protections vary widely, and crypto held at an exchange is generally not covered by SIPC or FDIC insurance.',
     '<b>Taxes.</b> The IRS treats crypto as property, so selling, trading one coin for another, or spending it can be a taxable event. US brokers now report digital asset sales to the IRS on a new form, 1099-DA, being phased in. General information, not tax advice.'
    ]},
    {h:'Leverage and perpetual futures'},
    {p:'Offshore exchanges offer "perpetual" futures with very high leverage. Most are not available to US residents. Using a VPN to get around that can mean your account and funds get frozen. Regulated US crypto futures exist through CFTC-registered venues.'},
    {callout:{tone:'warn', title:'Liquidation cascades', text:'In leveraged crypto markets, falling prices force liquidations, which push prices lower, which force more liquidations. Moves that would take days elsewhere can happen in minutes.'}}
   ],
   quiz:[
    {q:'What did the GENIUS Act establish?', opts:['A bitcoin ETF','A federal framework for payment stablecoins','A crypto tax holiday','A ban on exchanges'], correct:1, why:'It set issuer and 1:1 reserve requirements for payment stablecoins.'},
    {q:'How does the IRS generally treat crypto?', opts:['As currency, never taxed','As property, so sales and swaps can be taxable','As a bank deposit','As a collectible only'], correct:1, why:'Property treatment means dispositions can trigger gains or losses.'},
    {q:'Is crypto at an exchange covered by SIPC or FDIC insurance?', opts:['Always','Generally no','Only BTC','Only stablecoins'], correct:1, why:'Those programs generally do not cover crypto assets.'},
    {q:'What is a liquidation cascade?', opts:['A tax filing','Forced liquidations pushing price further and triggering more liquidations','An exchange listing','A wallet backup'], correct:1, why:'Leverage turns declines into self-reinforcing selling.'}
   ]},
  {id:'cr-scams', icon:'🚩', minutes:7, title:'The scam map',
   lede:'Crypto\'s openness is also its attack surface. Most losses come from a short list of tricks.',
   blocks:[
    {list:[
     '<b>Pig butchering:</b> a friendly contact builds trust, then introduces a "platform" that shows big gains. Withdrawals never arrive.',
     '<b>Rug pulls:</b> a new token\'s creators drain the liquidity or dump their supply after buyers pile in.',
     '<b>Fake airdrops and wallet drainers:</b> connecting your wallet and signing a malicious approval lets attackers empty it.',
     '<b>Impersonation:</b> fake support accounts, fake exchange sites, fake giveaways from "celebrities."',
     '<b>Recovery scams:</b> after a loss, someone offers to recover your funds for an upfront fee.',
     '<b>Pump groups:</b> coordinated buying of thin tokens, with organizers selling into the rush.'
    ]},
    {callout:{tone:'warn', title:'Red flags', text:'Guaranteed returns. Pressure and urgency. Unsolicited contact. Requests for your seed phrase or to "verify" your wallet. A brand-new token with anonymous developers and huge promises.'}},
    {callout:{tone:'key', title:'Defensive habits', text:'Type exchange addresses yourself. Use a separate wallet for experiments. Read what a transaction asks you to approve before signing. Report fraud to the FBI\'s IC3 and the FTC.'}}
   ],
   quiz:[
    {q:'A stranger online shows a platform with 50% monthly gains and offers to help you join. Most likely?', opts:['Opportunity','Pig butchering scam','Regulated fund','Exchange promo'], correct:1, why:'Trust first, fake platform second, money gone third.'},
    {q:'What is a rug pull?', opts:['A market crash','Token creators draining liquidity or dumping after buyers arrive','An exchange upgrade','A tax audit'], correct:1, why:'The insiders exit with the buyers\' money.'},
    {q:'How do wallet drainers usually work?', opts:['They guess your password','You sign a malicious approval that lets them move your assets','They hack the blockchain','They call your bank'], correct:1, why:'The approval gives them permission to take your tokens.'},
    {q:'After losing funds, someone offers to recover them for a fee. What is it?', opts:['A law firm','Likely a recovery scam','A government program','An insurance claim'], correct:1, why:'Victims are often targeted a second time.'}
   ]}
 ]},
 {title:'Strategies, honestly presented', lessons:[
  {id:'cr-trend', icon:'📈', minutes:8, title:'Trend pullbacks with crypto-sized stops',
   lede:'The same pullback logic as other markets, adjusted for a market that swings far more.',
   blocks:[
    {steps:[
     '<b>Trend:</b> on the 1-hour chart, higher highs and higher lows above a rising 50-period average.',
     '<b>Pullback:</b> toward the average or a prior breakout level.',
     '<b>Turn:</b> a candle closes back in the trend direction.',
     '<b>Stop:</b> below the pullback swing low. Expect it to be several percent away.',
     '<b>Target:</b> 2R. Consider taking part off at 1R if your plan says so, and journal it as a separate rule.'
    ]},
    {callout:{tone:'warn', title:'Crypto-specific failures', text:'Weekend wicks that tag stops in thin liquidity, liquidation cascades that ignore levels, and sudden correlation with stocks on macro news days.'}},
    {drill:{title:'Trend pullbacks on BTC', symbol:'BTC/USD', interval:'1h', brief:'Only trade clear uptrends or downtrends. Notice how much wider your stops are than in forex, and how the lab shrinks your size to match.', rules:['Trend checklist must be met','Stop below the pullback swing','Target 2R','Note whether a weekend candle hit your stop']}}
   ],
   quiz:[
    {q:'Why are crypto stops usually wider than forex stops?', opts:['Rules require it','Higher volatility needs more room','Crypto has no spread','They aren\'t'], correct:1, why:'Normal swings are larger, so stops must allow for them.'},
    {q:'What keeps risk the same with a wider stop?', opts:['More leverage','A smaller position size','No stop','A bigger target'], correct:1, why:'Size shrinks so the dollar risk stays fixed.'},
    {q:'What is a crypto-specific way this setup fails?', opts:['Market closes','Weekend wicks in thin liquidity','T+1 settlement','Earnings'], correct:1, why:'Thin weekend markets can spike through stops.'},
    {q:'Why journal partial profit-taking as its own rule?', opts:['For taxes','So you can measure whether it helps','Exchanges require it','It doesn\'t matter'], correct:1, why:'Untracked changes make your stats meaningless.'}
   ]},
  {id:'cr-breakout', icon:'🚀', minutes:8, title:'Volatility squeeze breakouts',
   lede:'Quiet periods in crypto rarely last. Prepare during the quiet, act on the expansion.',
   blocks:[
    {steps:[
     '<b>Find the squeeze:</b> on the 15-minute chart, candles getting smaller and a tight range forming over several hours.',
     '<b>Mark the range</b> high and low.',
     '<b>Entry:</b> a candle closes outside the range with a clearly larger body than the candles inside it.',
     '<b>Stop:</b> back inside the range, at the midpoint.',
     '<b>Target:</b> 2R.'
    ]},
    {callout:{tone:'warn', title:'When it fails', text:'Fakeouts are common in crypto, especially when one side has a lot of leveraged positions to liquidate. Price can break out, trigger stops and reverse hard. Requiring a strong candle close helps but never filters every fake.'}},
    {drill:{title:'Squeeze breakouts on SOL', symbol:'SOL/USD', interval:'15m', brief:'Look for drills that start in a quiet, narrowing stretch. If the warm-up is already trending wildly, step through and study instead of trading.', rules:['Several hours of tightening first','Strong candle close outside the range','Stop at the range midpoint','Journal fakeouts and whether leverage seemed to drive them']}}
   ],
   quiz:[
    {q:'What signals a volatility squeeze?', opts:['Huge candles','Shrinking candles and a tightening range','A news headline','A weekend'], correct:1, why:'Compression often precedes expansion.'},
    {q:'What entry does the setup require?', opts:['Any touch outside the range','A strong candle close outside the range','Buying inside the range','A market order at midnight'], correct:1, why:'A decisive close filters some fakes.'},
    {q:'Why are crypto fakeouts common?', opts:['Low fees','Leveraged positions get liquidated, driving sharp reversals','Exchanges cause them','They aren\'t'], correct:1, why:'Liquidations can push price through a level and then snap back.'},
    {q:'Where is the stop?', opts:['Far outside the range','The range midpoint','No stop','10% away fixed'], correct:1, why:'Back inside the range means the breakout failed.'}
   ]},
  {id:'cr-range', icon:'↔️', minutes:7, title:'Weekend range fades on ETH',
   lede:'Thin weekend markets often chop sideways. Edges can hold, until they don\'t.',
   blocks:[
    {steps:[
     '<b>Find a real range:</b> two or more touches of the top and bottom on the 15-minute chart.',
     '<b>Entry:</b> at an edge after a rejection candle.',
     '<b>Stop:</b> beyond the edge.',
     '<b>Target:</b> the opposite edge, which may be less than 2R. That is a logged rule break, by design, so your stats can judge it.'
    ]},
    {callout:{tone:'warn', title:'When it fails', text:'Sunday evenings and Monday mornings often bring volume back and break weekend ranges. A range that held all Saturday can be gone in one candle.'}},
    {drill:{title:'Range fades on ETH', symbol:'ETH/USD', interval:'15m', brief:'Turn off "hide the date" and look for weekend stretches. Trade only clearly defined ranges.', rules:['Two touches of each edge first','Rejection candle to enter','Stop outside the range','Journal when ranges broke']}}
   ],
   quiz:[
    {q:'Why do weekend crypto markets often range?', opts:['Exchanges close','Lighter volume and fewer catalysts','Prices are frozen','Regulation'], correct:1, why:'Thinner participation often means sideways chop.'},
    {q:'When do weekend ranges commonly break?', opts:['Saturday noon','When volume returns, often Sunday evening into Monday','Never','At midnight UTC only'], correct:1, why:'Returning volume tends to resolve the range.'},
    {q:'Your fade target gives only 1.5R. What happens in the lab?', opts:['It is blocked','You can take it, and it is logged as a rule break','It is free','Nothing'], correct:1, why:'The lab lets you test lower R:R ideas while keeping score honestly.'},
    {q:'Where is the stop on a fade at the bottom of a range?', opts:['Just below the range low','At the midpoint','Above the range','None'], correct:0, why:'A break below the range invalidates the fade.'}
   ]}
 ]},
 {title:'Practice plan', lessons:[
  {id:'cr-plan', icon:'🗓️', minutes:6, title:'Your crypto practice plan',
   lede:'Crypto rewards discipline and punishes everything else faster than any other market.',
   blocks:[
    {steps:[
     '<b>One setup, one coin.</b> BTC trend pullbacks are a good start.',
     '<b>Lower risk:</b> 0.5% per trade while learning. Volatility makes streaks longer.',
     '<b>Set trading hours</b> and stick to them, even though the market never closes.',
     '<b>No leverage beyond 1:1</b> in practice. Learn the asset before you borrow against it.',
     '<b>100 trades</b>, reviewed every 20.'
    ]},
    {callout:{tone:'key', title:'What success looks like', text:'Positive expectancy with 90% or better rule adherence, and a drawdown you would have survived emotionally. If your journal shows big swings in R from week to week, your size is too large for this market.'}}
   ],
   quiz:[
    {q:'What risk per trade does the plan suggest while learning crypto?', opts:['5%','2%','0.5%','10%'], correct:2, why:'Higher volatility means longer streaks, so smaller risk.'},
    {q:'Why practice without leverage?', opts:['Leverage is illegal','Learn the asset before borrowing against it','It is cheaper','Exchanges require it'], correct:1, why:'Leverage multiplies mistakes you haven\'t learned to avoid yet.'},
    {q:'Your R results swing wildly week to week. What does that suggest?', opts:['Perfect sizing','Position size too large for the market','The strategy is great','Nothing'], correct:1, why:'Large swings point to oversizing.'},
    {q:'Why set trading hours in crypto?', opts:['For taxes','To protect rest and judgment in a market that never closes','Exchanges close','To get badges'], correct:1, why:'Fatigue leads to rule breaks.'}
   ]}
 ]},
 {title:'Risks specific to this market', lessons:[
  {id:'cr-risks', icon:'🧨', minutes:7, title:'What can hurt you in crypto',
   lede:'Price risk is only one layer. The others can take everything at once.',
   blocks:[
    {list:[
     '<b>Exchange risk:</b> freezes, hacks and failures.',
     '<b>Custody risk:</b> lost or stolen keys are usually permanent.',
     '<b>Smart contract risk:</b> bugs and exploits in protocols and tokens.',
     '<b>Stablecoin risk:</b> a stablecoin can lose its peg, even if briefly.',
     '<b>Leverage risk:</b> liquidation cascades and wicks that only exist for seconds can still close your position.',
     '<b>Regulatory risk:</b> rules are still being written, and access to products can change.',
     '<b>Concentration:</b> smaller coins can fall 80% or more and never recover.'
    ]},
    {callout:{tone:'key', title:'Your defense', text:'Trade only the most liquid assets while learning, keep exchange balances to what you need, protect your keys, avoid leverage, and size for volatility. Treat any token you cannot explain as a lottery ticket, sized like one.'}}
   ],
   quiz:[
    {q:'Which risk is unique to self-custody?', opts:['Exchange freeze','Losing your seed phrase permanently','Margin calls','Halts'], correct:1, why:'With self-custody there is no one to recover a lost key.'},
    {q:'What is a depeg?', opts:['A new token','A stablecoin trading away from its target value','An exchange fee','A halving'], correct:1, why:'Stablecoins can briefly or permanently lose their peg.'},
    {q:'Why can a short-lived wick close a leveraged position?', opts:['It can\'t','Liquidation triggers at the price touched, even briefly','Exchanges ignore wicks','Only on weekends'], correct:1, why:'Liquidation engines act on the price touched.'},
    {q:'How should you size a token you can\'t explain?', opts:['Like a core position','Like a lottery ticket, small enough to lose entirely','With leverage','Not at all ever'], correct:1, why:'Assume it can go to zero.'}
   ]}
 ]}
 ]
};
