---
title: Straight Line Graphs
code: P1.5
spec: 3.1, 3.2
summary: Gradients, all three forms of a line equation, parallel and perpendicular lines, distances, midpoints and modelling.
time: 3 hours
prereq: P1.1 Algebraic Expressions
papers: Papers 1 and 2
---

## Why this topic exists

Straight lines are the backbone of coordinate geometry, and coordinate geometry is how half the exam
questions are dressed up. Tangents and normals to curves (calculus), chords and radii of circles,
regression lines in statistics, displacement–time graphs in mechanics — all straight lines.

The perpendicular gradient rule in particular shows up in almost every circle question and every
normal-to-a-curve question. It needs to be instant.

---

## 1. Gradient

:::key Gradient
$$m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\text{change in } y}{\text{change in } x}$$
:::

The gradient is the **rate of change** of $y$ with respect to $x$: how much $y$ goes up for every
1 across. This is exactly what $\frac{dy}{dx}$ will mean in calculus — a straight line is just a curve
whose gradient never changes.

:::warning Subtract in the same order
If you do $y_2 - y_1$ on top, you must do $x_2 - x_1$ on the bottom — same order, same points.
Mixing them gives you $-m$, which is a wrong answer that *looks* plausible.
:::

---

## 2. The three forms of a line equation

:::key Equations of a line
| Form | Equation | Use it when |
|---|---|---|
| Gradient–intercept | $y = mx + c$ | You want to read off gradient and intercept |
| Point–gradient | $y - y_1 = m(x - x_1)$ | You know a point and the gradient (most common) |
| General | $ax + by + c = 0$ | The question demands integer coefficients |
:::

The point–gradient form is the workhorse. Almost every exam question gives you a point and a gradient
(or enough to find them), so start there and rearrange at the end if asked.

:::example Worked example 1 — Find the equation of the line through $(2, -3)$ and $(6, 5)$, giving your answer in the form $ax+by+c=0$ where $a$, $b$, $c$ are integers.
**Solution.**

Gradient:
$$m = \frac{5 - (-3)}{6 - 2} = \frac{8}{4} = 2$$

Point–gradient form, using $(2,-3)$:
$$y - (-3) = 2(x - 2)$$
$$y + 3 = 2x - 4$$

Rearrange to the requested form:
$$0 = 2x - y - 7 \quad\text{or}\quad 2x - y - 7 = 0$$

**Check with the other point:** $2(6) - 5 - 7 = 12 - 12 = 0$ ✓

*(Using $(6,5)$ instead would give $y - 5 = 2(x-6) \Rightarrow y = 2x - 7$ — the same line. Either
point works; use whichever has friendlier numbers.)*
:::

:::exam "Integer coefficients"
When a question says $ax + by + c = 0$ with $a,b,c$ integers, you must clear all fractions —
multiply through by the common denominator. $y = \frac23 x + 1$ becomes $3y = 2x + 3$, i.e.
$2x - 3y + 3 = 0$. Leaving a fraction in loses the final mark.
:::

---

## 3. Parallel and perpendicular

:::key Gradient relationships
- **Parallel:** $m_1 = m_2$
- **Perpendicular:** $m_1 m_2 = -1$, i.e. $m_2 = -\dfrac{1}{m_1}$ (negative reciprocal)
:::

:::insight Why perpendicular gradients multiply to $-1$
Take a line of gradient $m = \frac{a}{b}$: go $b$ across, $a$ up. Now rotate that "step" by 90°.
The vector $\binom{b}{a}$ rotates to $\binom{-a}{b}$: you now go $a$ to the *left* and $b$ up. So the
new gradient is $\frac{b}{-a} = -\frac{b}{a}$.

Multiply: $\frac{a}{b}\times\left(-\frac{b}{a}\right) = -1$. ✓

In practice: **flip the fraction and change the sign.** Gradient $\frac{3}{4}$ → perpendicular
gradient $-\frac43$. Gradient $-2$ → perpendicular gradient $\frac12$.
:::

:::warning Two special cases
A **horizontal** line ($y = k$) has gradient $0$. Its perpendicular is **vertical** ($x = k$), whose
gradient is *undefined*, not $0$ — the rule $m_1m_2 = -1$ breaks down here. Just state the equation
directly: the line perpendicular to $y = 3$ through $(5, 3)$ is $x = 5$.
:::

---

## 4. Distance and midpoint

:::key
**Distance between two points** (Pythagoras):
$$d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$$

**Midpoint** (the average of the coordinates):
$$M = \left(\frac{x_1+x_2}{2},\ \frac{y_1+y_2}{2}\right)$$
:::

