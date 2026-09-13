---
title: Exponentials and Logarithms
code: P1.14
spec: 6.1–6.7
summary: Exponential graphs, the number e, logarithm laws, solving exponential equations, and turning curved data into straight lines.
time: 5 hours
prereq: P1.1 Algebraic Expressions, P1.4 Graphs and Transformations
papers: Papers 1 and 2
---

## Why this topic exists

Exponential functions describe anything whose rate of growth is proportional to how much there already
is: populations, compound interest, radioactive decay, the spread of an infection, the cooling of a
cup of coffee.

Logarithms are the inverse — the tool for getting the variable *out of the exponent*. Without them you
simply cannot solve $3^x = 20$.

And the last section of this topic, turning curved data into a straight line with logs, is a genuinely
powerful technique that shows up in exam questions every year and in real data analysis constantly.

---

## 1. Exponential functions

$y = a^x$, where $a > 0$. The variable is in the **exponent** — that's what makes it exponential,
rather than $y = x^a$, which is a power function.

:::key Properties of $y = a^x$
- Always passes through $(0, 1)$, because $a^0 = 1$ for any $a$.
- Always **positive** — never touches or crosses the $x$-axis.
- Horizontal asymptote $y = 0$.
- If $a > 1$: **growth** (rises left to right, steeply).
- If $0 < a < 1$: **decay** (falls left to right).
:::

:::insight The defining property
Exponentials are the functions where a *fixed step in $x$* multiplies $y$ by a *fixed factor*.
Add 1 to $x$ and $y$ multiplies by $a$:
$$a^{x+1} = a \cdot a^x$$

Compare a linear function, where a fixed step in $x$ *adds* a fixed amount. That's the whole
difference between linear and exponential growth, and it's why exponential growth eventually beats
any polynomial, however big.
:::

---

## 2. The number $e$

:::key The special property of $e^x$
$$\frac{d}{dx}\left(e^{x}\right) = e^{x}$$

$e^x$ is the unique exponential function that is **its own derivative**. $e \approx 2.71828$.

More generally: $\dfrac{d}{dx}\left(e^{kx}\right) = ke^{kx}$.
:::

:::insight Why $e$ exists at all
Differentiate $y = a^x$ from first principles and you get
$$\frac{dy}{dx} = a^x \times \left(\lim_{h\to0}\frac{a^h - 1}{h}\right)$$

That limit is just some constant depending on $a$. For $a = 2$ it's about $0.693$; for $a=3$ it's about
$1.099$. Somewhere between 2 and 3 there's a value of $a$ that makes the constant exactly $1$ — and
that value is $e$.

So $e$ isn't a mysterious number someone invented. It's the base at which the exponential's derivative
comes out clean. Everything else about $e$ follows from that.
:::

The graph of $y = e^x$ behaves exactly like any other growth exponential: through $(0,1)$, asymptote
$y=0$, increasing. Transformations apply as usual: $y = e^{x} + 3$ has asymptote $y = 3$;
$y = 5e^{-2x}$ starts at $(0,5)$ and decays.

---

## 3. Logarithms

:::key Definition
$$\log_a n = x \iff a^x = n$$

"$\log_a n$ is the power you must raise $a$ to, to get $n$."
:::

Two special cases you'll use constantly:

- $\log_{10}$ — written just $\log$ on most calculators.
- $\log_e$ — written $\ln$, the **natural logarithm**. This is the one that matters in A Level.

:::key $e$ and $\ln$ undo each other
$$\ln(e^x) = x \qquad e^{\ln x} = x \quad (x>0)$$

$\ln$ and $e^x$ are inverse functions, so their graphs are reflections in the line $y = x$.
:::

:::figure exp-log-reflection
Each graph is the other read backwards. $e^x$ passes through $(0,1)$; $\ln x$ therefore passes
through $(1,0)$, and is undefined for $x \leq 0$.
:::

Consequences of the definition, worth knowing on sight:
$$\log_a a = 1, \qquad \log_a 1 = 0, \qquad \ln e = 1, \qquad \ln 1 = 0$$

:::warning What logs can't eat
$\log_a x$ is only defined for $x > 0$. You cannot take the log of a negative number or of zero — no
power of a positive base ever produces a negative result.

This matters when solving: if your working produces $\ln(-3)$, that branch has **no solution**, and
saying so explicitly is a mark.
:::

---

## 4. The laws of logarithms

:::key The three laws
$$\log_a x + \log_a y = \log_a(xy)$$
$$\log_a x - \log_a y = \log_a\!\left(\frac{x}{y}\right)$$
$$k\log_a x = \log_a\!\left(x^k\right)$$
:::

