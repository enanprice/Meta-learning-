---
title: Sequences and Series
code: P2.3
spec: 4.2, 4.3, 4.4
summary: Arithmetic and geometric sequences, sum formulae, convergence, sigma notation, recurrence relations and periodic sequences.
time: 5 hours
prereq: P1.14 Exponentials and Logarithms
papers: Papers 1 and 2
---

## Why this topic exists

Sequences are how you model anything that changes in discrete steps: monthly savings, annual salary
increases, drug concentration after repeated doses, the bounce height of a ball. Arithmetic sequences
model constant *addition*; geometric sequences model constant *multiplication* — which is discrete
exponential growth.

The formulae are all in the formula booklet. What isn't in the booklet is knowing **which sequence you're
looking at** and **whether the question wants a term or a sum**. That's where the marks go.

---

## 1. Arithmetic sequences

A sequence where you **add** a fixed amount each time. That fixed amount is the **common difference**
$d$.

$$a, \; a+d, \; a+2d, \; a+3d, \dots$$

:::key Arithmetic formulae
**$n$th term:**
$$u_n = a + (n-1)d$$

**Sum of the first $n$ terms:**
$$S_n = \frac{n}{2}\big[2a + (n-1)d\big] \qquad\text{or}\qquad S_n = \frac{n}{2}(a + l)$$
where $l$ is the last term.

Both sum formulae are in the formula booklet.
:::

