import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Clock3,
  Sparkles,
  ChevronRight,
  Check,
  CreditCard,
  Coins,
  Star,
  UtensilsCrossed,
} from "lucide-react";

/* =====================================================
BLOCK 1 — DATA CONFIG
===================================================== */

const venetianOptions = [
  {
    tier: "Full Experience",
    price: "$11,500",
    accent: "from-[#EB001B] via-[#FF5F00] to-[#F79E1B]",
    blurb:
      "A full-scale Mastercard-hosted moment inside the Venetian Poker Room with hospitality, energy, and polished logistics baked in.",
    items: [
      "Take-home custom Mastercard strategy guide",
      "30-40 minutes to eat, drink, and mingle",
      "2-hour poker training session",
      "2 pros",
      "Venetian Poker Room",
      "Street taco bar",
      "Private drink bar",
      "Hostess / bartender",
      "Round-trip Sprinter service",
    ],
  },
  {
    tier: "Signature Experience",
    price: "$8,700",
    accent: "from-[#EB001B] via-[#FF5F00] to-[#F79E1B]",
    blurb:
      "The cleanest high-impact option. Premium room, premium instruction, premium guest feel without the extra meal layer.",
    items: [
      "Venetian Poker Room",
      "Take-home custom Mastercard strategy guide",
      "2-hour poker training",
      "2 pros",
      "Private drink bar",
      "Hostess / bartender",
    ],
  },
  {
    tier: "Classic Experience",
    price: "$7,225",
    accent: "from-[#EB001B] via-[#FF5F00] to-[#F79E1B]",
    blurb:
      "A sharp, focused training build centered around elite poker instruction and the atmosphere of the Venetian room.",
    items: [
      "Venetian Poker Room",
      "Take-home custom Mastercard strategy guide",
      "2-hour poker training",
      "2 pros",
    ],
  },
];

const mobOptions = [
  {
    tier: "Full Experience",
    price: "$13,505",
    accent: "from-[#EB001B] via-[#FF5F00] to-[#F79E1B]",
    blurb:
      "Moody, cinematic, and unforgettable. The Distillery transforms the poker training into a full Vegas narrative.",
    items: [
      "Take-home custom Mastercard strategy guide",
      "30-40 minutes to eat, drink, and mingle",
      "2-hour poker training session",
      "2 pros",
      "Mob Museum Distillery",
      "Wide variety of finger food options",
      "Open top shelf bar",
      "Round-trip Sprinter service",
    ],
  },
  {
    tier: "Signature Experience",
    price: "$11,505",
    accent: "from-[#EB001B] via-[#FF5F00] to-[#F79E1B]",
    blurb:
      "Atmosphere, premium bar, and transport wrapped around an elevated training experience.",
    items: [
      "Take-home custom Mastercard strategy guide",
      "30-40 minutes to eat, drink, and mingle",
      "2-hour poker training session",
      "2 pros",
      "Mob Museum Distillery",
      "Open top shelf bar",
      "Round-trip Sprinter service",
    ],
  },
];

const restaurantVenues = ["Toca Madera", "Nobu", "Ruth's Chris"];

const restaurantBase = {
  title: "High-end restaurant training",
  subtitle: "Felt table covers · flexible dining",
  price: "$7,200",
  detail: "Base training (any venue)",
  items: [
    "2 pros",
    "2 tables",
    "Cards",
    "Chips",
    "Custom Mastercard strategy guide",
  ],
};

const upgrades = [
  {
    title: "Custom PVC card decks",
    sub: "20 decks, keep them",
    price: "+$1,000",
    desc: "Add to any package. Card order includes 20 premium PVC decks.",
    icon: CreditCard,
  },
  {
    title: "Full-set custom chips",
    sub: "Enough for all, take home",
    price: "+$1,000",
    desc: "Add to any package. Chip order includes enough chips for all students.",
    icon: Coins,
  },
];

const pros = [
  {
    name: "Jeff Madsen",
    role: "WSOP Champion",
    image:
      "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/694497c2e78870ea91447991.png",
    stat: "4x WSOP bracelet winner",
  },
  {
    name: "Nick Pupillo",
    role: "WPT Champion",
    image:
      "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/69b35c69222c3307b3295616.webp",
    stat: "World Poker Tour champion",
  },
  {
    name: "Kenna James",
    role: "Vegas Legend",
    image:
      "https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/69329adbe0f092644fb65b71.jpg",
    stat: "Elite live poker coach",
  },
];

