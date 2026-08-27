import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Coupon, Order, OrderStatus, PRODUCTS, Product, SEED_COUPONS, SEED_ORDERS, SEED_SUPPLIERS, Supplier } from "./data";

/* ================= Hash Router ================= */
export const parseHash = () => {
  const h = window.location.hash.replace(/^#/, "");
  return h === "" ? "/" : h;
};

export function useRoute() {
  const [path, setPath] = useState(parseHash);
  useEffect(() => {
    const fn = () => setPath(parseHash());
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  return path;
}

export const navigate = (to: string) => {
  if (parseHash() === to) return;
  window.location.hash = to;
};

/* ================= Types ================= */
export interface CartItem { id: string; color: string; size: string; qty: number }
export interface Toast { id: number; msg: string }

interface StoreCtx {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (p: Product, color: string, size: string, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  compare: string[];
  toggleCompare: (id: string) => void;
  orders: Order[];
  placeOrder: (o: Order) => void;
  setStatus: (no: string, s: OrderStatus) => void;
  coupons: Coupon[];
  addCoupon: (c: Coupon) => void;
  toggleCoupon: (code: string) => void;
  products: Product[];
  setStock: (id: string, stock: number) => void;
  upsertProduct: (p: Product) => void;
  removeProduct: (id: string) => void;
  suppliers: Supplier[];
  upsertSupplier: (s: Supplier) => void;
  removeSupplier: (id: string) => void;
  toasts: Toast[];
  toast: (msg: string) => void;
}

const Ctx = createContext<StoreCtx | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function save(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* ignore */
  }
}

export const cartKey = (i: { id: string; color: string; size: string }) => `${i.id}__${i.color}__${i.size}`;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load("mishkat:cart", []));
  const [compare, setCompare] = useState<string[]>(() => load("mishkat:compare", []));
  const [orders, setOrders] = useState<Order[]>(() => load("mishkat:orders", SEED_ORDERS));
  const [coupons, setCoupons] = useState<Coupon[]>(() => load("mishkat:coupons", SEED_COUPONS));
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = load<Product[] | null>("mishkat:products", null);
    if (saved && Array.isArray(saved) && saved.length) return saved;
    return PRODUCTS;
  });
  const [suppliers, setSuppliers] = useState<Supplier[]>(() =>
    load("mishkat:suppliers", SEED_SUPPLIERS)
  );
  const [toasts, setToasts] = useState<Toast[]>([]);
  const tid = useRef(0);

  useEffect(() => save("mishkat:cart", cart), [cart]);
  useEffect(() => save("mishkat:compare", compare), [compare]);
  useEffect(() => save("mishkat:orders", orders), [orders]);
  useEffect(() => save("mishkat:coupons", coupons), [coupons]);
  useEffect(() => save("mishkat:products", products), [products]);
  useEffect(() => save("mishkat:suppliers", suppliers), [suppliers]);

  const toast = useCallback((msg: string) => {
    const id = ++tid.current;
    setToasts((t) => [...t, { id, msg }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const addToCart = useCallback(
    (p: Product, color: string, size: string, qty: number) => {
      if (p.stock <= 0) {
        toast("هذا المنتج غير متوفر حاليًا");
        return;
      }
      const key = cartKey({ id: p.id, color, size });
      let clamped = qty;
      setCart((c) => {
        const existing = c.find((i) => cartKey(i) === key);
        const current = existing?.qty ?? 0;
        clamped = Math.min(qty, p.stock - current);
        if (clamped <= 0) return c;
        if (existing)
          return c.map((i) => (cartKey(i) === key ? { ...i, qty: i.qty + clamped } : i));
        return [...c, { id: p.id, color, size, qty: clamped }];
      });
      window.setTimeout(() => {
        toast(clamped > 0 ? "أُضيف إلى السلة" : "الكمية تتجاوز المخزون المتاح");
      }, 0);
    },
    [toast]
  );

  const setQty = useCallback((key: string, qty: number) => {
    setCart((c) =>
      c
        .map((i) => (cartKey(i) === key ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((c) => c.filter((i) => cartKey(i) !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleCompare = useCallback(
    (id: string) => {
      setCompare((c) => {
        if (c.includes(id)) return c.filter((x) => x !== id);
        if (c.length >= 4) {
          toast("يمكن مقارنة 4 منتجات كحد أقصى");
          return c;
        }
        return [...c, id];
      });
    },
    [toast]
  );

  const placeOrder = useCallback((o: Order) => {
    setOrders((os) => [o, ...os]);
    setProducts((ps) =>
      ps.map((p) => {
        const item = o.items.find((i) => i.id === p.id);
        if (!item) return p;
        return { ...p, stock: Math.max(0, p.stock - item.qty), sold: p.sold + item.qty };
      })
    );
    setCart([]);
  }, []);

  const setStatus = useCallback((no: string, s: OrderStatus) => {
    setOrders((os) => os.map((o) => (o.no === no ? { ...o, status: s } : o)));
  }, []);

  const addCoupon = useCallback((c: Coupon) => {
    setCoupons((cs) => [c, ...cs.filter((x) => x.code !== c.code)]);
  }, []);
  const toggleCoupon = useCallback((code: string) => {
    setCoupons((cs) => cs.map((c) => (c.code === code ? { ...c, active: !c.active } : c)));
  }, []);

  const setStock = useCallback((id: string, stock: number) => {
    setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, stock: Math.max(0, stock) } : p)));
  }, []);

  const upsertProduct = useCallback((p: Product) => {
    setProducts((ps) => {
      const i = ps.findIndex((x) => x.id === p.id);
      if (i >= 0) return ps.map((x, xi) => (xi === i ? p : x));
      return [p, ...ps];
    });
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts((ps) => ps.filter((p) => p.id !== id));
    setCart((c) => c.filter((i) => i.id !== id));
    setCompare((c) => c.filter((x) => x !== id));
  }, []);

  const upsertSupplier = useCallback((s: Supplier) => {
    setSuppliers((ss) => {
      const i = ss.findIndex((x) => x.id === s.id);
      if (i >= 0) return ss.map((x, xi) => (xi === i ? s : x));
      return [s, ...ss];
    });
  }, []);

  const removeSupplier = useCallback((id: string) => {
    setSuppliers((ss) => ss.filter((s) => s.id !== id));
  }, []);

  const subtotal = useMemo(
    () =>
      cart.reduce((s, i) => {
        const p = products.find((x) => x.id === i.id);
        return s + (p ? p.price * i.qty : 0);
      }, 0),
    [cart, products]
  );
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const value: StoreCtx = {
    cart, cartCount, subtotal, addToCart, setQty, removeItem, clearCart,
    compare, toggleCompare,
    orders, placeOrder, setStatus,
    coupons, addCoupon, toggleCoupon,
    products, setStock, upsertProduct, removeProduct,
    suppliers, upsertSupplier, removeSupplier,
    toasts, toast,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore outside provider");
  return ctx;
}

/* ================= Coupon validation ================= */
export function evalCoupon(code: string, subtotal: number, coupons: Coupon[]) {
  const c = coupons.find((x) => x.code.toLowerCase() === code.trim().toLowerCase());
  if (!c) return { ok: false as const, discount: 0, error: "الكوبون غير صحيح" };
  if (!c.active) return { ok: false as const, discount: 0, error: "هذا الكوبون غير فعّال حاليًا" };
  if (subtotal < c.min)
    return {
      ok: false as const, discount: 0,
      error: `يحتاج هذا الكوبون حد أدنى للطلب ${c.min.toLocaleString("en-US")} د.ع`,
    };
  const discount = c.type === "percent" ? Math.round((subtotal * c.value) / 100) : c.value;
  return { ok: true as const, discount: Math.min(discount, subtotal), coupon: c };
}

export const genOrderNo = () => String(Math.floor(100000 + Math.random() * 900000));
