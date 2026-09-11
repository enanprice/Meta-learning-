---
title: Advanced Integration and Differential Equations
code: P2.11
spec: 8.1–8.6
summary: Standard integrals, reverse chain rule, substitution, integration by parts, partial fractions, the trapezium rule and separable differential equations.
time: 8 hours
prereq: P2.9 Advanced Differentiation, P2.1 Partial Fractions
papers: Papers 1 and 2
---

## Why this topic exists

Differentiation is mechanical: there's a rule for everything, and you apply it. Integration is not.
There's no universal method — you have to **recognise which technique fits**, and that recognition is
the actual skill being examined.

This is the largest topic in A Level pure and the one where the most marks are available. It's also
where differential equations live, which is how every rate-of-change model in science gets solved.

---

## 1. Standard integrals

:::key Learn these
$$\int x^n dx = \frac{x^{n+1}}{n+1} + c \; (n\neq-1) \qquad \int \frac1x dx = \ln|x| + c$$
$$\int e^x dx = e^x + c \qquad \int e^{kx}dx = \frac1k e^{kx} + c$$
$$\int \cos x\,dx = \sin x + c \qquad \int \sin x\,dx = -\cos x + c$$
$$\int \sec^2 x\,dx = \tan x + c \qquad \int \operatorname{cosec}^2x\,dx = -\cot x + c$$
$$\int \sec x\tan x\,dx = \sec x + c \qquad \int \operatorname{cosec}x\cot x\,dx = -\operatorname{cosec}x + c$$
:::

Every one is just a derivative from P2.9 read backwards. If you know the derivatives, you know these.

:::warning The modulus in $\ln|x|$
$\int\frac1x dx = \ln|x| + c$, with the modulus. It matters because $\frac1x$ is defined for negative
$x$ but $\ln x$ isn't. Examiners do take the mark.

Also: $\int \frac{1}{2x}dx = \frac12\ln|x| + c$, **not** $\ln|2x|$ — though the two differ only by a
constant, which the $+c$ absorbs, so both are usually accepted. Be careful with
$\int\frac{1}{2x+1}dx = \frac12\ln|2x+1| + c$, where the $\frac12$ is essential.
:::

---

## 2. Reverse chain rule (integration by inspection)

Two patterns you should spot instantly.

