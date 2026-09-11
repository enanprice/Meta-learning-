---
title: Sampling and Data Collection
code: S1
spec: 1.1, 1.2
summary: Populations and samples, the five sampling methods, their advantages and disadvantages, and types of data.
time: 2 hours
prereq: None
papers: Paper 3 Section A
---

## Why this topic exists

Statistics is the science of drawing conclusions about a large group from a small one. If the small
group isn't representative, everything downstream — your mean, your regression line, your hypothesis
test — is built on sand.

This is also the easiest topic in the whole A Level to get full marks on, because the answers are
standard and short. **It's pure recall.** Learn the definitions properly and this is free marks.

---

## 1. Populations, samples and sampling frames

:::key Definitions
- **Population:** every member of the group you're interested in.
- **Census:** data collected from *every* member of the population.
- **Sample:** a selected subset of the population.
- **Sampling unit:** an individual member of the population.
- **Sampling frame:** a list of all the sampling units (e.g. a register, a database of serial numbers).
:::

:::key Census vs sample
| | Advantages | Disadvantages |
|---|---|---|
| **Census** | Completely accurate; every member counted | Expensive; time-consuming; often impractical; **destructive testing** makes it impossible |
| **Sample** | Cheaper; quicker; less data to process | May not be representative; introduces **sampling error** |
:::

:::exam The "destructive testing" answer
If a question is about testing light bulbs to destruction, or crash-testing cars, or tasting
chocolates, the killer disadvantage of a census is that **you'd destroy the entire population**. That
specific point is worth a mark — say it in those terms.
:::

---

## 2. The five sampling methods

### Random methods

These give every member a known, non-zero chance of selection.

:::key Simple random sampling
Every possible sample of size $n$ is equally likely. Number every member of the sampling frame, then
select $n$ numbers using a random number generator or lottery.

**Advantages:** free from bias; easy and cheap for small populations; each unit has a known equal chance.

**Disadvantages:** needs a complete sampling frame; not suitable for large populations (laborious).
:::

:::key Systematic sampling
Choose every $k$th member from an ordered list, where $k = \dfrac{\text{population size}}{\text{sample size}}$.
The **starting point must be chosen at random** from the first $k$.

**Advantages:** simple and quick; suitable for large samples.

**Disadvantages:** only random if the list order is random; can introduce bias if the list has a
periodic pattern matching $k$.
:::

:::key Stratified sampling
Divide the population into **strata** (groups sharing a characteristic — year group, gender,
department), then sample randomly from each in **proportion** to its size:
$$\text{number from stratum} = \frac{\text{size of stratum}}{\text{size of population}} \times \text{sample size}$$

**Advantages:** reflects the population structure; guarantees proportional representation of each group.

**Disadvantages:** the population must be clearly classifiable into distinct strata; can be
time-consuming.
:::

:::warning Rounding in stratified sampling
Calculate each stratum's share, then round sensibly so the totals add to the required sample size. If
the arithmetic gives 12.4, 18.6 and 19.0 for a sample of 50, you round to 12, 19, 19. Always **check
your rounded numbers sum to the sample size** — examiners check.
:::

### Non-random methods

:::key Quota sampling
The interviewer is told to collect a fixed number from each group, and chooses who to approach
themselves — they simply stop when each quota is filled.

**Advantages:** no sampling frame needed; cheap; small samples still represent the groups.

**Disadvantages:** **not random**, so it can be biased by the interviewer's choices; the groups must
be classifiable; non-responses aren't recorded.
:::

:::key Opportunity (convenience) sampling
Take whoever is available at the time — the first 20 people who walk past.

**Advantages:** easy, cheap, fast.

**Disadvantages:** unlikely to be representative; **highly dependent on the individual researcher**,
so very prone to bias.
:::

:::exam How to answer "give one advantage and one disadvantage"
Use the phrasing above almost verbatim. The mark schemes are tight. Two habits that help:

- **Be specific to the method.** "It's cheap" is true of several methods; "no sampling frame is
  required" is specific to quota and opportunity sampling.
- **Refer to the context** where the question gives one. "The sample may not include any Year 13
  students, so it may not represent the whole school" beats "it might be biased".
:::

---

## 3. Types of data

