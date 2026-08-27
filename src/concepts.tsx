import { IMG, fmt } from "./data";
import { useStore } from "./store";
import { Eyebrow, IcArrow, Reveal, SectionHead, Accordion } from "./ui";
import {
  BrandStatement, CardGrid, CategorySection, CompareTeaser, ContactStrip,
  EditorialRow, FaqPreview, FeaturedSplit, LifestyleGrid, OffersBand, TrustRow,
} from "./sections";
import { FAQS } from "./data";

const wrap = "max-w-[1440px] mx-auto px-5 md:px-8";
const sec = "py-16 md:py-24";

/* ================================================================
   CONCEPT 01 — Editorial Premium
   ================================================================ */
export function Concept1() {
  const { products } = useStore();
  const best = products.filter((p) => p.isBestSeller);
  const fresh = products.filter((p) => p.isNew);
  const ofoq = products.find((p) => p.id === "ofoq")!;

  return (
    <>
      {/* HERO — انقسام غير متماثل */}
      <section className="hairline-b">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12">
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center px-5 md:px-10 xl:px-14 py-14 lg:py-24 order-2 lg:order-1">
            <Reveal>
              <Eyebrow>إضاءة تصنع الفرق</Eyebrow>
              <h1 className="font-display font-bold text-[2.9rem] md:text-6xl xl:text-[4.2rem] leading-[1.25] mt-6 text-ink">
                ضوء يكمّل
                <span className="block text-olive">مساحتك</span>
              </h1>
              <p className="text-mute font-bold text-sm md:text-base mt-6 max-w-sm leading-7">
                مصابيح مكتب وطاولة مختارة بعناية — تدفئ المكان وتكمل شغلك وقراءتك.
              </p>
              <a href="#/products" className="tl mt-10 text-base font-extrabold text-ink">
                اكتشف المجموعة
                <IcArrow className="w-5 h-5 text-olive" />
              </a>
              <p className="text-[0.66rem] font-bold text-mute mt-12 num">الدفع عند الاستلام · ضمان حتى 3 سنوات · 2–5 أيام توصيل</p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 xl:col-span-8 relative order-1 lg:order-2 min-h-[46vh] lg:min-h-[86vh]">
            <div className="absolute inset-0 overflow-hidden">
              <img src={IMG.hero} alt="مصباح هالة على مكتب وقت الغروب" className="kb w-full h-full object-cover" />
            </div>
            <span className="absolute bottom-4 right-6 md:bottom-8 md:right-10 font-display font-bold text-paper/95 text-6xl md:text-8xl leading-none select-none pointer-events-none">
              مشكاة
            </span>
            <span className="absolute top-6 left-6 text-[0.62rem] font-bold text-paper/85 bg-ink/35 px-3 py-1.5">
              مجموعة خريف ٢٠٢٥
            </span>
          </div>
        </div>
      </section>

      {/* 01 — Lifestyle */}
      <section className={`${wrap} ${sec}`}>
        <SectionHead n="٠١" title="في مكان الضوء" />
        <LifestyleGrid variant={1} />
      </section>

      {/* 02 — الأكثر مبيعًا */}
      <section className={`${wrap} ${sec} pt-0 md:pt-0`}>
        <SectionHead n="٠٢" title="الأكثر مبيعًا" action="عرض الكل" actionHref="/products/best" />
        <EditorialRow items={best} />
      </section>

      {/* 03 — جديد */}
      <section className="bg-sand/30">
        <div className={`${wrap} ${sec}`}>
          <SectionHead n="٠٣" title="وصل حديثًا" action="عرض الكل" actionHref="/products/new" />
          <EditorialRow items={fresh} startNo={5} />
        </div>
      </section>

      {/* 04 — قطعة تحريرية */}
      <section className={`${wrap} ${sec}`}>
        <SectionHead n="٠٤" title="قطعة نحبها" />
        <FeaturedSplit p={ofoq} />
      </section>

      {/* 05 — الفئات */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <SectionHead n="٠٥" title="تسوق حسب الحاجة" />
        <CategorySection variant="rows" />
      </section>

      {/* 06 — العروض */}
      <OffersBand variant="sand" />

      {/* 07 — بيان */}
      <section className={`${wrap} ${sec}`}>
        <BrandStatement />
      </section>

      {/* 08 — أسئلة */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <FaqPreview />
      </section>

      <TrustRow />
      <ContactStrip />
    </>
  );
}

/* ================================================================
   CONCEPT 02 — Product First
   ================================================================ */
export function Concept2() {
  const { products, addToCart } = useStore();
  const heroP = products.find((p) => p.id === "hala")!;
  const best = products.filter((p) => p.isBestSeller);
  const fresh = products.filter((p) => p.isNew);
  const anbar = products.find((p) => p.id === "anbar")!;

  return (
    <>
      {/* HERO — المنتج هو البطل */}
      <section className="hairline-b overflow-hidden relative">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none" aria-hidden>
          <div className="drift flex whitespace-nowrap font-display font-bold text-[16vw] leading-none text-ink/[0.045] w-max">
            <span className="px-8">هالة ٠١ — هالة ٠١ — هالة ٠١ —</span>
            <span className="px-8">هالة ٠١ — هالة ٠١ — هالة ٠١ —</span>
          </div>
        </div>
        <div className={`${wrap} relative grid lg:grid-cols-2 items-center gap-10 py-14 md:py-20`}>
          <Reveal className="order-2 lg:order-1 flex flex-col items-start">
            <Eyebrow>مصباح الأسبوع</Eyebrow>
            <h1 className="font-display font-bold text-6xl md:text-7xl xl:text-8xl leading-[1.2] mt-5 text-ink">هالة ٠١</h1>
            <p className="text-mute font-bold text-sm md:text-base mt-4 max-w-xs leading-7">قبة معدنية بلمسة إطفاء تدريجي — ضوء 2700K يهدّئ نهاية اليوم.</p>
            <div className="flex items-baseline gap-4 mt-8">
              <span className="num text-3xl font-extrabold">{fmt(heroP.price)}</span>
              {heroP.oldPrice && <span className="num text-mute line-through font-bold">{fmt(heroP.oldPrice)}</span>}
            </div>
            <div className="flex items-center gap-6 mt-8">
              <button
                onClick={() => addToCart(heroP, heroP.colors[0].name, heroP.sizes[0], 1)}
                className="bg-ink text-paper text-[0.78rem] font-bold px-9 h-13 py-4 hover:bg-olive transition-colors"
              >
                أضف إلى السلة
              </button>
              <a href={`#/product/${heroP.id}`} className="tl text-sm font-bold text-ink">التفاصيل</a>
            </div>
            <ul className="mt-10 hairline-t w-full max-w-xs text-[0.72rem] font-bold">
              {[["الإضاءة", "800 لومن · 2700K"], ["الخامة", "معدن مطلي بودرة"], ["الضمان", "سنتان"]].map(([k, v]) => (
                <li key={k} className="hairline-b flex justify-between py-2.5">
                  <span className="text-mute">{k}</span><span className="text-ink">{v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <a href={`#/product/${heroP.id}`} className="imgz block aspect-square max-w-[620px] mx-auto bg-[#f1eee6] border border-line/70">
              <img src={heroP.image} alt="هالة ٠١" className="w-full h-full object-cover" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* الأكثر مبيعًا */}
      <section className={`${wrap} ${sec}`}>
        <SectionHead n="٠١" title="الأكثر مبيعًا" action="عرض الكل" actionHref="/products/best" />
        <CardGrid items={best} />
      </section>

      {/* جديد */}
      <section className="bg-sand/30">
        <div className={`${wrap} ${sec}`}>
          <SectionHead n="٠٢" title="وصل حديثًا" action="عرض الكل" actionHref="/products/new" />
          <CardGrid items={fresh} />
        </div>
      </section>

      {/* تسوق حسب النوع */}
      <section className={`${wrap} ${sec}`}>
        <SectionHead n="٠٣" title="تسوق حسب النوع" />
        <CategorySection variant="rows" />
      </section>

      {/* منتج مميز */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <SectionHead n="٠٤" title="قطعة مميزة" />
        <FeaturedSplit p={anbar} />
      </section>

      {/* مقارنة */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <CompareTeaser />
      </section>

      <OffersBand variant="ink" />

      {/* Lifestyle */}
      <section className={`${wrap} ${sec}`}>
        <SectionHead n="٠٥" title="ضوء في مكانه" />
        <LifestyleGrid variant={2} />
      </section>

      <section className={`${wrap} pb-16 md:pb-24`}>
        <SectionHead n="٠٦" title="أسئلة تتكرر" action="كل الأسئلة" actionHref="/faq" />
        <Reveal><Accordion items={FAQS.slice(0, 4)} /></Reveal>
      </section>

      <TrustRow />
      <ContactStrip />
    </>
  );
}

/* ================================================================
   CONCEPT 03 — Modern Gallery
   ================================================================ */
export function Concept3() {
  const { products } = useStore();
  const best = products.filter((p) => p.isBestSeller);
  const fresh = products.filter((p) => p.isNew).slice(0, 4);
  const anbar = products.find((p) => p.id === "anbar")!;

  return (
    <>
      {/* HERO — صورة كاملة */}
      <section className="relative h-[68vh] md:h-[82vh] overflow-hidden">
        <img src={IMG.hero} alt="معرض الضوء" className="kb absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className={`${wrap} pb-10 md:pb-16 text-paper`}>
            <Reveal>
              <p className="text-[0.68rem] font-bold text-paper/80">معرض مشكاة — المجموعة الثامنة</p>
              <h1 className="font-display font-bold text-5xl md:text-7xl xl:text-8xl leading-[1.2] mt-4 max-w-3xl">
                الضوء،
                <span className="text-sand"> معلّقًا</span> بين الجدران
              </h1>
              <a href="#/products" className="tl mt-8 text-sm md:text-base font-extrabold text-paper">
                ادخل المعرض
                <IcArrow className="w-5 h-5" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={`${wrap} ${sec}`}>
        <SectionHead n="٠١" title="من المعرض" />
        <LifestyleGrid variant={3} />
      </section>

      {/* استكشف */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <SectionHead n="٠٢" title="استكشف المجموعة" />
        <CategorySection variant="rows" />
      </section>

      {/* الأكثر مبيعًا */}
      <section className="bg-sand/30">
        <div className={`${wrap} ${sec}`}>
          <SectionHead n="٠٣" title="الأكثر مبيعًا" action="عرض الكل" actionHref="/products/best" />
          <EditorialRow items={best} />
        </div>
      </section>

      {/* جديد */}
      <section className={`${wrap} ${sec}`}>
        <SectionHead n="٠٤" title="وصل حديثًا" action="عرض الكل" actionHref="/products/new" />
        <CardGrid items={fresh} />
      </section>

      {/* صورة تحريرية كبيرة */}
      <section className="relative overflow-hidden">
        <div className="aspect-[16/7] md:aspect-[21/8]">
          <img src={IMG.life} alt="ركنة المعيشة" className="kb w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 grid place-items-center bg-ink/25">
          <Reveal className="text-center text-paper px-6">
            <p className="font-display font-bold text-3xl md:text-6xl leading-[1.4]">«البيت يبدأ حين يُضاء»</p>
            <p className="text-[0.7rem] font-bold text-paper/80 mt-4">ركنة المعيشة — نفحة، تصوير ٢٠٢٥</p>
          </Reveal>
        </div>
      </section>

      <OffersBand variant="sand" />

      <section className={`${wrap} ${sec}`}>
        <SectionHead n="٠٥" title="قطعة المعرض" />
        <FeaturedSplit p={anbar} flip />
      </section>

      <section className={`${wrap} pb-16 md:pb-24`}>
        <FaqPreview />
      </section>

      <ContactStrip />
    </>
  );
}

/* ================================================================
   CONCEPT 04 — Modern Commerce
   ================================================================ */
export function Concept4() {
  const { products } = useStore();
  const best = products.filter((p) => p.isBestSeller);
  const fresh = products.filter((p) => p.isNew);
  const ghosn = products.find((p) => p.id === "ghosn")!;

  return (
    <>
      {/* HERO — Split واضح للتسوق */}
      <section className="hairline-b grid lg:grid-cols-12">
        <div className="lg:col-span-7 order-1 relative min-h-[44vh] lg:min-h-[78vh]">
          <div className="absolute inset-0 overflow-hidden">
            <img src={IMG.life} alt="ركنة مضاءة بمصباح مشكاة" className="kb w-full h-full object-cover" />
          </div>
          <span className="absolute top-6 right-6 bg-paper text-ink text-[0.62rem] font-bold px-3 py-1.5">مجموعة ٢٠٢٥ متاحة الآن</span>
        </div>
        <div className="lg:col-span-5 order-2 bg-sand/40 flex flex-col justify-center px-5 md:px-12 xl:px-16 py-14 lg:py-20">
          <Reveal>
            <Eyebrow>متجر متخصص في الإضاءة</Eyebrow>
            <h1 className="font-display font-bold text-4xl md:text-5xl xl:text-6xl leading-[1.3] mt-5 text-ink">
              الضوء المناسب
              <span className="block">لكل مكتب وركنة</span>
            </h1>
            <p className="text-mute font-bold text-sm md:text-base mt-5 max-w-sm leading-7">
              8 موديلات مختارة، قابلة للشحن أو بالكهرباء — توصيل لكل المحافظات ودفع عند الاستلام.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-9">
              <a href="#/products" className="bg-ink text-paper text-[0.78rem] font-bold px-9 h-12 grid place-items-center hover:bg-olive transition-colors">
                تسوق الآن
              </a>
              <a href="#/products/best" className="tl text-sm font-bold text-ink">الأكثر مبيعًا</a>
            </div>
            <div className="mt-12 hairline-t grid grid-cols-3 divide-x divide-line text-center">
              {[["8", "موديلات"], ["18", "محافظة نغطيها"], ["3 س", "ضمان أقصى"]].map(([n, l]) => (
                <div key={l} className="py-5 px-2">
                  <p className="num font-display font-bold text-2xl text-ink">{n}</p>
                  <p className="text-[0.62rem] font-bold text-mute mt-1">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* الفئات */}
      <section className={`${wrap} ${sec}`}>
        <SectionHead n="٠١" title="تسوق حسب الفئة" />
        <CategorySection variant="tiles" />
      </section>

      {/* الأكثر مبيعًا */}
      <section className="bg-sand/30">
        <div className={`${wrap} ${sec}`}>
          <SectionHead n="٠٢" title="الأكثر مبيعًا" action="عرض الكل" actionHref="/products/best" />
          <CardGrid items={best} />
        </div>
      </section>

      {/* جديد */}
      <section className={`${wrap} ${sec}`}>
        <SectionHead n="٠٣" title="وصل حديثًا" action="عرض الكل" actionHref="/products/new" />
        <CardGrid items={fresh} />
      </section>

      {/* العروض + كوبونات */}
      <section className="bg-ink text-paper">
        <div className={`${wrap} py-14 md:py-20 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center`}>
          <Reveal>
            <Eyebrow>عروض الأسبوع</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-[1.25] mt-4">خصم 15٪ على كل الطلبات</h2>
            <p className="text-paper/70 font-bold text-sm mt-3">وفوقها 5,000 د.ع إضافية للطلبات فوق 50,000 د.ع — الدفع عند الاستلام.</p>
            <a href="#/products/offers" className="tl mt-8 text-sm font-extrabold text-paper">تصفح العروض<IcArrow className="w-4 h-4" /></a>
          </Reveal>
          <Reveal delay={120} className="grid gap-3">
            {[["DAW15", "خصم 15٪ — بلا حد أدنى"], ["NURO5000", "خصم 5,000 د.ع — للطلبات فوق 50,000 د.ع"]].map(([c, d]) => (
              <div key={c} className="flex items-center justify-between border border-paper/25 px-5 py-4 hover:border-olive transition-colors">
                <span className="num font-extrabold tracking-[0.18em]" dir="ltr">{c}</span>
                <span className="text-[0.68rem] font-bold text-paper/70">{d}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* قطعة مميزة */}
      <section className={`${wrap} ${sec}`}>
        <SectionHead n="٠٤" title="قطعة مميزة" />
        <FeaturedSplit p={ghosn} />
      </section>

      {/* مقارنة */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <CompareTeaser />
      </section>

      {/* Lifestyle */}
      <section className="hairline-y">
        <div className={`${wrap} py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center`}>
          <Reveal className="imgz aspect-[4/3]">
            <img src={IMG.hero} alt="مكتب مضاء بهالة ٠١" className="w-full h-full object-cover" />
          </Reveal>
          <Reveal delay={100}>
            <Eyebrow>لماذا مشكاة</Eyebrow>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-[1.3] mt-4 text-ink">نختار القطعة كما نختارها لبيوتنا</h2>
            <ul className="mt-8 space-y-4 text-sm font-bold text-mute">
              {["كل مصباح مجرّب في إضاءة حقيقية قبل عرضه", "خامات تعيش: معدن، سيراميك، خشب، زجاج", "استبدال خلال 14 يوم بدون أسئلة"].map((t) => (
                <li key={t} className="flex gap-3 items-start"><span className="w-5 h-px bg-olive mt-3 shrink-0" />{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={`${wrap} ${sec}`}>
        <FaqPreview />
      </section>

      <TrustRow />
      <ContactStrip />
    </>
  );
}
