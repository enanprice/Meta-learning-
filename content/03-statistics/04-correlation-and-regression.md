---
title: Correlation and Regression
code: S4
spec: 3.1, 3.2, 3.3
summary: Scatter diagrams, the PMCC, least-squares regression, interpreting coefficients, non-linear models with logs, and testing for correlation.
time: 4 hours
prereq: S2 Measures of Location and Spread, P1.14 Exponentials and Logarithms
papers: Paper 3 Section A
---

## Why this topic exists

When you have two variables measured on the same things — height and mass, temperature and ice cream
sales, hours revised and exam score — you want to know two things: **is there a relationship**, and
**can I use one to predict the other**?

Correlation answers the first; regression answers the second. The most examined thing in the whole
topic isn't the calculation at all — it's the **interpretation**, and in particular the difference
between correlation and causation.

---

## 1. Scatter diagrams and correlation

Plot the **explanatory variable** (the one you control or that comes first) on the $x$-axis, and the
**response variable** (the one that depends on it) on the $y$-axis.

:::key Describing correlation
Always use **three words**:
1. **Strength:** strong / moderate / weak
2. **Direction:** positive / negative
3. **Form:** linear

Then add **context**: "There is strong positive linear correlation between temperature and ice cream
sales — as temperature increases, sales tend to increase."
:::

---

## 2. The product moment correlation coefficient (PMCC)

:::key The PMCC
$r$ measures the strength and direction of **linear** correlation:
$$-1 \leq r \leq 1$$

- $r = 1$: perfect positive linear correlation (all points exactly on a rising line)
- $r = 0$: no linear correlation
- $r = -1$: perfect negative linear correlation

Compute it on your calculator's regression mode — you are not expected to do it by hand.
:::

:::warning Correlation is not causation
This is the single most examined "explain" point in A Level statistics.

