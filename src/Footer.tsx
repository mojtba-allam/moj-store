import { STORE, STORE_PHONE, waLink } from "./data";
import { IcWhatsApp, Logo } from "./ui";

const cols = [
  {
    t: "الموقع",
    links: [
      { l: "الرئيسية", to: "/" },
      { l: "كل المصابيح", to: "/products" },
      { l: "جديد", to: "/products/new" },
      { l: "الأكثر مبيعًا", to: "/products/best" },
      { l: "العروض", to: "/products/offers" },
    ],
  },
  {
    t: "المنتجات",
    links: [
      { l: "مقارنة المنتجات", to: "/compare" },
      { l: "مصابيح مكتبية", to: "/products" },
      { l: "مصابيح طاولة", to: "/products" },
      { l: "مصابيح قابلة للشحن", to: "/products" },
    ],
  },
  {
    t: "الدعم",
    links: [
      { l: "تتبع الطلب", to: "/track" },
      { l: "الأسئلة الشائعة", to: "/faq" },
      { l: "سلة المشتريات", to: "/cart" },
      { l: "تواصل معنا", to: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="hairline-t bg-paper mt-24">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-14 md:py-20 grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="font-display text-xl text-ink mt-5">{STORE.tagline}</p>
          <ul className="mt-5 space-y-2 text-[0.78rem] text-mute font-bold">
            <li>{STORE.address}</li>
            <li>{STORE.hours}</li>
            <li className="num" dir="ltr">{STORE_PHONE}</li>
          </ul>
          <a href={waLink("مرحبًا، عندي استفسار عن منتجات مشكاة.")} target="_blank" rel="noreferrer" className="tl mt-6 text-sm font-bold text-ink">
            <IcWhatsApp className="w-4 h-4 text-olive" />
            راسلنا على واتساب
          </a>
        </div>

        {cols.map((c) => (
          <div key={c.t}>
            <h4 className="text-[0.7rem] font-bold text-olive mb-5">{c.t}</h4>
            <ul className="space-y-3">
              {c.links.map((l, i) => (
                <li key={i}>
                  <a href={`#${l.to}`} className="text-[0.82rem] font-bold text-ink/75 hover:text-olive transition-colors">
                    {l.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hairline-t">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 h-14 flex items-center justify-between gap-4 text-[0.68rem] font-bold text-mute">
          <span>© 2025 مشكاة — جميع الحقوق محفوظة</span>
          <span className="hidden sm:block">الدفع عند الاستلام · ضمان حتى 3 سنوات · توصيل لكل المحافظات</span>
          <a href="#/admin" className="tl text-ink/70">لوحة الإدارة</a>
        </div>
      </div>
    </footer>
  );
}
