import { useState } from "react";
import { fmt } from "../data";
import { useStore } from "../store";
import { IcDownload, IcPrint } from "../ui";
import { AreaChart, HBars, downloadCSV } from "./charts";

const TABS = ["المبيعات", "الطلبات", "المخزون", "الموردون"] as const;
const RANGES = [
  { l: "7 أيام", d: 7 }, { l: "30 يوم", d: 30 }, { l: "90 يوم", d: 90 }, { l: "السنة", d: 365 },
] as const;

export default function Reports() {
  const { orders, products, suppliers } = useStore();
  const pname = (id: string) => products.find((p) => p.id === id)?.name ?? "منتج محذوف";
  const [tab, setTab] = useState<(typeof TABS)[number]>("المبيعات");
  const [range, setRange] = useState<number>(30);

  const from = new Date();
  from.setDate(from.getDate() - range);
  const inRange = orders.filter((o) => new Date(o.date) >= from);
  const active = inRange.filter((o) => !["cancelled", "returned"].includes(o.status));
  const revenue = active.reduce((s, o) => s + o.total, 0);

  const byCity = Object.entries(active.reduce<Record<string, number>>((m, o) => ((m[o.gov] = (m[o.gov] ?? 0) + o.total), m), {}))
    .sort((a, b) => b[1] - a[1]).slice(0, 7).map(([label, value]) => ({ label, value }));

  const byProduct = Object.entries(active.reduce<Record<string, { q: number; v: number }>>((m, o) => {
    o.items.forEach((it) => {
      m[it.name] = m[it.name] ?? { q: 0, v: 0 };
      m[it.name].q += it.qty;
      m[it.name].v += it.qty * it.price;
    });
    return m;
  }, {})).sort((a, b) => b[1].v - a[1].v).map(([name, x]) => ({ name, ...x }));

  /* سلاسل أسبوعية داخل النطاق */
  const weeksN = Math.max(4, Math.min(12, Math.ceil(range / 7)));
  const series = Array.from({ length: weeksN }, (_, i) => {
    const w = weeksN - 1 - i;
    const s = new Date(); s.setDate(s.getDate() - (w + 1) * 7);
    const e = new Date(); e.setDate(e.getDate() - w * 7);
    return active.filter((o) => { const d = new Date(o.date); return d >= s && d < e; }).reduce((x, o) => x + o.total, 0);
  });
  const sLabels = Array.from({ length: weeksN }, (_, i) => (i === weeksN - 1 ? "الآن" : ""));

  const exportTab = () => {
    if (tab === "المبيعات")
      downloadCSV(`مبيعات-${range}يوم`, [["المنتج", "الكمية", "الإيراد"], ...byProduct.map((p) => [p.name, p.q, p.v])]);
    else if (tab === "الطلبات")
      downloadCSV(`طلبات-${range}يوم`, [["رقم", "العميل", "المحافظة", "الإجمالي", "الحالة"], ...inRange.map((o) => [`#${o.no}`, o.name, o.gov, o.total, o.status])]);
    else if (tab === "المخزون")
      downloadCSV("المخزون", [["المنتج", "المتاح", "المباع"], ...products.map((p) => [p.name, p.stock, p.sold])]);
    else
      downloadCSV("الموردون", [["المورد", "المنتج", "المورّد", "المطلوب", "تم طلبه"],
        ...suppliers.flatMap((s) => s.products.map((sp) => [s.name, pname(sp.productId), sp.suppliedQty, sp.requestedQty, sp.orderedQty]))]);
  };

  return (
    <div className="page-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl">التقارير والتحليلات</h1>
          <p className="text-[0.72rem] font-bold text-mute mt-1.5">مبيعات وطلبات ومخزون وموردون — بنفس بيانات النظام الحية</p>
        </div>
        <div className="flex items-center gap-2">
          {RANGES.map((r) => (
            <button key={r.d} onClick={() => setRange(r.d)}
              className={`px-4 py-2 text-[0.68rem] font-bold border transition-colors ${range === r.d ? "bg-ink text-paper border-ink" : "border-line bg-surface hover:border-olive"}`}>
              {r.l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`shrink-0 px-5 py-2.5 text-[0.72rem] font-bold border-b-2 transition-colors ${tab === t ? "border-olive text-ink" : "border-transparent text-mute hover:text-ink"}`}>
            تقرير {t}
          </button>
        ))}
        <span className="ms-auto flex gap-2 shrink-0">
          <button onClick={exportTab} className="inline-flex items-center gap-2 border border-line bg-surface px-4 py-2 text-[0.68rem] font-bold hover:border-olive hover:text-olive transition-colors">
            <IcDownload className="w-4 h-4" /> Excel / CSV
          </button>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 border border-line bg-surface px-4 py-2 text-[0.68rem] font-bold hover:border-olive hover:text-olive transition-colors">
            <IcPrint className="w-4 h-4" /> PDF / طباعة
          </button>
        </span>
      </div>

      {tab === "المبيعات" && (
        <div className="space-y-4 print-area">
          <div className="grid grid-cols-3 gap-3">
            {[["الإيراد", fmt(revenue)], ["الطلبات", String(active.length)], ["متوسط الطلب", fmt(Math.round(revenue / Math.max(1, active.length)))]].map(([l, v]) => (
              <div key={l} className="bg-surface border border-line p-5">
                <p className="text-[0.62rem] font-bold text-mute">{l}</p>
                <p className="num font-display font-bold text-xl md:text-2xl mt-1.5">{v}</p>
              </div>
            ))}
          </div>
          <div className="grid xl:grid-cols-2 gap-3">
            <div className="bg-surface border border-line p-6">
              <h2 className="font-bold text-sm mb-4">الإيراد الأسبوعي</h2>
              <AreaChart data={series} labels={sLabels} h={170} />
            </div>
            <div className="bg-surface border border-line p-6">
              <h2 className="font-bold text-sm mb-5">تحليل المدن</h2>
              <HBars items={byCity} unit=" ج.م" />
            </div>
          </div>
          <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
            <table className="w-full text-[0.75rem] font-bold min-w-[480px]">
              <thead><tr className="text-mute text-[0.62rem] border-b border-line bg-paper/60">
                <th className="text-start px-4 py-3 font-bold">تحليل المنتجات</th><th className="text-start px-4 py-3 font-bold">الكمية</th><th className="text-start px-4 py-3 font-bold">الإيراد</th>
              </tr></thead>
              <tbody>
                {byProduct.map((p) => (
                  <tr key={p.name} className="border-b border-line/70 last:border-0">
                    <td className="px-4 py-3">{p.name}</td><td className="px-4 py-3 num">{p.q}</td><td className="px-4 py-3 num">{fmt(p.v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "الطلبات" && (
        <div className="bg-surface border border-line overflow-x-auto no-scrollbar print-area">
          <table className="w-full text-[0.75rem] font-bold min-w-[640px]">
            <thead><tr className="text-mute text-[0.62rem] border-b border-line bg-paper/60">
              {["الرقم", "العميل", "المحافظة", "القطع", "الإجمالي", "التاريخ"].map((h) => <th key={h} className="text-start px-4 py-3 font-bold">{h}</th>)}
            </tr></thead>
            <tbody>
              {inRange.map((o) => (
                <tr key={o.no} className="border-b border-line/70 last:border-0">
                  <td className="px-4 py-3 num">#{o.no}</td>
                  <td className="px-4 py-3">{o.name}</td>
                  <td className="px-4 py-3 text-mute">{o.gov}</td>
                  <td className="px-4 py-3 num">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                  <td className="px-4 py-3 num">{fmt(o.total)}</td>
                  <td className="px-4 py-3 text-mute">{new Date(o.date).toLocaleDateString("ar-EG", { day: "numeric", month: "short" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "المخزون" && (
        <div className="bg-surface border border-line overflow-x-auto no-scrollbar print-area">
          <table className="w-full text-[0.75rem] font-bold min-w-[520px]">
            <thead><tr className="text-mute text-[0.62rem] border-b border-line bg-paper/60">
              {["المنتج", "المتاح", "المباع", "نسبة النفاد"].map((h) => <th key={h} className="text-start px-4 py-3 font-bold">{h}</th>)}
            </tr></thead>
            <tbody>
              {products.map((p) => {
                const ratio = Math.round((p.sold / Math.max(1, p.sold + p.stock)) * 100);
                return (
                  <tr key={p.id} className="border-b border-line/70 last:border-0">
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3 num">{p.stock}</td>
                    <td className="px-4 py-3 num">{p.sold}</td>
                    <td className="px-4 py-3 w-48">
                      <span className="flex items-center gap-3"><span className="flex-1 h-1.5 bg-paper border border-line/60"><span className="block h-full bg-olive" style={{ width: `${ratio}%` }} /></span><span className="num text-mute text-[0.65rem]">{ratio}٪</span></span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === "الموردون" && (
        <div className="bg-surface border border-line overflow-x-auto no-scrollbar print-area">
          <table className="w-full text-[0.75rem] font-bold min-w-[620px]">
            <thead><tr className="text-mute text-[0.62rem] border-b border-line bg-paper/60">
              {["المورد", "المنتج", "المورّد سابقًا", "المطلوب", "تم طلبه", "التواصل"].map((h) => <th key={h} className="text-start px-4 py-3 font-bold">{h}</th>)}
            </tr></thead>
            <tbody>
              {suppliers.flatMap((s) =>
                s.products.map((sp) => (
                  <tr key={s.id + sp.productId} className="border-b border-line/70 last:border-0">
                    <td className="px-4 py-3">{s.name}</td>
                    <td className="px-4 py-3">{pname(sp.productId)}</td>
                    <td className="px-4 py-3 num">{sp.suppliedQty}</td>
                    <td className="px-4 py-3 num">{sp.requestedQty || "—"}</td>
                    <td className="px-4 py-3 num">{sp.orderedQty}</td>
                    <td className="px-4 py-3 text-mute">{s.comm}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
