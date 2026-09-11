---
title: Differentiation
code: P1.12
spec: 7.1–7.4
summary: Gradient functions from first principles, the power rule, tangents and normals, stationary points and their nature, and optimisation.
time: 6 hours
prereq: P1.1 Algebraic Expressions, P1.5 Straight Line Graphs
papers: Papers 1 and 2
---

## Why this topic exists

The gradient of a straight line is easy: rise over run, and it's the same everywhere. A curve's
gradient changes from point to point. Differentiation is the machinery for finding it — a *function*
that tells you the gradient at any $x$ you like.

That one idea answers an enormous range of questions: where is this curve steepest, where does it turn,
what's the maximum profit, what's the velocity at time $t$, what shape of can uses least metal.
Calculus is the single most useful thing in A Level maths, and roughly a quarter of the pure marks
depend on it.

---

## 1. The idea: gradient as a limit

Take a curve and two points on it, $P(x, f(x))$ and $Q(x+h, f(x+h))$. The **chord** $PQ$ has gradient
$$\frac{f(x+h) - f(x)}{h}$$

Now slide $Q$ towards $P$ by making $h$ smaller. The chord swings round and, in the limit, becomes the
**tangent** at $P$. Its gradient is the gradient of the curve at $P$.

:::key Differentiation from first principles
$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$
:::

:::example Worked example 1 — Differentiate $f(x) = x^2$ from first principles
**Solution.**
$$f'(x) = \lim_{h\to0}\frac{(x+h)^2 - x^2}{h}$$
$$= \lim_{h\to0}\frac{x^2 + 2xh + h^2 - x^2}{h}$$
$$= \lim_{h\to0}\frac{2xh + h^2}{h}$$
$$= \lim_{h\to0}(2x + h)$$

Now let $h \to 0$:
$$f'(x) = 2x$$
:::

:::insight Why we can't just set $h = 0$ at the start
Because $\frac{f(x+h)-f(x)}{h}$ becomes $\frac00$, which is meaningless. The algebra above does the
essential work: it **cancels the $h$** in the denominator first, leaving an expression ($2x + h$) that
behaves perfectly well as $h$ approaches zero.

That cancellation is the whole trick of first principles. If the $h$ doesn't cancel, you've made an
algebra mistake.
:::

:::exam First principles in the exam
You'll be asked for it explicitly ("differentiate from first principles"), usually for a simple
quadratic or cubic, worth 4–5 marks. The marks are for:
1. writing the correct limit expression with $h$ (or $\delta x$),
2. expanding correctly,
3. cancelling the $h$,
4. taking the limit **and saying "as $h \to 0$"**.

If you just write down the answer from the power rule, you get zero.
:::

---

## 2. The power rule

:::key The power rule
$$y = x^n \;\Rightarrow\; \frac{dy}{dx} = nx^{n-1}$$

More generally, for $y = ax^n$: $\dfrac{dy}{dx} = anx^{n-1}$.

**Multiply by the power, then reduce the power by one.**
:::

Two consequences worth stating separately:

- The derivative of a **constant** is $0$ (a horizontal line has zero gradient).
- The derivative of $ax$ is $a$ (since $x^1 \to 1x^0 = 1$).

And differentiation is **linear**: you can differentiate term by term, and constants come along for
the ride.

:::warning You must rewrite first
The power rule only works on terms of the form $ax^n$. Before differentiating, convert:

| Original | Rewrite as | Derivative |
|---|---|---|
| $\dfrac{3}{x^2}$ | $3x^{-2}$ | $-6x^{-3} = -\dfrac{6}{x^3}$ |
| $\sqrt x$ | $x^{1/2}$ | $\tfrac12 x^{-1/2} = \dfrac{1}{2\sqrt x}$ |
| $\dfrac{x^3 + 2x}{x}$ | $x^2 + 2$ | $2x$ |
| $(2x+1)^2$ | $4x^2 + 4x + 1$ | $8x + 4$ |

Note the last two: **you cannot differentiate a product or quotient term-by-term in Year 12.** Expand
or divide first. (Year 13 gives you the product and quotient rules.)
:::

### Notation

- $\frac{dy}{dx}$ — "the rate of change of $y$ with respect to $x$". Use when the function is given as
  $y = \dots$
