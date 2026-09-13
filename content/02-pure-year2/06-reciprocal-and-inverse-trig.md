---
title: Reciprocal and Inverse Trigonometric Functions
code: P2.6
spec: 5.5, 5.6
summary: sec, cosec and cot, their graphs, the two Pythagorean identities, and the inverse functions arcsin, arccos and arctan.
time: 4 hours
prereq: P2.5 Radians, P1.10 Trig Identities and Equations
papers: Papers 1 and 2
---

## Why this topic exists

Three new functions, which are just the reciprocals of the ones you know. They exist because certain
expressions are much cleaner written with them — and because the two new Pythagorean identities they
generate are essential for Year 13 integration and for the harder trig proofs.

The inverse functions (arcsin and friends) are the other half, and they're the place where "domain and
range" from P2.2 suddenly matters for real.

---

## 1. The reciprocal functions

:::key Definitions
$$\sec\theta = \frac{1}{\cos\theta} \qquad \operatorname{cosec}\theta = \frac{1}{\sin\theta}
\qquad \cot\theta = \frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta}$$
:::

:::warning Which goes with which
The pairing is deliberately counter-intuitive:
- **sec** goes with **cos** (third letters match: se**c**, **c**os)
- **cosec** goes with **sin** (**cosec** → **s**in)
- **cot** goes with **tan**

Memory hook: look at the **third letter** of sec, cosec and cot — c, s, t — that's cos, sin, tan.
:::

### The graphs

Each reciprocal graph is built from its parent:

**$y = \sec\theta$**: wherever $\cos\theta = 0$ (at $\frac\pi2, \frac{3\pi}{2},\dots$) there's a
**vertical asymptote**. Where $\cos\theta = \pm1$, $\sec\theta = \pm1$ too. The curve consists of
U-shaped branches, never entering the strip $-1 < y < 1$.

**$y = \operatorname{cosec}\theta$**: same idea, with asymptotes where $\sin\theta = 0$ (at
$0, \pi, 2\pi, \dots$). Also never in $-1 < y < 1$.

**$y = \cot\theta$**: asymptotes where $\tan\theta = 0$ (at $0, \pi, \dots$), zeros where $\tan$ has its
asymptotes. It's a decreasing curve in each branch, period $\pi$, and it *does* take all real values.

:::key Ranges
$$|\sec\theta| \geq 1 \qquad |\operatorname{cosec}\theta| \geq 1 \qquad \cot\theta \in \mathbb{R}$$

So $\sec\theta = 0.5$ has **no solutions** — and saying so is a mark.
:::

:::insight Why sec and cosec avoid $(-1,1)$
$\cos\theta$ lies between $-1$ and $1$. Taking a reciprocal of a number whose size is at most 1 gives a
number whose size is at least 1. Small numbers have big reciprocals; that's the whole story.

Similarly, where $\cos\theta \to 0$, its reciprocal blows up — hence the asymptotes.
:::

:::figure sec-graph
Secant is built entirely from cosine: asymptotes wherever cosine crosses zero, and turning points
wherever cosine reaches $\pm1$.
:::

---

## 2. The two new Pythagorean identities

:::key The identities
$$1 + \tan^2\theta \equiv \sec^2\theta$$
$$1 + \cot^2\theta \equiv \operatorname{cosec}^2\theta$$

Both are in the formula booklet, but you should know them cold — recognising *when* to use them is the
skill.
:::

:::insight Where they come from
Start with $\sin^2\theta + \cos^2\theta \equiv 1$.

**Divide everything by $\cos^2\theta$:**
$$\frac{\sin^2\theta}{\cos^2\theta} + 1 = \frac{1}{\cos^2\theta} \;\Rightarrow\; \tan^2\theta + 1 \equiv \sec^2\theta$$

**Divide everything by $\sin^2\theta$ instead:**
$$1 + \frac{\cos^2\theta}{\sin^2\theta} = \frac{1}{\sin^2\theta} \;\Rightarrow\; 1 + \cot^2\theta \equiv \operatorname{cosec}^2\theta$$

Two divisions, two identities. If you ever forget them mid-exam, derive them in ten seconds.
:::

:::method Which identity, when
Look at what's in the equation:
- Contains **$\tan$ and $\sec$** → use $1 + \tan^2 = \sec^2$
- Contains **$\cot$ and $\operatorname{cosec}$** → use $1 + \cot^2 = \operatorname{cosec}^2$
- Contains **$\sin$ and $\cos$** → use $\sin^2 + \cos^2 = 1$