:::key The two patterns
$$\int \frac{f'(x)}{f(x)}dx = \ln|f(x)| + c$$
$$\int f'(x)e^{f(x)}dx = e^{f(x)} + c$$

More generally: $\displaystyle\int f'(x)\big[f(x)\big]^n dx = \frac{[f(x)]^{n+1}}{n+1} + c$
:::

:::method Spotting the pattern
Look for a function **and its own derivative** (up to a constant factor) in the same integrand.

- $\displaystyle\int \frac{2x}{x^2+1}dx$: the top is exactly the derivative of the bottom → $\ln|x^2+1| + c$
- $\displaystyle\int xe^{x^2}dx$: $\frac{d}{dx}(x^2) = 2x$, and we have $x$ — half of what we need →
  $\frac12 e^{x^2} + c$
- $\displaystyle\int \frac{\cos x}{\sin x}dx$: top is the derivative of the bottom → $\ln|\sin x| + c$
:::

:::example Worked example 1 — Find $\displaystyle\int \frac{6x^2}{x^3 + 4}dx$
**Solution.**

The derivative of $x^3+4$ is $3x^2$. We have $6x^2$, which is exactly **twice** that.

$$\int\frac{6x^2}{x^3+4}dx = 2\int\frac{3x^2}{x^3+4}dx = 2\ln|x^3+4| + c$$

**Check by differentiating:** $\frac{d}{dx}\left(2\ln|x^3+4|\right) = 2\cdot\frac{3x^2}{x^3+4}
= \frac{6x^2}{x^3+4}$ ✓
:::

:::exam Always check by differentiating
Integration has a built-in self-check that costs almost nothing: differentiate your answer and see if
you get the integrand back. Use it on every integral you're unsure about. There is no equivalent
safety net anywhere else in the paper.
:::

### Trig powers

$\int\sin^2 x\,dx$ can't be done directly — but the double angle formula turns it into something that can:
$$\sin^2 x = \frac{1-\cos2x}{2} \;\Rightarrow\; \int\sin^2x\,dx = \frac12 x - \frac{\sin2x}{4} + c$$

Same for $\cos^2$ with $\cos^2x = \frac{1+\cos2x}{2}$. **Any even power of sin or cos needs a double
angle identity first.**

---

## 3. Integration by substitution

The chain rule in reverse, made systematic.

:::method Integration by substitution
1. Choose $u$ — usually the "inside" of a composite function, or whatever makes the integral simpler.
2. Differentiate: $\frac{du}{dx} = \dots$, then write $dx$ in terms of $du$.
3. **Substitute everything** — no $x$ may remain.
4. **Change the limits** if it's a definite integral (convert $x$-limits to $u$-limits).
5. Integrate with respect to $u$.
6. If indefinite, substitute back to get an answer in $x$. If definite, just use the $u$-limits.
:::

:::example Worked example 2 — Find $\displaystyle\int 2x\sqrt{x^2+1}\,dx$
**Solution.**

Let $u = x^2 + 1$. Then $\frac{du}{dx} = 2x$, so $du = 2x\,dx$.

The integral contains exactly $2x\,dx$, so it substitutes cleanly:
$$\int \sqrt{u}\,du = \int u^{1/2}du = \frac23 u^{3/2} + c$$

Back-substitute:
$$= \frac23\left(x^2+1\right)^{3/2} + c$$
:::

:::example Worked example 3 — Evaluate $\displaystyle\int_0^1 x(2x+1)^4\,dx$ using the substitution $u = 2x+1$
**Solution.**

$u = 2x+1 \Rightarrow \frac{du}{dx} = 2 \Rightarrow dx = \frac{du}{2}$.

Also $x = \frac{u-1}{2}$.

**Change the limits:**
- $x=0 \Rightarrow u = 1$
- $x=1 \Rightarrow u = 3$

$$\int_0^1 x(2x+1)^4 dx = \int_1^3 \frac{u-1}{2}\cdot u^4\cdot\frac{du}{2}
= \frac14\int_1^3 \left(u^5 - u^4\right)du$$

$$= \frac14\left[\frac{u^6}{6} - \frac{u^5}{5}\right]_1^3$$

At $u=3$: $\frac{729}{6} - \frac{243}{5} = 121.5 - 48.6 = 72.9$

At $u=1$: $\frac16 - \frac15 = -\frac{1}{30} = -0.0333$

$$= \frac14\left(72.9 + 0.0333\right) = \frac{72.9333}{4} = 18.2333 = \frac{1094}{60} = \frac{547}{30}$$
:::

:::warning Changing the limits
If you change the variable, you **must** change the limits — or convert back to $x$ before substituting
the original limits. Using $x$-limits with a $u$-integrand is a guaranteed wrong answer and it's very
easy to do on autopilot.

Changing the limits is usually less work, because you skip the back-substitution.
:::

---

## 4. Integration by parts

The product rule in reverse.

:::key Integration by parts
$$\int u\frac{dv}{dx}dx = uv - \int v\frac{du}{dx}dx$$

In the formula booklet.
:::

:::method Choosing $u$
You want $\int v\frac{du}{dx}dx$ to be **easier** than what you started with. So choose $u$ to be the
thing that gets *simpler* when differentiated.

Priority order (**LATE**):
1. **L**ogarithms ($\ln x$) — always choose this as $u$ if present
2. **A**lgebraic ($x$, $x^2$) — choose as $u$ if no log
3. **T**rigonometric ($\sin x$, $\cos x$)
4. **E**xponential ($e^x$)

Whatever's left over is $\frac{dv}{dx}$.
:::

:::example Worked example 4 — Find $\displaystyle\int x\cos x\,dx$
**Solution.**

By LATE, the algebraic $x$ is $u$ and $\cos x$ is $\frac{dv}{dx}$:
$$u = x \Rightarrow \frac{du}{dx} = 1$$
$$\frac{dv}{dx} = \cos x \Rightarrow v = \sin x$$

$$\int x\cos x\,dx = x\sin x - \int \sin x\cdot 1\,dx = x\sin x + \cos x + c$$

**Check:** $\frac{d}{dx}(x\sin x + \cos x) = \sin x + x\cos x - \sin x = x\cos x$ ✓
:::

:::example Worked example 5 — Find $\displaystyle\int \ln x\,dx$
**Solution.**

There seems to be only one function — but write it as $\ln x \times 1$.

$$u = \ln x \Rightarrow \frac{du}{dx} = \frac1x$$
$$\frac{dv}{dx} = 1 \Rightarrow v = x$$

$$\int\ln x\,dx = x\ln x - \int x\cdot\frac1x dx = x\ln x - \int 1\,dx = x\ln x - x + c$$

*(This is a standard result worth remembering, and the "$\times 1$" trick is examined regularly.)*
:::

:::exam Applying parts twice
$\int x^2 e^x dx$ needs parts **twice**: the first application reduces $x^2$ to $2x$, the second
reduces $2x$ to $2$. The pattern is that the power drops by one each time — so $x^n$ needs $n$
applications. Keep your working neat and label each stage.
:::

---

## 5. Integration using partial fractions

Whenever the integrand is a rational function with a factorisable denominator, split it first.

:::example Worked example 6 — Find $\displaystyle\int \frac{5x-1}{(x+1)(x-2)}dx$
**Solution.**

From P2.1 Worked example 4, the partial fractions are:
$$\frac{5x-1}{(x+1)(x-2)} \equiv \frac{2}{x+1} + \frac{3}{x-2}$$

Each piece is now a standard log integral:
$$\int\left(\frac{2}{x+1} + \frac{3}{x-2}\right)dx = 2\ln|x+1| + 3\ln|x-2| + c$$

*(Which can be combined using log laws as $\ln\left|(x+1)^2(x-2)^3\right| + c$, if the question asks
for a single logarithm.)*
:::

---

## 6. The trapezium rule

For integrals that can't be done exactly, approximate numerically.

:::key The trapezium rule
$$\int_a^b y\,dx \approx \frac{h}{2}\Big[y_0 + 2(y_1 + y_2 + \dots + y_{n-1}) + y_n\Big]$$
where $h = \dfrac{b-a}{n}$ and $n$ is the number of **strips**.

In the formula booklet.
:::

:::warning Strips versus ordinates
$n$ strips means $n+1$ ordinates (y-values), because you need both ends. "Use 4 strips" means compute
$y_0, y_1, y_2, y_3, y_4$ — **five** values. Getting this wrong is the most common error in the topic.

And note the structure: the **first and last** $y$-values get multiplied by 1; **everything in between**
gets multiplied by 2.
:::

:::key Over- or under-estimate?
- If the curve is **convex** (bending upwards) over the interval, the trapezia sit **above** the curve,
  so the rule **overestimates**.
- If the curve is **concave** (bending downwards), the rule **underestimates**.

Justify with a sketch, or by referring to the sign of $\frac{d^2y}{dx^2}$.
:::

---

## 7. Differential equations

An equation containing a derivative. Solving it means finding the function.

:::method Separating the variables
For $\dfrac{dy}{dx} = f(x)g(y)$:

1. Divide by $g(y)$ and multiply by $dx$ to get all the $y$s with $dy$ and all the $x$s with $dx$:
   $$\frac{1}{g(y)}dy = f(x)\,dx$$
2. Integrate both sides — **only one $+c$ needed** (combine both constants into one).
3. Apply the **boundary condition** to find $c$.
4. Rearrange into the form the question asks for, usually $y = \dots$
:::

:::example Worked example 7 — Solve $\dfrac{dy}{dx} = \dfrac{2xy}{x^2+1}$ given that $y = 4$ when $x = 0$.
**Solution.**

Separate:
$$\frac{1}{y}dy = \frac{2x}{x^2+1}dx$$

Integrate both sides (both are reverse-chain-rule log integrals):
$$\ln|y| = \ln|x^2+1| + c$$

Apply the condition $x=0$, $y=4$:
$$\ln 4 = \ln 1 + c = 0 + c \;\Rightarrow\; c = \ln4$$

$$\ln y = \ln(x^2+1) + \ln 4 = \ln\big[4(x^2+1)\big]$$

$$y = 4(x^2+1)$$

**Check:** $\frac{dy}{dx} = 8x$, and $\frac{2x\cdot4(x^2+1)}{x^2+1} = 8x$ ✓
:::

:::exam Writing $c$ as a logarithm
When both sides end up as logs, writing the constant as $\ln A$ instead of $c$ makes the final
rearrangement much cleaner:
$$\ln y = \ln(x^2+1) + \ln A \;\Rightarrow\; y = A(x^2+1)$$
Then find $A$ from the boundary condition. This is a standard and expected technique.
:::

### Modelling with differential equations

The phrase "**the rate of change of $P$ is proportional to $P$**" translates directly to
$$\frac{dP}{dt} = kP$$
which separates to give $P = Ae^{kt}$ — exponential growth or decay, connecting straight back to P1.14.

Other standard translations:
- "proportional to the square root of $V$" → $\frac{dV}{dt} = k\sqrt V$
- "inversely proportional to $x$" → $\frac{dx}{dt} = \frac kx$
- "$\theta$ decreases at a rate proportional to $\theta - 20$" → $\frac{d\theta}{dt} = -k(\theta - 20)$
  (Newton's law of cooling — note the minus sign for "decreases")

---

## In the exam

- **Identify the technique before you start.** Substitution? Parts? Partial fractions? Reverse chain
  rule? A minute spent choosing beats five minutes down a dead end.
- **Check by differentiating.** Every time.
- $+c$ for indefinite integrals.
- For definite integrals, change the limits when you substitute.
- For differential equations, apply the boundary condition **as soon as you've integrated**, before
  rearranging — it's usually much easier that way.
- If a question says "leave your answer in the form $y = f(x)$", finish the rearrangement. Half-marks
  are lost by stopping at the implicit form.

---

## Practice

:::question Q1 (4 marks)
Find (a) $\displaystyle\int \left(3e^{2x} + \frac{4}{x}\right)dx$, (b) $\displaystyle\int(2\sin x - \sec^2x)\,dx$.
:::
:::answer
**(a)** $\dfrac32 e^{2x} + 4\ln|x| + c$

**(b)** $-2\cos x - \tan x + c$
:::

:::question Q2 (4 marks)
Find $\displaystyle\int \frac{x}{x^2 - 3}dx$.
:::
:::answer
$\frac{d}{dx}(x^2-3) = 2x$, and we have $x$ — half of it.

$$\int\frac{x}{x^2-3}dx = \frac12\int\frac{2x}{x^2-3}dx = \frac12\ln|x^2-3| + c$$
:::

:::question Q3 (5 marks)
Use the substitution $u = x^2 + 3$ to find $\displaystyle\int x(x^2+3)^5 dx$.
:::
:::answer
$u = x^2+3 \Rightarrow \frac{du}{dx} = 2x \Rightarrow x\,dx = \frac{du}{2}$.

$$\int x(x^2+3)^5dx = \int u^5 \cdot\frac{du}{2} = \frac12\cdot\frac{u^6}{6} + c = \frac{u^6}{12} + c$$

$$= \frac{(x^2+3)^6}{12} + c$$

**Check:** $\frac{d}{dx}\left[\frac{(x^2+3)^6}{12}\right] = \frac{6(x^2+3)^5(2x)}{12} = x(x^2+3)^5$ ✓
:::

:::question Q4 (5 marks)
Find $\displaystyle\int x e^{2x}dx$.
:::
:::answer
By parts with $u = x$ (algebraic beats exponential), $\frac{dv}{dx} = e^{2x}$:
$$\frac{du}{dx} = 1, \qquad v = \tfrac12 e^{2x}$$

$$\int xe^{2x}dx = \frac{x}{2}e^{2x} - \int\frac12 e^{2x}dx = \frac{x}{2}e^{2x} - \frac14 e^{2x} + c$$

$$= \frac{e^{2x}}{4}(2x - 1) + c$$
:::

:::question Q5 (6 marks)
Find $\displaystyle\int_1^2 \frac{7x - 6}{x(x-3)}\,dx$, giving your answer as an exact multiple of
$\ln 2$.
:::
:::answer
Partial fractions:
$$\frac{7x-6}{x(x-3)} \equiv \frac Ax + \frac{B}{x-3}$$
$$7x - 6 \equiv A(x-3) + Bx$$

*$x=0$:* $-6 = -3A \Rightarrow A = 2$
*$x=3$:* $15 = 3B \Rightarrow B = 5$

$$\int_1^2\left(\frac2x + \frac{5}{x-3}\right)dx = \Big[2\ln|x| + 5\ln|x-3|\Big]_1^2$$

At $x=2$: $2\ln2 + 5\ln1 = 2\ln 2$
At $x=1$: $2\ln1 + 5\ln2 = 5\ln2$

$$= 2\ln2 - 5\ln 2 = -3\ln 2$$

*(The $\ln 3$ term vanishes here. Check the sign makes sense: on $[1,2]$ the denominator $x(x-3)$ is
negative while $7x-6$ is positive, so the integrand is negative throughout and a negative integral is
exactly right ✓)*
:::

:::question Q6 (6 marks)
Use the trapezium rule with 4 strips to estimate $\displaystyle\int_0^2 \sqrt{1+x^3}\,dx$, giving your
answer to 3 decimal places. State, with a reason, whether this is an over- or under-estimate.
:::
:::answer
4 strips over $[0,2]$ gives $h = 0.5$, and **five** ordinates:

| $x$ | 0 | 0.5 | 1 | 1.5 | 2 |
|---|---|---|---|---|---|
| $y = \sqrt{1+x^3}$ | 1 | 1.06066 | 1.41421 | 2.09165 | 3 |

$$\int_0^2 y\,dx \approx \frac{0.5}{2}\Big[1 + 2(1.06066 + 1.41421 + 2.09165) + 3\Big]$$
$$= 0.25\Big[4 + 2(4.56652)\Big] = 0.25\big[4 + 9.13304\big] = 0.25(13.13304) = 3.283$$

**Over-estimate.** The curve $y=\sqrt{1+x^3}$ is **convex** on $[0,2]$ (it bends upwards — the gradient
increases steadily), so each trapezium's top edge lies above the curve, making the total area too big.
:::

:::question Q7 (6 marks)
Solve the differential equation $\dfrac{dy}{dx} = y\cos x$, given that $y = 2$ when $x = 0$. Give your
answer in the form $y = f(x)$.
:::
:::answer
Separate:
$$\frac1y dy = \cos x\,dx$$

Integrate:
$$\ln|y| = \sin x + c$$

Apply $x=0$, $y=2$: $\ln 2 = \sin 0 + c = c$.

$$\ln y = \sin x + \ln 2$$

Exponentiate:
$$y = e^{\sin x + \ln2} = e^{\ln 2}e^{\sin x} = 2e^{\sin x}$$

**Check:** $\frac{dy}{dx} = 2\cos x\,e^{\sin x} = y\cos x$ ✓ and $y(0) = 2e^0 = 2$ ✓
:::

:::question Q8 (8 marks) — modelling
A tank contains $V$ litres of water at time $t$ minutes. Water leaks out at a rate proportional to the
square root of the volume present. Initially the tank holds 400 litres, and 10 minutes later it holds
324 litres.

(a) Write down a differential equation for $V$.

(b) Solve it to find $V$ in terms of $t$.

(c) Find how long the tank takes to empty, and comment on the model.
:::
:::answer
**(a)** "Leaks out" means $V$ is decreasing, so the rate is negative:
$$\frac{dV}{dt} = -k\sqrt V, \qquad k > 0$$

**(b)** Separate:
$$V^{-1/2}dV = -k\,dt$$
$$2V^{1/2} = -kt + c$$

At $t=0$, $V=400$: $2(20) = c \Rightarrow c = 40$.

At $t=10$, $V=324$: $2(18) = -10k + 40 \Rightarrow 36 = 40 - 10k \Rightarrow k = 0.4$.

$$2\sqrt V = 40 - 0.4t \;\Rightarrow\; \sqrt V = 20 - 0.2t$$
$$V = (20 - 0.2t)^2$$

**(c)** Empty when $V=0$:
$$20 - 0.2t = 0 \;\Rightarrow\; t = 100 \text{ minutes}$$

**Comment:** the model predicts the tank empties exactly at $t=100$ and — taken literally — would give
$V$ increasing again for $t>100$, which is physically impossible. So the model is only valid for
$0 \leq t \leq 100$.

It also assumes a constant leak coefficient and no water entering, and in practice the flow rate near
empty is affected by the shape of the tank and surface tension, so the final minutes are the least
reliable part of the prediction.
:::
