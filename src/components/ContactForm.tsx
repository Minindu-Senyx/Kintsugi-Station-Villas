"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const villaOptions = [
  { value: "villa-acland", label: "Villa Acland — Kandy" },
  { value: "trinco-any", label: "Trincomalee Dutch Bay — not sure which villa" },
  { value: "villa-238", label: "Villa 238 — Trincomalee" },
  { value: "villa-232", label: "Villa 232 — Trincomalee" },
  { value: "villa-234", label: "Villa 234 — Trincomalee" },
  { value: "villa-252", label: "Villa 252 — Trincomalee" },
];

type ContactFormProps = {
  initialVilla?: string;
  initialCheckin?: string;
  initialCheckout?: string;
  initialGuests?: string;
  initialEmail?: string;
};

export default function ContactForm({
  initialVilla,
  initialCheckin = "",
  initialCheckout = "",
  initialGuests = "",
  initialEmail = "",
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [villa, setVilla] = useState(
    villaOptions.some((v) => v.value === initialVilla)
      ? (initialVilla as string)
      : villaOptions[0].value
  );

  const inputClasses =
    "w-full bg-white border border-hairline px-4 py-3 text-sm focus:border-gold outline-none transition-colors";

  if (submitted) {
    return (
      <div className="border border-hairline p-8 sm:p-10 flex items-start gap-4">
        <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={28} />
        <div>
          <h2 className="font-display text-2xl mb-2">Thank you</h2>
          <p className="text-charcoal/70 leading-relaxed">
            Your enquiry has been noted. We&rsquo;ll get back to you within
            24 hours — or call / WhatsApp Prasanna directly on{" "}
            <a href="tel:+94775917528" className="text-gold-dark font-medium">
              +94 77 591 7528
            </a>{" "}
            if it&rsquo;s urgent.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={initialEmail}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="villa" className="block text-sm font-medium mb-2">
            Requested Villa
          </label>
          <select
            id="villa"
            name="villa"
            value={villa}
            onChange={(e) => setVilla(e.target.value)}
            className={inputClasses}
          >
            {villaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="checkin" className="block text-sm font-medium mb-2">
            Check-in Date
          </label>
          <input
            id="checkin"
            name="checkin"
            type="date"
            defaultValue={initialCheckin}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="checkout" className="block text-sm font-medium mb-2">
            Check-out Date
          </label>
          <input
            id="checkout"
            name="checkout"
            type="date"
            defaultValue={initialCheckout}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium mb-2">
          Number of guests
        </label>
        <input
          id="guests"
          name="guests"
          type="number"
          min={1}
          max={20}
          defaultValue={initialGuests}
          className={`${inputClasses} sm:w-48`}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={inputClasses}
        />
      </div>

      <MagneticButton className="block w-full sm:w-fit">
        <button
          type="submit"
          className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-charcoal font-semibold text-sm px-8 py-3.5 transition-colors"
        >
          Submit
        </button>
      </MagneticButton>
    </form>
  );
}
