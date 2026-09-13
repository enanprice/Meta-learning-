---
title: Vectors (2D)
code: P1.11
spec: 10.1–10.5
summary: Vector notation, magnitude and direction, adding and scaling, position vectors, unit vectors, and geometric proofs.
time: 3 hours
prereq: P1.9 Trigonometric Ratios
papers: Papers 1 and 2
---

## Why this topic exists

A **vector** has both magnitude and direction; a **scalar** has magnitude only. That distinction is the
whole point. Five metres north is a different thing from five metres east, and a system of notation
that can't tell them apart is useless for describing motion, forces or geometry.

Everything in mechanics — velocity, acceleration, force, momentum — is a vector. Everything here
transfers directly to Year 13's 3D vectors and to the mechanics papers, where you'll resolve forces
into components constantly.

---

## 1. Notation

A vector can be written as:

- $\mathbf{a}$ (bold in print) or $\underline{a}$ (underlined when handwritten — **do underline them**,
  it's a notation mark);
- $\overrightarrow{AB}$, the vector from point $A$ to point $B$;
- **Component form:** $\begin{pmatrix} 3 \\ -2\end{pmatrix}$, meaning 3 right and 2 down;
- **$\mathbf{i}$, $\mathbf{j}$ form:** $3\mathbf{i} - 2\mathbf{j}$, where $\mathbf{i}$ is the unit
  vector in the $x$-direction and $\mathbf{j}$ the unit vector in the $y$-direction.

The last two are the same thing written differently. Both appear in exams; be fluent in both.

:::key Two facts about direction
$$\overrightarrow{BA} = -\overrightarrow{AB}$$

Reversing a vector negates it. And **equal vectors** have the same magnitude and direction — they do
*not* have to start in the same place. $\overrightarrow{AB} = \overrightarrow{CD}$ simply means
$ABDC$ is a parallelogram.
:::

---

## 2. Arithmetic with vectors

### Addition — the triangle law

$$\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$$

Travel from $A$ to $B$, then $B$ to $C$: you've gone from $A$ to $C$. In components, just add
componentwise:
$$\begin{pmatrix}3\\-2\end{pmatrix} + \begin{pmatrix}1\\5\end{pmatrix} = \begin{pmatrix}4\\3\end{pmatrix}$$

:::insight The "middle letter cancels" trick
$\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$ — the $B$s meet in the middle and
vanish. This works for any chain:
$$\overrightarrow{PQ} + \overrightarrow{QR} + \overrightarrow{RS} = \overrightarrow{PS}$$

And if you need a route that doesn't exist directly, invent one through any point you like:
$$\overrightarrow{AC} = \overrightarrow{AB} + \overrightarrow{BC} = -\overrightarrow{BA} + \overrightarrow{BC}$$

This is the single most useful move in vector geometry proofs.
:::

:::figure vector-triangle
The triangle law is just "go A to B, then B to C". Written as vectors the middle letter cancels, which
is what makes routes through any convenient point legitimate.
:::

### Scalar multiplication

$k\mathbf{a}$ has magnitude $|k|$ times that of $\mathbf{a}$, in the **same** direction if $k>0$ and the
**opposite** direction if $k < 0$.

:::key Parallel vectors
Two vectors are **parallel** if and only if one is a scalar multiple of the other:
$$\mathbf{a} \parallel \mathbf{b} \iff \mathbf{b} = k\mathbf{a} \text{ for some scalar } k$$

This is how every "show these are parallel" question is answered. Write one as a multiple of the other
and **say so in words**.
:::

---

## 3. Magnitude and direction

:::key Magnitude
For $\mathbf{a} = x\mathbf{i} + y\mathbf{j}$:
$$|\mathbf{a}| = \sqrt{x^2 + y^2}$$

(Pythagoras again.) The **direction** is usually given as the angle $\theta$ measured anticlockwise
from the positive $x$-axis, or as a bearing:
$$\tan\theta = \frac{y}{x}$$
:::

:::warning $\tan^{-1}$ only gives you quadrants 1 and 4
Your calculator returns an angle between $-90°$ and $90°$. If your vector points into quadrant 2 or 3
(i.e. $x < 0$), you must adjust by adding $180°$.

**Always sketch the vector first.** For $\mathbf{a} = -3\mathbf{i} + 4\mathbf{j}$ the point is up and
to the left — quadrant 2 — so the answer must be between $90°$ and $180°$. The calculator gives
$\tan^{-1}(4/-3) = -53.1°$, and the correct angle is $-53.1 + 180 = 126.9°$.
:::

### Unit vectors

A **unit vector** has magnitude 1. To find the unit vector in the direction of $\mathbf{a}$, divide by
its own magnitude:
$$\hat{\mathbf{a}} = \frac{\mathbf{a}}{|\mathbf{a}|}$$

:::example Worked example 1 — $\mathbf{a} = 5\mathbf{i} - 12\mathbf{j}$. Find $|\mathbf{a}|$, the unit vector in the direction of $\mathbf{a}$, and the angle $\mathbf{a}$ makes with the positive $x$-axis.
**Solution.**

$$|\mathbf{a}| = \sqrt{5^2 + (-12)^2} = \sqrt{25 + 144} = \sqrt{169} = 13$$

$$\hat{\mathbf{a}} = \frac{1}{13}(5\mathbf{i} - 12\mathbf{j}) = \tfrac{5}{13}\mathbf{i} - \tfrac{12}{13}\mathbf{j}$$

*Check:* $\sqrt{(5/13)^2 + (12/13)^2} = \sqrt{169/169} = 1$ ✓

*Direction:* the vector points right and down — quadrant 4.
$$\tan\theta = \frac{-12}{5} \;\Rightarrow\; \theta = -67.4°$$

That's already in quadrant 4, so no adjustment needed. The vector is at $67.4°$ **below** the positive
$x$-axis (or equivalently $292.6°$ measured anticlockwise).
:::

---

## 4. Position vectors

The **position vector** of a point $A$ is $\overrightarrow{OA}$, the vector from the origin to $A$.
It's usually written $\mathbf{a}$.

:::key The key result
$$\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$$

("destination minus start")
:::

:::insight Why it's $\mathbf{b} - \mathbf{a}$ and not the other way round
Go from $A$ to $B$ via the origin:
$$\overrightarrow{AB} = \overrightarrow{AO} + \overrightarrow{OB} = -\mathbf{a} + \mathbf{b} = \mathbf{b} - \mathbf{a}$$

Getting this backwards gives you a vector of the right length pointing the wrong way, which usually
still gets the magnitude mark but fails everything else. Say "destination minus start" in your head
every time.
:::

The **distance** between $A$ and $B$ is $|\overrightarrow{AB}| = |\mathbf{b} - \mathbf{a}|$ — which,
written out, is exactly the distance formula from P1.5.

---

## 5. Geometric problems and proofs

This is where vectors are examined most heavily. The typical question gives you a shape with
$\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$, defines some points on the
edges, and asks you to express other vectors in terms of $\mathbf{a}$ and $\mathbf{b}$ — then prove
something.

:::method Vector geometry questions
1. **Draw the diagram** and mark on every vector you know.
2. Find a **route** from the start to the end of the vector you want, using only vectors you know.
3. Write the route as a sum, and simplify.
4. For "prove parallel": show one vector is a scalar multiple of the other, **and say so**.
5. For "prove collinear" ($A$, $B$, $C$ on one straight line): show $\overrightarrow{AB}$ and
   $\overrightarrow{BC}$ are parallel **and share the point $B$**. Both parts are needed.
6. For ratios: "$M$ divides $AB$ in the ratio $2:3$" means
   $\overrightarrow{AM} = \frac{2}{5}\overrightarrow{AB}$ — the fraction is *that part over the whole*.
:::

:::example Worked example 2 — $OABC$ is a parallelogram with $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OC} = \mathbf{c}$. $M$ is the midpoint of $AB$. Express $\overrightarrow{OM}$ and $\overrightarrow{CM}$ in terms of $\mathbf{a}$ and $\mathbf{c}$.
**Solution.**

