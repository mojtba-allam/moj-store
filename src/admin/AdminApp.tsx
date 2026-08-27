import { useState } from "react";
import { IcBag, IcBox, IcChart, IcPrint, IcTruck, Logo } from "../ui";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import { AdminProducts, AdminInventory } from "./Catalog";
import Suppliers from "./Suppliers";
import Promotions from "./Promotions";
import Reports from "./Reports";
import Invoices from "./Invoices";

const NAV = [
  { key: "", label: "لوحة التحكم", ic: IcChart },
  { key: "orders", label: "الطلبات", ic: IcTruck },
  { key: "products", label: "المنتجات", ic: IcBox },
  { key: "inventory", label: "المخزون", ic: IcBag },
  { key: "suppliers", label: "الموردون", ic: IcBox },
  { key: "promotions", label: "العروض والكوبونات", ic: IcPrint },
  { key: "reports", label: "التقارير والتحليلات", ic: IcChart },
  { key: "invoices", label: "الفواتير والإيصالات", ic: IcPrint },
];

export default function AdminApp({ sub }: { sub: string[] }) {
  const [mgr, setMgr] = useState("أحمد — مدير");
  const section = sub[0] ?? "";

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      {/* شريط علوي */}
      <header className="bg-ink text-paper sticky top-0 z-50">
        <div className="px-5 md:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo dark small />
            <span className="font-display font-bold text-lg">مشكاة <span className="text-olive">·</span> الإدارة</span>
          </div>
          <div className="flex items-center gap-3">
            <select value={mgr} onChange={(e) => setMgr(e.target.value)}
              className="bg-ink border border-paper/25 text-[0.68rem] font-bold px-3 py-2 text-paper">
              <option>أحمد — مدير</option>
              <option>عمر — مدير</option>
            </select>
            <span className="hidden md:block text-[0.62rem] font-bold text-paper/60">صلاحية كاملة</span>
            <a href="#/" className="text-[0.68rem] font-bold border border-paper/30 px-4 py-2 hover:bg-paper hover:text-ink transition-colors">
              عرض المتجر
            </a>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* القائمة الجانبية */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-surface border-e border-line sticky top-14 h-[calc(100vh-3.5rem)]">
          <nav className="p-4 space-y-1 flex-1">
            {NAV.map((n) => {
              const active = section === n.key;
              return (
                <a key={n.key} href={`#/admin${n.key ? "/" + n.key : ""}`}
                  className={`flex items-center gap-3 px-4 py-3 text-[0.78rem] font-bold transition-colors ${active ? "bg-ink text-paper" : "text-ink/70 hover:bg-paper hover:text-ink"}`}>
                  <n.ic className={`w-5 h-5 ${active ? "text-olive" : "text-mute"}`} />
                  {n.label}
                </a>
              );
            })}
          </nav>
          <div className="p-4 hairline-t border-t border-line text-[0.62rem] font-bold text-mute">
            <p>المدير الحالي: {mgr}</p>
            <p className="mt-1">المديران لهما نفس الصلاحيات الكاملة</p>
          </div>
        </aside>

        {/* تنقل موبايل */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-line flex overflow-x-auto no-scrollbar">
          {NAV.map((n) => {
            const active = section === n.key;
            return (
              <a key={n.key} href={`#/admin${n.key ? "/" + n.key : ""}`}
                className={`shrink-0 px-4 py-3 text-[0.62rem] font-bold whitespace-nowrap ${active ? "text-olive border-t-2 border-olive" : "text-mute"}`}>
                {n.label}
              </a>
            );
          })}
        </div>

        {/* المحتوى */}
        <main className="flex-1 min-w-0 px-5 md:px-8 py-8 md:py-10 pb-24 lg:pb-10">
          {section === "" && <Dashboard />}
          {section === "orders" && !sub[1] && <Orders />}
          {section === "orders" && sub[1] && <OrderDetails no={sub[1]} />}
          {section === "products" && <AdminProducts />}
          {section === "inventory" && <AdminInventory />}
          {section === "suppliers" && <Suppliers />}
          {section === "promotions" && <Promotions />}
          {section === "reports" && <Reports />}
          {section === "invoices" && <Invoices />}
        </main>
      </div>
    </div>
  );
}
