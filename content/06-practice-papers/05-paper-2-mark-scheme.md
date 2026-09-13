---
title: Paper 2 — Mark Scheme
code: PP.2 MS
summary: Full mark scheme for exam-style Pure Paper 2, in Edexcel M/A/B notation.
time: 45 minutes to mark
prereq: PP.2 Paper 2
---

:::warning Mark it honestly
**M** = method, survives a slip. **A** = accuracy, dependent on the M. **B** = independent.
Method you didn't write down doesn't score.
:::

---

## Question 1 — 4 marks

| Scheme | Marks |
|---|---|
| Correct form: $\dfrac{7x-1}{(x-1)(2x+1)} \equiv \dfrac{A}{x-1} + \dfrac{B}{2x+1}$ and clears fractions to $7x - 1 \equiv A(2x+1) + B(x-1)$ | M1 |
| Substitutes $x = 1$ (or compares coefficients) to find $A$ | M1 |
| $A = 2$ | A1 |
| $B = 3$ | A1 |

**Notes.** Substituting $x = -\frac12$ gives $-\frac92 = -\frac32 B$, so $B = 3$. Final answer
$\dfrac{2}{x-1} + \dfrac{3}{2x+1}$. A quick check at $x = 0$ gives $1 = -2 + 3$ ✓

---

## Question 2 — 5 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Uses $s = r\theta$ | M1 |
| | $7.2$ cm | A1 |
| (b) | Sector area $= \frac12(8)^2(0.9) = 28.8$ | M1 |
| | Triangle area $= \frac12(8)^2\sin 0.9 = 25.07$ | M1 |
| | Segment $= 3.73$ cm² | A1 |

**Notes.** (b) $\sin 0.9$ must be evaluated in **radians**. Using degrees gives $0.5024$ for the
triangle and a segment of 28.3, which scores M1 M0 A0 — this is the single most common error on
radian questions.

---

## Question 3 — 6 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Writes $(4-x)^{-1/2} = 4^{-1/2}\left(1 - \frac x4\right)^{-1/2} = \frac12\left(1-\frac x4\right)^{-1/2}$ | M1 |
| | Correct binomial structure with $n = -\frac12$ | M1 |
| | $\frac12 + \frac{x}{16}$ | A1 |
| | $+\;\dfrac{3x^2}{256}$ | A1 |
| (b) | $\left|\dfrac{x}{4}\right| < 1$ | M1 |
| | $|x| < 4$ | A1 |

**Notes.** (a) The factor outside must be $4^{-1/2} = \frac12$, not $4$ or $\frac14$; getting it wrong
scales every term and scores M0. Using `nCr` on a negative index scores M0 — the coefficients must be
written longhand as $\frac{n(n-1)}{2!}$.

---

## Question 4 — 7 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Differentiates $x^3 + y^3$ correctly: $3x^2 + 3y^2\dfrac{dy}{dx}$ | M1 |
| | Applies the product rule to $6xy$: $6y + 6x\dfrac{dy}{dx}$ | M1 |
| | Collects the $\dfrac{dy}{dx}$ terms: $\dfrac{dy}{dx}\left(3y^2 - 6x\right) = 6y - 3x^2$ | M1 |
| | $\dfrac{dy}{dx} = \dfrac{2y - x^2}{y^2 - 2x}$ **(answer given)** | A1* |
| (b) | Substitutes $(3,3)$: $\dfrac{6 - 9}{9 - 6} = -1$ | M1 |
| | Normal gradient $= 1$ | M1 |
| | $y = x$ | A1 |

**Notes.** (a) $\frac{d}{dx}(6xy) = 6\frac{dy}{dx}$ is the standard error and scores M0 for that mark.
(b) Verify $(3,3)$ is on the curve: $27 + 27 = 54 = 6(3)(3)$ ✓

---

## Question 5 — 8 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Chooses $u = \ln x$, $\dfrac{dv}{dx} = x$ (logs before algebra) | M1 |
| | $= \dfrac{x^2}{2}\ln x - \displaystyle\int \dfrac{x^2}{2}\cdot\dfrac1x\,dx$ | M1 |
| | Simplifies the remaining integral to $\displaystyle\int\dfrac x2 dx$ | M1 |
| | $\dfrac{x^2}{2}\ln x - \dfrac{x^2}{4} + c$ | A1 |
| (b) | Substitutes the limits | M1 |
| | At $x = e$: $\dfrac{e^2}{2} - \dfrac{e^2}{4} = \dfrac{e^2}{4}$ | A1 |
| | At $x = 1$: $0 - \dfrac14 = -\dfrac14$ | A1 |
| | $\dfrac{e^2 + 1}{4}$ | A1 |