- $f'(x)$ — use when the function is given as $f(x) = \dots$
- $\frac{d}{dx}\left[\,\cdot\,\right]$ — the *operator*: "differentiate this thing".

$\frac{dy}{dx}$ is **not** a fraction (not in this course), but it behaves like one often enough to be
suggestive.

---

## 3. Tangents and normals

At the point $(x_1, y_1)$ on a curve:

- The **tangent** has gradient $m = \left.\frac{dy}{dx}\right|_{x = x_1}$.
- The **normal** is perpendicular to the tangent, so its gradient is $-\frac{1}{m}$.

Then use $y - y_1 = m(x - x_1)$ from P1.5.

:::example Worked example 2 — Find the equations of the tangent and normal to $y = x^3 - 4x + 1$ at the point where $x = 2$.
**Solution.**

*The point:* $y = 8 - 8 + 1 = 1$, so the point is $(2, 1)$.

*The gradient function:*
$$\frac{dy}{dx} = 3x^2 - 4$$

*The gradient at $x=2$:*
$$m = 3(4) - 4 = 8$$

*Tangent:*
$$y - 1 = 8(x-2) \;\Rightarrow\; y = 8x - 15$$

*Normal:* gradient $= -\frac18$
$$y - 1 = -\tfrac18(x - 2) \;\Rightarrow\; 8y - 8 = -x + 2 \;\Rightarrow\; x + 8y - 10 = 0$$
:::

:::method The four-step tangent/normal recipe
1. Find the $y$-coordinate (substitute into the **original** equation, not the derivative).
2. Differentiate.
3. Substitute $x_1$ into the derivative to get $m$.
4. Use $y - y_1 = m(x-x_1)$ — with $-\frac1m$ for a normal.

The most common error is step 1: substituting into $\frac{dy}{dx}$ instead of $y$ to get the
coordinate.
:::

---

## 4. Increasing and decreasing functions

:::key
- $f$ is **increasing** on an interval if $f'(x) \geq 0$ throughout it.
- $f$ is **decreasing** on an interval if $f'(x) \leq 0$ throughout it.
:::

So "find the interval where $f$ is increasing" means: differentiate, set $f'(x) > 0$, and solve the
inequality — which is usually a quadratic inequality, so back to P1.3 and a sketch.

:::example Worked example 3 — Find the values of $x$ for which $f(x) = x^3 - 3x^2 - 9x$ is decreasing.
**Solution.**
$$f'(x) = 3x^2 - 6x - 9$$

Decreasing means $f'(x) < 0$:
$$3x^2 - 6x - 9 < 0$$
$$x^2 - 2x - 3 < 0$$
$$(x-3)(x+1) < 0$$

Critical values $-1$ and $3$; U-shaped parabola; we want it below the axis, so **between** the roots:
$$-1 < x < 3$$
:::

---

## 5. Stationary points

A **stationary point** is where the curve momentarily levels off: $\dfrac{dy}{dx} = 0$.

Three types:

- **Local maximum** — the curve turns from rising to falling.
- **Local minimum** — falling to rising.
- **Point of inflection (stationary)** — the gradient reaches zero but doesn't change sign; the curve
  flattens and carries on the same way.

:::method Finding and classifying stationary points
1. Differentiate and set $\frac{dy}{dx} = 0$.
2. Solve for $x$.
3. Substitute back into the **original** equation to get the $y$-coordinates.
4. Determine the **nature** by one of the two methods below.
:::

### Method A: the second derivative

Differentiate again to get $\frac{d^2y}{dx^2}$ (or $f''(x)$), then evaluate it at the stationary point.

:::key The second derivative test
At a stationary point:
- $\dfrac{d^2y}{dx^2} > 0 \Rightarrow$ **minimum**
- $\dfrac{d^2y}{dx^2} < 0 \Rightarrow$ **maximum**
- $\dfrac{d^2y}{dx^2} = 0 \Rightarrow$ **inconclusive** — you must use the gradient-sign method instead
:::

:::insight Why the sign of $f''$ tells you the shape
$f''$ is the rate of change of the gradient.

At a minimum, the gradient goes from negative (falling) through zero to positive (rising) — it's
**increasing**, so $f'' > 0$. The curve is concave up, like a cup.

