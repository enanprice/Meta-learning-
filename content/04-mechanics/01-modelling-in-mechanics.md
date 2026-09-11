---
title: Modelling in Mechanics
code: M1
spec: 6.1, 6.2
summary: Modelling assumptions and what they mean, SI units, scalars and vectors, and the forces you need to know.
time: 2 hours
prereq: None
papers: Paper 3 Section B
---

## Why this topic exists

Real objects are complicated. A cricket ball is spinning, deforming, pushing air out of the way and
being pulled by the moon. If you tried to include all of that, you'd never solve anything.

A **model** strips the situation down to what matters. The skill being examined is knowing **which
simplifications you've made**, and what would change if they weren't valid — because "state an
assumption" and "how would the answer change if…" are guaranteed exam questions worth easy marks.

---

## 1. Standard modelling assumptions

:::key The assumptions and what each one buys you
| Assumption | What it means | Why it helps |
|---|---|---|
| **Particle** | The object has mass but no size | You can ignore rotation and air resistance; all forces act at one point |
| **Rod** | Rigid, with length but no thickness | Used for beams and levers; mass acts at the centre if **uniform** |
| **Uniform** | Mass evenly distributed | The weight acts at the **geometric centre** |
| **Light** | Mass is negligible, treated as 0 | The object has no weight; **tension is the same throughout a light string** |
| **Inextensible** | Doesn't stretch | Connected objects have the **same acceleration** |
| **Smooth** | No friction | No frictional force to include |
| **Rough** | Friction acts | Must include $F \leq \mu R$ |
| **Thin** | Negligible thickness | Simplifies geometry |
| **Rigid** | Doesn't bend | The shape stays fixed under load |
| **Static** | Not moving | The system is in equilibrium |
:::

:::insight The two that do the most work
**"Light and inextensible string"** is the phrase that makes connected-particle problems solvable. Light
means the tension doesn't vary along the string (no weight to support); inextensible means both objects
move with the same speed and acceleration. Without those two, you'd need a wave equation.

**"Modelled as a particle"** lets you ignore air resistance and rotation, and lets every force act
through a single point — which is what makes $F = ma$ usable at all. It's also the assumption that's
least realistic for a real projectile, which is why exam answers so often say "the model ignores air
resistance, so the true range would be shorter".
:::

---

## 2. Common exam phrasings

:::exam "State one assumption you have made"
Name a specific assumption **and say what it allows you to do**:

- "The ball is modelled as a **particle**, so air resistance can be ignored."
- "The string is **light**, so the tension is the same throughout."
- "The pulley is **smooth**, so the tension is unchanged as the string passes over it."
- "The plane is **smooth**, so there is no friction acting."
:::

:::exam "How would the answer change if air resistance were included?"
Think about which direction the extra force acts and what it opposes:

- Air resistance **opposes motion**, so it reduces acceleration, reduces speed, **reduces range** and
  reduces maximum height.
- Time of flight for a projectile would generally be **shorter**, and the path no longer symmetric.
- For an object falling, the acceleration would be **less than $g$** and would decrease as speed
  increases (eventually reaching terminal velocity).

Be specific about which quantity changes and in which direction. "It would be less accurate" scores
nothing.
:::

---

## 3. Units and quantities

:::key SI units
| Quantity | Unit | Symbol |
|---|---|---|
| Mass | kilogram | kg |
| Length/displacement | metre | m |
| Time | second | s |
| Velocity | metres per second | m s$^{-1}$ |
| Acceleration | metres per second per second | m s$^{-2}$ |
| Force / weight | newton | N |
:::

:::warning Convert before you calculate
Grams to kilograms ($\div 1000$), km h$^{-1}$ to m s$^{-1}$ ($\times\frac{1000}{3600}$, i.e.
$\div 3.6$), minutes to seconds.

Every mechanics formula assumes SI units. A mass in grams substituted into $F = ma$ gives an answer
1000 times too big — and it's an easy mark to lose on a question you could otherwise do.
:::

---

## 4. Scalars and vectors

:::key
- **Scalar:** magnitude only — distance, speed, mass, time, energy.
- **Vector:** magnitude *and* direction — displacement, velocity, acceleration, force, weight.
:::

:::warning Distance vs displacement, speed vs velocity
- **Distance** is how far you travelled; **displacement** is how far you ended up from the start,
  with direction.
- **Speed** is the magnitude of velocity.

Walk 5 m east then 5 m west: distance $=10$ m, displacement $= 0$. Average speed is non-zero; average
velocity is zero.

Exam questions exploit this constantly. Read which one is asked for.
:::

---

## 5. The forces

