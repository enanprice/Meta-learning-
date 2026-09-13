---
title: Forces and Newton's Laws
code: M3
spec: 8.1–8.3
summary: Newton's three laws, force diagrams, equilibrium, connected particles, pulleys and lifts.
time: 5 hours
prereq: M2 Constant Acceleration
papers: Paper 3 Section B
---

## Why this topic exists

SUVAT tells you what happens *given* an acceleration. Newton's second law tells you **where the
acceleration comes from**: forces.

$F = ma$ is one of the most consequential equations ever written. In this course it's the tool for
every problem involving lifts, tow ropes, pulleys, and objects on surfaces.

---

## 1. Newton's three laws

:::key The laws
**First law:** an object remains at rest, or moves with constant velocity, unless acted on by a
**resultant** force.

**Second law:** $F = ma$, where $F$ is the **resultant** force, in the direction of the acceleration.

**Third law:** for every action there is an **equal and opposite** reaction.
:::

:::insight What the first law actually says
It says that **constant velocity needs no force**. That's counterintuitive, because everyday
experience says a pushed box stops when you stop pushing — but that's friction doing the stopping, not
an absence of push.

Practically, the first law is how you handle **equilibrium**: if an object is at rest *or* moving at
constant velocity, the resultant force is **zero**. Both cases, same conclusion. Questions exploit
this: "a lift moving upwards at constant speed" is an equilibrium problem, not an acceleration one.
:::

:::warning The third law pairs act on *different* objects
"Equal and opposite" forces in a third-law pair never cancel, because they act on two different bodies.
The Earth pulls the book down; the book pulls the Earth up. The table pushes the book up; the book
pushes the table down.

The forces that cancel in an equilibrium problem (the book's weight and the table's normal reaction)
are **not** a third-law pair — they both act on the book. Getting this muddled is a classic
misconception and examiners test it.
:::

---

## 2. Force diagrams and resolving

:::method Every mechanics problem, same first three steps
1. **Draw a diagram** with every force labelled, arrows in the right directions.
2. **Mark the acceleration** with a separate (often double-headed) arrow, and **write down your
   positive direction**.
3. **Apply $F = ma$** in each direction, taking forces in the positive direction as positive:
   $$\text{(forces with the acceleration)} - \text{(forces against it)} = ma$$
:::

For an object in equilibrium, $a = 0$, so:
$$\text{forces up} = \text{forces down}, \qquad \text{forces left} = \text{forces right}$$

:::example Worked example 1 — A particle of mass 5 kg is pulled along a rough horizontal surface by a horizontal force of 30 N. The frictional force is 12 N. Find the acceleration.
**Solution.**

*Horizontally*, taking the direction of motion as positive:
$$30 - 12 = 5a$$
$$18 = 5a \;\Rightarrow\; a = 3.6\text{ m s}^{-2}$$

*Vertically* (no vertical acceleration):
$$R = mg = 5\times9.8 = 49 \text{ N}$$
:::

---

## 3. Lifts

The classic "apparent weight" problem — and the best way to understand what $R$ really is.

:::example Worked example 2 — A person of mass 70 kg stands in a lift. Find the normal reaction from the floor when the lift (a) accelerates upwards at $1.5\text{ m s}^{-2}$, (b) moves at constant speed, (c) accelerates downwards at $2\text{ m s}^{-2}$.
**Solution.**

Forces on the person: weight $mg = 70\times9.8 = 686$ N down, normal reaction $R$ up.

**(a) Accelerating upwards** — take **up** as positive, $a = 1.5$:
$$R - 686 = 70(1.5) = 105$$
$$R = 791 = 790 \text{ N (2 s.f.)}$$

**(b) Constant speed** — $a = 0$ (equilibrium):
$$R = 686 = 690 \text{ N (2 s.f.)}$$

**(c) Accelerating downwards** — with up still positive, $a = -2$:
$$R - 686 = 70(-2) = -140$$
$$R = 546 = 550 \text{ N (2 s.f.)}$$
:::

:::insight Why you "feel heavier" in an accelerating lift
Your mass never changes; your weight never changes. What changes is $R$, the force the floor pushes
back with — and that's the force your legs and inner ear actually detect.

Accelerating upwards, the floor must push *harder* than your weight to produce that upward
acceleration, so $R > mg$ and you feel heavier. Accelerating downwards, the floor pushes *less*, so
you feel lighter. In free fall, $R = 0$ entirely — that's weightlessness, and it's why astronauts in
orbit float despite gravity being almost as strong up there.
:::

---

## 4. Connected particles

Two or more objects joined by a string or in contact. The key insight:

:::key The two equations
Because the string is **inextensible**, both objects have the **same acceleration**.

You get two equations — one per object — with two unknowns ($a$ and $T$). Solve simultaneously.

