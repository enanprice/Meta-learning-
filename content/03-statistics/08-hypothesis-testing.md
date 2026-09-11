---
title: Hypothesis Testing
code: S8
spec: 5.1–5.5
summary: The logic of significance testing, binomial tests, critical regions, two-tailed tests, and testing a normal mean.
time: 5 hours
prereq: S6 The Binomial Distribution, S7 The Normal Distribution
papers: Paper 3 Section A
---

## Why this topic exists

Someone claims a coin is fair. You flip it 20 times and get 15 heads. Is that evidence of bias, or
just luck?

Hypothesis testing answers exactly this. It's the formal machinery behind every "statistically
significant" result you'll ever read about — drug trials, polling, quality control — and it's the
culmination of the whole statistics module.

The maths is easy. **The marks are in the structure and the wording**, and that's what this topic is
really teaching.

---

## 1. The logic

:::key The core idea
1. **Assume nothing unusual is happening.** That assumption is the **null hypothesis**, $H_0$.
2. Calculate how likely your observed result (or something more extreme) would be **if $H_0$ were true**.
3. If that probability is **small enough**, conclude that $H_0$ is implausible — reject it.
4. If not, you have insufficient evidence against $H_0$.
:::

:::key The vocabulary
- **Null hypothesis $H_0$:** the "no change / no effect" claim, always with an **equals** sign
  ($H_0: p = 0.3$).
- **Alternative hypothesis $H_1$:** what you're testing for ($p > 0.3$, $p < 0.3$, or $p \neq 0.3$).
- **Significance level $\alpha$:** the threshold, typically 5% or 1%. It is the probability of
  **wrongly rejecting a true $H_0$**.
- **Critical region:** the set of outcomes that would lead you to reject $H_0$.
- **Test statistic:** the value you actually calculate from the data.
:::

:::warning You never "accept" or "prove" $H_0$
The correct phrasing is "**do not reject $H_0$**" or "there is **insufficient evidence** to reject
$H_0$".

Why the pedantry? Because failing to find evidence isn't the same as showing the claim is true — your
sample might simply have been too small to detect a real effect. A court finds a defendant "not
guilty", not "innocent"; this is the same distinction, and the mark scheme enforces it.
:::

:::insight One-tailed or two-tailed?
Read what's being claimed.

- *"Test whether the probability has **increased**"* → one-tailed, $H_1: p > 0.3$
- *"Test whether the probability has **decreased**"* → one-tailed, $H_1: p < 0.3$
- *"Test whether the probability has **changed**"* → **two-tailed**, $H_1: p \neq 0.3$

For a **two-tailed test at $\alpha$%**, split the significance level: use $\frac{\alpha}{2}$% in each
tail. A 5% two-tailed test means 2.5% in each tail.

The give-away words are "changed", "different from", "not equal to".
:::

---

## 2. The binomial hypothesis test

:::method The five-step structure
Every hypothesis test answer needs all five. Write them as five separate lines.

1. **Define** the variable and state the distribution under $H_0$:
   "Let $X$ be the number of successes. Under $H_0$, $X \sim B(20, 0.3)$."
2. **State the hypotheses:** $H_0: p = 0.3$, $H_1: p > 0.3$.
3. **Calculate the probability** of the observed value *or more extreme*, assuming $H_0$.
4. **Compare** with the significance level and state whether it's significant.
5. **Conclude in context**, referring to the original claim.
:::

:::example Worked example 1 — A drug is known to cure 30% of patients. A new version is tried on 20 patients and cures 11. Test at the 5% significance level whether the new version is more effective.
**Solution.**

**1.** Let $X$ be the number of patients cured. Under $H_0$, $X\sim B(20, 0.3)$.

**2.** $H_0: p = 0.3$ (the new drug is no different)
$H_1: p > 0.3$ (the new drug is more effective) — one-tailed, since we're testing for an *increase*.

**3.** We observed 11. "Or more extreme" here means 11 **or more**:
$$P(X \geq 11) = 1 - P(X\leq10) = 1 - 0.9829 = 0.0171$$

**4.** $0.0171 < 0.05$, so the result **is significant**. Reject $H_0$.

**5.** There is sufficient evidence at the 5% significance level to suggest that the new version of the
drug cures **more** than 30% of patients.
:::

