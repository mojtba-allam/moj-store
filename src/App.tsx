import { useEffect } from "react";
import { StoreProvider, useRoute } from "./lib/state";
import { ToastHost } from "./components/ui";

import { Concept1, Concept2 } from "./pages/concepts-a";
import { Concept3, Concept4 } from "./pages/concepts-b";
import { Concept5, Concept6 } from "./pages/concepts-c";
import { Concept7, Concept8 } from "./pages/concepts-d";
import { Concept9, Concept10, Concept11, Concept12 } from "./pages/concepts-e";
import { Concept13, Concept14, Concept15, Concept16 } from "./pages/concepts-f";
import { ShopPage, ProductPage } from "./pages/shop";
import { ComparePage, CartPage } from "./pages/compare-cart";
import { CheckoutPage, OrderSuccessPage, TrackPage } from "./pages/order-flow";
import { FaqPage, ContactPage, ConceptHub } from "./pages/info";
import { DashboardPage, OrdersPage, OrderDetailPage } from "./pages/admin-core";
import { ProductsAdminPage, InventoryPage, SuppliersPage } from "./pages/admin-catalog";
import { PromotionsPage, ReportsPage, InvoicesPage } from "./pages/admin-ops";

function Router() {
  const { parts, path } = useRoute();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);

  const [root, sub] = parts;

  // صفحات الإدارة
  if (root === "admin") {
    if (!sub) return <DashboardPage />;
    if (sub === "orders") return <OrdersPage />;
    if (sub === "order" && parts[2]) return <OrderDetailPage id={parts[2]} />;
    if (sub === "products") return <ProductsAdminPage />;
    if (sub === "inventory") return <InventoryPage />;
    if (sub === "suppliers") return <SuppliersPage />;
    if (sub === "promotions") return <PromotionsPage />;
    if (sub === "reports") return <ReportsPage />;
    if (sub === "invoices") return <InvoicesPage focusId={parts[2]} />;
    return <DashboardPage />;
  }

  // مفاهيم الصفحة الرئيسية الثمانية
  if (root === "c1") return <Concept1 />;
  if (root === "c2") return <Concept2 />;
  if (root === "c3") return <Concept3 />;
  if (root === "c4") return <Concept4 />;
  if (root === "c5") return <Concept5 />;
  if (root === "c6") return <Concept6 />;
  if (root === "c7") return <Concept7 />;
  if (root === "c8") return <Concept8 />;
  if (root === "c9") return <Concept9 />;
  if (root === "c10") return <Concept10 />;
  if (root === "c11") return <Concept11 />;
  if (root === "c12") return <Concept12 />;
  if (root === "c13") return <Concept13 />;
  if (root === "c14") return <Concept14 />;
  if (root === "c15") return <Concept15 />;
  if (root === "c16") return <Concept16 />;

  // صفحات المتجر
  if (root === "products") return <ShopPage tab={sub ?? ""} />;
  if (root === "product" && sub) return <ProductPage id={sub} />;
  if (root === "compare") return <ComparePage />;
  if (root === "cart") return <CartPage />;
  if (root === "checkout") return <CheckoutPage />;
  if (root === "order" && sub) return <OrderSuccessPage id={sub} />;
  if (root === "track") return <TrackPage presetId={sub} />;
  if (root === "faq") return <FaqPage />;
  if (root === "contact") return <ContactPage />;

  // الرئيسية — فهرس المفاهيم
  return <ConceptHub />;
}

export default function App() {
  return (
    <StoreProvider>
      <Router />
      <ToastHost />
    </StoreProvider>
  );
}