Neither is in the formula booklet. Both are obvious if you draw the right-angled triangle, which is
worth doing once so you never have to memorise them.

:::example Worked example 2 — $A(-1, 4)$ and $B(5, -2)$. Find (a) $|AB|$ in surd form, (b) the midpoint of $AB$, (c) the equation of the perpendicular bisector of $AB$.
**Solution.**

**(a)**
$$|AB| = \sqrt{(5-(-1))^2 + (-2-4)^2} = \sqrt{36 + 36} = \sqrt{72} = 6\sqrt2$$

**(b)**
$$M = \left(\frac{-1+5}{2}, \frac{4+(-2)}{2}\right) = (2, 1)$$

**(c)** The perpendicular bisector passes through the midpoint, at right angles to $AB$.

Gradient of $AB$: $m = \frac{-2-4}{5-(-1)} = \frac{-6}{6} = -1$.

Perpendicular gradient: $-\frac{1}{-1} = 1$.

Through $(2,1)$ with gradient 1:
$$y - 1 = 1(x - 2) \;\Rightarrow\; y = x - 1$$
:::

---

## 5. Straight-line models

Real-world questions give you a linear relationship and ask you to interpret it.

:::method Interpreting a linear model $y = mx + c$
- **$m$** is the *rate of change*: "the cost increases by £$m$ per extra unit".
- **$c$** is the *initial/fixed value*: "the fixed charge before any units are used".
- Always state **units** in your interpretation. "The gradient is 3" earns less than "the cost rises
  by £3 per mile".
:::

:::example Worked example 3 — A taxi charges a fixed fee plus a rate per mile. A 4-mile journey costs £11; a 10-mile journey costs £23. Find a linear model and interpret both constants.
**Solution.**

Points: $(4, 11)$ and $(10, 23)$, with $x$ = miles and $C$ = cost in £.

$$m = \frac{23 - 11}{10 - 4} = \frac{12}{6} = 2$$

$$C - 11 = 2(x - 4) \;\Rightarrow\; C = 2x + 3$$

**Interpretation:** the fixed fee is **£3** (the cost when $x=0$), and the charge is **£2 per mile**.

**Limitation of the model:** it assumes the rate is constant for all distances, which is unlikely for
very long or very short journeys, and it can't sensibly be used for negative $x$.
:::

:::exam Modelling criticism marks
Questions frequently end with "comment on the validity of this model" or "state one limitation". Good
answers mention: constant rate may not hold outside the data range (**extrapolation**), real data
won't lie exactly on a line, or a physical constraint is ignored. Vague answers like "it might not be
accurate" score nothing.
:::

---

## In the exam

- Draw a sketch. Even a rough one. Perpendicular-bisector and triangle-area questions become obvious
  with a diagram and error-prone without one.
- For "show that the points $A$, $B$, $C$ are collinear", show that the gradient of $AB$ equals the
  gradient of $BC$ — then say *"and they share the point $B$, so $A$, $B$, $C$ lie on a straight line."*
  The shared point is a real mark.
- Area of a triangle with a horizontal or vertical side: use $\frac12 \times$ base $\times$ height
  directly. Otherwise, box the triangle in a rectangle and subtract the corners.

---

## Practice

:::question Q1 (3 marks)
Find the equation of the line through $(-2, 7)$ with gradient $-3$, giving your answer in the form
$y = mx + c$.
:::
:::answer
$$y - 7 = -3(x - (-2)) = -3(x+2)$$
$$y - 7 = -3x - 6$$
$$y = -3x + 1$$
:::

:::question Q2 (4 marks)
The line $l_1$ has equation $3x - 4y + 8 = 0$. Find the equation of the line $l_2$ which is
perpendicular to $l_1$ and passes through $(6, -1)$, giving your answer in the form $ax+by+c=0$ with
integer coefficients.
:::
:::answer
Rearrange $l_1$: $4y = 3x + 8 \Rightarrow y = \frac34 x + 2$, so $m_1 = \frac34$.

Perpendicular gradient: $m_2 = -\frac43$.

$$y - (-1) = -\tfrac43(x - 6)$$
$$3(y+1) = -4(x-6)$$
$$3y + 3 = -4x + 24$$
$$4x + 3y - 21 = 0$$
:::

:::question Q3 (4 marks)
$P(1, 5)$, $Q(7, -3)$. Find the length $PQ$ and the coordinates of its midpoint.
:::
:::answer
$$PQ = \sqrt{(7-1)^2 + (-3-5)^2} = \sqrt{36+64} = \sqrt{100} = 10$$
$$M = \left(\frac{1+7}{2}, \frac{5-3}{2}\right) = (4, 1)$$
:::

