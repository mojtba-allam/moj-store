import { useState } from "react";
import { fmt } from "../data";
import { cartKey, evalCoupon, useStore } from "../store";
import { Eyebrow, IcArrow, IcBag, IcTrash, Qty, Reveal } from "../ui";

export default function CartPage() {
  const { cart, products, setQty, removeItem, subtotal, coupons, toast } = useStore();
  const [code, setCode] = useState(() => localStorage.getItem("mishkat:coupon") ?? "");
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");

  const items = cart
    .map((i) => ({ ...i, p: products.find((p) => p.id === i.id)! }))
    .filter((i) => i.p);

  const applied = code ? evalCoupon(code, subtotal, coupons) : null;
  const discount = applied?.ok ? applied.discount : 0;

  const applyCoupon = () => {
    if (!input.trim()) return;
    const r = evalCoupon(input, subtotal, coupons);
    if (r.ok) {
      setCode(input.trim().toUpperCase());
      localStorage.setItem("mishkat:coupon", input.trim().toUpperCase());
      setErr("");
      toast(`تم تطبيق الكوبون — خصم ${fmt(r.discount)}`);
    } else setErr(r.error);
  };
  const clearCoupon = () => {
    setCode("");
    localStorage.removeItem("mishkat:coupon");
    setErr("");
  };

  if (items.length === 0)
    return (
      <div className="page-in max-w-[1440px] mx-auto px-5 py-24 md:py-32 text-center">
        <IcBag className="w-10 h-10 mx-auto text-sand" strokeWidth={1.2} />
        <h1 className="font-display font-bold text-4xl md:text-6xl mt-6 text-ink">سلتك فارغة… بعد</h1>
        <p className="text-mute font-bold text-sm mt-4">المصابيح المميزة بانتظارك في المجموعة.</p>
        <a href="#/products" className="inline-flex items-center gap-2 bg-ink text-paper text-[0.78rem] font-bold px-8 h-12 mt-10 hover:bg-olive transition-colors">
          تصفح المصابيح
          <IcArrow className="w-4 h-4" />
        </a>
      </div>
    );

  return (
    <div className="page-in max-w-[1440px] mx-auto px-5 md:px-8 py-10 md:py-14">
      <Eyebrow>سلة المشتريات</Eyebrow>
      <h1 className="font-display font-bold text-4xl md:text-5xl mt-3 mb-10 text-ink">
        <span className="num">{items.reduce((s, i) => s + i.qty, 0)}</span> منتج في السلة
      </h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
        {/* العناصر */}
        <div className="hairline-t">
          {items.map((i) => {
            const key = cartKey(i);
            return (
              <Reveal key={key} className="hairline-b py-6 flex gap-5">
                <a href={`#/product/${i.p.id}`} className="imgz w-24 h-24 md:w-28 md:h-28 shrink-0 bg-[#f1eee6] border border-line/70">
                  <img src={i.p.image} alt={i.p.name} className="w-full h-full object-cover" />
                </a>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4">
                    <a href={`#/product/${i.p.id}`} className="font-display font-semibold text-lg md:text-xl text-ink hover:text-olive transition-colors">{i.p.name}</a>
                    <button onClick={() => { removeItem(key); toast("حُذف من السلة"); }} className="text-mute hover:text-[#b0563f] transition-colors shrink-0" aria-label="حذف">
                      <IcTrash className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[0.68rem] font-bold text-mute mt-1">
                    اللون: {i.color} · المقاس: {i.size} · {i.p.charging === "rechargeable" ? "قابل للشحن" : "بالكهرباء"}
                  </p>
                  {i.qty >= i.p.stock && (
                    <p className="text-[0.65rem] font-bold text-olive mt-1.5">وصلت للحد الأقصى المتاح من المخزون ({i.p.stock})</p>
                  )}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                    <Qty size="sm" value={i.qty} onChange={(n) => setQty(key, n)} max={i.p.stock} />
                    <p className="num font-extrabold">{fmt(i.p.price * i.qty)}
                      {i.qty > 1 && <span className="text-[0.62rem] text-mute font-bold ms-2 num">{fmt(i.p.price)} / قطعة</span>}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
          <a href="#/products" className="tl inline-flex mt-6 text-sm font-bold text-ink">متابعة التسوق<IcArrow className="w-4 h-4 rotate-180" /></a>
        </div>

        {/* الملخص */}
        <Reveal delay={100} className="bg-surface border border-line p-7 lg:sticky lg:top-40">
          <h2 className="font-display font-bold text-2xl mb-6">ملخص الطلب</h2>

          <div className="space-y-3 text-sm font-bold">
            <div className="flex justify-between"><span className="text-mute">الإجمالي الفرعي</span><span className="num">{fmt(subtotal)}</span></div>
            {discount > 0 ? (
              <div className="flex justify-between text-olive">
                <span>خصم الكوبون ({code})</span>
                <span className="num flex items-center gap-2">-{fmt(discount)}
                  <button onClick={clearCoupon} className="text-mute hover:text-[#b0563f] text-[0.6rem]" aria-label="إزالة الكوبون">إزالة</button>
                </span>
              </div>
            ) : (
              <div className="flex justify-between text-mute"><span>الكوبون</span><span>—</span></div>
            )}
            <div className="flex justify-between text-mute"><span>التوصيل</span><span>حسب المحافظة عند Checkout</span></div>
          </div>

          {/* كوبون */}
          <div className="mt-6">
            <div className="flex border border-line">
              <input
                value={input}
                onChange={(e) => { setInput(e.target.value.toUpperCase()); setErr(""); }}
                onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                placeholder="كود الخصم"
                className="flex-1 min-w-0 px-4 h-12 bg-paper text-sm font-bold placeholder:text-mute/70 border-none"
                dir="ltr"
              />
              <button onClick={applyCoupon} className="px-6 bg-ink text-paper text-[0.72rem] font-bold hover:bg-olive transition-colors">تطبيق</button>
            </div>
            {err && <p className="text-[0.68rem] font-bold text-[#b0563f] mt-2">{err}</p>}
            <p className="text-[0.62rem] font-bold text-mute mt-2">جرّب: DAW15 (خصم 15٪) أو NURO5000 (فوق 50,000 د.ع)</p>
          </div>

          <div className="hairline-t mt-6 pt-5 flex justify-between items-baseline">
            <span className="font-display font-bold text-lg">الإجمالي</span>
            <span className="num font-extrabold text-2xl">{fmt(subtotal - discount)}</span>
          </div>
          <p className="text-[0.62rem] font-bold text-mute mt-1">+ رسوم التوصيل تُحسب في الخطوة التالية — الدفع عند الاستلام</p>

          <a href="#/checkout" className="mt-6 flex items-center justify-center gap-2 w-full h-13 py-4 bg-ink text-paper text-[0.8rem] font-bold hover:bg-olive transition-colors">
            إتمام الطلب
            <IcArrow className="w-4 h-4" />
          </a>
        </Reveal>
      </div>
    </div>
  );
}
