---
title: The Normal Distribution
code: S7
spec: 4.3, 4.4
summary: The shape and properties of the normal curve, standardising, inverse normal problems, and the normal approximation to the binomial.
time: 5 hours
prereq: S6 The Binomial Distribution
papers: Paper 3 Section A
---

## Why this topic exists

The binomial handles counts. The normal handles **measurements** — height, mass, time, error, IQ,
length of a manufactured component. Anything continuous, produced by lots of small independent
influences adding up, tends to be normally distributed. That's not a coincidence; it's a theorem (the
Central Limit Theorem), and it's why the normal distribution appears everywhere in science.

Practically: this topic is where your calculator earns its keep, and where **drawing a sketch** is the
difference between an easy question and a guaranteed mistake.

---

## 1. The shape

:::key Properties of $X \sim N(\mu, \sigma^2)$
- **Bell-shaped** and **symmetric** about the mean $\mu$.
- Mean $=$ median $=$ mode $= \mu$.
- The total area under the curve is 1.
- Points of inflection at $\mu \pm \sigma$.
- The curve extends infinitely in both directions, never touching the axis.
:::

:::key The 68–95–99.7 rule
- About **68%** of values lie within $1\sigma$ of the mean.
- About **95%** within $2\sigma$.
- About **99.7%** within $3\sigma$.

Not directly examined, but invaluable as a **sanity check**: if you compute a probability of 0.4 for
something within one standard deviation, you know immediately it's wrong.
:::

:::warning The notation $N(\mu, \sigma^2)$
The second parameter is the **variance**, not the standard deviation. $N(50, 16)$ means $\mu = 50$ and
$\sigma = 4$.

When a question says "mean 50, standard deviation 4", you write $X \sim N(50, 4^2)$ or $N(50, 16)$.
Writing $N(50, 4)$ means something different and will cost you the answer.
:::

---

## 2. Finding probabilities

:::method Normal probability questions
1. **Write down the distribution:** $X \sim N(\mu, \sigma^2)$.
2. **Sketch the curve** and shade the region you want.
3. Use your calculator's **Normal CD** function with lower bound, upper bound, $\sigma$, $\mu$.
   - For "less than $a$", use a lower bound of $-10^{99}$ (or a very negative number).
   - For "greater than $b$", use an upper bound of $10^{99}$.
4. Check the answer against your sketch: is it more or less than 0.5? Does it look right?
:::

:::example Worked example 1 — $X \sim N(50, 16)$. Find (a) $P(X<55)$, (b) $P(X>58)$, (c) $P(45<X<55)$.
**Solution.**

Here $\mu = 50$, $\sigma = \sqrt{16} = 4$.

**(a)** 55 is above the mean, so more than half the area is below it — expect an answer above 0.5.
$$P(X<55) = 0.8944$$

**(b)** 58 is two standard deviations above the mean, so expect about $\frac{1-0.95}{2} = 0.025$.
$$P(X>58) = 0.0228 \;\checkmark$$

**(c)** 45 and 55 are each $1.25\sigma$ from the mean, so expect a bit more than 68%.
$$P(45<X<55) = 0.7887 \;\checkmark$$
:::

:::exam Continuous means endpoints don't matter
For a continuous distribution, $P(X < 55) = P(X \leq 55)$, because $P(X = 55) = 0$ exactly. Unlike the
binomial, there is **no off-by-one worry** here.

That does become an issue in the normal approximation to the binomial — see section 5.
:::

---

## 3. Standardising and the standard normal

:::key The standard normal
$$Z = \frac{X - \mu}{\sigma} \;\sim\; N(0, 1)$$

$Z$ measures **how many standard deviations $X$ is above the mean**. Negative $z$ means below.
:::

:::insight Why standardising works
Subtracting $\mu$ shifts the whole distribution so it's centred on 0. Dividing by $\sigma$ rescales it
so one unit equals one standard deviation.

