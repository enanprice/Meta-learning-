---
title: Binomial Expansion for Negative and Fractional Indices
code: P2.4
spec: 4.1
summary: Extending the binomial expansion to any index, the validity condition, expanding $(a+bx)^n$, and combining with partial fractions.
time: 4 hours
prereq: P1.8 The Binomial Expansion, P2.1 Partial Fractions
papers: Papers 1 and 2
---

## Why this topic exists

In Year 12, $(1+x)^n$ only worked for positive whole $n$, because $\binom{n}{r}$ needs $n!$ to make
sense. This topic removes that restriction: now $n$ can be $-2$, or $\frac13$, or $-\frac52$.

The payoff is that you can expand things like $\sqrt{1+x}$ and $\frac{1}{1-2x}$ as polynomials, which
is how calculators actually compute roots, and how physicists linearise awkward formulae. The cost is
that the expansion no longer terminates — it goes on forever — and it only works for certain values
of $x$.

---

## 1. The general binomial expansion

:::key The expansion for any $n$
$$(1+x)^n = 1 + nx + \frac{n(n-1)}{2!}x^2 + \frac{n(n-1)(n-2)}{3!}x^3 + \dots$$

**Valid for $|x| < 1$.**

This *is* in the formula booklet. The validity condition is not always printed prominently — know it.
:::

:::insight Why it's the same formula, and why it never ends
For a positive integer $n$, the numerators $n(n-1)(n-2)\dots$ eventually hit zero — for $n=3$, the
fourth term contains $(n-3) = 0$ — so the series stops. That's why $(1+x)^3$ has exactly four terms.

For $n = -2$ or $n = \frac12$, the numerator never hits zero, so the series runs forever. It's an
**infinite series**, and it only adds up to a finite answer when the terms shrink — which is what
$|x|<1$ guarantees.

Sanity check with $n = -1$:
$$(1+x)^{-1} = 1 - x + x^2 - x^3 + \dots$$
That's the geometric series with $a=1$, $r = -x$, whose sum to infinity is $\frac{1}{1+x}$ ✓ — and
geometric series need $|r| < 1$, which is exactly the same condition. The two topics agree.
:::

:::warning Never use $\binom{n}{r}$ here
The $\binom nr$ notation and the `nCr` button only work for positive integers. For fractional or
negative $n$, write the coefficients out longhand:
$$\frac{n(n-1)}{2!}, \qquad \frac{n(n-1)(n-2)}{3!}$$
Your calculator will give an error or nonsense if you try `nCr` with $n = -2$.
:::

:::example Worked example 1 — Expand $(1 + x)^{1/2}$ up to and including the term in $x^3$, and state the range of validity.
**Solution.**

Here $n = \frac12$:

- **$x$ term:** $nx = \frac12 x$
- **$x^2$ term:** $\dfrac{n(n-1)}{2!}x^2 = \dfrac{\frac12\left(-\frac12\right)}{2}x^2 = -\dfrac{1}{8}x^2$
- **$x^3$ term:** $\dfrac{n(n-1)(n-2)}{3!}x^3 = \dfrac{\frac12\left(-\frac12\right)\left(-\frac32\right)}{6}x^3
  = \dfrac{3/8}{6}x^3 = \dfrac{1}{16}x^3$

$$(1+x)^{1/2} \approx 1 + \frac12 x - \frac18 x^2 + \frac{1}{16}x^3$$

**Valid for $|x| < 1$.**

*(Check with $x = 0.44$: the expansion gives $1.2 - 0.0242 + 0.00532 = 1.1811$, and
$\sqrt{1.44} = 1.2$ — the truncated series is close and improves with more terms.)*
:::

:::example Worked example 2 — Expand $(1 - 2x)^{-1}$ up to the $x^3$ term, and state the validity.
**Solution.**

Be careful: the "$x$" in the formula is the whole of $(-2x)$, and $n = -1$.

- $n(-2x) = (-1)(-2x) = 2x$
- $\dfrac{(-1)(-2)}{2}(-2x)^2 = 1 \times 4x^2 = 4x^2$
- $\dfrac{(-1)(-2)(-3)}{6}(-2x)^3 = (-1)(-8x^3) = 8x^3$

$$(1-2x)^{-1} \approx 1 + 2x + 4x^2 + 8x^3$$

**Validity:** we need $|-2x| < 1$, i.e. $|x| < \frac12$.

