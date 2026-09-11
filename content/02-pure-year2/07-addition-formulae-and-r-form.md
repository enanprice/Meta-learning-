---
title: Addition Formulae, Double Angles and the R Form
code: P2.7
spec: 5.5, 5.6, 5.7
summary: The compound angle formulae, double angle identities, and writing $a\cos\theta + b\sin\theta$ as a single wave.
time: 5 hours
prereq: P2.6 Reciprocal and Inverse Trig Functions
papers: Papers 1 and 2
---

## Why this topic exists

$\sin(A+B)$ is **not** $\sin A + \sin B$. (Test it: $\sin 90° = 1$, but $\sin 30° + \sin 60° = 1.366$.)
The compound angle formulae say what it actually is.

From them everything else follows: the double angle formulae (set $B = A$), the R form (which turns
the sum of two waves into one wave), and a large chunk of Year 13 integration. The R form in
particular is the tool for every "find the maximum value of…" modelling question about tides,
temperatures, Ferris wheels and oscillations.

---

## 1. The addition (compound angle) formulae

:::key The six formulae — all in the formula booklet
$$\sin(A \pm B) = \sin A\cos B \pm \cos A \sin B$$
$$\cos(A \pm B) = \cos A\cos B \mp \sin A\sin B$$
$$\tan(A \pm B) = \frac{\tan A \pm \tan B}{1 \mp \tan A\tan B}$$
:::

:::warning The sign flip in the cosine formula
$$\cos(A + B) = \cos A\cos B - \sin A\sin B$$
The sign on the right is the **opposite** of the sign on the left. Same for tan's denominator.

Sine keeps the sign; cosine and tan flip it. This trips people up constantly — the $\mp$ symbol in the
formula booklet is telling you exactly this, so read it carefully.
:::

:::example Worked example 1 — Find the exact value of $\cos 15°$
**Solution.**

$15° = 45° - 30°$, both of which have exact values:
$$\cos(45° - 30°) = \cos45°\cos30° + \sin45°\sin30°$$

(Note the $+$: the formula for $\cos(A-B)$ has a plus.)

$$= \frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2} + \frac{\sqrt2}{2}\cdot\frac12
= \frac{\sqrt6}{4} + \frac{\sqrt2}{4} = \frac{\sqrt6+\sqrt2}{4}$$

*(Check numerically: $\frac{2.449 + 1.414}{4} = 0.9659$, and $\cos15° = 0.9659$ ✓)*
:::

---

## 2. Double angle formulae

Set $B = A$ in the addition formulae and simplify.

:::key Double angle formulae
$$\sin 2A = 2\sin A\cos A$$

$$\cos 2A = \cos^2 A - \sin^2 A = 2\cos^2 A - 1 = 1 - 2\sin^2 A$$

$$\tan 2A = \frac{2\tan A}{1 - \tan^2 A}$$
:::

:::insight Why $\cos 2A$ has three forms, and which to choose
Start from $\cos2A = \cos^2A - \sin^2A$ and use $\sin^2A + \cos^2A = 1$ to replace either term:

- Replace $\sin^2A$ with $1 - \cos^2A$: $\cos2A = \cos^2A - (1-\cos^2A) = 2\cos^2A - 1$
- Replace $\cos^2A$ with $1 - \sin^2A$: $\cos2A = (1-\sin^2A) - \sin^2A = 1 - 2\sin^2A$

**Which to use:** pick the version containing whatever else is in your equation.

- Equation also has $\cos A$? Use $2\cos^2A - 1$.
- Equation also has $\sin A$? Use $1 - 2\sin^2A$.

That choice turns the equation into a quadratic in a single function, which is always the goal.
:::

:::key The rearrangements used for integration
$$\cos^2 A = \frac{1 + \cos 2A}{2} \qquad \sin^2 A = \frac{1 - \cos 2A}{2}$$

These come straight from the double angle formulae, rearranged, and they are **the** way to integrate
$\sin^2$ or $\cos^2$ in Year 13. Flag them now.
:::

