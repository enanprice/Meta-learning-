---
title: Proof by Contradiction and Partial Fractions
code: P2.1
spec: 1.1, 2.11, 2.12
summary: Proof by contradiction, the irrationality of √2, and splitting algebraic fractions into simpler pieces.
time: 4 hours
prereq: P1.7 Algebraic Methods and Proof
papers: Papers 1 and 2
---

## Why this topic exists

Two unrelated things again.

**Proof by contradiction** is the fourth proof technique, and it's the one that unlocks results you
can't get any other way — that $\sqrt2$ is irrational, that there are infinitely many primes. It shows
up as a 4–6 mark question and the structure is completely formulaic once you've seen it.

**Partial fractions** looks like pointless algebra until you meet integration in Year 13, where
$\int \frac{5x+1}{(x+1)(x-2)}dx$ is impossible as written but trivial once split. It's also needed for
binomial expansions of rational functions.

---

## 1. Proof by contradiction

:::key The structure
1. **Assume the opposite** of what you want to prove.
2. Reason logically from that assumption.
3. Reach something **impossible** — a contradiction.
4. Conclude that the assumption must have been false, so the original statement is true.
:::

:::insight Why this is valid
A statement is either true or false; there's no third option. If assuming it's false leads to an
impossibility, then it can't be false. So it's true.

That's the entire logic. The craft is in step 2 — choosing what to do with the assumption so that a
contradiction actually appears.
:::

### Rational and irrational numbers

You need the definition:

:::key
A **rational** number can be written as $\dfrac{a}{b}$ where $a$ and $b$ are integers, $b\neq0$, and
the fraction is in its **lowest terms** (no common factors).

An **irrational** number cannot.
:::

The "lowest terms" clause is what makes the classic proof work — it's the thing you contradict.

:::example Worked example 1 — Prove that $\sqrt 2$ is irrational
**Solution.**

**Assume the opposite:** suppose $\sqrt2$ **is** rational. Then we can write
$$\sqrt2 = \frac{a}{b}$$
where $a, b$ are integers with no common factors (lowest terms).

Square both sides:
$$2 = \frac{a^2}{b^2} \;\Rightarrow\; a^2 = 2b^2$$

So $a^2$ is even. But if $a^2$ is even then $a$ must be even (an odd number squared is odd). So write
$a = 2k$ for some integer $k$:
$$(2k)^2 = 2b^2 \;\Rightarrow\; 4k^2 = 2b^2 \;\Rightarrow\; b^2 = 2k^2$$

So $b^2$ is even, and therefore $b$ is even.

But now **both $a$ and $b$ are even**, so they share a common factor of 2 — contradicting our
assumption that $\frac ab$ was in lowest terms.

The assumption must be false. Therefore $\sqrt2$ is irrational. $\blacksquare$
:::

:::example Worked example 2 — Prove that there is no greatest even integer
**Solution.**

**Assume the opposite:** suppose there is a greatest even integer, and call it $n$.

Consider $n + 2$. Since $n$ is even, $n+2$ is also even. And $n + 2 > n$.

So we have found an even integer greater than the greatest even integer — a contradiction.

Therefore there is no greatest even integer. $\blacksquare$
:::

:::example Worked example 3 — Prove that if $n^2$ is odd, then $n$ is odd
**Solution.**

**Assume the opposite:** suppose $n^2$ is odd but $n$ is **even**.

Then $n = 2k$ for some integer $k$, so
$$n^2 = 4k^2 = 2(2k^2)$$

Since $2k^2$ is an integer, $n^2$ is even — contradicting the given fact that $n^2$ is odd.

Therefore $n$ must be odd. $\blacksquare$
:::

:::exam Marks in a contradiction proof
The mark scheme typically gives marks for:
1. Stating the assumption clearly ("Assume, for contradiction, that…")
2. The correct algebraic development
3. Identifying the contradiction explicitly ("but this contradicts…")
4. The concluding statement

**Write all four.** Students who do the algebra but never say "this is a contradiction, so the
assumption is false" routinely lose two marks out of five.
:::

:::warning The classic wrong start
To prove "$\sqrt2$ is irrational" you assume it **is rational**. To prove "there are infinitely many
primes" you assume there are **finitely many**. Negate the statement properly — the opposite of "all"
is "at least one isn't", not "none".
:::

