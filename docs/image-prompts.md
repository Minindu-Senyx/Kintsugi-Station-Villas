# Image Prompts (Nano Banana)

Prompts for every photo on the site, written to match the scenes in the UI
mockups (`Ui Mockup/`). Each prompt is self-contained, so you can paste it
straight into Gemini (Nano Banana), Google AI Studio or any image tool.

## How to use

1. Generate the image at the listed aspect ratio. Pick the ratio in the tool's
   settings if it has one; the ratio is also written into each prompt.
2. Save the result as a `.jpg` with the **exact filename** shown.
3. Put it in `public/assets/images/`, replacing the existing file. The site picks
   it up with no code changes.

The aspect ratios match the shape of each photo's slot on the page. Photos used
in two places (for example on Home and Gallery) use a ratio that crops well in
both.

**Start with the first three.** They are stand-ins, colour-graded from other
photos. The other 13 are existing Nano Banana generations and only need
regenerating for a closer match to the mockups.

| # | File | Ratio | Used on |
| - | ---- | ----- | ------- |
| 1 | `contact_hero.jpg` | 21:9 | Contact hero — **stand-in** |
| 2 | `gallery_cta_mist.jpg` | 21:9 | Gallery "Experience the stillness" banner — **stand-in** |
| 3 | `night_villa_hills.jpg` | 3:4 | Gallery "Home in the Hills" — **stand-in** |
| 4 | `homepage_hero.jpg` | 21:9 | Home hero |
| 5 | `stone_bath.jpg` | 4:5 | Home estate, Gallery "Rituals in Nature" |
| 6 | `open_air_pavilion.jpg` | 1:1 | Home estate |
| 7 | `pool_mist.jpg` | 1:1 | Home glimpses, Gallery "A Higher Kind of Quiet" |
| 8 | `teak_bedroom.jpg` | 4:3 | Home glimpses, Gallery "Wake to a Wilder World" |
| 9 | `tea_terrace.jpg` | 4:3 | Home glimpses, Gallery "Ceylon Tea" |
| 10 | `artisanal_breakfast.jpg` | 1:1 | Home glimpses, Gallery "Sri Lankan Flavours" |
| 11 | `about_hero_panorama.jpg` | 21:9 | About hero |
| 12 | `villa_forest_exterior.jpg` | 4:3 | About "Our Story" |
| 13 | `reclaimed_teak.jpg` | 16:9 | About craft card |
| 14 | `chiseled_stone.jpg` | 16:9 | About craft card |
| 15 | `mist_mountain_ridge.jpg` | 16:9 | About craft card |
| 16 | `host_dining_ritual.jpg` | 16:9 | About "The Host Experience" |

> `npm run images:generate` (see the README) uses its own shorter prompts from
> `scripts/generate-images.mjs`, not the ones in this file.

---

## Stand-ins (do these first)

### 1. `contact_hero.jpg` — 21:9

Contact page hero.

```text
Ultra-wide 21:9 photograph at sunrise from a modern timber-and-glass villa terrace in the hills of Kandy, Sri Lanka. The left two-thirds is a soft, bright peach-and-cream hazy sky over a deep valley of layered misty forested ridges, with a pale lake glinting far below at the bottom left. Leafy tree branches hang across the top centre. The right edge shows the dark wooden frame of a floor-to-ceiling glass pavilion with a lounge chair, a potted plant and a low table on the terrace. The left side is bright and airy with low detail, leaving space for dark overlaid text. Photorealistic luxury travel photography, natural light, soft atmospheric haze, muted earthy palette. No people, no text, no watermark.
```

### 2. `gallery_cta_mist.jpg` — 21:9

Gallery page "Experience the stillness yourself" banner.

