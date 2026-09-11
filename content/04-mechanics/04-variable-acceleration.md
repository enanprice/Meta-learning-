---
title: Variable Acceleration
code: M4
spec: 7.4, 7.5
summary: Using calculus when acceleration isn't constant — differentiating and integrating between displacement, velocity and acceleration.
time: 4 hours
prereq: M2 Constant Acceleration, P1.12 Differentiation, P1.13 Integration
papers: Paper 3 Section B
---

## Why this topic exists

SUVAT is only valid when $a$ is constant. The moment acceleration varies — a car whose engine power
changes, a particle in a resistive medium, anything where the force isn't constant — those five
equations are useless.

Calculus handles it completely. And the relationship is beautifully simple: **displacement, velocity
and acceleration are connected by differentiation and integration with respect to time.**

---

## 1. The relationships

:::key The calculus chain
$$s \;\xrightarrow{\;\frac{d}{dt}\;}\; v \;\xrightarrow{\;\frac{d}{dt}\;}\; a$$
$$a \;\xrightarrow{\;\int dt\;}\; v \;\xrightarrow{\;\int dt\;}\; s$$

In symbols:
$$v = \frac{ds}{dt} \qquad a = \frac{dv}{dt} = \frac{d^2s}{dt^2}$$
$$v = \int a\,dt \qquad s = \int v\,dt$$
:::

:::insight Why these are the definitions
Velocity **is** the rate of change of displacement — that's what "how fast are you moving" means.
Acceleration **is** the rate of change of velocity.

In Year 12 you met $v = u + at$: with constant $a$, integrating gives $v = at + c$, and at $t=0$ we
have $v = u$, so $c = u$. Integrating again gives $s = ut + \frac12at^2 + c$.

**Every SUVAT equation is a special case of this calculus, with $a$ constant.** That's why they agree
whenever both apply — and why calculus is the more general tool.
:::

:::warning Differentiate down, integrate up
Going from $s$ to $a$: **differentiate** (twice).
Going from $a$ to $s$: **integrate** (twice), with a constant each time.

Mixing the direction up gives an answer with the wrong units, which is a useful check: if $v$ should be
in m s$^{-1}$ and your expression is dimensionally a displacement, you've gone the wrong way.
:::

---

## 2. Differentiating

:::example Worked example 1 — A particle moves so that its displacement from $O$ at time $t$ is $s = 2t^3 - 9t^2 + 12t$ metres. Find (a) the velocity at $t=3$, (b) the times when the particle is instantaneously at rest, (c) the acceleration at those times.
**Solution.**

**(a)**
$$v = \frac{ds}{dt} = 6t^2 - 18t + 12$$
At $t=3$: $v = 54 - 54 + 12 = 6\text{ m s}^{-1}$

**(b)** At rest means $v = 0$:
$$6t^2 - 18t + 12 = 0 \;\Rightarrow\; t^2 - 3t + 2 = 0 \;\Rightarrow\; (t-1)(t-2) = 0$$
$$t = 1 \text{ s and } t = 2 \text{ s}$$

**(c)**
$$a = \frac{dv}{dt} = 12t - 18$$
At $t=1$: $a = -6\text{ m s}^{-2}$ (decelerating, about to reverse)
At $t=2$: $a = 6\text{ m s}^{-2}$ (about to move forwards again)

