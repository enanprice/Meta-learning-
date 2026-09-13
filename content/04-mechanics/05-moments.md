---
title: Moments
code: M5
spec: 9.1
summary: The turning effect of a force, equilibrium of rigid bodies, non-uniform rods, and when a body is on the point of tilting.
time: 4 hours
prereq: M3 Forces and Newton's Laws
papers: Paper 3 Section B
---

## Why this topic exists

Up to now every object has been a **particle** — a point with mass, where all the forces act at the
same place. Real objects have size, and a force applied at one end does something different from the
same force applied at the middle. It makes them **turn**.

Moments are how you handle that, and they're the basis of every lever, seesaw, beam, bridge and
crane calculation there is.

---

## 1. What a moment is

:::key Moment of a force
$$\text{Moment} = F \times d$$

where $F$ is the force and $d$ is the **perpendicular distance** from the pivot to the line of action
of the force.

Units: **newton metres (N m)**. Moments are **clockwise** or **anticlockwise**.
:::

:::warning Perpendicular distance
$d$ is the perpendicular distance from the pivot **to the line of the force**, not the distance to the
point where the force is applied.

For a force at an angle $\theta$ to a rod, the moment about a pivot distance $x$ along the rod is
$$Fx\sin\theta$$
— because $x\sin\theta$ is the perpendicular distance. (Equivalently: resolve the force into a
component perpendicular to the rod, $F\sin\theta$, and multiply by $x$. Same answer, and often easier
to see.)
:::

