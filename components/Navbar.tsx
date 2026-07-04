"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "TRANG CHỦ", href: "/" },
  { label: "DỰ ÁN", href: "/du-an" },
  { label: "VỀ CHÚNG TÔI", href: "/ve-chung-toi" },
  { label: "LIÊN HỆ", href: "/lien-he" },
];

// Distance scrolled before the navbar is allowed to hide.
const HIDE_AFTER = 120;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setAtTop(y < 10);
      // Only hide once past the threshold and while scrolling down.
      if (y > lastY.current && y > HIDE_AFTER) {
        setHidden(true);
      } else if (y < lastY.current) {
        setHidden(false);
      }
      lastY.current = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the bar visible whenever the mobile menu is open.
  const isHidden = hidden && !open;
  // Frosted background once away from the top (or when the menu is open).
  const solid = !atTop || open;

  return (
    <header
      style={{
        transform: isHidden ? "translateY(-100%)" : "translateY(0)",
        transition:
          "transform 700ms cubic-bezier(0.22,1,0.36,1), background-color 700ms ease, box-shadow 700ms ease, backdrop-filter 700ms ease, border-color 700ms ease",
      }}
      className={`fixed top-0 left-0 right-0 z-50 text-fg ${
        solid
          ? "bg-bg border-b border-fg/5 shadow-[0_8px_30px_rgba(0,0,0,0.025)]"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      {/* Desktop */}
      <nav className="hidden md:grid md:grid-cols-3 items-center px-20 py-5">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-lg font-normal hover:text-theme transition-colors">
            TRANG CHỦ
          </Link>
          <Link href="/du-an" className="text-lg font-normal hover:text-theme transition-colors">
            DỰ ÁN
          </Link>
        </div>

        <div className="flex justify-center">
          <Link href="/" className="font-brasika text-3xl text-theme select-none">
            YOUR OWN HAUS
          </Link>
        </div>

        <div className="flex items-center justify-end gap-10">
          <Link href="/ve-chung-toi" className="text-lg font-normal hover:text-theme transition-colors">
            VỀ CHÚNG TÔI
          </Link>
          <Link href="/lien-he" className="text-lg font-normal hover:text-theme transition-colors">
            LIÊN HỆ
          </Link>
        </div>
      </nav>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-6 py-4">
        <div className="w-8" />
        <Link href="/" className="font-brasika text-xl text-theme select-none">
          YOUR OWN HAUS
        </Link>
        <button
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen(!open)}
          className="w-8 flex flex-col justify-center items-center gap-[5px] cursor-pointer"
        >
          <span
            className={`block h-0.5 w-6 bg-fg transition-all duration-300 ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-fg transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-fg transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden flex flex-col items-center gap-6 pb-6 border-t border-fg/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest hover:text-theme transition-colors pt-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
