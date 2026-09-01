import { useMemo, useState } from "react";
import { StoreLayout } from "../components/chrome";
import { Reveal, navigate, useStore } from "../lib/state";
import { GOVERNORATES, ORDER_STATUSES, FINAL_STATUSES, fmtIQD, waLink } from "../lib/data";
import type { Order, OrderStatus } from "../lib/data";
import { OutlineBtn, SolidBtn } from "../components/ui";
import { ICheck, IWhatsapp, IArrow, IClock, ITag } from "../components/icons";

const todayISO = () => new Date().toISOString().slice(0, 10);

/* ================================================================== */
/*  الدفع — كضيف، قصير جدًا                                              */
/* ================================================================== */
export function CheckoutPage() {
  const { cart, products, coupons, addOrder, setCoupons, setProducts, clearCart } = useStore();

  const detailed = cart
    .map((c) => ({ ...c, product: products.find((p) => p.id === c.productId) }))
    .filter((c) => c.product);

  const subtotal = detailed.reduce((s, c) => s + (c.product!.price * c.qty), 0);

  const [form, setForm] = useState({ name: "", phone: "", gov: "", area: "", landmark: "", notes: "" });
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const gov = GOVERNORATES.find((g) => g.name === form.gov);
  const shipping = gov ? gov.shipping : 0;
  const discount = appliedCoupon && subtotal >= (coupons.find((c) => c.code === appliedCoupon.code)?.minOrder ?? 0)
    ? Math.round((subtotal * appliedCoupon.percent) / 100)
    : 0;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const c = coupons.find((x) => x.code.toUpperCase() === code);
    if (!c || !c.active) { setCouponError("كوبون غير صالح"); setAppliedCoupon(null); return; }
    if (subtotal < c.minOrder) { setCouponError(`يعمل هذا الكوبون للطلبات فوق ${fmtIQD(c.minOrder)}`); setAppliedCoupon(null); return; }
    setCouponError("");
    setAppliedCoupon({ code: c.code, percent: c.percent });
  };

  const submit = () => {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs.name = "أدخل الاسم الكامل";
    if (!/^07\d{9}$/.test(form.phone.trim())) errs.phone = "رقم عراقي صحيح: 07XXXXXXXXX";
    if (!form.gov) errs.gov = "اختر المحافظة";
    if (form.area.trim().length < 2) errs.area = "أدخل المنطقة";
    if (form.landmark.trim().length < 2) errs.landmark = "أدخل أقرب نقطة دالة";
    setErrors(errs);
    if (Object.keys(errs).length > 0 || detailed.length === 0) return;

    const id = String(Math.floor(100000 + Math.random() * 900000));
    const order: Order = {
      id, name: form.name.trim(), phone: form.phone.trim(), governorate: form.gov,
      area: form.area.trim(), landmark: form.landmark.trim(), notes: form.notes.trim() || undefined,
      items: detailed.map((c) => ({ productId: c.productId, name: c.product!.name, img: c.product!.img, color: c.color, size: c.size, qty: c.qty, price: c.product!.price })),
      subtotal, discount, coupon: appliedCoupon?.code, shipping, total,
      status: "جديد", date: todayISO(), timeline: [{ status: "جديد", date: todayISO() }],
    };
    addOrder(order);
    // تحديث المخزون والمبيعات
    setProducts((prev) => prev.map((p) => {
      const q = detailed.filter((c) => c.productId === p.id).reduce((s, c) => s + c.qty, 0);
      return q ? { ...p, stock: Math.max(0, p.stock - q), sold: p.sold + q } : p;
    }));
    if (appliedCoupon) setCoupons((prev) => prev.map((c) => (c.code === appliedCoupon.code ? { ...c, used: c.used + 1 } : c)));
    clearCart();
    navigate(`/order/${id}`);
  };

  if (detailed.length === 0) {
    return (
      <StoreLayout title="إتمام الطلب" crumb="الرئيسية / الدفع">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <p className="font-display text-3xl">لا يوجد ما تدفعه بعد</p>
          <div className="mt-6 flex justify-center"><SolidBtn onClick={() => navigate("/products")}>تسوّق أولًا</SolidBtn></div>
        </div>
      </StoreLayout>
    );
  }

  const field = (key: keyof typeof form, label: string, required = true, placeholder = "", type = "text") => (
    <div>
      <label className="block text-xs font-semibold mb-2">
        {label} {required && <span className="text-olive">*</span>}
      </label>
      {key === "gov" ? (
        <select value={form.gov} onChange={(e) => setForm({ ...form, gov: e.target.value })} className="field cursor-pointer">
          <option value="">اختر المحافظة…</option>
          {GOVERNORATES.map((g) => (
            <option key={g.name} value={g.name}>{g.name} — توصيل {fmtIQD(g.shipping)}</option>
          ))}
        </select>
      ) : key === "notes" ? (
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder={placeholder} rows={3} className="field resize-none" />
      ) : (
        <input type={type} dir={key === "phone" ? "ltr" : "rtl"} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className={`field ${key === "phone" ? "text-left" : ""}`} />
      )}
      {errors[key] && <p className="mt-1.5 text-[0.68rem] text-red-700">{errors[key]}</p>}
    </div>
  );

  return (
    <StoreLayout title="إتمام الطلب" sub="الشراء كضيف — بلا تسجيل. املأ بيانات التوصيل فقط." crumb="الرئيسية / السلة / الدفع">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        {/* النموذج */}
        <div className="space-y-10">
          <Reveal className="bg-surface border border-line p-6 md:p-8 space-y-5">
            <div className="flex items-center gap-3">
              <span className="font-display text-olive text-xl">٠١</span>
              <h2 className="font-display font-bold text-2xl">بيانات التوصيل</h2>
            </div>
            {field("name", "الاسم الكامل", true, "مثال: علي أحمد الكرخي")}
            {field("phone", "رقم الموبايل", true, "07XX XXX XXXX", "tel")}
            <div className="grid sm:grid-cols-2 gap-5">
              {field("gov", "المحافظة")}
              {field("area", "المنطقة / القضاء", true, "مثال: المنصور")}
            </div>
            {field("landmark", "أقرب نقطة دالة", true, "مثال: قرب مجمع المنصور مول")}
            {field("notes", "ملاحظات (اختياري)", false, "أي تفاصيل تساعد الموصّل")}
          </Reveal>

          <Reveal className="bg-surface border border-line p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="font-display text-olive text-xl">٠٢</span>
              <h2 className="font-display font-bold text-2xl">طريقة الدفع</h2>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4 border border-olive/40 bg-olive/5 px-5 py-4">
              <span className="flex items-center gap-3 text-sm font-semibold">
                <ICheck className="w-5 h-5 text-olive" /> الدفع نقدًا عند الاستلام
              </span>
              <span className="text-[0.65rem] text-mute">الطريقة الوحيدة المتاحة</span>
            </div>
          </Reveal>
        </div>

        {/* الملخص */}
        <aside className="bg-surface border border-line p-6 md:p-8 lg:sticky lg:top-32">
          <h2 className="font-display font-bold text-2xl">طلبك</h2>
          <div className="mt-5 space-y-4 max-h-64 overflow-y-auto no-scrollbar">
            {detailed.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="relative shrink-0">
                  <img src={c.product!.img} alt="" className="w-14 h-14 object-cover bg-[#F1EEE7]" />
                  <span className="absolute -top-2 -left-2 w-5 h-5 grid place-items-center bg-ink text-paper text-[0.6rem] rounded-full">{c.qty}</span>
                </span>
                <span className="flex-1 min-w-0 text-xs">
                  <span className="block font-medium truncate">{c.product!.name}</span>
                  <span className="block text-mute mt-0.5">{c.color} · {c.size}</span>
                </span>
                <span className="text-xs font-semibold shrink-0">{fmtIQD(c.product!.price * c.qty)}</span>
              </div>
            ))}
          </div>

          {/* كوبون */}
          <div className="mt-6 pt-5 hairline-t">
            <label className="block text-xs font-semibold mb-2">كوبون الخصم</label>
            <div className="flex gap-2">
              <input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="مثال: NUUR10" className="field" dir="ltr" style={{ textAlign: "left" }} />
              <button onClick={applyCoupon} className="shrink-0 bg-ink text-paper px-5 text-xs font-semibold hover:bg-olive transition-colors">تطبيق</button>
            </div>
            {couponError && <p className="mt-1.5 text-[0.68rem] text-red-700">{couponError}</p>}
            {appliedCoupon && !couponError && <p className="mt-1.5 text-[0.68rem] text-olive flex items-center gap-1"><ITag className="w-3 h-3" />طُبّق كوبون {appliedCoupon.code} — خصم {appliedCoupon.percent}٪</p>}
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-mute">المجموع الفرعي</span><span>{fmtIQD(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-olive"><span>الخصم ({appliedCoupon?.code})</span><span>-{fmtIQD(discount)}</span></div>}
            <div className="flex justify-between"><span className="text-mute">التوصيل {form.gov && `— ${form.gov}`}</span><span>{gov ? fmtIQD(shipping) : "اختر المحافظة"}</span></div>
          </div>
          <div className="mt-5 pt-5 hairline-t flex justify-between items-baseline">
            <span className="font-semibold">الإجمالي</span>
            <span className="font-display font-bold text-3xl">{fmtIQD(total)}</span>
          </div>
          <div className="mt-6">
            <SolidBtn full onClick={submit}>تأكيد الطلب <IArrow className="w-4 h-4" /></SolidBtn>
          </div>
          <p className="mt-3 text-[0.68rem] text-mute text-center">بتأكيدك توافق على سياسة الاستبدال خلال 7 أيام</p>
        </aside>
      </div>
    </StoreLayout>
  );
}