**Notes.** (a) Choosing $u = x$ leads nowhere — $\int \ln x\,dx$ is harder than what you started with.
LATE puts the logarithm first. (b) $+c$ is not required for a definite integral but must be present
in (a).

---

## Question 6 — 7 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | $f(1) = -1$ and $f(2) = 9$ | M1 |
| | States the **change of sign** and that $f$ is **continuous**, hence a root lies in $(1,2)$ | A1 |
| (b) | $f'(x) = 3x^2 + 3$ and applies $x_1 = x_0 - \dfrac{f(x_0)}{f'(x_0)}$ | M1 |
| | $x_1 = 1 - \dfrac{-1}{6} = 1.16667$ | A1 |
| | $x_2 = 1.1542$ (4 d.p.) | A1 |
| (c) | $f(1.1535) = -0.0047$ and $f(1.1545) = +0.0023$ | M1 |
| | Change of sign and $f$ continuous, so $1.1535 < \alpha < 1.1545$, hence $\alpha = 1.154$ (3 d.p.) | A1 |

**Notes.** (a) All three components are needed: both values, "change of sign", "continuous". Two out
of three scores M1 A0. (c) Iterating until the digits look stable is **not** a proof — the sign change
on the rounding bounds is what earns the mark.

---

## Question 7 — 9 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | $R = \sqrt{5^2 + 12^2}$ | M1 |
| | $R = 13$ | A1 |
| | $\tan\alpha = \dfrac{5}{12}$, so $\alpha = 0.3948$ | A1 |
| (b) | $\sin(\theta + \alpha) = \dfrac{6}{13}$ | M1 |
| | $\theta + \alpha = 0.4797$ or $\pi - 0.4797 = 2.6619$ | M1 |
| | $\theta = 0.085$ | A1 |
| | $\theta = 2.267$ | A1 |
| (c) | Recognises that the fraction is greatest when $f(\theta)$ is **least**, i.e. $f(\theta) = -13$ | M1 |
| | $\dfrac{1}{2}$ | A1 |

**Notes.** (a) Check by substituting $\theta = 0$: $13\sin(0.3948) = 5$ ✓ (b) Transform the interval
before solving: $0.3948 \leq \theta + \alpha \leq 6.678$, which is why adding $2\pi$ to the first
value gives $6.763$ — outside, so there are exactly two solutions. (c) Maximising the denominator is
the standard trap; the fraction is largest when the denominator is smallest.

---

## Question 8 — 8 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | $\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$ | M1 |
| | $= 3\mathbf{i} + 2\mathbf{j} - 4\mathbf{k}$ | A1 |
| | $\left|\overrightarrow{AB}\right| = \sqrt{9 + 4 + 16} = \sqrt{29}$ | A1 |
| (b) | $\overrightarrow{BC} = 6\mathbf{i} + 4\mathbf{j} - 8\mathbf{k}$ | M1 |
| | States $\overrightarrow{BC} = 2\overrightarrow{AB}$, so the vectors are **parallel** | A1 |
| | States that they also share the common point $B$, hence $A$, $B$, $C$ are collinear | A1 |
| (c) | $\left|\overrightarrow{BC}\right| = 2\left|\overrightarrow{AB}\right|$ | M1 |
| | $AB : BC = 1 : 2$ | A1 |

**Notes.** (b) Parallel **alone** is not collinearity — the common point must be stated explicitly.
This is worth a full mark and is missed constantly.

---

## Question 9 — 10 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Separates: $\displaystyle\int\frac{1}{\theta - 20}\,d\theta = \int -k\,dt$ | M1 |
| | $\ln\lvert\theta - 20\rvert = -kt + c$ | A1 |
| | Uses $t = 0$, $\theta = 80$ to find the constant | M1 |
| | $\theta = 20 + 60e^{-kt}$ **(answer given)** | A1* |
| (b) | $50 = 20 + 60e^{-10k}$ so $e^{-10k} = \dfrac12$ | M1 |
| | $k = \dfrac{\ln 2}{10}$ | A1 |
| (c) | Substitutes $t = 25$ | M1 |
| | $30.6\,^\circ$C | A1 |
| (d) | As $t \to \infty$, $e^{-kt} \to 0$, so $\theta \to 20\,^\circ$C | B1 |
| | This is reasonable: the coffee can cool no further than the temperature of the room | B1 |

**Notes.** (b) "Exact" means $\frac{\ln2}{10}$; $0.0693$ scores A0. (c) Use the exact $k$. (d) Both
marks require the interpretation, not just the limit.

