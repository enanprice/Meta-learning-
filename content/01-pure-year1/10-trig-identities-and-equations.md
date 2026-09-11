---
title: Trigonometric Identities and Equations
code: P1.10
spec: 5.3, 5.5, 5.6
summary: The trig graphs, the CAST diagram, the two Year 12 identities, and a reliable procedure for solving trig equations in an interval.
time: 5 hours
prereq: P1.9 Trigonometric Ratios
papers: Papers 1 and 2
---

## Why this topic exists

Everything so far has treated $\sin\theta$ as a ratio in a triangle. That only makes sense for
$0° < \theta < 90°$. This topic extends the trig functions to **all** angles, positive and negative,
which is what lets them model anything periodic — tides, sound, alternating current, circular motion.

The practical skill is **solving trig equations**, and the thing that goes wrong is always the same:
students find one solution and stop. A trig equation in a given interval usually has several, and the
marks are for *all* of them.

---

## 1. The unit circle: where trig really comes from

Draw a circle of radius 1, centred at the origin. Take the point $P$ on the circle at angle $\theta$,
measured **anticlockwise from the positive $x$-axis**.

:::key The unit circle definition
$$P = (\cos\theta,\ \sin\theta)$$

So $\cos\theta$ is the **$x$-coordinate** and $\sin\theta$ is the **$y$-coordinate** of that point.
And $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$ is the gradient of the line $OP$.
:::

Everything follows from this picture:

- Since the coordinates of a point on a unit circle are between $-1$ and $1$: $-1 \leq \sin\theta \leq 1$
  and $-1 \leq \cos\theta \leq 1$. **This is why $\sin\theta = 2$ has no solutions.**
- Going all the way round returns you to the start: both functions repeat every $360°$.
- Pythagoras on the triangle $OPx$ gives $x^2 + y^2 = 1$, i.e. $\cos^2\theta + \sin^2\theta = 1$.

---

## 2. The graphs

:::key Properties of the three graphs
| | $y=\sin\theta$ | $y = \cos\theta$ | $y = \tan\theta$ |
|---|---|---|---|
| Period | $360°$ | $360°$ | $180°$ |
| Range | $-1 \leq y \leq 1$ | $-1 \leq y \leq 1$ | all real values |
| Crosses zero at | $0°, 180°, 360°, \dots$ | $90°, 270°, \dots$ | $0°, 180°, \dots$ |
| Max/min | $\pm 1$ at $90°$, $270°$ | $\pm1$ at $0°$, $180°$ | none |
| Asymptotes | none | none | $\theta = 90°, 270°, \dots$ |
| Symmetry | odd: $\sin(-\theta) = -\sin\theta$ | even: $\cos(-\theta)=\cos\theta$ | odd |
:::

$y = \cos\theta$ is exactly $y = \sin\theta$ shifted **left** by $90°$: $\cos\theta \equiv \sin(\theta + 90°)$.

Transformations apply exactly as in P1.4. For $y = a\sin(b\theta) + c$:

- $a$ is the **amplitude** (vertical stretch),
- the **period** becomes $\dfrac{360°}{b}$ (horizontal squash),
- $c$ shifts the whole wave up.

:::warning Sketching trig graphs
Label the axes with actual angle values ($90, 180, 270, 360$) and the maximum/minimum values. A
sine-shaped squiggle with no labels earns nothing. And check the period: $y = \sin 3\theta$ completes
**three** full waves between $0°$ and $360°$.
:::

---

## 3. The CAST diagram

Which functions are positive in which quadrant? Read the unit circle: $\cos$ is the $x$-coordinate,
$\sin$ is the $y$-coordinate.

:::key CAST
Split the plane into four quadrants, going anticlockwise from the positive $x$-axis:

| Quadrant | Angles | Positive there |
|---|---|---|
| 1st | $0°$–$90°$ | **A**ll |
| 2nd | $90°$–$180°$ | **S**ine only |
| 3rd | $180°$–$270°$ | **T**angent only |
| 4th | $270°$–$360°$ | **C**osine only |

