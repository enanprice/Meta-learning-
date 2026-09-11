---
title: Representations of Data
code: S3
spec: 2.3, 2.4
summary: Histograms and frequency density, box plots, cumulative frequency, comparing distributions and describing skew.
time: 3 hours
prereq: S2 Measures of Location and Spread
papers: Paper 3 Section A
---

## Why this topic exists

A table of 200 numbers tells you nothing at a glance. A diagram tells you the shape, the centre, the
spread and the oddities instantly.

The heavily examined skill here is **frequency density** — because histograms with unequal class widths
are the one diagram people consistently get wrong — and **comparing two distributions in context**,
which is where the wordy marks are.

---

## 1. Histograms

:::key The defining property
In a histogram, **area represents frequency**. So the height must be
$$\text{frequency density} = \frac{\text{frequency}}{\text{class width}}$$
:::

:::insight Why area, not height
If all the classes have the same width, height and area are proportional and it doesn't matter. But
with unequal widths, using frequency as the height would exaggerate the wide classes — a class twice
as wide would look twice as tall for no good reason.

Using area keeps every value contributing the same amount of ink, whatever class it lands in. That's
what makes the picture honest, and it's why a histogram is different from a bar chart.
:::

:::key Histogram vs bar chart
| Histogram | Bar chart |
|---|---|
| Continuous data | Discrete or qualitative data |
| Bars touch (no gaps) | Bars separated by gaps |
| **Area** = frequency | **Height** = frequency |
| $y$-axis: frequency density | $y$-axis: frequency |
:::

:::example Worked example 1 — Draw a histogram for this data
| Length $\ell$ (cm) | $0\leq \ell<5$ | $5\leq \ell<10$ | $10\leq \ell<20$ | $20\leq \ell<40$ |
|---|---|---|---|---|
| Frequency | 12 | 18 | 30 | 20 |

**Solution.**

| Class | Frequency | Width | Frequency density |
|---|---|---|---|
| $0$–$5$ | 12 | 5 | $12/5 = 2.4$ |
| $5$–$10$ | 18 | 5 | $18/5 = 3.6$ |
| $10$–$20$ | 30 | 10 | $30/10 = 3.0$ |
| $20$–$40$ | 20 | 20 | $20/20 = 1.0$ |

Plot frequency density on the $y$-axis, with bars touching.

**Note the last class:** although it has the *second largest* frequency, it has by far the *lowest*
bar, because those 20 values are spread across a class four times as wide as the first. That's the
histogram doing its job.
:::

### Finding a frequency from a histogram

Questions often give you one bar's frequency and ask for another's. Use proportional areas.

:::method Scaling from a histogram
1. Find the **area** of a bar whose frequency you know.
2. Compute $k = \dfrac{\text{known frequency}}{\text{its area}}$ — the number of units of frequency per
   unit of area.
3. For any other bar: frequency $= k \times$ its area.
:::

:::example Worked example 2 — On a histogram, the bar for $10\leq x<20$ has width 2 cm and height 3 cm, and represents 24 items. Find the frequency represented by a bar of width 3 cm and height 5 cm.
**Solution.**

Known bar area: $2\times 3 = 6\text{ cm}^2$ represents 24 items.

So $1\text{ cm}^2$ represents $\frac{24}{6} = 4$ items.

The other bar has area $3\times5 = 15\text{ cm}^2$, representing
$$15 \times 4 = 60 \text{ items}$$
:::

---

## 2. Cumulative frequency graphs

Plot **cumulative frequency against the upper class boundary**, and join with a smooth curve.

:::warning Plot at the upper boundary
For the class $10 \leq t < 20$ with cumulative frequency 26, you plot the point $(20, 26)$ — because
26 values are less than 20. Plotting at the midpoint is a standard, costly error.

Also plot the starting point: $(\text{lowest boundary}, 0)$.
:::

From a cumulative frequency curve you can read off:

