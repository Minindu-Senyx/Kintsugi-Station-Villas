# Kintsugi Station · Kandy

Marketing site for Kintsugi Station, a private villa in the Kandy hills. Built
with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

The four pages are built to the UI mockups in `Ui Mockup/`:

| Route      | Mockup                                  |
| ---------- | --------------------------------------- |
| `/`        | `kintsugi-station-kandy-homepage.png`   |
| `/about`   | `kintsugi-station-about-page.png`       |
| `/gallery` | `kintsugi-station-gallery-page.png`     |
| `/contact` | `kintsugi-station-contact-page.png`     |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How the layout matches the mockups

The mockups are 1024px wide. From the desktop breakpoint (900px) up, the root
font-size scales with the viewport (`1rem = 16px` at 1024px, see
`src/app/globals.css`), and every size is expressed in rem. The layout is
therefore proportionally identical to the mockup at any desktop width. Below
900px, each section stacks into a mobile layout.

Each mockup has its own header and footer, so each page has its own pair in
`src/components/<page>/`. Fonts are EB Garamond (serif) and Figtree (sans),
loaded through `next/font`.

## Structure

- `src/app`: the four routes, plus `not-found`, `sitemap`, `robots` and the icon
- `src/components/{home,about,gallery,contact}`: page-specific header, footer
  and interactive pieces (availability bar, gallery filters and lightbox,
  estate map, inquiry form)
- `src/components/brand`: mountain mark, ridge line and gold kintsugi veins (SVG)
- `src/lib/site.ts`: nav links, contact details and social URLs

## Photography (Nano Banana)

All photos in `public/assets/images` are AI-generated with Google's Nano Banana
image model. `scripts/generate-images.mjs` holds the prompt for every image
and writes the results straight into the site:

```bash
# put GEMINI_API_KEY=... in .env.local (git-ignored) or your shell, then:
npm run images:generate               # regenerate the stand-in images
npm run images:generate -- --all      # regenerate everything
npm run images:generate -- --only contact_hero,night_villa_hills
npm run images:generate -- --list     # list image names
```

To generate images by hand instead (for example in the Gemini app), use the
prompts in [`docs/image-prompts.md`](docs/image-prompts.md). That file also
lists each photo's filename, aspect ratio and where it is used.

`contact_hero`, `gallery_cta_mist` and `night_villa_hills` are currently
graded stand-ins derived from other generated photos. Running the default
command replaces them. Set `GEMINI_IMAGE_MODEL` to use a different or newer
model.

### Real photos of people

`public/assets/images/people/` holds real photographs taken from the old site
(stationvillas.lk): `founders.jpg` (About, "The Founders") and
`kandy_team.jpg` (About, "The People Behind Your Stay"). Never replace these
with generated images. Nano Banana is only for places and objects, never for
real, named people.

## Guest reviews, founders and team

The content for these sections lives in data files, separate from the page
layout, so it can be edited without touching the design:

- `src/lib/testimonials.ts`: guest reviews, copied word for word from the old
  site. `featured` picks the ones shown in the home page "Guest Voices"
  carousel.
- `src/lib/founders.ts`: the founders' bio and photo. Add their names to
  `names` once they're confirmed.
- `src/lib/team.ts`: the Kandy team. Add a `quote` only in the person's own
  words, once they have approved it.

The plan and open questions for these sections are in
[`docs/plan-testimonials-founders-staff.md`](docs/plan-testimonials-founders-staff.md).

## Before launch

- Replace the placeholder domain `https://www.kintsugistation.com` in
  `src/app/layout.tsx`, `sitemap.ts` and `robots.ts`.
- Confirm the phone, email, coordinates and social links in `src/lib/site.ts`.
- The inquiry form currently opens the guest's mail client, addressed to the
  reservations email. Connect it to a form backend if one is preferred.

## Build

```bash
npm run build
```
