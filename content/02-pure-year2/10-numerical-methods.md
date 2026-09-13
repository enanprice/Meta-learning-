---
title: Numerical Methods
code: P2.10
spec: 9.1–9.4
summary: Locating roots by sign change, fixed-point iteration, staircase and cobweb diagrams, and the Newton–Raphson method.
time: 4 hours
prereq: P2.9 Advanced Differentiation
papers: Papers 1 and 2
---

## Why this topic exists

Most equations can't be solved exactly. $x^3 - 4x + 1 = 0$ has three real roots and none of them is a
nice number. $e^x = 3x$ has no algebraic solution at all.

Numerical methods produce **approximations to any accuracy you like**, by systematic repetition. This
is how computers actually solve equations, and understanding *why* the methods sometimes fail is as
examinable as using them.

---

## 1. Locating roots: the sign-change rule

:::key The sign change rule
If $f(x)$ is **continuous** on $[a,b]$ and $f(a)$ and $f(b)$ have **opposite signs**, then there is at
least one root of $f(x) = 0$ in the interval $(a,b)$.
:::

:::example Worked example 1 — Show that $f(x) = x^3 - 4x + 1$ has a root between $x=1$ and $x=2$
**Solution.**
$$f(1) = 1 - 4 + 1 = -2$$
$$f(2) = 8 - 8 + 1 = 1$$

There is a **change of sign**, and $f$ is a polynomial so it is **continuous** on $[1,2]$. Therefore
there is a root in the interval $(1, 2)$. $\blacksquare$
:::

:::exam The three things a sign-change answer must contain
1. **Both function values**, explicitly calculated.
2. The words "**change of sign**".
3. The words "**$f$ is continuous**" (on the interval).

All three are marked. Students routinely write the two values and stop, and lose a mark.
:::

:::warning When sign change fails
The rule can mislead in three ways:

- **Two roots in the interval.** $f(a)$ and $f(b)$ can have the *same* sign with two roots between them
  — no sign change, but roots exist.
- **A discontinuity.** $f(x) = \frac{1}{x-2}$ changes sign between $x=1$ and $x=3$, but has no root —
  it has an **asymptote**. This is why "continuous" must be stated.
- **A repeated root.** $f(x) = (x-2)^2$ touches zero without crossing, so there's no sign change even
  though there is a root.
:::

---

## 2. Fixed-point iteration

Rearrange $f(x) = 0$ into the form $x = g(x)$, then iterate:
$$x_{n+1} = g(x_n)$$

starting from some $x_0$. If the sequence converges, its limit is a root.

:::example Worked example 2 — Use the iteration $x_{n+1} = \sqrt[3]{4x_n - 1}$ with $x_0 = 2$ to find a root of $x^3 - 4x + 1 = 0$ to 3 decimal places.
**Solution.**

First check the rearrangement is valid: if $x = \sqrt[3]{4x-1}$ then $x^3 = 4x - 1$, i.e.
$x^3 - 4x + 1 = 0$ ✓

Now iterate:

| $n$ | $x_n$ |
|---|---|
| 0 | 2 |
| 1 | 1.912931 |
| 2 | 1.880665 |
| 3 | 1.868422 |
| 4 | 1.863734 |
| 5 | 1.861933 |
| 6 | 1.861240 |

The values are settling around $1.861$.

**To justify 3 d.p. accuracy, use a sign change on the bounds of rounding.** Let $\alpha = 1.861$ to
3 d.p., so the root lies in $[1.8605, 1.8615]$:
$$f(1.8605) = -0.00195 \qquad f(1.8615) = 0.00444$$

Sign change, and $f$ is continuous, so $1.8605 < \alpha < 1.8615$, confirming $\alpha = 1.861$ to
3 d.p. $\blacksquare$
:::

:::method Justifying accuracy — the step everyone forgets
"Show that the root is $1.861$ to 3 decimal places" is **not** answered by iterating until the digits
stop changing. You must:

1. Identify the interval that rounds to the stated value ($[1.8605, 1.8615]$ for 3 d.p.).
2. Evaluate $f$ at **both endpoints**.
3. State the sign change and continuity, and conclude.

This is worth 2–3 marks and it is a different skill from the iteration itself.
:::

### Staircase and cobweb diagrams

To see the iteration graphically, draw $y = g(x)$ and $y = x$ on the same axes. The root is where they
cross. Starting at $x_0$:

- Go **vertically** to the curve $y = g(x)$ — this computes $g(x_0)$.
- Go **horizontally** to the line $y = x$ — this makes that output the new input.
- Repeat.

:::key The two patterns
- **Staircase:** the path moves steadily in one direction towards the root. Happens when $g'(x)$ is
  positive near the root.
- **Cobweb:** the path spirals in around the root, alternating sides. Happens when $g'(x)$ is negative.

:::figure iteration-cobweb
A cobweb pattern, which happens when $g'$ is negative: each step overshoots, so the values alternate
above and below the root while converging.
:::

**Convergence** requires $|g'(x)| < 1$ near the root. If $|g'| > 1$ the iteration **diverges**, spiralling
or staircasing away.
:::