/* ================================================================== */
/*  نجاح الطلب                                                          */
/* ================================================================== */
export function OrderSuccessPage({ id }: { id: string }) {
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);

  const waMsg = useMemo(() => {
    if (!order) return "";
    const lines = [
      `مرحبًا، أريد الاستفسار عن طلبي رقم #${order.id}`,
      "",
      `الاسم: ${order.name}`,
      `المحافظة: ${order.governorate} — ${order.area}`,
      `الإجمالي: ${fmtIQD(order.total)}`,
      "المنتجات:",
      ...order.items.map((i) => `• ${i.name} (${i.color}/${i.size}) ×${i.qty}`),
    ];
    return lines.join("\n");
  }, [order]);

  return (
    <StoreLayout crumb="الرئيسية / الطلب">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
        <Reveal>
          <span className="mx-auto w-20 h-20 grid place-items-center border-2 border-olive text-olive">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-9 h-9">
              <path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl mt-8 leading-[1.25]">تم تسجيل طلبك بنجاح</h1>
          <p className="mt-4 text-sm text-mute leading-7">سنتصل بك خلال ساعات لتأكيد الطلب. الدفع نقدًا عند الاستلام.</p>

          <div className="mt-8 inline-flex items-baseline gap-3 bg-surface border border-line px-8 py-5">
            <span className="text-xs text-mute">رقم الطلب</span>
            <span className="font-display font-bold text-3xl text-ink" dir="ltr">#{id}</span>
          </div>

          {order && (
            <div className="mt-6 text-xs text-mute">
              {order.items.length} منتج · {order.governorate} · الإجمالي <span className="font-semibold text-ink">{fmtIQD(order.total)}</span>
            </div>
          )}

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <SolidBtn onClick={() => navigate(`/track/${id}`)}>متابعة الطلب</SolidBtn>
            <OutlineBtn href={waLink(waMsg)} className="!gap-2">
              <IWhatsapp className="w-4 h-4 text-olive" /> التواصل عبر واتساب
            </OutlineBtn>
          </div>
          <p className="mt-6 text-[0.68rem] text-mute">رسالة الواتساب ستُملأ تلقائيًا بتفاصيل طلبك</p>
        </Reveal>
      </div>
    </StoreLayout>
  );
}

