"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, Leaf } from "lucide-react";
import { contact } from "@/lib/site";

const fieldClass =
  "block h-[2.08rem] w-full rounded-[3px] border border-[#e3ddd4] bg-[#fbf8f4] px-[0.7rem] text-[0.78rem] text-[#1d1f1d] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[#9a9a97] hover:border-[#d3c7b4] focus:border-[#b99b6c] focus:bg-white focus:shadow-[0_0_0_3px_rgba(185,155,108,0.16)]";
const labelClass = "block text-[0.8rem] leading-none text-[#1d1f1d]";

type Status = "idle" | "sent";

type Props = {
  /** Prefilled from the Home page availability bar or villa pages. */
  initialDates?: string;
  initialGuests?: string;
  initialVilla?: string;
};

export default function InquiryForm({ initialDates = "", initialGuests = "", initialVilla = "" }: Props) {
  const [dates, setDates] = useState(initialDates);
  const [guests, setGuests] = useState(initialGuests);
  const defaultVilla =
    initialVilla === "acland"
      ? "Villa Acland (Artisan Sanctuary · Secluded)"
      : initialVilla === "estate"
        ? "Both Villas (Exclusive Estate Buyout)"
        : "Avalon Villa (3 Bedrooms · Hillside Infinity Pool)";
  const [villa, setVilla] = useState(defaultVilla);
  const [status, setStatus] = useState<Status>("idle");
  const [openDropdown, setOpenDropdown] = useState<"villa" | "guests" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenDropdown(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `WhatsApp / Phone: ${data.get("phone") || "-"}`,
      `Villa: ${data.get("villa") || "-"}`,
      `Preferred dates: ${data.get("dates") || "-"}`,
      `Guests: ${data.get("guests") || "-"}`,
      "",
      `${data.get("requests") || ""}`,
    ].join("\n");
    const subject = `Reservation inquiry — ${data.get("name")} (${data.get("villa") || "Kandy Estate"})`;
    window.location.href = `mailto:${contact.reservationsEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  };

  return (
    <form ref={formRef} onSubmit={submit} className="mt-[1rem] space-y-[0.9rem]">
      <div>
        <label id="villa-label" className={labelClass}>
          Villa of Interest
        </label>
        <div className="relative mt-[0.4rem]">
          <input type="hidden" name="villa" value={villa} />
          <button
            type="button"
            aria-labelledby="villa-label"
            aria-haspopup="listbox"
            aria-expanded={openDropdown === "villa"}
            onClick={() => setOpenDropdown(openDropdown === "villa" ? null : "villa")}
            className={`${fieldClass} flex items-center justify-between text-left pr-3 cursor-pointer`}
          >
            <span className="truncate">{villa}</span>
            <ChevronDown
              className={`size-[0.8rem] text-[#3a3a38] transition-transform duration-300 ease-soft shrink-0 ${
                openDropdown === "villa" ? "rotate-180 text-gold" : ""
              }`}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </button>

          {openDropdown === "villa" && (
            <div
              role="listbox"
              aria-label="Select Villa"
              className="enter-rise absolute left-0 top-[calc(100%+0.3rem)] z-50 w-full rounded-[3px] border border-[#d8d0c2] bg-[#fdfbf7] p-1.5 shadow-[0_10px_30px_rgba(20,24,21,0.14)]"
            >
              {[
                "Avalon Villa (3 Bedrooms · Hillside Infinity Pool)",
                "Villa Acland (Artisan Sanctuary · Secluded)",
                "Both Villas (Exclusive Estate Buyout)",
              ].map((opt) => {
                const isSelected = opt === villa;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setVilla(opt);
                      setOpenDropdown(null);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-[2px] px-2.5 py-2 text-left text-[0.78rem] transition-colors ${
                      isSelected ? "bg-[#ece4d6] font-medium text-[#7a591e]" : "text-[#2e302e] hover:bg-[#f3ede3]"
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="size-3.5 shrink-0 text-[#8e6b2c]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="name" className={labelClass}>
          Full Name
        </label>
        <input id="name" name="name" required autoComplete="name" placeholder="Your full name" className={`mt-[0.4rem] ${fieldClass}`} />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={`mt-[0.4rem] ${fieldClass}`}
        />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>
          WhatsApp / Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+94 77 123 4567"
          className={`mt-[0.4rem] ${fieldClass}`}
        />
      </div>
      <div>
        <label htmlFor="dates" className={labelClass}>
          Preferred Dates (Arrival - Departure)
        </label>
        <div className="relative mt-[0.4rem]">
          <input
            id="dates"
            name="dates"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            placeholder="e.g. 12 Apr 2025 - 15 Apr 2025"
            className={`${fieldClass} pr-9`}
          />
          <CalendarDays
            className="pointer-events-none absolute right-[0.85rem] top-1/2 size-[0.85rem] -translate-y-1/2 text-[#3a3a38]"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </div>
      </div>
      <div>
        <label id="guests-label" className={labelClass}>
          Number of Guests (Max 8)
        </label>
        <div className="relative mt-[0.4rem]">
          <input type="hidden" name="guests" value={guests} />
          <button
            type="button"
            aria-labelledby="guests-label"
            aria-haspopup="listbox"
            aria-expanded={openDropdown === "guests"}
            onClick={() => setOpenDropdown(openDropdown === "guests" ? null : "guests")}
            className={`${fieldClass} flex items-center justify-between text-left pr-3 cursor-pointer ${
              guests ? "text-[#1d1f1d]" : "text-[#9a9a97]"
            }`}
          >
            <span>{guests ? `${guests} ${guests === "1" ? "guest" : "guests"}` : "Select number of guests"}</span>
            <ChevronDown
              className={`size-[0.8rem] text-[#3a3a38] transition-transform duration-300 ease-soft shrink-0 ${
                openDropdown === "guests" ? "rotate-180 text-gold" : ""
              }`}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </button>

          {openDropdown === "guests" && (
            <div
              role="listbox"
              aria-label="Select number of guests"
              className="enter-rise absolute left-0 top-[calc(100%+0.3rem)] z-50 w-full rounded-[3px] border border-[#d8d0c2] bg-[#fdfbf7] p-1.5 shadow-[0_10px_30px_rgba(20,24,21,0.14)]"
            >
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                {["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => {
                  const isSelected = n === guests;
                  return (
                    <button
                      key={n}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setGuests(n);
                        setOpenDropdown(null);
                      }}
                      className={`flex cursor-pointer items-center justify-between rounded-[2px] px-2 py-1.5 text-left text-[0.78rem] transition-colors ${
                        isSelected ? "bg-[#ece4d6] font-medium text-[#7a591e]" : "text-[#2e302e] hover:bg-[#f3ede3]"
                      }`}
                    >
                      <span>{n} {n === "1" ? "guest" : "guests"}</span>
                      {isSelected && <Check className="size-3 text-[#8e6b2c]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="requests" className={labelClass}>
          Special Requests or Dietary Preferences
        </label>
        <textarea
          id="requests"
          name="requests"
          rows={3}
          placeholder="Tell us how we can make your stay special..."
          className={`mt-[0.4rem] ${fieldClass} h-[4.83rem] resize-y py-[0.5rem] leading-[1.1rem]`}
        />
      </div>

      <button
        type="submit"
        className="sheen group !mt-[1.2rem] flex h-[2.95rem] w-full items-center justify-center gap-[0.75rem] rounded-[3px] bg-bronze text-[0.97rem] text-[#f8f3ea] shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-[background-color,box-shadow] duration-300 hover:bg-[#8f7043] hover:shadow-[0_6px_18px_-8px_rgba(120,90,53,0.6)]"
      >
        {status === "sent" ? "Inquiry Ready to Send" : "Send Reservation Inquiry"}
        {status === "sent" ? (
          <Check key="sent" className="enter-rise size-[1rem]" strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <ArrowRight
            className="size-[1rem] transition-transform duration-500 ease-soft group-hover:translate-x-[0.25rem]"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        )}
      </button>
      <p role="status" className="text-center text-[0.75rem] text-[#6b5a3d]">
        {status === "sent" && (
          <span className="enter-rise block">
            Your email app should now open with your inquiry. If not, write to us at {contact.reservationsEmail}.
          </span>
        )}
      </p>

      <div className="!mt-[0.25rem] flex items-center gap-[1.4rem] rounded-[4px] bg-[#efebe4] py-[0.95rem] pl-[1.6rem] pr-[0.9rem]">
        <Leaf className="size-[1.9rem] shrink-0 text-[#a88754]" strokeWidth={1.1} aria-hidden="true" />
        <p className="text-[0.8rem] leading-[1.3rem] text-[#1d1f1d]">
          Direct bookings guarantee exclusive estate privacy and complimentary tea degustation.
        </p>
      </div>
    </form>
  );
}