*(Recognisable as a geometric series with $r = 2x$ — and $\frac{1}{1-2x}$ is exactly its sum to
infinity, which needs $|2x|<1$ ✓)*
:::

:::warning The validity condition is about the whole bracket
For $(1 + bx)^n$ the condition is $|bx| < 1$, so $|x| < \frac{1}{|b|}$ — **not** $|x| < 1$.

For $(1 - 3x)^{-2}$: $|x| < \frac13$. For $\left(1 + \frac x4\right)^{1/2}$: $|x| < 4$.

This is a separate mark in almost every question, and it's dropped constantly.
:::

---

## 2. Expanding $(a + bx)^n$ when $a \neq 1$

The formula only works when the bracket starts with a 1. So **factor out $a$ first**.

:::method Expanding $(a+bx)^n$
$$(a+bx)^n = a^n\left(1 + \frac{b}{a}x\right)^n$$

1. Factor out $a$ from inside the bracket, raising it to the power $n$ **outside**.
2. Expand the $(1 + \dots)^n$ part using the standard formula.
3. Multiply every term by $a^n$.
4. Validity: $\left|\dfrac{b}{a}x\right| < 1$, i.e. $|x| < \left|\dfrac{a}{b}\right|$.
:::

:::warning $a^n$, not $a$
$(4+x)^{1/2} = 4^{1/2}\left(1 + \frac x4\right)^{1/2} = 2\left(1+\frac x4\right)^{1/2}$.

The factor outside is $4^{1/2} = 2$, not 4. And for a negative index, $(9 - x)^{-1/2}$ gives
$9^{-1/2} = \frac13$ outside. Getting this factor wrong scales every single term.
:::

:::example Worked example 3 — Expand $\sqrt{4 + x}$ up to the term in $x^2$, stating the range of validity.
**Solution.**
$$(4+x)^{1/2} = 4^{1/2}\left(1 + \frac{x}{4}\right)^{1/2} = 2\left(1 + \frac x4\right)^{1/2}$$

Using the result from Worked example 1 with "$x$" replaced by $\frac x4$:
$$\left(1+\frac x4\right)^{1/2} \approx 1 + \frac12\left(\frac x4\right) - \frac18\left(\frac x4\right)^2
= 1 + \frac{x}{8} - \frac{x^2}{128}$$

Multiply by 2:
$$\sqrt{4+x} \approx 2 + \frac{x}{4} - \frac{x^2}{64}$$

**Validity:** $\left|\frac x4\right| < 1 \Rightarrow |x| < 4$.

*(Check with $x=0$: $\sqrt4 = 2$ ✓. With $x = 1$: expansion gives $2 + 0.25 - 0.0156 = 2.2344$, and
$\sqrt5 = 2.2361$ ✓)*
:::

---

## 3. Combining with partial fractions

This is the standard 8-mark question: split a rational function into partial fractions, expand each
piece, and combine.

:::example Worked example 4 — $f(x) = \dfrac{4x + 5}{(1+x)(1-2x)}$.
**(a)** Express $f(x)$ in partial fractions. **(b)** Hence find the expansion up to $x^2$.
**(c)** State the range of validity.

**Solution.**

**(a)**
$$\frac{4x+5}{(1+x)(1-2x)} \equiv \frac{A}{1+x} + \frac{B}{1-2x}$$
$$4x + 5 \equiv A(1-2x) + B(1+x)$$

*$x = -1$:* $1 = A(3) \Rightarrow A = \frac13$
*$x = \frac12$:* $7 = B\left(\frac32\right) \Rightarrow B = \frac{14}{3}$

$$f(x) \equiv \frac{1}{3(1+x)} + \frac{14}{3(1-2x)}$$

**(b)** Expand each piece as a binomial with index $-1$:
$$(1+x)^{-1} = 1 - x + x^2 - \dots$$
$$(1-2x)^{-1} = 1 + 2x + 4x^2 + \dots$$

So
$$f(x) \approx \tfrac13\left(1 - x + x^2\right) + \tfrac{14}{3}\left(1 + 2x + 4x^2\right)$$
$$= \left(\tfrac13 + \tfrac{14}{3}\right) + \left(-\tfrac13 + \tfrac{28}{3}\right)x
+ \left(\tfrac13 + \tfrac{56}{3}\right)x^2$$
$$= 5 + 9x + 19x^2$$

