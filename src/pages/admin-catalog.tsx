import { useState } from "react";
import { AdminLayout } from "./admin-core";
import { Reveal, useStore } from "../lib/state";
import { IMG, fmtIQD, fmtNum } from "../lib/data";
import type { Product, Supplier } from "../lib/data";
import { Modal, SolidBtn } from "../components/ui";
import { IEdit, ITrash, IPlus, IMinus, IUsers, IPhone } from "../components/icons";

const IMAGE_OPTIONS = [
  { key: "luna", label: "مصباح قبة — كريمي" },
  { key: "nimra", label: "مصباح ذراع — زيتوني" },
  { key: "qamar", label: "مصباح محمول — رملي" },
  { key: "rawda", label: "مصباح كتان — بيج" },
  { key: "ward", label: "كرة زجاجية — كهرماني" },
  { key: "siraj", label: "شريط خشبي — جوزي" },
  { key: "desk", label: "لايف ستايل — مكتب" },
  { key: "living", label: "لايف ستايل — معيشة" },
  { key: "glow", label: "تفاصيل — توهج" },
] as const;

/* ================================================================== */
/*  المنتجات — إضافة وتعديل                                             */
/* ================================================================== */
type Draft = {
  name: string; type: Product["type"]; price: string; oldPrice: string;
  charging: Product["charging"]; colors: string; sizes: string; stock: string;
  badge: string; img: string; desc: string;
};

const emptyDraft: Draft = {
  name: "", type: "مكتبي", price: "", oldPrice: "", charging: "يعمل مباشرة بالكهرباء",
  colors: "كريمي, أسود", sizes: "وسط", stock: "20", badge: "", img: IMG.luna, desc: "",
};

