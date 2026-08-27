import { useState } from "react";
import { IMG, discountPct, fmt } from "../data";
import { useStore } from "../store";
import { CardGrid } from "../sections";
import { Eyebrow, IcArrowBack, IcBattery, IcCompare, IcPlug, IcPlay, IcShield, IcTruck, Qty, Reveal, VideoModal } from "../ui";

export default function ProductDetails({ id }: { id: string }) {
  const { products, addToCart, toggleCompare, compare } = useStore();
  const p = products.find((x) => x.id === id);

  const [slide, setSlide] = useState(0);
  const [video, setVideo] = useState(false);
  const [color, setColor] = useState(p?.colors[0].name ?? "");
  const [size, setSize] = useState(p?.sizes[0] ?? "");
  const [qty, setQty] = useState(1);

  if (!p)
    return (
      <div className="max-w-[1440px] mx-auto px-5 py-32 text-center">
        <h1 className="font-display font-bold text-4xl">المنتج غير موجود</h1>
        <a href="#/products" className="tl mt-6 text-sm font-bold">عودة للمصابيح</a>
      </div>
    );

  const gallery = [
    { src: p.image, label: "المنتج" },
    { src: IMG.hero, label: "في المكان" },
    { src: IMG.life, label: "إضاءة حقيقية" },
  ];
  const pct = discountPct(p);
  const out = p.stock <= 0;
  const inCompare = compare.includes(p.id);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const relatedAll = related.length ? related : products.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <div className="page-in">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-8 md:py-12">
        <a href="#/products" className="inline-flex items-center gap-2 text-[0.72rem] font-bold text-mute hover:text-ink transition-colors mb-8">
          <IcArrowBack className="w-4 h-4" />
          كل المصابيح
        </a>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-20">
          {/* المعرض */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <div className="flex sm:flex-col gap-3 overflow-x-auto no-scrollbar shrink-0">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setSlide(i)} className={`imgz w-20 h-20 shrink-0 border transition-all ${slide === i && !video ? "border-ink" : "border-line opacity-70 hover:opacity-100"}`} aria-label={g.label}>
                  <img src={g.src} alt={g.label} className="w-full h-full object-cover" />
                </button>
              ))}
              <button onClick={() => setVideo(true)} className="relative w-20 h-20 shrink-0 border border-line bg-ink grid place-items-center text-paper hover:border-ink transition-colors" aria-label="الفيديو التعريفي">
                <IcPlay className="w-5 h-5" />
                <span className="absolute bottom-1 text-[0.5rem] font-bold">فيديو</span>
              </button>
            </div>
            <Reveal className="imgz flex-1 aspect-square bg-[#f1eee6] border border-line/70">
              <img src={gallery[slide].src} alt={`${p.name} — ${gallery[slide].label}`} className="w-full h-full object-cover" />
            </Reveal>
          </div>

          {/* المعلومات */}
          <Reveal delay={100}>
            <div className="flex items-center gap-3">
              <Eyebrow>{p.category}</Eyebrow>
              {pct > 0 && <span className="bg-olive text-white text-[0.6rem] font-bold px-2 py-1 num">خصم {pct}٪</span>}
              {p.isNew && <span className="bg-ink text-paper text-[0.6rem] font-bold px-2 py-1">جديد</span>}
            </div>
            <h1 className="font-display font-bold text-4xl md:text-6xl mt-4 text-ink">{p.name}</h1>
            <p className="text-mute font-bold text-sm mt-3">{p.tagline}</p>

            <div className="flex items-baseline gap-4 mt-6">
              <span className="num text-3xl font-extrabold text-ink">{fmt(p.price)}</span>
              {p.oldPrice && <span className="num text-mute line-through font-bold">{fmt(p.oldPrice)}</span>}
            </div>

            {/* الألوان */}
            <div className="mt-8">
              <p className="text-[0.7rem] font-bold text-mute mb-3">اللون — <span className="text-ink">{color}</span></p>
              <div className="flex gap-2.5">
                {p.colors.map((c) => (
                  <button key={c.name} onClick={() => setColor(c.name)} title={c.name} aria-label={c.name}
                    className={`w-9 h-9 rounded-full border-2 transition-all grid place-items-center ${color === c.name ? "border-ink scale-105" : "border-line hover:border-mute"}`}>
                    <span className="w-6 h-6 rounded-full border border-ink/10" style={{ background: c.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* المقاسات */}
            <div className="mt-6">
              <p className="text-[0.7rem] font-bold text-mute mb-3">المقاس</p>
              <div className="flex gap-2.5">
                {p.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`px-6 h-11 text-[0.78rem] font-bold border transition-all ${size === s ? "border-ink bg-ink text-paper" : "border-line bg-surface hover:border-ink"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* نوع التشغيل */}
            <div className="mt-6 flex items-center gap-3 bg-sand/35 border border-line px-5 py-4">
              {p.charging === "rechargeable" ? <IcBattery className="w-5 h-5 text-olive" /> : <IcPlug className="w-5 h-5 text-olive" />}
              <div className="text-[0.75rem] font-bold">
                {p.charging === "rechargeable" ? (
                  <>قابل للشحن — بطارية حتى <span className="num">{p.battery}</span> · شحن USB-C</>
                ) : (
                  <>يعمل مباشرة بالكهرباء — كابل 1.8 متر بمفتاح لمس</>
                )}
              </div>
            </div>

            {/* الكمية والإضافة */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Qty value={qty} onChange={(n) => setQty(Math.min(Math.max(1, n), Math.max(1, p.stock)))} max={Math.max(1, p.stock)} />
              <button
                onClick={() => addToCart(p, color, size, qty)}
                disabled={out}
                className="flex-1 min-w-[220px] h-12 bg-ink text-paper text-[0.8rem] font-bold hover:bg-olive transition-colors disabled:opacity-40 disabled:pointer-events-none"
              >
                {out ? "نفدت الكمية" : "أضف إلى السلة"}
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className={`text-[0.7rem] font-bold ${out ? "text-[#b0563f]" : p.stock <= 5 ? "text-olive" : "text-mute"}`}>
                {out ? "غير متوفر حاليًا — اطلبه عبر واتساب ليصلك فور توفره" : p.stock <= 5 ? `باقي ${p.stock} فقط في المخزون` : `متوفر في المخزون: ${p.stock}`}
              </p>
              <button onClick={() => toggleCompare(p.id)} className={`tl text-[0.75rem] font-bold ${inCompare ? "text-olive tl-solid" : "text-ink"}`}>
                <IcCompare className="w-4 h-4" />
                {inCompare ? "في المقارنة" : "أضف للمقارنة"}
              </button>
            </div>

            {/* الثقة */}
            <div className="mt-8 hairline-t grid grid-cols-3 divide-x divide-x-reverse divide-line text-center">
              {[
                { ic: <IcTruck className="w-5 h-5" />, t: "دفع عند الاستلام" },
                { ic: <IcShield className="w-5 h-5" />, t: `ضمان ${p.warranty}` },
                { ic: <IcArrowBack className="w-5 h-5" />, t: "استبدال 14 يوم" },
              ].map((x) => (
                <div key={x.t} className="py-5 px-2 text-ink/70">
                  <span className="grid place-items-center text-olive">{x.ic}</span>
                  <p className="text-[0.62rem] font-bold mt-2">{x.t}</p>
                </div>
              ))}
            </div>

            {/* المواصفات */}
            <dl className="mt-8 hairline-t">
              {[
                ["الخامة", p.material], ["الإضاءة", `${p.brightness} · ${p.lightTemp}`],
                ["الارتفاع", p.height], ["الوزن", p.weight], ["الضمان", p.warranty],
              ].map(([k, v]) => (
                <div key={k} className="hairline-b flex justify-between py-3 text-sm">
                  <dt className="font-bold text-mute">{k}</dt>
                  <dd className="font-extrabold">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* منتجات ذات صلة */}
        <section className="mt-20 md:mt-28">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">تكمل الإضاءة</h2>
            <a href="#/products" className="tl text-sm font-bold hidden sm:inline-flex">عرض الكل<IcArrowBack className="w-4 h-4 rotate-180" /></a>
          </div>
          <CardGrid items={relatedAll} />
        </section>
      </div>

      {video && <VideoModal src={p.image} title={p.name} onClose={() => setVideo(false)} />}
    </div>
  );
}
