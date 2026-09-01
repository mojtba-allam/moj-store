import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { COUPONS, PRODUCTS, SEED_ORDERS, SEED_SUPPLIERS } from "./data";
import type { Coupon, Order, OrderStatus, Product, Supplier } from "./data";

/* ---------------- router ---------------- */
export function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const path = hash.replace(/^#/, "") || "/";
  const parts = path.split("/").filter(Boolean);
  return { path, parts };
}

export const navigate = (to: string) => {
  window.location.hash = to;
};

/* ---------------- reveal on scroll ---------------- */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** يضيف كلاس rv + يفعّل الظهور عند الدخول — للاستخدام على الحاويات */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "article" | "li" | "figure" }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag ref={ref as never} className={`rv ${className}`} style={{ ["--rv-delay" as never]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ---------------- localStorage helpers ---------------- */
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

/* ---------------- store context ---------------- */
export interface CartItem {
  productId: string;
  color: string;
  size: string;
  qty: number;
}

interface StoreCtx {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (p: Product, color: string, size: string, qty: number) => boolean;
  setQty: (index: number, qty: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  cartCount: number;
  compare: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  orders: Order[];
  addOrder: (o: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus, date: string) => void;
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  suppliers: Supplier[];
  setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
  toast: (msg: string) => void;
  toastMsg: string | null;
  cartBump: number;
  availableStock: (productId: string) => number;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => load("mishkat_products_v1", PRODUCTS));
  const [cart, setCart] = useState<CartItem[]>(() => load("mishkat_cart_v1", []));
  const [compare, setCompare] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => load("mishkat_orders_v1", SEED_ORDERS));
  const [coupons, setCoupons] = useState<Coupon[]>(() => load("mishkat_coupons_v1", COUPONS));
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => load("mishkat_suppliers_v1", SEED_SUPPLIERS));
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [cartBump, setCartBump] = useState(0);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => save("mishkat_cart_v1", cart), [cart]);
  useEffect(() => save("mishkat_orders_v1", orders), [orders]);
  useEffect(() => save("mishkat_coupons_v1", coupons), [coupons]);
  useEffect(() => save("mishkat_suppliers_v1", suppliers), [suppliers]);
  useEffect(() => save("mishkat_products_v1", products), [products]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const availableStock = useCallback(
    (productId: string) => {
      const p = products.find((x) => x.id === productId);
      if (!p) return 0;
      const inCart = cart.filter((c) => c.productId === productId).reduce((s, c) => s + c.qty, 0);
      return Math.max(0, p.stock - inCart);
    },
    [products, cart],
  );

  const addToCart = useCallback(
    (p: Product, color: string, size: string, qty: number) => {
      const avail = availableStock(p.id);
      if (avail <= 0) {
        toast("نفدت الكمية المتوفرة حاليًا");
        return false;
      }
      const capped = Math.min(qty, avail);
      if (capped < qty) toast(`المتوفر في المخزون ${avail} فقط — أضفنا ${capped}`);
      setCart((prev) => {
        const i = prev.findIndex((c) => c.productId === p.id && c.color === color && c.size === size);
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + capped };
          return next;
        }
        return [...prev, { productId: p.id, color, size, qty: capped }];
      });
      setCartBump((b) => b + 1);
      toast("أُضيف إلى السلة");
      return true;
    },
    [availableStock, toast],
  );

  const setQty = useCallback(
    (index: number, qty: number) => {
      setCart((prev) => {
        const item = prev[index];
        if (!item) return prev;
        const p = products.find((x) => x.id === item.productId);
        const others = prev.filter((c, i) => i !== index && c.productId === item.productId).reduce((s, c) => s + c.qty, 0);
        const max = p ? Math.max(1, p.stock - others) : qty;
        const next = [...prev];
        next[index] = { ...item, qty: Math.max(1, Math.min(qty, max)) };
        return next;
      });
    },
    [products],
  );

  const removeFromCart = useCallback((index: number) => setCart((prev) => prev.filter((_, i) => i !== index)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleCompare = useCallback(
    (id: string) => {
      setCompare((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length >= 4) {
          toast("يمكن مقارنة 4 منتجات كحد أقصى");
          return prev;
        }
        toast("أُضيف إلى المقارنة");
        return [...prev, id];
      });
    },
    [toast],
  );
  const clearCompare = useCallback(() => setCompare([]), []);

  const addOrder = useCallback((o: Order) => setOrders((prev) => [o, ...prev]), []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus, date: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status, timeline: [...o.timeline, { status, date }] } : o)),
    );
  }, []);

  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);

  const value: StoreCtx = {
    products, setProducts, cart, addToCart, setQty, removeFromCart, clearCart, cartCount,
    compare, toggleCompare, clearCompare, orders, addOrder, updateOrderStatus,
    coupons, setCoupons, suppliers, setSuppliers, toast, toastMsg, cartBump, availableStock,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
