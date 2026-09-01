import { IMG, fmtIQD } from "../lib/data";
import type { Product } from "../lib/data";
import { navigate, Reveal, useStore } from "../lib/state";
import { ContactBand, FaqAccordion, Footer, Header } from "../components/chrome";
import { ProductCard, ProductGrid, ProductRow } from "../components/product";
import { ConceptBar, Eyebrow, Price, SectionHead, SolidBtn, Swatches, TLink } from "../components/ui";
import { IArrow } from "../components/icons";

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
};

/* ================================================================== */
/*  CONCEPT 07 — Journal Index (دفتر المحتويات)                        */
/* ================================================================== */
export function Concept7() {
  const { products } = useStore();
  const best = products.filter((p) => p.isBest);
  const fresh = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.isOffer);
  const featured = products.find((p) => p.id === "rawda")!;

  const toc = [
    { n: "٠١", t: "المجموعة", id: "c7-collection" },
    { n: "٠٢", t: "الأكثر مبيعًا", id: "c7-best" },
    { n: "٠٣", t: "وصل حديثًا", id: "c7-new" },
    { n: "٠٤", t: "العروض", id: "c7-offers" },
    { n: "٠٥", t: "القطعة المختارة", id: "c7-featured" },
    { n: "٠٦", t: "أسئلة", id: "c7-faq" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — صفحة المحتويات */}
      <section className="hairline-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-end">
          <Reveal>
            <p className="text-[0.7rem] font-medium text-mute">مشكاة — دفتر الإضاءة · العدد ٠٤ · شتاء ٢٠٢٥</p>
            <h1 className="font-display font-bold text-6xl md:text-8xl leading-[1.05] mt-6">
              <span className="lm"><span>المحتويات</span></span>
            </h1>
            <div className="mt-10 divide-y divide-line hairline-t max-w-xl">
              {toc.map((s, i) => (
                <Reveal key={s.id} delay={i * 60}>
                  <button type="button" onClick={() => scrollToId(s.id)} className="group w-full flex items-center justify-between py-4 text-right cursor-pointer">
                    <span className="flex items-baseline gap-6">
                      <span className="font-display text-olive">{s.n}</span>
                      <span className="font-display font-bold text-2xl md:text-3xl group-hover:text-olive transition-colors">{s.t}</span>
                    </span>
                    <IArrow className="w-5 h-5 text-mute group-hover:text-olive group-hover:-translate-x-2 transition-all" />
                  </button>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <figure className="relative">
              <img src={IMG.glow} alt="دفء الكتان" className="w-full aspect-[4/5] object-cover" />
              <figcaption className="absolute bottom-4 right-4 bg-paper px-3 py-2 text-[0.65rem] font-medium">صورة الغلاف — نسيج الكتان</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ٠١ المجموعة — صفوف مرقمة مع صورة لاصقة */}
      <section id="c7-collection" className="scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.85fr_1.15fr] gap-12">
          <div className="lg:sticky lg:top-32 self-start">
            <Reveal>
              <span className="font-display font-bold text-8xl md:text-9xl text-sand select-none">٠١</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl mt-2 -mb-2">المجموعة</h2>
              <p className="mt-6 text-mute text-sm leading-7 max-w-xs">١٢ قطعة، ثلاث عائلات: مكتب، طاولة، وضوءٌ يُحمَل. تصفحها سطرًا سطرًا.</p>
              <div className="mt-8"><TLink href="#/products">المتجر الكامل</TLink></div>
            </Reveal>
          </div>
          <div className="divide-y divide-line hairline-t">
            {products.slice(0, 6).map((p, i) => (
              <ProductIndexRow key={p.id} p={p} n={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ٠٢ الأكثر مبيعًا */}
      <section id="c7-best" className="scroll-mt-28 bg-surface hairline-t hairline-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal className="flex items-baseline gap-6">
            <span className="font-display font-bold text-6xl md:text-7xl text-sand">٠٢</span>
            <div>
              <h2 className="font-display font-bold text-4xl md:text-5xl">الأكثر مبيعًا</h2>
              <p className="text-xs text-mute mt-2">ما اختاره العراقيون أكثر من غيره هذا الموسم.</p>
            </div>
          </Reveal>
          <div className="mt-12"><ProductRow items={best} /></div>
        </div>
      </section>

      {/* ٠٣ الجديد */}
      <section id="c7-new" className="scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal className="flex items-baseline gap-6">
            <span className="font-display font-bold text-6xl md:text-7xl text-sand">٠٣</span>
            <div>
              <h2 className="font-display font-bold text-4xl md:text-5xl">وصل حديثًا</h2>
              <p className="text-xs text-mute mt-2">أحدث ما دخل المخزن.</p>
            </div>
          </Reveal>
          <div className="mt-12"><ProductGrid items={fresh} /></div>
        </div>
      </section>

      {/* ٠٤ العروض — قائمة دفترية */}
      <section id="c7-offers" className="scroll-mt-28 bg-sand/30 hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal className="flex items-baseline gap-6">
            <span className="font-display font-bold text-6xl md:text-7xl text-sand">٠٤</span>
            <div>
              <h2 className="font-display font-bold text-4xl md:text-5xl">العروض</h2>
              <p className="text-xs text-mute mt-2">أسعار مخفّضة حتى نفاد الكمية.</p>
            </div>
          </Reveal>
          <div className="mt-10 max-w-3xl divide-y divide-line hairline-t">
            {offers.map((p) => (
              <Reveal key={p.id}>
                <a href={`#/product/${p.id}`} className="group flex items-center justify-between gap-6 py-6">
                  <span className="font-medium text-sm md:text-base group-hover:text-olive transition-colors">{p.name}</span>
                  <span className="flex items-baseline gap-3 shrink-0">
                    {p.oldPrice && <span className="text-xs text-mute line-through">{fmtIQD(p.oldPrice)}</span>}
                    <span className="font-display font-bold text-xl md:text-2xl text-olive">{fmtIQD(p.price)}</span>
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal><div className="py-6"><TLink href="#/products/offers">كل العروض في المتجر</TLink></div></Reveal>
          </div>
        </div>
      </section>

      {/* ٠٥ القطعة المختارة */}
      <section id="c7-featured" className="scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <img src={featured.img} alt={featured.name} className="w-full aspect-square object-cover" />
          </Reveal>
          <Reveal delay={120}>
            <span className="font-display font-bold text-7xl md:text-8xl text-sand">٠٥</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-1 -mb-1">{featured.name}</h2>
            <p className="mt-5 text-mute text-sm leading-7 max-w-md">{featured.desc}</p>
            <div className="mt-6 flex items-center gap-5">
              <Price price={featured.price} size="lg" />
              <Swatches colors={featured.colors} hex={featured.colorHex} size="sm" />
            </div>
            <div className="mt-8"><SolidBtn onClick={() => navigate(`/product/${featured.id}`)}>أضف إلى السلة</SolidBtn></div>
          </Reveal>
        </div>
      </section>

      {/* ٠٦ أسئلة */}
      <section id="c7-faq" className="scroll-mt-28 bg-surface hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal className="flex items-baseline gap-6">
            <span className="font-display font-bold text-6xl md:text-7xl text-sand">٠٦</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl">أسئلة</h2>
          </Reveal>
          <div className="mt-10 max-w-3xl"><FaqAccordion limit={4} /></div>
          <Reveal className="mt-6"><TLink href="#/faq">كل الأسئلة الشائعة</TLink></Reveal>
        </div>
      </section>

      <ContactBand />
      <Footer />
      <ConceptBar index={7} name="Journal Index" />
    </div>
  );
}

function ProductIndexRow({ p, n }: { p: Product; n: number }) {
  return (
    <Reveal>
      <a href={`#/product/${p.id}`} className="group flex items-center gap-5 py-5">
        <span className="font-display text-olive text-sm shrink-0">{String(n).padStart(2, "0")}</span>
        <img src={p.img} alt={p.name} className="w-16 h-16 md:w-20 md:h-20 object-cover shrink-0 transition-transform duration-500 group-hover:scale-105" />
        <span className="flex-1 min-w-0">
          <span className="block font-display font-bold text-lg md:text-2xl truncate group-hover:text-olive transition-colors">{p.name}</span>
          <span className="block text-[0.7rem] text-mute mt-1">{p.type} · {p.charging === "قابل للشحن" ? "بطارية" : "كهرباء"}</span>
        </span>
        <span className="text-sm font-medium shrink-0 hidden sm:block">{fmtIQD(p.price)}</span>
        <IArrow className="w-5 h-5 text-mute group-hover:text-olive group-hover:-translate-x-1.5 transition-all shrink-0" />
      </a>
    </Reveal>
  );
}

/* ================================================================== */
/*  CONCEPT 08 — Diptych (نصفان: بيان ثابت وصور تعبر)                   */
/* ================================================================== */
export function Concept8() {
  const { products } = useStore();
  const best = products.filter((p) => p.isBest);
  const fresh = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.isOffer);
  const featured = products.find((p) => p.id === "siraj")!;

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — ديptych: يمين ثابت / يسار يعبر */}
      <section className="hairline-b">
        <div className="grid lg:grid-cols-2">
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] flex flex-col justify-center px-4 md:px-8 lg:pe-14 py-14 lg:py-0 order-2 lg:order-1">
            <Reveal>
              <Eyebrow>مشكاة — ضوءٌ للبقاء</Eyebrow>
              <h1 className="font-display font-bold text-5xl md:text-6xl xl:text-7xl leading-[1.15] mt-6">
                <span className="lm"><span>الضوء الذي</span></span>
                <span className="lm" style={{ ["--rv-delay" as never]: "140ms" }}><span>تشتريه مرة،</span></span>
                <span className="lm" style={{ ["--rv-delay" as never]: "280ms" }}><span className="text-olive">وتعيش معه طويلًا.</span></span>
              </h1>
              <p className="mt-6 text-mute text-sm leading-7 max-w-sm">مصابيح مكتب وطاولة مختارة — توصيل لكل محافظات العراق ودفع عند الاستلام.</p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <SolidBtn onClick={() => navigate("/products")}>تسوّق المجموعة</SolidBtn>
                <TLink href="#/compare">قارن أولًا</TLink>
              </div>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2">
            {[
              { src: IMG.hero, cap: "مكتب — ضوء العصر" },
              { src: IMG.desk, cap: "قراءة — ضوء المساء" },
              { src: IMG.living, cap: "معيشة — ضوء السهرة" },
            ].map((img, i) => (
              <figure key={img.src} className="relative overflow-hidden">
                <img src={img.src} alt={img.cap} loading={i === 0 ? "eager" : "lazy"} className="kenburns w-full h-[52vh] lg:h-[72vh] object-cover" />
                <figcaption className="absolute bottom-4 right-4 bg-ink/60 text-paper text-[0.65rem] px-3 py-1.5 backdrop-blur-sm">{img.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* شرائح الفئات */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 md:pt-16">
        <Reveal className="flex flex-wrap gap-3">
          {[
            ["كل المصابيح", "#/products"],
            ["مكتبي", "#/products/desk"],
            ["طاولة", "#/products/table"],
            ["قابل للشحن", "#/products/rechargeable"],
            ["جديد", "#/products/new"],
            ["الأكثر مبيعًا", "#/products/best"],
            ["العروض", "#/products/offers"],
          ].map(([label, to]) => (
            <a key={label} href={to} className="border border-line bg-surface px-5 py-2.5 text-xs font-medium hover:bg-ink hover:text-paper hover:border-ink transition-colors duration-300">
              {label}
            </a>
          ))}
        </Reveal>
      </section>

      {/* الأكثر مبيعًا */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <Reveal><SectionHead eyebrow="النصف الأول" title="الأكثر مبيعًا" link={<TLink href="#/products/best">الكل</TLink>} /></Reveal>
        <div className="mt-12"><ProductGrid items={best} /></div>
      </section>

      {/* الجديد — تمرير */}
      <section className="bg-surface hairline-t hairline-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <Reveal><SectionHead eyebrow="النصف الثاني" title="وصل حديثًا" link={<TLink href="#/products/new">الكل</TLink>} /></Reveal>
          <div className="mt-12"><ProductRow items={fresh} /></div>
        </div>
      </section>

      {/* العروض — شريط داكن */}
      <section className="bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow dark>وفّر</Eyebrow>
                <h2 className="font-display font-bold text-4xl md:text-5xl mt-4">عروض مشكاة</h2>
              </div>
              <TLink dark href="#/products/offers">كل العروض</TLink>
            </div>
          </Reveal>
          <div className="mt-12"><ProductRow items={offers} dark /></div>
        </div>
      </section>

      {/* قطعة مميزة */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Eyebrow>قطعة نحبها</Eyebrow>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-5">{featured.name}</h2>
          <p className="mt-5 text-mute text-sm leading-7 max-w-md">{featured.desc}</p>
          <div className="mt-6"><Price price={featured.price} size="lg" /></div>
          <div className="mt-8 flex flex-wrap gap-6 items-center">
            <SolidBtn onClick={() => navigate(`/product/${featured.id}`)}>أضف إلى السلة</SolidBtn>
            <TLink href={`#/product/${featured.id}`}>التفاصيل</TLink>
          </div>
        </Reveal>
        <Reveal delay={120}><img src={featured.img} alt={featured.name} className="w-full aspect-square object-cover" /></Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-4">
        <Reveal><SectionHead eyebrow="معلومات" title="أسئلة شائعة" link={<TLink href="#/faq">الكل</TLink>} /></Reveal>
        <div className="mt-8"><FaqAccordion limit={3} /></div>
      </section>

      <ContactBand />
      <Footer />
      <ConceptBar index={8} name="Diptych" />
    </div>
  );
}
