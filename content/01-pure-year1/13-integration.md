---
title: Integration
code: P1.13
spec: 8.1–8.4
summary: Integration as the reverse of differentiation, the constant of integration, definite integrals, and areas under and between curves.
time: 5 hours
prereq: P1.12 Differentiation
papers: Papers 1 and 2
---

## Why this topic exists

Differentiation answers "given the position, what's the speed?" Integration answers the reverse:
"given the speed, what's the position?"

And then something remarkable happens. It turns out that reversing differentiation also computes
**areas under curves** — two apparently unrelated problems solved by the same operation. That
connection (the Fundamental Theorem of Calculus) is one of the genuinely deep results in mathematics,
and you get to use it all the way through Year 13 and mechanics.

---

## 1. Integration as the reverse of differentiation

If $\frac{dy}{dx} = 2x$, what was $y$? Well, $y = x^2$ works. But so does $y = x^2 + 5$, and
$y = x^2 - 100$ — the derivative of any constant is zero, so the constant is invisible to
differentiation.

:::key The power rule for integration
$$\int x^n \, dx = \frac{x^{n+1}}{n+1} + c \qquad (n \neq -1)$$

**Add one to the power, divide by the new power, add $c$.**
:::

:::warning $+c$ is not optional
Every **indefinite** integral (one without limits) needs its constant of integration. It is worth a
mark, every single time, and it is the single most commonly dropped mark in the whole of A Level
maths. Write it before you write anything else if you have to.
:::

:::insight Why $n = -1$ is excluded
If $n = -1$ the formula says divide by $n+1 = 0$, which is undefined. So $\int \frac1x\,dx$ is not
$\frac{x^0}{0}$ — it's something else entirely ($\ln|x| + c$, which you'll meet in Year 13). Everything
*except* $\frac1x$ follows the power rule.
:::

:::example Worked example 1 — Find $\displaystyle\int \left(6x^2 - \frac{4}{x^3} + \sqrt x\right) dx$
**Solution.**

**Rewrite everything as a power of $x$ first:**
$$\int \left(6x^2 - 4x^{-3} + x^{1/2}\right) dx$$

Now integrate term by term:
- $6x^2 \to \dfrac{6x^3}{3} = 2x^3$
- $-4x^{-3} \to \dfrac{-4x^{-2}}{-2} = 2x^{-2}$
- $x^{1/2} \to \dfrac{x^{3/2}}{3/2} = \dfrac23 x^{3/2}$

$$= 2x^3 + \frac{2}{x^2} + \frac23 x^{3/2} + c$$

**Check by differentiating your answer** — you should get back what you started with. This is the best
self-check in calculus and it's free.
:::

:::warning Dividing by a fraction
$\dfrac{x^{3/2}}{3/2}$ means $x^{3/2} \times \dfrac23$, not $\times \dfrac32$. Flip and multiply.
Half the fractional-power integration errors are this.
:::

### Finding the constant

If you're given a point the curve passes through, you can pin down $c$.

:::example Worked example 2 — A curve has $\dfrac{dy}{dx} = 3x^2 - 4x$ and passes through $(2, 5)$. Find its equation.
**Solution.**
$$y = \int (3x^2 - 4x)\,dx = x^3 - 2x^2 + c$$

Substitute $(2,5)$:
$$5 = 8 - 8 + c \;\Rightarrow\; c = 5$$

$$y = x^3 - 2x^2 + 5$$
:::

---

## 2. Definite integrals

A **definite integral** has limits, and evaluates to a number rather than a function.

:::key The definite integral
$$\int_a^b f(x)\,dx = \Big[F(x)\Big]_a^b = F(b) - F(a)$$
where $F$ is any antiderivative of $f$.
:::

The constant $c$ cancels out ($F(b)+c - (F(a)+c)$), which is why definite integrals don't need one.

:::example Worked example 3 — Evaluate $\displaystyle\int_1^3 (2x + 1)\,dx$
**Solution.**
$$= \Big[x^2 + x\Big]_1^3$$
$$= (9 + 3) - (1 + 1)$$
$$= 12 - 2 = 10$$
:::

