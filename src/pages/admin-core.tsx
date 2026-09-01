import { useState } from "react";
import type { ReactNode } from "react";
import { navigate, useRoute, useStore, Reveal } from "../lib/state";
import {
  MONTHS_AR, REVENUE_MONTHLY, ORDERS_CITY, STATUS_DIST, WEEKLY_ORDERS,
  ORDER_STATUSES, FINAL_STATUSES, fmtIQD, waLink, fmtNum,
} from "../lib/data";
import type { OrderStatus } from "../lib/data";
import { LogoMark, IDash, IBox, IFile, ITag, IChart, IUsers, IStore, IArrow, IWhatsapp, IPrint, IChevron } from "../components/icons";
import { StatusPill } from "./order-flow";

/* ================================================================== */
/*  مخططات SVG مخصصة                                                    */
/* ================================================================== */
export function AreaChart({ data, labels, height = 220, unit = "ألف د.ع" }: { data: number[]; labels: string[]; height?: number; unit?: string }) {
  const w = 800;
  const pad = 12;
  const max = Math.max(...data) * 1.15;
  const pts = data.map((v, i) => [pad + (i * (w - pad * 2)) / (data.length - 1), height - pad - (v / max) * (height - pad * 2)] as const);
  const line = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  const area = `${line} L ${pts[pts.length - 1][0]} ${height - pad} L ${pts[0][0]} ${height - pad} Z`;
  const last = data[data.length - 1];
  return (
    <div dir="ltr">
      <svg viewBox={`0 0 ${w} ${height}`} className="w-full" role="img" aria-label="مخطط الإيرادات">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={pad} x2={w - pad} y1={height * f} y2={height * f} stroke="#E5E1D8" strokeWidth="1" strokeDasharray="3 5" />
        ))}
        <path d={area} fill="#8A8F63" opacity="0.13" />
        <path d={line} fill="none" stroke="#1C1C1A" strokeWidth="2.5" strokeLinecap="round" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 5 : 3} fill={i === pts.length - 1 ? "#8A8F63" : "#1C1C1A"} />
            {i === pts.length - 1 && (
              <text x={p[0] - 10} y={p[1] - 12} textAnchor="end" fontSize="13" fontWeight="700" fill="#8A8F63">
                {fmtNum(last)}
              </text>
            )}
          </g>
        ))}
      </svg>
      <div className="flex justify-between px-2 mt-2 text-[0.62rem] text-mute" dir="rtl">
        {labels.map((l, i) => (
          <span key={l} className={i === labels.length - 1 ? "font-bold text-olive" : ""}>{l}</span>
        ))}
      </div>
      <p className="text-[0.62rem] text-mute mt-2 text-right">الوحدة: {unit}</p>
    </div>
  );
}

