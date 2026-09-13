---
title: Radians
code: P2.5
spec: 5.1, 5.4
summary: Why radians exist, converting, arc length and sector area, exact values, and the small angle approximations.
time: 3 hours
prereq: P1.10 Trig Identities and Equations
papers: Papers 1 and 2
---

## Why this topic exists

Degrees are arbitrary. There is no mathematical reason a full turn should be 360 — it's a Babylonian
convention based on a roughly-360-day year.

Radians are the natural unit, and the payoff is enormous: **the calculus of trig functions only works
in radians**. $\frac{d}{dx}(\sin x) = \cos x$ is true in radians and false in degrees (in degrees you'd
get an ugly factor of $\frac{\pi}{180}$ every time). From here to the end of the course, radians are
the default.

---

## 1. What a radian is

:::key Definition
**One radian** is the angle subtended at the centre of a circle by an arc equal in length to the radius.
:::

Since the full circumference is $2\pi r$, going all the way round uses $2\pi$ radius-lengths of arc:

$$2\pi \text{ radians} = 360°$$

:::key Conversions
$$\pi \text{ rad} = 180°$$

**Degrees → radians:** multiply by $\dfrac{\pi}{180}$

**Radians → degrees:** multiply by $\dfrac{180}{\pi}$
:::

| Degrees | $30°$ | $45°$ | $60°$ | $90°$ | $180°$ | $270°$ | $360°$ |
|---|---|---|---|---|---|---|---|
| Radians | $\frac{\pi}{6}$ | $\frac{\pi}{4}$ | $\frac{\pi}{3}$ | $\frac{\pi}{2}$ | $\pi$ | $\frac{3\pi}{2}$ | $2\pi$ |

Learn this row. It appears in every Year 13 trig question.

:::warning The mode switch
If an angle is written **without** a degree symbol, it's in radians. $\sin 2$ means the sine of 2
radians ($\approx 0.909$), not of 2 degrees ($\approx 0.035$).

Set your calculator to radian mode for all of Year 13 pure and **check it** at the start of every
question. A whole page of correct method in the wrong mode scores almost nothing.
:::

---

## 2. Arc length and sector area

These are beautifully simple in radians — which is part of the argument for radians existing.

:::key Arc and sector formulae ($\theta$ in radians)
$$\text{Arc length: } s = r\theta$$
$$\text{Sector area: } A = \tfrac12 r^2\theta$$

Both are in the formula booklet. Both are **wrong if $\theta$ is in degrees.**
:::

:::insight Why they're so clean
A full circle is $\theta = 2\pi$. The arc formula gives $s = r(2\pi) = 2\pi r$ — the circumference ✓
The area formula gives $A = \frac12 r^2 (2\pi) = \pi r^2$ ✓

Both formulae are just "the fraction $\frac{\theta}{2\pi}$ of the whole circle", with the $2\pi$s
cancelling. In degrees you'd be writing $\frac{\theta}{360}\times 2\pi r$, which is why nobody does.
:::

### Segments

A **segment** is the region between a chord and the arc. Its area is
$$\text{sector} - \text{triangle} = \tfrac12 r^2\theta - \tfrac12 r^2\sin\theta = \tfrac12 r^2(\theta - \sin\theta)$$

:::figure sector-segment
The segment is what is left when the triangle is cut away from the sector. Both $\theta$s in the
formula need radian mode — the first as a pure number, the second inside a sine.
:::

:::warning $\theta$ appears twice in different roles
In $\frac12 r^2(\theta - \sin\theta)$, the first $\theta$ is used as a pure number (from the sector
formula) and the second is inside a sine. **Both need radian mode.** This formula is the classic place
where a degree/radian mix-up produces a plausible-looking wrong answer.
:::

:::example Worked example 1 — A sector of a circle of radius 8 cm has angle $\dfrac{\pi}{3}$. Find the arc length, the sector area, and the area of the corresponding segment. Give exact answers.
**Solution.**

*Arc:*
$$s = r\theta = 8 \times \frac{\pi}{3} = \frac{8\pi}{3} \text{ cm}$$

*Sector:*
$$A = \tfrac12(64)\left(\frac\pi3\right) = \frac{32\pi}{3} \text{ cm}^2$$

*Triangle:*
$$\tfrac12 r^2 \sin\theta = \tfrac12 (64)\sin\frac\pi3 = 32 \times \frac{\sqrt3}{2} = 16\sqrt3 \text{ cm}^2$$

*Segment:*
$$\frac{32\pi}{3} - 16\sqrt3 \text{ cm}^2 \;\approx\; 33.51 - 27.71 = 5.80 \text{ cm}^2$$

*(Sanity check: the segment must be a small slice of the sector. $5.8$ out of $33.5$ ✓)*
:::

:::example Worked example 2 — A sector has perimeter 30 cm and area 50 cm². Find the possible values of $r$.
**Solution.**

The **perimeter** of a sector is two radii plus the arc:
$$2r + r\theta = 30 \;\Rightarrow\; r\theta = 30 - 2r \;\Rightarrow\; \theta = \frac{30-2r}{r}$$

