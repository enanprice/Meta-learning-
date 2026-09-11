---
title: Algebraic Methods and Proof
code: P1.7
spec: 1.1, 2.3, 2.11
summary: Simplifying algebraic fractions, polynomial division, the factor theorem, and the four styles of proof.
time: 4 hours
prereq: P1.1 Algebraic Expressions
papers: Papers 1 and 2
---

## Why this topic exists

Two separate things live in this chapter, and they're both infrastructure.

**Polynomial division and the factor theorem** let you factorise cubics and quartics, which you need
for sketching, for solving, and (in Year 13) for partial fractions and integration.

**Proof** is one of the three overarching themes of the whole specification. Examiners want to see
that you can *argue*, not just calculate — and the marks for proof are among the easiest in the paper
once you know the fixed structures.

---

## 1. Algebraic fractions

Same rules as numerical fractions. The one extra skill: **factorise before you cancel**.

:::warning The cancelling crime
$$\frac{x^2 + 3x}{x} \neq x^2 + 3 \qquad\text{and}\qquad \frac{x + 4}{4} \neq x$$

You can only cancel **factors** (things being multiplied), never individual terms in a sum.

$$\frac{x^2+3x}{x} = \frac{x(x+3)}{x} = x + 3 \;\checkmark$$

Factorise the top and bottom completely, then cancel matching brackets. If nothing factorises, nothing
cancels.
:::

:::example Worked example 1 — Simplify $\dfrac{2x^2 + 7x - 15}{x^2 - 9}$
**Solution.**

Factorise both. Numerator: $ac = -30$, numbers $10$ and $-3$:
$$2x^2 + 10x - 3x - 15 = 2x(x+5) - 3(x+5) = (x+5)(2x-3)$$

Denominator (difference of two squares):
$$x^2 - 9 = (x+3)(x-3)$$

$$\frac{(x+5)(2x-3)}{(x+3)(x-3)}$$

