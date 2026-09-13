---
title: Projectiles
code: M7
spec: 7.6
summary: Motion in two dimensions under gravity — splitting into components, time of flight, range, maximum height, and the trajectory equation.
time: 5 hours
prereq: M2 Constant Acceleration, M6 Friction and Inclined Planes
papers: Paper 3 Section B
---

## Why this topic exists

Everything so far has moved in a straight line. A thrown ball doesn't — it moves horizontally *and*
vertically at the same time.

The trick that makes this tractable is one of the genuinely elegant ideas in mechanics: **the
horizontal and vertical motions are completely independent.** Gravity pulls downwards, so it affects
the vertical motion only. Nothing acts horizontally (we ignore air resistance), so the horizontal
velocity never changes.

That means you can apply SUVAT **separately** to each direction, with time as the only thing they
share.

---

## 1. The fundamental split

:::key The two motions
| | Horizontal | Vertical |
|---|---|---|
| Acceleration | $a_x = 0$ | $a_y = -g = -9.8$ (taking up as positive) |
| Initial velocity | $u_x = u\cos\theta$ | $u_y = u\sin\theta$ |
| Velocity at time $t$ | $v_x = u\cos\theta$ (**constant**) | $v_y = u\sin\theta - gt$ |
| Displacement at time $t$ | $x = ut\cos\theta$ | $y = ut\sin\theta - \tfrac12gt^2$ |
:::

:::insight The independence is real, and testable
Fire a bullet horizontally and drop an identical bullet from the same height at the same instant.
**They hit the ground at the same time.**

The fired bullet's horizontal motion does nothing to slow its fall, because gravity acts only
vertically. The dropped bullet's lack of horizontal motion doesn't make it fall faster.

This is why the whole topic reduces to "do SUVAT twice". The only link between the two calculations is
**$t$**, because both motions happen over the same period of time.
:::

:::method The projectile procedure
1. **Resolve the initial velocity** into $u\cos\theta$ horizontally and $u\sin\theta$ vertically.
2. Write two SUVAT lists, one per direction. Mark which quantity you want.
3. **Almost always: use the vertical motion to find $t$**, then feed that $t$ into the horizontal
   motion.
4. Take **up as positive** and be consistent — a landing point below the launch point has a
   **negative** $y$.
:::

---

## 2. The standard results

:::key For a projectile launched at speed $u$, angle $\theta$, from and to the same horizontal level:
$$\text{Time to highest point} = \frac{u\sin\theta}{g}$$
$$\text{Time of flight} = \frac{2u\sin\theta}{g}$$
$$\text{Maximum height} = \frac{u^2\sin^2\theta}{2g}$$
$$\text{Range} = \frac{u^2\sin2\theta}{g}$$

**These are not in the formula booklet.** You can derive any of them in two lines, and you should
practise doing so — but knowing the shape of the answers is a good check.
:::

:::insight Why $45°$ gives the maximum range
Range $= \dfrac{u^2\sin2\theta}{g}$, and $\sin 2\theta$ is largest when $2\theta = 90°$, i.e.
$\theta = 45°$.

There's a trade-off behind the algebra. A shallow launch gives lots of horizontal speed but very little
time in the air. A steep launch gives lots of hang time but little horizontal speed. $45°$ is the
compromise.

Second consequence: because $\sin2\theta = \sin(180° - 2\theta)$, the angles $\theta$ and $90° - \theta$
give the **same range**. A ball thrown at $30°$ lands in the same place as one thrown at $60°$ — the
$60°$ one just takes much longer to get there. (Real throwers pick the flatter one for exactly that
reason.)
:::

:::example Worked example 1 — A ball is projected at $25\text{ m s}^{-1}$ at $40°$ above the horizontal from ground level. Find (a) the maximum height, (b) the time of flight, (c) the horizontal range.
**Solution.**

$$u_x = 25\cos40° = 19.15\text{ m s}^{-1}, \qquad u_y = 25\sin40° = 16.07\text{ m s}^{-1}$$

