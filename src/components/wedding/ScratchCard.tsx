import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function ScratchCard({
  width = 320,
  height = 180,
  children,
}: {
  width?: number;
  height?: number;
  children: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // gold scratch surface
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#e8c074");
    grad.addColorStop(0.5, "#f4dca0");
    grad.addColorStop(1, "#c9963d");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "italic 18px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ scratch to reveal the date ✦", width / 2, height / 2 + 6);
  }, [width, height]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // sample reveal %
    const dpr = window.devicePixelRatio || 1;
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < img.length; i += 4 * 50) {
      if (img[i] === 0) cleared++;
    }
    const pct = cleared / (img.length / (4 * 50));
    if (pct > 0.45) setRevealed(true);
    void dpr;
  };

  const getPos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden glass-card"
      style={{ width, height }}
    >
      {/* hidden content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        {children}
      </div>

      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
        style={{ width, height }}
        animate={revealed ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        onPointerDown={(e) => {
          (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
          setIsDrawing(true);
          const { x, y } = getPos(e);
          scratch(x, y);
        }}
        onPointerMove={(e) => {
          if (!isDrawing) return;
          const { x, y } = getPos(e);
          scratch(x, y);
        }}
        onPointerUp={() => setIsDrawing(false)}
      />
    </div>
  );
}