In a parallelogram $OABC$, the side $AB$ is parallel and equal to $OC$, so
$\overrightarrow{AB} = \mathbf{c}$.

$M$ is the midpoint of $AB$, so $\overrightarrow{AM} = \frac12\mathbf{c}$.

*Route to $M$:* $O \to A \to M$:
$$\overrightarrow{OM} = \overrightarrow{OA} + \overrightarrow{AM} = \mathbf{a} + \tfrac12\mathbf{c}$$

*Route from $C$ to $M$:* destination minus start, using position vectors from $O$:
$$\overrightarrow{CM} = \overrightarrow{OM} - \overrightarrow{OC} = \left(\mathbf{a} + \tfrac12\mathbf{c}\right) - \mathbf{c} = \mathbf{a} - \tfrac12\mathbf{c}$$
:::

---

## In the exam

- **Underline your vectors** when handwriting. Writing $a$ when you mean $\mathbf{a}$ can cost a
  notation mark, and it will certainly confuse you.
- A "show that" in vector geometry needs the concluding sentence: *"since $\overrightarrow{PQ} =
  2\overrightarrow{RS}$, the lines $PQ$ and $RS$ are parallel."*
- For magnitude questions, leave answers in **surd form** unless told otherwise.
- Vector questions in mechanics use exactly this machinery with $\mathbf{i}$ pointing east and
  $\mathbf{j}$ north. Same maths, different words.

