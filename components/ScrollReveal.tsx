"use client";

import { useEffect } from "react";

/**
 * Watches every `.reveal` element on the page and adds `is-visible` when it
 * scrolls into view, driving the CSS rise-and-fade transition. Reveals each
 * element once, then stops observing it. Render this once per page.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"),
    );
    if (els.length === 0) return;

    // Fallback for the (rare) browser without IntersectionObserver: show all.
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      // Trigger a touch before the element is fully on screen.
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
