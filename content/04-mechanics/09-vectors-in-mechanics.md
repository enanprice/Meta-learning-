---
title: Further Kinematics — Vectors in Mechanics
code: M9
spec: 7.7, 8.6
summary: Forces, velocity and acceleration in i–j form, the vector SUVAT equations, bearings, and collision problems.
time: 4 hours
prereq: M4 Variable Acceleration, P1.11 Vectors (2D)
papers: Paper 3 Section B
---

## Why this topic exists

Motion in a plane needs two numbers at every instant, not one. Writing velocity as
$3\mathbf{i} - 2\mathbf{j}$ handles both directions at once, and every mechanics equation you know
works identically with vectors in place of scalars.

That's the whole point: **you don't learn new physics here, you learn new bookkeeping** — and the
bookkeeping is what lets you answer questions about ships on collision courses, forces at angles, and
particles moving on bearings.

---

## 1. Conventions

:::key The standard setup
$\mathbf{i}$ points **east** (or in the positive $x$-direction), $\mathbf{j}$ points **north** (or
positive $y$).

Every vector quantity splits into components:
$$\mathbf{v} = v_x\mathbf{i} + v_y\mathbf{j}$$

- **Magnitude** (speed, or size of a force): $|\mathbf{v}| = \sqrt{v_x^2+v_y^2}$
- **Direction:** the angle from a stated reference — usually a **bearing**, measured clockwise from
  north.
:::

:::warning Bearings from i–j components
A bearing is measured **clockwise from north**, so for $\mathbf{v} = v_x\mathbf{i} + v_y\mathbf{j}$
with $\mathbf{i}$ east and $\mathbf{j}$ north:
$$\tan(\text{bearing}) = \frac{v_x}{v_y} = \frac{\text{east component}}{\text{north component}}$$

Note that's **east over north** — the opposite way round from the usual $\frac{y}{x}$. Sketch the
vector first and check your answer lands in the right quadrant, then adjust by $180°$ or $360°$ as
needed.
:::

---

## 2. Forces as vectors

:::key Newton's second law in vector form
$$\mathbf{F} = m\mathbf{a}$$

The **resultant force** is the vector sum of all the forces; the acceleration is in the **same
direction** as the resultant.
:::

:::example Worked example 1 — Two forces $(5\mathbf{i}+2\mathbf{j})$ N and $(-3\mathbf{i}+6\mathbf{j})$ N act on a particle of mass 4 kg. Find the acceleration and its magnitude.
**Solution.**

**Resultant force:**
$$\mathbf{F} = (5-3)\mathbf{i} + (2+6)\mathbf{j} = 2\mathbf{i} + 8\mathbf{j} \text{ N}$$

**Acceleration:**
$$\mathbf{a} = \frac{\mathbf{F}}{m} = \frac{2\mathbf{i}+8\mathbf{j}}{4} = 0.5\mathbf{i} + 2\mathbf{j}
\text{ m s}^{-2}$$

**Magnitude:**
$$|\mathbf{a}| = \sqrt{0.25 + 4} = \sqrt{4.25} = 2.06\text{ m s}^{-2} \text{ (3 s.f.)}$$
:::

:::key Equilibrium in vector form
A particle is in equilibrium when the resultant force is the **zero vector**:
$$\sum\mathbf{F} = \mathbf{0}$$

which means **both** components are zero separately:
$$\sum F_x = 0 \quad\text{and}\quad \sum F_y = 0$$

That's the "resolve in two perpendicular directions" of M8, written in vector notation. Same idea,
tidier notation.
:::

---

## 3. The vector SUVAT equations

:::key Constant acceleration, vector form
$$\mathbf{v} = \mathbf{u} + \mathbf{a}t$$
$$\mathbf{s} = \mathbf{u}t + \tfrac12\mathbf{a}t^2$$
$$\mathbf{s} = \tfrac12(\mathbf{u}+\mathbf{v})t$$

And for position rather than displacement:
$$\mathbf{r} = \mathbf{r}_0 + \mathbf{u}t + \tfrac12\mathbf{a}t^2$$
where $\mathbf{r}_0$ is the initial position vector.
:::

:::warning There is no vector version of $v^2 = u^2 + 2as$
The other four equations carry over directly. $v^2 = u^2+2as$ does **not**, because squaring a vector
isn't defined in this course.

If you need that relationship, apply it to **one component at a time** — it's valid componentwise,
since each component has its own constant acceleration.
:::