---

## Practice

:::question Q1 (3 marks)
$\mathbf{p} = 4\mathbf{i} - 3\mathbf{j}$ and $\mathbf{q} = -2\mathbf{i} + 5\mathbf{j}$.
Find (a) $\mathbf{p} + 2\mathbf{q}$, (b) $|\mathbf{p}|$.
:::
:::answer
**(a)** $2\mathbf{q} = -4\mathbf{i} + 10\mathbf{j}$, so
$$\mathbf{p} + 2\mathbf{q} = (4-4)\mathbf{i} + (-3+10)\mathbf{j} = 7\mathbf{j}$$

**(b)** $|\mathbf{p}| = \sqrt{16 + 9} = 5$
:::

:::question Q2 (4 marks)
Find the unit vector in the direction of $\mathbf{v} = -6\mathbf{i} + 8\mathbf{j}$, and the angle
$\mathbf{v}$ makes with the positive $x$-axis.
:::
:::answer
$$|\mathbf{v}| = \sqrt{36 + 64} = 10$$
$$\hat{\mathbf{v}} = \tfrac{1}{10}(-6\mathbf{i} + 8\mathbf{j}) = -0.6\mathbf{i} + 0.8\mathbf{j}$$

Direction: $x < 0$, $y > 0$ ⟹ quadrant 2, so the angle is between $90°$ and $180°$.
$$\tan^{-1}\left(\frac{8}{-6}\right) = -53.1° \;\Rightarrow\; \theta = -53.1 + 180 = 126.9°$$
:::

:::question Q3 (4 marks)
$A$ has position vector $3\mathbf{i} + \mathbf{j}$ and $B$ has position vector $-\mathbf{i} + 7\mathbf{j}$.
Find $\overrightarrow{AB}$ and $|\overrightarrow{AB}|$ in surd form.
:::
:::answer
$$\overrightarrow{AB} = \mathbf{b} - \mathbf{a} = (-1 - 3)\mathbf{i} + (7-1)\mathbf{j} = -4\mathbf{i} + 6\mathbf{j}$$
$$|\overrightarrow{AB}| = \sqrt{16 + 36} = \sqrt{52} = 2\sqrt{13}$$
:::

:::question Q4 (4 marks)
Given $\mathbf{a} = 3\mathbf{i} + k\mathbf{j}$ and $\mathbf{b} = 9\mathbf{i} - 6\mathbf{j}$ are
parallel, find $k$.
:::
:::answer
Parallel means $\mathbf{b} = \lambda\mathbf{a}$.

Comparing $\mathbf{i}$ components: $9 = 3\lambda \Rightarrow \lambda = 3$.

Comparing $\mathbf{j}$ components: $-6 = 3k \Rightarrow k = -2$.

