import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Sparkles } from "./Particles";

export function Envelope({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="envelope"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
          style={{ background: "var(--gradient-romantic)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <Sparkles count={30} />

          <motion.p
            className="font-script text-3xl text-rose mb-6 text-center"
            style={{ color: "var(--rose)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            You are invited
          </motion.p>

          <motion.button
            onClick={onOpen}
            className="relative w-[300px] h-[210px] sm:w-[380px] sm:h-[266px] cursor-pointer focus:outline-none"
            initial={{ scale: 0.5, opacity: 0, rotateX: -30 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            aria-label="Open invitation"
          >
            {/* envelope body */}
            <div
              className="absolute inset-0 rounded-md"
              style={{
                background: "var(--gradient-envelope)",
                boxShadow: "var(--shadow-soft)",
              }}
            />
            {/* side flaps */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 50% 60%, 100% 0)",
                background: "color-mix(in oklab, var(--blush) 80%, white)",
              }}
            />
            {/* bottom inner letter peek */}
            <div className="absolute left-4 right-4 bottom-4 top-[35%] rounded-sm bg-white/95 flex items-center justify-center">
              <p className="font-script text-2xl sm:text-3xl text-rose" style={{ color: "var(--rose)" }}>
                Thamu &amp; Sneha
              </p>
            </div>
            {/* top flap (opens) */}
            <motion.div
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                height: "60%",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "var(--gradient-envelope)",
                transformStyle: "preserve-3d",
              }}
              initial={{ rotateX: 0 }}
              whileHover={{ rotateX: -15 }}
              transition={{ duration: 0.4 }}
            />
            {/* wax seal */}
            <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-10 animate-seal">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle at 30% 30%, oklch(0.75 0.18 15), oklch(0.5 0.18 15))",
                  boxShadow: "0 4px 12px oklch(0.4 0.18 15 / 0.5)",
                }}
              >
                <Heart className="w-7 h-7 text-white fill-white" />
              </div>
            </div>
          </motion.button>

          <motion.p
            className="mt-10 font-serif italic text-foreground/70 text-center text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            tap the envelope to open
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}