*(The particle goes forwards, stops at $t=1$, reverses, stops again at $t=2$, then goes forwards.
That's exactly the behaviour a cubic displacement with two turning points should have.)*
:::

:::key Key phrases and what they mean
| Phrase | Condition |
|---|---|
| "instantaneously at rest" | $v = 0$ |
| "at the origin" / "returns to $O$" | $s = 0$ |
| "maximum velocity" | $\frac{dv}{dt} = 0$, i.e. $a = 0$ |
| "maximum displacement" | $\frac{ds}{dt} = 0$, i.e. $v = 0$ |
| "constant velocity" | $a = 0$ |
| "changes direction" | $v$ changes sign (so $v=0$ at that instant) |
:::

:::warning "At rest" is not "at the origin"
$v = 0$ means the particle isn't moving. $s = 0$ means it's back at its starting point. Completely
different conditions, and questions deliberately ask for both.

Read carefully, then write down which equation you're setting to zero.
:::

---

## 3. Integrating

:::method Going from $a$ to $v$ to $s$
1. Integrate, **adding a constant** each time.
2. Use the **initial conditions** to find each constant — usually "$v = u$ when $t = 0$" or "the
   particle starts at $O$", meaning $s = 0$ when $t=0$.
3. Find the constant at each stage before integrating again.
:::

:::example Worked example 2 — A particle starts from rest at $O$ and moves with acceleration $a = 6t - 4\text{ m s}^{-2}$. Find expressions for $v$ and $s$, and the displacement after 4 seconds.
**Solution.**

$$v = \int (6t-4)\,dt = 3t^2 - 4t + c$$

"Starts from rest" means $v = 0$ at $t=0$, so $c = 0$:
$$v = 3t^2 - 4t$$

$$s = \int(3t^2-4t)\,dt = t^3 - 2t^2 + k$$

"Starts at $O$" means $s = 0$ at $t=0$, so $k = 0$:
$$s = t^3 - 2t^2$$

At $t=4$:
$$s = 64 - 32 = 32 \text{ m}$$
:::

:::warning Two initial conditions, two constants
Integrating twice produces two arbitrary constants, and you need **two** pieces of information to pin
them down. "Starts from rest at the origin" is giving you both: $v(0) = 0$ and $s(0) = 0$.

Find the first constant **before** you integrate again — otherwise you'll be integrating an incomplete
expression.
:::

---

## 4. Distance vs displacement

:::method Total distance travelled
If the particle changes direction during the interval, the displacement is **not** the distance.

1. Find when $v = 0$ within the interval — these are the turning points.
2. Compute the displacement over **each** sub-interval separately.
3. Take the **modulus** of each and add.

This is exactly the "area under a curve that crosses the axis" procedure from P1.13, and the same
cancellation trap applies.
:::

:::example Worked example 3 — A particle has velocity $v = t^2 - 5t + 6\text{ m s}^{-1}$. Find the distance travelled between $t=0$ and $t=4$.
**Solution.**

*When does it change direction?*
$$t^2-5t+6 = 0 \;\Rightarrow\; (t-2)(t-3) = 0 \;\Rightarrow\; t = 2, \; 3$$

Both are inside $[0,4]$, so split into three intervals.

$$\int v\,dt = \frac{t^3}{3} - \frac{5t^2}{2} + 6t$$

*From 0 to 2:*
$$\left[\frac83 - 10 + 12\right] - 0 = \frac{14}{3} = 4.667$$

*From 2 to 3:*
$$\left[9 - 22.5 + 18\right] - \frac{14}{3} = 4.5 - 4.667 = -0.1667$$

(Negative — the particle is moving backwards between $t=2$ and $t=3$ ✓)

*From 3 to 4:*
$$\left[\frac{64}{3} - 40 + 24\right] - 4.5 = 5.333 - 4.5 = 0.8333$$

**Total distance** (taking moduli):
$$4.667 + 0.167 + 0.833 = 5.667 = 5.67 \text{ m (3 s.f.)}$$

**Total displacement** (keeping signs):
$$4.667 - 0.167 + 0.833 = 5.333 = 5.33 \text{ m}$$

*(The two differ by $2\times0.167$ — twice the backwards excursion, as they must.)*
:::

---

## 5. Vectors and calculus (Year 13)

The same relationships hold componentwise for motion in two dimensions.

:::key Vector kinematics
If $\mathbf{r} = x(t)\mathbf{i} + y(t)\mathbf{j}$, then
$$\mathbf{v} = \dot{\mathbf{r}} = \dot x\mathbf{i} + \dot y\mathbf{j} \qquad
\mathbf{a} = \dot{\mathbf{v}} = \ddot x\mathbf{i} + \ddot y\mathbf{j}$$

**Differentiate each component separately.** Same for integration.
:::

Useful conditions:
- **Speed** $= |\mathbf{v}| = \sqrt{\dot x^2 + \dot y^2}$
- **Moving due east** → the $\mathbf{j}$ component of $\mathbf{v}$ is zero (and the $\mathbf{i}$
  component positive)
- **Moving due north** → the $\mathbf{i}$ component of $\mathbf{v}$ is zero
- **At the origin** → both components of $\mathbf{r}$ are zero **at the same time**

:::example Worked example 4 — A particle has position vector $\mathbf{r} = (t^2-4t)\mathbf{i} + (3t - t^2)\mathbf{j}$ metres. Find its speed at $t=1$ and the time at which it moves parallel to $\mathbf{i}$.
**Solution.**
$$\mathbf{v} = (2t-4)\mathbf{i} + (3-2t)\mathbf{j}$$

At $t=1$: $\mathbf{v} = -2\mathbf{i} + \mathbf{j}$, so
$$\text{speed} = \sqrt{4+1} = \sqrt5 = 2.24\text{ m s}^{-1}$$

Moving parallel to $\mathbf{i}$ means the $\mathbf{j}$ component of velocity is zero:
$$3 - 2t = 0 \;\Rightarrow\; t = 1.5 \text{ s}$$

*(Check the $\mathbf{i}$ component there: $2(1.5)-4 = -1 \neq 0$, so the particle really is moving —
parallel to $\mathbf{i}$ but in the negative direction.)*
:::

---

## In the exam

- **Check whether $a$ is constant.** If the question gives $a$ as a function of $t$, SUVAT is
  forbidden — and using it is an instant loss of every mark in the part.
- Constants of integration, and the initial conditions to pin them down.
- "Distance" vs "displacement": look for sign changes in $v$.
- Give units in your answers: m, m s$^{-1}$, m s$^{-2}$.
- For vector questions, work **componentwise** and only combine at the end.
- Maximum/minimum velocity is a stationary point of $v$, so set $a = 0$ — the same technique as P1.12.

---

## Practice

:::question Q1 (4 marks)
A particle moves with displacement $s = t^3 - 6t^2 + 5t$ metres.

(a) Find expressions for $v$ and $a$.

(b) Find the velocity when $t=2$.
:::
:::answer
**(a)**
$$v = \frac{ds}{dt} = 3t^2 - 12t + 5$$
$$a = \frac{dv}{dt} = 6t - 12$$

**(b)** At $t=2$: $v = 12 - 24 + 5 = -7\text{ m s}^{-1}$

*(Negative, so the particle is moving in the negative direction at that instant.)*
:::

:::question Q2 (4 marks)
A particle has velocity $v = 4t - t^2\text{ m s}^{-1}$. Find its maximum velocity and the time at which
it occurs.
:::
:::answer
Maximum velocity is where $\frac{dv}{dt} = 0$, i.e. where $a = 0$:
$$a = 4 - 2t = 0 \;\Rightarrow\; t = 2 \text{ s}$$

$$v_{\max} = 4(2) - 4 = 4\text{ m s}^{-1}$$

*(Confirm it's a maximum: $\frac{d^2v}{dt^2} = -2 < 0$ ✓)*
:::

:::question Q3 (5 marks)
A particle starts from rest at the origin and moves with acceleration $a = 12t - 6\text{ m s}^{-2}$.
Find its displacement when $t = 3$.
:::
:::answer
$$v = \int(12t-6)dt = 6t^2 - 6t + c$$
At $t=0$, $v=0$, so $c=0$:
$$v = 6t^2 - 6t$$

$$s = \int(6t^2-6t)dt = 2t^3 - 3t^2 + k$$
At $t=0$, $s=0$, so $k=0$:
$$s = 2t^3-3t^2$$

At $t=3$: $s = 54 - 27 = 27$ m.
:::

:::question Q4 (6 marks)
A particle moves in a straight line with velocity $v = 3t^2 - 12t + 9\text{ m s}^{-1}$.

(a) Find the times at which the particle is instantaneously at rest.

(b) Find the total distance travelled in the first 4 seconds.
:::
:::answer
**(a)**
$$3t^2 - 12t + 9 = 0 \;\Rightarrow\; t^2 - 4t + 3 = 0 \;\Rightarrow\; (t-1)(t-3) = 0$$
$$t = 1 \text{ s and } t = 3 \text{ s}$$

**(b)** $\displaystyle\int v\,dt = t^3 - 6t^2 + 9t$. Split at $t=1$ and $t=3$.

*0 to 1:* $(1 - 6 + 9) - 0 = 4$

*1 to 3:* $(27 - 54 + 27) - 4 = 0 - 4 = -4$

*3 to 4:* $(64 - 96 + 36) - 0 = 4$

**Total distance** $= |4| + |-4| + |4| = 12$ m.

*(Displacement is $4 - 4 + 4 = 4$ m — the particle ends 4 m from the start having travelled 12 m. A
good illustration of why the two questions need different answers.)*
:::

:::question Q5 (5 marks)
A particle has position vector $\mathbf{r} = (2t^2 - 3t)\mathbf{i} + (t^3 - 4t)\mathbf{j}$ metres.

(a) Find $\mathbf{v}$ and $\mathbf{a}$.

(b) Find the speed at $t=2$.
:::
:::answer
**(a)**
$$\mathbf{v} = (4t-3)\mathbf{i} + (3t^2-4)\mathbf{j}$$
$$\mathbf{a} = 4\mathbf{i} + 6t\mathbf{j}$$

**(b)** At $t=2$: $\mathbf{v} = 5\mathbf{i} + 8\mathbf{j}$

$$\text{speed} = \sqrt{25+64} = \sqrt{89} = 9.43\text{ m s}^{-1} \text{ (3 s.f.)}$$
:::

:::question Q6 (7 marks) — synoptic
A particle of mass 2 kg moves along a straight line under a resultant force
$F = (12 - 6t)$ N at time $t$ seconds. At $t=0$ the particle is at the origin with velocity
$3\text{ m s}^{-1}$.

(a) Find the acceleration as a function of $t$.

(b) Find the velocity as a function of $t$, and the maximum speed.

(c) Find the displacement when the particle first comes to rest.
:::
:::answer
**(a)** By Newton's second law, $F = ma$:
$$a = \frac{F}{m} = \frac{12-6t}{2} = 6 - 3t \text{ m s}^{-2}$$

**(b)**
$$v = \int(6-3t)dt = 6t - \tfrac32t^2 + c$$
At $t=0$, $v=3$, so $c = 3$:
$$v = 3 + 6t - 1.5t^2$$

Maximum when $a = 0$: $6 - 3t = 0 \Rightarrow t = 2$.
$$v_{\max} = 3 + 12 - 6 = 9\text{ m s}^{-1}$$

*(Check it's a maximum: $a$ changes from positive to negative through $t=2$ ✓)*

**(c)** At rest: $3 + 6t - 1.5t^2 = 0$, i.e. $1.5t^2 - 6t - 3 = 0$, or $t^2 - 4t - 2 = 0$:
$$t = \frac{4\pm\sqrt{16+8}}{2} = 2 \pm \sqrt6$$

$t = 4.449$ or $t = -0.449$. **Reject the negative** — time cannot be negative.

$$s = \int_0^{4.449}\left(3+6t-1.5t^2\right)dt = \Big[3t + 3t^2 - 0.5t^3\Big]_0^{4.449}$$
$$= 13.35 + 59.38 - 44.02 = 28.7 \text{ m (3 s.f.)}$$
:::
