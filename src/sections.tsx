import React from "react";
import { FAQS, IMG, STORE_PHONE, fmt, waLink, type Product } from "./data";
import { useStore } from "./store";
import ProductCard from "./ProductCard";
import { Accordion, Eyebrow, IcArrow, IcWhatsApp, IcPhone, Reveal, SectionHead } from "./ui";

/* ---------- صف تحريري بأرقام ---------- */
export function EditorialRow({ items, startNo = 1 }: { items: Product[]; startNo?: number }) {
  return (
    <div className="flex gap-7 md:gap-10 overflow-x-auto no-scrollbar -mx-5 px-5 md:-mx-8 md:px-8 pb-2">
      {items.map((p, i) => (
        <a key={p.id} href={`#/product/${p.id}`} className="group shrink-0 w-[230px] md:w-[300px]" style={{ transitionDelay: `${i * 60}ms` }}>
          <div className="flex items-baseline justify-between mb-3">
            <span className="font-display font-medium text-2xl text-sand num">0{startNo + i}</span>
            <span className="text-[0.62rem] font-bold text-mute">{p.charging === "rechargeable" ? "قابل للشحن" : "بالكهرباء"}</span>
          </div>
          <div className="imgz aspect-square bg-[#f1eee6] border border-line/70">
            <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-baseline justify-between gap-3 mt-3.5">
            <span className="font-display font-semibold text-lg text-ink group-hover:text-olive transition-colors">{p.name}</span>
            <span className="num text-sm font-extrabold whitespace-nowrap">{fmt(p.price)}</span>
          </div>
          <span className="block text-[0.66rem] font-bold text-mute mt-0.5">{p.category}</span>
        </a>
      ))}
    </div>
  );
}

