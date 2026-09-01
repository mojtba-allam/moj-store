/* أيقونات SVG مخصصة — خطوط رفيعة بأسلوب مشكاة */

type P = { className?: string; strokeWidth?: number };
const base = (className?: string) => className ?? "w-5 h-5";

export const IArrow = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IArrowUpLeft = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M17 17 7 7m0 0v9m0-9h9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IBag = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M6 8h12l-1 12H7L6 8Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" strokeLinecap="round" />
  </svg>
);

export const ICompare = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <rect x="4" y="5" width="6.5" height="14" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="13.5" y="5" width="6.5" height="9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IWhatsapp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)} aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.1 15.3l-.3-.2-2.4.6.7-2.4-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.1 4c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 3 4.7 4.1 2.3.9 2.8.7 3.3.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.4 0-.5L10 8.3c-.2-.4-.4-.5-.6-.5h-.5Z" />
  </svg>
);

export const IPhone = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M5 4h4l1.5 4L8 9.5a12 12 0 0 0 6.5 6.5l1.5-2.5 4 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IPlus = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

export const IMinus = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M5 12h14" strokeLinecap="round" />
  </svg>
);

export const ITrash = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m3 0-1 13H7L6 7m4 4v6m4-6v6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IX = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
  </svg>
);

export const ICheck = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IChevron = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IPlay = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)} aria-hidden>
    <path d="M8.5 6.5v11l9-5.5-9-5.5Z" />
  </svg>
);

export const IMenu = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
  </svg>
);

export const IBox = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12 4 7.5m8 4.5v9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ITruck = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" />
  </svg>
);

export const IPin = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M12 21s-6.5-5.6-6.5-10.4A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.6C18.5 15.4 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="10.5" r="2.2" />
  </svg>
);

export const IClock = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IEdit = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="m14.5 5.5 4 4L8 20H4v-4L14.5 5.5Zm2-2 2-2 4 4-2 2" strokeLinecap="round" strokeLinejoin="round" transform="scale(0.85) translate(1.5 1.5)" />
  </svg>
);

export const IPrint = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M7 8V4h10v4M5 8h14a1 1 0 0 1 1 1v7h-4v4H8v-4H4V9a1 1 0 0 1 1-1Zm3 8v-3h8v3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IDownload = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M12 4v11m0 0 4-4m-4 4-4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IChart = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M4 4v16h16M8 16v-5m4 5V8m4 8v-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IFile = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M6 3h8l4 4v14H6V3Zm8 0v4h4M9 12h6M9 16h6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IUsers = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <circle cx="9" cy="8.5" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M15.5 5.9a3 3 0 0 1 0 5.2M17 13.6a5.5 5.5 0 0 1 3.5 5.4" strokeLinecap="round" />
  </svg>
);

export const ITag = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="m12.5 3 8.5 8.5-9 9L3.5 12 4 5a1 1 0 0 1 1-1l7.5-1Z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IStore = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M4 9 5.5 4h13L20 9M4 9v11h16V9M4 9h16M9.5 20v-6h5v6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IDash = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <rect x="4" y="4" width="7" height="7" strokeLinejoin="round" />
    <rect x="13" y="4" width="7" height="7" strokeLinejoin="round" />
    <rect x="4" y="13" width="7" height="7" strokeLinejoin="round" />
    <rect x="13" y="13" width="7" height="7" strokeLinejoin="round" />
  </svg>
);

export const ILamp = ({ className, strokeWidth = 1.5 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={base(className)} aria-hidden>
    <path d="M8 3h8l3 8H5l3-8Zm4 8v7m-4 3h8m-4 0v-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** شعار مشكاة — مشكاة (كُوّة) بداخلها ضوء */
export const LogoMark = ({ className }: P) => (
  <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden>
    <path d="M8 34V18a12 12 0 0 1 24 0v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 34h30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="22" r="4.5" fill="#8A8F63" />
    <path d="M20 13.5v2M26 16l-1.4 1.4M14 16l1.4 1.4" stroke="#8A8F63" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
