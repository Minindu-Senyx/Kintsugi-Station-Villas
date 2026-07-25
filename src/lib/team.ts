import { images } from "./images";
import type { Region } from "./villas";

export type TeamMember = {
  name: string;
  role: string;
  region: Region;
  image: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "Prasanna",
    role: "Kandy Team Lead",
    region: "kandy",
    image: images.prasanna,
    bio: "Prasanna has run the Kandy property for years and knows the hills better than anyone — the right tea estate to visit, the best table in town, the quickest driver. He's on call around the clock for anything a guest needs.",
  },
  {
    name: "Rasu",
    role: "Kandy Host Team",
    region: "kandy",
    image: images.rasu,
    bio: "Rasu looks after the villa day to day, from morning tea on the verandah to making sure every corner of the house is ready before guests are even awake.",
  },
  {
    name: "Manjula",
    role: "Kandy Host Team",
    region: "kandy",
    image: images.manjula,
    bio: "Manjula handles the garden and grounds with real care, and is usually the first friendly face guests meet on arrival at Villa Acland.",
  },
  {
    name: "Kasthuri",
    role: "Trincomalee Team Lead",
    region: "trinco",
    image: images.kasthuri,
    bio: "Kasthuri leads the Trincomalee team and is the person guests call for everything from a sunrise boat trip to a last-minute dinner reservation. Warm, unhurried, and always reachable.",
  },
];

export function getTeamByRegion(region: Region) {
  return team.filter((m) => m.region === region);
}