:::key The principle of moments
A rigid body is in equilibrium when:
1. The **resultant force** is zero (so it doesn't accelerate), **and**
2. The **total clockwise moment** equals the **total anticlockwise moment** about **any** point (so it
   doesn't rotate).
:::

:::insight "About any point" is the useful part
If the body is in equilibrium, the moments balance about *every* point — not just the obvious pivot.
That's a gift, because you get to **choose** where to take moments.

**Choose the point where an unknown force acts.** That force then has zero perpendicular distance, so
it contributes no moment and drops out of the equation entirely.

With two unknown reactions on a beam, taking moments about one support gives you the other reaction
immediately, in one line. Then use vertical equilibrium for the first. That's the whole strategy.
:::

---

## 2. Uniform rods

:::key
For a **uniform** rod, the weight acts at the **centre** (the midpoint).

For a **non-uniform** rod, the weight acts at some unknown point — usually what the question asks you
to find.
:::

:::example Worked example 1 — A uniform rod $AB$ of length 4 m and mass 6 kg rests horizontally on supports at $A$ and at $C$, where $AC = 3$ m. A particle of mass 2 kg is placed at $B$. Find the reactions at the supports.
**Solution.**

Forces: $R_A$ up at $A$; $R_C$ up at $C$; weight $6g = 58.8$ N down at the midpoint (2 m from $A$);
weight $2g = 19.6$ N down at $B$ (4 m from $A$).

**Take moments about $A$** (this eliminates $R_A$):
$$\text{anticlockwise} = \text{clockwise}$$
$$R_C \times 3 = 58.8\times2 + 19.6\times4$$
$$3R_C = 117.6 + 78.4 = 196$$
$$R_C = 65.33 = 65 \text{ N (2 s.f.)}$$

**Vertical equilibrium:**
$$R_A + R_C = 58.8 + 19.6 = 78.4$$
$$R_A = 78.4 - 65.33 = 13.07 = 13 \text{ N (2 s.f.)}$$

**Check by taking moments about $C$:**
$$R_A \times 3 + 19.6\times1 = 58.8\times1$$
$$3R_A = 58.8 - 19.6 = 39.2 \;\Rightarrow\; R_A = 13.07 \;\checkmark$$
:::

:::method The standard beam procedure
1. Draw the rod with **all** forces marked and **all** distances labelled from one end.
2. Take moments about a point where an **unknown** acts — that unknown disappears.
3. Solve for the other unknown.
4. Use **vertical equilibrium** ($\sum$up $= \sum$down) for the remaining unknown.
5. Check by taking moments about a different point.
:::

:::figure beam-moments
Taking moments about a support kills that support's reaction, because its perpendicular distance from
the pivot is zero. Choose the pivot that removes the unknown you don't want.
:::

---

## 3. Non-uniform rods

The weight acts at an unknown distance $x$ from one end. You'll usually be given two scenarios (or one
scenario plus a tilting condition) to generate enough equations.

:::example Worked example 2 — A non-uniform rod $AB$ of length 5 m and mass 20 kg rests on supports at $A$ and $B$. The reaction at $A$ is 80 N. Find the distance of the centre of mass from $A$.
**Solution.**

Weight $= 20g = 196$ N, acting at distance $x$ from $A$.

**Vertical equilibrium:**
$$R_A + R_B = 196 \;\Rightarrow\; R_B = 196 - 80 = 116 \text{ N}$$

**Moments about $A$** (eliminates $R_A$):
$$196x = R_B \times 5 = 116\times5 = 580$$
$$x = \frac{580}{196} = 2.959 = 3.0 \text{ m (2 s.f.)}$$

*(Sanity check: $x$ is slightly beyond the midpoint of 2.5 m, towards $B$ — which is consistent with
$R_B > R_A$, since the support nearer the centre of mass carries more load ✓)*
:::

---

## 4. On the point of tilting

:::key The tilting condition
When a rod is **on the point of tilting** about a support, the reaction at the **other** support is
**zero**.
:::

:::insight Why the other reaction vanishes
Just before tilting, the rod is about to lift off the far support. It's still touching, but exerting
no force on it — so that support pushes back with nothing.

At that instant the whole weight is carried by the pivot support, and the rod is balanced on the very
edge of rotating. Setting $R = 0$ for the far support gives you the extra equation you need.

Which support does it tilt about? **The one it's rotating towards** — the one nearer the load causing
the tilt.
:::

:::example Worked example 3 — A uniform plank $AB$ of length 6 m and mass 30 kg rests on supports at $C$ and $D$, where $AC = 1$ m and $AD = 4$ m. A child of mass 25 kg walks along the plank from $A$ towards $B$. Find how far from $A$ the child can walk before the plank tilts.
**Solution.**

The plank will tilt about $D$ (the child is moving towards $B$, beyond $D$). At the point of tilting,
$R_C = 0$.

Forces at that moment: plank's weight $30g = 294$ N at the midpoint (3 m from $A$); child's weight
$25g = 245$ N at distance $x$ from $A$; reaction $R_D$ at $D$ (4 m from $A$).

**Moments about $D$** (which eliminates $R_D$):

Distance of the plank's weight from $D$: $4 - 3 = 1$ m, on the $A$ side — anticlockwise.
Distance of the child from $D$: $x - 4$, on the $B$ side — clockwise.

$$245(x-4) = 294(1)$$
$$x - 4 = \frac{294}{245} = 1.2$$
$$x = 5.2 \text{ m}$$

So the child can walk to **5.2 m from $A$** before the plank tilts.

*(Check it's sensible: 5.2 m is within the 6 m plank ✓, and beyond $D$ at 4 m, as required for a tilt
about $D$ ✓)*
:::

---

## 5. Rods at an angle, and forces at an angle

If a force acts at an angle, use the perpendicular component (or the perpendicular distance).

:::example Worked example 4 — A uniform rod $AB$ of length 2 m and weight 40 N is hinged at $A$ and held horizontal by a string attached at $B$, making an angle of $35°$ with the rod. Find the tension.
**Solution.**

**Take moments about $A$** — this eliminates the (unknown) hinge force entirely, which is exactly why
we choose $A$.

The tension acts at $B$, 2 m from $A$, at $35°$ to the rod. Its perpendicular component is
$T\sin35°$, so its moment is $2T\sin35°$ (anticlockwise).

The weight, 40 N at the midpoint (1 m from $A$), gives a clockwise moment of $40\times1 = 40$ N m.

$$2T\sin35° = 40$$
$$T = \frac{40}{2\sin35°} = \frac{40}{1.1472} = 34.87 = 35 \text{ N (2 s.f.)}$$
:::

:::exam The hinge force
A hinge (or a rough pivot) exerts a force with **both** horizontal and vertical components, and you
usually don't know either.

That's why you take moments about the hinge — it removes both unknowns at once. If the question then
asks for the hinge force itself, resolve horizontally and vertically once you know everything else.
:::

---

## In the exam

- **Draw the diagram.** Mark every force, every distance, and the pivot you're using.
- Take moments about a point where an **unknown** force acts.
- Write "moments about $A$:" so the examiner knows what you're doing — it's a method mark.
- **Check** by taking moments about a different point. This is quick and catches sign errors.
- "On the point of tilting" ⟹ set the far reaction to **zero**.
- Answers to 2 s.f. when $g$ is used.
- Distances are measured from the pivot; if a force is on the other side of the pivot, it turns the
  other way.

---

## Practice

:::question Q1 (4 marks)
A uniform rod $AB$ of length 3 m and mass 8 kg rests on supports at $A$ and $B$. A mass of 4 kg is
placed 1 m from $A$. Find the reactions at $A$ and $B$.
:::
:::answer
Weights: rod $8g = 78.4$ N at 1.5 m from $A$; mass $4g = 39.2$ N at 1 m from $A$.

**Moments about $A$:**
$$3R_B = 78.4(1.5) + 39.2(1) = 117.6 + 39.2 = 156.8$$
$$R_B = 52.27 = 52 \text{ N (2 s.f.)}$$

**Vertical equilibrium:**
$$R_A = 78.4 + 39.2 - 52.27 = 65.33 = 65 \text{ N (2 s.f.)}$$
:::

:::question Q2 (5 marks)
A non-uniform rod $PQ$ of length 4 m and mass 12 kg is supported at $P$ and $Q$. The reaction at $Q$ is
three times the reaction at $P$. Find the distance of the centre of mass from $P$.
:::
:::answer
Let $R_P = R$, so $R_Q = 3R$.

**Vertical equilibrium:** $R + 3R = 12g = 117.6$, so $4R = 117.6$ and $R = 29.4$ N. Hence
$R_Q = 88.2$ N.

**Moments about $P$**, with the centre of mass at distance $x$:
$$117.6x = 88.2 \times 4 = 352.8$$
$$x = 3 \text{ m}$$

*(Sensible: the centre of mass is much closer to $Q$, which is why $Q$ carries three times the load ✓)*
:::

:::question Q3 (5 marks)
A uniform beam $AB$ of length 8 m and mass 50 kg rests on supports at $C$ and $D$, where $AC = 2$ m and
$DB = 2$ m. A load of mass $M$ kg is placed at $B$. Given that the beam is on the point of tilting about
$D$, find $M$.
:::
:::answer
On the point of tilting about $D$, the reaction at $C$ is **zero**.

Positions from $A$: $C$ at 2 m, centre of mass at 4 m, $D$ at $8-2 = 6$ m, load at 8 m.

**Moments about $D$:**

Beam's weight $50g = 490$ N acts 2 m from $D$ on the $A$ side (anticlockwise).
Load $Mg = 9.8M$ acts 2 m from $D$ on the $B$ side (clockwise).

$$9.8M \times 2 = 490\times2$$
$$M = 50 \text{ kg}$$
:::

:::question Q4 (5 marks)
A uniform rod $AB$ of length 1.6 m and weight 30 N is hinged at $A$ and held in a horizontal position by
a vertical string attached at a point $C$, where $AC = 1.2$ m. Find the tension in the string and the
force exerted by the hinge.
:::
:::answer
**Moments about $A$** (eliminating the hinge force):
$$T \times 1.2 = 30 \times 0.8$$
$$T = \frac{24}{1.2} = 20 \text{ N}$$

**Vertical equilibrium:** let the hinge force be $Y$ upwards.
$$Y + T = 30 \;\Rightarrow\; Y = 30 - 20 = 10 \text{ N upwards}$$

*(There's no horizontal component here because every other force is vertical.)*
:::

:::question Q5 (6 marks)
A uniform rod $AB$ of length 2.4 m and mass 5 kg is hinged at $A$ and held horizontal by a light string
from $B$ to a point on a wall directly above $A$, so that the string makes an angle of $40°$ with the
rod. A mass of 3 kg hangs from $B$.

Find the tension in the string.
:::
:::answer
**Moments about $A$:**

*Anticlockwise:* the string's perpendicular component at $B$ is $T\sin40°$, acting 2.4 m from $A$:
moment $= 2.4T\sin40°$.

*Clockwise:*
- rod's weight $5g = 49$ N at 1.2 m: moment $= 58.8$ N m
- hanging mass $3g = 29.4$ N at 2.4 m: moment $= 70.56$ N m

$$2.4T\sin40° = 58.8 + 70.56 = 129.36$$
$$T = \frac{129.36}{2.4 \times 0.6428} = \frac{129.36}{1.5427} = 83.85 = 84 \text{ N (2 s.f.)}$$
:::

:::question Q6 (7 marks) — synoptic
A uniform plank $AB$ of length 5 m and mass 40 kg rests horizontally on two supports at $C$ and $D$,
where $AC = 1$ m and $AD = 4$ m.

(a) Find the reactions at $C$ and $D$ when no load is applied.

(b) A person of mass 70 kg stands on the plank at a distance $x$ m from $A$. Find the range of values
of $x$ for which the plank does not tilt.
:::
:::answer
**(a)** Plank's weight $40g = 392$ N at 2.5 m from $A$.

**Moments about $C$** (1 m from $A$):
$$R_D \times 3 = 392 \times 1.5 = 588 \;\Rightarrow\; R_D = 196 \text{ N}$$

**Vertical:** $R_C = 392 - 196 = 196$ N.

*(Equal, which makes sense: the centre of mass at 2.5 m is exactly midway between the supports at
1 m and 4 m ✓)*

**(b)** Two tilting conditions to check.

**Tilting about $C$** (person too far towards $A$, so $R_D = 0$). Moments about $C$:

Person at $x$, which is less than 1, so distance $1-x$ on the $A$ side — anticlockwise.
Plank's weight 1.5 m from $C$ on the $B$ side — clockwise.

$$686(1-x) = 392(1.5) = 588$$
$$1 - x = 0.857 \;\Rightarrow\; x = 0.143$$

**Tilting about $D$** (person too far towards $B$, so $R_C = 0$). Moments about $D$ (4 m from $A$):

Person at distance $x - 4$ on the $B$ side — clockwise.
Plank's weight 1.5 m from $D$ on the $A$ side — anticlockwise.

$$686(x-4) = 392(1.5) = 588$$
$$x - 4 = 0.857 \;\Rightarrow\; x = 4.857$$

**Range for no tilting:**
$$0.143 \leq x \leq 4.857 \text{ (3 s.f.)}$$

*(So the person can stand almost anywhere on the 5 m plank, but must stay about 14 cm away from $A$
and about 14 cm away from $B$. Note the symmetry of the two limits — a consequence of the supports
being symmetric about the plank's centre of mass.)*
:::
