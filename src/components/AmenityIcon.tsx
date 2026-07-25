import {
  Wifi,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  Clapperboard,
  ShieldCheck,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";
import type { Amenity } from "@/lib/villas";
import { amenityLabels } from "@/lib/villas";

const iconMap: Record<Amenity, LucideIcon> = {
  wifi: Wifi,
  dining: UtensilsCrossed,
  pool: Waves,
  gym: Dumbbell,
  entertainment: Clapperboard,
  security: ShieldCheck,
  concierge: PhoneCall,
};

export default function AmenityIcon({
  amenity,
  size = 20,
}: {
  amenity: Amenity;
  size?: number;
}) {
  const Icon = iconMap[amenity];
  return (
    <div className="flex flex-col items-center gap-2 text-center w-20">
      <div className="flex items-center justify-center w-11 h-11 rounded-full border border-hairline">
        <Icon size={size} strokeWidth={1.6} />
      </div>
      <span className="text-xs leading-tight text-charcoal/70">
        {amenityLabels[amenity]}
      </span>
    </div>
  );
}
