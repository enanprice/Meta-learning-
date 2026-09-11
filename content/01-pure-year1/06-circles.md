---
title: Circles
code: P1.6
spec: 3.3
summary: The equation of a circle, completing the square to find centre and radius, tangents, chords, and the circle theorems that get examined.
time: 3 hours
prereq: P1.2 Quadratics, P1.5 Straight Line Graphs
papers: Papers 1 and 2
---

## Why this topic exists

Circle questions are a favourite of examiners because they force you to combine three things at once:
completing the square, the perpendicular gradient rule, and a bit of geometry. A typical 10-mark
circle question is really four small questions from other topics stacked together.

The good news: almost every circle question is solved by one of **three** standard moves, listed in
the "In the exam" section. Learn those and the topic becomes very predictable.

---

## 1. The equation of a circle

:::key Equation of a circle
A circle with centre $(a, b)$ and radius $r$ has equation
$$(x - a)^2 + (y - b)^2 = r^2$$
:::

:::insight Where this comes from
It's Pythagoras, nothing more. A point $(x,y)$ lies on the circle exactly when its distance from the
centre is $r$. The distance formula says
$$\sqrt{(x-a)^2 + (y-b)^2} = r$$
Square both sides and you have the equation. Every circle equation you ever write is a squared
distance statement.

This also tells you what the $r^2$ on the right is: it's the radius **squared**. If the equation says
$= 25$, the radius is $5$, not $25$. If it says $= 10$, the radius is $\sqrt{10}$.
:::

Special case: centre at the origin gives $x^2 + y^2 = r^2$.

:::warning Sign flips
$(x-3)^2 + (y+4)^2 = 16$ has centre $(3, -4)$ — note **both** signs flip relative to what's written,
because the form is $(x - a)$ and $(y - b)$. Here $y + 4 = y - (-4)$, so $b = -4$.
:::

---

## 2. The expanded form, and completing the square

Circles are often given expanded:
$$x^2 + y^2 + 2fx + 2gy + c = 0$$

To find the centre and radius, **complete the square in $x$ and in $y$ separately**.

:::example Worked example 1 — Find the centre and radius of $x^2 + y^2 - 6x + 10y + 9 = 0$
**Solution.**

Group the $x$ terms and the $y$ terms:
$$(x^2 - 6x) + (y^2 + 10y) + 9 = 0$$

Complete the square in each bracket:
$$x^2 - 6x = (x-3)^2 - 9$$
$$y^2 + 10y = (y+5)^2 - 25$$

Substitute back:
$$(x-3)^2 - 9 + (y+5)^2 - 25 + 9 = 0$$
$$(x-3)^2 + (y+5)^2 = 25$$

**Centre $(3, -5)$, radius $5$.**
:::

:::warning The three things that go wrong here
1. Forgetting to subtract the $p^2$ terms (the $-9$ and the $-25$).
2. Moving a term to the right without changing its sign.
3. Giving the radius as $25$ instead of $5$. **Always square-root at the end.**

If the right-hand side comes out **negative**, there is no such circle — a squared distance can't be
negative. If it comes out **zero**, the "circle" is a single point.
:::

---

## 3. The three circle facts that get examined

:::key Circle geometry you need
1. **A tangent is perpendicular to the radius** at the point of contact.
2. **The perpendicular bisector of a chord passes through the centre.**
3. **The angle in a semicircle is 90°** — so if $\angle ABC = 90°$, then $AC$ is a diameter.
:::

These three facts are the engine of almost every circle question.

### Fact 1 in action: finding a tangent

:::example Worked example 2 — The circle $C$ has equation $(x-2)^2 + (y-1)^2 = 25$. Show that $P(5, 5)$ lies on $C$, and find the equation of the tangent to $C$ at $P$.
**Solution.**

*Is $P$ on the circle?* Substitute:
$$(5-2)^2 + (5-1)^2 = 9 + 16 = 25 \;\checkmark$$

*Gradient of the radius* from centre $(2,1)$ to $P(5,5)$:
$$m_{\text{rad}} = \frac{5-1}{5-2} = \frac43$$

*Gradient of the tangent* — perpendicular to the radius:
$$m_{\text{tan}} = -\frac34$$

*Equation through $P(5,5)$:*
$$y - 5 = -\tfrac34(x - 5)$$
$$4y - 20 = -3x + 15$$
$$3x + 4y - 35 = 0$$
:::

:::warning When the radius is horizontal or vertical
If the radius from the centre to the point of contact is **horizontal**, the tangent is **vertical**,
with equation $x = k$ -- the negative-reciprocal rule can't be used because a vertical line has no
gradient. Likewise a vertical radius gives a horizontal tangent $y = k$. Examiners set this case
deliberately, so check whether your radius gradient is $0$ or undefined before reaching for the rule.
:::

:::method The tangent-at-a-point recipe
1. Find the centre (complete the square if necessary).
2. Gradient of radius = (centre to point).
3. Gradient of tangent = negative reciprocal.
4. Point–gradient form through the given point.

