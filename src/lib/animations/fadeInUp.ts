"use client";

import gsap from "gsap";

export const fadeInUp = (
  target: gsap.TweenTarget,
  delay = 0,
  y = 20,
): gsap.core.Tween => {
  return gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay,
    },
  );
};
