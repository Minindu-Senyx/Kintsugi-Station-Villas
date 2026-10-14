"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { contact, messageForm } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "block w-full rounded-[2px] border border-[#8f8a80] bg-white/60 px-[0.8rem] text-[0.9rem] text-[#1d1f1d] transition-[border-color,background-color] duration-300 placeholder:text-[#6b665e] hover:border-[#5f4a23] focus:border-[#5f4a23] focus:bg-white";
const labelClass = "block text-[0.85rem] leading-none text-[#1d1f1d]";

const villaChoices = ["Not sure yet", "Avalon Villa", "Villa Acland", "Both villas"];

/*
 * "Send us a message", delivered by formsubmit.co (see `messageForm` in
 * lib/site.ts). With JavaScript the form posts as JSON and shows its own
 * thank-you; without it, the same fields post straight to FormSubmit. The
 * `_honey` field is a trap for spam bots: people never see or fill it.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const thanksRef = useRef<HTMLDivElement>(null);
  const statusId = useId();

  // Move focus to the thank-you so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (status === "sent") thanksRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) {
      setStatus("sent"); // a bot filled the trap: pretend it worked and send nothing
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(messageForm.ajax, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { success?: boolean | string };
      if (!res.ok || String(body.success) === "false") throw new Error("not delivered");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div ref={thanksRef} tabIndex={-1} role="status" className="border-t border-[#d9d2c5] pt-[1.4rem] outline-none">
        <h3 className="font-serif text-[1.6rem] leading-none text-ink">Thank you, message sent</h3>
        <p className="mt-[0.6rem] text-[0.88rem] leading-[1.35rem] text-[#3c3e3b]">
          We&rsquo;ll reply by email or WhatsApp as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-[1rem] min-h-6 text-[0.82rem] font-medium text-gold underline underline-offset-2 hover:text-gold-hover"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form action={messageForm.action} method="POST" onSubmit={onSubmit} aria-describedby={statusId} className="space-y-[1rem]">
      {/* FormSubmit settings, and the spam trap */}
      <input type="hidden" name="_subject" value={messageForm.subject} />
      <input type="hidden" name="_cc" value={messageForm.cc} />
      <input type="hidden" name="_template" value="table" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div>
        <label htmlFor="cf-name" className={labelClass}>
          Your name
        </label>
        <input id="cf-name" name="name" required autoComplete="name" className={`mt-[0.45rem] h-[2.5rem] ${fieldClass}`} />
      </div>

      <div className="grid gap-[1rem] sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={`mt-[0.45rem] h-[2.5rem] ${fieldClass}`}
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            WhatsApp <span className="text-[#5a5c58]">(optional)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+44 7700 900123"
            className={`mt-[0.45rem] h-[2.5rem] ${fieldClass}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-villa" className={labelClass}>
          Which villa?
        </label>
        <div className="relative mt-[0.45rem]">
          <select id="cf-villa" name="villa" defaultValue={villaChoices[0]} className={`h-[2.5rem] cursor-pointer appearance-none pr-[2.4rem] ${fieldClass}`}>
            {villaChoices.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-[0.85rem] top-1/2 size-[1rem] -translate-y-1/2 text-[#3a3a38]"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Your message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Dates, number of guests, pets or events, anything you'd like to know…"
          className={`mt-[0.45rem] resize-y py-[0.6rem] leading-[1.35rem] ${fieldClass}`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="flex h-[2.75rem] w-full items-center justify-center bg-gold text-[0.9rem] font-medium text-[#f7f1e4] transition-colors hover:bg-gold-hover disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:px-10"
      >
        {sending ? "Sending…" : "Send message"}
      </button>

      <div id={statusId} aria-live="polite">
        {status === "error" && (
          <p role="alert" className="rounded-[3px] border border-[#b4533d] bg-[#fbeee9] px-[0.9rem] py-[0.7rem] text-[0.82rem] leading-[1.25rem] text-[#7a2e1d]">
            Sorry, that didn&rsquo;t send. Please try again, or message us on{" "}
            <a href={contact.people[0].whatsappHref} className="font-medium underline">
              WhatsApp
            </a>{" "}
            or at{" "}
            <a href={`mailto:${contact.emails[0]}`} className="font-medium underline">
              {contact.emails[0]}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
