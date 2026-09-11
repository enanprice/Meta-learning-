---
title: Quadratics
code: P1.2
spec: 2.4, 2.5, 2.6
summary: Solving, completing the square, the discriminant, sketching parabolas, and spotting hidden quadratics.
time: 4 hours
prereq: P1.1 Algebraic Expressions
papers: Papers 1 and 2
---

## Why this topic exists

A quadratic is any equation of the form $ax^2 + bx + c = 0$ with $a \neq 0$. They turn up
everywhere: the height of a projectile, the area of a rectangle with a fixed perimeter, the
intersection of a line and a circle, the condition for a tangent.

More importantly, **completing the square** is one of the three or four genuinely powerful techniques
in the whole of A Level pure. It's how you find a maximum or minimum without calculus, how you derive
the quadratic formula, how you find the centre of a circle, and how you handle certain integrals in
Year 13. Learn it properly now and it pays out for two years.

---

## 1. Solving quadratics

Three methods, in the order you should consider them.

### (a) Factorising — fastest when it works

$$x^2 - 5x + 6 = 0 \;\Rightarrow\; (x-2)(x-3) = 0 \;\Rightarrow\; x = 2 \text{ or } x = 3$$

This works because of the **zero product property**: if two things multiply to give zero, at least one
of them *is* zero. That's the only reason factorising solves anything.

:::warning The classic factorising error
$x^2 = 5x$. Do **not** divide both sides by $x$ — you've just thrown away the solution $x = 0$.

Instead: $x^2 - 5x = 0 \Rightarrow x(x-5) = 0 \Rightarrow x = 0$ or $x = 5$.

**Never divide an equation by a variable.** Move everything to one side and factorise.
:::

### (b) The quadratic formula — always works

:::key The quadratic formula
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
This is **not** in the formula booklet. Memorise it.
:::

### (c) Completing the square — when you need more than the roots

Covered in full below. Use it when the question asks for a maximum/minimum, a turning point, a range,
or gives you the phrase "in the form $a(x+b)^2 + c$".

---

## 2. Completing the square

### The idea

$(x + p)^2$ expands to $x^2 + 2px + p^2$. So *any* expression starting $x^2 + bx$ is the beginning of
a perfect square — you just have to supply the missing constant and then subtract it again so nothing
changes.

:::method Completing the square when $a = 1$
For $x^2 + bx + c$:

1. Halve $b$. Call it $p$.
2. Write $(x + p)^2$.
3. Subtract $p^2$ (because $(x+p)^2$ contains an extra $p^2$ you didn't want).
4. Add on the original $c$.

$$x^2 + bx + c = \left(x + \tfrac{b}{2}\right)^2 - \left(\tfrac{b}{2}\right)^2 + c$$
:::

:::example Worked example 1 — Write $x^2 + 6x + 11$ in the form $(x+p)^2 + q$
**Solution.**

Half of $6$ is $3$, so we start with $(x+3)^2$.

But $(x+3)^2 = x^2 + 6x + 9$, which has an unwanted $+9$. Subtract it:
$$x^2 + 6x = (x+3)^2 - 9$$

Now add the original constant:
$$x^2 + 6x + 11 = (x+3)^2 - 9 + 11 = (x+3)^2 + 2$$

So $p = 3$, $q = 2$.
:::

### When $a \neq 1$

Factor $a$ out of the $x^2$ and $x$ terms **only**, complete the square inside, then multiply back out.

:::example Worked example 2 — Write $2x^2 - 12x + 7$ in the form $a(x+b)^2 + c$
**Solution.**

Factor $2$ out of the first two terms only:
$$2x^2 - 12x + 7 = 2\left[x^2 - 6x\right] + 7$$

Complete the square inside the bracket: half of $-6$ is $-3$, so $x^2 - 6x = (x-3)^2 - 9$:
$$= 2\left[(x-3)^2 - 9\right] + 7$$

Expand the outer factor over both terms in the bracket:
$$= 2(x-3)^2 - 18 + 7 = 2(x-3)^2 - 11$$

So $a = 2$, $b = -3$, $c = -11$.
:::

:::warning The $-18$ trap
When you multiply the $2$ back in, it hits the $-9$ as well as the $(x-3)^2$. Writing
$2(x-3)^2 - 9 + 7$ is the single most common error in this topic. Always expand carefully.
:::

### What completed square form tells you

Once you have $y = a(x+p)^2 + q$:

- The **turning point** is at $(-p,\ q)$. (Note the sign flip on $p$.)
- If $a > 0$ the parabola opens upward, so $q$ is the **minimum** value of $y$.
- If $a < 0$ it opens downward, so $q$ is the **maximum** value of $y$.
- The **line of symmetry** is $x = -p$.
- You can solve for $x$ directly by rearranging and square-rooting.

:::insight Why the turning point is at $x = -p$
$(x+p)^2$ is a square, so it is never negative — its smallest possible value is $0$, and that happens
exactly when $x + p = 0$, i.e. $x = -p$. At that moment $y = q$. For any other $x$, you're adding
something positive (times $a$) to $q$.

This is a genuinely useful line of argument in "show that $y \geq k$" proof questions: *"since
$(x-3)^2 \geq 0$ for all real $x$, we have $y \geq -11$."*
:::

:::example Worked example 3 — Solve $x^2 - 4x - 7 = 0$ by completing the square, giving exact answers
**Solution.**
$$x^2 - 4x - 7 = (x-2)^2 - 4 - 7 = (x-2)^2 - 11$$

So the equation becomes:
$$(x-2)^2 - 11 = 0 \;\Rightarrow\; (x-2)^2 = 11 \;\Rightarrow\; x - 2 = \pm\sqrt{11}$$
$$x = 2 \pm \sqrt{11}$$

**Don't lose the $\pm$** — that's where one of the two marks lives.
:::

---

## 3. The discriminant

The part under the root in the quadratic formula, $b^2 - 4ac$, decides how many real roots there are —
because it decides whether you're square-rooting a positive number, zero, or a negative number.

:::key The discriminant
$$\Delta = b^2 - 4ac$$

| Condition | Roots | Graph |
|---|---|---|
| $b^2 - 4ac > 0$ | Two distinct real roots | Crosses the $x$-axis twice |
| $b^2 - 4ac = 0$ | One repeated root | **Touches** the $x$-axis (tangent) |
| $b^2 - 4ac < 0$ | No real roots | Never meets the $x$-axis |
:::

:::exam The phrase that tells you to use the discriminant
Any of: *"has two distinct roots"*, *"has equal roots"*, *"has no real roots"*, *"the line is a tangent
to the curve"*, *"the line does not intersect the curve"*, *"find the range of values of $k$ for which…"*.

All of these are discriminant questions, and the last one almost always ends with a **quadratic
inequality in $k$** — so you'll need the inequality techniques from P1.3.
:::

:::example Worked example 4 — Find the values of $k$ for which $x^2 + (k+3)x + 4k = 0$ has equal roots
**Solution.**

Equal roots means $b^2 - 4ac = 0$, with $a = 1$, $b = (k+3)$, $c = 4k$:

$$(k+3)^2 - 4(1)(4k) = 0$$
$$k^2 + 6k + 9 - 16k = 0$$
$$k^2 - 10k + 9 = 0$$
$$(k-1)(k-9) = 0$$
$$k = 1 \quad\text{or}\quad k = 9$$

Notice the structure: a discriminant condition on one quadratic produced a *second* quadratic, this
time in $k$. That's completely normal and catches people off guard the first time.
:::

---

## 4. Sketching quadratics

A sketch needs four things. Get all four on the diagram and the marks are yours.

:::method Sketching $y = ax^2+bx+c$
1. **Shape.** $a > 0$ → happy (U). $a < 0$ → sad (∩).
2. **$y$-intercept.** Set $x = 0$: it's just $c$. Free mark, always available.
3. **$x$-intercepts.** Set $y = 0$ and solve. If the discriminant is negative, say so — there are none,
   and the curve sits entirely above or below the axis.
4. **Turning point.** From completed square form, $(-p, q)$.

Label every intercept and the turning point with coordinates. An unlabelled sketch gets the shape mark
and nothing else.
:::

:::example Worked example 5 — Sketch $y = x^2 - 2x - 8$
**Solution.**

*Shape:* $a = 1 > 0$, so a U-shape.

*$y$-intercept:* $(0, -8)$.

*$x$-intercepts:* $x^2 - 2x - 8 = (x-4)(x+2) = 0$, so $x = 4$ and $x = -2$. Points $(4,0)$ and $(-2,0)$.

*Turning point:* $x^2 - 2x - 8 = (x-1)^2 - 1 - 8 = (x-1)^2 - 9$, so the minimum is at $(1, -9)$.

*Sanity check:* the turning point should sit halfway between the roots. Midpoint of $-2$ and $4$ is
$1$. ✓
:::

:::insight A check worth having
For any quadratic with two real roots, the line of symmetry is halfway between them, at
$x = \dfrac{-b}{2a}$. If your completed-square turning point isn't the midpoint of your roots, one of
the two is wrong. Two independent routes to the same number is the cheapest error-checking you'll ever
get.
:::

---

## 5. Hidden (disguised) quadratics

An equation is "quadratic in something" whenever it has the form $a(\text{thing})^2 + b(\text{thing}) + c = 0$.

| Equation | Substitution | Becomes |
|---|---|---|
| $x^4 - 5x^2 + 4 = 0$ | $u = x^2$ | $u^2 - 5u + 4 = 0$ |
| $x - 7\sqrt x + 12 = 0$ | $u = \sqrt x$ | $u^2 - 7u + 12 = 0$ |
| $2^{2x} - 5(2^x) + 4 = 0$ | $u = 2^x$ | $u^2 - 5u + 4 = 0$ |
| $x^{2/3} - x^{1/3} - 6 = 0$ | $u = x^{1/3}$ | $u^2 - u - 6 = 0$ |
| $\tan^2\theta - \tan\theta - 2 = 0$ | $u = \tan\theta$ | $u^2 - u - 2 = 0$ |

:::example Worked example 6 — Solve $x - 7\sqrt x + 12 = 0$
**Solution.**

Let $u = \sqrt x$. Then $x = u^2$, and the equation becomes:
$$u^2 - 7u + 12 = 0 \;\Rightarrow\; (u-3)(u-4) = 0 \;\Rightarrow\; u = 3 \text{ or } u = 4$$

Now convert back — **this is the step people forget**:
$$\sqrt x = 3 \Rightarrow x = 9 \qquad \sqrt x = 4 \Rightarrow x = 16$$

**Check:** $9 - 7(3) + 12 = 0$ ✓ and $16 - 7(4) + 12 = 0$ ✓
:::

:::warning Two things to check in every substitution question
1. **Convert back.** $u = 3$ is not an answer to a question about $x$.
2. **Reject impossible values.** If $u = \sqrt x$ and you get $u = -2$, reject it — a square root is
   never negative, so that branch has no solutions. The same applies to $u = 2^x$ (exponentials are
   always positive). Examiners award a specific mark for the rejection.
:::

---

## In the exam

- "Give your answers in surd form" / "exact solutions" → completing the square or the formula, and
  **no decimals**.
- "Show that…" for a quadratic condition → the marks are for the *working*, so write every line.
- A repeated root means the graph is **tangent** to the $x$-axis. Examiners use "tangent" and
  "equal roots" interchangeably; both mean $b^2 - 4ac = 0$.
- If a question gives you a quadratic in an unusual variable ($t$, $\theta$, $p$), don't panic —
  the letter is irrelevant.

---

## Practice

:::question Q1 (3 marks)
Solve $3x^2 + 7x - 6 = 0$.
:::
:::answer
$ac = 3 \times (-6) = -18$; two numbers multiplying to $-18$ and adding to $7$: $9$ and $-2$.

$$3x^2 + 9x - 2x - 6 = 3x(x+3) - 2(x+3) = (x+3)(3x-2) = 0$$

$$x = -3 \quad\text{or}\quad x = \tfrac23$$
:::

:::question Q2 (4 marks)
Express $3x^2 + 12x + 5$ in the form $a(x+b)^2 + c$, and hence write down the minimum value of the
expression and the value of $x$ at which it occurs.
:::
:::answer
$$3x^2 + 12x + 5 = 3[x^2 + 4x] + 5 = 3[(x+2)^2 - 4] + 5$$
$$= 3(x+2)^2 - 12 + 5 = 3(x+2)^2 - 7$$

So $a = 3$, $b = 2$, $c = -7$.

Since $3(x+2)^2 \geq 0$ for all real $x$, the minimum value is $\mathbf{-7}$, occurring at
$x = \mathbf{-2}$.
:::

:::question Q3 (3 marks)
The equation $2x^2 + 5x + k = 0$ has no real roots. Find the range of possible values of $k$.
:::
:::answer
No real roots means $b^2 - 4ac < 0$:
$$5^2 - 4(2)(k) < 0$$
$$25 - 8k < 0$$
$$25 < 8k$$
$$k > \tfrac{25}{8}$$

*(Check: with $k = 4$, $\Delta = 25 - 32 = -7 < 0$ ✓)*
:::

:::question Q4 (5 marks)
The line $y = 2x + k$ is a tangent to the curve $y = x^2 + 4x + 5$. Find the value of $k$.
:::
:::answer
Set them equal to find the intersections:
$$x^2 + 4x + 5 = 2x + k$$
$$x^2 + 2x + (5 - k) = 0$$

Tangent means exactly one intersection, so the discriminant is zero:
$$2^2 - 4(1)(5-k) = 0$$
$$4 - 20 + 4k = 0$$
$$4k = 16 \;\Rightarrow\; k = 4$$
:::

:::question Q5 (4 marks)
Solve $x^4 - 13x^2 + 36 = 0$.
:::
:::answer
Let $u = x^2$:
$$u^2 - 13u + 36 = 0 \;\Rightarrow\; (u-4)(u-9) = 0 \;\Rightarrow\; u = 4 \text{ or } u = 9$$

Convert back:
$$x^2 = 4 \Rightarrow x = \pm 2 \qquad x^2 = 9 \Rightarrow x = \pm 3$$

Four solutions: $x = -3, -2, 2, 3$. *(A quartic can have up to four roots — if you only wrote two,
you dropped the $\pm$.)*
:::

:::question Q6 (5 marks)
Solve $2^{2x} - 9(2^x) + 8 = 0$.
:::
:::answer
Note $2^{2x} = (2^x)^2$. Let $u = 2^x$:
$$u^2 - 9u + 8 = 0 \;\Rightarrow\; (u-1)(u-8) = 0 \;\Rightarrow\; u = 1 \text{ or } u = 8$$

Convert back:
$$2^x = 1 \Rightarrow x = 0 \qquad 2^x = 8 = 2^3 \Rightarrow x = 3$$

*(Both values of $u$ are positive, so neither is rejected here — but always check.)*
:::

:::question Q7 (6 marks) — synoptic
The quadratic $f(x) = x^2 - (k+2)x + (2k+1)$ has a repeated root.

(a) Show that $k^2 - 4k = 0$.

(b) Find the two possible values of $k$.

(c) For the **larger** value of $k$, find the repeated root.
:::
:::answer
**(a)** Repeated root ⟹ $b^2 - 4ac = 0$ with $a = 1$, $b = -(k+2)$, $c = 2k+1$:
$$(k+2)^2 - 4(2k+1) = 0$$
$$k^2 + 4k + 4 - 8k - 4 = 0$$
$$k^2 - 4k = 0 \quad \blacksquare$$

**(b)** $k(k-4) = 0 \Rightarrow k = 0$ or $k = 4$.

**(c)** With $k = 4$: $f(x) = x^2 - 6x + 9 = (x-3)^2$, so the repeated root is $x = 3$.

*(Shortcut worth knowing: for a repeated root, $x = -\frac{b}{2a} = \frac{k+2}{2} = \frac{6}{2} = 3$.)*
:::

:::question Q8 (5 marks) — stretch
A farmer has 60 m of fencing and wants to enclose a rectangular pen against a straight wall, using the
wall as one full side.

(a) If the two sides perpendicular to the wall each have length $x$ m, show that the area is
$A = 60x - 2x^2$.

(b) Find, by completing the square, the maximum possible area and the dimensions that achieve it.
:::
:::answer
**(a)** Two sides of length $x$ use $2x$ m of fencing, leaving $(60 - 2x)$ m for the side parallel to
the wall. So
$$A = x(60 - 2x) = 60x - 2x^2 \quad \blacksquare$$

**(b)**
$$A = -2x^2 + 60x = -2[x^2 - 30x] = -2[(x-15)^2 - 225] = -2(x-15)^2 + 450$$

Since $-2(x-15)^2 \leq 0$, the maximum is $A = \mathbf{450}$ m², at $x = 15$ m.

Dimensions: $15$ m $\times$ $(60 - 30) = 30$ m.

*(Sanity check: $15 \times 30 = 450$ ✓. Note the pen is twice as long as it is deep — that's the
general result for a rectangle against a wall, and worth remembering.)*
:::
