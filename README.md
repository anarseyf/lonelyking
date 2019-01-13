# lonelyking
Lonely King ([The Riddler](https://www.amazon.com/dp/039360991X) by FiveThirtyEight, p.67)

This puzzle refers to [Group Russian Roulette](https://arxiv.org/abs/1507.03805). It's asking what the likelihood is of 1 "winner" remaining at the end, as opposed to 0, for a given number of people N. According to the linked paper, the number oscillates around 0.5 but never settles there.

Output in Chrome running on a 2017 MacBook Pro with 3.1 GHz Intel Core i5 (quad-core):
```
Answer for N = 2 is: 0       (0.034 seconds)
Answer for N = 3 is: 0.75    (0.02 seconds)
Answer for N = 4 is: 0.5926  (0.018 seconds)
Answer for N = 5 is: 0.4688  (0.03 seconds)
Answer for N = 6 is: 0.4161  (0.067 seconds)
Answer for N = 7 is: 0.4389  (0.132 seconds)
Answer for N = 8 is: 0.489   (0.928 seconds)
Answer for N = 9 is: 0.5323  (20.1 seconds)
Answer for N = 10 is:0.5547  (514.558 seconds)
```
(This is using only a single worker, but it seems like the browser is able to use at least two cores in parallel.)