:::insight These are the index laws in disguise
Let $x = a^m$ and $y = a^n$, so $\log_a x = m$ and $\log_a y = n$.

Then $xy = a^m a^n = a^{m+n}$, so $\log_a(xy) = m + n = \log_a x + \log_a y$. ✓

Every log law is just an index law with the exponents pulled out to the front. Multiplication becomes
addition — which is exactly why logarithms were invented in the 1600s, to turn hard multiplications
into easy additions.
:::

:::warning The laws that don't exist
$$\log(x + y) \neq \log x + \log y$$
$$\frac{\log x}{\log y} \neq \log\!\left(\frac{x}{y}\right)$$
$$(\log x)^2 \neq 2\log x$$

Logs turn **multiplication** into addition. They do nothing useful with a sum inside. Test with
numbers if you're unsure: $\log(10+10) = \log 20 \approx 1.30$, but $\log 10 + \log 10 = 2$. Different.
:::

---

## 5. Solving exponential equations

:::method Solving $a^x = b$
1. Take logs of **both sides** (natural logs are usually cleanest).
2. Use the power law to bring the exponent down to the front.
3. Rearrange for $x$.
4. Evaluate on the calculator.
:::

:::example Worked example 1 — Solve $3^x = 20$, giving your answer to 3 s.f.
**Solution.**
$$\ln(3^x) = \ln 20$$
$$x\ln 3 = \ln 20$$
$$x = \frac{\ln 20}{\ln 3} = \frac{2.9957}{1.0986} = 2.73 \text{ (3 s.f.)}$$

**Check:** $3^{2.73} \approx 19.97$ ✓
:::

:::warning $\dfrac{\ln 20}{\ln 3}$ is not $\ln\left(\dfrac{20}{3}\right)$
This is the most common error in the entire topic. The subtraction law applies to
$\ln 20 - \ln 3$, not to a quotient of two logs. $\frac{\ln 20}{\ln 3} = 2.73$, while
$\ln\frac{20}{3} = 1.90$. Completely different numbers.
:::

:::example Worked example 2 — Solve $2^{2x} - 9(2^x) + 8 = 0$
**Solution.**

A hidden quadratic (P1.2). Let $u = 2^x$, noting $2^{2x} = (2^x)^2 = u^2$:
$$u^2 - 9u + 8 = 0 \;\Rightarrow\; (u-1)(u-8) = 0 \;\Rightarrow\; u = 1 \text{ or } 8$$

Convert back:
- $2^x = 1 \Rightarrow x = 0$
- $2^x = 8 = 2^3 \Rightarrow x = 3$

$$x = 0 \text{ or } x = 3$$
:::

:::example Worked example 3 — Solve $\ln(2x - 1) = 3$, giving your answer to 3 s.f.
**Solution.**

Exponentiate both sides (apply $e^{\square}$ to each side):
$$2x - 1 = e^3$$
$$x = \frac{e^3 + 1}{2} = \frac{20.086 + 1}{2} = 10.5 \text{ (3 s.f.)}$$

**Check the domain:** $2x - 1 = e^3 > 0$ ✓ — the log was legal.
:::

:::example Worked example 4 — Solve $\log_2 x + \log_2(x - 2) = 3$
**Solution.**

Combine using the addition law:
$$\log_2\big[x(x-2)\big] = 3$$

Convert to index form:
$$x(x-2) = 2^3 = 8$$
$$x^2 - 2x - 8 = 0 \;\Rightarrow\; (x-4)(x+2) = 0 \;\Rightarrow\; x = 4 \text{ or } x = -2$$

**Reject $x = -2$:** it would require $\log_2(-2)$, which is undefined.

$$x = 4$$

*(Always check candidate solutions against the domain of the original logs. This rejection is an
explicit mark.)*
:::

---

## 6. Exponential models

Real-world models come in two standard shapes:

$$N = N_0 e^{kt} \qquad\text{or}\qquad N = ab^t$$

- $N_0$ (or $a$) is the **initial value** — put $t=0$ and the exponential becomes 1.
- $k > 0$ means growth; $k < 0$ means decay.
- $\dfrac{dN}{dt} = kN_0e^{kt} = kN$: the rate of change is **proportional to the current amount**.
  That's what makes something exponential in the first place.

:::example Worked example 5 — A population is modelled by $P = 2400e^{0.03t}$, where $t$ is years after 2020.
**(a)** State the population in 2020. **(b)** Find the population in 2035. **(c)** Find when the
population reaches 5000. **(d)** Find the rate of growth in 2030.

**Solution.**