The result is that **every** normal distribution becomes the *same* distribution, $N(0,1)$. That's why
a single table of $z$-values (the one in your formula booklet) works for every normal problem ever
posed.

Your calculator can skip this step for direct probabilities — but you still need it for **inverse**
problems and for finding unknown $\mu$ or $\sigma$.
:::

---

## 4. Inverse normal problems

Given a probability, find the value.

:::method Inverse normal
Use the calculator's **Inverse Normal** function, which takes the **area to the left**.

- "Find $a$ such that $P(X<a) = 0.9$" → enter area $= 0.9$ directly.
- "Find $b$ such that $P(X>b) = 0.15$" → enter area $= 1 - 0.15 = 0.85$.

Sketch first. The commonest error in this topic is feeding in the wrong tail.
:::

:::example Worked example 2 — $X\sim N(50,16)$. Find $a$ such that $P(X<a) = 0.9$.
**Solution.**

From the inverse normal (or the $z$-table): $z = 1.2816$.

$$a = \mu + z\sigma = 50 + 1.2816(4) = 55.1 \text{ (3 s.f.)}$$

*(Check: 55.1 is above the mean, which is right for a probability above 0.5 ✓)*
:::

### Finding an unknown $\mu$ or $\sigma$

:::method Unknown parameters
1. Convert each given probability into a $z$-value (from the $z$-table or inverse normal).
2. Write the standardising equation for each:
   $$z = \frac{x - \mu}{\sigma}$$
3. If one parameter is unknown, solve directly. If both are unknown, you'll have **two simultaneous
   equations** — solve them.
:::

:::example Worked example 3 — For a normal variable, $P(X < 20) = 0.1$ and $P(X>35) = 0.2$. Find $\mu$ and $\sigma$.
**Solution.**

*First probability:* $P(X<20) = 0.1$, so $z_1 = -1.2816$ (negative, because 20 is below the mean).
$$\frac{20-\mu}{\sigma} = -1.2816 \;\Rightarrow\; 20 = \mu - 1.2816\sigma \qquad(1)$$

*Second:* $P(X>35) = 0.2$ means $P(X<35) = 0.8$, so $z_2 = 0.8416$.
$$\frac{35-\mu}{\sigma} = 0.8416 \;\Rightarrow\; 35 = \mu + 0.8416\sigma \qquad(2)$$

$(2) - (1)$:
$$15 = 2.1232\sigma \;\Rightarrow\; \sigma = 7.065$$

Then from (1):
$$\mu = 20 + 1.2816(7.065) = 29.05$$

$$\mu = 29.1, \qquad \sigma = 7.07 \text{ (3 s.f.)}$$

**Check:** with these values, $P(X<20) = 0.100$ ✓ and $P(X>35) = 0.200$ ✓
:::

:::warning Getting the sign of $z$ right
If the value is **below** the mean (probability to the left is less than 0.5), $z$ is **negative**.
A sketch settles this instantly. Losing the minus sign here produces a completely wrong $\mu$ and it's
the single most common failure in unknown-parameter questions.
:::

---

## 5. The normal approximation to the binomial

For large $n$, binomial calculations become unwieldy — and historically, impossible. The normal
distribution approximates them well under the right conditions.

:::key The approximation
If $X \sim B(n,p)$ with $n$ **large** and $p$ **close to 0.5**, then
$$X \approx Y \sim N\big(np,\; np(1-p)\big)$$

i.e. $\mu = np$ and $\sigma^2 = np(1-p)$ — the binomial's own mean and variance.
:::

:::insight Why $p$ near 0.5 matters
The binomial distribution is only symmetric when $p = 0.5$. As $p$ moves towards 0 or 1 it becomes
skewed, and the normal distribution — which is perfectly symmetric — fits badly.

Large $n$ helps because of the Central Limit Theorem: the more trials you add, the more the shape
smooths towards a bell curve regardless. But with $p = 0.02$ you'd need an enormous $n$ before the
approximation was any good.
:::

