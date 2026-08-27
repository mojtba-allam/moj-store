import { useMemo, useState } from "react";
import { GOVS, fmt } from "../data";
import { evalCoupon, genOrderNo, navigate, useStore } from "../store";
import { Eyebrow, IcArrow, IcCheck, IcTruck, Reveal } from "../ui";

export default function Checkout() {
  const { cart, products, subtotal, coupons, placeOrder, toast } = useStore();
  const [f, setF] = useState({ name: "", phone: "", gov: "", area: "", landmark: "", notes: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [code, setCode] = useState(() => localStorage.getItem("mishkat:coupon") ?? "");
  const [couponErr, setCouponErr] = useState("");
  const [busy, setBusy] = useState(false);

  const items = cart.map((i) => ({ ...i, p: products.find((p) => p.id === i.id)! })).filter((i) => i.p);
  const gov = GOVS.find((g) => g.name === f.gov);
  const couponRes = useMemo(() => (code ? evalCoupon(code, subtotal, coupons) : null), [code, subtotal, coupons]);
  const discount = couponRes?.ok ? couponRes.discount : 0;
  const total = subtotal - discount + (gov?.fee ?? 0);

  if (items.length === 0)
    return (
      <div className="page-in max-w-[1440px] mx-auto px-5 py-28 text-center">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-ink">السلة فارغة</h1>
        <a href="#/products" className="tl mt-8 text-sm font-bold">تصفح المصابيح<IcArrow className="w-4 h-4" /></a>
      </div>
    );

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((x) => ({ ...x, [k]: e.target.value }));
    setErrs((x) => ({ ...x, [k]: "" }));
  };

  const submit = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 5) e.name = "اكتب الاسم الكامل";
    if (!/^07[0-9]{9}$/.test(f.phone.trim())) e.phone = "رقم موبايل عراقي من 11 رقم يبدأ بـ 07";
    if (!f.gov) e.gov = "اختر المحافظة";
    if (f.area.trim().length < 2) e.area = "اكتب المنطقة";
    if (f.landmark.trim().length < 3) e.landmark = "اكتب أقرب نقطة دالة";
    setErrs(e);
    if (Object.keys(e).length) {
      toast("راجع البيانات المطلوبة");
      return;
    }
    setBusy(true);
    const no = genOrderNo();
    window.setTimeout(() => {
      placeOrder({
        no,
        name: f.name.trim(), phone: f.phone.trim(), gov: f.gov, area: f.area.trim(),
        landmark: f.landmark.trim(), notes: f.notes.trim() || undefined,
        items: items.map((i) => ({ id: i.p.id, name: i.p.name, image: i.p.image, color: i.color, size: i.size, qty: i.qty, price: i.p.price })),
        subtotal, discount, coupon: discount > 0 ? code.toUpperCase() : undefined,
        shipping: gov!.fee, total, status: "new", date: new Date().toISOString(),
      });
      localStorage.removeItem("mishkat:coupon");
      navigate(`/success/${no}`);
    }, 600);
  };

  const field = "w-full h-12 px-4 bg-surface border border-line text-sm font-bold placeholder:text-mute/60 placeholder:font-bold transition-shadow";

  return (
    <div className="page-in max-w-[1440px] mx-auto px-5 md:px-8 py-10 md:py-14">
      <Eyebrow>خطوة واحدة وتخلص</Eyebrow>
      <h1 className="font-display font-bold text-4xl md:text-5xl mt-3 mb-3 text-ink">إتمام الطلب</h1>
      <p className="text-[0.75rem] font-bold text-mute mb-10">بلا حسابات وبلا دفع مسبق — بيانات التوصيل فقط.</p>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
        {/* البيانات */}
        <Reveal className="bg-surface border border-line p-6 md:p-8">
          <h2 className="font-display font-bold text-2xl mb-6">بيانات التوصيل</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-[0.7rem] font-bold text-mute mb-2">الاسم الكامل *</label>
              <input className={field} value={f.name} onChange={set("name")} placeholder="مثال: سارة أحمد عبد الرحمن" />
              {errs.name && <p className="text-[0.65rem] font-bold text-[#b0563f] mt-1.5">{errs.name}</p>}
            </div>
            <div>
              <label className="block text-[0.7rem] font-bold text-mute mb-2">رقم الموبايل *</label>
              <input className={`${field} num`} dir="ltr" value={f.phone} onChange={set("phone")} placeholder="07xxxxxxxxx" inputMode="numeric" />
              {errs.phone && <p className="text-[0.65rem] font-bold text-[#b0563f] mt-1.5">{errs.phone}</p>}
            </div>
            <div>
              <label className="block text-[0.7rem] font-bold text-mute mb-2">المحافظة *</label>
              <select className={`${field} ${f.gov ? "" : "text-mute/60"}`} value={f.gov} onChange={set("gov")}>
                <option value="">اختر المحافظة</option>
                {GOVS.map((g) => (
                  <option key={g.name} value={g.name}>{g.name} — توصيل {fmt(g.fee)}</option>
                ))}
              </select>
              {errs.gov && <p className="text-[0.65rem] font-bold text-[#b0563f] mt-1.5">{errs.gov}</p>}
            </div>
            <div>
              <label className="block text-[0.7rem] font-bold text-mute mb-2">المنطقة *</label>
              <input className={field} value={f.area} onChange={set("area")} placeholder="المدينة / الحي" />
              {errs.area && <p className="text-[0.65rem] font-bold text-[#b0563f] mt-1.5">{errs.area}</p>}
            </div>
            <div>
              <label className="block text-[0.7rem] font-bold text-mute mb-2">أقرب نقطة دالة *</label>
              <input className={field} value={f.landmark} onChange={set("landmark")} placeholder="مول، صيدلية، محطة…" />
              {errs.landmark && <p className="text-[0.65rem] font-bold text-[#b0563f] mt-1.5">{errs.landmark}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[0.7rem] font-bold text-mute mb-2">ملاحظات <span className="text-mute/60">(اختياري)</span></label>
              <textarea rows={3} className={`${field} h-auto py-3 resize-none`} value={f.notes} onChange={set("notes")} placeholder="أي تفاصيل تساعد المندوب…" />
            </div>
          </div>

          {/* الدفع */}
          <div className="mt-8">
            <h3 className="text-[0.7rem] font-bold text-mute mb-3">طريقة الدفع</h3>
            <div className="flex items-center gap-4 border-2 border-olive bg-olive/10 px-5 py-4">
              <span className="w-5 h-5 grid place-items-center rounded-full bg-olive text-white"><IcCheck className="w-3 h-3" strokeWidth={2.5} /></span>
              <div>
                <p className="text-sm font-extrabold">الدفع عند الاستلام — كاش</p>
                <p className="text-[0.65rem] font-bold text-mute mt-0.5">الطريقة الوحيدة المتاحة · تدفع للمندوب وقت الاستلام</p>
              </div>
              <IcTruck className="w-6 h-6 text-olive ms-auto" />
            </div>
          </div>
        </Reveal>

        {/* الملخص */}
        <Reveal delay={100} className="bg-surface border border-line p-7 lg:sticky lg:top-40">
          <h2 className="font-display font-bold text-2xl mb-5">ملخص الطلب</h2>
          <div className="hairline-t max-h-64 overflow-y-auto no-scrollbar">
            {items.map((i) => (
              <div key={`${i.id}${i.color}${i.size}`} className="hairline-b flex items-center gap-3.5 py-3.5">
                <span className="imgz w-14 h-14 shrink-0 bg-[#f1eee6]"><img src={i.p.image} alt={i.p.name} className="w-full h-full object-cover" /></span>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.8rem] font-extrabold truncate">{i.p.name} <span className="num text-mute font-bold">×{i.qty}</span></p>
                  <p className="text-[0.62rem] font-bold text-mute">{i.color} · {i.size}</p>
                </div>
                <span className="num text-[0.8rem] font-extrabold">{fmt(i.p.price * i.qty)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="flex border border-line">
              <input value={code} onChange={(e) => { setCode(e.target.value.toUpperCase()); setCouponErr(""); }} placeholder="كود الخصم" dir="ltr"
                className="flex-1 min-w-0 px-4 h-11 bg-paper text-sm font-bold placeholder:text-mute/70" />
              <button onClick={() => { const r = evalCoupon(code, subtotal, coupons); if (r.ok) { setCode(code.toUpperCase()); localStorage.setItem("mishkat:coupon", code.toUpperCase()); setCouponErr(""); toast("تم تطبيق الكوبون"); } else setCouponErr(r.error); }}
                className="px-5 bg-ink text-paper text-[0.7rem] font-bold hover:bg-olive transition-colors">تطبيق</button>
            </div>
            {couponErr && <p className="text-[0.65rem] font-bold text-[#b0563f] mt-2">{couponErr}</p>}
          </div>

          <div className="mt-5 space-y-2.5 text-sm font-bold">
            <div className="flex justify-between"><span className="text-mute">الإجمالي الفرعي</span><span className="num">{fmt(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-mute">الخصم</span><span className={`num ${discount ? "text-olive" : ""}`}>{discount ? `-${fmt(discount)}` : "—"}</span></div>
            <div className="flex justify-between"><span className="text-mute">التوصيل {gov ? `— ${gov.name}` : ""}</span><span className="num">{gov ? fmt(gov.fee) : "اختر المحافظة"}</span></div>
          </div>
          <div className="hairline-t mt-4 pt-4 flex justify-between items-baseline">
            <span className="font-display font-bold text-lg">الإجمالي</span>
            <span className="num font-extrabold text-2xl">{fmt(total)}</span>
          </div>

          <button onClick={submit} disabled={busy}
            className="mt-6 w-full h-13 py-4 bg-ink text-paper text-[0.8rem] font-bold hover:bg-olive transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {busy ? "جارٍ تسجيل الطلب…" : <>تأكيد الطلب — الدفع عند الاستلام<IcArrow className="w-4 h-4" /></>}
          </button>
          <p className="text-[0.62rem] font-bold text-mute text-center mt-3">بالتأكيد أنت موافق على سياسة الاستبدال خلال 14 يوم</p>
        </Reveal>
      </div>
    </div>
  );
}