:::insight Why $|g'| < 1$ is the condition
Each step multiplies your distance from the root by roughly $g'$. If $|g'| < 1$, the error shrinks each
time and you converge. If $|g'| > 1$, the error grows and you're thrown off.

This explains something students find baffling: *the same equation can have one rearrangement that
works and another that fails.* For $x^3 - 4x + 1 = 0$:
- $x = \sqrt[3]{4x-1}$ converges to 1.861.
- $x = \frac{x^3+1}{4}$ converges to a **different** root, 0.254.
- Other rearrangements diverge entirely.

The rearrangement decides which root (if any) you find.
:::

:::figure iteration-staircase
A staircase pattern, which happens when $g'$ is positive near the root: each step moves in the same
direction, closing in steadily.
:::

---

## 3. The Newton–Raphson method

Much faster than fixed-point iteration.

:::key Newton–Raphson
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

In the formula booklet.
:::

:::insight Where the formula comes from
Take your current guess $x_n$ and draw the **tangent** to the curve there. Follow the tangent down to
where it crosses the $x$-axis, and use that as the next guess.

The tangent at $(x_n, f(x_n))$ has gradient $f'(x_n)$, so its equation is
$$y - f(x_n) = f'(x_n)(x - x_n)$$

Setting $y = 0$ and solving for $x$:
$$x = x_n - \frac{f(x_n)}{f'(x_n)}$$

That's the formula. It works because near a root, a smooth curve looks almost exactly like its
tangent — which is why the convergence is so fast (roughly **doubling** the number of correct digits
each step).
:::

:::figure newton-raphson
Each tangent is followed down to the $x$-axis, and where it lands becomes the next guess. If the
tangent is horizontal it never lands, which is exactly the case where the method fails.
:::

:::example Worked example 3 — Use Newton–Raphson with $x_0 = 2$ to find a root of $f(x) = x^3 - 4x + 1$ to 5 decimal places.
**Solution.**
$$f'(x) = 3x^2 - 4$$
$$x_{n+1} = x_n - \frac{x_n^3 - 4x_n + 1}{3x_n^2 - 4}$$

- $x_0 = 2$: $f(2) = 1$, $f'(2) = 8$, so $x_1 = 2 - \frac18 = 1.875$
- $x_1 = 1.875$: $f = 0.091797$, $f' = 6.546875$, so $x_2 = 1.860979$
- $x_2 = 1.860979$: $f = 0.001103$, so $x_3 = 1.860806$
- $x_3$: $f \approx 0$, so $x_4 = 1.860806$

$$\alpha = 1.86081 \text{ (5 d.p.)}$$

Compare with the fixed-point iteration in Worked example 2, which took six steps to reach 3 d.p.
Newton–Raphson reached 6 d.p. in three. That difference is why it's the method computers use.
:::

:::warning When Newton–Raphson fails
Three failure modes, all examinable:

1. **$f'(x_n) = 0$** — the tangent is horizontal and never meets the $x$-axis. The formula divides by
   zero and the method breaks down immediately.
2. **A starting value near a stationary point** — $f'(x_n)$ is tiny, so the correction term is enormous
   and $x_1$ is flung far away, possibly converging to a different root or diverging.
3. **A discontinuity or asymptote** between the start and the root — the tangent logic assumes a smooth
   curve.

If asked "explain why the method fails for $x_0 = k$", the answer is almost always "because
$f'(k) = 0$, so the tangent at that point is parallel to the $x$-axis and never meets it" — with the
calculation of $f'(k)$ shown.
:::

---

## In the exam

- Always show the **function values** in sign-change arguments, and say "change of sign" and
  "continuous".
- Iteration questions want the values listed to the accuracy asked for. Use the `ANS` key: type the
  formula with `ANS` in place of $x_n$ and press `=` repeatedly.
- **Justify accuracy with a sign change on the rounding bounds.** Separate marks.
- Newton–Raphson: state the formula with your $f$ and $f'$ written out before substituting.
- Sketch questions about staircase/cobweb: label $y = x$, $y = g(x)$, the root, $x_0$, $x_1$, $x_2$,
  and show the vertical-then-horizontal path.
- Radian mode if any trig is involved.

---

## Practice

:::question Q1 (3 marks)
Show that the equation $x^3 + 2x - 7 = 0$ has a root between $x = 1$ and $x = 2$.
:::
:::answer
Let $f(x) = x^3 + 2x - 7$.

$$f(1) = 1 + 2 - 7 = -4$$
$$f(2) = 8 + 4 - 7 = 5$$

There is a change of sign, and $f$ is a polynomial and therefore continuous on $[1,2]$. Hence there is
a root of $f(x)=0$ in the interval $(1,2)$. $\blacksquare$
:::

:::question Q2 (4 marks)
The equation $x^3 - 4x + 1 = 0$ has a root $\beta$ near $0.25$. Use the iteration
$x_{n+1} = \dfrac{x_n^3 + 1}{4}$ with $x_0 = 0.5$ to find $\beta$ to 4 decimal places.
:::
:::answer
| $n$ | $x_n$ |
|---|---|
| 0 | 0.5 |
| 1 | 0.281250 |
| 2 | 0.255562 |
| 3 | 0.254173 |
| 4 | 0.254105 |
| 5 | 0.254102 |

$$\beta = 0.2541 \text{ (4 d.p.)}$$

*(Notice this rearrangement of the **same** cubic converges to a completely different root from the one
in Worked example 2. The rearrangement chooses the root.)*
:::

:::question Q3 (4 marks)
$f(x) = x^3 - 4x + 1$. Given that a root $\alpha$ is approximately $1.861$, show that $\alpha = 1.861$
correct to 3 decimal places.
:::
:::answer
If $\alpha = 1.861$ to 3 d.p., then $1.8605 \leq \alpha < 1.8615$.

$$f(1.8605) = 6.44025 - 7.44200 + 1 = -0.00195$$
$$f(1.8615) = 6.45064 - 7.44600 + 1 = 0.00444$$

There is a change of sign in the interval $[1.8605, 1.8615]$, and $f$ is continuous. Therefore the root
lies in that interval, so $\alpha = 1.861$ to 3 d.p. $\blacksquare$
:::

:::question Q4 (5 marks)
$f(x) = 2x^3 - 5x - 4$.

(a) Show there is a root between 1 and 2.

(b) Use Newton–Raphson with $x_0 = 2$ to find the root correct to 4 decimal places.
:::
:::answer
**(a)** $f(1) = 2 - 5 - 4 = -7$; $f(2) = 16 - 10 - 4 = 2$. Change of sign, $f$ continuous ⟹ root in
$(1,2)$. $\blacksquare$

**(b)** $f'(x) = 6x^2 - 5$.

$$x_{n+1} = x_n - \frac{2x_n^3 - 5x_n - 4}{6x_n^2 - 5}$$

- $x_0 = 2$: $f = 2$, $f' = 19$, so $x_1 = 2 - \frac{2}{19} = 1.894737$
- $x_1 = 1.894737$: $f = 0.130631$, $f' = 16.5429$, so $x_2 = 1.886839$
- $x_2 = 1.886839$: $f = 0.000708$, so $x_3 = 1.886796$
- $x_3$: stable to 6 d.p.

$$\alpha = 1.8868 \text{ (4 d.p.)}$$
:::

:::question Q5 (5 marks)
$f(x) = x^3 - 3x + 1$. Explain why the Newton–Raphson method fails if $x_0 = 1$.
:::
:::answer
$$f'(x) = 3x^2 - 3 \;\Rightarrow\; f'(1) = 3 - 3 = 0$$

The Newton–Raphson formula requires division by $f'(x_0)$, which is zero here — the formula is
undefined.

Geometrically: the tangent to the curve at $x = 1$ is **horizontal** (parallel to the $x$-axis), so it
never crosses the $x$-axis and there is no next approximation to move to. $\blacksquare$
:::

:::question Q6 (6 marks)
The equation $e^{x} = 4 - x$ has a single root $\alpha$.

(a) Show that $\alpha$ lies between 1 and 1.5.

(b) Show that the equation can be rearranged as $x = \ln(4-x)$.

(c) Use the iteration $x_{n+1} = \ln(4 - x_n)$ with $x_0 = 1$ to find $\alpha$ to 3 decimal places.
:::
:::answer
**(a)** Let $f(x) = e^x + x - 4$ (rearranging so one side is zero).

$$f(1) = 2.71828 + 1 - 4 = -0.28172$$
$$f(1.5) = 4.48169 + 1.5 - 4 = 1.98169$$

Change of sign, $f$ continuous ⟹ root in $(1, 1.5)$. $\blacksquare$

**(b)** From $e^x = 4 - x$, take natural logs of both sides:
$$x = \ln(4-x) \quad\blacksquare$$

*(Valid because $4 - x > 0$ near the root.)*

**(c)**

| $n$ | $x_n$ |
|---|---|
| 0 | 1 |
| 1 | 1.098612 |
| 2 | 1.065189 |
| 3 | 1.076643 |
| 4 | 1.072733 |
| 5 | 1.074069 |
| 6 | 1.073613 |
| 7 | 1.073769 |
| 8 | 1.073715 |

The values **oscillate** around the root, closing in from alternate sides — a cobweb pattern, which is
what you expect because $g'(x) = \dfrac{-1}{4-x}$ is negative near the root.

$$\alpha = 1.074 \text{ (3 d.p.)}$$

*(Justify properly: with $f(x) = e^x + x - 4$, we have $f(1.0725) = -0.00482$ and
$f(1.0735) = -0.00090$ — **both negative**, so this pair does not confirm anything. The root is
$1.07373$, which lies in $[1.0735, 1.0745]$: $f(1.0735) = -0.00090$ and $f(1.0745) = +0.00303$, a
genuine sign change. Since $1.07373$ rounds to $1.074$ at 3 d.p., the correct 3 d.p. value is
$\alpha = 1.074$, not 1.073 — the iteration values at step 8 hadn't yet settled far enough to see the
final digit. **This is exactly why the sign-change justification exists**: iterating until the digits
"look stable" is not proof, and here it would have given the wrong last digit.)*
:::
