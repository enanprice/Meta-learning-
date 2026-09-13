---
title: Applications of Forces
code: M8
spec: 8.1–8.5
summary: Equilibrium with forces at angles, connected particles on slopes, pulleys with inclined planes, and static rigid bodies.
time: 5 hours
prereq: M6 Friction and Inclined Planes, M5 Moments
papers: Paper 3 Section B
---

## Why this topic exists

This is where everything in mechanics comes together. A typical A2 question puts a particle on a rough
slope, connects it over a pulley to a hanging mass, and asks for the acceleration and tension — which
needs resolving, friction, Newton's second law and connected-particle reasoning all at once.

There's nothing genuinely new here. What's new is the **combination**, and the discipline required to
keep track of which forces act on which object.

---

## 1. Equilibrium with forces at angles

:::key The equilibrium conditions
A particle in equilibrium has **zero resultant force**, so resolving in **any two perpendicular
directions** gives two equations:
$$\sum F_x = 0 \qquad \sum F_y = 0$$
:::

:::method Choosing your directions
You may resolve in any two perpendicular directions — pick the ones that make the algebra easiest.

- Forces mostly horizontal and vertical → resolve horizontally and vertically.
- Anything on a slope → resolve **parallel and perpendicular to the slope**.
- If one unknown force acts in a known direction, resolving **perpendicular to it** eliminates it from
  that equation entirely.

That last trick is the same idea as taking moments about an unknown force in M5: choose the direction
that kills the thing you don't want.
:::

:::example Worked example 1 — A particle of weight 50 N hangs in equilibrium supported by two light strings, one at $30°$ and the other at $45°$ to the horizontal, on opposite sides. Find the tensions.
**Solution.**

Let $T_1$ be the tension in the $30°$ string and $T_2$ in the $45°$ string.

**Resolve horizontally** (the two horizontal components must balance):
$$T_1\cos30° = T_2\cos45° \qquad (1)$$

**Resolve vertically** (the two upward components support the weight):
$$T_1\sin30° + T_2\sin45° = 50 \qquad (2)$$

From (1): $T_2 = \dfrac{T_1\cos30°}{\cos45°} = T_1 \times \dfrac{0.8660}{0.7071} = 1.2247T_1$

Substituting into (2):
$$0.5T_1 + 0.7071(1.2247T_1) = 50$$
$$0.5T_1 + 0.8660T_1 = 50$$
$$1.3660T_1 = 50 \;\Rightarrow\; T_1 = 36.6 \text{ N}$$
$$T_2 = 1.2247\times36.60 = 44.8 \text{ N}$$

**Check vertically:** $36.60(0.5) + 44.83(0.7071) = 18.30 + 31.70 = 50.0$ ✓

*(Note $T_2 > T_1$: the string closer to the vertical carries more of the weight. Worth using as a
plausibility check.)*
:::

---

## 2. Connected particles on a slope

The classic A2 setup: one mass on a slope, connected over a pulley at the top, to a mass hanging
vertically.

:::method The slope-and-pulley procedure
1. **Decide which way the system moves.** Compare the hanging weight $m_2g$ with the down-slope
   component $m_1g\sin\theta$ (plus friction, if rough). Whichever is bigger wins.
2. **Draw two separate force diagrams**, one per particle.
3. For the particle on the slope: resolve **perpendicular** to find $R$, then **parallel** for $F=ma$.
4. For the hanging particle: resolve **vertically**.
5. Solve the two equations simultaneously — adding them usually eliminates $T$.
6. Find $T$ from either single equation.

**Take the direction of motion as positive for each particle separately**, exactly as in M3.
:::

:::example Worked example 2 — A particle $A$ of mass 4 kg rests on a smooth plane inclined at $30°$. It is connected by a light inextensible string over a smooth pulley at the top of the plane to a particle $B$ of mass 6 kg hanging freely. Find the acceleration and the tension.
**Solution.**

*Which way?* Down-slope pull from $A$: $4g\sin30° = 19.6$ N. Hanging weight of $B$: $6g = 58.8$ N.
$B$ is heavier, so **$B$ descends and $A$ moves up the slope**.

**For $B$** (taking downwards as positive):
$$6g - T = 6a \;\Rightarrow\; 58.8 - T = 6a \qquad (1)$$

**For $A$** (taking up the slope as positive; the plane is smooth, so no friction):
$$T - 4g\sin30° = 4a \;\Rightarrow\; T - 19.6 = 4a \qquad (2)$$

Adding (1) and (2) — $T$ cancels:
$$58.8 - 19.6 = 10a$$
$$39.2 = 10a \;\Rightarrow\; a = 3.92 = 3.9\text{ m s}^{-2}$$

From (2):
$$T = 19.6 + 4(3.92) = 19.6 + 15.68 = 35.28 = 35 \text{ N (2 s.f.)}$$

**Check:** $T$ should lie between $19.6$ N and $58.8$ N ✓
:::

