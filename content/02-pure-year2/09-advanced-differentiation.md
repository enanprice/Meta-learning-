---
title: Advanced Differentiation
code: P2.9
spec: 7.1–7.8
summary: Derivatives of trig, exponential and log functions; chain, product and quotient rules; implicit differentiation; connected rates of change; concavity and inflection.
time: 7 hours
prereq: P1.12 Differentiation, P2.5 Radians
papers: Papers 1 and 2
---

## Why this topic exists

Year 12 gave you one rule: differentiate $ax^n$. That handles polynomials and nothing else.

This topic gives you everything else — the derivatives of the standard functions, and the three rules
(chain, product, quotient) that let you differentiate *any* combination of them. After this, there is
essentially no function in the A Level course you can't differentiate.

It's the biggest topic in Year 13 pure, and it's worth the time.

---

## 1. The standard derivatives

:::key Learn these
| $y$ | $\dfrac{dy}{dx}$ |
|---|---|
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |
| $\sec x$ | $\sec x\tan x$ |
| $\operatorname{cosec}x$ | $-\operatorname{cosec}x\cot x$ |
| $\cot x$ | $-\operatorname{cosec}^2x$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $\dfrac1x$ |
| $a^x$ | $a^x\ln a$ |

**These only hold with $x$ in radians.** The trig ones and $a^x \ln a$ are in the formula booklet;
$\sin\to\cos$, $\cos\to-\sin$, $e^x$ and $\ln x$ you should know instantly.
:::

:::insight The minus signs have a pattern
Everything beginning with "co" — **cos**ine, **cos**ecant, **cot**angent — differentiates to something
negative. That's not a coincidence; it comes from the co-function relationship
$\cos x = \sin\left(\frac\pi2 - x\right)$ and the chain rule producing a factor of $-1$.

And you can see $\frac{d}{dx}\sin x = \cos x$ on a graph: $\sin x$ is steepest (gradient 1) at $x=0$,
where $\cos 0 = 1$; it's flat at $x = \frac\pi2$, where $\cos\frac\pi2 = 0$; and it's falling most
steeply at $x = \pi$, where $\cos\pi = -1$. The cosine curve *is* the gradient curve of the sine curve.
:::

---

## 2. The chain rule

For a **function inside a function**.

:::key The chain rule
$$y = f(g(x)) \;\Rightarrow\; \frac{dy}{dx} = f'(g(x)) \times g'(x)$$

Or with a substitution $u = g(x)$:
$$\frac{dy}{dx} = \frac{dy}{du}\times\frac{du}{dx}$$
:::

:::method Using the chain rule
1. Identify the **inside** function. Call it $u$.
2. Differentiate the **outside**, leaving the inside alone.
3. **Multiply by the derivative of the inside.**

Informally: "differentiate the outside, times differentiate the inside."
:::

:::example Worked example 1 — Differentiate (a) $y = (3x^2+1)^5$, (b) $y = \sin(4x)$, (c) $y = e^{x^2}$, (d) $y = \ln(5x - 2)$
**Solution.**

**(a)** Outside is $(\;)^5$, inside is $3x^2+1$ (derivative $6x$):
$$\frac{dy}{dx} = 5(3x^2+1)^4 \times 6x = 30x(3x^2+1)^4$$

**(b)** Outside $\sin$, inside $4x$ (derivative 4):
$$\frac{dy}{dx} = 4\cos 4x$$

**(c)** Outside $e^{(\;)}$, inside $x^2$ (derivative $2x$):
$$\frac{dy}{dx} = 2xe^{x^2}$$

**(d)** Outside $\ln$, inside $5x-2$ (derivative 5):
$$\frac{dy}{dx} = \frac{5}{5x-2}$$
:::

