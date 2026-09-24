import type { Metadata } from "next";
import Image from "next/image";
import { CarFront, Mail, MapPin } from "lucide-react";
import { PiWhatsappLogoLight } from "react-icons/pi";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactFooter from "@/components/contact/ContactFooter";
import EstateMap from "@/components/contact/EstateMap";
import InquiryForm from "@/components/contact/InquiryForm";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Direct inquiries for reservations, private retreats, and exclusive estate hire at Kintsugi Station, Upper Hantana Hills, Kandy.",
};

const iconClass = "size-[2rem] text-[#785a35]";

const details = [
  {
    icon: <PiWhatsappLogoLight className={iconClass} />,
    title: "WhatsApp & Phone",
    value: contact.phone,
    href: contact.whatsappHref,
  },
  {
    icon: <Mail className={iconClass} strokeWidth={1.1} />,
    title: "Email",
    value: contact.reservationsEmail,
    href: `mailto:${contact.reservationsEmail}`,
  },
  {
    icon: <MapPin className={iconClass} strokeWidth={1.1} />,
    title: "Address",
    value: "Upper Hantana Hills, Kandy, Sri Lanka",
    href: contact.mapsHref,
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-[0.64rem] tracking-[0.3em] text-[#9f7f57]">{children}</p>;
}

export default function ContactPage() {
  return (
    <div className="bg-sand">
      <ContactHeader />
      <main>
        {/* Hero */}
        <section className="relative lg:h-[18.19rem]">
          <Image
            src="/assets/images/contact_hero.jpg"
            alt="Sunrise over misty forested hills from the villa terrace"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[50%_60%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,236,224,0.72)_0%,rgba(244,236,224,0.4)_40%,rgba(244,236,224,0)_68%)]"
          />
          <div className="frame relative px-5 py-16 lg:px-[3.875rem] lg:py-0 lg:pt-[4.6rem]">
            <Eyebrow>A Place to Belong</Eyebrow>
            <h1 className="mt-[0.75rem] font-serif text-[2.8rem] leading-none tracking-[-0.01em] text-ink lg:text-[3.9rem]">
              Connect With Us
            </h1>
            <p className="mt-[0.7rem] max-w-[29.5rem] text-[1.03rem] leading-[1.55rem] text-[#161816]">
              Direct inquiries for reservations, private retreats, and exclusive estate hire.
            </p>
          </div>
        </section>

        {/* Details + form */}
        <section className="frame flex flex-col gap-12 px-5 pb-6 pt-10 lg:flex-row lg:gap-0 lg:px-0 lg:pb-[1.5rem] lg:pl-[3.875rem] lg:pr-[2.43rem] lg:pt-[1.62rem]">
          <div className="lg:w-[28.1rem] lg:pt-[1rem]">
            <Eyebrow>Contact &amp; Arrival</Eyebrow>
            <h2 className="mt-[0.75rem] font-serif text-[2.2rem] leading-none text-ink">We&rsquo;re Here for You</h2>
            <p className="mt-[0.8rem] max-w-[24.6rem] text-[0.92rem] leading-[1.31rem] text-[#151716]">
              For reservations, special requests, or to learn more about Kintsugi Station, please reach out directly. We
              look forward to welcoming you.
            </p>

            <ul className="mt-[1.6rem] space-y-[1.3rem]">
              {details.map((item) => (
                <li key={item.title} className="flex gap-[1.75rem]">
                  <span className="shrink-0 pl-[0.2rem]">{item.icon}</span>
                  <div>
                    <p className="text-[0.98rem] leading-[1.1rem] text-[#1d1f1d]">{item.title}</p>
                    <a href={item.href} className="mt-[0.3rem] block text-[1.05rem] text-[#1d1f1d] hover:text-[#785a35]">
                      {item.value}
                    </a>
                  </div>
                </li>
              ))}
              <li className="flex gap-[1.75rem]">
                <span className="shrink-0 pl-[0.2rem]">
                  <CarFront className={iconClass} strokeWidth={1.1} />
                </span>
                <div>
                  <p className="text-[0.98rem] leading-[1.1rem] text-[#1d1f1d]">Arrival &amp; Transfers</p>
                  <p className="mt-[0.35rem] text-[0.85rem] leading-[1.29rem] text-[#1d1f1d]">
                    Located 25 minutes from Kandy Railway Station.
                    <br />
                    Chauffeur transfers from Colombo International Airport (CMB) arranged upon request.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-[1.35rem]">
              <EstateMap />
            </div>
          </div>

          <div
            id="inquiry"
            className="scroll-mt-6 rounded-[8px] border border-[#ebe5dc] bg-card px-5 pb-[1rem] pt-[1.55rem] shadow-[0_1px_3px_rgba(0,0,0,0.04)] lg:ml-auto lg:w-[27.875rem] lg:px-[1.56rem]"
          >
            <p className="eyebrow text-[0.66rem] font-medium tracking-[0.3em] text-[#1d1f1d]">Inquiry Form</p>
            <h2 className="mt-[0.6rem] font-serif text-[2.23rem] leading-none text-ink">Plan Your Stay</h2>
            <p className="mt-[0.55rem] text-[0.88rem] text-[#1d1f1d]">
              Share a few details and we&rsquo;ll be in touch personally.
            </p>
            <InquiryForm />
          </div>
        </section>
      </main>
      <ContactFooter />
    </div>
  );
}
