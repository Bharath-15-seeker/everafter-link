import { useMemo } from "react";
import { Heart } from "lucide-react";

export function FloatingHearts({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 18,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 8,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it) => (
        <Heart
          key={it.id}
          className="absolute animate-float-up text-rose fill-rose"
          style={{
            left: `${it.left}%`,
            width: it.size,
            height: it.size,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
            opacity: it.opacity,
            color: "var(--rose)",
          }}
        />
      ))}
    </div>
  );
}

export function FallingPetals({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 16,
        duration: 10 + Math.random() * 12,
        delay: Math.random() * 10,
        hue: [15, 50, 310][i % 3],
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it) => (
        <svg
          key={it.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${it.left}%`,
            width: it.size,
            height: it.size,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
          }}
          viewBox="0 0 24 24"
          fill={`oklch(0.85 0.08 ${it.hue})`}
        >
          <path d="M12 2C8 6 6 10 12 22C18 10 16 6 12 2Z" opacity="0.85" />
        </svg>
      ))}
    </div>
  );
}

export function Sparkles({ count = 20 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 3,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it) => (
        <span
          key={it.id}
          className="absolute rounded-full bg-gold animate-shimmer"
          style={{
            top: `${it.top}%`,
            left: `${it.left}%`,
            width: it.size,
            height: it.size,
            background: "var(--gold)",
            boxShadow: "0 0 8px var(--gold)",
            animationDelay: `${it.delay}s`,
          }}
        />
      ))}
    </div>
  );
}