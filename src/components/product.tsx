import { useState } from "react";
import type { Product } from "../lib/data";
import { fmtIQD } from "../lib/data";
import { navigate, useStore } from "../lib/state";
import { Badge, Price, Swatches } from "./ui";
import { ICompare, ICheck, IBag } from "./icons";

/** بطاقة المنتج — صورة مربعة 1:1 هي البطل */
export function ProductCard({ p, index, bordered = false, dark = false }: { p: Product; index?: number; bordered?: boolean; dark?: boolean }) {
  const { compare, toggleCompare, addToCart } = useStore();
  const [color, setColor] = useState(p.colors[0]);
  const inCompare = compare.includes(p.id);

  return (
    <article className={`group/pc flex flex-col ${bordered ? "border border-line bg-surface" : ""}`}>
      <div className={`relative overflow-hidden ${bordered ? "" : "bg-[#F1EEE7]"}`}>
        <button type="button" onClick={() => navigate(`/product/${p.id}`)} className="block w-full cursor-pointer" aria-label={p.name}>
          <span className="relative block aspect-square overflow-hidden">
            <img src={p.img} alt={p.name} loading="lazy" className="pcard-img absolute inset-0 w-full h-full object-cover" />
            <img src={p.altImg} alt="" aria-hidden loading="lazy" className="pcard-alt absolute inset-0 w-full h-full object-cover" />
          </span>
        </button>

        {/* الشارات */}
        <div className="absolute top-3 right-3 flex flex-col items-start gap-1.5">
          {p.badge && <Badge kind={p.badge} />}
        </div>

        {/* مقارنة — تظهر عند التحويم */}
        <button
          type="button"
          onClick={() => toggleCompare(p.id)}
          className={`absolute top-3 left-3 grid place-items-center w-9 h-9 transition-all duration-300 ${
            inCompare
              ? "bg-olive text-paper opacity-100"
              : `bg-surface/90 text-ink opacity-0 group-hover/pc:opacity-100 focus:opacity-100 hover:bg-surface`
          }`}
          aria-label={inCompare ? "إزالة من المقارنة" : "أضف إلى المقارنة"}
          title="مقارنة"
        >
          {inCompare ? <ICheck className="w-4 h-4" /> : <ICompare className="w-4 h-4" />}
        </button>

        {/* إضافة سريعة */}
        <button
          type="button"
          onClick={() => addToCart(p, color, p.sizes[0], 1)}
          className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-2 bg-ink/90 text-paper text-xs font-medium py-3 translate-y-full group-hover/pc:translate-y-0 transition-transform duration-400 hover:bg-olive"
        >
          <IBag className="w-4 h-4" />
          إضافة سريعة — {fmtIQD(p.price)}
        </button>
      </div>

      <div className={`pt-4 flex flex-col gap-2 ${bordered ? "p-4 pt-4" : ""}`}>
        {typeof index === "number" && (
          <span className={`font-display text-sm ${dark ? "text-olive" : "text-olive"}`}>{String(index + 1).padStart(2, "0")}</span>
        )}
        <button type="button" onClick={() => navigate(`/product/${p.id}`)} className={`text-right font-medium text-[0.95rem] leading-snug hover:text-olive transition-colors ${dark ? "text-paper" : "text-ink"}`}>
          {p.name}
        </button>
        <div className="flex items-center justify-between gap-3">
          <Price price={p.price} oldPrice={p.oldPrice} size="sm" dark={dark} />
          <Swatches colors={p.colors} hex={p.colorHex} active={color} onPick={setColor} size="sm" />
        </div>
        <p className={`text-[0.7rem] ${dark ? "text-sand/70" : "text-mute"}`}>
          {p.charging === "قابل للشحن" ? "قابل للشحن · USB-C" : "يعمل بالكهرباء مباشرة"}
        </p>
      </div>
    </article>
  );
}

/** صف أفقي قابل للتمرير */
export function ProductRow({ items, bordered = false, dark = false }: { items: Product[]; bordered?: boolean; dark?: boolean }) {
  return (
    <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0 snap-x">
      {items.map((p, i) => (
        <div key={p.id} className="min-w-[240px] sm:min-w-[270px] snap-start">
          <ProductCard p={p} index={i} bordered={bordered} dark={dark} />
        </div>
      ))}
    </div>
  );
}

/** شبكة منتجات */
export function ProductGrid({ items, cols = 4, bordered = false }: { items: Product[]; cols?: 3 | 4; bordered?: boolean }) {
  return (
    <div className={`grid gap-x-6 gap-y-12 grid-cols-2 ${cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-3"}`}>
      {items.map((p, i) => (
        <ProductCard key={p.id} p={p} index={bordered ? undefined : i} bordered={bordered} />
      ))}
    </div>
  );
}