:::insight Where the sum formula comes from (Gauss's trick)
Write the sum forwards and backwards, and add:
$$S = a + (a+d) + \dots + (l-d) + l$$
$$S = l + (l-d) + \dots + (a+d) + a$$

Add the two lines **column by column**. Every column gives the same total, $(a + l)$, and there are $n$
columns:
$$2S = n(a+l) \;\Rightarrow\; S = \frac n2(a+l)$$

Then substitute $l = a + (n-1)d$ for the other version. Knowing this means you can rebuild the formula
if you're ever unsure which is which.
:::

:::warning $(n-1)$, not $n$
The first term already *is* $a$ — you've added $d$ zero times. So the $n$th term has $(n-1)$ lots of
$d$, not $n$. Getting this wrong shifts every answer by one term, and it's the single most common
error in the topic.
:::

:::example Worked example 1 — An arithmetic sequence has 3rd term 11 and 8th term 31. Find $a$, $d$, and the sum of the first 20 terms.
**Solution.**

$$u_3 = a + 2d = 11 \qquad (1)$$
$$u_8 = a + 7d = 31 \qquad (2)$$

$(2) - (1)$: $5d = 20 \Rightarrow d = 4$.

Then $a + 8 = 11 \Rightarrow a = 3$.

$$S_{20} = \frac{20}{2}\big[2(3) + 19(4)\big] = 10\big[6 + 76\big] = 820$$

**Check:** the 20th term is $3 + 19(4) = 79$, and $\frac{20}{2}(3 + 79) = 10 \times 82 = 820$ ✓
:::

---

## 2. Geometric sequences

A sequence where you **multiply** by a fixed amount each time — the **common ratio** $r$.

$$a, \; ar, \; ar^2, \; ar^3, \dots$$

:::key Geometric formulae
**$n$th term:**
$$u_n = ar^{n-1}$$

**Sum of the first $n$ terms:**
$$S_n = \frac{a(1 - r^n)}{1 - r} \qquad (r \neq 1)$$

**Sum to infinity** (only when $|r| < 1$):
$$S_\infty = \frac{a}{1-r}$$
:::

To find $r$ from two consecutive terms: $r = \dfrac{u_{n+1}}{u_n}$ — divide any term by the one before it.

:::insight Why $S_\infty$ only works for $|r| < 1$
Look at $S_n = \frac{a(1-r^n)}{1-r}$ and ask what happens to $r^n$ as $n\to\infty$.

- If $|r| < 1$, repeatedly multiplying by $r$ shrinks towards zero: $r^n \to 0$, so
  $S_n \to \frac{a}{1-r}$. The series **converges**.
- If $|r| > 1$, $r^n$ blows up and the sum grows without limit. **Divergent** — $S_\infty$ doesn't exist.
- If $r = 1$ every term is $a$ and the sum is $na \to \infty$. If $r = -1$ the partial sums oscillate
  between $a$ and $0$ and never settle.

So "$|r| < 1$" is exactly the condition for the terms to shrink fast enough for the total to be finite.
Quote it whenever you use $S_\infty$ — it's a mark.
:::

:::example Worked example 2 — A geometric series has first term 24 and common ratio $\frac34$. Find (a) the 6th term, (b) the sum of the first 6 terms, (c) the sum to infinity.
**Solution.**

**(a)** $u_6 = 24\left(\tfrac34\right)^5 = 24 \times \tfrac{243}{1024} = \tfrac{729}{128} = 5.6953$

**(b)**
$$S_6 = \frac{24\left(1 - (0.75)^6\right)}{1 - 0.75} = \frac{24(1 - 0.17798)}{0.25} = \frac{24 \times 0.82202}{0.25} = 78.9$$

**(c)** $|r| = 0.75 < 1$, so the sum to infinity exists:
$$S_\infty = \frac{24}{1 - 0.75} = \frac{24}{0.25} = 96$$

*(Sanity check: $S_6 = 78.9$ is already most of the way to 96, and each further term is smaller ✓)*
:::

### Solving for $n$ with logs

Geometric questions frequently ask "after how many terms does the sum first exceed…", which puts $n$
in an exponent — so you need logs (P1.14).

:::example Worked example 3 — For the sequence $u_n = 5(1.2)^{n-1}$, find the smallest $n$ for which $u_n > 100$.
**Solution.**
$$5(1.2)^{n-1} > 100 \;\Rightarrow\; (1.2)^{n-1} > 20$$

Take natural logs (both sides are positive, and $\ln$ is increasing, so the inequality direction is
preserved):
$$(n-1)\ln 1.2 > \ln 20$$
$$n - 1 > \frac{\ln 20}{\ln 1.2} = \frac{2.9957}{0.18232} = 16.43$$
$$n > 17.43$$

Since $n$ must be an integer, the smallest is $n = 18$.

**Check:** $u_{18} = 5(1.2)^{17} = 110.9 > 100$ ✓ and $u_{17} = 5(1.2)^{16} = 92.4 < 100$ ✓
:::

:::warning Dividing by a negative log flips the inequality
If $0 < r < 1$ then $\ln r$ is **negative**, so dividing by it reverses the inequality sign. This
catches people out in decay questions ("how many years until the value falls below…"). Check your
answer numerically — it takes five seconds and removes all doubt.
:::

---

## 3. Sigma notation

$$\sum_{r=1}^{n} u_r = u_1 + u_2 + \dots + u_n$$

The letter under the $\Sigma$ is the counter; the numbers say where to start and stop.

:::key Useful properties
$$\sum (au_r + bv_r) = a\sum u_r + b\sum v_r \qquad \sum_{r=1}^{n} k = kn$$

And to sum from a later starting point:
$$\sum_{r=m}^{n} u_r = \sum_{r=1}^{n}u_r - \sum_{r=1}^{m-1}u_r$$
:::

:::warning Count the terms
$\sum_{r=4}^{10}$ has $10 - 4 + 1 = \mathbf{7}$ terms, not 6. "Last minus first plus one." Off-by-one
here wrecks the whole calculation.
:::

---

## 4. Recurrence relations

A sequence defined by a rule linking each term to the previous one, plus a starting value:
$$u_{n+1} = f(u_n), \qquad u_1 = k$$

You usually just generate terms one at a time.

:::key Vocabulary
- **Increasing:** $u_{n+1} > u_n$ for all $n$.
- **Decreasing:** $u_{n+1} < u_n$ for all $n$.
- **Periodic** with period $k$: $u_{n+k} = u_n$ for all $n$ — the sequence repeats in a cycle.
- **Convergent:** the terms approach a **limit** $L$.
:::

:::method Finding the limit of a convergent sequence
If $u_{n+1} = f(u_n)$ converges to $L$, then both $u_n$ and $u_{n+1}$ tend to $L$. So substitute $L$
for both:
$$L = f(L)$$
and solve. Reject any root that's impossible given the starting value (e.g. a negative limit for a
sequence of positive terms).
:::

