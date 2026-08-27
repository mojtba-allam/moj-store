import React, { useEffect, useRef, useState } from "react";
import { OrderStatus, STATUS_META } from "./data";

/* ================= أيقونات SVG مخصصة ================= */
type IcProps = { className?: string; strokeWidth?: number };
const base = (p: IcProps) => ({
  className: p.className ?? "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: p.strokeWidth ?? 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
});

export const IcBag = (p: IcProps) => (
  <svg {...base(p)}>
    <path d="M5.5 8h13l-1 12.5h-11L5.5 8z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);
export const IcMenu = (p: IcProps) => (
  <svg {...base(p)}><path d="M4 7.5h16M4 12h10M4 16.5h16" /></svg>
);
export const IcX = (p: IcProps) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
/* السهم الأمامي في RTL يشير لليسار */
export const IcArrow = (p: IcProps) => (
  <svg {...base(p)}><path d="M19 12H5.5M10.5 6.5L5 12l5.5 5.5" /></svg>
);
export const IcArrowBack = (p: IcProps) => (
  <svg {...base(p)}><path d="M5 12h13.5M13.5 6.5L19 12l-5.5 5.5" /></svg>
);
export const IcPlus = (p: IcProps) => (
  <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
);
export const IcMinus = (p: IcProps) => (
  <svg {...base(p)}><path d="M5 12h14" /></svg>
);
export const IcCheck = (p: IcProps) => (
  <svg {...base(p)}><path d="M4.5 12.5l5 5L19.5 7" /></svg>
);
export const IcPlay = (p: IcProps) => (
  <svg {...base(p)}><path d="M8.5 5.5v13l10-6.5-10-6.5z" fill="currentColor" stroke="none" /></svg>
);
export const IcPhone = (p: IcProps) => (
  <svg {...base(p)}>
    <path d="M5 4.5h4l1.5 4.5-2.2 1.6a12.5 12.5 0 0 0 5.1 5.1l1.6-2.2 4.5 1.5v4a1.5 1.5 0 0 1-1.6 1.5C10.5 20 4 13.5 3.5 6.1A1.5 1.5 0 0 1 5 4.5z" />
  </svg>
);
export const IcWhatsApp = (p: IcProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z" />
    <path d="M9 8.8c-.3 1.8 2.4 5.6 4.9 6.1.8.2 1.7-.4 1.8-1.1l-1.9-1.1-1 .8c-.9-.4-1.7-1.2-2.1-2.1l.8-1-1.1-1.9c-.7.1-1.3.6-1.4 1.3z" fill="currentColor" stroke="none" />
  </svg>
);
export const IcPlug = (p: IcProps) => (
  <svg {...base(p)}>
    <path d="M9 3.5V8M15 3.5V8M7 8h10v3a5 5 0 0 1-10 0V8zM12 16v4.5" />
  </svg>
);
export const IcBattery = (p: IcProps) => (
  <svg {...base(p)}>
    <rect x="3" y="8" width="15" height="8" rx="2" />
    <path d="M21 11v2M6 11v2M9.5 11v2" />
  </svg>
);
export const IcTrash = (p: IcProps) => (
  <svg {...base(p)}>
    <path d="M5 7h14M9.5 7V5h5v2M7 7l.8 13h8.4L17 7M10 10.5v6M14 10.5v6" />
  </svg>
);
export const IcPrint = (p: IcProps) => (
  <svg {...base(p)}>
    <path d="M7 8V3.5h10V8M7 17H4.5V9.5h15V17H17M7 14.5h10v6H7v-6z" />
  </svg>
);
export const IcDownload = (p: IcProps) => (
  <svg {...base(p)}><path d="M12 4v11M7.5 11L12 15.5 16.5 11M4.5 19.5h15" /></svg>
);
export const IcChevron = (p: IcProps) => (
  <svg {...base(p)}><path d="M6 9.5l6 6 6-6" /></svg>
);
export const IcBox = (p: IcProps) => (
  <svg {...base(p)}>
    <path d="M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4v-9z" />
    <path d="M3.5 7.5L12 11.5l8.5-4M12 11.5v9" />
  </svg>
);
export const IcChart = (p: IcProps) => (
  <svg {...base(p)}><path d="M4 20V4M4 20h16M8.5 16v-5M12.5 16V7.5M16.5 16v-3" /></svg>
);
export const IcClock = (p: IcProps) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
export const IcPin = (p: IcProps) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.2" />
  </svg>
);
export const IcTruck = (p: IcProps) => (
  <svg {...base(p)}>
    <path d="M3 6.5h11v10H3zM14 10h4l3 3v3.5h-3" />
    <circle cx="7" cy="17.5" r="1.8" /><circle cx="16.5" cy="17.5" r="1.8" />
  </svg>
);
export const IcShield = (p: IcProps) => (
  <svg {...base(p)}><path d="M12 3.5l7 2.5v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-2.5z" /></svg>
);
export const IcCompare = (p: IcProps) => (
  <svg {...base(p)}><path d="M8 4L4.5 7.5 8 11M4.5 7.5H15M16 13l3.5 3.5L16 20M19.5 16.5H9" /></svg>
);

