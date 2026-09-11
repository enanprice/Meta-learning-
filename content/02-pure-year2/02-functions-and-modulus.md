---
title: Functions, Modulus and Graph Transformations
code: P2.2
spec: 2.7, 2.8, 2.9
summary: Domain and range, composite and inverse functions, the modulus function, and solving modulus equations and inequalities.
time: 5 hours
prereq: P1.4 Graphs and Transformations
papers: Papers 1 and 2
---

## Why this topic exists

Year 12 treated a function loosely as "a rule". This topic makes it precise: a function needs a
**domain** (what you're allowed to put in) and a **range** (what comes out). That precision is what
lets you talk about inverses, and it's what makes $\ln x$, $\sqrt x$ and $\frac1x$ behave sensibly.

The modulus function is the other half of the topic, and it's the part that produces the awkward
"two cases" questions. There's a reliable procedure for those, below.

---

## 1. Functions, domain and range

:::key Definitions
A **function** maps each element of its **domain** to exactly one element of its **range**.

- **Domain** = the set of allowed inputs ($x$-values).
- **Range** = the set of possible outputs ($y$-values).
:::

:::warning What stops something being a function
"One input, one output." The relation $y^2 = x$ is **not** a function of $x$, because $x = 4$ gives both
$y = 2$ and $y = -2$. Graphically: it fails the **vertical line test** — a vertical line cuts the graph
more than once.
:::

### Restrictions on the domain

Three things force you to restrict a domain:

- **Division by zero:** $f(x) = \frac{1}{x-3}$ needs $x \neq 3$.
- **Square roots of negatives:** $f(x) = \sqrt{x-2}$ needs $x \geq 2$.
- **Logs of non-positives:** $f(x) = \ln(x+1)$ needs $x > -1$.

### Finding the range

:::method Finding a range
1. **Sketch the function** over the given domain. This is not optional — almost every range error is a
   failure to sketch.
2. Read off the lowest and highest $y$-values actually attained.
3. Watch for **turning points** (a minimum can be the bottom of the range even if the domain extends
   further) and **asymptotes** (a value the function approaches but never reaches).
:::

:::example Worked example 1 — Find the range of $f(x) = x^2 - 4x + 7$ for $x \in \mathbb{R}$
**Solution.**

Complete the square:
$$f(x) = (x-2)^2 + 3$$

Since $(x-2)^2 \geq 0$ for all real $x$, the smallest value of $f$ is $3$, attained at $x = 2$. There's
no upper limit.

$$\text{Range: } f(x) \geq 3$$
:::

:::warning Notation matters
Write the **range** in terms of $f(x)$ or $y$ (e.g. $f(x) \geq 3$), and the **domain** in terms of $x$
(e.g. $x \in \mathbb{R}$). Writing "$x \geq 3$" for a range is a common and costly slip.
:::

---

## 2. Composite functions

$fg(x)$ means "do $g$ first, then $f$". Written $f(g(x))$.

:::warning Order
$fg(x) \neq gf(x)$ in general. The function **nearest the $x$** acts first. Read $fg$ right to left,
like function notation always is.
:::

:::example Worked example 2 — $f(x) = 3x + 1$ and $g(x) = x^2$. Find $fg(x)$ and $gf(x)$.
**Solution.**

$$fg(x) = f(g(x)) = f(x^2) = 3x^2 + 1$$

$$gf(x) = g(f(x)) = g(3x+1) = (3x+1)^2 = 9x^2 + 6x + 1$$

Different, as promised. Check with $x=1$: $fg(1) = 4$, $gf(1) = 16$.
:::

:::exam Domain of a composite
$fg$ is only defined where $g$ is defined **and** where $g(x)$ lands inside the domain of $f$.

Example: $f(x) = \ln x$, $g(x) = x - 5$. Then $fg(x) = \ln(x-5)$, which needs $x > 5$ — even though
$g$ itself is fine everywhere.
:::

---

## 3. Inverse functions

The **inverse** $f^{-1}$ undoes $f$: if $f(a) = b$ then $f^{-1}(b) = a$.

:::key When an inverse exists
An inverse exists only if $f$ is **one-to-one**: each output comes from exactly one input.

Graphically: the function passes the **horizontal line test** — no horizontal line cuts the graph more
than once.

$f(x) = x^2$ on $x \in \mathbb{R}$ is *not* one-to-one (both $2$ and $-2$ give $4$), so it has no
inverse. **Restrict the domain** to $x \geq 0$ and it becomes one-to-one, with inverse $\sqrt x$.
:::

:::method Finding an inverse
1. Write $y = f(x)$.
2. **Rearrange to make $x$ the subject.**
3. Swap the letters: replace $y$ with $x$ to write $f^{-1}(x)$.
4. State the domain: **the domain of $f^{-1}$ is the range of $f$.**
:::

:::key The swap rule
$$\text{Domain of } f^{-1} = \text{Range of } f \qquad \text{Range of } f^{-1} = \text{Domain of } f$$

This is worth a mark on its own in nearly every inverse-function question.
:::

:::example Worked example 3 — $f(x) = \dfrac{2x+1}{x - 3}$, $x > 3$. Find $f^{-1}(x)$ and state its domain.
**Solution.**
$$y = \frac{2x+1}{x-3}$$

Multiply out:
$$y(x - 3) = 2x + 1$$
$$yx - 3y = 2x + 1$$

Collect the $x$ terms on one side:
$$yx - 2x = 3y + 1$$
$$x(y - 2) = 3y + 1$$
$$x = \frac{3y+1}{y-2}$$

$$f^{-1}(x) = \frac{3x+1}{x-2}$$

*Domain:* the range of $f$. As $x \to 3^+$, the numerator tends to 7 and the denominator to $0^+$, so
$f(x) \to +\infty$. As $x \to \infty$, $f(x) \to 2$ from above (dividing top and bottom by $x$ gives
$\frac{2 + 1/x}{1 - 3/x} \to 2$). So the range of $f$ is $f(x) > 2$.

$$\text{Domain of } f^{-1}: \; x > 2$$

*(Consistent with the formula: $f^{-1}$ is undefined at $x=2$ ✓)*
:::

:::key The graph of an inverse
$y = f^{-1}(x)$ is the **reflection of $y = f(x)$ in the line $y = x$**.

Consequences: if $f$ passes through $(a,b)$ then $f^{-1}$ passes through $(b,a)$; and any point where
$f$ meets its own inverse lies on the line $y=x$ (which is often the quick way to solve
$f(x) = f^{-1}(x)$ — just solve $f(x) = x$).
:::

---

## 4. The modulus function

:::key Definition
$$|x| = \begin{cases} x & x \geq 0 \\ -x & x < 0\end{cases}$$

The modulus (or absolute value) is the **distance from zero**, so it is never negative.
:::

$|{-5}| = 5$, $|3| = 3$, $|0| = 0$.

### Sketching $y = |f(x)|$

**Reflect every part of the curve that is below the $x$-axis up above it.** The negative outputs become
positive; everything above the axis is unchanged.

### Sketching $y = f(|x|)$

**Keep the part of the curve for $x \geq 0$, then reflect it in the $y$-axis** (discarding the original
left-hand part). The result is always symmetric about the $y$-axis.

:::insight Why they're different
$|f(x)|$ takes the modulus of the **output** — that's a vertical operation, so it affects $y$-values,
flipping the graph vertically where $y<0$.

$f(|x|)$ takes the modulus of the **input** — a horizontal operation, so it affects which $x$-values
get used. Since $|x|$ and $|-x|$ are the same, $f(|x|)$ must give the same output at $x$ and $-x$,
hence the $y$-axis symmetry.

Same "inside vs outside" logic as every other transformation in P1.4.
:::

---

## 5. Modulus equations and inequalities

:::method Solving $|f(x)| = g(x)$
1. **Sketch both graphs.** This tells you how many solutions to expect — and it's how you catch
   invalid ones.
2. Solve the two cases:
   - $f(x) = g(x)$
   - $-f(x) = g(x)$ (equivalently $f(x) = -g(x)$)
3. **Check every solution in the original equation.** The squaring/case-splitting can introduce
   solutions that don't actually work.
:::

:::example Worked example 4 — Solve $|2x - 3| = 5$
**Solution.**

*Case 1:* $2x - 3 = 5 \Rightarrow 2x = 8 \Rightarrow x = 4$
*Case 2:* $2x - 3 = -5 \Rightarrow 2x = -2 \Rightarrow x = -1$

**Check:** $|2(4)-3| = |5| = 5$ ✓ and $|2(-1)-3| = |-5| = 5$ ✓

$$x = 4 \text{ or } x = -1$$
:::

:::example Worked example 5 — Solve $|3x - 1| = x + 5$
**Solution.**

*Case 1:* $3x - 1 = x + 5 \Rightarrow 2x = 6 \Rightarrow x = 3$
*Case 2:* $-(3x - 1) = x + 5 \Rightarrow -3x + 1 = x + 5 \Rightarrow -4 = 4x \Rightarrow x = -1$

**Check both:**
- $x = 3$: LHS $= |8| = 8$, RHS $= 8$ ✓
- $x = -1$: LHS $= |-4| = 4$, RHS $= 4$ ✓

Both valid: $x = 3$ or $x = -1$.
:::

:::warning When a case fails
Try $|x - 2| = -x$. Case 1 gives $x - 2 = -x \Rightarrow x = 1$; check: $|{-1}| = 1$ but $-x = -1$.
**$1 \neq -1$, so reject.**

The checking step is not busywork. A modulus is never negative, so if the right-hand side comes out
negative for your candidate, that solution is spurious. Sketching both sides shows this immediately.
:::

### Modulus inequalities

:::method Solving $|f(x)| < k$ and $|f(x)| > k$ (for $k>0$)
$$|f(x)| < k \iff -k < f(x) < k$$
$$|f(x)| > k \iff f(x) < -k \;\text{ or }\; f(x) > k$$

For inequalities with a function on both sides, find the **critical values** by solving the
corresponding equation, then use a **sketch** to read off which intervals satisfy the inequality.
:::

:::example Worked example 6 — Solve $|2x + 1| \leq 7$
**Solution.**
$$-7 \leq 2x + 1 \leq 7$$
$$-8 \leq 2x \leq 6$$
$$-4 \leq x \leq 3$$
:::

:::example Worked example 7 — Solve $|x - 4| > 3x$
**Solution.**

*Critical values* — solve the equation $|x-4| = 3x$:
- $x - 4 = 3x \Rightarrow -4 = 2x \Rightarrow x = -2$. Check: $|-6| = 6$, but $3(-2) = -6$. **Reject**
  ($6 \neq -6$).
- $-(x-4) = 3x \Rightarrow 4 - x = 3x \Rightarrow x = 1$. Check: $|1-4| = 3$ and $3(1) = 3$ ✓

So there is exactly one critical value, $x = 1$.

*Sketch:* $y = |x-4|$ is a V with its vertex at $(4,0)$; $y = 3x$ is a line through the origin. They
cross once, at $x = 1$. To the **left** of that crossing the V is above the line.

$$x < 1$$

**Check with $x = 0$:** $|{-4}| = 4 > 0$ ✓. **Check with $x = 2$:** $|-2| = 2$, but $3(2) = 6$, so
$2 > 6$ is false ✓ (correctly excluded).
:::

---

## In the exam

- **Sketch first.** Modulus questions are designed so that the algebra alone gives you too many
  solutions. The sketch tells you which are real.
- For inverse functions, always state the domain — it's a separate mark.
- $ff(x)$ means $f(f(x))$, not $[f(x)]^2$.
- "State the range of $f$" after a domain restriction: sketch only the restricted part.
- $|x| = \sqrt{x^2}$ is a sometimes-useful identity — squaring both sides of a modulus equation is a
  legitimate alternative method, but it *always* needs a check at the end, because squaring can
  introduce false solutions.

---

## Practice

:::question Q1 (4 marks)
$f(x) = \dfrac{4}{x - 2}$, $x \neq 2$. Find $f^{-1}(x)$ and state its domain.
:::
:::answer
$$y = \frac{4}{x-2} \;\Rightarrow\; y(x-2) = 4 \;\Rightarrow\; x - 2 = \frac4y \;\Rightarrow\; x = \frac4y + 2$$

$$f^{-1}(x) = \frac4x + 2, \qquad x \neq 0$$

*(The domain of $f^{-1}$ is the range of $f$. Since $\frac{4}{x-2}$ can take any value except 0, the
range of $f$ is $f(x) \neq 0$, hence the domain $x \neq 0$.)*
:::

:::question Q2 (4 marks)
$f(x) = 2x - 5$ and $g(x) = x^2 + 1$. Find (a) $fg(3)$, (b) $gf(x)$, (c) the values of $x$ for which
$fg(x) = 13$.
:::
:::answer
**(a)** $g(3) = 10$, then $f(10) = 15$.

**(b)** $gf(x) = g(2x-5) = (2x-5)^2 + 1 = 4x^2 - 20x + 26$

**(c)** $fg(x) = f(x^2+1) = 2(x^2+1) - 5 = 2x^2 - 3$
$$2x^2 - 3 = 13 \;\Rightarrow\; x^2 = 8 \;\Rightarrow\; x = \pm 2\sqrt2$$
:::

:::question Q3 (4 marks)
Find the range of $f(x) = 3 - (x+1)^2$ for $x \in \mathbb{R}$, and explain why $f$ has no inverse over
this domain.
:::
:::answer
$(x+1)^2 \geq 0$, so $-(x+1)^2 \leq 0$, so $f(x) \leq 3$.

$$\text{Range: } f(x) \leq 3$$

$f$ has no inverse because it is **not one-to-one**: it's a downward parabola with a maximum at
$x = -1$, so a horizontal line below $y=3$ cuts it **twice**. For example $f(0) = f(-2) = 2$, so there
is no unique input to map 2 back to.

*(Restricting to $x \geq -1$ would make it one-to-one and give it an inverse.)*
:::

:::question Q4 (3 marks)
Solve $|4x + 3| = 11$.
:::
:::answer
$4x + 3 = 11 \Rightarrow x = 2$

$4x + 3 = -11 \Rightarrow 4x = -14 \Rightarrow x = -3.5$

**Check:** $|11| = 11$ ✓; $|4(-3.5)+3| = |-11| = 11$ ✓
:::

:::question Q5 (5 marks)
Solve $|x + 2| < 3x - 4$.
:::
:::answer
*Critical values* — solve $|x+2| = 3x - 4$:
- $x + 2 = 3x - 4 \Rightarrow 6 = 2x \Rightarrow x = 3$. Check: $|5| = 5$ and $3(3)-4 = 5$ ✓
- $-(x+2) = 3x - 4 \Rightarrow -x - 2 = 3x - 4 \Rightarrow 2 = 4x \Rightarrow x = \frac12$.
  Check: $|2.5| = 2.5$, but $3(0.5) - 4 = -2.5$. **Reject.**

*Sketch:* the V of $y = |x+2|$ has its vertex at $(-2, 0)$; the line $y = 3x-4$ crosses it once, at
$x=3$. To the **right** of $x=3$ the line is above the V.

$$x > 3$$

**Check with $x = 4$:** $|6| = 6$ and $3(4)-4 = 8$; $6 < 8$ ✓
:::

:::question Q6 (6 marks)
$f(x) = x^2 - 6x + 5$, $x \geq 3$.

(a) Express $f(x)$ in completed square form and state the range of $f$.

(b) Explain why $f^{-1}$ exists, and find $f^{-1}(x)$ with its domain.
:::
:::answer
**(a)** $f(x) = (x-3)^2 - 9 + 5 = (x-3)^2 - 4$

For $x \geq 3$, $(x-3)^2 \geq 0$ and increases without limit, so:
$$\text{Range: } f(x) \geq -4$$

**(b)** On $x \geq 3$ the function is **increasing throughout** (it's the right-hand half of the
parabola, starting at the vertex), so it is one-to-one and the inverse exists.

$$y = (x-3)^2 - 4 \;\Rightarrow\; y + 4 = (x-3)^2 \;\Rightarrow\; x - 3 = \pm\sqrt{y+4}$$

Take the **positive** root, because the domain of $f$ is $x \geq 3$, so $x - 3 \geq 0$:
$$x = 3 + \sqrt{y+4}$$

$$f^{-1}(x) = 3 + \sqrt{x+4}, \qquad x \geq -4$$

*(The domain of $f^{-1}$ is the range of $f$, which is $x \geq -4$ — and that's also exactly where the
square root is defined ✓)*
:::

:::question Q7 (6 marks) — synoptic
The function $f$ is defined by $f(x) = |2x - 6|$.

(a) Sketch $y = f(x)$, stating the coordinates of the vertex and of the $y$-intercept.

(b) On the same axes, sketch $y = \frac12 x + 1$.

(c) Solve $|2x - 6| = \tfrac12 x + 1$.
:::
:::answer
**(a)** $y = 2x - 6$ crosses the $x$-axis at $x=3$; the modulus reflects the part to the left of
$x = 3$ upward. A V-shape with vertex $(3, 0)$.

$y$-intercept: $|{-6}| = 6$, so $(0, 6)$.

**(b)** A straight line through $(0,1)$ with gradient $\frac12$. It crosses the V twice.

**(c)**
*Case 1 (right branch):* $2x - 6 = \tfrac12 x + 1 \Rightarrow \tfrac32 x = 7 \Rightarrow x = \tfrac{14}{3}$

Check: $|2(\frac{14}3) - 6| = |\frac{28}{3} - \frac{18}{3}| = \frac{10}{3}$, and
$\frac12 \cdot \frac{14}{3} + 1 = \frac73 + \frac33 = \frac{10}{3}$ ✓

*Case 2 (left branch):* $-(2x-6) = \tfrac12 x + 1 \Rightarrow 6 - 2x = \tfrac12 x + 1
\Rightarrow 5 = \tfrac52 x \Rightarrow x = 2$

Check: $|4 - 6| = 2$, and $\frac12(2) + 1 = 2$ ✓

$$x = 2 \quad\text{or}\quad x = \frac{14}{3}$$

*(Two solutions, matching the two crossings on the sketch ✓)*
:::
