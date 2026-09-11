---
title: Vectors in Three Dimensions
code: P2.12
spec: 10.1–10.5
summary: Extending vectors to 3D, magnitude and direction cosines, distance, and solving geometric problems in space.
time: 3 hours
prereq: P1.11 Vectors (2D)
papers: Papers 1 and 2
---

## Why this topic exists

Everything from P1.11 carries over unchanged — the same addition rule, the same position-vector
result, the same parallel test. The only new things are a third component and the angles a vector
makes with the three axes.

That sounds trivial, and mostly it is. But it's the step that makes vectors useful for anything real:
positions of aircraft, forces on a bridge, the geometry of a crystal. And it's examined as a
straightforward 6–8 mark question that you should be aiming to get fully right.

---

## 1. Notation and the basics

In 3D, a vector has three components:
$$\mathbf{a} = a_1\mathbf{i} + a_2\mathbf{j} + a_3\mathbf{k} = \begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix}$$

where $\mathbf{i}$, $\mathbf{j}$, $\mathbf{k}$ are the unit vectors along the $x$, $y$ and $z$ axes.

:::key Everything transfers
| Operation | 3D version |
|---|---|
| Addition | Add componentwise |
| Scalar multiple | Multiply every component |
| $\overrightarrow{AB}$ | $\mathbf{b} - \mathbf{a}$ (destination minus start) |
| Parallel | $\mathbf{b} = k\mathbf{a}$ for some scalar $k$ |
| Collinear | Parallel **and** sharing a point |
:::

---

## 2. Magnitude in 3D

:::key
$$|\mathbf{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}$$
:::

:::insight Why Pythagoras works twice
Take the vector $\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix}$ as the diagonal of a cuboid with edges
$a_1$, $a_2$, $a_3$.

First, the diagonal **across the base**: by Pythagoras it has length $\sqrt{a_1^2 + a_2^2}$.

Now the full diagonal is the hypotenuse of a right-angled triangle whose legs are that base diagonal
and the vertical edge $a_3$:
$$\sqrt{\left(\sqrt{a_1^2+a_2^2}\right)^2 + a_3^2} = \sqrt{a_1^2+a_2^2+a_3^2}$$

Two applications of Pythagoras. The same argument extends to any number of dimensions.
:::

The **distance between two points** $A$ and $B$ is
$$|\overrightarrow{AB}| = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$$

---

## 3. Angles with the axes

:::key Direction angles
If $\mathbf{a} = a_1\mathbf{i}+a_2\mathbf{j}+a_3\mathbf{k}$ makes angles $\theta_x$, $\theta_y$,
$\theta_z$ with the positive $x$, $y$, $z$ axes:
$$\cos\theta_x = \frac{a_1}{|\mathbf{a}|}, \quad \cos\theta_y = \frac{a_2}{|\mathbf{a}|},
\quad \cos\theta_z = \frac{a_3}{|\mathbf{a}|}$$

These fractions are the **direction cosines**.
:::

:::insight Why it's just "component over magnitude"
Project the vector onto the $x$-axis. In the right-angled triangle formed by the vector (hypotenuse
$|\mathbf{a}|$) and its shadow on the $x$-axis (adjacent side $a_1$), plain SOH-CAH-TOA gives
$\cos\theta_x = \frac{\text{adj}}{\text{hyp}} = \frac{a_1}{|\mathbf{a}|}$.

A useful consequence, worth quoting as a check:
$$\cos^2\theta_x + \cos^2\theta_y + \cos^2\theta_z = \frac{a_1^2+a_2^2+a_3^2}{|\mathbf{a}|^2} = 1$$
:::

:::example Worked example 1 — Find the magnitude of $\mathbf{a} = 2\mathbf{i} - 3\mathbf{j} + 6\mathbf{k}$ and the angle it makes with the positive $x$-axis.
**Solution.**
$$|\mathbf{a}| = \sqrt{4 + 9 + 36} = \sqrt{49} = 7$$

$$\cos\theta_x = \frac27 \;\Rightarrow\; \theta_x = \cos^{-1}\left(\tfrac27\right) = 73.4° \text{ (1 d.p.)}$$

*(Check with the identity: $\cos\theta_y = -\frac37$, $\cos\theta_z = \frac67$, and
$\frac{4+9+36}{49} = 1$ ✓)*
:::

---

## 4. Geometric problems in 3D

Same techniques as 2D, and the same two-step structure for most questions:

:::method A typical 3D vector question
1. Write down the position vectors of all the named points.
2. Form the vectors between them: $\overrightarrow{AB} = \mathbf{b}-\mathbf{a}$, etc.
3. Then, depending on what's asked:
   - **Distance** → take the magnitude.
   - **Parallel / collinear** → test for a scalar multiple.
   - **A particular point on a line** → write it as $\mathbf{a} + \lambda(\mathbf{b}-\mathbf{a})$ and
     solve for $\lambda$ using the given condition.
   - **Type of shape** → compare the lengths of the sides (and, if you've met it, use the scalar
     product for angles).