:::warning Square brackets and the subtraction
1. Use **square brackets** with the limits — it's standard notation and it's marked.
2. Substitute the **top** limit first, then subtract the whole of the bottom one. Bracket it:
   $F(b) - \big(F(a)\big)$. When $F(a)$ is negative, forgetting the bracket flips a sign.
:::

---

## 3. Area under a curve

:::key Area
The area between the curve $y = f(x)$, the $x$-axis, and the lines $x=a$ and $x=b$ is
$$\int_a^b f(x)\,dx$$
**provided the curve is above the $x$-axis** throughout that interval.
:::

:::insight Why an antiderivative gives an area
Let $A(x)$ be the area under the curve from some fixed start up to $x$. Now nudge $x$ by a tiny amount
$h$: the extra sliver of area is approximately a rectangle of width $h$ and height $f(x)$, so
$$A(x+h) - A(x) \approx f(x)\,h \;\Rightarrow\; \frac{A(x+h)-A(x)}{h} \approx f(x)$$

Take $h \to 0$ and the left-hand side is precisely $A'(x)$. So $A'(x) = f(x)$ — the area function is an
antiderivative of $f$. That's the Fundamental Theorem of Calculus in one line, and it's why the two
halves of calculus fit together.
:::

### Areas below the axis

If the curve dips below the $x$-axis, the integral there comes out **negative**. The integral gives
*signed* area.

:::method Area when the curve crosses the axis
1. Find where the curve crosses the $x$-axis (set $y = 0$) **within the limits**.
2. Split the integral at each crossing.
3. Evaluate each piece separately.
4. Take the **modulus** of any negative piece, then add.

If you integrate straight across a crossing point, positive and negative areas cancel and you get the
wrong answer — sometimes even zero.
:::

:::example Worked example 4 — Find the total area enclosed between $y = x^2 - 4$ and the $x$-axis, from $x=0$ to $x=3$.
**Solution.**

*Where does it cross?* $x^2 - 4 = 0 \Rightarrow x = \pm2$. Only $x=2$ is in $[0,3]$, so split there.

*From 0 to 2* (curve is **below** the axis):
$$\int_0^2 (x^2-4)\,dx = \left[\frac{x^3}{3} - 4x\right]_0^2 = \left(\frac83 - 8\right) - 0 = -\frac{16}{3}$$

Negative, as expected. Area $= \frac{16}{3}$.

*From 2 to 3* (curve is **above** the axis):
$$\int_2^3 (x^2-4)\,dx = \left(9 - 12\right) - \left(\frac83 - 8\right) = -3 + \frac{16}{3} = \frac{7}{3}$$

*Total area:*
$$\frac{16}{3} + \frac73 = \frac{23}{3} \approx 7.67$$

*(Compare: integrating straight through from 0 to 3 gives $-\frac{16}{3} + \frac73 = -3$, which is
neither the area nor even positive. Always sketch first.)*
:::

---

## 4. Area between two curves

:::key
$$\text{Area} = \int_a^b \big(y_{\text{upper}} - y_{\text{lower}}\big)\,dx$$
where $a$ and $b$ are the $x$-coordinates of the intersection points.
:::

:::method Area between a curve and a line
1. Find the intersection points by solving the two equations simultaneously — these are your limits.
2. **Sketch** to see which function is on top.
3. Integrate (upper $-$ lower) between the limits.

This works even if part of the region is below the $x$-axis, because subtracting handles the signs
automatically. That's why it's usually the *easier* route.
:::

:::example Worked example 5 — Find the area enclosed between $y = 4x - x^2$ and $y = x$.
**Solution.**

*Intersections:*
$$4x - x^2 = x \;\Rightarrow\; 3x - x^2 = 0 \;\Rightarrow\; x(3 - x) = 0 \;\Rightarrow\; x = 0,\, 3$$

*Which is on top?* Test $x = 1$: the parabola gives $4 - 1 = 3$; the line gives $1$. The **parabola**
is above.