A strong correlation between $x$ and $y$ can arise because:
- $x$ causes $y$;
- $y$ causes $x$;
- a **third factor** causes both ("ice cream sales and drowning deaths correlate — because both rise
  with hot weather");
- pure coincidence.

So an answer like "the data shows that revision causes higher grades" will be marked wrong. The
correct phrasing is "**there is evidence of an association between revision time and grade, but
correlation does not imply causation.**"
:::

:::warning $r$ only detects *linear* relationships
$r \approx 0$ does not mean "no relationship" — it means no **linear** relationship. A perfect
parabola has $r$ near zero while being completely determined.

Always look at the scatter diagram, not just $r$.
:::

---

## 3. The regression line

:::key Least-squares regression
$$y = a + bx$$
- $b$ is the **gradient**: the change in $y$ for each **one-unit** increase in $x$.
- $a$ is the **intercept**: the value of $y$ when $x = 0$.

The line is fitted by minimising the sum of the squared **vertical** distances from the points to the
line — which is why it's the regression line of **$y$ on $x$** and can only be used to predict $y$
from $x$, not the other way round.
:::

:::method Interpreting the coefficients in context
This is where the marks are. Always:

- **$b$:** "For each extra hour of revision, the model predicts an increase of 3.2 marks."
  Include the **units** and the phrase "for each extra one…".
- **$a$:** "A student who does no revision is predicted to score 24 marks." Then check whether that's
  **meaningful** — often it isn't, because $x = 0$ is far outside the data range.
:::

:::key Interpolation vs extrapolation
- **Interpolation** — predicting inside the range of the given data. **Reliable.**
- **Extrapolation** — predicting outside it. **Unreliable**, because you have no evidence the linear
  relationship continues there.

Every prediction question expects you to say which one you've done and comment on reliability.
:::

:::figure scatter-regression
Inside the shaded range the line is supported by evidence. Beyond it you are assuming the
relationship continues — which is exactly the assumption the data cannot justify.
:::

:::example Worked example 1 — Data on 12 plants relates water $w$ (ml/day, ranging from 10 to 60) to height $h$ (cm). The regression line is $h = 4.2 + 0.35w$, and $r = 0.91$.
**(a)** Interpret the gradient. **(b)** Predict the height for $w = 40$ and for $w = 150$, commenting
on reliability. **(c)** Comment on the correlation.

**Solution.**

**(a)** For each **additional 1 ml of water per day**, the model predicts the plant's height increases
by **0.35 cm**.

**(b)**
- $w = 40$: $h = 4.2 + 0.35(40) = 18.2$ cm. This is **interpolation** (40 is within the data range
  10–60), so the prediction is **reliable**.
- $w = 150$: $h = 4.2 + 0.35(150) = 56.7$ cm. This is **extrapolation** — 150 is far outside the range
  of the data — so the prediction is **unreliable**. In reality, over-watering would eventually harm
  the plant, so the linear relationship almost certainly breaks down.

**(c)** $r = 0.91$ indicates **strong positive linear correlation** between water and height. However,
this is evidence of association only — it does not prove that watering *causes* the growth, since other
factors (light, soil quality) may be involved.
:::

---

## 4. Non-linear models (Year 13)

When the scatter diagram curves, take logs to straighten it — exactly the technique from P1.14.

:::key The two linearisations
**Exponential model** $y = ab^x$:
$$\log y = \log a + x\log b$$
Plot $\log y$ against $x$ → gradient $\log b$, intercept $\log a$.

**Power model** $y = ax^n$:
$$\log y = \log a + n\log x$$
Plot $\log y$ against $\log x$ → gradient $n$, intercept $\log a$.
:::

:::exam How to tell which model
Read what the axes are:
- **Only $y$ logged** → exponential model $y = ab^x$
- **Both logged** → power model $y = ax^n$

If the question gives you a regression line like "$\log_{10}y = 0.8 + 1.4\log_{10}x$", both are logged,
so it's a power model with $n = 1.4$ and $a = 10^{0.8}$.
:::

:::example Worked example 2 — A bacterial culture is modelled by $N = ab^t$. A regression of $\log_{10}N$ on $t$ gives $\log_{10}N = 2.4 + 0.18t$. Find $a$ and $b$, and interpret them.
**Solution.**

Comparing with $\log_{10}N = \log_{10}a + t\log_{10}b$:
- $\log_{10}a = 2.4 \Rightarrow a = 10^{2.4} = 251$
- $\log_{10}b = 0.18 \Rightarrow b = 10^{0.18} = 1.51$

$$N = 251 \times 1.51^t$$

**Interpretation:** the initial population (at $t=0$) is about **251 bacteria**, and the population is
multiplied by about **1.51 each hour** — i.e. it grows by roughly 51% per hour.
:::

---

## 5. Hypothesis testing for correlation (Year 13)

You can test whether an observed $r$ is strong enough to be evidence of correlation in the whole
population.

:::key The PMCC test
- $H_0: \rho = 0$ (no correlation in the population)
- $H_1: \rho \neq 0$ (two-tailed), or $\rho > 0$ / $\rho < 0$ (one-tailed)

where $\rho$ (rho) is the **population** correlation coefficient.

Compare your sample $r$ with the **critical value** from the table (given in the formula booklet),
looked up using the sample size $n$ and the significance level.

- $|r| >$ critical value → **reject $H_0$**: there is evidence of correlation.
- Otherwise → **do not reject $H_0$**.
:::

:::warning The significance level for a two-tailed test
For a two-tailed test at 5%, look up the critical value at **2.5%** in the table — the 5% is split
between the two tails. Using the 5% column for a two-tailed test is a standard error.
:::

:::example Worked example 3 — A sample of $n = 20$ gives $r = 0.48$. Test at the 5% significance level whether there is evidence of positive correlation. (Critical value for $n=20$ at 5%, one-tailed: 0.3783.)
**Solution.**

$H_0: \rho = 0$
$H_1: \rho > 0$ (one-tailed, since we're testing for *positive* correlation)

Significance level: 5%, $n = 20$, critical value $= 0.3783$.

$$r = 0.48 > 0.3783$$

So the result is **significant**: reject $H_0$.

**Conclusion in context:** there is sufficient evidence at the 5% level to suggest that there is
positive correlation between the two variables in the population.
:::

---

## In the exam

- Interpretation marks outnumber calculation marks in this topic. Practise writing the sentences.
- **Never** say correlation proves causation. Say "association", and mention a possible third factor.
- Every prediction: state interpolation or extrapolation, and comment on reliability.
- The regression line of $y$ on $x$ predicts **$y$ from $x$** only. Using it backwards is a standard
  trap.
- When the explanatory variable is one you can't control (like rainfall), note that the model may be
  less reliable — you can only observe, not experiment.
- For log models, be clear which base you're using and be consistent.

---

## Practice

:::question Q1 (3 marks)
A study finds $r = -0.87$ between the number of hours of TV watched per week and exam score.
Describe the correlation and state what conclusion can — and cannot — be drawn.
:::
:::answer
There is **strong negative linear correlation**: students who watched more TV tended to score lower.

**What can be concluded:** there is evidence of an association between TV hours and exam score.

**What cannot:** that watching TV *causes* lower scores. Correlation does not imply causation — a third
factor (such as overall motivation, or time available) could influence both variables.
:::

:::question Q2 (4 marks)
The regression line of monthly heating cost $C$ (£) on average outside temperature $T$ (°C) is
$$C = 142 - 6.3T$$
based on data for $T$ between 2 °C and 16 °C.

(a) Interpret the gradient in context.

(b) Estimate the cost when $T = 25$ °C and comment on the reliability of your estimate.
:::
:::answer
**(a)** For each **1 °C increase** in average outside temperature, the model predicts the monthly
heating cost **decreases by £6.30**.

**(b)** $C = 142 - 6.3(25) = 142 - 157.5 = -£15.50$.

This is **extrapolation** — 25 °C is well outside the data range of 2 °C to 16 °C — so it is
**unreliable**. The negative cost is also physically impossible, which confirms the linear model breaks
down outside the observed range (in reality heating cost would level off near zero, not go negative).
:::

:::question Q3 (4 marks)
Data for two variables gives $r = 0.15$, yet the scatter diagram shows a clear curved pattern.
Explain how both can be true.
:::
:::answer
The PMCC measures only the strength of a **linear** relationship. A value close to zero means the
points are not well described by a **straight line** — it does not mean there is no relationship at all.

Here the variables are clearly related, but the relationship is **non-linear** (curved), so $r$ fails
to detect it. This is why a scatter diagram should always be examined alongside $r$.
:::

:::question Q4 (5 marks)
Data believed to follow $y = ax^n$ produces the regression line
$$\log_{10}y = 0.6 + 1.8\log_{10}x$$

Find $a$ and $n$, and state the equation of the model.
:::
:::answer
Taking logs of $y = ax^n$:
$$\log_{10}y = \log_{10}a + n\log_{10}x$$

Comparing:
- $n = 1.8$ (the gradient)
- $\log_{10}a = 0.6 \Rightarrow a = 10^{0.6} = 3.98$ (3 s.f.)

$$y = 3.98x^{1.8}$$
:::

:::question Q5 (5 marks)
A sample of 30 observations gives a PMCC of $r = -0.42$. Test, at the 1% significance level, whether
there is evidence of negative correlation. The critical value for $n=30$ at the 1% level (one-tailed)
is $-0.4226$.
:::
:::answer
$H_0: \rho = 0$

$H_1: \rho < 0$ (one-tailed test for negative correlation)

Significance level 1%, $n = 30$, critical value $= -0.4226$.

$$r = -0.42 \; > \; -0.4226$$

The observed value is **not** in the critical region (it is not more negative than the critical value).

**Do not reject $H_0$.** There is insufficient evidence at the 1% level to suggest negative correlation
between the two variables.

*(Note how close this is — $-0.42$ versus $-0.4226$. At the 5% level the same data would very likely be
significant. The significance level matters, and "not significant" never means "no effect exists".)*
:::

:::question Q6 (6 marks) — synoptic
The population $P$ of a town, $t$ years after 2000, is modelled by $P = ab^t$. A regression analysis
gives
$$\log_{10}P = 4.28 + 0.021t$$

(a) Find $a$ and $b$ to 3 s.f.

(b) Interpret $a$ and $b$ in context.

(c) Use the model to predict the population in 2015, and state one assumption required.
:::
:::answer
**(a)**
- $\log_{10}a = 4.28 \Rightarrow a = 10^{4.28} = 19{,}100$ (3 s.f.)
- $\log_{10}b = 0.021 \Rightarrow b = 10^{0.021} = 1.05$ (3 s.f.)

**(b)** $a = 19{,}100$ is the **population in the year 2000** (when $t=0$).

$b = 1.05$ means the population is multiplied by 1.05 each year — an annual growth rate of about
**5%**.

**(c)** 2015 is $t = 15$:
$$\log_{10}P = 4.28 + 0.021(15) = 4.28 + 0.315 = 4.595$$
$$P = 10^{4.595} = 39{,}400 \text{ (3 s.f.)}$$

**Assumption:** the growth rate remains constant at 5% per year throughout the period — i.e. no major
change in birth rate, migration or housing policy. (Also note that if the original data covered fewer
than 15 years, this is extrapolation and therefore less reliable.)
:::
