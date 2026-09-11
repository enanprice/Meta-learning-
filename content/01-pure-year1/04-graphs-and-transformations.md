---
title: Graphs and Transformations
code: P1.4
spec: 2.7, 2.9, 2.10
summary: Cubics, quartics, reciprocal graphs, asymptotes, intersections, and the four graph transformations.
time: 4 hours
prereq: P1.2 Quadratics
papers: Papers 1 and 2
---

## Why this topic exists

A sketch is a *reasoning tool*, not a picture. Half the questions in A Level maths become easy the
moment you can see the shape: how many roots an equation has, whether a function is one-to-one,
whether an integral will be positive or negative, where a sequence converges.

And transformations are the reason you only have to learn a handful of "parent" graphs. Once you know
$y = x^2$, you know $y = 3(x-2)^2 + 1$ — it's the same curve, moved.

---

## 1. The graphs you must be able to draw from memory

:::key Parent graphs
| Function | Shape | Key features |
|---|---|---|
| $y = x^2$ | Parabola, U | Minimum at origin, symmetric about $y$-axis |
| $y = x^3$ | Cubic | Through origin, rising left-to-right, point of inflection at $(0,0)$ |
| $y = -x^3$ | Cubic | Falling left-to-right |
| $y = \frac{1}{x}$ | Hyperbola | Asymptotes $x=0$, $y=0$; branches in quadrants 1 and 3 |
| $y = \frac{1}{x^2}$ | | Asymptotes $x=0$, $y=0$; **both** branches above the $x$-axis |
| $y = \sqrt x$ | Half-parabola on its side | Starts at origin, only defined for $x\geq 0$ |
| $y = a^x$ | Exponential | Through $(0,1)$, asymptote $y = 0$ |
:::

### Cubics

$y = ax^3 + bx^2 + cx + d$. The end behaviour is controlled entirely by $a$:

- $a > 0$: comes up from bottom-left, goes off to top-right.
- $a < 0$: comes down from top-left, goes off to bottom-right.

To sketch a factorised cubic like $y = (x-1)(x+2)(x-3)$:

1. Roots at $x = 1, -2, 3$.
2. $y$-intercept: set $x=0$: $(-1)(2)(-3) = 6$.
3. Positive $x^3$ coefficient (multiply the leading terms: $x \cdot x \cdot x$), so bottom-left to
   top-right.
4. Draw a smooth curve through the three roots respecting that end behaviour.

### Repeated roots — the detail that earns marks

:::key Root multiplicity
- **Single root** $(x-a)$: the curve **crosses** the axis at $x=a$.
- **Double root** $(x-a)^2$: the curve **touches** the axis and turns back — it does not cross.
- **Triple root** $(x-a)^3$: the curve **flattens** and crosses, with a point of inflection there.
:::

:::insight Why a double root touches
Near $x = a$, the factor $(x-a)^2$ is the only one changing sign-sensitively, and a square is never
negative. So on both sides of $a$ that factor is positive — the sign of $y$ is the same either side,
which means the curve doesn't cross. For $(x-a)^3$, the cube keeps the sign of $(x-a)$, so $y$ flips
sign and the curve does cross.
:::

:::example Worked example 1 — Sketch $y = x(x-2)^2$
**Solution.**

*Roots:* $x = 0$ (single — crosses) and $x = 2$ (double — touches).

*$y$-intercept:* $(0,0)$.

*Leading term:* $x \cdot x \cdot x = x^3$, coefficient $+1$, so bottom-left to top-right.

*Shape:* the curve comes up from bottom-left, crosses at the origin, rises, comes back down to touch
the $x$-axis at $(2,0)$, then rises away to the top-right.

Between $0$ and $2$ there must therefore be a maximum. (You could find it with calculus: $y = x^3 - 4x^2
+ 4x$, $\frac{dy}{dx} = 3x^2 - 8x + 4 = (3x-2)(x-2)$, so a turning point at $x = \frac23$.)
:::

