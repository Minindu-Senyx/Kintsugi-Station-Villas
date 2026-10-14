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
  estate map)
- `src/components/villas/BookOnAirbnb.tsx`: the three Airbnb listings with price,
  capacity and awards, used on the Villas and Contact pages
- `src/components/brand`: mountain mark, ridge line and gold kintsugi veins (SVG)
- `src/lib/site.ts`: site domain, nav links, contact details, social URLs and
  distances from the villa
- `src/lib/booking.ts`: the Airbnb listings (IDs, capacity, nightly rates,
  awards) and `airbnbUrl()`, which builds a listing link with dates and guests

## Photography (Nano Banana)

The villa photos in `public/assets/images/villas` are the owners' real
property photography, resized from their Drive export by
`npm run images:villas` (the export folders sit in the project root and are
git-ignored). The other images directly in `public/assets/images` (home hero,
About page and so on) are AI-generated with Google's Nano Banana image model. `scripts/generate-images.mjs` holds the prompt for every image
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

Set `GEMINI_IMAGE_MODEL` to use a different or newer model. Some images in the
generator's list (for example `contact_hero`) are no longer used by any page
and their files were removed; `--all` would recreate them.

### Real photos of people

`public/assets/images/people/` holds a real photograph of the owners from the old site
(stationvillas.lk): `founders.jpg` (About, "The Founders"). The old team photo
was removed at the owners' request, so "The People Behind Your Stay" has no
photo until new ones arrive. Never replace these with generated images. Nano Banana is only for places and objects, never for
real, named people.

## Guest reviews, founders and team

The content for these sections lives in data files, separate from the page
layout, so it can be edited without touching the design:

- `src/lib/testimonials.ts`: guest reviews, copied word for word from the old
  site. `featured` picks the ones shown in the home page "Guest Voices"
  carousel.
- `src/lib/founders.ts`: the founders' names, bio and photo.
- `src/lib/team.ts`: the Kandy team. Add a `quote` only in the person's own
  words, once they have approved it.

The plan and open questions for these sections are in
[`docs/plan-testimonials-founders-staff.md`](docs/plan-testimonials-founders-staff.md).

## Before launch

- The domain (`siteUrl` in `src/lib/site.ts`) is `https://stationvillas.lk`.
  Confirm whether the site is served with or without `www`.
- Bookings go to Airbnb. Update rates, capacity and awards in
  `src/lib/booking.ts` when the listings change.
- Add Facebook, Google Business, TripAdvisor and Booking.com links to `social`
  in `src/lib/site.ts` once those profiles exist.
- The home hero and the About page images are still AI-generated, and the home
  hero shows an infinity pool the villas do not have. Swap them for real photos.

## Contact form

The "Send Us a Message" form on `/contact` is delivered by
[formsubmit.co](https://formsubmit.co). Its settings are `messageForm` in
`src/lib/site.ts`: messages go to the first email in `contact.emails` and are
copied to the others. **The first time a message is sent, FormSubmit emails that
address a one-off confirmation link; click it, or nothing is delivered.** After
that, FormSubmit offers a random alias that can replace the email in the URL so
the address isn't in the page source.

## Tests

End-to-end tests use Playwright in the installed Google Chrome (no browser
download). They cover the contact form (FormSubmit and Airbnb are mocked, so
nothing is ever sent), the Villas menu, and the Airbnb booking buttons.

```bash
npm run test:e2e                              # builds, starts the site on :3111, runs desktop + mobile
npx playwright test e2e/screenshots.spec.ts   # full-page screenshots into e2e/screenshots/ for a visual check
```

## Build

```bash
npm run build
```
