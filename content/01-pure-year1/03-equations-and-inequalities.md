---
title: Equations and Inequalities
code: P1.3
spec: 2.7, 2.8, 2.9
summary: Simultaneous equations (including one quadratic), linear and quadratic inequalities, set notation, and shading regions.
time: 4 hours
prereq: P1.2 Quadratics
papers: Papers 1 and 2
---

## Why this topic exists

Simultaneous equations answer the question *"where do these two things meet?"* — which is the same
question as "where does this line cross this curve", "what's the break-even point", "when do these two
particles collide".

Inequalities answer *"for what values is this true?"* — and they are the standard finishing move for
discriminant questions, domain questions, and anything involving "find the range of values of $k$".

The single biggest source of lost marks in this topic is **treating a quadratic inequality like a
quadratic equation**. There's a whole section on that below because it matters that much.

---

## 1. Simultaneous equations: two linears

Two methods. Both fine. Pick based on the numbers.

**Elimination** — scale the equations so one variable has matching coefficients, then add or subtract.

**Substitution** — rearrange one equation for one variable, substitute into the other.

:::example Worked example 1 -- Solve $3x + 2y = 16$ and $5x - 3y = -5$
**Solution (elimination).**

To eliminate $y$, make its coefficients $+6$ and $-6$: multiply equation (1) by 3 and equation (2) by 2.

