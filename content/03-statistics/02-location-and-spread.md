---
title: Measures of Location and Spread
code: S2
spec: 2.1, 2.2
summary: Mean, median, mode, quartiles and percentiles; range, interquartile range, variance and standard deviation; coding.
time: 4 hours
prereq: S1 Sampling and Data Collection
papers: Paper 3 Section A
---

## Why this topic exists

Any dataset needs two numbers to describe it: a **typical value** (location) and a measure of **how
spread out** it is. Two classes with the same mean test score can be wildly different — one where
everyone scored 60, another where half scored 20 and half scored 100.

Standard deviation is the measure that matters most, because it's the one the normal distribution and
every hypothesis test in Year 13 are built on.

---

## 1. Measures of location

:::key The three averages
- **Mean** $\bar x = \dfrac{\sum x}{n}$ — uses every value, but is **distorted by outliers**.
- **Median** — the middle value when ordered. **Not affected by outliers.**
- **Mode** — the most frequent value. The only average usable for **qualitative** data.
:::

### Mean from a frequency table

$$\bar x = \frac{\sum fx}{\sum f}$$

For **grouped** data, use the class **midpoints** as the $x$ values. This gives an **estimate** of the
mean, because you've assumed every value in a class sits at its midpoint.

:::warning Say "estimate"
For grouped data the answer is an *estimate* of the mean, and questions say "estimate the mean" for
exactly that reason. If asked why it's only an estimate: **the original data values are unknown; we
assume each value equals its class midpoint.**
:::

### Quartiles and percentiles

:::method Finding quartiles
**For a list of $n$ values (discrete data):**
- $Q_1$: find $\frac n4$. If it's a whole number, take the mean of that term and the next. If not,
  round **up** and take that term.
- $Q_2$ (median): same with $\frac n2$.
- $Q_3$: same with $\frac{3n}{4}$.

**For grouped (continuous) data:** use **linear interpolation** — do not round.
:::

:::example Worked example 1 — Linear interpolation
The table shows the time taken, in minutes, by 40 students to complete a task.

| Time $t$ | $0\leq t<10$ | $10\leq t<20$ | $20\leq t<30$ | $30\leq t<40$ |
|---|---|---|---|---|
| Frequency | 6 | 14 | 12 | 8 |

**Estimate the median.**

**Solution.**

Cumulative frequencies: 6, 20, 32, 40.

The median is the $\frac{40}{2} = 20$th value. The cumulative frequency reaches exactly 20 at the end
of the class $10 \leq t < 20$.

Using interpolation within that class:
- The class runs from 10 to 20 (width 10).
- Entering the class, we've already passed 6 values; we need to reach the 20th, so we need
  $20 - 6 = 14$ more out of the 14 in this class.

$$\text{median} = 10 + \frac{14}{14}\times 10 = 20 \text{ minutes}$$

**The general formula:**
$$Q = L + \frac{\text{(position needed)} - \text{(c.f. before the class)}}{\text{frequency of the class}} \times \text{class width}$$
where $L$ is the lower boundary of the class containing $Q$.
:::

:::figure cumulative-interpolation
Interpolation assumes the values are spread evenly across each class, which is the same assumption as
joining the cumulative frequency points with straight lines.
:::

:::example Worked example 2 — Same table: estimate $Q_1$ and the interquartile range
**Solution.**

$Q_1$ is the $\frac{40}{4} = 10$th value. The cumulative frequency passes 10 in the class
$10 \leq t < 20$ (c.f. before it is 6).

$$Q_1 = 10 + \frac{10-6}{14}\times 10 = 10 + \frac{40}{14} = 12.857 \approx 12.9$$

$Q_3$ is the $\frac{3\times40}{4} = 30$th value, which falls in $20 \leq t < 30$ (c.f. before is 20):

$$Q_3 = 20 + \frac{30-20}{12}\times10 = 20 + 8.333 = 28.33 \approx 28.3$$

$$\text{IQR} = 28.33 - 12.86 = 15.5 \text{ minutes (3 s.f.)}$$
:::

---

## 2. Measures of spread

:::key
- **Range** = largest $-$ smallest. Simple, but wrecked by a single outlier.
- **Interquartile range (IQR)** $= Q_3 - Q_1$. Covers the middle 50%, so **outliers don't affect it**.
- **Interpercentile range**, e.g. the 10th to 90th: $P_{90} - P_{10}$.
- **Variance** and **standard deviation** — use every data value.
:::

### Variance and standard deviation

:::key The formulae
**Variance:**
$$\sigma^2 = \frac{\sum(x-\bar x)^2}{n} = \frac{\sum x^2}{n} - \bar x^2$$