In every case the goal is the same as in Year 12: **reduce to a quadratic in one function**.
:::

:::example Worked example 1 — Solve $\sec^2\theta + \tan\theta = 3$ for $0 \leq \theta \leq 2\pi$
**Solution.**

Replace $\sec^2\theta$ with $1 + \tan^2\theta$:
$$1 + \tan^2\theta + \tan\theta = 3$$
$$\tan^2\theta + \tan\theta - 2 = 0$$

Let $u = \tan\theta$:
$$(u+2)(u-1) = 0 \;\Rightarrow\; u = -2 \text{ or } u = 1$$

**$\tan\theta = 1$:** $\theta = \frac\pi4$, then add $\pi$: $\theta = \frac{5\pi}{4}$.

**$\tan\theta = -2$:** reference angle $\tan^{-1}2 = 1.1071$. Tangent negative ⟹ quadrants 2 and 4:
$$\theta = \pi - 1.1071 = 2.034, \qquad \theta = 2\pi - 1.1071 = 5.176$$

$$\theta = \frac\pi4,\; 2.034,\; \frac{5\pi}{4},\; 5.176 \text{ (3 d.p.)}$$
:::

:::example Worked example 2 — Prove that $\dfrac{\cot\theta}{\operatorname{cosec}\theta - 1} \equiv \dfrac{\operatorname{cosec}\theta + 1}{\cot\theta}$
**Solution.**

Cross-multiplying isn't allowed in an identity proof (that assumes the result), so work on one side.
Start with the LHS and multiply top and bottom by the conjugate $(\operatorname{cosec}\theta + 1)$:

$$\text{LHS} = \frac{\cot\theta}{\operatorname{cosec}\theta - 1}\times
\frac{\operatorname{cosec}\theta+1}{\operatorname{cosec}\theta+1}
= \frac{\cot\theta(\operatorname{cosec}\theta+1)}{\operatorname{cosec}^2\theta - 1}$$

Now use $\operatorname{cosec}^2\theta - 1 \equiv \cot^2\theta$:

$$= \frac{\cot\theta(\operatorname{cosec}\theta+1)}{\cot^2\theta}
= \frac{\operatorname{cosec}\theta+1}{\cot\theta} = \text{RHS} \quad\blacksquare$$

*(The conjugate trick from surds, reused. That pattern — multiply by the conjugate, then apply a
Pythagorean identity to the difference of squares — solves a large fraction of these proofs.)*
:::

---

## 3. Inverse trigonometric functions

$\sin$, $\cos$ and $\tan$ are not one-to-one over their full domains (they repeat forever), so strictly
they have no inverses. The fix, as in P2.2, is to **restrict the domain**.

:::key The three inverse functions
| Function | Domain | Range |
|---|---|---|
| $\arcsin x$ | $-1 \leq x \leq 1$ | $-\frac\pi2 \leq \arcsin x \leq \frac\pi2$ |
| $\arccos x$ | $-1 \leq x \leq 1$ | $0 \leq \arccos x \leq \pi$ |
| $\arctan x$ | $x \in \mathbb{R}$ | $-\frac\pi2 < \arctan x < \frac\pi2$ |
:::

:::insight Why arccos gets a different range
For $\sin$, the stretch from $-\frac\pi2$ to $\frac\pi2$ is one-to-one and covers every output from
$-1$ to $1$. Perfect.

That same stretch is no good for $\cos$, because $\cos$ is symmetric about $0$ — it takes the same
value at $\frac\pi3$ and $-\frac\pi3$. So the chosen range for $\arccos$ is $[0, \pi]$ instead, where
cosine decreases steadily from 1 to $-1$, hitting each value exactly once.

This is why your calculator returns $\cos^{-1}(-0.5) = \frac{2\pi}{3}$ (a second-quadrant angle) but
$\sin^{-1}(-0.5) = -\frac\pi6$ (a negative angle). Different ranges, by design.
:::

:::figure inverse-trig-graphs
Each inverse exists only because the domain of the original was restricted. The chosen range is
printed under each curve — those are the values your calculator will return.
:::

:::warning $\sin^{-1}x$ is not $\dfrac{1}{\sin x}$
$\sin^{-1}x$ (= $\arcsin x$) is the **inverse function**. $\frac{1}{\sin x}$ is $\operatorname{cosec}x$.
Two completely different things that look almost identical in handwriting. When it matters, write
$\arcsin$ to be unambiguous.
:::

