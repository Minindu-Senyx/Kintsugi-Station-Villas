# Plan: Testimonials, Founders' History and Staff Quotes

This plan adds three kinds of content to the site. Each part below says where it goes on the page, what it looks like, where its content lives in the codebase, and what we still need from the client.

## Status (25 Sep 2026)

| Part | Status |
| ---- | ------ |
| 1. Guest Voices (home page) | **Built.** It shows 6 featured reviews in a carousel. All 10 reviews are in `src/lib/testimonials.ts`. |
| 2a. The Founders (About page) | **Built** with the real photo and the old site's bio. The sign-off reads "A New Lease of Life" until the names are added to `src/lib/founders.ts`. |
| 2b. A Brief History (timeline) | **Not built.** The only date we have is 2011. This waits for the dates and old photos from the client. |
| 3. The People Behind Your Stay (About page) | **Built** as Option 1: the group photo beside text cards. There are two cards, Prasanna and Rasu & Manjula, since we know nothing about Rasu and Manjula individually. Each card shows a factual description until a real `quote` is added to `src/lib/team.ts`. |

How the build differs from the plan below:
- The new About sections are written directly in `src/app/about/page.tsx`, like the page's existing sections, rather than as separate component files. The content still lives in the `src/lib` data files.
- "The Host Experience" was kept as it is. The team section sits directly under it, instead of replacing it.
- No mockups were drawn first (step 2 of the build order). The sections reuse the existing page styles.
- The "Read all reviews" link was left out, because there is no reviews list yet.

| # | Content | Where it goes | New section name |
| - | ------- | ------------- | ---------------- |
| 1 | Client testimonials | Home page, between "The Estate" and "Reserve the Estate" | **Guest Voices** |
| 2 | Founders, villa history and their photos | About page, straight after "Our Story" | **The Founders** + **A Brief History** |
| 3 | Staff quotes (e.g. Prasanna, General Manager) | About page, replacing the current "The Host Experience" block | **The People Behind Your Stay** |

A short version of 1 and 3 can also appear elsewhere (see "Optional extras").

---

## Before we start: one content mismatch to settle

