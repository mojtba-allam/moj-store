import { useState } from "react";
import { OrderStatus, STATUS_META, fmt } from "../data";
import { useStore } from "../store";
import { IcArrowBack, StatusPill } from "../ui";

const FILTERS: ("all" | OrderStatus)[] = ["all", "new", "confirmed", "preparing", "shipped", "delivered", "cancelled", "returned", "exchanged"];

export default function Orders() {
  const { orders } = useStore();
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const list = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="page-in space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl md:text-4xl">الطلبات</h1>
        <p className="text-[0.72rem] font-bold text-mute mt-1.5 num">{orders.length} طلب — الضغط على أي طلب يفتح التفاصيل</p>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {FILTERS.map((f) => {
          const count = f === "all" ? orders.length : orders.filter((o) => o.status === f).length;
          const active = filter === f;
          return (
            <button key={f} onClick={() => setFilter(f)}
              className={`shrink-0 px-4 py-2 text-[0.68rem] font-bold border transition-colors ${active ? "bg-ink text-paper border-ink" : "border-line bg-surface text-ink/70 hover:border-olive"}`}>
              {f === "all" ? "الكل" : STATUS_META[f].label} <span className="num opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
        <table className="w-full text-[0.75rem] font-bold min-w-[820px]">
          <thead>
            <tr className="text-mute text-[0.62rem] border-b border-line bg-paper/60">
              {["رقم الطلب", "العميل", "الموبايل", "المحافظة — المنطقة", "الإجمالي", "التاريخ", "الحالة", ""].map((h, i) => (
                <th key={i} className="text-start px-4 py-3.5 font-bold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((o) => (
              <tr key={o.no} className="border-b border-line/70 last:border-0 hover:bg-paper/50 transition-colors">
                <td className="px-4 py-4 num whitespace-nowrap"><a href={`#/admin/orders/${o.no}`} className="hover:text-olive transition-colors">#{o.no}</a></td>
                <td className="px-4 py-4 whitespace-nowrap">{o.name}</td>
                <td className="px-4 py-4 num whitespace-nowrap" dir="ltr">{o.phone}</td>
                <td className="px-4 py-4 whitespace-nowrap">{o.gov} — {o.area}</td>
                <td className="px-4 py-4 num whitespace-nowrap">{fmt(o.total)}</td>
                <td className="px-4 py-4 whitespace-nowrap text-mute">
                  {new Date(o.date).toLocaleDateString("ar-EG", { day: "numeric", month: "short" })}
                </td>
                <td className="px-4 py-4"><StatusPill s={o.status} /></td>
                <td className="px-4 py-4">
                  <a href={`#/admin/orders/${o.no}`} className="inline-flex items-center gap-1 text-[0.68rem] font-bold text-olive whitespace-nowrap">
                    التفاصيل
                    <IcArrowBack className="w-3.5 h-3.5 rotate-180" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="p-10 text-center text-[0.75rem] font-bold text-mute">لا توجد طلبات بهذه الحالة.</p>}
      </div>
    </div>
  );
}