**Shortcut for the acceleration:** treating the whole system as one object, the internal tensions
cancel, so
$$\text{total external driving force} - \text{total resistance} = (\text{total mass})\times a$$
That gives $a$ in one line. Then use **one** object's equation to find $T$.
:::

:::warning Tension is internal — use a single object to find it
The whole-system equation gives $a$ but **never** gives $T$, because the tension cancels out of it. To
find the tension you must write $F = ma$ for **one** of the objects on its own.

Pick whichever object has fewer forces on it — usually the trailer, or the hanging mass.
:::

:::figure pulley-system
Two objects, two equations. The tension is the same throughout because the string is light and the
pulley smooth, and the accelerations have equal magnitude because the string is inextensible.
:::

:::example Worked example 3 — A car of mass 1200 kg tows a trailer of mass 400 kg. The engine provides a driving force of 3000 N. Resistances are 600 N on the car and 200 N on the trailer. Find the acceleration and the tension in the tow bar.
**Solution.**

**Whole system** (total mass 1600 kg):
$$3000 - 600 - 200 = 1600a$$
$$2200 = 1600a \;\Rightarrow\; a = 1.375 = 1.4\text{ m s}^{-2}$$

**Trailer alone** (forces: tension $T$ forwards, resistance 200 N backwards):
$$T - 200 = 400(1.375) = 550$$
$$T = 750 \text{ N}$$

**Check using the car alone:** $3000 - 600 - T = 1200(1.375) = 1650$, so
$T = 3000 - 600 - 1650 = 750$ ✓
:::

---

## 5. Pulleys

A light inextensible string over a smooth pulley, with masses hanging either side.

:::key The setup
- The **tension is the same** throughout (light string, smooth pulley).
- The **magnitude of acceleration is the same** for both masses — but they move in **opposite
  directions**.
- Take the direction of motion as positive **for each mass separately**: the heavier mass accelerates
  downwards, the lighter one upwards.
:::

:::example Worked example 4 — Masses of 3 kg and 5 kg hang either side of a smooth pulley on a light inextensible string, and are released from rest. Find the acceleration and the tension.
**Solution.**

The 5 kg mass is heavier, so it moves **down** and the 3 kg mass moves **up**.

*For the 5 kg mass* (taking downwards as positive for this mass):
$$5g - T = 5a \;\Rightarrow\; 49 - T = 5a \qquad (1)$$

*For the 3 kg mass* (taking upwards as positive for this mass):
$$T - 3g = 3a \;\Rightarrow\; T - 29.4 = 3a \qquad (2)$$

Adding (1) and (2) — the tension cancels:
$$49 - 29.4 = 8a$$
$$19.6 = 8a \;\Rightarrow\; a = 2.45 = 2.5\text{ m s}^{-2}$$

Substitute into (2):
$$T = 29.4 + 3(2.45) = 29.4 + 7.35 = 36.75 = 37 \text{ N}$$

**Sanity check:** the tension must lie **between** the two weights, $29.4$ N and $49$ N — and it does.
If your tension is bigger than the heavier weight or smaller than the lighter one, something's wrong.
:::

:::exam The force on the pulley
A common follow-up: "find the force exerted on the pulley by the string."

The string pulls **down on both sides** with force $T$, so the total force on the pulley is $2T$,
acting **vertically downwards** (for a pulley with both string sections vertical).

Here that's $2 \times 36.75 = 73.5 = 74$ N downwards. Note it is **not** the total weight $8g = 78.4$ N
— the system is accelerating, so it's less.
:::

---

## In the exam

- **Diagram first.** Always. With every force labelled and the acceleration marked.
- State your positive direction, and be consistent.
- For connected particles: whole system for $a$, single object for $T$.
- Answers to **2 s.f.** when $g$ is used.
- Check plausibility: a tension between the two weights; a normal reaction bigger than $mg$ when
  accelerating upwards; an acceleration smaller than $g$ for a pulley system.
- If the string goes slack or an object hits the ground, the motion **changes** at that moment — treat
  it as a new problem with new initial conditions (typically: the object continues as a projectile
  under gravity alone).

---

## Practice

:::question Q1 (3 marks)
A box of mass 8 kg is pushed along a smooth horizontal floor by a horizontal force of 20 N. Find the
acceleration and the normal reaction.
:::
:::answer
*Horizontally* (smooth, so no friction):
$$20 = 8a \;\Rightarrow\; a = 2.5\text{ m s}^{-2}$$

*Vertically* (equilibrium):
$$R = 8 \times 9.8 = 78.4 = 78 \text{ N (2 s.f.)}$$
:::

