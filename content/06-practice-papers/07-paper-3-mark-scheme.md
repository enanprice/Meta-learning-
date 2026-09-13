---
title: Paper 3 — Mark Scheme
code: PP.3 MS
summary: Full mark scheme for exam-style Paper 3 (Statistics and Mechanics), in Edexcel M/A/B notation.
time: 45 minutes to mark
prereq: PP.3 Paper 3
---

:::warning Mark it honestly
**M** = method, survives a slip. **A** = accuracy, dependent on the M. **B** = independent.

Statistics: a contextual conclusion is almost always worth a mark on its own.
Mechanics: answers using $g = 9.8$ are expected to **2 significant figures**.
:::

---

# Section A — Statistics

## Question 1 — 5 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Uses $\dfrac{\text{stratum size}}{800}\times 80$ for at least one stratum | M1 |
| | Production 30, Sales 35 | A1 |
| | Administration 15 (and the three total 80) | A1 |
| (b) | Identifies that stratified sampling guarantees each department is represented **in proportion to its size** | B1 |
| | Explains the consequence: the sample reflects the structure of the workforce, so it is more likely to be representative than a simple random sample, which could by chance under-represent a department | B1 |

**Notes.** (b) "It is more accurate" or "it is fairer" scores B0 — name the mechanism and tie it to
the context.

---

## Question 2 — 7 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | $\bar x = \dfrac{1240}{40} = 31$ | B1 |
| (b) | Uses $\sigma^2 = \dfrac{\sum x^2}{n} - \bar x^2$ | M1 |
| | $= 1015 - 961 = 54$ | A1 |
| | $\sigma = 7.35$ | A1 |
| (c) | $\bar y = \dfrac{31 - 30}{5} = 0.2$ | B1 |
| | $\sigma_y = \dfrac{7.348}{5}$ | M1 |
| | $\sigma_y = 1.47$ | A1 |

**Notes.** (c) The subtraction of 30 affects the mean but **not** the standard deviation — only the
division by 5 does. Giving $\sigma_y = \frac{0.2}{5}$ or applying the $-30$ to $\sigma$ scores M0.

---

## Question 3 — 8 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Uses frequency ÷ class width for at least one class | M1 |
| | $1.5,\ 4,\ 3,\ 1$ | A1 |
| (b) | Identifies the median as the 40th value, in the class $15 \leq t < 25$ | M1 |
| | $15 + \dfrac{40 - 35}{30}\times 10$ | M1 |
| | $= 16.7$ minutes | A1 |
| (c) | Takes a proportion of the $15 \leq t < 25$ class: $\dfrac{5}{10}\times 30 = 15$ | M1 |
| | $15 + 15 = 30$ people | A1 |
| | States the assumption: the values are **uniformly distributed** within each class | B1 |

**Notes.** (b) The cumulative frequencies are 15, 35, 65, 80. Using $\frac{n+1}{2}$ here is not
required for grouped continuous data — use $\frac n2 = 40$. (c) The assumption mark is free and
routinely dropped.

---

## Question 4 — 8 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Uses $P(A\cup B) = P(A) + P(B) - P(A\cap B)$ | M1 |
| | $P(A\cap B) = 0.15$ | A1 |
| (b) | $P(A\mid B) = \dfrac{P(A\cap B)}{P(B)} = \dfrac{0.15}{0.35}$ | M1 |
| | $= \dfrac37 = 0.4286$ | A1 |
| (c) | Compares $P(A)\times P(B) = 0.4\times0.35 = 0.14$ with $P(A\cap B) = 0.15$ | M1 |
| | States $0.14 \neq 0.15$, so $A$ and $B$ are **not** independent | A1 |
| (d) | Recognises $A' \cap B' = (A\cup B)'$ | M1 |
| | $= 1 - 0.6 = 0.4$ | A1 |

**Notes.** (c) The comparison must be shown explicitly; "they are not independent" alone scores M0 A0.

---

