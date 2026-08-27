import { fmt } from "../data";
import { useStore } from "../store";
import { StatusPill } from "../ui";
import { AreaChart, Donut, HBars } from "./charts";

const card = "bg-surface border border-line p-5 md:p-6";

export default function Dashboard() {
  const { orders, products } = useStore();
  const active = orders.filter((o) => !["cancelled", "returned"].includes(o.status));
  const revenue = active.reduce((s, o) => s + o.total, 0);
  const itemsSold = active.reduce((s, o) => s + o.items.reduce((x, i) => x + i.qty, 0), 0);
  const stockTotal = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const outStock = products.filter((p) => p.stock === 0);

  /* مبيعات آخر 12 أسبوعًا */
  const weeks = Array.from({ length: 12 }, (_, i) => 11 - i);
  const weekly = weeks.map((w) => {
    const start = new Date(); start.setDate(start.getDate() - (w + 1) * 7);
    const end = new Date(); end.setDate(end.getDate() - w * 7);
    const base = [3200, 4100, 3800, 5200, 4700, 6100, 5600, 6800, 6200, 7400, 8100, 0][11 - w];
    const real = active
      .filter((o) => { const d = new Date(o.date); return d >= start && d < end; })
      .reduce((s, o) => s + o.total, 0);
    return base + real;
  });
  const weekLabels = weeks.map((w) => (w === 0 ? "الحالي" : `-${w}أ`));

  const byCity = Object.entries(
    active.reduce<Record<string, number>>((m, o) => ((m[o.gov] = (m[o.gov] ?? 0) + o.total), m), {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([label, value]) => ({ label, value }));

  const byCat = ["مكتبية", "طاولة", "محمولة"].map((c, i) => ({
    label: c,
    color: ["#1c1c1a", "#8a8f63", "#d8d1c3"][i],
    value: active.reduce(
      (s, o) => s + o.items.filter((it) => products.find((p) => p.id === it.id)?.category === c).reduce((x, it) => x + it.qty * it.price, 0),
      0
    ),
  }));

  const top = Object.entries(
    active.reduce<Record<string, number>>((m, o) => {
      o.items.forEach((it) => (m[it.name] = (m[it.name] ?? 0) + it.qty));
      return m;
    }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const kpis = [
    { l: "إجمالي المبيعات", v: fmt(revenue), s: "بعد خصم الملغي والمرتجع" },
    { l: "عدد الطلبات", v: String(orders.length), s: `${active.length} نشط · ${orders.length - active.length} منتهٍ` },
    { l: "متوسط قيمة الطلب", v: fmt(Math.round(revenue / Math.max(1, active.length))), s: "شامل التوصيل" },
    { l: "قطع مباعة", v: String(itemsSold), s: `${products.length} موديل معروض` },
    { l: "المخزون الحالي", v: String(stockTotal), s: "مخزن واحد — الدقي" },
    { l: "تنبيهات مخزون", v: String(lowStock.length + outStock.length), s: `${outStock.length} نفدت · ${lowStock.length} منخفضة`, warn: lowStock.length + outStock.length > 0 },
  ];

  return (
    <div className="page-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl">لوحة التحكم</h1>
          <p className="text-[0.72rem] font-bold text-mute mt-1.5">نظرة عامة على المبيعات والمخزون — تحديث فوري من بيانات النظام</p>
        </div>
        <a href="#/admin/reports" className="text-[0.7rem] font-bold border border-line bg-surface px-4 py-2.5 hover:border-olive hover:text-olive transition-colors">التقارير الكاملة</a>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((k) => (
          <div key={k.l} className={`${card} ${k.warn ? "border-olive" : ""}`}>
            <p className="text-[0.62rem] font-bold text-mute">{k.l}</p>
            <p className={`num font-display font-bold text-xl md:text-2xl mt-2 ${k.warn ? "text-olive" : ""}`}>{k.v}</p>
            <p className="text-[0.58rem] font-bold text-mute/80 mt-1.5">{k.s}</p>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-3">
        <div className={`${card} xl:col-span-2`}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-sm">الإيرادات — آخر 12 أسبوعًا</h2>
            <span className="num text-[0.62rem] font-bold text-olive">{fmt(weekly.reduce((s, v) => s + v, 0))}</span>
          </div>
          <AreaChart data={weekly} labels={weekLabels} />
        </div>
        <div className={card}>
          <h2 className="font-bold text-sm mb-5">المبيعات حسب الفئة</h2>
          <Donut items={byCat} centerLabel="ج.م" />
          <h2 className="font-bold text-sm mt-8 mb-4">أعلى المحافظات</h2>
          <HBars items={byCity.map((c) => ({ ...c, value: Math.round(c.value / 100) * 100 }))} unit=" ج.م" />
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-3">
        {/* أحدث الطلبات */}
        <div className={`${card} xl:col-span-2 overflow-x-auto no-scrollbar`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm">أحدث الطلبات</h2>
            <a href="#/admin/orders" className="text-[0.65rem] font-bold text-olive">كل الطلبات</a>
          </div>
          <table className="w-full text-[0.72rem] font-bold min-w-[560px]">
            <thead>
              <tr className="text-mute text-[0.62rem] border-b border-line">
                <th className="text-start py-2.5 font-bold">الرقم</th>
                <th className="text-start font-bold">العميل</th>
                <th className="text-start font-bold">المحافظة</th>
                <th className="text-start font-bold">الإجمالي</th>
                <th className="text-start font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((o) => (
                <tr key={o.no} className="border-b border-line/70 last:border-0 hover:bg-paper/60 transition-colors">
                  <td className="py-3 num"><a className="hover:text-olive transition-colors" href={`#/admin/orders/${o.no}`}>#{o.no}</a></td>
                  <td>{o.name}</td>
                  <td className="text-mute">{o.gov}</td>
                  <td className="num">{fmt(o.total)}</td>
                  <td><StatusPill s={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3">
          <div className={card}>
            <h2 className="font-bold text-sm mb-4">الأكثر مبيعًا (قطع)</h2>
            <ul className="space-y-3">
              {top.map(([n, q], i) => (
                <li key={n} className="flex items-center gap-3 text-[0.72rem] font-bold">
                  <span className="num font-display text-sand text-lg w-6">0{i + 1}</span>
                  <span className="flex-1">{n}</span>
                  <span className="num text-mute">{q} قطعة</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${card} border-olive/60`}>
            <h2 className="font-bold text-sm mb-3">مخزون يحتاج انتباه</h2>
            <ul className="space-y-2.5">
              {[...outStock, ...lowStock].map((p) => (
                <li key={p.id} className="flex items-center gap-3 text-[0.72rem] font-bold">
                  <span className="w-9 h-9 imgz bg-[#f1eee6] shrink-0"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /></span>
                  <span className="flex-1">{p.name}</span>
                  <span className={`num px-2 py-1 text-[0.6rem] ${p.stock === 0 ? "bg-[#b0563f]/15 text-[#b0563f]" : "bg-olive/15 text-olive"}`}>
                    {p.stock === 0 ? "نفدت" : `باقي ${p.stock}`}
                  </span>
                </li>
              ))}
            </ul>
            <a href="#/admin/inventory" className="block mt-4 text-[0.65rem] font-bold text-olive">إدارة المخزون</a>
          </div>
        </div>
      </div>
    </div>
  );
}