The new site presents **one private villa**. The home page says "One Villa. Complete Solitude.", with rates from USD 650 for the entire villa. The old site ([stationvillas.lk](https://stationvillas.lk/)) sells **two Kandy villas**: Avalon Villa (sleeps 6, from $300) and Villa Acland (sleeps 2, from $150). Guests can also book both together (sleeps 8, from $450).

All 10 old testimonials name one of those villas. Before we publish them, the client needs to confirm how the new site should refer to them:

- **Option A:** keep the villa names in the review credit, e.g. "Eva, January 2025, Avalon Villa".
- **Option B:** show only the guest name and date, e.g. "Eva, January 2025".

This doc assumes **Option B**. That is a one-line change later if they choose A.

---

## 1. Client testimonials: "Guest Voices"

### Where

On the **home page**, as a new section between "The Estate" (the photos and "Glimpses of Kintsugi") and "Reserve the Estate" (the booking block). Guests read what others said right before the "Book Your Stay" button, which is where reviews persuade most.

### What it looks like

```
┌──────────────────────────────────────────────────────────────┐
│  GUEST VOICES                                                │
│  Words From Those Who Stayed                                 │
│                                                              │
│  “ One of the most beautiful places we've ever stayed in.    │
│    Prasanna was immensely helpful and kind… ”                │
│                                                              │
│  ─── DAVID · DECEMBER 2024                                   │
│                                                              │
│  ←  ●  ○  ○  ○  ○  →                     Read all reviews →  │
└──────────────────────────────────────────────────────────────┘
```

- One large quote at a time in the serif font (EB Garamond), matching the current headings.
- Arrows and dots to move between 5–6 featured reviews. Reviews do **not** auto-rotate, because auto-rotation is hard to read and bad for accessibility.
- A gold kintsugi line (the existing `KintsugiVeins` art) as a quiet decoration, like the "Reserve the Estate" section uses.
- On mobile, it stacks to a single column and supports swiping.
- It uses the same scroll-reveal animation (`data-reveal`) as the rest of the site.

### Where the content lives

Testimonials are kept in **one data file**, separate from the page layout. That way the client can add or edit a review without touching the page design:

- `src/lib/testimonials.ts`: a list of reviews. Each entry has:
  - `quote`: the full text
  - `excerpt`: the short pull line shown on the home page
  - `name`: first name only, or "Tom & Hannah"
  - `date`: month and year
  - `stay`: optional villa name (only if Option A)
  - `featured`: true/false, which marks the reviews that appear in the home page carousel
- `src/components/home/Testimonials.tsx`: the section itself. It reads the data file.

This follows how `src/lib/site.ts` already holds shared content (contact details, nav links).

### Starting content (from the old site)

There are 10 reviews ready to use, from the Kandy reviews page on the old site. The full text is in the Kandy content doc. Suggested featured six:

| Guest | Date | Pull quote |
| ----- | ---- | ---------- |
| Toby | Dec 2024 | "A truly magnificent place to stay, a perfect blend of opposites." |
| David | Dec 2024 | "One of the most beautiful places we've ever stayed in." |
| Eva | Jan 2025 | "Newly renovated, beautiful inside and outside design, very clean - everything was just perfect!" |
| Ala | Jan 2025 | "As a superhost myself; I think that this is a special place in every sense of the word." |
| Mckee and family | Feb 2025 | "A spectacular property… the views from the balcony are spectacular." |
| Tom & Hannah | Mar 2025 | "Such a beautiful accommodation in a peaceful location just outside the hustle and bustle of Kandy centre." |

### Rules

- **Use the real review text only.** Do not rewrite a review or add star ratings. Only one old review has stars.
- Cut long reviews with "…". Never change the words that remain.
- First names only, unless the client has the guest's permission to show more.
- Do **not** add Google "Review" rich-result markup. Google ignores reviews a business publishes about itself, and it can count as a policy issue.

---

## 2. Founders' history and photos: "The Founders" + "A Brief History"

### Where

On the **About page**, directly after "Our Story". "Our Story" explains the *philosophy* (kintsugi, wabi-sabi). This new part explains the *people and the place*: who restored the villa and what it was before.

### What it looks like

**Part A: The Founders**

```
┌───────────────────────┬──────────────────────────────────────┐
│                       │  THE FOUNDERS                        │
│   [ portrait photo    │  An English-Lankan & American        │
│     of the couple ]   │  Couple, at Home in Sri Lanka        │
│                       │                                      │
│                       │  Short bio, 2–3 paragraphs.          │
│                       │                                      │
│                       │  ─── [NAME] & [NAME]                 │
└───────────────────────┴──────────────────────────────────────┘
```

- The photo sits on the left and the text on the right, the mirror of "Our Story" (which has its photo on the right). This keeps the page rhythm alternating.
- The founders' names appear as the gold sign-off line, using the existing `Signoff` style.

**Part B: A Brief History** (a horizontal timeline)

```
  2011 ──────────── 20XX ──────────── 20XX ──────────── 2024
  Moved to        Found the         Restoration       First guests
  Sri Lanka       old house         begins            welcomed
  [photo]         [old photo]       [work photo]      [today photo]
```

- 4–5 milestones, each with a year, a one-line caption and a small photo.
- On mobile, it becomes a vertical list.
- **"Before and after" photos fit the kintsugi idea well**: the building as it was, then as it is now after being mended. If the client has old photos of the house, this is the best place for them.

### Where the content lives

- `src/lib/founders.ts`: founder names, bio paragraphs, portrait photo path and the timeline milestones (year, title, caption, photo).
- `src/components/about/Founders.tsx` and `src/components/about/HistoryTimeline.tsx`: the two sections.
- Photos go in `public/assets/images/people/` (founders) and `public/assets/images/history/` (old and restoration photos).

### Starting content (from the old site)

The old About page gives us:

> We are an English-Lankan / American couple living in Sri Lanka since 2011. We try to maintain the original style and feel of a bygone Lankan era in our property design, while simultaneously updating the property for the comfort of today's discerning adventurous tourist. All of our properties are restorations of characterful old buildings. We take pleasure in giving a new lease of life to properties that might otherwise have been destroyed in the name of modern development.

That is enough for a first draft of the bio. It fits the kintsugi theme closely: "giving a new lease of life" to something that would otherwise be destroyed.

**Founders' photo: done.** The only photo on the old About page is a real photo of the founding couple. It is saved at `public/assets/images/people/founders.jpg`.

- Size: 2048 × 3641 px, tall portrait (about 9:16), from a phone.
- Content: the couple hugging, smiling, in front of green toile wallpaper, framed from the head to the waist.
- Use: it suits a **tall portrait slot**, like the left column in the sketch above. For a landscape or square slot, crop to the top ~45% (faces and shoulders).
- Source: [stationvillas.lk/about](https://stationvillas.lk/about).

**Still missing:** the founders' names and any dates besides 2011. Those have to come from the client.

### Important: photos of real people

All current site photos are AI-generated (see `docs/image-prompts.md`). **The founders' and staff photos must be real photographs.** Never AI-generate a picture of a real, named person. Only use the real photos in `public/assets/images/people/`. `docs/image-prompts.md` should also note that these images are "real photo, do not generate".

---

## 3. Staff quotes: "The People Behind Your Stay"

### Where

On the **About page**, replacing the current "The Host Experience" section. That section already talks about hosting ("Thoughtful Living, Exclusively Yours"), so putting real names and faces on it is a natural upgrade. The current host-dining photo and paragraph can stay as the introduction to the section.

### What it looks like

```
  THE PEOPLE BEHIND YOUR STAY
  Thoughtful Living, Exclusively Yours

  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
  │   [ portrait ]   │  │   [ portrait ]   │  │   [ portrait ]   │
  │                  │  │                  │  │                  │
  │  “Our hospitality│  │  “ … ”           │  │  “ … ”           │
  │   is … ”         │  │                  │  │                  │
  │                  │  │                  │  │                  │
  │  PRASANNA        │  │  RASU            │  │  MANJULA         │
  │  General Manager │  │  Caretaker       │  │  Caretaker & Cook│
  └──────────────────┘  └──────────────────┘  └──────────────────┘
```

- Three cards in a row. This uses the same grid as the existing "Craft & Materials" cards, so it looks native to the page. On mobile, the cards stack.
- Each card has a portrait, the quote in serif italics, then the name and role in small caps (the existing "eyebrow" style).
- Rasu & Manjula could also share **one card with a joint photo**, since the old site introduces them as "charming husband and wife". The client can choose.

### The team photo we have

The old home page has **one group photo** of the Kandy team, placed next to "The Kandy Team" text. It is saved at `public/assets/images/people/kandy_team.jpg`.

- Size: 2048 × 3641 px, tall portrait (about 9:16), from a phone.
- Content: three people standing at the villa's gate and pergola, on a mosaic courtyard floor. On the left is a younger man with a beard in a pink shirt. In the middle is an older man in a sarong. On the right is a woman in a striped top and floral skirt.
- Who is who: the old site's alt text for this photo is "Fantastic Prasanna and his dedicated team (charming husband and wife - Rasu & Manjula)". That suggests Prasanna on the left, with Rasu and Manjula in the middle and on the right. **The client must confirm this** before any name is placed under a face.
- Source: [stationvillas.lk](https://stationvillas.lk/) home page, "The Kandy Team" block.

Because we have one group photo rather than three portraits, there are two ways to lay out the section:

- **Option 1 (recommended for now):** the group photo on the left, in a tall frame like "Our Story". The three quote cards on the right have text only: quote, name, role. This needs no cropping, and nobody is labelled under the wrong face.
- **Option 2:** crop the group photo into three separate portraits for the cards, as in the sketch above. Each crop is about 600 px wide, which is enough for a card. This only works once the client has confirmed who is who. It can be replaced later with proper individual portraits.

(The home page also has a Trincomalee team photo, four women outside Villa 234 next to the "Kasthuri and her lovely team" text. It is not used here because this plan covers Kandy only.)

### Where the content lives

- `src/lib/team.ts`: one entry per person with name, role, quote, a short line about them, and a photo path.
- `src/components/about/TeamQuotes.tsx`: the section.
- Photos go in `public/assets/images/people/`.

### The team (from the old site)

| Name | Role (to confirm) | What the old site and guests say |
| ---- | ----------------- | -------------------------------- |
| Prasanna | General Manager | Available "around the clock". Gives recommendations and helps with restaurants, shopping and trip planning. Named in almost every review. |
| Rasu | Caretaker / Housekeeper | Husband of Manjula. Helps with luggage and looks after guests. |
| Manjula ("Manju") | Caretaker / Housekeeper | Wife of Rasu. Prepares the cooked breakfast (Sri Lankan or Western). |

### The quotes do not exist yet

The old site has **no quotes from the staff**, so we must not invent them. A made-up quote under a real person's name would misrepresent them. The client needs to collect short quotes from each person. These questions help:

1. What does good hospitality mean to you?
2. What do you most enjoy about looking after guests here?
3. What is one thing every guest should do in Kandy?
4. What is your favourite moment of the day at the villa?

A quote should be **1–2 sentences, in the person's own words**, and approved by them. Until quotes arrive, each card can show a factual one-line description instead (e.g. "Prasanna looks after every stay, from your first message to your last breakfast"), with no quote marks.

---

## Optional extras

- **A staff line on the home page:** one short quote from Prasanna in the "Reserve the Estate" block, next to the booking button. For example: *"Message me any time, I'll help you plan your days in Kandy." — Prasanna, General Manager* (only once he has actually said something like it).
- **A full "Guest Reviews" list:** the "Read all reviews" link in Guest Voices can open a simple list of all 10 reviews, either at the bottom of the About page or on its own `/reviews` page. If we add a page, it also gets added to the nav links in `src/lib/site.ts` and to `src/app/sitemap.ts`.
- **A consistent quote style:** all three parts show quotes, so we build **one shared quote style** (large gold quote mark, serif text, small-caps credit line) and reuse it. The three sections then look like one family.

---

## Build order

1. **Get sign-off on this plan.** Settle the one-villa or two-villa wording (see the top of this doc).
2. **Mockups first.** None of the three sections has a design in `Ui Mockup/` yet. Add three mockup images, matching the style of the existing four, before building.
3. **Data files:** `testimonials.ts`, `founders.ts`, `team.ts`, filled with the real content above and clearly marked placeholders for anything missing.
4. **Shared quote style.**
5. **Guest Voices** on the home page. All its content already exists, so it can ship first.
6. **Team section** on About. It can ship with descriptions only, and quotes can be added later.
7. **Founders + History** on About. The founders' photo is ready. This step waits for their names and the history dates from the client.
8. **Check** mobile layouts, keyboard use of the testimonial arrows, alt text on every portrait, and page speed with the new photos.
9. Update `README.md` (page list and structure) and `docs/image-prompts.md` (mark people photos as real-only).

---

## What we need from the client

| Item | For | Needed before |
| ---- | --- | ------------- |
| One villa or two: how to credit old reviews | Guest Voices | Step 3 |
| Permission to reuse the 10 old reviews (and whether to show surnames) | Guest Voices | Step 5 |
| Founders' names (photo already found: `people/founders.jpg`) | The Founders | Step 7 |
| Permission to reuse the founders' and team photos from the old site | Founders, Team | Step 6 |
| Key dates and short story: when they found the house, what it was, when restoration happened, when guests first came | A Brief History | Step 7 |
| Old / before-restoration photos of the house, if they have any | A Brief History | Step 7 |
| Staff full names or preferred names and exact job titles | People Behind Your Stay | Step 6 |
| Confirm who is who in `people/kandy_team.jpg` (left, middle, right) | People Behind Your Stay | Step 6 |
| Individual staff portraits (optional; the group photo works for now) | People Behind Your Stay | Later |
| Staff quotes (1–2 sentences each, in their own words, approved by them) | People Behind Your Stay | Step 6 (can follow later) |
| Consent from each staff member to be named and pictured online | People Behind Your Stay | Step 6 |