---

## 2. Partial fractions

Adding $\frac{1}{x-1} + \frac{2}{x+3}$ gives $\frac{3x+1}{(x-1)(x+3)}$. Partial fractions runs that
backwards: given the single fraction, recover the simple pieces.

:::key The three standard forms
**Distinct linear factors:**
$$\frac{px + q}{(ax+b)(cx+d)} \equiv \frac{A}{ax+b} + \frac{B}{cx+d}$$

**Three distinct linear factors:**
$$\frac{f(x)}{(ax+b)(cx+d)(ex+f)} \equiv \frac{A}{ax+b} + \frac{B}{cx+d} + \frac{C}{ex+f}$$

**Repeated linear factor:**
$$\frac{f(x)}{(ax+b)(cx+d)^2} \equiv \frac{A}{ax+b} + \frac{B}{cx+d} + \frac{C}{(cx+d)^2}$$
:::

:::warning The repeated factor needs both powers
For $(x-2)^2$ you need **two** terms: $\frac{B}{x-2}$ **and** $\frac{C}{(x-2)^2}$. Writing only the
squared one gives you an unsolvable system, and it's the standard trap in this topic.
:::

### The method

:::method Finding the constants
1. Write the identity with unknown constants $A$, $B$, $C$.
2. Multiply both sides by the whole denominator to clear all fractions.
3. **Substitute clever values** of $x$ — the roots of each factor — to knock out all but one unknown
   at a time.
4. If any unknowns remain (typical with repeated factors), **compare coefficients** of a convenient
   power, or substitute any other value.
:::

:::example Worked example 4 — Express $\dfrac{5x - 1}{(x+1)(x-2)}$ in partial fractions
**Solution.**
$$\frac{5x-1}{(x+1)(x-2)} \equiv \frac{A}{x+1} + \frac{B}{x-2}$$

Multiply through by $(x+1)(x-2)$:
$$5x - 1 \equiv A(x-2) + B(x+1)$$

*Let $x = 2$* (kills $A$):
$$10 - 1 = B(3) \;\Rightarrow\; B = 3$$

*Let $x = -1$* (kills $B$):
$$-5 - 1 = A(-3) \;\Rightarrow\; A = 2$$

$$\frac{5x-1}{(x+1)(x-2)} \equiv \frac{2}{x+1} + \frac{3}{x-2}$$

**Check with $x = 0$:** LHS $= \frac{-1}{(1)(-2)} = \frac12$. RHS $= \frac{2}{1} + \frac{3}{-2} =
2 - 1.5 = 0.5$ ✓
:::

:::example Worked example 5 — Express $\dfrac{2x^2 + 3}{(x-1)(x+2)^2}$ in partial fractions
**Solution.**

Repeated factor, so three terms:
$$\frac{2x^2+3}{(x-1)(x+2)^2} \equiv \frac{A}{x-1} + \frac{B}{x+2} + \frac{C}{(x+2)^2}$$

Multiply by $(x-1)(x+2)^2$:
$$2x^2 + 3 \equiv A(x+2)^2 + B(x-1)(x+2) + C(x-1)$$

*Let $x = 1$:*
$$2 + 3 = A(9) \;\Rightarrow\; A = \tfrac59$$

*Let $x = -2$:*
$$8 + 3 = C(-3) \;\Rightarrow\; C = -\tfrac{11}{3}$$

*For $B$, compare $x^2$ coefficients:* on the left, $2$; on the right, $A + B$ (from $Ax^2$ and $Bx^2$).
$$A + B = 2 \;\Rightarrow\; B = 2 - \tfrac59 = \tfrac{13}{9}$$

$$\frac{2x^2+3}{(x-1)(x+2)^2} \equiv \frac{5}{9(x-1)} + \frac{13}{9(x+2)} - \frac{11}{3(x+2)^2}$$

**Check with $x = 0$:** LHS $= \frac{3}{(-1)(4)} = -0.75$.
RHS $= \frac{5}{-9} + \frac{13}{18} - \frac{11}{12} = -0.5556 + 0.7222 - 0.9167 = -0.75$ ✓
:::

### Improper fractions

