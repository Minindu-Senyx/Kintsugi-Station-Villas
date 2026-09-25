/*
 * The Kandy team, for the About page. Names and roles come from the old site
 * and its guest reviews. Add each person's `quote` only in their own words,
 * once they've approved it; until then the card shows `about` instead.
 */
export type TeamMember = {
  name: string;
  role: string;
  /** A factual line about what they do, shown while there's no quote. */
  about: string;
  quote?: string;
};

export const team: TeamMember[] = [
  {
    name: "Prasanna",
    role: "General Manager",
    about:
      "Prasanna looks after every stay, from your first message to the day you leave. He is on hand around the clock with recommendations for restaurants, shopping and the sights of Kandy.",
  },
  {
    name: "Rasu & Manjula",
    role: "Caretakers",
    about:
      "Husband and wife, Rasu and Manjula care for the house and everyone in it, from your luggage on arrival to a cooked breakfast each morning.",
  },
];

/* The only team photo so far: a real group photograph from the old site's home page. */
export const teamPhoto = {
  src: "/assets/images/people/kandy_team.jpg",
  alt: "Prasanna, Rasu and Manjula, the Kandy team, standing together at the villa gate",
};