**(a)** At $t=0$: $P = 2400e^0 = 2400$.

**(b)** At $t = 15$: $P = 2400e^{0.45} = 2400 \times 1.5683 = 3764$ (to the nearest whole person).

**(c)**
$$5000 = 2400e^{0.03t} \;\Rightarrow\; e^{0.03t} = \frac{5000}{2400} = 2.0833$$
$$0.03t = \ln(2.0833) = 0.73397$$
$$t = 24.5 \text{ years, i.e. during 2044}$$

**(d)**
$$\frac{dP}{dt} = 2400 \times 0.03\,e^{0.03t} = 72e^{0.03t}$$
At $t=10$: $72e^{0.3} = 72 \times 1.3499 = 97.2$

**The population is growing at about 97 people per year in 2030.** (Units and interpretation are
marks.)
:::

:::exam Criticising a model
Exponential model questions almost always end with "comment on the model" or "suggest a limitation".
Good answers:
- Unlimited exponential growth is unrealistic long-term — food, space or resources will constrain it.
- The model assumes a constant growth rate, which real populations don't have.
- Extrapolating far beyond the data range is unreliable.

"It might be wrong" scores nothing. Name the mechanism.
:::

---

## 7. Turning curves into straight lines

This is the most examined idea in the topic. Given data that follows a power law or an exponential
law, taking logs makes it **linear**, so you can find the constants from a straight-line graph.

:::key The two linearisations
**Power law** $y = ax^n$: take logs of both sides.
$$\log y = \log a + n\log x$$
Plot $\log y$ against $\log x$: gradient $= n$, intercept $= \log a$.

**Exponential law** $y = ab^x$: take logs of both sides.
$$\log y = \log a + x\log b$$
Plot $\log y$ against $x$: gradient $= \log b$, intercept $= \log a$.
:::

:::insight How to tell which you've got
Look at what's plotted against what.

- $\log y$ against $\log x$ (**both** logged) → power law $y = ax^n$.
- $\log y$ against $x$ (only $y$ logged) → exponential law $y = ab^x$.

That's the entire distinction, and it's usually the first thing the question tells you. Read it
carefully.
:::

:::example Worked example 6 — The graph of $\log_{10} y$ against $x$ is a straight line with gradient $0.4$ and intercept $1.2$. Express $y$ in terms of $x$.
**Solution.**

$\log y$ against $x$ ⟹ exponential model $y = ab^x$, with
$$\log_{10} y = 0.4x + 1.2$$

Comparing with $\log y = \log a + x\log b$:
- $\log b = 0.4 \Rightarrow b = 10^{0.4} = 2.512$
- $\log a = 1.2 \Rightarrow a = 10^{1.2} = 15.85$

$$y = 15.85 \times (2.512)^x$$

*(Or, equivalently and more directly: $y = 10^{0.4x + 1.2} = 10^{1.2} \times (10^{0.4})^x$ — same
answer, fewer steps. Worth knowing both routes.)*
:::

---

## In the exam

- $\ln$ is $\log_e$. Use it by default unless the question specifies base 10 or another base.
- **Both sides.** Taking logs means taking logs of *both sides* of an equation, not of individual
  terms.
- Reject invalid solutions with a reason ("since $\log$ of a negative is undefined").
- For "show that", get the required form exactly — usually that means combining logs into one, or
  splitting one into several.
- In modelling questions, always answer **in context** with units.
- If a question gives a table of data and asks you to "verify that the relationship is of the form
  $y = ax^n$", compute $\log x$ and $\log y$ for each pair and show they lie (approximately) on a
  straight line.

---

## Practice

:::question Q1 (3 marks)
Write as a single logarithm: $2\log_3 5 + \log_3 4 - \log_3 10$.
:::
:::answer
$$2\log_3 5 = \log_3 25$$
$$\log_3 25 + \log_3 4 = \log_3 100$$
$$\log_3 100 - \log_3 10 = \log_3 10$$
:::

:::question Q2 (3 marks)
Solve $5^x = 12$, giving your answer to 3 significant figures.
:::
:::answer
$$x\ln 5 = \ln 12 \;\Rightarrow\; x = \frac{\ln 12}{\ln 5} = \frac{2.4849}{1.6094} = 1.54 \text{ (3 s.f.)}$$
:::

:::question Q3 (4 marks)
Solve $e^{2x} - 5e^x + 6 = 0$, giving your answers in exact form.
:::
:::answer
Let $u = e^x$ (so $e^{2x} = u^2$):
$$u^2 - 5u + 6 = 0 \;\Rightarrow\; (u-2)(u-3) = 0 \;\Rightarrow\; u = 2 \text{ or } 3$$

