---
title: Algebraic Expressions
code: P1.1
spec: 2.1, 2.2, 2.3
summary: Index laws, expanding, factorising, surds and rationalising denominators — the toolkit everything else is built from.
time: 3 hours
prereq: GCSE algebra
papers: Papers 1 and 2
---

## Why this topic exists

Nothing in this topic is hard on its own. That's exactly why it's dangerous. Index laws and surds show
up *inside* other questions — inside a differentiation question, inside a binomial expansion, inside a
trig proof — and if the algebra is shaky, you lose the marks there, on a topic you thought you knew.

The goal here is not "can you do it" but **"can you do it without thinking about it."** Everything
below should eventually be automatic.

---

## 1. Index laws

An index (or power, or exponent) is repeated multiplication: $a^4 = a \times a \times a \times a$.
From that single fact, every law follows.

:::key The index laws
$$a^m \times a^n = a^{m+n} \qquad \frac{a^m}{a^n} = a^{m-n} \qquad (a^m)^n = a^{mn}$$
$$(ab)^n = a^n b^n \qquad \left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}$$
$$a^0 = 1 \qquad a^{-n} = \frac{1}{a^n} \qquad a^{1/n} = \sqrt[n]{a} \qquad a^{m/n} = \left(\sqrt[n]{a}\right)^m$$
:::

:::insight Why $a^0 = 1$ and why $a^{-n} = 1/a^n$
These aren't arbitrary definitions — they're forced on us if we want $a^m \div a^n = a^{m-n}$ to keep
working.

Take $a^3 \div a^3$. Obviously that's $1$. But the subtraction law says it's $a^{3-3} = a^0$.
So $a^0$ **must** equal $1$.

Take $a^2 \div a^5$. Writing it out, $\dfrac{a\cdot a}{a\cdot a\cdot a\cdot a\cdot a} = \dfrac{1}{a^3}$.
The law says it's $a^{-3}$. So $a^{-3}$ **must** mean $1/a^3$.

Same for fractional powers: $\left(a^{1/2}\right)^2 = a^{(1/2)\times 2} = a^1 = a$. Something which
squares to give $a$ is $\sqrt{a}$. So $a^{1/2} = \sqrt{a}$.

This is a theme for the whole course: definitions get extended so that the rules stay consistent.
:::

### Reading $a^{m/n}$

$a^{m/n} = \left(\sqrt[n]{a}\right)^m$. **Do the root first**, then the power — it keeps the numbers small.

$$8^{2/3} = \left(\sqrt[3]{8}\right)^2 = 2^2 = 4$$

If you do the power first you get $\sqrt[3]{64}$, which is the same answer but a nastier number to
handle. With $27^{4/3}$ the difference is between $3^4 = 81$ and $\sqrt[3]{531441}$. Root first. Always.

:::example Worked example 1 — Simplify $\dfrac{(2x^3)^4 \times x^{-5}}{4x^2}$
**Solution.**

Deal with the bracket first, applying the power to *both* the 2 and the $x^3$:
$$(2x^3)^4 = 2^4 \times x^{12} = 16x^{12}$$

Now the numerator:
$$16x^{12} \times x^{-5} = 16x^{7}$$

And divide:
$$\frac{16x^{7}}{4x^{2}} = 4x^{5}$$
:::

:::warning The bracket trap
$(2x^3)^4$ is **not** $2x^{12}$. The power applies to everything inside the bracket, the coefficient
included: $2^4 x^{12} = 16x^{12}$.

Similarly $(3x)^2 = 9x^2$, not $3x^2$, and $\left(\frac{1}{2}x\right)^3 = \frac{1}{8}x^3$.
:::

### Negative and fractional powers in calculus form

You will differentiate and integrate constantly, and the rules only work on terms written as
$ax^n$. So rewriting is a survival skill:

| Written as | Rewritten as $ax^n$ |
|---|---|
| $\dfrac{3}{x^2}$ | $3x^{-2}$ |
| $\sqrt{x}$ | $x^{1/2}$ |
| $\dfrac{5}{\sqrt{x}}$ | $5x^{-1/2}$ |
| $\dfrac{1}{2x^3}$ | $\tfrac{1}{2}x^{-3}$ |
| $\dfrac{x^2+3x}{x}$ | $x + 3$ (divide term by term first) |
| $\sqrt[3]{x^4}$ | $x^{4/3}$ |