---

## Question 10 — 9 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Assumes $\sqrt5$ **is** rational: $\sqrt5 = \dfrac ab$ with $a,b$ integers **having no common factors** | B1 |
| | Squares and rearranges: $a^2 = 5b^2$ | M1 |
| | Deduces $a$ is a multiple of 5, and writes $a = 5k$ | A1 |
| | Obtains $b^2 = 5k^2$, so $b$ is also a multiple of 5 | A1 |
| | States the contradiction ($a$ and $b$ share a factor of 5) and concludes $\sqrt5$ is irrational | A1 |
| (b) | Factorises: $n^3 - n = n(n^2-1) = (n-1)n(n+1)$ | M1 |
| | Identifies these as three **consecutive** integers | A1 |
| | Argues at least one is divisible by 2 and exactly one by 3 | M1 |
| | Concludes the product is divisible by $2 \times 3 = 6$ | A1 |

**Notes.** (a) The "no common factors" clause in the opening assumption is what the contradiction
attacks; omitting it loses B1 and makes the proof invalid. The explicit words "contradiction" and
"therefore" are expected.

---

## Question 11 — 10 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | $\dfrac{dx}{dt} = 2t$ and $\dfrac{dy}{dt} = 3t^2 - 3$ | M1 A1 |
| | $\dfrac{dy}{dx} = \dfrac{3t^2 - 3}{2t}$ | A1 |
| (b) | Sets the numerator to zero: $3t^2 - 3 = 0$ | M1 |
| | $t = \pm1$ (and checks $\frac{dx}{dt} \neq 0$ there) | A1 |
| | $(0, -2)$ | A1 |
| | $(0, 2)$ | A1 |
| (c) | At $t = 2$: gradient $= \dfrac{9}{4}$ | M1 |
| | Point $(3, 2)$ | M1 |
| | $9x - 4y - 19 = 0$ | A1 |

**Notes.** (b) A horizontal tangent needs $\frac{dy}{dt} = 0$ **with** $\frac{dx}{dt} \neq 0$; setting
the whole fraction to zero without that check is accepted here but is worth understanding. Both points
have $x = 0$ — that is correct, the curve crosses itself there.

---

## Question 12 — 8 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | $u_2 = 0.4(5) + 6 = 8$ | M1 |
| | $u_3 = 9.2$ | A1 |
| | $u_4 = 9.68$ | A1 |
| (b) | Sets $L = 0.4L + 6$ | M1 |
| | $0.6L = 6$ | M1 |
| | $L = 10$ | A1 |
| (c) | $5 + 8 + 9.2 + 9.68$ | M1 |
| | $31.88$ | A1 |

**Notes.** (b) The method mark is for replacing **both** $u_{n+1}$ and $u_n$ by $L$. (c) This is the
sum of the four terms found in (a) — not a geometric or arithmetic series formula, since the sequence
is neither.

---

## Question 13 — 9 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | $fg(x) = f(x^2+1) = \dfrac{3}{x^2 + 1 - 2}$ | M1 |
| | $= \dfrac{3}{x^2 - 1}$ | A1 |
| | Requires $x^2 + 1 > 2$, i.e. $x < -1$ or $x > 1$ | A1 |
| (b) | Sets $y = \dfrac{3}{x-2}$ and makes $x$ the subject | M1 |
| | $x = 2 + \dfrac3y$ | M1 |
| | $f^{-1}(x) = 2 + \dfrac3x$ | A1 |
| | Domain: $x > 0$ | A1 |
| (c) | $f(x) > 0$ | B1 |
| | Strict inequality, and expressed in terms of $f(x)$ | B1 |

**Notes.** (a) The domain condition comes from the **domain of $f$** ($x > 2$), applied to the output
of $g$ — not from the final expression. (b) The domain of $f^{-1}$ is the range of $f$; quoting
$x \neq 0$ instead of $x > 0$ scores A0.

---

## Marks by topic

| Topic | Question | Marks |
|---|---|---|
| Partial fractions | 1 | 4 |
| Radians, sectors and segments | 2 | 5 |
| Binomial for negative/fractional indices | 3 | 6 |
| Implicit differentiation | 4 | 7 |
| Integration by parts | 5 | 8 |
| Numerical methods | 6 | 7 |
| The R form and trig equations | 7 | 9 |
| Vectors in three dimensions | 8 | 8 |
| Differential equations and modelling | 9 | 10 |
| Proof by contradiction and number proof | 10 | 9 |
| Parametric equations | 11 | 10 |
| Sequences and recurrence relations | 12 | 8 |
| Functions, composites and inverses | 13 | 9 |