:::warning "Or more extreme" — which direction?
- Testing for an **increase** ($H_1: p > $) → compute $P(X \geq \text{observed})$
- Testing for a **decrease** ($H_1: p < $) → compute $P(X \leq \text{observed})$

And remember the off-by-one: $P(X\geq 11) = 1 - P(X\leq 10)$.

Computing $P(X = 11)$ alone is wrong — hypothesis testing always asks about the **tail**, not the
single value.
:::

---

## 3. Critical regions

Instead of testing one observation, you can find **all** the values that would cause rejection.

:::method Finding a critical region
For $H_1: p > p_0$ at the $\alpha$% level, find the **smallest** $c$ with
$$P(X \geq c) \leq \alpha$$

For $H_1: p < p_0$, find the **largest** $c$ with $P(X\leq c) \leq \alpha$.

The **actual significance level** is the probability of the critical region — which is usually *less*
than $\alpha$, because $X$ is discrete and can't land exactly on the boundary.
:::

:::example Worked example 2 — $X\sim B(20, 0.3)$. Find the critical region for a test of $H_0: p=0.3$ against $H_1: p>0.3$ at the 5% level, and state the actual significance level.
**Solution.**

We need the smallest $c$ with $P(X\geq c) \leq 0.05$:

| $c$ | $P(X\geq c)$ |
|---|---|
| 9 | $0.1133$ |
| 10 | $0.0480$ |
| 11 | $0.0171$ |

At $c=9$ the probability exceeds 5%; at $c=10$ it doesn't.

**Critical region: $X \geq 10$.**

**Actual significance level:** $P(X\geq10) = 0.0480$, i.e. **4.80%**.

*(Note it's below the nominal 5%. With a discrete distribution you can't hit 5% exactly, so you take
the largest region that stays within the limit — which makes the test slightly conservative.)*
:::

:::example Worked example 3 — A coin is flipped 25 times. Find the critical region for a two-tailed test at the 5% level of whether the coin is fair, and state the actual significance level.
**Solution.**

Let $X$ be the number of heads. Under $H_0$, $X\sim B(25, 0.5)$.

$H_0: p = 0.5$, $H_1: p \neq 0.5$ — two-tailed, so **2.5% in each tail**.

*Lower tail:* largest $c$ with $P(X\leq c) \leq 0.025$:
- $P(X\leq 8) = 0.0539$ — too big
- $P(X\leq 7) = 0.0216$ ✓

*Upper tail:* by symmetry (since $p = 0.5$), smallest $c$ with $P(X\geq c)\leq0.025$:
- $P(X\geq 17) = 0.0539$ — too big
- $P(X\geq 18) = 0.0216$ ✓

**Critical region: $X \leq 7$ or $X \geq 18$.**

**Actual significance level:** $0.0216 + 0.0216 = 0.0432$, i.e. **4.32%**.

*(So 15 heads out of 25 is **not** significant evidence of bias at the 5% level — you'd need 18. That's
a genuinely useful intuition: coins have to look quite unfair before the evidence is strong.)*
:::

---

## 4. Testing a normal mean (Year 13)

:::key The distribution of the sample mean
If $X \sim N(\mu, \sigma^2)$ and you take a random sample of size $n$, then the **sample mean** has
$$\bar X \sim N\left(\mu,\; \frac{\sigma^2}{n}\right)$$
:::

:::insight Why the variance shrinks by $n$
A single measurement can be unusually high or low. The average of 25 measurements is much more stable,
because the extremes tend to cancel.

Specifically, the standard deviation of the mean is $\frac{\sigma}{\sqrt n}$ — the **standard error**.
Note the square root: to halve your uncertainty you need **four times** as much data. This is why large
studies are so expensive, and why doubling a sample size helps less than people expect.
:::

:::method Testing a mean
1. $H_0: \mu = \mu_0$, and $H_1$ as appropriate.
2. Under $H_0$, $\bar X \sim N\left(\mu_0, \frac{\sigma^2}{n}\right)$.
3. Compute the test statistic:
   $$z = \frac{\bar x - \mu_0}{\sigma/\sqrt n}$$
