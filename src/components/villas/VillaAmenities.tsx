"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Leaf,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Waves,
  Wifi,
} from "lucide-react";
import { delay } from "@/lib/motion";

export interface AmenityGroup {
  category: string;
  items: string[];
}

interface VillaAmenitiesProps {
  amenities: AmenityGroup[];
  villaSlug: string;
  villaName: string;
}

function getCategoryMeta(category: string, index: number) {
  const lower = category.toLowerCase();

  if (
    lower.includes("service") ||
    lower.includes("seclusion") ||
    lower.includes("exclusivity")
  ) {
    return {
      tag: `0${index + 1}`,
      subtitle: lower.includes("seclusion") ? "Private Sanctuary" : "Estate Hospitality",
      Icon: ShieldCheck,
      filterLabel: "Service",
    };
  }

  if (lower.includes("dining") || lower.includes("culinary")) {
    return {
      tag: `0${index + 1}`,
      subtitle: "Artisan Gastronomy",
      Icon: UtensilsCrossed,
      filterLabel: "Dining",
    };
  }

  if (lower.includes("outdoor") || lower.includes("wellness")) {
    return {
      tag: `0${index + 1}`,
      subtitle: "Restorative Living",
      Icon: Waves,
      filterLabel: "Wellness",
    };
  }

  return {
    tag: `0${index + 1}`,
    subtitle: lower.includes("nature") ? "Forest Immersion" : "Seamless Living",
    Icon: lower.includes("nature") ? Leaf : Wifi,
    filterLabel: "Comfort",
  };
}

export default function VillaAmenities({
  amenities,
  villaSlug,
  villaName,
}: VillaAmenitiesProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Amenities" },
    ...amenities.map((g, idx) => ({
      id: g.category,
      label: getCategoryMeta(g.category, idx).filterLabel,
    })),
  ];

  return (
    <section className="border-t border-[#e2dcd2] bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center">
          <p
            data-reveal="up"
            style={delay(100)}
            className="eyebrow text-[0.62rem] tracking-[0.28em] text-[#8e8578] uppercase"
          >
            Estate Amenities &amp; Inclusions
          </p>
          <h2
            data-reveal="up"
            style={delay(200)}
            className="mt-2 font-serif text-[2.2rem] text-ink sm:text-[2.6rem]"
          >
            Refined Comforts &amp; Services
          </h2>
          <span
            aria-hidden="true"
            data-reveal="line"
            style={delay(300)}
            className="mx-auto mt-4 block h-px w-14 bg-gold"
          />
          <p
            data-reveal="up"
            style={delay(350)}
            className="mx-auto mt-3 max-w-xl text-[0.88rem] text-ink-soft"
          >
            Impeccable personal service, culinary excellence, and restorative
            wellness tailored exclusively for your party at {villaName}.
          </p>
        </div>

        {/* Mobile / Tablet Quick Category Filter */}
        <div className="mt-8 flex justify-center lg:hidden">
          <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#ded7cb] bg-[#efe9df]/70 p-1">
            {filterTabs.map((tab) => {
              const active = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`rounded-full px-3.5 py-1.5 text-[0.72rem] font-medium tracking-[0.04em] transition-all duration-200 ${
                    active
                      ? "bg-ink text-white shadow-xs"
                      : "text-[#6c675e] hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Card Luxury Architectural Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((group, gIdx) => {
            const meta = getCategoryMeta(group.category, gIdx);
            const isVisible =
              selectedFilter === "all" || selectedFilter === group.category;

            return (
              <div
                key={group.category}
                data-reveal="up"
                style={delay(100 + gIdx * 90)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[3px] border border-[#e4ded3] bg-[#faf8f4] p-6 lg:p-7 shadow-[0_2px_12px_rgba(12,16,14,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:bg-white hover:shadow-[0_16px_36px_rgba(12,16,14,0.07)] ${
                  !isVisible ? "hidden lg:flex" : "flex"
                }`}
              >
                {/* Gold Top Hairline Indicator */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gold/20 transition-all duration-500 group-hover:bg-gold" />

                <div className="flex flex-col">
                  {/* Category Header Top Row: Icon + Subtitle + Tag */}
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#e2dbce] bg-[#f2ece1] text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-[#1c1d1a]">
                        <meta.Icon className="size-4" strokeWidth={1.8} />
                      </div>
                      <span className="eyebrow text-[0.62rem] font-medium tracking-[0.18em] text-[#8e8578] uppercase">
                        {meta.subtitle}
                      </span>
                    </div>
                    <span className="font-serif text-[0.76rem] font-medium text-gold/90">
                      {meta.tag}
                    </span>
                  </div>

                  {/* Category Title: Fixed uniform height + single-line guarantee */}
                  <div className="flex h-10 items-center">
                    <h3 className="font-serif text-[1.08rem] font-normal tracking-[0.01em] text-ink whitespace-nowrap xl:text-[1.12rem]">
                      {group.category}
                    </h3>
                  </div>

                  {/* Cohesive Divider Line - exactly the same vertical coordinate across all cards */}
                  <div className="mb-4 h-px w-full bg-[#e6dfd3]" />

                  {/* List of Amenities with Synchronized Row Heights */}
                  <ul className="flex flex-col divide-y divide-[#ece6dc]/70">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex min-h-[3.25rem] items-start gap-2.5 py-2.5"
                      >
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                          <Check className="size-2.5 stroke-[2.5]" />
                        </span>
                        <span className="text-[0.83rem] leading-snug text-[#3c3e3b] transition-colors group-hover:text-ink">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subtle Card Footer Accent */}
                <div className="mt-4 pt-3 text-right">
                  <span className="text-[0.68rem] tracking-[0.12em] text-[#a49d91] uppercase transition-colors group-hover:text-gold">
                    Included with Stay
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Concierge & Bespoke Service Reassurance Strip */}
        <div
          data-reveal="up"
          style={delay(450)}
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[2px] border border-[#e2dbce] bg-[#f5f1ea] px-6 py-5 sm:flex-row sm:px-8"
        >
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Sparkles className="size-4" />
            </div>
            <div>
              <p className="text-[0.82rem] leading-relaxed text-ink-soft">
                <strong className="font-medium text-ink">
                  Tailored Hospitality &amp; Private Requests:
                </strong>{" "}
                Custom dietary requirements, private dining menus, wellness sessions, and guided mountain excursions can be pre-arranged with your estate host.
              </p>
            </div>
          </div>
          <Link
            href={`/contact?villa=${villaSlug}#inquiry`}
            className="sheen group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[2px] bg-ink px-5 py-2.5 text-[0.76rem] font-medium tracking-[0.08em] text-white transition-all hover:bg-gold hover:text-[#1c1d1a]"
          >
            <span>Inquire with Host</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
