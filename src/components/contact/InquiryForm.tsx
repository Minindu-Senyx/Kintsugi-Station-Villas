"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, ChevronDown, Leaf } from "lucide-react";
import { contact } from "@/lib/site";

const fieldClass =
  "block h-[2.08rem] w-full rounded-[3px] border border-[#e3ddd4] bg-[#fbf8f4] px-[0.7rem] text-[0.78rem] text-[#1d1f1d] outline-none transition-colors placeholder:text-[#9a9a97] focus:border-[#b99b6c]";
const labelClass = "block text-[0.8rem] leading-none text-[#1d1f1d]";

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

type Status = "idle" | "sent";

export default function InquiryForm() {
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // Prefill from the Home page availability bar (?arrival=&departure=&guests=).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const arrival = params.get("arrival");
    const departure = params.get("departure");
    const g = params.get("guests");
    if (arrival) setDates(departure ? `${fmt(arrival)} - ${fmt(departure)}` : fmt(arrival));
    if (g && ["1", "2", "3", "4"].includes(g)) setGuests(g);
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `WhatsApp / Phone: ${data.get("phone") || "-"}`,
      `Preferred dates: ${data.get("dates") || "-"}`,
      `Guests: ${data.get("guests") || "-"}`,
      "",
      `${data.get("requests") || ""}`,
    ].join("\n");
    const subject = `Reservation inquiry — ${data.get("name")}`;
    window.location.href = `mailto:${contact.reservationsEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  };

  return (
    <form onSubmit={submit} className="mt-[1rem] space-y-[0.9rem]">
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
        <label htmlFor="guests" className={labelClass}>
          Number of Guests (Max 4)
        </label>
        <div className="relative mt-[0.4rem]">
          <select
            id="guests"
            name="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={`${fieldClass} appearance-none pr-9 ${guests ? "" : "text-[#9a9a97]"}`}
          >
            <option value="" disabled>
              Select number of guests
            </option>
            {["1", "2", "3", "4"].map((n) => (
              <option key={n} value={n} className="text-[#1d1f1d]">
                {n} {n === "1" ? "guest" : "guests"}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-[0.85rem] top-1/2 size-[0.8rem] -translate-y-1/2 text-[#3a3a38]"
            strokeWidth={1.6}
            aria-hidden="true"
          />
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
        className="!mt-[1.2rem] flex h-[2.95rem] w-full items-center justify-center gap-[0.75rem] rounded-[3px] bg-bronze text-[0.97rem] text-[#f8f3ea] shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-colors hover:bg-[#8f7043]"
      >
        Send Reservation Inquiry
        <ArrowRight className="size-[1rem]" strokeWidth={1.6} aria-hidden="true" />
      </button>
      <p role="status" className="text-center text-[0.75rem] text-[#6b5a3d]">
        {status === "sent" &&
          `Your email app should now open with your inquiry. If not, write to us at ${contact.reservationsEmail}.`}
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
