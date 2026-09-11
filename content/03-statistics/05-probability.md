---
title: Probability
code: S5
spec: 4.1, 4.2, 4.3
summary: Venn diagrams, set notation, the addition and multiplication laws, conditional probability, independence and tree diagrams.
time: 4 hours
prereq: None
papers: Paper 3 Section A
---

## Why this topic exists

Probability is the mathematics of uncertainty, and it underpins everything else in the statistics
module: the binomial distribution, the normal distribution, and the entire logic of hypothesis testing
(*"how likely is this result if nothing is going on?"*).

The conditional probability formula is the one to really understand, because it's the bit that goes
wrong most often — and it's the bit Year 13 leans on hardest.

---

## 1. Basics and set notation

:::key Notation
| Symbol | Meaning |
|---|---|
| $P(A)$ | Probability that $A$ happens |
| $A'$ | **Not** $A$ (the complement) |
| $A \cap B$ | $A$ **and** $B$ (intersection) |
| $A \cup B$ | $A$ **or** $B$ or both (union) |
| $P(A \mid B)$ | Probability of $A$ **given that** $B$ has happened |
| $\varnothing$ | The empty set (impossible event) |
:::

$$P(A') = 1 - P(A)$$

:::warning "Or" in maths includes "both"
$A \cup B$ means "$A$ happens, or $B$ happens, **or both**". Everyday English often uses "or" to mean
one *but not* the other; mathematics never does. If a question wants exactly one of them, it will say
"exactly one".
:::

---

## 2. Venn diagrams

The workhorse of this topic. For two events, a Venn diagram has four regions:

- $A \cap B$ — both
- $A \cap B'$ — $A$ only
- $A' \cap B$ — $B$ only
- $(A\cup B)'$ — neither

:::method Filling in a Venn diagram
**Always start in the middle** ($A \cap B$) and work outwards.

If $P(A) = 0.5$, $P(B) = 0.4$ and $P(A\cap B) = 0.15$:
- Middle: $0.15$
- $A$ only: $0.5 - 0.15 = 0.35$
- $B$ only: $0.4 - 0.15 = 0.25$
- Neither: $1 - (0.35 + 0.15 + 0.25) = 0.25$

**Check the four regions sum to 1.** Every time.
:::

:::warning $P(A)$ is the whole circle
When you write 0.35 in the "$A$ only" region, $P(A)$ is still 0.5 — it's the total of everything inside
circle $A$, including the overlap. Confusing "$A$" with "$A$ only" is the most common Venn diagram
error.
:::

---

## 3. The laws of probability

:::key The addition law
$$P(A\cup B) = P(A) + P(B) - P(A\cap B)$$
:::

:::insight Why you subtract the intersection
Adding $P(A)$ and $P(B)$ counts everything in the overlap **twice** — once as part of $A$ and once as
part of $B$. Subtracting $P(A\cap B)$ removes the double count.

If the events are **mutually exclusive** (no overlap at all), $P(A\cap B) = 0$ and the law simplifies to
$P(A\cup B) = P(A) + P(B)$.
:::

:::key Mutually exclusive vs independent — not the same thing
- **Mutually exclusive:** they cannot both happen. $P(A\cap B) = 0$.
- **Independent:** one happening doesn't change the probability of the other.
  $P(A\cap B) = P(A)\times P(B)$.

These are **different** ideas, and in fact two events with non-zero probability that are mutually
exclusive are necessarily **not** independent — if $A$ happens, $B$ definitely can't, which is about as
big an influence as you can have.
:::

---

## 4. Conditional probability

:::key The conditional probability formula
$$P(A\mid B) = \frac{P(A\cap B)}{P(B)}$$

Rearranged (the **multiplication law**):
$$P(A\cap B) = P(A\mid B)\times P(B)$$
:::

:::insight What conditioning actually does
$P(A \mid B)$ means: *given that we already know $B$ happened, how likely is $A$?*

Knowing $B$ happened **shrinks the sample space**. We're no longer looking at everything — we're only
looking inside $B$. So we ask what fraction of $B$ is also $A$:
$$\frac{\text{the part that is both}}{\text{all of } B} = \frac{P(A\cap B)}{P(B)}$$

That's why you divide by $P(B)$: you're re-scaling so that $B$ becomes the new "everything".
:::

:::example Worked example 1 — In a group, $P(A) = 0.6$, $P(B) = 0.5$, $P(A\cap B) = 0.3$.
Find **(a)** $P(A\cup B)$, **(b)** $P(A\mid B)$, **(c)** $P(B \mid A')$, **(d)** whether $A$ and $B$ are
independent.

**Solution.**

**(a)**
$$P(A\cup B) = 0.6 + 0.5 - 0.3 = 0.8$$

**(b)**
$$P(A\mid B) = \frac{P(A\cap B)}{P(B)} = \frac{0.3}{0.5} = 0.6$$

**(c)** Build the Venn diagram: $A$ only $= 0.3$, both $= 0.3$, $B$ only $= 0.2$, neither $= 0.2$.

$$P(A') = 1 - 0.6 = 0.4, \qquad P(B\cap A') = 0.2 \text{ (the "}B\text{ only" region)}$$
$$P(B\mid A') = \frac{0.2}{0.4} = 0.5$$

**(d)** Test: is $P(A\cap B) = P(A)P(B)$?
$$P(A)P(B) = 0.6\times0.5 = 0.3 = P(A\cap B) \;\checkmark$$

So $A$ and $B$ **are independent**.

*(Consistent with (b): $P(A\mid B) = 0.6 = P(A)$ — knowing $B$ happened tells us nothing about $A$.
That's exactly what independence means.)*
:::

:::method Testing for independence
Show **one** of these (any one is sufficient):
$$P(A\cap B) = P(A)\times P(B) \qquad\text{or}\qquad P(A\mid B) = P(A) \qquad\text{or}\qquad P(B\mid A) = P(B)$$

Write down both sides explicitly and state whether they're equal. "They are independent" without the
comparison scores nothing.
:::

---

## 5. Tree diagrams

Best for sequences of events — especially **without replacement**, where the probabilities change.

:::method Tree diagram rules
- **Along a branch: multiply** (this is the multiplication law, $P(A\cap B) = P(A)P(B\mid A)$).
- **Between branches: add** (mutually exclusive outcomes).
- Probabilities on each set of branches must sum to 1.
- For "without replacement", the **second set of branches has a smaller denominator** and different
  numerators.
:::

:::example Worked example 2 — A bag has 5 red and 3 blue counters. Two are drawn without replacement.
Find **(a)** P(both red), **(b)** P(one of each), **(c)** P(second is red).

**Solution.**

**(a)**
$$P(RR) = \frac58\times\frac47 = \frac{20}{56} = \frac{5}{14}$$

**(b)** Two ways for this to happen — red then blue, or blue then red:
$$P(RB) = \frac58\times\frac37 = \frac{15}{56}, \qquad P(BR) = \frac38\times\frac57 = \frac{15}{56}$$
$$P(\text{one of each}) = \frac{15}{56}+\frac{15}{56} = \frac{30}{56} = \frac{15}{28}$$

**(c)**
$$P(\text{2nd red}) = P(RR) + P(BR) = \frac{20}{56} + \frac{15}{56} = \frac{35}{56} = \frac58$$

*(Look at that answer: $\frac58$ — exactly the same as the probability the **first** is red. That's not
a coincidence. Before you look at anything, the second counter is equally likely to be any of the 8,
and 5 of them are red. A genuinely useful sanity check.)*
:::

:::warning The "at least one" shortcut
$$P(\text{at least one}) = 1 - P(\text{none})$$

Computing "at least one" directly means adding up several cases; the complement is a single
calculation. Look for this phrase — it's a signal.
:::

---

## In the exam

- **Draw the Venn diagram or tree diagram.** Even when not asked. It converts an abstract question into
  reading off numbers.
- Check totals: Venn regions sum to 1; branches at each node sum to 1.
- For independence, always **show the comparison**.
- $P(A\mid B)$ and $P(B\mid A)$ are different. Read which way round the question wants.
- Leave answers as exact fractions unless told otherwise.
- Conditional probability from a two-way table: the "given" part tells you which **row or column** to
  use as your denominator.

---

## Practice

:::question Q1 (4 marks)
$P(A) = 0.45$, $P(B) = 0.3$, $P(A\cap B) = 0.12$. Find (a) $P(A\cup B)$, (b) $P(A'\cap B')$.
:::
:::answer
**(a)** $P(A\cup B) = 0.45 + 0.3 - 0.12 = 0.63$

**(b)** $A'\cap B'$ is "neither", which is the complement of $A\cup B$:
$$P(A'\cap B') = 1 - 0.63 = 0.37$$
:::

:::question Q2 (4 marks)
$P(A) = 0.4$, $P(B) = 0.25$ and $P(A\mid B) = 0.6$. Find $P(A\cap B)$ and determine whether $A$ and
$B$ are independent.
:::
:::answer
$$P(A\cap B) = P(A\mid B)\times P(B) = 0.6\times0.25 = 0.15$$

**Independence test:** $P(A)\times P(B) = 0.4\times0.25 = 0.10$.

Since $0.15 \neq 0.10$, the events are **not independent**.

*(Also visible from $P(A\mid B) = 0.6 \neq 0.4 = P(A)$ — knowing $B$ happened makes $A$ more likely.)*
:::

:::question Q3 (5 marks)
A box contains 4 green and 6 yellow balls. Two are drawn without replacement.
Find the probability that (a) both are yellow, (b) at least one is green.
:::
:::answer
**(a)**
$$P(YY) = \frac{6}{10}\times\frac59 = \frac{30}{90} = \frac13$$

**(b)** "At least one green" is the complement of "no green", i.e. of "both yellow":
$$P(\text{at least one green}) = 1 - \frac13 = \frac23$$
:::

:::question Q4 (5 marks)
In a college, 60% of students study maths, 40% study physics, and 25% study both.
A student is chosen at random.

(a) Find the probability they study maths but not physics.

(b) Given that they study physics, find the probability they also study maths.
:::
:::answer
Let $M$ = maths, $P$ = physics. $P(M) = 0.6$, $P(P) = 0.4$, $P(M\cap P) = 0.25$.

**(a)**
$$P(M\cap P') = P(M) - P(M\cap P) = 0.6 - 0.25 = 0.35$$

**(b)**
$$P(M\mid P) = \frac{P(M\cap P)}{P(P)} = \frac{0.25}{0.4} = 0.625$$
:::

:::question Q5 (6 marks)
A machine produces components. 5% are faulty. A test correctly identifies a faulty component 90% of
the time, and wrongly flags a good component 8% of the time.

(a) Find the probability a randomly chosen component is flagged as faulty.

(b) Given a component is flagged as faulty, find the probability it really is faulty.
:::
:::answer
Let $F$ = faulty, $T$ = flagged by the test.

$P(F) = 0.05$, $P(T\mid F) = 0.9$, $P(T\mid F') = 0.08$.

**(a)** A component can be flagged in two ways:
$$P(T) = P(F)P(T\mid F) + P(F')P(T\mid F')$$
$$= 0.05(0.9) + 0.95(0.08) = 0.045 + 0.076 = 0.121$$

**(b)**
$$P(F\mid T) = \frac{P(F\cap T)}{P(T)} = \frac{0.045}{0.121} = 0.372 \text{ (3 s.f.)}$$

*(This is the striking one: even though the test is 90% accurate on faulty items, **fewer than 4 in 10
flagged components are actually faulty**. Because faults are rare, the 8% false-positive rate applied
to the 95% of good components produces more false alarms than true ones. This is exactly why medical
screening tests for rare conditions produce so many false positives — a genuinely important real-world
consequence of conditional probability.)*
:::

:::question Q6 (6 marks) — synoptic
Events $A$ and $B$ are such that $P(A) = 0.7$, $P(B\mid A) = 0.3$ and $P(B\mid A') = 0.5$.

(a) Draw a tree diagram and find $P(B)$.

(b) Find $P(A\mid B)$.

(c) State, with a reason, whether $A$ and $B$ are independent.
:::
:::answer
**(a)** Tree: first branches $A$ (0.7) and $A'$ (0.3). From $A$: $B$ (0.3), $B'$ (0.7). From $A'$:
$B$ (0.5), $B'$ (0.5).

$$P(A\cap B) = 0.7\times0.3 = 0.21$$
$$P(A'\cap B) = 0.3\times0.5 = 0.15$$
$$P(B) = 0.21 + 0.15 = 0.36$$

**(b)**
$$P(A\mid B) = \frac{P(A\cap B)}{P(B)} = \frac{0.21}{0.36} = \frac{7}{12} = 0.583 \text{ (3 s.f.)}$$

**(c)** Test: $P(A)\times P(B) = 0.7 \times 0.36 = 0.252$, but $P(A\cap B) = 0.21$.

Since $0.21 \neq 0.252$, $A$ and $B$ are **not independent**.

*(Also clear from the given values: $P(B\mid A) = 0.3 \neq 0.5 = P(B\mid A')$ — whether $A$ happens
changes the chance of $B$, which is the definition of dependence.)*
:::
