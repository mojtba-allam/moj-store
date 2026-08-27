import { useEffect, useRef, useState } from "react";
import { useStore } from "./store";
import { IcBag, Logo } from "./ui";

const NAV = [
  { label: "الرئيسية", to: "/" },
  { label: "المصابيح", to: "/products" },
  { label: "جديد", to: "/products/new" },
  { label: "الأكثر مبيعًا", to: "/products/best" },
  { label: "العروض", to: "/products/offers" },
  { label: "مقارنة", to: "/compare" },
  { label: "تتبع الطلب", to: "/track" },
  { label: "تواصل معنا", to: "/contact" },
];

export default function Header({ path }: { path: string }) {
  const { cartCount } = useStore();
  const [pop, setPop] = useState(false);
  const prev = useRef(cartCount);

  useEffect(() => {
    if (cartCount !== prev.current) {
      prev.current = cartCount;
      setPop(true);
      const t = window.setTimeout(() => setPop(false), 500);
      return () => window.clearTimeout(t);
    }
  }, [cartCount]);

  const isActive = (to: string) =>
    to === "/" ? path === "/" : path === to || path.startsWith(to + "/");

  return (
    <header className="sticky top-0 z-50">
      {/* شريط الإعلان */}
      <div className="bg-ink text-paper/90">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 h-8 flex items-center justify-between text-[0.66rem] font-bold">
          <span>ضمان موثوق</span>
          <span className="hidden sm:block text-paper/40">مشكاة — {`إضاءة صُنعت لتبقى`}</span>
          <span>توصيل سريع</span>
        </div>
      </div>

      {/* الهيدر */}
      <div className="bg-paper/95 backdrop-blur-sm hairline-b">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 h-[72px] flex items-center justify-between gap-6">
          <a href="#/" aria-label="مشكاة — الرئيسية" className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-[0.8rem] font-bold text-ink/80" aria-label="التنقل الرئيسي">
            {NAV.slice(0, 6).map((n) => (
              <a key={n.to} href={`#${n.to}`} className={`navlink ${isActive(n.to) ? "active" : ""}`}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a href="#/contact" className="tl hidden md:inline-flex text-[0.8rem] font-bold text-ink/80">
              تواصل معنا
            </a>
            <a href="#/cart" className="relative inline-grid place-items-center w-10 h-10 hover:bg-sand/40 transition-colors" aria-label={`السلة — ${cartCount} منتج`}>
              <IcBag className="w-[1.35rem] h-[1.35rem]" />
              {cartCount > 0 && (
                <span className={`num absolute -top-0.5 -left-0.5 min-w-[1.1rem] h-[1.1rem] px-0.5 grid place-items-center rounded-full bg-olive text-white text-[0.6rem] font-bold ${pop ? "pop" : ""}`}>
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>

        {/* التنقل الثانوي */}
        <nav className="hairline-t" aria-label="التنقل الثانوي">
          <div className="max-w-[1440px] mx-auto px-5 md:px-8 flex items-center gap-6 overflow-x-auto no-scrollbar">
            {NAV.map((n) => (
              <a key={n.to} href={`#${n.to}`} className={`navlink whitespace-nowrap text-[0.78rem] font-bold text-ink/75 ${isActive(n.to) ? "active" : ""}`}>
                {n.label}
              </a>
            ))}
            <span className="ms-auto hidden xl:block text-[0.68rem] font-bold text-olive whitespace-nowrap">
              الدفع عند الاستلام — بلا حسابات
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