:::key The continuity correction — essential
The binomial is **discrete** (whole numbers); the normal is **continuous**. To bridge them, each
integer $k$ is treated as the interval from $k - 0.5$ to $k + 0.5$.

| Binomial | Normal approximation |
|---|---|
| $P(X = 8)$ | $P(7.5 < Y < 8.5)$ |
| $P(X \leq 8)$ | $P(Y < 8.5)$ |
| $P(X < 8)$ | $P(Y < 7.5)$ |
| $P(X \geq 8)$ | $P(Y > 7.5)$ |
| $P(X > 8)$ | $P(Y > 8.5)$ |
:::

:::method Getting the continuity correction right
Ask: **which integers are included?**

- $P(X \geq 8)$ includes 8, so the interval for 8 must be included — start at $7.5$.
- $P(X > 8)$ excludes 8, so start after its interval ends — at $8.5$.

Write out the first couple of included integers if you're unsure. Omitting the correction entirely is
worth a mark, and getting it the wrong way round loses the accuracy mark too.
:::

:::example Worked example 4 — $X\sim B(100, 0.4)$. Use a normal approximation to estimate $P(X \geq 45)$.
**Solution.**

Check conditions: $n = 100$ is large and $p = 0.4$ is close to 0.5 ✓

$$\mu = np = 40, \qquad \sigma^2 = np(1-p) = 100(0.4)(0.6) = 24, \qquad \sigma = 4.899$$

So $Y \sim N(40, 24)$.

Continuity correction: $P(X\geq45)$ includes 45, so use $P(Y > 44.5)$.

$$z = \frac{44.5 - 40}{4.899} = 0.9186$$
$$P(Y>44.5) = 1 - 0.8208 = 0.1792$$

*(The exact binomial value is $0.1789$ — so the approximation is good to about 0.0003 here.)*
:::

---

## In the exam

- **Sketch. Every time.** It takes five seconds and it prevents tail errors, sign errors and inverse
  normal errors.
- Write the distribution in full: $X \sim N(\mu, \sigma^2)$, with the **variance** as the second
  parameter.
- Give probabilities to 4 d.p., other answers to 3 s.f.
- For the approximation, **state the conditions** ($n$ large, $p$ close to 0.5) — it's a mark.
- **Never omit the continuity correction** when approximating a binomial.
- If the answer looks implausible (a probability above 1, or a "below average" value coming out above
  the mean), go back to the sketch.

---

## Practice

:::question Q1 (4 marks)
The heights of adult men are modelled by $X \sim N(175, 8^2)$ cm. Find (a) $P(X > 185)$,
(b) $P(170 < X < 180)$.
:::
:::answer
**(a)** $z = \frac{185-175}{8} = 1.25$
$$P(X>185) = 1 - 0.8944 = 0.1056$$

**(b)** Both values are $0.625\sigma$ from the mean:
$$P(170<X<180) = 0.7340 - 0.2660 = 0.4680$$

*(Or directly from Normal CD with bounds 170 and 180.)*
:::

:::question Q2 (4 marks)
$X \sim N(200, 15^2)$. Find the value of $a$ such that $P(X < a) = 0.95$.
:::
:::answer
From the inverse normal, $z = 1.6449$.

$$a = 200 + 1.6449(15) = 200 + 24.67 = 224.7 \text{ (4 s.f.)}$$
:::

:::question Q3 (5 marks)
The time $T$ minutes taken to complete a task is normally distributed with mean 24 and standard
deviation 5.

(a) Find the probability a randomly chosen person takes more than 30 minutes.

(b) Find the time exceeded by only 10% of people.
:::
:::answer
$T \sim N(24, 25)$.

**(a)** $z = \frac{30-24}{5} = 1.2$
$$P(T>30) = 1 - 0.8849 = 0.1151$$

