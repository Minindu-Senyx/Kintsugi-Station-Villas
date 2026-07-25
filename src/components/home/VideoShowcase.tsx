import { images } from "@/lib/images";
import VideoLightbox from "@/components/VideoLightbox";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

export default function VideoShowcase() {
  return (
    <section className="bg-teal py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 text-center">
        <Reveal>
          <p className="eyebrow text-gold mb-4">A closer look</p>
          <SplitHeading
            as="h2"
            text="See the villas from above"
            className="font-display text-white text-3xl sm:text-4xl leading-tight max-w-2xl mx-auto"
          />
          <p className="mt-5 text-white/70 max-w-lg mx-auto leading-relaxed">
            A short flythrough of the grounds and gardens — full footage of
            each property to follow soon.
          </p>
        </Reveal>

        <Reveal delayMs={100} className="mt-12">
          <VideoLightbox
            posterImage={images.trincoVillaPool}
            posterAlt="Aerial view of a Kintsugi Station villa pool"
          />
        </Reveal>
      </div>
    </section>
  );
}
