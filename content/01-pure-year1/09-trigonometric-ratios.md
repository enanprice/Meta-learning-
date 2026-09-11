---
title: Trigonometric Ratios
code: P1.9
spec: 5.1, 5.2, 5.7
summary: Exact values, the sine and cosine rules, the ambiguous case, the area formula, and trig in 3D and bearings.
time: 4 hours
prereq: GCSE trigonometry
papers: Papers 1 and 2
---

## Why this topic exists

GCSE trig only works in right-angled triangles. The sine and cosine rules remove that restriction:
now you can solve **any** triangle, which means you can solve almost any geometry problem, any
bearings problem, and (in Year 13 mechanics) any force-resolution problem that isn't at right angles.

---

## 1. The foundations you need instantly

### Right-angled triangles (SOH CAH TOA)

$$\sin\theta = \frac{\text{opp}}{\text{hyp}} \qquad \cos\theta = \frac{\text{adj}}{\text{hyp}}
\qquad \tan\theta = \frac{\text{opp}}{\text{adj}}$$

### Exact values — memorise these

:::key Exact trig values
| $\theta$ | $0°$ | $30°$ | $45°$ | $60°$ | $90°$ |
|---|---|---|---|---|---|
| $\sin\theta$ | $0$ | $\frac12$ | $\frac{\sqrt2}{2}$ | $\frac{\sqrt3}{2}$ | $1$ |
| $\cos\theta$ | $1$ | $\frac{\sqrt3}{2}$ | $\frac{\sqrt2}{2}$ | $\frac12$ | $0$ |
| $\tan\theta$ | $0$ | $\frac{1}{\sqrt3}$ | $1$ | $\sqrt3$ | undefined |

These are **not** in the formula booklet. They are examined in "exact value" and "surd form" questions
constantly.
:::

:::insight Where these come from (so you can rebuild them if you blank)
**$45°$:** take a square of side 1 and cut it along the diagonal. You get a right-angled triangle with
legs 1, 1 and hypotenuse $\sqrt2$. So $\sin 45 = \cos 45 = \frac{1}{\sqrt2} = \frac{\sqrt2}{2}$, and
$\tan 45 = 1$.

**$30°$ and $60°$:** take an equilateral triangle of side 2 and cut it down the middle. You get a
right-angled triangle with hypotenuse 2, short side 1 (half the base) and, by Pythagoras, height
$\sqrt3$. The angles are $30°$ and $60°$. So $\sin 30 = \frac12$, $\cos 30 = \frac{\sqrt3}{2}$,
$\tan 60 = \frac{\sqrt3}{1} = \sqrt3$, and so on.

Two triangles, all six values. Draw them in the margin at the start of any exam.
:::

---

## 2. The sine rule

:::key The sine rule
$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}$$

or, flipped, for finding angles:
$$\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}$$

Here $a$ is the side **opposite** angle $A$, and so on.
:::

**Use the sine rule when you have a matching side–angle pair** — a side and the angle opposite it.

:::example Worked example 1 — In triangle $ABC$, $A = 50°$, $B = 70°$, $a = 8$ cm. Find $b$.
**Solution.**

We have the pair ($a$, $A$) and want $b$, so the sine rule applies:
$$\frac{b}{\sin 70°} = \frac{8}{\sin 50°}$$
$$b = \frac{8\sin 70°}{\sin 50°} = 9.81 \text{ cm (3 s.f.)}$$

*(Sanity check: $B > A$, so $b$ should be longer than $a$. It is. Always check that the bigger angle
faces the bigger side.)*
:::

### The ambiguous case

:::warning Two possible triangles
When you use the sine rule to find an **angle**, your calculator gives you the acute answer — but
$\sin\theta = \sin(180° - \theta)$, so there may be an obtuse solution too.

This happens when you're given two sides and a **non-included** angle (SSA). Sometimes both triangles
exist; sometimes only one does.
:::

:::example Worked example 2 — In triangle $ABC$, $a = 6$ cm, $b = 8$ cm, $A = 35°$. Find the two possible values of $B$.
**Solution.**
$$\frac{\sin B}{8} = \frac{\sin 35°}{6}$$
$$\sin B = \frac{8\sin 35°}{6} = 0.7648$$

The calculator gives $B = 49.9°$ (1 d.p.).

