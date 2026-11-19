# The World in One Day — Wednesday 18 November 2026

[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/diablosan19/news-image-20261118/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/diablosan19/news-image-20261118/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)

A one-page newspaper front page that sums up the world news of **Wednesday
18 November 2026** in a single 1024×1024 image (`entry.png`). A reader who
missed the day should be able to reconstruct it from this page alone: the
date is the biggest thing on the page after the title, the lead story
dominates, and six more stories fill a grid — each with a small illustration,
a short headline and a one-line caption. A ticker along the bottom carries
three further stories that would not fit the grid.

## The stories

- **Lead — Three leaders, one city: the Shenzhen summit.** Xi Jinping and
  Vladimir Putin met in Shenzhen on Wednesday and Donald Trump flew in,
  ahead of Thursday's first-ever trilateral summit, with Ukraine, Iran and
  nuclear arms control at the top of the agenda. The illustration shows the
  Shenzhen skyline at dawn with the Chinese, American and Russian flags
  flying side by side.
- **Middle East — US sinks five Iranian tankers; Tehran hits back.** The US
  said it sank five Iranian oil tankers in the Gulf of Oman and near Kharg
  Island; Iran struck shipping near the Strait of Hormuz and fired on the US
  base at Al-Azraq in Jordan, while Bahrain and Kuwait intercepted Iranian
  drones. A tanker burned in the strait and oil neared $93.
- **Ukraine — Kerch Bridge hit for a second night.** Ukraine struck the
  bridge linking Russia to occupied Crimea again overnight; Russia answered
  by hitting two bridges in Kyiv, on the eve of the Shenzhen summit.
- **Washington — Peltola flips Alaska: Senate goes 56–44.** Democrat Mary
  Peltola defeated incumbent Republican Senator Dan Sullivan, giving
  Democrats a projected 56–44 majority in the incoming Senate — and becoming
  the first Alaska Native ever elected to the US Senate.
- **Health — Ebola passes 11,000 cases in Congo.** The Bundibugyo-virus
  outbreak has killed more than 5,400 people across eight provinces; the WHO
  kept it a public health emergency of international concern on Wednesday,
  with children bearing the heaviest toll and 400–500 new cases a week.
- **Climate — COP31 draft: phase out fossil fuels.** The first draft of the
  Antalya deal — 18 pages, 144 provisions — calls for accelerated action to
  phase out fossil fuels and at least $120bn a year in adaptation finance by
  2035, with ministers deadlocked and Friday's deadline looming.
- **Weather — Cyclone Akvan: 47,000 flee the coast.** Odisha evacuated more
  than 47,000 people and put 11 districts on red alert as severe Cyclone
  Akvan bore down on Puri, bound for a Friday landfall between Narsapur and
  Puri; 74 rescue teams were deployed.

**Also today (ticker):** Nvidia posted a record $115.8bn quarter as its
board ruled out a return for Jensen Huang as CEO; the United States lost
its measles-elimination status after 26 years; and the UN warned that
Gaza's displaced face deadly winter cold as the ceasefire frays.

Stories were chosen for breadth: great-power diplomacy, two wars, US
politics, a record epidemic, the climate talks and a major storm. Every
story on the page was checked against at least two independent reports
before it was printed — see `SOURCES.md` for the story-by-story notes.
Claims that only one side asserted (battlefield effects, the precise
structural damage to the Kerch Bridge) are not stated as fact on the page.

## Sources

The day's reporting as carried by AFP, the Associated Press and Reuters;
UN News and the WHO on the Ebola emergency; the European Centre for Disease
Prevention and Control; The Guardian on the COP31 draft; Al Jazeera and
France 24 on the Gulf escalation; the India Meteorological Department and
IANS on Cyclone Akvan; and the day's digests from the Open Chronicle and
Asas Press. Full per-story verification notes are in `SOURCES.md`.

## How it is made

The page is hand-built HTML/CSS with inline SVG illustrations — no
downloaded images, no stock art. `render.mjs` rasterises `page.html` at
exactly 1024×1024 with headless Chromium into `entry.png`. The contest
program itself is `main.ts`: it verifies the bundled image against the
contest caps (PNG or JPEG, at most 1024×1024 pixels, at most 1 MiB) by
reading the dimensions from the file header, then copies the verified
bytes to the output directory. It runs offline and writes identical bytes
on every run.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes the verified front page to `out/entry.png`.
