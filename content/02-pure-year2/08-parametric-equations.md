---
title: Parametric Equations
code: P2.8
spec: 3.4, 3.5, 7.5
summary: Describing curves with a parameter, converting to Cartesian form, trig parameters, and parametric differentiation.
time: 4 hours
prereq: P2.7 Addition Formulae, P1.12 Differentiation
papers: Papers 1 and 2
---

## Why this topic exists

Some curves simply cannot be written as $y = f(x)$. A circle can't — it fails the vertical line test.
A projectile's path is naturally described by *where it is at time $t$*, not by a relationship between
$x$ and $y$.

Parametric equations solve this by giving $x$ and $y$ **separately**, each as a function of a third
variable — the **parameter**, usually $t$ or $\theta$:
$$x = f(t), \qquad y = g(t)$$

Think of $t$ as time and the curve as the path traced by a moving point. That mental picture makes
everything in this topic easier.

---

## 1. Plotting and understanding

Given $x = t^2$, $y = 2t$, build a table:

| $t$ | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|---|---|---|---|---|
| $x$ | $4$ | $1$ | $0$ | $1$ | $4$ |
| $y$ | $-4$ | $-2$ | $0$ | $2$ | $4$ |

Plotting $(4,-4), (1,-2), (0,0), (1,2), (4,4)$ traces a parabola opening to the right — a curve that is
**not a function of $x$** (two $y$-values for each positive $x$), which is exactly the kind of thing
parametric form handles comfortably.

:::key The domain of the parameter matters
If a question says "$x = t^2$, $y = 2t$ for $t \geq 0$", you get only the **upper half** of that
parabola. The range of $t$ controls which *part* of the curve you have, and questions exploit this.
:::

---

## 2. Converting to Cartesian form

:::method Eliminating the parameter
**Route 1 — substitution (for algebraic parameters):** rearrange the simpler equation to make $t$ the
subject, then substitute into the other.

**Route 2 — identities (for trig parameters):** rearrange both equations to isolate the trig functions,
then combine using $\sin^2+\cos^2 = 1$ (or $1 + \tan^2 = \sec^2$).

Then **state the domain and range** of the Cartesian form, derived from the parameter's range.
:::

:::example Worked example 1 — Convert $x = t^2$, $y = 2t$ to Cartesian form
**Solution.**

The $y$ equation is simpler: $t = \frac y2$.

Substitute into $x$:
$$x = \left(\frac y2\right)^2 = \frac{y^2}{4}$$

$$y^2 = 4x$$

*(Which confirms the sideways parabola.)*
:::

:::example Worked example 2 — Convert $x = 3\cos\theta$, $y = 3\sin\theta$ to Cartesian form
**Solution.**

Isolate the trig functions:
$$\cos\theta = \frac x3, \qquad \sin\theta = \frac y3$$

Use $\sin^2\theta + \cos^2\theta = 1$:
$$\frac{x^2}{9} + \frac{y^2}{9} = 1 \;\Rightarrow\; x^2 + y^2 = 9$$

A circle of radius 3 centred at the origin.

*(This is why parametric form is natural for circles: a single parameter $\theta$ sweeps once round the
circle as $\theta$ goes from 0 to $2\pi$.)*
:::

:::example Worked example 3 — A curve has parametric equations $x = 2 + \sin t$, $y = 3 - 2\cos t$. Find its Cartesian equation and describe the curve.
**Solution.**

Isolate:
$$\sin t = x - 2, \qquad \cos t = \frac{3-y}{2}$$

Apply the identity:
$$(x-2)^2 + \left(\frac{3-y}{2}\right)^2 = 1$$
$$(x-2)^2 + \frac{(y-3)^2}{4} = 1$$

*(Note $(3-y)^2 = (y-3)^2$ — squaring kills the sign.)*

This is an **ellipse** centred at $(2, 3)$, with semi-axis 1 in the $x$-direction and 2 in the
$y$-direction.
:::