:::question Q4 (5 marks)
The points $A(0, 2)$, $B(3, 8)$ and $C(k, 0)$ are such that $\angle ABC = 90°$. Find $k$.
:::
:::answer
Gradient $AB = \dfrac{8-2}{3-0} = 2$.

For $\angle ABC = 90°$, $BC$ must be perpendicular to $AB$, so $m_{BC} = -\frac12$.

$$m_{BC} = \frac{0 - 8}{k - 3} = -\frac12$$
$$-8 \times 2 = -(k-3)$$
$$-16 = -k + 3 \;\Rightarrow\; k = 19$$

**Check:** $m_{BC} = \frac{0-8}{19-3} = \frac{-8}{16} = -\frac12$ ✓
:::

:::question Q5 (6 marks)
The line $l$ has equation $y = 2x - 5$. The point $A$ is $(4, 3)$.

(a) Show that $A$ lies on $l$.

(b) Find the equation of the line through $A$ perpendicular to $l$.

(c) This perpendicular line meets the $y$-axis at $B$ and the $x$-axis at $C$. Find the area of
triangle $OBC$, where $O$ is the origin.
:::
:::answer
**(a)** $2(4) - 5 = 3$ ✓, so $A(4,3)$ lies on $l$.

**(b)** $m_l = 2$, so the perpendicular gradient is $-\frac12$.
$$y - 3 = -\tfrac12(x-4) \;\Rightarrow\; y = -\tfrac12 x + 5$$

**(c)** $B$ is where $x=0$: $B(0, 5)$. $C$ is where $y = 0$: $0 = -\frac12 x + 5 \Rightarrow x = 10$,
so $C(10, 0)$.

Triangle $OBC$ is right-angled at the origin, with legs along the axes:
$$\text{Area} = \tfrac12 \times 10 \times 5 = 25 \text{ square units}$$
:::

:::question Q6 (6 marks) -- synoptic
$A(-3, 2)$, $B(1, 4)$ and $C(3, 0)$.

(a) Show that triangle $ABC$ is right-angled at $B$.

(b) Hence find the equation of the circle that passes through $A$, $B$ and $C$.
:::
:::answer
**(a)**
$$m_{AB} = \frac{4-2}{1-(-3)} = \frac{2}{4} = \tfrac12, \qquad m_{BC} = \frac{0-4}{3-1} = \frac{-4}{2} = -2$$

$$m_{AB} \times m_{BC} = \tfrac12 \times (-2) = -1$$

Since the product of the gradients is $-1$, $AB \perp BC$, so the triangle is right-angled at $B$.
$\blacksquare$

**(b)** The angle in a semicircle is a right angle, so if $\angle ABC = 90°$ then $AC$ must be a
**diameter** of the circle through the three points.

*Centre* = midpoint of $AC$ = $\left(\frac{-3+3}{2}, \frac{2+0}{2}\right) = (0, 1)$.

*Radius* = distance from $(0,1)$ to $A(-3,2)$:
$$r = \sqrt{(-3-0)^2 + (2-1)^2} = \sqrt{9+1} = \sqrt{10}$$

$$x^2 + (y-1)^2 = 10$$

**Check with $B(1,4)$:** $1^2 + (4-1)^2 = 1 + 9 = 10$ ✓

*(The circle machinery is P1.6 -- but the geometry that unlocks it is the perpendicular-gradient rule
from this topic. That combination is a very common exam pairing.)*
:::

:::question Q7 (5 marks) — modelling
A company's monthly running cost $C$ (in £) for producing $n$ items is modelled by a linear
relationship. Producing 100 items costs £4,500; producing 250 items costs £8,250.

(a) Find $C$ in terms of $n$.

(b) Interpret the gradient and intercept in context.

(c) Give one reason why the model may fail for very large $n$.
:::
:::answer
**(a)**
$$m = \frac{8250 - 4500}{250 - 100} = \frac{3750}{150} = 25$$
$$C - 4500 = 25(n - 100) \;\Rightarrow\; C = 25n + 2000$$

**(b)** Each additional item costs **£25** to produce (the variable cost per item). The **£2,000** is
the fixed monthly cost — rent, salaries, machinery — incurred even when nothing is produced.

**(c)** At high output the firm may need extra machinery, overtime pay or a second premises, causing a
step up in cost; or it may get bulk discounts, reducing the per-item cost. Either way the constant
£25/item assumption breaks down, so the model shouldn't be extrapolated far beyond the observed range
of 100–250 items.
:::