/* =====================================================
BLOCK 2 — LIGHTWEIGHT UI HELPERS (GITHUB SAFE)
===================================================== */

function ShellCard({ className = "", children }) {
  return (
    <div
      className={`overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, body }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-3 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
        {eyebrow}
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-lg font-medium leading-8 text-white/90">
        {body}
      </p>
    </div>
  );
}

/* =====================================================
BLOCK 3 — EXPERIENCE CARD
===================================================== */

function ExperienceCard({ option }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <ShellCard>
        <div className={`h-2 w-full bg-gradient-to-r ${option.accent}`} />

        <div className="p-8">
          <div className="flex justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-white">
                {option.tier}
              </div>
              <div className="mt-2 bg-gradient-to-r from-[#EB001B] via-[#FF5F00] to-[#F79E1B] bg-clip-text text-3xl font-bold text-transparent">
                {option.price}
              </div>
            </div>

            <div className="flex h-7 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 text-xs font-medium tracking-wide text-white/90">
              11–12 Guests
            </div>
          </div>

          <p className="mt-4 text-base leading-7 text-white/85">{option.blurb}</p>

          <div className="mt-6 space-y-3">
            {option.items.map((item) => (
              <div key={item} className="flex gap-3 text-white/95">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[#F79E1B]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </ShellCard>
    </motion.div>
  );
}

/* =====================================================
BLOCK 4 — MAIN COMPONENT
GITHUB USAGE NOTES
-----------------------------------------------------
This file is ready to run in a standard React + Vite + Tailwind project.

Recommended project structure:

/src
  main.jsx
  App.jsx
  /components
    MastercardProposal.jsx

Install dependencies:

npm install framer-motion lucide-react

Then import in App.jsx:

import MastercardProposal from "./components/MastercardProposal";

function App() {
  return <MastercardProposal />;
}

export default App;
===================================================== */

export default function MastercardProposal() {
  const [venueTab, setVenueTab] = useState("venetian");

  const activeOptions = useMemo(() => {
    if (venueTab === "venetian") return venetianOptions;
    if (venueTab === "mob") return mobOptions;
    return [];
  }, [venueTab]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-white">
      {/* =====================================================
      BLOCK 5 — HERO
      Mastercard animated circle motif + subtle motion
      ===================================================== */}
      <section className="relative flex min-h-[720px] items-center overflow-hidden border-b border-white/10">
        <img
          src="https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/69b46bd1ba922c78abd3a436.png"
          alt="Mastercard poker experience"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0.35 }}
          animate={{ scale: 1.05, opacity: 0.45 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-[60%] -translate-y-[50%] rounded-full bg-[#EB001B]/30 blur-3xl"
        />

        <motion.div
          initial={{ scale: 1.1, opacity: 0.35 }}
          animate={{ scale: 0.95, opacity: 0.45 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] translate-x-[10%] -translate-y-[50%] rounded-full bg-[#F79E1B]/30 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-8 py-28">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-4xl text-5xl font-bold leading-[1.02] sm:text-6xl sm:leading-tight"
          >
            A{" "}
            <span className="bg-gradient-to-r from-[#EB001B] via-[#FF5F00] to-[#F79E1B] bg-clip-text text-transparent">
              Priceless
            </span>{" "}
            Poker Experience
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 max-w-2xl text-xl leading-7 text-white/90"
          >
            An elite Las Vegas poker training experience designed for Mastercard
            executives and guests.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-10 grid max-w-xl grid-cols-3 gap-6"
          >
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
              <Users className="text-[#F79E1B]" />
              <div className="mt-2">11-12 Guests</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
              <Clock3 className="text-[#F79E1B]" />
              <div className="mt-2">2 Hour Training</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
              <MapPin className="text-[#F79E1B]" />
              <div className="mt-2">March 19</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
      BLOCK 6 — WHY THIS WORKS FOR MASTERCARD
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <SectionTitle
          eyebrow="Strategic Fit"
          title="Why this works for Mastercard"
          body="The experience mirrors Mastercard’s brand philosophy: premium access, unforgettable moments, and social connection through shared experiences."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Star,
              title: "Premium Access",
              desc: "A private poker room experience normally unavailable to the public.",
            },
            {
              icon: Sparkles,
              title: "Memorable Entertainment",
              desc: "Interactive strategy, competition and laughter with world-class poker pros.",
            },
            {
              icon: Users,
              title: "Connection",
              desc: "Poker naturally creates conversation, collaboration and camaraderie.",
            },
          ].map((item) => (
            <ShellCard key={item.title} className="rounded-3xl">
              <div className="p-8">
                <item.icon className="text-[#F79E1B]" />
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 leading-7 text-white/85">{item.desc}</p>
              </div>
            </ShellCard>
          ))}
        </div>
      </section>

      {/* =====================================================
      BLOCK 7 — VENUE SWITCH
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <SectionTitle
          eyebrow="Experience Options"
          title="Venue Experience Paths"
          body="Compare Venetian Poker Room and Mob Museum Distillery experiences."
        />

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => setVenueTab("venetian")}
            className={`rounded-full px-6 py-3 transition-colors ${
              venueTab === "venetian"
                ? "bg-white text-black"
                : "border border-white/30 text-white hover:bg-white/10"
            }`}
          >
            Venetian
          </button>

          <button
            onClick={() => setVenueTab("mob")}
            className={`rounded-full px-6 py-3 transition-colors ${
              venueTab === "mob"
                ? "bg-white text-black"
                : "border border-white/30 text-white hover:bg-white/10"
            }`}
          >
            Mob Museum
          </button>
        </div>

        <div className="mt-12 grid gap-8 xl:grid-cols-3">
          {activeOptions.map((option) => (
            <ExperienceCard key={option.tier} option={option} />
          ))}
        </div>
      </section>

      {/* =====================================================
      BLOCK 8 — RESTAURANT / FLEX VENUE OPTION
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <SectionTitle
          eyebrow="Restaurant / Flexible Venue"
          title="Toca Madera · Nobu · Ruth's Chris"
          body="High-end restaurant training with felt table covers and flexible dining flow."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ShellCard>
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-[0.25em] text-white">
                    {restaurantBase.detail}
                  </div>
                  <h3 className="mt-3 text-3xl font-bold text-white">
                    {restaurantBase.title}
                  </h3>
                  <p className="mt-2 text-lg text-white/90">
                    {restaurantBase.subtitle}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#EB001B] via-[#FF5F00] to-[#F79E1B] bg-clip-text text-4xl font-bold text-transparent">
                  {restaurantBase.price}
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {restaurantBase.items.map((item) => (
                  <div key={item} className="flex gap-3 text-white/95">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#F79E1B]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-start gap-3">
                  <UtensilsCrossed className="mt-1 h-5 w-5 text-[#F79E1B]" />
                  <div>
                    <p className="text-white/95">
                      You choose: specialty menu or settle tab.
                    </p>
                    <p className="mt-2 text-white/80">Add-ons below.</p>
                  </div>
                </div>
              </div>
            </div>
          </ShellCard>

          <ShellCard>
            <div className="p-8 sm:p-10">
              <div className="text-sm uppercase tracking-[0.25em] text-white">
                Venue fit
              </div>
              <h3 className="mt-3 text-2xl font-bold text-white">
                Flexible restaurant execution
              </h3>
              <p className="mt-4 leading-7 text-white/85">
                We can stage this experience inside {restaurantVenues.join(
                  ", "
                )}, or a comparable venue of your choice, using felt table covers
                over existing tables where needed.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Ideal for a dining-first format",
                  "Smooth hospitality integration",
                  "Easy to customize around the evening",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-white/95">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#F79E1B]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ShellCard>
        </div>
      </section>

      {/* =====================================================
      BLOCK 9 — ADD-ONS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <SectionTitle
          eyebrow="Customize with branded gear"
          title="Add-ons for any package"
          body="Card or chip order: 20 decks / enough chips for all students."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {upgrades.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ShellCard>
                <div className="p-8 sm:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <item.icon className="h-6 w-6 text-[#F79E1B]" />
                    </div>
                    <div className="bg-gradient-to-r from-[#EB001B] via-[#FF5F00] to-[#F79E1B] bg-clip-text text-3xl font-bold text-transparent">
                      {item.price}
                    </div>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-lg text-white/95">{item.sub}</p>
                  <p className="mt-4 leading-7 text-white/80">{item.desc}</p>
                </div>
              </ShellCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-sm text-white/70">
          *Add to any package · Card or chip order: 20 decks / Enough chips for
          all students.
        </p>
      </section>

      {/* =====================================================
      BLOCK 10 — VIDEO
      ===================================================== */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <SectionTitle
          eyebrow="Venue Spotlight"
          title="Mob Museum Distillery"
          body="Preview the atmosphere of the Underground Distillery — one of the most unique corporate venues in Las Vegas."
        />

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10">
          <iframe
            className="w-full"
            height="500"
            src="https://www.youtube-nocookie.com/embed/B06xlP1Rk6s"
            title="Mob Museum Distillery"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* =====================================================
      BLOCK 11 — PROS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <SectionTitle
          eyebrow="World Class Pros"
          title="Your Instructors"
          body="Two pros and two tables create the ideal dynamic for a group of this size."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {pros.map((pro) => (
            <ShellCard key={pro.name} className="rounded-3xl">
              <img
                src={pro.image}
                alt={pro.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <div className="text-sm text-white/80">{pro.role}</div>
                <h3 className="mt-1 bg-gradient-to-r from-[#EB001B] via-[#FF5F00] to-[#F79E1B] bg-clip-text text-2xl font-bold text-transparent">
                  {pro.name}
                </h3>
                <p className="mt-2 text-white/85">{pro.stat}</p>
              </div>
            </ShellCard>
          ))}
        </div>
      </section>

      {/* =====================================================
      BLOCK 12 — CLOSING
      ===================================================== */}
      <section className="relative border-t border-white/10 py-28">
        <img
          src="https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/69b46364fc5128cf4e7a2482.jpg"
          alt="Venetian Poker Room"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative mx-auto max-w-6xl px-8">
          <h2 className="text-5xl font-bold">YOUR STRONGEST PLAY</h2>

          <p className="mt-6 max-w-4xl text-xl leading-8 text-white/90">
            From the iconic Venetian Poker Room to the cinematic Mob Museum
            Distillery to high-end restaurant environments such as Toca Madera,
            Nobu, or Ruth&apos;s Chris, each option delivers a premium poker
            training experience tailored to the tone, flow, and hospitality style
            of the event.
          </p>

          <a
            href="mailto:matt@lasvegaspokertraining.com?subject=Reserve%20YOUR%20Experience"
            className="mt-8 inline-flex items-center rounded-full bg-gradient-to-r from-[#EB001B] via-[#FF5F00] to-[#F79E1B] px-8 py-4 font-semibold text-white shadow-lg shadow-[#FF5F00]/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#FF5F00]/40"
          >
            Reserve YOUR Experience
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="pointer-events-none absolute bottom-8 right-8 flex items-center gap-3 opacity-90">
          <img
            src="https://assets.cdn.filesafe.space/E2BEbKIK8SvsJICq4vXY/media/688b94d7fc4ae33b5ab65b48.png"
            alt="Las Vegas Poker Training"
            className="h-10"
          />
          <div className="text-xs uppercase tracking-widest text-white/90">
            Las Vegas Poker Training Proposal
          </div>
        </div>
      </section>
    </div>
  );
}

/* =====================================================
BLOCK 13 — OPTIONAL TEST FILE FOR GITHUB
-----------------------------------------------------
Create: src/components/MastercardProposal.test.jsx

import { render, screen, fireEvent } from "@testing-library/react";
import MastercardProposal from "./MastercardProposal";

describe("MastercardProposal", () => {
  it("renders the hero title", () => {
    render(<MastercardProposal />);
    expect(screen.getByText(/Priceless/i)).toBeInTheDocument();
  });

  it("renders the closing CTA", () => {
    render(<MastercardProposal />);
    expect(
      screen.getByRole("link", { name: /Reserve YOUR Experience/i })
    ).toBeInTheDocument();
  });

  it("renders Venetian pricing by default", () => {
    render(<MastercardProposal />);
    expect(screen.getByText(/\$11,500/i)).toBeInTheDocument();
  });

  it("switches to Mob Museum tab", () => {
    render(<MastercardProposal />);
    fireEvent.click(screen.getByRole("button", { name: /Mob Museum/i }));
    expect(screen.getByText(/\$13,505/i)).toBeInTheDocument();
  });

  it("renders the restaurant venue heading", () => {
    render(<MastercardProposal />);
    expect(screen.getByText(/Toca Madera/i)).toBeInTheDocument();
  });
});
===================================================== */
