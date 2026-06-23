import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    const steps = [
      { target: 30, delay: 0, duration: 400 },
      { target: 60, delay: 420, duration: 350 },
      { target: 85, delay: 800, duration: 300 },
      { target: 100, delay: 1120, duration: 280 },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach(({ target, delay, duration }) => {
      const t = setTimeout(() => {
        const start = Date.now();
        const from = progress;
        const tick = () => {
          const elapsed = Date.now() - start;
          const pct = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - pct, 3);
          setProgress(Math.round(from + (target - from) * eased));
          if (pct < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delay);
      timers.push(t);
    });

    const done = setTimeout(() => {
      setPhase("done");
      setTimeout(onComplete, 600);
    }, 1700);

    timers.push(done);
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #04080f 0%, #07101e 50%, #0a1628 100%)" }}
        >
          {/* Animated background grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(#c9a227 1px, transparent 1px), linear-gradient(90deg, #c9a227 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Glowing orbs */}
          <motion.div
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 70%)", top: "15%", left: "20%" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)", bottom: "10%", right: "15%" }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="relative flex flex-col items-center gap-10">
            {/* Logo ring + globe */}
            <div className="relative flex items-center justify-center">
              {/* Outer spinning ring */}
              <motion.div
                className="absolute w-36 h-36 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: "#c9a227",
                  borderRightColor: "rgba(201,162,39,0.3)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner spinning ring (reverse) */}
              <motion.div
                className="absolute w-24 h-24 rounded-full border-2 border-transparent"
                style={{
                  borderBottomColor: "#c9a227",
                  borderLeftColor: "rgba(201,162,39,0.25)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              />
              {/* Center logo */}
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ background: "linear-gradient(135deg, #c9a227, #e8c547)" }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(201,162,39,0.4)",
                    "0 0 50px rgba(201,162,39,0.7)",
                    "0 0 20px rgba(201,162,39,0.4)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
              >
                <GlobeIcon />
              </motion.div>
            </div>

            {/* Company name */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                <div className="text-4xl font-bold tracking-[0.25em] text-white mb-1.5 uppercase">
                  SINOGLOBAL
                </div>
                <div
                  className="text-xs tracking-[0.4em] uppercase font-semibold"
                  style={{ color: "#c9a227" }}
                >
                  Enterprise Co., Ltd.
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 mt-4 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {["Fortune 500", "ISO 9001:2015", "MSCI ESG: AA"].map((badge, i) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="px-2.5 py-1 rounded-full text-[10px] tracking-widest border font-medium"
                    style={{ borderColor: "rgba(201,162,39,0.3)", color: "rgba(201,162,39,0.8)", background: "rgba(201,162,39,0.05)" }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Progress bar */}
            <motion.div
              className="w-72"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Initializing
                </span>
                <span className="text-[10px] font-bold tabular-nums" style={{ color: "#c9a227" }}>
                  {progress}%
                </span>
              </div>
              <div
                className="h-[2px] w-full rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #c9a227, #e8c547)",
                    boxShadow: "0 0 8px rgba(201,162,39,0.6)",
                  }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Pulse dots */}
              <div className="flex items-center justify-center gap-2 mt-5">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#c9a227" }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom tagline */}
          <motion.p
            className="absolute bottom-10 text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.18)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Building Tomorrow's World Economy
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GlobeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0a1628" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
