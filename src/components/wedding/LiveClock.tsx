import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = String(now.getHours() % 12 || 12).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  const Digit = ({ value }: { value: string }) => (
    <div className="relative inline-block w-10 sm:w-12 text-center overflow-hidden h-12 sm:h-14">
      <motion.span
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 font-display font-semibold text-3xl sm:text-4xl text-gold"
      >
        {value}
      </motion.span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-script text-2xl text-rose" style={{ color: "var(--rose)" }}>
        Muhurtham
      </p>
      <p className="font-display text-2xl sm:text-3xl text-foreground">9 : 30 AM</p>
      <div className="gold-divider my-2" />
      <p className="font-serif italic text-xs text-muted-foreground">Live time now</p>
      <div className="flex items-center gap-1 px-4 py-2 rounded-xl glass-card">
        <Digit value={hh} />
        <span className="font-display text-3xl sm:text-4xl text-gold animate-pulse-soft">:</span>
        <Digit value={mm} />
        <span className="font-display text-3xl sm:text-4xl text-gold animate-pulse-soft">:</span>
        <Digit value={ss} />
        <span className="ml-2 font-serif text-sm text-muted-foreground">{ampm}</span>
      </div>
    </div>
  );
}