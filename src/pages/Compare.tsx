import { fmt } from "../data";
import { useStore } from "../store";
import { Eyebrow, IcArrow, IcCompare, IcX, Reveal } from "../ui";
import React from "react";

export default function Compare() {
  const { compare, toggleCompare, products, addToCart } = useStore();
  const list = compare.map((id) => products.find((p) => p.id === id)!).filter(Boolean);
  const rest = products.filter((p) => !compare.includes(p.id));

  if (list.length === 0)
    return (
      <div className="page-in max-w-[1440px] mx-auto px-5 py-24 md:py-32 text-center">
        <IcCompare className="w-10 h-10 mx-auto text-sand" strokeWidth={1.2} />
        <h1 className="font-display font-bold text-4xl md:text-6xl mt-6 text-ink">لا شيء للمقارنة بعد</h1>
        <p className="text-mute font-bold text-sm mt-4">أضف حتى 4 مصابيح من صفحات المنتجات — بالضغط على أيقونة المقارنة.</p>
        <a href="#/products" className="inline-flex items-center gap-2 bg-ink text-paper text-[0.78rem] font-bold px-8 h-12 mt-10 hover:bg-olive transition-colors">
          تصفح المصابيح
          <IcArrow className="w-4 h-4" />
        </a>
      </div>
    );

  const rows: { label: string; render: (p: (typeof list)[number]) => React.ReactNode }[] = [
    { label: "السعر", render: (p) => <span className="num font-extrabold text-base">{fmt(p.price)}{p.oldPrice && <span className="block text-[0.65rem] text-mute line-through num font-bold">{fmt(p.oldPrice)}</span>}</span> },
    { label: "الألوان", render: (p) => (
        <span className="flex flex-wrap items-center gap-1.5 justify-center">
          {p.colors.map((c) => <span key={c.name} title={c.name} className="w-4 h-4 rounded-full border border-ink/15" style={{ background: c.hex }} />)}
        </span>
      ) },
    { label: "المقاسات", render: (p) => p.sizes.join(" · ") },
    { label: "التشغيل", render: (p) => (p.charging === "rechargeable" ? "قابل للشحن" : "بالكهرباء مباشرة") },
    { label: "البطارية", render: (p) => <span className="num">{p.battery}</span> },
    { label: "الإضاءة", render: (p) => <span className="num">{p.brightness} · {p.lightTemp}</span> },
    { label: "الخامة", render: (p) => p.material },
    { label: "الارتفاع", render: (p) => <span className="num">{p.height}</span> },
    { label: "الوزن", render: (p) => <span className="num">{p.weight}</span> },
    { label: "الضمان", render: (p) => p.warranty },
    { label: "التوفر", render: (p) => (p.stock > 0 ? <span className="text-olive font-bold">{p.stock <= 5 ? `باقي ${p.stock} فقط` : "متوفر"}</span> : <span className="text-[#b0563f] font-bold">نفدت الكمية</span>) },
  ];

  return (
    <div className="page-in">
      <section className="hairline-b bg-sand/25">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-12 md:py-16">
          <Eyebrow>أداة المقارنة</Eyebrow>
          <h1 className="font-display font-bold text-4xl md:text-6xl mt-3 text-ink">قارن المصابيح</h1>
          <p className="text-[0.78rem] font-bold text-mute mt-3 num">{list.length} من 4 منتجات — اسحب الجدول يمينًا ويسارًا على الموبايل</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 md:px-8 py-10 md:py-14">
        <Reveal className="overflow-x-auto no-scrollbar border border-line bg-surface">
          <table className="w-full text-sm border-collapse" style={{ minWidth: `${200 + list.length * 240}px` }}>
            <thead>
              <tr>
                <th className="sticky right-0 bg-paper z-10 border-e border-line p-4 w-[130px] text-start text-[0.7rem] font-bold text-mute align-bottom">المقارنة</th>
                {list.map((p) => (
                  <th key={p.id} className="p-5 border-e border-line last:border-e-0 align-top w-[240px]">
                    <div className="flex justify-end">
                      <button onClick={() => toggleCompare(p.id)} className="text-mute hover:text-[#b0563f] transition-colors" aria-label={`إزالة ${p.name}`}>
                        <IcX className="w-4 h-4" />
                      </button>
                    </div>
                    <a href={`#/product/${p.id}`} className="imgz block aspect-square bg-[#f1eee6] border border-line/70 mb-4">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </a>
                    <a href={`#/product/${p.id}`} className="font-display font-bold text-xl text-ink hover:text-olive transition-colors">{p.name}</a>
                    <p className="text-[0.65rem] font-bold text-mute mt-1">{p.category}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.label} className={i % 2 ? "bg-paper/60" : ""}>
                  <th className="sticky right-0 bg-paper z-10 border-e border-line p-4 text-start text-[0.7rem] font-bold text-mute">{r.label}</th>
                  {list.map((p) => (
                    <td key={p.id} className="p-4 text-center font-bold text-ink border-e border-line last:border-e-0">{r.render(p)}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <th className="sticky right-0 bg-paper z-10 border-e border-line p-4" />
                {list.map((p) => (
                  <td key={p.id} className="p-4 text-center border-e border-line last:border-e-0">
                    <button
                      onClick={() => addToCart(p, p.colors[0].name, p.sizes[0], 1)}
                      disabled={p.stock <= 0}
                      className="bg-ink text-paper text-[0.7rem] font-bold px-6 h-10 hover:bg-olive transition-colors disabled:opacity-40 disabled:pointer-events-none"
                    >
                      {p.stock > 0 ? "أضف إلى السلة" : "نفدت الكمية"}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-10">
            <p className="text-[0.7rem] font-bold text-mute mb-4">أضف منتجًا آخر للمقارنة:</p>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {rest.map((p) => (
                <button key={p.id} onClick={() => toggleCompare(p.id)} className="flex items-center gap-3 shrink-0 border border-line bg-surface hover:border-olive transition-colors px-3 py-2.5">
                  <span className="imgz w-11 h-11 bg-[#f1eee6]"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /></span>
                  <span className="text-start">
                    <span className="block text-[0.75rem] font-bold">{p.name}</span>
                    <span className="block text-[0.62rem] font-bold text-mute num">{fmt(p.price)}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
