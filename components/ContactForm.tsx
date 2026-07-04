"use client";

import Image from "next/image";
import { useState } from "react";

// Background color grade: decreased saturation + raised temperature (warmer).
const BG_FILTER = "saturate(0.75) sepia(0.18)";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section className="relative w-full min-h-dvh overflow-hidden flex">
      {/* Background image */}
      <Image
        src="/ui-images/home/contact-form/contact-us.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{ filter: BG_FILTER }}
      />
      {/* Scrim for legibility */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content — top right */}
      <div className="relative z-10 w-full flex justify-end">
        <div className="w-full max-w-3xl flex flex-col gap-10 px-8 md:px-16 lg:px-24 pt-32 md:pt-40 pb-20 text-white">
          <h2 className="reveal font-brasika leading-[1.05] text-4xl md:text-5xl lg:text-6xl text-right">
            Cùng chúng tôi thực hiện hóa ý tưởng của bạn
          </h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="reveal [--reveal-delay:140ms] flex flex-col gap-7"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email của bạn"
              className="bg-transparent border-b border-white/40 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Lời nhắn của bạn"
              rows={4}
              className="bg-transparent border-b border-white/40 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors resize-none"
            />

            <button
              type="submit"
              className="self-end mt-2 bg-theme text-fg px-10 py-3.5 text-sm uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
            >
              Gửi liên hệ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
