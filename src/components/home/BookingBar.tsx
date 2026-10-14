"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  BedDouble,
  CalendarCheck2,
  CalendarX2,
  Check,
  ChevronDown,
  UserRound,
} from "lucide-react";
import { airbnbListings, airbnbUrl, type ListingKey } from "@/lib/booking";

const formatDate = (value: string) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Select date";

interface VillaOption {
  value: ListingKey;
  name: string;
  badge: string;
  desc: string;
  maxGuests: number;
}

const villaOptions: VillaOption[] = [
  {
    value: "avalon",
    name: "Avalon Villa",
    badge: "3 Bedrooms · Sleeps 6",
    desc: "Hillside villa with a hot tub and cinema room",
    maxGuests: airbnbListings.avalon.sleeps,
  },
  {
    value: "acland",
    name: "Villa Acland",
    badge: "1 Bedroom · Sleeps 2",
    desc: "A private retreat for two, with two balconies",
    maxGuests: airbnbListings.acland.sleeps,
  },
  {
    value: "both",
    name: "Both Villas",
    badge: "4 Bedrooms · Sleeps 8",
    desc: "Avalon and Acland together, for larger groups",
    maxGuests: airbnbListings.both.sleeps,
  },
];

const divider = (
  <span
    aria-hidden="true"
    className="hidden h-[2.5rem] w-px bg-[#e2dcd2] lg:block"
  />
);