**Check the constant term:** $f(0) = \frac{5}{(1)(1)} = 5$ ✓

**(c)** The first expansion needs $|x| < 1$; the second needs $|x| < \frac12$.

Both must hold, so take the **more restrictive**:
$$|x| < \tfrac12$$
:::

:::warning Validity for a combined expansion
When you add two expansions, the combined expansion is only valid where **both** are — so take the
**smaller** interval. Students routinely quote the larger one. Think of it as: the whole thing breaks
as soon as any piece breaks.
:::

---

## 4. Approximations

Same idea as Year 12: substitute a small value of $x$ (**inside the range of validity**) to estimate a
root or a reciprocal.

:::example Worked example 5 — Use the expansion of $\sqrt{4+x}$ to estimate $\sqrt{4.2}$.
**Solution.**

We need $4 + x = 4.2$, so $x = 0.2$. Is $0.2$ within $|x| < 4$? Yes ✓

$$\sqrt{4.2} \approx 2 + \frac{0.2}{4} - \frac{0.04}{64} = 2 + 0.05 - 0.000625 = 2.049375$$

*(True value: $2.0493902\ldots$ — accurate to 5 decimal places from three terms.)*
:::

---

## In the exam

- **State the validity.** It's a mark on nearly every question in this topic and it's forgotten more
  than any other single thing.
- Write the coefficients out longhand. No `nCr`.
- Watch the sign inside the bracket. In $(1-3x)^{-2}$, every occurrence of "$x$" in the formula is
  $(-3x)$, including when it's squared and cubed.
- "Hence" means use the previous part. If part (a) was partial fractions, part (b) expects you to
  expand those, not to start again.
- The expansion of $(1+x)^{-1}$, $(1+x)^{-2}$ and $(1+x)^{1/2}$ come up so often that recognising them
  saves real time.

---

## Practice

:::question Q1 (4 marks)
Find the first four terms in the expansion of $(1+x)^{-3}$, and state the range of validity.
:::
:::answer
$n = -3$:
- $nx = -3x$
- $\dfrac{(-3)(-4)}{2}x^2 = 6x^2$
- $\dfrac{(-3)(-4)(-5)}{6}x^3 = -10x^3$

$$(1+x)^{-3} \approx 1 - 3x + 6x^2 - 10x^3, \qquad |x| < 1$$
:::

:::question Q2 (5 marks)
Expand $(1 - 3x)^{1/3}$ up to and including the term in $x^2$, and state the range of validity.
:::
:::answer
$n = \frac13$, and "$x$" is $(-3x)$:
- $n(-3x) = \frac13(-3x) = -x$
- $\dfrac{\frac13\left(-\frac23\right)}{2}(-3x)^2 = \dfrac{-\frac29}{2}(9x^2) = -\frac19 \times 9x^2 = -x^2$

$$(1-3x)^{1/3} \approx 1 - x - x^2$$

**Validity:** $|-3x| < 1 \Rightarrow |x| < \frac13$.
:::

:::question Q3 (5 marks)
Find the first three terms in the expansion of $\dfrac{1}{\sqrt{9 - x}}$, stating the range of validity.
:::
:::answer
$$\frac{1}{\sqrt{9-x}} = (9-x)^{-1/2} = 9^{-1/2}\left(1 - \frac x9\right)^{-1/2} = \frac13\left(1-\frac x9\right)^{-1/2}$$

With $n = -\frac12$ and "$x$" $= -\frac x9$:
- $n\left(-\frac x9\right) = \left(-\frac12\right)\left(-\frac x9\right) = \frac{x}{18}$
- $\dfrac{\left(-\frac12\right)\left(-\frac32\right)}{2}\left(\frac{x^2}{81}\right)
  = \dfrac{3/4}{2}\cdot\frac{x^2}{81} = \frac{3}{8}\cdot\frac{x^2}{81} = \frac{x^2}{216}$

$$\frac13\left(1 + \frac{x}{18} + \frac{x^2}{216}\right) = \frac13 + \frac{x}{54} + \frac{x^2}{648}$$

**Validity:** $\left|\frac x9\right| < 1 \Rightarrow |x| < 9$.

**Check at $x=0$:** $\frac{1}{\sqrt9} = \frac13$ ✓
:::

:::question Q4 (6 marks)
(a) Expand $\sqrt{1 - 4x}$ up to and including the term in $x^2$.

