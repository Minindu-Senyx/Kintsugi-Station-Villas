import Hero from "@/components/home/Hero";
import PropertySwitcher from "@/components/home/PropertySwitcher";
import AboutIntro from "@/components/home/AboutIntro";
import VideoShowcase from "@/components/home/VideoShowcase";
import AmenitiesGrid from "@/components/home/AmenitiesGrid";
import ReviewsSection from "@/components/home/ReviewsSection";
import OffersBand from "@/components/OffersBand";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee
        text="Kandy Hill Country — Trincomalee Dutch Bay — Hosted, Not Just Rented — Sri Lanka —"
        className="bg-charcoal text-white py-4 text-sm eyebrow"
      />
      <PropertySwitcher />
      <AboutIntro />
      <VideoShowcase />
      <AmenitiesGrid />
      <ReviewsSection />
      <OffersBand />
    </>
  );
}