### The graphs

Each inverse graph is the parent reflected in $y = x$, over the restricted domain:

- $y = \arcsin x$: increasing, from $\left(-1, -\frac\pi2\right)$ to $\left(1, \frac\pi2\right)$,
  through the origin.
- $y = \arccos x$: **decreasing**, from $(-1, \pi)$ to $(1, 0)$, through $\left(0, \frac\pi2\right)$.
- $y = \arctan x$: increasing through the origin, with **horizontal asymptotes** at
  $y = \pm\frac\pi2$.

---

## In the exam

- When an equation mixes $\sec$/$\tan$ or $\operatorname{cosec}$/$\cot$, the Pythagorean identity is
  almost always the first move.
- Reject impossible values: $\sec\theta = 0.4$, $\operatorname{cosec}\theta = -0.8$ — no solutions,
  and you must **say why**.
- Watch out for lost solutions: if you divide an equation by $\cos\theta$, you lose any solution where
  $\cos\theta = 0$. Factorise instead where possible.
- For identity proofs: **one side only**, usually the messier one. Common moves: write everything in
  terms of $\sin$ and $\cos$; combine over a common denominator; multiply by a conjugate.
- $\arcsin$, $\arccos$, $\arctan$ questions usually just want the domain and range, or a sketch. Learn
  the table.

---

## Practice

:::question Q1 (3 marks)
Without a calculator, find the exact values of (a) $\sec\frac\pi3$, (b) $\operatorname{cosec}\frac{3\pi}{4}$,
(c) $\cot\frac{5\pi}{6}$.
:::
:::answer
**(a)** $\cos\frac\pi3 = \frac12$, so $\sec\frac\pi3 = 2$.

**(b)** $\sin\frac{3\pi}{4} = \sin\frac\pi4 = \frac{\sqrt2}{2}$, so
$\operatorname{cosec}\frac{3\pi}{4} = \frac{2}{\sqrt2} = \sqrt2$.

**(c)** $\tan\frac{5\pi}{6} = -\tan\frac\pi6 = -\frac{1}{\sqrt3}$, so $\cot\frac{5\pi}{6} = -\sqrt3$.
:::

:::question Q2 (4 marks)
Solve $\operatorname{cosec}\theta = 2$ for $0 \leq \theta \leq 2\pi$, giving exact answers.
:::
:::answer
$$\frac{1}{\sin\theta} = 2 \;\Rightarrow\; \sin\theta = \tfrac12$$

$$\theta = \frac\pi6, \quad \frac{5\pi}{6}$$
:::

:::question Q3 (5 marks)
Solve $3\sec^2\theta - 5\tan\theta - 4 = 0$ for $0 \leq \theta \leq 2\pi$, giving answers to 3 s.f.
:::
:::answer
Use $\sec^2\theta = 1 + \tan^2\theta$:
$$3(1 + \tan^2\theta) - 5\tan\theta - 4 = 0$$
$$3\tan^2\theta - 5\tan\theta - 1 = 0$$

This doesn't factorise, so use the formula with $u = \tan\theta$:
$$u = \frac{5 \pm \sqrt{25 + 12}}{6} = \frac{5 \pm \sqrt{37}}{6}$$

$u = 1.8471$ or $u = -0.18046$.

**$\tan\theta = 1.8471$:** $\theta = 1.0745$, then $+\pi$: $\theta = 4.216$

**$\tan\theta = -0.18046$:** reference $0.17853$; negative ⟹ quadrants 2 and 4:
$\theta = \pi - 0.17853 = 2.963$, and $\theta = 2\pi - 0.17853 = 6.105$

$$\theta = 1.07,\; 2.96,\; 4.22,\; 6.10 \text{ (3 s.f.)}$$
:::

:::question Q4 (4 marks)
Explain why the equation $2\sec\theta = 1$ has no solutions.
:::
:::answer
$$2\sec\theta = 1 \;\Rightarrow\; \sec\theta = \tfrac12 \;\Rightarrow\; \frac{1}{\cos\theta} = \tfrac12
\;\Rightarrow\; \cos\theta = 2$$

But $-1 \leq \cos\theta \leq 1$ for all real $\theta$, so $\cos\theta = 2$ is impossible.

Equivalently: $|\sec\theta| \geq 1$ always, so $\sec\theta$ can never equal $\frac12$.

Therefore the equation has **no solutions**. $\blacksquare$
:::

