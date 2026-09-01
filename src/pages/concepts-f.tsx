import type { ReactNode } from "react";
import { IMG, fmtIQD } from "../lib/data";
import type { Product } from "../lib/data";
import { navigate, Reveal, useStore } from "../lib/state";
import { ContactBand, FaqAccordion, Footer, Header } from "../components/chrome";
import { ProductCard, ProductGrid, ProductRow } from "../components/product";
import { ConceptBar, Eyebrow, Price, SectionHead, SolidBtn, TLink } from "../components/ui";
import { IClock } from "../components/icons";

/* ================================================================== */
/*  CONCEPT 13 — The Shopfront (واجهة المحل)                           */
/* ================================================================== */
export function Concept13() {
  const { products } = useStore();
  const best = products.filter((p) => p.isBest);
  const fresh = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.isOffer);
  const windowProducts = [
    products.find((p) => p.id === "luna")!,
    products.find((p) => p.id === "ward")!,
    products.find((p) => p.id === "qamar")!,
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — واجهة المحل ليلًا */}
      <section className="bg-ink text-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 md:pt-16 pb-14 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-center">
          {/* الشارع: النص */}
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-[0.7rem] text-sand/80">
              <span className="pulse-dot w-2 h-2 rounded-full bg-olive inline-block" />
              مفتوح الآن — حتى 9 مساءً
            </span>
            <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.1] mt-6">
              <span className="lm"><span>مرّ من هنا،</span></span>
              <span className="lm" style={{ ["--rv-delay" as never]: "150ms" }}><span className="text-olive">وادخل النور.</span></span>
            </h1>
            <p className="mt-6 text-sand/70 text-sm leading-7 max-w-sm">محل المصابيح العراقي — كل ما تراه في الواجهة متوفر في المخزن، ويصل بابك خلال أيام.</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <TLink dark href="#/products">ادخل المحل</TLink>
              <span className="flex items-center gap-2 text-[0.68rem] text-sand/60"><IClock className="w-4 h-4" /> الكرادة، شارع 42 — بغداد</span>
            </div>
          </Reveal>

          {/* النافذة */}
          <Reveal delay={150} className="relative">
            {/* اللافتة المعلقة */}
            <div className="swing absolute -top-9 right-8 md:right-14 z-20">
              <span className="block w-px h-8 bg-sand/50 mx-auto" />
              <span className="block bg-olive text-paper font-display font-bold text-lg px-5 py-2.5 shadow-xl">مشكاة</span>
            </div>
            {/* إطار النافذة */}
            <div className="relative border-[6px] border-[#2E2D2A] bg-[#23221F] p-2 shadow-2xl">
              <div className="relative overflow-hidden">
                <img src={IMG.desk} alt="واجهة المحل — ركن القراءة" className="kenburns w-full h-[300px] md:h-[420px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                {/* قضبان النافذة */}
                <span className="absolute inset-y-0 left-1/2 w-[3px] bg-[#2E2D2A]/90 -translate-x-1/2" aria-hidden />
                <span className="absolute inset-x-0 top-[62%] h-[3px] bg-[#2E2D2A]/90" aria-hidden />
                {/* ملصق على الزجاج */}
                <span className="absolute bottom-4 right-4 rotate-[-3deg] bg-paper text-ink text-[0.65rem] font-semibold px-3 py-2 shadow-lg">
                  دفعة جديدة وصلت — ٤ قطع
                </span>
                <span className="absolute top-4 left-4 rotate-[2deg] bg-ink/70 text-paper text-[0.62rem] px-3 py-1.5 backdrop-blur-sm">
                  الدفع عند الاستلام
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* شريط أسعار المحل */}
        <div className="border-t border-paper/10 bg-[#23221F] py-3 overflow-hidden" dir="ltr">
          <div className="marquee-track">
            {[...products, ...products].map((p, i) => (
              <span key={`${p.id}-${i}`} className="flex items-center gap-5 px-5 text-[0.7rem] text-sand/75 whitespace-nowrap">
                {p.name} — {fmtIQD(p.price)}
                <svg viewBox="0 0 8 8" className="w-1.5 h-1.5 text-olive" fill="currentColor" aria-hidden><rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)" /></svg>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* رف الواجهة */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="٠١" eyebrow="على الرف الأمامي" title="واجهة هذا الأسبوع" /></Reveal>
        <div className="mt-14 grid grid-cols-3 gap-4 md:gap-8 items-end">
          {windowProducts.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <button
                type="button"
                onClick={() => navigate(`/product/${p.id}`)}
                className="group block w-full text-right cursor-pointer"
                style={{ transform: i === 1 ? "translateY(-18px)" : undefined }}
              >
                <span className={`block overflow-hidden bg-[#F1EEE7] transition-transform duration-500 group-hover:-translate-y-2 ${i === 1 ? "aspect-[4/5]" : "aspect-square"}`}>
                  <img src={p.img} alt={p.name} className="pcard-img w-full h-full object-cover" />
                </span>
                {/* الرف */}
                <span className="block h-[3px] bg-ink relative">
                  <span className="absolute top-[3px] inset-x-[10%] h-3 bg-ink/10 blur-sm" aria-hidden />
                </span>
                <span className="flex items-center justify-between gap-3 pt-3">
                  <span className="text-[0.72rem] md:text-sm font-medium group-hover:text-olive transition-colors truncate">{p.name}</span>
                  <span className="text-[0.7rem] md:text-xs font-semibold text-olive shrink-0">{fmtIQD(p.price)}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* داخل المحل — الأبواب */}
      <section className="hairline-t bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal><SectionHead num="٠٢" eyebrow="ثلاثة أبواب" title="داخل المحل" /></Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { t: "باب المكتب", d: "مصابيح العمل والقراءة", to: "#/products/desk", img: IMG.nimra },
              { t: "باب الطاولة", d: "دفء الزوايا والجلسات", to: "#/products/table", img: IMG.rawda },
              { t: "باب الجيب", d: "قابلة للشحن والتنقل", to: "#/products/rechargeable", img: IMG.qamar },
            ].map((door, i) => (
              <Reveal key={door.t} delay={i * 90}>
                <a href={door.to} className="group relative block border-2 border-ink bg-paper overflow-hidden">
                  <span className="block aspect-[3/4] overflow-hidden">
                    <img src={door.img} alt={door.t} className="pcard-img w-full h-full object-cover opacity-90" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-paper/95 border-t-2 border-ink p-4 flex items-center justify-between gap-3">
                    <span>
                      <span className="block font-display font-bold text-xl md:text-2xl group-hover:text-olive transition-colors">{door.t}</span>
                      <span className="block text-[0.65rem] text-mute mt-0.5">{door.d}</span>
                    </span>
                    {/* مقبض الباب */}
                    <span className="w-2.5 h-2.5 rounded-full bg-ink group-hover:bg-olive transition-colors shrink-0" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* الأكثر مبيعًا */}
      <section className="hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal><SectionHead num="٠٣" eyebrow="يطلبها الزبائن بالاسم" title="الأكثر مبيعًا" link={<TLink href="#/products/best">الكل</TLink>} /></Reveal>
          <div className="mt-12"><ProductRow items={best} /></div>
        </div>
      </section>

      {/* الجديد */}
      <section className="bg-sand/30 hairline-t hairline-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal><SectionHead num="٠٤" eyebrow="صناديق فُتحت للتو" title="جديد المخزن" link={<TLink href="#/products/new">الكل</TLink>} /></Reveal>
          <div className="mt-12"><ProductGrid items={fresh} /></div>
        </div>
      </section>

      {/* تخفيضات الواجهة — ملصقات أسعار مائلة */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="٠٥" eyebrow="ملصقات صفراء على الزجاج" title="تخفيضات الواجهة" /></Reveal>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {offers.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80}>
              <div className="relative">
                <span className="absolute -top-5 right-3 z-10 rotate-[-4deg] bg-olive text-paper text-[0.62rem] font-bold px-3 py-1.5 shadow-md">
                  خصم {p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 10}٪
                </span>
                <ProductCard p={p} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-4">
        <Reveal><SectionHead num="٠٦" eyebrow="على الباب" title="أسئلة قبل الدخول" link={<TLink href="#/faq">الكل</TLink>} /></Reveal>
        <div className="mt-8"><FaqAccordion limit={3} /></div>
      </section>

      <ContactBand />
      <Footer />
      <ConceptBar index={13} name="The Shopfront" />
    </div>
  );
}

/* ================================================================== */
/*  CONCEPT 14 — Chiaroscuro (النور والظل)                              */
/* ================================================================== */
function DualProduct({ p, dayNote, nightNote }: { p: Product; dayNote: string; nightNote: string }) {
  return (
    <Reveal>
      <div className="grid md:grid-cols-2 hairline-b">
        {/* وجه النهار */}
        <button type="button" onClick={() => navigate(`/product/${p.id}`)} className="group relative bg-paper text-right overflow-hidden cursor-pointer">
          <span className="block aspect-[16/10] overflow-hidden">
            <img src={p.img} alt={`${p.name} — وجه النهار`} className="pcard-img w-full h-full object-cover" />
          </span>
          <span className="absolute top-4 right-4 text-[0.62rem] font-bold bg-surface border border-line px-2.5 py-1">وجه النهار</span>
          <span className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-4 bg-gradient-to-t from-paper to-transparent">
            <span>
              <span className="block font-medium text-sm">{p.name}</span>
              <span className="block text-[0.68rem] text-mute mt-0.5">{dayNote}</span>
            </span>
            <Price price={p.price} size="sm" />
          </span>
        </button>
        {/* وجه الليل */}
        <button type="button" onClick={() => navigate(`/product/${p.id}`)} className="group relative bg-ink text-right overflow-hidden cursor-pointer border-t md:border-t-0 md:border-r border-line">
          <span className="block aspect-[16/10] overflow-hidden">
            <img src={p.img} alt={`${p.name} — وجه الليل`} className="pcard-img w-full h-full object-cover brightness-[0.55] saturate-[0.85]" />
          </span>
          <span className="absolute top-4 right-4 text-[0.62rem] font-bold bg-ink/80 text-paper px-2.5 py-1">وجه الليل</span>
          <span className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-4 bg-gradient-to-t from-ink to-transparent">
            <span>
              <span className="block font-medium text-sm text-paper">{p.name}</span>
              <span className="block text-[0.68rem] text-sand/70 mt-0.5">{nightNote}</span>
            </span>
            <Price price={p.price} size="sm" dark />
          </span>
        </button>
      </div>
    </Reveal>
  );
}

export function Concept14() {
  const { products } = useStore();
  const best = products.filter((p) => p.isBest);
  const fresh = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.isOffer);
  const featured = products.find((p) => p.id === "nimra")!;

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — انشطار النور والظل */}
      <section className="hairline-b">
        <div className="relative grid lg:grid-cols-2">
          <div className="relative bg-paper px-4 md:px-8 lg:pe-16 py-16 lg:py-28 flex flex-col justify-center lg:border-l border-line order-2 lg:order-1">
            <Reveal>
              <Eyebrow>الوجه الأول</Eyebrow>
              <h1 className="font-display font-bold text-5xl md:text-6xl leading-[1.15] mt-6">
                <span className="lm"><span>ضوءُ النهارِ</span></span>
                <span className="lm" style={{ ["--rv-delay" as never]: "140ms" }}><span className="text-olive">عمليٌّ صافٍ.</span></span>
              </h1>
              <p className="mt-6 text-mute text-sm leading-7 max-w-sm">لمكاتبَ تفتح شبابيكها للشمس — مصابيح تُكمل ضوء النهار ولا تنافسه.</p>
              <div className="mt-8 flex items-center gap-5">
                <button type="button" onClick={() => navigate("/product/qamar")} className="group flex items-center gap-4 text-right cursor-pointer">
                  <img src={IMG.qamar} alt="قمر" className="w-16 h-16 object-cover border border-line group-hover:border-olive transition-colors" />
                  <span>
                    <span className="block text-sm font-medium group-hover:text-olive transition-colors">قمر — المحمول</span>
                    <span className="block text-xs text-mute mt-0.5">{fmtIQD(products.find((p) => p.id === "qamar")!.price)}</span>
                  </span>
                </button>
              </div>
            </Reveal>
          </div>
          <div className="relative bg-ink px-4 md:px-8 lg:ps-16 py-16 lg:py-28 flex flex-col justify-center order-1 lg:order-2">
            <Reveal delay={120}>
              <Eyebrow dark>الوجه الثاني</Eyebrow>
              <h2 className="font-display font-bold text-5xl md:text-6xl leading-[1.15] mt-6 text-paper">
                <span className="lm"><span>وضوءُ الليلِ</span></span>
                <span className="lm" style={{ ["--rv-delay" as never]: "260ms" }}><span className="text-sand">حكايةٌ أطول.</span></span>
              </h2>
              <p className="mt-6 text-sand/70 text-sm leading-7 max-w-sm">لسهراتٍ لا تنتهي عند العاشرة — ضوءٌ دافئ يصنع مزاج الغرفة كلها.</p>
              <div className="mt-8">
                <button type="button" onClick={() => navigate("/products")} className="group flex items-center gap-4 text-right cursor-pointer">
                  <img src={IMG.desk} alt="ليلة قراءة" className="w-24 h-16 object-cover border border-paper/20 group-hover:border-olive transition-colors" />
                  <span className="tlink rev text-paper text-sm font-medium"><span>مصابيح المساء</span></span>
                </button>
              </div>
            </Reveal>
          </div>
          {/* الشارة المركزية */}
          <div className="hidden lg:grid absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-32 h-32 rounded-full border border-olive bg-paper text-ink place-items-center text-center shadow-xl">
            <span className="text-[0.68rem] font-semibold leading-5">ضوءٌ واحد<br />وجهان<br /><span className="font-display text-olive text-lg">مشكاة</span></span>
          </div>
        </div>
      </section>

      {/* الأزواج — لكل مصباح وجهان */}
      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-2">
          <Reveal><SectionHead num="٠١" eyebrow="جرّب الوجهين" title="لكل مصباح يومٌ وليلة" /></Reveal>
        </div>
        <div className="max-w-7xl mx-auto mt-10">
          <DualProduct p={products.find((p) => p.id === "luna")!} dayNote="على مكتبٍ قرب النافذة" nightNote="بجوار السرير، تعتيم أخير" />
          <DualProduct p={products.find((p) => p.id === "ward")!} dayNote="لمعة زجاجية في ضوء الظهيرة" nightNote="غروبٌ دائم على الطاولة الجانبية" />
        </div>
      </section>

      {/* الأكثر مبيعًا — النور */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="٠٢" eyebrow="من جهة النور" title="الأكثر مبيعًا" link={<TLink href="#/products/best">الكل</TLink>} /></Reveal>
        <div className="mt-12"><ProductGrid items={best} /></div>
      </section>

      {/* الجديد — الظل */}
      <section className="bg-ink">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal><SectionHead dark num="٠٣" eyebrow="من جهة الظل" title="وصل حديثًا" link={<TLink dark href="#/products/new">الكل</TLink>} /></Reveal>
          <div className="mt-12"><ProductRow items={fresh} dark /></div>
        </div>
      </section>

      {/* العروض — قائمة الوجهين */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="٠٤" eyebrow="خصم على الوجهين معًا" title="عروض الآن" /></Reveal>
        <div className="mt-10 max-w-3xl divide-y divide-line hairline-t hairline-b">
          {offers.map((p) => (
            <Reveal key={p.id}>
              <a href={`#/product/${p.id}`} className="group flex items-center gap-5 py-5">
                <img src={p.img} alt={p.name} className="w-14 h-14 object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-500" />
                <span className="flex-1 font-medium text-sm group-hover:text-olive transition-colors">{p.name}</span>
                {p.oldPrice && <span className="text-xs text-mute line-through">{fmtIQD(p.oldPrice)}</span>}
                <span className="font-display font-bold text-lg text-olive">{fmtIQD(p.price)}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* قطعة الظل المفضلة */}
      <section className="bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow dark num="٠٥">قطعة الليل الأولى</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-5">{featured.name}</h2>
            <p className="mt-5 text-sand/70 text-sm leading-7 max-w-md">{featured.desc}</p>
            <div className="mt-6"><Price price={featured.price} size="lg" dark /></div>
            <div className="mt-8 flex flex-wrap gap-6 items-center">
              <SolidBtn onClick={() => navigate(`/product/${featured.id}`)} className="!bg-olive hover:!bg-paper hover:!text-ink">أضف إلى السلة</SolidBtn>
              <TLink dark href={`#/product/${featured.id}`}>التفاصيل</TLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative">
            <span className="glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] aspect-square rounded-full bg-[#E8B861]/20 blur-3xl" aria-hidden />
            <img src={featured.img} alt={featured.name} className="relative w-full aspect-square object-cover brightness-[0.8]" />
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <Reveal><SectionHead num="٠٦" eyebrow="بين النور والظل" title="أسئلة" /></Reveal>
        <div className="mt-8"><FaqAccordion limit={3} /></div>
      </section>

      <ContactBand dark />
      <Footer />
      <ConceptBar index={14} name="Chiaroscuro" />
    </div>
  );
}

/* ================================================================== */
/*  CONCEPT 15 — The Spec Sheet (الرسم الفني)                          */
/* ================================================================== */
function DimensionH({ label }: { label: string }) {
  return (
    <span className="dim absolute -bottom-9 inset-x-[8%] flex flex-col items-center gap-1" aria-hidden>
      <svg viewBox="0 0 100 8" preserveAspectRatio="none" className="w-full h-2 text-olive">
        <line x1="0" y1="4" x2="100" y2="4" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1.5" />
        <line x1="100" y1="0" x2="100" y2="8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="text-[0.62rem] font-semibold text-olive" dir="ltr">{label}</span>
    </span>
  );
}
function DimensionV({ label }: { label: string }) {
  return (
    <span className="dim-v absolute -right-10 top-[8%] bottom-[8%] flex items-center gap-1" aria-hidden>
      <svg viewBox="0 0 8 100" preserveAspectRatio="none" className="h-full w-2 text-olive">
        <line x1="4" y1="0" x2="4" y2="100" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="0" x2="8" y2="0" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="100" x2="8" y2="100" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="text-[0.62rem] font-semibold text-olive rotate-90 whitespace-nowrap" dir="ltr">{label}</span>
    </span>
  );
}
const Crosshair = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" className={`w-5 h-5 text-olive ${className}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
    <circle cx="10" cy="10" r="6" /><line x1="10" y1="0" x2="10" y2="20" /><line x1="0" y1="10" x2="20" y2="10" />
  </svg>
);

export function Concept15() {
  const { products } = useStore();
  const luna = products.find((p) => p.id === "luna")!;
  const best = products.filter((p) => p.isBest);
  const fresh = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.isOffer);

  const specRows: [string, string][] = [
    ["الارتفاع الكلي", "42 سم"],
    ["قطر القبة", "25 سم"],
    ["وزن القاعدة", "1.8 كغم — ثبات كامل"],
    ["المصدر الضوئي", "LED مدمج · 2700K"],
    ["القدرة", "9 واط — 800 لومن"],
    ["التعتيم", "لمسي، 3 مستويات"],
    ["التشغيل", "كهرباء مباشرة · سلك 1.8 م"],
    ["الخامة", "سيراميك مطفي، يدوي"],
    ["الضمان", "سنة ضد عيوب التصنيع"],
  ];

  return (
    <div className="min-h-screen bg-gridpaper">
      <Header />

      {/* HERO — لوحة الرسم A-01 */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-10 md:pt-16">
        <Reveal className="border border-ink/70 bg-paper relative">
          <Crosshair className="absolute top-2 right-2" />
          <Crosshair className="absolute top-2 left-2" />
          <Crosshair className="absolute bottom-2 right-2" />
          <Crosshair className="absolute bottom-2 left-2" />

          <div className="p-6 md:p-12 grid lg:grid-cols-[1fr_0.9fr] gap-10 items-center">
            {/* الرسم */}
            <div className="relative pt-4 pb-14 pr-2 lg:pr-6">
              <Reveal className="relative max-w-sm mx-auto">
                <img src={luna.img} alt="لونا — رسم فني" className="w-full aspect-square object-cover border border-line" />
                <DimensionV label="42 cm" />
                <DimensionH label="Ø 25 cm" />
              </Reveal>
            </div>
            {/* البيانات */}
            <div>
              <p className="text-[0.65rem] font-semibold text-mute" dir="ltr">MISHKAT — TECHNICAL DRAWING · SHEET A-01</p>
              <h1 className="font-display font-bold text-5xl md:text-6xl leading-[1.1] mt-4">
                <span className="lm"><span>لونا،</span></span>
                <span className="lm" style={{ ["--rv-delay" as never]: "130ms" }}><span>مقاسًا بدقة.</span></span>
              </h1>
              <p className="mt-5 text-mute text-sm leading-7 max-w-sm">كل مصباح في مشكاة مرسوم ومقاس ومجرَّب — ما تشتريه هنا مطابق لما يصلك.</p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <SolidBtn onClick={() => navigate("/product/luna")}>أضف إلى السلة — {fmtIQD(luna.price)}</SolidBtn>
                <TLink href="#/products">بقية الأوراق</TLink>
              </div>
            </div>
          </div>

          {/* جدول عنوان الرسم */}
          <div className="hairline-t grid grid-cols-2 md:grid-cols-5 text-[0.62rem]">
            {[["المتجر", "مشكاة — بغداد"], ["الورقة", "A-01"], ["المنتج", "لونا"], ["المقياس", "1:4"], ["التاريخ", "شتاء 2025"]].map(([k, v]) => (
              <div key={k} className="p-3 border-line border-b md:border-b-0 md:border-l last:border-l-0 [&:nth-child(odd)]:border-l md:[&:nth-child(odd)]:border-l">
                <span className="block text-mute">{k}</span>
                <span className="block font-bold mt-0.5">{v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* جدول المواصفات — خطوط منقطة */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="01" eyebrow="ورقة المواصفات" title="لونا، سطرًا سطرًا" /></Reveal>
        <Reveal delay={100} className="mt-10 max-w-2xl">
          {specRows.map(([k, v], i) => (
            <div key={k} className="flex items-baseline gap-3 py-3.5 hairline-b group">
              <span className="text-[0.62rem] font-semibold text-olive w-8 shrink-0" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-medium group-hover:text-olive transition-colors">{k}</span>
              <span className="flex-1 border-b border-dotted border-sand translate-y-[-4px]" aria-hidden />
              <span className="text-xs font-semibold text-mute">{v}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* أوراق الرسم — الأكثر مبيعًا */}
      <section className="hairline-t bg-surface/80">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal><SectionHead num="02" eyebrow="أوراق A-02 حتى A-05" title="الأكثر مبيعًا" link={<TLink href="#/products/best">كل الأوراق</TLink>} /></Reveal>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {best.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 70}>
                <div className="relative">
                  <span className="absolute -top-4 right-0 z-10 bg-ink text-paper text-[0.58rem] font-bold px-2 py-1" dir="ltr">A-{String(i + 2).padStart(2, "0")}</span>
                  <ProductCard p={p} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* مراجعات جديدة */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="03" eyebrow="مراجعات B" title="وصل حديثًا" link={<TLink href="#/products/new">الكل</TLink>} /></Reveal>
        <div className="mt-12"><ProductRow items={fresh} /></div>
      </section>

      {/* تعديلات الأسعار */}
      <section className="hairline-t bg-sand/25">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal><SectionHead num="04" eyebrow="تعديل معتمد على السعر" title="العروض" /></Reveal>
          <div className="mt-10 max-w-2xl divide-y divide-line hairline-t hairline-b">
            {offers.map((p) => (
              <Reveal key={p.id}>
                <a href={`#/product/${p.id}`} className="group flex items-center gap-4 py-4">
                  <span className="flex-1 min-w-0">
                    <span className="block font-medium text-sm group-hover:text-olive transition-colors truncate">{p.name}</span>
                    <span className="block text-[0.62rem] text-mute mt-0.5" dir="ltr">REV-{p.id.slice(0, 4).toUpperCase()}</span>
                  </span>
                  {p.oldPrice && <span className="text-xs text-mute line-through decoration-olive">{fmtIQD(p.oldPrice)}</span>}
                  <span className="font-display font-bold text-xl text-olive">{fmtIQD(p.price)}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <Reveal><SectionHead num="05" eyebrow="ملحق الأسئلة" title="أسئلة شائعة" link={<TLink href="#/faq">الكل</TLink>} /></Reveal>
        <div className="mt-8 max-w-3xl"><FaqAccordion limit={3} /></div>
      </section>

      <ContactBand />
      <Footer />
      <ConceptBar index={15} name="The Spec Sheet" />
    </div>
  );
}

/* ================================================================== */
/*  CONCEPT 16 — Scattered Posters (الملصقات المبعثرة)                  */
/* ================================================================== */
function Poster({ children, className = "", rotate = 0, tape = true }: { children: ReactNode; className?: string; rotate?: number; tape?: boolean }) {
  return (
    <div
      className={`relative bg-surface border border-line shadow-sm transition-all duration-500 hover:rotate-0 hover:shadow-xl hover:z-20 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {tape && <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-sand/70 rotate-[-3deg] z-10 shadow-sm" aria-hidden />}
      {children}
    </div>
  );
}

export function Concept16() {
  const { products, addToCart } = useStore();
  const best = products.filter((p) => p.isBest);
  const offers = products.filter((p) => p.isOffer);
  const fresh = products.filter((p) => p.isNew);
  const luna = products.find((p) => p.id === "luna")!;

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — جدار الملصقات */}
      <section className="hairline-b overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 relative">
          <p className="text-[0.7rem] text-mute">جدار مشكاة — ألصقنا لك كل شيء هنا</p>

          <Reveal className="mt-10 grid lg:grid-cols-12 gap-8 lg:gap-6 items-start">
            {/* الملصق الرئيسي */}
            <Poster rotate={-1.5} className="lg:col-span-5 p-8 md:p-10 order-1">
              <h1 className="font-display font-bold text-6xl md:text-7xl leading-[1.05]">
                <span className="lm"><span>ضوء</span></span>
                <span className="lm" style={{ ["--rv-delay" as never]: "120ms" }}><span className="text-olive">يُلصَق</span></span>
                <span className="lm" style={{ ["--rv-delay" as never]: "240ms" }}><span>بالذاكرة.</span></span>
              </h1>
              <p className="mt-5 text-mute text-sm leading-7 max-w-xs">مصابيح مكتب وطاولة — تصلك أينما كنت في العراق، وتدفع عند الباب.</p>
              <div className="mt-7"><TLink href="#/products">تسوّق الجدار كله</TLink></div>
            </Poster>

            {/* ملصق المنتج */}
            <Poster rotate={2} className="lg:col-span-4 lg:mt-14 order-2 p-3 pb-4">
              <button type="button" onClick={() => navigate(`/product/${luna.id}`)} className="block w-full text-right cursor-pointer">
                <span className="block aspect-square overflow-hidden">
                  <img src={luna.img} alt={luna.name} className="pcard-img w-full h-full object-cover" />
                </span>
                <span className="flex items-center justify-between gap-3 px-2 pt-3">
                  <span className="font-medium text-sm group-hover:text-olive">{luna.name}</span>
                  <Price price={luna.price} size="sm" />
                </span>
              </button>
              {/* ملصق السعر الدائري */}
              <button
                type="button"
                onClick={() => addToCart(luna, luna.colors[0], luna.sizes[0], 1)}
                className="absolute -bottom-6 -left-4 md:-left-7 w-24 h-24 rounded-full bg-olive text-paper grid place-items-center text-center rotate-[10deg] hover:rotate-0 hover:scale-105 transition-all duration-400 shadow-xl cursor-pointer"
              >
                <span className="text-[0.62rem] font-bold leading-4">أضف للسلة<br /><span className="font-display text-sm">{fmtIQD(luna.price)}</span></span>
              </button>
            </Poster>

            {/* ملاحظات لاصقة */}
            <div className="lg:col-span-3 space-y-6 lg:mt-6 order-3">
              <Poster rotate={-2.5} className="p-5">
                <p className="text-[0.65rem] font-bold text-olive">ملاحظة من المخزن</p>
                <p className="font-display font-bold text-xl mt-2 leading-relaxed">وصلت ٤ قطع جديدة هذا الأسبوع.</p>
                <a href="#/products/new" className="tlink rev text-xs mt-3"><span>شاهدها</span></a>
              </Poster>
              <Poster rotate={1.8} className="p-5">
                <p className="text-[0.65rem] font-bold text-olive">شروط الجدار</p>
                <ul className="text-xs text-mute mt-2 space-y-1.5 leading-6">
                  <li>— دفع عند الاستلام</li>
                  <li>— توصيل 18 محافظة</li>
                  <li>— ضمان سنة</li>
                </ul>
              </Poster>
            </div>
          </Reveal>
        </div>
      </section>

      {/* من على الجدار — الأكثر مبيعًا */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="٠١" eyebrow="مثبّتة منذ أشهر" title="من على الجدار" link={<TLink href="#/products/best">الكل</TLink>} /></Reveal>
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
          {best.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70} className={i % 2 === 1 ? "lg:translate-y-8" : ""}>
              <Poster rotate={i % 2 === 0 ? 1.6 : -1.6} className="p-2.5 pb-4">
                <ProductCard p={p} />
              </Poster>
            </Reveal>
          ))}
        </div>
      </section>

      {/* العروض — أختام مائلة */}
      <section className="bg-sand/30 hairline-t hairline-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal><SectionHead num="٠٢" eyebrow="مختومة وموقّعة" title="عروض الجدار" /></Reveal>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
            {offers.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 80}>
                <div className="relative">
                  <span className="absolute -top-4 -right-3 z-30 rotate-[-12deg] border-2 border-olive text-olive bg-paper/90 font-display font-bold px-3 py-1 text-sm shadow-md">
                    خصم {p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 10}٪
                  </span>
                  <Poster rotate={i % 2 === 0 ? -1.4 : 1.4} className="p-2.5 pb-4">
                    <ProductCard p={p} />
                  </Poster>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* الجديد */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="٠٣" eyebrow="لُصقت اليوم" title="جديد الجدار" link={<TLink href="#/products/new">الكل</TLink>} /></Reveal>
        <div className="mt-14"><ProductRow items={fresh} /></div>
      </section>

      {/* بيان — ملصق كبير */}
      <section className="hairline-t">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal>
            <Poster rotate={-1} className="p-10 md:p-14 text-center" tape={false}>
              <span className="absolute -top-3 right-10 w-24 h-6 bg-sand/70 rotate-[4deg]" aria-hidden />
              <span className="absolute -top-3 left-10 w-24 h-6 bg-sand/70 rotate-[-4deg]" aria-hidden />
              <p className="font-display font-bold text-3xl md:text-5xl leading-[1.5]">نبيع مصباحًا واحدًا جيدًا…<br /><span className="text-olive">ولا نلصق وعودًا كثيرة.</span></p>
            </Poster>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal><SectionHead num="٠٤" eyebrow="قصاصات صغيرة" title="أسئلة شائعة" link={<TLink href="#/faq">الكل</TLink>} /></Reveal>
        <div className="mt-8 max-w-3xl"><FaqAccordion limit={3} /></div>
      </section>

      <ContactBand />
      <Footer />
      <ConceptBar index={16} name="Scattered Posters" />
    </div>
  );
}
