---
title: The Formula Booklet — What's In It, What Isn't
code: EX1
summary: The single most valuable hour of revision: knowing exactly which formulae you get given and which you must memorise.
time: 1 hour
prereq: None
---

## Why this matters more than you think

Students waste hours memorising formulae that are printed in the booklet, and then walk into the exam
without the ones that aren't.

Go through this list once, properly, and you'll know exactly where to direct your memorisation effort.
It is probably the highest-return hour of revision available to you.

:::warning Get the real thing
This page is a guide to the **structure** of the booklet, not a substitute for it. Download the
official Pearson "Mathematical Formulae and Statistical Tables" for 9MA0, print it, and have it beside
you for every past paper you do. You need to be fast at *finding* things in it, and that only comes
from use.
:::

---

## 1. What you are GIVEN (don't memorise these)

### Pure

- **Binomial expansion** for positive integer $n$, and the general expansion for any $n$ with its
  validity condition.
- **Arithmetic and geometric series:** $u_n$, $S_n$, $S_\infty$.
- **Trigonometric identities:** compound angle formulae ($\sin(A\pm B)$, $\cos(A\pm B)$,
  $\tan(A\pm B)$), and the Pythagorean identities $1+\tan^2 = \sec^2$, $1+\cot^2 = \operatorname{cosec}^2$.
- **Small angle approximations:** $\sin\theta\approx\theta$, $\cos\theta\approx1-\frac{\theta^2}{2}$,
  $\tan\theta\approx\theta$.
- **Differentiation:** the product rule, the quotient rule, and the derivatives of $\tan kx$,
  $\sec kx$, $\operatorname{cosec}kx$, $\cot kx$.
- **Integration:** the standard integrals of $\sec^2kx$, $\tan kx$, $\cot kx$, and integration by parts.
- **Numerical methods:** the trapezium rule and Newton–Raphson.
- **Arc length and sector area:** $s = r\theta$, $A = \frac12r^2\theta$.
- **The cosine rule** and the **area of a triangle** $\frac12ab\sin C$.

### Statistics

- **The binomial probability function** $P(X=x) = \binom nx p^x(1-p)^{n-x}$.
- **Mean and variance of the binomial:** $np$ and $np(1-p)$.
- **Standardising:** $Z = \frac{X-\mu}{\sigma}$.
- **The normal distribution tables** and the **percentage points** table.
- **Critical values for the PMCC** (correlation coefficient table).
- **Variance formula** $\sigma^2 = \frac{\sum x^2}{n} - \bar x^2$.

### Mechanics

- **All five SUVAT equations**, in both scalar and vector form.
- **The value $g = 9.8\text{ m s}^{-2}$** is stated on the front of the paper.

---

## 2. What you must MEMORISE (this is the actual list)

:::key Pure — not in the booklet
- **The quadratic formula** $x = \frac{-b\pm\sqrt{b^2-4ac}}{2a}$ and the **discriminant** $b^2-4ac$.
- **All the index and surd laws.**
- **Exact trig values** for $0$, $30°$, $45°$, $60°$, $90°$ (and in radians).
- **$\sin^2\theta+\cos^2\theta \equiv 1$** and **$\tan\theta \equiv \frac{\sin\theta}{\cos\theta}$**.
  (The *other* two Pythagorean identities are given; these two are not.)
- **The double angle formulae.** (You can derive them from the compound angle formulae, which *are*
  given — but that costs time, so learn them.)
- **The three forms of $\cos2A$.**
- **The R-form method** — $R = \sqrt{a^2+b^2}$, $\tan\alpha = \frac ba$.
- **The laws of logarithms**, and $a^{\log_a x} = x$.
- **The derivatives of $x^n$, $e^{kx}$, $\ln x$, $\sin kx$, $\cos kx$.**
- **The integrals of $x^n$, $e^{kx}$, $\frac1x$, $\sin kx$, $\cos kx$.**
- **The chain rule.** (Product and quotient are given; chain is not.)
- **Parametric differentiation** $\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$.
- **Distance and midpoint formulae**, and the **equation of a circle**.
- **Perpendicular gradients** $m_1m_2 = -1$.
- **The sine rule.** (The cosine rule is given; the sine rule is not.)
- **Radians–degrees conversion.**
- **Every graph transformation rule.**
:::

:::key Statistics — not in the booklet
- **$P(A\cup B) = P(A)+P(B)-P(A\cap B)$**
- **$P(A\mid B) = \frac{P(A\cap B)}{P(B)}$**
- **The independence test** $P(A\cap B) = P(A)P(B)$
- **The sampling distribution of the mean** $\bar X \sim N\left(\mu, \frac{\sigma^2}{n}\right)$
- **Interpolation** for the median and quartiles of grouped data
- **The outlier rules** ($1.5\times$IQR, or $2\sigma$)
- **The skewness coefficient** $\frac{3(\text{mean}-\text{median})}{\sigma}$
- **All the sampling method definitions** and their advantages/disadvantages
- **The continuity correction** for the normal approximation
:::

:::key Mechanics — not in the booklet
- **$F = ma$** (yes, really — it's assumed knowledge)
- **$W = mg$**
- **$F \leq \mu R$** and the friction law
- **The resolving components** $mg\sin\theta$ down a slope, $mg\cos\theta$ perpendicular
- **Moment $=$ force $\times$ perpendicular distance**
- **All the projectile results** (time of flight, range, maximum height) — derivable but worth knowing
- **The trajectory equation** (you're normally asked to derive it)
:::

---

## 3. How to memorise the ones that matter

:::method A method that actually works
Formulae don't stick from reading. They stick from **producing them from memory, repeatedly, with
gaps**.

1. Write every must-memorise formula on a single sheet, organised by topic.
2. Each revision session, **close the sheet and write out one section from memory**. Takes 3 minutes.
3. Check, and mark the ones you got wrong.
4. Next session, do those ones again **plus** a new section.
5. Once a week, do the whole sheet.

The ones you keep getting wrong are the ones worth 20 minutes of extra attention. The ones you always
get right don't need revisiting at all.
:::

:::insight Understand the derivation for the ones you keep forgetting
If a formula won't stick, learn where it comes from — it's usually much shorter than you think and far
more memorable:

- The **quadratic formula** is just completing the square on $ax^2+bx+c=0$.
- **$1 + \tan^2 = \sec^2$** is $\sin^2+\cos^2=1$ divided by $\cos^2$.
- The **double angle formulae** are the compound angle formulae with $B = A$.
- **$R = \sqrt{a^2+b^2}$** comes from squaring and adding $R\cos\alpha = a$, $R\sin\alpha = b$.
- The **arithmetic series sum** is Gauss's trick: write it forwards and backwards and add.
- The **projectile range** comes from $t = \frac{2u\sin\theta}{g}$ times $u\cos\theta$, plus
  $2\sin\theta\cos\theta = \sin2\theta$.

Six derivations, each under a minute, covering the formulae students forget most.
:::

---

## 4. Practical booklet habits

- **Tab it.** Put sticky tabs on the pure, statistics and mechanics sections so you're not flicking
  under time pressure.
- **Know the page for the normal tables and the PMCC critical values** — those are the two you'll need
  fastest in Paper 3.
- **Check the notation.** The booklet's version of a formula sometimes uses different letters from your
  textbook. Read it once now so you don't have to decode it in the exam.
- **Don't copy a formula out and then substitute wrongly.** Write the general formula, then the
  substituted version, on separate lines. It's clearer and it earns the method mark.