- The **median** at $\frac n2$ on the vertical axis.
- $Q_1$ at $\frac n4$ and $Q_3$ at $\frac{3n}{4}$.
- **Percentiles** at $\frac{p}{100}n$.
- "How many were less than 25?" — read up from 25 and across.

---

## 3. Box plots

A box plot shows the **five-number summary**: minimum, $Q_1$, median, $Q_3$, maximum.

Outliers are marked as individual crosses, and the whiskers then extend only to the most extreme
values that are **not** outliers.

:::method Comparing two box plots
Always make **two** comparisons, each **in context**:

1. **Location** — compare the medians. "The median time for Group A was 18 minutes, 4 minutes lower
   than Group B, so Group A were typically faster."
2. **Spread** — compare the IQRs (or ranges). "Group A's IQR was 6 minutes compared to Group B's 11,
   so Group A's times were more consistent."

A comparison without context ("A's median is lower") usually scores half the marks available.
:::

---

## 4. Skewness

:::key Three ways to describe skew
**From the shape:** a distribution with a long tail to the **right** is **positively skewed**; a long
tail to the **left** is **negatively skewed**.

**From the averages:**
- mean $>$ median $>$ mode → **positive skew**
- mean $<$ median $<$ mode → **negative skew**
- mean $=$ median $=$ mode → **symmetric**

**From the quartiles:**
- $Q_3 - Q_2 > Q_2 - Q_1$ → **positive skew**
- $Q_3 - Q_2 < Q_2 - Q_1$ → **negative skew**
- Equal → symmetric
:::

:::key The skewness coefficient
$$\text{skew} = \frac{3(\text{mean} - \text{median})}{\text{standard deviation}}$$

Positive value → positive skew; negative → negative skew.
:::

:::insight Why the mean gets dragged
The mean uses every value, so an extreme value at one end pulls it in that direction. The median only
cares about position, so it barely moves.

With a long right-hand tail (a few very large values), the mean is dragged **above** the median. Hence
mean $>$ median means positive skew.

Classic real example: incomes. A handful of very high earners drags the mean well above the median,
which is why "average income" quoted as a mean is so misleading.
:::

---

## In the exam

- **Frequency density = frequency ÷ class width.** Label the axis "frequency density", not "frequency".
- Use the real class boundaries for continuous data recorded to the nearest unit (19.5 to 29.5, not
  20 to 29).
- Comparisons need **two** points — location and spread — both **in context**, with numbers quoted.
- For "describe the skew", state the type **and** the evidence: "positive skew, since
  $Q_3 - Q_2 = 12 > Q_2 - Q_1 = 7$."
- Box plot questions frequently ask you to test for outliers first using $1.5\times$IQR, then draw the
  whiskers to the largest/smallest non-outlier.

---

## Practice

:::question Q1 (4 marks)
Complete the frequency density column for this data.

| Time $t$ (min) | $0\leq t<10$ | $10\leq t<15$ | $15\leq t<30$ | $30\leq t<60$ |
|---|---|---|---|---|
| Frequency | 20 | 25 | 45 | 30 |
:::
:::answer
| Class | Frequency | Width | Frequency density |
|---|---|---|---|
| $0\leq t<10$ | 20 | 10 | $2.0$ |
| $10\leq t<15$ | 25 | 5 | $5.0$ |
| $15\leq t<30$ | 45 | 15 | $3.0$ |
| $30\leq t<60$ | 30 | 30 | $1.0$ |
:::

:::question Q2 (3 marks)
On a histogram representing 120 items, the bar for $5 \leq x < 10$ is 4 cm wide and 6 cm tall and
represents 36 items. Find the number of items represented by a bar of width 2 cm and height 9 cm.
:::
:::answer
Known bar: area $= 4 \times 6 = 24\text{ cm}^2$ represents 36 items, so $1\text{ cm}^2$ represents
$\frac{36}{24} = 1.5$ items.

