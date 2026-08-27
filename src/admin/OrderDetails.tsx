import { OrderStatus, STATUS_META, STORE, fmt } from "../data";
import { useStore } from "../store";
import { IcArrowBack, IcPrint, StatusPill } from "../ui";

const ALL_STATUS = Object.keys(STATUS_META) as OrderStatus[];

export default function OrderDetails({ no }: { no: string }) {
  const { orders, setStatus, toast } = useStore();
  const o = orders.find((x) => x.no === no);

  if (!o)
    return (
      <div className="py-20 text-center">
        <p className="font-display font-bold text-3xl">الطلب غير موجود</p>
        <a href="#/admin/orders" className="text-[0.72rem] font-bold text-olive mt-4 inline-block">عودة للطلبات</a>
      </div>
    );

  return (
    <div className="page-in space-y-5 print-area">
      <div className="no-print flex flex-wrap items-center justify-between gap-4">
        <a href="#/admin/orders" className="inline-flex items-center gap-2 text-[0.7rem] font-bold text-mute hover:text-ink transition-colors">
          <IcArrowBack className="w-4 h-4" />
          كل الطلبات
        </a>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 text-[0.7rem] font-bold border border-line bg-surface px-4 py-2.5 hover:border-olive hover:text-olive transition-colors">
          <IcPrint className="w-4 h-4" />
          طباعة / PDF
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-bold text-mute">طلب رقم</p>
          <h1 className="num font-display font-bold text-3xl md:text-4xl" dir="ltr">#{o.no}</h1>
        </div>
        <div className="flex items-center gap-3">
          <StatusPill s={o.status} />
          <label className="no-print flex items-center gap-2 text-[0.65rem] font-bold text-mute">
            تغيير الحالة:
            <select
              value={o.status}
              onChange={(e) => { setStatus(o.no, e.target.value as OrderStatus); toast("تم تحديث حالة الطلب"); }}
              className="bg-surface border border-line px-3 py-2 text-[0.68rem] font-bold text-ink"
            >
              {ALL_STATUS.map((s) => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* العميل */}
        <div className="bg-surface border border-line p-6 space-y-3.5">
          <h2 className="text-[0.68rem] font-bold text-olive mb-1">بيانات العميل</h2>
          {[
            ["الاسم", o.name], ["الموبايل", o.phone], ["المحافظة", o.gov], ["المنطقة", o.area], ["نقطة دالة", o.landmark],
            ["التاريخ", new Date(o.date).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" })],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 text-[0.75rem] font-bold border-b border-line/70 pb-2.5 last:border-0">
              <span className="text-mute">{k}</span><span className="text-start num">{v}</span>
            </div>
          ))}
          {o.notes && (
            <p className="bg-paper border border-line px-4 py-3 text-[0.7rem] font-bold text-mute">
              <span className="text-ink">ملاحظة العميل:</span> {o.notes}
            </p>
          )}
        </div>

        {/* المنتجات */}
        <div className="bg-surface border border-line p-6 lg:col-span-1">
          <h2 className="text-[0.68rem] font-bold text-olive mb-4">المنتجات</h2>
          <div className="space-y-4">
            {o.items.map((it, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <span className="w-14 h-14 imgz bg-[#f1eee6] border border-line/60 shrink-0"><img src={it.image} alt={it.name} className="w-full h-full object-cover" /></span>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.78rem] font-extrabold">{it.name} <span className="num text-mute">×{it.qty}</span></p>
                  <p className="text-[0.62rem] font-bold text-mute">{it.color} · {it.size}</p>
                </div>
                <span className="num text-[0.75rem] font-extrabold">{fmt(it.price * it.qty)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* الإجماليات */}
        <div className="bg-surface border border-line p-6">
          <h2 className="text-[0.68rem] font-bold text-olive mb-4">الإجماليات</h2>
          <div className="space-y-3 text-[0.78rem] font-bold">
            <div className="flex justify-between"><span className="text-mute">الإجمالي الفرعي</span><span className="num">{fmt(o.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-mute">الخصم {o.coupon ? `(${o.coupon})` : ""}</span><span className={`num ${o.discount ? "text-olive" : ""}`}>{o.discount ? `-${fmt(o.discount)}` : "—"}</span></div>
            <div className="flex justify-between"><span className="text-mute">التوصيل — {o.gov}</span><span className="num">{fmt(o.shipping)}</span></div>
            <div className="flex justify-between border-t border-line pt-3 mt-2 items-baseline">
              <span className="font-display text-base">الإجمالي</span><span className="num font-extrabold text-xl">{fmt(o.total)}</span>
            </div>
            <p className="text-[0.65rem] font-bold text-mute">الدفع: عند الاستلام (كاش)</p>
          </div>

          <div className="no-print mt-6 bg-paper border border-line p-4 text-[0.65rem] font-bold text-mute leading-6">
            تغيّر الحالة ينعكس فورًا على صفحة تتبع الطلب الخاصة بالعميل — جرّبها من المتجر برقم <span className="num" dir="ltr">#{o.no}</span>.
          </div>
        </div>
      </div>

      <p className="text-[0.6rem] font-bold text-mute">مشكاة — {STORE.address} · {STORE.hours}</p>
    </div>
  );
}