**(a)** At the maximum height, $v_y = 0$. Vertically, using $v^2 = u^2 + 2as$:
$$0 = 16.07^2 + 2(-9.8)s \;\Rightarrow\; s = \frac{258.2}{19.6} = 13.18 = 13 \text{ m (2 s.f.)}$$

**(b)** Returns to ground level when $y = 0$. Vertically, $s = ut + \frac12at^2$:
$$0 = 16.07t - 4.9t^2 = t(16.07 - 4.9t)$$
$$t = 0 \text{ (launch)} \quad\text{or}\quad t = \frac{16.07}{4.9} = 3.280 = 3.3 \text{ s}$$

**(c)** Horizontally, velocity is constant:
$$x = u_x t = 19.15 \times 3.280 = 62.8 = 63 \text{ m (2 s.f.)}$$

*(Check against the standard result: $\frac{25^2\sin80°}{9.8} = \frac{625\times0.9848}{9.8} = 62.8$ ✓)*
:::

---

## 3. Launched horizontally

A special case with $\theta = 0$: the initial vertical velocity is **zero**.

:::example Worked example 2 — A stone is thrown horizontally at $20\text{ m s}^{-1}$ from the top of a cliff 45 m high. Find (a) the time to reach the sea, (b) how far from the base of the cliff it lands, (c) its speed on impact.
**Solution.**

$$u_x = 20, \qquad u_y = 0$$

**(a)** Vertically, taking **down** as positive for simplicity: $u=0$, $a = 9.8$, $s = 45$.
$$45 = 0 + 4.9t^2 \;\Rightarrow\; t^2 = 9.184 \;\Rightarrow\; t = 3.030 = 3.0 \text{ s}$$

**(b)** Horizontally:
$$x = 20\times3.030 = 60.6 = 61 \text{ m (2 s.f.)}$$

**(c)** The horizontal velocity is unchanged at $20\text{ m s}^{-1}$. The vertical velocity on impact:
$$v_y = 0 + 9.8(3.030) = 29.70\text{ m s}^{-1}$$

Combine as perpendicular components:
$$\text{speed} = \sqrt{20^2 + 29.70^2} = \sqrt{400+882} = \sqrt{1282} = 35.8 = 36\text{ m s}^{-1}$$

Direction below the horizontal:
$$\tan\alpha = \frac{29.70}{20} \;\Rightarrow\; \alpha = 56.0°$$
:::

:::warning Speed is not a component
The speed at any instant is $\sqrt{v_x^2 + v_y^2}$, combining the two components by Pythagoras.

Quoting only $v_y$ (or only $v_x$) as "the speed" is a common and expensive error. If a question asks
for "the speed and direction", it wants both the magnitude and the angle.
:::

---

## 4. Landing at a different height

If the projectile lands above or below its launch point, $y \neq 0$ at landing — and you get a
quadratic in $t$.

:::example Worked example 3 — A ball is projected at $30\text{ m s}^{-1}$ at $35°$ above the horizontal from the top of a wall 8 m high. Find the horizontal distance from the wall at which it lands.
**Solution.**

$$u_x = 30\cos35° = 24.57, \qquad u_y = 30\sin35° = 17.21$$

Take **up as positive**, origin at the launch point. The ball lands 8 m **below**, so $y = -8$.

$$-8 = 17.21t - 4.9t^2$$
$$4.9t^2 - 17.21t - 8 = 0$$

$$t = \frac{17.21 \pm \sqrt{296.2 + 156.8}}{9.8} = \frac{17.21\pm\sqrt{453.0}}{9.8}$$

$$t = 3.927 \quad\text{or}\quad t = -0.416$$

**Reject the negative root** — time cannot be negative.

Horizontal distance:
$$x = 24.57 \times 3.927 = 96.5 = 97 \text{ m (2 s.f.)}$$
:::

:::warning The sign of the landing displacement
Launching from a height and landing on the ground below means $y = -h$, **not** $+h$, if you take
upwards as positive with the origin at the launch point.

Getting this sign wrong produces a quadratic with two negative roots (or two positive ones that are
both wrong), so it's usually detectable — but it's cleanest to just state your convention and apply it
carefully.
:::

