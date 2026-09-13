# Edexcel A-Level Maths — Complete Revision Resource

A complete set of topic guides for **Pearson Edexcel A Level Mathematics (9MA0)**, covering the whole
two-year course: Pure (Year 12 and 13), Statistics and Mechanics.

**50 topic guides · 50 diagrams · 293 practice questions with full solutions · 170 worked examples · ~100,000 words.**

Every topic guide follows the same structure:

1. **Why this topic exists** — what problem it solves and where it fits in the course
2. **The ideas, built up in order** — each new piece of machinery explained from the ground up, with
   the reasoning shown rather than just the rule stated
3. **Worked examples** — full solutions with the thinking written out
4. **Diagrams** where a picture does work words cannot — the shape of a curve, which region a
   solution lies in, which way a force points
5. **Common mistakes** — the specific, predictable ways marks get dropped
6. **In the exam** — what questions look like and what examiners want written down
7. **Practice questions** — graded from routine to exam-standard, each with a full worked solution
   behind a toggle

## Viewing it

```bash
python3 build.py           # build the site into site/
python3 build.py --serve   # build and serve at http://localhost:8000
```

Then open `site/index.html`. No dependencies beyond Python 3 — the Markdown renderer and site
generator are written from scratch in this repo. Maths is rendered by MathJax (loaded from a CDN, so
the first view needs an internet connection).

The site includes:

- a filterable sidebar covering every topic
- per-topic "mark as revised" checkboxes with a progress bar on the home page (stored in your
  browser's local storage)
- collapsible solutions, so you can attempt questions before looking
- light and dark themes
- a print stylesheet, if you'd rather work on paper

## Contents

| Section | Topics |
|---|---|
| **Start Here** | How to use this resource · The course map |
| **Pure — Year 12 (AS)** | Algebraic expressions · Quadratics · Equations and inequalities · Graphs and transformations · Straight line graphs · Circles · Algebraic methods and proof · The binomial expansion · Trigonometric ratios · Trig identities and equations · Vectors (2D) · Differentiation · Integration · Exponentials and logarithms |
| **Pure — Year 13 (A2)** | Proof by contradiction and partial fractions · Functions and modulus · Sequences and series · Binomial expansion for negative and fractional indices · Radians · Reciprocal and inverse trig · Addition formulae and the R form · Parametric equations · Advanced differentiation · Numerical methods · Advanced integration and differential equations · Vectors (3D) |
| **Statistics** | Sampling and data collection · Measures of location and spread · Representations of data · Correlation and regression · Probability · The binomial distribution · The normal distribution · Hypothesis testing · The large data set |
| **Mechanics** | Modelling · Constant acceleration (SUVAT) · Forces and Newton's laws · Variable acceleration · Moments · Friction and inclined planes · Projectiles · Applications of forces · Vectors in mechanics |
| **Exam Skills** | The formula booklet · Command words and mark schemes · Calculator skills · Building a revision plan |

## How to actually use it

Reading a worked solution feels like learning and mostly isn't. The rule for every practice question
here:

> **Attempt it on paper, fully, to an answer, before you open the solution.** If you get stuck, note
> exactly where, then read only until you're unstuck. Close it. Finish the question yourself.

There's a fuller version of this argument, and a workable weekly routine, in *Start Here → How to Use
This Resource* and *Exam Skills → Building a Revision Plan*.

## Project structure

```
content/            Markdown source, one file per topic
  00-start-here/
  01-pure-year1/
  02-pure-year2/
  03-statistics/
  04-mechanics/
  05-exam-skills/
assets/             styles.css and app.js, copied into the build
md.py               dependency-free Markdown renderer (the subset used here,
                    plus the ::: directive blocks)
figlib.py           SVG drawing toolkit -- figures are specified in data
                    coordinates, and take their colours from CSS tokens so
                    they follow the light and dark themes
figures.py          the catalogue of 50 diagrams
preview_figures.py  renders every figure onto one contact sheet, for checking
                    them in bulk (writes site/_figures.html)
build.py            static site generator
site/               generated output (regenerate with build.py)
```

### Adding or editing a topic

Create a Markdown file in the relevant `content/` folder with front matter:

```markdown
---
title: Topic Name
code: P1.15
spec: 2.1, 2.2
summary: One sentence for the sidebar and the topic card.
time: 3 hours
prereq: P1.1 Algebraic Expressions
papers: Papers 1 and 2
---
```

Then write the body using standard Markdown plus these block directives:

```
:::key Title          a key result / must-learn box
:::example Title      a worked example
:::insight Title      why it works / intuition
:::warning Title      a common mistake
:::method Title       a step-by-step procedure
:::exam Title         exam technique note
:::question Q1 (4 marks)
:::answer             collapsible solution
:::figure <id>        a diagram from figures.py; the body becomes its caption
```

Each is closed by a line containing only `:::`. Maths goes in `$...$` (inline) or `$$...$$` (display).
Run `python3 build.py` to regenerate.

### Adding a diagram

Add a function to `figures.py` decorated with `@figure("some-id")`, returning
`Canvas(...).svg()`. Draw in data coordinates — `c.func(lambda x: x*x)`,
`c.point(1, -9, "(1, −9)")`, `c.arrow(...)` — and never hard-code a colour; the
`fig-*` classes in `assets/styles.css` handle both themes. Then reference it from
a content file with `:::figure some-id`.

Run `python3 preview_figures.py` to render every figure onto one page, or
`python3 preview_figures.py circle trig` to filter by substring.

## A note on accuracy

Every numerical answer in this resource was computed and checked programmatically while it was being
written. That said, it's a large body of material written quickly — if you find an error, it's an
error, not a subtlety. Check anything that looks wrong against the mark scheme of a real past paper.

This resource is not affiliated with or endorsed by Pearson. Always check the current specification
and formula booklet for your exam series.