At a maximum, the gradient goes positive → zero → negative — **decreasing**, so $f'' < 0$. Concave
down, like a cap.

Memory hook: positive second derivative = "happy" curve = minimum at the bottom.
:::

### Method B: the sign of the gradient either side

Evaluate $f'$ just to the left and just to the right of the stationary point.

| | Left | At | Right | Nature |
|---|---|---|---|---|
| | $+$ | $0$ | $-$ | Maximum |
| | $-$ | $0$ | $+$ | Minimum |
| | $+$ | $0$ | $+$ | Inflection |
| | $-$ | $0$ | $-$ | Inflection |

This always works — including when the second derivative test fails. Show it as a small table.

:::example Worked example 4 — Find and classify the stationary points of $y = 2x^3 - 3x^2 - 12x + 5$
**Solution.**
$$\frac{dy}{dx} = 6x^2 - 6x - 12 = 0$$
$$x^2 - x - 2 = 0 \;\Rightarrow\; (x-2)(x+1) = 0 \;\Rightarrow\; x = 2 \text{ or } x = -1$$

*$y$-coordinates (from the original):*
- $x = 2$: $y = 16 - 12 - 24 + 5 = -15$
- $x = -1$: $y = -2 - 3 + 12 + 5 = 12$

*Nature (second derivative):*
$$\frac{d^2y}{dx^2} = 12x - 6$$
- At $x = 2$: $24 - 6 = 18 > 0$ ⟹ **minimum** at $(2, -15)$
- At $x = -1$: $-12 - 6 = -18 < 0$ ⟹ **maximum** at $(-1, 12)$

*Sanity check:* for a positive cubic, the maximum comes first (smaller $x$) and then the minimum. ✓
:::

---

## 6. Optimisation and modelling

The payoff. A real quantity is expressed as a function; differentiating finds its best value.

:::method Optimisation questions
1. **Write the quantity to be optimised** (area, volume, cost) in terms of the variables.
2. **Use the constraint** given in the question (a fixed perimeter, a fixed volume) to eliminate one
   variable, so you have a function of **one** variable.
3. Differentiate, set to zero, solve.
4. **Justify** that it's the maximum/minimum you want — second derivative test.
5. Answer the question that was actually asked (they often want the *volume*, not the $x$ that gives it).
6. Check the answer is physically sensible (no negative lengths).
:::

:::example Worked example 5 — An open-topped box is made from a square sheet of card of side 20 cm by cutting squares of side $x$ cm from each corner and folding up the sides. Find the value of $x$ that maximises the volume.
**Solution.**

After cutting and folding, the base is $(20 - 2x)$ by $(20-2x)$ and the height is $x$:
$$V = x(20-2x)^2$$

Expand so we can differentiate:
$$V = x(400 - 80x + 4x^2) = 400x - 80x^2 + 4x^3$$

Differentiate and set to zero:
$$\frac{dV}{dx} = 400 - 160x + 12x^2 = 0$$
$$3x^2 - 40x + 100 = 0$$
$$(3x - 10)(x - 10) = 0 \;\Rightarrow\; x = \tfrac{10}{3} \text{ or } x = 10$$

**Reject $x = 10$:** it would make the base $(20-20) = 0$, so the volume is zero — not a maximum, and
physically the box doesn't exist.

*Justify the maximum:*
$$\frac{d^2V}{dx^2} = -160 + 24x$$
At $x = \frac{10}{3}$: $-160 + 80 = -80 < 0$ ⟹ **maximum** ✓

$$x = \tfrac{10}{3} \approx 3.33 \text{ cm}$$

The maximum volume is $\frac{10}{3}\left(20 - \frac{20}{3}\right)^2 = \frac{10}{3} \times
\left(\frac{40}{3}\right)^2 = \frac{16000}{27} \approx 593 \text{ cm}^3$.
:::

:::warning Two marks people throw away
1. **Rejecting the invalid root.** State *why* ("$x = 10$ gives zero volume / a negative length").
2. **Justifying the nature.** "Since $\frac{d^2V}{dx^2} < 0$, this is a maximum" is an explicit mark
   in virtually every optimisation mark scheme. Don't assume it's obvious.
:::

---

## In the exam