$$9x + 6y = 48 \qquad (1')$$
$$10x - 6y = -10 \qquad (2')$$

Add them:
$$19x = 38 \;\Rightarrow\; x = 2$$

Substitute back into the simplest original equation:
$$3(2) + 2y = 16 \;\Rightarrow\; 2y = 10 \;\Rightarrow\; y = 5$$

**Check in the *other* equation** (the one you didn't substitute into): $5(2) - 3(5) = 10 - 15 = -5$ ✓

Solution: $x = 2$, $y = 5$.
:::

:::method Which method, and which variable?
Use **elimination** when a variable's coefficients are equal, or easily made equal (one is a multiple
of the other). Use **substitution** when one equation already has a variable on its own, or has a
coefficient of 1 somewhere.

Then check in the equation you *didn't* use for the substitution — checking in the one you used will
confirm your answer even if you made an error, so it proves nothing.
:::

---

## 2. Simultaneous equations: one linear, one quadratic

This is the exam-standard version, and it has a fixed procedure.

:::method One linear, one quadratic
1. **Rearrange the linear equation** to make one variable the subject. Choose whichever avoids fractions.
2. **Substitute into the quadratic.** Never the other way round.
3. Expand, collect to the form $ax^2+bx+c=0$, and solve.
4. **Find the partner values** by substituting back into the *linear* equation -- it's easier, and it
   can't introduce false solutions.
5. **Present the answers in pairs**: $(x_1, y_1)$ and $(x_2, y_2)$.
:::

:::example Worked example 2 -- Solve $y = 2x - 5$ and $x^2 + y^2 = 25$
**Solution.**

Geometrically: where does this straight line cut this circle of radius 5 centred at the origin?

Substitute $y = 2x - 5$ into the circle equation:
$$x^2 + (2x-5)^2 = 25$$
$$x^2 + 4x^2 - 20x + 25 = 25$$
$$5x^2 - 20x = 0$$
$$5x(x - 4) = 0 \;\Rightarrow\; x = 0 \text{ or } x = 4$$

Partner values from the **linear** equation:
- $x = 0 \Rightarrow y = -5$
- $x = 4 \Rightarrow y = 3$

Intersection points: $(0, -5)$ and $(4, 3)$.

**Check:** $0^2 + (-5)^2 = 25$ ✓ and $4^2 + 3^2 = 25$ ✓
:::

:::warning Don't cancel the $x$
At the line $5x^2 - 20x = 0$, dividing through by $x$ gives $x = 4$ only -- and loses the point
$(0,-5)$ entirely. A line cutting a circle gives **two** points; if you only have one, you've either
lost a root or the line is a tangent. Factorise, never divide.
:::

:::example Worked example 3 -- Solve $2x + y = 7$ and $x^2 + xy = 6$
**Solution.**

Rearrange the linear: $y = 7 - 2x$.

Substitute:
$$x^2 + x(7 - 2x) = 6$$
$$x^2 + 7x - 2x^2 = 6$$
$$-x^2 + 7x - 6 = 0$$

Multiply through by $-1$ to make the $x^2$ coefficient positive (much easier to factorise):
$$x^2 - 7x + 6 = 0 \;\Rightarrow\; (x-1)(x-6) = 0 \;\Rightarrow\; x = 1 \text{ or } x = 6$$

Back into the linear:
- $x = 1 \Rightarrow y = 5$
- $x = 6 \Rightarrow y = -5$

Solutions: $(1, 5)$ and $(6, -5)$.
:::

:::warning Pairing up
If you write "$x = 1$ or $6$, $y = 5$ or $-5$" you risk losing a mark, because it doesn't say which
goes with which. Write the pairs explicitly: $(1,5)$ and $(6,-5)$.
:::

### The geometric meaning

The number of solutions is the number of intersection points:

| Solutions | Geometry | Discriminant of the combined equation |
|---|---|---|
| Two | The line cuts the curve twice | $b^2 - 4ac > 0$ |
| One | The line is a **tangent** to the curve | $b^2 - 4ac = 0$ |
| None | The line misses the curve | $b^2 - 4ac < 0$ |

This is why tangency questions (P1.2 Q4) and simultaneous equations are really the same topic.

---

## 3. Linear inequalities

Solve exactly like an equation, with **one** extra rule.

:::key The one rule that matters
Multiplying or dividing both sides by a **negative** number **reverses** the inequality sign.

$$-2x > 6 \;\Rightarrow\; x < -3$$
:::

:::insight Why the sign flips
$3 < 5$ is true. Multiply both sides by $-1$: is $-3 < -5$? No — $-3$ is to the *right* of $-5$ on the
number line. Multiplying by a negative reflects the number line, which swaps left and right, which
swaps $<$ and $>$.

**Safer habit:** avoid the situation. Instead of $-2x > 6$, add $2x$ to both sides and subtract $6$:
$-6 > 2x$, so $x < -3$. Keeping the variable's coefficient positive means you never have to remember
the rule.
:::

### Three-part inequalities

$$-3 < 2x + 1 \leq 9$$

Do the same operation to **all three parts**:
$$-4 < 2x \leq 8 \;\Rightarrow\; -2 < x \leq 4$$

---

## 4. Quadratic inequalities — the big one

:::warning Where everyone loses marks
To solve $x^2 - x - 6 > 0$, students often write $(x-3)(x+2) > 0$ and then "$x > 3$ or $x > -2$".

**That is wrong**, and it's wrong in a way that's worth understanding. The zero product property
says "if $AB = 0$ then $A = 0$ or $B = 0$" — but there is no equivalent for inequalities. $AB > 0$
just means $A$ and $B$ have the **same sign**, which could be both positive or both negative.

Never try to read the answer straight off the factorised form. **Always sketch.**
:::

:::method Solving a quadratic inequality (the reliable way)
1. Rearrange so one side is **zero**.
2. Solve the corresponding **equation** to find the critical values — where the curve crosses the axis.
3. **Sketch** the parabola (you only need the shape and the two crossing points).
4. Read off the region(s) where the curve is on the side you want:
   - $> 0$ → **above** the axis;
   - $< 0$ → **below** the axis.
5. Write the answer in the right notation.
:::

:::example Worked example 4 — Solve $x^2 - x - 6 > 0$
**Solution.**

Critical values: $x^2 - x - 6 = 0 \Rightarrow (x-3)(x+2) = 0 \Rightarrow x = -2, 3$.

Sketch: $a = 1 > 0$, so a U-shape crossing at $-2$ and $3$. A U-shape is **below** the axis between
its roots and **above** the axis outside them.

We want $> 0$, i.e. above the axis:
$$x < -2 \quad\text{or}\quad x > 3$$
:::

:::example Worked example 5 — Solve $2x^2 + 5x \leq 3$
**Solution.**

Rearrange to zero first — this step is not optional:
$$2x^2 + 5x - 3 \leq 0$$

Critical values: $2x^2 + 5x - 3 = 0$. With $ac = -6$: numbers $6$ and $-1$.
$$2x^2 + 6x - x - 3 = 2x(x+3) - 1(x+3) = (x+3)(2x-1) = 0$$
$$x = -3 \quad\text{or}\quad x = \tfrac12$$

Sketch: U-shape crossing at $-3$ and $\frac12$. We want $\leq 0$, i.e. **below or on** the axis, which
is the region **between** the roots:
$$-3 \leq x \leq \tfrac12$$
:::

:::insight The two-shape rule
For an **upward** parabola ($a > 0$):
- "$< 0$" (below axis) → **between** the roots → a single interval, $\alpha < x < \beta$.
- "$> 0$" (above axis) → **outside** the roots → two intervals, $x < \alpha$ or $x > \beta$.

For a **downward** parabola ($a<0$), swap those. Rather than memorise four cases, just sketch — it
takes five seconds and it's never wrong.
:::

### Notation

Three equivalent ways to write $-3 \leq x \leq \frac12$:

- **Inequality:** $-3 \leq x \leq \tfrac12$
- **Set notation:** $\{x : -3 \leq x \leq \tfrac12\}$
- **Interval notation:** $[-3, \tfrac12]$ — square brackets for included endpoints, round for excluded.

For two separate intervals: $x < -2$ or $x > 3$; in set notation $\{x: x<-2\} \cup \{x : x>3\}$;
in interval notation $(-\infty, -2) \cup (3, \infty)$.

:::warning "or" versus "and"
$x < -2$ **or** $x > 3$ is correct. Writing $3 < x < -2$ is meaningless — no number is simultaneously
bigger than 3 and less than $-2$. If your two regions are disjoint, they must be joined with "or"
(or $\cup$), never squashed into one chain.
:::

---

## 5. Regions and shading

For a question like *"shade the region satisfying $y \leq x + 2$, $y \geq x^2$, $x \geq 0$"*:

1. Draw each boundary, replacing the inequality with $=$.
2. **Line style matters:** $<$ or $>$ → dashed (boundary excluded); $\leq$ or $\geq$ → solid (included).
3. Test a point (usually the origin) in each inequality to decide which side to keep.
4. Shade the overlap of all the regions, and label it $R$.

:::example Worked example 6 — Which side?
For $y \leq x + 2$, test the origin $(0,0)$: is $0 \leq 0 + 2$? Yes. So the origin is in the region —
shade the side containing the origin (below the line).

If the boundary passes through the origin, test a different easy point, like $(1,0)$.
:::

---

## In the exam

- "Find the **set** of values of $k$" is a direct instruction to give a final answer as an inequality
  or in set notation, not as the critical values.
- Discriminant questions nearly always finish with a quadratic inequality. Don't do all the hard work
  and then fumble the last line.
- If a question says "hence" it means *use the previous part*. If the previous part gave you a
  factorisation, the inequality is meant to be read off a sketch of that factorisation.
- For simultaneous equations, **always** check by substituting your pairs back into the original
  equations. It costs 20 seconds and catches sign errors.

---

## Practice

:::question Q1 (5 marks)
Solve the simultaneous equations
$$y = x - 4, \qquad x^2 + 2y^2 = 36$$
:::
:::answer
Substitute $y = x-4$:
$$x^2 + 2(x-4)^2 = 36$$
$$x^2 + 2(x^2 - 8x + 16) = 36$$
$$3x^2 - 16x + 32 - 36 = 0$$
$$3x^2 - 16x - 4 = 0$$

Formula: $x = \dfrac{16 \pm \sqrt{256 + 48}}{6} = \dfrac{16 \pm \sqrt{304}}{6} = \dfrac{8 \pm 2\sqrt{19}}{3}$.

Then $y = x - 4$ for each:
$$\left(\tfrac{8+2\sqrt{19}}{3},\ \tfrac{-4+2\sqrt{19}}{3}\right) \quad\text{and}\quad
\left(\tfrac{8-2\sqrt{19}}{3},\ \tfrac{-4-2\sqrt{19}}{3}\right)$$
:::

:::question Q2 (3 marks)
Solve $5 - 2x \geq 11$.
:::
:::answer
Move the $x$ term to keep its coefficient positive:
$$5 - 11 \geq 2x \;\Rightarrow\; -6 \geq 2x \;\Rightarrow\; -3 \geq x$$

So $x \leq -3$.

*(Or: $-2x \geq 6 \Rightarrow x \leq -3$, flipping the sign on division by $-2$. Same answer.)*
:::

:::question Q3 (4 marks)
Find the set of values of $x$ for which $x^2 + 4x - 21 < 0$.
:::
:::answer
Critical values: $(x+7)(x-3) = 0 \Rightarrow x = -7, 3$.

U-shaped parabola; we want **below** the axis, which is between the roots:
$$-7 < x < 3 \qquad \text{or} \qquad \{x : -7 < x < 3\}$$
:::

:::question Q4 (4 marks)
Solve $x(2x + 3) > 2$.
:::
:::answer
Expand and rearrange to zero — do **not** try to read anything off the un-rearranged product:
$$2x^2 + 3x - 2 > 0$$
$$(2x - 1)(x + 2) > 0 \;\Rightarrow\; \text{critical values } x = \tfrac12,\ -2$$

U-shape, want above the axis, so outside the roots:
$$x < -2 \quad\text{or}\quad x > \tfrac12$$
:::

:::question Q5 (5 marks)
Find the set of values of $x$ satisfying **both** $3x - 5 < 7$ and $x^2 - 2x - 8 > 0$.
:::
:::answer
First: $3x < 12 \Rightarrow x < 4$.

Second: $(x-4)(x+2) > 0$, critical values $4$ and $-2$, U-shape, above axis ⟹ $x < -2$ or $x > 4$.

Now intersect the two. On a number line, $x < 4$ overlaps with "$x<-2$ or $x>4$" only in $x < -2$
(the $x > 4$ branch is excluded by $x<4$).

$$x < -2$$
:::

:::question Q6 (5 marks)
The equation $kx^2 + 4x + (k - 3) = 0$, where $k \neq 0$, has two distinct real roots. Find the set of
values of $k$.
:::
:::answer
Two distinct real roots ⟹ $b^2 - 4ac > 0$:
$$16 - 4k(k-3) > 0$$
$$16 - 4k^2 + 12k > 0$$

Divide by $4$: $4 - k^2 + 3k > 0$, i.e. $k^2 - 3k - 4 < 0$ (multiplying by $-1$ flips the sign).

$$(k-4)(k+1) < 0 \;\Rightarrow\; -1 < k < 4$$

Finally, exclude $k = 0$ (given), so:
$$-1 < k < 0 \quad\text{or}\quad 0 < k < 4$$

*(That last exclusion is a real mark. The condition $k\neq 0$ was stated for a reason.)*
:::

:::question Q7 (6 marks) -- synoptic
The line $y = mx + 1$ intersects the curve $y = x^2 - 3x + 5$ at two distinct points.

(a) Show that $m^2 + 6m - 7 > 0$.

(b) Find the set of possible values of $m$.
:::
:::answer
**(a)** Set the two expressions for $y$ equal:
$$x^2 - 3x + 5 = mx + 1$$
$$x^2 - 3x - mx + 4 = 0$$
$$x^2 - (3 + m)x + 4 = 0$$

Two distinct intersections means this quadratic in $x$ has two distinct real roots, so
$b^2 - 4ac > 0$ with $a = 1$, $b = -(3+m)$, $c = 4$:
$$(3+m)^2 - 16 > 0$$
$$9 + 6m + m^2 - 16 > 0$$
$$m^2 + 6m - 7 > 0 \quad \blacksquare$$

**(b)** Critical values: $(m+7)(m-1) = 0 \Rightarrow m = -7,\ 1$.

U-shaped parabola in $m$; we want it **above** the axis, so outside the roots:
$$m < -7 \quad\text{or}\quad m > 1$$
:::

:::question Q8 (4 marks) — stretch
Solve the inequality $\dfrac{1}{x} < 3$ for $x \neq 0$.
:::
:::answer
**Do not** multiply both sides by $x$ — you don't know its sign, so you don't know whether to flip.

Two clean routes:

*Route 1 — multiply by $x^2$ (always positive, so the sign never flips):*
$$\frac{1}{x} < 3 \;\Rightarrow\; x < 3x^2 \;\Rightarrow\; 3x^2 - x > 0 \;\Rightarrow\; x(3x-1) > 0$$
Critical values $0$ and $\frac13$; U-shape, above axis ⟹ $x < 0$ or $x > \tfrac13$.

*Route 2 — cases:*
If $x > 0$, multiplying gives $1 < 3x \Rightarrow x > \frac13$.
If $x < 0$, then $\frac1x$ is negative and therefore certainly less than 3 — all negative $x$ work.

Both give:
$$x < 0 \quad\text{or}\quad x > \tfrac13$$
:::
