import { useEffect, useRef, useState } from "react";
import { IMG, fmtIQD } from "../lib/data";
import type { Product } from "../lib/data";
import { navigate, Reveal, useStore } from "../lib/state";
import { ContactBand, FaqAccordion, Footer, Header } from "../components/chrome";
import { ProductCard, ProductRow } from "../components/product";
import { ConceptBar, Eyebrow, Price, SectionHead, SolidBtn, TLink, Wordmark } from "../components/ui";
import { IArrow, IBag } from "../components/icons";

/* ================================================================== */
/*  CONCEPT 09 — Snap Stack (عَرْض الشاشة الكاملة)                       */
/*  شرائح عمودية بملء الشاشة، تنقّل بالنقاط، شريط ثابت علوي              */
/* ================================================================== */
export function Concept9() {
  const { products, cartCount } = useStore();
  const best = products.filter((p) => p.isBest);
  const offers = products.filter((p) => p.isOffer);
  const featured = products.find((p) => p.id === "luna")!;
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const SLIDES = ["الافتتاح", "المنتج", "الأكثر مبيعًا", "العروض", "القطعة", "الختام"];

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const sections = Array.from(wrap.querySelectorAll("[data-slide]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.slide));
        });
      },
      { root: wrap, threshold: 0.55 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const el = wrapRef.current?.querySelector(`[data-slide="${i}"]`);
    el?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* شريط ثابت خاص بالمفهوم */}
      <div className="fixed top-0 inset-x-0 z-[70] flex items-center justify-between px-4 md:px-8 h-14 bg-ink/85 backdrop-blur text-paper">
        <a href="#/"><Wordmark dark small /></a>
        <nav className="hidden md:flex items-center gap-7 text-[0.72rem]">
          <TLink dark href="#/products"><span>المتجر</span></TLink>
          <TLink dark href="#/compare"><span>مقارنة</span></TLink>
          <TLink dark href="#/faq"><span>أسئلة</span></TLink>
        </nav>
        <button onClick={() => navigate("/cart")} className="relative p-2 hover:text-olive transition-colors" aria-label="السلة">
          <IBag className="w-5 h-5" />
          {cartCount > 0 && <span className="absolute -top-0.5 -left-0.5 w-4.5 h-4.5 min-w-[18px] grid place-items-center bg-olive text-paper text-[0.6rem] font-bold px-1">{cartCount}</span>}
        </button>
      </div>

      {/* حاوية الشرائح */}
      <div ref={wrapRef} className="h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar bg-ink text-paper">
        {/* ٠ — الافتتاح: طباعة عملاقة + صورة مشقوقة */}
        <section data-slide="0" className="relative h-screen snap-start flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center pt-14">
            <Reveal>
              <p className="text-[0.7rem] font-medium text-olive">مشكاة — العرض ٠٩</p>
              <h1 className="font-display font-bold leading-[0.98] mt-5">
                <span className="lm"><span className="block text-7xl md:text-[11rem]">ضوء</span></span>
                <span className="lm" style={{ ["--rv-delay" as never]: "160ms" }}><span className="block text-4xl md:text-7xl text-sand mt-2">يُروى قطعةً قطعة.</span></span>
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <button onClick={() => go(1)} className="tlink dark text-sm"><span className="text-paper">ابدأ العرض</span></button>
                <span className="text-[0.68rem] text-sand/50">مرّر للأسفل ↓</span>
              </div>
            </Reveal>
            <Reveal delay={200} className="relative hidden lg:block">
              <span className="glow-pulse absolute inset-10 bg-[#E8B861]/20 blur-3xl rounded-full" aria-hidden />
              <img src={IMG.qamar} alt="قمر — ضوء محمول" className="relative w-full aspect-[4/5] object-cover border border-paper/15" />
            </Reveal>
          </div>
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => <span key={i} className="w-px h-6 bg-paper/25 mx-auto" />)}
          </span>
        </section>

        {/* ١ — المنتج: صورة بملء الشاشة + شريط تعليق سفلي */}
        <section data-slide="1" className="relative h-screen snap-start overflow-hidden">
          <img src={IMG.hero} alt="مكتب بضوء العصر" className="kenburns absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />
          <div className="relative z-10 h-full flex flex-col justify-end">
            <div className="bg-paper text-ink px-4 md:px-8 py-5 flex flex-wrap items-center gap-x-10 gap-y-3">
              <span className="font-display font-bold text-2xl md:text-3xl">لونا — مصباح القبة</span>
              <span className="text-xs text-mute hidden md:block">سيراميك مطفي · 2700K · ثلاثة مستويات تعتيم</span>
              <span className="ms-auto flex items-center gap-5">
                <Price price={featured.price} size="lg" />
                <SolidBtn onClick={() => navigate(`/product/${featured.id}`)}>التفاصيل</SolidBtn>
              </span>
            </div>
          </div>
        </section>

        {/* ٢ — الأكثر مبيعًا: شريحة داكنة بصف منتجات */}
        <section data-slide="2" className="h-screen snap-start flex flex-col justify-center bg-ink">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full pt-14">
            <Reveal>
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-display font-bold text-4xl md:text-6xl">الأكثر مبيعًا</h2>
                <TLink dark href="#/products/best"><span>الكل</span></TLink>
              </div>
            </Reveal>
            <div className="mt-10"><ProductRow items={best} dark /></div>
          </div>
        </section>

        {/* ٣ — العروض: شريحة رملية بقائمة مختزلة */}
        <section data-slide="3" className="h-screen snap-start flex items-center bg-sand/25 text-ink">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <Eyebrow>الشريحة الرابعة</Eyebrow>
              <h2 className="font-display font-bold text-5xl md:text-7xl mt-4 leading-[1.1]">عروض<br />لا تنتظر.</h2>
              <p className="mt-5 text-sm text-mute leading-7 max-w-xs">أسعار مخفّضة على قطع مختارة — حتى نفاد الكمية من مخزن بغداد.</p>
              <div className="mt-7"><TLink href="#/products/offers">كل العروض</TLink></div>
            </Reveal>
            <div className="divide-y divide-line hairline-t hairline-b max-h-[60vh] overflow-y-auto no-scrollbar">
              {offers.map((p) => (
                <a key={p.id} href={`#/product/${p.id}`} className="group flex items-center gap-4 py-4 hover:bg-surface transition-colors px-2">
                  <img src={p.img} alt={p.name} className="w-14 h-14 object-cover shrink-0" />
                  <span className="flex-1 font-medium text-sm group-hover:text-olive transition-colors truncate">{p.name}</span>
                  <span className="text-left shrink-0">
                    {p.oldPrice && <span className="block text-[0.65rem] text-mute line-through">{fmtIQD(p.oldPrice)}</span>}
                    <span className="font-display font-bold text-lg text-olive">{fmtIQD(p.price)}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ٤ — القطعة: انقسام داكن/فاتح */}
        <section data-slide="4" className="h-screen snap-start grid lg:grid-cols-2">
          <div className="relative overflow-hidden order-2 lg:order-1">
            <img src={featured.img} alt={featured.name} className="kenburns absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="flex items-center bg-paper text-ink px-4 md:px-8 lg:pe-16 py-14 order-1 lg:order-2">
            <Reveal>
              <Eyebrow num="٠٥">قطعة العرض</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-6xl mt-4">{featured.name}</h2>
              <p className="mt-4 text-sm text-mute leading-7 max-w-sm">{featured.desc}</p>
              <div className="mt-6"><Price price={featured.price} size="lg" /></div>
              <div className="mt-8 flex flex-wrap gap-5 items-center">
                <SolidBtn onClick={() => navigate(`/product/${featured.id}`)}>أضف إلى السلة</SolidBtn>
                <TLink href="#/compare">قارن</TLink>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ٥ — الختام */}
        <section data-slide="5" className="min-h-screen snap-start flex flex-col bg-ink">
          <div className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full text-center">
              <Reveal>
                <p className="font-display font-bold text-4xl md:text-6xl leading-[1.4]">انتهى العرض —<br />وابتدأ <span className="text-olive">الضوء.</span></p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
                  <TLink dark href="#/products"><span>المتجر الكامل</span></TLink>
                  <TLink dark href="#/faq"><span>أسئلة شائعة</span></TLink>
                  <TLink dark href="#/contact"><span>تواصل</span></TLink>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="hairline-t border-paper/10 py-5">
            <p className="text-center text-[0.65rem] text-sand/50">© 2025 مشكاة — بغداد، العراق</p>
          </div>
        </section>
      </div>

      {/* نقاط التنقل الجانبية */}
      <nav className="fixed left-5 top-1/2 -translate-y-1/2 z-[75] flex flex-col gap-3" aria-label="التنقل بين الشرائح">
        {SLIDES.map((s, i) => (
          <button key={s} onClick={() => go(i)} className="group flex items-center gap-2.5" aria-label={s} title={s}>
            <span className={`hidden md:block text-[0.6rem] text-paper/0 group-hover:text-paper/80 transition-colors duration-300 bg-ink/70 px-2 py-1 ${active === i ? "text-paper/80" : ""}`}>{s}</span>
            <span className={`block rounded-full transition-all duration-300 ${active === i ? "w-2.5 h-2.5 bg-olive" : "w-1.5 h-1.5 bg-paper/40 hover:bg-paper/80"}`} />
          </button>
        ))}
      </nav>

      <ConceptBar index={9} name="Snap Stack" />
    </div>
  );
}