**(b)** "Exceeded by 10%" means $P(T > t) = 0.10$, so $P(T<t) = 0.90$ and $z = 1.2816$.
$$t = 24 + 1.2816(5) = 30.4 \text{ minutes (3 s.f.)}$$
:::

:::question Q4 (6 marks)
A normal variable $X$ has $P(X<15) = 0.0668$ and $P(X > 35) = 0.1587$. Find $\mu$ and $\sigma$.
:::
:::answer
*From the tables:* $P(Z < z) = 0.0668 \Rightarrow z = -1.5$; $P(Z>z) = 0.1587 \Rightarrow
P(Z<z) = 0.8413 \Rightarrow z = 1$.

$$\frac{15-\mu}{\sigma} = -1.5 \;\Rightarrow\; 15 = \mu - 1.5\sigma \qquad (1)$$
$$\frac{35-\mu}{\sigma} = 1 \;\Rightarrow\; 35 = \mu + \sigma \qquad (2)$$

$(2)-(1)$: $20 = 2.5\sigma \Rightarrow \sigma = 8$.

Then $\mu = 35 - 8 = 27$.

$$\mu = 27, \qquad \sigma = 8$$

**Check:** $\frac{15-27}{8} = -1.5$ ✓ and $\frac{35-27}{8} = 1$ ✓
:::

:::question Q5 (5 marks)
$X\sim B(80, 0.45)$. Use a suitable approximation to estimate $P(X \leq 30)$, stating the conditions
required.
:::
:::answer
**Conditions:** $n = 80$ is large and $p = 0.45$ is close to 0.5, so a normal approximation is
appropriate.

$$\mu = np = 36, \qquad \sigma^2 = np(1-p) = 80(0.45)(0.55) = 19.8, \qquad \sigma = 4.450$$

$Y \sim N(36, 19.8)$.

**Continuity correction:** $P(X\leq30)$ includes 30, so use $P(Y<30.5)$.

$$z = \frac{30.5-36}{4.450} = -1.236$$
$$P(Y<30.5) = 0.1082$$

*(Exact binomial: 0.1077 — the approximation is out by less than 0.001.)*
:::

:::question Q6 (7 marks) — synoptic
A machine produces rods whose lengths are normally distributed with mean 50.2 cm and standard
deviation 0.4 cm. A rod is acceptable if its length is between 49.5 cm and 50.5 cm.

(a) Find the probability a randomly chosen rod is acceptable.

(b) A box contains 20 rods. Find the probability that at least 18 are acceptable.

(c) The machine is recalibrated so the mean becomes 50.0 cm, with the standard deviation unchanged.
Find the new probability a rod is acceptable, and comment.
:::
:::answer
**(a)** $X \sim N(50.2, 0.16)$.

$$z_1 = \frac{49.5-50.2}{0.4} = -1.75, \qquad z_2 = \frac{50.5-50.2}{0.4} = 0.75$$

$$P(49.5<X<50.5) = 0.7734 - 0.0401 = 0.7333$$

**(b)** Let $R$ be the number of acceptable rods out of 20. Each rod is independently acceptable with
probability 0.7333, so $R \sim B(20, 0.7333)$.

$$P(R\geq18) = 1 - P(R\leq17) = 1 - 0.9325 = 0.0675$$

**(c)** With $\mu = 50.0$:
$$z_1 = \frac{49.5-50}{0.4} = -1.25, \qquad z_2 = \frac{50.5-50}{0.4} = 1.25$$
$$P(\text{acceptable}) = 0.8944 - 0.1056 = 0.7887$$

**Comment:** the probability rises from 0.733 to 0.789. Centring the mean in the middle of the
acceptable range (50.0 is exactly midway between 49.5 and 50.5) makes the best possible use of the
existing variability — with a symmetric distribution, a symmetric tolerance band captures the most
area when it's centred.

Further improvement would now require reducing $\sigma$, i.e. making the machine more precise rather
than just better aimed.
:::
