import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LiveClock() {
  // 🎯 Target wedding date & time
  const targetDate = new Date("2026-05-29T09:30:00+05:30");

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { dd: "00", hh: "00", mm: "00", ss: "00" };
    }

    // 🧮 Logic for Days, Hours, Minutes, and Seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      dd: String(days).padStart(2, "0"),
      hh: String(hours).padStart(2, "0"),
      mm: String(minutes).padStart(2, "0"),
      ss: String(seconds).padStart(2, "0"),
    };
  }

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(id);
  }, []);

 // inside LiveClock.tsx

const Digit = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center">
    {/* 1. Increased height and added relative positioning safety */}
    <div className="relative w-12 sm:w-16 h-12 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          // 2. Adjusted animation to be more subtle
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          // 3. Forced text color and added z-index
          className="absolute font-display font-semibold text-2xl sm:text-4xl text-gold z-10"
          style={{ color: '#D4AF37' }} // Inline gold fallback
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">
      {label}
    </span>
  </div>
);

return (
  <div className="flex flex-col items-center gap-2">
    <p className="font-script text-3xl text-rose" style={{ color: "var(--rose)" }}>
      Muhurtham
    </p>

    <p className="font-display text-xl sm:text-2xl text-foreground">
      May 29, 2026 • 9:30 AM
    </p>

    <div className="gold-divider my-2 w-32 h-[1px] bg-gold/30" />

    <p className="font-serif italic text-xs text-muted-foreground mb-2">
      The countdown begins
    </p>

    {/* 4. Ensure items-center and consistent spacing */}
    <div className="flex items-center justify-center gap-1 sm:gap-3 px-4 py-6 rounded-2xl glass-card bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
      <Digit value={timeLeft.dd} label="Days" />
      <span className="mb-5 font-display text-2xl text-gold/50">:</span>
      <Digit value={timeLeft.hh} label="Hrs" />
      <span className="mb-5 font-display text-2xl text-gold/50">:</span>
      <Digit value={timeLeft.mm} label="Min" />
      <span className="mb-5 font-display text-2xl text-gold/50">:</span>
      <Digit value={timeLeft.ss} label="Sec" />
    </div>
  </div>
);
}