:::example Worked example 3 — The same system, but the plane is **rough** with $\mu = 0.2$.
**Solution.**

**Perpendicular to the slope** (for $A$):
$$R = 4g\cos30° = 39.2\times0.8660 = 33.95 \text{ N}$$
$$F = \mu R = 0.2\times33.95 = 6.790 \text{ N}$$

$A$ moves **up** the slope, so friction acts **down** the slope.

**For $B$:**
$$58.8 - T = 6a \qquad (1)$$

**For $A$** (up the slope positive; both weight component and friction oppose):
$$T - 19.6 - 6.790 = 4a \qquad (2)$$

Adding:
$$58.8 - 19.6 - 6.790 = 10a$$
$$32.41 = 10a \;\Rightarrow\; a = 3.241 = 3.2\text{ m s}^{-2}$$

From (2):
$$T = 19.6 + 6.790 + 4(3.241) = 39.35 = 39 \text{ N (2 s.f.)}$$

*(Friction has reduced the acceleration from 3.92 to 3.24 and raised the tension from 35.3 to 39.4 —
both in the direction you'd expect ✓)*
:::

:::warning Friction direction depends on the direction of motion
In Worked example 3, $A$ moves **up** the slope, so friction acts **down** it.

If the hanging mass were light enough that $A$ slid **down** instead, friction would act **up** the
slope and the equations would change. **Work out the direction of motion before you draw the friction
arrow** — it is not automatically "down the slope".

If the question asks whether the system moves at all, compare the driving force with the **maximum**
friction, exactly as in M6.
:::

---

## 3. Two particles connected on a horizontal surface

Same logic, simpler geometry. Both particles share the acceleration; the string tension is internal.

:::key The system shortcut, restated
For the **acceleration**: treat everything as one object and ignore the tension.
$$\text{net external force} = (\text{total mass})\times a$$

For the **tension**: apply $F = ma$ to **one** particle only.
:::

---

## 4. Static rigid bodies — ladders

A ladder resting against a wall combines moments (M5) with friction (M6). It's the standard hard
question.

:::method The ladder procedure
1. Draw the ladder with **all four** kinds of force: weight (at the midpoint if uniform), normal
   reaction from the **ground** (vertical), normal reaction from the **wall** (horizontal), and
   friction at the ground (horizontal, pointing **towards** the wall, since the base tends to slide
   away).
2. If the wall is smooth, there is **no friction at the wall** — that's usually stated and it's what
   makes the problem solvable.
3. **Resolve vertically:** $R_{\text{ground}} = $ total weight.
4. **Resolve horizontally:** $F = R_{\text{wall}}$.
5. **Take moments about the base** — this eliminates both $R_{\text{ground}}$ and $F$ at once.
6. "On the point of slipping" ⟹ $F = \mu R_{\text{ground}}$.
:::

:::insight Why taking moments about the base is the key move
Two of the four forces (the ground reaction and the friction) act at the base, so both have zero moment
about it. One equation, one unknown ($R_{\text{wall}}$), solved immediately.

Then horizontal resolution gives $F$, vertical resolution gives $R_{\text{ground}}$, and the friction
condition ties them together. Four unknowns, three equations plus the friction law — it always works
out, and always in that order.
:::

---

## In the exam

- **One force diagram per object.** Two connected particles need two diagrams, not one.
- State which way the system moves and why, before writing equations.
- Resolve **parallel and perpendicular to the slope** for anything on an incline.
- Check plausibility: tension between the two weights; acceleration less than $g$; a normal reaction
  that makes sense.
- For equilibrium, "resolve in two perpendicular directions" gives exactly two equations — if you have
  three unknowns you need moments as well.
- 2 s.f. when $g$ is used.

---

## Practice

:::question Q1 (5 marks)
A particle of weight 80 N hangs in equilibrium from two light strings making angles of $40°$ and $55°$
with the horizontal, on opposite sides. Find the tension in each string.
:::
:::answer
Let $T_1$ be in the $40°$ string, $T_2$ in the $55°$ string.

**Horizontally:** $T_1\cos40° = T_2\cos55°$, so $T_1(0.7660) = T_2(0.5736)$ and $T_1 = 0.7488T_2$.

**Vertically:** $T_1\sin40° + T_2\sin55° = 80$
$$0.7488T_2(0.6428) + T_2(0.8192) = 80$$
$$0.4813T_2 + 0.8192T_2 = 80$$
$$1.3005T_2 = 80 \;\Rightarrow\; T_2 = 61.5 \text{ N}$$
$$T_1 = 0.7488\times61.51 = 46.1 \text{ N}$$

*(The steeper string carries more — as expected.)*
:::

:::question Q2 (6 marks)
A particle $P$ of mass 3 kg rests on a smooth plane inclined at $40°$, connected by a light
inextensible string over a smooth pulley to a particle $Q$ of mass 5 kg hanging freely.

Find the acceleration of the system and the tension in the string.
:::
:::answer
Down-slope pull from $P$: $3g\sin40° = 29.4\times0.6428 = 18.90$ N.
Weight of $Q$: $5g = 49$ N. $Q$ is heavier, so $Q$ descends.

**For $Q$** (down positive): $49 - T = 5a$
**For $P$** (up the slope positive): $T - 18.90 = 3a$

Adding: $49 - 18.90 = 8a$, so
$$a = \frac{30.10}{8} = 3.762 = 3.8\text{ m s}^{-2}$$

$$T = 18.90 + 3(3.762) = 30.2 = 30 \text{ N (2 s.f.)}$$
:::

:::question Q3 (7 marks)
A block of mass 5 kg lies on a rough plane inclined at $25°$ with $\mu = 0.3$. It is connected by a
light inextensible string over a smooth pulley at the top of the plane to a mass of 7 kg hanging
freely.

(a) Show that the system moves.

(b) Find the acceleration and the tension.
:::
:::answer
**(a)** Forces resisting motion (if the 7 kg mass is to descend, the block must move **up** the slope):

$$R = 5g\cos25° = 49\times0.9063 = 44.41 \text{ N}$$
$$F_{\max} = 0.3\times44.41 = 13.32 \text{ N}$$
$$5g\sin25° = 49\times0.4226 = 20.71 \text{ N}$$

Total resistance $= 20.71 + 13.32 = 34.03$ N.

Driving force $= 7g = 68.6$ N.

Since $68.6 > 34.03$, the driving force exceeds the maximum resistance, so **the system moves**.
$\blacksquare$

**(b)** **For the 7 kg mass** (down positive): $68.6 - T = 7a$

**For the 5 kg block** (up the slope positive): $T - 20.71 - 13.32 = 5a$

Adding: $68.6 - 34.03 = 12a$, so
$$a = \frac{34.57}{12} = 2.881 = 2.9\text{ m s}^{-2}$$

$$T = 20.71 + 13.32 + 5(2.881) = 48.4 = 48 \text{ N (2 s.f.)}$$
:::

:::question Q4 (5 marks)
Two particles of mass 3 kg and 5 kg are connected by a light inextensible string and lie on a rough
horizontal surface with $\mu = 0.25$. A horizontal force of 40 N is applied to the 5 kg particle, in the
direction away from the 3 kg particle.

Find the acceleration and the tension.
:::
:::answer
**Whole system** (total mass 8 kg):

Total normal reaction $= 8g = 78.4$ N, so total friction $= 0.25\times78.4 = 19.6$ N.

$$40 - 19.6 = 8a \;\Rightarrow\; a = \frac{20.4}{8} = 2.55 = 2.6\text{ m s}^{-2}$$

**The 3 kg particle alone** (pulled only by the tension, resisted by its own friction):

$$R_3 = 3g = 29.4, \qquad F_3 = 0.25\times29.4 = 7.35 \text{ N}$$
$$T - 7.35 = 3(2.55) = 7.65$$
$$T = 15.0 = 15 \text{ N}$$

**Check with the 5 kg particle:** $F_5 = 0.25\times49 = 12.25$ N, and
$40 - 12.25 - 15.0 = 12.75 = 5(2.55)$ ✓
:::

:::question Q5 (7 marks) — synoptic
A uniform ladder $AB$ of mass 20 kg and length 4 m rests with $A$ on rough horizontal ground and $B$
against a smooth vertical wall. The ladder makes an angle of $60°$ with the ground and is on the point
of slipping.

(a) Find the normal reaction at the wall.

(b) Find the coefficient of friction between the ladder and the ground.
:::
:::answer
Forces: weight $20g = 196$ N at the midpoint (2 m along the ladder); $R_A$ vertical at the base;
$F$ horizontal at the base, towards the wall; $N_B$ horizontal at the wall (smooth, so no friction
there).

**(a) Moments about $A$** — this eliminates both $R_A$ and $F$.

The wall reaction $N_B$ acts horizontally at $B$, whose height above $A$ is $4\sin60° = 3.464$ m, so
its moment is $N_B \times 3.464$.

The weight acts vertically at the midpoint, whose horizontal distance from $A$ is
$2\cos60° = 1$ m, so its moment is $196\times1 = 196$ N m.

$$N_B\times3.464 = 196$$
$$N_B = 56.58 = 57 \text{ N (2 s.f.)}$$

**(b) Resolve horizontally:** $F = N_B = 56.58$ N.

**Resolve vertically:** $R_A = 196$ N.

On the point of slipping, $F = \mu R_A$:
$$\mu = \frac{56.58}{196} = 0.2887 = 0.29 \text{ (2 s.f.)}$$

*(Neat result worth noticing: $\mu = \frac{1}{2\tan60°} = \frac{1}{2\sqrt3} = 0.2887$. For a uniform
ladder against a smooth wall, the mass always cancels and $\mu = \frac{1}{2\tan\theta}$ — so the
critical angle depends only on the friction, not on how heavy the ladder or the person on it is. That
generalisation is a common "show that" part.)*
:::
