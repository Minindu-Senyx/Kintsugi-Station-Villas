# Kintsugi Station Villas

Marketing site for Kintsugi Station Villas, built with Next.js (App Router),
TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app` — routes: home, `/kandy`, `/trincomalee`, `/villas/[slug]`,
  `/about`, `/reviews/kandy`, `/reviews/trincomalee`, `/contact`
- `src/components` — shared UI (Header, Footer, VideoLightbox, forms, cards)
- `src/components/home` — homepage-only sections
- `src/lib` — content/data: `villas.ts`, `team.ts`, `reviews.ts`, `images.ts`

## Placeholder media — replace before launch

- **Hero / showcase video**: `public/assets/video/hero-placeholder.mp4` is a
  free stock clip standing in for the client's AI-generated aerial footage.
  Drop the real file in at the same path — no code changes needed.
- **Photography**: all villa, amenity, and team photos are placeholder shots
  sourced from Pexels, centralised in `src/lib/images.ts`. Swap each entry
  for a real photo (local `/public` path or new URL) once available.
- **Ratings/reviews**: `reviewCount: null` on a villa renders an honest "new
  listing" state instead of a fabricated rating. Guest review quotes are
  clearly labelled as sample content — replace `src/lib/reviews.ts` with
  verified reviews when available.

## Build

```bash
npm run build
```
