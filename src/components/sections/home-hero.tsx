"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type ScrambleLinkProps = {
  href: string;
  label: string;
  tick: number;
};

function ScrambleLink({ href, label, tick }: ScrambleLinkProps) {
  const [display, setDisplay] = useState(label);

  useEffect(() => {
    if (tick === 0) return;

    let frame = 0;
    const totalFrames = Math.max(label.length + 8, 14);
    const interval = window.setInterval(() => {
      const revealCount = Math.floor((frame / totalFrames) * label.length);
      const next = label
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < revealCount) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      setDisplay(next);
      frame += 1;

      if (frame > totalFrames) {
        window.clearInterval(interval);
        setDisplay(label);
      }
    }, 45);

    return () => window.clearInterval(interval);
  }, [tick, label]);

  return (
    <Link
      href={href}
      aria-label={label}
      className="text-[13px] font-semibold uppercase tracking-[0.1em] text-zinc-900 underline-offset-4 hover:underline"
    >
      {display}
    </Link>
  );
}

export function HomeHero() {
  const [scrambleTick, setScrambleTick] = useState(0);

  useEffect(() => {
    let timeoutId: number | undefined;

    const scheduleNext = () => {
      const delay = 5000;
      timeoutId = window.setTimeout(() => {
        setScrambleTick((current) => current + 1);
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative mx-auto flex w-full flex-1 items-center justify-center bg-white px-4 py-8 sm:px-6 sm:py-10">
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
        <video
          className="w-full max-w-3xl rounded-md object-contain"
          src="/conductor_intro_remix.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <motion.div
          className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.12,
              },
            },
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <ScrambleLink href="mailto:artists@setlister.ai" label="ARTIST" tick={scrambleTick} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <ScrambleLink href="mailto:labels@setlister.ai" label="LABELS" tick={scrambleTick} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <ScrambleLink
              href="mailto:ticketing@setlister.ai"
              label="PLATFORMS"
              tick={scrambleTick}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