But $\sin(180° - 49.9°) = \sin 130.1°$ is the same value, so $B = 130.1°$ is also possible.

**Check both are geometrically valid:** we need $A + B < 180°$.
- $35 + 49.9 = 84.9°$ ✓ (leaves $C = 95.1°$)
- $35 + 130.1 = 165.1°$ ✓ (leaves $C = 14.9°$)

Both work, so $B = 49.9°$ **or** $130.1°$.
:::

:::method Handling the ambiguous case
1. Find the acute angle from your calculator.
2. Compute $180° - (\text{that angle})$.
3. **Test each** by checking the three angles still sum to under $180°$ with room to spare.
4. Discard any that fail; present the ones that survive.

If the question says "the angle is obtuse" or gives a diagram, use that to pick. If it gives neither,
you may well be expected to give both.
:::

---

## 3. The cosine rule

:::key The cosine rule
$$a^2 = b^2 + c^2 - 2bc\cos A$$

rearranged for an angle:
$$\cos A = \frac{b^2 + c^2 - a^2}{2bc}$$
:::

**Use the cosine rule when the sine rule can't start** — that is, when you have:

- **three sides** (SSS), and want an angle; or
- **two sides and the included angle** (SAS), and want the third side.

:::insight The cosine rule is Pythagoras with a correction term
If $A = 90°$, then $\cos A = 0$ and the rule collapses to $a^2 = b^2 + c^2$ — Pythagoras.

The term $-2bc\cos A$ is the correction for the angle not being a right angle:
- If $A$ is **acute**, $\cos A > 0$, so we subtract something: $a$ is **shorter** than Pythagoras
  would give.
- If $A$ is **obtuse**, $\cos A < 0$, so we add: $a$ is **longer**.

That also means an obtuse angle comes out of $\cos^{-1}$ automatically — unlike the sine rule, the
cosine rule is never ambiguous. **If you can use the cosine rule for an angle, do — it avoids the
whole ambiguity problem.**
:::

:::example Worked example 3 — In triangle $ABC$, $a = 7$, $b = 9$, $C = 40°$. Find $c$.
**Solution.**

Two sides and the included angle — cosine rule, with $C$ opposite $c$:
$$c^2 = a^2 + b^2 - 2ab\cos C = 49 + 81 - 2(7)(9)\cos 40°$$
$$c^2 = 130 - 126\cos 40° = 33.478$$
$$c = 5.79 \text{ (3 s.f.)}$$
:::

:::example Worked example 4 — A triangle has sides 7, 9, 10. Find the largest angle.
**Solution.**

The largest angle faces the largest side, so it's the angle opposite the side of length 10. Call it
$\theta$, with the other two sides 9 and 7:
$$\cos\theta = \frac{9^2 + 7^2 - 10^2}{2(9)(7)} = \frac{81 + 49 - 100}{126} = \frac{30}{126} = 0.2381$$
$$\theta = 76.2° \text{ (1 d.p.)}$$

*(Because $\cos\theta > 0$, the angle is acute — so this triangle has no obtuse angle at all.)*
:::

:::warning Order of operations
$a^2 = b^2 + c^2 - 2bc\cos A$ means $b^2 + c^2 - (2 \times b \times c \times \cos A)$. Do **not**
compute $(b^2 + c^2 - 2bc)$ and then multiply by $\cos A$. And don't forget to square-root at the end —
you've found $a^2$, not $a$.
:::

---

## 4. Area of a triangle

:::key
$$\text{Area} = \tfrac12 ab \sin C$$

where $C$ is the angle **between** sides $a$ and $b$ (the included angle).
:::

:::example Worked example 5 — Find the area of a triangle with sides 8 cm and 11 cm and an included angle of 35°.
**Solution.**
$$\text{Area} = \tfrac12 (8)(11)\sin 35° = 44\sin 35° = 25.2 \text{ cm}^2 \text{ (3 s.f.)}$$
:::

:::warning The angle must be between the two sides
$\frac12 ab\sin C$ only works if $C$ sits between $a$ and $b$. If you're given a non-included angle,
find the included one first (angles in a triangle sum to $180°$), or find the third side.
:::

---

## 5. Which rule? A decision procedure

:::method Choosing between the rules
Label the triangle. Then:

| What you have | What you want | Use |
|---|---|---|
| A matching side–angle pair | Another side or angle | **Sine rule** |
| Two sides + included angle (SAS) | Third side | **Cosine rule** |
| Three sides (SSS) | Any angle | **Cosine rule** |
| Two sides + included angle | Area | **$\frac12 ab\sin C$** |
| Right angle present | Anything | **SOH CAH TOA / Pythagoras** (faster) |

**The test:** can you see a side and the angle directly opposite it, both known? If yes → sine rule.
If no → cosine rule.
:::

Often a multi-part question needs both: cosine rule to get a missing side, then sine rule to get an
angle (or better, the cosine rule again, to dodge ambiguity).

---

## 6. Bearings and 3D problems

**Bearings** are measured **clockwise from north**, always written with three figures ($045°$, not $45°$).

:::method Bearings problems
1. Draw a clear diagram with a north arrow at **each** relevant point.
2. Mark all known distances and angles.
3. Use angle facts (angles on a straight line, alternate angles between the parallel north lines) to
   find the angles **inside the triangle**.
4. Apply the sine or cosine rule.
5. Convert your answer back into a bearing if required.

Step 3 is where the marks are lost. The angle in the triangle is almost never the bearing itself.
:::

**3D problems**: identify a right-angled triangle inside the solid, redraw it *flat* as a 2D triangle,
and solve that. Never try to do trig on the 3D picture — always extract the triangle first.

---

## In the exam

- **Keep full accuracy** in intermediate steps. If you round an angle to 1 d.p. and then use it to find
  a side, you'll be out in the third significant figure and lose an accuracy mark. Use `ANS` or store
  values in your calculator.
- **Check degree mode.** If your answer is wildly wrong, this is the first thing to check. Year 13 pure
  is in radians, so it's easy to leave the calculator in the wrong mode.
- Diagrams in questions are **not to scale**, but they do tell you whether an angle is acute or obtuse —
  use that for the ambiguous case.
- "Exact value" means use the surd table, not the calculator's decimal.

---

## Practice

:::question Q1 (3 marks)
In triangle $ABC$, $AB = 9$ cm, $\angle ABC = 65°$ and $\angle BCA = 48°$. Find $AC$.
:::
:::answer
$AB$ is the side opposite $\angle BCA = 48°$ (call it $c = 9$, $C = 48°$); $AC$ is opposite
$\angle ABC = 65°$ (so $b = AC$, $B = 65°$).

$$\frac{AC}{\sin 65°} = \frac{9}{\sin 48°}$$
$$AC = \frac{9\sin 65°}{\sin 48°} = 10.98 = 11.0 \text{ cm (3 s.f.)}$$
:::

:::question Q2 (3 marks)
A triangle has sides 5 cm and 12 cm with an included angle of $110°$. Find the third side.
:::
:::answer
$$x^2 = 5^2 + 12^2 - 2(5)(12)\cos 110°$$
$$= 25 + 144 - 120\cos 110° = 169 + 41.04 = 210.04$$
$$x = 14.5 \text{ cm (3 s.f.)}$$

*(Note $\cos 110°$ is negative, so the $-120\cos110°$ term **adds** — consistent with the obtuse angle
making the opposite side longer.)*
:::

:::question Q3 (4 marks)
A triangle has sides of length 6 cm, 8 cm and 11 cm. Find its largest angle and its area.
:::
:::answer
Largest angle faces the 11 cm side:
$$\cos\theta = \frac{6^2 + 8^2 - 11^2}{2(6)(8)} = \frac{36+64-121}{96} = \frac{-21}{96} = -0.21875$$
$$\theta = 102.6° \text{ (1 d.p.)}$$

*(Negative cosine ⟹ obtuse ✓)*

Area, using the two sides enclosing that angle:
$$\tfrac12(6)(8)\sin 102.6° = 24 \times 0.9758 = 23.4 \text{ cm}^2 \text{ (3 s.f.)}$$
:::

:::question Q4 (5 marks)
In triangle $PQR$, $PQ = 10$ cm, $QR = 7$ cm and $\angle QPR = 40°$. Find the two possible values of
$\angle PRQ$.
:::
:::answer
$QR = 7$ is opposite $\angle QPR = 40°$; $PQ = 10$ is opposite $\angle PRQ$.

$$\frac{\sin(\angle PRQ)}{10} = \frac{\sin 40°}{7}$$
$$\sin(\angle PRQ) = \frac{10\sin 40°}{7} = 0.9183$$

