import Link from "next/link";
import { MapPin } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa6";

const mapEmbeds = {
  kandy:
    "https://www.google.com/maps?q=Kandy,Sri+Lanka&output=embed",
  trinco:
    "https://www.google.com/maps?q=Trincomalee,Sri+Lanka&output=embed",
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16 grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr]">
        <div>
          <p className="font-display text-xl text-white mb-4">
            Kintsugi Station Villas
          </p>
          <p className="text-sm leading-7 max-w-xs">
            Lovingly restored Sri Lankan holiday homes — combining modern
            comfort with old world charm.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kintsugi Station Villas on Instagram"
              className="p-2 border border-white/20 hover:border-gold hover:text-gold transition-colors"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kintsugi Station Villas on Facebook"
              className="p-2 border border-white/20 hover:border-gold hover:text-gold transition-colors"
            >
              <FaFacebookF size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-white/50 mb-4">Explore</p>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link href="/kandy" className="hover:text-gold transition-colors">Kandy — villa &amp; gallery</Link></li>
            <li><Link href="/trincomalee" className="hover:text-gold transition-colors">Trinco — villas &amp; gallery</Link></li>
            <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white/50 mb-4">Guest info</p>
          <ul className="space-y-3 text-sm">
            <li><Link href="/reviews/kandy" className="hover:text-gold transition-colors">Guest Reviews — Kandy</Link></li>
            <li><Link href="/reviews/trincomalee" className="hover:text-gold transition-colors">Guest Reviews — Trinco</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact / Book your stay</Link></li>
            <li>
              <a
                href="https://www.airbnb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                Airbnb listings
              </a>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-xs text-white/50 mb-2">
              <MapPin size={13} /> Kandy
            </p>
            <div className="aspect-square w-full overflow-hidden rounded-xl border border-white/10 grayscale hover:grayscale-0 transition-[filter]">
              <iframe
                src={mapEmbeds.kandy}
                title="Map — Kandy Hill Country villa"
                loading="lazy"
                className="w-full h-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs text-white/50 mb-2">
              <MapPin size={13} /> Trincomalee
            </p>
            <div className="aspect-square w-full overflow-hidden rounded-xl border border-white/10 grayscale hover:grayscale-0 transition-[filter]">
              <iframe
                src={mapEmbeds.trinco}
                title="Map — Trincomalee Dutch Bay villas"
                loading="lazy"
                className="w-full h-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-6 flex flex-col sm:flex-row gap-2 justify-between text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Kintsugi Station Villas. All rights reserved.</p>
          <p>Kandy, Sri Lanka &middot; Trincomalee, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
