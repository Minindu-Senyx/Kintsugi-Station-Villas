import type { Metadata } from "next";
import Image from "next/image";
import { QuoteMark } from "@/components/brand/QuoteMark";
import { founders } from "@/lib/founders";
import styles from "./about.module.css";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "The philosophy of restoration — where Japanese wabi-sabi meets the timeless mist of the Kandy hills at Kintsugi Station.",
};

const materials = [
  {
    src: "/assets/images/reclaimed_teak.jpg",
    alt: "Handcrafted reclaimed Ceylon teak headboard and timber joinery at Villa Acland",
    title: "Reclaimed Ceylon Teak",
    text: "Heritage timber, given new life. Each beam carries a story, shaped by time, weather and craftsmanship.",
  },
  {
    src: "/assets/images/chiseled_stone.jpg",
    alt: "Hand-chiseled river stone foundation, pillars, and garden terraces",
    title: "Hand-Chiseled River Stone",
    text: "Locally sourced stone, shaped by hand, grounding the villa in the landscape it belongs to.",
  },
  {
    src: "/assets/images/mist_mountain_ridge.jpg",
    alt: "Panoramic mountain deck overlooking the mist-filled Kandy valley",
    title: "Living with the Mist",
    text: "Open to the elements, designed to breathe with the hills, where changing light and mist are part of the home.",
  },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className={styles.eyebrow}>
      {children}
    </p>
  );
}

function Signoff({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={styles.signoff}
    >
      <span aria-hidden="true" className={styles.goldLine} />
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>
          About
        </p>
        <h1
          className={styles.heroTitle}
        >
          The Philosophy of Restoration
        </h1>
        <p className={styles.heroIntro}>
          Where Japanese wabi-sabi philosophy meets the timeless mist of the Kandy hills.
        </p>
        <div className={styles.heroImage}>
          <Image
            src="/assets/images/about_hero_panorama.jpg"
            alt="Misty forested hills and a still lake near Kandy"
            fill
            preload
            sizes="(min-width: 900px) 90vw, 100vw"
            className={styles.cover}
          />
        </div>
      </section>

      {/* Our Story */}
      <section className={styles.story}>
        <div
          className={styles.storyImage}
        >
          <Image
            src="/assets/images/villa_forest_exterior.jpg"
            alt="Timber villa veranda with stone plinth nestled in the misty hillside rainforest"
            fill
            sizes="(min-width: 900px) 55vw, 100vw"
            className={styles.cover}
          />
        </div>
        <div className={styles.storyCopy}>
          <div className={styles.copyInner}>
            <Label>Our Story</Label>
            <h2 className={styles.sectionTitle}>
              More Than a Villa,
              <br />
              A Meeting of Worlds
            </h2>
            <div className={styles.prose}>
              <p>
                Kintsugi Station is named for the Japanese art of kintsugi — the practice of mending what is broken
                with gold, finding deeper beauty in the scars. It is a philosophy that reminds us that life&rsquo;s
                imperfections are not flaws, but part of a richer story.
              </p>
              <p>
                Set in the misty hills of Kandy, our villa is a sanctuary dedicated to slowing down, mending the
                spirit, and finding beauty in simplicity. Here, Japanese wabi-sabi meets Sri Lanka&rsquo;s colonial
                hill-country railway heritage — a place where time moves differently, and the everyday feels
                extraordinary.
              </p>
              <p>
                Once a station along a journey, Kintsugi Station is now a destination — a private home for those who
                seek stillness, connection and renewal, surrounded by lush mountain valleys and the gentle rhythm of
                nature.
              </p>
            </div>
            <div className={styles.signature}>
              <Signoff>Beauty Lives On</Signoff>
            </div>
          </div>
        </div>
      </section>

      {/* The Founders */}
      <section className={styles.founders}>
        <div className={styles.founderGrid}>
          <div className={styles.portrait}>
            <Image
              src={founders.photo.src}
              alt={founders.photo.alt}
              fill
              sizes="(min-width: 900px) 25vw, 100vw"
              className={styles.portraitPhoto}
            />
          </div>
          <div className={styles.founderCopy}>
            <Label>The Founders</Label>
            <h2 className={styles.sectionTitle}>
              At Home in Sri Lanka
              <br />
              Since 2011
            </h2>
            <div className={styles.prose}>
              {founders.bio.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className={styles.signature}>
              <Signoff>{founders.names || "A New Lease of Life"}</Signoff>
            </div>
          </div>
        </div>
      </section>

      {/* Craft & Materials */}
      <section className={styles.materials}>
        <Label>Craft &amp; Materials</Label>
        <h2 className={styles.materialsTitle}>
          Rooted in Place, Crafted for a Kinder Tomorrow.
        </h2>
        <div className={styles.materialGrid}>
          {materials.map((item) => (
            <article key={item.title} className={styles.material}>
              <div className={styles.materialImage}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 28vw, 100vw"
                  className={styles.cover}
                />
              </div>
              <div className={styles.materialCopy}>
                <h3 className={styles.materialTitle}>{item.title}</h3>
                <p className={styles.bodyCopy}>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* The Host Experience */}
      <section className={styles.hosting}>
        <div className={styles.hostImage}>
          <Image
            src="/assets/images/host_dining_ritual.jpg"
            alt="Private outdoor dining patio overlooking the hills with curated estate dining"
            fill
            sizes="(min-width: 900px) 44vw, 100vw"
            className={styles.cover}
          />
        </div>
        <div className={styles.hostCopy}>
          <Label>The Host Experience</Label>
          <h2 className={styles.sectionTitle}>
            Thoughtful Living,
            <br />
            Exclusively Yours
          </h2>
          <p className={styles.bodyCopy}>
            Breakfast is included every morning, with home-cooked Sri Lankan meals or a private chef on request, a daily
            Ceylon tea ritual, and the whole villa to yourselves, one party at a time. Every detail is there for a
            slower, more meaningful stay.
          </p>
          <div className={styles.signature}>
            <Signoff>A More Human Way to Travel</Signoff>
          </div>
        </div>
      </section>

      {/* The People Behind Your Stay */}
      <section className={styles.team}>
        <div className={styles.teamGrid}>
          <div className={styles.teamHeading}>
            <Label>The People Behind Your Stay</Label>
            <h2 className={styles.sectionTitle}>
              Meet the Kandy Team
            </h2>
          </div>
          <div className={styles.teamCopy}>
            <ul className={styles.teamList}>
              {team.map((member) => (
                <li key={member.name} className={styles.teamMember}>
                  {member.quote ? (
                    <blockquote>
                      <QuoteMark className={styles.quoteMark} />
                      <p className={styles.quote}>
                        {member.quote}
                      </p>
                    </blockquote>
                  ) : (
                    <p className={styles.bodyCopy}>{member.about}</p>
                  )}
                  <p className={styles.teamName}>
                    {member.name}
                    <span className={styles.role}> · {member.role}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
