import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicVillasDir = path.join(root, "public", "assets", "images", "villas");
const publicVideosDir = path.join(root, "public", "assets", "videos");

const avalonSource = path.join(root, "Avalon Villa Property Photography-20261001T025225Z-1-001", "Avalon Villa Property Photography");
const aclandSource = path.join(root, "Villa Acland at Avalon Villa Property Photography-20261001T025225Z-1-001", "Villa Acland at Avalon Villa Property Photography");

fs.mkdirSync(path.join(publicVillasDir, "avalon"), { recursive: true });
fs.mkdirSync(path.join(publicVillasDir, "acland"), { recursive: true });
fs.mkdirSync(publicVideosDir, { recursive: true });

async function processImage(inputPath, outputPath, maxWidth = 1920, quality = 85) {
  try {
    const image = sharp(inputPath);
    const meta = await image.metadata();
    
    // Resize down if wider than maxWidth, keep aspect ratio
    if (meta.width && meta.width > maxWidth) {
      await image
        .resize({ width: maxWidth, withoutEnlargement: true })
        .jpeg({ quality, progressive: true })
        .toFile(outputPath);
    } else {
      await image
        .jpeg({ quality, progressive: true })
        .toFile(outputPath);
    }
    console.log(`✓ Processed: ${path.basename(outputPath)}`);
  } catch (err) {
    console.error(`✗ Error processing ${inputPath}:`, err.message);
  }
}

