import { useState } from "react";
import { IMG, Product, fmt } from "../data";
import { useStore } from "../store";
import { ConfirmBtn, IcMinus, IcPlus, IcX, Modal } from "../ui";

const field = "w-full h-11 px-3.5 bg-paper border border-line text-[0.75rem] font-bold placeholder:text-mute/60 transition-shadow";
const lbl = "block text-[0.62rem] font-bold text-mute mb-1.5";

/* ---------------- مفتاح تبديل ---------------- */
function Switch({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex items-center justify-between w-full border px-4 py-3 transition-colors ${on ? "border-olive bg-olive/10" : "border-line hover:border-mute"}`}>
      <span className="text-[0.7rem] font-bold">{label}</span>
      <span className={`relative w-10 h-5 border transition-colors shrink-0 ${on ? "bg-olive border-olive" : "bg-surface border-line"}`}>
        <span className={`absolute top-0 w-4 h-4 bg-surface transition-all ${on ? "right-0.5" : "right-[calc(100%-1.125rem)]"}`} />
      </span>
    </button>
  );
}

/* ---------------- نموذج المنتج (إضافة / تعديل) ---------------- */
export function ProductForm({ initial, onClose }: { initial: Product | null; onClose: () => void }) {
  const { upsertProduct, toast } = useStore();
  const isNew = !initial;
  const [err, setErr] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [f, setF] = useState<Product>(() =>
    initial
      ? { ...initial, colors: initial.colors.map((c) => ({ ...c })), sizes: [...initial.sizes] }
      : {
          id: "", name: "", category: "مكتبية", price: 0, image: IMG.p1,
          colors: [{ name: "أسود", hex: "#2a2a28" }], sizes: ["وسط"],
          charging: "plug", stock: 10, sold: 0,
          tagline: "", material: "معدن مطلي بودرة", brightness: "500 لومن",
          lightTemp: "2700K دافئ", battery: "—", height: "30 سم", weight: "1 كجم", warranty: "سنة",
        }
  );

  const set = <K extends keyof Product>(k: K, v: Product[K]) => { setErr(""); setF((x) => ({ ...x, [k]: v })); };

  const addSize = () => {
    const s = sizeInput.trim();
    if (!s || f.sizes.includes(s)) return;
    set("sizes", [...f.sizes, s]);
    setSizeInput("");
  };

  const save = () => {
    if (!f.name.trim()) return setErr("اكتب اسم المنتج");
    if (!f.price || f.price <= 0) return setErr("أدخل سعرًا صحيحًا");
    if (f.oldPrice && f.oldPrice <= f.price) return setErr("سعر ما قبل الخصم يجب أن يكون أعلى من السعر الحالي");
    if (f.colors.length === 0 || f.colors.some((c) => !c.name.trim())) return setErr("لكل لون اسم واضح — لون واحد على الأقل");
    if (f.sizes.length === 0) return setErr("أضف مقاسًا واحدًا على الأقل");
    const id = f.id || `p-${Date.now().toString(36)}`;
    upsertProduct({
      ...f, id,
      name: f.name.trim(),
      tagline: f.tagline.trim() || "إضاءة صُنعت لتبقى.",
      oldPrice: f.oldPrice && f.oldPrice > f.price ? f.oldPrice : undefined,
      battery: f.charging === "plug" ? "—" : f.battery === "—" ? "10 ساعات" : f.battery,
    });
    toast(isNew ? `تمت إضافة «${f.name.trim()}» للمجموعة` : "تم حفظ تعديلات المنتج");
    onClose();
  };

  return (
    <Modal onClose={onClose} wide>
      <div className="p-6 md:p-8">
        <p className="text-[0.62rem] font-bold text-olive">إدارة المنتجات</p>
        <h2 className="font-display font-bold text-2xl md:text-3xl mt-1 mb-6">
          {isNew ? "منتج جديد" : `تعديل «${initial?.name}»`}
        </h2>

        {/* الهوية والصورة */}
        <div className="grid md:grid-cols-[240px_1fr] gap-6">
          <div>
            <span className={lbl}>صورة المنتج (1:1)</span>
            <div className="imgz aspect-square bg-[#f1eee6] border border-line/70 mb-2">
              <img src={f.image} alt="معاينة" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {Object.values(IMG).map((src) => (
                <button key={src} type="button" onClick={() => set("image", src)}
                  className={`aspect-square border transition-all ${f.image === src ? "border-olive ring-1 ring-olive" : "border-line opacity-70 hover:opacity-100"}`}
                  aria-label="اختيار صورة">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <input value={f.image.startsWith("data:") ? "" : f.image} onChange={(e) => set("image", e.target.value)}
              placeholder="أو الصق رابط صورة…" className={`${field} mt-2 h-9`} dir="ltr" />
          </div>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={lbl}>اسم المنتج *</label>
                <input className={field} value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="مثال: هالة ٠٢" />
              </div>
              <div>
                <label className={lbl}>الفئة</label>
                <select className={field} value={f.category} onChange={(e) => set("category", e.target.value as Product["category"])}>
                  <option>مكتبية</option><option>طاولة</option><option>محمولة</option>
                </select>
              </div>
            </div>
            <div>
              <label className={lbl}>الوصف المختصر (Tagline)</label>
              <input className={field} value={f.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="جملة قصيرة تُعرض تحت الاسم" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={lbl}>السعر (د.ع) *</label>
                <input className={`${field} num`} inputMode="numeric" value={f.price || ""} onChange={(e) => set("price", parseInt(e.target.value) || 0)} />
              </div>
              <div>
                <label className={lbl}>قبل الخصم (اختياري)</label>
                <input className={`${field} num`} inputMode="numeric" value={f.oldPrice ?? ""} onChange={(e) => set("oldPrice", parseInt(e.target.value) || 0)} placeholder="—" />
              </div>
              <div>
                <label className={lbl}>الرصيد بالمخزن</label>
                <input className={`${field} num`} inputMode="numeric" value={f.stock} onChange={(e) => set("stock", Math.max(0, parseInt(e.target.value) || 0))} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Switch on={Boolean(f.isNew)} onClick={() => set("isNew", !f.isNew)} label="شارة «جديد» في الواجهة" />
              <Switch on={Boolean(f.isBestSeller)} onClick={() => set("isBestSeller", !f.isBestSeller)} label="ضمن «الأكثر مبيعًا»" />
            </div>
          </div>
        </div>

        {/* الألوان والمقاسات */}
        <div className="grid md:grid-cols-2 gap-6 mt-7">
          <div>
            <span className={lbl}>الألوان المتاحة *</span>
            <div className="space-y-2">
              {f.colors.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="color" value={c.hex}
                    onChange={(e) => set("colors", f.colors.map((x, xi) => (xi === i ? { ...x, hex: e.target.value } : x)))}
                    className="w-11 h-11 border border-line bg-surface p-1 cursor-pointer shrink-0" aria-label="درجة اللون" />
                  <input value={c.name} placeholder="اسم اللون"
                    onChange={(e) => set("colors", f.colors.map((x, xi) => (xi === i ? { ...x, name: e.target.value } : x)))}
                    className={field} />
                  <button type="button" disabled={f.colors.length <= 1}
                    onClick={() => set("colors", f.colors.filter((_, xi) => xi !== i))}
                    className="w-11 h-11 grid place-items-center border border-line text-mute hover:text-[#b0563f] hover:border-[#b0563f] transition-colors disabled:opacity-30 shrink-0"
                    aria-label="حذف اللون">
                    <IcX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => set("colors", [...f.colors, { name: "", hex: "#8a8f63" }])}
              className="mt-2 inline-flex items-center gap-1.5 text-[0.68rem] font-bold text-olive hover:text-ink transition-colors">
              <IcPlus className="w-3.5 h-3.5" /> إضافة لون
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <span className={lbl}>المقاسات المتاحة *</span>
              <div className="flex flex-wrap gap-2 mb-2">
                {f.sizes.map((s) => (
                  <span key={s} className="inline-flex items-center gap-2 bg-sand/50 border border-line px-3 py-1.5 text-[0.7rem] font-bold">
                    {s}
                    <button type="button" onClick={() => set("sizes", f.sizes.filter((x) => x !== s))} className="text-mute hover:text-[#b0563f]" aria-label={`حذف ${s}`}>
                      <IcX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {f.sizes.length === 0 && <span className="text-[0.65rem] font-bold text-[#b0563f]">لا توجد مقاسات</span>}
              </div>
              <div className="flex gap-2">
                <input className={field} value={sizeInput} onChange={(e) => setSizeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSize())} placeholder="مثال: كبير" />
                <button type="button" onClick={addSize} className="px-4 border border-line text-[0.68rem] font-bold hover:border-olive hover:text-olive transition-colors whitespace-nowrap">إضافة</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>التشغيل</label>
                <select className={field} value={f.charging}
                  onChange={(e) => {
                    const v = e.target.value as Product["charging"];
                    set("charging", v);
                    if (v === "rechargeable" && f.battery === "—") setF((x) => ({ ...x, battery: "10 ساعات" }));
                  }}>
                  <option value="plug">بالكهرباء مباشرة</option>
                  <option value="rechargeable">قابل للشحن</option>
                </select>
              </div>
              <div>
                <label className={lbl}>عمر البطارية</label>
                <input className={field} value={f.battery} onChange={(e) => set("battery", e.target.value)} disabled={f.charging === "plug"} placeholder="12 ساعة" />
              </div>
            </div>
          </div>
        </div>

        {/* المواصفات */}
        <div className="mt-7">
          <span className={lbl}>المواصفات (تظهر في صفحة المنتج وجدول المقارنة)</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              ["material", "الخامة"], ["brightness", "الإضاءة"], ["lightTemp", "حرارة اللون"],
              ["height", "الارتفاع"], ["weight", "الوزن"], ["warranty", "الضمان"],
            ].map(([k, l]) => (
              <div key={k}>
                <label className={lbl}>{l}</label>
                <input className={field} value={f[k as keyof Product] as string} onChange={(e) => set(k as keyof Product, e.target.value as never)} />
              </div>
            ))}
          </div>
        </div>

        {err && <p className="mt-5 text-[0.68rem] font-bold text-[#b0563f] bg-[#b0563f]/10 border border-[#b0563f]/30 px-4 py-2.5">{err}</p>}

        <div className="flex gap-3 mt-6">
          <button onClick={save} className="flex-1 h-12 bg-ink text-paper text-[0.75rem] font-bold hover:bg-olive transition-colors">
            {isNew ? "إضافة المنتج" : "حفظ التعديلات"}
          </button>
          <button onClick={onClose} className="px-6 h-12 border border-line text-[0.75rem] font-bold hover:border-ink transition-colors">إلغاء</button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------- المنتجات ---------------- */
export function AdminProducts() {
  const { products, removeProduct, toast } = useStore();
  const [form, setForm] = useState<{ open: boolean; product: Product | null }>({ open: false, product: null });

  return (
    <div className="page-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl">المنتجات</h1>
          <p className="text-[0.72rem] font-bold text-mute mt-1.5 num">{products.length} موديل — بلا SKU، الألوان والمقاسات داخل كل منتج</p>
        </div>
        <button onClick={() => setForm({ open: true, product: null })}
          className="inline-flex items-center gap-2 bg-ink text-paper text-[0.72rem] font-bold px-5 h-11 hover:bg-olive transition-colors">
          <IcPlus className="w-4 h-4" /> إضافة منتج
        </button>
      </div>

      <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
        <table className="w-full text-[0.75rem] font-bold min-w-[920px]">
          <thead>
            <tr className="text-mute text-[0.62rem] border-b border-line bg-paper/60">
              {["المنتج", "الفئة", "السعر", "قبل الخصم", "التشغيل", "شارات", "الألوان", "مباع", "إجراءات"].map((h) => (
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
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="flex gap-2">
                    <button onClick={() => setForm({ open: true, product: p })}
                      className="border border-line bg-surface px-3 py-1.5 text-[0.62rem] font-bold hover:border-olive hover:text-olive transition-colors">
                      تعديل
                    </button>
                    <ConfirmBtn onConfirm={() => { removeProduct(p.id); toast(`حُذف «${p.name}» من المتجر`); }} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[0.65rem] font-bold text-mute">الإضافة والتعديل والحذف تنعكس فورًا على كل صفحات المتجر والمقارنة والمخزون.</p>

      {form.open && <ProductForm initial={form.product} onClose={() => setForm({ open: false, product: null })} />}
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
  const [form, setForm] = useState<{ open: boolean; product: Product | null }>({ open: false, product: null });
  const total = products.reduce((s, p) => s + p.stock, 0);
  const sold = products.reduce((s, p) => s + p.sold, 0);

  return (
    <div className="page-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl">المخزون</h1>
          <p className="text-[0.72rem] font-bold text-mute mt-1.5">مخزن واحد — الكرادة، بغداد · بلا SKU · الحد الأقصى للشراء = المخزون الحالي</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-6 text-[0.7rem] font-bold">
            <span>الرصيد الحالي: <span className="num text-ink text-base">{total}</span></span>
            <span>المباع إجمالًا: <span className="num text-olive text-base">{sold}</span></span>
          </div>
          <button onClick={() => setForm({ open: true, product: null })}
            className="inline-flex items-center gap-2 bg-ink text-paper text-[0.72rem] font-bold px-5 h-11 hover:bg-olive transition-colors">
            <IcPlus className="w-4 h-4" /> إضافة منتج
          </button>
        </div>
      </div>

      <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
        <table className="w-full text-[0.75rem] font-bold min-w-[840px]">
          <thead>
            <tr className="text-mute text-[0.62rem] border-b border-line bg-paper/60">
              {["المنتج", "المتاح الآن", "المباع", "حالة المخزون", "تعديل الرصيد", ""].map((h, i) => (
                <th key={i} className="text-start px-4 py-3.5 font-bold whitespace-nowrap">{h}</th>
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
                      <button onClick={() => setStock(p.id, p.stock - 1)} disabled={p.stock === 0}
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
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <button onClick={() => setForm({ open: true, product: p })}
                      className="border border-line bg-surface px-3 py-1.5 text-[0.62rem] font-bold hover:border-olive hover:text-olive transition-colors">
                      تعديل المنتج
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[0.65rem] font-bold text-mute">التعديل ينعكس فورًا على متجر العميل — الكمية في صفحة المنتج هي الحد الأقصى المسموح بشرائه.</p>

      {form.open && <ProductForm initial={form.product} onClose={() => setForm({ open: false, product: null })} />}
    </div>
  );
}
