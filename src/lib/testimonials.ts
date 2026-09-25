/*
 * Guest reviews of the Kandy villas, copied word for word from the old site
 * (stationvillas.lk/guest-reviews2/guest-reviews). Only apostrophes are
 * typeset. Never reword a review: shorten it for `excerpt` with "…" instead.
 */
export type Testimonial = {
  name: string;
  date: string;
  /** Villa the guest stayed in on the old site. Not shown for now (see docs/plan-testimonials-founders-staff.md). */
  stay: string;
  /** The full review, one string per paragraph. */
  quote: string[];
  /** The short pull line shown in the home page carousel. */
  excerpt: string;
  /** Shown in the home page carousel, in list order. */
  featured: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Toby",
    date: "December 2024",
    stay: "Avalon Villa",
    quote: [
      "This is a truly magnificent place to stay, a perfect blend of opposites. It’s right in the centre of Kandy, a short walk from the Temple of the Tooth: yet it’s also surrounded by trees and vegetation – the monkeys often come for a visit – and just a couple of hundred yards from a rainforest reserve where you can go for glorious walks. It’s built in a beautiful traditional Sinhalese style, yet it’s incredibly comfortable and has all the modcons you need including a cinema room with movies. It has a well stocked kitchen, it’s easy to get food via uber eats, and the owners provided us with a nice welcome drink and breakfast. We only wish we had arranged to stay here for more than one night. Cannot recommend highly enough",
    ],
    excerpt:
      "This is a truly magnificent place to stay, a perfect blend of opposites. It’s right in the centre of Kandy, a short walk from the Temple of the Tooth: yet it’s also surrounded by trees and vegetation … Cannot recommend highly enough",
    featured: true,
  },
  {
    name: "Eva",
    date: "January 2025",
    stay: "Avalon Villa",
    quote: [
      "The villa is truly amazing! Newly renovated, beautiful inside and outside design, very clean - everything was just perfect!",
      "The outside spaces are green and quiet, nevertheless it’s just a 15 min walk into the city center and to Kandy lake.",
      "The manager, housekeepers and owners were always available for any request and super friendly and nice. Delicious breakfast is included and served on the villa terrace.",
      "It’s really the perfect place to stay with a group of family or friends and we can 100% recommend it!",
    ],
    excerpt:
      "The villa is truly amazing! Newly renovated, beautiful inside and outside design, very clean - everything was just perfect! … It’s really the perfect place to stay with a group of family or friends and we can 100% recommend it!",
    featured: true,
  },
  {
    name: "Mckee and family",
    date: "February 2025",
    stay: "Avalon Villa",
    quote: [
      "This is a spectacular property: recently remodeled, with all the amenities, and a great location. The views from the balcony are spectacular, and every aspect of the interior is top notch. The housekeeper and manager are also fantastic, and are there to help you in any way. Highly recommended!",
    ],
    excerpt:
      "This is a spectacular property: recently remodeled, with all the amenities, and a great location. The views from the balcony are spectacular, and every aspect of the interior is top notch.",
    featured: true,
  },
  {
    name: "David",
    date: "December 2024",
    stay: "Avalon Villa",
    quote: [
      "This was one of the most beautiful places we’ve ever stayed in. It was in beautiful surroundings and the inside and outside were stylish, clean, comfortable and exactly what we needed. Prasanna was immensely helpful and kind, and the housekeeper and his wife looked after us very well.",
    ],
    excerpt:
      "This was one of the most beautiful places we’ve ever stayed in. It was in beautiful surroundings and the inside and outside were stylish, clean, comfortable and exactly what we needed.",
    featured: true,
  },
  {
    name: "Tom & Hannah",
    date: "March 2025",
    stay: "Villa Acland at Avalon Villa",
    quote: [
      "We stayed here for 3 nights during our stay in Kandy and it really is such a beautiful accommodation in a peaceful location just outside the hustle and bustle of Kandy centre. Prasanna was an amazing help giving recommendations for our trip and being available 24/7 for any questions we had. The apartment is beautifully decorated, clean, and the perfect size! The balcony’s are super peaceful to relax on and it was amazing to see monkeys here too! We were also provided a home cooked breakfast which was a nice touch and delicious! I would absolutely recommend this apartment to anybody travelling to kandy - thank you for an amazing and memorable stay!",
    ],
    excerpt:
      "… it really is such a beautiful accommodation in a peaceful location just outside the hustle and bustle of Kandy centre. Prasanna was an amazing help giving recommendations for our trip and being available 24/7 …",
    featured: true,
  },
  {
    name: "Ala",
    date: "January 2025",
    stay: "Villa Acland at Avalon Villa",
    quote: [
      "This beautiful villa is a unique place for all the advantages it offers that doesn’t really show in the listing, host Prasanna takes the extra mile in facilitating every need you may come up with while touring and planning your visit to the city. This unique service can make a huge difference in making your stay unforgettable:",
      "Well made delicious breakfast done with exquisite detailing",
      "Assisting in luggage (Thanx to Rasu and his lovely wife)",
      "Helping in shopping, restaurants, attractions; recommendation and tips",
      "Readiness to serve around the clock with a graceful welcoming attitude",
      "As a superhost myself; I think that this is a special place in every sense of the word. Take it and enjoy all the perks and incredible hospitality.",
    ],
    excerpt:
      "As a superhost myself; I think that this is a special place in every sense of the word. Take it and enjoy all the perks and incredible hospitality.",
    featured: true,
  },
  {
    name: "Ariadna",
    date: "February 2025",
    stay: "Avalon Villa & Villa Acland",
    quote: [
      "Gorgeous villas in a peaceful yet super central location! The villas were beautifully decorated, and the breakfast provided every morning by the villa staff was delicious (choice of Sri Lankan or western)! You can even see some monkeys from the balconies which was for sure entertaining and the massive projector was a great plus! We absolutely loved our time here and would defo stay again!",
    ],
    excerpt: "Gorgeous villas in a peaceful yet super central location! … We absolutely loved our time here and would defo stay again!",
    featured: false,
  },
  {
    name: "Anna",
    date: "January 2025",
    stay: "Villa Acland at Avalon Villa",
    quote: [
      "This is a very special place and a perfect home base in Kandy. It is a beautiful apartment and the team that runs it is wonderful. They could not have been more helpful during our stay.",
    ],
    excerpt: "This is a very special place and a perfect home base in Kandy.",
    featured: false,
  },
  {
    name: "Anuja",
    date: "December 2024",
    stay: "Avalon Villa",
    quote: [
      "Avalon Villa was really amazing! It was tastefully decorated and the property was peaceful and serene. The location was great as it was very close to the main part of the city but also away from the hustle bustle. Prasanna was very warm and welcoming. The caretakers Rasu and Manju were the highlight of our stay. They made my parents feel so comfortable and made sure all their requests were fulfilled. I highly recommend this place!",
    ],
    excerpt: "The caretakers Rasu and Manju were the highlight of our stay. They made my parents feel so comfortable and made sure all their requests were fulfilled.",
    featured: false,
  },
  {
    name: "Jack",
    date: "December 2024",
    stay: "Villa Acland at Avalon Villa",
    quote: [
      "We really enjoyed staying here. A few bits that we loved:",
      "The flat is very beautiful, with well thought out detailing. Massive bed, a bath and a very lovely shower and two balcony’s to enjoy!",
      "The bowl of fruit on arrival and the flexible breakfast was very much to our satisfaction. Ample coffee and fresh water too. Sharp knives and a well stocked kitchen. Prasanna, Manjula and Rasu made everything very easy and they left us to our own devices when requested and helped with local recommendations.",
      "The flat itself is a short walk from Kandy centre or a short tuk-tuk ride. We enjoy walking. It’s nice to step out of the bustle of Kandy, to walk up the hill to the flat and feel the coolness of the air and improvement in air quality away from the town centre.",
      "There are a lovely selection of birds that live in the trees near the balcony and there’s always a macaque or two to watch whilst relaxing on one of the balconies.",
      "We’d definitely stay again - thanks for having us.",
    ],
    excerpt: "Prasanna, Manjula and Rasu made everything very easy and they left us to our own devices when requested and helped with local recommendations.",
    featured: false,
  },
];

export const featuredTestimonials = testimonials.filter((t) => t.featured);