:::warning The most common rewriting error
$\dfrac{1}{2x^3}$ is $\tfrac{1}{2}x^{-3}$, **not** $2x^{-3}$. The $2$ is in the denominator, so it stays
a division. Compare with $\dfrac{1}{(2x)^3} = \dfrac{1}{8x^3} = \tfrac{1}{8}x^{-3}$.
:::

---

## 2. Expanding brackets

### Two brackets

$(a+b)(c+d) = ac + ad + bc + bd$. Every term in the first bracket multiplies every term in the second.

### Three brackets

Expand two of them, then multiply the result by the third. Choose the *easiest* pair to start with.

:::example Worked example 2 — Expand $(x+2)(x-3)(2x+1)$
**Solution.**

First pair:
$$(x+2)(x-3) = x^2 - 3x + 2x - 6 = x^2 - x - 6$$

Now multiply by $(2x+1)$, taking each term of the quadratic in turn:
$$(x^2 - x - 6)(2x+1) = 2x^3 + x^2 - 2x^2 - x - 12x - 6$$
$$= 2x^3 - x^2 - 13x - 6$$

**Check:** substitute $x=1$ into both the original and the answer.
Original: $(3)(-2)(3) = -18$. Answer: $2 - 1 - 13 - 6 = -18$. ✓
:::

:::method Checking an expansion in five seconds
Substitute a simple value ($x = 1$ or $x = 2$) into the original *and* your answer. If they don't match,
you've made a slip. This catches the vast majority of expansion errors and costs almost no time.
:::

---

## 3. Factorising

Factorising is expanding run backwards. There are four patterns worth recognising instantly.

### (a) Common factor

$$6x^3 - 9x^2 = 3x^2(2x - 3)$$

Always look for this *first*. Take out the largest numerical factor and the lowest power of each
variable.

### (b) Quadratics: $x^2 + bx + c$

Find two numbers that **multiply to $c$** and **add to $b$**.

$$x^2 + 7x + 12: \quad 3 \times 4 = 12,\ 3+4=7 \quad \Rightarrow (x+3)(x+4)$$

### (c) Quadratics: $ax^2 + bx + c$ with $a \neq 1$

Find two numbers that **multiply to $ac$** and **add to $b$**, split the middle term, then factorise
in pairs.

:::example Worked example 3 — Factorise $6x^2 + 11x - 10$
**Solution.**

Here $a = 6$, $b = 11$, $c = -10$, so $ac = -60$.

Two numbers multiplying to $-60$ and adding to $11$: **$15$ and $-4$**.

Split the middle term:
$$6x^2 + 15x - 4x - 10$$

Factorise in pairs:
$$3x(2x + 5) - 2(2x + 5)$$

The bracket $(2x+5)$ is common, so:
$$(2x+5)(3x-2)$$

**Check by expanding:** $6x^2 - 4x + 15x - 10 = 6x^2 + 11x - 10$. ✓
:::

### (d) Difference of two squares

$$a^2 - b^2 = (a+b)(a-b)$$

This one is worth spotting on sight, including in disguised forms:

- $9x^2 - 25 = (3x+5)(3x-5)$
- $x^4 - 16 = (x^2+4)(x^2-4) = (x^2+4)(x+2)(x-2)$ — factorise **twice**
- $x - 9 = (\sqrt{x}+3)(\sqrt{x}-3)$ for $x \geq 0$