:::example Worked example 2 — Solve $\cos 2\theta + 3\sin\theta = 2$ for $0 \leq \theta \leq 2\pi$
**Solution.**

The equation contains $\sin\theta$, so choose the $\sin$ version of $\cos2\theta$:
$$1 - 2\sin^2\theta + 3\sin\theta = 2$$
$$-2\sin^2\theta + 3\sin\theta - 1 = 0$$
$$2\sin^2\theta - 3\sin\theta + 1 = 0$$

Let $u = \sin\theta$:
$$(2u-1)(u-1) = 0 \;\Rightarrow\; u = \tfrac12 \text{ or } u = 1$$

**$\sin\theta = \frac12$:** $\theta = \frac\pi6, \frac{5\pi}{6}$

**$\sin\theta = 1$:** $\theta = \frac\pi2$

$$\theta = \frac\pi6, \; \frac\pi2, \; \frac{5\pi}{6}$$
:::

:::warning $\sin 2\theta \neq 2\sin\theta$
The factor of 2 is inside the function, so it cannot be pulled out. $\sin 2\theta = 2\sin\theta\cos\theta$
— note the $\cos$.

Similarly $\cos\frac\theta2 \neq \frac12\cos\theta$, and $\sin^2\theta \neq \sin\theta^2$.
:::

---

## 3. The R form: $a\cos\theta + b\sin\theta$

The big one. Two waves of the same frequency added together give **one** wave, with a different
amplitude and a phase shift.

:::key The R form
$$a\sin\theta + b\cos\theta \equiv R\sin(\theta + \alpha)$$
$$a\cos\theta + b\sin\theta \equiv R\cos(\theta - \alpha)$$

In both cases:
$$R = \sqrt{a^2+b^2} \qquad \tan\alpha = \frac{b}{a}$$
with $R > 0$ and $0 < \alpha < \frac\pi2$ (choose the acute value).
:::

:::insight Why it works, and why $R = \sqrt{a^2+b^2}$
Expand the right-hand side using the addition formula:
$$R\sin(\theta+\alpha) = R\sin\theta\cos\alpha + R\cos\theta\sin\alpha$$

Compare with $a\sin\theta + b\cos\theta$:
$$R\cos\alpha = a \qquad R\sin\alpha = b$$

Square and add: $R^2\cos^2\alpha + R^2\sin^2\alpha = a^2 + b^2$, and the left side is $R^2$. So
$R = \sqrt{a^2+b^2}$.

Divide instead: $\frac{R\sin\alpha}{R\cos\alpha} = \tan\alpha = \frac ba$.

That's the whole derivation — "square and add, then divide" — and it's a legitimate way to answer a
"prove that" version of this question.
:::

:::method Using the R form
1. Match your expression to the right template (is the *first* term sine or cosine?).
2. Compute $R = \sqrt{a^2+b^2}$ — leave it in surd form unless told otherwise.
3. Compute $\alpha = \tan^{-1}\frac ba$ — acute, in radians unless the question uses degrees.
4. Write down the single-wave form.
5. Use it: solve the equation, or read off the maximum and minimum.
:::

:::example Worked example 3 — Express $3\sin\theta + 4\cos\theta$ in the form $R\sin(\theta+\alpha)$, and hence solve $3\sin\theta + 4\cos\theta = 2$ for $0 \leq \theta \leq 2\pi$.
**Solution.**

$$R = \sqrt{3^2+4^2} = 5, \qquad \tan\alpha = \frac43 \;\Rightarrow\; \alpha = 0.9273$$

$$3\sin\theta + 4\cos\theta \equiv 5\sin(\theta + 0.9273)$$

**Check:** at $\theta = 0$, LHS $= 4$ and RHS $= 5\sin(0.9273) = 5(0.8) = 4$ ✓

Now solve:
$$5\sin(\theta+0.9273) = 2 \;\Rightarrow\; \sin(\theta+0.9273) = 0.4$$