:::

:::example Worked example 2 — $A(1, 2, 3)$, $B(4, -1, 5)$ and $C(7, -4, 7)$. Show that $A$, $B$ and $C$ are collinear.
**Solution.**
$$\overrightarrow{AB} = \begin{pmatrix}4-1\\-1-2\\5-3\end{pmatrix} = \begin{pmatrix}3\\-3\\2\end{pmatrix}$$
$$\overrightarrow{BC} = \begin{pmatrix}7-4\\-4+1\\7-5\end{pmatrix} = \begin{pmatrix}3\\-3\\2\end{pmatrix}$$

$\overrightarrow{BC} = \overrightarrow{AB}$, so they are parallel (a scalar multiple with $k=1$). They
also share the common point $B$.

Therefore $A$, $B$ and $C$ are collinear, with $B$ the midpoint of $AC$. $\blacksquare$
:::

:::warning Both conditions, always
Parallel alone proves nothing about collinearity — two parallel lines can be miles apart. You must
state that the vectors **share a point**. This is a mark, in 2D and 3D alike.
:::

:::example Worked example 3 — The point $P$ lies on the line through $A(2,0,-1)$ and $B(5,6,2)$ such that $AP:PB = 1:2$. Find the position vector of $P$.
**Solution.**
$$\overrightarrow{AB} = \begin{pmatrix}3\\6\\3\end{pmatrix}$$

$AP:PB = 1:2$ means $P$ is $\frac{1}{3}$ of the way from $A$ to $B$:
$$\overrightarrow{AP} = \tfrac13\begin{pmatrix}3\\6\\3\end{pmatrix} = \begin{pmatrix}1\\2\\1\end{pmatrix}$$

$$\overrightarrow{OP} = \overrightarrow{OA} + \overrightarrow{AP}
= \begin{pmatrix}2\\0\\-1\end{pmatrix} + \begin{pmatrix}1\\2\\1\end{pmatrix} = \begin{pmatrix}3\\2\\0\end{pmatrix}$$

So $P$ is $(3, 2, 0)$.

**Check:** $|\overrightarrow{AP}| = \sqrt{1+4+1} = \sqrt6$ and
$|\overrightarrow{PB}| = |(2,4,2)| = \sqrt{24} = 2\sqrt6$, so the ratio is $1:2$ ✓
:::

---

## In the exam

- 3D vector questions are usually a reliable 6–8 marks. Be systematic: write every position vector
  down before doing anything else.
- Leave magnitudes in **surd form** unless told otherwise.
- "Show that $ABCD$ is a parallelogram" → show $\overrightarrow{AB} = \overrightarrow{DC}$ (equal, not
  just parallel). For a rhombus, also show two adjacent sides have equal length.
- Watch the arithmetic on the middle component — subtracting negatives in 3D is where slips happen.
  $-4 - (-1) = -3$.
- Ratio questions: "$AP:PB = m:n$" means $\overrightarrow{AP} = \frac{m}{m+n}\overrightarrow{AB}$.
  The fraction is *that part over the whole*, and getting it upside down is the standard error.

---

## Practice

:::question Q1 (3 marks)
Find $|\mathbf{v}|$ where $\mathbf{v} = 3\mathbf{i} + 4\mathbf{j} - 12\mathbf{k}$, and the unit vector
in the direction of $\mathbf{v}$.
:::
:::answer
$$|\mathbf{v}| = \sqrt{9 + 16 + 144} = \sqrt{169} = 13$$

$$\hat{\mathbf{v}} = \frac{1}{13}\left(3\mathbf{i}+4\mathbf{j}-12\mathbf{k}\right)
= \tfrac{3}{13}\mathbf{i} + \tfrac4{13}\mathbf{j} - \tfrac{12}{13}\mathbf{k}$$
:::

:::question Q2 (4 marks)
$A$ is $(2, -1, 4)$ and $B$ is $(5, 3, -2)$. Find $\overrightarrow{AB}$ and the exact distance $AB$.
:::
:::answer
$$\overrightarrow{AB} = \begin{pmatrix}5-2\\3-(-1)\\-2-4\end{pmatrix} = \begin{pmatrix}3\\4\\-6\end{pmatrix}$$

$$|AB| = \sqrt{9 + 16 + 36} = \sqrt{61}$$
:::

:::question Q3 (4 marks)
Find the angle that $\mathbf{a} = \mathbf{i} + 2\mathbf{j} + 2\mathbf{k}$ makes with the positive
$z$-axis.
:::
:::answer
$$|\mathbf{a}| = \sqrt{1+4+4} = 3$$
$$\cos\theta_z = \frac{2}{3} \;\Rightarrow\; \theta_z = 48.2° \text{ (1 d.p.)}$$
:::

