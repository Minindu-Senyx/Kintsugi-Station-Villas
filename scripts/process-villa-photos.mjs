/*
 * Builds the website photos from the owners' camera originals in `Villa/`
 * (git-ignored, ~600 MB). Run with `npm run images:villas`.
 *
 *   Villa/Villa 1   -> public/assets/images/villas/acland
 *   Villa/Villa 2   -> public/assets/images/villas/avalon
 *   Villa/Entrance  -> public/assets/images/grounds
 *   Villa/360       -> public/assets/images/tours (equirectangular, for the 360 viewer)
 *
 * Every photo is resized to 2200px on its longest side and saved as WebP. The
 * originals are 8000px and 10 MB each, far too heavy for a web page.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "Villa");
const out = path.join(root, "public", "assets", "images");

const HERO = 2600;
const PHOTO = 2200;
const PANORAMA = 5400;

/** [folder in Villa/, original file, output folder, output name, longest side] */
const photos = [
  // Villa Acland (Villa 1)
  ["Villa 1", "CPP08558-HDR.JPG", "villas/acland", "acland-exterior-garden", HERO],
  ["Villa 1", "CPP08566-HDR.JPG", "villas/acland", "acland-exterior-balcony"],
  ["Villa 1", "CPP08468-HDR.JPG", "villas/acland", "acland-breezeway"],
  ["Villa 1", "CPP08746-HDR.JPG", "villas/acland", "acland-stone-passage"],
  ["Villa 1", "CPP08450-HDR.JPG", "villas/acland", "acland-balcony-garden"],
  ["Villa 1", "CPP08305-HDR.JPG", "villas/acland", "acland-balcony-veranda"],
  ["Villa 1", "CPP08311-HDR.JPG", "villas/acland", "acland-balcony-chairs"],
  ["Villa 1", "CPP08343.JPG", "villas/acland", "acland-balcony-canopy"],
  ["Villa 1", "CPP08462-HDR.JPG", "villas/acland", "acland-terrace-lounger"],
  ["Villa 1", "CPP08339-HDR-4.JPG", "villas/acland", "acland-living-lounge"],
  ["Villa 1", "CPP08355-HDR.JPG", "villas/acland", "acland-bedroom-bed"],
  ["Villa 1", "CPP08370-HDR.JPG", "villas/acland", "acland-bedroom-wide"],
  ["Villa 1", "CPP08397-HDR.JPG", "villas/acland", "acland-bedroom-vaulted"],
  ["Villa 1", "CPP08376.JPG", "villas/acland", "acland-bathroom"],
  ["Villa 1", "CPP08403-HDR.JPG", "villas/acland", "acland-kitchen-stairs"],
  ["Villa 1", "CPP08406-HDR.JPG", "villas/acland", "acland-dining-balcony"],
  ["Villa 1", "CPP08416-HDR.JPG", "villas/acland", "acland-dining-table"],

  // Avalon Villa (Villa 2)
  ["Villa 2", "CPP08552-HDR.JPG", "villas/avalon", "avalon-patio", HERO],
  ["Villa 2", "CPP08572-HDR.JPG", "villas/avalon", "avalon-courtyard-seat"],
  ["Villa 2", "CPP08767-HDR.JPG", "villas/avalon", "avalon-courtyard"],
  ["Villa 2", "CPP08776-HDR.JPG", "villas/avalon", "avalon-courtyard-path"],
  ["Villa 2", "CPP08587-HDR.JPG", "villas/avalon", "avalon-veranda-walk"],
  ["Villa 2", "CPP08575-HDR.JPG", "villas/avalon", "avalon-veranda-dining"],
  ["Villa 2", "CPP08579-HDR.JPG", "villas/avalon", "avalon-veranda-table"],
  ["Villa 2", "CPP08584-HDR.JPG", "villas/avalon", "avalon-veranda-lounge"],
  ["Villa 2", "CPP08480-HDR.JPG", "villas/avalon", "avalon-library"],
  ["Villa 2", "CPP08486-HDR.JPG", "villas/avalon", "avalon-library-lounge"],
  ["Villa 2", "CPP08491-HDR.JPG", "villas/avalon", "avalon-cinema"],
  ["Villa 2", "CPP08728-HDR.JPG", "villas/avalon", "avalon-living-room"],
  ["Villa 2", "CPP08626-HDR.JPG", "villas/avalon", "avalon-living-kitchen"],
  ["Villa 2", "CPP08623-HDR.JPG", "villas/avalon", "avalon-piano-hall"],
  ["Villa 2", "CPP08618-HDR.JPG", "villas/avalon", "avalon-piano-hall-portrait"],
  ["Villa 2", "CPP08596-HDR.JPG", "villas/avalon", "avalon-kitchen-bar"],
  ["Villa 2", "CPP08602-HDR.JPG", "villas/avalon", "avalon-kitchen"],
  ["Villa 2", "CPP08638-HDR.JPG", "villas/avalon", "avalon-kitchen-living"],
  ["Villa 2", "CPP08633-HDR.JPG", "villas/avalon", "avalon-kitchen-counter"],
  ["Villa 2", "CPP08608-HDR.JPG", "villas/avalon", "avalon-kitchen-portrait"],
  ["Villa 2", "CPP08641-HDR.JPG", "villas/avalon", "avalon-kitchen-shelves"],
  ["Villa 2", "CPP08793-HDR.JPG", "villas/avalon", "avalon-kitchen-tea"],
  ["Villa 2", "CPP08500-HDR.JPG", "villas/avalon", "avalon-bedroom-king"],
  ["Villa 2", "CPP08508-HDR.JPG", "villas/avalon", "avalon-bedroom-balcony"],
  ["Villa 2", "CPP08696-HDR.JPG", "villas/avalon", "avalon-bedroom-doors"],
  ["Villa 2", "CPP08653-HDR.JPG", "villas/avalon", "avalon-twin-bedroom"],
  ["Villa 2", "CPP08656-HDR.JPG", "villas/avalon", "avalon-twin-bedroom-wardrobe"],
  ["Villa 2", "CPP08799.JPG", "villas/avalon", "avalon-bedside-lamp"],
  ["Villa 2", "CPP08524-HDR.JPG", "villas/avalon", "avalon-jacuzzi-bath"],
  ["Villa 2", "CPP08528-HDR.JPG", "villas/avalon", "avalon-jacuzzi"],
  ["Villa 2", "CPP08714-HDR.JPG", "villas/avalon", "avalon-stone-bath"],
  ["Villa 2", "CPP08720-HDR.JPG", "villas/avalon", "avalon-bathroom-vanity"],

  // The entrance, shared by both villas
  ["Entrance", "CPP08288.JPG", "grounds", "entrance-gate", HERO],
  ["Entrance", "CPP08292.JPG", "grounds", "entrance-path"],

  // 360 panoramas: the width is kept at 2:1 and capped so phones can load them
  ["360", "CAM_20261001093739_0005_D copy.jpg", "tours", "acland-bedroom", PANORAMA, true],
  ["360", "CAM_20261001095716_0009_D copy.jpg", "tours", "acland-kitchen", PANORAMA, true],
  ["360", "CAM_20261001101905_0013_D copy.jpg", "tours", "acland-garden", PANORAMA, true],
  ["360", "CAM_20261001102820_0023_D copy.jpg", "tours", "avalon-living", PANORAMA, true],
  ["360", "CAM_20261001103133_0026_D copy.jpg", "tours", "avalon-cinema", PANORAMA, true],
  ["360", "CAM_20261001103335_0027_D copy.jpg", "tours", "avalon-bedroom", PANORAMA, true],
  ["360", "CAM_20261001104230_0033_D copy.jpg", "tours", "avalon-veranda", PANORAMA, true],
  ["360", "CAM_20261001132849_0050_D copy.jpg", "tours", "avalon-courtyard", PANORAMA, true],
];

async function run() {
  if (!fs.existsSync(source)) {
    throw new Error(`Missing ${source}. Put the camera originals in a "Villa" folder in the project root.`);
  }
  let done = 0;
  for (const [folder, file, dest, name, size = PHOTO, isPanorama = false] of photos) {
    const input = path.join(source, folder, file);
    const outDir = path.join(out, dest);
    fs.mkdirSync(outDir, { recursive: true });
    const pipeline = sharp(input).rotate();
    if (isPanorama) {
      pipeline.resize({ width: size, withoutEnlargement: true });
    } else {
      pipeline.resize({ width: size, height: size, fit: "inside", withoutEnlargement: true });
    }
    const info = await pipeline.webp({ quality: isPanorama ? 70 : 80, effort: 5 }).toFile(path.join(outDir, `${name}.webp`));
    done += 1;
    console.log(`${String(done).padStart(2)}/${photos.length}  ${dest}/${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
