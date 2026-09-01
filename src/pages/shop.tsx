import { useEffect, useState } from "react";
import { StoreLayout } from "../components/chrome";
import { ProductCard } from "../components/product";
import { Reveal, navigate, useStore } from "../lib/state";
import { Eyebrow, Price, QtyStepper, SolidBtn, Swatches, TLink, Modal } from "../components/ui";
import { IBag, ICompare, ICheck, IPlay, ITruck, IPin, IBox } from "../components/icons";

const TABS = [
  { key: "", label: "الكل" },
  { key: "desk", label: "مكتبي" },
  { key: "table", label: "طاولة" },
  { key: "rechargeable", label: "قابل للشحن" },
  { key: "new", label: "جديد" },
  { key: "best", label: "الأكثر مبيعًا" },
  { key: "offers", label: "العروض" },
] as const;

const TAB_TITLES: Record<string, { t: string; s: string }> = {
  "": { t: "كل المصابيح", s: "١٢ قطعة مختارة — مصابيح مكتب وطاولة وضوء محمول." },
  desk: { t: "مصابيح المكتب", s: "إضاءة مهمة للمكاتب وساعات العمل الطويلة." },
  table: { t: "مصابيح الطاولة", s: "دفء الزوايا وطاولات الجانب." },
  rechargeable: { t: "قابلة للشحن", s: "ضوء ينتقل معك — بطارية USB-C." },
  new: { t: "وصل حديثًا", s: "أحدث ما دخل مخزن مشكاة." },
  best: { t: "الأكثر مبيعًا", s: "ما اختاره عملاؤنا أكثر من غيره." },
  offers: { t: "العروض", s: "خصومات حقيقية حتى نفاد الكمية." },
};

export function ShopPage({ tab = "" }: { tab?: string }) {
  const { products, compare, clearCompare } = useStore();
  const active = TABS.some((t) => t.key === tab) ? tab : "";

  const items = products.filter((p) => {
    if (active === "desk") return p.type === "مكتبي";
    if (active === "table") return p.type === "طاولة";
    if (active === "rechargeable") return p.charging === "قابل للشحن";
    if (active === "new") return p.isNew;
    if (active === "best") return p.isBest;
    if (active === "offers") return p.isOffer;
    return true;
  });

  const meta = TAB_TITLES[active];

  return (
    <StoreLayout title={meta.t} sub={meta.s} crumb="الرئيسية / المتجر">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* تبويبات الأنواع */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 hairline-b -mb-px">
          {TABS.map((t) => (
            <a
              key={t.key}
              href={`#/products${t.key ? `/${t.key}` : ""}`}
              className={`shrink-0 px-5 py-2.5 text-xs font-semibold border transition-all duration-300 ${
                active === t.key ? "bg-ink text-paper border-ink" : "bg-surface border-line text-mute hover:border-ink hover:text-ink"
              }`}
            >
              {t.label}
            </a>
          ))}
        </div>

        <p className="pt-6 pb-2 text-xs text-mute">{items.length} منتج</p>

        {/* الشبكة */}
        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl">لا توجد منتجات هنا بعد</p>
            <div className="mt-6"><TLink href="#/products">عودة لكل المصابيح</TLink></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14 py-8">
            {items.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 60}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* شريط المقارنة العائم */}
      {compare.length > 0 && (
        <div className="fixed bottom-5 inset-x-0 z-[75] flex justify-center px-4 no-print">
          <div className="toast-in flex items-center gap-4 bg-ink text-paper px-5 py-3 shadow-2xl">
            <span className="text-xs font-medium">{compare.length} في المقارنة</span>
            <button onClick={() => navigate("/compare")} className="bg-olive hover:bg-paper hover:text-ink transition-colors px-4 py-2 text-xs font-semibold">قارن الآن</button>
            <button onClick={clearCompare} className="text-sand/70 hover:text-paper text-xs">مسح</button>
          </div>
        </div>
      )}
    </StoreLayout>
  );
}

