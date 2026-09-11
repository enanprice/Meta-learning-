---
title: Constant Acceleration (SUVAT)
code: M2
spec: 7.1–7.3
summary: The five equations of motion, choosing the right one, motion under gravity, and velocity–time graphs.
time: 5 hours
prereq: M1 Modelling in Mechanics
papers: Paper 3 Section B
---

## Why this topic exists

If acceleration is constant, the whole motion is determined by five quantities — and there are five
equations linking them. Every constant-acceleration problem in mechanics is "pick the right equation
and substitute".

Vertical motion under gravity is the headline application, because near the Earth's surface
$g = 9.8\text{ m s}^{-2}$ is (to a very good approximation) constant.

---

## 1. The five equations

:::key SUVAT
| Symbol | Meaning | Unit |
|---|---|---|
| $s$ | displacement | m |
| $u$ | initial velocity | m s$^{-1}$ |
| $v$ | final velocity | m s$^{-1}$ |
| $a$ | acceleration | m s$^{-2}$ |
| $t$ | time | s |

$$v = u + at \qquad\qquad s = ut + \tfrac12 at^2$$
$$s = vt - \tfrac12 at^2 \qquad\qquad s = \tfrac12(u+v)t$$
$$v^2 = u^2 + 2as$$

All five are in the formula booklet. **They are only valid when $a$ is constant.**
:::

:::method Choosing an equation
1. **Write out SUVAT vertically** and fill in the three values you know.
2. Mark the one you want to find.
3. The equation you need is the one that **contains those four letters and not the fifth**.

| Missing quantity | Use |
|---|---|
| $s$ | $v = u+at$ |
| $v$ | $s = ut+\frac12at^2$ |
| $u$ | $s = vt - \frac12 at^2$ |
| $a$ | $s = \frac12(u+v)t$ |
| $t$ | $v^2 = u^2+2as$ |

Doing this explicitly takes ten seconds and eliminates the most common cause of error: reaching for a
familiar equation that doesn't fit.
:::

:::insight Where the equations come from
They aren't five independent facts — they're all consequences of two ideas.

**Acceleration is the rate of change of velocity.** Constant $a$ over time $t$ changes the velocity by
$at$, so $v = u + at$. That's the first equation.

**Displacement is the area under the velocity–time graph.** With constant acceleration that graph is a
straight line, so the shape is a **trapezium** with parallel sides $u$ and $v$ and width $t$:
$$s = \tfrac12(u+v)t$$
That's the fourth.

Substituting $v = u+at$ into that gives $s = ut + \frac12at^2$; eliminating $t$ instead gives
$v^2 = u^2+2as$. Every equation is one of those two with a substitution.
:::

:::example Worked example 1 — A car accelerates uniformly from $4\text{ m s}^{-1}$ at $2.5\text{ m s}^{-2}$ for 6 seconds. Find its final speed and the distance travelled.
**Solution.**

$$u = 4, \quad a = 2.5, \quad t = 6, \quad v = ?, \quad s = ?$$

*Final speed* (missing $s$, so use $v = u+at$):
$$v = 4 + 2.5(6) = 19\text{ m s}^{-1}$$

*Distance* (missing $v$, so use $s = ut + \frac12at^2$):
$$s = 4(6) + \tfrac12(2.5)(36) = 24 + 45 = 69 \text{ m}$$

*(Check with the trapezium formula: $s = \frac12(4+19)(6) = \frac12(23)(6) = 69$ ✓ — two routes
agreeing is the cheapest check in mechanics.)*
:::

---

## 2. Motion under gravity

:::key Vertical motion
Take $a = \pm g$ with $g = 9.8\text{ m s}^{-2}$, and **decide a positive direction before you start**.

If **upwards is positive**: $a = -9.8$ (gravity acts downwards), upward velocities are positive,
downward displacements are negative.

At the **highest point**, $v = 0$ — that's the condition that unlocks most "maximum height" questions.
:::

:::warning Sign conventions
The commonest mechanics error, by a distance, is mixing signs partway through.

Pick a direction, write it down ("taking upwards as positive"), and then **every** quantity gets a
sign consistent with that choice. A ball thrown up and landing 3 m *below* its launch point has
$s = -3$, not $+3$.

Examiners give a mark for stating the convention. Take it.
:::

:::example Worked example 2 — A ball is thrown vertically upwards at $20\text{ m s}^{-1}$ from a height of 15 m above the ground. Find (a) the maximum height above the ground, (b) the time until it hits the ground.
**Solution.**

Take **upwards as positive**, with the origin at the point of projection. Then $a = -9.8$ throughout.

**(a)** At the maximum height, $v = 0$.

$u = 20$, $v=0$, $a=-9.8$, want $s$ (missing $t$, so use $v^2 = u^2+2as$):
$$0 = 400 + 2(-9.8)s \;\Rightarrow\; s = \frac{400}{19.6} = 20.41 \text{ m above the launch point}$$

Height above the **ground** $= 20.41 + 15 = 35.4 = 35 \text{ m (2 s.f.)}$

**(b)** The ball hits the ground when it is **15 m below** the launch point, so $s = -15$.