4. Compare with the critical $z$-value, **or** compute the probability and compare with $\alpha$.
5. Conclude in context.
:::

:::key Critical $z$-values
| Significance level | One-tailed | Two-tailed (each tail) |
|---|---|---|
| 10% | $\pm 1.2816$ | $\pm 1.6449$ |
| 5% | $\pm 1.6449$ | $\pm 1.9600$ |
| 1% | $\pm 2.3263$ | $\pm 2.5758$ |
:::

:::example Worked example 4 — A machine fills bags with a mean mass of 500 g and standard deviation 5 g. A sample of 25 bags has mean 502.1 g. Test at the 5% level whether the mean has increased.
**Solution.**

$H_0: \mu = 500$
$H_1: \mu > 500$ (one-tailed)

Under $H_0$:
$$\bar X \sim N\left(500, \frac{25}{25}\right) = N(500, 1)$$

so the standard error is 1 g.

$$z = \frac{502.1 - 500}{1} = 2.1$$

Critical value for a one-tailed 5% test: $1.6449$.

$$2.1 > 1.6449$$

So the result is **significant**: reject $H_0$.

**Conclusion:** there is sufficient evidence at the 5% level to suggest that the mean mass of the bags
has increased above 500 g.

*(Alternative route: $P(\bar X > 502.1) = P(Z > 2.1) = 0.0179 < 0.05$ — same conclusion. Either method
is fine; the $z$-comparison is usually quicker.)*
:::

---

## In the exam

- **Use the five-step structure.** Marks are allocated to each step, including the definition of the
  variable and the contextual conclusion.
- $H_0$ always has **=**. Never write $H_0: p \geq 0.3$.
- Two-tailed → **halve the significance level**. This is the most common structural error.
- The conclusion must mention the **context** and the **significance level**. "Reject $H_0$" alone
  loses a mark; "there is evidence at the 5% level that the proportion of faulty items has decreased"
  gets it.
- **Never** say "accept $H_0$" or "$H_0$ is true".
- For critical regions, tabulate the probabilities so the examiner can see you tested the boundary.
- The actual significance level is the probability of the critical region — compute it, don't just
  quote $\alpha$.

---

## Practice

:::question Q1 (5 marks)
A manufacturer claims that 20% of its sweets are red. In a bag of 30, only 2 are red. Test at the 5%
significance level whether the proportion of red sweets is lower than claimed.
:::
:::answer
Let $X$ be the number of red sweets. Under $H_0$, $X\sim B(30, 0.2)$.

$H_0: p = 0.2$
$H_1: p < 0.2$ (one-tailed — testing for a decrease)

$$P(X\leq 2) = 0.0442$$

$0.0442 < 0.05$, so the result **is significant**. Reject $H_0$.

There is sufficient evidence at the 5% level to suggest that the proportion of red sweets is **less
than** 20%.
:::

:::question Q2 (5 marks)
$X\sim B(15, 0.4)$. Find the critical region for a test of $H_0: p = 0.4$ against $H_1: p > 0.4$ at the
5% level, and state the actual significance level.
:::
:::answer
Find the smallest $c$ with $P(X\geq c) \leq 0.05$:

| $c$ | $P(X \geq c)$ |
|---|---|
| 9 | $0.0950$ |
| 10 | $0.0338$ |

**Critical region: $X \geq 10$.**

**Actual significance level:** $P(X\geq10) = 0.0338 = 3.38\%$.
:::

:::question Q3 (6 marks)
Over many years, 25% of students at a college have achieved grade A. After a new teaching method is
introduced, 9 of a random sample of 20 students achieve grade A.

Test at the 5% level whether the new method has changed the proportion achieving grade A.
:::
:::answer
Let $X$ be the number achieving grade A. Under $H_0$, $X\sim B(20, 0.25)$.

$H_0: p = 0.25$
$H_1: p \neq 0.25$ — **two-tailed**, because the question says "**changed**".

So the significance level in each tail is $2.5\%$.

We observed 9, which is above the expected $np = 5$, so use the upper tail:
$$P(X\geq9) = 1 - P(X\leq8) = 1 - 0.9591 = 0.0409$$

Compare with $0.025$ (not 0.05 — two-tailed):
$$0.0409 > 0.025$$

