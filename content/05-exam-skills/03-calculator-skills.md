---
title: Calculator Skills
code: EX3
summary: The calculator functions that save the most time and catch the most errors — and the ones that lose marks if you rely on them.
time: 1 hour
prereq: None
---

## Why this matters

A calculator is allowed in **all three** papers. The modern ClassWiz-class machines can do numerical
integration, solve equations, compute binomial and normal probabilities, and store statistical data.

Students who know their calculator properly gain two things: **speed**, and — more importantly — a
**free independent check** on almost every answer. Students who don't know it waste time on arithmetic
and have no way of catching their own mistakes.

:::warning What the calculator cannot do for you
Some marks are explicitly for **method**. If a question says "show that", "prove", "using algebra", or
"find the exact value", a calculator answer with no working scores **zero** even when it's numerically
right.

The rule: **use the calculator to check, not to replace the working.**
:::

---

## 1. The functions worth learning properly

Recommended machines: **Casio fx-991CW** or **fx-991EX ClassWiz**, or the graphical **fx-CG50**. The
menus differ slightly between models, so find each function on *your* machine now.

:::key The essential list
| Function | What it's for | Where the time is saved |
|---|---|---|
| **`ANS` and variable storage** | Carrying full accuracy between steps | Prevents every premature-rounding error |
| **Table mode** | Tabulating $f(x)$ | Sign-change hunting, iteration sequences |
| **Solve / equation mode** | Numerical roots | Checking your algebraic solutions |
| **Numerical integration** ($\int$) | Definite integrals | Checking an area answer in 10 seconds |
| **Numerical differentiation** ($\frac{d}{dx}$) | Gradient at a point | Checking a tangent gradient |
| **Statistics mode (1-var)** | $\bar x$, $\sigma$, $\sum x$, $\sum x^2$ | Whole questions in S2 |
| **Statistics mode (2-var)** | PMCC $r$, regression line $a$ and $b$ | Whole questions in S4 |
| **Binomial PD / CD** | $P(X=r)$ and $P(X\leq r)$ | All of S6 and S8 |
| **Normal CD / Inverse Normal** | Normal probabilities and inverse problems | All of S7 |
| **Vector mode** | Adding vectors, magnitudes | Faster than by hand in M9 |
:::

---

## 2. The habits that prevent errors

:::method Carrying full accuracy
Never write down a rounded intermediate value and retype it.

- Use **`ANS`** to feed the previous result straight into the next calculation.
- For a value you'll need several times, **store it** (e.g. into `A`) and use the variable.
- Round **once**, at the very end.

Example: in a trig question you find an angle, then use it to find a side. If you round the angle to
1 d.p. and retype it, your side is often wrong in the third significant figure — and that's the
accuracy mark gone.
:::

:::method Check the mode — every time
Three settings ruin whole questions:

1. **Degrees vs radians.** Year 12 trig is degrees; Year 13 pure is radians. Check before every trig
   question. If an answer is wildly wrong, this is the first suspect.
2. **$\sigma_x$ vs $s_x$** in statistics mode. Edexcel uses $\sigma_x$ (divide by $n$). Your calculator
   shows both.
3. **Fraction vs decimal display.** Some questions want exact fractions; the `S⇔D` key toggles.
:::

---

## 3. Using the calculator as a checking tool

This is where most of the value is, and where most students never go.

:::key Free checks available on almost every question
| After you've... | Check it by... |
|---|---|
| Integrated and found an area | Numerical integration on the original |
| Found a tangent gradient | Numerical differentiation at that point |
| Solved an equation algebraically | Substituting the root, or using Solve mode |
| Expanded a binomial | Substituting $x=1$ into both original and answer |
| Found a stationary point | Numerical differentiation there — should be 0 |
| Computed a probability by hand | The distribution menu |
| Found a mean and s.d. by hand | Statistics mode |
| Solved simultaneous equations | Substituting into both originals |
:::

:::insight Why checking beats re-reading
Re-reading your own working is a weak check, because you tend to repeat the same reasoning and make
the same mistake again.

A calculator check is **independent** — it arrives at the answer by a completely different route. That's
what makes it catch things. Two independent routes agreeing is strong evidence; reading your own
working twice is not.

Budget 10 seconds per answer for this. On a 2-hour paper that's about 10 minutes, and it will typically
catch two or three errors.
:::

---

## 4. Where calculators lose marks

:::warning The four traps
1. **"Exact value" questions.** $\frac{\sqrt6+\sqrt2}{4}$ is the answer; $0.9659$ is not. The calculator
   gives you the wrong form.

2. **"Show that" and "prove".** The marks are for the argument. A numerical verification is not a proof.

3. **Numerical integration on a "find the exact area" question.** You must integrate algebraically. Use
   the calculator only to confirm.

4. **Rounding too early inside the calculator.** Displaying 10 significant figures doesn't help if you
   typed in a value you'd already rounded.
:::

---

## 5. Paper-3-specific calculator work

Statistics is where calculator fluency pays most.

:::method The Paper 3 statistics workflow
- **Binomial:** know which menu gives PD ($P(X=r)$) and which gives CD ($P(X\leq r)$). Everything else
  is built from CD by complementing and subtracting.
- **Normal:** Normal CD takes a lower bound, an upper bound, $\sigma$ and $\mu$ — in that order on most
  models. For a one-sided probability use $\pm 10^{99}$ as the missing bound.
- **Inverse Normal** takes the **area to the left**. Sketch first, then convert whatever the question
  says into a left-tail area.
- **Regression:** enter the paired data in 2-variable stats mode and read off $r$, $a$ and $b$
  directly. Do not compute the PMCC by hand — it's not expected and it's very slow.

Practise these on a past paper **before** the exam. Fumbling through menus under time pressure is a
completely avoidable way to lose 10 minutes.
:::

---

## 6. A pre-exam calculator checklist

:::key Do this the night before
- Fresh batteries (or charged, for the CG50).
- **Clear all memories** — old stored variables and stats data can corrupt a new calculation.
- Set to the mode you'll start in (degrees for Paper 3 mechanics; radians for A2 pure).
- Check the display mode gives you the answer format you want.
- Take a **second calculator** if you have one. They do fail.
- Make sure it's on the permitted list — no symbolic algebra (CAS), no internet, no text storage.
:::