:::example Worked example 2 — A particle starts at $(\mathbf{i}+4\mathbf{j})$ m with velocity $(3\mathbf{i}-2\mathbf{j})\text{ m s}^{-1}$ and constant acceleration $(0.5\mathbf{i}+1.5\mathbf{j})\text{ m s}^{-2}$.
Find (a) its velocity after 4 s, (b) its speed then, (c) its position vector after 4 s.

**Solution.**

**(a)**
$$\mathbf{v} = \mathbf{u} + \mathbf{a}t = (3\mathbf{i}-2\mathbf{j}) + 4(0.5\mathbf{i}+1.5\mathbf{j})$$
$$= (3+2)\mathbf{i} + (-2+6)\mathbf{j} = 5\mathbf{i}+4\mathbf{j}\text{ m s}^{-1}$$

**(b)**
$$\text{speed} = |\mathbf{v}| = \sqrt{25+16} = \sqrt{41} = 6.40\text{ m s}^{-1}$$

**(c)**
$$\mathbf{r} = \mathbf{r}_0 + \mathbf{u}t + \tfrac12\mathbf{a}t^2$$
$$= (\mathbf{i}+4\mathbf{j}) + 4(3\mathbf{i}-2\mathbf{j}) + \tfrac12(16)(0.5\mathbf{i}+1.5\mathbf{j})$$
$$= (\mathbf{i}+4\mathbf{j}) + (12\mathbf{i}-8\mathbf{j}) + (4\mathbf{i}+12\mathbf{j})$$
$$= 17\mathbf{i} + 8\mathbf{j} \text{ m}$$
:::

:::method Work componentwise if in doubt
Every vector equation is two scalar equations. If a vector manipulation feels slippery, write the
$\mathbf{i}$ components and the $\mathbf{j}$ components as two separate lines and treat each as an
ordinary SUVAT problem.

It's slightly longer but completely reliable, and it's exactly how projectiles work (M7) — there, the
$\mathbf{i}$ component has $a=0$ and the $\mathbf{j}$ component has $a = -g$.
:::

---

## 4. Direction conditions

Exam questions phrase conditions in words. Translate them into components:

:::key Translating direction statements
| In words | In components |
|---|---|
| Moving **due east** | $\mathbf{j}$ component of $\mathbf{v}$ is zero, $\mathbf{i}$ component positive |
| Moving **due north** | $\mathbf{i}$ component is zero, $\mathbf{j}$ positive |
| Moving **north-east** | the two components are **equal and positive** |
| Moving **parallel to** $(3\mathbf{i}+\mathbf{j})$ | $\mathbf{v} = k(3\mathbf{i}+\mathbf{j})$ for some scalar $k$ |
| **At** a given point | both components of $\mathbf{r}$ match, **at the same $t$** |
| Two particles **collide** | their position vectors are equal at the same $t$ |
:::

:::example Worked example 3 — A particle has velocity $\mathbf{v} = (6-2t)\mathbf{i} + (t-1)\mathbf{j}$. Find the times at which it is moving (a) due north, (b) parallel to $\mathbf{i}+\mathbf{j}$.
**Solution.**

**(a)** Due north means the $\mathbf{i}$ component is zero:
$$6 - 2t = 0 \;\Rightarrow\; t = 3$$

Check the $\mathbf{j}$ component there: $3-1 = 2 > 0$, so it really is heading north rather than south ✓

**(b)** Parallel to $\mathbf{i}+\mathbf{j}$ means the two components are **equal**:
$$6 - 2t = t - 1 \;\Rightarrow\; 7 = 3t \;\Rightarrow\; t = \tfrac73$$

At that time $\mathbf{v} = \frac43\mathbf{i} + \frac43\mathbf{j}$ ✓
:::

---

## 5. Collisions and meeting problems

:::method Do two particles collide?
1. Write the position vector of **each** particle as a function of $t$.
2. Set the $\mathbf{i}$ components equal and solve for $t$.
3. **Check that the same $t$ also makes the $\mathbf{j}$ components equal.**
4. If it does, they collide at that time; substitute to find where. If it doesn't, their paths may
   cross but they are **never at the same place at the same time**, so there is no collision.
:::

:::warning Crossing paths is not colliding
Two particles can pass through the same point at different times. That's not a collision.

The $\mathbf{i}$ components being equal at some $t$, and the $\mathbf{j}$ components being equal at
some *other* $t$, means the paths intersect but the particles miss each other. Step 3 is the whole
question — and a "show that they do not collide" answer must say explicitly that the times differ.
:::