Read anticlockwise from quadrant 4: C, A, S, T — hence the name, written starting bottom-right.
:::

:::insight Why, rather than memorising
In quadrant 2, $x$ is negative and $y$ is positive. So $\cos < 0$, $\sin > 0$, and
$\tan = \frac{\sin}{\cos} < 0$. Only sine is positive. ✓

In quadrant 3, both $x$ and $y$ are negative, so $\sin<0$, $\cos<0$, but their ratio is **positive**.
Only tangent. ✓

If you can reconstruct the unit circle you never need to remember CAST as a mnemonic.
:::

---

## 4. Solving trig equations — the reliable method

:::method Solving $\sin\theta = k$ (or cos, or tan) in a given interval
1. **Write down the interval** at the top of your working, and keep looking at it.
2. Find the **principal value** $\alpha = \sin^{-1}(k)$ from your calculator (ignore signs for now —
   use $|k|$ to get a positive acute reference angle).
3. Use the symmetry rules to generate the other solutions in $0°$ to $360°$:
   - **Sine:** $\theta = \alpha$ and $\theta = 180° - \alpha$
   - **Cosine:** $\theta = \alpha$ and $\theta = 360° - \alpha$
   - **Tangent:** $\theta = \alpha$ and $\theta = 180° + \alpha$
4. **Add or subtract $360°$** (or $180°$ for tan) repeatedly to reach every solution in the required
   interval.
5. Check each answer actually lies in the interval, and check the count looks sensible against a sketch.
:::

:::example Worked example 1 — Solve $\sin\theta = 0.5$ for $0° \leq \theta \leq 360°$
**Solution.**

Principal value: $\sin^{-1}(0.5) = 30°$.

Sine is positive, so solutions are in quadrants 1 and 2:
- Quadrant 1: $\theta = 30°$
- Quadrant 2: $\theta = 180° - 30° = 150°$

Adding $360°$ takes us outside the interval, so:
$$\theta = 30°, \; 150°$$

**Check on a sketch:** draw $y = \sin\theta$ and the line $y = 0.5$. Between $0$ and $360$ they cross
twice ✓
:::

:::example Worked example 2 — Solve $\cos\theta = -0.4$ for $-180° \leq \theta \leq 180°$
**Solution.**

Reference angle: $\cos^{-1}(0.4) = 66.42°$.

Cosine is **negative**, so we're in quadrants 2 and 3:
- Quadrant 2: $\theta = 180° - 66.42° = 113.58°$
- Quadrant 3: $\theta = 180° + 66.42° = 246.42°$

Now fit the interval $-180°$ to $180°$. The first is fine. The second is outside, so subtract $360°$:
$$246.42° - 360° = -113.58°$$

$$\theta = -113.6°, \; 113.6° \text{ (1 d.p.)}$$

*(Makes sense: cosine is an even function, so solutions come in $\pm$ pairs.)*
:::

:::warning The interval is not decoration
Every trig equation question specifies an interval, and it's there to tell you how many answers to
give. If the interval is $0 \leq \theta \leq 720°$, you're expected to give roughly twice as many
solutions as for $0$ to $360°$. Students routinely give two answers when four are wanted — and lose
half the marks on a question they fully understood.
:::

---

## 5. Equations with a multiple or shifted angle

This is where most marks are lost in the whole topic. The fix is a substitution and, critically,
**transforming the interval**.

:::method Solving $\sin(k\theta + c) = m$
1. **Substitute** $u = k\theta + c$.
2. **Transform the interval.** If $0° \leq \theta \leq 360°$ and $u = 3\theta$, then
   $0° \leq u \leq 1080°$. Do this to the interval *before* you solve anything.
3. Solve for $u$ across the **new, wider** interval — there will be more solutions than you expect.
4. Convert every $u$ back to $\theta$.
5. Check they all lie in the original interval.
:::

:::example Worked example 3 — Solve $\sin 2\theta = \dfrac{\sqrt3}{2}$ for $0° \leq \theta \leq 360°$
**Solution.**

