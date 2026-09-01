import type { ReactNode } from "react";
import { LogoMark, IMinus, IPlus, IX } from "./icons";
import { useStore } from "../lib/state";

/* ---------- الهوية ---------- */
export function Wordmark({ dark = false, small = false }: { dark?: boolean; small?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${dark ? "text-paper" : "text-ink"}`}>
      <LogoMark className={small ? "w-8 h-8" : "w-9 h-9"} />
      <span className={`font-display font-bold leading-none ${small ? "text-2xl" : "text-[1.7rem]"}`}>مشكاة</span>
    </span>
  );
}

export function Eyebrow({ children, dark = false, num }: { children: ReactNode; dark?: boolean; num?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[0.72rem] font-medium tracking-wide ${dark ? "text-sand" : "text-mute"}`}>
      {num && <span className="font-display text-sm text-olive">{num}</span>}
      <span className="inline-block w-8 h-px bg-olive" />
      <span>{children}</span>
    </p>
  );
}

/* ---------- روابط وأزرار ---------- */
export function TLink({ children, onClick, href, dark = false, className = "" }: { children: ReactNode; onClick?: () => void; href?: string; dark?: boolean; className?: string }) {
  const cls = `tlink text-sm font-medium ${dark ? "text-paper" : "text-ink"} ${className}`;
  if (href)
    return (
      <a href={href} className={cls}>
        {children}
        <ArrowGlyph />
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
      <ArrowGlyph />
    </button>
  );
}

const ArrowGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="tlink-arrow w-4 h-4" aria-hidden>
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function SolidBtn({ children, onClick, type = "button", full = false, className = "" }: { children: ReactNode; onClick?: () => void; type?: "button" | "submit"; full?: boolean; className?: string }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-3 bg-ink text-paper px-8 py-3.5 text-sm font-medium transition-all duration-300 hover:bg-olive active:scale-[0.98] ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export function OutlineBtn({ children, onClick, href, full = false, className = "" }: { children: ReactNode; onClick?: () => void; href?: string; full?: boolean; className?: string }) {
  const cls = `inline-flex items-center justify-center gap-2.5 border border-ink/25 text-ink px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper active:scale-[0.98] ${full ? "w-full" : ""} ${className}`;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}

/* ---------- السعر ---------- */
export function Price({ price, oldPrice, size = "md", dark = false }: { price: number; oldPrice?: number; size?: "sm" | "md" | "lg"; dark?: boolean }) {
  const main = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base";
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={`${main} font-semibold ${dark ? "text-paper" : "text-ink"}`}>
        {price.toLocaleString("en-US")} <span className="text-[0.72em] font-normal opacity-70">د.ع</span>
      </span>
      {oldPrice && <span className={`text-xs line-through ${dark ? "text-sand/60" : "text-mute/70"}`}>{oldPrice.toLocaleString("en-US")}</span>}
    </span>
  );
}

export function DiscountTag({ price, oldPrice }: { price: number; oldPrice: number }) {
  const pct = Math.round((1 - price / oldPrice) * 100);
  return <span className="bg-olive text-paper text-[0.65rem] font-semibold px-2 py-1">خصم {pct}٪</span>;
}

export function Badge({ kind }: { kind: "جديد" | "الأكثر مبيعًا" | "خصم" }) {
  const map = {
    "جديد": "bg-ink text-paper",
    "الأكثر مبيعًا": "bg-paper text-ink border border-line",
    "خصم": "bg-olive text-paper",
  } as const;
  return <span className={`text-[0.65rem] font-semibold px-2.5 py-1 ${map[kind]}`}>{kind}</span>;
}