$$\text{Area} = \int_0^3 \big[(4x - x^2) - x\big]dx = \int_0^3 (3x - x^2)\,dx$$
$$= \left[\frac{3x^2}{2} - \frac{x^3}{3}\right]_0^3 = \left(\frac{27}{2} - 9\right) - 0 = \frac{9}{2} = 4.5$$
:::

### The alternative: trapezium minus integral

If the region is bounded by a straight line, you can sometimes find the area of a triangle or
trapezium geometrically and subtract the integral. It's often faster and less error-prone. Both
methods get full marks — use whichever the shape suggests.

---

## In the exam

- $+c$. Every indefinite integral. Every time.
- **Rewrite before integrating.** $\int \frac{x^2+1}{x}dx$ must become $\int (x + x^{-1})dx$ — you
  cannot integrate a quotient directly.
- "Find the exact area" means leave it as a fraction or surd, not a decimal.
- If a question gives you $\frac{dy}{dx}$ and a point, it wants you to integrate and find $c$.
- Sketch the region. The examiner is not testing whether you can integrate; they're testing whether
  you noticed the curve dips below the axis.
- Your calculator can evaluate definite integrals numerically — **use it to check**, but write out the
  full algebraic method, because that's where the marks are.

---

## Practice

:::question Q1 (4 marks)
Find $\displaystyle\int \left(4x^3 - \frac{2}{x^2} + 5\right)dx$.
:::
:::answer
Rewrite: $\displaystyle\int (4x^3 - 2x^{-2} + 5)\,dx$

$$= x^4 - \frac{2x^{-1}}{-1} + 5x + c = x^4 + \frac{2}{x} + 5x + c$$

*(Check by differentiating: $4x^3 - 2x^{-2} + 5$ ✓)*
:::

:::question Q2 (4 marks)
Given $\dfrac{dy}{dx} = 6\sqrt{x} - \dfrac{1}{x^2}$ and that $y = 10$ when $x = 1$, find $y$ in terms
of $x$.
:::
:::answer
Rewrite: $\dfrac{dy}{dx} = 6x^{1/2} - x^{-2}$

$$y = \frac{6x^{3/2}}{3/2} - \frac{x^{-1}}{-1} + c = 4x^{3/2} + \frac1x + c$$

Substitute $(1, 10)$:
$$10 = 4 + 1 + c \;\Rightarrow\; c = 5$$

$$y = 4x^{3/2} + \frac1x + 5$$
:::

:::question Q3 (3 marks)
Evaluate $\displaystyle\int_1^4 \left(3x^2 - 2x\right)dx$.
:::
:::answer
$$= \Big[x^3 - x^2\Big]_1^4 = (64 - 16) - (1 - 1) = 48 - 0 = 48$$
:::

:::question Q4 (5 marks)
Find the area of the region bounded by the curve $y = x(4-x)$ and the $x$-axis.
:::
:::answer
The curve crosses the $x$-axis at $x = 0$ and $x = 4$. Between them (test $x=2$: $y = 4 > 0$) the
curve is **above** the axis, so a single integral works.

$$\int_0^4 (4x - x^2)dx = \left[2x^2 - \frac{x^3}{3}\right]_0^4 = \left(32 - \frac{64}{3}\right) - 0$$
$$= \frac{96 - 64}{3} = \frac{32}{3} \approx 10.7$$
:::

:::question Q5 (6 marks)
The curve $y = x^2 - 2x - 3$ crosses the $x$-axis at $x = -1$ and $x = 3$.

(a) Evaluate $\displaystyle\int_{-1}^{3}(x^2 - 2x - 3)\,dx$.

(b) Explain the significance of the sign of your answer, and state the area enclosed between the curve
and the $x$-axis.
:::
:::answer
**(a)**
$$\left[\frac{x^3}{3} - x^2 - 3x\right]_{-1}^{3}$$

At $x=3$: $9 - 9 - 9 = -9$.