:::key Two very common special cases
$$\frac{d}{dx}\left(e^{kx}\right) = ke^{kx} \qquad \frac{d}{dx}\Big(\ln(f(x))\Big) = \frac{f'(x)}{f(x)}$$

That second one — **derivative over the original** — is worth committing to memory. It's also the
pattern you'll reverse constantly in Year 13 integration.
:::

### The inverse relationship

:::key
$$\frac{dy}{dx} = \frac{1}{\dfrac{dx}{dy}}$$
:::

Useful when $x$ is easier to write in terms of $y$ than the other way round. For $x = y^3 + 2y$, you'd
get $\frac{dx}{dy} = 3y^2+2$, hence $\frac{dy}{dx} = \frac{1}{3y^2+2}$.

---

## 3. The product rule

For two functions **multiplied**.

:::key The product rule
$$y = uv \;\Rightarrow\; \frac{dy}{dx} = u\frac{dv}{dx} + v\frac{du}{dx}$$

In the formula booklet.
:::

:::example Worked example 2 — Differentiate $y = x^2 e^{3x}$
**Solution.**

Let $u = x^2$ and $v = e^{3x}$:
$$\frac{du}{dx} = 2x, \qquad \frac{dv}{dx} = 3e^{3x}$$

$$\frac{dy}{dx} = x^2(3e^{3x}) + e^{3x}(2x) = 3x^2e^{3x} + 2xe^{3x}$$

**Factorise** — exam answers are almost always wanted in factorised form, and the next part usually
needs it:
$$= xe^{3x}(3x + 2)$$
:::

:::exam Always factorise after the product rule
The next part of the question is nearly always "find the stationary points", which needs
$\frac{dy}{dx} = 0$. In factorised form the answer is immediate: $xe^{3x}(3x+2) = 0$ gives $x = 0$ or
$x = -\frac23$ (since $e^{3x}$ is never zero — worth stating).

Unfactorised, you'd be stuck.
:::

---

## 4. The quotient rule

For one function **divided** by another.

:::key The quotient rule
$$y = \frac uv \;\Rightarrow\; \frac{dy}{dx} = \frac{v\dfrac{du}{dx} - u\dfrac{dv}{dx}}{v^2}$$

In the formula booklet.
:::

:::warning The order matters
The numerator is $v\frac{du}{dx} - u\frac{dv}{dx}$ — **bottom times derivative of top, minus top times
derivative of bottom**. Swapping them gives you the negative of the right answer.

Unlike the product rule, subtraction isn't commutative. Say the phrase to yourself every time.
:::

:::example Worked example 3 — Differentiate $y = \dfrac{\sin x}{x^2}$
**Solution.**

$u = \sin x$, $v = x^2$; $\frac{du}{dx} = \cos x$, $\frac{dv}{dx} = 2x$.

$$\frac{dy}{dx} = \frac{x^2\cos x - \sin x(2x)}{x^4} = \frac{x(x\cos x - 2\sin x)}{x^4}
= \frac{x\cos x - 2\sin x}{x^3}$$
:::

:::insight Where $\frac{d}{dx}\tan x = \sec^2 x$ comes from
Apply the quotient rule to $\tan x = \frac{\sin x}{\cos x}$:
$$\frac{d}{dx}\tan x = \frac{\cos x\cos x - \sin x(-\sin x)}{\cos^2 x}
= \frac{\cos^2x + \sin^2x}{\cos^2x} = \frac{1}{\cos^2x} = \sec^2x$$

All the reciprocal-trig derivatives come out this way. If you forget one, derive it.
:::

:::method Sometimes you don't need the quotient rule
$y = \frac{x^2+3x}{x}$ is easier as $y = x + 3$.

$y = \frac{1}{(2x+1)^3}$ is easier as $y = (2x+1)^{-3}$ with the chain rule.

Check whether simplifying or rewriting with a negative power is quicker. It often is, and it's less
error-prone.
:::

---

## 5. Implicit differentiation

When an equation isn't in the form $y = f(x)$ — for instance $x^2 + y^2 = 25$, or $x^2 + 3xy - y^3 = 7$
— you differentiate **both sides with respect to $x$**, treating $y$ as a function of $x$.

:::key The key move
$$\frac{d}{dx}\left(y^n\right) = ny^{n-1}\frac{dy}{dx}$$

Every time you differentiate a $y$ term, the chain rule produces a $\frac{dy}{dx}$ factor.
:::

:::method Implicit differentiation
1. Differentiate every term with respect to $x$.
2. Terms in $x$ alone: normal rules.
3. Terms in $y$: normal rules, **times $\frac{dy}{dx}$**.
4. Terms with both $x$ and $y$ multiplied: use the **product rule**.
5. Collect all $\frac{dy}{dx}$ terms on one side, everything else on the other.
6. Factorise out $\frac{dy}{dx}$ and divide.
:::

:::example Worked example 4 — Find $\frac{dy}{dx}$ for $x^2 + 3xy - y^3 = 7$
**Solution.**

Differentiate term by term:
- $\frac{d}{dx}(x^2) = 2x$
- $\frac{d}{dx}(3xy)$ — **product rule**, with $u = 3x$, $v = y$:
  $3x\frac{dy}{dx} + 3y$
- $\frac{d}{dx}(y^3) = 3y^2\frac{dy}{dx}$
- $\frac{d}{dx}(7) = 0$

Putting it together:
$$2x + 3x\frac{dy}{dx} + 3y - 3y^2\frac{dy}{dx} = 0$$

Collect the $\frac{dy}{dx}$ terms:
$$\frac{dy}{dx}\left(3x - 3y^2\right) = -2x - 3y$$

$$\frac{dy}{dx} = \frac{-2x-3y}{3x-3y^2} = \frac{2x+3y}{3y^2 - 3x}$$
:::

:::warning The product rule term is where it goes wrong
$\frac{d}{dx}(xy)$ is **not** $\frac{dy}{dx}$ or $y\frac{dy}{dx}$. It's $x\frac{dy}{dx} + y$.

Scan the equation for any term containing both letters before you start, and flag it as a product-rule
term.
:::

---

## 6. Connected rates of change

Two quantities both changing with time, linked by a formula.

:::key The chain rule for rates
$$\frac{dA}{dt} = \frac{dA}{dr}\times\frac{dr}{dt}$$

Chain the rates together so the unwanted variables cancel like fractions.
:::

:::method Rates of change problems
1. **Write down** every rate you're given and the one you want, in $\frac{d\square}{d\square}$ notation
   with units.
2. Find a **formula** connecting the quantities.
3. Differentiate it to get the linking derivative.
4. **Chain** the rates so the middle terms cancel.
5. Substitute the values **at the instant asked about** (last, not first).
:::

:::example Worked example 5 — A spherical balloon is inflated so that its volume increases at $50\text{ cm}^3\text{s}^{-1}$. Find the rate at which the radius is increasing when $r = 10$ cm.
**Solution.**

*Given:* $\frac{dV}{dt} = 50$. *Want:* $\frac{dr}{dt}$ when $r=10$.

*Formula:* $V = \frac43\pi r^3$, so $\frac{dV}{dr} = 4\pi r^2$.

*Chain:*
$$\frac{dr}{dt} = \frac{dr}{dV}\times\frac{dV}{dt} = \frac{1}{4\pi r^2}\times 50$$

At $r = 10$:
$$\frac{dr}{dt} = \frac{50}{4\pi(100)} = \frac{50}{1256.6} = 0.0398 \text{ cm s}^{-1}$$

*(Makes sense: a big balloon needs a lot of air to gain a millimetre of radius, so the rate is small.)*
:::

---

## 7. Concavity and points of inflection

:::key
- $f''(x) > 0$ on an interval → the curve is **convex** (concave up) there.
- $f''(x) < 0$ → **concave** (concave down).
- A **point of inflection** is where the curve changes between convex and concave. At such a point
  $f''(x) = 0$ **and $f''$ changes sign**.
:::

:::warning $f''(x) = 0$ is not enough
For $y = x^4$, $f''(x) = 12x^2$, which is zero at $x=0$ — but $f''$ is positive on both sides, so the
curve is convex throughout and $(0,0)$ is a **minimum**, not an inflection.

To confirm an inflection, you must show the **sign of $f''$ changes** across the point. A small table
of values either side is the standard way, and it earns the mark.
:::

Note that an inflection point does **not** have to be stationary. $y = x^3 - 3x$ has an inflection at
$x = 0$ where the gradient is $-3$, not 0.

---

## In the exam

- **Identify the structure first.** Is it a function of a function (chain), a product, a quotient, or a
  combination? Write down which rule you're using — it earns a method mark even if the algebra slips.
- Combinations are normal: $y = x^2\sin(3x)$ needs the product rule *with* the chain rule inside.
- **Always factorise** after the product or quotient rule.
- $e^{f(x)}$ is never zero — say so when solving $\frac{dy}{dx}=0$, and divide it out.
- For implicit differentiation at a specific point, substitute the coordinates **after** finding
  $\frac{dy}{dx}$, not before.
- Rates of change: check your units and check the answer is physically sensible.

---

## Practice

:::question Q1 (4 marks)
Differentiate: (a) $y = (2x-5)^7$, (b) $y = \cos(3x^2)$, (c) $y = e^{4x+1}$, (d) $y = \ln(x^3+2)$.
:::
:::answer
**(a)** $7(2x-5)^6 \times 2 = 14(2x-5)^6$

**(b)** $-\sin(3x^2)\times 6x = -6x\sin(3x^2)$

**(c)** $4e^{4x+1}$

**(d)** $\dfrac{3x^2}{x^3+2}$
:::

:::question Q2 (4 marks)
Differentiate $y = x^3\ln x$.
:::
:::answer
Product rule with $u = x^3$, $v = \ln x$:
$$\frac{dy}{dx} = x^3\cdot\frac1x + \ln x \cdot 3x^2 = x^2 + 3x^2\ln x = x^2(1 + 3\ln x)$$
:::

:::question Q3 (4 marks)
Differentiate $y = \dfrac{e^{2x}}{x+1}$.
:::
:::answer
Quotient rule with $u = e^{2x}$, $v = x+1$:
$$\frac{dy}{dx} = \frac{(x+1)(2e^{2x}) - e^{2x}(1)}{(x+1)^2} = \frac{e^{2x}\big[2(x+1) - 1\big]}{(x+1)^2}
= \frac{e^{2x}(2x+1)}{(x+1)^2}$$
:::

:::question Q4 (5 marks)
Differentiate $y = x^2\sin(3x)$ and hence find the gradient at $x = \frac\pi6$.
:::
:::answer
Product rule with $u = x^2$, $v = \sin3x$ (chain rule needed for $v$: $\frac{dv}{dx} = 3\cos3x$):
$$\frac{dy}{dx} = 3x^2\cos3x + 2x\sin3x$$

At $x = \frac\pi6$: $3x = \frac\pi2$, so $\cos\frac\pi2 = 0$ and $\sin\frac\pi2 = 1$.
$$\frac{dy}{dx} = 0 + 2\left(\frac\pi6\right)(1) = \frac{\pi}{3} \approx 1.047$$
:::

:::question Q5 (5 marks)
Find $\frac{dy}{dx}$ for the curve $x^2 + y^2 - 6x + 4y = 12$, and hence find the gradient at the point
$(6, 2)$.
:::
:::answer
Differentiate throughout with respect to $x$:
$$2x + 2y\frac{dy}{dx} - 6 + 4\frac{dy}{dx} = 0$$
$$\frac{dy}{dx}(2y + 4) = 6 - 2x$$
$$\frac{dy}{dx} = \frac{6-2x}{2y+4} = \frac{3-x}{y+2}$$

**Check the point is on the curve:** $36 + 4 - 36 + 8 = 12$ ✓

At $(6, 2)$:
$$\frac{dy}{dx} = \frac{3-6}{2+2} = -\frac34$$

*(Completing the square gives $(x-3)^2 + (y+2)^2 = 25$ — a circle of radius 5 centred at $(3,-2)$. So
this could also be done with the radius-gradient method from P1.6: the radius to $(6,2)$ has gradient
$\frac{2-(-2)}{6-3} = \frac43$, and the tangent is its negative reciprocal, $-\frac34$ ✓. Two methods,
same answer — a good check.)*
:::

:::question Q6 (6 marks)
The volume of a cube is increasing at $12\text{ cm}^3\text{s}^{-1}$. Find the rate at which the surface
area is increasing when the side length is 4 cm.
:::
:::answer
Let the side be $x$. Then $V = x^3$ and $S = 6x^2$.

*Given:* $\frac{dV}{dt} = 12$. *Want:* $\frac{dS}{dt}$ when $x = 4$.

$$\frac{dV}{dx} = 3x^2 \;\Rightarrow\; \frac{dx}{dt} = \frac{1}{3x^2}\times 12 = \frac{4}{x^2}$$

At $x=4$: $\frac{dx}{dt} = \frac{4}{16} = 0.25$ cm s$^{-1}$.

$$\frac{dS}{dx} = 12x \;\Rightarrow\; \frac{dS}{dt} = \frac{dS}{dx}\times\frac{dx}{dt}
= 12(4)\times 0.25 = 12$$

$$\frac{dS}{dt} = 12 \text{ cm}^2\text{s}^{-1}$$
:::

:::question Q7 (8 marks) — synoptic
The curve $C$ has equation $y = xe^{-2x}$.

(a) Find $\frac{dy}{dx}$ and $\frac{d^2y}{dx^2}$.

(b) Find the coordinates of the stationary point and determine its nature.

(c) Find the coordinates of the point of inflection.
:::
:::answer
**(a)** Product rule, $u = x$, $v = e^{-2x}$:
$$\frac{dy}{dx} = x(-2e^{-2x}) + e^{-2x}(1) = e^{-2x}(1 - 2x)$$

Differentiate again, product rule on $e^{-2x}(1-2x)$:
$$\frac{d^2y}{dx^2} = e^{-2x}(-2) + (1-2x)(-2e^{-2x}) = -2e^{-2x}\big[1 + (1-2x)\big]$$
$$= -2e^{-2x}(2 - 2x) = 4e^{-2x}(x - 1)$$

**(b)** $\frac{dy}{dx} = 0$: since $e^{-2x} \neq 0$ for all $x$, we need $1 - 2x = 0$, so $x = \frac12$.

$$y = \tfrac12 e^{-1} = \frac{1}{2e} \approx 0.184$$

Nature: $\frac{d^2y}{dx^2}$ at $x = \frac12$ is $4e^{-1}\left(\frac12 - 1\right) = -2e^{-1} < 0$, so it's
a **maximum** at $\left(\frac12, \frac{1}{2e}\right)$.

**(c)** Inflection where $\frac{d^2y}{dx^2} = 0$: again $e^{-2x} \neq 0$, so $x - 1 = 0$, giving $x=1$.

$$y = 1 \times e^{-2} = \frac{1}{e^2} \approx 0.135$$

**Confirm the sign change:** $\frac{d^2y}{dx^2} = 4e^{-2x}(x-1)$ is negative for $x<1$ and positive for
$x>1$ (the exponential is always positive, so the sign follows $(x-1)$). The sign **does** change, so
it is a genuine point of inflection.

$$\left(1, \frac{1}{e^2}\right)$$
:::
