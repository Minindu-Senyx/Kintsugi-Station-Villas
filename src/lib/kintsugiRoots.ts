export type RootVariant = "top-right" | "bottom-left" | "footer" | "footer-mobile" | "founders";

/*
 * Gilded "kintsugi" roots. Each variant grows a small root system from the
 * edges of the corner it decorates: a tapered main root that meanders, forks
 * into thinner laterals and sheds fine root hairs. Roots bend around "avoid"
 * boxes (in viewBox units) the way real roots grow around stones, which keeps
 * them clear of nearby text. Growth uses a seeded PRNG, so the server and
 * build always produces the exact same shapes.
 */

type Node = { x: number; y: number; w: number };
// `pull` is how firmly a root holds its heading (higher = straighter runs);
// `toward` makes it steer at a point instead of a fixed angle; `taper` below 1
// keeps a long root thick for more of its length.
type Root = {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  depth: number;
  pull?: number;
  toward?: { x: number; y: number };
  taper?: number;
};
type Box = { x0: number; y0: number; x1: number; y1: number };
type Spec = {
  seed: number;
  width: number;
  height: number;
  align: string;
  dark: boolean;
  roots: Root[];
  avoid?: Box[];
};

const specs: Record<RootVariant, Spec> = {
  // Home "Reserve" band. The content frame's right edge sits at x = 110; the
  // rest of the canvas runs across the right-hand margin on wide screens.
  "top-right": {
    seed: 7,
    width: 590,
    height: 245,
    align: "xMinYMin",
    dark: false,
    roots: [
      { x: 26, y: -4, angle: 1.4, length: 275, width: 2.5, depth: 3 },
      { x: 84, y: -4, angle: 1.8, length: 105, width: 1.5, depth: 2 },
      { x: 594, y: 150, angle: Math.PI, length: 540, width: 2.2, depth: 3, pull: 0.1, toward: { x: 70, y: 150 }, taper: 0.4 },
      { x: 330, y: -4, angle: 1.3, length: 250, width: 2.3, depth: 3 },
      { x: 594, y: 40, angle: 2.6, length: 320, width: 1.8, depth: 2, pull: 0.08, toward: { x: 300, y: 240 }, taper: 0.6 },
    ],
    avoid: [{ x0: -999, y0: -999, x1: 14, y1: 999 }], // rates column
  },
  "bottom-left": {
    seed: 21,
    width: 130,
    height: 90,
    align: "xMinYMax",
    dark: false,
    roots: [
      { x: -4, y: 10, angle: 0.52, length: 170, width: 2.3, depth: 3 },
      { x: -4, y: 50, angle: 0.95, length: 62, width: 1.4, depth: 2 },
    ],
  },
  // Desktop footer. The canvas is 40rem wide with its right edge 10rem inside
  // the content frame (frame edge at x = 480), so on wide screens the roots
  // run out across the whole side margin and past the viewport edge.
  footer: {
    seed: 42,
    width: 640,
    height: 230,
    align: "xMaxYMin",
    dark: true,
    roots: [
      { x: 506, y: -4, angle: 1.5, length: 240, width: 3, depth: 3, pull: 0.07 },
      { x: -4, y: 124, angle: 0, length: 650, width: 2.8, depth: 3, pull: 0.1, toward: { x: 624, y: 124 }, taper: 0.35 },
      { x: 330, y: -4, angle: 1.95, length: 260, width: 2.5, depth: 3 },
      { x: -4, y: 196, angle: 0, length: 540, width: 2, depth: 2, pull: 0.1, toward: { x: 520, y: 200 }, taper: 0.45 },
      { x: 150, y: -4, angle: 1.3, length: 150, width: 1.8, depth: 2 },
    ],
    avoid: [
      { x0: 528, y0: 26, x1: 999, y1: 108 }, // wordmark
      { x0: 528, y0: 142, x1: 999, y1: 999 }, // copyright row
      { x0: 632, y0: -999, x1: 999, y1: 999 }, // contact columns
    ],
  },
  // About "The Founders", beside the bio. The roots grow down out of the "Our
  // Story" photo that ends at the section's top edge, and in from the right.
  // The content frame's right edge sits at x = 288; the rest of the canvas
  // runs across the right-hand margin on wide screens.
  founders: {
    seed: 5,
    width: 768,
    height: 374,
    align: "xMinYMin",
    dark: false,
    roots: [
      { x: 100, y: -4, angle: 1.5, length: 300, width: 2.5, depth: 3 },
      { x: 160, y: -4, angle: 1.9, length: 120, width: 1.5, depth: 2 },
      { x: 772, y: 170, angle: Math.PI, length: 740, width: 2.2, depth: 3, pull: 0.1, toward: { x: 60, y: 250 }, taper: 0.4 },
      { x: 250, y: -4, angle: 1.35, length: 250, width: 2.2, depth: 3 },
      { x: 460, y: -4, angle: 1.8, length: 280, width: 2, depth: 2 },
      { x: 772, y: 40, angle: 2.6, length: 360, width: 1.8, depth: 2, pull: 0.08, toward: { x: 380, y: 360 }, taper: 0.6 },
    ],
    avoid: [{ x0: -999, y0: -999, x1: 44, y1: 999 }], // bio column, plus ~1.75rem of air
  },
  // Stacked mobile footer: tucked into the empty top-right corner.
  "footer-mobile": {
    seed: 11,
    width: 144,
    height: 320,
    align: "xMaxYMin",
    dark: true,
    roots: [
      { x: 104, y: -4, angle: 1.68, length: 360, width: 2.6, depth: 3 },
      { x: 148, y: 150, angle: 2.55, length: 90, width: 1.4, depth: 2 },
    ],
    avoid: [
      { x0: -999, y0: -999, x1: 16, y1: 999 },
      { x0: 138, y0: 8, x1: 999, y1: 999 },
    ],
  },
};

