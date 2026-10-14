# Kintsugi Station Villas · Kandy

Website for Kintsugi Station Villas: Avalon Villa and Villa Acland in Kandy, Sri
Lanka. Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.
Bookings are made on Airbnb.

| Route            | Page                                                    |
| ---------------- | ------------------------------------------------------- |
| `/`              | Home: hero, booking bar, the villas, reviews, rates     |
| `/villas`        | Both villas, and the three Airbnb listings              |
| `/villas/[slug]` | `avalon` and `acland`: facts, spaces, amenities, photos |
| `/gallery`       | Photo grid with a lightbox                              |
| `/about`         | Story, founders, team                                   |
| `/contact`       | Booking, contact details, message form, getting here    |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design

Minimal on purpose: ivory surfaces, EB Garamond headings, Figtree text, one
bronze accent, thin rules, no decorative icons or artwork. Icons appear only
where they are controls (menu, close, previous/next, dropdown chevrons).

From the desktop breakpoint (900px) up, the root font-size scales with the
viewport (`1rem = 16px` at 1024px, see `src/app/globals.css`) and sizes are in
rem, so the layout keeps its proportions at any desktop width. Below 900px the
sections stack.

Colours are tokens in `globals.css`. The bronze gold (`--color-gold`) and the
muted greys are chosen to keep text at 4.5:1 contrast or better on every page
surface.

## Structure

- `src/app`: the routes, plus `not-found`, `sitemap`, `robots` and the icons
- `src/components/site`: header (with the Villas menu), mobile menu, footer, logo
- `src/components/home`: the booking bar and the review carousel
- `src/components/villas`: the Airbnb rows, space explorer, amenities, photo lightbox
- `src/components/contact`: the message form
- `src/lib/site.ts`: domain, nav, contact details, social links, distances, form settings
- `src/lib/booking.ts`: the Airbnb listings (IDs, capacity, nightly rates,
  awards) and `airbnbUrl()`, which builds a listing link with dates and guests
- `src/lib/villas.ts`, `testimonials.ts`, `founders.ts`, `team.ts`: page content

## Photography and logo

The villa photos in `public/assets/images/villas` are the owners' real property
photography, resized from their Drive export by `npm run images:villas` (the
export folders sit in the project root and are git-ignored; keep them). The
home hero and the About page use these same photos.

`public/assets/images/people/founders.jpg` is a real photograph of the owners.
Use only real photographs of real people; the old team photo was removed at the
owners' request.

The owners' logo lives in `public/assets/brand/`: the full-size master
(`kintsugi-station-villas-logo.png`), a 720px WebP used by the header and footer
(`...-720.webp`) and the 1200x630 social card (`og-image.jpg`). The favicon and
app icon (`src/app/icon.png`, `apple-icon.png`) are a square crop of the marble
from the left of the logo. `SiteLogo` renders it: in the header it runs the full
height of the bar, bleeds off the left edge and fades into the page on its right
(the `.logo-fade` mask in `globals.css`). If the logo changes, regenerate the
three derived files from the master.

## Guest reviews, founders and team

- `src/lib/testimonials.ts`: guest reviews, copied word for word from the old
  site. `featured` picks the ones in the home page carousel.
- `src/lib/founders.ts`: the founders' names, bio and photo.
- `src/lib/team.ts`: the Kandy team. Add a `quote` only in the person's own
  words, once they have approved it.

## Contact form

The "Send a message" form on `/contact` is delivered by
[formsubmit.co](https://formsubmit.co). Its settings are `messageForm` in
`src/lib/site.ts`: messages go to the first email in `contact.emails` and are
copied to the others. **The first time a message is sent, FormSubmit emails that
address a one-off confirmation link; click it, or nothing is delivered.** After
that, FormSubmit offers a random alias that can replace the email in the URL so
the address isn't in the page source.

## Before launch

- The domain (`siteUrl` in `src/lib/site.ts`) is `https://stationvillas.lk`.
  Confirm whether the site is served with or without `www`.
- Bookings go to Airbnb. Update rates, capacity and awards in
  `src/lib/booking.ts` when the listings change.
- Add Facebook, Google Business, TripAdvisor and Booking.com links to `social`
  in `src/lib/site.ts` once those profiles exist.
- Send one test message through the contact form and confirm it arrives.

## Tests

End-to-end tests use Playwright in the installed Google Chrome (no browser
download). They cover the contact form (FormSubmit and Airbnb are mocked, so
nothing is ever sent), the Villas menu, the Airbnb booking buttons and the logo.

```bash
npm run test:e2e                              # builds, starts the site on :3111, runs desktop + mobile
npx playwright test e2e/screenshots.spec.ts   # full-page screenshots into e2e/screenshots/ for a visual check
```

## Build

```bash
npm run build
```
