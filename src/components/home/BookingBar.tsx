"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { airbnbListings, airbnbUrl, type ListingKey } from "@/lib/booking";

const formatDate = (value: string) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "Select date";

type VillaOption = { value: ListingKey; name: string; detail: string; maxGuests: number };

const villaOptions: VillaOption[] = [
  { value: "avalon", name: "Avalon Villa", detail: "3 bedrooms · sleeps 6", maxGuests: airbnbListings.avalon.sleeps },
  { value: "acland", name: "Villa Acland", detail: "1 bedroom · sleeps 2", maxGuests: airbnbListings.acland.sleeps },
  { value: "both", name: "Both Villas", detail: "4 bedrooms · sleeps 8", maxGuests: airbnbListings.both.sleeps },
];

const fieldClass =
  "relative flex h-full flex-1 items-center border-[#e2dcd2] max-lg:border-b lg:border-r";
const triggerClass =
  "flex h-full w-full cursor-pointer items-center justify-between gap-3 px-5 py-3 text-left transition-colors hover:bg-[#f0ebe3] lg:py-0";
const labelClass = "block text-[0.72rem] leading-none text-[#5a5c58]";
const valueClass = "mt-[0.4rem] block text-[0.85rem] font-medium leading-none text-ink whitespace-nowrap";
const panelClass =
  "enter-fade absolute left-0 top-[calc(100%+0.35rem)] z-50 w-full min-w-[15rem] rounded-[2px] border border-[#d9d2c5] bg-[#fbf9f5] p-1.5 shadow-[0_12px_36px_rgba(20,24,21,0.18)]";

export default function BookingBar() {
  const [villa, setVilla] = useState<ListingKey>("avalon");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [openDropdown, setOpenDropdown] = useState<"villa" | "guests" | null>(null);

  const containerRef = useRef<HTMLFormElement>(null);
  const villaButtonRef = useRef<HTMLButtonElement>(null);
  const guestButtonRef = useRef<HTMLButtonElement>(null);
  const villaPanelId = useId();
  const guestPanelId = useId();

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpenDropdown(null);
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
      // Browsers without showPicker still open their own date picker.
    }
  };

  // Booking happens on Airbnb: open the chosen listing with these dates and guests filled in.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(airbnbUrl(villa, { checkIn, checkOut, guests: Number(guests) }), "_blank", "noopener,noreferrer");
  };

  const selected = villaOptions.find((v) => v.value === villa) ?? villaOptions[0];
  const guestOptions = Array.from({ length: selected.maxGuests }, (_, i) => String(i + 1));
  const leaveGroup = (name: "villa" | "guests") => (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null) && openDropdown === name) setOpenDropdown(null);
  };

  return (
    <form
      ref={containerRef}
      onSubmit={submit}
      aria-label="Check availability"
      className="relative flex flex-col rounded-[2px] bg-[#faf8f4] shadow-[0_8px_30px_rgba(0,0,0,0.18)] lg:h-[4.0625rem] lg:flex-row lg:items-center"
    >
      {/* Villa */}
      <div className={fieldClass} onBlur={leaveGroup("villa")}>
        <button
          ref={villaButtonRef}
          type="button"
          aria-expanded={openDropdown === "villa"}
          aria-controls={openDropdown === "villa" ? villaPanelId : undefined}
          onClick={() => setOpenDropdown(openDropdown === "villa" ? null : "villa")}
          className={triggerClass}
        >
          <span>
            <span className={labelClass}>Villa</span>
            <span className={valueClass}>{selected.name}</span>
          </span>
          <ChevronDown className={`size-[0.8rem] shrink-0 text-[#3a3a38] transition-transform duration-300 ${openDropdown === "villa" ? "rotate-180" : ""}`} strokeWidth={1.6} aria-hidden="true" />
        </button>
        {openDropdown === "villa" && (
          <div id={villaPanelId} role="group" aria-label="Choose a villa" className={panelClass}>
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
                  className={`block w-full cursor-pointer rounded-[2px] px-3 py-2 text-left transition-colors ${
                    isSelected ? "bg-[#ece4d6]" : "hover:bg-[#f2ece2]"
                  }`}
                >
                  <span className={`block font-serif text-[1rem] text-ink ${isSelected ? "font-semibold" : ""}`}>{opt.name}</span>
                  <span className="mt-0.5 block text-[0.75rem] text-[#5a5c58]">{opt.detail}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Check-in */}
      <label className={`${fieldClass} cursor-pointer px-5 py-3 transition-colors hover:bg-[#f0ebe3] lg:py-0`}>
        <span>
          <span className={labelClass}>Check-in</span>
          <span className={valueClass}>{formatDate(checkIn)}</span>
        </span>
        <input
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

      {/* Check-out */}
      <label className={`${fieldClass} cursor-pointer px-5 py-3 transition-colors hover:bg-[#f0ebe3] lg:py-0`}>
        <span>
          <span className={labelClass}>Check-out</span>
          <span className={valueClass}>{formatDate(checkOut)}</span>
        </span>
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

      {/* Guests */}
      <div className={fieldClass} onBlur={leaveGroup("guests")}>
        <button
          ref={guestButtonRef}
          type="button"
          aria-expanded={openDropdown === "guests"}
          aria-controls={openDropdown === "guests" ? guestPanelId : undefined}
          onClick={() => setOpenDropdown(openDropdown === "guests" ? null : "guests")}
          className={triggerClass}
        >
          <span>
            <span className={labelClass}>Guests</span>
            <span className={valueClass}>
              {guests} {guests === "1" ? "guest" : "guests"}
            </span>
          </span>
          <ChevronDown className={`size-[0.8rem] shrink-0 text-[#3a3a38] transition-transform duration-300 ${openDropdown === "guests" ? "rotate-180" : ""}`} strokeWidth={1.6} aria-hidden="true" />
        </button>
        {openDropdown === "guests" && (
          <div id={guestPanelId} role="group" aria-label="Number of guests" className={`${panelClass} min-w-[11rem]`}>
            <p className="px-3 pb-1 pt-1.5 text-[0.72rem] text-[#5a5c58]">Up to {selected.maxGuests} guests</p>
            <div className="grid grid-cols-2 gap-1">
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
                    className={`cursor-pointer rounded-[2px] px-3 py-1.5 text-left text-[0.82rem] transition-colors ${
                      isSelected ? "bg-[#ece4d6] font-medium text-ink" : "text-[#3e3f3d] hover:bg-[#f2ece2]"
                    }`}
                  >
                    {n} {n === "1" ? "guest" : "guests"}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="p-3 lg:shrink-0 lg:px-[1rem] lg:py-0">
        <button
          type="submit"
          className="sheen flex h-[2.5rem] w-full items-center justify-center whitespace-nowrap bg-gold text-[0.8rem] font-medium text-[#f7f1e4] transition-[background-color,box-shadow] duration-300 hover:bg-gold-hover hover:shadow-[0_6px_18px_-8px_rgba(95,74,35,0.65)] lg:w-[8.5rem]"
        >
          Book on Airbnb
        </button>
      </div>
    </form>
  );
}
