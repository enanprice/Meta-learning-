---
title: The Large Data Set
code: S9
spec: 1.3
summary: What the Edexcel large data set contains, the quirks examiners test, and how to pick up the free marks.
time: 2 hours
prereq: S3 Representations of Data
papers: Paper 3 Section A
---

## Why this topic exists

Edexcel provides a **large data set** (LDS) of UK and overseas weather data, and expects you to have
worked with it during the course. In the exam you will not be given the raw data — but questions can
assume **familiarity** with it.

The marks available are small (typically 2–4 per paper) but they are close to free **if** you've seen
the data and nearly impossible to guess if you haven't. This guide covers the parts that get examined.

:::warning Check your own spec version
Edexcel has revised the LDS over the years. The description below matches the weather data set used
for the 9MA0 specification. **Confirm with your teacher which version applies to your exam series**,
and get hold of the actual spreadsheet — reading about it is no substitute for opening it.
:::

---

## 1. What the data set contains

Daily weather records from **eight stations** for two periods: **May to October 1987** and
**May to October 2015**.

**UK stations:**
- Camborne (Cornwall — coastal, south-west)
- Heathrow (London — urban, south-east)
- Hurn (Dorset — south coast)
- Leeming (North Yorkshire — northern England, inland)
- Leuchars (Fife, Scotland — east coast)

**Overseas stations:**
- Beijing (China)
- Jacksonville (Florida, USA)
- Perth (Western Australia)

:::key The variables
| Variable | Units | Notes |
|---|---|---|
| Daily mean temperature | °C | |
| Daily total rainfall | mm | `tr` denotes **trace** rainfall |
| Daily total sunshine | hours | |
| Daily mean windspeed | knots | Also recorded on the **Beaufort scale** |
| Daily maximum gust | knots | |
| Daily maximum relative humidity | % | |
| Daily mean pressure | hPa (hectopascals) | |
| Daily mean cloud cover | **oktas** (eighths of the sky) | Integer 0–8 |
| Daily mean visibility | decametres (dam) | 1 dam = 10 m |
:::

---

## 2. The quirks examiners love

:::key Six things that get tested
1. **`tr` means trace rainfall** — less than 0.05 mm. It is **not zero** and it is **not missing
   data**. In calculations it is usually treated as 0, but a question may ask what it means.
2. **`n/a` means the data is unavailable** for that day/station — the instrument failed or the
   measurement wasn't taken. You cannot treat it as zero.
3. **Not every station records every variable.** Some overseas stations have fewer variables recorded.
4. **Cloud cover is in oktas** (0–8), not percent. It's discrete.
5. **Visibility is in decametres**, so a value of 3500 means 35 km. Very large-looking numbers are
   normal.
6. **The data covers May–October only**, so it is **summer and autumn data**. Any conclusion about
   "the UK climate" from it is limited — there is no winter data at all.
:::

:::exam The two most common LDS questions
**"Explain why the value 'tr' cannot be used directly in a calculation of the mean rainfall."**
→ Because `tr` is not a numerical value; it records rainfall below 0.05 mm. It would normally be
treated as 0 for calculation, but doing so slightly underestimates the true total.

**"Comment on whether this conclusion about the UK climate is valid."**
→ It isn't fully valid: the data covers only May to October, so it excludes winter entirely; and it
covers only two specific years (1987 and 2015), which may not be representative of long-term trends.
:::

---

## 3. Typical values — know the rough ballpark

You are not expected to memorise data. You **are** expected to recognise a plausible value from an
implausible one.

:::key Sensible ranges (UK stations, May–October)
| Variable | Typical range |
|---|---|
| Daily mean temperature | 8–22 °C |
| Daily total rainfall | 0–20 mm (usually 0–2) |
| Daily total sunshine | 0–14 hours |
| Daily mean windspeed | 2–20 knots |
| Daily mean pressure | 990–1030 hPa |
| Daily mean cloud cover | 0–8 oktas |
| Daily maximum relative humidity | 70–100% |
:::

Overseas stations differ predictably: **Beijing** is hot and dry in summer with a monsoon peak;
**Jacksonville** is hot and very wet with high humidity; **Perth** is in the **southern hemisphere**,
so May–October is its **winter** — which makes it cool and wet while the UK stations are warm.

:::insight The Perth trap
Perth's seasons are reversed. A question that says "Perth recorded its lowest mean temperature in
July" is entirely consistent with the data, whereas the same statement about Heathrow would be
surprising.

This is the single most common LDS "explain" question, and it's a gift if you've noticed it.
:::

---

## 4. Comparisons the data supports

Questions typically ask you to compare stations or years, using summary statistics you're given.