Let $u = 2\theta$. Then the interval becomes $0° \leq u \leq 720°$ — **twice as wide**, so expect
about twice as many solutions.

$\sin u = \frac{\sqrt3}{2}$, reference angle $60°$. Sine positive ⟹ quadrants 1 and 2:
$$u = 60°, \; 120°$$

Now add $360°$ to each to stay within $720°$:
$$u = 420°, \; 480°$$

Adding another $360°$ exceeds $720°$, so we have four values of $u$. Convert back with
$\theta = \frac{u}{2}$:
$$\theta = 30°,\; 60°,\; 210°,\; 240°$$

**All four are in $[0°, 360°]$** ✓
:::

:::example Worked example 4 — Solve $\tan(\theta - 40°) = 1$ for $0° \leq \theta \leq 360°$
**Solution.**

Let $u = \theta - 40°$. The interval shifts: $-40° \leq u \leq 320°$.

$\tan u = 1$, so $u = 45°$, and then add $180°$ repeatedly (tan has period $180°$):
$$u = 45°, \; 225°$$
($405°$ is outside; $45 - 180 = -135°$ is also outside since $u \geq -40°$.)

Convert back: $\theta = u + 40°$:
$$\theta = 85°, \; 265°$$
:::

:::warning Do not solve first and adjust later
A common wrong approach to $\sin 2\theta = \frac{\sqrt3}{2}$: solve $\sin\theta' = \frac{\sqrt3}{2}$ to
get $60°, 120°$, then halve to get $30°, 60°$ — and stop. You've lost half the solutions, because you
never widened the interval.

**Widen the interval first. Always.**
:::

---

## 6. The two identities

:::key Year 12 trig identities
$$\sin^2\theta + \cos^2\theta \equiv 1$$
$$\tan\theta \equiv \frac{\sin\theta}{\cos\theta}$$

Both follow directly from the unit circle. Neither is in the formula booklet.
:::

Rearrangements worth having ready:
$$\sin^2\theta \equiv 1 - \cos^2\theta \qquad \cos^2\theta \equiv 1 - \sin^2\theta$$

:::method When to use which
- If an equation contains **both $\sin^2$ and $\cos^2$** (or $\sin^2$ and $\cos$), use
  $\sin^2 + \cos^2 = 1$ to get everything in terms of **one** function.
- If an equation contains **$\tan$ alongside $\sin$ or $\cos$**, replace $\tan$ with
  $\frac{\sin}{\cos}$ and clear the fraction.
- **Aim for a quadratic** in a single trig function. That's almost always where these questions are
  going.
:::

:::example Worked example 5 — Solve $2\sin^2\theta + 3\cos\theta - 3 = 0$ for $0° \leq \theta \leq 360°$
**Solution.**

There's a $\sin^2$ and a $\cos$. Convert the $\sin^2$:
$$2(1 - \cos^2\theta) + 3\cos\theta - 3 = 0$$
$$2 - 2\cos^2\theta + 3\cos\theta - 3 = 0$$
$$-2\cos^2\theta + 3\cos\theta - 1 = 0$$
$$2\cos^2\theta - 3\cos\theta + 1 = 0$$

A quadratic in $\cos\theta$. Let $u = \cos\theta$:
$$2u^2 - 3u + 1 = 0 \;\Rightarrow\; (2u - 1)(u - 1) = 0 \;\Rightarrow\; u = \tfrac12 \text{ or } u = 1$$

**Case $\cos\theta = \frac12$:** reference angle $60°$, cosine positive ⟹ quadrants 1 and 4:
$$\theta = 60°, \; 300°$$

**Case $\cos\theta = 1$:** $\theta = 0°$ and $\theta = 360°$ (both endpoints are in the closed interval).

$$\theta = 0°,\; 60°,\; 300°,\; 360°$$
:::