:::key Forces you must know
| Force | Symbol | Direction | Notes |
|---|---|---|---|
| **Weight** | $W = mg$ | Vertically **downwards** | $g = 9.8\text{ m s}^{-2}$ unless told otherwise |
| **Normal reaction** | $R$ or $N$ | **Perpendicular** to the surface | Not always equal to the weight |
| **Tension** | $T$ | Along the string, **pulling away** from the object | Strings pull, never push |
| **Thrust / compression** | | Along a rod, **pushing** | Rods can push; strings cannot |
| **Friction** | $F$ | **Opposes** motion (or attempted motion), along the surface | $F \leq \mu R$ |
| **Driving force** | | Direction of motion | For vehicles |
| **Air resistance / drag** | | **Opposes** motion | Usually ignored unless stated |
:::

:::warning Weight is a force, mass is not
Mass is measured in **kilograms** and never changes. Weight is a **force**, measured in **newtons**, and
equals $mg$.

A 5 kg object has a weight of $5 \times 9.8 = 49$ N. Writing "weight = 5 kg" is wrong and examiners
penalise it. On the Moon the same object still has mass 5 kg but a much smaller weight.
:::

:::key The value of $g$
Use $g = 9.8\text{ m s}^{-2}$ unless the question says otherwise, and **give answers to 2 significant
figures** when $g$ is used — because $9.8$ itself is only given to 2 s.f., so more precision would be
spurious.
:::

---

## In the exam

- **Always draw a force diagram.** Label every force with a symbol and mark the direction of
  acceleration. Most mechanics errors are missing or misdirected forces, and a diagram catches them.
- "State an assumption" and "comment on the model" are 1–2 marks every paper. Learn the phrasings.
- Check units before substituting.
- 2 s.f. for answers involving $g$.
- Define your **positive direction** at the start and stick to it. Half of all sign errors in mechanics
  come from switching convention halfway through.

---

## Practice

:::question Q1 (3 marks)
A ball is thrown and modelled as a particle moving freely under gravity. State three assumptions this
model makes.
:::
:::answer
Any three of:

1. The ball is modelled as a **particle**, so its size and shape are ignored and it does not rotate.
2. **Air resistance is negligible**, so the only force acting is weight.
3. The **acceleration due to gravity is constant** at $9.8\text{ m s}^{-2}$ throughout the motion.
4. There is **no wind** or other horizontal force.
:::

:::question Q2 (2 marks)
Explain why the tension is the same throughout a light inextensible string passing over a smooth
pulley.
:::
:::answer
Because the string is **light**, it has no weight to support, so no part of the string needs a
different tension to hold up the part below it.

Because the pulley is **smooth**, there is no friction between the string and the pulley to create a
difference in tension either side.
:::

:::question Q3 (3 marks)
Convert: (a) 72 km h$^{-1}$ to m s$^{-1}$, (b) 250 g to kg, (c) a weight of 0.6 kg mass into newtons
(take $g = 9.8$).
:::
:::answer
**(a)** $72 \div 3.6 = 20$ m s$^{-1}$

**(b)** $250 \div 1000 = 0.25$ kg

**(c)** $W = mg = 0.6 \times 9.8 = 5.88 = 5.9$ N (2 s.f.)
:::

:::question Q4 (3 marks)
A cyclist travels 3 km north, then 4 km east. Find (a) the total distance travelled, (b) the magnitude
of the displacement.
:::
:::answer
**(a)** Distance $= 3 + 4 = 7$ km (a scalar — just add the lengths).

**(b)** Displacement is a vector; the two legs are perpendicular, so by Pythagoras:
$$|\text{displacement}| = \sqrt{3^2+4^2} = 5 \text{ km}$$
:::

:::question Q5 (4 marks)
A particle is projected and its range is calculated assuming no air resistance.

(a) State how the actual range would compare with the calculated range.

(b) Explain your answer.
:::
:::answer
**(a)** The actual range would be **less** than the calculated range.

**(b)** Air resistance acts **opposite to the direction of motion**, so it produces a deceleration in
addition to gravity. This reduces the horizontal component of velocity throughout the flight, so the
particle travels a shorter horizontal distance before landing. The maximum height would also be lower,
and the path would no longer be a symmetric parabola.
:::

:::question Q6 (3 marks)
A book of mass 2 kg rests on a horizontal table. A downward force of 15 N is also applied to the book.
Find the normal reaction from the table.
:::
:::answer
The book is in **equilibrium** vertically, so the upward force balances the downward forces.

Downward: weight $= 2 \times 9.8 = 19.6$ N, plus the applied 15 N.

$$R = 19.6 + 15 = 34.6 = 35 \text{ N (2 s.f.)}$$

*(This is the standard illustration that the normal reaction is **not** always equal to the weight —
it's whatever value keeps the object in equilibrium perpendicular to the surface.)*
:::
