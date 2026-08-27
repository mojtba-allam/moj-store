import { useState } from "react";
import { Coupon } from "../data";
import { useStore } from "../store";

export default function Promotions() {
  const { coupons, addCoupon, toggleCoupon, toast } = useStore();
  const [f, setF] = useState({ code: "", type: "percent" as Coupon["type"], value: "", min: "" });
  const [err, setErr] = useState("");

  const submit = () => {
    const value = parseInt(f.value);
    if (f.code.trim().length < 3) return setErr("الكود لا يقل عن 3 حروف");
    if (!value || value <= 0) return setErr("أدخل قيمة خصم صحيحة");
    if (f.type === "percent" && value > 90) return setErr("النسبة المئوية بحد أقصى 90٪");
    setErr("");
    addCoupon({ code: f.code.trim().toUpperCase(), type: f.type, value, min: parseInt(f.min) || 0, active: true });
    toast(`تم إنشاء كوبون ${f.code.trim().toUpperCase()}`);
    setF({ code: "", type: "percent", value: "", min: "" });
  };

  const field = "w-full h-11 px-3.5 bg-paper border border-line text-[0.75rem] font-bold placeholder:text-mute/60";

  return (
    <div className="page-in space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl md:text-4xl">العروض والكوبونات</h1>
        <p className="text-[0.72rem] font-bold text-mute mt-1.5">خصومات بسيطة وواضحة — نسبة أو مبلغ، مع حد أدنى اختياري للطلب</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-4 items-start">
        <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
          <table className="w-full text-[0.75rem] font-bold min-w-[560px]">
            <thead>
              <tr className="text-mute text-[0.62rem] border-b border-line bg-paper/60">
                {["الكود", "الخصم", "حد أدنى للطلب", "الاستخدام", "الحالة", ""].map((h, i) => (
                  <th key={i} className="text-start px-4 py-3.5 font-bold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.code} className={`border-b border-line/70 last:border-0 transition-opacity ${c.active ? "" : "opacity-45"}`}>
                  <td className="px-4 py-4 num tracking-widest" dir="ltr">{c.code}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{c.type === "percent" ? <span className="num">{c.value}٪</span> : <span className="num">{c.value} ج.م</span>}</td>
                  <td className="px-4 py-4 num whitespace-nowrap">{c.min ? `${c.min.toLocaleString("en-EG")} ج.م` : "بلا حد أدنى"}</td>
                  <td className="px-4 py-4 text-mute whitespace-nowrap">في السلة والـCheckout</td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 text-[0.62rem] ${c.active ? "bg-olive/15 text-olive" : "bg-sand/60 text-mute"}`}>
                      {c.active ? "فعّال" : "موقوف"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => { toggleCoupon(c.code); toast(c.active ? `أُوقف كوبون ${c.code}` : `فُعّل كوبون ${c.code}`); }}
                      className="relative w-11 h-6 border border-line bg-paper transition-colors" aria-label="تبديل الحالة"
                      style={{ background: c.active ? "#8a8f63" : undefined, borderColor: c.active ? "#8a8f63" : undefined }}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-surface transition-all ${c.active ? "right-0.5" : "right-[calc(100%-1.125rem)]"}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-surface border border-line p-6">
          <h2 className="font-display font-bold text-xl mb-5">كوبون جديد</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[0.65rem] font-bold text-mute mb-2">الكود</label>
              <input className={field} dir="ltr" value={f.code} onChange={(e) => setF({ ...f, code: e.target.value.toUpperCase() })} placeholder="DAW20" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[0.65rem] font-bold text-mute mb-2">النوع</label>
                <select className={field} value={f.type} onChange={(e) => setF({ ...f, type: e.target.value as Coupon["type"] })}>
                  <option value="percent">نسبة ٪</option>
                  <option value="amount">مبلغ ج.م</option>
                </select>
              </div>
              <div>
                <label className="block text-[0.65rem] font-bold text-mute mb-2">القيمة</label>
                <input className={`${field} num`} inputMode="numeric" value={f.value} onChange={(e) => setF({ ...f, value: e.target.value })} placeholder="15" />
              </div>
            </div>
            <div>
              <label className="block text-[0.65rem] font-bold text-mute mb-2">حد أدنى للطلب (اختياري)</label>
              <input className={`${field} num`} inputMode="numeric" value={f.min} onChange={(e) => setF({ ...f, min: e.target.value })} placeholder="0 = بلا حد أدنى" />
            </div>
            {err && <p className="text-[0.65rem] font-bold text-[#b0563f]">{err}</p>}
            <button onClick={submit} className="w-full h-12 bg-ink text-paper text-[0.75rem] font-bold hover:bg-olive transition-colors">
              إنشاء الكوبون
            </button>
            <p className="text-[0.62rem] font-bold text-mute leading-5">الكوبونات الفعّالة تعمل فورًا في سلة العميل وصفحة إتمام الطلب.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