const STEP = 2.4;

function prng(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function grow(rand: () => number, root: Root, avoid: Box[], out: Node[][]) {
  const blocked = (px: number, py: number) => avoid.some((b) => px > b.x0 && px < b.x1 && py > b.y0 && py < b.y1);
  const steps = Math.max(4, Math.round(root.length / STEP));
  const nodes: Node[] = [];
  let { x, y, angle } = root;
  let bend = 0;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Thick at the base, tapering to a hair-fine tip.
    const w = root.width * Math.pow(1 - t, root.taper ?? 1.15) + 0.08;
    nodes.push({ x, y, w });
    if (i === steps) break;

    // Smoothed random bend, gently pulled back toward the root's heading.
    bend = bend * 0.8 + (rand() - 0.5) * 0.15;
    const heading = root.toward ? Math.atan2(root.toward.y - y, root.toward.x - x) : root.angle;
    const drift = Math.atan2(Math.sin(heading - angle), Math.cos(heading - angle));
    angle += bend + drift * (root.pull ?? 0.035);

    // Feel ahead; if the path runs into an obstacle, turn toward the clear side.
    const LOOK = 6;
    if (blocked(x + Math.cos(angle) * LOOK, y + Math.sin(angle) * LOOK)) {
      const leftClear = !blocked(x + Math.cos(angle - 0.6) * LOOK, y + Math.sin(angle - 0.6) * LOOK);
      const rightClear = !blocked(x + Math.cos(angle + 0.6) * LOOK, y + Math.sin(angle + 0.6) * LOOK);
      angle += rightClear && !leftClear ? 0.35 : leftClear && !rightClear ? -0.35 : bend >= 0 ? 0.35 : -0.35;
      bend = 0;
    }
    x += Math.cos(angle) * STEP;
    y += Math.sin(angle) * STEP;

    if (i < 3 || t > 0.9) continue;
    const r = rand();
    const side = rand() < 0.5 ? -1 : 1;
    if (root.depth > 0 && r < 2.6 / steps) {
      grow(
        rand,
        {
          x,
          y,
          angle: angle + side * (0.4 + rand() * 0.6),
          length: root.length * (1 - t) * (0.4 + rand() * 0.35),
          width: w * (0.5 + rand() * 0.2),
          depth: root.depth - 1,
        },
        avoid,
        out,
      );
    } else if (r > 0.935 && w > 0.3) {
      // Fine root hairs.
      grow(
        rand,
        { x, y, angle: angle + side * (0.7 + rand() * 0.7), length: 2.5 + rand() * 7, width: Math.min(w * 0.45, 0.45), depth: 0 },
        avoid,
        out,
      );
    }
  }
  out.push(nodes);
}

