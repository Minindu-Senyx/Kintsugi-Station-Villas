"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { CalendarCheck2, CalendarX2, ChevronDown, UserRound } from "lucide-react";

const formatDate = (value: string) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "Select date";

function Field({ icon, label, value, children }: { icon: ReactNode; label: string; value: string; children: ReactNode }) {
  return (
    <label className="relative flex h-full flex-1 cursor-pointer items-center gap-[0.75rem] px-5 py-3 lg:py-0 lg:pl-[1.2rem] lg:pr-[1.3rem]">
      <span className="text-[#2d2e2c]">{icon}</span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.8rem] text-[#2b2c2a]">{label}</span>
        <span className="mt-[0.35rem] text-[0.7rem] text-[#4a4a48]">{value}</span>
      </span>
      <ChevronDown className="ml-auto size-[0.8rem] text-[#3a3a38]" strokeWidth={1.6} aria-hidden="true" />
      {children}
    </label>
  );
}

const divider = <span aria-hidden="true" className="hidden h-[2.5rem] w-px bg-[#e2dcd2] lg:block" />;

export default function BookingBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const today = new Date().toISOString().slice(0, 10);

  const openPicker = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      e.currentTarget.showPicker?.();
    } catch {
      // showPicker can throw if not triggered by a user gesture; native click still works.
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ guests });
    if (checkIn) params.set("arrival", checkIn);
    if (checkOut) params.set("departure", checkOut);
    router.push(`/contact?${params.toString()}#inquiry`);
  };

  const hiddenInput = "picker-input absolute inset-0 h-full w-full cursor-pointer opacity-0";

  return (
    <form
      onSubmit={submit}
      aria-label="Check availability"
      className="flex flex-col divide-y divide-[#e2dcd2] rounded-[2px] bg-[#f6f3ef] shadow-[0_6px_24px_rgba(0,0,0,0.18)] lg:h-[4.0625rem] lg:flex-row lg:items-center lg:divide-y-0"
    >
      <Field icon={<CalendarCheck2 className="size-[1rem]" strokeWidth={1.5} />} label="Check-in" value={formatDate(checkIn)}>
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
          className={hiddenInput}
        />
      </Field>
      {divider}
      <Field icon={<CalendarX2 className="size-[1rem]" strokeWidth={1.5} />} label="Check-out" value={formatDate(checkOut)}>
        <input
          type="date"
          aria-label="Check-out date"
          min={checkIn || today}
          value={checkOut}
          onClick={openPicker}
          onChange={(e) => setCheckOut(e.target.value)}
          className={hiddenInput}
        />
      </Field>
      {divider}
      <Field
        icon={<UserRound className="size-[1.05rem]" strokeWidth={1.5} />}
        label="Guests"
        value={`${guests} ${guests === "1" ? "guest" : "guests"}`}
      >
        <select
          aria-label="Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        >
          {["1", "2", "3", "4"].map((n) => (
            <option key={n} value={n}>
              {n} {n === "1" ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </Field>
      {divider}
      <div className="p-4 lg:px-[1.25rem] lg:py-0 lg:pl-[1.35rem]">
        <button
          type="submit"
          className="h-[2.3rem] w-full bg-gold text-[0.78rem] text-[#f7f1e4] transition-colors hover:bg-[#8f6d31] lg:w-[8.4rem]"
        >
          Check Dates
        </button>
      </div>
    </form>
  );
}