$u=20$, $a=-9.8$, $s=-15$, want $t$ (missing $v$, so use $s = ut+\frac12at^2$):
$$-15 = 20t - 4.9t^2$$
$$4.9t^2 - 20t - 15 = 0$$

$$t = \frac{20 \pm \sqrt{400 + 4(4.9)(15)}}{9.8} = \frac{20\pm\sqrt{694}}{9.8}$$

$$t = 4.729 \quad\text{or}\quad t = -0.647$$

**Reject the negative root** — time cannot be negative before the ball is thrown.

$$t = 4.7 \text{ s (2 s.f.)}$$
:::

:::exam Why you always get two roots — and what they mean
The quadratic has two solutions because the mathematics doesn't know the ball didn't exist before
$t=0$. The negative root is where the parabola *would have* been at ground level if the motion had
started earlier.

Reject it, **and say why** ("time cannot be negative"). That's a mark.

Two **positive** roots can also occur — for instance, asking when the ball is at a height of 10 m gives
two answers: once on the way up and once on the way down. Both are valid then, and the question will
usually tell you which it wants.
:::

---

## 3. Velocity–time graphs

:::key Reading a $v$–$t$ graph
- **Gradient** = acceleration.
- **Area under the graph** = displacement.
- A horizontal line = constant velocity (zero acceleration).
- A line below the axis = motion in the negative direction.
- For **distance travelled**, take the area below the axis as positive too. For **displacement**, keep
  the signs.
:::

:::method Multi-stage journeys
Most $v$–$t$ questions have three stages: accelerate, constant speed, decelerate. Split the graph into
a triangle, a rectangle and a triangle, find each area, and add.

For "find the total distance", this is usually much faster than three separate SUVAT calculations.
:::

:::example Worked example 3 — A train accelerates uniformly from rest at $2\text{ m s}^{-2}$ for 8 s, travels at constant speed for 20 s, then decelerates uniformly to rest in 5 s. Find the total distance and the average speed.
**Solution.**

*Maximum speed:* $v = 0 + 2(8) = 16\text{ m s}^{-1}$.

The $v$–$t$ graph is a trapezium. Split it:

- **Acceleration (triangle):** $\frac12 \times 8 \times 16 = 64$ m
- **Constant speed (rectangle):** $16 \times 20 = 320$ m
- **Deceleration (triangle):** $\frac12\times5\times16 = 40$ m

$$\text{Total distance} = 64+320+40 = 424 \text{ m}$$

*Total time* $= 8+20+5 = 33$ s.

$$\text{Average speed} = \frac{424}{33} = 12.8 \text{ m s}^{-1} \text{ (3 s.f.)}$$

*(Sanity check: the average must lie between 0 and the maximum of 16, and closer to 16 since most of
the journey is at top speed ✓)*
:::

:::warning Average speed is not the average of the speeds
$\text{Average speed} = \dfrac{\text{total distance}}{\text{total time}}$.

It is **not** $\frac{u+v}{2}$ unless the acceleration is constant throughout the whole journey — which
in a multi-stage problem it isn't.
:::

---

## In the exam

- **List SUVAT** and fill in what you know. Every time. It's the single habit that most improves
  mechanics marks.
- State your positive direction.
- Give answers to **2 s.f.** when $g$ is used.
- Reject impossible roots **with a reason**.
- For a $v$–$t$ graph, label the axes with units and mark key values.
- If two objects are involved (one chasing another, two balls thrown at different times), set up SUVAT
  **separately for each**, using a common time variable, then equate displacements.

---

## Practice

:::question Q1 (3 marks)
A stone is dropped from rest from a height of 45 m. Find the time it takes to reach the ground and its
speed on impact.
:::
:::answer
Taking **downwards as positive**: $u=0$, $a = 9.8$, $s = 45$.

*Time* (missing $v$): $s = ut+\frac12at^2$
$$45 = 0 + 4.9t^2 \;\Rightarrow\; t^2 = 9.1837 \;\Rightarrow\; t = 3.03 = 3.0 \text{ s (2 s.f.)}$$

*Speed* (missing $t$): $v^2 = u^2+2as = 0 + 2(9.8)(45) = 882$
$$v = 29.7 = 30 \text{ m s}^{-1} \text{ (2 s.f.)}$$
:::

:::question Q2 (4 marks)
A train travelling at $30\text{ m s}^{-1}$ decelerates uniformly to $10\text{ m s}^{-1}$ over a distance
of 400 m. Find the deceleration and the time taken.
:::
:::answer
$u = 30$, $v = 10$, $s = 400$.

*Acceleration* (missing $t$): $v^2 = u^2+2as$
$$100 = 900 + 800a \;\Rightarrow\; a = \frac{-800}{800} = -1\text{ m s}^{-2}$$

So the deceleration is $1\text{ m s}^{-2}$.

*Time* (missing $a$): $s = \frac12(u+v)t$
$$400 = \tfrac12(40)t = 20t \;\Rightarrow\; t = 20 \text{ s}$$
:::

:::question Q3 (5 marks)
A ball is thrown vertically upwards with speed $14\text{ m s}^{-1}$ from ground level.

