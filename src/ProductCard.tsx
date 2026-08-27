import { Product, discountPct, fmt } from "./data";
import { useStore } from "./store";
import { IcCompare } from "./ui";

export default function ProductCard({ p, delay = 0 }: { p: Product; delay?: number }) {
  const { toggleCompare, compare, addToCart, cart } = useStore();
  const inCompare = compare.includes(p.id);
  const out = p.stock <= 0;
  const pct = discountPct(p);
  const inCartQty = cart.filter((i) => i.id === p.id).reduce((s, i) => s + i.qty, 0);
  const maxAdd = Math.max(0, p.stock - inCartQty);

  return (
    <div className="group flex flex-col" style={{ transitionDelay: `${delay}ms` }}>
      <div className="relative">
        <a href={`#/product/${p.id}`} className="imgz block aspect-square bg-[#f1eee6] border border-line/70">
          <img src={p.image} alt={p.name} loading="lazy" className={`w-full h-full object-cover ${out ? "opacity-50 grayscale" : ""}`} />
          {/* شريط إضافة سريعة */}
          {!out && (
            <span className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-ink text-paper text-[0.72rem] font-bold py-3 text-center">
              {maxAdd > 0 ? "إضافة سريعة للسلة" : "الحد الأقصى في السلة"}
            </span>
          )}
        </a>

        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
          {p.isNew && !out && <span className="bg-ink text-paper text-[0.6rem] font-bold px-2 py-1">جديد</span>}
          {pct > 0 && !out && <span className="bg-olive text-white text-[0.6rem] font-bold px-2 py-1 num">خصم {pct}٪</span>}
          {out && <span className="bg-sand text-ink text-[0.6rem] font-bold px-2 py-1">نفدت الكمية</span>}
        </div>

        <button
          onClick={() => toggleCompare(p.id)}
          aria-label="أضف إلى المقارنة"
          title="مقارنة"
          className={`absolute top-2.5 left-2.5 w-8 h-8 grid place-items-center border transition-all duration-300 ${
            inCompare ? "bg-olive border-olive text-white" : "bg-surface/90 border-line text-ink/60 hover:border-ink hover:text-ink"
          }`}
        >
          <IcCompare className="w-4 h-4" />
        </button>

        {!out && maxAdd > 0 && (
          <button
            onClick={() => addToCart(p, p.colors[0].name, p.sizes[0], 1)}
            className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-10"
            aria-label={`أضف ${p.name} إلى السلة`}
          />
        )}
      </div>

      <div className="pt-4 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <a href={`#/product/${p.id}`} className="font-display font-semibold text-lg text-ink hover:text-olive transition-colors leading-snug">
            {p.name}
          </a>
          <div className="flex items-center gap-1.5 pt-2">
            {p.colors.map((c) => (
              <span key={c.name} title={c.name} className="w-2.5 h-2.5 rounded-full border border-ink/15" style={{ background: c.hex }} />
            ))}
          </div>
        </div>
        <p className="text-[0.68rem] font-bold text-mute">{p.category} · {p.charging === "rechargeable" ? "قابل للشحن" : "بالكهرباء"}</p>
        <p className="text-sm font-extrabold text-ink num mt-1">
          {fmt(p.price)}
          {p.oldPrice && <span className="text-mute font-bold line-through text-xs ms-2 num">{fmt(p.oldPrice)}</span>}
        </p>
      </div>
    </div>
  );
}