/* ================================================================== */
/*  تتبّع الطلب                                                          */
/* ================================================================== */
export function TrackPage({ presetId }: { presetId?: string }) {
  const { orders } = useStore();
  const [oid, setOid] = useState(presetId ?? "");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<Order | null | "notfound">(presetId ? null : null);
  const [searched, setSearched] = useState(false);

  const search = () => {
    setSearched(true);
    const o = orders.find((x) => x.id === oid.trim().replace("#", "") && x.phone === phone.trim());
    setResult(o ?? "notfound");
  };

  const order = result && result !== "notfound" ? result : null;
  const isFinal = order && (FINAL_STATUSES as readonly string[]).includes(order.status);

  const statusIndex = order ? ORDER_STATUSES.indexOf(order.status as (typeof ORDER_STATUSES)[number]) : -1;

  return (
    <StoreLayout title="تتبّع الطلب" sub="أدخل رقم الطلب ورقم الموبايل الذي سجلت به — بلا حساب وبلا تسجيل." crumb="الرئيسية / تتبّع">
      <div className="max-w-3xl mx-auto px-4 md:px-8 pb-10">
        <Reveal className="bg-surface border border-line p-6 md:p-8">
          <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold mb-2">رقم الطلب</label>
              <input value={oid} onChange={(e) => setOid(e.target.value)} placeholder="384721" className="field" dir="ltr" style={{ textAlign: "left" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2">رقم الموبايل</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XXXXXXXXX" className="field" dir="ltr" style={{ textAlign: "left" }} />
            </div>
            <SolidBtn onClick={search}>تتبّع</SolidBtn>
          </div>
          <p className="mt-4 text-[0.68rem] text-mute">للتجربة: رقم الطلب <span dir="ltr" className="font-semibold">384721</span> والموبايل <span dir="ltr" className="font-semibold">07701234567</span></p>
        </Reveal>

        {searched && result === "notfound" && (
          <div className="mt-8 border border-line bg-sand/25 p-6 text-center">
            <p className="font-medium text-sm">لم نجد طلبًا بهذا الرقم والموبايل</p>
            <p className="text-xs text-mute mt-2">تأكد من الرقمين، أو راسلنا عبر واتساب وسنساعدك فورًا.</p>
            <div className="mt-4 flex justify-center">
              <OutlineBtn href={waLink("مرحبًا، أحتاج مساعدة في تتبّع طلبي")}>مساعدة عبر واتساب</OutlineBtn>
            </div>
          </div>
        )}

        {order && (
          <Reveal className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-4 hairline-b pb-6">
              <div>
                <p className="text-xs text-mute">الطلب</p>
                <p className="font-display font-bold text-2xl" dir="ltr">#{order.id}</p>
              </div>
              <div className="text-left">
                <p className="text-xs text-mute">الحالة الحالية</p>
                <StatusPill status={order.status} />
              </div>
            </div>

            {/* الخط الزمني */}
            {isFinal ? (
              <div className="mt-10 border border-line bg-sand/20 p-6">
                <p className="font-display font-bold text-2xl">الطلب {order.status}</p>
                <p className="text-sm text-mute mt-2 leading-7">
                  لأي استفسار أو ترتيب طلب جديد، راسلنا عبر واتساب بذكر رقم الطلب <span dir="ltr">#{order.id}</span>.
                </p>
                <div className="mt-5">
                  <OutlineBtn href={waLink(`مرحبًا، طلبي رقم #${order.id} حالته ${order.status}، أريد الاستفسار`)}>
                    <IWhatsapp className="w-4 h-4" /> طلب إلغاء / إرجاع / استبدال عبر واتساب
                  </OutlineBtn>
                </div>
              </div>
            ) : (
              <ol className="mt-10 relative">
                <span className="absolute top-2 bottom-2 right-[9px] w-px bg-line" aria-hidden />
                {ORDER_STATUSES.map((s, i) => {
                  const done = i <= statusIndex;
                  const current = i === statusIndex;
                  const step = order.timeline.find((t) => t.status === s);
                  return (
                    <li key={s} className="relative flex gap-5 pb-9 last:pb-0">
                      <span className={`relative z-10 mt-0.5 w-5 h-5 shrink-0 grid place-items-center rounded-full border-2 transition-colors ${
                        done ? "bg-olive border-olive text-paper" : "bg-paper border-line text-transparent"
                      } ${current ? "ring-4 ring-olive/15" : ""}`}>
                        {done ? <ICheck className="w-3 h-3" /> : <IClock className="w-3 h-3" />}
                      </span>
                      <span className="flex-1 flex flex-wrap items-baseline justify-between gap-2">
                        <span>
                          <span className={`block font-medium text-sm ${done ? "text-ink" : "text-mute"}`}>{s}</span>
                          {current && <span className="block text-[0.68rem] text-olive mt-0.5">الحالة الحالية</span>}
                        </span>
                        {step && <span className="text-[0.68rem] text-mute" dir="ltr">{step.date}</span>}
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}

            {/* تفاصيل الطلب */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="bg-surface border border-line p-6">
                <h3 className="text-xs font-semibold text-mute mb-4">المنتجات</h3>
                <div className="space-y-4">
                  {order.items.map((it, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={it.img} alt="" className="w-12 h-12 object-cover bg-[#F1EEE7]" />
                      <span className="flex-1 text-xs"><span className="block font-medium">{it.name}</span><span className="text-mute">{it.color} · {it.size} ×{it.qty}</span></span>
                      <span className="text-xs font-semibold">{fmtIQD(it.price * it.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 hairline-t space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-mute">الفرعي</span><span>{fmtIQD(order.subtotal)}</span></div>
                  {order.discount > 0 && <div className="flex justify-between text-olive"><span>خصم {order.coupon}</span><span>-{fmtIQD(order.discount)}</span></div>}
                  <div className="flex justify-between"><span className="text-mute">التوصيل</span><span>{fmtIQD(order.shipping)}</span></div>
                  <div className="flex justify-between font-bold text-sm pt-2"><span>الإجمالي</span><span>{fmtIQD(order.total)}</span></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-surface border border-line p-6 text-sm space-y-2">
                  <h3 className="text-xs font-semibold text-mute mb-3">التوصيل إلى</h3>
                  <p className="font-medium">{order.name}</p>
                  <p className="text-xs text-mute">{order.governorate} — {order.area}</p>
                  <p className="text-xs text-mute">أقرب نقطة: {order.landmark}</p>
                  <p className="text-xs" dir="ltr">{order.phone}</p>
                </div>
                <div className="border border-line p-6">
                  <h3 className="text-xs font-semibold text-mute mb-3">تحتاج تغييرًا على الطلب؟</h3>
                  <OutlineBtn full href={waLink(`مرحبًا، أريد طلب إلغاء / إرجاع / استبدال للطلب رقم #${order.id}`)}>
                    طلب إلغاء / إرجاع / استبدال عبر واتساب
                  </OutlineBtn>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </StoreLayout>
  );
}

export function StatusPill({ status }: { status: OrderStatus }) {
  const final = (FINAL_STATUSES as readonly string[]).includes(status);
  const cls = final ? "bg-mute text-paper" : status === "تم التسليم" ? "bg-olive text-paper" : "bg-ink text-paper";
  return <span className={`inline-block text-[0.68rem] font-semibold px-3 py-1.5 ${cls}`}>{status}</span>;
}