If the numerator's degree is **greater than or equal to** the denominator's, you must divide first.

:::example Worked example 6 — Express $\dfrac{x^2 + 4x - 1}{(x+1)(x-1)}$ in partial fractions
**Solution.**

Degree 2 on top, degree 2 on the bottom — **improper**. Divide first.

$(x+1)(x-1) = x^2 - 1$, so:
$$\frac{x^2+4x-1}{x^2-1} = \frac{(x^2 - 1) + 4x}{x^2-1} = 1 + \frac{4x}{x^2-1}$$

Now split the proper fraction:
$$\frac{4x}{(x+1)(x-1)} \equiv \frac{A}{x+1} + \frac{B}{x-1}$$
$$4x \equiv A(x-1) + B(x+1)$$

*$x=1$:* $4 = 2B \Rightarrow B = 2$.
*$x=-1$:* $-4 = -2A \Rightarrow A = 2$.

$$\frac{x^2+4x-1}{(x+1)(x-1)} \equiv 1 + \frac{2}{x+1} + \frac{2}{x-1}$$
:::

:::warning Check for improper before you start
Compare degrees. If top $\geq$ bottom, divide first — otherwise the identity has no solution and you'll
waste five minutes discovering that. (You may notice the constants come out inconsistent; that's the
symptom.)
:::

---

## In the exam

- "Express in partial fractions" almost always leads to an integration or a binomial expansion in the
  next part. The split is the setup, not the point.
- **Substitution beats comparing coefficients** where it works — one substitution gives one constant
  cleanly. Use coefficient comparison only for the leftover.
- Always **check** with one easy value of $x$ (usually $0$). It costs ten seconds and catches sign
  errors reliably.
- For proof by contradiction, write the words: *assume*, *contradiction*, *therefore*.

---

## Practice

:::question Q1 (4 marks)
Express $\dfrac{3x + 7}{(x+3)(x+1)}$ in partial fractions.
:::
:::answer
$$\frac{3x+7}{(x+3)(x+1)} \equiv \frac{A}{x+3} + \frac{B}{x+1}$$
$$3x + 7 \equiv A(x+1) + B(x+3)$$

*$x = -1$:* $4 = 2B \Rightarrow B = 2$
*$x = -3$:* $-2 = -2A \Rightarrow A = 1$

$$\equiv \frac{1}{x+3} + \frac{2}{x+1}$$

**Check ($x=0$):** LHS $= \frac73 = 2.333$; RHS $= \frac13 + 2 = 2.333$ ✓
:::

:::question Q2 (5 marks)
Express $\dfrac{9x^2 - 3x + 2}{x(3x-1)(x+2)}$ in partial fractions.
:::
:::answer
$$\equiv \frac{A}{x} + \frac{B}{3x-1} + \frac{C}{x+2}$$
$$9x^2 - 3x + 2 \equiv A(3x-1)(x+2) + Bx(x+2) + Cx(3x-1)$$

*$x = 0$:* $2 = A(-1)(2) = -2A \Rightarrow A = -1$

*$x = -2$:* $36 + 6 + 2 = 44 = C(-2)(-7) = 14C \Rightarrow C = \frac{22}{7}$

*$x = \frac13$:* $1 - 1 + 2 = 2 = B\cdot\frac13\cdot\frac73 = \frac{7B}{9} \Rightarrow B = \frac{18}{7}$

$$\equiv -\frac{1}{x} + \frac{18}{7(3x-1)} + \frac{22}{7(x+2)}$$

**Check ($x=1$):** LHS $= \frac{8}{1\cdot2\cdot3} = \frac43 = 1.333$;
RHS $= -1 + \frac{18}{14} + \frac{22}{21} = -1 + 1.2857 + 1.0476 = 1.333$ ✓
:::

:::question Q3 (6 marks)
Express $\dfrac{4x + 5}{(2x-1)(x+3)^2}$ in partial fractions.
:::
:::answer
$$\equiv \frac{A}{2x-1} + \frac{B}{x+3} + \frac{C}{(x+3)^2}$$
$$4x + 5 \equiv A(x+3)^2 + B(2x-1)(x+3) + C(2x-1)$$

*$x = -3$:* $-12 + 5 = -7 = C(-7) \Rightarrow C = 1$