- Differentiate the **rewritten** form. Half the errors in this topic happen before any calculus does.
- $\frac{dy}{dx}$ at a point is a **number**; $\frac{dy}{dx}$ as a function is an **expression**. Keep
  them straight.
- "Find the rate of change of $y$ when $x=3$" means evaluate $\frac{dy}{dx}$ at $x=3$.
- In context, always give units and interpret: "the volume is increasing at $12\text{ cm}^3$ per second".
- If a question says "verify" or "show that $x=2$ is a stationary point", substituting into $f'$ and
  getting zero is enough — you don't have to solve from scratch.

---

## Practice

:::question Q1 (4 marks)
Differentiate with respect to $x$:
(a) $y = 4x^3 - 7x + 2$ (b) $y = \dfrac{5}{x^2}$ (c) $y = 3\sqrt x$ (d) $y = \dfrac{2x^4 - x}{x}$
:::
:::answer
**(a)** $\dfrac{dy}{dx} = 12x^2 - 7$

**(b)** Rewrite as $5x^{-2}$: $\dfrac{dy}{dx} = -10x^{-3} = -\dfrac{10}{x^3}$

**(c)** Rewrite as $3x^{1/2}$: $\dfrac{dy}{dx} = \tfrac32 x^{-1/2} = \dfrac{3}{2\sqrt x}$

**(d)** Divide first: $y = 2x^3 - 1$, so $\dfrac{dy}{dx} = 6x^2$
:::

:::question Q2 (5 marks)
Differentiate $f(x) = 3x^2 - x$ from first principles.
:::
:::answer
$$f'(x) = \lim_{h\to0}\frac{f(x+h) - f(x)}{h}$$

$$f(x+h) = 3(x+h)^2 - (x+h) = 3x^2 + 6xh + 3h^2 - x - h$$

$$f(x+h) - f(x) = 6xh + 3h^2 - h$$

$$\frac{f(x+h)-f(x)}{h} = 6x + 3h - 1$$

As $h \to 0$:
$$f'(x) = 6x - 1$$
:::

:::question Q3 (5 marks)
Find the equation of the normal to the curve $y = x^2 - 5x + 6$ at the point where the curve crosses
the $y$-axis.
:::
:::answer
Crosses the $y$-axis at $x = 0$, giving $y = 6$: the point $(0, 6)$.

$$\frac{dy}{dx} = 2x - 5 \;\Rightarrow\; m_{\text{tan}} = -5 \text{ at } x=0$$

Normal gradient: $\frac15$.

$$y - 6 = \tfrac15 x \;\Rightarrow\; y = \tfrac15 x + 6 \quad\text{or}\quad x - 5y + 30 = 0$$
:::

:::question Q4 (5 marks)
$f(x) = x^3 + 3x^2 - 24x$. Find the values of $x$ for which $f$ is increasing.
:::
:::answer
$$f'(x) = 3x^2 + 6x - 24 > 0$$
$$x^2 + 2x - 8 > 0$$
$$(x+4)(x-2) > 0$$

U-shaped, above the axis ⟹ outside the roots:
$$x < -4 \quad\text{or}\quad x > 2$$
:::

:::question Q5 (6 marks)
Find the coordinates and nature of the stationary points of $y = x^4 - 8x^2 + 3$.
:::
:::answer
$$\frac{dy}{dx} = 4x^3 - 16x = 4x(x^2 - 4) = 4x(x-2)(x+2) = 0$$
$$x = 0, \; 2, \; -2$$

*$y$-coordinates:*
- $x = 0$: $y = 3$
- $x = 2$: $16 - 32 + 3 = -13$
- $x = -2$: $16 - 32 + 3 = -13$

*Nature:* $\dfrac{d^2y}{dx^2} = 12x^2 - 16$
- $x=0$: $-16 < 0$ ⟹ **maximum** at $(0, 3)$
- $x=2$: $48 - 16 = 32 > 0$ ⟹ **minimum** at $(2, -13)$
- $x=-2$: $32 > 0$ ⟹ **minimum** at $(-2, -13)$

*(A "W" shape — a positive quartic with two minima and a maximum between them. Symmetric about the
$y$-axis, since the function only contains even powers ✓)*
:::

:::question Q6 (7 marks) — modelling
A closed cylindrical can has volume $500\text{ cm}^3$. Its radius is $r$ cm and height $h$ cm.

