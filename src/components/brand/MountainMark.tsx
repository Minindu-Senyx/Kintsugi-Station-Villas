type Props = {
  className?: string;
};

/** Outlined twin-peak mark with inner ridges (About header/footer, Contact footer). */
export function MountainMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 112 52"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2 50 L30 26 L40 32 L62 3 L110 50 Z" strokeWidth="2.4" />
      <path d="M30 26 L20 50" strokeWidth="1.2" />
      <path d="M62 3 L55 20 L60 24 L52 36 L58 40 L50 50" strokeWidth="1.2" />
      <path d="M62 3 L70 22 L66 28 L78 44" strokeWidth="1.2" />
      <path d="M40 32 L46 38 L43 44" strokeWidth="1.2" />
      <path d="M8 45 H104" strokeWidth="1" />
    </svg>
  );
}

/** A single hairline ridge drawn above the Gallery wordmark. */
export function RidgeLine({ className }: Props) {
  return (
    <svg
      viewBox="0 0 92 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 15 L22 6 L30 9 L42 1 L55 9 L63 7 L70 11 L91 15" />
      <path d="M52 8 L60 11 L66 10" opacity="0.7" />
    </svg>
  );
}
