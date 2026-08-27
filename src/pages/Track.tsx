import { useState } from "react";
import { STATUS_META, TRACK_FLOW, fmt, waLink } from "../data";
import { useStore } from "../store";
import { Eyebrow, IcCheck, IcWhatsApp, Reveal, StatusPill } from "../ui";

export default function Track({ initNo = "", initPhone = "" }: { initNo?: string; initPhone?: string }) {
  const { orders } = useStore();
  const [no, setNo] = useState(initNo);
  const [phone, setPhone] = useState(initPhone);
  const [searched, setSearched] = useState(Boolean(initNo && initPhone));
  const [err, setErr] = useState("");

  const order = searched ? orders.find((o) => o.no === no.trim().replace("#", "") && o.phone === phone.trim()) : undefined;
  const meta = order ? STATUS_META[order.status] : null;
  const flowIdx = order ? TRACK_FLOW.indexOf(order.status) : -1;
  const isFinal = Boolean(meta?.final);

  const search = () => {
    setErr("");
    if (no.trim().length < 6 || phone.trim().length < 11) {
      setErr("اكتب رقم الطلب (6 أرقام) ورقم الموبايل المستخدم في الطلب");
      return;
    }
    setSearched(true);
  };

  const field = "w-full h-12 px-4 bg-surface border border-line text-sm font-bold num placeholder:text-mute/60";

  return (
    <div className="page-in max-w-[860px] mx-auto px-5 py-12 md:py-16">
      <Eyebrow>بدون حساب — برقم الطلب وبس</Eyebrow>
      <h1 className="font-display font-bold text-4xl md:text-6xl mt-3 text-ink">تتبع الطلب</h1>

      <Reveal className="mt-8 bg-surface border border-line p-6 md:p-8">
        <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-4 items-end">
          <div>
            <label className="block text-[0.7rem] font-bold text-mute mb-2">رقم الطلب</label>
            <input className={field} dir="ltr" value={no} onChange={(e) => setNo(e.target.value)} placeholder="384721" inputMode="numeric" />
          </div>
          <div>
            <label className="block text-[0.7rem] font-bold text-mute mb-2">رقم الموبايل</label>
            <input className={field} dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07xxxxxxxxx" inputMode="numeric" />
          </div>
          <button onClick={search} className="h-12 px-8 bg-ink text-paper text-[0.78rem] font-bold hover:bg-olive transition-colors">تتبع</button>
        </div>
        {err && <p className="text-[0.68rem] font-bold text-[#b0563f] mt-3">{err}</p>}
        <button onClick={() => { setNo("384721"); setPhone("07701234567"); setSearched(true); setErr(""); }} className="tl mt-4 text-[0.68rem] font-bold text-olive">
          جرّب طلب تجريبي: 384721 / 07701234567
        </button>
      </Reveal>

      {searched && !order && (
        <Reveal className="mt-8 bg-surface border border-line p-8 text-center">
          <p className="font-display font-bold text-2xl text-ink">لم نجد طلبًا بهذه البيانات</p>
          <p className="text-[0.72rem] font-bold text-mute mt-2">تأكد من رقم الطلب والموبايل، أو راسلنا على واتساب وهنساعدك فورًا.</p>
          <a href={waLink(`مرحبًا، أريد الاستفسار عن طلبي رقم #${no || "…"}`)} target="_blank" rel="noreferrer" className="tl mt-5 text-sm font-bold text-ink">
            <IcWhatsApp className="w-4 h-4 text-olive" />واتساب الدعم
          </a>
        </Reveal>
      )}

      {order && meta && (
        <Reveal delay={100} className="mt-8 bg-surface border border-line p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-[0.65rem] font-bold text-mute">طلب رقم</p>
              <p className="num font-display font-bold text-3xl" dir="ltr">#{order.no}</p>
            </div>
            <div className="text-start">
              <p className="text-[0.65rem] font-bold text-mute mb-1.5">الحالة الحالية</p>
              <StatusPill s={order.status} />
            </div>
            <div className="text-start">
              <p className="text-[0.65rem] font-bold text-mute mb-1">الإجمالي</p>
              <p className="num font-extrabold text-lg">{fmt(order.total)}</p>
            </div>
          </div>

          {/* Timeline */}
          {!isFinal ? (
            <ol className="relative">
              {TRACK_FLOW.map((s, i) => {
                const m = STATUS_META[s];
                const done = flowIdx > i;
                const current = flowIdx === i;
                return (
                  <li key={s} className="relative flex gap-5 pb-9 last:pb-0">
                    {i < TRACK_FLOW.length - 1 && (
                      <span className={`absolute right-[6px] top-5 bottom-0 w-px ${done ? "bg-olive" : "bg-line"}`} />
                    )}
                    <span className={`tl-dot mt-1 ${done ? "done" : current ? "current" : ""}`}>
                      {done && <IcCheck className="w-3 h-3 text-white absolute -top-0.5 -right-0.5" strokeWidth={3} />}
                    </span>
                    <div className="flex-1 flex items-baseline justify-between gap-4">
                      <span className={`font-bold text-sm ${done || current ? "text-ink" : "text-mute/60"}`}>
                        {m.label}
                        {current && <span className="block text-[0.62rem] font-bold text-olive mt-0.5">الطلب هنا الآن</span>}
                      </span>
                      {done && <span className="text-[0.62rem] font-bold text-mute">تمت</span>}
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="border border-[#b0563f]/40 bg-[#b0563f]/8 p-6">
              <p className="font-display font-bold text-2xl text-[#b0563f]">الطلب {meta.label}</p>
              <p className="text-[0.72rem] font-bold text-mute mt-2">لأي تفاصيل إضافية تواصل معنا مباشرة على واتساب.</p>
            </div>
          )}

          <div className="hairline-t mt-8 pt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.72rem] font-bold">
            <span className="text-mute">التوصيل: {order.gov} — {order.area}</span>
            <span className="text-mute num">{order.items.reduce((s, i) => s + i.qty, 0)} قطعة</span>
            <span className="text-mute">الدفع عند الاستلام</span>
          </div>

          <div className="mt-8 bg-paper border border-line p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-[0.75rem] font-bold flex-1">محتاج إلغاء أو إرجاع أو استبدال؟</p>
            <a
              href={waLink(`مرحبًا، أريد طلب ${"إلغاء / إرجاع / استبدال"} لطلبي رقم #${order.no}.\nالاسم: ${order.name}\nسبب الطلب: `)}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-ink/25 text-ink text-[0.72rem] font-bold px-6 h-11 hover:border-olive hover:text-olive transition-colors whitespace-nowrap"
            >
              <IcWhatsApp className="w-4 h-4" />
              طلب إلغاء / إرجاع / استبدال عبر واتساب
            </a>
          </div>
        </Reveal>
      )}
    </div>
  );
}