```text
Very wide 21:9 low-contrast landscape banner of a misty valley in the Sri Lankan hill country. Two dark, densely forested hillsides slope down from the left and right edges and meet in a soft V shape. The centre is filled with pale grey fog and faint silhouettes of distant ridges. Desaturated, calm, cool grey-green tones, overcast soft light, bright empty centre to leave room for overlaid dark text and a button. Photorealistic, fine-art landscape photography. No people, no text, no watermark.
```

### 3. `night_villa_hills.jpg` — 3:4 portrait

Gallery page "Home in the Hills" tile.

```text
Vertical 3:4 blue-hour photograph of a two-storey luxury hillside villa in Kandy, Sri Lanka: stone lower walls, timber upper floor with wraparound balconies and a low hipped roof, every window glowing warm amber. The villa sits among dense, dark tropical rainforest on a steep slope, with tall palms and trees around it, stone steps leading up through the foliage, and a deep blue dusk sky above misty forested hills. Photorealistic luxury travel photography, moody and serene. No people, no text, no watermark.
```

---

## Home page

### 4. `homepage_hero.jpg` — 21:9

Main hero.

```text
Ultra-wide 21:9 sunset photograph from a secluded luxury hilltop villa in Kandy, Sri Lanka. The left half shows layered misty mountain ridges fading into a soft peach and dusky-blue sky with light clouds. In the centre, the edge of an infinity pool drops away into the valley. On the right, a teak timber deck with white-cushioned sun loungers and a small side table with a lantern leads to an open teak pavilion glowing with warm interior lamplight, with a cream sofa inside and a large tree's branches overhanging the top. The left side is darker and calm, leaving room for white overlaid headline text. Photorealistic luxury travel photography, soft atmospheric haze. No people, no text, no watermark.
```

### 5. `stone_bath.jpg` — 4:5

Home "A Private Stone Bath" and Gallery "Rituals in Nature".

```text
Vertical 4:5 photograph of a large round, hand-carved grey stone soaking tub filled with still water and floating white frangipani flowers, set on a stone terrace in a private garden, beside a mossy stone wall with a small wall lantern. Lush ferns and tropical plants frame the tub, and a small teak stool with a candle stands beside it. Behind it, a view opens over misty forested hills and a distant river valley. Photorealistic luxury spa photography, soft natural light. No people, no text, no watermark.
```

### 6. `open_air_pavilion.jpg` — 1:1

Home "Open-Air Pavilion".

```text
Square 1:1 photograph of an open-air teak pavilion lounge with a pitched timber roof and exposed beams, cream linen sofas and armchairs around a low wooden coffee table, and wooden railings on a teak deck. It looks out over a wide misty green valley with layered mountains and a lake in the distance under a soft bright sky. Photorealistic luxury travel photography, warm natural light, earthy palette. No people, no text, no watermark.
```

### 7. `pool_mist.jpg` — 1:1

Home "Misty Mountain Pool" and Gallery "A Higher Kind of Quiet".

```text
Square 1:1 photograph of an infinity pool with a dark stone edge that seems to spill into a deep valley. The still water reflects mist-covered mountains under a soft pastel dawn sky. Two teak loungers sit on a stone deck at the left, and a large tree with overhanging branches frames the top left. Rolling forested hills fade into layers of mist. Photorealistic luxury travel photography, serene and calm. No people, no text, no watermark.
```

### 8. `teak_bedroom.jpg` — 4:3

Home "Ceylon Teak Master Bedroom" and Gallery "Wake to a Wilder World".

```text
4:3 photograph of a serene luxury master bedroom with a high vaulted timber ceiling and exposed beams, a large bed with a Ceylon teak frame and crisp cream linen and pillows, a teak bench at its foot, bedside lamps glowing softly, and a framed artwork above the headboard. Floor-to-ceiling black-framed glass doors open onto a view of misty forested hills and a valley. Warm, calm, natural light. Photorealistic luxury hotel interior photography. No people, no text, no watermark.
```

### 9. `tea_terrace.jpg` — 4:3

Home "Private Tea Terrace" and Gallery "Ceylon Tea, Higher Perspectives".

