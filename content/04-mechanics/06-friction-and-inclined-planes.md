---
title: Friction and Inclined Planes
code: M6
spec: 8.4, 8.5
summary: Resolving forces in any direction, the friction law $F \leq \mu R$, limiting equilibrium, and motion on a slope.
time: 5 hours
prereq: M3 Forces and Newton's Laws, P1.9 Trigonometric Ratios
papers: Paper 3 Section B
---

## Why this topic exists

Two new ideas, and they combine into the most heavily examined situation in A Level mechanics: a block
on a rough slope.

**Resolving** lets you break any force into perpendicular components, so you can apply $F = ma$ in
directions that aren't horizontal and vertical.

**Friction** is the force that makes the real world work — and the inequality $F \leq \mu R$ is subtler
than it first appears, because friction is a *reactive* force that adjusts itself.

---

## 1. Resolving forces

:::key Components of a force
A force $F$ at angle $\theta$ to a direction has:
- component **along** that direction: $F\cos\theta$
- component **perpendicular** to it: $F\sin\theta$
:::

:::method Getting cos and sin the right way round
Don't memorise "$\cos$ for horizontal". Look at the diagram:

**The component adjacent to the angle uses $\cos$; the component opposite the angle uses $\sin$.**

Draw the right-angled triangle with $F$ as the hypotenuse. The side next to $\theta$ is $F\cos\theta$;
the side across from it is $F\sin\theta$. That's just SOH-CAH-TOA and it never lets you down, whatever
orientation the problem is in.
:::

:::warning The angle isn't always measured from the horizontal
A force at $50°$ **to the vertical** has a vertical component of $F\cos50°$ and a horizontal component
of $F\sin50°$ — the opposite of what you'd write for $50°$ to the horizontal.

Read the diagram, identify which side of the triangle you want, and apply the adjacent/opposite rule.
:::

---

## 2. Friction

:::key The friction law
$$F \leq \mu R$$
where $\mu$ is the **coefficient of friction** and $R$ is the **normal reaction**.

- If the object is **moving** (or on the point of moving), friction is at its maximum:
  $$F = \mu R$$
- If the object is **stationary and not on the point of moving**, friction takes whatever value is
  needed to maintain equilibrium, which is **less than** $\mu R$.
:::

:::insight Why friction is an inequality, not an equation
Push gently on a heavy wardrobe and it doesn't move. Friction has exactly matched your push. Push a bit
harder — still nothing. Friction has matched the bigger push too.

Friction is a **reactive** force: it supplies whatever is needed to prevent sliding, up to a maximum
of $\mu R$. Once your push exceeds that maximum, the object slides and friction sits at $\mu R$.

**Practical consequence:** you can only write $F = \mu R$ when the question says "moving", "sliding",
"on the point of slipping", "limiting equilibrium", or "about to move". Otherwise $F$ is an unknown to
be found from equilibrium, and you'd then check whether it's within $\mu R$.
:::

:::key Direction of friction
Friction always acts to **oppose motion, or attempted motion**.

On a slope, a block sliding down has friction acting **up** the slope. A block being pushed up has
friction acting **down** the slope. Work out which way it's trying to go before you draw the arrow.
:::

:::example Worked example 1 — A block of mass 5 kg rests on a rough horizontal surface with $\mu = 0.4$. A force of 25 N is applied at $20°$ above the horizontal. Find the acceleration.
**Solution.**

Components of the applied force: horizontal $25\cos20° = 23.49$ N; vertical (upwards)
$25\sin20° = 8.551$ N.

**Vertically** (no vertical acceleration):
$$R + 8.551 = 5g = 49$$
$$R = 40.45 \text{ N}$$

*(Note $R < mg$ — the upward pull relieves some of the weight.)*