**Check:** $\mathbf{a} = 3\mathbf{i} - 2\mathbf{j}$ and $3\mathbf{a} = 9\mathbf{i} - 6\mathbf{j} = \mathbf{b}$ ✓
:::

:::question Q5 (5 marks)
$\overrightarrow{OP} = 2\mathbf{i} + 3\mathbf{j}$ and $\overrightarrow{OQ} = 8\mathbf{i} - \mathbf{j}$.
The point $R$ lies on $PQ$ such that $PR:RQ = 1:2$. Find the position vector of $R$.
:::
:::answer
$$\overrightarrow{PQ} = \mathbf{q} - \mathbf{p} = 6\mathbf{i} - 4\mathbf{j}$$

$PR:RQ = 1:2$ means $R$ is one-third of the way along (the part over the whole is $\frac{1}{1+2}$):
$$\overrightarrow{PR} = \tfrac13(6\mathbf{i} - 4\mathbf{j}) = 2\mathbf{i} - \tfrac43\mathbf{j}$$

$$\overrightarrow{OR} = \overrightarrow{OP} + \overrightarrow{PR} = (2+2)\mathbf{i} + \left(3 - \tfrac43\right)\mathbf{j} = 4\mathbf{i} + \tfrac53\mathbf{j}$$
:::

:::question Q6 (6 marks) — synoptic
The points $A$, $B$ and $C$ have position vectors $\mathbf{i} + 2\mathbf{j}$, $4\mathbf{i} + 5\mathbf{j}$
and $10\mathbf{i} + 11\mathbf{j}$ respectively.

(a) Find $\overrightarrow{AB}$ and $\overrightarrow{BC}$.

(b) Prove that $A$, $B$ and $C$ are collinear.

(c) Find the ratio $AB : BC$.
:::
:::answer
**(a)**
$$\overrightarrow{AB} = (4-1)\mathbf{i} + (5-2)\mathbf{j} = 3\mathbf{i} + 3\mathbf{j}$$
$$\overrightarrow{BC} = (10-4)\mathbf{i} + (11-5)\mathbf{j} = 6\mathbf{i} + 6\mathbf{j}$$

**(b)** $\overrightarrow{BC} = 2(3\mathbf{i} + 3\mathbf{j}) = 2\overrightarrow{AB}$, so
$\overrightarrow{AB}$ and $\overrightarrow{BC}$ are parallel. Since they also share the common point
$B$, the points $A$, $B$ and $C$ lie on a single straight line — they are collinear. $\blacksquare$

*(Both halves are needed. Parallel alone would only prove the lines have the same direction, not that
they're the same line.)*

**(c)** $|\overrightarrow{BC}| = 2|\overrightarrow{AB}|$, so $AB : BC = 1 : 2$.
:::

:::question Q7 (6 marks) — stretch
In triangle $OAB$, $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$. $M$ is
the midpoint of $OA$ and $N$ is the midpoint of $OB$.

(a) Express $\overrightarrow{MN}$ and $\overrightarrow{AB}$ in terms of $\mathbf{a}$ and $\mathbf{b}$.

(b) Hence prove that $MN$ is parallel to $AB$ and half its length.
:::
:::answer
**(a)** $\overrightarrow{OM} = \frac12\mathbf{a}$ and $\overrightarrow{ON} = \frac12\mathbf{b}$.

$$\overrightarrow{MN} = \overrightarrow{ON} - \overrightarrow{OM} = \tfrac12\mathbf{b} - \tfrac12\mathbf{a} = \tfrac12(\mathbf{b} - \mathbf{a})$$

$$\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$$

**(b)** From part (a),
$$\overrightarrow{MN} = \tfrac12 \overrightarrow{AB}$$

Since $\overrightarrow{MN}$ is a scalar multiple of $\overrightarrow{AB}$, the two are **parallel**.
Since the scalar is $\frac12$, we have $|\overrightarrow{MN}| = \frac12|\overrightarrow{AB}|$, so $MN$
is **half the length** of $AB$. $\blacksquare$

*(This is the midpoint theorem from GCSE geometry — and the vector proof is three lines, where the
classical geometric proof takes a page. That's the point of vectors.)*
:::