### Quartics

$y = ax^4 + \dots$. If $a > 0$ both ends go **up**; if $a < 0$ both ends go **down**. Same root rules
apply.

---

## 2. Reciprocal graphs and asymptotes

An **asymptote** is a line the curve approaches without ever reaching.

For $y = \dfrac{k}{x}$:

- As $x \to 0$, $|y| \to \infty$: **vertical asymptote** $x = 0$.
- As $x \to \pm\infty$, $y \to 0$: **horizontal asymptote** $y = 0$.
- If $k > 0$, branches sit in quadrants 1 and 3. If $k < 0$, quadrants 2 and 4.

:::warning Asymptotes must be shown
If a question says "sketch, stating the equations of any asymptotes", draw them as **dashed lines**
and **write their equations** ($x = 0$, $y = 2$, etc.). Marks are specifically allocated to this and
a curve drawn without them loses them.
:::

---

## 3. Intersections of graphs

To find where $y = f(x)$ and $y = g(x)$ meet, solve $f(x) = g(x)$. The **number of solutions** is the
number of intersection points — which means a sketch can tell you how many roots an equation has
without solving it.

:::example Worked example 2 — How many solutions does $x^3 = \dfrac{4}{x}$ have?
**Solution.**

Sketch $y = x^3$ and $y = \frac4x$ on the same axes.

$y = x^3$ passes through the origin, rising. $y = \frac4x$ has branches in quadrants 1 and 3.

In quadrant 1, the cubic rises from the origin and the hyperbola falls from infinity — they must
cross **exactly once**. By symmetry (both functions are odd), the same happens in quadrant 3.

So there are **two** solutions.

*Confirming algebraically:* $x^4 = 4 \Rightarrow x = \pm\sqrt 2$. Two solutions ✓ — and note that
$x = 0$ isn't a solution because $\frac4x$ is undefined there.
:::

---

## 4. Transformations

Four to know. Two are "inside the function" (affecting $x$) and two are "outside" (affecting $y$).

:::key The four transformations
| Transformation | Effect | Direction |
|---|---|---|
| $y = f(x) + a$ | Translation $\begin{pmatrix}0\\a\end{pmatrix}$ | Up by $a$ |
| $y = f(x + a)$ | Translation $\begin{pmatrix}-a\\0\end{pmatrix}$ | **Left** by $a$ |
| $y = af(x)$ | Stretch, scale factor $a$ | Parallel to the $y$-axis (vertical) |
| $y = f(ax)$ | Stretch, scale factor $\dfrac1a$ | Parallel to the $x$-axis (horizontal) |
:::

:::insight Why "inside" transformations do the opposite of what you expect
This is the thing that confuses everyone, so it's worth nailing.

Consider $g(x) = f(x + 3)$. What is $g$ doing at $x = -3$? It's computing $f(-3 + 3) = f(0)$. So the
value that $f$ had at $0$, $g$ has at $-3$. The graph's features have moved **3 to the left**.

The inside of the function is the input, and to get the *same input* to $f$, you have to feed $g$ a
*smaller* $x$. Hence left, not right.

Same logic for stretches: $g(x) = f(2x)$ reaches $f(10)$ when $x = 5$. Everything happens at half the
$x$-value, so the graph is **squashed** horizontally by factor $\frac12$ — a stretch of scale factor
$\frac{1}{2}$, not $2$.

**Rule of thumb:** *outside does what it says, inside does the opposite.*
:::

### Reflections

Reflections are just stretches with a negative scale factor:

- $y = -f(x)$: reflection in the **$x$-axis** (all $y$-values negated).
- $y = f(-x)$: reflection in the **$y$-axis** (all $x$-values negated).

### What happens to specific points

| Original point | Under $y = f(x) + a$ | Under $y = f(x+a)$ | Under $y=kf(x)$ | Under $y=f(kx)$ |
|---|---|---|---|---|
| $(p, q)$ | $(p, q+a)$ | $(p - a, q)$ | $(p, kq)$ | $(\frac{p}{k}, q)$ |