Nothing cancels — no shared bracket. This is the final answer. *(It's a real answer. Not every
algebraic fraction simplifies, and hunting for a cancellation that isn't there wastes time.)*
:::

### Adding and subtracting

Common denominator, exactly as with numbers:
$$\frac{3}{x+1} + \frac{2}{x-2} = \frac{3(x-2) + 2(x+1)}{(x+1)(x-2)} = \frac{5x - 4}{(x+1)(x-2)}$$

### Multiplying and dividing

Multiply: factorise, cancel across, multiply what's left.
Divide: **flip the second fraction and multiply**.

---

## 2. Polynomial division

You need to divide a polynomial by a linear factor $(x \pm a)$. Two methods; use whichever you find
more reliable.

### Method A: long division

Set it out exactly like numerical long division.

:::example Worked example 2 — Divide $2x^3 - 3x^2 - 11x + 6$ by $(x - 3)$
**Solution (long division).**

- $2x^3 \div x = 2x^2$. Multiply: $2x^2(x-3) = 2x^3 - 6x^2$. Subtract: $-3x^2 - (-6x^2) = 3x^2$.
- Bring down $-11x$: we have $3x^2 - 11x$. Now $3x^2 \div x = 3x$. Multiply: $3x(x-3) = 3x^2 - 9x$.
  Subtract: $-11x - (-9x) = -2x$.
- Bring down $+6$: we have $-2x + 6$. Now $-2x \div x = -2$. Multiply: $-2(x-3) = -2x + 6$.
  Subtract: $0$.

$$2x^3 - 3x^2 - 11x + 6 = (x-3)(2x^2 + 3x - 2)$$

And the quadratic factorises further: $2x^2 + 3x - 2 = (2x - 1)(x+2)$.

$$= (x-3)(2x-1)(x+2)$$
:::

### Method B: matching coefficients

Often faster and less error-prone. Write the answer in a general form and compare.

:::example Worked example 3 — Same division, by matching coefficients
**Solution.**

We know $2x^3 - 3x^2 - 11x + 6 = (x-3)(ax^2 + bx + c)$ for some $a$, $b$, $c$.

- **$x^3$ terms:** $a = 2$ (only $x \times ax^2$ gives $x^3$).
- **Constant terms:** $-3c = 6 \Rightarrow c = -2$.
- **$x^2$ terms:** from $x \cdot bx$ and $-3 \cdot ax^2$: $b - 3a = -3 \Rightarrow b - 6 = -3
  \Rightarrow b = 3$.

$$= (x-3)(2x^2 + 3x - 2)$$

Check the $x$ coefficient as a safety net: $x \cdot c + (-3)(bx) = -2x - 9x = -11x$ ✓
:::

:::warning Missing terms
If a polynomial is missing a power — say $x^3 - 8$ — you must include it as a zero when doing long
division: $x^3 + 0x^2 + 0x - 8$. Skipping the placeholders scrambles the columns and the answer will
be wrong.
:::

---

## 3. The factor theorem

:::key The factor theorem
If $f(a) = 0$, then $(x - a)$ is a factor of $f(x)$ — and conversely.

More generally, if $f\left(\frac{b}{a}\right) = 0$ then $(ax - b)$ is a factor.
:::

:::insight Why it's true
Divide $f(x)$ by $(x-a)$. Whatever happens, you get
$$f(x) = (x-a) \times Q(x) + R$$
where the remainder $R$ is a constant (it must be, because the divisor is degree 1).

Now substitute $x = a$: the first term dies, so $f(a) = R$.

So the remainder on dividing by $(x-a)$ *is* $f(a)$ — that's the **remainder theorem**. And the
remainder is zero exactly when $(x-a)$ divides in exactly, which is what "factor" means. The factor
theorem is just the remainder theorem with $R=0$.
:::

:::method Fully factorising a cubic
1. **Hunt for a root** by trial: try $x = \pm 1, \pm 2, \pm 3, \dots$, restricting to factors of the
   constant term (divided by factors of the leading coefficient).
2. When $f(a) = 0$, you have the factor $(x-a)$.
3. **Divide** by that factor to get a quadratic.
4. **Factorise the quadratic** (or use the formula if it doesn't factorise nicely).
:::

:::example Worked example 4 — Fully factorise $f(x) = x^3 + 2x^2 - 5x - 6$
**Solution.**

Constant term is $-6$, so try factors of 6.

$f(1) = 1 + 2 - 5 - 6 = -8$ — no.
$f(-1) = -1 + 2 + 5 - 6 = 0$ ✓ **So $(x+1)$ is a factor.**

Divide (matching coefficients): $x^3+2x^2-5x-6 = (x+1)(ax^2+bx+c)$.
- $x^3$: $a = 1$.
- constant: $c = -6$.
- $x^2$: $b + a = 2 \Rightarrow b = 1$.

$$= (x+1)(x^2 + x - 6) = (x+1)(x+3)(x-2)$$

**Check:** the roots are $-1, -3, 2$; their product should be $-\frac{d}{a} = 6$, and indeed
$(-1)(-3)(2) = 6$ ✓
:::

:::exam Which values to try
Only try factors of the constant term. For $x^3 + 2x^2 - 5x - 6$, that's $\pm1, \pm2, \pm3, \pm6$ —
six candidates, not infinitely many. If the leading coefficient isn't 1, also try fractions like
$\frac{1}{2}$ or $\frac{3}{2}$ (factors of the constant over factors of the leading coefficient).

Examiners usually make $x=1$, $x=-1$ or $x=2$ work. Try those first.
:::

---

## 4. Proof

A proof is an argument that a statement is true for **every** case it claims to cover. Four styles
are examinable in Year 12 (proof by contradiction comes in Year 13).

### (a) Proof by deduction

Start from known facts and known algebra, and derive the result. This is the default.

:::example Worked example 5 — Prove that the sum of any two consecutive odd numbers is divisible by 4
**Solution.**

Let the first odd number be $2n - 1$, where $n$ is an integer. The next odd number is $2n+1$.

$$(2n-1) + (2n+1) = 4n$$

Since $n$ is an integer, $4n$ is a multiple of 4. $\blacksquare$

**Notice the structure:** define the general case algebraically, do the algebra, then *state in words*
why the result proves the claim. That final sentence is worth a mark and students skip it constantly.
:::

:::key Standard algebraic set-ups
| Phrase | Write it as |
|---|---|
| an even number | $2n$ |
| an odd number | $2n+1$ or $2n-1$ |
| two consecutive integers | $n$, $n+1$ |
| two consecutive even numbers | $2n$, $2n+2$ |
| a multiple of 5 | $5n$ |
| a three-digit number with digits $a,b,c$ | $100a + 10b + c$ |

Always say "where $n$ is an integer". Without it, the proof isn't a proof.
:::

### (b) Proof by exhaustion

Check every possible case, when there are finitely many.

:::example Worked example 6 — Prove that every square number is of the form $4k$ or $4k+1$
**Solution.**

Every integer is either even or odd — two cases, which is all of them.

*Case 1: $n = 2m$.* Then $n^2 = 4m^2$, which is of the form $4k$ with $k = m^2$.

*Case 2: $n = 2m+1$.* Then $n^2 = 4m^2 + 4m + 1 = 4(m^2 + m) + 1$, which is of the form $4k+1$
with $k = m^2 + m$.

Since every integer falls into one of these two cases, every square number is of the form $4k$ or
$4k+1$. $\blacksquare$
:::

### (c) Disproof by counter-example

To show a statement is **false**, you only need **one** case where it fails. That's it — one example,
clearly shown to break the claim.

:::example Worked example 7 — Disprove: "if $n^2 > 4$ then $n > 2$"
**Solution.**

Take $n = -3$. Then $n^2 = 9 > 4$, but $n = -3$ is not greater than 2.

So the statement is false. $\blacksquare$

*(Negative numbers are where most counter-examples live. Also try $0$, $1$, and fractions like
$\frac12$ — those four cover the vast majority of counter-example questions.)*
:::

:::warning A counter-example only disproves
One example can **disprove** a universal claim but can never **prove** one. "It works for $n=1,2,3$"
is not a proof — it's a hopeful guess. Examiners award zero for verification-by-examples when a proof
was asked for.
:::

### (d) Proving an identity

An identity ($\equiv$) is true for **all** values. To prove one, start with one side and manipulate it
until you reach the other.

:::warning Never work on both sides at once
Starting from the thing you're trying to prove and doing the same operation to both sides assumes the
result is true — which is what you're supposed to be showing.

**Correct structure:** write "LHS $=$ …" and transform it, line by line, until it equals the RHS. Then
write "$=$ RHS, as required."

Usually you should start with the **messier** side, because simplifying is easier than complicating.
:::

---

## In the exam

- "**Prove**" or "**show that**" means the *working* is the answer. Every line of reasoning gets a mark.
- Write the concluding sentence. "$4n$ is divisible by 4, since $n$ is an integer" is worth a mark on
  its own.
- $\equiv$ (identity, true for all $x$) versus $=$ (equation, true for specific $x$). Use the right one.
- For the factor theorem, always **write down $f(a) = 0$ explicitly** — "so $(x-a)$ is a factor" is the
  mark, not the arithmetic.
- $\blacksquare$ or "QED" or "as required" — some visible end-of-proof marker is good practice.

---

## Practice

:::question Q1 (3 marks)
Simplify $\dfrac{x^2 - x - 12}{x^2 - 16}$.
:::
:::answer
$$\frac{(x-4)(x+3)}{(x-4)(x+4)} = \frac{x+3}{x+4}$$

*(Strictly, $x \neq 4$, since the original is undefined there.)*
:::

:::question Q2 (4 marks)
Express $\dfrac{2}{x-3} - \dfrac{1}{x+2}$ as a single fraction in its simplest form.
:::
:::answer
$$\frac{2(x+2) - 1(x-3)}{(x-3)(x+2)} = \frac{2x + 4 - x + 3}{(x-3)(x+2)} = \frac{x+7}{(x-3)(x+2)}$$

*(Watch the subtraction: $-1 \times (-3) = +3$, not $-3$.)*
:::

:::question Q3 (4 marks)
Given that $(x - 2)$ is a factor of $f(x) = x^3 + ax^2 - 7x + 6$, find the value of $a$.
:::
:::answer
By the factor theorem, $f(2) = 0$:
$$8 + 4a - 14 + 6 = 0$$
$$4a = 0 \;\Rightarrow\; a = 0$$

**Check:** $f(x) = x^3 - 7x + 6$, and $f(2) = 8 - 14 + 6 = 0$ ✓
:::

:::question Q4 (5 marks)
Fully factorise $g(x) = 2x^3 - 5x^2 - 4x + 3$.
:::
:::answer
Try factors of 3 (over factors of 2): $\pm1, \pm3, \pm\frac12, \pm\frac32$.

$g(1) = 2 - 5 - 4 + 3 = -4$ — no.
$g(-1) = -2 - 5 + 4 + 3 = 0$ ✓ **so $(x+1)$ is a factor.**

Match coefficients: $2x^3 - 5x^2 - 4x + 3 = (x+1)(ax^2+bx+c)$
- $x^3$: $a = 2$
- constant: $c = 3$
- $x^2$: $b + a = -5 \Rightarrow b = -7$

$$= (x+1)(2x^2 - 7x + 3)$$

Factorise the quadratic ($ac = 6$; numbers $-6, -1$):
$$2x^2 - 6x - x + 3 = 2x(x-3) - 1(x-3) = (x-3)(2x-1)$$

$$g(x) = (x+1)(x-3)(2x-1)$$

**Check the $x$ coefficient:** $(x+1)(2x^2-7x+3)$ gives $3x - 7x = -4x$ ✓
:::

:::question Q5 (4 marks)
Prove that the sum of the squares of any two consecutive integers is always odd.
:::
:::answer
Let the integers be $n$ and $n+1$, where $n$ is an integer.

$$n^2 + (n+1)^2 = n^2 + n^2 + 2n + 1 = 2n^2 + 2n + 1 = 2(n^2 + n) + 1$$

Since $n$ is an integer, $n^2 + n$ is an integer, so $2(n^2+n)$ is even and $2(n^2+n) + 1$ is odd.

Therefore the sum of the squares of any two consecutive integers is always odd. $\blacksquare$
:::

:::question Q6 (2 marks)
Disprove the statement: "For all real numbers $x$, $x^3 > x$."
:::
:::answer
Take $x = \frac12$. Then $x^3 = \frac18$, and $\frac18 < \frac12$.

So the statement is false. $\blacksquare$

*(Also works: $x = -2$, where $x^3 = -8 < -2$. Or $x = 0$ or $x = 1$, where $x^3 = x$ exactly, so
the strict inequality fails.)*
:::

:::question Q7 (5 marks)
Prove that $(3n+1)^2 - (3n-1)^2$ is a multiple of 12 for all integers $n$.
:::
:::answer
*Route 1 — expand:*
$$(3n+1)^2 - (3n-1)^2 = (9n^2 + 6n + 1) - (9n^2 - 6n + 1) = 12n$$

*Route 2 — difference of two squares (faster):*
$$= \big[(3n+1)+(3n-1)\big]\big[(3n+1)-(3n-1)\big] = (6n)(2) = 12n$$

Since $n$ is an integer, $12n$ is a multiple of 12. $\blacksquare$
:::

:::question Q8 (6 marks) — synoptic
$f(x) = x^3 - 6x^2 + 11x - 6$.

(a) Show that $(x-1)$ is a factor of $f(x)$.

(b) Hence fully factorise $f(x)$.

(c) Sketch $y = f(x)$, showing all intercepts with the axes.

(d) Hence solve $f(x) < 0$.
:::
:::answer
**(a)** $f(1) = 1 - 6 + 11 - 6 = 0$, so by the factor theorem $(x-1)$ is a factor. $\blacksquare$

**(b)** Matching coefficients: $f(x) = (x-1)(x^2 + bx + c)$ with leading coefficient 1.
- constant: $-c = -6 \Rightarrow c = 6$
- $x^2$: $b - 1 = -6 \Rightarrow b = -5$

$$f(x) = (x-1)(x^2 - 5x + 6) = (x-1)(x-2)(x-3)$$

**(c)** Roots at $x = 1, 2, 3$, all single so all crossings. $y$-intercept at $(0, -6)$. Positive
$x^3$ coefficient ⟹ bottom-left to top-right. The curve rises through $(1,0)$, has a local max, falls
through $(2,0)$, has a local min, rises through $(3,0)$.

**(d)** $f(x) < 0$ means the curve is **below** the $x$-axis. Reading from the sketch, that happens
to the left of $x=1$, and again between $x=2$ and $x=3$:

$$x < 1 \quad\text{or}\quad 2 < x < 3$$

*(Sanity check: $f(0) = -6 < 0$ ✓ and $f(2.5) = (1.5)(0.5)(-0.5) = -0.375 < 0$ ✓, while
$f(1.5) = (0.5)(-0.5)(-1.5) = +0.375 > 0$ ✓)*
:::
