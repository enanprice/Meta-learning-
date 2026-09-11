---
title: The Binomial Expansion
code: P1.8
spec: 4.1
summary: Pascal's triangle, the nCr formula, expanding $(a+bx)^n$, finding single terms, and using expansions for approximations.
time: 3 hours
prereq: P1.1 Algebraic Expressions
papers: Papers 1 and 2
---

## Why this topic exists

You could expand $(1+x)^{12}$ by multiplying twelve brackets together. You'd be there all afternoon and
you'd make a mistake. The binomial expansion gives you any term you want, directly, without expanding
anything.

It also underpins the binomial *distribution* in statistics (the $\binom{n}{r}$ there is the same
$\binom{n}{r}$ as here — same counting argument), and in Year 13 it extends to negative and fractional
powers, which is how you get series approximations for things like $\sqrt{1+x}$.

---

## 1. Pascal's triangle

Each row gives the coefficients for the corresponding power. Each entry is the sum of the two above it.

```
n=0:            1
n=1:          1   1
n=2:        1   2   1
n=3:      1   3   3   1
n=4:    1   4   6   4   1
n=5:  1   5  10  10   5   1
n=6: 1  6  15  20  15   6   1
```

So $(a+b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$.

Two patterns to notice:

- The powers of $a$ go **down** from $n$ to $0$; the powers of $b$ go **up** from $0$ to $n$.
- In every term, **the powers add up to $n$**. That's your instant sanity check.

Pascal's triangle is fine up to about $n=6$. Beyond that, use the formula.

---

## 2. The $\binom{n}{r}$ notation

:::key Binomial coefficients
$$\binom{n}{r} = {}^nC_r = \frac{n!}{r!\,(n-r)!}$$
where $n! = n \times (n-1) \times \dots \times 2 \times 1$, and $0! = 1$.
:::

$\binom{n}{r}$ counts the number of ways of choosing $r$ things from $n$. On your calculator it's the
`nCr` button — **learn where it is**, because computing $\binom{20}{7}$ by hand is a waste of exam time.

:::insight Why choosing explains the expansion
Think about what $(a+b)^5$ means: five brackets, $(a+b)(a+b)(a+b)(a+b)(a+b)$. When you expand, each
term comes from picking either $a$ or $b$ from each bracket.

How many ways can you end up with $a^3b^2$? You need to pick $b$ from exactly 2 of the 5 brackets —
and the number of ways to choose 2 brackets from 5 is $\binom{5}{2} = 10$.

So the coefficient of $a^3b^2$ is $10$. The binomial coefficients *are* counting numbers. That's also
exactly why the same symbol turns up in the binomial distribution: "how many ways can I get 2
successes out of 5 trials?"
:::

:::key The binomial expansion
$$(a+b)^n = \binom{n}{0}a^n + \binom{n}{1}a^{n-1}b + \binom{n}{2}a^{n-2}b^2 + \dots + \binom{n}{n}b^n$$

The general term is
$$\binom{n}{r}a^{n-r}b^{r}$$

**This is in the formula booklet.** Learn how to *use* it rather than memorising it.
:::

---

## 3. Expanding $(a + bx)^n$

The danger is always the same: the whole of $bx$ gets raised to the power, not just the $x$.

:::example Worked example 1 — Expand $(2 + 3x)^4$ fully
**Solution.**

Here $a = 2$, $b = 3x$, $n = 4$. Coefficients from Pascal's row 4: $1, 4, 6, 4, 1$.

$$\binom40 2^4 + \binom41 2^3(3x) + \binom42 2^2(3x)^2 + \binom43 2(3x)^3 + \binom44 (3x)^4$$

Term by term:
- $1 \times 16 = 16$
- $4 \times 8 \times 3x = 96x$
- $6 \times 4 \times 9x^2 = 216x^2$
- $4 \times 2 \times 27x^3 = 216x^3$
- $1 \times 81x^4 = 81x^4$

$$(2+3x)^4 = 16 + 96x + 216x^2 + 216x^3 + 81x^4$$

**Check with $x = 1$:** LHS $= 5^4 = 625$. RHS $= 16+96+216+216+81 = 625$ ✓
:::

:::warning The three standard errors
1. **$(3x)^2 = 9x^2$, not $3x^2$.** The whole bracket is raised to the power.
2. **Negative signs.** In $(2 - 3x)^4$, the second term is $(-3x)$, so odd powers are negative:
   $16 - 96x + 216x^2 - 216x^3 + 81x^4$. The signs alternate.
3. **Forgetting the powers of $a$.** When $a \neq 1$, every term carries a power of $a$ too.
:::

:::method The substitution check
Put $x = 1$ into the original and into your expansion. They must match. This catches virtually every
slip and takes ten seconds. For expansions with a negative, $x=1$ still works — just be careful with
signs.
:::

---

## 4. Finding one specific term

You rarely need the whole expansion. If a question asks for "the coefficient of $x^3$", find **that
term only**.

:::method Finding the term in $x^k$
Use the general term $\binom{n}{r}a^{n-r}b^r$ and work out which $r$ produces $x^k$.

For $(a + cx)^n$, the $r$th term contains $x^r$ — so $r = k$ directly.

For trickier cases like $(a + cx^2)^n$, the $r$th term contains $x^{2r}$, so $r = k/2$.
:::

:::example Worked example 2 — Find the coefficient of $x^3$ in the expansion of $(1 + 2x)^{10}$
**Solution.**

General term: $\binom{10}{r}(1)^{10-r}(2x)^r = \binom{10}{r}2^r x^r$.

We want $x^3$, so $r = 3$:
$$\binom{10}{3} \times 2^3 = 120 \times 8 = 960$$

**Coefficient: $960$.**
:::

:::warning "Coefficient" versus "term"
- The **term** in $x^3$ is $960x^3$.
- The **coefficient** of $x^3$ is $960$.

Read the question. Writing $960x^3$ when asked for the coefficient can cost the mark.
:::

:::example Worked example 3 — Find the coefficient of $x^2$ in $(3 - 2x)^6$
**Solution.**

$a = 3$, $b = -2x$, $n = 6$, and we want $r = 2$:
$$\binom{6}{2}(3)^{6-2}(-2x)^2 = 15 \times 81 \times 4x^2 = 4860x^2$$

**Coefficient: $4860$.**

*(Note $(-2)^2 = +4$ — the square kills the minus sign. But the $x^3$ term would have $(-2)^3 = -8$,
giving $\binom63 \times 27 \times (-8) = 20 \times 27 \times (-8) = -4320$.)*
:::

---

## 5. Approximations

If $x$ is small, then $x^2$ is very small and $x^3$ is negligible. So the first few terms of a binomial
expansion give a good numerical approximation.

:::example Worked example 4 — Find the first four terms of $\left(1 - \dfrac{x}{2}\right)^8$ and use them to estimate $0.995^8$
**Solution.**

$a = 1$, $b = -\frac{x}{2}$, $n = 8$. Pascal's row 8 starts $1, 8, 28, 56$.

- $r=0$: $1$
- $r=1$: $8 \times \left(-\frac x2\right) = -4x$
- $r=2$: $28 \times \frac{x^2}{4} = 7x^2$
- $r=3$: $56 \times \left(-\frac{x^3}{8}\right) = -7x^3$

$$\left(1-\tfrac{x}{2}\right)^8 \approx 1 - 4x + 7x^2 - 7x^3$$

**For the estimate:** we need $1 - \frac{x}{2} = 0.995$, so $\frac{x}{2} = 0.005$, giving $x = 0.01$.

$$0.995^8 \approx 1 - 0.04 + 7(0.0001) - 7(0.000001) = 1 - 0.04 + 0.0007 - 0.000007 = 0.960693$$

*(True value: $0.9606936\ldots$ — accurate to 6 decimal places from just four terms.)*
:::

:::method Approximation questions in three steps
1. Expand the general expression as far as asked.
2. **Set the bracket equal to the number** you want, and solve for $x$.
3. Substitute that $x$ into your expansion.

Step 2 is where marks are lost. Don't guess $x$ — solve for it.
:::

:::exam Why the approximation is good
If asked to comment: because $x$ is small ($|x| = 0.01$ here), successive powers $x^2, x^3, \dots$ get
rapidly smaller, so the omitted terms contribute very little. The smaller $x$ is, the better the
approximation.
:::

---

## In the exam

- "In ascending powers of $x$" means start with the constant term and go up. "Descending" means start
  with the highest power. Read carefully — writing the terms backwards loses marks.
- "Up to and including the term in $x^3$" means give exactly four terms ($x^0$ to $x^3$).
- If a question gives you an expansion with unknown constants (e.g. "the coefficient of $x^2$ is 60,
  find $k$"), write the general term with $k$ in it, set it equal, and solve. Often this gives a
  quadratic in $k$ with two answers.
- Always **check with $x=1$** if you have the full expansion.

---

## Practice

:::question Q1 (4 marks)
Expand $(1 + 3x)^5$ fully, simplifying each term.
:::
:::answer
Pascal's row 5: $1, 5, 10, 10, 5, 1$.

$$1 + 5(3x) + 10(3x)^2 + 10(3x)^3 + 5(3x)^4 + (3x)^5$$
$$= 1 + 15x + 90x^2 + 270x^3 + 405x^4 + 243x^5$$

**Check with $x=1$:** $4^5 = 1024$, and $1+15+90+270+405+243 = 1024$ ✓
:::

:::question Q2 (3 marks)
Find the coefficient of $x^4$ in the expansion of $(2 - x)^9$.
:::
:::answer
General term: $\binom9r (2)^{9-r}(-x)^r$. For $x^4$, take $r = 4$:
$$\binom94 \times 2^5 \times (-1)^4 = 126 \times 32 \times 1 = 4032$$

**Coefficient: $4032$.**
:::

:::question Q3 (4 marks)
Write down the first four terms, in ascending powers of $x$, of $(1 - 2x)^{12}$.
:::
:::answer
$$\binom{12}{0} + \binom{12}{1}(-2x) + \binom{12}{2}(-2x)^2 + \binom{12}{3}(-2x)^3$$
$$= 1 + 12(-2x) + 66(4x^2) + 220(-8x^3)$$
$$= 1 - 24x + 264x^2 - 1760x^3$$
:::

:::question Q4 (5 marks)
In the expansion of $(1 + kx)^8$, the coefficient of $x^2$ is 112. Given that $k > 0$, find $k$ and
hence the coefficient of $x^3$.
:::
:::answer
Coefficient of $x^2$: $\binom82 k^2 = 28k^2$.

$$28k^2 = 112 \;\Rightarrow\; k^2 = 4 \;\Rightarrow\; k = 2 \;(\text{since } k>0)$$

Coefficient of $x^3$: $\binom83 k^3 = 56 \times 8 = 448$.
:::

:::question Q5 (5 marks)
(a) Find the first three terms, in ascending powers of $x$, of $(1 + \frac{x}{4})^{10}$.

(b) Use your expansion to estimate $1.005^{10}$, giving your answer to 5 decimal places.
:::
:::answer
**(a)**
$$1 + 10\left(\frac x4\right) + 45\left(\frac{x}{4}\right)^2 = 1 + 2.5x + \frac{45x^2}{16}$$
$$= 1 + 2.5x + 2.8125x^2$$

**(b)** Need $1 + \frac x4 = 1.005 \Rightarrow \frac x4 = 0.005 \Rightarrow x = 0.02$.

$$1.005^{10} \approx 1 + 2.5(0.02) + 2.8125(0.0004) = 1 + 0.05 + 0.001125 = 1.051125$$

To 5 d.p.: $\mathbf{1.05113}$.

*(True value $1.0511401\ldots$ — the third term onwards would tighten it further.)*
:::

:::question Q6 (6 marks) — synoptic
$f(x) = (2 + ax)^6$, where $a$ is a constant.

(a) Find, in terms of $a$, the coefficients of $x$ and $x^2$ in the expansion of $f(x)$.

(b) Given that the coefficient of $x^2$ is 12 times the coefficient of $x$, find the value of $a$.
:::
:::answer
**(a)**
Coefficient of $x$: $\binom61 2^5 a = 6 \times 32 \times a = 192a$.

Coefficient of $x^2$: $\binom62 2^4 a^2 = 15 \times 16 \times a^2 = 240a^2$.

**(b)**
$$240a^2 = 12 \times 192a$$
$$240a^2 = 2304a$$
$$240a^2 - 2304a = 0$$
$$48a(5a - 48) = 0$$

So $a = 0$ or $a = \frac{48}{5} = 9.6$.

$a = 0$ must be rejected — it would make both coefficients zero, so there'd be no $x$ or $x^2$ term
to compare. Hence $a = 9.6$.

*(That rejection is a real mark. Whenever you divide by a variable you'd lose a root, so factorise
instead and then reason about which root is valid.)*
:::

:::question Q7 (6 marks) — stretch
Find the term independent of $x$ (i.e. the constant term) in the expansion of
$\left(2x + \dfrac{3}{x}\right)^{8}$.
:::
:::answer
General term:
$$\binom8r (2x)^{8-r}\left(\frac3x\right)^r = \binom8r 2^{8-r} 3^r \, x^{8-r} \, x^{-r}
= \binom8r 2^{8-r}3^r x^{8-2r}$$

The term is independent of $x$ when the power is zero:
$$8 - 2r = 0 \;\Rightarrow\; r = 4$$

$$\binom84 \times 2^4 \times 3^4 = 70 \times 16 \times 81 = 90720$$

**The constant term is $90\,720$.**

*(The technique — write the general term, collect the powers of $x$, then set the exponent to the value
you want — works for any term in any binomial, and it's the only reliable method when the bracket
contains negative powers.)*
:::