(b) Use your expansion with a suitable value of $x$ to estimate $\sqrt{0.96}$.
:::
:::answer
**(a)** $n = \frac12$, "$x$" $= -4x$:
- $\frac12(-4x) = -2x$
- $\dfrac{\frac12\left(-\frac12\right)}{2}(-4x)^2 = -\frac18 \times 16x^2 = -2x^2$

$$\sqrt{1-4x} \approx 1 - 2x - 2x^2 \qquad \left(|x| < \tfrac14\right)$$

**(b)** Need $1 - 4x = 0.96 \Rightarrow 4x = 0.04 \Rightarrow x = 0.01$ (well inside the validity range).

$$\sqrt{0.96} \approx 1 - 0.02 - 2(0.0001) = 1 - 0.02 - 0.0002 = 0.9798$$

*(True value $0.9797959\ldots$ ✓)*
:::

:::question Q5 (8 marks) — synoptic
$f(x) = \dfrac{7 - 4x}{(1 - x)(2 + 3x)}$

(a) Express $f(x)$ in partial fractions.

(b) Hence find the series expansion of $f(x)$ up to and including the term in $x^2$.

(c) State the range of values of $x$ for which the expansion is valid.
:::
:::answer
**(a)**
$$\frac{7-4x}{(1-x)(2+3x)} \equiv \frac{A}{1-x} + \frac{B}{2+3x}$$
$$7 - 4x \equiv A(2+3x) + B(1-x)$$

*$x = 1$:* $3 = 5A \Rightarrow A = \frac35$
*$x = -\frac23$:* $7 + \frac83 = \frac{29}{3} = B\left(\frac53\right) \Rightarrow B = \frac{29}{5}$

$$f(x) \equiv \frac{3}{5(1-x)} + \frac{29}{5(2+3x)}$$

**(b)** First piece: $\frac35(1-x)^{-1} = \frac35\left(1 + x + x^2 + \dots\right)$

Second piece — factor out the 2 first:
$$\frac{29}{5}(2+3x)^{-1} = \frac{29}{5}\cdot 2^{-1}\left(1 + \tfrac{3x}{2}\right)^{-1}
= \frac{29}{10}\left(1 - \tfrac{3x}{2} + \tfrac94 x^2 - \dots\right)$$

Add:
$$f(x) \approx \left(\tfrac35 + \tfrac{29}{10}\right) + \left(\tfrac35 - \tfrac{87}{20}\right)x
+ \left(\tfrac35 + \tfrac{261}{40}\right)x^2$$

Constant: $\frac{6}{10} + \frac{29}{10} = \frac{35}{10} = \frac72$

$x$: $\frac{12}{20} - \frac{87}{20} = -\frac{75}{20} = -\frac{15}{4}$

$x^2$: $\frac{24}{40} + \frac{261}{40} = \frac{285}{40} = \frac{57}{8}$

$$f(x) \approx \frac72 - \frac{15}{4}x + \frac{57}{8}x^2$$

**Check the constant:** $f(0) = \frac{7}{(1)(2)} = \frac72$ ✓

**(c)** First expansion needs $|x| < 1$; second needs $\left|\frac{3x}{2}\right| < 1$, i.e.
$|x| < \frac23$.

Both required, so take the smaller:
$$|x| < \tfrac23$$
:::

:::question Q6 (6 marks) — stretch
In the expansion of $(1 + ax)^{n}$, where $n$ is not a positive integer, the coefficient of $x$ is
$-6$ and the coefficient of $x^2$ is $27$. Find $a$ and $n$.
:::
:::answer
Coefficient of $x$: $na = -6$ … (1)

Coefficient of $x^2$: $\dfrac{n(n-1)}{2}a^2 = 27$ … (2)

From (2): $n(n-1)a^2 = 54$, i.e. $(na)(na - a) = 54$.

Substituting $na = -6$:
$$-6(-6 - a) = 54 \;\Rightarrow\; -6 - a = -9 \;\Rightarrow\; a = 3$$

Then from (1): $3n = -6 \Rightarrow n = -2$.

**Check:** $(1+3x)^{-2} = 1 + (-2)(3x) + \frac{(-2)(-3)}{2}(3x)^2 + \dots = 1 - 6x + 27x^2$ ✓

*(The trick here is spotting that $n(n-1)a^2 = (na)(na-a)$, which lets you substitute the known
product rather than solving a messy simultaneous system.)*
:::
