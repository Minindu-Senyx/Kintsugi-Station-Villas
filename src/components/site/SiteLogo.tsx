import Link from "next/link";

/** Hairline mountain ridge drawn above the wordmark. */
function RidgeLine({ className }: { className?: string }) {
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

const tones = {
  light: { ridge: "text-[#a88d4a]", name: "text-[#191b1a]", tagline: "text-[#7d7466]" },
  dark: { ridge: "text-[#b9ab8a]", name: "text-[#eae5d5]", tagline: "text-[#9a9b8b]" },
};

/** Centred wordmark: ridge line, name and tagline. */
export default function SiteLogo({ tone = "light", className = "" }: { tone?: keyof typeof tones; className?: string }) {
  const colors = tones[tone];
  return (
    <Link
      href="/"
      aria-label="Kintsugi Station, Kandy — home"
      className={`flex w-fit shrink-0 flex-col items-center whitespace-nowrap leading-none ${className}`}
    >
      <RidgeLine className={`h-[0.95rem] w-[5.75rem] ${colors.ridge}`} />
      <span className={`mt-[0.8rem] font-serif text-[1.02rem] tracking-[0.1em] ${colors.name}`}>
        KINTSUGI STATION · KANDY
      </span>
      <span className={`mt-[0.55rem] font-serif text-[0.52rem] tracking-[0.24em] ${colors.tagline}`}>
        A PRIVATE VILLA IN SRI LANKA
      </span>
    </Link>
  );
}