Let $u = \theta + 0.9273$. The interval becomes $0.9273 \leq u \leq 7.210$.

$\sin^{-1}(0.4) = 0.41152$. Sine positive ⟹ quadrants 1 and 2:
$$u = 0.41152 \;(\text{too small — outside the interval}), \qquad u = \pi - 0.41152 = 2.7301$$

Add $2\pi$ to the first: $u = 0.41152 + 2\pi = 6.6947$ ✓ (inside)

Adding $2\pi$ to the second gives $9.013$ — too big.

Convert back, $\theta = u - 0.9273$:
$$\theta = 1.803 \quad\text{or}\quad \theta = 5.767 \text{ (4 s.f.)}$$

**Check:** $3\sin(1.803) + 4\cos(1.803) = 2.921 - 0.921 = 2.00$ ✓
:::

### Maxima and minima — the real payoff

:::key Reading off max and min
Once written as $R\sin(\theta + \alpha)$:

- **Maximum value $= R$**, occurring when $\sin(\theta+\alpha) = 1$, i.e. $\theta + \alpha = \frac\pi2$.
- **Minimum value $= -R$**, when $\sin(\theta+\alpha) = -1$, i.e. $\theta+\alpha = \frac{3\pi}{2}$.

For expressions like $\dfrac{1}{a\sin\theta+b\cos\theta + c}$, the fraction is **largest when the
denominator is smallest**, so you want the minimum of the wave. Read the question carefully — this
inversion catches people out.
:::

:::example Worked example 4 — The depth of water in a harbour is modelled by $D = 8 + 3\sin\left(\frac{\pi t}{6}\right) + 4\cos\left(\frac{\pi t}{6}\right)$ metres, $t$ hours after midnight.
**(a)** Express $D$ in the form $8 + R\sin\left(\frac{\pi t}{6} + \alpha\right)$.
**(b)** Find the maximum depth and when it first occurs.

**Solution.**

**(a)** From Worked example 3, $3\sin x + 4\cos x = 5\sin(x + 0.9273)$ where $x = \frac{\pi t}{6}$:
$$D = 8 + 5\sin\left(\frac{\pi t}{6} + 0.9273\right)$$

**(b)** Maximum when the sine equals 1, so $D_{\max} = 8 + 5 = \mathbf{13}$ m.

That happens when
$$\frac{\pi t}{6} + 0.9273 = \frac\pi2 = 1.5708$$
$$\frac{\pi t}{6} = 0.64350 \;\Rightarrow\; t = \frac{6 \times 0.64350}{\pi} = 1.229 \text{ hours}$$

So the first high tide is at about **01:14**.

*(The model has period $\frac{2\pi}{\pi/6} = 12$ hours, so the next high tide is at about 13:14 —
consistent with real tides, which is a good sign for the model.)*
:::

---

## In the exam

- **Do not memorise the addition formulae wrongly** — they're in the booklet. Look them up, and look
  carefully at the $\pm$ / $\mp$ pairing.
- For $\cos 2A$, choosing the right one of the three versions is usually the *only* difficult decision
  in the question.
- In R-form questions, **always check** your $R$ and $\alpha$ by substituting $\theta = 0$ into both
  sides. Ten seconds, catches everything.
- "Hence" means use the R form you just found. Don't start again from the original equation.
- Watch the mode and the required accuracy: exam answers are usually 3 s.f. in radians, or 1 d.p. in
  degrees.
- For a "show that" involving $\sin 3\theta$ or $\cos 3\theta$, write $3\theta = 2\theta + \theta$ and
  use the addition formula, then double angles.

---

## Practice

:::question Q1 (3 marks)
Find the exact value of $\sin 75°$.
:::
:::answer
$$\sin(45° + 30°) = \sin45°\cos30° + \cos45°\sin30°$$
$$= \frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2} + \frac{\sqrt2}{2}\cdot\frac12 = \frac{\sqrt6+\sqrt2}{4}$$