**For frequency data:**
$$\sigma^2 = \frac{\sum fx^2}{\sum f} - \bar x^2$$

**Standard deviation** $\sigma = \sqrt{\text{variance}}$.
:::

:::insight What standard deviation actually measures
It's (roughly) the **average distance of a data value from the mean**.

Why not just average the distances directly? Because $\sum(x - \bar x) = 0$ always — the positives and
negatives cancel exactly. Squaring removes the signs, we average the squares, and then square-root at
the end to get back to the original units.

That's why standard deviation has the same units as the data (cm, kg, minutes) while variance has
units squared — and it's why standard deviation is the one you quote.

The version $\frac{\sum x^2}{n} - \bar x^2$ is algebraically identical and much faster to compute,
which is why it's the one in the formula booklet.
:::

:::example Worked example 3 — For the data $4, 7, 8, 11, 15$, find the mean and standard deviation.
**Solution.**
$$\sum x = 45 \;\Rightarrow\; \bar x = \frac{45}{5} = 9$$
$$\sum x^2 = 16 + 49 + 64 + 121 + 225 = 475$$
$$\sigma^2 = \frac{475}{5} - 9^2 = 95 - 81 = 14$$
$$\sigma = \sqrt{14} = 3.74 \text{ (3 s.f.)}$$