:::warning Check every root is possible
If your quadratic gives $\sin\theta = 1.5$, **reject it** — sine can never exceed 1. Say so explicitly:
*"no solutions since $-1 \leq \sin\theta \leq 1$."* That's a mark.

Conversely, $\tan\theta = 5$ is perfectly fine — tan is unbounded.
:::

:::example Worked example 6 — Solve $3\sin\theta = 2\cos\theta$ for $0° \leq \theta \leq 360°$
**Solution.**

Divide both sides by $\cos\theta$ (valid because $\cos\theta = 0$ would force $\sin\theta = 0$ too,
which is impossible — they're never both zero):
$$3\tan\theta = 2 \;\Rightarrow\; \tan\theta = \tfrac23$$

Reference angle: $\tan^{-1}(2/3) = 33.69°$. Tangent positive ⟹ quadrants 1 and 3:
$$\theta = 33.7°, \; 213.7° \text{ (1 d.p.)}$$
:::

:::insight Spotting the "divide by cos" move
Whenever an equation has $\sin$ and $\cos$ to the **same power** and nothing else, divide through by
$\cos$ (or $\cos^2$) to turn it into a tan equation. For example $\sin^2\theta = 3\cos^2\theta$
becomes $\tan^2\theta = 3$, so $\tan\theta = \pm\sqrt3$.
:::

---

## In the exam

- **Count your solutions against a sketch.** Draw the curve and the horizontal line; the number of
  crossings in the interval is the number of answers you should have.
- Give answers to **1 decimal place** unless told otherwise, and keep full accuracy in between.
- If a question says "give your answers in terms of $\pi$" you're in radians (Year 13) — check the
  calculator mode.
- For "show that the equation can be written as…", you're being handed the substitution. Do the
  identity work, get the quadratic, and the next part will ask you to solve it.
- Endpoints count. If the interval is $0 \leq \theta \leq 360$, then $0$ and $360$ are both allowed.
  If it's $0 < \theta < 360$, they're not.

---

## Practice

:::question Q1 (3 marks)
Solve $\cos\theta = 0.8$ for $0° \leq \theta \leq 360°$, giving your answers to 1 d.p.
:::
:::answer
$\cos^{-1}(0.8) = 36.87°$.

Cosine positive ⟹ quadrants 1 and 4:
$$\theta = 36.9°, \quad 360° - 36.87° = 323.1°$$
:::

:::question Q2 (4 marks)
Solve $\tan\theta = -2$ for $-180° \leq \theta \leq 180°$.
:::
:::answer
Reference angle: $\tan^{-1}(2) = 63.43°$.

Tangent **negative** ⟹ quadrants 2 and 4:
- Quadrant 2: $180° - 63.43° = 116.57°$
- Quadrant 4: $360° - 63.43° = 296.57°$ — outside the interval, so subtract $360°$: $-63.43°$

$$\theta = -63.4°, \; 116.6° \text{ (1 d.p.)}$$
:::

:::question Q3 (5 marks)
Solve $\cos 3\theta = 0$ for $0° \leq \theta \leq 180°$.
:::
:::answer
Let $u = 3\theta$; the interval becomes $0° \leq u \leq 540°$.

$\cos u = 0$ at $u = 90°, 270°, 450°$ (then $630°$ is too big).

$$\theta = \frac{u}{3} = 30°, \; 90°, \; 150°$$
:::

:::question Q4 (5 marks)
Solve $\sin\left(\theta + 30°\right) = -\dfrac{1}{2}$ for $0° \leq \theta \leq 360°$.
:::
:::answer
Let $u = \theta + 30°$; the interval becomes $30° \leq u \leq 390°$.

Reference angle: $\sin^{-1}(0.5) = 30°$. Sine **negative** ⟹ quadrants 3 and 4:
- $u = 180° + 30° = 210°$
- $u = 360° - 30° = 330°$

Both are in $[30°, 390°]$. Adding $360°$ to $210°$ gives $570°$ — too big.

$$\theta = u - 30° = 180°, \; 300°$$
:::

:::question Q5 (6 marks)
Solve $2\cos^2\theta + \sin\theta = 1$ for $0° \leq \theta \leq 360°$.
:::
:::answer
Convert $\cos^2$ using $\cos^2\theta = 1 - \sin^2\theta$:
$$2(1 - \sin^2\theta) + \sin\theta = 1$$
$$2 - 2\sin^2\theta + \sin\theta - 1 = 0$$
$$-2\sin^2\theta + \sin\theta + 1 = 0$$
$$2\sin^2\theta - \sin\theta - 1 = 0$$

Let $u = \sin\theta$: $2u^2 - u - 1 = (2u+1)(u-1) = 0$, so $u = -\frac12$ or $u = 1$.

**$\sin\theta = -\frac12$:** reference $30°$, negative ⟹ quadrants 3, 4:
$\theta = 210°, 330°$.

**$\sin\theta = 1$:** $\theta = 90°$.

$$\theta = 90°, \; 210°, \; 330°$$
:::

:::question Q6 (5 marks)
Solve $\sin 2\theta = \cos 2\theta$ for $0° \leq \theta \leq 360°$.
:::
:::answer
Divide both sides by $\cos 2\theta$:
$$\tan 2\theta = 1$$

Let $u = 2\theta$; the interval becomes $0° \leq u \leq 720°$.

$\tan u = 1 \Rightarrow u = 45°$, then add $180°$ each time:
$$u = 45°, \; 225°, \; 405°, \; 585°$$

($765°$ is too big.)

$$\theta = 22.5°, \; 112.5°, \; 202.5°, \; 292.5°$$
:::

:::question Q7 (7 marks) — synoptic
(a) Show that the equation $5\sin^2 x = 4 - 4\cos x$ can be written as
$$5\cos^2 x - 4\cos x - 1 = 0$$

(b) Hence solve $5\sin^2 x = 4 - 4\cos x$ for $0° \leq x \leq 360°$.
:::
:::answer
**(a)** Replace $\sin^2 x$ with $1 - \cos^2 x$:
$$5(1 - \cos^2 x) = 4 - 4\cos x$$
$$5 - 5\cos^2 x = 4 - 4\cos x$$
$$0 = 5\cos^2 x - 4\cos x - 1 \quad \blacksquare$$

**(b)** Let $u = \cos x$:
$$5u^2 - 4u - 1 = 0 \;\Rightarrow\; (5u + 1)(u - 1) = 0 \;\Rightarrow\; u = -\tfrac15 \text{ or } u = 1$$

**$\cos x = 1$:** $x = 0°$ and $x = 360°$.

**$\cos x = -0.2$:** reference angle $\cos^{-1}(0.2) = 78.46°$; cosine negative ⟹ quadrants 2, 3:
$$x = 180° - 78.46° = 101.5°, \qquad x = 180° + 78.46° = 258.5°$$

$$x = 0°, \; 101.5°, \; 258.5°, \; 360° \text{ (1 d.p.)}$$
:::

:::question Q8 (6 marks) — stretch
Prove the identity
$$\frac{1}{1 + \sin\theta} + \frac{1}{1 - \sin\theta} \equiv \frac{2}{\cos^2\theta}$$
:::
:::answer
Start with the LHS (the messier side) and combine over a common denominator:

$$\text{LHS} = \frac{(1 - \sin\theta) + (1 + \sin\theta)}{(1+\sin\theta)(1-\sin\theta)}$$

Numerator: the $\sin\theta$ terms cancel, leaving $2$.

Denominator: difference of two squares, $1 - \sin^2\theta$.

$$= \frac{2}{1 - \sin^2\theta}$$

Now use $\sin^2\theta + \cos^2\theta \equiv 1$, so $1 - \sin^2\theta \equiv \cos^2\theta$:

$$= \frac{2}{\cos^2\theta} = \text{RHS} \quad \blacksquare$$

*(Notice the structure: combine fractions → difference of two squares → apply the identity. That
three-step pattern covers a large fraction of all trig-identity proofs, including the harder Year 13
ones.)*
:::