## Question 5 — 10 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | $X \sim B(30, 0.15)$ | B1 |
| (b) | $H_0: p = 0.15$ | B1 |
| | $H_1: p > 0.15$ (one-tailed) | B1 |
| | Finds $P(X \geq 8) = 1 - P(X \leq 7)$ | M1 |
| | $= 1 - 0.9302 = 0.0698$ | A1 |
| | Compares with 0.05 and states the result is **not** significant | A1 |
| | Contextual conclusion: there is **insufficient evidence** at the 5% level to suggest the proportion of faulty components has increased | A1 |
| (c) | Tests values: $P(X\geq8) = 0.0698$, $P(X\geq9) = 0.0278$ | M1 |
| | Critical region is $X \geq 9$ | A1 |
| | Actual significance level $= 0.0278$, i.e. 2.78% | A1 |

**Notes.** (b) $P(X \geq 8) = 1 - P(X\leq7)$, **not** $1 - P(X\leq8)$ — the off-by-one is the most
common error in the whole module. Note also that 8 out of 30 *looks* high against an expected 4.5,
but is not significant at the 5% level; students who assume the answer must be "reject" and work
backwards lose the final two marks. "Accept $H_0$" scores A0.

---

## Question 6 — 12 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | $z = -1.2816$ for the 10% tail | B1 |
| | $z = 0.6745$ for the upper 25% | B1 |
| | $\dfrac{120 - \mu}{\sigma} = -1.2816$ | M1 |
| | $\dfrac{155 - \mu}{\sigma} = 0.6745$ | M1 |
| | Solves simultaneously: $35 = 1.9561\sigma$, so $\sigma = 17.9$ | A1 |
| | $\mu = 143$ | A1 |
| (b) | Standardises both 130 and 160 | M1 |
| | $P(130 < X < 160)$ | M1 |
| | $= 0.595$ | A1 |
| (c) | Recognises $Y \sim B(20, 0.1)$ | M1 |
| | $P(Y \geq 3) = 1 - P(Y \leq 2)$ | M1 |
| | $= 1 - 0.6769 = 0.3231$ | A1 |

**Notes.** (a) The sign of the first $z$ is the whole question: 120 is **below** the mean, so $z$ is
negative. A positive $z$ there gives $\mu \approx 97$ and loses both A marks. (c) The 0.1 comes
straight from the stem — 10% of apples are under 120 g — so no further normal work is needed.

---

# Section B — Mechanics

## Question 7 — 6 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Uses $v = u + at$ with $u=8$, $v=20$, $t=6$ | M1 |
| | $a = 2\text{ m s}^{-2}$ | A1 |
| (b) | Stage 1: $s = \frac12(8+20)(6) = 84$ m | M1 A1 |
| | Stage 2: $s = \frac12(20)(10) = 100$ m | M1 |
| | Total $= 184$ m | A1 |

**Notes.** (b) A velocity–time sketch (trapezium plus triangle) is the fastest route and earns the
same marks. Note $184$ m is exact — no $g$ is involved, so 2 s.f. does not apply.

---

## Question 8 — 8 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Applies $F = ma$ to the **whole system**: $4000 - 900 - 300 = 2000a$ | M1 A1 |
| | $a = 1.4\text{ m s}^{-2}$ | A1 |
| (b) | Applies $F = ma$ to the **trailer alone**: $T - 300 = 500a$ | M1 A1 |
| | $T = 1000$ N | A1 |
| (c) | States that the tow bar is **inextensible** (or light and rigid) | B1 |
| | Explains that this is why the car and trailer have the **same acceleration**, allowing the system to be treated as a single body of mass 2000 kg | B1 |

**Notes.** (b) The whole-system equation cannot give $T$ — the tension is internal and cancels. You
must write an equation for a single body. Check with the car: $4000 - 900 - 1000 = 2100 = 1500 \times
1.4$ ✓

---

## Question 9 — 8 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Sets $v = 0$: $3t^2 - 12t + 9 = 0$ | M1 |
| | $(t-1)(t-3) = 0$ | M1 |
| | $t = 1$ and $t = 3$ | A1 |
| (b) | $a = \dfrac{dv}{dt} = 6t - 12$ | M1 |
| | At $t = 4$, $a = 12\text{ m s}^{-2}$ | A1 |
| (c) | Integrates: $s = t^3 - 6t^2 + 9t$ | M1 |
| | Evaluates over the three intervals: $+4$, $-4$, $+4$ | M1 |
| | Total distance $= 12$ m | A1 |