*$x = \frac12$:* $2 + 5 = 7 = A\left(\frac72\right)^2 = \frac{49A}{4} \Rightarrow A = \frac{4}{7}$

*Compare $x^2$:* $0 = A + 2B \Rightarrow B = -\frac{A}{2} = -\frac{2}{7}$

$$\equiv \frac{4}{7(2x-1)} - \frac{2}{7(x+3)} + \frac{1}{(x+3)^2}$$

**Check ($x=0$):** LHS $= \frac{5}{(-1)(9)} = -0.5556$;
RHS $= -\frac47 - \frac{2}{21} + \frac19 = -0.5714 - 0.0952 + 0.1111 = -0.5556$ ✓
:::

:::question Q4 (5 marks)
Prove by contradiction that $\sqrt 3$ is irrational.
:::
:::answer
Assume, for contradiction, that $\sqrt3$ is rational. Then $\sqrt3 = \frac ab$ where $a$, $b$ are
integers with no common factors.

Squaring: $3 = \frac{a^2}{b^2}$, so $a^2 = 3b^2$.

Hence $a^2$ is a multiple of 3, and therefore $a$ is a multiple of 3 (if $a$ were not, $a^2$ wouldn't
be — a number's prime factors are inherited by its square).

Write $a = 3k$:
$$9k^2 = 3b^2 \;\Rightarrow\; b^2 = 3k^2$$

So $b^2$ is a multiple of 3, and therefore so is $b$.

But then $a$ and $b$ share a factor of 3, contradicting the assumption that $\frac ab$ was in lowest
terms.

Therefore $\sqrt3$ is irrational. $\blacksquare$
:::

:::question Q5 (4 marks)
Prove by contradiction that there is no smallest positive rational number.
:::
:::answer
Assume, for contradiction, that there **is** a smallest positive rational number; call it $q$.

Consider $\frac q2$. Since $q$ is rational, $q = \frac ab$ for integers $a, b$, and so
$\frac q2 = \frac{a}{2b}$ is also rational.

Since $q > 0$, we have $\frac q2 > 0$, and $\frac q2 < q$.

So $\frac q2$ is a positive rational number smaller than the smallest positive rational number — a
contradiction.

Therefore there is no smallest positive rational number. $\blacksquare$
:::

:::question Q6 (6 marks) — synoptic
(a) Express $\dfrac{x^2 + 5x + 8}{(x+2)(x+1)}$ in partial fractions.

(b) Hence show that $\dfrac{x^2+5x+8}{(x+2)(x+1)} > 1$ for all $x > -1$.
:::
:::answer
**(a)** Degrees are equal — **improper**, so divide first.

$(x+2)(x+1) = x^2 + 3x + 2$, so
$$\frac{x^2+5x+8}{x^2+3x+2} = \frac{(x^2+3x+2) + (2x + 6)}{x^2+3x+2} = 1 + \frac{2x+6}{(x+2)(x+1)}$$

Now split:
$$\frac{2x+6}{(x+2)(x+1)} \equiv \frac{A}{x+2} + \frac{B}{x+1}$$
$$2x + 6 \equiv A(x+1) + B(x+2)$$

*$x=-1$:* $4 = B$
*$x=-2$:* $2 = -A \Rightarrow A = -2$

$$\equiv 1 - \frac{2}{x+2} + \frac{4}{x+1}$$

**Check ($x=0$):** LHS $= \frac{8}{2} = 4$; RHS $= 1 - 1 + 4 = 4$ ✓

**(b)** For $x > -1$, both $x+1 > 0$ and $x + 2 > 1 > 0$.

From part (a), the expression exceeds 1 precisely when
$$\frac{4}{x+1} - \frac{2}{x+2} > 0$$

Combining over the (positive) common denominator $(x+1)(x+2)$:
$$\frac{4(x+2) - 2(x+1)}{(x+1)(x+2)} = \frac{2x + 6}{(x+1)(x+2)}$$

For $x > -1$: the numerator $2x + 6 > 4 > 0$, and the denominator is positive. So the whole fraction is
positive.

Hence the expression is $1 + (\text{something positive}) > 1$ for all $x > -1$. $\blacksquare$
:::
