import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Envelope } from "@/components/wedding/Envelope";
import { ScratchCard } from "@/components/wedding/ScratchCard";
import { LiveClock } from "@/components/wedding/LiveClock";
import { FloatingHearts, FallingPetals } from "@/components/wedding/Particles";
import couple from "@/assets/couple.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Thamu ♥ Sneha — Wedding Invitation" },
      { name: "description", content: "Join us in celebrating the wedding of V. Thamu and M. Sneha on 29 May 2026 at Sree Mahal, Kovilpatti." },
      { property: "og:title", content: "Thamu ♥ Sneha — Wedding Invitation" },
      { property: "og:description", content: "29 May 2026 · 9:30 AM · Sree Mahal, Kovilpatti" },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Envelope open={opened} onOpen={() => setOpened(true)} />
      {opened && (
        <>
          <FallingPetals count={16} />
          <FloatingHearts count={10} />
          <Invitation />
        </>
      )}
    </main>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      {...fadeUp}
      className={`relative z-10 mx-auto w-full max-w-xl px-5 py-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <span className="h-px w-12 bg-gold/60" style={{ background: "var(--gradient-gold)" }} />
      <Heart className="w-3 h-3" style={{ color: "var(--rose)", fill: "var(--rose)" }} />
      <span className="h-px w-12 bg-gold/60" style={{ background: "var(--gradient-gold)" }} />
    </div>
  );
}

function Invitation() {
  const mapsUrl = "https://maps.app.goo.gl/soSLsRyeNnXZ2tVU7";
  // Sree Mahal, Kovilpatti
  const mapsEmbed =
    "https://maps.google.com/maps?q=Sree%20Mahal%20Kovilpatti&t=&z=15&ie=UTF8&iwloc=&output=embed";

  const handleSaveDate = () => {
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Wedding of Thamu & Sneha
DTSTART:20260529T040000Z
DTEND:20260529T070000Z
LOCATION:Sree Mahal, Kovilpatti
DESCRIPTION:With love\\, join us to celebrate our wedding.
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "thamu-sneha-wedding.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative z-10">
      {/* HERO */}
      <Section className="pt-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-serif italic text-sm tracking-[0.3em] text-muted-foreground uppercase"
        >
          Save our date
        </motion.p>
        <Ornament />
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-script text-6xl sm:text-7xl text-gold leading-tight"
        >
          Thamu
          <span className="block text-rose text-4xl sm:text-5xl my-1" style={{ color: "var(--rose)" }}>
            &amp;
          </span>
          Sneha
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="mt-6 flex justify-center"
        >
          <img
            src={couple}
            alt="Bride and groom illustration"
            width={768}
            height={896}
            className="w-56 sm:w-72 h-auto drop-shadow-xl"
          />
        </motion.div>

        <p className="mt-4 font-serif italic text-foreground/80">
          “Two souls, one heart, one beautiful beginning.”
        </p>
      </Section>

      {/* COUPLE DETAILS */}
      <Section>
        <div className="glass-card rounded-3xl p-6 sm:p-8">
          <p className="text-center font-serif italic text-muted-foreground text-sm">
            With love &amp; the blessings of our families
          </p>
          <Ornament />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="text-center">
              <p className="font-serif italic text-xs uppercase tracking-widest text-muted-foreground">
                The Groom
              </p>
              <h2 className="font-script text-5xl text-gold mt-1">V. Thamu</h2>
              <div className="gold-divider my-3" />
              <p className="font-serif text-sm text-foreground/80">Son of</p>
              <p className="font-display text-base text-foreground">M. Vaithilingam</p>
              <p className="font-serif italic text-xs text-muted-foreground">&amp;</p>
              <p className="font-display text-base text-foreground">V. Uma</p>
            </div>

            <div className="text-center">
              <p className="font-serif italic text-xs uppercase tracking-widest text-muted-foreground">
                The Bride
              </p>
              <h2 className="font-script text-5xl text-gold mt-1">M. Sneha</h2>
              <div className="gold-divider my-3" />
              <p className="font-serif text-sm text-foreground/80">Daughter of</p>
              <p className="font-display text-base text-foreground">T. Marichammy</p>
              <p className="font-serif italic text-xs text-muted-foreground">&amp;</p>
              <p className="font-display text-base text-foreground">M. Santhi</p>
            </div>
          </div>
        </div>
      </Section>

      {/* SCRATCH DATE */}
      <Section className="text-center">
        <p className="font-serif italic uppercase tracking-[0.3em] text-xs text-muted-foreground">
          The big day
        </p>
        <Ornament />
        <h3 className="font-script text-4xl text-rose mb-5" style={{ color: "var(--rose)" }}>
          Our Wedding Date
        </h3>
        <div className="flex justify-center">
          <ScratchCard width={300} height={170}>
            <div className="flex flex-col items-center">
              <Calendar className="w-6 h-6 text-gold mb-1" style={{ color: "var(--rose)" }} />
              <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Friday
              </p>
              <p className="font-script text-5xl text-gold leading-tight">29 May</p>
              <p className="font-display text-2xl text-foreground tracking-widest">2026</p>
            </div>
          </ScratchCard>
        </div>
      </Section>

      {/* LIVE CLOCK */}
      <Section className="text-center">
        <LiveClock />
      </Section>

      {/* MAP */}
      <Section>
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6 text-center">
            <p className="font-serif italic uppercase tracking-[0.3em] text-xs text-muted-foreground">
              Venue
            </p>
            <Ornament />
            <h3 className="font-script text-4xl text-gold">Sree Mahal</h3>
            <p className="font-display text-foreground/80 mt-1 flex items-center justify-center gap-1">
              <MapPin className="w-4 h-4" style={{ color: "var(--rose)" }} />
              Kovilpatti, Tamil Nadu
            </p>
          </div>
          <div className="px-4 pb-4">
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-md">
              <iframe
                title="Sree Mahal Kovilpatti map"
                src={mapsEmbed}
                width="100%"
                height="240"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block" }}
              />
            </div>
          </div>
          <div className="p-4 pt-0 flex justify-center">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-primary-foreground font-display tracking-widest text-sm shadow-lg transition-transform hover:scale-105"
              style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
            >
              <ExternalLink className="w-4 h-4" />
              Open in Maps
            </a>
          </div>
        </div>
      </Section>

      {/* SAVE THE DATE CTA */}
      <Section className="text-center pb-20">
        <motion.button
          onClick={handleSaveDate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-display text-base tracking-[0.2em] uppercase shadow-xl"
          style={{
            background: "linear-gradient(135deg, oklch(0.72 0.15 10), oklch(0.65 0.18 15))",
            boxShadow: "0 12px 40px -10px oklch(0.65 0.18 10 / 0.55)",
          }}
        >
          <Heart className="w-4 h-4 fill-white" />
          Save the Date
        </motion.button>

        <div className="mt-10">
          <Ornament />
          <p className="font-script text-3xl text-rose" style={{ color: "var(--rose)" }}>
            With love, Thamu &amp; Sneha
          </p>
          <p className="font-serif italic text-xs text-muted-foreground mt-2">
            Your presence is the greatest gift
          </p>
        </div>
      </Section>
    </div>
  );
}
}
