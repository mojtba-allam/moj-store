import { useState } from "react";
import { IMG, fmtIQD } from "../lib/data";
import { navigate, Reveal, useStore } from "../lib/state";
import { ContactBand, FaqAccordion, Footer, Header } from "../components/chrome";
import { ProductCard, ProductGrid, ProductRow } from "../components/product";
import { ConceptBar, Eyebrow, Price, SectionHead, SolidBtn, Swatches, TLink } from "../components/ui";
import { IArrow } from "../components/icons";

/* ================================================================== */
/*  CONCEPT 01 — Editorial Premium (مجلة تصميم)                        */
/* ================================================================== */
export function Concept1() {
  const { products } = useStore();
  const best = products.filter((p) => p.isBest);
  const fresh = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.isOffer);
  const featured = products.find((p) => p.id === "ward")!;

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — انقسام غير متماثل: نص يمين / صورة يسار */}
      <section className="hairline-b">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12">
          <Reveal className="lg:col-span-5 flex flex-col justify-center px-4 md:px-8 lg:pr-8 lg:pl-14 py-16 lg:py-24 order-2 lg:order-1">
            <Eyebrow num="٠١">إضاءة تصنع الفرق</Eyebrow>
            <h1 className="font-display font-bold text-[3rem] md:text-6xl lg:text-[4.2rem] leading-[1.12] mt-6 text-ink">
              <span className="lm"><span>ضوءٌ يكمّل</span></span>
              <span className="lm" style={{ ["--rv-delay" as never]: "150ms" }}><span>مساحتك</span></span>
            </h1>
            <p className="mt-6 text-mute text-sm md:text-base leading-7 max-w-sm">
              مصابيح مكتب وطاولة مختارة بعناية — لبيوت العراق ومكاتبه.
            </p>
            <div className="mt-10">
              <TLink href="#/products">اكتشف المجموعة</TLink>
            </div>
            <div className="mt-16 flex items-center gap-8 text-[0.7rem] text-mute">
              <span>بغداد — أربيل — البصرة</span>
              <span className="w-8 h-px bg-line" />
              <span>الدفع عند الاستلام</span>
            </div>
          </Reveal>

          <div className="lg:col-span-7 order-1 lg:order-2 relative overflow-hidden">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] lg:min-h-[620px] overflow-hidden">
              <img src={IMG.hero} alt="مصباح لونا على مكتب في ضوء الغروب" className="kenburns w-full h-full object-cover" />
            </div>
            <span className="hidden lg:block absolute bottom-8 left-10 font-display font-bold text-[9rem] leading-none text-paper/90 select-none">ضوء</span>
            <span className="absolute top-6 right-6 bg-paper text-ink text-[0.65rem] font-semibold px-3 py-1.5">مجموعة شتاء 2025</span>
          </div>
        </div>
      </section>

      {/* شبكة لايف ستايل */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal>
          <SectionHead num="٠٢" eyebrow="حيث يعيش الضوء" title="مشاهد من أماكن حقيقية" link={<TLink href="#/products">عرض الكل</TLink>} />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <Reveal className="col-span-2 md:col-span-1 md:row-span-2">
            <figure className="group relative h-full overflow-hidden">
              <img src={IMG.living} alt="زاوية معيشة بمصباح ورد" className="kenburns w-full h-full object-cover aspect-[3/4] md:aspect-auto md:min-h-full" />
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/70 to-transparent text-paper text-xs p-4">زاوية المعيشة — ورد الكهرماني</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={100}>
            <figure className="group relative overflow-hidden">
              <img src={IMG.desk} alt="مكتب قراءة بمصباح نمرة" className="pcard-img w-full object-cover aspect-[4/3]" />
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/70 to-transparent text-paper text-xs p-4">مكتب القراءة — نمرة الزيتوني</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={200}>
            <figure className="group relative overflow-hidden">
              <img src={IMG.glow} alt="تفاصيل ضوء دافئ" className="pcard-img w-full object-cover aspect-[4/3]" />
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/70 to-transparent text-paper text-xs p-4">تفاصيل — نسيج الكتان</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* الأكثر مبيعًا */}
      <section className="hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal>
            <SectionHead num="٠٣" eyebrow="يُطلب دائمًا" title="الأكثر مبيعًا" link={<TLink href="#/products/best">عرض الكل</TLink>} />
          </Reveal>
          <div className="mt-12"><ProductRow items={best} /></div>
        </div>
      </section>

      {/* وصل حديثًا */}
      <section className="bg-surface hairline-t hairline-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal>
            <SectionHead num="٠٤" eyebrow="وصل حديثًا" title="إضاءات جديدة" link={<TLink href="#/products/new">عرض الكل</TLink>} />
          </Reveal>
          <div className="mt-12"><ProductGrid items={fresh} /></div>
        </div>
      </section>

      {/* ميزة تحريرية — صورة ثابتة ونص */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-28 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <Reveal className="relative">
          <div className="overflow-hidden">
            <img src={featured.img} alt={featured.name} className="w-full aspect-square object-cover" />
          </div>
          <span className="absolute -bottom-5 -left-5 hidden md:block bg-olive text-paper font-display font-bold text-2xl px-6 py-4">ورد</span>
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow num="٠٥">قطعة العدد</Eyebrow>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-5 leading-[1.2]">{featured.name}</h2>
          <p className="mt-5 text-mute leading-7 text-sm md:text-base max-w-md">{featured.desc} زجاج مضلّع مصنوع يدويًا يحوّل أي طاولة جانبية إلى غروب دائم.</p>
          <div className="mt-6 flex items-center gap-4">
            <Price price={featured.price} oldPrice={featured.oldPrice} size="lg" />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <SolidBtn onClick={() => navigate(`/product/${featured.id}`)}>تفاصيل المنتج</SolidBtn>
            <TLink href="#/compare">قارن مع غيره</TLink>
          </div>
        </Reveal>
      </section>

      {/* التسوق حسب الفئة — صفوف تحريرية */}
      <section className="hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <Reveal><SectionHead num="٠٦" eyebrow="تصفّح حسب الرغبة" title="ثلاث عائلات من الضوء" /></Reveal>
          <div className="mt-10 divide-y divide-line hairline-b">
            {[
              { t: "مصابيح المكتب", d: "للعمل والقراءة الطويلة", to: "#/products/desk", n: "٠١" },
              { t: "مصابيح الطاولة", d: "دفء لزوايا البيت", to: "#/products/table", n: "٠٢" },
              { t: "قابلة للشحن", d: "ضوء ينتقل معك", to: "#/products/rechargeable", n: "٠٣" },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 90}>
                <a href={c.to} className="group flex items-center justify-between gap-6 py-7 md:py-8 hover:bg-surface transition-colors px-2 md:px-4">
                  <span className="flex items-baseline gap-6">
                    <span className="font-display text-olive text-lg">{c.n}</span>
                    <span>
                      <span className="block font-display font-bold text-2xl md:text-4xl group-hover:text-olive transition-colors">{c.t}</span>
                      <span className="block text-xs text-mute mt-1">{c.d}</span>
                    </span>
                  </span>
                  <IArrow className="w-7 h-7 text-mute group-hover:text-olive group-hover:-translate-x-2 transition-all duration-300" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* العروض */}
      <section className="bg-sand/35 hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal>
            <SectionHead num="٠٧" eyebrow="لفترة محدودة" title="عروض مشكاة" link={<TLink href="#/products/offers">كل العروض</TLink>} />
          </Reveal>
          <div className="mt-12"><ProductRow items={offers} /></div>
        </div>
      </section>

      {/* بيان العلامة */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
        <Reveal>
          <span className="font-display text-olive text-3xl">”</span>
          <p className="font-display font-bold text-3xl md:text-5xl leading-[1.5] text-ink">
            الضوء ليس تفصيلًا في المكان…<br />إنه روحُه.
          </p>
          <p className="mt-8 text-xs tracking-wide text-mute">مشكاة — بغداد، العراق</p>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-4">
        <Reveal><SectionHead num="٠٨" eyebrow="أسئلة سريعة" title="قبل أن تشتري" link={<TLink href="#/faq">كل الأسئلة</TLink>} /></Reveal>
        <div className="mt-8"><FaqAccordion limit={3} /></div>
      </section>

      <ContactBand />
      <Footer />
      <ConceptBar index={1} name="Editorial Premium" />
    </div>
  );
}

/* ================================================================== */
/*  CONCEPT 02 — Product First (المنتج بطلًا)                          */
/* ================================================================== */
export function Concept2() {
  const { products, addToCart } = useStore();
  const hero = products.find((p) => p.id === "luna")!;
  const best = products.filter((p) => p.isBest);
  const fresh = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.isOffer);
  const [color, setColor] = useState(hero.colors[0]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — المنتج وحده، كبير جدًا */}
      <section className="hairline-b overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12 pb-12 md:pb-16 grid lg:grid-cols-[1.2fr_1fr] items-center gap-10">
          <Reveal className="relative order-1">
            <div className="relative mx-auto w-[82%] md:w-[70%]">
              <span className="absolute inset-x-[8%] top-[10%] bottom-[4%] rounded-full bg-sand/50 blur-2xl" aria-hidden />
              <img src={hero.img} alt={hero.name} className="relative w-full aspect-square object-cover" />
              {/* مواصفات عائمة */}
              <span className="absolute top-[16%] -right-2 md:-right-16 hidden sm:flex items-center gap-2 text-[0.68rem] text-mute">
                <span className="w-10 h-px bg-sand" />تعتيم 3 مستويات
              </span>
              <span className="absolute top-[52%] -left-2 md:-left-20 hidden sm:flex items-center gap-2 text-[0.68rem] text-mute">
                سيراميك مطفي<span className="w-10 h-px bg-sand" />
              </span>
              <span className="absolute bottom-[12%] -right-2 md:-right-14 hidden sm:flex items-center gap-2 text-[0.68rem] text-mute">
                <span className="w-10 h-px bg-sand" />2700K دافئ
              </span>
            </div>
          </Reveal>

          <Reveal delay={120} className="order-2 text-center lg:text-right">
            <p className="text-[0.7rem] font-medium text-olive">منتج الأسبوع</p>
            <h1 className="font-display font-bold text-4xl md:text-6xl mt-4 leading-[1.15]">{hero.name}</h1>
            <div className="mt-5 flex items-center justify-center lg:justify-start gap-4">
              <Price price={hero.price} size="lg" />
              <Swatches colors={hero.colors} hex={hero.colorHex} active={color} onPick={setColor} />
            </div>
            <p className="mt-5 text-sm text-mute leading-7 max-w-sm mx-auto lg:mx-0">{hero.desc}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <SolidBtn onClick={() => addToCart(hero, color, hero.sizes[0], 1)}>أضف إلى السلة</SolidBtn>
              <TLink href={`#/product/${hero.id}`}>التفاصيل الكاملة</TLink>
            </div>
            <p className="mt-8 text-[0.68rem] text-mute">متوفر — يُشحن من مخزن بغداد خلال 24 ساعة</p>
          </Reveal>
        </div>
      </section>

      {/* الأكثر مبيعًا بأرقام الترتيب */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal>
          <SectionHead eyebrow="اختيار المشترين" title="الأكثر مبيعًا" link={<TLink href="#/products/best">عرض الكل</TLink>} />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {best.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <div className="relative">
                <span className="absolute -top-7 right-0 font-display font-bold text-3xl text-sand z-10">{["٠١", "٠٢", "٠٣", "٠٤"][i]}</span>
                <ProductCard p={p} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* جديد — تمرير أفقي */}
      <section className="bg-surface hairline-t hairline-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal>
            <SectionHead eyebrow="وصل حديثًا" title="جديد المخزن" link={<TLink href="#/products/new">عرض الكل</TLink>} />
          </Reveal>
          <div className="mt-12"><ProductRow items={fresh} /></div>
        </div>
      </section>

      {/* حسب النوع — بلاطات بصور */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead eyebrow="حسب الاستخدام" title="تسوّق حسب النوع" /></Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-4 md:gap-6">
          {[
            { t: "مكتبي", img: IMG.nimra, to: "#/products/desk", d: "ذراع مفصلي وتركيز" },
            { t: "طاولة", img: IMG.rawda, to: "#/products/table", d: "دفء الزوايا" },
            { t: "قابل للشحن", img: IMG.qamar, to: "#/products/rechargeable", d: "ينتقل معك" },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <a href={c.to} className="group relative block overflow-hidden">
                <img src={c.img} alt={c.t} className="pcard-img w-full aspect-[4/5] object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <span className="absolute bottom-0 inset-x-0 p-5 text-paper">
                  <span className="block font-display font-bold text-2xl md:text-3xl">{c.t}</span>
                  <span className="block text-xs text-paper/70 mt-1">{c.d}</span>
                </span>
                <span className="absolute top-4 left-4 w-9 h-9 grid place-items-center bg-paper/15 text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <IArrow className="w-4 h-4" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* منتج مميز + مواصفات */}
      <section className="hairline-t bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow dark>المنتج المميز</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-4">نمرة — مصباح الذراع</h2>
            <ul className="mt-8 space-y-4">
              {[["ذراع مفصلي مزدوج", "يصل أينما تريد ويبقى ثابتًا"], ["تعتيم 5 مستويات", "من ضوء العمل إلى ضوء الراحة"], ["قدرة 12 واط LED", "إضاءة يوم كامل بأقل استهلاك"]].map(([t, d]) => (
                <li key={t} className="flex gap-4 hairline-b border-paper/10 pb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive mt-2 shrink-0" />
                  <span><span className="block font-medium">{t}</span><span className="block text-xs text-sand/70 mt-1">{d}</span></span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <SolidBtn onClick={() => navigate("/product/nimra")} className="!bg-olive hover:!bg-paper hover:!text-ink">أضف إلى السلة — {fmtIQD(62000)}</SolidBtn>
              <TLink dark href="#/products">كل المصابيح</TLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img src={IMG.nimra} alt="نمرة — مصباح الذراع" className="w-full aspect-square object-cover" />
          </Reveal>
        </div>
      </section>

      {/* مقارنة مصغرة */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal>
          <SectionHead eyebrow="قرار أسرع" title="قارن قبل أن تختار" link={<TLink href="#/compare">المقارنة الكاملة</TLink>} />
        </Reveal>
        <Reveal delay={100} className="mt-10 overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="hairline-b">
                <th className="text-right py-4 font-medium text-mute text-xs">المواصفة</th>
                {["qamar", "luna", "nimra"].map((id) => {
                  const p = products.find((x) => x.id === id)!;
                  return (
                    <th key={id} className="py-4 px-3 text-right">
                      <img src={p.img} alt={p.name} className="w-16 h-16 object-cover mb-2" />
                      <span className="block font-medium text-xs">{p.name}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ["السعر", (id: string) => fmtIQD(products.find((x) => x.id === id)!.price)],
                ["التشغيل", (id: string) => (products.find((x) => x.id === id)!.charging === "قابل للشحن" ? "بطارية USB-C" : "كهرباء مباشرة")],
                ["التعتيم", (id: string) => products.find((x) => x.id === id)!.features.find((f) => f.label === "التعتيم")?.value ?? "—"],
                ["الأنسب لـ", (id: string) => (id === "qamar" ? "التنقل" : id === "luna" ? "المكتب" : "القراءة الطويلة")],
              ].map(([label, fn]) => (
                <tr key={label as string}>
                  <td className="py-4 text-mute text-xs">{label as string}</td>
                  {["qamar", "luna", "nimra"].map((id) => (
                    <td key={id} className="py-4 px-3 font-medium text-xs">{(fn as (id: string) => string)(id)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* عروض */}
      <section className="bg-sand/35 hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal><SectionHead eyebrow="وفّر الآن" title="عروض حقيقية" link={<TLink href="#/products/offers">كل العروض</TLink>} /></Reveal>
          <div className="mt-12"><ProductRow items={offers} /></div>
        </div>
      </section>

      {/* لايف ستايل بعرض كامل */}
      <section className="relative">
        <img src={IMG.desk} alt="مساحة عمل مسائية" className="w-full h-[420px] md:h-[520px] object-cover" />
        <div className="absolute inset-0 bg-ink/35" />
        <Reveal className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <p className="font-display font-bold text-3xl md:text-5xl text-paper max-w-xl leading-[1.4]">إضاءة صنعت لتبقى — في بيتك، مكتبك، ليلك الطويل.</p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead eyebrow="نجيب بسرعة" title="أسئلة شائعة" link={<TLink href="#/faq">كل الأسئلة</TLink>} /></Reveal>
        <div className="mt-8"><FaqAccordion limit={4} /></div>
      </section>

      <ContactBand />
      <Footer />
      <ConceptBar index={2} name="Product First" />
    </div>
  );
}
