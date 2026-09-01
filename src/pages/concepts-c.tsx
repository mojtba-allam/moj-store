import { useState } from "react";
import { IMG, fmtIQD } from "../lib/data";
import { navigate, Reveal, useStore } from "../lib/state";
import { ContactBand, FaqAccordion, Footer, Header } from "../components/chrome";
import { ProductCard, ProductRow } from "../components/product";
import { ConceptBar, Eyebrow, Price, SectionHead, SolidBtn, TLink } from "../components/ui";
import { IArrow } from "../components/icons";

/* ================================================================== */
/*  CONCEPT 05 — Night Atelier (افتتاحية ليلية)                        */
/* ================================================================== */
export function Concept5() {
  const { products } = useStore();
  const rechargeable = products.filter((p) => p.charging === "قابل للشحن");
  const best = products.filter((p) => p.isBest);
  const offers = products.filter((p) => p.isOffer);
  const qamar = products.find((p) => p.id === "qamar")!;

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — ليل: صورة تتوهج ونص ورقي */}
      <section className="bg-ink text-paper overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-8 px-4 md:px-8 py-14 lg:py-0">
          <Reveal className="order-2 lg:order-1 py-10 lg:py-24">
            <p className="text-[0.7rem] font-medium text-olive">مجموعة المساء</p>
            <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.25] mt-6">
              <span className="lm"><span>حين يُطفأ كل شيء،</span></span>
              <span className="lm" style={{ ["--rv-delay" as never]: "150ms" }}><span className="text-sand">يبقى ضوءك أنت.</span></span>
            </h1>
            <p className="mt-6 text-sand/70 text-sm leading-7 max-w-sm">مصابيح دافئة للساعات الأخيرة من اليوم — حيث تُقرأ الكتب وتهدأ الأفكار.</p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <TLink dark href="#/products">اكتشف مجموعة المساء</TLink>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2 relative">
            <span className="glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full bg-[#E8B861]/25 blur-3xl" aria-hidden />
            <img src={IMG.desk} alt="مصباح نمرة في مساء هادئ" className="relative w-full h-[320px] md:h-[440px] lg:h-[560px] object-cover object-center" />
          </div>
        </div>

        {/* شريط متحرك بأسماء القطع */}
        <div className="hairline-t border-paper/10 py-4 overflow-hidden" dir="ltr">
          <div className="marquee-track">
            {[...products, ...products].map((p, i) => (
              <span key={`${p.id}-${i}`} className="flex items-center gap-6 px-6 text-sand/60 text-xs font-medium whitespace-nowrap">
                {p.name} <span className="w-1 h-1 rounded-full bg-olive inline-block" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* مصابيح المساء — بطاقات داكنة */}
      <section className="bg-ink text-paper pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal><SectionHead dark num="٠١" eyebrow="دفء فوري" title="مصابيح المساء" link={<TLink dark href="#/products/best">عرض الكل</TLink>} /></Reveal>
          <div className="mt-12"><ProductRow items={best} dark /></div>
        </div>
      </section>

      {/* القابلة للشحن — عمودان، نص لاصق */}
      <section className="hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12">
          <div className="lg:sticky lg:top-32 self-start">
            <Reveal>
              <Eyebrow num="٠٢">بلا أسلاك</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-5xl mt-5 leading-[1.25]">ضوء يتبعك<br />من غرفة إلى غرفة.</h2>
              <p className="mt-6 text-mute text-sm leading-7 max-w-sm">مصابيح قابلة للشحن عبر USB-C، تصمد يومًا كاملًا بعيدًا عن المقبس.</p>
              <div className="mt-8"><TLink href="#/products/rechargeable">كل القابلة للشحن</TLink></div>
            </Reveal>
          </div>
          <div className="space-y-10">
            {rechargeable.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}><ProductCard p={p} index={i} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* أرقام بخط كبير */}
      <section className="hairline-t bg-sand/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[["١٨", "محافظة نوصل إليها"], ["١٢", "قطعة مختارة بعناية"], ["٤٨", "ساعة — أقصى توصيل"], ["١٠٠٪", "دفع عند الاستلام"]].map(([n, d], i) => (
            <Reveal key={d} delay={i * 80} className="text-center md:text-right">
              <span className="font-display font-bold text-5xl md:text-6xl text-ink block">{n}</span>
              <span className="block text-xs text-mute mt-3">{d}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* قمر — قطعة الليل */}
      <section className="hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal><img src={qamar.img} alt={qamar.name} className="w-full aspect-square object-cover" /></Reveal>
          <Reveal delay={120}>
            <Eyebrow num="٠٣">قطعة الليل</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-5">{qamar.name}</h2>
            <p className="mt-5 text-mute text-sm leading-7 max-w-md">{qamar.desc}</p>
            <div className="mt-6"><Price price={qamar.price} size="lg" /></div>
            <div className="mt-8 flex flex-wrap gap-6 items-center">
              <SolidBtn onClick={() => navigate(`/product/${qamar.id}`)}>أضف إلى السلة</SolidBtn>
              <TLink href={`#/product/${qamar.id}`}>التفاصيل</TLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* عروض */}
      <section className="bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal><SectionHead dark num="٠٤" eyebrow="أسعار الليل" title="عروض الآن" link={<TLink dark href="#/products/offers">الكل</TLink>} /></Reveal>
          <div className="mt-12"><ProductRow items={offers} dark /></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <Reveal><SectionHead num="٠٥" eyebrow="نجيب ليلًا ونهارًا" title="أسئلة شائعة" /></Reveal>
        <div className="mt-8"><FaqAccordion limit={3} /></div>
      </section>

      <ContactBand dark />
      <Footer />
      <ConceptBar index={5} name="Night Atelier" />
    </div>
  );
}

