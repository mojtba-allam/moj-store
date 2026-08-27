import { fmt } from "../data";
import { useStore } from "../store";
import { IcMinus, IcPlus } from "../ui";

/* ---------------- المنتجات ---------------- */
export function AdminProducts() {
  const { products } = useStore();
  return (
    <div className="page-in space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl md:text-4xl">المنتجات</h1>
        <p className="text-[0.72rem] font-bold text-mute mt-1.5 num">{products.length} موديل — بلا SKU، الألوان والمقاسات داخل كل منتج</p>
      </div>
      <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
        <table className="w-full text-[0.75rem] font-bold min-w-[860px]">
          <thead>
            <tr className="text-mute text-[0.62rem] border-b border-line bg-paper/60">
              {["المنتج", "الفئة", "السعر", "قبل الخصم", "التشغيل", "شارات", "الألوان", "مباع"].map((h) => (
                <th key={h} className="text-start px-4 py-3.5 font-bold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-line/70 last:border-0 hover:bg-paper/50 transition-colors">
                <td className="px-4 py-3.5">
                  <a href={`#/product/${p.id}`} className="flex items-center gap-3 hover:text-olive transition-colors">
                    <span className="w-12 h-12 imgz bg-[#f1eee6] border border-line/60 shrink-0"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /></span>
                    <span>{p.name}</span>
                  </a>
                </td>
                <td className="px-4 py-3.5 text-mute whitespace-nowrap">{p.category}</td>
                <td className="px-4 py-3.5 num whitespace-nowrap">{fmt(p.price)}</td>
                <td className="px-4 py-3.5 num whitespace-nowrap text-mute">{p.oldPrice ? fmt(p.oldPrice) : "—"}</td>
                <td className="px-4 py-3.5 whitespace-nowrap">{p.charging === "rechargeable" ? "قابل للشحن" : "بالكهرباء"}</td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="flex gap-1.5">
                    {p.isNew && <span className="bg-ink text-paper text-[0.58rem] px-1.5 py-0.5">جديد</span>}
                    {p.isBestSeller && <span className="bg-olive/15 text-olive text-[0.58rem] px-1.5 py-0.5">الأكثر مبيعًا</span>}
                    {p.oldPrice && <span className="bg-sand text-[0.58rem] px-1.5 py-0.5">عرض</span>}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="flex gap-1">
                    {p.colors.map((c) => <span key={c.name} title={c.name} className="w-4 h-4 rounded-full border border-ink/15" style={{ background: c.hex }} />)}
                  </span>
                </td>
                <td className="px-4 py-3.5 num whitespace-nowrap">{p.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- المخزون ---------------- */
const stockState = (stock: number) =>
  stock === 0
    ? { l: "نفدت الكمية", c: "bg-[#b0563f]/15 text-[#b0563f]" }
    : stock <= 5
    ? { l: "منخفض", c: "bg-olive/15 text-olive" }
    : { l: "متوفر", c: "bg-sand/60 text-ink" };

export function AdminInventory() {
  const { products, setStock, toast } = useStore();
  const total = products.reduce((s, p) => s + p.stock, 0);
  const sold = products.reduce((s, p) => s + p.sold, 0);

  return (
    <div className="page-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl">المخزون</h1>
          <p className="text-[0.72rem] font-bold text-mute mt-1.5">مخزن واحد — الدقي · بلا SKU · الحد الأقصى للشراء = المخزون الحالي</p>
        </div>
        <div className="flex gap-6 text-[0.7rem] font-bold">
          <span>الرصيد الحالي: <span className="num text-ink text-base">{total}</span></span>
          <span>المباع إجمالًا: <span className="num text-olive text-base">{sold}</span></span>
        </div>
      </div>

      <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
        <table className="w-full text-[0.75rem] font-bold min-w-[760px]">
          <thead>
            <tr className="text-mute text-[0.62rem] border-b border-line bg-paper/60">
              {["المنتج", "المتاح الآن", "المباع", "حالة المخزون", "تعديل الرصيد"].map((h) => (
                <th key={h} className="text-start px-4 py-3.5 font-bold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const st = stockState(p.stock);
              return (
                <tr key={p.id} className="border-b border-line/70 last:border-0 hover:bg-paper/50 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-3">
                      <span className="w-11 h-11 imgz bg-[#f1eee6] border border-line/60 shrink-0"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /></span>
                      <span className="whitespace-nowrap">{p.name}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3.5 num text-base">{p.stock}</td>
                  <td className="px-4 py-3.5 num text-mute">{p.sold}</td>
                  <td className="px-4 py-3.5"><span className={`px-2.5 py-1 text-[0.62rem] ${st.c}`}>{st.l}</span></td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-2">
                      <button onClick={() => { setStock(p.id, p.stock - 1); }} disabled={p.stock === 0}
                        className="w-8 h-8 grid place-items-center border border-line hover:border-ink transition-colors disabled:opacity-30" aria-label="إنقاص">
                        <IcMinus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        value={p.stock}
                        onChange={(e) => setStock(p.id, parseInt(e.target.value) || 0)}
                        className="num w-16 h-8 text-center bg-paper border border-line text-[0.75rem] font-bold"
                        inputMode="numeric"
                      />
                      <button onClick={() => { setStock(p.id, p.stock + 1); toast(`تم تحديث مخزون «${p.name}»`); }}
                        className="w-8 h-8 grid place-items-center border border-line hover:border-olive hover:text-olive transition-colors" aria-label="زيادة">
                        <IcPlus className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[0.65rem] font-bold text-mute">التعديل ينعكس فورًا على متجر العميل — الكمية في صفحة المنتج هي الحد الأقصى المسموح بشرائه.</p>
    </div>
  );
}