You will use this in half a dozen exam questions. It never changes.
:::

### Fact 2 in action: finding a centre from three points

Given three points on a circle, the centre is where the perpendicular bisectors of two chords meet.

:::method Centre from three points
1. Pick two pairs of points (two chords).
2. For each chord: find the midpoint and the gradient, then write the perpendicular bisector.
3. Solve the two bisector equations simultaneously — that intersection is the centre.
4. Radius = distance from the centre to any one of the three points.
:::

### Fact 3 in action

If a question tells you a triangle inscribed in a circle is right-angled, the hypotenuse is a
diameter — so the centre is its midpoint and the radius is half its length. That converts a nasty
three-point problem into a two-line one. (This is exactly Q6 in P1.5.)

---

## 4. Lines and circles: how many intersections?

Substitute the line into the circle, get a quadratic, and use the discriminant.

| Discriminant | Geometry |
|---|---|
| $b^2 - 4ac > 0$ | The line is a **chord** — cuts the circle twice |
| $b^2 - 4ac = 0$ | The line is a **tangent** — touches once |
| $b^2 - 4ac < 0$ | The line **misses** the circle |

:::example Worked example 3 — Show that the line $y = x + 1$ is a tangent to the circle $x^2 + y^2 - 4x - 2y + 3 = 0$, and find the point of contact.
**Solution.**

Substitute $y = x+1$:
$$x^2 + (x+1)^2 - 4x - 2(x+1) + 3 = 0$$
$$x^2 + x^2 + 2x + 1 - 4x - 2x - 2 + 3 = 0$$
$$2x^2 - 4x + 2 = 0$$
$$x^2 - 2x + 1 = 0$$

Discriminant: $(-2)^2 - 4(1)(1) = 0$, so there is exactly one solution — the line is a **tangent**.
$\blacksquare$

Point of contact: $(x-1)^2 = 0 \Rightarrow x = 1$, and then $y = 1 + 1 = 2$.

**Point of contact: $(1, 2)$.**

*(Alternative check: the circle is $(x-2)^2 + (y-1)^2 = 2$, centre $(2,1)$, $r = \sqrt2$. The
perpendicular distance from $(2,1)$ to the line $x - y + 1 = 0$ is
$\frac{|2 - 1 + 1|}{\sqrt{1+1}} = \frac{2}{\sqrt2} = \sqrt 2 = r$ ✓ — the distance equals the radius,
which is the definition of a tangent.)*
:::

---

## 5. Chord length

Two reliable routes:

**Route A (algebra):** find both intersection points, then use the distance formula.

**Route B (geometry — usually faster):** drop a perpendicular from the centre to the chord. It
bisects the chord, creating a right-angled triangle with hypotenuse $r$, one leg $d$ (the
perpendicular distance from the centre to the line), and the other leg equal to **half** the chord.
Then
$$\text{chord} = 2\sqrt{r^2 - d^2}$$

:::warning Don't forget to double
The right-angled triangle gives you *half* the chord. Forgetting the factor of 2 is the standard
error here.
:::

---

## In the exam

Almost every circle question is one of these:

1. **"Find the centre and radius"** → complete the square.
2. **"Find the tangent/normal at $P$"** → radius gradient, then negative reciprocal.
3. **"Show the line is a tangent"** → substitute and show the discriminant is zero (or show the
   perpendicular distance from the centre equals the radius).

Other habits worth having:

- **Draw the circle.** Even roughly. It catches sign errors in the centre instantly.
- For "does the point lie inside/on/outside the circle?": compute the distance from the centre and
  compare with $r$. Less than $r$ → inside; equal → on; greater → outside.
- If a tangent is drawn from an external point $T$ to a point of contact $P$, then $\triangle OPT$ is
  right-angled at $P$, so $|TP| = \sqrt{|OT|^2 - r^2}$. This is a very common 4-mark question.

---

## Practice