:::warning Watch the restricted range
$x = 2 + \sin t$ means $1 \leq x \leq 3$, because $\sin t$ only ranges over $[-1,1]$. The Cartesian
equation alone doesn't say that — you should state the domain explicitly when asked.

The same issue arises with $x = t^2$ ($x \geq 0$) and $x = e^t$ ($x > 0$). **The Cartesian equation
often describes more curve than the parametric version actually traces.**
:::

---

## 3. Points of intersection

To find where a parametric curve meets a line or another curve:

:::method Intersections with a parametric curve
1. **Substitute** $x = f(t)$ and $y = g(t)$ into the equation of the line/curve.
2. Solve the resulting equation **for $t$**.
3. Substitute each value of $t$ back into the parametric equations to get the coordinates.
4. Discard any $t$ outside the stated range of the parameter.

Do **not** convert to Cartesian first unless the question asks — it's usually more work and it can
reintroduce points the parameter range excludes.
:::

:::example Worked example 4 — The curve $x = t + 1$, $y = t^2 - 3$ meets the line $y = 2x$. Find the points of intersection.
**Solution.**

Substitute:
$$t^2 - 3 = 2(t+1)$$
$$t^2 - 2t - 5 = 0$$
$$t = \frac{2 \pm \sqrt{4+20}}{2} = 1 \pm \sqrt6$$

For $t = 1+\sqrt6 = 3.449$: $x = 4.449$, $y = 8.899$.
For $t = 1-\sqrt6 = -1.449$: $x = -0.449$, $y = -0.899$.

**Check:** $y = 2x$ in both cases ✓
:::

---

## 4. Parametric differentiation

:::key The chain rule for parametric equations
$$\frac{dy}{dx} = \frac{dy/dt}{dx/dt} = \frac{\dot y}{\dot x}$$
:::

:::insight Why you can "divide" like that
By the chain rule,
$$\frac{dy}{dt} = \frac{dy}{dx}\times\frac{dx}{dt}$$

Rearranging gives $\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$, valid wherever $\frac{dx}{dt} \neq 0$.

Notice what the condition means geometrically: where $\frac{dx}{dt} = 0$, the point isn't moving
horizontally at all, so the tangent is **vertical** and the gradient is undefined. The algebra and the
geometry agree.
:::

:::example Worked example 5 — A curve has $x = t^3 - 3t$, $y = t^2 + 1$. Find $\frac{dy}{dx}$ and the coordinates of any stationary points.
**Solution.**
$$\frac{dx}{dt} = 3t^2 - 3, \qquad \frac{dy}{dt} = 2t$$

$$\frac{dy}{dx} = \frac{2t}{3t^2-3}$$

**Stationary points** occur where $\frac{dy}{dx} = 0$, which needs the **numerator** to be zero (with
the denominator non-zero):
$$2t = 0 \;\Rightarrow\; t = 0$$

Check the denominator: $3(0)^2 - 3 = -3 \neq 0$ ✓

At $t = 0$: $x = 0$, $y = 1$. **Stationary point at $(0, 1)$.**

*(For interest: where $3t^2 - 3 = 0$, i.e. $t = \pm1$, the curve has **vertical** tangents — at
$(-2, 2)$ and $(2, 2)$.)*
:::

:::method Tangents and normals to parametric curves
1. Differentiate $x$ and $y$ separately with respect to $t$.
2. Form $\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$.
3. Substitute the **given value of $t$** to get the numerical gradient.
4. Find the point $(x, y)$ by substituting the same $t$ into the original equations.
5. Use $y - y_1 = m(x-x_1)$ as usual (and $-\frac1m$ for a normal).

Note step 3 and 4 use the same $t$ — a common error is finding the gradient at one $t$ and the point
at another.
:::

:::example Worked example 6 — Find the equation of the tangent to the curve $x = 4\cos\theta$, $y = 3\sin\theta$ at the point where $\theta = \frac\pi4$.
**Solution.**
$$\frac{dx}{d\theta} = -4\sin\theta, \qquad \frac{dy}{d\theta} = 3\cos\theta$$

