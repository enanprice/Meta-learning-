---
title: The Binomial Distribution
code: S6
spec: 4.1, 4.2
summary: Discrete random variables, the conditions for a binomial model, calculating probabilities, and criticising the model.
time: 3 hours
prereq: S5 Probability, P1.8 The Binomial Expansion
papers: Paper 3 Section A
---

## Why this topic exists

An enormous number of real situations are "$n$ repeated attempts, each either a success or a failure":
free throws, faulty components, coin flips, whether a seed germinates, whether a patient responds to
treatment.

The binomial distribution handles all of them with one model. And in Year 13 it becomes the engine of
hypothesis testing — the question "is this coin biased?" is answered by computing a binomial
probability.

---

## 1. Discrete random variables

A **random variable** $X$ takes numerical values determined by chance. Its **probability distribution**
lists each possible value with its probability.

:::key The fundamental rule
$$\sum P(X = x) = 1$$
All the probabilities must sum to exactly 1. This is how most "find $k$" questions are solved.
:::

A **discrete uniform distribution** is one where every outcome is equally likely — like a fair die,
where $P(X=x) = \frac16$ for $x = 1,\dots,6$.

---

## 2. The binomial distribution

:::key Conditions for $X \sim B(n, p)$
A binomial model requires **all four**:

1. A **fixed number** of trials, $n$.
2. Each trial has exactly **two outcomes** — success or failure.
3. The trials are **independent**.
4. The probability of success, $p$, is **constant** for every trial.
:::

:::key The probability function
$$P(X = r) = \binom{n}{r}p^r(1-p)^{n-r}$$
:::

:::insight Why the formula looks like that
Consider one specific sequence with exactly $r$ successes — say SSFF… for $n=4$, $r=2$. Its probability
is $p\times p\times(1-p)\times(1-p) = p^2(1-p)^2$, by independence.

Every sequence with $r$ successes has **exactly the same probability**, $p^r(1-p)^{n-r}$ — only the
order differs.

So how many such sequences are there? That's "choose which $r$ of the $n$ trials are the successes" —
which is $\binom nr$, the binomial coefficient from P1.8.

Multiply: $\binom nr p^r(1-p)^{n-r}$. The $\binom nr$ in the binomial distribution and the $\binom nr$
in the binomial expansion are the **same object**, counting the same thing.
:::

:::figure binomial-bars
The distribution is discrete, so "at least 8" means the bars from 8 upwards — which is why it equals
$1 - P(X \leq 7)$ and not $1 - P(X\leq8)$.
:::

:::warning Checking the conditions is examined
"Give a reason why a binomial model may not be appropriate here" is a standard 1–2 mark question. The
answer is always one of the four conditions failing, **stated in context**:

- *Not independent:* "If one component fails because the machine is faulty, others are more likely to
  fail too, so the trials are not independent."
- *$p$ not constant:* "A player is likely to get more tired as the match goes on, so the probability of
  scoring is not constant."
- *Not fixed $n$:* "She keeps shooting until she scores, so the number of trials is not fixed."
- *Sampling without replacement from a small population:* $p$ changes between trials.

"It might not be binomial" scores nothing. Name the condition and tie it to the context.
:::

---

## 3. Calculating with the binomial

Use your calculator's distribution menu. Two functions:

:::key Calculator functions
- **Binomial PD** (probability distribution): $P(X = r)$ — a single value.
- **Binomial CD** (cumulative distribution): $P(X \leq r)$ — everything up to and including $r$.

Everything else is built from these.
:::

:::method Translating the words
| In words | In symbols | How to compute |
|---|---|---|
| exactly 6 | $P(X=6)$ | PD |
| at most 6 / no more than 6 | $P(X\leq6)$ | CD(6) |
| fewer than 6 / less than 6 | $P(X\leq 5)$ | CD(5) |
| more than 6 | $P(X\geq7) $ | $1 - $ CD(6) |
| at least 6 / 6 or more | $P(X\geq6)$ | $1 - $ CD(5) |
| between 4 and 9 inclusive | $P(4\leq X\leq 9)$ | CD(9) $-$ CD(3) |

**Discrete variables need care with the boundary.** "More than 6" excludes 6, so it starts at 7.
"At least 6" includes it, so $1 - P(X\leq 5)$.
:::

:::warning The off-by-one error
$P(X \geq 6) = 1 - P(X \leq 5)$, **not** $1 - P(X\leq 6)$.

Write the values out if you're unsure: $X \geq 6$ means $6,7,8,\dots$, so its complement is
$0,1,2,3,4,5$ — i.e. $X\leq 5$. Do this explicitly every time until it's automatic. It is the single
most common error in the entire statistics module.
:::

:::example Worked example 1 — $X \sim B(20, 0.3)$. Find (a) $P(X=6)$, (b) $P(X\leq6)$, (c) $P(X\geq 8)$, (d) $P(4 \leq X \leq 9)$.
**Solution.**

**(a)** Binomial PD with $n=20$, $p=0.3$, $r=6$:
$$P(X=6) = \binom{20}{6}(0.3)^6(0.7)^{14} = 0.1916$$

**(b)** Binomial CD, $r=6$:
$$P(X\leq 6) = 0.6080$$

**(c)** "At least 8" means $8, 9, 10,\dots$, so the complement is $X\leq 7$:
$$P(X\geq8) = 1 - P(X\leq 7) = 1 - 0.7723 = 0.2277$$

**(d)**
$$P(4\leq X\leq 9) = P(X\leq 9) - P(X\leq 3) = 0.95204 - 0.10709 = 0.8450$$

