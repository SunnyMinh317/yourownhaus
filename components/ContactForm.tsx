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
        className="object-cover object-[center_100%]"
        style={{ filter: BG_FILTER }}
      />
      {/* Scrim for legibility */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content — top right */}
      <div className="relative z-10 w-full flex justify-end">
        <div className="w-full flex flex-col gap-16 px-8 md:px-16 lg:px-24 pt-32 md:pt-40 pb-20 text-white">
          <h2 className="reveal font-brasika leading-[1.05] text-[8vw] md:text-[5vw] lg:text-[4vw] text-right mb-20">
            Cùng chúng tôi thực hiện hóa <br/> ý tưởng của bạn
          </h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="reveal [--reveal-delay:140ms] w-full md:max-w-[60vw] lg:max-w-[50vw] self-end flex flex-col gap-7"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email của bạn"
              className="bg-transparent border-b border-white py-3 text-[3.6vw] md:text-[1.6vw] lg:text-[1.2vw] text-white placeholder-white focus:outline-none focus:border-white transition-colors"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Lời nhắn của bạn"
              rows={4}
              className="bg-transparent border-b border-white py-3 text-[3.6vw] md:text-[1.6vw] lg:text-[1.2vw] text-white placeholder-white focus:outline-none focus:border-white transition-colors resize-none"
            />

            <button
              type="submit"
              className="self-end mt-2 bg-theme text-white px-[4vw] py-[1.5vw] md:px-[3.2vw] md:py-[1.2vw] lg:px-[2.8vw] lg:py-[1.1vw] text-[3vw] md:text-[1.7vw] lg:text-[1vw] uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer mt-10"
            >
              Gửi liên hệ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