---

## 5. The equation of the trajectory

Eliminate $t$ between the two displacement equations to get $y$ in terms of $x$.

:::key The trajectory equation
From $x = ut\cos\theta$ we get $t = \dfrac{x}{u\cos\theta}$. Substituting into
$y = ut\sin\theta - \frac12gt^2$:

$$y = x\tan\theta - \frac{gx^2}{2u^2\cos^2\theta}$$

or, using $\sec^2\theta = 1+\tan^2\theta$:
$$y = x\tan\theta - \frac{gx^2(1+\tan^2\theta)}{2u^2}$$
:::

This is a **quadratic in $x$**, which is why a projectile's path is a **parabola**. You'll be asked to
derive it ("show that…"), so practise the elimination.

:::exam The $\tan^2$ version
The second form is the one used when the question gives you the landing point and asks for the
**angle of projection**. Substituting $x$, $y$ and $u$ gives a **quadratic in $\tan\theta$**, so there
are generally **two** possible angles — a high trajectory and a low one, both hitting the same target.

If you get two angles, that's usually correct, not an error. Quote both unless the question restricts
you.
:::

---

## In the exam

- **Split into components in the first line.** Write $u_x = \dots$ and $u_y = \dots$ before anything
  else.
- The horizontal velocity is **constant**. There's no horizontal SUVAT beyond $x = u_x t$.
- Use the **vertical** motion to find $t$, almost always.
- State your positive direction, and get the sign of the landing height right.
- Reject negative times with a reason.
- Speed on impact needs **both** components combined by Pythagoras.
- "State an assumption": the projectile is a **particle**, so air resistance and spin are ignored;
  $g$ is constant; there is no wind.
- 2 s.f. when $g$ is used.

---

## Practice

:::question Q1 (5 marks)
A ball is projected from ground level at $20\text{ m s}^{-1}$ at $30°$ above the horizontal.
Find (a) the time of flight, (b) the maximum height, (c) the range.
:::
:::answer
$$u_x = 20\cos30° = 17.32, \qquad u_y = 20\sin30° = 10$$

**(a)** Returns to $y=0$:
$$0 = 10t - 4.9t^2 = t(10-4.9t) \;\Rightarrow\; t = \frac{10}{4.9} = 2.041 = 2.0 \text{ s}$$

**(b)** At the top, $v_y = 0$:
$$0 = 100 - 19.6s \;\Rightarrow\; s = 5.102 = 5.1 \text{ m}$$

**(c)**
$$x = 17.32\times2.041 = 35.35 = 35 \text{ m (2 s.f.)}$$
:::

:::question Q2 (5 marks)
A stone is thrown horizontally at $15\text{ m s}^{-1}$ from a height of 20 m. Find (a) the time to land,
(b) the horizontal distance travelled, (c) the speed on landing.
:::
:::answer
**(a)** Vertically (down positive): $u=0$, $a=9.8$, $s=20$:
$$20 = 4.9t^2 \;\Rightarrow\; t = 2.020 = 2.0 \text{ s}$$

**(b)** $x = 15\times2.020 = 30.3 = 30$ m (2 s.f.)

**(c)** $v_y = 9.8\times2.020 = 19.80\text{ m s}^{-1}$; $v_x = 15$ throughout.
$$\text{speed} = \sqrt{225 + 392} = \sqrt{617} = 24.8 = 25\text{ m s}^{-1}$$
:::

:::question Q3 (6 marks)
A ball is kicked from ground level at $14\text{ m s}^{-1}$ at $60°$ to the horizontal, towards a wall
6 m away. Find the height at which it strikes the wall.
:::
:::answer
$$u_x = 14\cos60° = 7, \qquad u_y = 14\sin60° = 12.12$$

**Time to reach the wall** (horizontal motion):
$$6 = 7t \;\Rightarrow\; t = 0.8571 \text{ s}$$

**Height at that time** (vertical motion):
$$y = 12.12(0.8571) - 4.9(0.8571)^2 = 10.39 - 3.600 = 6.79 = 6.8 \text{ m (2 s.f.)}$$