/* ================================================================== */
/*  CONCEPT 06 — Type Driven (الطباعة تقود)                             */
/* ================================================================== */
export function Concept6() {
  const { products } = useStore();
  const best = products.filter((p) => p.isBest);
  const fresh = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.isOffer);
  const [hoverId, setHoverId] = useState(products[0].id);
  const hoverP = products.find((p) => p.id === hoverId) ?? products[0];

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — كلمة عملاقة تحتضن صورة */}
      <section className="hairline-b relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 md:pt-16 pb-10">
          <div className="flex items-center justify-between text-[0.68rem] text-mute">
            <span>متجر الإضاءة — العراق</span>
            <span>مجموعة ٢٠٢٥</span>
          </div>
          <Reveal className="mt-4">
            <h1 className="font-display font-bold leading-[0.95] text-ink select-none">
              <span className="lm"><span className="block text-[6.5rem] md:text-[13rem] lg:text-[17rem]">ضَوء</span></span>
            </h1>
          </Reveal>
          <div className="relative -mt-[3.2rem] md:-mt-[6rem] flex items-end justify-between gap-6">
            <Reveal delay={200} className="w-28 md:w-52 shrink-0">
              <img src={IMG.qamar} alt="قمر — مصباح محمول" className="w-full aspect-square object-cover border-4 border-paper" />
            </Reveal>
            <Reveal delay={300} className="text-left pb-2 md:pb-4 max-w-xs">
              <p className="text-sm md:text-base text-mute leading-7">حرفٌ واحد يكفي. مصابيح مختارة لبيوت العراق ومكاتبه — تصلك حتى الباب.</p>
              <div className="mt-4"><TLink href="#/products">ابدأ التسوق</TLink></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* فهرس القطع — تحويم يعرض الصورة */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-[1fr_0.8fr] gap-12">
        <Reveal>
          <SectionHead eyebrow="الفهرس" title="القطع كلها، سطرًا سطرًا" />
          <div className="mt-8 divide-y divide-line hairline-t">
            {products.slice(0, 7).map((p, i) => (
              <a
                key={p.id}
                href={`#/product/${p.id}`}
                onMouseEnter={() => setHoverId(p.id)}
                onFocus={() => setHoverId(p.id)}
                className="group flex items-center justify-between gap-4 py-5"
              >
                <span className="flex items-baseline gap-5 min-w-0">
                  <span className="font-display text-sm text-olive shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display font-bold text-xl md:text-3xl truncate group-hover:text-olive transition-colors">{p.name}</span>
                </span>
                <span className="text-xs text-mute shrink-0 hidden sm:block">{fmtIQD(p.price)}</span>
                <IArrow className="w-5 h-5 text-mute group-hover:text-olive group-hover:-translate-x-1.5 transition-all shrink-0" />
              </a>
            ))}
          </div>
        </Reveal>
        <div className="hidden lg:block">
          <div className="sticky top-32">
            <div key={hoverId} className="toast-in overflow-hidden">
              <img src={hoverP.img} alt={hoverP.name} className="w-full aspect-square object-cover" />
              <div className="flex items-center justify-between pt-4">
                <span className="text-sm font-medium">{hoverP.name}</span>
                <Price price={hoverP.price} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* شريط بطاقات متحرك */}
      <section className="hairline-t bg-surface overflow-hidden py-14">
        <Reveal className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
          <SectionHead eyebrow="يتحرك أمامك" title="الأكثر طلبًا" />
        </Reveal>
        <div dir="ltr" className="overflow-hidden">
          <div className="marquee-track gap-8 px-8">
            {[...best, ...fresh].map((p, i) => (
              <div key={`${p.id}-${i}`} className="min-w-[250px] max-w-[250px]">
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* صفوف متبادلة كبيرة */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 space-y-16 md:space-y-24">
        {[
          { img: IMG.hero, t: "لمكتبٍ يركّز", d: "إضاءة مهمة مريحة للعين في ساعات العمل الطويلة.", to: "#/products/desk" },
          { img: IMG.living, t: "لبيتٍ يدفأ", d: "مصابيح طاولة تحوّل الزاوية المهملة إلى مكانك المفضل.", to: "#/products/table" },
        ].map((row, i) => (
          <Reveal key={row.t} className={`grid lg:grid-cols-2 gap-8 md:gap-14 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <a href={row.to} className="block overflow-hidden">
              <img src={row.img} alt={row.t} className="pcard-img w-full aspect-[16/11] object-cover" />
            </a>
            <div>
              <span className="font-display text-olive text-lg">0{i + 1}</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl mt-3">{row.t}</h2>
              <p className="mt-4 text-mute text-sm leading-7 max-w-sm">{row.d}</p>
              <div className="mt-6"><TLink href={row.to}>تسوّق القسم</TLink></div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* العروض — لعبة أسعار مطبعية */}
      <section className="hairline-t bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal><SectionHead dark eyebrow="خطّ أحمر على السعر" title="عروض مشكاة" /></Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-x-10 gap-y-8">
            {offers.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <a href={`#/product/${p.id}`} className="group block">
                  <img src={p.img} alt={p.name} className="w-full aspect-square object-cover" />
                  <div className="pt-4 flex items-end justify-between gap-3">
                    <span className="font-medium text-sm group-hover:text-olive transition-colors">{p.name}</span>
                    <span className="text-left">
                      {p.oldPrice && <span className="block font-display text-xl text-paper/35 line-through decoration-olive decoration-2">{fmtIQD(p.oldPrice)}</span>}
                      <span className="block font-display font-bold text-2xl text-olive">{fmtIQD(p.price)}</span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* بيان */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
        <Reveal>
          <p className="font-display font-bold text-3xl md:text-5xl leading-[1.5]">
            نبيع <span className="text-olive">مصباحًا</span> واحدًا جيدًا،<br />لا عشرةً عابرة.
          </p>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal><SectionHead eyebrow="معلومات" title="أسئلة شائعة" link={<TLink href="#/faq">الكل</TLink>} /></Reveal>
        <div className="mt-8"><FaqAccordion limit={3} /></div>
      </section>

      <ContactBand />
      <Footer />
      <ConceptBar index={6} name="Type Driven" />
    </div>
  );
}
