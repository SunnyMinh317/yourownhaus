import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Dự án", href: "/du-an" },
  { label: "Về chúng tôi", href: "/ve-chung-toi" },
  { label: "Liên hệ", href: "/lien-he" },
];

const socials = [
  { label: "Facebook", src: "/icons/facebook_icon.svg", href: "#" },
  { label: "Instagram", src: "/icons/instagram_icon.svg", href: "#" },
  { label: "Messenger", src: "/icons/messenger_icon.svg", href: "#" },
  { label: "Zalo", src: "/icons/zalo_icon.svg", href: "#" },
  { label: "Email", src: "/icons/mail_icon.svg", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-fg/10 px-8 md:px-16 lg:px-24 pt-20 pb-10 text-fg">
      <div className="grid gap-12 md:grid-cols-3">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <span className="font-brasika text-4xl text-theme leading-[1.05]">
            YOUR
            <br />
            OWN
            <br />
            HAUS
          </span>
          <p className="max-w-xs text-base leading-relaxed text-fg/60">
            Studio kiến trúc & thiết kế nội thất — kiến tạo những không gian kể
            nên câu chuyện của riêng bạn.
          </p>

          {/* Social — bottom of the first column */}
          <div className="flex items-center gap-4 mt-auto pt-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={s.src}
                  alt={s.label}
                  width={30}
                  height={30}
                  className="h-5 w-auto brightness-0"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl md:text-2xl text-fg leading-tight">
            Liên hệ
          </h3>
          <address className="not-italic flex flex-col gap-2 text-sm leading-relaxed text-fg/80">
            <span>123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
            <a href="tel:+84901234567" className="hover:text-theme transition-colors">
              +84 90 123 4567
            </a>
            <a href="mailto:hello@yourownhaus.vn" className="hover:text-theme transition-colors">
              hello@yourownhaus.vn
            </a>
            <span className="text-fg/60">Thứ 2 – Thứ 7, 9:00 – 18:00</span>
          </address>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl md:text-2xl text-fg leading-tight">
            Liên kết
          </h3>
          <nav className="flex flex-col gap-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-fg/80 hover:text-theme transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-16 pt-8 border-t border-fg/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-fg/50">
        <span>© 2026 Your Own Haus. Bảo lưu mọi quyền.</span>
        <div className="flex items-center gap-6">
          <Link href="/chinh-sach-bao-mat" className="hover:text-theme transition-colors">
            Chính sách bảo mật
          </Link>
          <Link href="/dieu-khoan" className="hover:text-theme transition-colors">
            Điều khoản
          </Link>
        </div>
      </div>
    </footer>
  );
}