const f = (n: number) => n.toFixed(1);

/** Outline of a tapered stroke; every ribbon winds the same way, so overlaps fill cleanly. */
function ribbon(nodes: Node[], scale: number) {
  const left: string[] = [];
  const right: string[] = [];
  nodes.forEach((p, i) => {
    const a = nodes[Math.max(0, i - 1)];
    const b = nodes[Math.min(nodes.length - 1, i + 1)];
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const nx = -(b.y - a.y) / len;
    const ny = (b.x - a.x) / len;
    const h = (p.w * scale) / 2;
    left.push(`${f(p.x + nx * h)} ${f(p.y + ny * h)}`);
    right.push(`${f(p.x - nx * h)} ${f(p.y - ny * h)}`);
  });
  return `M${left.join("L")}L${right.reverse().join("L")}Z`;
}

const cache = new Map<RootVariant, { body: string; shine: string }>();

function shapes(variant: RootVariant) {
  const hit = cache.get(variant);
  if (hit) return hit;
  const spec = specs[variant];
  const rand = prng(spec.seed);
  const branches: Node[][] = [];
  spec.roots.forEach((root) => grow(rand, root, spec.avoid ?? [], branches));
  const result = {
    body: branches.map((b) => ribbon(b, 1)).join(""),
    // A narrow highlight down the heavier roots gives the gilt its sheen.
    shine: branches
      .filter((b) => b[0].w > 0.9)
      .map((b) => ribbon(b.filter((n) => n.w > 0.45), 0.32))
      .join(""),
  };
  cache.set(variant, result);
  return result;
}

export const rootVariants = Object.keys(specs) as RootVariant[];

/** Canvas size in viewBox units (1 unit = 1/16 rem), for sizing the image. */
export const rootSize = (variant: RootVariant) => ({ width: specs[variant].width, height: specs[variant].height });

/** Standalone SVG document for a variant, served from /roots/<variant>.svg. */
export function rootsSvg(variant: RootVariant) {
  const { width, height, align, dark } = specs[variant];
  const { body, shine } = shapes(variant);
  const shadow = dark
    ? '<feDropShadow dx="0" dy="0" stdDeviation="1.1" flood-color="#e0bb62" flood-opacity="0.3"/>'
    : '<feDropShadow dx="0.3" dy="0.45" stdDeviation="0.35" flood-color="#6b4a12" flood-opacity="0.3"/>';
  const stops = [
    [0, "#9a7229"],
    [0.16, "#d9b25e"],
    [0.3, "#f4dc93"],
    [0.46, "#b8893a"],
    [0.62, "#e6c676"],
    [0.8, "#a67c31"],
    [1, "#dcb865"],
  ]
    .map(([offset, color]) => `<stop offset="${offset}" stop-color="${color}"/>`)
    .join("");

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="${align} meet">` +
    `<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${width}" y2="${height}">${stops}</linearGradient>` +
    `<filter id="d" x="-10%" y="-10%" width="120%" height="120%">${shadow}</filter></defs>` +
    `<g filter="url(#d)"><path d="${body}" fill="url(#g)"/><path d="${shine}" fill="#fff3cc" opacity="0.5"/></g>` +
    `</svg>`
  );
}