*(Same value as $\cos 15°$ — which makes sense, since $\sin75° = \cos(90°-75°) = \cos15°$.)*
:::

:::question Q2 (4 marks)
Given that $\sin A = \frac35$ with $A$ acute, find the exact values of $\sin 2A$ and $\cos 2A$.
:::
:::answer
$A$ acute with $\sin A = \frac35$ gives a 3-4-5 triangle, so $\cos A = \frac45$.

$$\sin2A = 2\sin A\cos A = 2\cdot\tfrac35\cdot\tfrac45 = \tfrac{24}{25}$$

$$\cos2A = 1 - 2\sin^2A = 1 - 2\left(\tfrac{9}{25}\right) = 1 - \tfrac{18}{25} = \tfrac{7}{25}$$

**Check:** $\left(\frac{24}{25}\right)^2 + \left(\frac{7}{25}\right)^2 = \frac{576+49}{625} = 1$ ✓
:::

:::question Q3 (5 marks)
Solve $\sin2\theta = \sin\theta$ for $0 \leq \theta \leq 2\pi$.
:::
:::answer
$$2\sin\theta\cos\theta = \sin\theta$$
$$2\sin\theta\cos\theta - \sin\theta = 0$$
$$\sin\theta(2\cos\theta - 1) = 0$$

**Do not divide by $\sin\theta$** — that would lose solutions.

**$\sin\theta = 0$:** $\theta = 0, \pi, 2\pi$

**$\cos\theta = \frac12$:** $\theta = \frac\pi3, \frac{5\pi}{3}$

$$\theta = 0, \; \frac\pi3, \; \pi, \; \frac{5\pi}{3}, \; 2\pi$$
:::

:::question Q4 (5 marks)
Solve $3\cos2\theta + 5\cos\theta = 1$ for $0 \leq \theta \leq 2\pi$, giving answers to 3 s.f.
:::
:::answer
The equation contains $\cos\theta$, so use $\cos2\theta = 2\cos^2\theta - 1$:
$$3(2\cos^2\theta - 1) + 5\cos\theta - 1 = 0$$
$$6\cos^2\theta + 5\cos\theta - 4 = 0$$

Let $u = \cos\theta$: $(3u+4)(2u-1) = 0$, so $u = -\frac43$ or $u = \frac12$.

**Reject $u = -\frac43$:** $|\cos\theta| \leq 1$.

**$\cos\theta = \frac12$:** $\theta = \frac\pi3$ and $\theta = 2\pi - \frac\pi3 = \frac{5\pi}{3}$.

$$\theta = 1.05, \; 5.24 \text{ (3 s.f.)}$$
:::

:::question Q5 (6 marks)
(a) Express $5\cos\theta - 12\sin\theta$ in the form $R\cos(\theta+\alpha)$, where $R>0$ and
$0 < \alpha < \frac\pi2$.

(b) Hence state the maximum and minimum values of $5\cos\theta - 12\sin\theta$.
:::
:::answer
**(a)** Expanding the template: $R\cos(\theta+\alpha) = R\cos\theta\cos\alpha - R\sin\theta\sin\alpha$.

Comparing: $R\cos\alpha = 5$, $R\sin\alpha = 12$.

$$R = \sqrt{25 + 144} = 13, \qquad \tan\alpha = \tfrac{12}{5} \Rightarrow \alpha = 1.1760$$

$$5\cos\theta - 12\sin\theta \equiv 13\cos(\theta + 1.176)$$

**Check at $\theta=0$:** LHS $=5$; RHS $=13\cos(1.176) = 13(0.3846) = 5$ ✓

**(b)** Since $-1 \leq \cos(\theta+\alpha) \leq 1$:

Maximum $= 13$, minimum $= -13$.
:::

:::question Q6 (7 marks) — modelling
The temperature $T$ °C in a greenhouse $t$ hours after 6 am is modelled by
$$T = 18 + 6\sin\left(\frac{\pi t}{12}\right) - 8\cos\left(\frac{\pi t}{12}\right)$$