**Notes.** (c) Integrating straight from 0 to 4 gives 4 m, which is the **displacement**, not the
distance. The velocity changes sign at $t = 1$ and $t = 3$, so the integral must be split there and
the modulus of each piece taken. Answering 4 m scores M1 M0 A0.

---

## Question 10 — 9 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Weights: beam $30g = 294$ N at 3 m from $A$; block $50g = 490$ N at 2 m from $A$ | B1 |
| | Takes moments about $C$ (eliminating $R_C$) | M1 |
| | $R_D \times 3 = 294 \times 2 + 490 \times 1$ | A1 |
| | $R_D = 359$ N (2 s.f.) | A1 |
| | Resolves vertically: $R_C = 784 - 359.3 = 425$ N (2 s.f.) | A1 |
| (b) | States that on the point of tilting about $D$, $R_C = 0$ | M1 |
| | Takes moments about $D$: $490(x - 4) = 294(4 - 3)$ | M1 A1 |
| | $x = 4.6$ m | A1 |

**Notes.** (a) Taking moments about $C$ or $D$ is essential — about $A$ you would have two unknowns
in one equation. (b) The beam cannot tilt about $C$ for any $x \geq 0$: even with the block at $A$,
the beam's own weight produces the larger moment. Candidates who find a negative $x$ for that case
and report it as an answer lose marks; the sensible range is $0 \leq x \leq 4.6$.

---

## Question 11 — 9 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | Resolves vertically: $u_y = 21\sin35° = 12.05$ | M1 |
| | Uses $s = u_yt - \frac12gt^2$ with $s = 0$, or $T = \dfrac{2u_y}{g}$ | M1 |
| | $T = 2.46$ s | A1 |
| (b) | $u_x = 21\cos35° = 17.20$, and range $= u_x T$ | M1 |
| | $= 42.3$ m | A1 |
| (c) | Sets up the vertical equation: $4 = 12.05t - 4.9t^2$ | M1 |
| | Solves the quadratic: $t = 0.3958$ or $t = 2.0624$ | M1 A1 |
| | Horizontal distances $6.81$ m and $35.5$ m | A1 |

**Notes.** (c) Two positive roots are both valid here — the ball passes 4 m on the way up and again
on the way down. Discarding one loses the final mark. Keep full accuracy in $t$ before multiplying
by $u_x$.

---

## Question 12 — 10 marks

| Part | Scheme | Marks |
|---|---|---|
| (a) | $R = 5g\cos20° = 46.0$ N, so $F_{\max} = 0.3R = 13.8$ N | M1 |
| | $5g\sin20° = 16.8$ N, so total resistance $= 30.6$ N | A1 |
| | Compares with the driving weight $8g = 78.4$ N; since $78.4 > 30.6$ the system moves | A1 |
| (b) | For $Q$: $8g - T = 8a$ | M1 A1 |
| | For $P$ up the slope: $T - 5g\sin20° - F = 5a$ | M1 A1 |
| | $a = 3.7\text{ m s}^{-2}$ (2 s.f.) | A1 |
| | $T = 49$ N (2 s.f.) | A1 |
| (c) | States the string is **light** (and inextensible) | B1 |
| | Explains that this is why the tension is the same on both sides of the pulley, and why both blocks have the same magnitude of acceleration | B1 |

**Notes.** (b) $P$ moves **up** the slope, so friction acts **down** it — getting the friction
direction wrong gives $a = 5.8$ and loses both A marks. Sanity check: the tension (49 N) lies between
the two relevant weights, and $a < g$ ✓

---

## Marks by topic

| Section | Topic | Question | Marks |
|---|---|---|---|
| A | Sampling | 1 | 5 |
| A | Measures of location and spread, coding | 2 | 7 |
| A | Data representation and interpolation | 3 | 8 |
| A | Probability | 4 | 8 |
| A | Binomial distribution and hypothesis testing | 5 | 10 |
| A | Normal distribution | 6 | 12 |
| B | Constant acceleration | 7 | 6 |
| B | Newton's laws and connected particles | 8 | 8 |
| B | Variable acceleration | 9 | 8 |
| B | Moments | 10 | 9 |
| B | Projectiles | 11 | 9 |
| B | Friction, slopes and pulleys | 12 | 10 |