**Friction** (the block is moving, so it's at maximum):
$$F = \mu R = 0.4\times40.45 = 16.18 \text{ N}$$

**Horizontally:**
$$23.49 - 16.18 = 5a$$
$$a = \frac{7.31}{5} = 1.46 = 1.5\text{ m s}^{-2}$$
:::

:::insight Pull, don't push
If that same 25 N force had been applied at $20°$ **below** the horizontal (pushing down), the normal
reaction would be $49 + 8.551 = 57.55$ N, giving friction of 23.02 N and an acceleration of only
$0.094\text{ m s}^{-2}$ — nearly 15 times smaller.

Same force, same angle, wildly different result. That's why a suitcase is easier to pull by a raised
handle than to push down on: pulling up reduces $R$, which reduces friction.
:::

---

## 3. Inclined planes

:::method Resolving on a slope — always use these axes
Resolve **parallel** and **perpendicular to the slope**, not horizontally and vertically. That way the
acceleration is entirely along one axis.

For a slope at angle $\theta$ to the horizontal, the weight $mg$ splits as:
- **down the slope:** $mg\sin\theta$
- **into the slope (perpendicular):** $mg\cos\theta$
:::

:::insight Which gets sin and which gets cos
The angle between the weight (vertically down) and the perpendicular to the slope is the **same
$\theta$** as the slope angle — a bit of angle-chasing with parallel lines shows this.

So the weight is the hypotenuse of a triangle whose side **adjacent** to $\theta$ is perpendicular to
the slope ($mg\cos\theta$), and whose side **opposite** is along it ($mg\sin\theta$).

**Check it at the extremes.** If $\theta = 0$ (flat ground), the down-slope component should be zero:
$mg\sin0 = 0$ ✓, and the perpendicular component should be the full weight: $mg\cos0 = mg$ ✓. If
$\theta = 90°$ (vertical cliff), it's the other way round ✓.

That two-second check settles it every time.
:::

:::key On a slope
$$R = mg\cos\theta \quad\text{(when nothing else acts perpendicular to the slope)}$$
$$\text{Friction} \leq \mu R = \mu mg\cos\theta$$
:::

:::example Worked example 2 — A block of mass 10 kg slides down a rough slope inclined at $25°$ to the horizontal, with $\mu = 0.3$. Find its acceleration.
**Solution.**

**Perpendicular to the slope** (no acceleration in that direction):
$$R = mg\cos25° = 10(9.8)\cos25° = 88.82 \text{ N}$$

**Friction** (block is sliding, so maximum), acting **up** the slope since the block moves down:
$$F = \mu R = 0.3\times 88.82 = 26.65 \text{ N}$$

**Parallel to the slope**, taking down the slope as positive:
$$mg\sin25° - F = ma$$
$$10(9.8)\sin25° - 26.65 = 10a$$
$$41.42 - 26.65 = 10a$$
$$a = 1.48 = 1.5\text{ m s}^{-2}$$
:::

---

## 4. Limiting equilibrium on a slope

:::key The critical angle
A block on a rough slope is **on the point of sliding** when
$$mg\sin\theta = \mu mg\cos\theta \;\Rightarrow\; \tan\theta = \mu$$

This angle is the **angle of friction**, and it is independent of the mass.
:::

:::insight Why the mass cancels — and why that's surprising
Both the driving force ($mg\sin\theta$) and the maximum friction ($\mu mg\cos\theta$) are proportional
to $m$. Increase the mass and you increase both equally, so the balance point doesn't move.

This is why a heavy box and a light box slide down the same ramp at the same angle — something people
find counterintuitive until they see the cancellation.

Practically: if $\tan\theta < \mu$ the block stays put whatever its mass; if $\tan\theta > \mu$ it
slides whatever its mass.
:::

:::example Worked example 3 — A block of mass 2 kg rests on a rough plane inclined at $30°$, with $\mu = 0.2$. A force $P$ acts up the slope. Find the range of values of $P$ for which the block remains in equilibrium.
**Solution.**

$$R = 2g\cos30° = 19.6 \times 0.8660 = 16.97 \text{ N}$$
$$F_{\max} = \mu R = 0.2\times16.97 = 3.395 \text{ N}$$
$$\text{Weight component down the slope} = 2g\sin30° = 9.8 \text{ N}$$

**Case 1: $P$ at its smallest.** The block is on the point of sliding **down**, so friction acts **up**
the slope at maximum:
$$P_{\min} + 3.395 = 9.8 \;\Rightarrow\; P_{\min} = 6.405 = 6.4 \text{ N}$$

**Case 2: $P$ at its largest.** The block is on the point of sliding **up**, so friction acts **down**
the slope at maximum:
$$P_{\max} = 9.8 + 3.395 = 13.195 = 13.2 \text{ N}$$

$$6.4 \leq P \leq 13.2 \text{ N (3 s.f.)}$$

*(Check: $\tan30° = 0.577 > \mu = 0.2$, so the block would slide down without any $P$ — consistent with
$P_{\min} > 0$ ✓)*
:::

:::method The two-case structure
Whenever a question asks for a **range** of forces for equilibrium on a slope, there are always two
cases, differing only in which way friction acts:
- **Minimum force:** on the point of sliding **down**, friction **up**.
- **Maximum force:** on the point of sliding **up**, friction **down**.

Draw two separate diagrams. Trying to do both on one is how sign errors happen.
:::

---

## In the exam

- **Resolve parallel and perpendicular to the slope**, always.
- Check whether the question justifies $F = \mu R$ or only $F \leq \mu R$. The phrases that justify
  equality are: *moving, sliding, on the point of moving, limiting equilibrium, about to slip*.
- $R = mg\cos\theta$ **only if** nothing else acts perpendicular to the slope. An applied force at an
  angle to the slope changes it.
- State the direction friction acts, and why.
- Use the $\theta = 0$ / $\theta = 90°$ check if you're unsure about sin and cos.
- 2 s.f. when $g$ is used.

---

## Practice

:::question Q1 (4 marks)
A box of mass 8 kg is at rest on a rough horizontal floor with $\mu = 0.35$. Find the minimum
horizontal force needed to start it moving.
:::
:::answer
$$R = mg = 8\times9.8 = 78.4 \text{ N}$$

At the point of moving, friction is at its maximum:
$$F_{\max} = \mu R = 0.35\times78.4 = 27.44 \text{ N}$$

So the minimum force is $27.44 = 27 \text{ N (2 s.f.)}$.
:::

:::question Q2 (5 marks)
A particle of mass 8 kg slides down a smooth-then-rough investigation: it is placed on a rough plane
inclined at $30°$ with $\mu = 0.25$. Find its acceleration down the slope.
:::
:::answer
$$R = 8g\cos30° = 78.4\times0.8660 = 67.90 \text{ N}$$
$$F = \mu R = 0.25\times67.90 = 16.97 \text{ N (up the slope)}$$
$$8g\sin30° = 78.4\times0.5 = 39.2 \text{ N (down the slope)}$$

**Parallel to the slope:**
$$39.2 - 16.97 = 8a$$
$$a = \frac{22.23}{8} = 2.78 = 2.8\text{ m s}^{-2}$$
:::

:::question Q3 (4 marks)
A block is on the point of sliding down a rough slope inclined at $22°$. Find the coefficient of
friction.
:::
:::answer
On the point of sliding, $mg\sin\theta = \mu mg\cos\theta$, so
$$\mu = \tan\theta = \tan22° = 0.404 = 0.40 \text{ (2 s.f.)}$$

*(Note the mass is not needed — it cancels.)*
:::

:::question Q4 (5 marks)
A sledge of mass 15 kg is pulled along rough horizontal ground by a rope at $30°$ above the horizontal
with a tension of 80 N. The coefficient of friction is 0.2. Find the acceleration.
:::
:::answer
Components: horizontal $80\cos30° = 69.28$ N; vertical (up) $80\sin30° = 40$ N.

**Vertically:**
$$R + 40 = 15g = 147 \;\Rightarrow\; R = 107 \text{ N}$$

**Friction:**
$$F = 0.2\times107 = 21.4 \text{ N}$$

**Horizontally:**
$$69.28 - 21.4 = 15a$$
$$a = \frac{47.88}{15} = 3.19 = 3.2\text{ m s}^{-2}$$
:::

:::question Q5 (6 marks)
A particle of mass 4 kg is held in equilibrium on a rough plane inclined at $35°$ by a force $P$ acting
up the line of greatest slope. Given $\mu = 0.3$, find the range of values of $P$.
:::
:::answer
$$R = 4g\cos35° = 39.2\times0.8192 = 32.11 \text{ N}$$
$$F_{\max} = 0.3\times32.11 = 9.633 \text{ N}$$
$$4g\sin35° = 39.2\times0.5736 = 22.48 \text{ N (down the slope)}$$

**Minimum $P$** (on the point of sliding down, friction up the slope):
$$P_{\min} = 22.48 - 9.633 = 12.85 = 12.8 \text{ N}$$

**Maximum $P$** (on the point of sliding up, friction down the slope):
$$P_{\max} = 22.48 + 9.633 = 32.11 = 32.1 \text{ N}$$

$$12.8 \leq P \leq 32.1 \text{ N (3 s.f.)}$$
:::

:::question Q6 (7 marks) — synoptic
A particle of mass 6 kg is projected up a rough plane inclined at $20°$ with an initial speed of
$9\text{ m s}^{-1}$. The coefficient of friction is 0.25.

(a) Find the deceleration while the particle moves up the slope.

(b) Find the distance travelled up the slope before it comes to rest.

(c) Determine whether the particle then slides back down, justifying your answer.
:::
:::answer
**(a)** Moving **up**, so friction acts **down** the slope.

$$R = 6g\cos20° = 58.8\times0.9397 = 55.25 \text{ N}$$
$$F = 0.25\times55.25 = 13.81 \text{ N (down the slope)}$$
$$6g\sin20° = 58.8\times0.3420 = 20.11 \text{ N (down the slope)}$$

**Parallel to the slope**, taking up the slope as positive:
$$-20.11 - 13.81 = 6a$$
$$a = \frac{-33.92}{6} = -5.654$$

So the deceleration is $5.65 = 5.7\text{ m s}^{-2}$.

**(b)** $u=9$, $v=0$, $a = -5.654$:
$$0 = 81 + 2(-5.654)s \;\Rightarrow\; s = \frac{81}{11.31} = 7.163 = 7.2 \text{ m}$$

**(c)** At rest, the particle will slide back down only if the weight component down the slope exceeds
the **maximum** available friction:
$$mg\sin20° = 20.11 \text{ N} \qquad\text{vs}\qquad \mu mg\cos20° = 13.81 \text{ N}$$

Since $20.11 > 13.81$, friction cannot hold it, so the particle **does slide back down**.

*(Equivalent and quicker test: it slides back if $\tan\theta > \mu$. Here $\tan20° = 0.364 > 0.25$ ✓.
Note that on the way down, friction reverses to act **up** the slope, so the return acceleration is
$g\sin20° - \mu g\cos20° = 3.35 - 2.30 = 1.05\text{ m s}^{-2}$ — much gentler than the deceleration
going up, so it returns more slowly than it left.)*
:::