:::question Q2 (4 marks)
A woman of mass 60 kg stands in a lift accelerating downwards at $1.2\text{ m s}^{-2}$. Find the normal
reaction from the floor, and state whether she feels heavier or lighter than normal.
:::
:::answer
Taking **downwards as positive**:
$$60g - R = 60(1.2)$$
$$588 - R = 72$$
$$R = 516 = 520 \text{ N (2 s.f.)}$$

Her actual weight is $588$ N, so $R < mg$: she feels **lighter** than normal, because the floor is
pushing up on her with less force than usual.
:::

:::question Q3 (5 marks)
A car of mass 900 kg tows a caravan of mass 600 kg. The total resistance is 750 N on the car and 450 N
on the caravan. The system accelerates at $0.8\text{ m s}^{-2}$.

Find the driving force of the engine and the tension in the tow bar.
:::
:::answer
**Whole system** (total mass 1500 kg):
$$D - 750 - 450 = 1500(0.8) = 1200$$
$$D = 1200 + 1200 = 2400 \text{ N}$$

**Caravan alone:**
$$T - 450 = 600(0.8) = 480$$
$$T = 930 \text{ N}$$

**Check with the car:** $2400 - 750 - 930 = 720 = 900(0.8)$ ✓
:::

:::question Q4 (5 marks)
Masses of 2 kg and 7 kg are connected by a light inextensible string over a smooth pulley and released
from rest. Find (a) the acceleration, (b) the tension, (c) the force on the pulley.
:::
:::answer
**(a)** *7 kg mass (down positive):* $7g - T = 7a \Rightarrow 68.6 - T = 7a$
*2 kg mass (up positive):* $T - 2g = 2a \Rightarrow T - 19.6 = 2a$

Adding: $68.6 - 19.6 = 9a$, so $49 = 9a$ and
$$a = 5.444 = 5.4\text{ m s}^{-2}$$

**(b)** $T = 19.6 + 2(5.444) = 19.6 + 10.89 = 30.5 = 30 \text{ N (2 s.f.)}$

*(Check: $T$ lies between $19.6$ N and $68.6$ N ✓)*

**(c)** Force on the pulley $= 2T = 61.0 = 61$ N, vertically downwards.
:::

:::question Q5 (6 marks)
A particle of mass 4 kg is pulled along a rough horizontal surface by a force of 25 N at an angle of
$30°$ above the horizontal. The frictional force is 8 N.

(a) Find the acceleration.

(b) Find the normal reaction.
:::
:::answer
Resolve the 25 N force into components: horizontal $25\cos30° = 21.65$ N, vertical (upwards)
$25\sin30° = 12.5$ N.

**(a)** *Horizontally:*
$$21.65 - 8 = 4a$$
$$13.65 = 4a \;\Rightarrow\; a = 3.413 = 3.4\text{ m s}^{-2}$$

**(b)** *Vertically* (no vertical acceleration — the particle stays on the surface):
$$R + 12.5 = 4g = 39.2$$
$$R = 26.7 = 27 \text{ N (2 s.f.)}$$

*(Note $R < mg$: the upward component of the pull takes some of the weight, which is exactly why it's
easier to drag a heavy case with the handle raised than pushed down.)*
:::

:::question Q6 (7 marks) — synoptic
A particle $A$ of mass 3 kg rests on a smooth horizontal table. It is connected by a light inextensible
string passing over a smooth pulley at the edge of the table to a particle $B$ of mass 2 kg hanging
freely. The system is released from rest with $B$ 1.5 m above the floor.

(a) Find the acceleration of the system and the tension in the string.

(b) Find the speed of $B$ when it hits the floor.

(c) Describe what happens to $A$ after $B$ lands, stating an assumption.
:::
:::answer
**(a)** *For $A$ (horizontal, smooth table, direction of motion positive):*
$$T = 3a \qquad (1)$$

*For $B$ (downwards positive):*
$$2g - T = 2a \;\Rightarrow\; 19.6 - T = 2a \qquad (2)$$

Adding: $19.6 = 5a$, so
$$a = 3.92 = 3.9\text{ m s}^{-2}$$

From (1): $T = 3(3.92) = 11.76 = 12 \text{ N (2 s.f.)}$

**(b)** $B$ falls 1.5 m from rest with $a = 3.92$:
$$v^2 = u^2 + 2as = 0 + 2(3.92)(1.5) = 11.76$$
$$v = 3.429 = 3.4\text{ m s}^{-1}$$

**(c)** When $B$ lands, the string goes **slack**, so the tension drops to zero.

$A$ is then on a **smooth** table with no horizontal force acting on it, so by Newton's first law it
continues to move at a **constant speed of $3.4\text{ m s}^{-1}$** until it reaches the pulley.

**Assumption:** the table is long enough that $A$ hasn't already reached the pulley — and, of course,
that the table really is smooth. If there were friction, $A$ would decelerate and eventually stop.
:::