The result is **not significant**. Do not reject $H_0$.

There is **insufficient evidence** at the 5% level to suggest that the proportion of students achieving
grade A has changed.

*(Note that had this been a one-tailed test for an increase, $0.0409 < 0.05$ and we would have rejected
$H_0$. The same data, the same 5% headline, opposite conclusions — which is exactly why examiners care
so much about getting the tail right.)*
:::

:::question Q4 (5 marks)
The masses of apples from an orchard are normally distributed with standard deviation 12 g. Historically
the mean mass has been 150 g. A random sample of 36 apples has a mean mass of 145.4 g.

Test at the 5% significance level whether the mean mass has decreased.
:::
:::answer
$H_0: \mu = 150$
$H_1: \mu < 150$ (one-tailed)

Under $H_0$:
$$\bar X \sim N\left(150, \frac{144}{36}\right) = N(150, 4), \qquad \text{standard error } = 2$$

$$z = \frac{145.4 - 150}{2} = -2.3$$

Critical value for a one-tailed 5% test: $-1.6449$.

$$-2.3 < -1.6449$$

The result is **significant**. Reject $H_0$.

There is sufficient evidence at the 5% level to suggest that the mean mass of apples has **decreased**
below 150 g.
:::

:::question Q5 (6 marks)
A biased-coin test uses $X\sim B(50, 0.3)$, testing $H_0: p = 0.3$ against $H_1: p < 0.3$ at the 5%
level.

(a) Find the critical region.

(b) State the actual significance level.

(c) Explain what a Type I error would mean in this context.
:::
:::answer
**(a)** Find the largest $c$ with $P(X \leq c) \leq 0.05$:

| $c$ | $P(X\leq c)$ |
|---|---|
| 10 | $0.0789$ |
| 9 | $0.0402$ |

**Critical region: $X \leq 9$.**

**(b)** Actual significance level $= P(X\leq9) = 0.0402 = 4.02\%$.

**(c)** A **Type I error** is rejecting $H_0$ when it is actually true.

Here that would mean concluding the probability of success has decreased below 0.3, when in fact it is
still exactly 0.3 — the sample just happened, by chance, to contain 9 or fewer successes.

The probability of this happening is the actual significance level, 4.02%.
:::

:::question Q6 (7 marks) — synoptic
A company claims the mean lifetime of its batteries is at least 40 hours, with standard deviation
3.5 hours and lifetimes normally distributed. A consumer group tests 20 batteries and finds a mean
lifetime of 38.4 hours.

(a) Carry out a hypothesis test at the 1% level to test the company's claim.

(b) State one assumption you have made.

(c) Explain how the conclusion would change at the 5% level, and comment on what that shows.
:::
:::answer
**(a)** $H_0: \mu = 40$
$H_1: \mu < 40$ (one-tailed — the group is testing whether the lifetime is *less* than claimed)

Under $H_0$:
$$\bar X \sim N\left(40, \frac{3.5^2}{20}\right) = N(40, 0.6125), \qquad
\text{standard error} = \sqrt{0.6125} = 0.7826$$

$$z = \frac{38.4-40}{0.7826} = -2.044$$

Critical value for a one-tailed 1% test: $-2.3263$.

$$-2.044 > -2.3263$$

The test statistic is **not** in the critical region. **Do not reject $H_0$.**

There is insufficient evidence at the 1% level to reject the company's claim that the mean battery
lifetime is 40 hours.

**(b)** That the 20 batteries were a **random sample**, and that the population standard deviation
really is 3.5 hours (the test assumes $\sigma$ is known and unchanged).

**(c)** At the 5% level the critical value is $-1.6449$, and
$$-2.044 < -1.6449$$
so we **would** reject $H_0$ and conclude the mean lifetime is below 40 hours.

**What this shows:** the same data gives opposite conclusions at different significance levels. The 1%
test demands stronger evidence before rejecting the company's claim, so it is less likely to make a
Type I error — but correspondingly more likely to miss a genuine shortfall (a Type II error).

Choosing $\alpha$ is a judgement about which error is worse. Here, a consumer group might reasonably
argue that 5% is the appropriate standard, while the company would prefer 1%.
"Not significant at 1%" never means "the claim is true".
:::