:::example Worked example 4 — A sequence is defined by $u_{n+1} = \sqrt{3u_n + 4}$ with $u_1 = 2$. Find the limit.
**Solution.**

First, a couple of terms to see what's happening: $u_2 = \sqrt{10} = 3.162$, $u_3 = \sqrt{13.49} = 3.673$,
$u_4 = \sqrt{15.02} = 3.876$ — increasing, apparently towards something near 4.

Let the limit be $L$:
$$L = \sqrt{3L + 4}$$
$$L^2 = 3L + 4$$
$$L^2 - 3L - 4 = 0 \;\Rightarrow\; (L-4)(L+1) = 0 \;\Rightarrow\; L = 4 \text{ or } L = -1$$

**Reject $L = -1$:** all the terms are square roots, hence non-negative, so the limit cannot be
negative.

$$L = 4$$
:::

---

## 5. Modelling with sequences

:::exam Which sequence is it?
Read the wording:
- "increases by £200 **each year**" → **arithmetic**, $d = 200$
- "increases by 4% each year" → **geometric**, $r = 1.04$
- "decreases by 15% each year" → **geometric**, $r = 0.85$
- "each bounce reaches 60% of the previous height" → **geometric**, $r = 0.6$

And then: does the question want a single **term** ("how much in year 10?") or the **sum**
("how much in total over 10 years?")? Misreading this is the most expensive error in the topic —
you can do all the maths correctly and answer the wrong question.
:::

:::example Worked example 5 — Sam saves £150 in the first month and increases the amount by £10 each month. (a) How much does he save in month 24? (b) What is his total after 2 years?
**Solution.**

Arithmetic with $a = 150$, $d = 10$.

**(a)** A single term:
$$u_{24} = 150 + 23(10) = £380$$

**(b)** The sum:
$$S_{24} = \frac{24}{2}\big[2(150) + 23(10)\big] = 12\big[300 + 230\big] = 12 \times 530 = £6360$$
:::

---

## In the exam

- **Identify the type first.** Divide consecutive terms: constant ratio → geometric. Subtract
  consecutive terms: constant difference → arithmetic.
- State $|r| < 1$ whenever you use $S_\infty$.
- $n$ is always a **positive integer**. If you get $n = 12.7$, the answer is 12 or 13 — decide which by
  substituting both and seeing which satisfies the condition.
- Simultaneous equations from two given terms is the standard 4-mark opener. Subtract to eliminate $a$.
- Keep exact fractions where you can; round only at the end.

---

## Practice

:::question Q1 (4 marks)
An arithmetic sequence has first term 7 and common difference 5. Find (a) the 15th term, (b) the sum
of the first 30 terms.
:::
:::answer
**(a)** $u_{15} = 7 + 14(5) = 77$

**(b)** $S_{30} = \frac{30}{2}\big[2(7) + 29(5)\big] = 15\big[14 + 145\big] = 15 \times 159 = 2385$
:::

:::question Q2 (5 marks)
The 4th term of an arithmetic sequence is 17 and the 9th term is 42. Find the first term, the common
difference, and the sum of the first 12 terms.
:::
:::answer
$$a + 3d = 17, \qquad a + 8d = 42$$

Subtracting: $5d = 25 \Rightarrow d = 5$, then $a + 15 = 17 \Rightarrow a = 2$.

$$S_{12} = \frac{12}{2}\big[2(2) + 11(5)\big] = 6\big[4 + 55\big] = 354$$
:::

:::question Q3 (4 marks)
A geometric series has first term 81 and common ratio $\frac23$. Find (a) the 5th term, (b) the sum to
infinity.
:::
:::answer
**(a)** $u_5 = 81\left(\frac23\right)^4 = 81 \times \frac{16}{81} = 16$

**(b)** $|r| = \frac23 < 1$, so $S_\infty$ exists:
$$S_\infty = \frac{81}{1 - \frac23} = \frac{81}{\frac13} = 243$$
:::

:::question Q4 (5 marks)
The second term of a geometric series is 12 and the fifth term is $\frac{81}{2}$. Find $a$ and $r$.
:::
:::answer
$$ar = 12, \qquad ar^4 = \tfrac{81}{2}$$