:::example Worked example 4 — Particle $A$ starts at $(\mathbf{i}+2\mathbf{j})$ m with constant velocity $(4\mathbf{i}+\mathbf{j})\text{ m s}^{-1}$. Particle $B$ starts at $(13\mathbf{i}+2\mathbf{j})$ m with constant velocity $(-2\mathbf{i}+\mathbf{j})\text{ m s}^{-1}$. Show that they collide, and find where and when.
**Solution.**

$$\mathbf{r}_A = (1+4t)\mathbf{i} + (2+t)\mathbf{j}$$
$$\mathbf{r}_B = (13-2t)\mathbf{i} + (2+t)\mathbf{j}$$

**$\mathbf{i}$ components equal:**
$$1 + 4t = 13 - 2t \;\Rightarrow\; 6t = 12 \;\Rightarrow\; t = 2$$

**Check the $\mathbf{j}$ components at $t=2$:**
$$A: \; 2+2 = 4 \qquad B: \; 2+2 = 4 \;\checkmark$$

Both components match at the same time, so the particles **collide** at $t = 2$ s.

**Position:** $\mathbf{r} = (1+8)\mathbf{i} + 4\mathbf{j} = 9\mathbf{i}+4\mathbf{j}$ m.
:::

---

## In the exam

- Keep $\mathbf{i}$ and $\mathbf{j}$ components in **separate columns** of your working. Most errors in
  this topic are bookkeeping errors, not conceptual ones.
- **Speed** is the magnitude of velocity; **velocity** is the vector. Read which is wanted.
- Bearings: east over north, then check the quadrant with a sketch.
- For collisions, always verify **both** components at the **same** $t$.
- $\mathbf{F} = m\mathbf{a}$ works exactly as in scalar form — divide the resultant force vector by the
  mass.
- If a question mixes vectors with a force at an angle, convert the angled force into components first,
  then add.

---

## Practice

:::question Q1 (4 marks)
Forces $(7\mathbf{i}-3\mathbf{j})$ N, $(-2\mathbf{i}+5\mathbf{j})$ N and $(\mathbf{i}-4\mathbf{j})$ N act
on a particle of mass 3 kg. Find the acceleration and its magnitude.
:::
:::answer
**Resultant:**
$$\mathbf{F} = (7-2+1)\mathbf{i} + (-3+5-4)\mathbf{j} = 6\mathbf{i}-2\mathbf{j} \text{ N}$$

**Acceleration:**
$$\mathbf{a} = \tfrac13(6\mathbf{i}-2\mathbf{j}) = 2\mathbf{i} - \tfrac23\mathbf{j}\text{ m s}^{-2}$$

**Magnitude:**
$$|\mathbf{a}| = \sqrt{4 + \tfrac49} = \sqrt{\tfrac{40}{9}} = 2.11\text{ m s}^{-2} \text{ (3 s.f.)}$$
:::

:::question Q2 (4 marks)
A particle of mass 5 kg is in equilibrium under three forces: $(3\mathbf{i}+7\mathbf{j})$ N,
$(-8\mathbf{i}+2\mathbf{j})$ N and $\mathbf{F}$. Find $\mathbf{F}$ and its magnitude.
:::
:::answer
For equilibrium the resultant is zero:
$$(3\mathbf{i}+7\mathbf{j}) + (-8\mathbf{i}+2\mathbf{j}) + \mathbf{F} = \mathbf{0}$$
$$(-5\mathbf{i}+9\mathbf{j}) + \mathbf{F} = \mathbf{0}$$
$$\mathbf{F} = 5\mathbf{i} - 9\mathbf{j} \text{ N}$$

$$|\mathbf{F}| = \sqrt{25+81} = \sqrt{106} = 10.3 \text{ N (3 s.f.)}$$

*(The mass is irrelevant here — equilibrium is about forces balancing, whatever the mass.)*
:::

:::question Q3 (5 marks)
A particle has initial velocity $(2\mathbf{i}+5\mathbf{j})\text{ m s}^{-1}$ and constant acceleration
$(1.5\mathbf{i}-2\mathbf{j})\text{ m s}^{-2}$.

(a) Find its velocity after 3 s.

(b) Find its speed then.

(c) Find its displacement in those 3 s.
:::
:::answer
**(a)**
$$\mathbf{v} = (2\mathbf{i}+5\mathbf{j}) + 3(1.5\mathbf{i}-2\mathbf{j}) = 6.5\mathbf{i} - \mathbf{j}\text{ m s}^{-1}$$

**(b)**
$$|\mathbf{v}| = \sqrt{42.25+1} = \sqrt{43.25} = 6.58\text{ m s}^{-1}$$

