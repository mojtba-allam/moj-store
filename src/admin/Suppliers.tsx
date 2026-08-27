import { useState } from "react";
import { Supplier, waLink } from "../data";
import { useStore } from "../store";
import { ConfirmBtn, IcPlus, IcWhatsApp, IcX, Modal } from "../ui";

const field = "w-full h-11 px-3.5 bg-paper border border-line text-[0.75rem] font-bold placeholder:text-mute/60 transition-shadow";
const lbl = "block text-[0.62rem] font-bold text-mute mb-1.5";

const commTone = {
  "ممتاز": "bg-olive/15 text-olive",
  "جيد": "bg-sand/60 text-ink",
  "بانتظار رد": "bg-[#b0563f]/12 text-[#b0563f]",
} as const;

/* ---------------- نموذج المورد (إضافة / تعديل) ---------------- */
function SupplierForm({ initial, onClose }: { initial: Supplier | null; onClose: () => void }) {
  const { upsertSupplier, products, toast } = useStore();
  const isNew = !initial;
  const [err, setErr] = useState("");
  const [f, setF] = useState<Supplier>(() =>
    initial
      ? { ...initial, products: initial.products.map((p) => ({ ...p })) }
      : { id: "", name: "", contact: "", phone: "", notes: "", comm: "جيد", products: [] }
  );

  const set = <K extends keyof Supplier>(k: K, v: Supplier[K]) => { setErr(""); setF((x) => ({ ...x, [k]: v })); };

  const availableFor = (idx: number) =>
    products.filter((p) => !f.products.some((sp, i) => i !== idx && sp.productId === p.id));

  const save = () => {
    if (!f.name.trim()) return setErr("اكتب اسم المورد");
    if (!f.contact.trim()) return setErr("اكتب بيانات التواصل");
    if (f.products.some((sp) => !sp.productId)) return setErr("اختر منتجًا لكل سطر أو احذف السطر");
    const id = f.id || `s-${Date.now().toString(36)}`;
    upsertSupplier({ ...f, id, name: f.name.trim(), contact: f.contact.trim() });
    toast(isNew ? `تمت إضافة مورد «${f.name.trim()}»` : "تم حفظ تعديلات المورد");
    onClose();
  };

  return (
    <Modal onClose={onClose} wide>
      <div className="p-6 md:p-8">
        <p className="text-[0.62rem] font-bold text-olive">إدارة الموردين</p>
        <h2 className="font-display font-bold text-2xl md:text-3xl mt-1 mb-6">
          {isNew ? "مورد جديد" : `تعديل «${initial?.name}»`}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>اسم المورد *</label>
            <input className={field} value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="مثال: الشرق للإضاءة" />
          </div>
          <div>
            <label className={lbl}>الشخص المسؤول / وسيلة التواصل *</label>
            <input className={field} value={f.contact} onChange={(e) => set("contact", e.target.value)} placeholder="الاسم أو البريد" />
          </div>
          <div>
            <label className={lbl}>الهاتف / واتساب</label>
            <input className={`${field} num`} dir="ltr" value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="07xxxxxxxxx" />
          </div>
          <div>
            <label className={lbl}>حالة التواصل</label>
            <select className={field} value={f.comm} onChange={(e) => set("comm", e.target.value as Supplier["comm"])}>
              <option>ممتاز</option><option>جيد</option><option>بانتظار رد</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className={lbl}>ملاحظات</label>
          <textarea rows={2} className={`${field} h-auto py-3 resize-none`} value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="مواعيد التوريد، شروط الدفع…" />
        </div>

        {/* منتجات المورد */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className={lbl + " mb-0"}>المنتجات المورَّدة وكمياتها</span>
            <button type="button"
              onClick={() => set("products", [...f.products, { productId: "", suppliedQty: 0, requestedQty: 0, orderedQty: 0 }])}
              disabled={f.products.length >= products.length}
              className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold text-olive hover:text-ink transition-colors disabled:opacity-30">
              <IcPlus className="w-3.5 h-3.5" /> إضافة منتج
            </button>
          </div>

          {f.products.length === 0 && (
            <p className="text-[0.65rem] font-bold text-mute border border-dashed border-line px-4 py-5 text-center">لا توجد منتجات بعد — أضف أول منتج يورّده هذا المورد.</p>
          )}

          <div className="space-y-2.5">
            {f.products.map((sp, i) => {
              const opts = availableFor(i);
              return (
                <div key={i} className="border border-line bg-surface p-3">
                  <div className="flex gap-2 items-center">
                    <select className={field} value={sp.productId}
                      onChange={(e) => set("products", f.products.map((x, xi) => (xi === i ? { ...x, productId: e.target.value } : x)))}>
                      <option value="">اختر المنتج…</option>
                      {opts.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.category}</option>)}
                    </select>
                    <button type="button" onClick={() => set("products", f.products.filter((_, xi) => xi !== i))}
                      className="w-11 h-11 grid place-items-center border border-line text-mute hover:text-[#b0563f] hover:border-[#b0563f] transition-colors shrink-0" aria-label="حذف السطر">
                      <IcX className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[
                      ["suppliedQty", "المورَّد سابقًا"],
                      ["requestedQty", "المطلوب (يدوي)"],
                      ["orderedQty", "تم طلبه"],
                    ].map(([k, l]) => (
                      <div key={k}>
                        <label className={lbl}>{l}</label>
                        <input className={`${field} num`} inputMode="numeric"
                          value={sp[k as "suppliedQty"] || ""}
                          placeholder="0"
                          onChange={(e) =>
                            set("products", f.products.map((x, xi) =>
                              xi === i ? { ...x, [k]: Math.max(0, parseInt(e.target.value) || 0) } : x
                            ))
                          } />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 bg-sand/35 border border-line px-4 py-3 text-[0.62rem] font-bold text-mute">
          عمود «المطلوب» إدخال يدوي — منطق احتساب الكمية المطلوبة تلقائيًا سيُضاف لاحقًا دون تغيير هذه الواجهة.
        </div>

        {err && <p className="mt-4 text-[0.68rem] font-bold text-[#b0563f] bg-[#b0563f]/10 border border-[#b0563f]/30 px-4 py-2.5">{err}</p>}

        <div className="flex gap-3 mt-6">
          <button onClick={save} className="flex-1 h-12 bg-ink text-paper text-[0.75rem] font-bold hover:bg-olive transition-colors">
            {isNew ? "إضافة المورد" : "حفظ التعديلات"}
          </button>
          <button onClick={onClose} className="px-6 h-12 border border-line text-[0.75rem] font-bold hover:border-ink transition-colors">إلغاء</button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------- صفحة الموردين ---------------- */
export default function Suppliers() {
  const { suppliers, products, removeSupplier, toast } = useStore();
  const [form, setForm] = useState<{ open: boolean; supplier: Supplier | null }>({ open: false, supplier: null });

  return (
    <div className="page-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl">الموردون</h1>
          <p className="text-[0.72rem] font-bold text-mute mt-1.5 num">{suppliers.length} مورد — الكميات المطلوبة تُحدد يدويًا (المنطق الآلي لاحقًا)</p>
        </div>
        <button onClick={() => setForm({ open: true, supplier: null })}
          className="inline-flex items-center gap-2 bg-ink text-paper text-[0.72rem] font-bold px-5 h-11 hover:bg-olive transition-colors">
          <IcPlus className="w-4 h-4" /> إضافة مورد
        </button>
      </div>

      {suppliers.length === 0 && (
        <div className="bg-surface border border-dashed border-line p-14 text-center">
          <p className="font-display font-bold text-2xl text-ink">لا يوجد موردون بعد</p>
          <p className="text-[0.72rem] font-bold text-mute mt-2">أضف أول مورد لربط المنتجات بمصادر توريدها.</p>
        </div>
      )}

      <div className="grid xl:grid-cols-2 gap-4">
        {suppliers.map((s) => (
          <div key={s.id} className="bg-surface border border-line p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl">{s.name}</h2>
                <p className="text-[0.68rem] font-bold text-mute mt-1">{s.contact}</p>
                <p className="text-[0.68rem] font-bold num mt-0.5" dir="ltr">{s.phone || "—"}</p>
              </div>
              <span className={`px-2.5 py-1 text-[0.62rem] font-bold shrink-0 ${commTone[s.comm]}`}>التواصل: {s.comm}</span>
            </div>

            {s.notes && <p className="text-[0.68rem] font-bold text-mute bg-paper border border-line px-3.5 py-2.5 mt-4">{s.notes}</p>}

            <table className="w-full text-[0.7rem] font-bold mt-5">
              <thead>
                <tr className="text-mute text-[0.6rem] border-b border-line">
                  <th className="text-start py-2 font-bold">المنتج</th>
                  <th className="text-start font-bold">المورَّد سابقًا</th>
                  <th className="text-start font-bold">المطلوب</th>
                  <th className="text-start font-bold">تم طلبه</th>
                </tr>
              </thead>
              <tbody>
                {s.products.map((sp) => {
                  const p = products.find((x) => x.id === sp.productId);
                  return (
                    <tr key={sp.productId} className="border-b border-line/70 last:border-0">
                      <td className="py-2.5 whitespace-nowrap">{p?.name ?? "منتج محذوف"}</td>
                      <td className="num">{sp.suppliedQty}</td>
                      <td className="num">{sp.requestedQty || "—"}</td>
                      <td className="num">{sp.orderedQty}</td>
                    </tr>
                  );
                })}
                {s.products.length === 0 && (
                  <tr><td colSpan={4} className="py-3 text-mute">لا توجد منتجات مرتبطة</td></tr>
                )}
              </tbody>
            </table>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button onClick={() => setForm({ open: true, supplier: s })}
                className="border border-line px-4 py-2.5 text-[0.68rem] font-bold hover:border-olive hover:text-olive transition-colors">
                تعديل
              </button>
              {s.phone && s.phone.startsWith("01") && (
                <a
                  href={waLink(`مرحبًا ${s.contact}، بخصوص توريد منتجات مشكاة${s.products.length ? `: ${s.products.map((sp) => products.find((x) => x.id === sp.productId)?.name).filter(Boolean).join("، ")}` : ""}.`)}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-[0.68rem] font-bold hover:border-olive hover:text-olive transition-colors"
                >
                  <IcWhatsApp className="w-4 h-4" />
                  طلب توريد عبر واتساب
                </a>
              )}
              <span className="ms-auto">
                <ConfirmBtn onConfirm={() => { removeSupplier(s.id); toast(`حُذف المورد «${s.name}»`); }} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {form.open && <SupplierForm initial={form.supplier} onClose={() => setForm({ open: false, supplier: null })} />}
    </div>
  );
}