*(Note the lower limit: we subtract $P(X\leq3)$, not $P(X\leq4)$, because 4 itself must be **included**.)*
:::

:::key Mean and variance
$$E(X) = np \qquad \text{Var}(X) = np(1-p)$$

$E(X) = np$ is examinable in Year 12; the variance formula appears in the context of the normal
approximation in Year 13.
:::

---

## In the exam

- **Define the distribution explicitly:** "Let $X$ be the number of faulty items. $X \sim B(30, 0.05)$."
  That definition is a mark.
- Give probabilities to **4 decimal places** unless told otherwise.
- Write out the inequality before computing — it prevents the off-by-one error.
- For "state an assumption", name one of the four binomial conditions **in context**.
- $p$ is always the probability of the thing you're **counting**. If the question counts failures, $p$
  is the failure rate, not the success rate.

---

## Practice

:::question Q1 (3 marks)
A fair six-sided die is rolled 12 times. Let $X$ be the number of sixes.

(a) State the distribution of $X$.

(b) Find $P(X = 3)$.
:::
:::answer
**(a)** $X \sim B\left(12, \frac16\right)$

**(b)**
$$P(X=3) = \binom{12}{3}\left(\tfrac16\right)^3\left(\tfrac56\right)^9 = 0.1974 \text{ (4 d.p.)}$$
:::

:::question Q2 (4 marks)
$X \sim B(12, 0.25)$. Find (a) $P(X\leq 3)$, (b) $P(X > 5)$.
:::
:::answer
**(a)** Binomial CD: $P(X\leq3) = 0.6488$

**(b)** $X > 5$ means $6, 7, \dots$, so the complement is $X \leq 5$:
$$P(X>5) = 1 - P(X\leq5) = 1 - 0.9456 = 0.0544$$
:::

:::question Q3 (5 marks)
A seed company claims 80% of its seeds germinate. A gardener plants 25 seeds. Let $X$ be the number
that germinate.

(a) State the distribution of $X$ and two assumptions needed.

(b) Find the probability that at least 22 germinate.

(c) Find the expected number that germinate.
:::
:::answer
**(a)** $X \sim B(25, 0.8)$.

Assumptions: each seed germinates **independently** of the others, and the probability of germination
is **constant** at 0.8 for every seed.

**(b)** "At least 22" means $X \geq 22$, so the complement is $X \leq 21$:
$$P(X\geq22) = 1 - P(X\leq21) = 1 - 0.7660 = 0.2340$$

**(c)** $E(X) = np = 25\times0.8 = 20$ seeds.
:::

:::question Q4 (4 marks)
In a large batch, 20% of items are defective. A sample of 25 is taken. Find the probability that

(a) at most 2 are defective,

(b) more than 8 are defective.
:::
:::answer
$X \sim B(25, 0.2)$.

**(a)** $P(X\leq 2) = 0.0982$

**(b)** "More than 8" means $X \geq 9$, so:
$$P(X\geq 9) = 1 - P(X\leq 8) = 1 - 0.9532 = 0.0468$$
:::

:::question Q5 (4 marks)
A student attempts a 10-question multiple-choice test by guessing. Each question has 4 options.

(a) Find the probability of getting exactly 4 correct.

(b) Find the probability of passing, if a pass requires at least 5 correct.
:::
:::answer
$X \sim B(10, 0.25)$.

**(a)** $P(X=4) = \binom{10}{4}(0.25)^4(0.75)^6 = 0.1460$

**(b)** $P(X\geq 5) = 1 - P(X\leq 4) = 1 - 0.9219 = 0.0781$

*(So guessing gives about a 7.8% chance of passing — which is exactly the kind of calculation that
justifies negative marking on multiple-choice tests.)*
:::

:::question Q6 (5 marks)
A footballer takes penalties until she scores, and records the number of attempts.
Explain why a binomial distribution is **not** an appropriate model for the number of attempts.
:::
:::answer
A binomial distribution requires a **fixed number of trials** $n$, decided in advance.

Here the player keeps taking penalties until she scores, so the number of attempts is itself random —
it could be 1, or 2, or 10. The number of trials is not fixed.

*(A secondary reason: the probability of scoring may not be constant, since the goalkeeper learns her
technique and she may tire or grow in confidence. But the fixed-$n$ failure is the primary one.)*
:::

:::question Q7 (6 marks) — synoptic
A machine fills bottles. Each bottle is independently underfilled with probability 0.06. Bottles are
packed in boxes of 40.

(a) Find the probability a box contains no underfilled bottles.

(b) Find the probability a box contains more than 3 underfilled bottles.

(c) A quality inspector checks 5 boxes. Find the probability that exactly 2 of them contain more than
3 underfilled bottles.
:::
:::answer
**(a)** $X \sim B(40, 0.06)$.
$$P(X = 0) = (0.94)^{40} = 0.0842 \text{ (4 d.p.)}$$

**(b)** "More than 3" means $X \geq 4$:
$$P(X\geq4) = 1 - P(X\leq3) = 1 - 0.7827 = 0.2173$$

**(c)** Now a **second, nested binomial**: let $Y$ be the number of boxes (out of 5) that contain more
than 3 underfilled bottles. Each box independently has probability $0.2228$ of doing so, so
$$Y \sim B(5, 0.2228)$$

$$P(Y=2) = \binom52(0.2228)^2(0.7772)^3 = 10 \times 0.049640 \times 0.469423 = 0.2330$$

*(The two-layer binomial is a favourite of examiners: the probability computed in one part becomes the
$p$ of the next. Spot it by noticing the question shifts from counting bottles to counting boxes.)*
:::