(a) Express $6\sin x - 8\cos x$ in the form $R\sin(x - \alpha)$.

(b) Find the maximum temperature and the time it occurs.

(c) Find the first time the temperature reaches 20 °C.
:::
:::answer
**(a)** $R\sin(x-\alpha) = R\sin x\cos\alpha - R\cos x\sin\alpha$, so $R\cos\alpha = 6$,
$R\sin\alpha = 8$.

$$R = \sqrt{36+64} = 10, \qquad \tan\alpha = \tfrac86 = \tfrac43 \Rightarrow \alpha = 0.9273$$

$$6\sin x - 8\cos x \equiv 10\sin(x - 0.9273)$$

**Check at $x=0$:** LHS $=-8$; RHS $= 10\sin(-0.9273) = -8$ ✓

**(b)** $T = 18 + 10\sin\left(\frac{\pi t}{12} - 0.9273\right)$, so $T_{\max} = 28$ °C.

This occurs when $\frac{\pi t}{12} - 0.9273 = \frac\pi2$:
$$\frac{\pi t}{12} = 2.4981 \;\Rightarrow\; t = \frac{12 \times 2.4981}{\pi} = 9.543 \text{ hours}$$

That's about **15:33** (9.54 hours after 6 am).

**(c)**
$$20 = 18 + 10\sin\left(\frac{\pi t}{12} - 0.9273\right) \;\Rightarrow\; \sin(\cdots) = 0.2$$

Let $u = \frac{\pi t}{12} - 0.9273$. Then $\sin^{-1}(0.2) = 0.20136$.

Taking the first solution: $u = 0.20136$
$$\frac{\pi t}{12} = 1.1287 \;\Rightarrow\; t = \frac{12 \times 1.1287}{\pi} = 4.312 \text{ hours}$$

About **10:19**.

*(Sanity check: 10:19 is on the way up towards the 15:33 peak, so a temperature of 20 °C — only 2
above the mean of 18 — occurring in the morning is exactly what we'd expect ✓)*
:::

:::question Q7 (7 marks) — stretch
(a) Show that $\sin 3\theta \equiv 3\sin\theta - 4\sin^3\theta$.

(b) Hence solve $\sin3\theta = \sin\theta$ for $0 \leq \theta \leq \pi$.
:::
:::answer
**(a)** Write $3\theta = 2\theta + \theta$ and use the addition formula:
$$\sin3\theta = \sin(2\theta+\theta) = \sin2\theta\cos\theta + \cos2\theta\sin\theta$$

Substitute the double angle formulae, choosing $\cos2\theta = 1 - 2\sin^2\theta$ (since we want a
$\sin$-only answer):
$$= (2\sin\theta\cos\theta)\cos\theta + (1 - 2\sin^2\theta)\sin\theta$$
$$= 2\sin\theta\cos^2\theta + \sin\theta - 2\sin^3\theta$$

Now replace $\cos^2\theta$ with $1 - \sin^2\theta$:
$$= 2\sin\theta(1-\sin^2\theta) + \sin\theta - 2\sin^3\theta$$
$$= 2\sin\theta - 2\sin^3\theta + \sin\theta - 2\sin^3\theta$$
$$= 3\sin\theta - 4\sin^3\theta \quad\blacksquare$$

**(b)**
$$3\sin\theta - 4\sin^3\theta = \sin\theta$$
$$2\sin\theta - 4\sin^3\theta = 0$$
$$2\sin\theta\left(1 - 2\sin^2\theta\right) = 0$$

**$\sin\theta = 0$:** $\theta = 0, \pi$

**$\sin^2\theta = \frac12 \Rightarrow \sin\theta = \pm\frac{1}{\sqrt2}$:** in $[0,\pi]$ the sine is
non-negative, so take $\sin\theta = \frac{1}{\sqrt2}$, giving $\theta = \frac\pi4, \frac{3\pi}{4}$.

$$\theta = 0, \; \frac\pi4, \; \frac{3\pi}{4}, \; \pi$$
:::