:::question Q5 (5 marks)
Prove that $\operatorname{cosec}\theta - \sin\theta \equiv \cos\theta\cot\theta$.
:::
:::answer
Start with the LHS and write everything in terms of $\sin$ and $\cos$:

$$\text{LHS} = \frac{1}{\sin\theta} - \sin\theta = \frac{1 - \sin^2\theta}{\sin\theta}$$

Using $1 - \sin^2\theta \equiv \cos^2\theta$:

$$= \frac{\cos^2\theta}{\sin\theta} = \cos\theta \times \frac{\cos\theta}{\sin\theta}
= \cos\theta\cot\theta = \text{RHS} \quad\blacksquare$$
:::

:::question Q6 (6 marks)
Solve $\cot^2\theta + 3\operatorname{cosec}\theta = 3$ for $0 \leq \theta \leq 2\pi$, giving exact
answers where possible.
:::
:::answer
Use $\cot^2\theta = \operatorname{cosec}^2\theta - 1$:
$$\operatorname{cosec}^2\theta - 1 + 3\operatorname{cosec}\theta - 3 = 0$$
$$\operatorname{cosec}^2\theta + 3\operatorname{cosec}\theta - 4 = 0$$

Let $u = \operatorname{cosec}\theta$:
$$(u+4)(u-1) = 0 \;\Rightarrow\; u = -4 \text{ or } u = 1$$

**$\operatorname{cosec}\theta = 1$:** $\sin\theta = 1 \Rightarrow \theta = \frac\pi2$

**$\operatorname{cosec}\theta = -4$:** $\sin\theta = -\frac14$. Reference angle $0.25268$; sine
negative ⟹ quadrants 3 and 4:
$$\theta = \pi + 0.25268 = 3.394, \qquad \theta = 2\pi - 0.25268 = 6.031$$

$$\theta = \frac\pi2, \; 3.394, \; 6.031$$

*(Both values of $u$ are valid here since $|{-4}| \geq 1$ and $|1| \geq 1$. Had we obtained
$\operatorname{cosec}\theta = 0.5$, that branch would be rejected.)*
:::

:::question Q7 (6 marks) — stretch
(a) Prove the identity
$$\frac{1}{\sec\theta - \tan\theta} \equiv \sec\theta + \tan\theta$$

(b) Hence solve $\dfrac{1}{\sec\theta - \tan\theta} = 3$ for $0 \leq \theta \leq 2\pi$, given that
$\sec\theta - \tan\theta \neq 0$.
:::
:::answer
**(a)** Multiply top and bottom by the conjugate $(\sec\theta + \tan\theta)$:

$$\text{LHS} = \frac{\sec\theta+\tan\theta}{(\sec\theta-\tan\theta)(\sec\theta+\tan\theta)}
= \frac{\sec\theta+\tan\theta}{\sec^2\theta - \tan^2\theta}$$

From $1 + \tan^2\theta \equiv \sec^2\theta$ we get $\sec^2\theta - \tan^2\theta \equiv 1$, so the
denominator is just 1:

$$= \sec\theta + \tan\theta = \text{RHS} \quad\blacksquare$$

**(b)** From (a), the equation becomes
$$\sec\theta + \tan\theta = 3$$

Also, from (a) rearranged, $\sec\theta - \tan\theta = \frac13$.

Adding the two equations:
$$2\sec\theta = 3 + \tfrac13 = \tfrac{10}{3} \;\Rightarrow\; \sec\theta = \tfrac53
\;\Rightarrow\; \cos\theta = \tfrac35$$

Reference angle: $\cos^{-1}(0.6) = 0.92730$. Cosine positive ⟹ quadrants 1 and 4:
$$\theta = 0.927 \quad\text{or}\quad \theta = 2\pi - 0.92730 = 5.356$$

**Check which are valid:** we need $\sec\theta + \tan\theta = 3$, so $\tan\theta$ must be positive.
- At $\theta = 0.927$ (quadrant 1): $\tan\theta = \frac43 > 0$, and $\frac53 + \frac43 = 3$ ✓
- At $\theta = 5.356$ (quadrant 4): $\tan\theta = -\frac43$, and $\frac53 - \frac43 = \frac13 \neq 3$ ✗

$$\theta = 0.927 \text{ (3 s.f.)}$$

*(A good example of why you check: the algebra produced two candidates and only one satisfies the
original equation. Squaring and reciprocal manipulations both do this.)*
:::
