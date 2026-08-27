import { useEffect } from "react";
import { StoreProvider, useRoute, useStore } from "./store";
import { IcCheck } from "./ui";
import Header from "./Header";
import Footer from "./Footer";
import { Concept1, Concept2, Concept3, Concept4 } from "./concepts";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Compare from "./pages/Compare";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Track from "./pages/Track";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import AdminApp from "./admin/AdminApp";

function ToastHost() {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-6 inset-x-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
      {toasts.map((t) => (
        <div key={t.id} className="toast-in flex items-center gap-3 bg-ink text-paper px-5 py-3.5 shadow-lg shadow-ink/20">
          <span className="w-5 h-5 grid place-items-center rounded-full bg-olive text-white"><IcCheck className="w-3 h-3" strokeWidth={2.5} /></span>
          <span className="text-[0.75rem] font-bold">{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

const CONCEPTS = [
  { n: 1, to: "/", label: "تحريري فاخر" },
  { n: 2, to: "/concept/2", label: "المنتج أولًا" },
  { n: 3, to: "/concept/3", label: "معرض حديث" },
  { n: 4, to: "/concept/4", label: "تجارة واضحة" },
];

function ConceptSwitcher({ path }: { path: string }) {
  const show = path === "/" || path.startsWith("/concept");
  if (!show) return null;
  return (
    <div className="fixed bottom-5 left-5 z-[80] bg-surface border border-line shadow-lg shadow-ink/8 p-3 max-w-[240px]">
      <p className="text-[0.6rem] font-bold text-mute mb-2.5">معاينة مفاهيم الصفحة الرئيسية</p>
      <div className="grid grid-cols-2 gap-1.5">
        {CONCEPTS.map((c) => {
          const active = path === c.to;
          return (
            <a key={c.n} href={`#${c.to}`}
              className={`px-2.5 py-2 text-[0.62rem] font-bold border transition-colors text-center ${active ? "bg-olive border-olive text-white" : "border-line text-ink/70 hover:border-olive hover:text-olive"}`}>
              <span className="num block text-[0.8rem] leading-none mb-1">0{c.n}</span>
              {c.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function Router() {
  const path = useRoute();
  const parts = path.split("/").filter(Boolean);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [path]);

  /* لوحة الإدارة */
  if (parts[0] === "admin") return <AdminApp sub={parts.slice(1)} />;

  let page: React.ReactNode;
  switch (parts[0]) {
    case undefined: page = <Concept1 />; break;
    case "concept":
      page = parts[1] === "2" ? <Concept2 /> : parts[1] === "3" ? <Concept3 /> : parts[1] === "4" ? <Concept4 /> : <Concept1 />;
      break;
    case "products": page = <Products key={parts[1] ?? "all"} filter={parts[1] ?? ""} />; break;
    case "product": page = <ProductDetails key={parts[1]} id={parts[1] ?? ""} />; break;
    case "compare": page = <Compare />; break;
    case "cart": page = <CartPage />; break;
    case "checkout": page = <Checkout />; break;
    case "success": page = <Success no={parts[1] ?? ""} />; break;
    case "track": page = <Track key={path} initNo={parts[1] ?? ""} initPhone={parts[2] ?? ""} />; break;
    case "faq": page = <Faq />; break;
    case "contact": page = <Contact />; break;
    default: page = <Concept1 />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <Header path={path} />
      <main className="flex-1">{page}</main>
      <Footer />
      <ConceptSwitcher path={path} />
      <ToastHost />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
}
