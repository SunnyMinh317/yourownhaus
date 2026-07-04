import Image from "next/image";

// How far Quote2 is pulled up to overlap the section above it. Increase to
// overlap more, set to "0vh" for no overlap.
const OVERLAP = "8vh";

// The guy's size (his height on large screens — bigger value = bigger guy).
const GUY_HEIGHT = "110vh";
// The guy's horizontal position — distance from the right edge on large screens.
// Increase to move him left, decrease (or "0px") to push him toward the edge.
const GUY_RIGHT = "0rem";

// Color grade, approximating the Figma adjustments:
//   contrast(1.9)   — contrast pushed toward max
//   saturate(0.8)   — saturation -20%
//   sepia(0.1)      — fakes a slightly warmer temperature (no native filter for it)
//   brightness(0.97)— exposure -3%
const GUY_FILTER = "contrast(1) saturate(0.8) sepia(0.2) brightness(0.97)";

export default function Quote2() {
  return (
    <section
      className="relative w-full min-h-dvh flex items-center justify-center"
      style={{ marginTop: `-${OVERLAP}` }}
    >
      {/* Central band — group photo cropped to a horizontal strip */}
      <div className="relative w-full h-[75vh] overflow-hidden">
        <Image
          src="/ui-images/home/quote2/group.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Scrim for text legibility */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Quote text — left */}
        <div className="relative z-10 h-full flex items-center">
          <p className="max-w-3xl font-light px-8 md:px-16 lg:px-24 text-white/70 text-xl md:text-3xl leading-relaxed">
            Mọi dự án của YourOwnHaus đều bắt đầu bằng một cuộc đối thoại – giữa
            đội ngũ với nhau, giữa đội ngũ với khách hàng, giữa ý tưởng với thực
            tế, và giữa những góc nhìn khác nhau hướng về cùng một mục tiêu.
          </p>
        </div>
      </div>

      {/* Profile — sized by height so he's taller than the band and sticks up */}
      <div
        className="absolute z-20 bottom-[12.5vh] pointer-events-none"
        style={{ right: GUY_RIGHT }}
      >
        <Image
          src="/ui-images/home/quote2/profile.png"
          alt="Nhà sáng lập Your Own Haus"
          width={1080}
          height={1080}
          sizes={GUY_HEIGHT}
          className="w-auto object-bottom"
          style={{ height: GUY_HEIGHT, filter: GUY_FILTER }}
          priority
        />
      </div>
    </section>
  );
}