```text
4:3 photograph of a private timber terrace high in the Sri Lankan hill country: a small round wooden table with a black cast-iron teapot, a cup of Ceylon tea on a saucer and a small vase of greenery, with two wooden armchairs. Beyond the terrace edge, a winding river curves through a valley of forested hills in soft golden-hour mist under a pale peach sky. Photorealistic luxury travel photography. No people, no text, no watermark.
```

### 10. `artisanal_breakfast.jpg` — 1:1

Home "Artisanal Breakfast" and Gallery "Sri Lankan Flavours, A Slower Table".

```text
Square 1:1 photograph of a Sri Lankan breakfast laid on a rustic teak table on a covered veranda: hoppers, egg hoppers, coconut sambol, curries in dark ceramic bowls, pastries, sliced tropical fruit, a coconut drink and tea cups, with a small vase of red tropical flowers. Beyond the veranda railing lies a lush green valley with a winding river and misty hills. Photorealistic food and travel photography, natural daylight. No people, no text, no watermark.
```

---

## About page

### 11. `about_hero_panorama.jpg` — 21:9

About hero. The left side of the photo fades into the page background.

```text
Ultra-wide 21:9 serene panoramic landscape of mist-veiled forested hills around a still lake at dawn in Kandy, Sri Lanka. Soft white fog drifts between rounded green ridges, a tall lone tree rises from the foreground canopy on the left, and the lake reflects the pale sky. The left third is very soft, pale and misty, so it can fade into an off-white page background. Calm, meditative, soft diffused light. Photorealistic fine-art landscape photography. No people, no buildings, no text, no watermark.
```

### 12. `villa_forest_exterior.jpg` — 4:3

About "Our Story".

```text
4:3 photograph of a timber villa with a long covered veranda and deep overhanging roof, raised on a tall hand-laid grey stone plinth, set on a hillside in lush misty rainforest in Kandy, Sri Lanka. Warm lamplight glows from inside, wooden chairs sit on the veranda deck, ferns and tropical foliage fill the foreground, and low cloud drifts through tall trees and distant forested valleys. Photorealistic luxury architectural photography, soft overcast light. No people, no text, no watermark.
```

### 13. `reclaimed_teak.jpg` — 16:9

About "Reclaimed Ceylon Teak" card.

```text
16:9 close-up of weathered reclaimed Ceylon teak planks with deep grain, knots and old joinery marks, running diagonally across the frame, with a hand-carved wooden bowl in the top right corner. Warm side light, rich brown tones, shallow depth of field. Photorealistic material detail photography. No people, no text, no watermark.
```

### 14. `chiseled_stone.jpg` — 16:9

About "Hand-Chiseled River Stone" card.

```text
16:9 photograph of a hand-laid dry river-stone wall made of rounded, chiseled grey stones tightly fitted together, with lush green ferns and tropical leaves growing along the right side. Soft diffused light, natural textures, earthy grey and green palette. Photorealistic architectural detail photography. No people, no text, no watermark.
```

### 15. `mist_mountain_ridge.jpg` — 16:9

About "Living with the Mist" card.

```text
16:9 landscape of rainforest-covered mountain ridges rising out of a sea of low white cloud in the Sri Lankan hill country, with a few tall tropical trees in the foreground on the left and right, under a soft overcast sky. Calm, cool greens and misty whites. Photorealistic landscape photography. No people, no buildings, no text, no watermark.
```

### 16. `host_dining_ritual.jpg` — 16:9

About "The Host Experience".

```text
16:9 close, shallow depth-of-field photograph of a private chef's Sri Lankan curry feast on a dark wooden table on a veranda: several black stoneware bowls of colourful curries, rice and vegetable dishes arranged in a row, with a black cast-iron teapot on the left. The background is softly blurred green tropical garden and timber posts. Warm, inviting natural light. Photorealistic food photography. No people, no text, no watermark.
```