:::warning $a^2 + b^2$ does not factorise
Over the real numbers, a sum of two squares has no factorisation. $x^2 + 9$ is as far as it goes.
(You'll meet complex numbers in Further Maths where it does — but not here.)
:::

---

## 4. Surds

A **surd** is a root that can't be written exactly as a fraction — $\sqrt{2}$, $\sqrt{3}$, $\sqrt[3]{5}$.
We keep them in surd form because $\sqrt{2}$ is *exactly* $\sqrt 2$, whereas $1.414213562$ is not.

:::key Surd rules
$$\sqrt{ab} = \sqrt{a}\sqrt{b} \qquad \sqrt{\frac{a}{b}} = \frac{\sqrt a}{\sqrt b} \qquad (\sqrt a)^2 = a$$
:::

:::warning The rule that doesn't exist
$$\sqrt{a + b} \neq \sqrt a + \sqrt b$$
Test it: $\sqrt{9 + 16} = \sqrt{25} = 5$, but $\sqrt 9 + \sqrt{16} = 3 + 4 = 7$. Not equal.
Roots distribute over **multiplication and division only**, never over addition or subtraction.
:::

### Simplifying surds

Pull out the largest square factor.

$$\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt 2$$
$$\sqrt{72} = \sqrt{36 \times 2} = 6\sqrt 2$$
$$\sqrt{48} = \sqrt{16 \times 3} = 4\sqrt 3$$

If you pick a smaller square factor you just have to repeat: $\sqrt{72} = \sqrt{4 \times 18} = 2\sqrt{18}
= 2\sqrt{9\times 2} = 6\sqrt 2$. Same answer, more steps. Learn the squares to $15^2$ and you'll spot
the biggest factor immediately.

### Adding surds

You can only add **like** surds, exactly like collecting $x$ terms:
$$3\sqrt 2 + 5\sqrt 2 = 8\sqrt 2$$
$$\sqrt{18} + \sqrt{50} = 3\sqrt 2 + 5\sqrt 2 = 8\sqrt 2 \quad \text{(simplify first!)}$$

---

## 5. Rationalising the denominator

Convention says we don't leave surds on the bottom of a fraction. To remove them, multiply top and
bottom by something that clears the root — which is multiplying by $1$, so the value doesn't change.

### Single surd denominator

Multiply by $\dfrac{\sqrt a}{\sqrt a}$:
$$\frac{6}{\sqrt 3} = \frac{6}{\sqrt3}\times\frac{\sqrt3}{\sqrt3} = \frac{6\sqrt 3}{3} = 2\sqrt 3$$

### Denominator of the form $a \pm b\sqrt c$

Multiply by the **conjugate** — same expression with the sign flipped.

:::insight Why the conjugate works
Because of the difference of two squares. If the denominator is $(3 + \sqrt 5)$, multiplying by
$(3 - \sqrt 5)$ gives
$$(3+\sqrt5)(3-\sqrt5) = 3^2 - (\sqrt5)^2 = 9 - 5 = 4$$
The cross terms $-3\sqrt5$ and $+3\sqrt5$ cancel, and squaring the surd kills the root. That's the
whole trick — and it's exactly the same trick you'll use for complex numbers in Further Maths.
:::

:::example Worked example 4 — Rationalise $\dfrac{4}{3 - \sqrt 5}$
**Solution.**

The conjugate of $3-\sqrt5$ is $3+\sqrt5$:
$$\frac{4}{3-\sqrt5}\times\frac{3+\sqrt5}{3+\sqrt5} = \frac{4(3+\sqrt5)}{(3-\sqrt5)(3+\sqrt5)}$$

Denominator: $9 - 5 = 4$.

$$= \frac{4(3+\sqrt5)}{4} = 3 + \sqrt 5$$
:::

:::example Worked example 5 — Express $\dfrac{\sqrt 3 + 1}{\sqrt 3 - 1}$ in the form $a + b\sqrt3$
**Solution.**

Multiply top and bottom by the conjugate $\sqrt3 + 1$:

$$\frac{(\sqrt3+1)(\sqrt3+1)}{(\sqrt3-1)(\sqrt3+1)}$$

Numerator: $(\sqrt3+1)^2 = 3 + 2\sqrt3 + 1 = 4 + 2\sqrt3$.

Denominator: $3 - 1 = 2$.

$$= \frac{4+2\sqrt3}{2} = 2 + \sqrt 3$$

So $a = 2$, $b = 1$.
:::

:::warning Squaring a surd bracket
$(\sqrt3+1)^2$ is **not** $3 + 1$. It's $(\sqrt3+1)(\sqrt3+1) = 3 + \sqrt3 + \sqrt3 + 1 = 4 + 2\sqrt3$.
The middle term is the one everyone forgets.
:::

---

## In the exam

- Surd questions almost always say **"give your answer in the form $a + b\sqrt c$ where $a$, $b$, $c$
  are integers"**. That phrasing is telling you the shape of the answer — use it as a check.
- "Exact value" or "in surd form" means **do not use a decimal**. A decimal answer to an exact-value
  question scores zero even if it's numerically right.
- Index law questions frequently appear as the first line of a calculus question ("write $\frac{2}{\sqrt x}$
  in the form $ax^n$"). They're giving you the rewriting mark deliberately — take it.

---

## Practice

:::question Q1 (3 marks)
Simplify fully $\dfrac{(3x^2y)^3 \times 2xy^4}{9x^3y^5}$.
:::
:::answer
Bracket first: $(3x^2y)^3 = 27x^6y^3$.

Numerator: $27x^6y^3 \times 2xy^4 = 54x^7y^7$.

Divide: $\dfrac{54x^7y^7}{9x^3y^5} = 6x^4y^2$.
:::

:::question Q2 (2 marks)
Evaluate $\left(\dfrac{16}{81}\right)^{-3/4}$, giving your answer as an exact fraction.
:::
:::answer
The negative power means reciprocal — flip the fraction first:
$$\left(\frac{16}{81}\right)^{-3/4} = \left(\frac{81}{16}\right)^{3/4}$$

Root first: $\left(\frac{81}{16}\right)^{1/4} = \frac{3}{2}$ (since $3^4 = 81$ and $2^4 = 16$).

Then cube: $\left(\frac32\right)^3 = \dfrac{27}{8}$.
:::

:::question Q3 (3 marks)
Factorise completely $2x^3 - 18x$.
:::
:::answer
Common factor $2x$ first — this is the step people skip:
$$2x^3 - 18x = 2x(x^2 - 9)$$

$x^2 - 9$ is a difference of two squares:
$$= 2x(x+3)(x-3)$$

"Completely" means keep going until nothing factorises further.
:::

:::question Q4 (3 marks)
Factorise $15x^2 - 26x + 8$.
:::
:::answer
$ac = 15 \times 8 = 120$, and we need two numbers multiplying to $120$ and adding to $-26$.
Both must be negative: $-6$ and $-20$.

$$15x^2 - 6x - 20x + 8 = 3x(5x-2) - 4(5x-2) = (5x-2)(3x-4)$$
:::

:::question Q5 (4 marks)
Simplify $\sqrt{75} - \sqrt{27} + \sqrt{12}$, giving your answer in the form $k\sqrt3$.
:::
:::answer
$\sqrt{75} = \sqrt{25\times3} = 5\sqrt3$

$\sqrt{27} = \sqrt{9\times3} = 3\sqrt3$

$\sqrt{12} = \sqrt{4\times3} = 2\sqrt3$

$$5\sqrt3 - 3\sqrt3 + 2\sqrt3 = 4\sqrt3 \quad\Rightarrow\quad k = 4$$
:::

:::question Q6 (4 marks)
Express $\dfrac{5}{2\sqrt3 - 1}$ in the form $\dfrac{a\sqrt3 + b}{c}$ where $a$, $b$, $c$ are integers.
:::
:::answer
Multiply by the conjugate $2\sqrt3 + 1$:

$$\frac{5(2\sqrt3+1)}{(2\sqrt3-1)(2\sqrt3+1)}$$

Denominator: $(2\sqrt3)^2 - 1^2 = 4\times 3 - 1 = 11$.

Numerator: $10\sqrt3 + 5$.

$$= \frac{10\sqrt3 + 5}{11}$$

So $a = 10$, $b = 5$, $c = 11$.
:::

:::question Q7 (5 marks) — synoptic
A rectangle has length $(3 + \sqrt5)$ cm and width $(3 - \sqrt5)$ cm.

(a) Find the exact area.

(b) Find the exact perimeter.

(c) Show that the length of the diagonal is $\sqrt{28}$ cm, and simplify this.
:::
:::answer
**(a)** Area $= (3+\sqrt5)(3-\sqrt5) = 9 - 5 = 4$ cm². (Difference of two squares — no surd left.)

**(b)** Perimeter $= 2\left[(3+\sqrt5) + (3-\sqrt5)\right] = 2(6) = 12$ cm.

**(c)** By Pythagoras, diagonal$^2 = (3+\sqrt5)^2 + (3-\sqrt5)^2$.

$(3+\sqrt5)^2 = 9 + 6\sqrt5 + 5 = 14 + 6\sqrt5$

$(3-\sqrt5)^2 = 9 - 6\sqrt5 + 5 = 14 - 6\sqrt5$

Sum $= 28$, so diagonal $= \sqrt{28} = \sqrt{4\times7} = 2\sqrt7$ cm.
:::

:::question Q8 (4 marks) — stretch
Given that $\dfrac{\sqrt{a} + \sqrt{b}}{\sqrt{a} - \sqrt{b}} = 3$, where $a$ and $b$ are positive,
show that $a = 4b$.
:::
:::answer
Multiply both sides by $(\sqrt a - \sqrt b)$:
$$\sqrt a + \sqrt b = 3(\sqrt a - \sqrt b) = 3\sqrt a - 3\sqrt b$$

Collect:
$$4\sqrt b = 2\sqrt a \quad\Rightarrow\quad \sqrt a = 2\sqrt b$$

Square both sides:
$$a = 4b \quad \blacksquare$$

*(Alternative route: rationalise the left-hand side first. It works, but it's three times the
algebra — always check whether you can just cross-multiply.)*
:::
