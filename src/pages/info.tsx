import { StoreLayout, ContactBand, FaqAccordion } from "../components/chrome";
import { Reveal, useStore } from "../lib/state";
import { IMG, STORE_PHONE, waLink, WHATSAPP_NUMBER } from "../lib/data";
import { Eyebrow, SectionHead, SolidBtn, TLink, OutlineBtn } from "../components/ui";
import { IWhatsapp, IPhone, IPin, IClock, IArrow } from "../components/icons";

/* ================================================================== */
/*  الأسئلة الشائعة                                                      */
/* ================================================================== */
export function FaqPage() {
  return (
    <StoreLayout title="الأسئلة الشائعة" sub="إجابات قصيرة وواضحة عن التوصيل والدفع والضمان." crumb="الرئيسية / الأسئلة">
      <div className="max-w-3xl mx-auto px-4 md:px-8 pb-10">
        <Reveal><FaqAccordion /></Reveal>
        <Reveal className="mt-12 bg-surface border border-line p-6 md:p-8 flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="font-display font-bold text-2xl">سؤالك غير موجود؟</p>
            <p className="text-xs text-mute mt-1.5">نرد خلال دقائق في أوقات الدوام.</p>
          </div>
          <OutlineBtn href={waLink("مرحبًا، عندي سؤال غير موجود في الأسئلة الشائعة")}>
            <IWhatsapp className="w-4 h-4 text-olive" /> اسأل عبر واتساب
          </OutlineBtn>
        </Reveal>
      </div>
    </StoreLayout>
  );
}