:::method Structuring an LDS comparison
Exactly as in S3:
1. Compare **location** (mean or median) with numbers and units.
2. Compare **spread** (standard deviation, IQR or range) with numbers.
3. Give a **plausible reason in context** tied to geography.
:::

Reasons worth having ready:

- **Camborne** is coastal and in the south-west — mild, wetter, windier, less extreme temperature range
  (the sea moderates temperature).
- **Heathrow** is urban and inland in the south-east — warmest UK station, urban heat island, lower
  rainfall.
- **Leuchars** and **Leeming** are further north — cooler on average.
- **Coastal stations are windier** than inland ones.
- **1987 vs 2015** comparisons: be cautious. Two years is far too small a sample to demonstrate climate
  change, and saying so is usually the mark.

---

## 5. How to actually prepare

:::method A one-hour LDS revision session that works
1. **Open the spreadsheet.** Actually open it. Scroll through Camborne 2015 and Perth 2015 side by side.
2. **Locate one of each oddity:** a `tr`, an `n/a`, a cloud cover value, a visibility value. Look at
   what's around them.
3. **Compute summary statistics for one variable at two stations.** Mean and standard deviation of
   daily mean temperature at Heathrow and Leuchars, say. Note the difference, and explain it to
   yourself geographically.
4. **Sort a column** to find the extremes. What's the wettest day in the whole set? The windiest?
5. **Write yourself five bullet points** of things you noticed. That page is your LDS revision.

That's it. An hour, once, and the LDS marks become reliable instead of a lottery.
:::

---

## In the exam

- The data is **not provided**, so answers must come from familiarity, not lookup.
- Units matter: oktas, knots, hPa, decametres.
- `tr` $\neq$ 0 and `n/a` $\neq$ 0.
- Any conclusion drawn from the LDS should be hedged: two years, six months each, eight locations.
- If asked whether a value is plausible, use the ballpark table above and say *why*.

---

## Practice

:::question Q1 (2 marks)
A student calculating mean daily rainfall at Hurn encounters the entry `tr`. Explain what this means
and how it should be handled.
:::
:::answer
`tr` stands for **trace** rainfall — an amount of rain too small to measure accurately, specifically
less than 0.05 mm.

It is **not** missing data and it is **not** exactly zero. For the purposes of calculation it is
normally recorded as 0 mm, which very slightly underestimates the true total.
:::

:::question Q2 (3 marks)
The mean daily mean temperature for May–October 2015 was 15.8 °C at Heathrow and 12.6 °C at Leuchars.
Comment on this difference and suggest a reason.
:::
:::answer
Heathrow's mean temperature is **3.2 °C higher** than Leuchars'.

**Reason:** Heathrow is in the south-east of England, considerably further **south** than Leuchars
(which is in Fife, eastern Scotland), so it receives more solar energy. Heathrow is also a large
**urban** site near London, so the urban heat island effect raises temperatures further.
:::

:::question Q3 (3 marks)
A student writes: "The large data set shows that UK summers are getting warmer, because the mean
temperature at Camborne was higher in 2015 than in 1987."

Give two criticisms of this conclusion.
:::
:::answer
1. **Two years is not a trend.** Comparing a single year with another single year tells you nothing
   about a long-term pattern — year-to-year weather variation is large, and 1987 or 2015 could simply
   have been unusual.

2. **The data covers only May to October**, so it says nothing about the year as a whole. A claim about
   "UK summers" is at least the right season, but a claim about UK climate generally would be
   unsupported.

*(A third valid criticism: one station in Cornwall is not the UK.)*
:::

:::question Q4 (3 marks)
Explain why Perth's temperature data for May–October looks very different from the UK stations'.
:::
:::answer
Perth is in **Western Australia**, in the **southern hemisphere**, where the seasons are reversed.

The period May to October is therefore Perth's **autumn and winter**, while it is spring and summer for
the UK stations. So Perth's mean temperatures in this window are relatively low and its rainfall
relatively high, whereas the UK stations show their warmest, driest months.
:::

:::question Q5 (4 marks)
A weather record for a UK station shows a daily mean cloud cover of 6 and a daily mean visibility of
2200. Explain what these values mean, including units.
:::
:::answer
**Cloud cover: 6 oktas.** Cloud cover is measured in eighths of the sky covered, on a scale from 0
(clear) to 8 (completely overcast). A value of 6 means about three-quarters of the sky was covered by
cloud.

**Visibility: 2200 decametres.** Visibility is recorded in decametres, where 1 dam $=$ 10 m. So
2200 dam $= 22{,}000$ m $= 22$ km — good visibility.
:::
