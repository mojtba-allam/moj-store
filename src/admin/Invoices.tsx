import { useState } from "react";
import { STORE, STORE_PHONE, fmt, type Order } from "../data";
import { useStore } from "../store";
import { IcDownload, IcPrint, Logo, Modal } from "../ui";
import { downloadCSV } from "./charts";

function InvoiceDoc({ o }: { o: Order }) {
  return (
    <div className="print-area bg-surface p-8 md:p-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <Logo small />
          <p className="text-[0.62rem] font-bold text-mute mt-3">{STORE.address}<br />{STORE.hours}</p>
        </div>
        <div className="text-left">
          <p className="font-display font-bold text-2xl">فاتورة ضريبية مبسطة</p>
          <p className="num text-[0.72rem] font-bold mt-1" dir="ltr">INV-{o.no}</p>
          <p className="text-[0.65rem] font-bold text-mute mt-1">
            {new Date(o.date).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <p className="mt-2 inline-block bg-sand/50 px-2.5 py-1 text-[0.6rem] font-bold">
            {o.status === "delivered" ? "مدفوعة — عند الاستلام" : "الدفع عند الاستلام"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8 text-[0.72rem] font-bold">
        <div className="border border-line p-4">
          <p className="text-[0.6rem] text-olive mb-2">فاتورة إلى</p>
          <p>{o.name}</p>
          <p className="num mt-1" dir="ltr">{o.phone}</p>
          <p className="mt-1 text-mute">{o.gov} — {o.area} · {o.landmark}</p>
        </div>
        <div className="border border-line p-4">
          <p className="text-[0.6rem] text-olive mb-2">تفاصيل</p>
          <p>طلب رقم: <span className="num" dir="ltr">#{o.no}</span></p>
          <p className="mt-1">طريقة الدفع: كاش عند الاستلام</p>
          <p className="mt-1">التوصيل: {o.gov} — {fmt(o.shipping)}</p>
        </div>
      </div>

      <table className="w-full text-[0.75rem] font-bold mt-8">
        <thead>
          <tr className="border-y border-line text-mute text-[0.62rem]">
            <th className="text-start py-2.5 font-bold">المنتج</th>
            <th className="text-start font-bold">الخيارات</th>
            <th className="text-start font-bold">الكمية</th>
            <th className="text-start font-bold">سعر الوحدة</th>
            <th className="text-start font-bold">الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {o.items.map((it, i) => (
            <tr key={i} className="border-b border-line/70">
              <td className="py-3">{it.name}</td>
              <td className="text-mute">{it.color} · {it.size}</td>
              <td className="num">{it.qty}</td>
              <td className="num">{fmt(it.price)}</td>
              <td className="num">{fmt(it.price * it.qty)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-6">
        <div className="w-full max-w-xs space-y-2 text-[0.75rem] font-bold">
          <div className="flex justify-between"><span className="text-mute">الإجمالي الفرعي</span><span className="num">{fmt(o.subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-mute">الخصم {o.coupon ? `(${o.coupon})` : ""}</span><span className="num">{o.discount ? `-${fmt(o.discount)}` : "—"}</span></div>
          <div className="flex justify-between"><span className="text-mute">التوصيل</span><span className="num">{fmt(o.shipping)}</span></div>
          <div className="flex justify-between border-t border-line pt-2.5 text-base"><span>الإجمالي</span><span className="num">{fmt(o.total)}</span></div>
          <p className="text-[0.6rem] text-mute">لا توجد ضرائب مضافة.</p>
        </div>
      </div>

      <p className="text-[0.6rem] font-bold text-mute mt-10 text-center">مشكاة — {STORE.tagline} · <span className="num" dir="ltr">{STORE_PHONE}</span></p>
    </div>
  );
}

export default function Invoices() {
  const { orders } = useStore();
  const [open, setOpen] = useState<Order | null>(null);

  return (
    <div className="page-in space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl md:text-4xl">الفواتير والإيصالات</h1>
        <p className="text-[0.72rem] font-bold text-mute mt-1.5 num">{orders.length} فاتورة — كل طلب له فاتورة وإيصال استلام قابلان للطباعة</p>
      </div>

      <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
        <table className="w-full text-[0.75rem] font-bold min-w-[680px]">
          <thead>
            <tr className="text-mute text-[0.62rem] border-b border-line bg-paper/60">
              {["رقم الفاتورة", "العميل", "التاريخ", "الإجمالي", "الدفعة", ""].map((h, i) => (
                <th key={i} className="text-start px-4 py-3.5 font-bold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.no} className="border-b border-line/70 last:border-0 hover:bg-paper/50 transition-colors">
                <td className="px-4 py-3.5 num whitespace-nowrap">INV-{o.no}</td>
                <td className="px-4 py-3.5 whitespace-nowrap">{o.name}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-mute">{new Date(o.date).toLocaleDateString("ar-EG", { day: "numeric", month: "short", year: "numeric" })}</td>
                <td className="px-4 py-3.5 num whitespace-nowrap">{fmt(o.total)}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2.5 py-1 text-[0.62rem] ${o.status === "delivered" ? "bg-olive/15 text-olive" : o.status === "cancelled" ? "bg-[#b0563f]/12 text-[#b0563f]" : "bg-sand/60 text-ink"}`}>
                    {o.status === "delivered" ? "محصّلة" : o.status === "cancelled" ? "ملغاة" : "بانتظار التحصيل"}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="flex gap-2">
                    <button onClick={() => setOpen(o)} className="border border-line px-3 py-1.5 text-[0.62rem] hover:border-olive hover:text-olive transition-colors">عرض</button>
                    <button onClick={() => { setOpen(o); window.setTimeout(() => window.print(), 350); }} className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 text-[0.62rem] hover:border-olive hover:text-olive transition-colors">
                      <IcPrint className="w-3.5 h-3.5" /> طباعة
                    </button>
                    <button onClick={() => downloadCSV(`فاتورة-${o.no}`, [["الفاتورة", `INV-${o.no}`], ["العميل", o.name], ...o.items.map((i) => [i.name, `${i.color} · ${i.size}`, i.qty, i.price] as (string | number)[]), ["الإجمالي", o.total]])}
                      className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 text-[0.62rem] hover:border-olive hover:text-olive transition-colors">
                      <IcDownload className="w-3.5 h-3.5" /> تصدير
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <Modal onClose={() => setOpen(null)} wide>
          <InvoiceDoc o={open} />
          <div className="no-print flex gap-3 p-5 hairline-t bg-paper">
            <button onClick={() => window.print()} className="flex-1 h-12 bg-ink text-paper text-[0.75rem] font-bold hover:bg-olive transition-colors inline-flex items-center justify-center gap-2">
              <IcPrint className="w-4 h-4" /> طباعة الفاتورة
            </button>
            <button onClick={() => setOpen(null)} className="px-6 h-12 border border-line text-[0.75rem] font-bold hover:border-ink transition-colors">إغلاق</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