async function run() {
  console.log("Processing Avalon Villa photos...");
  const avalonShortlist = path.join(avalonSource, "Avalon Villa Shortlist");

  // Avalon Key Highlights
  const avalonMap = [
    // Exterior & Hero
    { in: path.join(avalonShortlist, "P exterior pic (1).jpeg"), out: "avalon-hero.jpg", width: 2200 },
    { in: path.join(avalonShortlist, "P exterior pic (3).jpeg"), out: "avalon-exterior-pool.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "IMG_7784.JPG"), out: "avalon-pavilion-view.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "IMG_7785.JPG"), out: "avalon-pool-loungers.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "IMG_7874.JPG"), out: "avalon-deck-panoramic.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "IMG_7909b.jpg"), out: "avalon-living-overview.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "IMG_7802.JPG"), out: "avalon-sun-terrace.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "IMG_7875.JPG"), out: "avalon-dining-patio.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "IMG_7876.JPG"), out: "avalon-dining-interior.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "IMG_7944.JPG"), out: "avalon-lounge-interior.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "IMG_7946.JPG"), out: "avalon-kitchen-bar.jpg", width: 1920 },

    // Bedroom 1 (Master Suite)
    { in: path.join(avalonShortlist, "B1 Shortlist", "IMG_7772.JPG"), out: "avalon-b1-master.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "B1 Shortlist", "IMG_7773.JPG"), out: "avalon-b1-bed-detail.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "B1 Shortlist", "IMG_7775.JPG"), out: "avalon-b1-balcony.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "B1 Shortlist", "IMG_7933.JPG"), out: "avalon-b1-ensuite.jpg", width: 1920 },

    // Bedroom 2 (Valley Suite)
    { in: path.join(avalonShortlist, "B2 Shortlist", "IMG_7790.JPG"), out: "avalon-b2-room.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "B2 Shortlist", "IMG_7796.JPG"), out: "avalon-b2-window.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "B2 Shortlist", "IMG_7929.JPG"), out: "avalon-b2-ensuite.jpg", width: 1920 },

    // Bedroom 3 (Ridge Suite)
    { in: path.join(avalonShortlist, "B3 Shortlist", "IMG_7886.JPG"), out: "avalon-b3-room.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "B3 Shortlist", "IMG_7898.JPG"), out: "avalon-b3-bed.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "B3 Shortlist", "IMG_7899.JPG"), out: "avalon-b3-detail.jpg", width: 1920 },
    { in: path.join(avalonShortlist, "B3 Shortlist", "IMG_7984.JPG"), out: "avalon-b3-ensuite.jpg", width: 1920 },
  ];

  for (const item of avalonMap) {
    if (fs.existsSync(item.in)) {
      await processImage(item.in, path.join(publicVillasDir, "avalon", item.out), item.width);
    } else {
      console.warn("Missing file:", item.in);
    }
  }

  // Teaser Video
  const videoSrc = path.join(avalonSource, "Avalon_Villa_Teaser_Video.mp4");
  const videoDest = path.join(publicVideosDir, "avalon-teaser.mp4");
  if (fs.existsSync(videoSrc)) {
    fs.copyFileSync(videoSrc, videoDest);
    console.log("✓ Copied Avalon Teaser Video to public/assets/videos/avalon-teaser.mp4");
  }

  console.log("\nProcessing Villa Acland photos...");
  const aclandMap = [
    // Exterior & Grounds
    { in: path.join(aclandSource, "P exterior pic (2).jpeg"), out: "acland-hero.jpg", width: 2200 },
    { in: path.join(aclandSource, "IMG_7808.JPG"), out: "acland-exterior-veranda.jpg", width: 1920 },
    { in: path.join(aclandSource, "IMG_7810.JPG"), out: "acland-garden-terrace.jpg", width: 1920 },
    { in: path.join(aclandSource, "IMG_7812.JPG"), out: "acland-pathway-foliage.jpg", width: 1920 },
    { in: path.join(aclandSource, "IMG_7814.JPG"), out: "acland-veranda-lounge.jpg", width: 1920 },
    { in: path.join(aclandSource, "IMG_7820.JPG"), out: "acland-deck-view.jpg", width: 1920 },
    { in: path.join(aclandSource, "IMG_7826.JPG"), out: "acland-living-room.jpg", width: 1920 },
    { in: path.join(aclandSource, "IMG_7844.JPG"), out: "acland-dining-space.jpg", width: 1920 },
    { in: path.join(aclandSource, "IMG_7851.JPG"), out: "acland-veranda-patio.jpg", width: 1920 },
    { in: path.join(aclandSource, "IMG_7961.JPG"), out: "acland-stone-architecture.jpg", width: 1920 },
    { in: path.join(aclandSource, "IMG_7963.JPG"), out: "acland-hillside-canopy.jpg", width: 1920 },

    // Bedroom Suite
    { in: path.join(aclandSource, "Villa Acland Shortlist", "Villa Acland Bedroom Shortlist", "IMG_7829b.jpg"), out: "acland-bedroom-suite.jpg", width: 1920 },
    { in: path.join(aclandSource, "Villa Acland Shortlist", "Villa Acland Bedroom Shortlist", "IMG_7832.JPG"), out: "acland-bedroom-bed.jpg", width: 1920 },
    { in: path.join(aclandSource, "Villa Acland Shortlist", "Villa Acland Bedroom Shortlist", "IMG_7834.JPG"), out: "acland-bedroom-lighting.jpg", width: 1920 },
    { in: path.join(aclandSource, "Villa Acland Shortlist", "Villa Acland Bedroom Shortlist", "IMG_7837.JPG"), out: "acland-bedroom-artisan-desk.jpg", width: 1920 },
    { in: path.join(aclandSource, "Villa Acland Shortlist", "Villa Acland Bedroom Shortlist", "IMG_7838.JPG"), out: "acland-bedroom-teak.jpg", width: 1920 },
    { in: path.join(aclandSource, "Villa Acland Shortlist", "Villa Acland Bedroom Shortlist", "IMG_7958.JPG"), out: "acland-ensuite-vanity.jpg", width: 1920 },
    { in: path.join(aclandSource, "Villa Acland Shortlist", "Villa Acland Bedroom Shortlist", "IMG_7959.JPG"), out: "acland-stone-bath.jpg", width: 1920 },
  ];

  for (const item of aclandMap) {
    if (fs.existsSync(item.in)) {
      await processImage(item.in, path.join(publicVillasDir, "acland", item.out), item.width);
    } else {
      console.warn("Missing file:", item.in);
    }
  }

  console.log("\nImage processing completed successfully!");
}

run();