/* ================================================================== */
/*  صفحة تفاصيل المنتج                                                  */
/* ================================================================== */
export function ProductPage({ id }: { id: string }) {
  const { products, addToCart, compare, toggleCompare, availableStock } = useStore();
  const p = products.find((x) => x.id === id);
  const [imgIdx, setImgIdx] = useState(0);
  const [color, setColor] = useState(p?.colors[0] ?? "");
  const [size, setSize] = useState(p?.sizes[0] ?? "");
  const [qty, setQty] = useState(1);
  const [videoOpen, setVideoOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setImgIdx(0);
    setQty(1);
    setPlaying(false);
    if (p) {
      setColor(p.colors[0]);
      setSize(p.sizes[0]);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!p) {
    return (
      <StoreLayout title="منتج غير موجود" crumb="الرئيسية / المتجر">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="mt-6"><TLink href="#/products">عودة للمتجر</TLink></div>
        </div>
      </StoreLayout>
    );
  }

  const stock = availableStock(p.id);
  const related = products.filter((x) => x.id !== p.id && (x.type === p.type || x.charging === p.charging)).slice(0, 4);
  const inCompare = compare.includes(p.id);

  const galleryItems = [
    ...p.gallery.map((src, i) => ({ kind: "img" as const, src, label: `صورة ${i + 1}` })),
    ...(p.hasVideo ? [{ kind: "video" as const, src: p.gallery[0], label: "فيديو تعريفي" }] : []),
  ];

  return (
    <StoreLayout crumb={`الرئيسية / المتجر / ${p.name}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 md:pt-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* المعرض */}
          <div>
            <div className="relative overflow-hidden bg-[#F1EEE7]">
              <div key={imgIdx} className="toast-in">
                <img src={galleryItems[imgIdx].src} alt={p.name} className="w-full aspect-square object-cover" />
              </div>
              {p.badge && <span className="absolute top-4 right-4 bg-ink text-paper text-[0.65rem] font-semibold px-3 py-1.5">{p.badge}</span>}
              {galleryItems[imgIdx].kind === "video" && (
                <button
                  onClick={() => { setVideoOpen(true); setPlaying(true); }}
                  className="absolute inset-0 grid place-items-center cursor-pointer"
                  aria-label="تشغيل الفيديو التعريفي"
                >
                  <span className="w-20 h-20 grid place-items-center bg-ink/70 text-paper backdrop-blur-sm hover:bg-olive transition-colors duration-300">
                    <IPlay className="w-8 h-8" />
                  </span>
                </button>
              )}
            </div>
            {/* المصغرات */}
            <div className="mt-3 grid grid-cols-4 gap-3">
              {galleryItems.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImgIdx(i)}
                  className={`relative overflow-hidden border transition-all duration-300 ${imgIdx === i ? "border-olive" : "border-line hover:border-sand"}`}
                  aria-label={g.label}
                >
                  <img src={g.src} alt="" className="w-full aspect-square object-cover" />
                  {g.kind === "video" && (
                    <span className="absolute inset-0 grid place-items-center bg-ink/45 text-paper">
                      <IPlay className="w-5 h-5" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* المعلومات */}
          <div className="lg:pt-4">
            <Eyebrow>{p.type} · {p.charging}</Eyebrow>
            <h1 className="font-display font-bold text-4xl md:text-5xl mt-4 leading-[1.2]">{p.name}</h1>
            <p className="mt-4 text-mute text-sm md:text-base leading-7 max-w-md">{p.desc}</p>

            <div className="mt-6 flex items-center gap-4">
              <Price price={p.price} oldPrice={p.oldPrice} size="lg" />
              {p.oldPrice && (
                <span className="bg-olive text-paper text-[0.65rem] font-semibold px-2 py-1">
                  خصم {Math.round((1 - p.price / p.oldPrice) * 100)}٪
                </span>
              )}
            </div>

            {/* اللون */}
            <div className="mt-8">
              <p className="text-xs font-semibold mb-3">اللون — <span className="text-mute font-normal">{color}</span></p>
              <Swatches colors={p.colors} hex={p.colorHex} active={color} onPick={setColor} />
            </div>

            {/* القياس */}
            <div className="mt-6">
              <p className="text-xs font-semibold mb-3">القياس</p>
              <div className="flex gap-2">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`px-5 py-2.5 text-xs font-medium border transition-all duration-300 ${size === s ? "bg-ink text-paper border-ink" : "bg-surface border-line hover:border-ink"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* الكمية والإضافة */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QtyStepper qty={qty} onChange={setQty} max={Math.max(1, stock)} />
              <SolidBtn onClick={() => addToCart(p, color, size, qty)} className="flex-1 min-w-52">
                <IBag className="w-4 h-4" /> أضف إلى السلة — {(p.price * qty).toLocaleString("en-US")} د.ع
              </SolidBtn>
            </div>
            <button
              type="button"
              onClick={() => toggleCompare(p.id)}
              className={`tlink rev mt-5 text-xs font-medium ${inCompare ? "text-olive" : "text-mute hover:text-ink"}`}
            >
              <span className="flex items-center gap-2">
                {inCompare ? <ICheck className="w-3.5 h-3.5" /> : <ICompare className="w-3.5 h-3.5" />}
                {inCompare ? "في قائمة المقارنة" : "أضف إلى المقارنة"}
              </span>
            </button>

            <p className={`mt-4 text-xs ${stock === 0 ? "text-red-700" : "text-mute"}`}>
              {stock === 0 ? "نفدت الكمية حاليًا — راسلنا عبر واتساب للحجز" : `متوفر في المخزن — ${stock} قطعة`}
            </p>

            {/* معلومات */}
            <div className="mt-10 divide-y divide-line hairline-t hairline-b">
              {[
                { icon: <ITruck className="w-5 h-5 text-olive" />, t: "توصيل لكل المحافظات", d: "بغداد 3,000 د.ع — وبقية المحافظات 4,000–6,000 د.ع" },
                { icon: <IBox className="w-5 h-5 text-olive" />, t: "الدفع عند الاستلام", d: "نقدًا، بلا رسوم إضافية" },
                { icon: <IPin className="w-5 h-5 text-olive" />, t: "ضمان موثوق", d: "سنة ضد عيوب التصنيع" },
              ].map((r) => (
                <div key={r.t} className="flex items-center gap-4 py-4">
                  {r.icon}
                  <span><span className="block text-sm font-medium">{r.t}</span><span className="block text-[0.7rem] text-mute mt-0.5">{r.d}</span></span>
                </div>
              ))}
            </div>

            {/* المواصفات */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold mb-4">المواصفات</h3>
              <div className="grid grid-cols-2 gap-px bg-line">
                {p.features.map((f) => (
                  <div key={f.label} className="bg-surface p-4">
                    <span className="block text-[0.65rem] text-mute">{f.label}</span>
                    <span className="block text-sm font-medium mt-1">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* منتجات ذات صلة */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>تكتمل معه</Eyebrow>
              <h2 className="font-display font-bold text-3xl md:text-4xl mt-3">منتجات ذات صلة</h2>
            </div>
            <TLink href="#/products">عرض الكل</TLink>
          </div>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((rp) => <ProductCard key={rp.id} p={rp} />)}
          </div>
        </div>
      </div>

      {/* نافذة الفيديو التعريفي */}
      <Modal open={videoOpen} onClose={() => { setVideoOpen(false); setPlaying(false); }} title={`فيديو تعريفي — ${p.name}`}>
        <div className="relative overflow-hidden bg-ink">
          <img src={p.gallery[0]} alt={p.name} className={`w-full aspect-square object-cover ${playing ? "kenburns" : ""}`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setPlaying(!playing)}
              className="w-16 h-16 grid place-items-center bg-paper/90 text-ink hover:bg-olive hover:text-paper transition-colors cursor-pointer"
              aria-label={playing ? "إيقاف" : "تشغيل"}
            >
              {playing ? (
                <span className="flex gap-1.5"><span className="w-1.5 h-5 bg-current" /><span className="w-1.5 h-5 bg-current" /></span>
              ) : (
                <IPlay className="w-6 h-6" />
              )}
            </button>
          </div>
          {playing && (
            <div className="absolute bottom-0 inset-x-0 h-1 bg-paper/20">
              <span className="block h-full bg-olive" style={{ animation: "progressbar 8s linear infinite" }} />
            </div>
          )}
        </div>
        <p className="mt-4 text-xs text-mute leading-6">{p.desc} — جولة سريعة في التصميم والخامة وطريقة الاستخدام.</p>
      </Modal>
    </StoreLayout>
  );
}