$\angle PRQ = 66.7°$ or $180° - 66.7° = 113.3°$ (1 d.p.).

Both are valid: $40 + 66.7 = 106.7 < 180$ ✓ and $40 + 113.3 = 153.3 < 180$ ✓.
:::

:::question Q5 (4 marks)
Write down the exact value of:
(a) $\sin 60°$ (b) $\cos 30° \times \tan 60°$ (c) $\dfrac{\sin 45°}{\cos 45°}$ (d) $\sin^2 30° + \cos^2 30°$
:::
:::answer
**(a)** $\dfrac{\sqrt3}{2}$

**(b)** $\dfrac{\sqrt3}{2} \times \sqrt3 = \dfrac{3}{2}$

**(c)** $\dfrac{\sqrt2/2}{\sqrt2/2} = 1$ (which is $\tan 45°$ ✓)

**(d)** $\left(\frac12\right)^2 + \left(\frac{\sqrt3}{2}\right)^2 = \frac14 + \frac34 = 1$

*(That last one is the identity $\sin^2\theta + \cos^2\theta \equiv 1$, coming up in P1.10.)*
:::

:::question Q6 (7 marks) — synoptic
A ship sails from port $A$ on a bearing of $062°$ for 15 km to point $B$. It then changes course to a
bearing of $145°$ and sails 22 km to point $C$.

(a) Show that $\angle ABC = 97°$.

(b) Find the distance $AC$.

(c) Find the bearing of $C$ from $A$.
:::
:::answer
**(a)** Draw north lines at $A$ and $B$ — they're parallel.

The bearing $A \to B$ is $062°$, so the back-bearing $B \to A$ is $062 + 180 = 242°$.

At $B$, the direction to $C$ is $145°$. The angle $\angle ABC$ is the angle between $BA$ and $BC$:
$$242° - 145° = 97° \quad \blacksquare$$

**(b)** Cosine rule in triangle $ABC$ with $AB = 15$, $BC = 22$, included angle $97°$:
$$AC^2 = 15^2 + 22^2 - 2(15)(22)\cos 97°$$
$$= 225 + 484 - 660(-0.12187) = 709 + 80.43 = 789.43$$
$$AC = 28.1 \text{ km (3 s.f.)}$$

**(c)** Find $\angle BAC$ by the sine rule:
$$\frac{\sin(\angle BAC)}{22} = \frac{\sin 97°}{28.10}$$
$$\sin(\angle BAC) = \frac{22 \sin 97°}{28.10} = 0.7771 \;\Rightarrow\; \angle BAC = 51.0°$$

*(Take the acute value: $\angle ABC = 97°$ is already obtuse, and a triangle can have only one obtuse
angle.)*

Bearing of $C$ from $A$ = bearing of $B$ from $A$ + $\angle BAC$ = $062° + 51.0° = \mathbf{113°}$
(nearest degree).
:::

:::question Q7 (6 marks) — stretch
Triangle $ABC$ has $AB = (x+2)$ cm, $AC = (x-1)$ cm and $\angle BAC = 60°$. Given that $BC = \sqrt{21}$ cm,
find $x$.
:::
:::answer
Cosine rule, with the included angle $60°$ (so $\cos 60° = \frac12$):
$$21 = (x+2)^2 + (x-1)^2 - 2(x+2)(x-1)\left(\tfrac12\right)$$
$$21 = (x^2 + 4x + 4) + (x^2 - 2x + 1) - (x+2)(x-1)$$
$$21 = 2x^2 + 2x + 5 - (x^2 + x - 2)$$
$$21 = x^2 + x + 7$$
$$x^2 + x - 14 = 0$$

$$x = \frac{-1 \pm \sqrt{1 + 56}}{2} = \frac{-1 \pm \sqrt{57}}{2}$$

$\sqrt{57} \approx 7.550$, so $x = 3.275$ or $x = -4.275$.

**Reject the negative root**: it would make $AB = x+2$ negative, which is impossible for a length.

$$x = \frac{-1+\sqrt{57}}{2} \approx 3.28$$

*(Check: $AB = 5.275$, $AC = 2.275$, and $5.275^2 + 2.275^2 - 5.275 \times 2.275 = 27.83 + 5.18 -
12.00 = 21.0$ ✓)*
:::
