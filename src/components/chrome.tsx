import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { navigate, useRoute, useStore } from "../lib/state";
import { FAQS, STORE_PHONE, waLink } from "../lib/data";
import { Wordmark, TLink, Eyebrow } from "./ui";
import { IBag, IChevron, IMenu, IX, IWhatsapp, IPhone, IPin, IClock } from "./icons";

/* ---------- شريط الإعلان ---------- */
export function AnnouncementBar() {
  return (
    <div className="bg-ink text-paper/90 text-[0.7rem] font-medium">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-8 flex items-center justify-between gap-4">
        <span>ضمان موثوق</span>
        <span className="hidden sm:block text-paper/50">الدفع عند الاستلام — جميع محافظات العراق</span>
        <span>توصيل سريع</span>
      </div>
    </div>
  );
}

/* ---------- الروابط الثانوية ---------- */
const NAV = [
  { label: "الرئيسية", to: "#/c4", match: ["c4"] },
  { label: "المصابيح", to: "#/products", match: ["products", "product"] },
  { label: "جديد", to: "#/products/new", match: [] },
  { label: "الأكثر مبيعًا", to: "#/products/best", match: [] },
  { label: "العروض", to: "#/products/offers", match: [] },
  { label: "مقارنة", to: "#/compare", match: ["compare"] },
  { label: "تواصل معنا", to: "#/contact", match: ["contact"] },
];

function isActive(path: string, item: (typeof NAV)[number]) {
  const seg = path.split("/").filter(Boolean);
  if (item.match.includes(seg[0] ?? "")) {
    const base = item.to.slice(1);
    if (base.split("/").length > 1) return path === base || path.startsWith(base);
    return true;
  }
  return false;
}