/* ---------- نقاط الألوان ---------- */
export function Swatches({ colors, hex, active, onPick, size = "md" }: { colors: string[]; hex: Record<string, string>; active?: string; onPick?: (c: string) => void; size?: "sm" | "md" }) {
  const s = size === "sm" ? "w-3.5 h-3.5" : "w-6 h-6";
  return (
    <span className="inline-flex items-center gap-1.5" dir="ltr">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          title={c}
          onClick={onPick ? () => onPick(c) : undefined}
          className={`${s} rounded-full border transition-transform duration-200 ${onPick ? "cursor-pointer hover:scale-110" : "cursor-default"} ${active === c ? "ring-2 ring-offset-2 ring-olive ring-offset-paper" : "border-black/10"}`}
          style={{ backgroundColor: hex[c] ?? "#ccc" }}
          aria-label={c}
        />
      ))}
    </span>
  );
}

/* ---------- عدّاد الكمية ---------- */
export function QtyStepper({ qty, onChange, max = 99, small = false }: { qty: number; onChange: (n: number) => void; max?: number; small?: boolean }) {
  const h = small ? "h-9" : "h-12";
  return (
    <span className={`inline-flex items-stretch border border-line bg-surface ${h}`}>
      <button type="button" aria-label="زيادة" disabled={qty >= max} onClick={() => onChange(Math.min(max, qty + 1))} className="w-10 grid place-items-center text-ink hover:bg-paper disabled:opacity-30 transition-colors">
        <IPlus className="w-4 h-4" />
      </button>
      <span className={`grid place-items-center font-medium text-sm ${small ? "w-10" : "w-12"}`}>{qty}</span>
      <button type="button" aria-label="إنقاص" disabled={qty <= 1} onClick={() => onChange(Math.max(1, qty - 1))} className="w-10 grid place-items-center text-ink hover:bg-paper disabled:opacity-30 transition-colors">
        <IMinus className="w-4 h-4" />
      </button>
    </span>
  );
}

/* ---------- عناوين الأقسام ---------- */
export function SectionHead({ num, eyebrow, title, link, dark = false, center = false }: { num?: string; eyebrow: string; title: string; link?: ReactNode; dark?: boolean; center?: boolean }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${center ? "text-center flex-col items-center" : ""}`}>
      <div>
        <Eyebrow num={num} dark={dark}>{eyebrow}</Eyebrow>
        <h2 className={`font-display font-bold text-4xl md:text-5xl mt-4 leading-[1.15] ${dark ? "text-paper" : "text-ink"}`}>{title}</h2>
      </div>
      {link}
    </div>
  );
}

/* ---------- نافذة منبثقة ---------- */
export function Modal({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: ReactNode; title?: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal>
      <button aria-label="إغلاق" className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] cursor-default" onClick={onClose} />
      <div className="toast-in relative bg-paper w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto border border-line shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-paper/95 backdrop-blur px-6 py-4 hairline-b">
          <h3 className="font-display font-bold text-xl">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-sand/40 transition-colors" aria-label="إغلاق النافذة">
            <IX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ---------- التوست ---------- */
export function ToastHost() {
  const { toastMsg } = useStore();
  if (!toastMsg) return null;
  return (
    <div className="fixed bottom-6 inset-x-0 z-[95] flex justify-center px-4 pointer-events-none">
      <div className="toast-in bg-ink text-paper text-sm font-medium px-5 py-3 shadow-xl flex items-center gap-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-olive inline-block" />
        {toastMsg}
      </div>
    </div>
  );
}

/* ---------- شريط المفاهيم الثابت (لصفحات الكونسبت) ---------- */
export function ConceptBar({ index, name }: { index: number; name: string }) {
  return (
    <div className="fixed bottom-5 left-5 z-[80] no-print">
      <div className="flex items-center gap-3 bg-ink text-paper pl-2 pr-4 py-2 shadow-xl text-xs">
        <span className="font-display text-base text-olive">0{index}</span>
        <span className="font-medium">{name}</span>
        <a href="#/" className="bg-paper/10 hover:bg-olive transition-colors px-3 py-1.5 font-medium">كل المفاهيم</a>
      </div>
    </div>
  );
}