At $x=-1$: $-\frac13 - 1 + 3 = \frac53$.

$$= -9 - \frac53 = -\frac{32}{3}$$

**(b)** The answer is negative because between $x=-1$ and $x=3$ the curve lies entirely **below** the
$x$-axis, so the signed area is negative.

The actual enclosed area is the modulus:
$$\text{Area} = \frac{32}{3} \approx 10.7$$
:::

:::question Q6 (7 marks) — synoptic
The curve $C$ has equation $y = 9 - x^2$ and the line $l$ has equation $y = x + 3$.

(a) Find the coordinates of the points where $C$ and $l$ intersect.

(b) Find the exact area of the region enclosed between $C$ and $l$.
:::
:::answer
**(a)**
$$9 - x^2 = x + 3 \;\Rightarrow\; 0 = x^2 + x - 6 \;\Rightarrow\; (x+3)(x-2) = 0$$
$$x = -3 \text{ or } x = 2$$

$y$-values from the line: $x=-3 \Rightarrow y = 0$; $x = 2 \Rightarrow y = 5$.

Points: $(-3, 0)$ and $(2, 5)$.

**(b)** Test $x = 0$: the curve gives $9$, the line gives $3$ — the **curve** is on top.

$$\text{Area} = \int_{-3}^{2}\big[(9 - x^2) - (x+3)\big]dx = \int_{-3}^{2}(6 - x - x^2)\,dx$$

$$= \left[6x - \frac{x^2}{2} - \frac{x^3}{3}\right]_{-3}^{2}$$

At $x=2$: $12 - 2 - \frac83 = 10 - \frac83 = \frac{22}{3}$.

At $x=-3$: $-18 - \frac92 + 9 = -9 - \frac92 = -\frac{27}{2}$.

$$\text{Area} = \frac{22}{3} - \left(-\frac{27}{2}\right) = \frac{44}{6} + \frac{81}{6} = \frac{125}{6}$$

$$\text{Area} = \frac{125}{6} \approx 20.8$$

*(The $\frac{125}{6}$ is no accident: for a parabola cut by a line, the enclosed area is always
$\frac{|a|(\beta-\alpha)^3}{6}$, where $\alpha,\beta$ are the intersection $x$-values. Here
$\frac{1 \times 5^3}{6} = \frac{125}{6}$ ✓ — a very fast check.)*
:::

:::question Q7 (7 marks) — stretch
The curve $C$ has equation $y = x^3 - 4x$.

(a) Find the coordinates of the points where $C$ crosses the $x$-axis.

(b) Find the total area enclosed between $C$ and the $x$-axis.

(c) Explain why $\displaystyle\int_{-2}^{2}(x^3 - 4x)\,dx = 0$ even though the enclosed area is not zero.
:::
:::answer
**(a)** $x(x^2-4) = x(x-2)(x+2) = 0$, so $x = -2, 0, 2$. Points $(-2,0)$, $(0,0)$, $(2,0)$.

**(b)** The curve crosses the axis at $x=0$, so split the integral there.

*From $-2$ to $0$:*
$$\left[\frac{x^4}{4} - 2x^2\right]_{-2}^{0} = 0 - (4 - 8) = 4$$

Positive — this piece is **above** the axis.

*From $0$ to $2$:*
$$\left[\frac{x^4}{4} - 2x^2\right]_{0}^{2} = (4 - 8) - 0 = -4$$

Negative — **below** the axis. Take the modulus: area $= 4$.

*Total area* $= 4 + 4 = \mathbf{8}$.

**(c)** Because the integral computes **signed** area. The region from $-2$ to $0$ contributes $+4$ and
the region from $0$ to $2$ contributes $-4$, and they cancel exactly.

This cancellation is guaranteed here by symmetry: $f(-x) = -x^3 + 4x = -f(x)$, so $f$ is an **odd**
function, and the integral of any odd function over an interval symmetric about zero is always zero.

*(This is precisely why "find the area" and "evaluate the integral" are different instructions. Read
which one you've been asked.)*
:::