*(Sanity check: the values spread from 4 to 15, so a typical distance from the mean of about 3.7 is
plausible. If your $\sigma$ comes out bigger than the range, something's wrong.)*
:::

:::warning $\sum x^2$ is not $(\sum x)^2$
$\sum x^2 = 475$ here, whereas $(\sum x)^2 = 45^2 = 2025$. Square **each value first**, then add.

Getting this backwards gives an absurd variance, which is at least easy to spot.
:::

:::exam Use your calculator's stats mode
Entering data into your calculator's statistics mode gives $\bar x$, $\sigma$, $\sum x$ and $\sum x^2$
directly. **Learn how to do this before the exam** — it's much faster and far less error-prone than
computing by hand.

Warning: most calculators offer both $\sigma_x$ (population, divide by $n$) and $s_x$ (sample, divide
by $n-1$). **Edexcel A Level uses $\sigma_x$**, dividing by $n$. Make sure you're reading the right one.
:::

---

## 3. Coding

When the numbers are awkward, transform them, do the statistics, then transform back.

:::key Coding rules
If $y = \dfrac{x - a}{b}$, then
$$\bar x = b\bar y + a \qquad \sigma_x = b\,\sigma_y$$
:::

:::insight Why the mean shifts but the spread doesn't
Adding a constant $a$ to every value slides the whole dataset along — the mean slides with it, but the
values are just as spread out as before. **So the standard deviation is unaffected by addition or
subtraction.**

Multiplying by $b$ stretches the dataset — every gap gets $b$ times bigger — so the standard deviation
gets multiplied by $b$ too.

That's the whole rule: **the mean responds to both operations; the spread responds only to the
multiplication.**
:::

:::example Worked example 4 — The coded values $y = \dfrac{x - 100}{10}$ have mean 4.2 and standard deviation 1.8. Find the mean and standard deviation of $x$.
**Solution.**
$$\bar x = 10(4.2) + 100 = 142$$
$$\sigma_x = 10 \times 1.8 = 18$$

*(Note the $+100$ does not appear in the standard deviation.)*
:::

---

## 4. Outliers

:::key The two standard definitions
A value is an outlier if it is:

**Rule 1 (quartile rule):** less than $Q_1 - 1.5\times\text{IQR}$, or greater than
$Q_3 + 1.5\times\text{IQR}$.

**Rule 2 (standard deviation rule):** more than 2 standard deviations from the mean, i.e. outside
$\bar x \pm 2\sigma$.

**The question will tell you which rule to use.** Read it.
:::

**Cleaning** means removing outliers. You should only remove a value if there's a reason to believe
it's an error (a typo, a faulty instrument) — a genuine extreme value is real data and shouldn't be
thrown away just because it's inconvenient.

---

## In the exam

- **Show the formula before substituting.** Method marks live there.
- Grouped data → say "estimate".
- Give answers to 3 s.f. unless told otherwise, and don't round intermediate values.
- For "which average is most appropriate?": the **median** if there are outliers or the data is skewed;
  the **mean** if the data is symmetric and you want to use every value; the **mode** for qualitative
  data.
- For comparisons, always compare **both** location and spread, **in context**: "The boys' mean time
  was lower, so on average they were faster; but their standard deviation was larger, so their times
  were more variable."

---

## Practice

:::question Q1 (4 marks)
For the data $12, 15, 15, 18, 22, 24, 30$, find the median, quartiles and interquartile range.
:::
:::answer
$n = 7$, already in order.

**Median:** $\frac72 = 3.5$, round up to the 4th value: $Q_2 = 18$.

**$Q_1$:** $\frac74 = 1.75$, round up to the 2nd value: $Q_1 = 15$.

**$Q_3$:** $\frac{21}{4} = 5.25$, round up to the 6th value: $Q_3 = 24$.

$$\text{IQR} = 24 - 15 = 9$$
:::

:::question Q2 (4 marks)
A set of 10 values has $\sum x = 250$ and $\sum x^2 = 6700$. Find the mean and standard deviation.
:::
:::answer
$$\bar x = \frac{250}{10} = 25$$
$$\sigma^2 = \frac{6700}{10} - 25^2 = 670 - 625 = 45$$
$$\sigma = \sqrt{45} = 6.71 \text{ (3 s.f.)}$$
:::

:::question Q3 (6 marks)
The table shows the masses, in grams, of 50 apples.

| Mass $m$ (g) | $80\leq m<100$ | $100\leq m<120$ | $120\leq m<140$ | $140\leq m<160$ |
|---|---|---|---|---|
| Frequency | 8 | 18 | 16 | 8 |

Estimate the mean and the standard deviation.
:::
:::answer
Midpoints: 90, 110, 130, 150.

$$\sum fx = 8(90) + 18(110) + 16(130) + 8(150) = 720 + 1980 + 2080 + 1200 = 5980$$
$$\bar x = \frac{5980}{50} = 119.6 \text{ g}$$

$$\sum fx^2 = 8(8100) + 18(12100) + 16(16900) + 8(22500)$$
$$= 64800 + 217800 + 270400 + 180000 = 733000$$

$$\sigma^2 = \frac{733000}{50} - 119.6^2 = 14660 - 14304.16 = 355.84$$
$$\sigma = 18.9 \text{ g (3 s.f.)}$$
:::

:::question Q4 (5 marks)
Using the table from Q3, estimate the median mass by linear interpolation.
:::
:::answer
Cumulative frequencies: 8, 26, 42, 50.

The median is the 25th value, which lies in the class $100 \leq m < 120$ (c.f. before it is 8,
frequency 18).

$$\text{median} = 100 + \frac{25 - 8}{18}\times 20 = 100 + \frac{17}{18}\times 20 = 100 + 18.89 = 118.9 \text{ g}$$

*(Slightly below the mean of 119.6 g, which fits a distribution with a small tail to the right.)*
:::

:::question Q5 (4 marks)
The variable $y$ is coded using $y = \dfrac{x - 20}{5}$. Given that $\bar y = 6.4$ and $\sigma_y = 2.1$,
find $\bar x$ and $\sigma_x$.
:::
:::answer
$$\bar x = 5(6.4) + 20 = 32 + 20 = 52$$
$$\sigma_x = 5 \times 2.1 = 10.5$$
:::

:::question Q6 (5 marks)
A dataset has $Q_1 = 32$, $Q_3 = 44$. An outlier is defined as any value more than
$1.5\times\text{IQR}$ beyond a quartile. Determine whether the values 12, 25 and 65 are outliers.
:::
:::answer
$$\text{IQR} = 44 - 32 = 12, \qquad 1.5\times 12 = 18$$

**Lower boundary:** $32 - 18 = 14$
**Upper boundary:** $44 + 18 = 62$

- $12 < 14$ ⟹ **outlier**
- $25$ is between 14 and 62 ⟹ not an outlier
- $65 > 62$ ⟹ **outlier**
:::

:::question Q7 (6 marks) — synoptic
Two machines fill bags of flour. A sample of 20 bags from each machine gives:

| | Mean (g) | Standard deviation (g) |
|---|---|---|
| Machine A | 1002 | 4.1 |
| Machine B | 998 | 1.6 |

The target mass is 1000 g.

(a) Compare the two machines.

(b) The company says Machine B is better. State whether you agree, giving a reason.
:::
:::answer
**(a)** *Location:* Machine A's mean (1002 g) is 2 g **above** target, while Machine B's (998 g) is 2 g
**below**. Both are equally far off target, but in opposite directions — A slightly overfills, B
slightly underfills.

*Spread:* Machine B's standard deviation (1.6 g) is much smaller than A's (4.1 g), so B is far more
**consistent**.

**(b)** **Agree**, with a qualification. B is much more consistent, so its bags are far more likely to
be close to 1000 g — with A, a bag two standard deviations out could be 1010 g or 994 g, a much wider
range.

However, B systematically **underfills**, which may breach weight-labelling rules. The ideal would be
B's consistency with its mean adjusted up to 1000 g — a fixable calibration problem, whereas A's
variability is a harder mechanical one to solve.
:::
