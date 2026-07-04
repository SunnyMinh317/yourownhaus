"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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

  // Lock page scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keep the bar visible whenever the mobile menu is open.
  const isHidden = hidden && !open;
  // Frosted background once away from the top (or when the menu is open).
  const solid = !atTop || open;

  return (
    <>
      <header
        style={{
          transform: isHidden ? "translateY(-100%)" : "translateY(0)",
          transition:
            "transform 700ms cubic-bezier(0.22,1,0.36,1), background-color 700ms ease, box-shadow 700ms ease, border-color 700ms ease",
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
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-normal hover:text-theme transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/" className="font-brasika text-3xl text-theme select-none">
              YOUR OWN HAUS
            </Link>
          </div>

          <div className="flex items-center justify-end gap-10">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-normal hover:text-theme transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile bar */}
        <div className="relative flex md:hidden items-center justify-end px-6 py-4">
          {/* Logo absolutely centered so it stays dead-center regardless of the
              hamburger button's width */}
          <Link
            href="/"
            className="font-brasika text-xl text-theme select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            YOUR OWN HAUS
          </Link>
          <button
            type="button"
            aria-label="Mở menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="w-8 flex items-center justify-center cursor-pointer text-fg"
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu.
          Rendered as a SIBLING of <header> (not a child): the header carries a
          `transform` for its hide-on-scroll animation, and a transformed ancestor
          would make this `fixed` overlay anchor to the header instead of the
          viewport — which is what hid the menu items. As a sibling it anchors to
          the viewport correctly. */}
      <div
        className={`md:hidden fixed bg-bg inset-0 z-60 text-fg flex flex-col transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top bar: logo + close */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-brasika text-xl text-theme select-none"
          >
            YOUR OWN HAUS
          </Link>
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={() => setOpen(false)}
            className="w-8 flex items-center justify-center cursor-pointer text-fg"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Big menu items — left aligned; brand label pinned to the bottom */}
        <div className="flex-1 flex flex-col justify-between px-8 py-12">
          <nav className="flex flex-col items-start gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-4xl font-light text-fg"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
