import Link from "next/link";
import HomeHeader from "@/components/home/HomeHeader";
import HomeFooter from "@/components/home/HomeFooter";

export default function NotFound() {
  return (
    <>
      <HomeHeader />
      <main className="bg-ivory">
        <div className="frame flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center">
          <p className="eyebrow text-[0.66rem] tracking-[0.14em] text-[#8e8578]">Page not found</p>
          <h1 className="mt-5 font-serif text-[2.7rem] leading-tight text-ink">This path has faded into the mist.</h1>
          <p className="mt-4 max-w-md text-[0.9rem] leading-relaxed text-ink-soft">
            The page you were looking for doesn&rsquo;t exist. Let us guide you back to the estate.
          </p>
          <Link
            href="/"
            className="mt-8 flex h-[2.4rem] items-center bg-gold px-8 text-[0.8rem] text-[#f7f1e4] transition-colors hover:bg-[#8f6d31]"
          >
            Return Home
          </Link>
        </div>
      </main>
      <HomeFooter />
    </>
  );
}