:::question Q4 (4 marks)
Given that $\mathbf{p} = 2\mathbf{i} - \mathbf{j} + 3\mathbf{k}$ and
$\mathbf{q} = 6\mathbf{i} + a\mathbf{j} + b\mathbf{k}$ are parallel, find $a$ and $b$.
:::
:::answer
Parallel ⟹ $\mathbf{q} = \lambda\mathbf{p}$.

From the $\mathbf{i}$ components: $6 = 2\lambda \Rightarrow \lambda = 3$.

Then $a = 3(-1) = -3$ and $b = 3(3) = 9$.

**Check:** $3\mathbf{p} = 6\mathbf{i} - 3\mathbf{j} + 9\mathbf{k}$ ✓
:::

:::question Q5 (5 marks)
$P$ is $(1, 3, -2)$, $Q$ is $(4, 1, 1)$ and $R$ is $(10, -3, 7)$. Determine whether $P$, $Q$ and $R$
are collinear.
:::
:::answer
$$\overrightarrow{PQ} = \begin{pmatrix}3\\-2\\3\end{pmatrix}, \qquad
\overrightarrow{QR} = \begin{pmatrix}6\\-4\\6\end{pmatrix}$$

$\overrightarrow{QR} = 2\overrightarrow{PQ}$, so the two vectors are **parallel**. They also share the
point $Q$.

Therefore $P$, $Q$ and $R$ **are collinear**, with $PQ:QR = 1:2$. $\blacksquare$
:::

:::question Q6 (6 marks)
The points $A(3, 0, 1)$, $B(5, 4, 3)$, $C(1, 6, 5)$ and $D(-1, 2, 3)$ form a quadrilateral $ABCD$.

(a) Show that $ABCD$ is a parallelogram.

(b) Show that it is in fact a rhombus.
:::
:::answer
**(a)**
$$\overrightarrow{AB} = \begin{pmatrix}2\\4\\2\end{pmatrix}, \qquad
\overrightarrow{DC} = \begin{pmatrix}1-(-1)\\6-2\\5-3\end{pmatrix} = \begin{pmatrix}2\\4\\2\end{pmatrix}$$

Since $\overrightarrow{AB} = \overrightarrow{DC}$, the sides $AB$ and $DC$ are equal in length **and**
parallel. A quadrilateral with one pair of opposite sides equal and parallel is a parallelogram.
$\blacksquare$

**(b)** A rhombus is a parallelogram with all four sides equal, so compare two adjacent sides:
$$|\overrightarrow{AB}| = \sqrt{4+16+4} = \sqrt{24}$$
$$\overrightarrow{BC} = \begin{pmatrix}-4\\2\\2\end{pmatrix} \;\Rightarrow\;
|\overrightarrow{BC}| = \sqrt{16+4+4} = \sqrt{24}$$

Adjacent sides are equal, and in a parallelogram opposite sides are already equal, so all four sides
have length $\sqrt{24} = 2\sqrt6$. Hence $ABCD$ is a rhombus. $\blacksquare$
:::

:::question Q7 (6 marks) — stretch
$OABC$ is a tetrahedron with $O$ at the origin, $\overrightarrow{OA} = 4\mathbf{i}$,
$\overrightarrow{OB} = 3\mathbf{j}$ and $\overrightarrow{OC} = 2\mathbf{k}$.

(a) Find the lengths $AB$, $BC$ and $AC$ in surd form.

(b) $M$ is the midpoint of $AB$. Find $|\overrightarrow{CM}|$ in surd form.
:::
:::answer
**(a)**
$$\overrightarrow{AB} = \mathbf{b}-\mathbf{a} = \begin{pmatrix}-4\\3\\0\end{pmatrix}
\;\Rightarrow\; AB = \sqrt{16+9} = 5$$

$$\overrightarrow{BC} = \mathbf{c}-\mathbf{b} = \begin{pmatrix}0\\-3\\2\end{pmatrix}
\;\Rightarrow\; BC = \sqrt{9+4} = \sqrt{13}$$

$$\overrightarrow{AC} = \mathbf{c}-\mathbf{a} = \begin{pmatrix}-4\\0\\2\end{pmatrix}
\;\Rightarrow\; AC = \sqrt{16+4} = \sqrt{20} = 2\sqrt5$$

**(b)** The midpoint of $AB$ has position vector
$$\mathbf{m} = \tfrac12(\mathbf{a}+\mathbf{b}) = \tfrac12\begin{pmatrix}4\\3\\0\end{pmatrix}
= \begin{pmatrix}2\\1.5\\0\end{pmatrix}$$

$$\overrightarrow{CM} = \mathbf{m}-\mathbf{c} = \begin{pmatrix}2\\1.5\\-2\end{pmatrix}$$

$$|\overrightarrow{CM}| = \sqrt{4 + 2.25 + 4} = \sqrt{10.25} = \sqrt{\tfrac{41}{4}} = \frac{\sqrt{41}}{2}$$
:::