(a) Show that the total surface area is $A = 2\pi r^2 + \dfrac{1000}{r}$.

(b) Find the value of $r$ that minimises $A$, and justify that it is a minimum.
:::
:::answer
**(a)** Volume: $\pi r^2 h = 500 \Rightarrow h = \dfrac{500}{\pi r^2}$.

Surface area of a closed cylinder = two circular ends + curved side:
$$A = 2\pi r^2 + 2\pi r h = 2\pi r^2 + 2\pi r \times \frac{500}{\pi r^2} = 2\pi r^2 + \frac{1000}{r} \quad\blacksquare$$

**(b)** Rewrite: $A = 2\pi r^2 + 1000r^{-1}$.
$$\frac{dA}{dr} = 4\pi r - 1000r^{-2} = 0$$
$$4\pi r = \frac{1000}{r^2} \;\Rightarrow\; 4\pi r^3 = 1000 \;\Rightarrow\; r^3 = \frac{250}{\pi}$$
$$r = \sqrt[3]{\frac{250}{\pi}} = 4.30 \text{ cm (3 s.f.)}$$

*Justification:*
$$\frac{d^2A}{dr^2} = 4\pi + 2000r^{-3}$$
For $r > 0$ this is always positive, so the stationary point is a **minimum**. ✓

*(Nice fact worth noticing: substituting back gives $h = 2r$ — the most economical closed cylinder is
exactly as tall as it is wide. Which is not what drinks cans look like, because they're optimising for
something other than metal.)*
:::

:::question Q7 (7 marks) — stretch
The curve $C$ has equation $y = x^3 - 6x^2 + 9x$.

(a) Find the coordinates of the stationary points and determine their nature.

(b) Show that $C$ passes through the origin and find the other points where it crosses the $x$-axis.

(c) Sketch $C$.

(d) Find the equation of the tangent to $C$ at the point where $x = 4$, and show that this tangent
meets $C$ again at the point $(-2, -50)$.
:::
:::answer
**(a)** $\dfrac{dy}{dx} = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x-1)(x-3) = 0$, so $x = 1$ or $x=3$.

- $x=1$: $y = 1 - 6 + 9 = 4$
- $x=3$: $y = 27 - 54 + 27 = 0$

$\dfrac{d^2y}{dx^2} = 6x - 12$:
- $x=1$: $-6 < 0$ ⟹ **maximum** at $(1, 4)$
- $x=3$: $6 > 0$ ⟹ **minimum** at $(3, 0)$

**(b)** $y = x(x^2 - 6x + 9) = x(x-3)^2$. At $x=0$, $y=0$ ✓ so it passes through the origin.

Roots: $x = 0$ (single, crosses) and $x = 3$ (double, **touches**).

*(Consistent with (a): the minimum sits exactly on the $x$-axis at $x=3$, which is what a repeated
root means.)*

**(c)** Positive cubic: up from bottom-left, crossing at the origin, rising to the maximum $(1,4)$,
falling to touch the $x$-axis at $(3,0)$, then rising away to the top-right.

**(d)** At $x=4$: $y = 64 - 96 + 36 = 4$, so the point is $(4, 4)$.
$$m = 3(16) - 48 + 9 = 9$$
$$y - 4 = 9(x - 4) \;\Rightarrow\; y = 9x - 32$$

To find where the tangent meets $C$ again, set them equal:
$$x^3 - 6x^2 + 9x = 9x - 32$$
$$x^3 - 6x^2 + 32 = 0$$

$x = 4$ must be a root -- that's the point of contact. Check: $64 - 96 + 32 = 0$ ✓

Dividing by $(x-4)$:
$$x^3 - 6x^2 + 32 = (x-4)(x^2 - 2x - 8) = (x-4)(x-4)(x+2)$$

The factor $(x-4)$ appears **twice**, which is the algebraic signature of tangency -- exactly the same
idea as "discriminant $= 0$" for a line meeting a quadratic.

The remaining root is $x = -2$, giving $y = 9(-2) - 32 = -50$.

So the tangent meets $C$ again at $(-2, -50)$. $\blacksquare$

**Check it's on the curve:** $(-2)^3 - 6(-2)^2 + 9(-2) = -8 - 24 - 18 = -50$ ✓
:::