Area:
$$\tfrac12 r^2\theta = 50 \;\Rightarrow\; r^2\theta = 100$$

Substitute:
$$r^2 \times \frac{30-2r}{r} = 100$$
$$r(30 - 2r) = 100$$
$$30r - 2r^2 = 100$$
$$2r^2 - 30r + 100 = 0 \;\Rightarrow\; r^2 - 15r + 50 = 0$$
$$(r-5)(r-10) = 0 \;\Rightarrow\; r = 5 \text{ or } r = 10$$

**Check both are geometrically possible:**
- $r=5$: $\theta = \frac{30-10}{5} = 4$ rad. That's about $229°$ — a reflex angle, but a valid sector.
- $r=10$: $\theta = \frac{30-20}{10} = 1$ rad ✓

Both work.

*(If a question adds "$\theta < \pi$" or "the sector is minor", that's your cue to reject one.)*
:::

:::warning Perimeter of a sector
It's $2r + r\theta$, **not** just $r\theta$. The two straight edges count. Forgetting them is the most
common error in sector questions.
:::

---

## 3. Exact values in radians

Same table as P1.9, re-expressed:

:::key
| $\theta$ | $0$ | $\frac{\pi}{6}$ | $\frac\pi4$ | $\frac\pi3$ | $\frac\pi2$ |
|---|---|---|---|---|---|
| $\sin\theta$ | $0$ | $\frac12$ | $\frac{\sqrt2}{2}$ | $\frac{\sqrt3}{2}$ | $1$ |
| $\cos\theta$ | $1$ | $\frac{\sqrt3}{2}$ | $\frac{\sqrt2}{2}$ | $\frac12$ | $0$ |
| $\tan\theta$ | $0$ | $\frac{1}{\sqrt3}$ | $1$ | $\sqrt3$ | undefined |
:::

Solving trig equations works exactly as in P1.10, but with $\pi$ replacing $180°$:

- **Sine:** $\theta = \alpha$ and $\pi - \alpha$; period $2\pi$
- **Cosine:** $\theta = \alpha$ and $2\pi - \alpha$; period $2\pi$
- **Tangent:** $\theta = \alpha$ and $\pi + \alpha$; period $\pi$

---

## 4. Small angle approximations

:::key For small $\theta$ **in radians**:
$$\sin\theta \approx \theta \qquad \tan\theta \approx \theta \qquad \cos\theta \approx 1 - \frac{\theta^2}{2}$$

These are in the formula booklet.
:::

:::insight Why these work
Look at the unit circle for a tiny angle $\theta$. The arc length is $\theta$ (radius 1), and
$\sin\theta$ is the vertical height of the endpoint. For a very small angle, the arc and the vertical
height are almost the same thing — the arc barely curves. Hence $\sin\theta \approx \theta$.

This is precisely why radians make calculus work: $\lim_{\theta\to0}\frac{\sin\theta}{\theta} = 1$ in
radians, which is the limit that makes $\frac{d}{dx}\sin x = \cos x$ come out clean. In degrees the
limit is $\frac{\pi}{180}$ and every derivative picks up that ugly constant.

Numerically, at $\theta = 0.1$: $\sin(0.1) = 0.09983$, and $\theta = 0.1$. Less than 0.2% out.
:::

:::example Worked example 3 — Find an approximation for $\dfrac{\sin 3\theta}{\theta\cos 2\theta}$ when $\theta$ is small.
**Solution.**

$$\sin 3\theta \approx 3\theta \qquad \cos 2\theta \approx 1 - \frac{(2\theta)^2}{2} = 1 - 2\theta^2$$

$$\frac{\sin3\theta}{\theta\cos2\theta} \approx \frac{3\theta}{\theta(1 - 2\theta^2)} = \frac{3}{1-2\theta^2}$$

For very small $\theta$, $2\theta^2$ is negligible, so this is approximately **3**.

*(If the question wants more precision, expand $(1-2\theta^2)^{-1} \approx 1 + 2\theta^2$ using the
binomial from P2.4, giving $3 + 6\theta^2$.)*
:::

:::warning $(2\theta)^2 = 4\theta^2$
In $\cos 2\theta \approx 1 - \frac{(2\theta)^2}{2}$, the whole of $2\theta$ gets squared, giving
$1 - 2\theta^2$. Writing $1 - \theta^2$ is a very common slip.
:::

---

## In the exam

- **Radian mode.** Check it. Every time.
- "Give your answer in terms of $\pi$" means exact — leave $\frac{8\pi}{3}$, don't write 8.38.
- Sector questions almost always combine arc length, sector area, triangle area and the cosine rule.
  Draw the diagram and label everything before touching a formula.
- Small angle approximations are signposted by the words "when $\theta$ is small" — that's the
  instruction to use them.
- If a sector question gives a perimeter, remember the two radii.

---

## Practice

:::question Q1 (3 marks)
Convert to radians in terms of $\pi$: (a) $150°$, (b) $225°$, (c) $36°$.
:::
:::answer
Multiply by $\frac{\pi}{180}$:

**(a)** $150 \times \frac{\pi}{180} = \frac{5\pi}{6}$

**(b)** $225 \times \frac{\pi}{180} = \frac{5\pi}{4}$

**(c)** $36 \times \frac{\pi}{180} = \frac{\pi}{5}$
:::

:::question Q2 (4 marks)
A sector of a circle of radius 12 cm has an angle of $0.6$ radians. Find its arc length, perimeter and
area.
:::
:::answer
*Arc:* $s = 12 \times 0.6 = 7.2$ cm

*Perimeter:* $2(12) + 7.2 = 31.2$ cm

*Area:* $\frac12(144)(0.6) = 43.2$ cm²
:::

:::question Q3 (5 marks)
A sector $OAB$ of a circle of radius 9 cm has $\angle AOB = \frac{2\pi}{3}$. Find, in exact form,
(a) the area of the sector, (b) the area of triangle $OAB$, (c) the area of the segment.
:::
:::answer
**(a)** $A = \frac12(81)\left(\frac{2\pi}{3}\right) = 27\pi$ cm²

**(b)** $\frac12(81)\sin\frac{2\pi}{3} = \frac{81}{2}\times\frac{\sqrt3}{2} = \frac{81\sqrt3}{4}$ cm²

*(Note $\sin\frac{2\pi}{3} = \sin\frac\pi3 = \frac{\sqrt3}{2}$, by the $\pi - \alpha$ symmetry.)*

**(c)** Segment $= 27\pi - \frac{81\sqrt3}{4} \approx 84.82 - 35.07 = 49.8$ cm²
:::

:::question Q4 (4 marks)
Solve $2\sin\theta = 1$ for $0 \leq \theta \leq 2\pi$, giving exact answers.
:::
:::answer
$$\sin\theta = \tfrac12$$

Reference angle $\frac\pi6$. Sine positive ⟹ quadrants 1 and 2:
$$\theta = \frac{\pi}{6}, \qquad \theta = \pi - \frac\pi6 = \frac{5\pi}{6}$$
:::

:::question Q5 (5 marks)
Solve $\cos 2x = -\dfrac{\sqrt3}{2}$ for $0 \leq x \leq 2\pi$, giving exact answers.
:::
:::answer
Let $u = 2x$; the interval becomes $0 \leq u \leq 4\pi$.

Reference angle: $\cos^{-1}\frac{\sqrt3}{2} = \frac\pi6$. Cosine **negative** ⟹ quadrants 2 and 3:
$$u = \pi - \frac\pi6 = \frac{5\pi}{6}, \qquad u = \pi + \frac\pi6 = \frac{7\pi}{6}$$

Add $2\pi$ to each to stay inside $4\pi$:
$$u = \frac{17\pi}{6}, \qquad u = \frac{19\pi}{6}$$

Halve everything:
$$x = \frac{5\pi}{12}, \; \frac{7\pi}{12}, \; \frac{17\pi}{12}, \; \frac{19\pi}{12}$$
:::

:::question Q6 (5 marks)
When $\theta$ is small, show that
$$\frac{\cos 4\theta - 1}{\theta\sin 2\theta} \approx -4$$
:::
:::answer
$$\cos 4\theta \approx 1 - \frac{(4\theta)^2}{2} = 1 - 8\theta^2$$
$$\sin 2\theta \approx 2\theta$$

Numerator: $\cos4\theta - 1 \approx (1 - 8\theta^2) - 1 = -8\theta^2$

Denominator: $\theta \times 2\theta = 2\theta^2$

$$\frac{-8\theta^2}{2\theta^2} = -4 \quad \blacksquare$$

*(The $\theta^2$ cancelling exactly is the sign you've used the right number of terms. If something
doesn't cancel, you've probably approximated $\cos$ to too few terms.)*
:::

:::question Q7 (7 marks) — synoptic
The diagram shows a sector $OAB$ of a circle with centre $O$ and radius $r$ cm, where
$\angle AOB = \theta$ radians. The perimeter of the sector is 24 cm.

(a) Show that the area of the sector is $A = 12r - r^2$.

(b) Find the value of $r$ that maximises the area, and find that maximum area.

(c) Find the corresponding value of $\theta$.
:::
:::answer
**(a)** Perimeter: $2r + r\theta = 24 \Rightarrow r\theta = 24 - 2r$.

Area:
$$A = \tfrac12 r^2\theta = \tfrac12 r(r\theta) = \tfrac12 r(24 - 2r) = 12r - r^2 \quad\blacksquare$$

**(b)** Differentiate (P1.12):
$$\frac{dA}{dr} = 12 - 2r = 0 \;\Rightarrow\; r = 6$$

$$\frac{d^2A}{dr^2} = -2 < 0 \;\Rightarrow\; \text{maximum} \;\checkmark$$

$$A_{\max} = 12(6) - 36 = 36 \text{ cm}^2$$

**(c)** $r\theta = 24 - 2(6) = 12$, so $\theta = \frac{12}{6} = 2$ radians.

*(Neat result: the optimal sector has $\theta = 2$ radians, roughly $114.6°$ — and note the arc length
$r\theta = 12$ equals the two radii combined. The same "half the perimeter each way" pattern as the
optimal rectangle.)*
:::