Other bar: area $= 2\times9 = 18\text{ cm}^2$, representing
$$18 \times 1.5 = 27 \text{ items}$$
:::

:::question Q3 (4 marks)
A data set has mean 48, median 52 and standard deviation 9. Calculate the coefficient of skewness and
describe the skew.
:::
:::answer
$$\text{skew} = \frac{3(48 - 52)}{9} = \frac{-12}{9} = -1.33 \text{ (3 s.f.)}$$

The value is **negative**, so the distribution is **negatively skewed** — there is a tail of low values
pulling the mean below the median.
:::

:::question Q4 (4 marks)
For a data set, $Q_1 = 24$, $Q_2 = 31$, $Q_3 = 48$, minimum $= 15$, maximum $= 78$. An outlier is any
value more than $1.5\times$IQR beyond a quartile.

(a) Determine whether there are any outliers.

(b) Describe the skew.
:::
:::answer
**(a)** $\text{IQR} = 48 - 24 = 24$, and $1.5 \times 24 = 36$.

Lower boundary: $24 - 36 = -12$. The minimum, 15, is above this — not an outlier.

Upper boundary: $48 + 36 = 84$. The maximum, 78, is below this — not an outlier.

**No outliers.**

**(b)** $Q_3 - Q_2 = 48 - 31 = 17$ and $Q_2 - Q_1 = 31 - 24 = 7$.

Since $17 > 7$, the upper half is more spread out: the distribution is **positively skewed**.
:::

:::question Q5 (5 marks)
Two classes sat the same test. Class A: median 62, IQR 14. Class B: median 55, IQR 25.
Compare the performance of the two classes.
:::
:::answer
**Location:** Class A's median score (62) is 7 marks higher than Class B's (55), so on average Class A
performed better on the test.

**Spread:** Class A's IQR (14) is much smaller than Class B's (25), so Class A's scores were more
**consistent** — the middle half of Class A were bunched within 14 marks, compared to 25 marks for
Class B.

*(Class B therefore contains both weaker and stronger candidates spread more widely, while Class A is
more uniformly good.)*
:::

:::question Q6 (6 marks) — synoptic
The cumulative frequency table shows the daily rainfall, in mm, at a weather station over 100 days.

| Rainfall $r$ (mm) | $<2$ | $<4$ | $<6$ | $<10$ | $<20$ |
|---|---|---|---|---|---|
| Cumulative frequency | 34 | 58 | 72 | 88 | 100 |

(a) Find the frequency in each class.

(b) Estimate the median by interpolation.

(c) Describe the skew of the distribution, giving a reason.
:::
:::answer
**(a)** Subtract consecutive cumulative frequencies:

| Class | $0\leq r<2$ | $2\leq r<4$ | $4\leq r<6$ | $6\leq r<10$ | $10\leq r<20$ |
|---|---|---|---|---|---|
| Frequency | 34 | 24 | 14 | 16 | 12 |

*(Check: $34+24+14+16+12 = 100$ ✓)*

**(b)** The median is the 50th value, in the class $2 \leq r < 4$ (c.f. before it is 34, frequency 24):

$$\text{median} = 2 + \frac{50-34}{24}\times 2 = 2 + \frac{16}{24}\times2 = 2 + 1.333 = 3.33 \text{ mm}$$

**(c)** The data is heavily concentrated at low values (34 of 100 days had under 2 mm) with a long
tail stretching out to 20 mm. That is a **positive skew**.

*(Supporting evidence: $Q_1$ is the 25th value, at $0 + \frac{25}{34}\times2 = 1.47$; $Q_3$ is the 75th,
in $6\leq r<10$, at $6 + \frac{75-72}{16}\times 4 = 6.75$. So $Q_3 - Q_2 = 3.42$ and
$Q_2 - Q_1 = 1.86$. Since $3.42 > 1.86$, positive skew ✓ — which is exactly what rainfall data looks
like in reality: most days dry or nearly so, a few days very wet.)*
:::
