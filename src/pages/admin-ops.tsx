import { useState } from "react";
import { AdminLayout, AreaChart, HBars, Donut } from "./admin-core";
import { useStore, Reveal } from "../lib/state";
import {
  MONTHS_AR, REVENUE_MONTHLY, ORDERS_CITY, STATUS_DIST, WEEKLY_ORDERS, DAYS_AR,
  fmtIQD, fmtNum, STORE_PHONE,
} from "../lib/data";
import type { Coupon } from "../lib/data";
import { Modal, SolidBtn } from "../components/ui";
import { IPlus, IEdit, ITrash, IDownload, IPrint, ICheck, IX, ITag } from "../components/icons";
import { StatusPill } from "./order-flow";

/* ---------- أدوات التصدير ---------- */
function exportCSV(name: string, rows: (string | number)[][]) {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ================================================================== */
/*  العروض والكوبونات                                                   */
/* ================================================================== */
type CoupDraft = { code: string; percent: string; minOrder: string; active: boolean; note: string };
const emptyCoup: CoupDraft = { code: "", percent: "10", minOrder: "0", active: true, note: "" };

export function PromotionsPage() {
  const { coupons, setCoupons, products, toast } = useStore();
  const [open, setOpen] = useState(false);
  const [editCode, setEditCode] = useState<string | null>(null);
  const [draft, setDraft] = useState<CoupDraft>(emptyCoup);
  const offers = products.filter((p) => p.isOffer);

  const openNew = () => { setEditCode(null); setDraft(emptyCoup); setOpen(true); };
  const openEdit = (c: Coupon) => {
    setEditCode(c.code);
    setDraft({ code: c.code, percent: String(c.percent), minOrder: String(c.minOrder), active: c.active, note: c.note ?? "" });
    setOpen(true);
  };

  const save = () => {
    const code = draft.code.trim().toUpperCase();
    if (code.length < 3 || !draft.percent) { toast("أدخل رمز الكوبون ونسبة الخصم"); return; }
    if (editCode) {
      setCoupons((prev) => prev.map((c) => c.code === editCode ? { ...c, code, percent: Number(draft.percent), minOrder: Number(draft.minOrder) || 0, active: draft.active, note: draft.note } : c));
      toast(`تم تعديل كوبون ${code}`);
    } else {
      if (coupons.some((c) => c.code === code)) { toast("هذا الرمز مستخدم بالفعل"); return; }
      setCoupons((prev) => [{ code, percent: Number(draft.percent), minOrder: Number(draft.minOrder) || 0, active: draft.active, used: 0, note: draft.note }, ...prev]);
      toast(`أُنشئ كوبون ${code}`);
    }
    setOpen(false);
  };

  const toggle = (code: string) => {
    setCoupons((prev) => prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c)));
  };
  const remove = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    toast(`حُذف كوبون ${code}`);
  };

  return (
    <AdminLayout
      title="العروض والكوبونات"
      actions={
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-ink text-paper px-4 py-2 text-xs font-semibold hover:bg-olive transition-colors">
          <IPlus className="w-3.5 h-3.5" /> كوبون جديد
        </button>
      }
    >
      <div className="space-y-8">
        {/* الكوبونات */}
        <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[720px] text-xs">
            <thead>
              <tr className="hairline-b text-mute text-right">
                {["الرمز", "الخصم", "الحد الأدنى للطلب", "مرات الاستخدام", "الحالة", "ملاحظة", ""].map((h) => (
                  <th key={h} className="px-4 py-3.5 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-paper transition-colors">
                  <td className="px-4 py-4"><span className="inline-flex items-center gap-2 font-bold" dir="ltr"><ITag className="w-3.5 h-3.5 text-olive" />{c.code}</span></td>
                  <td className="px-4 py-4 font-bold">{c.percent}٪</td>
                  <td className="px-4 py-4">{c.minOrder > 0 ? fmtIQD(c.minOrder) : <span className="text-mute">بدون حد</span>}</td>
                  <td className="px-4 py-4 text-mute">{fmtNum(c.used)}</td>
                  <td className="px-4 py-4">
                    <button onClick={() => toggle(c.code)} className={`relative w-11 h-6 transition-colors duration-300 ${c.active ? "bg-olive" : "bg-line"}`} role="switch" aria-checked={c.active} aria-label={`تفعيل ${c.code}`}>
                      <span className={`absolute top-1 w-4 h-4 bg-surface transition-all duration-300 ${c.active ? "left-1" : "left-6"}`} />
                    </button>
                  </td>
                  <td className="px-4 py-4 text-mute max-w-48 truncate">{c.note ?? "—"}</td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1">
                      <button onClick={() => openEdit(c)} className="p-2 hover:bg-sand/40 transition-colors" aria-label="تعديل"><IEdit className="w-4 h-4" /></button>
                      <button onClick={() => remove(c.code)} className="p-2 hover:bg-sand/40 text-mute hover:text-ink transition-colors" aria-label="حذف"><ITrash className="w-4 h-4" /></button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* خصومات المنتجات */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm">منتجات عليها خصم الآن ({offers.length})</h2>
            <span className="text-[0.65rem] text-mute">تُدار الخصومات من صفحة المنتجات — سعر قبل الخصم</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {offers.map((p) => (
              <div key={p.id} className="bg-surface p-4 flex items-center gap-3">
                <img src={p.img} alt="" className="w-12 h-12 object-cover bg-paper" />
                <span className="min-w-0">
                  <span className="block text-xs font-medium truncate">{p.name}</span>
                  <span className="block text-[0.65rem] mt-0.5">
                    <span className="font-bold text-olive">{fmtIQD(p.price)}</span>{" "}
                    <span className="text-mute line-through">{fmtIQD(p.oldPrice ?? p.price)}</span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editCode ? "تعديل الكوبون" : "كوبون جديد"}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="block"><span className="block text-xs font-semibold mb-1.5">الرمز *</span><input className="field" dir="ltr" style={{ textAlign: "left" }} value={draft.code} onChange={(e) => setDraft({ ...draft, code: e.target.value.toUpperCase() })} placeholder="NUUR10" /></label>
            <label className="block"><span className="block text-xs font-semibold mb-1.5">نسبة الخصم ٪ *</span><input type="number" className="field" value={draft.percent} onChange={(e) => setDraft({ ...draft, percent: e.target.value })} /></label>
            <label className="block"><span className="block text-xs font-semibold mb-1.5">الحد الأدنى للطلب (د.ع)</span><input type="number" className="field" value={draft.minOrder} onChange={(e) => setDraft({ ...draft, minOrder: e.target.value })} placeholder="0 = بدون حد" /></label>
            <label className="flex items-end gap-3 pb-1">
              <button type="button" onClick={() => setDraft({ ...draft, active: !draft.active })} className={`w-11 h-6 relative transition-colors ${draft.active ? "bg-olive" : "bg-line"}`} role="switch" aria-checked={draft.active}>
                <span className={`absolute top-1 w-4 h-4 bg-surface transition-all ${draft.active ? "left-1" : "left-6"}`} />
              </button>
              <span className="text-xs font-semibold">{draft.active ? "فعّال" : "موقوف"}</span>
            </label>
          </div>
          <label className="block"><span className="block text-xs font-semibold mb-1.5">ملاحظة داخلية</span><input className="field" value={draft.note} onChange={(e) => setDraft({ ...draft, note: e.target.value })} /></label>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setOpen(false)} className="px-6 py-3 text-xs font-semibold text-mute hover:text-ink transition-colors">إلغاء</button>
            <SolidBtn onClick={save}>{editCode ? "حفظ" : "إنشاء الكوبون"}</SolidBtn>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

/* ================================================================== */
/*  التقارير والتحليل                                                     */
/* ================================================================== */
const RANGES = ["آخر 7 أيام", "آخر 30 يومًا", "آخر 90 يومًا", "هذه السنة"] as const;
type Range = (typeof RANGES)[number];

const RANGE_DATA: Record<Range, { revenue: number[]; labels: string[]; orders: number; factor: number }> = {
  "آخر 7 أيام": { revenue: [1620, 1890, 1740, 2100, 1980, 2450, 2360], labels: [...DAYS_AR], orders: 103, factor: 0.09 },
  "آخر 30 يومًا": { revenue: [2100, 2450, 2280, 2760], labels: ["الأسبوع 1", "الأسبوع 2", "الأسبوع 3", "الأسبوع 4"], orders: 342, factor: 0.28 },
  "آخر 90 يومًا": { revenue: REVENUE_MONTHLY.slice(0, 3).concat(REVENUE_MONTHLY.slice(9)), labels: [...MONTHS_AR.slice(0, 3), ...MONTHS_AR.slice(9)], orders: 1204, factor: 0.71 },
  "هذه السنة": { revenue: REVENUE_MONTHLY, labels: [...MONTHS_AR], orders: 4280, factor: 1 },
};

export function ReportsPage() {
  const { orders, products } = useStore();
  const [range, setRange] = useState<Range>("هذه السنة");
  const rd = RANGE_DATA[range];

  const cityData = ORDERS_CITY.map((c) => ({ ...c, orders: Math.max(1, Math.round(c.orders * rd.factor)) }));
  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 6);
  const lowStock = products.filter((p) => p.stock <= 10);

  return (
    <AdminLayout
      title="التقارير والتحليل"
      actions={
        <span className="flex items-center gap-2">
          <button onClick={() => window.print()} className="hidden sm:inline-flex items-center gap-2 border border-line bg-surface px-4 py-2 text-xs font-semibold hover:border-ink transition-colors">
            <IPrint className="w-3.5 h-3.5" /> تصدير PDF
          </button>
          <button
            onClick={() => exportCSV(`mishkat-report-${range}`, [
              ["تقرير مشكاة", range],
              [],
              ["الشهر", "الإيرادات (ألف د.ع)"],
              ...rd.revenue.map((v, i) => [rd.labels[i], v]),
              [],
              ["المحافظة", "الطلبات"],
              ...cityData.map((c) => [c.city, c.orders]),
              [],
              ["المنتج", "المبيعات", "المخزون"],
              ...topProducts.map((p) => [p.name, p.sold, p.stock]),
            ])}
            className="inline-flex items-center gap-2 bg-ink text-paper px-4 py-2 text-xs font-semibold hover:bg-olive transition-colors"
          >
            <IDownload className="w-3.5 h-3.5" /> تصدير Excel
          </button>
        </span>
      }
    >
      {/* المدى الزمني */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
        {RANGES.map((r) => (
          <button key={r} onClick={() => setRange(r)} className={`shrink-0 px-4 py-2 text-xs font-semibold border transition-colors ${range === r ? "bg-ink text-paper border-ink" : "bg-surface border-line text-mute hover:border-ink hover:text-ink"}`}>
            {r}
          </button>
        ))}
      </div>

      <div className="space-y-6 print-area">
        <Reveal className="bg-surface border border-line p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="font-semibold text-sm">تقرير المبيعات — {range}</h2>
            <span className="text-[0.68rem] text-mute">{fmtNum(rd.orders)} طلب · {fmtNum(rd.revenue.reduce((s, v) => s + v, 0))} ألف د.ع</span>
          </div>
          <AreaChart data={rd.revenue} labels={rd.labels} />
        </Reveal>

        <div className="grid xl:grid-cols-2 gap-6">
          <Reveal className="bg-surface border border-line p-6">
            <h2 className="font-semibold text-sm mb-6">تحليل المحافظات</h2>
            <HBars data={cityData} labelOf={(d) => (d as { city: string }).city} valueOf={(d) => (d as { orders: number }).orders} />
          </Reveal>
          <Reveal delay={80} className="bg-surface border border-line p-6">
            <h2 className="font-semibold text-sm mb-6">توزيع الحالات</h2>
            <Donut segments={STATUS_DIST} centerLabel="طلب" centerValue={fmtNum(STATUS_DIST.reduce((s, x) => s + x.value, 0))} />
          </Reveal>
        </div>

        <div className="grid xl:grid-cols-2 gap-6">
          {/* تحليل المنتجات */}
          <Reveal className="bg-surface border border-line overflow-x-auto no-scrollbar">
            <div className="px-6 pt-6 pb-3 flex items-center justify-between">
              <h2 className="font-semibold text-sm">تحليل المنتجات</h2>
              <button onClick={() => exportCSV("mishkat-products", [["المنتج", "السعر", "المبيعات", "المخزون"], ...products.map((p) => [p.name, p.price, p.sold, p.stock])])} className="tlink rev text-[0.68rem] text-mute"><span>تصدير</span></button>
            </div>
            <table className="w-full min-w-[440px] text-xs">
              <thead>
                <tr className="hairline-b text-mute text-right">
                  {["المنتج", "السعر", "المبيعات", "المخزون"].map((h) => <th key={h} className="px-6 py-3 font-medium first:pr-6">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {topProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-paper transition-colors">
                    <td className="px-6 py-3 font-medium">{p.name}</td>
                    <td className="px-6 py-3 text-mute">{fmtIQD(p.price)}</td>
                    <td className="px-6 py-3 font-semibold">{fmtNum(p.sold)}</td>
                    <td className="px-6 py-3"><span className={p.stock <= 10 ? "font-bold text-olive" : "text-mute"}>{p.stock}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* ملخص المخزون والموردين */}
          <div className="space-y-6">
            <Reveal delay={60} className="bg-surface border border-line p-6">
              <h2 className="font-semibold text-sm mb-4">تقرير المخزون</h2>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { l: "إجمالي القطع", v: fmtNum(products.reduce((s, p) => s + p.stock, 0)) },
                  { l: "منخفض", v: fmtNum(lowStock.length) },
                  { l: "نافد", v: fmtNum(products.filter((p) => p.stock === 0).length) },
                ].map((k) => (
                  <div key={k.l} className="bg-paper border border-line p-4">
                    <p className="font-display font-bold text-2xl">{k.v}</p>
                    <p className="text-[0.62rem] text-mute mt-1">{k.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120} className="bg-surface border border-line p-6">
              <h2 className="font-semibold text-sm mb-4">آخر الطلبات</h2>
              <div className="divide-y divide-line">
                {orders.slice(0, 4).map((o) => (
                  <div key={o.id} className="flex items-center justify-between py-3 text-xs">
                    <span className="flex items-center gap-3">
                      <span className="font-bold" dir="ltr">#{o.id}</span>
                      <span className="text-mute">{o.governorate}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="font-semibold">{fmtIQD(o.total)}</span>
                      <StatusPill status={o.status} />
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================================================================== */
/*  الفواتير والإيصالات                                                  */
/* ================================================================== */
export function InvoicesPage({ focusId }: { focusId?: string }) {
  const { orders } = useStore();
  const [selectedId, setSelectedId] = useState(focusId ?? orders[0]?.id ?? "");
  const [docType, setDocType] = useState<"فاتورة" | "إيصال">("فاتورة");
  const order = orders.find((o) => o.id === selectedId);

  return (
    <AdminLayout title="الفواتير والإيصالات" actions={<span className="text-[0.68rem] text-mute hidden sm:block">{orders.length} فاتورة — قابلة للطباعة</span>}>
      <div className="grid lg:grid-cols-[0.9fr_1.4fr] gap-6 items-start">
        {/* القائمة */}
        <div className="bg-surface border border-line overflow-hidden">
          <div className="px-5 py-4 hairline-b text-xs font-semibold">قائمة الفواتير</div>
          <div className="max-h-[520px] overflow-y-auto no-scrollbar divide-y divide-line">
            {orders.map((o) => (
              <button key={o.id} onClick={() => setSelectedId(o.id)} className={`w-full text-right px-5 py-3.5 transition-colors ${selectedId === o.id ? "bg-paper border-r-2 border-olive" : "hover:bg-paper"}`}>
                <span className="flex items-center justify-between gap-3">
                  <span className="font-bold text-xs" dir="ltr">#{o.id}</span>
                  <StatusPill status={o.status} />
                </span>
                <span className="flex items-center justify-between gap-3 mt-1.5 text-[0.65rem] text-mute">
                  <span>{o.name} — {o.governorate}</span>
                  <span className="font-semibold text-ink">{fmtIQD(o.total)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* المستند */}
        {order ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 no-print">
              <div className="flex gap-1 border border-line p-1 bg-surface">
                {(["فاتورة", "إيصال"] as const).map((t) => (
                  <button key={t} onClick={() => setDocType(t)} className={`px-5 py-2 text-xs font-semibold transition-colors ${docType === t ? "bg-ink text-paper" : "text-mute hover:text-ink"}`}>
                    {t === "فاتورة" ? "فاتورة الطلب" : "إيصال قبض"}
                  </button>
                ))}
              </div>
              <span className="flex gap-2">
                <button onClick={() => exportCSV(`invoice-${order.id}`, [
                  [docType, `#${order.id}`], ["العميل", order.name], ["المحافظة", `${order.governorate} - ${order.area}`],
                  [], ["المنتج", "الكمية", "السعر", "المجموع"],
                  ...order.items.map((i) => [i.name, i.qty, i.price, i.price * i.qty]),
                  [], ["الفرعي", order.subtotal], ["الخصم", order.discount], ["التوصيل", order.shipping], ["الإجمالي", order.total],
                ])} className="inline-flex items-center gap-2 border border-line bg-surface px-4 py-2 text-xs font-semibold hover:border-ink transition-colors">
                  <IDownload className="w-3.5 h-3.5" /> تصدير
                </button>
                <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-ink text-paper px-4 py-2 text-xs font-semibold hover:bg-olive transition-colors">
                  <IPrint className="w-3.5 h-3.5" /> طباعة
                </button>
              </span>
            </div>

            {/* منطقة الطباعة */}
            <div className="print-area bg-surface border border-line p-8 md:p-10" dir="rtl">
              <div className="flex items-start justify-between gap-6 pb-6 border-b border-line">
                <div>
                  <p className="font-display font-bold text-3xl">مشكاة</p>
                  <p className="text-[0.68rem] text-mute mt-1.5 leading-5">مصابيح مكتبية وطاولة — بغداد، الكرادة، شارع 42<br /><span dir="ltr">{STORE_PHONE}</span></p>
                </div>
                <div className="text-left">
                  <p className="text-[0.68rem] text-mute">{docType === "فاتورة" ? "فاتورة طلب — دفع عند الاستلام" : "إيصال قبض نقدی"}</p>
                  <p className="font-display font-bold text-2xl mt-1" dir="ltr">#{order.id}</p>
                  <p className="text-[0.65rem] text-mute mt-1" dir="ltr">{order.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 py-6 text-xs">
                <div>
                  <p className="text-mute text-[0.65rem] mb-1.5">العميل</p>
                  <p className="font-semibold">{order.name}</p>
                  <p className="text-mute mt-0.5" dir="ltr">{order.phone}</p>
                </div>
                <div>
                  <p className="text-mute text-[0.65rem] mb-1.5">التوصيل إلى</p>
                  <p>{order.governorate} — {order.area}</p>
                  <p className="text-mute mt-0.5">قرب: {order.landmark}</p>
                </div>
              </div>

              <table className="w-full text-xs">
                <thead>
                  <tr className="hairline-t hairline-b text-mute text-right">
                    <th className="py-2.5 font-medium">المنتج</th>
                    <th className="py-2.5 font-medium">الخيارات</th>
                    <th className="py-2.5 font-medium">الكمية</th>
                    <th className="py-2.5 font-medium text-left">المجموع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {order.items.map((it, i) => (
                    <tr key={i}>
                      <td className="py-3 font-medium">{it.name}</td>
                      <td className="py-3 text-mute">{it.color} / {it.size}</td>
                      <td className="py-3">×{it.qty}</td>
                      <td className="py-3 text-left font-semibold">{fmtIQD(it.price * it.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 ml-auto max-w-64 space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-mute">الفرعي</span><span>{fmtIQD(order.subtotal)}</span></div>
                {order.discount > 0 && <div className="flex justify-between"><span className="text-mute">خصم {order.coupon}</span><span>-{fmtIQD(order.discount)}</span></div>}
                <div className="flex justify-between"><span className="text-mute">التوصيل</span><span>{fmtIQD(order.shipping)}</span></div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-line"><span>الإجمالي</span><span>{fmtIQD(order.total)}</span></div>
              </div>

              <div className="mt-8 pt-5 border-t border-line flex flex-wrap items-center justify-between gap-3 text-[0.62rem] text-mute">
                <span>{docType === "فاتورة" ? "تُحصَّل القيمة نقدًا عند التسليم — لا توجد ضرائب أو رسوم إضافية." : "استُلم المبلغ نقدًا — الدفع عند الاستلام."}</span>
                <span className="flex items-center gap-1.5">{order.status === "تم التسليم" ? <ICheck className="w-3.5 h-3.5 text-olive" /> : <IX className="w-3.5 h-3.5" />} الحالة: {order.status}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface border border-line p-10 text-center text-sm text-mute">اختر فاتورة من القائمة.</div>
        )}
      </div>
    </AdminLayout>
  );
}
