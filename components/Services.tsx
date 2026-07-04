"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const services = [
  {
    title: "Thiết kế & thi công nội thất",
    subtitle: "Không gian sống tinh tế, mang đúng dấu ấn của bạn.",
    img: "/ui-images/home/servies/interior.jpg",
    href: "/dich-vu/noi-that",
  },
  {
    title: "Thiết kế & thi công kiến trúc",
    subtitle: "Từ bản vẽ đầu tiên đến công trình hoàn thiện.",
    img: "/ui-images/home/servies/architecture.jpg",
    href: "/dich-vu/kien-truc",
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section className="w-full flex flex-col">
      {/* Section heading */}
      <div className="px-10 md:px-16 lg:px-24 pt-24 md:pt-32 pb-12 md:pb-16 flex flex-col gap-4">
        <h2 className="font-brasika text-fg leading-[0.95] text-5xl md:text-7xl max-w-4xl">
          Dịch vụ của chúng tôi
        </h2>
      </div>

      {/* Service panels */}
      <div className="w-full flex flex-col md:flex-row border-y border-fg/10">
      {services.map((s, i) => (
        <Link
          key={s.href}
          href={s.href}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
          onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
          className={`group relative w-full md:w-1/2 min-h-[55vh] flex items-end overflow-hidden cursor-pointer ${
            i === 1 ? "border-t md:border-t-0 md:border-l border-fg/10" : ""
          }`}
        >
          {/* Sliding image — starts above the panel, slides down on hover */}
          <div className="absolute inset-0 -translate-y-full transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0">
            <Image
              src={s.img}
              alt={s.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Scrim for text legibility over the image */}
            <div className="absolute inset-0 bg-black/25" />
          </div>

          {/* Index eyebrow — near the top */}
          <span className="font-brasika absolute top-10 md:top-14 left-10 md:left-14 z-10 text-2xl font-medium text-fg/60 transition-colors duration-500 group-hover:text-white/80">
            [ {i + 1} ]
          </span>

          {/* Content */}
          <div className="relative z-10 p-10 md:p-14 flex flex-col gap-3">
            <h3 className="font-brasika leading-[1.05] text-4xl md:text-5xl lg:text-6xl text-fg transition-colors duration-500 group-hover:text-white">
              {s.title}
            </h3>
            <p className="max-w-md text-sm md:text-base text-fg/70 transition-colors duration-500 group-hover:text-white/80">
              {s.subtitle}
            </p>
          </div>
        </Link>
      ))}
      </div>

      {/* Custom cursor arrow — follows the pointer while hovering a panel */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-theme text-white transition-[opacity,transform] duration-300 ease-out ${
          hovered !== null ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${hovered !== null ? 1 : 0.5})`,
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
    </section>
  );
}