:::example Worked example 3 — The curve $y = f(x)$ has a maximum at $(3, -4)$ and crosses the $x$-axis at $(1,0)$ and $(5,0)$. Find these features for $y = 2f(x - 1)$.
**Solution.**

Two transformations, applied in a specific order: the $(x-1)$ is inside (translate right 1), the $2$
is outside (stretch vertically ×2).

*Maximum:* $(3,-4)$. Translate right 1: $(4, -4)$. Stretch $y$ by 2: $(4, -8)$.

*Roots:* $(1,0) \to (2,0) \to (2,0)$ (a vertical stretch leaves points on the $x$-axis fixed, since
$2 \times 0 = 0$). Similarly $(5,0) \to (6,0)$.

So: maximum at $(4,-8)$, crossing the $x$-axis at $(2,0)$ and $(6,0)$.
:::

:::warning Order matters when you combine transformations
For $y = 2f(x) + 3$, the stretch happens **before** the translation (you double $f(x)$, then add 3).
Getting it backwards gives $2(f(x)+3) = 2f(x) + 6$ — a different graph.

Safe method: work from the inside out, in the order the operations would be applied to a number.
For $y = 3f(2x - 4) + 1$ applied to input $x$: first $\times 2$, then $-4$ … but note this is
$f(2(x-2))$, so it's a translation right 2 **then** a horizontal squash — or a squash then a
translation right 2 in the squashed coordinates. When combining horizontal transformations, always
**factorise the bracket first**.
:::

---

## In the exam

- "Sketch" means: correct shape, correct intercepts labelled with coordinates, asymptotes labelled with
  equations, turning points labelled if known. It does **not** mean plot points accurately.
- Transformation questions often give you a graph with labelled points and ask for the images of those
  points. Track each point separately through each transformation — don't try to redraw the whole curve
  in your head.
- "Describe fully the transformation" needs: the **type** (translation / stretch / reflection), the
  **amount** (vector or scale factor), and the **direction** (which axis). All three, or you drop marks.
- If a question asks how many roots $f(x) = k$ has, draw the horizontal line $y = k$ on your sketch of
  $f$ and count crossings. This is a standard "hence" technique.

---

## Practice

:::question Q1 (4 marks)
Sketch $y = (x+1)(x-2)^2$, showing clearly the coordinates of all points where the curve meets the axes.
:::
:::answer
*Roots:* $x = -1$ (single, crosses) and $x = 2$ (double, touches).

*$y$-intercept:* $x = 0$ gives $(1)(-2)^2 = 4$, so $(0, 4)$.

*Leading behaviour:* $x \cdot x^2 = x^3$ with coefficient $+1$ — bottom-left to top-right.

*Sketch:* rises from bottom-left, crosses at $(-1, 0)$, up through $(0,4)$, over a local maximum,
back down to touch the axis at $(2,0)$, then away to the top-right.

Points to label: $(-1, 0)$, $(2, 0)$, $(0, 4)$.
:::

:::question Q2 (3 marks)
On the same axes, sketch $y = x^2$ and $y = \dfrac{8}{x}$, and state how many real solutions the
equation $x^3 = 8$ has.
:::
:::answer
$y = x^2$ is a U through the origin. $y = \frac8x$ has branches in quadrants 1 and 3.

In quadrant 1 both exist and cross **once**. In quadrant 3 the parabola is above the axis (positive $y$)
but the hyperbola is below it (negative $y$), so they never meet there.

**One** real solution. Algebraically $x^2 = \frac8x \Rightarrow x^3 = 8 \Rightarrow x = 2$ ✓
:::

:::question Q3 (3 marks)
The curve $y = f(x)$ passes through $(2, 5)$. State the coordinates of the corresponding point on:

(a) $y = f(x) - 3$ (b) $y = f(x - 4)$ (c) $y = f(2x)$
:::
:::answer
**(a)** Outside, so it does what it says: down 3. $(2, 2)$.

**(b)** Inside, so opposite: right 4 (the $-4$ moves it *right*). $(6, 5)$.

**(c)** Inside stretch: $x$-values are halved. $(1, 5)$.
:::

:::question Q4 (4 marks)
Describe fully the transformation that maps $y = x^2$ onto $y = (x - 3)^2 + 2$.
:::
:::answer
The $(x-3)$ is a translation 3 units in the **positive $x$-direction**; the $+2$ is a translation 2
units in the **positive $y$-direction**.

Together: a **translation** by the vector $\begin{pmatrix}3\\2\end{pmatrix}$.

*(Note this is exactly completed-square form: $y = (x-3)^2 + 2$ has its minimum at $(3,2)$, which is
the origin of $y = x^2$ moved by that vector. The two topics are the same idea.)*
:::

:::question Q5 (5 marks)
The curve $C$ has equation $y = \dfrac{2}{x}$.

(a) Sketch $C$, stating the equations of its asymptotes.

(b) Sketch $y = \dfrac{2}{x - 3} + 1$ on separate axes, stating its asymptotes and the coordinates of
any axis intercepts.
:::
:::answer
**(a)** Branches in quadrants 1 and 3. Asymptotes $x = 0$ and $y = 0$.

**(b)** This is $C$ translated by $\begin{pmatrix}3\\1\end{pmatrix}$.

*Asymptotes:* $x = 3$ and $y = 1$ (the old asymptotes, moved).

*$y$-intercept* ($x=0$): $y = \frac{2}{-3} + 1 = \frac13$, so $\left(0, \frac13\right)$.

*$x$-intercept* ($y=0$): $\frac{2}{x-3} = -1 \Rightarrow x - 3 = -2 \Rightarrow x = 1$, so $(1, 0)$.
:::

:::question Q6 (5 marks) — synoptic
$f(x) = x^3 - 4x$.

(a) Factorise $f(x)$ completely and sketch $y = f(x)$.

(b) Use your sketch to state the number of real solutions of $x^3 - 4x = 3$.
:::
:::answer
**(a)** $f(x) = x(x^2 - 4) = x(x-2)(x+2)$.

Roots at $x = -2, 0, 2$, all single (so all crossings). Positive leading coefficient, so bottom-left
to top-right. The curve has a local maximum between $-2$ and $0$ and a local minimum between $0$ and $2$.

**(b)** Draw the horizontal line $y = 3$ on the sketch.

The local maximum of $f$ occurs at $\frac{dy}{dx} = 3x^2 - 4 = 0 \Rightarrow x = -\frac{2}{\sqrt3}$,
where $y = \frac{16}{3\sqrt3} \approx 3.08$. So the line $y=3$ sits just below the local maximum and
therefore cuts all three branches.

**Three** real solutions.

*(This is the standard "hence, how many roots" technique: the answer is the number of times a
horizontal line crosses the curve, and the turning point values are what decide it.)*
:::

:::question Q7 (4 marks) — stretch
The graph of $y = f(x)$ has a single turning point at $(-2, 6)$. The graph of $y = af(x + b) $ has a
turning point at $(1, -12)$. Find $a$ and $b$.
:::
:::answer
The translation must move $x = -2$ to $x = 1$, a shift of $+3$ in the $x$-direction. Since $f(x+b)$
shifts by $-b$, we need $-b = 3$, so $b = -3$.

The $y$-value goes from $6$ to $-12$, so $a \times 6 = -12$, giving $a = -2$.

$$a = -2, \quad b = -3$$

*(Check: $y = -2f(x-3)$. At $x=1$, the input to $f$ is $-2$ ✓, and the output is $-2 \times 6 = -12$ ✓.
Note the negative $a$ also flips the curve, so a maximum becomes a minimum.)*
:::