Divide the second by the first — this is the standard move, because $a$ cancels:
$$r^3 = \frac{81/2}{12} = \frac{81}{24} = \frac{27}{8} \;\Rightarrow\; r = \frac32$$

Then $a\left(\frac32\right) = 12 \Rightarrow a = 8$.

**Check:** $u_5 = 8\left(\frac32\right)^4 = 8 \times \frac{81}{16} = \frac{81}{2}$ ✓
:::

:::question Q5 (5 marks)
For the geometric series $3 + 3(1.15) + 3(1.15)^2 + \dots$, find the smallest number of terms for which
the sum exceeds 500.
:::
:::answer
$$S_n = \frac{3\left(1.15^n - 1\right)}{0.15} = 20\left(1.15^n - 1\right) > 500$$
$$1.15^n - 1 > 25 \;\Rightarrow\; 1.15^n > 26$$
$$n\ln 1.15 > \ln 26 \;\Rightarrow\; n > \frac{3.2581}{0.13976} = 23.31$$

Smallest integer: $n = 24$.

**Check:** $S_{24} = 20(1.15^{24} - 1) = 20(28.63 - 1) = 552.6 > 500$ ✓,
while $S_{23} = 20(24.89-1) = 477.9 < 500$ ✓
:::

:::question Q6 (5 marks)
A sequence is defined by $u_{n+1} = \dfrac{1}{2 - u_n}$ with $u_1 = 0$.

(a) Find $u_2$, $u_3$ and $u_4$.

(b) Given the sequence converges, find the exact value of its limit.
:::
:::answer
**(a)**
$$u_2 = \frac{1}{2-0} = \tfrac12, \qquad u_3 = \frac{1}{2 - \frac12} = \frac{1}{\frac32} = \tfrac23,
\qquad u_4 = \frac{1}{2-\frac23} = \frac{1}{\frac43} = \tfrac34$$

*(The pattern $\frac{n-1}{n}$ is emerging, suggesting a limit of 1.)*

**(b)** Let the limit be $L$:
$$L = \frac{1}{2 - L} \;\Rightarrow\; L(2-L) = 1 \;\Rightarrow\; 2L - L^2 = 1$$
$$L^2 - 2L + 1 = 0 \;\Rightarrow\; (L-1)^2 = 0 \;\Rightarrow\; L = 1$$
:::

:::question Q7 (7 marks) — modelling
A company's profit in year 1 is £40,000. Two models are proposed:

**Model A:** profit increases by £3,000 each year.
**Model B:** profit increases by 6% each year.

(a) Find the profit in year 10 under each model.

(b) Find the total profit over the first 10 years under each model.

(c) Find the first year in which Model B predicts a greater annual profit than Model A.
:::
:::answer
**Model A** is arithmetic: $a = 40000$, $d = 3000$.
**Model B** is geometric: $a = 40000$, $r = 1.06$.

**(a)**
- A: $u_{10} = 40000 + 9(3000) = £67{,}000$
- B: $u_{10} = 40000(1.06)^9 = 40000 \times 1.68948 = £67{,}579$

**(b)**
- A: $S_{10} = \frac{10}{2}[80000 + 9(3000)] = 5(107000) = £535{,}000$
- B: $S_{10} = \frac{40000(1.06^{10}-1)}{0.06} = \frac{40000(0.79085)}{0.06} = £527{,}231$

**(c)** We need $40000(1.06)^{n-1} > 40000 + 3000(n-1)$.

Dividing by 40000: $(1.06)^{n-1} > 1 + 0.075(n-1)$. An exponential against a linear can't be solved
algebraically, so tabulate:

| Year $n$ | Model A $= 40000+3000(n-1)$ | Model B $= 40000(1.06)^{n-1}$ |
|---|---|---|
| 7 | 58,000 | 56,741 |
| 8 | 61,000 | 60,145 |
| 9 | 64,000 | 63,754 |
| 10 | 67,000 | 67,579 |

Model B first exceeds Model A in **year 10**.

*(This is the classic linear-vs-exponential crossover: the arithmetic model leads early, but the
geometric one eventually wins and then pulls away without limit. Worth saying so in a "comment on the
models" part.)*
:::