**(c)**
$$\mathbf{s} = \mathbf{u}t + \tfrac12\mathbf{a}t^2 = 3(2\mathbf{i}+5\mathbf{j}) + \tfrac12(9)(1.5\mathbf{i}-2\mathbf{j})$$
$$= (6\mathbf{i}+15\mathbf{j}) + (6.75\mathbf{i}-9\mathbf{j}) = 12.75\mathbf{i} + 6\mathbf{j} \text{ m}$$
:::

:::question Q4 (5 marks)
A boat has velocity $\mathbf{v} = (8-t)\mathbf{i} + (2t-6)\mathbf{j}\text{ m s}^{-1}$, where $\mathbf{i}$
is east and $\mathbf{j}$ is north.

(a) Find the time at which the boat is travelling due east.

(b) Find its speed at that time.
:::
:::answer
**(a)** Due east means the north component is zero and the east component is positive:
$$2t - 6 = 0 \;\Rightarrow\; t = 3$$

Check: at $t=3$ the east component is $8-3 = 5 > 0$ ✓

**(b)** $\mathbf{v} = 5\mathbf{i}$, so the speed is $5\text{ m s}^{-1}$.
:::

:::question Q5 (6 marks)
Ship $A$ is at $(-4\mathbf{i}+3\mathbf{j})$ km and moves with constant velocity
$(6\mathbf{i}+2\mathbf{j})$ km h$^{-1}$. Ship $B$ is at $(8\mathbf{i}-\mathbf{j})$ km and moves with
constant velocity $(2\mathbf{i}+4\mathbf{j})$ km h$^{-1}$.

Determine whether the ships collide.
:::
:::answer
$$\mathbf{r}_A = (-4+6t)\mathbf{i} + (3+2t)\mathbf{j}$$
$$\mathbf{r}_B = (8+2t)\mathbf{i} + (-1+4t)\mathbf{j}$$

**$\mathbf{i}$ components equal:**
$$-4+6t = 8+2t \;\Rightarrow\; 4t = 12 \;\Rightarrow\; t = 3$$

**$\mathbf{j}$ components equal:**
$$3+2t = -1+4t \;\Rightarrow\; 4 = 2t \;\Rightarrow\; t = 2$$

The two times are **different** ($t=3$ and $t=2$), so there is no single time at which both components
match.

**The ships do not collide.** Their paths cross, but they are at the crossing point at different times.
:::

:::question Q6 (7 marks) — synoptic
A particle of mass 2 kg is acted on by a single constant force $\mathbf{F}$ N. At $t=0$ it is at the
origin with velocity $(3\mathbf{i}-\mathbf{j})\text{ m s}^{-1}$. At $t = 4$ s its velocity is
$(11\mathbf{i}+7\mathbf{j})\text{ m s}^{-1}$.

(a) Find the acceleration.

(b) Find $\mathbf{F}$ and its magnitude.

(c) Find the position vector at $t = 4$ s, and the distance from the origin then.
:::
:::answer
**(a)** Using $\mathbf{v} = \mathbf{u}+\mathbf{a}t$:
$$11\mathbf{i}+7\mathbf{j} = (3\mathbf{i}-\mathbf{j}) + 4\mathbf{a}$$
$$4\mathbf{a} = 8\mathbf{i}+8\mathbf{j} \;\Rightarrow\; \mathbf{a} = 2\mathbf{i}+2\mathbf{j}\text{ m s}^{-2}$$

**(b)**
$$\mathbf{F} = m\mathbf{a} = 2(2\mathbf{i}+2\mathbf{j}) = 4\mathbf{i}+4\mathbf{j} \text{ N}$$
$$|\mathbf{F}| = \sqrt{16+16} = \sqrt{32} = 4\sqrt2 = 5.66 \text{ N}$$

**(c)** Starting at the origin:
$$\mathbf{r} = \mathbf{u}t + \tfrac12\mathbf{a}t^2 = 4(3\mathbf{i}-\mathbf{j}) + \tfrac12(16)(2\mathbf{i}+2\mathbf{j})$$
$$= (12\mathbf{i}-4\mathbf{j}) + (16\mathbf{i}+16\mathbf{j}) = 28\mathbf{i}+12\mathbf{j} \text{ m}$$

$$|\mathbf{r}| = \sqrt{784+144} = \sqrt{928} = 30.5 \text{ m (3 s.f.)}$$

*(Alternative check on (c): with constant acceleration the average velocity is
$\frac12(\mathbf{u}+\mathbf{v}) = \frac12(14\mathbf{i}+6\mathbf{j}) = 7\mathbf{i}+3\mathbf{j}$, and over
4 s that gives $28\mathbf{i}+12\mathbf{j}$ ✓)*
:::
