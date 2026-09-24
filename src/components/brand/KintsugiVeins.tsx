import { useId } from "react";

type Props = {
  variant: "top-right" | "bottom-left" | "footer";
  className?: string;
};

/*
 * Hand-drawn gold "kintsugi" repair veins. Each variant is tuned to the corner
 * it decorates in the Home mockup; the gradient gives the gilded shimmer.
 */
const paths: Record<Props["variant"], { viewBox: string; main: string[]; fine: string[] }> = {
  "top-right": {
    viewBox: "0 0 110 245",
    main: [
      "M4 0 C10 14 16 22 28 30 C36 36 40 44 46 52 C50 60 48 70 54 78 C60 86 58 98 60 110 C62 120 70 126 72 138 C74 150 70 162 74 176 C78 190 84 200 86 214 C88 226 86 236 88 245",
      "M72 0 C74 10 70 20 76 30 C80 38 78 46 82 56 C86 64 84 72 88 80",
      "M60 110 C70 108 80 112 90 106 C98 102 104 104 110 100",
    ],
    fine: [
      "M28 30 C22 34 18 42 12 46",
      "M46 52 C54 50 60 54 66 50",
      "M82 56 C90 52 96 56 104 50",
      "M74 176 C66 180 62 188 56 190",
      "M86 214 C94 212 98 218 106 216",
      "M88 80 C92 90 98 94 100 104",
    ],
  },
  "bottom-left": {
    viewBox: "0 0 130 90",
    main: [
      "M0 12 C10 16 18 22 28 26 C38 30 44 36 52 44 C58 50 66 52 72 60 C78 68 88 72 96 78 C104 84 112 86 122 90",
      "M0 40 C8 44 14 50 18 60 C22 70 20 80 24 90",
    ],
    fine: [
      "M52 44 C50 54 54 62 50 72",
      "M72 60 C80 58 86 62 94 58",
      "M28 26 C30 18 26 10 30 2",
      "M18 60 C26 62 30 68 38 70",
    ],
  },
  footer: {
    viewBox: "0 0 150 150",
    main: [
      "M20 0 C24 12 20 22 24 34 C28 46 36 52 40 64 C44 74 52 80 60 86 C68 92 76 96 84 104 C92 112 100 118 112 124 C124 130 134 138 150 150",
      "M60 86 C50 90 44 96 34 100 C24 104 14 108 0 110",
      "M0 146 C10 140 18 134 26 124 C32 116 40 112 48 108",
    ],
    fine: [
      "M24 34 C16 38 10 44 2 46",
      "M40 64 C48 62 54 66 62 62",
      "M84 104 C86 94 82 86 86 78",
      "M112 124 C116 116 122 112 124 104",
      "M34 100 C36 108 32 116 36 124",
    ],
  },
};

export function KintsugiVeins({ variant, className }: Props) {
  const id = useId();
  const { viewBox, main, fine } = paths[variant];
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9a24f" />
          <stop offset="45%" stopColor="#e7c878" />
          <stop offset="75%" stopColor="#b8893a" />
          <stop offset="100%" stopColor="#d9b766" />
        </linearGradient>
      </defs>
      {main.map((d) => (
        <path key={d} d={d} stroke={`url(#${id})`} strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
      ))}
      {fine.map((d) => (
        <path
          key={d}
          d={d}
          stroke={`url(#${id})`}
          strokeWidth="0.8"
          opacity="0.85"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