/* ---------- الهيدر ---------- */
export function Header() {
  const { cartCount, cartBump, compare } = useStore();
  const { path } = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bumping, setBumping] = useState(false);

  useEffect(() => {
    if (cartBump === 0) return;
    setBumping(true);
    const t = setTimeout(() => setBumping(false), 500);
    return () => clearTimeout(t);
  }, [cartBump]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-[70] bg-paper/95 backdrop-blur-sm">
      <AnnouncementBar />
      <div className="hairline-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* يمين: الشعار */}
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-2 -mr-2 hover:text-olive transition-colors" onClick={() => setMenuOpen(true)} aria-label="القائمة">
              <IMenu className="w-6 h-6" />
            </button>
            <a href="#/c4" aria-label="مشكاة — الرئيسية"><Wordmark /></a>
          </div>

          {/* وسط: الروابط (ديسكتوب) */}
          <nav className="hidden lg:flex items-center gap-8 absolute inset-x-0 justify-center pointer-events-none">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.to}
                className={`pointer-events-auto relative py-2 text-[0.82rem] font-medium transition-colors after:absolute after:bottom-0 after:inset-x-0 after:h-px after:bg-olive after:origin-right after:transition-transform after:duration-300 ${
                  isActive(path, n) ? "text-olive after:scale-x-100" : "text-ink/80 hover:text-ink after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {n.label}
                {n.label === "مقارنة" && compare.length > 0 && (
                  <span className="absolute -top-1 -left-3 w-4 h-4 grid place-items-center bg-olive text-paper text-[0.6rem] rounded-full">{compare.length}</span>
                )}
              </a>
            ))}
          </nav>

          {/* يسار: السلة */}
          <div className="flex items-center gap-1">
            <a href="#/compare" className="hidden lg:grid place-items-center w-10 h-10 hover:text-olive transition-colors relative" aria-label="المقارنة">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><rect x="4" y="5" width="6.5" height="14" /><rect x="13.5" y="5" width="6.5" height="9" /></svg>
              {compare.length > 0 && <span className="absolute top-1 left-1 w-4 h-4 grid place-items-center bg-olive text-paper text-[0.6rem] rounded-full">{compare.length}</span>}
            </a>
            <a href="#/cart" className="relative grid place-items-center w-10 h-10 hover:text-olive transition-colors" aria-label="سلة التسوق">
              <IBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className={`absolute -top-0.5 -left-0.5 min-w-[18px] h-[18px] px-1 grid place-items-center bg-olive text-paper text-[0.62rem] font-semibold rounded-full ${bumping ? "bump" : ""}`}>
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {menuOpen && (
        <div className="fixed inset-0 z-[85] lg:hidden">
          <button className="absolute inset-0 bg-ink/40" onClick={() => setMenuOpen(false)} aria-label="إغلاق" />
          <div className="toast-in absolute top-0 right-0 h-full w-[85%] max-w-sm bg-paper shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 hairline-b">
              <Wordmark small />
              <button onClick={() => setMenuOpen(false)} className="p-2 hover:text-olive" aria-label="إغلاق القائمة"><IX className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              {NAV.map((n, i) => (
                <a
                  key={n.label}
                  href={n.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-6 py-4 hover:bg-surface transition-colors hairline-b"
                >
                  <span className={`font-display text-2xl ${isActive(path, n) ? "text-olive" : "text-ink"}`}>{n.label}</span>
                  <span className="text-mute text-xs">0{i + 1}</span>
                </a>
              ))}
            </nav>
            <div className="p-5 hairline-t space-y-3">
              <a href={waLink("مرحبًا، أريد الاستفسار عن منتجات مشكاة")} className="flex items-center justify-center gap-2 bg-ink text-paper py-3.5 text-sm font-medium hover:bg-olive transition-colors">
                <IWhatsapp className="w-4 h-4" /> واتساب المتجر
              </a>
              <p className="text-center text-xs text-mute" dir="ltr">{STORE_PHONE}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- الفوتر ---------- */
export function Footer() {
  return (
    <footer className="bg-ink text-paper mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark dark />
            <p className="mt-5 text-sm text-sand/80 leading-7 max-w-xs">
              متجر عراقي متخصص بمصابيح المكتب والطاولة. إضاءة صُنعت لتبقى.
            </p>
            <a href={waLink("مرحبًا، أريد الاستفسار عن منتجات مشكاة")} className="tlink mt-6 text-sm font-medium text-paper">
              راسلنا عبر واتساب <IWhatsapp className="w-4 h-4" />
            </a>
          </div>
          <FooterCol title="المتجر" links={[["المصابيح", "#/products"], ["وصل حديثًا", "#/products/new"], ["الأكثر مبيعًا", "#/products/best"], ["العروض", "#/products/offers"]]} />
          <FooterCol title="المساعدة" links={[["تتبّع الطلب", "#/track"], ["الأسئلة الشائعة", "#/faq"], ["مقارنة المنتجات", "#/compare"], ["تواصل معنا", "#/contact"]]} />
          <div>
            <h4 className="text-xs font-semibold text-sand/60 mb-5">المعلومات</h4>
            <ul className="space-y-3 text-sm text-sand/85">
              <li className="flex items-center gap-3"><IPhone className="w-4 h-4 text-olive" /><span dir="ltr">{STORE_PHONE}</span></li>
              <li className="flex items-center gap-3"><IPin className="w-4 h-4 text-olive" />بغداد — الكرادة، شارع 42</li>
              <li className="flex items-center gap-3"><IClock className="w-4 h-4 text-olive" />يوميًا 10 صباحًا – 9 مساءً</li>
            </ul>
            <p className="mt-6 text-[0.7rem] text-sand/50 leading-5">الدفع عند الاستلام · توصيل لجميع محافظات العراق · ضمان سنة</p>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-paper/10 flex flex-wrap items-center justify-between gap-3 text-[0.72rem] text-sand/50">
          <span>© 2025 مشكاة — جميع الحقوق محفوظة</span>
          <a href="#/" className="hover:text-paper transition-colors">مفاهيم التصميم (8)</a>
          <a href="#/admin" className="hover:text-paper transition-colors">لوحة الإدارة</a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-sand/60 mb-5">{title}</h4>
      <ul className="space-y-3">
        {links.map(([label, to]) => (
          <li key={label}>
            <a href={to} className="tlink text-sm text-sand/85 hover:text-paper">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- غلاف صفحات المتجر ---------- */
export function StoreLayout({ children, title, sub, crumb }: { children: ReactNode; title?: string; sub?: string; crumb?: string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {title && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-8">
            {crumb && <p className="text-xs text-mute mb-3">{crumb}</p>}
            <Eyebrow>مشكاة</Eyebrow>
            <h1 className="font-display font-bold text-4xl md:text-6xl mt-4 text-ink">{title}</h1>
            {sub && <p className="mt-4 text-mute text-sm md:text-base max-w-xl leading-7">{sub}</p>}
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}

/* ---------- أكورديون الأسئلة الشائعة ---------- */
export function FaqAccordion({ items = FAQS, dark = false, limit }: { items?: typeof FAQS; dark?: boolean; limit?: number }) {
  const list = limit ? items.slice(0, limit) : items;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={`divide-y ${dark ? "divide-paper/10" : "divide-line"} ${dark ? "" : ""}`}>
      {list.map((f, i) => (
        <div key={f.q}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className={`w-full flex items-center justify-between gap-6 py-5 text-right group ${dark ? "text-paper" : "text-ink"}`}
            aria-expanded={open === i}
          >
            <span className="flex items-baseline gap-4">
              <span className={`font-display text-sm ${dark ? "text-olive" : "text-olive"}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="font-medium text-[0.95rem] group-hover:text-olive transition-colors">{f.q}</span>
            </span>
            <IChevron className={`w-4 h-4 shrink-0 transition-transform duration-400 ${open === i ? "rotate-180 text-olive" : dark ? "text-sand" : "text-mute"}`} />
          </button>
          <div className={`acc-body ${open === i ? "open" : ""}`}>
            <div>
              <p className={`pb-6 pr-9 text-sm leading-7 max-w-2xl ${dark ? "text-sand/80" : "text-mute"}`}>{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- قسم التواصل ---------- */
export function ContactBand({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`hairline-t ${dark ? "bg-ink text-paper" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Eyebrow dark={dark}>تواصل معنا</Eyebrow>
          <h2 className={`font-display font-bold text-4xl md:text-5xl mt-4 leading-[1.2] ${dark ? "text-paper" : "text-ink"}`}>
            سؤال عن إضاءة؟<br />نحن هنا.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row md:justify-end gap-4">
          <a href={waLink("مرحبًا، عندي استفسار عن منتجات مشكاة")} className="inline-flex items-center justify-center gap-3 bg-olive text-paper px-8 py-4 text-sm font-medium hover:bg-ink transition-colors duration-300">
            <IWhatsapp className="w-5 h-5" /> واتساب مباشر
          </a>
          <a href="#/contact" className={`inline-flex items-center justify-center gap-3 border px-8 py-4 text-sm font-medium transition-colors duration-300 ${dark ? "border-paper/25 text-paper hover:bg-paper hover:text-ink" : "border-ink/20 text-ink hover:bg-ink hover:text-paper"}`}>
            صفحة التواصل
          </a>
        </div>
      </div>
    </section>
  );
}
