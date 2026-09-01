import { useState } from "react";
import { IMG, fmtIQD } from "../lib/data";
import { navigate, Reveal, useStore } from "../lib/state";
import { ContactBand, FaqAccordion, Footer, Header } from "../components/chrome";
import { ProductCard, ProductGrid, ProductRow } from "../components/product";
import { ConceptBar, Eyebrow, Price, SectionHead, SolidBtn, TLink } from "../components/ui";
import { IArrow, ICheck, ITruck } from "../components/icons";

/* ================================================================== */
/*  CONCEPT 03 — Modern Gallery (معرض فني للإضاءة)                     */
/* ================================================================== */
export function Concept3() {
  const { products } = useStore();
  const best = products.filter((p) => p.isBest);
  const fresh = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.isOffer);
  const featured = products.find((p) => p.id === "qamar")!;

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — صورة كاملة وطباعة فوقها */}
      <section className="relative h-[76vh] min-h-[480px] overflow-hidden">
        <img src={IMG.living} alt="صالة معيشة بضوء دافئ" className="kenburns absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-ink/70 via-ink/20 to-transparent" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-end pb-14">
          <Reveal>
            <p className="text-sand text-xs font-medium">معرض الإضاءة — العراق</p>
            <h1 className="font-display font-bold text-6xl md:text-[7.5rem] leading-[1.05] text-paper mt-3">
              <span className="lm"><span>مشكاة</span></span>
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-8">
              <TLink dark href="#/products">ادخل المعرض</TLink>
              <span className="text-paper/60 text-xs">١٢ قطعة مختارة · شتاء 2025</span>
            </div>
          </Reveal>
        </div>
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 w-px h-12 bg-paper/50 overflow-hidden" aria-hidden>
          <span className="block w-px h-4 bg-paper animate-bounce" />
        </span>
      </section>

      {/* صالة ١ — جدارية */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="I" eyebrow="الصالة الأولى" title="جدارية الضوء" /></Reveal>
        <div className="mt-12 columns-2 md:columns-3 gap-4 md:gap-6 [&>*]:mb-4 md:[&>*]:mb-6">
          {[
            { src: IMG.luna, cap: "لونا — قبة السيراميك", tall: false },
            { src: IMG.desk, cap: "طقوس المساء", tall: true },
            { src: IMG.ward, cap: "ورد — زجاج الغروب", tall: false },
            { src: IMG.glow, cap: "نسيج الكتان عن قرب", tall: true },
            { src: IMG.qamar, cap: "قمر — حصاة مضيئة", tall: false },
            { src: IMG.living, cap: "زاوية رقم ٤", tall: false },
          ].map((g, i) => (
            <Reveal key={g.cap} delay={(i % 3) * 90} className="break-inside-avoid">
              <figure className="group relative overflow-hidden cursor-pointer" onClick={() => navigate("/products")}>
                <img src={g.src} alt={g.cap} loading="lazy" className={`pcard-img w-full object-cover ${g.tall ? "aspect-[3/4]" : "aspect-square"}`} />
                <figcaption className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-500 flex items-end p-4">
                  <span className="text-paper text-xs opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">{g.cap}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* استكشاف المجموعة — نص ثابت وصور متحركة */}
      <section className="hairline-t bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12">
          <div className="lg:sticky lg:top-32 self-start">
            <Reveal>
              <Eyebrow num="II">استكشاف المجموعة</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-5xl mt-5 leading-[1.25]">
                ثلاث عائلات،<br />خيطٌ واحد من الدفء.
              </h2>
              <p className="mt-6 text-mute text-sm leading-7 max-w-sm">كل قطعة في مشكاة اختيرت لسبب: أن تعيش معك سنوات، لا مواسم.</p>
              <div className="mt-10 space-y-5">
                {[["مصابيح المكتب", "٦ قطع"], ["مصابيح الطاولة", "٤ قطع"], ["قابلة للشحن", "٥ قطع"]].map(([t, n]) => (
                  <div key={t} className="flex items-center justify-between hairline-b pb-4">
                    <span className="font-medium text-sm">{t}</span>
                    <span className="text-xs text-mute">{n}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10"><TLink href="#/products">تصفّح كل القطع</TLink></div>
            </Reveal>
          </div>
          <div className="space-y-8">
            {[IMG.nimra, IMG.rawda, IMG.qamar].map((src, i) => (
              <Reveal key={src} delay={i * 80}>
                <button type="button" onClick={() => navigate("/products")} className="block w-full overflow-hidden text-right cursor-pointer">
                  <img src={src} alt="من المجموعة" loading="lazy" className="pcard-img w-full aspect-[4/5] object-cover" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* الأكثر مبيعًا — بطاقات مجردة */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="III" eyebrow="قطع مطلوبة" title="الأكثر مبيعًا" link={<TLink href="#/products/best">الكل</TLink>} /></Reveal>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {best.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* الجديد — إزاحات متعرجة */}
      <section className="hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal><SectionHead num="IV" eyebrow="وصل حديثًا" title="جديد المعرض" link={<TLink href="#/products/new">الكل</TLink>} /></Reveal>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {fresh.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={i * 70} className={i % 2 === 1 ? "lg:translate-y-10" : ""}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* صورة تحريرية كبيرة */}
      <section className="relative overflow-hidden">
        <img src={IMG.hero} alt="مكتب في ضوء العصر" className="kenburns w-full h-[420px] md:h-[560px] object-cover" />
        <div className="absolute inset-0 bg-ink/25" />
        <Reveal className="absolute inset-0 flex items-center justify-center text-center px-6">
          <p className="font-display font-bold text-3xl md:text-5xl text-paper leading-[1.5] max-w-2xl">الضوء الجيد لا يُلاحَظ —<br />يُشعَر به.</p>
        </Reveal>
      </section>

      {/* العروض — قائمة مجردة */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="V" eyebrow="اقتناء أذكى" title="عروض الآن" /></Reveal>
        <div className="mt-8 divide-y divide-line hairline-b">
          {offers.map((p) => (
            <Reveal key={p.id}>
              <a href={`#/product/${p.id}`} className="group flex items-center gap-5 py-5 hover:bg-surface transition-colors px-2">
                <img src={p.img} alt={p.name} className="w-16 h-16 object-cover shrink-0" />
                <span className="flex-1 min-w-0">
                  <span className="block font-medium text-sm truncate group-hover:text-olive transition-colors">{p.name}</span>
                  <span className="block text-[0.7rem] text-mute mt-0.5">{p.type}</span>
                </span>
                <span className="text-left shrink-0">
                  <span className="block font-semibold text-sm">{fmtIQD(p.price)}</span>
                  {p.oldPrice && <span className="block text-[0.7rem] text-mute line-through">{fmtIQD(p.oldPrice)}</span>}
                </span>
                <IArrow className="w-5 h-5 text-mute group-hover:text-olive group-hover:-translate-x-1.5 transition-all shrink-0" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* قطعة مميزة */}
      <section className="hairline-t bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <Reveal>
            <img src={featured.img} alt={featured.name} className="w-full aspect-square object-cover" />
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow num="VI">قطعة المعرض</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-5">{featured.name}</h2>
            <p className="mt-5 text-mute text-sm leading-7 max-w-md">{featured.desc} ثماني عشرة ساعة من الضوء في شحنة واحدة.</p>
            <div className="mt-6"><Price price={featured.price} size="lg" /></div>
            <div className="mt-8 flex flex-wrap gap-6 items-center">
              <SolidBtn onClick={() => navigate(`/product/${featured.id}`)}>اقتنِ القطعة</SolidBtn>
              <TLink href="#/compare">قارن القطع</TLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <Reveal><SectionHead num="VII" eyebrow="معلومات" title="أسئلة الزوّار" /></Reveal>
        <div className="mt-8"><FaqAccordion limit={3} /></div>
      </section>

      <ContactBand dark />
      <Footer />
      <ConceptBar index={3} name="Modern Gallery" />
    </div>
  );
}

/* ================================================================== */
/*  CONCEPT 04 — Modern Commerce (الاتجاه المعتمد للمتجر)               */
/* ================================================================== */
export function Concept4() {
  const { products, compare } = useStore();
  const best = products.filter((p) => p.isBest);
  const fresh = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.isOffer);
  const featured = products.find((p) => p.id === "nimra-pro")!;
  const [tab, setTab] = useState<"best" | "new" | "offers">("best");
  const tabItems = tab === "best" ? best : tab === "new" ? fresh : offers;

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO — سبليت واضح للتسوق */}
      <section className="hairline-b">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
          <Reveal className="flex flex-col justify-center px-4 md:px-8 lg:pe-14 py-16 lg:py-24 order-2 lg:order-1">
            <Eyebrow>متجر الإضاءة المتخصص — العراق</Eyebrow>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-[4.4rem] leading-[1.12] mt-6">
              <span className="lm"><span>إضاءة صُنعت</span></span>
              <span className="lm" style={{ ["--rv-delay" as never]: "140ms" }}><span className="text-olive">لتبقى.</span></span>
            </h1>
            <p className="mt-6 text-mute text-sm md:text-base leading-7 max-w-md">
              مصابيح مكتب وطاولة أصلية، من مخزننا في بغداد إلى باب بيتك في كل المحافظات.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <SolidBtn onClick={() => navigate("/products")}>تسوّق الآن</SolidBtn>
              <TLink href="#/compare">قارن المنتجات{compare.length > 0 ? ` (${compare.length})` : ""}</TLink>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md text-[0.7rem] text-mute">
              {[["الدفع", "عند الاستلام"], ["التوصيل", "١٨ محافظة"], ["الضمان", "سنة كاملة"]].map(([t, d]) => (
                <div key={t} className="hairline-t pt-3">
                  <span className="block text-ink font-semibold text-xs">{t}</span>
                  <span className="block mt-1">{d}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="order-1 lg:order-2 relative overflow-hidden">
            <img src={IMG.hero} alt="مساحة عمل دافئة بمصباح مشكاة" className="kenburns w-full h-[340px] md:h-[440px] lg:h-full object-cover" />
            {/* بطاقة منتج عائمة */}
            <button type="button" onClick={() => navigate("/product/luna")} className="absolute bottom-5 right-5 md:bottom-8 md:right-8 bg-paper/95 backdrop-blur px-4 py-3 flex items-center gap-3 shadow-lg text-right hover:bg-paper transition-colors cursor-pointer">
              <img src={products.find((p) => p.id === "luna")!.img} alt="لونا" className="w-12 h-12 object-cover" />
              <span>
                <span className="block text-xs font-semibold">لونا — مصباح القبة</span>
                <span className="block text-[0.7rem] text-olive font-medium mt-0.5">{fmtIQD(45000)}</span>
              </span>
              <IArrow className="w-4 h-4 text-mute" />
            </button>
          </div>
        </div>
      </section>

      {/* تسوق حسب الفئة — بلاطة كبيرة + صغيرتان */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="٠١" eyebrow="من أين نبدأ؟" title="تسوّق حسب الفئة" /></Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-4 md:gap-6">
          <Reveal className="md:row-span-2">
            <CategoryTile t="مصابيح المكتب" d="للعمل والقراءة" img={IMG.nimra} to="#/products/desk" big />
          </Reveal>
          <Reveal delay={100}><CategoryTile t="مصابيح الطاولة" d="دفء الزوايا" img={IMG.rawda} to="#/products/table" /></Reveal>
          <Reveal delay={180}><CategoryTile t="قابلة للشحن" d="ضوء متنقل" img={IMG.qamar} to="#/products/rechargeable" /></Reveal>
        </div>
      </section>

      {/* تبويبات المنتجات */}
      <section className="bg-surface hairline-t hairline-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow num="٠٢">المختارات</Eyebrow>
                <h2 className="font-display font-bold text-4xl md:text-5xl mt-4">ماذا تحب أن ترى؟</h2>
              </div>
              <div className="flex gap-1 border border-line p-1 bg-paper">
                {([["best", "الأكثر مبيعًا"], ["new", "جديد"], ["offers", "العروض"]] as const).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setTab(k)}
                    className={`px-5 py-2.5 text-xs font-semibold transition-all duration-300 ${tab === k ? "bg-ink text-paper" : "text-mute hover:text-ink"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="mt-12" key={tab}>
            <div className="toast-in grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {tabItems.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </div>
      </section>

      {/* وصل حديثًا */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="٠٣" eyebrow="من الصندوق للتو" title="وصل حديثًا" link={<TLink href="#/products/new">عرض الكل</TLink>} /></Reveal>
        <div className="mt-12"><ProductRow items={fresh} /></div>
      </section>

      {/* العروض */}
      <section className="bg-sand/35 hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.9fr_2fr] gap-10 items-center">
          <Reveal>
            <Eyebrow num="٠٤">لفترة محدودة</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-4 leading-[1.2]">عروض<br />لا تنتظر</h2>
            <p className="mt-4 text-sm text-mute leading-7">خصومات حقيقية على قطع مختارة — حتى نفاد الكمية.</p>
            <div className="mt-7"><TLink href="#/products/offers">كل العروض</TLink></div>
          </Reveal>
          <Reveal delay={120}><ProductGrid items={offers} cols={3} /></Reveal>
        </div>
      </section>

      {/* المنتج المميز — قسم داكن */}
      <section className="bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="order-2 lg:order-1 relative">
            <span className="absolute -inset-10 bg-olive/10 blur-3xl rounded-full" aria-hidden />
            <img src={featured.img} alt={featured.name} className="relative w-full aspect-square object-cover" />
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <Eyebrow dark num="٠٥">قطعة الأسبوع</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-5">{featured.name}</h2>
            <p className="mt-5 text-sand/80 text-sm leading-7 max-w-md">{featured.desc}</p>
            <div className="mt-6 flex items-center gap-3">
              <Price price={featured.price} oldPrice={featured.oldPrice} size="lg" dark />
              <span className="bg-olive text-paper text-[0.65rem] font-semibold px-2 py-1">خصم {Math.round((1 - featured.price / (featured.oldPrice ?? featured.price)) * 100)}٪</span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <SolidBtn onClick={() => navigate(`/product/${featured.id}`)} className="!bg-olive hover:!bg-paper hover:!text-ink">أضف إلى السلة</SolidBtn>
              <TLink dark href={`#/product/${featured.id}`}>التفاصيل الكاملة</TLink>
            </div>
            <div className="mt-10 flex items-center gap-8 text-[0.7rem] text-sand/70">
              <span className="flex items-center gap-2"><ITruck className="w-4 h-4 text-olive" />يصل بغداد خلال يومين</span>
              <span className="flex items-center gap-2"><ICheck className="w-4 h-4 text-olive" />ضمان سنتان</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* مقارنة سريعة */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Reveal><SectionHead num="٠٦" eyebrow="قرار واثق" title="قارن واختر" link={<TLink href="#/compare">افتح المقارنة</TLink>} /></Reveal>
        <Reveal delay={100} className="mt-10 overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="hairline-b">
                <th className="text-right py-4 text-xs font-medium text-mute w-36">المواصفة</th>
                {["qamar", "rawda", "nimra", "siraj"].map((id) => {
                  const p = products.find((x) => x.id === id)!;
                  return (
                    <th key={id} className="py-4 px-4 text-right min-w-36">
                      <img src={p.img} alt={p.name} className="w-20 h-20 object-cover mb-3" />
                      <span className="block font-medium text-xs leading-5">{p.name}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ["السعر", (p: (typeof products)[number]) => fmtIQD(p.price)],
                ["التشغيل", (p: (typeof products)[number]) => (p.charging === "قابل للشحن" ? "بطارية USB-C" : "كهرباء مباشرة")],
                ["التعتيم", (p: (typeof products)[number]) => p.features.find((f) => f.label === "التعتيم")?.value ?? "—"],
                ["متوفر", (p: (typeof products)[number]) => `${p.stock} قطعة`],
              ].map(([label, fn]) => (
                <tr key={label as string} className="hover:bg-surface transition-colors">
                  <td className="py-4 text-xs text-mute">{label as string}</td>
                  {["qamar", "rawda", "nimra", "siraj"].map((id) => (
                    <td key={id} className="py-4 px-4 text-xs font-medium">{(fn as (p: (typeof products)[number]) => string)(products.find((x) => x.id === id)!)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* لايف ستايل */}
      <section className="hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
          <Reveal className="overflow-hidden"><img src={IMG.desk} alt="مكتب مسائي" className="pcard-img w-full h-full object-cover aspect-[4/3]" /></Reveal>
          <Reveal delay={120} className="flex flex-col justify-center lg:pr-10 py-6">
            <Eyebrow num="٠٧">لماذا مشكاة؟</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-5 leading-[1.25]">ضوء واحد جيد<br />يغيّر يومك كله.</h2>
            <p className="mt-5 text-sm text-mute leading-7 max-w-md">نختار كل مصباح كما نختاره لبيوتنا: خامة صادقة، ضوء مريح، وعمر طويل.</p>
            <div className="mt-8"><TLink href="#/faq">اعرف أكثر عنّا</TLink></div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-4">
        <Reveal><SectionHead num="٠٨" eyebrow="قبل الشراء" title="أسئلة تتكرر" link={<TLink href="#/faq">كل الأسئلة</TLink>} /></Reveal>
        <div className="mt-8"><FaqAccordion limit={4} /></div>
      </section>

      <ContactBand />
      <Footer />
      <ConceptBar index={4} name="Modern Commerce — المعتمد" />
    </div>
  );
}

function CategoryTile({ t, d, img, to, big = false }: { t: string; d: string; img: string; to: string; big?: boolean }) {
  return (
    <a href={to} className="group relative block h-full overflow-hidden">
      <img src={img} alt={t} loading="lazy" className={`pcard-img w-full object-cover ${big ? "aspect-[4/5] md:aspect-auto md:h-full md:min-h-[520px]" : "aspect-[16/10] md:aspect-[2/1]"}`} />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
      <span className="absolute bottom-0 inset-x-0 p-6 text-paper flex items-end justify-between gap-4">
        <span>
          <span className="block font-display font-bold text-2xl md:text-3xl">{t}</span>
          <span className="block text-xs text-paper/70 mt-1">{d}</span>
        </span>
        <span className="w-10 h-10 shrink-0 grid place-items-center border border-paper/40 group-hover:bg-olive group-hover:border-olive transition-colors duration-300">
          <IArrow className="w-4 h-4" />
        </span>
      </span>
    </a>
  );
}