:::key
- **Qualitative** (categorical): non-numerical — eye colour, brand, species.
- **Quantitative:** numerical.
  - **Discrete:** only certain values — number of children, shoe size, goals scored.
  - **Continuous:** any value in a range — height, mass, time, temperature.
:::

### Grouped data vocabulary

For a class like "$20 \leq t < 30$":

- **Class boundaries:** 20 and 30
- **Class width:** $30 - 20 = 10$
- **Midpoint:** $\frac{20+30}{2} = 25$

:::warning Boundaries for rounded continuous data
If times are recorded "to the nearest minute" and a class is listed as $20$–$29$, the **real class
boundaries** are $19.5$ and $29.5$ — because anything from 19.5 upwards rounds to 20, and anything
below 29.5 rounds to 29 or less.

So the class **width is 10, not 9**, and the midpoint is $\frac{19.5+29.5}{2} = 24.5$, not
$\frac{20+29}{2} = 24.5$ — which happens to agree here, but the *width* does not: using 9 instead of
10 gives the wrong frequency density and wrecks a histogram question.

The rule: for continuous data recorded to the nearest unit, extend each stated class by half a unit at
each end.
:::

---

## In the exam

- These questions are **2–4 marks of pure recall**. Learn the definitions word-for-word. There is no
  thinking to do, and no partial credit for vague answers.
- "Explain why a census would not be appropriate here" → cost, time, or destructive testing, **in
  context**.
- "State one advantage of stratified over simple random sampling" → it guarantees each group is
  represented in proportion, giving a more representative sample.
- Stratified sampling calculations: show the fraction for each stratum, then the rounded value.

---

## Practice

:::question Q1 (2 marks)
Explain the difference between a census and a sample.
:::
:::answer
A **census** collects data from **every member** of the population.

A **sample** collects data from a **selected subset** of the population.
:::

:::question Q2 (3 marks)
A factory tests batteries to find how long they last before failing. Explain why the manager should
use a sample rather than a census.
:::
:::answer
Testing a battery until it fails **destroys it**. A census would require testing every battery, which
would destroy the entire stock, leaving nothing to sell.

*(Also acceptable: a census would be too time-consuming and expensive given the number of batteries
produced.)*
:::

:::question Q3 (4 marks)
A school has 500 students: 180 in Year 12 and 320 in Year 13. A stratified sample of 75 is taken.
Find how many students should be selected from each year group.
:::
:::answer
**Year 12:** $\dfrac{180}{500}\times 75 = 27$

**Year 13:** $\dfrac{320}{500}\times 75 = 48$

**Check:** $27 + 48 = 75$ ✓
:::

:::question Q4 (4 marks)
A company has 1,200 employees and wants a systematic sample of 80.

(a) Explain how the sample should be selected.

(b) Give one advantage and one disadvantage of this method.
:::
:::answer
**(a)** $k = \frac{1200}{80} = 15$. Number all 1,200 employees. Select a **starting point at random**
from the first 15, then select every 15th employee after that.

**(b)**
*Advantage:* simple and quick to implement, and suitable for a large sample.

*Disadvantage:* the sample is only random if the list order is random — if the list has a repeating
pattern with a period of 15, the sample would be biased.
:::

:::question Q5 (4 marks)
A researcher stands outside a supermarket on a Tuesday morning and interviews the first 50 people who
leave.

(a) Name this sampling method.

(b) Give two reasons why the sample may not be representative of the supermarket's customers.
:::
:::answer
**(a)** Opportunity (convenience) sampling.

**(b)** Any two of:
- Tuesday morning shoppers are not typical of all shoppers — people who work full-time are
  under-represented.
- It covers only one store and one time of day, so it misses weekend and evening customers.
- The researcher may (consciously or not) avoid approaching certain people, introducing bias.
:::

:::question Q6 (3 marks)
State whether each of the following is qualitative, discrete quantitative, or continuous quantitative:
(a) the number of cars passing a checkpoint each hour; (b) the colour of those cars; (c) the time each
car takes to travel 1 km.
:::
:::answer
**(a)** Discrete quantitative (you can only count whole cars).

**(b)** Qualitative.

**(c)** Continuous quantitative (time can take any value in a range).
:::