$$\frac{dy}{dx} = \frac{3\cos\theta}{-4\sin\theta} = -\frac34\cot\theta$$

At $\theta = \frac\pi4$: $\cot\frac\pi4 = 1$, so $m = -\frac34$.

The point: $x = 4\cos\frac\pi4 = 4 \times \frac{\sqrt2}{2} = 2\sqrt2$, and
$y = 3\sin\frac\pi4 = \frac{3\sqrt2}{2}$.

$$y - \frac{3\sqrt2}{2} = -\frac34\left(x - 2\sqrt2\right)$$

Multiply by 4:
$$4y - 6\sqrt2 = -3x + 6\sqrt2$$
$$3x + 4y = 12\sqrt2$$
:::

---

## In the exam

- **Don't convert to Cartesian unless asked.** Parametric differentiation is usually much faster than
  eliminating $t$ and then differentiating implicitly.
- When eliminating a trig parameter, look for which identity fits: $\sin$ and $\cos$ → $\sin^2+\cos^2=1$;
  $\tan$ and $\sec$ → $1+\tan^2 = \sec^2$.
- State domain restrictions when the question asks for "the Cartesian equation, stating the domain".
- "Show that the curve has a vertical tangent" means show $\frac{dx}{dt} = 0$ while $\frac{dy}{dt}\neq0$.
- For areas under parametric curves (Year 13 integration), $\displaystyle\int y\,dx = \int y\frac{dx}{dt}dt$
  with limits converted to $t$-values. Flagged here, covered in P2.11.

---

## Practice

:::question Q1 (4 marks)
A curve has parametric equations $x = 2t$, $y = t^2 - 4$. Find its Cartesian equation.
:::
:::answer
From the $x$ equation: $t = \frac x2$.

$$y = \left(\frac x2\right)^2 - 4 = \frac{x^2}{4} - 4$$
:::

:::question Q2 (4 marks)
Find the Cartesian equation of the curve $x = 5\cos t$, $y = 2\sin t$, and describe the curve.
:::
:::answer
$$\cos t = \frac x5, \qquad \sin t = \frac y2$$

$$\frac{x^2}{25} + \frac{y^2}{4} = 1$$

An **ellipse** centred at the origin, with semi-axes 5 (horizontal) and 2 (vertical).
:::

:::question Q3 (5 marks)
A curve has $x = \dfrac{1}{t}$, $y = t^2 + 3$ for $t > 0$. Find the Cartesian equation and state the
domain of $x$.
:::
:::answer
From the $x$ equation: $t = \frac1x$.

$$y = \frac{1}{x^2} + 3$$

**Domain:** as $t$ ranges over $t > 0$, $x = \frac1t$ takes every positive value. So $x > 0$.

*(The Cartesian equation $y = x^{-2}+3$ on its own would also allow negative $x$ — the parameter
restriction is what rules that out.)*
:::

:::question Q4 (5 marks)
The curve $C$ has parametric equations $x = t^2 + 1$, $y = 4t$. Find $\frac{dy}{dx}$ in terms of $t$,
and the equation of the tangent at the point where $t = 2$.
:::
:::answer
$$\frac{dx}{dt} = 2t, \qquad \frac{dy}{dt} = 4 \;\Rightarrow\; \frac{dy}{dx} = \frac{4}{2t} = \frac2t$$

At $t=2$: $m = 1$, and the point is $x = 5$, $y = 8$.

$$y - 8 = 1(x - 5) \;\Rightarrow\; y = x + 3$$
:::

:::question Q5 (6 marks)
A curve has $x = t^2 - 2t$, $y = t^3 - 12t$.

(a) Find $\frac{dy}{dx}$ in terms of $t$.

(b) Find the coordinates of the points where the tangent is horizontal.
:::
:::answer
**(a)**
$$\frac{dx}{dt} = 2t - 2, \qquad \frac{dy}{dt} = 3t^2 - 12$$
$$\frac{dy}{dx} = \frac{3t^2-12}{2t-2} = \frac{3(t^2-4)}{2(t-1)}$$