Both are positive, so both are valid:
$$x = \ln 2 \quad\text{or}\quad x = \ln 3$$
:::

:::question Q4 (4 marks)
Solve $\log_5(x+3) - \log_5 x = 2$.
:::
:::answer
$$\log_5\left(\frac{x+3}{x}\right) = 2$$
$$\frac{x+3}{x} = 5^2 = 25$$
$$x + 3 = 25x \;\Rightarrow\; 24x = 3 \;\Rightarrow\; x = \tfrac18$$

**Check the domain:** $x = \frac18 > 0$ ✓ and $x + 3 = 3.125 > 0$ ✓
:::

:::question Q5 (6 marks) — modelling
The value $V$ (in £) of a car $t$ years after purchase is modelled by $V = 18000e^{-0.18t}$.

(a) State the purchase price.

(b) Find the value after 4 years.

(c) Find, to the nearest month, when the value falls to £6000.

(d) State one limitation of the model.
:::
:::answer
**(a)** $t = 0$: $V = £18{,}000$.

**(b)** $V = 18000e^{-0.72} = 18000 \times 0.48675 = £8761$ (nearest £).

**(c)**
$$6000 = 18000e^{-0.18t} \;\Rightarrow\; e^{-0.18t} = \tfrac13$$
$$-0.18t = \ln\tfrac13 = -1.0986$$
$$t = 6.103 \text{ years} = 6 \text{ years } 1 \text{ month}$$

**(d)** The model predicts the value decreases forever but never reaches zero, whereas in reality a
car eventually has a scrap value (a floor) or becomes worthless. It also assumes a constant
proportional depreciation rate, whereas real cars lose value fastest in year one.
:::

:::question Q6 (6 marks) — synoptic
Data for two variables $x$ and $y$ are believed to satisfy $y = ax^n$.

A graph of $\log_{10}y$ against $\log_{10}x$ is drawn and found to be a straight line passing through
the points $(0.5, 1.7)$ and $(2.0, 4.4)$.

(a) Find the gradient and intercept of the line.

(b) Hence find the values of $a$ and $n$.
:::
:::answer
**(a)**
$$\text{gradient} = \frac{4.4 - 1.7}{2.0 - 0.5} = \frac{2.7}{1.5} = 1.8$$

Using $(0.5, 1.7)$: $1.7 = 1.8(0.5) + c \Rightarrow c = 1.7 - 0.9 = 0.8$.

So $\log_{10}y = 1.8\log_{10}x + 0.8$.

**(b)** Taking logs of $y = ax^n$ gives $\log y = \log a + n\log x$.

Comparing:
- $n = \text{gradient} = 1.8$
- $\log_{10} a = 0.8 \Rightarrow a = 10^{0.8} = 6.31$ (3 s.f.)

$$y = 6.31x^{1.8}$$
:::

:::question Q7 (7 marks) — stretch
A colony of bacteria is modelled by $N = N_0 e^{kt}$, where $N$ is the number of bacteria after $t$
hours. Initially there are 500 bacteria, and after 3 hours there are 2000.

(a) Find $N_0$ and $k$, giving $k$ to 3 s.f.

(b) Find the number of bacteria after 8 hours.

(c) Find the time taken for the colony to double in size, and show that this doubling time does not
depend on the starting population.
:::
:::answer
**(a)** At $t=0$, $N = N_0 = 500$.

At $t = 3$:
$$2000 = 500e^{3k} \;\Rightarrow\; e^{3k} = 4 \;\Rightarrow\; 3k = \ln 4$$
$$k = \frac{\ln 4}{3} = 0.462 \text{ (3 s.f.)}$$

**(b)**
$$N = 500e^{0.4621 \times 8} = 500e^{3.6968} = 500 \times 40.32 = 20{,}159$$

About **20,200 bacteria** (3 s.f.).

**(c)** Doubling means $N = 2N_0$:
$$2N_0 = N_0e^{kT} \;\Rightarrow\; e^{kT} = 2 \;\Rightarrow\; T = \frac{\ln 2}{k}$$

$$T = \frac{\ln 2}{0.4621} = 1.5 \text{ hours}$$

**$N_0$ cancels** in the second line, so the doubling time depends only on $k$, not on how many
bacteria you start with. $\blacksquare$

*(Sanity check: the population quadrupled in 3 hours, and quadrupling is two doublings — so each
doubling takes 1.5 hours ✓. This constant-doubling-time property is the signature of exponential
growth, and it's exactly why radioactive decay has a well-defined half-life.)*
:::