(a) Find the maximum height reached.

(b) Find the total time the ball is in the air.

(c) Find the times at which the ball is 5 m above the ground.
:::
:::answer
Take upwards as positive: $u = 14$, $a = -9.8$.

**(a)** At the top, $v=0$:
$$0 = 196 + 2(-9.8)s \;\Rightarrow\; s = \frac{196}{19.6} = 10 \text{ m}$$

**(b)** Returns to ground when $s=0$:
$$0 = 14t - 4.9t^2 = t(14 - 4.9t)$$
$$t = 0 \text{ (launch)} \quad\text{or}\quad t = \frac{14}{4.9} = 2.857 = 2.9 \text{ s (2 s.f.)}$$

**(c)** $s = 5$:
$$5 = 14t - 4.9t^2 \;\Rightarrow\; 4.9t^2 - 14t + 5 = 0$$
$$t = \frac{14\pm\sqrt{196 - 98}}{9.8} = \frac{14\pm\sqrt{98}}{9.8}$$
$$t = 0.4184 \quad\text{or}\quad t = 2.439$$

$$t = 0.42 \text{ s (on the way up)} \quad\text{and}\quad t = 2.4 \text{ s (on the way down)}$$

*(Both roots are valid here — the ball passes 5 m twice. Note they're symmetric about the time of
maximum height, $\frac{14}{9.8} = 1.43$ s ✓)*
:::

:::question Q4 (5 marks)
A cyclist accelerates from rest at $1.5\text{ m s}^{-2}$ for 12 s, then travels at constant speed for
$T$ seconds, then decelerates uniformly to rest at $3\text{ m s}^{-2}$.

The total distance is 500 m. Find $T$.
:::
:::answer
*Maximum speed:* $v = 1.5(12) = 18\text{ m s}^{-1}$.

*Acceleration phase:* $s_1 = \frac12(12)(18) = 108$ m.

*Deceleration phase:* time $= \frac{18}{3} = 6$ s, so $s_3 = \frac12(6)(18) = 54$ m.

*Constant phase:* $s_2 = 18T$.

$$108 + 18T + 54 = 500$$
$$18T = 338 \;\Rightarrow\; T = 18.8 \text{ s (3 s.f.)}$$
:::

:::question Q5 (6 marks) — synoptic
A ball $A$ is dropped from rest from the top of a tower 40 m high. At the same instant, a ball $B$ is
thrown vertically upwards from the base of the tower at $20\text{ m s}^{-1}$.

(a) Find the time at which they meet.

(b) Find the height above the ground at which they meet.
:::
:::answer
Take **upwards as positive**, origin at the ground.

*Ball $A$* (starts at 40 m, $u=0$): height $= 40 - 4.9t^2$

*Ball $B$* (starts at 0, $u = 20$): height $= 20t - 4.9t^2$

**(a)** They meet when the heights are equal:
$$40 - 4.9t^2 = 20t - 4.9t^2$$

The $4.9t^2$ terms **cancel**:
$$40 = 20t \;\Rightarrow\; t = 2 \text{ s}$$

**(b)** Substitute into either expression:
$$h = 20(2) - 4.9(4) = 40 - 19.6 = 20.4 = 20 \text{ m (2 s.f.)}$$

*(Check with ball $A$: $40 - 4.9(4) = 40 - 19.6 = 20.4$ ✓)*

*(The cancellation in part (a) is worth pausing over: both balls are accelerating downwards at exactly
the same rate, so **relative to each other** gravity has no effect at all — $B$ closes the 40 m gap at
a steady $20\text{ m s}^{-1}$. That relative-motion view gives the answer in one line.)*
:::

:::question Q6 (6 marks) — stretch
A particle moves in a straight line with constant acceleration. It passes point $A$ with speed
$u\text{ m s}^{-1}$, and 4 s later passes point $B$, 48 m from $A$. A further 6 s later it passes point
$C$, 150 m from $B$.

Find $u$ and the acceleration.
:::
:::answer
*From $A$ to $B$:* $s = 48$, $t = 4$:
$$48 = 4u + \tfrac12 a(16) = 4u + 8a \qquad (1)$$

*From $A$ to $C$:* $s = 48 + 150 = 198$, $t = 4+6 = 10$:
$$198 = 10u + \tfrac12 a(100) = 10u + 50a \qquad (2)$$

*(Using $A$ as the start for both is much easier than trying to use $B$ as a new starting point with an
unknown velocity.)*

From (1): $u = \frac{48 - 8a}{4} = 12 - 2a$.

Substitute into (2):
$$198 = 10(12-2a) + 50a = 120 - 20a + 50a = 120 + 30a$$
$$30a = 78 \;\Rightarrow\; a = 2.6 \text{ m s}^{-2}$$

$$u = 12 - 2(2.6) = 6.8\text{ m s}^{-1}$$

**Check:** $A$ to $B$: $4(6.8) + 8(2.6) = 27.2 + 20.8 = 48$ ✓
$A$ to $C$: $10(6.8) + 50(2.6) = 68 + 130 = 198$ ✓
:::
