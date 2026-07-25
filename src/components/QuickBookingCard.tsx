"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuickBookingCard() {
  const router = useRouter();
  const [villa, setVilla] = useState("villa-acland");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("2");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      villa,
      checkin,
      checkout,
      guests,
      email,
    });
    router.push(`/contact?${params.toString()}`);
  }

  const fieldClasses =
    "w-full bg-white/10 border border-white/25 text-white placeholder-white/50 px-3.5 py-2.5 text-sm focus:bg-white/15 focus:border-teal-light outline-none transition-colors [color-scheme:dark]";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md lg:max-w-none bg-charcoal/70 backdrop-blur-md border border-white/15 p-6 sm:p-7"
    >
      <p className="eyebrow text-teal-light mb-5">Quick booking</p>

      <div className="grid grid-cols-2 gap-3.5">
        <div className="col-span-2">
          <label htmlFor="qb-email" className="block text-xs text-white/70 mb-1.5">
            Email
          </label>
          <input
            id="qb-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={fieldClasses}
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="qb-villa" className="block text-xs text-white/70 mb-1.5">
            Select villa
          </label>
          <select
            id="qb-villa"
            value={villa}
            onChange={(e) => setVilla(e.target.value)}
            className={fieldClasses}
          >
            <option value="villa-acland">Kandy Hill Country</option>
            <option value="trinco-any">Trincomalee Dutch Bay</option>
          </select>
        </div>

        <div>
          <label htmlFor="qb-checkin" className="block text-xs text-white/70 mb-1.5">
            Check-in
          </label>
          <input
            id="qb-checkin"
            type="date"
            required
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="qb-checkout" className="block text-xs text-white/70 mb-1.5">
            Check-out
          </label>
          <input
            id="qb-checkout"
            type="date"
            required
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            className={fieldClasses}
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="qb-guests" className="block text-xs text-white/70 mb-1.5">
            Number of guests
          </label>
          <input
            id="qb-guests"
            type="number"
            min={1}
            max={20}
            required
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={fieldClasses}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-teal hover:bg-teal-dark text-white font-semibold text-sm py-3 shadow-md transition-colors"
      >
        Book now
      </button>
    </form>
  );
}
