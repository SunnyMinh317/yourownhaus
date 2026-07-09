import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="min-h-dvh w-full flex flex-col xl:flex-row items-start">
      {/* Image — left. Full-bleed to the screen edge on desktop, smaller width. */}
      <div className="reveal relative w-full aspect-4/2 xl:aspect-auto xl:w-2/3 xl:self-stretch">
        <Image
          src="/ui-images/home/about-us/image.jpg"
          alt="Đội ngũ sáng lập Your Own Haus tại văn phòng"
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Text — right */}
      <div className="w-full xl:w-3/5 flex flex-col justify-start gap-14 px-10 md:px-16 lg:px-24 pt-20 pb-10 xl:py-20">
        <h2 className="reveal [--reveal-delay:120ms] font-brasika text-fg leading-[1.05] text-[9vw] md:text-[6.5vw] lg:text-[5vw]">
          Nơi mỗi không gian kể một câu chuyện
        </h2>

        <div className="reveal [--reveal-delay:220ms] flex flex-col gap-5 text-justify text-[3.6vw] md:text-[1.6vw] lg:text-[1.2vw] leading-relaxed text-fg/80">
          <p>
            Your Own Haus là studio kiến trúc và thiết kế nội thất, ra đời từ
            niềm tin rằng mỗi không gian đều mang trong mình một câu chuyện riêng.
            Chúng tôi không chỉ dựng nên những bức tường, mà kiến tạo nơi chốn để
            cuộc sống của bạn diễn ra trọn vẹn.
          </p>
          <p>
            Từ ý tưởng đầu tiên đến chi tiết hoàn thiện cuối cùng, chúng tôi lắng
            nghe, thấu hiểu và chuyển hoá những mong muốn của bạn thành không gian
            thực — cân bằng giữa công năng, ánh sáng, vật liệu và cảm xúc.
          </p>
          <p>
            Mỗi dự án là một hành trình hợp tác. Và chúng tôi ở đây để cùng bạn
            biến ngôi nhà trong tâm trí thành hiện thực, đúng như cách bạn hằng
            hình dung.
          </p>
        </div>
      </div>
    </section>
  );
}
