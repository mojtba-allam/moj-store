import { SEED_SUPPLIERS, productById, waLink } from "../data";
import { IcWhatsApp } from "../ui";

const commTone = {
  "ممتاز": "bg-olive/15 text-olive",
  "جيد": "bg-sand/60 text-ink",
  "بانتظار رد": "bg-[#b0563f]/12 text-[#b0563f]",
} as const;

export default function Suppliers() {
  return (
    <div className="page-in space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl md:text-4xl">الموردون</h1>
        <p className="text-[0.72rem] font-bold text-mute mt-1.5 num">{SEED_SUPPLIERS.length} مورد — الكميات المطلوبة تُحدد يدويًا (المنطق الآلي لاحقًا)</p>
      </div>

      <div className="grid xl:grid-cols-2 gap-4">
        {SEED_SUPPLIERS.map((s) => (
          <div key={s.id} className="bg-surface border border-line p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl">{s.name}</h2>
                <p className="text-[0.68rem] font-bold text-mute mt-1">{s.contact}</p>
                <p className="text-[0.68rem] font-bold num mt-0.5" dir="ltr">{s.phone}</p>
              </div>
              <span className={`px-2.5 py-1 text-[0.62rem] font-bold ${commTone[s.comm]}`}>التواصل: {s.comm}</span>
            </div>

            <p className="text-[0.68rem] font-bold text-mute bg-paper border border-line px-3.5 py-2.5 mt-4">{s.notes}</p>

            <table className="w-full text-[0.7rem] font-bold mt-5">
              <thead>
                <tr className="text-mute text-[0.6rem] border-b border-line">
                  <th className="text-start py-2 font-bold">المنتج</th>
                  <th className="text-start font-bold">المورّد سابقًا</th>
                  <th className="text-start font-bold">المطلوب</th>
                  <th className="text-start font-bold">تم طلبه</th>
                </tr>
              </thead>
              <tbody>
                {s.products.map((sp) => {
                  const p = productById(sp.productId);
                  return (
                    <tr key={sp.productId} className="border-b border-line/70 last:border-0">
                      <td className="py-2.5 whitespace-nowrap">{p?.name ?? sp.productId}</td>
                      <td className="num">{sp.suppliedQty}</td>
                      <td className="num">{sp.requestedQty || "—"}</td>
                      <td className="num">{sp.orderedQty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <a
              href={waLink(`مرحبًا ${s.contact}، بخصوص توريد منتجات مشكاة: ${s.products.map((sp) => productById(sp.productId)?.name).join("، ")}.`)}
              target="_blank" rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 border border-line px-4 py-2.5 text-[0.68rem] font-bold hover:border-olive hover:text-olive transition-colors"
            >
              <IcWhatsApp className="w-4 h-4" />
              طلب توريد عبر واتساب
            </a>
          </div>
        ))}
      </div>

      <div className="bg-sand/35 border border-line p-5 text-[0.68rem] font-bold text-mute leading-6">
        ملاحظة: عمود «المطلوب» يُدخل يدويًا حاليًا — منطق احتساب الكمية المطلوبة من المورد سيُضاف في مرحلة لاحقة، والواجهة جاهزة لاستقباله.
      </div>
    </div>
  );
}