*(Sanity check: the maximum height is $\frac{12.12^2}{19.6} = 7.50$ m, reached at $t = 1.24$ s. At
$t = 0.857$ s the ball is still rising and is at 6.79 m — just below the peak ✓)*
:::

:::question Q4 (6 marks)
A projectile is launched at $22\text{ m s}^{-1}$ at $50°$ above the horizontal from the top of a
building 12 m high.

(a) Find the time of flight.

(b) Find the horizontal distance from the base of the building at which it lands.
:::
:::answer
$$u_x = 22\cos50° = 14.14, \qquad u_y = 22\sin50° = 16.85$$

**(a)** Taking up as positive, the ball lands at $y = -12$:
$$-12 = 16.85t - 4.9t^2$$
$$4.9t^2 - 16.85t - 12 = 0$$
$$t = \frac{16.85\pm\sqrt{283.9 + 235.2}}{9.8} = \frac{16.85\pm22.78}{9.8}$$

$t = 4.044$ or $t = -0.605$. Reject the negative root.

$$t = 4.0 \text{ s (2 s.f.)}$$

**(b)**
$$x = 14.14\times4.044 = 57.2 = 57 \text{ m (2 s.f.)}$$
:::

:::question Q5 (6 marks)
A particle is projected from the origin with speed $u$ at an angle $\theta$ above the horizontal.

Show that the equation of its trajectory is
$$y = x\tan\theta - \frac{gx^2}{2u^2\cos^2\theta}$$
:::
:::answer
**Horizontally** (constant velocity):
$$x = ut\cos\theta \;\Rightarrow\; t = \frac{x}{u\cos\theta}$$

**Vertically** (taking up as positive, $a = -g$):
$$y = ut\sin\theta - \tfrac12gt^2$$

Substitute for $t$:
$$y = u\sin\theta\left(\frac{x}{u\cos\theta}\right) - \frac{g}{2}\left(\frac{x}{u\cos\theta}\right)^2$$

The first term: the $u$ cancels and $\frac{\sin\theta}{\cos\theta} = \tan\theta$, giving $x\tan\theta$.

The second term: $\frac{g}{2}\cdot\frac{x^2}{u^2\cos^2\theta} = \frac{gx^2}{2u^2\cos^2\theta}$.

$$y = x\tan\theta - \frac{gx^2}{2u^2\cos^2\theta} \quad\blacksquare$$

*(Note this is a quadratic in $x$ with a negative $x^2$ coefficient — a downward parabola, exactly as
expected.)*
:::

:::question Q6 (7 marks) — synoptic
A golf ball is struck from level ground with speed $u$ at $25°$ above the horizontal. It lands 140 m
away on the same level.

(a) Find $u$.

(b) Find the maximum height reached.

(c) State two assumptions in this model, and for each say how the real answer would differ.
:::
:::answer
**(a)** Using the range formula:
$$R = \frac{u^2\sin2\theta}{g} \;\Rightarrow\; 140 = \frac{u^2\sin50°}{9.8}$$
$$u^2 = \frac{140\times9.8}{0.7660} = 1791$$
$$u = 42.3 = 42\text{ m s}^{-1} \text{ (2 s.f.)}$$

**(b)**
$$H = \frac{u^2\sin^2 25°}{2g} = \frac{1791\times0.1786}{19.6} = 16.3 = 16 \text{ m (2 s.f.)}$$

**(c)** Any two of:

**1. Air resistance is ignored** (the ball is modelled as a particle). In reality drag opposes motion
throughout, so the actual range and maximum height would both be **less** than predicted — meaning the
real $u$ needed to travel 140 m is **greater** than 42 m s$^{-1}$.

**2. The ball has no spin.** A real golf ball is struck with backspin, which generates lift and makes
the ball travel **further** than the simple model predicts, with a flatter descent.

**3. $g$ is constant and there is no wind.** Both are good approximations over 140 m; wind is the more
significant of the two and could change the range substantially in either direction.
:::