export function HBars({ data, labelOf, valueOf, unit = "" }: { data: unknown[]; labelOf: (d: never) => string; valueOf: (d: never) => number; unit?: string }) {
  const max = Math.max(...data.map((d) => valueOf(d as never)));
  return (
    <div className="space-y-4">
      {data.map((d, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium">{labelOf(d as never)}</span>
            <span className="text-mute">{fmtNum(valueOf(d as never))}{unit}</span>
          </div>
          <div className="h-2 bg-line/60 overflow-hidden">
            <div className="h-full bg-ink transition-all duration-1000" style={{ width: `${(valueOf(d as never) / max) * 100}%`, backgroundColor: i === 0 ? "#8A8F63" : "#1C1C1A" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Donut({ segments, centerLabel, centerValue }: { segments: { label: string; value: number; color: string }[]; centerLabel: string; centerValue: string }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  let acc = 0;
  const R = 70;
  const C = 2 * Math.PI * R;
  return (
    <div className="flex flex-wrap items-center gap-8">
      <svg viewBox="0 0 180 180" className="w-44 h-44 -rotate-90" role="img" aria-label="توزيع حالات الطلبات">
        <circle cx="90" cy="90" r={R} fill="none" stroke="#E5E1D8" strokeWidth="22" />
        {segments.map((s) => {
          const frac = s.value / total;
          const dash = frac * C;
          const off = -acc * C;
          acc += frac;
          return <circle key={s.label} cx="90" cy="90" r={R} fill="none" stroke={s.color} strokeWidth="22" strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={off} />;
        })}
        <g className="rotate-90" style={{ transformOrigin: "center" }}>
          <text x="90" y="86" textAnchor="middle" fontSize="26" fontWeight="700" fill="#1C1C1A" fontFamily="Amiri">{centerValue}</text>
          <text x="90" y="106" textAnchor="middle" fontSize="11" fill="#77736B">{centerLabel}</text>
        </g>
      </svg>
      <ul className="space-y-2.5 text-xs flex-1 min-w-36">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2.5"><span className="w-3 h-3 inline-block" style={{ backgroundColor: s.color }} />{s.label}</span>
            <span className="font-semibold">{fmtNum(s.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Spark({ data, color = "#8A8F63" }: { data: number[]; color?: string }) {
  const w = 120; const h = 36;
  const max = Math.max(...data); const min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 6) - 3}`).join(" ");
  return (
    <span className="block w-24 h-9" dir="ltr" aria-hidden>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ================================================================== */
/*  هيكل لوحة الإدارة                                                   */
/* ================================================================== */
const ADMIN_NAV = [
  { to: "#/admin", label: "لوحة المعلومات", icon: <IDash className="w-4 h-4" />, exact: true },
  { to: "#/admin/orders", label: "الطلبات", icon: <IFile className="w-4 h-4" /> },
  { to: "#/admin/products", label: "المنتجات", icon: <IStore className="w-4 h-4" /> },
  { to: "#/admin/inventory", label: "المخزون", icon: <IBox className="w-4 h-4" /> },
  { to: "#/admin/suppliers", label: "الموردون", icon: <IUsers className="w-4 h-4" /> },
  { to: "#/admin/promotions", label: "العروض والكوبونات", icon: <ITag className="w-4 h-4" /> },
  { to: "#/admin/reports", label: "التقارير والتحليل", icon: <IChart className="w-4 h-4" /> },
  { to: "#/admin/invoices", label: "الفواتير والإيصالات", icon: <IFile className="w-4 h-4" /> },
];

const MANAGERS = ["كرار العبيدي", "نور الهدى السامرائي"];

export function AdminLayout({ children, title, actions }: { children: ReactNode; title: string; actions?: ReactNode }) {
  const { path } = useRoute();
  const [manager, setManager] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  const isActive = (item: (typeof ADMIN_NAV)[number]) =>
    item.exact ? path === "/admin" : path.startsWith(item.to.slice(1));

  const Sidebar = (
    <aside className="w-64 shrink-0 bg-ink text-paper flex flex-col min-h-full">
      <a href="#/" className="flex items-center gap-2.5 px-6 h-16 hairline-b border-paper/10">
        <LogoMark className="w-8 h-8 text-paper" />
        <span className="font-display font-bold text-xl">مشكاة</span>
        <span className="text-[0.6rem] bg-olive text-paper px-1.5 py-0.5 font-semibold mr-auto">إدارة</span>
      </a>
      <nav className="flex-1 py-4">
        {ADMIN_NAV.map((item) => (
          <a
            key={item.to}
            href={item.to}
            onClick={() => setNavOpen(false)}
            className={`flex items-center gap-3 px-6 py-3 text-[0.8rem] transition-colors border-r-2 ${
              isActive(item) ? "bg-paper/8 text-olive border-olive font-semibold" : "text-sand/75 hover:text-paper hover:bg-paper/5 border-transparent"
            }`}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-paper/10">
        <p className="text-[0.62rem] text-sand/50 mb-2">المدير الحالي — صلاحيات كاملة</p>
        <div className="flex items-center gap-3 bg-paper/5 p-3">
          <span className="w-9 h-9 grid place-items-center bg-olive text-paper font-display font-bold">{MANAGERS[manager].slice(0, 1)}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">{MANAGERS[manager]}</p>
            <p className="text-[0.62rem] text-sand/50">مالك</p>
          </div>
          <button
            onClick={() => setManager((manager + 1) % 2)}
            className="text-[0.6rem] bg-paper/10 hover:bg-olive px-2 py-1.5 transition-colors"
            title="تبديل المدير (كلاهما بصلاحيات كاملة)"
          >
            تبديل
          </button>
        </div>
        <a href="#/" className="tlink rev mt-4 text-[0.68rem] text-sand/60 hover:text-paper"><span>العودة للمتجر</span></a>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-paper flex">
      {/* سايدبار ديسكتوب */}
      <div className="hidden lg:block sticky top-0 h-screen overflow-y-auto no-print">{Sidebar}</div>

      {/* سايدبار موبايل */}
      {navOpen && (
        <div className="fixed inset-0 z-[85] lg:hidden no-print">
          <button className="absolute inset-0 bg-ink/50" onClick={() => setNavOpen(false)} aria-label="إغلاق" />
          <div className="absolute inset-y-0 right-0 toast-in">{Sidebar}</div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-[60] bg-paper/95 backdrop-blur hairline-b no-print">
          <div className="flex items-center justify-between gap-4 px-4 md:px-8 h-16">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-1.5 hover:text-olive" onClick={() => setNavOpen(true)} aria-label="القائمة">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" /></svg>
              </button>
              <h1 className="font-display font-bold text-xl md:text-2xl">{title}</h1>
            </div>
            <div className="flex items-center gap-3">{actions}</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  لوحة المعلومات                                                      */
/* ================================================================== */
export function DashboardPage() {
  const { orders, products } = useStore();
  const totalRevenue = REVENUE_MONTHLY.reduce((s, v) => s + v, 0) * 1000;
  const totalOrders = STATUS_DIST.reduce((s, x) => s + x.value, 0);
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock <= 10);

  const kpis = [
    { label: "إجمالي المبيعات", value: `${(totalRevenue / 1_000_000).toFixed(1)} مليون د.ع`, sub: "+12٪ عن الشهر الماضي", spark: REVENUE_MONTHLY.slice(6) },
    { label: "عدد الطلبات", value: fmtNum(totalOrders), sub: `${fmtNum(orders.length)} طلبًا تجريبيًا حيًا`, spark: WEEKLY_ORDERS },
    { label: "المنتجات", value: fmtNum(products.length), sub: `${fmtNum(totalStock)} قطعة في المخزون`, spark: [9, 10, 10, 11, 12, 12, 12] },
    { label: "تنبيه مخزون", value: fmtNum(lowStock.length), sub: "منتجات تحت 10 قطع", spark: [5, 4, 4, 3, 3, 2, lowStock.length] },
  ];

  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
  const maxSold = topProducts[0]?.sold ?? 1;

  return (
    <AdminLayout title="لوحة المعلومات" actions={<span className="text-[0.68rem] text-mute hidden sm:block">آخر ١٢ شهرًا — محدث اليوم</span>}>
      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k, i) => (
            <Reveal key={k.label} delay={i * 60}>
              <div className="bg-surface border border-line p-5 h-full flex flex-col justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] text-mute">{k.label}</p>
                  <p className="font-display font-bold text-2xl md:text-[1.7rem] mt-2">{k.value}</p>
                  <p className="text-[0.65rem] text-olive mt-1">{k.sub}</p>
                </div>
                <Spark data={k.spark} />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid xl:grid-cols-[1.6fr_1fr] gap-6">
          {/* الإيرادات */}
          <Reveal className="bg-surface border border-line p-6">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="font-semibold text-sm">الإيرادات الشهرية</h2>
              <a href="#/admin/reports" className="tlink rev text-xs text-mute"><span>التقرير الكامل</span></a>
            </div>
            <AreaChart data={REVENUE_MONTHLY} labels={MONTHS_AR} />
          </Reveal>

          {/* حالات الطلبات */}
          <Reveal delay={100} className="bg-surface border border-line p-6">
            <h2 className="font-semibold text-sm mb-6">حالات الطلبات</h2>
            <Donut segments={STATUS_DIST} centerLabel="إجمالي الطلبات" centerValue={fmtNum(totalOrders)} />
          </Reveal>
        </div>

        <div className="grid xl:grid-cols-[1fr_1.6fr] gap-6">
          {/* المدن */}
          <Reveal className="bg-surface border border-line p-6">
            <h2 className="font-semibold text-sm mb-6">الطلبات حسب المحافظة</h2>
            <HBars data={ORDERS_CITY.slice(0, 6)} labelOf={(d) => (d as { city: string }).city} valueOf={(d) => (d as { orders: number }).orders} />
          </Reveal>

          {/* أحدث الطلبات */}
          <Reveal delay={100} className="bg-surface border border-line">
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <h2 className="font-semibold text-sm">أحدث الطلبات</h2>
              <a href="#/admin/orders" className="tlink rev text-xs text-mute"><span>كل الطلبات</span></a>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[560px] text-xs">
                <thead>
                  <tr className="hairline-t hairline-b text-mute text-right">
                    <th className="px-6 py-3 font-medium">الطلب</th>
                    <th className="px-3 py-3 font-medium">العميل</th>
                    <th className="px-3 py-3 font-medium">المحافظة</th>
                    <th className="px-3 py-3 font-medium">الإجمالي</th>
                    <th className="px-6 py-3 font-medium">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {orders.slice(0, 6).map((o) => (
                    <tr key={o.id} onClick={() => navigate(`/admin/order/${o.id}`)} className="hover:bg-paper cursor-pointer transition-colors">
                      <td className="px-6 py-3.5 font-semibold" dir="ltr">#{o.id}</td>
                      <td className="px-3 py-3.5">{o.name}</td>
                      <td className="px-3 py-3.5 text-mute">{o.governorate}</td>
                      <td className="px-3 py-3.5 font-medium">{fmtIQD(o.total)}</td>
                      <td className="px-6 py-3.5"><StatusPill status={o.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        {/* الأكثر مبيعًا + تنبيهات */}
        <div className="grid xl:grid-cols-2 gap-6">
          <Reveal className="bg-surface border border-line p-6">
            <h2 className="font-semibold text-sm mb-6">المنتجات الأكثر مبيعًا</h2>
            <div className="space-y-4">
              {topProducts.map((p) => (
                <a key={p.id} href={`#/product/${p.id}`} className="flex items-center gap-4 group">
                  <img src={p.img} alt="" className="w-11 h-11 object-cover bg-paper" />
                  <span className="flex-1 min-w-0">
                    <span className="flex justify-between text-xs mb-1.5"><span className="font-medium group-hover:text-olive transition-colors truncate">{p.name}</span><span className="text-mute shrink-0">{fmtNum(p.sold)} مبيعة</span></span>
                    <span className="block h-1.5 bg-line/60"><span className="block h-full bg-olive" style={{ width: `${(p.sold / maxSold) * 100}%` }} /></span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={80} className="bg-surface border border-line p-6">
            <h2 className="font-semibold text-sm mb-6">تنبيهات المخزون — تحت 10 قطع</h2>
            <div className="divide-y divide-line">
              {lowStock.length === 0 && <p className="text-xs text-mute py-4">لا توجد تنبيهات — المخزون سليم.</p>}
              {lowStock.map((p) => (
                <a key={p.id} href="#/admin/inventory" className="flex items-center justify-between gap-4 py-3.5 group">
                  <span className="flex items-center gap-3 min-w-0">
                    <img src={p.img} alt="" className="w-10 h-10 object-cover bg-paper" />
                    <span className="text-xs font-medium truncate group-hover:text-olive transition-colors">{p.name}</span>
                  </span>
                  <span className={`text-[0.68rem] font-bold px-2.5 py-1 shrink-0 ${p.stock === 0 ? "bg-ink text-paper" : "bg-sand/50 text-ink"}`}>
                    {p.stock === 0 ? "نفد" : `${p.stock} متبقي`}
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-4 text-[0.65rem] text-mute leading-5">كمية الطلب من المورد تُحدَّد يدويًا — راجع صفحة الموردين لإنشاء طلبات التوريد.</p>
          </Reveal>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================================================================== */
/*  إدارة الطلبات                                                       */
/* ================================================================== */
export function OrdersPage() {
  const { orders } = useStore();
  const [filter, setFilter] = useState<string>("الكل");
  const filters = ["الكل", "جديد", "تم التأكيد", "قيد التجهيز", "تم الشحن", "تم التسليم", "ملغي"];
  const list = orders.filter((o) => filter === "الكل" || o.status === filter);

  return (
    <AdminLayout title="الطلبات" actions={<span className="text-[0.68rem] text-mute">{list.length} طلبًا</span>}>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`shrink-0 px-4 py-2 text-xs font-semibold border transition-colors ${filter === f ? "bg-ink text-paper border-ink" : "bg-surface border-line text-mute hover:border-ink hover:text-ink"}`}>
            {f}
            <span className="mr-1.5 opacity-60">{orders.filter((o) => f === "الكل" || o.status === f).length}</span>
          </button>
        ))}
      </div>
      <div className="bg-surface border border-line overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[820px] text-xs">
          <thead>
            <tr className="hairline-b text-mute text-right">
              {["رقم الطلب", "العميل", "الموبايل", "المحافظة", "المنطقة", "الإجمالي", "التاريخ", "الحالة", ""].map((h) => (
                <th key={h} className="px-4 py-3.5 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {list.map((o) => (
              <tr key={o.id} onClick={() => navigate(`/admin/order/${o.id}`)} className="hover:bg-paper cursor-pointer transition-colors">
                <td className="px-4 py-4 font-bold" dir="ltr">#{o.id}</td>
                <td className="px-4 py-4 font-medium whitespace-nowrap">{o.name}</td>
                <td className="px-4 py-4 text-mute whitespace-nowrap" dir="ltr">{o.phone}</td>
                <td className="px-4 py-4">{o.governorate}</td>
                <td className="px-4 py-4 text-mute">{o.area}</td>
                <td className="px-4 py-4 font-semibold whitespace-nowrap">{fmtIQD(o.total)}</td>
                <td className="px-4 py-4 text-mute whitespace-nowrap" dir="ltr">{o.date}</td>
                <td className="px-4 py-4"><StatusPill status={o.status} /></td>
                <td className="px-4 py-4"><IArrow className="w-4 h-4 text-mute" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="text-center text-xs text-mute py-14">لا توجد طلبات بهذه الحالة.</p>}
      </div>
    </AdminLayout>
  );
}

/* ================================================================== */
/*  تفاصيل الطلب                                                        */
/* ================================================================== */
export function OrderDetailPage({ id }: { id: string }) {
  const { orders, updateOrderStatus, toast } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <AdminLayout title="طلب غير موجود">
        <p className="text-sm text-mute">لم نعثر على هذا الطلب. <a href="#/admin/orders" className="underline text-olive">عودة للطلبات</a></p>
      </AdminLayout>
    );
  }

  const allStatuses = [...ORDER_STATUSES, ...FINAL_STATUSES] as OrderStatus[];
  const changeStatus = (s: OrderStatus) => {
    if (s !== order.status) {
      updateOrderStatus(order.id, s, new Date().toISOString().slice(0, 10));
      toast(`تم تغيير حالة الطلب #${order.id} إلى «${s}»`);
    }
  };

  return (
    <AdminLayout
      title={`الطلب #${order.id}`}
      actions={
        <>
          <a href="#/admin/invoices" className="hidden sm:inline-flex items-center gap-2 border border-line bg-surface px-4 py-2 text-xs font-semibold hover:border-ink transition-colors">
            <IPrint className="w-3.5 h-3.5" /> الفاتورة
          </a>
          <StatusPill status={order.status} />
        </>
      }
    >
      <div className="grid xl:grid-cols-[1.5fr_1fr] gap-6 items-start">
        <div className="space-y-6">
          {/* المنتجات */}
          <div className="bg-surface border border-line">
            <div className="px-6 py-4 hairline-b flex items-center justify-between">
              <h2 className="font-semibold text-sm">المنتجات ({order.items.length})</h2>
              <span className="text-[0.68rem] text-mute">الدفع عند الاستلام</span>
            </div>
            <div className="divide-y divide-line">
              {order.items.map((it, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <img src={it.img} alt="" className="w-14 h-14 object-cover bg-paper" />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-medium">{it.name}</p>
                    <p className="text-mute mt-0.5">{it.color} · {it.size} · {fmtIQD(it.price)}</p>
                  </div>
                  <span className="text-xs font-semibold shrink-0">×{it.qty} = {fmtIQD(it.price * it.qty)}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 hairline-t space-y-2 text-xs bg-paper/50">
              <div className="flex justify-between"><span className="text-mute">الفرعي</span><span>{fmtIQD(order.subtotal)}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-olive"><span>خصم كوبون {order.coupon}</span><span>-{fmtIQD(order.discount)}</span></div>}
              <div className="flex justify-between"><span className="text-mute">التوصيل — {order.governorate}</span><span>{fmtIQD(order.shipping)}</span></div>
              <div className="flex justify-between font-bold text-sm pt-2 hairline-t"><span>الإجمالي (يُحصَّل نقدًا)</span><span>{fmtIQD(order.total)}</span></div>
            </div>
          </div>

          {/* الخط الزمني */}
          <div className="bg-surface border border-line p-6">
            <h2 className="font-semibold text-sm mb-6">سجل الحالة</h2>
            <ol className="relative">
              <span className="absolute top-2 bottom-2 right-[7px] w-px bg-line" aria-hidden />
              {order.timeline.map((t, i) => (
                <li key={i} className="relative flex items-center gap-4 pb-6 last:pb-0">
                  <span className={`relative z-10 w-4 h-4 rounded-full border-2 ${i === order.timeline.length - 1 ? "bg-olive border-olive ring-4 ring-olive/15" : "bg-ink border-ink"}`} />
                  <span className="text-xs font-medium flex-1">{t.status}</span>
                  <span className="text-[0.68rem] text-mute" dir="ltr">{t.date}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-6">
          {/* العميل */}
          <div className="bg-surface border border-line p-6">
            <h2 className="font-semibold text-sm mb-4">بيانات العميل</h2>
            <div className="space-y-3 text-xs">
              {[["الاسم", order.name], ["الموبايل", order.phone], ["المحافظة", order.governorate], ["المنطقة", order.area], ["نقطة دالة", order.landmark], ["التاريخ", order.date]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 hairline-b pb-2.5">
                  <span className="text-mute">{k}</span>
                  <span className="font-medium text-left" dir={k === "الموبايل" || k === "التاريخ" ? "ltr" : "rtl"}>{v}</span>
                </div>
              ))}
              {order.notes && (
                <div className="bg-sand/25 border border-sand/60 p-3 leading-6 text-[0.7rem]">
                  <span className="font-semibold block mb-1">ملاحظات العميل</span>
                  {order.notes}
                </div>
              )}
            </div>
            <a href={waLink(`مرحبًا ${order.name}، بخصوص طلبك #${order.id} من متجر مشكاة`)} className="mt-5 inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 text-xs font-semibold hover:bg-olive transition-colors">
              <IWhatsapp className="w-4 h-4" /> واتساب العميل
            </a>
          </div>

          {/* تغيير الحالة */}
          <div className="bg-surface border border-line p-6">
            <h2 className="font-semibold text-sm mb-4">تغيير حالة الطلب</h2>
            <div className="relative">
              <select
                value={order.status}
                onChange={(e) => changeStatus(e.target.value as OrderStatus)}
                className="field cursor-pointer appearance-none pl-10"
              >
                {allStatuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <IChevron className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-mute" />
            </div>
            <p className="mt-3 text-[0.65rem] text-mute leading-5">
              الحالات: جديد ← تم التأكيد ← قيد التجهيز ← تم الشحن ← تم التسليم. الحالات النهائية: ملغي / مرتجع / مستبدل.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...ORDER_STATUSES].slice(ORDER_STATUSES.indexOf(order.status as (typeof ORDER_STATUSES)[number]) + 1, ORDER_STATUSES.indexOf(order.status as (typeof ORDER_STATUSES)[number]) + 2).map((s) => (
                <button key={s} onClick={() => changeStatus(s as OrderStatus)} className="bg-olive text-paper px-4 py-2 text-[0.68rem] font-semibold hover:bg-ink transition-colors">
                  نقل إلى «{s}»
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