/* ---------- شبكة كروت ---------- */
export function CardGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
      {items.map((p, i) => (
        <Reveal key={p.id} delay={(i % 4) * 70}>
          <ProductCard p={p} />
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- شبكة Lifestyle ---------- */
const LIFE_SHOTS = [
  { src: IMG.hero, cap: "على المكتب — هالة ٠١ وقت الغروب" },
  { src: IMG.life, cap: "ركنة المعيشة — نفحة بإضاءة 2700K" },
  { src: IMG.p5, cap: "تفاصيل — زجاج عنبر مضلّع" },
];

export function LifestyleGrid({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  if (variant === 2)
    return (
      <div className="grid gap-4">
        <Reveal className="imgz aspect-[16/8] md:aspect-[21/9]">
          <img src={LIFE_SHOTS[0].src} alt={LIFE_SHOTS[0].cap} className="w-full h-full object-cover" />
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {LIFE_SHOTS.slice(1).map((s, i) => (
            <Reveal key={i} delay={i * 90} className="imgz aspect-square">
              <img src={s.src} alt={s.cap} className="w-full h-full object-cover" />
            </Reveal>
          ))}
        </div>
        <p className="text-[0.68rem] font-bold text-mute mt-1">تصوير من منازل عملائنا — بغداد، ٢٠٢٥</p>
      </div>
    );
  if (variant === 3)
    return (
      <div className="grid grid-cols-12 gap-4">
        {[
          { ...LIFE_SHOTS[0], span: "col-span-12 md:col-span-7", ar: "aspect-[4/3]" },
          { ...LIFE_SHOTS[1], span: "col-span-12 md:col-span-5", ar: "aspect-[4/3] md:aspect-[3/4]" },
          { ...LIFE_SHOTS[2], span: "col-span-12 md:col-span-12", ar: "aspect-[16/6]" },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 90} className={`${s.span}`}>
            <figure>
              <div className={`imgz ${s.ar} bg-sand/40`}>
                <img src={s.src} alt={s.cap} className="w-full h-full object-cover" />
              </div>
              <figcaption className="flex items-baseline gap-3 mt-3">
                <span className="font-display text-sand text-xl num">0{i + 1}</span>
                <span className="text-[0.7rem] font-bold text-mute">{s.cap}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    );
  return (
    <div className="grid grid-cols-12 gap-4">
      <Reveal className="col-span-12 md:col-span-5 md:row-span-2">
        <div className="imgz aspect-[4/5] md:aspect-auto md:h-full min-h-[320px] bg-sand/40">
          <img src={LIFE_SHOTS[1].src} alt={LIFE_SHOTS[1].cap} className="w-full h-full object-cover" />
        </div>
        <p className="text-[0.68rem] font-bold text-mute mt-2.5">{LIFE_SHOTS[1].cap}</p>
      </Reveal>
      {LIFE_SHOTS.filter((_, i) => i !== 1).map((s, i) => (
        <Reveal key={s.src} delay={(i + 1) * 90} className="col-span-12 md:col-span-7">
          <div className="imgz aspect-[16/9] bg-sand/40">
            <img src={s.src} alt={s.cap} className="w-full h-full object-cover" />
          </div>
          <p className="text-[0.68rem] font-bold text-mute mt-2.5">{s.cap}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- تسوق حسب الفئة ---------- */
const CATS = [
  { name: "مصابيح مكتبية", img: IMG.p1, to: "/products", desc: "ضوء مركّز للقراءة والعمل" },
  { name: "مصابيح طاولة", img: IMG.p5, to: "/products", desc: "طبقة الضوء الدافئ في المكان" },
  { name: "قابلة للشحن", img: IMG.p4, to: "/products", desc: "تنقل معك من غرفة لغرفة" },
];

export function CategorySection({ variant = "tiles" }: { variant?: "tiles" | "rows" }) {
  const { products } = useStore();
  if (variant === "rows")
    return (
      <div className="hairline-t">
        {CATS.map((c, i) => {
          const count = products.filter((p) => p.category === c.name.replace("مصابيح ", "").replace("قابلة للشحن", "محمولة")).length || products.length;
          return (
            <Reveal key={c.name} delay={i * 70}>
              <a href={`#${c.to}`} className="hairline-b group flex items-center gap-5 md:gap-8 py-5 md:py-6">
                <span className="font-display text-sand text-2xl num w-10">0{i + 1}</span>
                <span className="flex-1">
                  <span className="block font-display font-bold text-2xl md:text-4xl text-ink group-hover:text-olive transition-colors">{c.name}</span>
                  <span className="block text-[0.72rem] font-bold text-mute mt-1">{c.desc}</span>
                </span>
                <span className="hidden sm:block text-[0.7rem] font-bold text-mute num">{count} منتجات</span>
                <span className="imgz hidden md:block w-20 h-20 bg-[#f1eee6] border border-line/70">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                </span>
                <IcArrow className="w-5 h-5 text-mute group-hover:text-olive group-hover:-translate-x-1 transition-all" />
              </a>
            </Reveal>
          );
        })}
      </div>
    );
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {CATS.map((c, i) => (
        <Reveal key={c.name} delay={i * 90}>
          <a href={`#${c.to}`} className="group block">
            <div className="imgz aspect-[4/5] bg-[#f1eee6] border border-line/70">
              <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center justify-between mt-3.5">
              <div>
                <p className="font-display font-semibold text-xl text-ink group-hover:text-olive transition-colors">{c.name}</p>
                <p className="text-[0.68rem] font-bold text-mute mt-0.5">{c.desc}</p>
              </div>
              <IcArrow className="w-5 h-5 text-mute group-hover:text-olive group-hover:-translate-x-1 transition-all" />
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- شريط العروض ---------- */
export function OffersBand({ variant = "sand" }: { variant?: "sand" | "ink" }) {
  const dark = variant === "ink";
  return (
    <section className={dark ? "bg-ink text-paper" : "bg-sand/45"}>
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-14 md:py-20 flex flex-col md:flex-row md:items-center gap-8 md:gap-14">
        <Reveal className="flex-1">
          <Eyebrow>هذا الأسبوع</Eyebrow>
          <h2 className={`font-display font-bold text-4xl md:text-6xl leading-[1.15] mt-4 ${dark ? "text-paper" : "text-ink"}`}>
            خصومات حتى <span className="num">25٪</span>
            <span className="block text-xl md:text-2xl font-medium mt-2 opacity-70">على مصابيح مختارة — لفترة محدودة</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-5 md:items-end">
          <div className={`flex items-center gap-3 border px-5 py-3.5 ${dark ? "border-paper/25" : "border-ink/20"}`}>
            <span className={`text-[0.62rem] font-bold ${dark ? "text-paper/60" : "text-mute"}`}>كود الخصم</span>
            <span className="num font-extrabold tracking-[0.2em]" dir="ltr">DAW15</span>
          </div>
          <a href="#/products/offers" className={`tl font-bold text-sm ${dark ? "text-paper" : "text-ink"}`}>
            تصفح العروض
            <IcArrow className="w-4 h-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- منتج مميز ---------- */
export function FeaturedSplit({ p, flip = false }: { p: Product; flip?: boolean }) {
  const { addToCart } = useStore();
  const specs: [string, string][] = [
    ["الخامة", p.material],
    ["الإضاءة", `${p.brightness} · ${p.lightTemp}`],
    ["التشغيل", p.charging === "rechargeable" ? `قابل للشحن — ${p.battery}` : "يعمل مباشرة بالكهرباء"],
    ["الضمان", p.warranty],
  ];
  return (
    <div className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center`}>
      <Reveal className={flip ? "md:order-2" : ""}>
        <a href={`#/product/${p.id}`} className="imgz block aspect-square bg-[#f1eee6] border border-line/70">
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        </a>
      </Reveal>
      <Reveal delay={100} className={flip ? "md:order-1" : ""}>
        <Eyebrow>قطعة الموسم</Eyebrow>
        <h3 className="font-display font-bold text-4xl md:text-5xl mt-4 text-ink">{p.name}</h3>
        <p className="text-mute font-bold text-sm mt-3">{p.tagline}</p>
        <dl className="mt-8 hairline-t">
          {specs.map(([k, v]) => (
            <div key={k} className="hairline-b flex items-center justify-between py-3.5 text-sm">
              <dt className="font-bold text-mute">{k}</dt>
              <dd className="font-extrabold text-ink text-start">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={() => addToCart(p, p.colors[0].name, p.sizes[0], 1)}
            disabled={p.stock <= 0}
            className="bg-ink text-paper text-[0.78rem] font-bold px-8 h-12 hover:bg-olive transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            {p.stock > 0 ? "أضف إلى السلة" : "نفدت الكمية"}
          </button>
          <a href={`#/product/${p.id}`} className="tl text-sm font-bold text-ink">
            كل التفاصيل
            <IcArrow className="w-4 h-4" />
          </a>
          <span className="num font-extrabold text-lg ms-auto hidden sm:block">{fmt(p.price)}</span>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- بيان العلامة ---------- */
export function BrandStatement() {
  return (
    <Reveal className="text-center max-w-3xl mx-auto py-6">
      <span className="block w-10 h-px bg-olive mx-auto mb-8" />
      <p className="font-display font-bold text-3xl md:text-5xl leading-[1.5] text-ink">
        الضوء ليس تفصيلة في المكان،
        <span className="text-olive"> إنه بدايته.</span>
      </p>
      <p className="text-[0.72rem] font-bold text-mute mt-8">
        مشكاة — متجر متخصص في مصابيح المكتب والطاولة، نختار كل قطعة كما نختارها لبيوتنا.
      </p>
    </Reveal>
  );
}

/* ---------- معاينة الأسئلة ---------- */
export function FaqPreview() {
  return (
    <div>
      <SectionHead n="٠٩" title="أسئلة تتكرر" action="كل الأسئلة" actionHref="/faq" />
      <Reveal>
        <Accordion items={FAQS.slice(0, 4)} />
      </Reveal>
    </div>
  );
}

/* ---------- شريط التواصل ---------- */
export function ContactStrip() {
  return (
    <section className="hairline-y">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-10 md:py-14 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <h2 className="font-display font-bold text-2xl md:text-4xl text-ink md:flex-1">عندك سؤال قبل الطلب؟</h2>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <a href={`tel:${STORE_PHONE.replace(/\s/g, "")}`} className="tl text-sm font-bold text-ink" dir="ltr">
            <IcPhone className="w-4 h-4 text-olive" />
            {STORE_PHONE}
          </a>
          <a href={waLink("مرحبًا، عندي استفسار قبل الطلب.")} target="_blank" rel="noreferrer" className="tl text-sm font-bold text-ink">
            <IcWhatsApp className="w-4 h-4 text-olive" />
            واتساب مباشر
          </a>
          <span className="text-[0.7rem] font-bold text-mute hidden lg:block">نرد خلال دقائق في مواعيد العمل</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- teaser المقارنة ---------- */
export function CompareTeaser() {
  const { products } = useStore();
  const rows = products.filter((p) => p.charging === "rechargeable").slice(0, 3);
  return (
    <Reveal className="bg-surface border border-line p-7 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        <div className="md:flex-1">
          <Eyebrow>أداة المقارنة</Eyebrow>
          <h3 className="font-display font-bold text-3xl mt-3 text-ink">متردد بين مصباحين؟</h3>
          <p className="text-[0.78rem] font-bold text-mute mt-2">قارن السعر والبطارية والخامة جنبًا إلى جنب — حتى 4 منتجات.</p>
          <a href="#/compare" className="tl mt-6 text-sm font-bold text-ink">
            قارن المنتجات
            <IcArrow className="w-4 h-4" />
          </a>
        </div>
        <div className="md:w-[440px] hairline-t md:hairline-t-0">
          {rows.map((p) => (
            <div key={p.id} className="hairline-b flex items-center gap-4 py-3">
              <span className="imgz w-12 h-12 shrink-0 bg-[#f1eee6]"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /></span>
              <span className="flex-1 font-bold text-sm">{p.name}</span>
              <span className="text-[0.66rem] font-bold text-mute">{p.battery}</span>
              <span className="num text-sm font-extrabold">{fmt(p.price)}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- شريط ثقة صغير ---------- */
export function TrustRow() {
  const items = [
    ["الدفع عند الاستلام", "بلا دفع مسبق"],
    ["ضمان حتى 3 سنوات", "استبدال فوري"],
    ["توصيل لكل المحافظات", "2 – 5 أيام عمل"],
  ] as const;
  return (
    <div className="hairline-y">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 grid sm:grid-cols-3 sm:divide-x sm:divide-line divide-y divide-line">
        {items.map(([t, s], i) => (
          <Reveal key={t} delay={i * 80} className="py-6 sm:px-8 first:ps-0">
            <p className="font-display font-semibold text-lg text-ink">{t}</p>
            <p className="text-[0.68rem] font-bold text-mute mt-1">{s}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