:::question Q1 (3 marks)
Write down the centre and radius of the circle $(x+4)^2 + (y-7)^2 = 81$.
:::
:::answer
Centre $(-4, 7)$ (both signs flip from what's written), radius $\sqrt{81} = 9$.
:::

:::question Q2 (4 marks)
Find the centre and radius of the circle $x^2 + y^2 + 8x - 2y - 8 = 0$.
:::
:::answer
$$(x^2 + 8x) + (y^2 - 2y) - 8 = 0$$
$$\left[(x+4)^2 - 16\right] + \left[(y-1)^2 - 1\right] - 8 = 0$$
$$(x+4)^2 + (y-1)^2 = 25$$

**Centre $(-4, 1)$, radius $5$.**
:::

:::question Q3 (5 marks)
The circle $C$ has centre $(3, -2)$ and passes through the point $A(7, 1)$.

(a) Find the equation of $C$.

(b) Find the equation of the tangent to $C$ at $A$, in the form $ax+by+c=0$.
:::
:::answer
**(a)** Radius $= \sqrt{(7-3)^2 + (1-(-2))^2} = \sqrt{16+9} = 5$.
$$(x-3)^2 + (y+2)^2 = 25$$

**(b)** Gradient of radius: $\dfrac{1-(-2)}{7-3} = \dfrac34$. Tangent gradient: $-\dfrac43$.

$$y - 1 = -\tfrac43(x - 7)$$
$$3y - 3 = -4x + 28$$
$$4x + 3y - 31 = 0$$
:::

:::question Q4 (5 marks)
Show that the line $y = 2x - 3$ intersects the circle $x^2 + y^2 = 9$ at two distinct points, and find
their coordinates.
:::
:::answer
Substitute:
$$x^2 + (2x-3)^2 = 9$$
$$x^2 + 4x^2 - 12x + 9 = 9$$
$$5x^2 - 12x = 0$$
$$x(5x - 12) = 0 \;\Rightarrow\; x = 0 \text{ or } x = \tfrac{12}{5}$$

Two distinct real solutions, so two distinct intersection points. $\blacksquare$

$x = 0 \Rightarrow y = -3$: point $(0, -3)$.

$x = \frac{12}{5} \Rightarrow y = \frac{24}{5} - 3 = \frac95$: point $\left(\frac{12}{5}, \frac95\right)$.

**Check:** $\left(\frac{12}{5}\right)^2 + \left(\frac95\right)^2 = \frac{144 + 81}{25} = \frac{225}{25}
= 9$ ✓
:::

:::question Q5 (5 marks)
The line $y = 3x + k$ is a tangent to the circle $x^2 + y^2 = 10$. Find the two possible values of $k$.
:::
:::answer
Substitute:
$$x^2 + (3x+k)^2 = 10$$
$$x^2 + 9x^2 + 6kx + k^2 - 10 = 0$$
$$10x^2 + 6kx + (k^2 - 10) = 0$$

Tangent ⟹ discriminant $= 0$:
$$(6k)^2 - 4(10)(k^2 - 10) = 0$$
$$36k^2 - 40k^2 + 400 = 0$$
$$-4k^2 = -400 \;\Rightarrow\; k^2 = 100 \;\Rightarrow\; k = \pm 10$$

*(Two answers makes sense geometrically: there is a tangent of gradient 3 on each side of the circle.)*
:::

:::question Q6 (6 marks) — synoptic
The points $A(1, 2)$ and $B(7, 10)$ are the ends of a diameter of a circle $C$.

(a) Find the centre and radius of $C$.

(b) Write down the equation of $C$.

(c) Verify that $P(8, 3)$ lies on $C$, and find the equation of the tangent at $P$.
:::
:::answer
**(a)** Centre = midpoint of $AB$ = $\left(\frac{1+7}{2}, \frac{2+10}{2}\right) = (4, 6)$.

Radius = half of $|AB|$. $|AB| = \sqrt{36 + 64} = 10$, so $r = 5$.

**(b)** $(x-4)^2 + (y-6)^2 = 25$

**(c)** Check $P$: $(8-4)^2 + (3-6)^2 = 16 + 9 = 25$ ✓, so $P$ lies on $C$.

Gradient of the radius from $(4,6)$ to $(8,3)$:
$$m_{\text{rad}} = \frac{3-6}{8-4} = -\frac34$$

Tangent gradient (negative reciprocal): $m = \frac43$.

$$y - 3 = \tfrac43(x - 8)$$
$$3y - 9 = 4x - 32$$
$$4x - 3y - 23 = 0$$
:::

:::question Q7 (7 marks) — stretch
The circle $C$ has equation $x^2 + y^2 - 10x - 4y + 20 = 0$.

(a) Find the centre and radius of $C$.

(b) The point $T(1, 6)$ lies outside $C$. Find the length of the tangent from $T$ to $C$.

(c) Find the length of the chord cut on $C$ by the line $y = 2$.
:::
:::answer
**(a)**
$$(x^2 - 10x) + (y^2 - 4y) + 20 = 0$$
$$\left[(x-5)^2 - 25\right] + \left[(y-2)^2 - 4\right] + 20 = 0$$
$$(x-5)^2 + (y-2)^2 = 9$$

Centre $(5, 2)$, radius $3$.

**(b)** Distance from centre to $T$:
$$|OT| = \sqrt{(1-5)^2 + (6-2)^2} = \sqrt{16+16} = \sqrt{32}$$

Since $\sqrt{32} > 3$, $T$ is indeed outside. The tangent, radius and centre-to-$T$ line form a
right-angled triangle with the right angle at the point of contact:
$$\text{tangent length} = \sqrt{32 - 9} = \sqrt{23}$$

**(c)** The line $y = 2$ passes **through the centre** $(5,2)$, so the chord is a diameter:
$$\text{chord length} = 2r = 6$$

*(Confirm algebraically: $(x-5)^2 + 0 = 9 \Rightarrow x = 2$ or $8$, and $8 - 2 = 6$ ✓)*
:::