**(b)** Horizontal tangent ⟹ numerator zero, denominator non-zero:
$$3(t^2-4) = 0 \;\Rightarrow\; t = \pm 2$$

Both give $2t - 2 \neq 0$ ✓ ($2$ and $-6$).

- $t = 2$: $x = 4 - 4 = 0$, $y = 8 - 24 = -16$ → $(0, -16)$
- $t = -2$: $x = 4 + 4 = 8$, $y = -8 + 24 = 16$ → $(8, 16)$
:::

:::question Q6 (7 marks) — synoptic
The curve $C$ has parametric equations $x = 3\cos\theta$, $y = 2\sin 2\theta$, for
$0 \leq \theta \leq \frac\pi2$.

(a) Find $\frac{dy}{dx}$ in terms of $\theta$.

(b) Find the exact coordinates of the point where the tangent to $C$ is horizontal.
:::
:::answer
**(a)**
$$\frac{dx}{d\theta} = -3\sin\theta, \qquad \frac{dy}{d\theta} = 4\cos2\theta$$

$$\frac{dy}{dx} = \frac{4\cos2\theta}{-3\sin\theta} = -\frac{4\cos2\theta}{3\sin\theta}$$

**(b)** Horizontal tangent needs $\cos2\theta = 0$ with $\sin\theta \neq 0$.

In the range $0 \leq \theta \leq \frac\pi2$, we have $0 \leq 2\theta \leq \pi$, so:
$$2\theta = \frac\pi2 \;\Rightarrow\; \theta = \frac\pi4$$

Check $\sin\frac\pi4 = \frac{\sqrt2}{2} \neq 0$ ✓

Coordinates:
$$x = 3\cos\frac\pi4 = \frac{3\sqrt2}{2}, \qquad y = 2\sin\frac\pi2 = 2$$

$$\left(\frac{3\sqrt2}{2},\; 2\right)$$
:::

:::question Q7 (7 marks) — stretch
The curve $C$ has parametric equations $x = 2\sec\theta$, $y = 3\tan\theta$, for
$-\frac\pi2 < \theta < \frac\pi2$.

(a) Show that the Cartesian equation of $C$ is $\dfrac{x^2}{4} - \dfrac{y^2}{9} = 1$.

(b) Find $\frac{dy}{dx}$ in terms of $\theta$, and show that $C$ has no stationary points.
:::
:::answer
**(a)**
$$\sec\theta = \frac x2, \qquad \tan\theta = \frac y3$$

Use $1 + \tan^2\theta \equiv \sec^2\theta$, rearranged as $\sec^2\theta - \tan^2\theta \equiv 1$:
$$\frac{x^2}{4} - \frac{y^2}{9} = 1 \quad\blacksquare$$

*(This is a **hyperbola**. Note also that $\sec\theta \geq 1$ on this range, so $x \geq 2$ — only the
right-hand branch is traced.)*

**(b)**
$$\frac{dx}{d\theta} = 2\sec\theta\tan\theta, \qquad \frac{dy}{d\theta} = 3\sec^2\theta$$

$$\frac{dy}{dx} = \frac{3\sec^2\theta}{2\sec\theta\tan\theta} = \frac{3\sec\theta}{2\tan\theta}
= \frac{3}{2}\cdot\frac{1/\cos\theta}{\sin\theta/\cos\theta} = \frac{3}{2\sin\theta}$$

For a stationary point we would need $\frac{dy}{dx} = 0$, i.e. $\frac{3}{2\sin\theta} = 0$.

But a fraction with a **non-zero constant numerator** can never equal zero. So there are no stationary
points. $\blacksquare$

*(Geometrically: this branch of the hyperbola never levels off. As $\theta \to \pm\frac\pi2$ we have
$\sin\theta \to \pm1$, so $\frac{dy}{dx} \to \pm\frac32$ — the gradient tends towards the slope of the
hyperbola's asymptotes $y = \pm\frac32 x$, and never reaches zero anywhere ✓)*
:::