export default function BookingBar() {
  const [villa, setVilla] = useState<ListingKey>("avalon");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const [openDropdown, setOpenDropdown] = useState<"villa" | "guests" | null>(
    null
  );
  const containerRef = useRef<HTMLFormElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const villaButtonRef = useRef<HTMLButtonElement>(null);
  const guestButtonRef = useRef<HTMLButtonElement>(null);
  const villaPanelId = useId();
  const guestPanelId = useId();

  const today = new Date().toISOString().slice(0, 10);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    // Escape closes the open list and hands focus back to the button that opened it.
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && openDropdown) {
        (openDropdown === "villa" ? villaButtonRef : guestButtonRef).current?.focus();
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDropdown]);

  const openPicker = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      e.currentTarget.showPicker?.();
    } catch {
      // showPicker fallback
    }
  };

  // Booking happens on Airbnb: open the chosen listing with these dates and guests filled in.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = airbnbUrl(villa, { checkIn, checkOut, guests: Number(guests) });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const selectedVillaObj =
    villaOptions.find((v) => v.value === villa) || villaOptions[0];
  const guestOptions = Array.from({ length: selectedVillaObj.maxGuests }, (_, i) => String(i + 1));

  return (
    <form
      ref={containerRef}
      onSubmit={submit}
      aria-label="Check availability"
      className="relative flex flex-col divide-y divide-[#e2dcd2] rounded-[3px] bg-[#f6f3ef] shadow-[0_8px_30px_rgba(0,0,0,0.18)] lg:h-[4.0625rem] lg:flex-row lg:items-center lg:divide-y-0"
    >
      {/* Villa Selector */}
      <div
        className="group relative flex h-full flex-1 items-center"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null) && openDropdown === "villa") setOpenDropdown(null);
        }}
      >
        <button
          ref={villaButtonRef}
          type="button"
          aria-expanded={openDropdown === "villa"}
          aria-controls={openDropdown === "villa" ? villaPanelId : undefined}
          onClick={() =>
            setOpenDropdown(openDropdown === "villa" ? null : "villa")
          }
          className="flex h-full w-full cursor-pointer items-center gap-[0.75rem] px-5 py-3 text-left transition-colors duration-200 hover:bg-[#ede7df] lg:py-0 lg:pl-[1.2rem] lg:pr-[1.3rem]"
        >
          <span className="text-[#2d2e2c] transition-colors duration-300 group-hover:text-gold">
            <BedDouble className="size-[1rem]" strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.78rem] text-[#2b2c2a] whitespace-nowrap">Villa</span>
            <span className="mt-[0.35rem] font-medium text-[0.72rem] text-[#4a4a48] whitespace-nowrap">
              {selectedVillaObj.name}
            </span>
          </span>
          <ChevronDown
            className={`ml-auto size-[0.8rem] text-[#3a3a38] transition-transform duration-300 ease-soft ${
              openDropdown === "villa"
                ? "rotate-180 text-gold"
                : "group-hover:translate-y-[0.1rem]"
            }`}
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </button>

        {/* Custom Villa Dropdown Menu */}
        {openDropdown === "villa" && (
          <div
            id={villaPanelId}
            role="group"
            aria-label="Choose a villa"
            className="enter-rise absolute left-0 top-[calc(100%+0.35rem)] z-50 w-full min-w-[17.5rem] rounded-[3px] border border-[#e0dad0] bg-[#fbf9f5] p-1.5 shadow-[0_12px_36px_rgba(20,24,21,0.18)]"
          >
            <div className="px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[#726858]">
              Select Sanctuary
            </div>
            <div className="space-y-1">
              {villaOptions.map((opt) => {
                const isSelected = opt.value === villa;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setVilla(opt.value);
                      // A smaller villa can't take the party we'd picked for a larger one.
                      if (Number(guests) > opt.maxGuests) setGuests(String(opt.maxGuests));
                      setOpenDropdown(null);
                    }}
                    className={`group/opt flex w-full cursor-pointer items-start justify-between rounded-[2px] px-2.5 py-2 text-left transition-colors ${
                      isSelected
                        ? "bg-[#ede5d8] text-ink"
                        : "hover:bg-[#f2ece2] text-[#3e3f3d]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-serif text-[0.88rem] ${
                            isSelected ? "font-semibold text-ink" : "text-ink"
                          }`}
                        >
                          {opt.name}
                        </span>
                        <span className="rounded-[2px] bg-black/5 px-1.5 py-0.5 text-[0.7rem] tracking-[0.04em] text-[#7a6b52]">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[0.7rem] text-[#6b6760]">
                        {opt.desc}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="mt-1 size-3.5 shrink-0 text-[#8e6b2c]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {divider}

      {/* Check-in Field */}
      <label className="group relative flex h-full flex-1 cursor-pointer items-center gap-[0.65rem] px-5 py-3 transition-colors duration-200 hover:bg-[#ede7df] lg:py-0 lg:pl-[1.15rem] lg:pr-[1.15rem]">
        <span className="text-[#2d2e2c] transition-colors duration-300 group-hover:text-gold shrink-0">
          <CalendarCheck2 className="size-[1rem]" strokeWidth={1.5} />
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[0.78rem] text-[#2b2c2a] whitespace-nowrap">Check-in</span>
          <span className="mt-[0.35rem] font-medium text-[0.72rem] text-[#4a4a48] whitespace-nowrap">
            {formatDate(checkIn)}
          </span>
        </span>
        <ChevronDown
          className="ml-auto size-[0.8rem] text-[#3a3a38] transition-transform duration-300 ease-soft group-hover:translate-y-[0.1rem] shrink-0"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <input
          ref={dateInputRef}
          type="date"
          aria-label="Check-in date"
          min={today}
          value={checkIn}
          onClick={openPicker}
          onChange={(e) => {
            setCheckIn(e.target.value);
            if (checkOut && e.target.value >= checkOut) setCheckOut("");
          }}
          className="picker-input absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>

      {divider}

      {/* Check-out Field */}
      <label className="group relative flex h-full flex-1 cursor-pointer items-center gap-[0.65rem] px-5 py-3 transition-colors duration-200 hover:bg-[#ede7df] lg:py-0 lg:pl-[1.15rem] lg:pr-[1.15rem]">
        <span className="text-[#2d2e2c] transition-colors duration-300 group-hover:text-gold shrink-0">
          <CalendarX2 className="size-[1rem]" strokeWidth={1.5} />
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[0.78rem] text-[#2b2c2a] whitespace-nowrap">Check-out</span>
          <span className="mt-[0.35rem] font-medium text-[0.72rem] text-[#4a4a48] whitespace-nowrap">
            {formatDate(checkOut)}
          </span>
        </span>
        <ChevronDown
          className="ml-auto size-[0.8rem] text-[#3a3a38] transition-transform duration-300 ease-soft group-hover:translate-y-[0.1rem] shrink-0"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <input
          type="date"
          aria-label="Check-out date"
          min={checkIn || today}
          value={checkOut}
          onClick={openPicker}
          onChange={(e) => setCheckOut(e.target.value)}
          className="picker-input absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>

      {divider}

      {/* Guests Selector */}
      <div
        className="group relative flex h-full flex-1 items-center"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null) && openDropdown === "guests") setOpenDropdown(null);
        }}
      >
        <button
          ref={guestButtonRef}
          type="button"
          aria-expanded={openDropdown === "guests"}
          aria-controls={openDropdown === "guests" ? guestPanelId : undefined}
          onClick={() =>
            setOpenDropdown(openDropdown === "guests" ? null : "guests")
          }
          className="flex h-full w-full cursor-pointer items-center gap-[0.65rem] px-5 py-3 text-left transition-colors duration-200 hover:bg-[#ede7df] lg:py-0 lg:pl-[1.15rem] lg:pr-[1.15rem]"
        >
          <span className="text-[#2d2e2c] transition-colors duration-300 group-hover:text-gold shrink-0">
            <UserRound className="size-[1.05rem]" strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.78rem] text-[#2b2c2a] whitespace-nowrap">Guests</span>
            <span className="mt-[0.35rem] font-medium text-[0.72rem] text-[#4a4a48] whitespace-nowrap">
              {guests} {guests === "1" ? "guest" : "guests"}
            </span>
          </span>
          <ChevronDown
            className={`ml-auto size-[0.8rem] text-[#3a3a38] transition-transform duration-300 ease-soft shrink-0 ${
              openDropdown === "guests"
                ? "rotate-180 text-gold"
                : "group-hover:translate-y-[0.1rem]"
            }`}
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </button>

        {/* Custom Guests Dropdown Menu */}
        {openDropdown === "guests" && (
          <div
            id={guestPanelId}
            role="group"
            aria-label="Number of guests"
            className="enter-rise absolute left-0 top-[calc(100%+0.35rem)] z-50 w-full min-w-[13rem] rounded-[3px] border border-[#e0dad0] bg-[#fbf9f5] p-1.5 shadow-[0_12px_36px_rgba(20,24,21,0.18)]"
          >
            <div className="px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[#726858]">
              Party Size (Up to {selectedVillaObj.maxGuests})
            </div>
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-1">
              {guestOptions.map((n) => {
                const isSelected = n === guests;
                return (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setGuests(n);
                      setOpenDropdown(null);
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-[2px] px-2.5 py-1.5 text-left text-[0.78rem] transition-colors ${
                      isSelected
                        ? "bg-[#ede5d8] font-medium text-[#7a591e]"
                        : "hover:bg-[#f2ece2] text-[#3e3f3d]"
                    }`}
                  >
                    <span>
                      {n} {n === "1" ? "guest" : "guests"}
                    </span>
                    {isSelected && (
                      <Check className="size-3.5 text-[#8e6b2c]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {divider}

      {/* Submit Button */}
      <div className="p-4 lg:px-[1.15rem] lg:py-0 lg:pl-[1.25rem] lg:shrink-0">
        <button
          type="submit"
          className="sheen flex h-[2.35rem] w-full items-center justify-center bg-gold text-[0.78rem] font-medium text-[#f7f1e4] shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-colors hover:bg-gold-hover lg:w-[8rem] whitespace-nowrap"
        >
          Book on Airbnb
        </button>
      </div>
    </form>
  );
}