export function ProductsAdminPage() {
  const { products, setProducts, toast } = useStore();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);

  const openNew = () => { setEditId(null); setDraft(emptyDraft); setOpen(true); };
  const openEdit = (p: Product) => {
    setEditId(p.id);
    setDraft({
      name: p.name, type: p.type, price: String(p.price), oldPrice: p.oldPrice ? String(p.oldPrice) : "",
      charging: p.charging, colors: p.colors.join(", "), sizes: p.sizes.join(", "),
      stock: String(p.stock), badge: p.badge ?? "", img: p.img, desc: p.desc,
    });
    setOpen(true);
  };

  const save = () => {
    if (draft.name.trim().length < 2 || !draft.price || Number(draft.price) <= 0) {
      toast("أكمل اسم المنتج والسعر أولًا");
      return;
    }
    const colors = draft.colors.split(",").map((s) => s.trim()).filter(Boolean);
    const sizes = draft.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    const badge = (draft.badge || undefined) as Product["badge"];
    const price = Number(draft.price);
    const oldPrice = draft.oldPrice ? Number(draft.oldPrice) : undefined;

    if (editId) {
      setProducts((prev) => prev.map((p) => p.id === editId ? {
        ...p, name: draft.name.trim(), type: draft.type, price, oldPrice, charging: draft.charging,
        colors, sizes, stock: Number(draft.stock) || 0, badge, img: draft.img, desc: draft.desc.trim() || p.desc,
        colorHex: Object.fromEntries(colors.map((c) => [c, p.colorHex[c] ?? "#D8D1C3"])),
      } : p));
      toast(`تم حفظ تعديلات «${draft.name}»`);
    } else {
      const id = `p${Date.now()}`;
      const newP: Product = {
        id, name: draft.name.trim(), type: draft.type, price, oldPrice, img: draft.img,
        altImg: IMG.glow, gallery: [draft.img, IMG.glow, IMG.desk], hasVideo: true,
        colors: colors.length ? colors : ["كريمي"],
        colorHex: Object.fromEntries((colors.length ? colors : ["كريمي"]).map((c) => [c, "#D8D1C3"])),
        sizes: sizes.length ? sizes : ["وسط"], charging: draft.charging, badge,
        isNew: true, stock: Number(draft.stock) || 0, sold: 0,
        desc: draft.desc.trim() || "منتج جديد في مشكاة.",
        features: [{ label: "النوع", value: draft.type }, { label: "التشغيل", value: draft.charging }],
      };
      setProducts((prev) => [newP, ...prev]);
      toast(`أُضيف «${draft.name}» إلى المتجر`);
    }
    setOpen(false);
  };

  const remove = (p: Product) => {
    setProducts((prev) => prev.filter((x) => x.id !== p.id));
    toast(`حُذف «${p.name}» من المتجر`);
  };

  return (
    <AdminLayout
      title="المنتجات"
      actions={
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-ink text-paper px-4 py-2 text-xs font-semibold hover:bg-olive transition-colors">
          <IPlus className="w-3.5 h-3.5" /> إضافة منتج
        </button>
      }
    >
      <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[780px] text-xs">
          <thead>
            <tr className="hairline-b text-mute text-right">
              {["المنتج", "النوع", "السعر", "المخزون", "المبيعات", "الشارة", "التشغيل", ""].map((h) => (
                <th key={h} className="px-4 py-3.5 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-paper transition-colors">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-3">
                    <img src={p.img} alt="" className="w-11 h-11 object-cover bg-paper shrink-0" />
                    <span className="font-medium">{p.name}</span>
                  </span>
                </td>
                <td className="px-4 py-3 text-mute">{p.type}</td>
                <td className="px-4 py-3 font-semibold whitespace-nowrap">{fmtIQD(p.price)}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3 text-mute">{fmtNum(p.sold)}</td>
                <td className="px-4 py-3">{p.badge ? <span className="bg-sand/50 px-2 py-1 text-[0.65rem] font-semibold">{p.badge}</span> : <span className="text-mute">—</span>}</td>
                <td className="px-4 py-3 text-mute whitespace-nowrap">{p.charging === "قابل للشحن" ? "شحن USB" : "كهرباء"}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1">
                    <button onClick={() => openEdit(p)} className="p-2 hover:bg-sand/40 transition-colors" aria-label="تعديل"><IEdit className="w-4 h-4" /></button>
                    <button onClick={() => remove(p)} className="p-2 hover:bg-sand/40 text-mute hover:text-ink transition-colors" aria-label="حذف"><ITrash className="w-4 h-4" /></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? "تعديل المنتج" : "إضافة منتج جديد"}>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-xs font-semibold mb-1.5">اسم المنتج *</span>
              <input className="field" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="مثال: بدر — مصباح القراءة" />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold mb-1.5">الوصف القصير</span>
              <input className="field" value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} placeholder="جملة واحدة تسوّق المنتج" />
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <label className="block">
              <span className="block text-xs font-semibold mb-1.5">النوع</span>
              <select className="field cursor-pointer" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as Product["type"] })}>
                {["مكتبي", "طاولة", "قابل للشحن"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-semibold mb-1.5">التشغيل</span>
              <select className="field cursor-pointer" value={draft.charging} onChange={(e) => setDraft({ ...draft, charging: e.target.value as Product["charging"] })}>
                {["يعمل مباشرة بالكهرباء", "قابل للشحن"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-semibold mb-1.5">السعر (د.ع) *</span>
              <input type="number" className="field" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} placeholder="45000" />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold mb-1.5">سعر قبل الخصم</span>
              <input type="number" className="field" value={draft.oldPrice} onChange={(e) => setDraft({ ...draft, oldPrice: e.target.value })} placeholder="اختياري" />
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <label className="block">
              <span className="block text-xs font-semibold mb-1.5">الألوان (مفصولة بفاصلة)</span>
              <input className="field" value={draft.colors} onChange={(e) => setDraft({ ...draft, colors: e.target.value })} />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold mb-1.5">القياسات</span>
              <input className="field" value={draft.sizes} onChange={(e) => setDraft({ ...draft, sizes: e.target.value })} />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold mb-1.5">الشارة</span>
              <select className="field cursor-pointer" value={draft.badge} onChange={(e) => setDraft({ ...draft, badge: e.target.value })}>
                <option value="">بدون</option>
                {["جديد", "الأكثر مبيعًا", "خصم"].map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="block text-xs font-semibold mb-1.5">المخزون الابتدائي</span>
            <input type="number" className="field" value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: e.target.value })} />
          </label>
          <div>
            <span className="block text-xs font-semibold mb-2">الصورة (1:1)</span>
            <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
              {IMAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setDraft({ ...draft, img: IMG[opt.key] })}
                  className={`relative aspect-square border-2 transition-all ${draft.img === IMG[opt.key] ? "border-olive" : "border-line hover:border-sand"}`}
                  title={opt.label}
                >
                  <img src={IMG[opt.key]} alt={opt.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setOpen(false)} className="px-6 py-3 text-xs font-semibold text-mute hover:text-ink transition-colors">إلغاء</button>
            <SolidBtn onClick={save}>{editId ? "حفظ التعديلات" : "إضافة المنتج"}</SolidBtn>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

/* ================================================================== */
/*  المخزون — مخزن واحد                                                 */
/* ================================================================== */
export function InventoryPage() {
  const { products, setProducts, toast } = useStore();
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const totalSold = products.reduce((s, p) => s + p.sold, 0);

  const adjust = (id: string, delta: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)));
  };
  const restock = (p: Product) => {
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, stock: x.stock + 25 } : x)));
    toast(`أُضيفت 25 قطعة إلى مخزون «${p.name}»`);
  };

  const status = (p: Product) =>
    p.stock === 0 ? { t: "نفد", cls: "bg-ink text-paper" } : p.stock <= 10 ? { t: "منخفض", cls: "bg-sand/70 text-ink" } : { t: "متوفر", cls: "bg-olive/15 text-olive" };

  return (
    <AdminLayout
      title="المخزون"
      actions={<span className="text-[0.68rem] text-mute">مخزن واحد — بغداد · {fmtNum(totalStock)} قطعة · {fmtNum(totalSold)} مبيعة</span>}
    >
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { l: "إجمالي القطع", v: fmtNum(totalStock) },
          { l: "منخفض (≤ 10)", v: fmtNum(products.filter((p) => p.stock <= 10 && p.stock > 0).length) },
          { l: "نافد", v: fmtNum(products.filter((p) => p.stock === 0).length) },
        ].map((k) => (
          <div key={k.l} className="bg-surface border border-line p-4 text-center">
            <p className="font-display font-bold text-2xl">{k.v}</p>
            <p className="text-[0.65rem] text-mute mt-1">{k.l}</p>
          </div>
        ))}
      </div>
      <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[760px] text-xs">
          <thead>
            <tr className="hairline-b text-mute text-right">
              {["المنتج", "الكمية المتاحة", "المباع", "الرصيد الحالي", "الحالة", "تعديل سريع", ""].map((h) => (
                <th key={h} className="px-4 py-3.5 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => {
              const s = status(p);
              return (
                <tr key={p.id} className="hover:bg-paper transition-colors">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-3">
                      <img src={p.img} alt="" className="w-11 h-11 object-cover bg-paper shrink-0" />
                      <span>
                        <span className="block font-medium">{p.name}</span>
                        <span className="block text-[0.65rem] text-mute mt-0.5">{p.type}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3">{fmtNum(p.stock)}</td>
                  <td className="px-4 py-3 text-mute">{fmtNum(p.sold)}</td>
                  <td className="px-4 py-3 font-bold">{fmtNum(p.stock)}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 text-[0.65rem] font-bold ${s.cls}`}>{s.t}</span></td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 border border-line">
                      <button onClick={() => adjust(p.id, -1)} className="w-8 h-8 grid place-items-center hover:bg-sand/40 transition-colors" aria-label="إنقاص"><IMinus className="w-3.5 h-3.5" /></button>
                      <span className="w-8 text-center font-semibold">{p.stock}</span>
                      <button onClick={() => adjust(p.id, 1)} className="w-8 h-8 grid place-items-center hover:bg-sand/40 transition-colors" aria-label="زيادة"><IPlus className="w-3.5 h-3.5" /></button>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => restock(p)} className="text-[0.68rem] font-semibold text-olive hover:text-ink underline underline-offset-4 transition-colors">رفد +25</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[0.68rem] text-mute leading-6">لا يوجد حد أقصى ثابت للطلب — الكمية المتاحة للعميل تساوي الرصيد الحالي فقط، وتُخصم تلقائيًا عند تأكيد الطلب.</p>
    </AdminLayout>
  );
}

/* ================================================================== */
/*  الموردون — إضافة وتعديل                                             */
/* ================================================================== */
type SupDraft = {
  name: string; contact: string; phone: string; city: string; notes: string;
  commStatus: Supplier["commStatus"];
  products: { name: string; requested: string; ordered: string }[];
};

const emptySup: SupDraft = {
  name: "", contact: "", phone: "", city: "بغداد", notes: "", commStatus: "نشط",
  products: [{ name: "", requested: "0", ordered: "0" }],
};

export function SuppliersPage() {
  const { suppliers, setSuppliers, toast } = useStore();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<SupDraft>(emptySup);

  const openNew = () => { setEditId(null); setDraft(emptySup); setOpen(true); };
  const openEdit = (s: Supplier) => {
    setEditId(s.id);
    setDraft({
      name: s.name, contact: s.contact, phone: s.phone, city: s.city, notes: s.notes, commStatus: s.commStatus,
      products: s.products.map((p) => ({ name: p.name, requested: String(p.requested), ordered: String(p.ordered) })),
    });
    setOpen(true);
  };

  const save = () => {
    if (draft.name.trim().length < 2) { toast("أدخل اسم المورد أولًا"); return; }
    const products = draft.products
      .filter((p) => p.name.trim())
      .map((p) => ({ name: p.name.trim(), requested: Number(p.requested) || 0, ordered: Number(p.ordered) || 0 }));
    if (editId) {
      setSuppliers((prev) => prev.map((s) => s.id === editId ? { ...s, ...draft, name: draft.name.trim(), products } : s));
      toast(`تم حفظ تعديلات «${draft.name}»`);
    } else {
      setSuppliers((prev) => [{ id: `s${Date.now()}`, ...draft, name: draft.name.trim(), products, lastOrder: undefined }, ...prev]);
      toast(`أُضيف المورد «${draft.name}»`);
    }
    setOpen(false);
  };

  const remove = (s: Supplier) => {
    setSuppliers((prev) => prev.filter((x) => x.id !== s.id));
    toast(`حُذف المورد «${s.name}»`);
  };

  const commCls = (s: Supplier["commStatus"]) =>
    s === "نشط" ? "bg-olive/15 text-olive" : s === "بانتظار الرد" ? "bg-sand/70 text-ink" : "bg-mute/20 text-mute";

  return (
    <AdminLayout
      title="الموردون"
      actions={
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-ink text-paper px-4 py-2 text-xs font-semibold hover:bg-olive transition-colors">
          <IPlus className="w-3.5 h-3.5" /> إضافة مورد
        </button>
      }
    >
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {suppliers.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 70}>
            <div className="bg-surface border border-line p-6 h-full flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <span className="flex items-center gap-3">
                  <span className="w-10 h-10 grid place-items-center bg-ink text-paper"><IUsers className="w-4 h-4" /></span>
                  <span>
                    <span className="block font-semibold text-sm">{s.name}</span>
                    <span className="block text-[0.65rem] text-mute mt-0.5">{s.city} · {s.contact}</span>
                  </span>
                </span>
                <span className={`text-[0.62rem] font-bold px-2 py-1 shrink-0 ${commCls(s.commStatus)}`}>{s.commStatus}</span>
              </div>

              <div className="mt-4 space-y-1.5 text-[0.7rem] text-mute">
                <p className="flex items-center gap-2"><IPhone className="w-3.5 h-3.5" /><span dir="ltr">{s.phone}</span></p>
                {s.lastOrder && <p>آخر طلبية: <span dir="ltr">{s.lastOrder}</span></p>}
              </div>

              {/* منتجات المورد */}
              <div className="mt-4 hairline-t pt-4 flex-1">
                <table className="w-full text-[0.68rem]">
                  <thead>
                    <tr className="text-mute text-right">
                      <th className="pb-2 font-medium">المنتج</th>
                      <th className="pb-2 font-medium">مطلوب</th>
                      <th className="pb-2 font-medium">مُورَّد</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {s.products.map((p) => (
                      <tr key={p.name}>
                        <td className="py-2 font-medium">{p.name}</td>
                        <td className="py-2">{fmtNum(p.requested)}</td>
                        <td className={`py-2 ${p.ordered < p.requested ? "text-olive font-bold" : ""}`}>{fmtNum(p.ordered)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {s.notes && <p className="mt-3 text-[0.68rem] text-mute bg-paper border border-line p-2.5 leading-5">{s.notes}</p>}

              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => openEdit(s)} className="flex-1 inline-flex items-center justify-center gap-2 border border-line py-2 text-[0.68rem] font-semibold hover:border-ink transition-colors">
                  <IEdit className="w-3.5 h-3.5" /> تعديل
                </button>
                <button onClick={() => remove(s)} className="p-2 border border-line text-mute hover:text-ink hover:border-ink transition-colors" aria-label="حذف المورد">
                  <ITrash className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 bg-sand/25 border border-sand/70 p-4 text-[0.7rem] text-mute leading-6">
        <span className="font-semibold text-ink">ملاحظة:</span> كمية الطلب من كل مورد تُحدَّد يدويًا في هذا الإصدار — منطق الاقتراح التلقائي للكميات سيُطوّر لاحقًا، والواجهة جاهزة لاستقباله.
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? "تعديل المورد" : "إضافة مورد جديد"}>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block"><span className="block text-xs font-semibold mb-1.5">اسم المورد *</span><input className="field" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></label>
            <label className="block"><span className="block text-xs font-semibold mb-1.5">الشخص المسؤول</span><input className="field" value={draft.contact} onChange={(e) => setDraft({ ...draft, contact: e.target.value })} /></label>
            <label className="block"><span className="block text-xs font-semibold mb-1.5">الهاتف</span><input className="field" dir="ltr" style={{ textAlign: "left" }} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></label>
            <label className="block"><span className="block text-xs font-semibold mb-1.5">المدينة</span><input className="field" value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} /></label>
            <label className="block sm:col-span-2"><span className="block text-xs font-semibold mb-1.5">حالة التواصل</span>
              <select className="field cursor-pointer" value={draft.commStatus} onChange={(e) => setDraft({ ...draft, commStatus: e.target.value as Supplier["commStatus"] })}>
                {["نشط", "بانتظار الرد", "معلّق"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">المنتجات والكميات</span>
              <button type="button" onClick={() => setDraft({ ...draft, products: [...draft.products, { name: "", requested: "0", ordered: "0" }] })} className="text-[0.68rem] font-semibold text-olive hover:text-ink flex items-center gap-1">
                <IPlus className="w-3 h-3" /> سطر
              </button>
            </div>
            <div className="space-y-2">
              {draft.products.map((p, i) => (
                <div key={i} className="grid grid-cols-[1fr_72px_72px_36px] gap-2 items-center">
                  <input className="field !py-2 text-xs" placeholder="اسم المنتج" value={p.name} onChange={(e) => setDraft({ ...draft, products: draft.products.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)) })} />
                  <input type="number" className="field !py-2 text-xs" title="الكمية المطلوبة" value={p.requested} onChange={(e) => setDraft({ ...draft, products: draft.products.map((x, j) => (j === i ? { ...x, requested: e.target.value } : x)) })} />
                  <input type="number" className="field !py-2 text-xs" title="الكمية الموردة" value={p.ordered} onChange={(e) => setDraft({ ...draft, products: draft.products.map((x, j) => (j === i ? { ...x, ordered: e.target.value } : x)) })} />
                  <button type="button" onClick={() => setDraft({ ...draft, products: draft.products.filter((_, j) => j !== i) })} className="p-2 text-mute hover:text-ink transition-colors" aria-label="حذف السطر"><ITrash className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[0.62rem] text-mute">الأعمدة: المنتج · الكمية المطلوبة · الكمية المورَّدة فعليًا</p>
          </div>

          <label className="block"><span className="block text-xs font-semibold mb-1.5">ملاحظات</span><textarea rows={2} className="field resize-none" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></label>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setOpen(false)} className="px-6 py-3 text-xs font-semibold text-mute hover:text-ink transition-colors">إلغاء</button>
            <SolidBtn onClick={save}>{editId ? "حفظ التعديلات" : "إضافة المورد"}</SolidBtn>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
