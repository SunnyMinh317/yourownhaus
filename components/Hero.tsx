"use client";

import { useEffect, useRef, useState } from "react";

const CHUNK = "YOUROWNHAUS";
// Enough repetitions so one copy is always wider than the widest screen.
// The track holds two identical halves; wrapping by one half-width loops seamlessly.
const HALF = CHUNK.repeat(8);

// Motion tuning ---------------------------------------------------------------
const BASE_SPEED = 45;    // px/s — idle scroll speed
const DRIFT_SPEED = 7;    // px/s — slow drift while hovered
const SCROLL_FACTOR = 6;  // how strongly scroll velocity boosts the marquee
const MAX_BOOST = 1400;   // clamp so a fast flick can't fling it absurdly
const SPEED_EASE = 3;     // how fast speed eases toward its target (hover)
const BOOST_DECAY = 3.5;  // how fast a scroll boost fades back to zero

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);

  // Fade the scroll indicator out on scroll. Kept separate from the marquee
  // effect so it still runs even when reduced-motion disables the animation.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let halfWidth = 0;
    const measure = () => {
      const first = track.firstElementChild as HTMLElement | null;
      halfWidth = first ? first.offsetWidth : 0;
    };
    measure();
    // Re-measure once the custom font has swapped in (width changes).
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);

    // Scroll velocity → transient boost (signed: down speeds up, up reverses).
    let lastScrollY = window.scrollY;
    let boost = 0;
    const onScroll = () => {
      const y = window.scrollY;
      boost += (y - lastScrollY) * SCROLL_FACTOR;
      boost = Math.max(-MAX_BOOST, Math.min(MAX_BOOST, boost));
      lastScrollY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let pos = 0;
    let speed = BASE_SPEED;
    let last = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); // clamp for tab-switch jumps
      last = now;

      // Ease speed toward its target (slow drift on hover, base otherwise).
      const target = hoverRef.current ? DRIFT_SPEED : BASE_SPEED;
      speed += (target - speed) * Math.min(1, dt * SPEED_EASE);

      // Decay the scroll boost back to zero.
      boost -= boost * Math.min(1, dt * BOOST_DECAY);

      pos -= (speed + boost) * dt;

      if (halfWidth > 0) {
        // Keep pos within (-halfWidth, 0] for a seamless wrap in either direction.
        pos = ((pos % halfWidth) + halfWidth) % halfWidth - halfWidth;
      }
      track.style.transform = `translate3d(${pos}px, 0, 0)`;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="relative overflow-hidden overflow-x-hidden flex items-center min-h-dvh">

      {/* Background marquee */}
      <div className="absolute inset-0 flex items-center">
        <div
          ref={trackRef}
          className="flex whitespace-nowrap will-change-transform"
          style={{ fontSize: "clamp(6rem, 18vw, 20rem)" }}
          aria-hidden="true"
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
        >
          {/* Two identical halves — wrapping by one half-width loops seamlessly */}
          <span className="font-brasika leading-none select-none text-[#F2DCAD]">{HALF}</span>
          <span className="font-brasika leading-none select-none text-[#F2DCAD]">{HALF}</span>
        </div>
      </div>

      {/* Foreground headline */}
      <div className="relative z-10 w-full px-12 md:px-20 flex flex-col gap-5 md:gap-20 pointer-events-none">
        <span className="block text-center md:text-left">
          <span className="line-rise font-brasika text-theme leading-[0.9] text-[4rem] md:text-[11rem]">
            we tell
          </span>
        </span>
        <span className="block text-center md:text-right">
          <span
            className="line-rise font-brasika text-theme leading-[0.9] text-[4rem] md:text-[11rem]"
            style={{ animationDelay: "0.15s" }}
          >
            the story
          </span>
        </span>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-xs font-medium uppercase text-fg/40">
          Kéo xuống
        </span>
        <svg
          className="scroll-nudge text-theme/60"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

    </section>
  );
}