/* ================= الشعار ================= */
export function Logo({ dark = false, small = false }: { dark?: boolean; small?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg viewBox="0 0 32 32" className={small ? "w-7 h-7" : "w-9 h-9"}>
        <rect width="32" height="32" rx="7" fill={dark ? "#F7F5F0" : "#1C1C1A"} />
        <path d="M16 7c4 0 7 3.2 7 7.2 0 2.6-1.3 4.4-2.8 5.8H11.8C10.3 18.6 9 16.8 9 14.2 9 10.2 12 7 16 7z" fill={dark ? "#1C1C1A" : "#F7F5F0"} />
        <rect x="15" y="20" width="2" height="4" fill="#8A8F63" />
        <rect x="12" y="24.5" width="8" height="1.8" rx="0.9" fill={dark ? "#1C1C1A" : "#F7F5F0"} />
      </svg>
      {!small && (
        <span className="leading-none">
          <span className={`block font-display font-bold text-[1.45rem] ${dark ? "text-paper" : "text-ink"}`}>مشكاة</span>
          <span className={`block text-[0.55rem] tracking-[0.42em] font-bold mt-0.5 ${dark ? "text-paper/60" : "text-mute"}`}>MISHKAT</span>
        </span>
      )}
    </span>
  );
}

/* ================= Reveal (scroll) ================= */
export function Reveal({
  children, className = "", delay = 0, as = "div",
}: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "span" | "article" }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={`rv ${className}`} style={{ ["--rvd" as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ================= عناصر مشتركة ================= */
export function Eyebrow({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[0.7rem] font-bold text-olive">
      {n && <span className="num text-ink/50 text-[0.65rem] tracking-widest font-body">{n}</span>}
      <span className="w-6 h-px bg-olive/60 inline-block" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHead({
  n, title, action, actionHref,
}: { n?: string; title: string; action?: string; actionHref?: string }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
      <div>
        <Eyebrow n={n}>{n ? "قسم" : "مشكاة"}</Eyebrow>
        <h2 className="font-display font-bold text-3xl md:text-[2.6rem] leading-tight mt-3 text-ink">{title}</h2>
      </div>
      {action && actionHref && (
        <a href={`#${actionHref}`} className="tl text-sm font-bold text-ink whitespace-nowrap pb-1 hidden sm:inline-flex">
          {action}
          <IcArrow className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}

export function StatusPill({ s }: { s: OrderStatus }) {
  const m = STATUS_META[s];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.7rem] font-bold ${m.tone}`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.dot === "#1c1c1a" ? "#f7f5f0" : m.dot, opacity: 0.9 }} />
      {m.label}
    </span>
  );
}

export function Qty({
  value, onChange, max, size = "md",
}: { value: number; onChange: (n: number) => void; max: number; size?: "sm" | "md" }) {
  const btn = `grid place-items-center text-ink/70 hover:text-ink hover:bg-paper transition-colors disabled:opacity-30 disabled:pointer-events-none ${size === "sm" ? "w-7 h-7" : "w-10 h-12"}`;
  return (
    <div className={`inline-flex items-stretch border border-line bg-surface ${size === "sm" ? "h-7" : "h-12"}`}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} aria-label="إنقاص">
        <IcMinus className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </button>
      <span className={`num grid place-items-center font-bold ${size === "sm" ? "w-8 text-xs" : "w-12 text-sm"}`}>{value}</span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="زيادة">
        <IcPlus className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </button>
    </div>
  );
}

export function Modal({ onClose, children, wide = false }: { onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center p-4" role="dialog" aria-modal>
      <button className="absolute inset-0 bg-ink/60 cursor-default" onClick={onClose} aria-label="إغلاق" />
      <div className={`modal-in relative bg-paper w-full ${wide ? "max-w-4xl" : "max-w-xl"} max-h-[90vh] overflow-y-auto`}>
        <button onClick={onClose} className="absolute top-3 left-3 z-10 w-9 h-9 grid place-items-center bg-paper/90 border border-line hover:bg-paper transition-colors" aria-label="إغلاق">
          <IcX className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

/* مشغل فيديو تعريفي (محاكاة) */
export function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const iv = window.setInterval(() => setT((x) => (x >= 45 ? 0 : x + 0.25)), 250);
    return () => window.clearInterval(iv);
  }, [playing]);
  const mm = (s: number) => `0:${String(Math.floor(s)).padStart(2, "0")}`;
  return (
    <Modal onClose={onClose} wide>
      <div className="relative aspect-video bg-ink overflow-hidden">
        <img src={src} alt={title} className={`w-full h-full object-cover opacity-90 ${playing ? "kb" : ""}`} />
        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink/80 to-transparent">
          <div className="flex items-center gap-4 text-paper">
            <button onClick={() => setPlaying((p) => !p)} className="w-11 h-11 grid place-items-center border border-paper/40 hover:bg-paper/10 transition-colors" aria-label="تشغيل/إيقاف">
              {playing ? <span className="flex gap-1"><i className="w-1 h-4 bg-paper inline-block" /><i className="w-1 h-4 bg-paper inline-block" /></span> : <IcPlay className="w-4 h-4" />}
            </button>
            <div className="flex-1">
              <div className="h-0.5 bg-paper/25 mb-2"><div className="h-full bg-olive transition-[width] duration-200" style={{ width: `${(t / 45) * 100}%` }} /></div>
              <div className="flex items-center justify-between text-[0.7rem] font-bold">
                <span className="num">{mm(t)} / 0:45</span>
                <span className="text-paper/80">{title} — فيديو تعريفي</span>
              </div>
            </div>
          </div>
        </div>
        <span className="absolute top-4 right-4 text-[0.65rem] font-bold text-paper/80 bg-ink/40 px-2 py-1">معاينة الفيديو</span>
      </div>
    </Modal>
  );
}

/* زر حذف بتأكيد من ضغطتين */
export function ConfirmBtn({
  onConfirm, label = "حذف", className = "",
}: { onConfirm: () => void; label?: string; className?: string }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const t = window.setTimeout(() => setArmed(false), 2600);
    return () => window.clearTimeout(t);
  }, [armed]);
  return (
    <button
      type="button"
      onClick={() => (armed ? (onConfirm(), setArmed(false)) : setArmed(true))}
      className={`border px-3 py-1.5 text-[0.62rem] font-bold transition-all whitespace-nowrap ${
        armed
          ? "bg-[#b0563f] border-[#b0563f] text-white"
          : "border-line bg-surface text-ink/60 hover:border-[#b0563f] hover:text-[#b0563f]"
      } ${className}`}
    >
      {armed ? "تأكيد الحذف؟" : label}
    </button>
  );
}

/* أكورديون */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="hairline-t">
      {items.map((it, i) => (
        <div key={i} className="hairline-b">
          <button className="w-full flex items-center justify-between gap-6 py-5 text-start group" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span className={`font-display font-semibold text-lg md:text-xl transition-colors ${open === i ? "text-olive" : "text-ink group-hover:text-olive"}`}>{it.q}</span>
            <IcChevron className={`w-4 h-4 shrink-0 text-mute transition-transform duration-300 ${open === i ? "rotate-180 text-olive" : ""}`} />
          </button>
          <div className={`acc-body ${open === i ? "open" : ""}`}>
            <div className="acc-inner">
              <p className="text-mute text-sm leading-7 pb-5 max-w-2xl">{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
