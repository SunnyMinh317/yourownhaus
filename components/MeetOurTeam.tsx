import Image from "next/image";
import type { CSSProperties } from "react";

const IMG = "/ui-images/home/meet-our-team/team-member.jpg";

const members = [
  { name: "Minh Trần", role: "Kiến trúc sư trưởng" },
  { name: "Lan Nguyễn", role: "Giám đốc sáng tạo" },
  { name: "Hoàng Phạm", role: "Thiết kế nội thất" },
  { name: "Thu Lê", role: "Quản lý dự án" },
  { name: "Đức Vũ", role: "Kiến trúc sư" },
  { name: "Mai Đỗ", role: "Thiết kế 3D" },
  { name: "Nam Bùi", role: "Giám sát thi công" },
  { name: "Hà Vương", role: "Chuyên viên vật liệu" },
];

export default function MeetOurTeam() {
  return (
    <section className="w-full px-8 md:px-16 lg:px-24 py-14 md:py-16 flex flex-col gap-14">
      {/* Heading */}
      <div className="reveal flex flex-col gap-4">
        <h2 className="font-brasika text-fg leading-[1.05] text-[9vw] md:text-[6.5vw] lg:text-[5vw] text-balance">
          Đội ngũ của chúng tôi
        </h2>
        <p className="text-[4vw] md:text-[2vw] lg:text-[1.5vw] text-fg/70 leading-relaxed">
          Những người tạo nên dấu ấn của YOUR OWN HAUS
        </p>
      </div>

      {/* Member grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {members.map((m, i) => (
          <div
            key={i}
            style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as CSSProperties}
            className="reveal flex flex-col gap-4"
          >
            <div className="relative w-full aspect-3/4 overflow-hidden">
              <Image
                src={IMG}
                alt={m.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-brasika text-[5.5vw] md:text-[2.6vw] lg:text-[2vw] text-fg leading-tight">
                {m.name}
              </h3>
              <p className="text-[3.4vw] md:text-[1.4vw] lg:text-[1.1vw] text-fg/60">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