/* ================================================================== */
/*  CONCEPT 10 — Mosaic (فسيفساء الإطارات)                               */
/*  كل شيء بلاطات بإطارات شعرية غير متساوية — لا بطاقات ولا ظلال          */
/* ================================================================== */
export function Concept10() {
  const { products } = useStore();
  const best = products.filter((p) => p.isBest).slice(0, 4);
  const fresh = products.filter((p) => p.isNew).slice(0, 3);
  const offers = products.filter((p) => p.isOffer);
  const luna = products.find((p) => p.id === "luna")!;
  const ward = products.find((p) => p.id === "ward")!;

  return (
    <div className="min-h-screen">
      <Header />

      {/* فسيفساء الافتتاح */}
      <section className="hairline-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[92px] md:auto-rows-[110px] gap-px bg-line border border-line">
            {/* صورة كبيرة */}
            <Reveal className="col-span-2 md:col-span-3 row-span-3 relative overflow-hidden bg-surface group">
              <a href="#/products" className="absolute inset-0">
                <img src={IMG.desk} alt="مكتب مسائي" className="pcard-img w-full h-full object-cover" />
                <span className="absolute bottom-3 right-3 bg-paper/90 px-3 py-1.5 text-[0.62rem] font-semibold">طقوس المساء — تسوّق</span>
              </a>
            </Reveal>

            {/* العنوان */}
            <Reveal delay={80} className="col-span-2 md:col-span-3 row-span-2 bg-paper flex flex-col justify-center px-5 md:px-8">
              <p className="text-[0.62rem] font-medium text-olive">مشكاة · فسيفساء الضوء</p>
              <h1 className="font-display font-bold text-3xl md:text-5xl leading-[1.15] mt-2">
                مربعات صغيرة،<br />ضوء كبير.
              </h1>
            </Reveal>

            {/* وصف + CTA */}
            <Reveal delay={140} className="col-span-2 md:col-span-3 row-span-1 bg-surface flex items-center justify-between gap-4 px-5 md:px-8">
              <p className="text-[0.7rem] text-mute leading-5">مصابيح مكتب وطاولة من بغداد إلى كل العراق.</p>
              <TLink href="#/products"><span className="text-xs">المتجر</span></TLink>
            </Reveal>

            {/* بلاطة منتج */}
            <Reveal delay={100} className="col-span-2 md:col-span-1 row-span-2 relative overflow-hidden bg-surface">
              <a href={`#/product/${luna.id}`} className="absolute inset-0 group">
                <img src={luna.img} alt={luna.name} className="pcard-img w-full h-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-ink/80 text-paper text-[0.6rem] font-medium px-2 py-1.5 truncate">{luna.name}</span>
              </a>
            </Reveal>

            {/* بلاطة رقم */}
            <Reveal delay={160} className="col-span-2 md:col-span-2 md:row-span-2 bg-ink text-paper flex items-center justify-between px-5 md:flex-col md:justify-center md:gap-3">
              <span className="font-display font-bold text-3xl md:text-6xl">12</span>
              <span className="text-[0.62rem] text-sand/70 md:text-center">قطعة<br />مختارة</span>
            </Reveal>

            {/* بلاطة اقتباس */}
            <Reveal delay={200} className="col-span-2 md:col-span-2 row-span-2 bg-sand/40 flex flex-col justify-center px-5 md:px-6">
              <span className="font-display text-olive text-2xl leading-none">”</span>
              <p className="font-display font-bold text-base md:text-lg leading-7">الضوء ليس تفصيلًا… إنه روح المكان.</p>
            </Reveal>

            {/* بلاطة صورة صغيرة */}
            <Reveal delay={180} className="col-span-2 md:col-span-1 row-span-2 relative overflow-hidden bg-surface">

              <a href="#/products/table" className="absolute inset-0">
                <img src={ward.img} alt={ward.name} className="pcard-img w-full h-full object-cover" />
              </a>
            </Reveal>

            {/* بلاطة توصيل */}
            <Reveal delay={220} className="col-span-2 md:col-span-6 row-span-1 bg-paper flex items-center justify-between gap-4 px-5 md:px-8">
              <span className="text-[0.7rem] font-semibold">الدفع عند الاستلام</span>
              <span className="text-[0.62rem] text-mute">توصيل ١٨ محافظة · خلال ٢–٤ أيام</span>
              <IArrow className="w-4 h-4 text-olive shrink-0" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* الفئات — بلاطات غير متساوية */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <Reveal><SectionHead num="٠١" eyebrow="تقسيمات الفسيفساء" title="حسب المكان" /></Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 auto-rows-[120px] md:auto-rows-[150px] gap-px bg-line border border-line">
          <Reveal className="col-span-2 md:col-span-3 row-span-2 relative overflow-hidden bg-surface group">
            <a href="#/products/desk" className="absolute inset-0">
              <img src={IMG.nimra} alt="مكتبي" className="pcard-img w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute bottom-0 inset-x-0 p-5 text-paper flex items-end justify-between">
                <span><span className="block font-display font-bold text-2xl md:text-3xl">مكتبي</span><span className="block text-[0.68rem] text-paper/70 mt-1">٦ قطع</span></span>
                <IArrow className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
              </span>
            </a>
          </Reveal>
          <Reveal delay={90} className="col-span-1 md:col-span-2 row-span-1 relative overflow-hidden bg-surface group">
            <a href="#/products/table" className="absolute inset-0">
              <img src={IMG.rawda} alt="طاولة" className="pcard-img w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute bottom-3 right-4 left-4 flex items-end justify-between text-paper">
                <span className="font-display font-bold text-xl md:text-2xl">طاولة</span>
                <IArrow className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              </span>
            </a>
          </Reveal>
          <Reveal delay={150} className="col-span-1 md:col-span-2 row-span-1 bg-ink text-paper flex items-center justify-between px-5 md:px-6 group">
            <a href="#/products/rechargeable" className="absolute inset-0" />
            <span>
              <span className="block font-display font-bold text-xl md:text-2xl">قابل للشحن</span>
              <span className="block text-[0.65rem] text-sand/70 mt-1">ضوء يتنقل</span>
            </span>
            <IArrow className="w-5 h-5 text-olive group-hover:-translate-x-1.5 transition-transform" />
          </Reveal>
        </div>
      </section>

      {/* الأكثر مبيعًا — إطاران كبيران + قائمة */}
      <section className="hairline-t bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
          <div>
            <Reveal><SectionHead num="٠٢" eyebrow="البلاطات الأولى" title="الأكثر مبيعًا" link={<TLink href="#/products/best">الكل</TLink>} /></Reveal>
            <div className="mt-10 grid sm:grid-cols-2 gap-px bg-line border border-line">
              {best.map((p, i) => (
                <Reveal key={p.id} delay={(i % 2) * 80} className="bg-paper">
                  <div className={i % 2 === 0 ? "" : "sm:translate-y-6"}><ProductCard p={p} bordered /></div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:pt-24">
            <Reveal delay={120}>
              <div className="relative overflow-hidden border border-line">
                <img src={IMG.living} alt="زاوية معيشة" className="kenburns w-full aspect-[3/4] object-cover" />
                <span className="absolute bottom-0 inset-x-0 bg-paper/90 px-5 py-4 text-[0.7rem] leading-6">
                  <span className="font-semibold block">زاوية رقم ٤ — ورد الكهرماني</span>
                  <span className="text-mute">كيف غيّر مصباح واحد غرفة كاملة.</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* جديد + عروض في فسيفساء واحدة */}
      <section className="hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <Reveal><SectionHead num="٠٣" eyebrow="بلاطات طازجة" title="جديد وعروض" /></Reveal>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-px bg-line border border-line">
            {fresh.map((p, i) => (
              <Reveal key={p.id} delay={i * 70} className="bg-paper"><ProductCard p={p} bordered /></Reveal>
            ))}
            {offers.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={(i + 1) * 70} className="bg-paper relative">
                <ProductCard p={p} bordered />
                <span className="absolute top-3 left-3 bg-olive text-paper text-[0.6rem] font-bold px-2 py-1 rotate-[-3deg]">عرض</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* شريط ختامي */}
      <section className="hairline-t bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <Reveal>
            <p className="font-display font-bold text-3xl md:text-5xl leading-[1.35]">كل بلاطة هنا…<br />ضوء في بيت شخص ما.</p>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <TLink dark href="#/products"><span>المتجر</span></TLink>
            <TLink dark href="#/compare"><span>قارن</span></TLink>
            <TLink dark href="#/faq"><span>أسئلة</span></TLink>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-18">
        <Reveal><SectionHead num="٠٤" eyebrow="قبل الختام" title="أسئلة" /></Reveal>
        <div className="mt-8"><FaqAccordion limit={3} /></div>
      </section>

      <ContactBand />
      <Footer />
      <ConceptBar index={10} name="Mosaic" />
    </div>
  );
}

/* ================================================================== */
/*  CONCEPT 11 — Ledger (قائمة الأسعار المطبوعة)                          */
/*  خطوط منقطة بين الاسم والسعر، إطار مطبوع، صورة مؤطرة في الأعلى        */
/* ================================================================== */
function LeaderLine({ p, n }: { p: Product; n: number }) {
  return (
    <a href={`#/product/${p.id}`} className="group block py-3.5">
      <span className="flex items-baseline gap-3">
        <span className="font-display text-olive text-xs shrink-0">{String(n).padStart(2, "0")}</span>
        <span className="font-medium text-sm md:text-base group-hover:text-olive transition-colors whitespace-nowrap">{p.name}</span>
        <span className="flex-1 border-b border-dotted border-sand translate-y-[-4px] min-w-6" aria-hidden />
        {p.oldPrice && <span className="text-[0.68rem] text-mute line-through whitespace-nowrap">{fmtIQD(p.oldPrice)}</span>}
        <span className="font-display font-bold text-base md:text-lg whitespace-nowrap">{fmtIQD(p.price)}</span>
      </span>
      <span className="block text-[0.65rem] text-mute mt-1 pr-7">{p.type} · {p.charging === "قابل للشحن" ? "بطارية USB-C" : "كهرباء مباشرة"}</span>
    </a>
  );
}

export function Concept11() {
  const { products } = useStore();
  const desk = products.filter((p) => p.type === "مكتبي");
  const table = products.filter((p) => p.type === "طاولة");
  const charge = products.filter((p) => p.charging === "قابل للشحن");
  const offers = products.filter((p) => p.isOffer);
  const best = products.filter((p) => p.isBest).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header />

      {/* القائمة المطبوعة */}
      <section className="hairline-b">
        <div className="max-w-5xl mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-10 text-center">
          <Reveal>
            <p className="text-[0.68rem] font-medium text-mute">مشكاة · بغداد · تأسست ٢٠٢١</p>
            <h1 className="font-display font-bold text-5xl md:text-7xl mt-4 leading-[1.1]">قائمة الأسعار</h1>
            <p className="mt-3 text-sm text-mute">خريف وشتاء ٢٠٢٥ — الأسعار بالدينار العراقي، شاملة كل شيء</p>
            <div className="mt-6 flex items-center justify-center gap-4" aria-hidden>
              <span className="w-16 h-px bg-sand" />
              <span className="font-display text-olive text-xl">✦</span>
              <span className="w-16 h-px bg-sand" />
            </div>
          </Reveal>

          {/* صورة مؤطرة */}
          <Reveal delay={140} className="mt-8">
            <figure className="relative inline-block border border-line bg-surface p-3 md:p-4">
              <img src={IMG.rawda} alt="مصباح روّاد الكتان" className="w-56 md:w-72 aspect-square object-cover" />
              <figcaption className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-paper border border-line px-4 py-1.5 text-[0.62rem] font-medium whitespace-nowrap">طبق الأسبوع — روّاد</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* عمودا القائمة */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 grid md:grid-cols-2 gap-x-16 gap-y-10">
        <Reveal>
          <h2 className="font-display font-bold text-2xl md:text-3xl pb-3 hairline-b flex items-baseline justify-between">
            مصابيح المكتب <span className="text-xs font-sans font-normal text-mute">{desk.length} قطع</span>
          </h2>
          <div className="divide-y divide-line/70">
            {desk.map((p, i) => <LeaderLine key={p.id} p={p} n={i + 1} />)}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-bold text-2xl md:text-3xl pb-3 hairline-b flex items-baseline justify-between">
            مصابيح الطاولة <span className="text-xs font-sans font-normal text-mute">{table.length} قطع</span>
          </h2>
          <div className="divide-y divide-line/70">
            {table.map((p, i) => <LeaderLine key={p.id} p={p} n={i + 1} />)}
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl pb-3 hairline-b mt-10 flex items-baseline justify-between">
            قابلة للشحن <span className="text-xs font-sans font-normal text-mute">{charge.length} قطع</span>
          </h2>
          <div className="divide-y divide-line/70">
            {charge.map((p, i) => <LeaderLine key={p.id} p={p} n={i + 1} />)}
          </div>
        </Reveal>
      </section>

      {/* حاشية القائمة — شروط صغيرة مثل القوائم الحقيقية */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-12">
        <Reveal className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line text-center">
          {[["الدفع", "عند الاستلام"], ["التوصيل", "٣–٦ آلاف د.ع"], ["الضمان", "سنة كاملة"], ["الإرجاع", "عبر واتساب"]].map(([t, d]) => (
            <div key={t} className="bg-surface py-5 px-3">
              <p className="font-display font-bold text-lg">{t}</p>
              <p className="text-[0.65rem] text-mute mt-1">{d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* الأطباق المميّزة — صور مؤطرة مثل قوائم الطعام */}
      <section className="hairline-t bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <Reveal className="text-center">
            <p className="text-[0.68rem] font-medium text-olive">✦ من المطبخ — أي من المخزن ✦</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-3">الأطباق المميّزة</h2>
          </Reveal>
          <div className="mt-12 flex gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-2 justify-start md:justify-center">
            {best.map((p) => (
              <a key={p.id} href={`#/product/${p.id}`} className="group shrink-0 w-60 md:w-64 border border-line bg-paper p-3 text-center hover:-translate-y-1.5 transition-transform duration-500">
                <img src={p.img} alt={p.name} className="w-full aspect-square object-cover border border-line" />
                <span className="block font-display font-bold text-lg mt-3 group-hover:text-olive transition-colors">{p.name}</span>
                <span className="block text-[0.65rem] text-mute mt-1">{p.desc}</span>
                <span className="block font-display font-bold text-xl mt-2">{fmtIQD(p.price)}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* العروض — أسعار مشطوبة بختم */}
      <section className="hairline-t">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <Reveal className="text-center">
            <h2 className="font-display font-bold text-4xl md:text-5xl">تخفيضات اليوم</h2>
            <p className="text-xs text-mute mt-2">الأسعار المشطوبة كانت بالأمس فقط</p>
          </Reveal>
          <div className="mt-10 divide-y divide-line hairline-t hairline-b">
            {offers.map((p) => (
              <Reveal key={p.id}>
                <a href={`#/product/${p.id}`} className="group flex items-center gap-4 py-5 hover:bg-surface transition-colors px-2">
                  <img src={p.img} alt={p.name} className="w-14 h-14 object-cover border border-line shrink-0" />
                  <span className="flex-1 font-medium text-sm group-hover:text-olive transition-colors truncate">{p.name}</span>
                  <span className="relative shrink-0">
                    <span className="font-display font-bold text-xl text-mute/60 line-through decoration-olive decoration-2">{fmtIQD(p.oldPrice ?? p.price)}</span>
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-display font-bold text-olive text-sm whitespace-nowrap">{fmtIQD(p.price)}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center"><TLink href="#/products">القائمة الكاملة في المتجر</TLink></Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-14 md:py-18">
        <Reveal className="text-center mb-8">
          <h2 className="font-display font-bold text-4xl md:text-5xl">أسئلة الروّاد</h2>
        </Reveal>
        <FaqAccordion limit={4} />
      </section>

      <ContactBand />
      <Footer />
      <ConceptBar index={11} name="Ledger" />
    </div>
  );
}

/* ================================================================== */
/*  CONCEPT 12 — Niches (المشكاوات)                                       */
/*  قاعة داكنة، كل منتج في كُوّة مضاءة بتوهج دافئ ولوحة متحفية           */
/* ================================================================== */
function Niche({ p, tall = false, i }: { p: { id: string; name: string; price: number; img: string; desc: string }; tall?: boolean; i: number }) {
  return (
    <Reveal delay={(i % 3) * 100}>
      <a href={`#/product/${p.id}`} className="group block">
        {/* الكُوّة */}
        <span className={`relative block overflow-hidden border border-paper/12 bg-[#141412] ${tall ? "aspect-[3/4.4]" : "aspect-square"}`}>
          <span className="absolute inset-x-[12%] top-[6%] bottom-[20%] bg-[radial-gradient(ellipse_at_top,rgba(232,184,97,0.28),transparent_65%)] group-hover:opacity-100 opacity-70 transition-opacity duration-700" aria-hidden />
          <img src={p.img} alt={p.name} loading="lazy" className={`pcard-img absolute inset-x-0 ${tall ? "inset-y-0" : "top-0 h-[86%]"} w-full object-cover`} />
          <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-[#E8B861]/50 to-transparent" aria-hidden />
        </span>
        {/* اللوحة المتحفية */}
        <span className="mt-3 flex items-start justify-between gap-4 border border-paper/10 px-4 py-3 bg-paper/[0.03] group-hover:bg-paper/[0.06] transition-colors duration-400">
          <span className="min-w-0">
            <span className="block font-display font-bold text-lg text-paper group-hover:text-olive transition-colors truncate">{p.name}</span>
            <span className="block text-[0.62rem] text-sand/50 mt-0.5 leading-5 line-clamp-1">{p.desc}</span>
          </span>
          <span className="text-left shrink-0">
            <span className="block font-semibold text-sm text-paper">{fmtIQD(p.price)}</span>
            <span className="block text-[0.58rem] text-olive mt-0.5">اللوحة ٠{i + 1}</span>
          </span>
        </span>
      </a>
    </Reveal>
  );
}

export function Concept12() {
  const { products } = useStore();
  const desk = products.filter((p) => p.type === "مكتبي").slice(0, 3);
  const table = products.filter((p) => p.type === "طاولة").slice(0, 3);
  const charge = products.filter((p) => p.charging === "قابل للشحن").slice(0, 3);
  const offers = products.filter((p) => p.isOffer).slice(0, 3);

  return (
    <div className="min-h-screen bg-ink text-paper">
      <Header />

      {/* الافتتاح — ثلاث مشكاوات بأحجام مختلفة */}
      <section className="hairline-b border-paper/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-6">
          <Reveal className="grid lg:grid-cols-[1fr_0.9fr] gap-10 items-end">
            <div>
              <p className="text-[0.7rem] font-medium text-olive">القاعة الرئيسية — مشكاة</p>
              <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.12] mt-4">
                <span className="lm"><span>في الجدار كُوّة،</span></span>
                <span className="lm" style={{ ["--rv-delay" as never]: "160ms" }}><span className="text-sand">وفي الكُوّة ضوء.</span></span>
              </h1>
              <p className="mt-5 text-sm text-sand/60 leading-7 max-w-md">
                «مشكاة» هي الكُوّة التي يوضع فيها المصباح — وهذا المتجر كُوّتك: ادخل، تجوّل بين القاعات، وخذ ضوءك معك.
              </p>
              <div className="mt-7"><TLink dark href="#/products">تجوّل في القاعات</TLink></div>
            </div>
            <div className="relative hidden lg:flex justify-end">
              <span className="glow-pulse absolute inset-y-6 right-6 w-2/3 bg-[#E8B861]/15 blur-3xl rounded-full" aria-hidden />
              <img src={IMG.glow} alt="توهج الكتان" className="relative w-64 xl:w-80 aspect-[3/4] object-cover border border-paper/12" />
            </div>
          </Reveal>
        </div>

        {/* مشكاوات الواجهة — تكوين غير متماثل */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-14">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 items-end">
            <div className="lg:col-span-3"><Niche p={products[1]} i={0} /></div>
            <div className="lg:col-span-4 lg:-translate-y-6"><Niche p={products[0]} i={1} tall /></div>
            <div className="lg:col-span-2 hidden lg:block"><Niche p={products[2]} i={2} /></div>
            <div className="lg:col-span-3 lg:-translate-y-2"><Niche p={products[4]} i={3} /></div>
          </div>
        </div>
      </section>

      {/* قاعة المكتب */}
      <section className="border-t border-paper/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-display text-olive text-xl">القاعة الأولى</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl mt-2">قاعة المكتب</h2>
            </div>
            <TLink dark href="#/products/desk"><span>كل القاعة</span></TLink>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {desk.map((p, i) => <Niche key={p.id} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* استراحة — جملة متوهجة */}
      <section className="border-t border-paper/10 relative overflow-hidden">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-[2/1] bg-[#E8B861]/10 blur-3xl rounded-full glow-pulse" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <Reveal>
            <p className="font-display font-bold text-3xl md:text-5xl leading-[1.5]">
              «مَثَلُ نُورِهِ كَمِشْكَاةٍ فِيهَا مِصْبَاح»
            </p>
            <p className="mt-5 text-[0.7rem] text-sand/50">منها أخذنا الاسم — ومنها نأخذ الهدوء.</p>
          </Reveal>
        </div>
      </section>

      {/* قاعة الطاولة */}
      <section className="border-t border-paper/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-display text-olive text-xl">القاعة الثانية</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl mt-2">قاعة الطاولة</h2>
            </div>
            <TLink dark href="#/products/table"><span>كل القاعة</span></TLink>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {table.map((p, i) => <Niche key={p.id} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ممر الشحن — صف يعبر */}
      <section className="border-t border-paper/10 bg-[#141412]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-display text-olive text-xl">الممر المضيء</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl mt-2">ممر القابلة للشحن</h2>
            </div>
            <TLink dark href="#/products/rechargeable"><span>كل الممر</span></TLink>
          </Reveal>
        </div>
        <div className="pb-16 px-4 md:px-8">
          <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x">
            {charge.map((p, i) => (
              <div key={p.id} className="min-w-[250px] md:min-w-[280px] snap-start"><Niche p={p} i={i} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* عروض — كُوّات موسومة */}
      <section className="border-t border-paper/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-display text-olive text-xl">بسعر أقل</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl mt-2">كُوّات العروض</h2>
            </div>
            <TLink dark href="#/products/offers"><span>كل العروض</span></TLink>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {offers.map((p, i) => (
              <div key={p.id} className="relative">
                <Niche p={p} i={i} />
                <span className="absolute top-3 right-3 z-10 bg-olive text-paper text-[0.62rem] font-bold px-2.5 py-1">خصم</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* معلومات الزائر */}
      <section className="border-t border-paper/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid lg:grid-cols-2 gap-12">
          <div>
            <Reveal>
              <p className="font-display text-olive text-xl">دليل الزائر</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl mt-2">قبل الزيارة</h2>
            </Reveal>
            <div className="mt-8 [&_.acc-item]:border-paper/10 [&_button]:text-paper [&_.acc-answer]:text-sand/70">
              <FaqAccordion limit={4} dark />
            </div>
          </div>
          <Reveal delay={120} className="flex flex-col justify-end">
            <div className="border border-paper/12 p-7 md:p-9 bg-paper/[0.03]">
              <p className="font-display font-bold text-3xl">مكتب الاستقبال</p>
              <p className="mt-3 text-sm text-sand/70 leading-7">الطلب يتم كضيف، والدفع عند الاستلام. لأي استفسار — واتساب المتجر يرد خلال دقائق.</p>
              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm">
                <TLink dark href="#/contact"><span>تواصل معنا</span></TLink>
                <TLink dark href="#/cart"><span className="flex items-center gap-2">السلة <IBag className="w-4 h-4" /></span></TLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <ConceptBar index={12} name="Niches — المشكاوات" />
    </div>
  );
}
