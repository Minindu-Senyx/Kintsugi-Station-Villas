/*
 * The Kandy team, for the About page. Names and roles come from the old site
 * and its guest reviews. Add each person's `quote` only in their own words,
 * once they've approved it; until then the card shows `about` instead.
 * There's no team photo for now (the owners asked for the old one to come
 * down). Add new photos only once each person has agreed and been identified.
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
