import Link from "next/link";
import { delay } from "@/lib/motion";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-ivory">
      <div className="frame flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center">
        <p style={delay(100)} className="enter-rise eyebrow text-[0.7rem] tracking-[0.14em] text-[#6f675d]">
          Page not found
        </p>
        <h1 style={delay(250)} className="enter-rise mt-5 font-serif text-[2.7rem] leading-tight text-ink">
          We can&rsquo;t find that page.
        </h1>
        <p style={delay(450)} className="enter-rise mt-4 max-w-md text-[0.9rem] leading-relaxed text-ink-soft">
          The page you were looking for doesn&rsquo;t exist. You can head back to the home page.
        </p>
        <Link
          href="/"
          style={delay(650)}
          className="enter-rise mt-8 flex h-[2.4rem] items-center bg-gold px-8 text-[0.8rem] text-[#f7f1e4] transition-colors hover:bg-gold-hover"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