/* ================================================================== */
/*  تواصل معنا                                                           */
/* ================================================================== */
export function ContactPage() {
  return (
    <StoreLayout title="تواصل معنا" sub="طريقة واحدة نحبها: مباشرة وسريعة." crumb="الرئيسية / تواصل">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10 grid lg:grid-cols-2 gap-10">
        <Reveal className="space-y-8">
          <div className="bg-ink text-paper p-8 md:p-10">
            <Eyebrow dark>الأسرع دائمًا</Eyebrow>
            <h2 className="font-display font-bold text-3xl md:text-4xl mt-4 leading-[1.3]">واتساب المتجر</h2>
            <p className="mt-4 text-sm text-sand/80 leading-7">طلبات، استفسارات، إلغاء أو استبدال — كل شيء من هنا.</p>
            <a href={waLink("مرحبًا، أريد الاستفسار عن منتجات مشكاة")} className="mt-7 inline-flex items-center gap-3 bg-olive text-paper px-7 py-3.5 text-sm font-medium hover:bg-paper hover:text-ink transition-colors duration-300">
              <IWhatsapp className="w-5 h-5" /> ابدأ المحادثة
            </a>
            <p className="mt-4 text-[0.68rem] text-sand/60" dir="ltr">+{WHATSAPP_NUMBER}</p>
          </div>

          <div className="divide-y divide-line hairline-t hairline-b">
            {[
              { icon: <IPhone className="w-5 h-5 text-olive" />, t: "هاتف المتجر", d: STORE_PHONE, ltr: true },
              { icon: <IPin className="w-5 h-5 text-olive" />, t: "العنوان", d: "بغداد — الكرادة، شارع 42، بناية النور، الطابق الأول" },
              { icon: <IClock className="w-5 h-5 text-olive" />, t: "أوقات العمل", d: "يوميًا من 10 صباحًا حتى 9 مساءً — الجمعة من 2 ظهرًا" },
            ].map((r) => (
              <div key={r.t} className="flex items-start gap-4 py-5">
                {r.icon}
                <span>
                  <span className="block text-sm font-semibold">{r.t}</span>
                  <span className="block text-xs text-mute mt-1 leading-6" dir={r.ltr ? "ltr" : "rtl"}>{r.d}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="relative overflow-hidden min-h-80">
          <img src={IMG.living} alt="زاوية مشكاة في بيت عراقي" className="kenburns absolute inset-0 w-full h-full object-cover" />
          <span className="absolute bottom-5 right-5 bg-paper px-4 py-2.5 text-[0.68rem] font-medium">نستقبلكم في المعرض — بغداد</span>
        </Reveal>
      </div>
    </StoreLayout>
  );
}

/* ================================================================== */
/*  الصفحة الرئيسية — فهرس مفاهيم التصميم الثمانية                       */
/* ================================================================== */
const CONCEPTS = [
  { n: "01", to: "#/c1", name: "Editorial Premium", ar: "مجلة التصميم", desc: "انقسام غير متماثل، صورة عملاقة وطباعة تحريرية فوقها — كأنها مجلة إضاءة فاخرة.", img: IMG.hero },
  { n: "02", to: "#/c2", name: "Product First", ar: "المنتج بطلًا", desc: "المنتج وحده في الواجهة: كبير، واضح، بسعره وزرّه — مصمم للتحويل.", img: IMG.luna },
  { n: "03", to: "#/c3", name: "Modern Gallery", ar: "المعرض الفني", desc: "جداريات صور متعرجة، نص لاصق وصور تعبر — المتجر كمعرض فني.", img: IMG.living },
  { n: "04", to: "#/c4", name: "Modern Commerce", ar: "التجارة الحديثة", desc: "فخامة جانتری ووضوح التسوق: تبويبات، مقارنة، وعروض — الاتجاه المعتمد.", img: IMG.desk, chosen: true },
  { n: "05", to: "#/c5", name: "Night Atelier", ar: "المشغل الليلي", desc: "افتتاحية داكنة بضوء يتوهج، شريط أسماء متحرك، وأرقام بخط عربي كبير.", img: IMG.glow },
  { n: "06", to: "#/c6", name: "Type Driven", ar: "الطباعة تقود", desc: "كلمة «ضَوء» بحجم الواجهة، فهرس قطع يعرض الصور عند التحويم.", img: IMG.qamar },
  { n: "07", to: "#/c7", name: "Journal Index", ar: "دفتر المحتويات", desc: "الصفحة تفتح بفهرس مرقم قابل للنقر، والمنتجات صفوف دفترية لا بطاقات.", img: IMG.rawda },
  { n: "08", to: "#/c8", name: "Diptych", ar: "اللوحان", desc: "نصف ثابت ببيان العلامة، ونصف تعبره ثلاث صور بطيئة التنفس.", img: IMG.ward },
  { n: "09", to: "#/c9", name: "Snap Stack", ar: "عَرْض الشاشة الكاملة", desc: "شرائح عملاقة بملء الشاشة تلتقط التمرير، شريط ثابت، ونقاط تنقل جانبية — عرض تقديمي حي.", img: IMG.hero },
  { n: "10", to: "#/c10", name: "Mosaic", ar: "الفسيفساء", desc: "الصفحة كلها بلاطات بإطارات شعرية غير متساوية: صورة، رقم، اقتباس، منتج — لا بطاقات ولا ظلال.", img: IMG.desk },
  { n: "11", to: "#/c11", name: "Ledger", ar: "قائمة الأسعار", desc: "قائمة مطبوعة بخطوط منقطة بين الاسم والسعر، صورة مؤطرة، وعروض بأسعار مشطوبة بختم.", img: IMG.rawda },
  { n: "12", to: "#/c12", name: "Niches", ar: "المشكاوات", desc: "قاعة داكنة تُعرض فيها المصابيح داخل كُوّات مضاءة بتوهج دافئ ولوحات متحفية — الأقرب لاسم العلامة.", img: IMG.glow },
  { n: "13", to: "#/c13", name: "The Shopfront", ar: "واجهة المحل", desc: "يفتح بواجهة متجر ليلية: لافتة معلقة تتأرجح، شريط أسعار متحرك، رفوف عرض، وثلاثة أبواب للأقسام.", img: IMG.nimra },
  { n: "14", to: "#/c14", name: "Chiaroscuro", ar: "النور والظل", desc: "الصفحة مقسومة بين الورق والحبر — لكل مصباح وجهان: صورة نهارية وأخرى ليلية بلمسة داكنة.", img: IMG.desk },
  { n: "15", to: "#/c15", name: "The Spec Sheet", ar: "الرسم الفني", desc: "خلفية ورق هندسي، خطوط أبعاد بالسنتيمترات تنكشف بالتمرير، جدول عنوان الرسم، وأوراق مرقمة A-01…", img: IMG.luna },
  { n: "16", to: "#/c16", name: "Scattered Posters", ar: "الملصقات المبعثرة", desc: "جدار ملصقات مائلة بشريط لاصق تعتدل عند التحويم، ملصق سعر دائري، وأختام خصم مائلة.", img: IMG.ward },
];

export function ConceptHub() {
  const { products } = useStore();
  return (
    <div className="min-h-screen">
      {/* الترويسة */}
      <header className="hairline-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-14 md:pt-24 pb-12">
          <Reveal>
            <p className="flex items-center gap-3 text-[0.72rem] font-medium text-mute">
              <span className="inline-block w-8 h-px bg-olive" /> تصميم UI/UX متكامل — متجر إضاءة عراقي
            </p>
            <h1 className="font-display font-bold leading-[1.05] mt-6">
              <span className="lm"><span className="block text-7xl md:text-[10rem]">مشكاة</span></span>
            </h1>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
              <p className="text-mute text-sm md:text-base leading-8 max-w-lg">
                مصابيح مكتب وطاولة — الدفع عند الاستلام، توصيل لثماني عشرة محافظة، وبلا حسابات.
                هذه الصفحة فهرس <span className="text-ink font-semibold">ستة عشر مفهومًا</span> للصفحة الرئيسية: هوية واحدة، وست عشرة طريقة لروايتها.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-[0.7rem] text-mute">
                <span>١٦ مفهومًا</span><span>٢٢ صفحة</span><span>RTL بالكامل</span><span>عربي فقط</span>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* الحمض البصري الموحّد */}
      <section className="hairline-b bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-wrap items-center gap-x-12 gap-y-5">
          <span className="text-[0.68rem] font-semibold text-mute">الحمض الموحّد للمفاهيم:</span>
          <span className="flex items-center gap-2.5">
            {["#1C1C1A", "#F7F5F0", "#D8D1C3", "#8A8F63", "#77736B"].map((c) => (
              <span key={c} className="w-6 h-6 rounded-full border border-line" style={{ backgroundColor: c }} title={c} />
            ))}
          </span>
          <span className="text-[0.68rem] text-mute">الخطوط: <span className="font-display text-base text-ink">أميري</span> للعناوين · IBM Plex Sans Arabic للواجهة</span>
          <span className="text-[0.68rem] text-mute">صور واحدة · منطق متجر واحد · شعار واحد</span>
        </div>
      </section>

      {/* المفاهيم الثمانية */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <Reveal><SectionHead eyebrow="اختر اتجاهك" title="المفاهيم الستة عشر" /></Reveal>
        <div className="mt-10 divide-y divide-line hairline-t hairline-b">
          {CONCEPTS.map((c, i) => (
            <Reveal key={c.n} delay={(i % 4) * 60}>
              <a href={c.to} className="group grid md:grid-cols-[110px_1fr_auto] gap-5 md:gap-8 items-center py-6 md:py-7 px-2 md:px-4 transition-colors duration-400 hover:bg-ink">
                <span className="font-display font-bold text-4xl md:text-5xl text-sand group-hover:text-olive transition-colors">{c.n}</span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-3">
                    <span className="font-display font-bold text-2xl md:text-3xl text-ink group-hover:text-paper transition-colors">{c.ar}</span>
                    <span className="text-[0.65rem] font-semibold text-mute group-hover:text-sand/70 transition-colors uppercase">{c.name}</span>
                    {c.chosen && <span className="bg-olive text-paper text-[0.62rem] font-semibold px-2.5 py-1">الاتجاه المعتمد</span>}
                  </span>
                  <span className="block text-xs md:text-sm text-mute group-hover:text-sand/80 transition-colors mt-2 leading-6 max-w-xl">{c.desc}</span>
                </span>
                <span className="hidden md:flex items-center gap-5">
                  <span className="w-20 h-20 overflow-hidden">
                    <img src={c.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                  <IArrow className="w-6 h-6 text-mute group-hover:text-olive group-hover:-translate-x-2 transition-all" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6 text-xs text-mute flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-olive" />
          اعتمدنا المفهوم 04 «التجارة الحديثة» كأساس لصفحات المتجر الداخلية لوضوحه التسويقي الأعلى.
        </Reveal>
      </section>

      {/* صفحات المتجر */}
      <section className="hairline-t bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <Reveal><SectionHead eyebrow="جاهزة للاستخدام" title="صفحات المتجر" /></Reveal>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-line">
            {[
              ["المتجر — كل المصابيح", "#/products"],
              ["تفاصيل منتج", "#/product/luna"],
              ["مقارنة المنتجات", "#/compare"],
              ["سلة التسوق", "#/cart"],
              ["إتمام الطلب (ضيف)", "#/checkout"],
              ["نجاح الطلب", "#/order/384721"],
              ["تتبّع الطلب", "#/track"],
              ["الأسئلة الشائعة", "#/faq"],
              ["تواصل معنا", "#/contact"],
            ].map(([t, to], i) => (
              <Reveal key={to} delay={(i % 4) * 50}>
                <a href={to} className="group bg-paper h-full p-6 flex flex-col justify-between gap-8 hover:bg-ink transition-colors duration-400 min-h-36">
                  <span className="text-sm font-medium text-ink group-hover:text-paper transition-colors leading-6">{t}</span>
                  <IArrow className="w-5 h-5 text-mute group-hover:text-olive group-hover:-translate-x-1.5 transition-all" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* الإدارة */}
      <section className="hairline-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <Reveal>
            <Eyebrow>خلف الكواليس</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-4">لوحة الإدارة</h2>
            <p className="mt-4 text-sm text-mute leading-7 max-w-md">مبيعات، طلبات، مخزون، موردون، كوبونات، تقارير وفواتير قابلة للطباعة — بمديرَين بصلاحيات كاملة.</p>
            <div className="mt-7"><SolidBtn onClick={() => { window.location.hash = "#/admin"; }}>ادخل اللوحة</SolidBtn></div>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-px bg-line border border-line w-full max-w-sm">
            {[["١٢", "منتجًا"], ["١٨", "محافظة"], ["٣", "موردين"], ["٤", "كوبونات"]].map(([n, d]) => (
              <div key={d} className="bg-surface p-6 text-center">
                <span className="font-display font-bold text-3xl block">{n}</span>
                <span className="text-[0.68rem] text-mute mt-1 block">{d}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <ContactBand dark />

      <footer className="bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-wrap items-center justify-between gap-4 text-[0.72rem] text-sand/60">
          <span>© 2025 مشكاة — تصميم أصلي مستوحى، غير منسوخ</span>
          <span className="flex items-center gap-6">
            <TLink dark href="#/products">المتجر</TLink>
            <TLink dark href="#/admin">الإدارة</TLink>
          </span>
        </div>
      </footer>
    </div>
  );
}
