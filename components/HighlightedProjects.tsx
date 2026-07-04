"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Dummy data — swap for real projects later.
const projects = [
  {
    img: "/ui-images/home/highlighted-projects/project1.jpg",
    title: "Stop For Coffee",
    location: "Hà Nội",
    type: "Kiến trúc",
    style: "Đương đại",
    area: "420 m²",
  },
  {
    img: "/ui-images/home/highlighted-projects/project2x.jpg",
    title: "Laluot Tailor",
    location: "Đống Đa, Hà Nội",
    type: "Nội thất",
    style: "Tối giản",
    area: "135 m²",
  },
  {
    img: "/ui-images/home/highlighted-projects/project3.jpg",
    title: "Saint Stefano",
    location: "Hà Nội",
    type: "Kiến trúc & Nội thất",
    style: "Hiện đại",
    area: "260 m²",
  },
];

const AUTOPLAY_MS = 10000;

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-white/50">
        {label}
      </dt>
      <dd className="text-base md:text-lg text-white">{value}</dd>
    </div>
  );
}

export default function HighlightedProjects() {
  const [index, setIndex] = useState(0);
  const count = projects.length;

  // Follow-cursor arrow — same effect as the Services section.
  const [hovering, setHovering] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const goTo = useCallback((n: number) => setIndex((n + count) % count), [count]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  // Touch swipe (mobile) — swipe left → next, right → prev.
  const touchStartX = useRef<number | null>(null);

  // Autoplay — reschedules whenever `index` changes, so manual navigation
  // resets the timer instead of fighting it.
  useEffect(() => {
    const id = setTimeout(() => setIndex((p) => (p + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, count]);

  const project = projects[index];

  return (
    <section className="w-full">
      {/* Section title — above the carousel */}
      <div className="px-8 md:px-16 lg:px-24 pt-24 md:pt-32 pb-12 md:pb-16">
        <h2 className="font-brasika text-fg leading-[0.95] text-5xl md:text-7xl">
          Dự án nổi bật
        </h2>
      </div>

      {/* Full-screen carousel */}
      <div
        className="relative w-full min-h-dvh overflow-hidden bg-black hover:cursor-pointer"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (dx <= -40) next();
          else if (dx >= 40) prev();
          touchStartX.current = null;
        }}
      >
        {/* Slides — crossfade, with a slow Ken Burns zoom on the active image */}
        {projects.map((p, i) => (
          <div
            key={p.img}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={p.img}
              alt={p.title}
              fill
              sizes="100vw"
              className={`object-cover transition-transform duration-[6000ms] ease-out ${
                i === index ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        ))}

        {/* Scrim — darker toward the bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />

        {/* Bottom content — info on the left, controls on the right */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-8 md:px-16 lg:px-24 pb-24 md:pb-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {/* Info — re-keyed so it fades/rises in on each slide change */}
          <div
            key={index}
            className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 ease-out flex flex-col gap-6 text-white"
          >
            <div className="flex flex-col gap-3">
              <h2 className="font-brasika leading-[1.02] text-4xl md:text-7xl max-w-4xl">
                {project.title}
              </h2>
              <p className="text-base md:text-lg text-white/70">
                {project.location}
              </p>
            </div>

            <dl className="flex flex-wrap gap-x-12 gap-y-5 border-t border-white/20 pt-6 max-w-3xl">
              <Spec label="Loại hình" value={project.type} />
              <Spec label="Phong cách" value={project.style} />
              <Spec label="Diện tích" value={project.area} />
              <Spec label="Địa điểm" value={project.location} />
            </dl>
          </div>

          {/* Controls — counter + arrows (desktop only) */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <span className="font-brasika text-lg tabular-nums text-white/85">
              {String(index + 1).padStart(2, "0")}
              <span className="text-white/40"> / {String(count).padStart(2, "0")}</span>
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Dự án trước"
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-black cursor-pointer"
              >
                <ArrowLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Dự án tiếp theo"
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-black cursor-pointer"
              >
                <ArrowRight size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Slide indicators — mobile only */}
        <div className="md:hidden absolute inset-x-0 bottom-10 z-20 flex items-center justify-center gap-3">
          {projects.map((p, i) => (
            <button
              key={p.img}
              type="button"
              aria-label={`Đến dự án ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>

      {/* Custom follow cursor — mirrors the Services section */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed z-120 flex h-14 w-14 items-center justify-center rounded-full bg-theme text-white transition-[opacity,transform] duration-300 ease-out ${
          hovering ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: `translate(-50%, -50%) scale(${hovering ? 1 : 0.5})`,
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
      </div>
    </section>
  );
}
