/* ================= مشكاة — البيانات (العراق) ================= */

export const IMG = {
  p1: "https://image.qwenlm.ai/generated-images/54aff61f-3590-4ab1-8cac-604e1426249f/_result.png",
  p2: "https://image.qwenlm.ai/generated-images/5f3c3225-e9b0-463c-9721-fc134b1a55be/_result.png",
  p3: "https://image.qwenlm.ai/generated-images/77905f1f-6637-4275-bf4e-a79d146e9def/_result.png",
  p4: "https://image.qwenlm.ai/generated-images/be044005-370e-4592-8e18-07d0d9f13c4e/_result.png",
  p5: "https://image.qwenlm.ai/generated-images/13619780-08d3-4818-94dd-51c496aaf754/_result.png",
  p6: "https://image.qwenlm.ai/generated-images/620d6f70-24db-434b-9e15-6c2e26d57cb2/_result.png",
  p7: "https://image.qwenlm.ai/generated-images/b98110ee-194d-4c7d-9239-d1be7962e5db/_result.png",
  p8: "https://image.qwenlm.ai/generated-images/34c488a2-2d09-4ca2-a4ab-ce401de34581/_result.png",
  hero: "https://image.qwenlm.ai/generated-images/38f09328-4120-437e-8716-3f520d384bf6/_result.png",
  life: "https://image.qwenlm.ai/generated-images/dfab5bc4-384f-44a3-9aa8-c97bba07650a/_result.png",
};

export type Charging = "rechargeable" | "plug";
export interface ProductColor { name: string; hex: string }
export interface Product {
  id: string;
  name: string;
  category: "مكتبية" | "طاولة" | "محمولة";
  price: number;
  oldPrice?: number;
  image: string;
  colors: ProductColor[];
  sizes: string[];
  charging: Charging;
  stock: number;
  sold: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  tagline: string;
  material: string;
  brightness: string;
  lightTemp: string;
  battery: string;
  height: string;
  weight: string;
  warranty: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "hala", name: "هالة ٠١", category: "مكتبية",
    price: 45000, oldPrice: 55000, image: IMG.p1,
    colors: [
      { name: "أسود", hex: "#2a2a28" },
      { name: "أوف-وايت", hex: "#e9e4da" },
      { name: "زيتوني", hex: "#8a8f63" },
    ],
    sizes: ["وسط", "كبير"], charging: "plug", stock: 14, sold: 210, isBestSeller: true,
    tagline: "قبة معدنية بلمسة إطفاء تدريجي.",
    material: "معدن مطلي بودرة", brightness: "800 لومن", lightTemp: "2700K دافئ",
    battery: "—", height: "42 سم", weight: "1.8 كجم", warranty: "سنتان",
  },
  {
    id: "nafha", name: "نفحة", category: "طاولة",
    price: 32500, image: IMG.p2,
    colors: [
      { name: "كريمي", hex: "#e8e0d0" },
      { name: "طيني", hex: "#b0876f" },
    ],
    sizes: ["صغير", "وسط"], charging: "plug", stock: 9, sold: 96, isNew: true,
    tagline: "قاعدة سيراميك مصقولة يدويًا.",
    material: "سيراميك + كتان", brightness: "550 لومن", lightTemp: "3000K دافئ",
    battery: "—", height: "34 سم", weight: "1.4 كجم", warranty: "سنتان",
  },
  {
    id: "ghosn", name: "غصن", category: "طاولة",
    price: 52000, oldPrice: 62500, image: IMG.p3,
    colors: [
      { name: "زيتوني", hex: "#8a8f63" },
      { name: "أسود", hex: "#2a2a28" },
      { name: "كريمي", hex: "#e8e0d0" },
    ],
    sizes: ["وسط", "كبير"], charging: "rechargeable", stock: 5, sold: 340, isBestSeller: true,
    tagline: "فطر السبعينات، ببطارية تدوم 12 ساعة.",
    material: "معدن مطلي", brightness: "450 لومن", lightTemp: "2700K دافئ",
    battery: "12 ساعة", height: "30 سم", weight: "1.1 كجم", warranty: "سنة",
  },
  {
    id: "rahal", name: "رحّال", category: "محمولة",
    price: 27500, image: IMG.p4,
    colors: [
      { name: "رملي", hex: "#c9b896" },
      { name: "أسود", hex: "#2a2a28" },
    ],
    sizes: ["صغير"], charging: "rechargeable", stock: 22, sold: 150, isNew: true,
    tagline: "فانوس خفيف، ينتقل معك من غرفة لغرفة.",
    material: "ألومنيوم", brightness: "350 لومن", lightTemp: "3000K دافئ",
    battery: "20 ساعة", height: "24 سم", weight: "0.7 كجم", warranty: "سنة",
  },
  {
    id: "anbar", name: "عنبر", category: "طاولة",
    price: 68000, image: IMG.p5,
    colors: [
      { name: "عنبري", hex: "#c98a3d" },
      { name: "دخاني", hex: "#6b6560" },
    ],
    sizes: ["وسط", "كبير"], charging: "plug", stock: 7, sold: 260, isBestSeller: true,
    tagline: "زجاج مضلّع يبعثر الضوء كالعنبر.",
    material: "زجاج + نحاس", brightness: "700 لومن", lightTemp: "2400K دافئ جدًا",
    battery: "—", height: "38 سم", weight: "2.2 كجم", warranty: "سنتان",
  },
  {
    id: "qaswa", name: "قصوى", category: "مكتبية",
    price: 24000, image: IMG.p6,
    colors: [
      { name: "خرساني", hex: "#a8a49c" },
      { name: "فحمي", hex: "#4a4844" },
    ],
    sizes: ["صغير"], charging: "plug", stock: 0, sold: 88, isNew: true,
    tagline: "أسطوانة خرسانية، ضوء يطلع من القلب.",
    material: "خرسانة مصقولة", brightness: "400 لومن", lightTemp: "3000K دافئ",
    battery: "—", height: "26 سم", weight: "1.9 كجم", warranty: "سنة",
  },
  {
    id: "ofoq", name: "أفق", category: "مكتبية",
    price: 89000, oldPrice: 105000, image: IMG.p7,
    colors: [
      { name: "نحاسي", hex: "#b08d57" },
      { name: "أسود", hex: "#2a2a28" },
    ],
    sizes: ["كبير"], charging: "plug", stock: 4, sold: 120,
    tagline: "ذراع مفصلي وظل كتان، للقراءة الطويلة.",
    material: "نحاس + كتان", brightness: "900 لومن", lightTemp: "2700K دافئ",
    battery: "—", height: "52 سم", weight: "2.6 كجم", warranty: "3 سنوات",
  },
  {
    id: "khashab", name: "خشاب", category: "طاولة",
    price: 42500, image: IMG.p8,
    colors: [
      { name: "جوز", hex: "#6b4f3a" },
      { name: "بلوط", hex: "#c4a379" },
    ],
    sizes: ["صغير", "وسط"], charging: "rechargeable", stock: 16, sold: 175, isNew: true,
    tagline: "جوز طبيعي وظل مكسّر بضوء ناعم.",
    material: "خشب جوز + قماش", brightness: "500 لومن", lightTemp: "2900K دافئ",
    battery: "9 ساعات", height: "31 سم", weight: "1.3 كجم", warranty: "سنتان",
  },
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);
export const BEST = PRODUCTS.filter((p) => p.isBestSeller);
export const NEW = PRODUCTS.filter((p) => p.isNew);
export const OFFERS = PRODUCTS.filter((p) => p.oldPrice);

/* ================= المحافظات العراقية والتوصيل ================= */
export interface Gov { name: string; fee: number }
export const GOVS: Gov[] = [
  { name: "بغداد", fee: 4000 },
  { name: "البصرة", fee: 7000 },
  { name: "نينوى", fee: 7000 },
  { name: "أربيل", fee: 6000 },
  { name: "السليمانية", fee: 6000 },
  { name: "دهوك", fee: 6500 },
  { name: "كركوك", fee: 5500 },
  { name: "الأنبار", fee: 6000 },
  { name: "بابل", fee: 4500 },
  { name: "كربلاء", fee: 5000 },
  { name: "النجف", fee: 5000 },
  { name: "القادسية", fee: 5500 },
  { name: "المثنى", fee: 6500 },
  { name: "ذي قار", fee: 6000 },
  { name: "ميسان", fee: 6000 },
  { name: "واسط", fee: 5000 },
  { name: "صلاح الدين", fee: 6000 },
  { name: "ديالى", fee: 5000 },
];

/* ================= الكوبونات ================= */
export interface Coupon { code: string; type: "percent" | "amount"; value: number; min: number; active: boolean }
export const SEED_COUPONS: Coupon[] = [
  { code: "DAW15", type: "percent", value: 15, min: 0, active: true },
  { code: "NURO5000", type: "amount", value: 5000, min: 50000, active: true },
  { code: "MISHKAT10", type: "percent", value: 10, min: 30000, active: true },
  { code: "NUUR25", type: "percent", value: 25, min: 120000, active: false },
];

/* ================= الطلبات ================= */
export type OrderStatus =
  | "new" | "confirmed" | "preparing" | "shipped" | "delivered"
  | "cancelled" | "returned" | "exchanged";

export interface OrderItem {
  id: string; name: string; image: string; color: string; size: string; qty: number; price: number;
}
export interface Order {
  no: string; name: string; phone: string; gov: string; area: string; landmark: string;
  notes?: string; items: OrderItem[]; subtotal: number; discount: number; coupon?: string;
  shipping: number; total: number; status: OrderStatus; date: string;
}

export const STATUS_META: Record<OrderStatus, { label: string; tone: string; dot: string; final?: boolean }> = {
  new:       { label: "جديد",        tone: "bg-ink text-paper",        dot: "#1c1c1a" },
  confirmed: { label: "تم التأكيد",  tone: "bg-sand text-ink",         dot: "#d8d1c3" },
  preparing: { label: "قيد التجهيز", tone: "bg-olive/15 text-olive",   dot: "#8a8f63" },
  shipped:   { label: "تم الشحن",    tone: "bg-ink text-paper",        dot: "#1c1c1a" },
  delivered: { label: "تم التسليم",  tone: "bg-olive text-white",      dot: "#8a8f63" },
  cancelled: { label: "ملغي",        tone: "bg-[#b0563f]/15 text-[#b0563f]", dot: "#b0563f", final: true },
  returned:  { label: "مرتجع",       tone: "bg-[#b0563f]/15 text-[#b0563f]", dot: "#b0563f", final: true },
  exchanged: { label: "مستبدل",      tone: "bg-[#b0563f]/15 text-[#b0563f]", dot: "#b0563f", final: true },
};

export const TRACK_FLOW: OrderStatus[] = ["new", "confirmed", "preparing", "shipped", "delivered"];

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

export const SEED_ORDERS: Order[] = [
  {
    no: "384721", name: "سارة عبد الرحمن", phone: "07701234567", gov: "بغداد", area: "الكرادة", landmark: "قرب الجسر المعلق، مجمع البريد",
    notes: "الاتصال قبل التسليم بساعة.",
    items: [
      { id: "hala", name: "هالة ٠١", image: IMG.p1, color: "أسود", size: "وسط", qty: 1, price: 45000 },
      { id: "rahal", name: "رحّال", image: IMG.p4, color: "رملي", size: "صغير", qty: 1, price: 27500 },
    ],
    subtotal: 72500, discount: 5000, coupon: "NURO5000", shipping: 4000, total: 71500, status: "shipped", date: daysAgo(1),
  },
  {
    no: "384690", name: "مهند الجبوري", phone: "07811234567", gov: "البصرة", area: "العشار", landmark: "قرب بريد العشار العام",
    items: [{ id: "ghosn", name: "غصن", image: IMG.p3, color: "زيتوني", size: "وسط", qty: 2, price: 52000 }],
    subtotal: 104000, discount: 15600, coupon: "DAW15", shipping: 7000, total: 95400, status: "preparing", date: daysAgo(2),
  },
  {
    no: "384655", name: "رند الحسني", phone: "07501234567", gov: "أربيل", area: "عنكاوا", landmark: "شارع 60 متري، مقابل مول فاميلي",
    items: [{ id: "anbar", name: "عنبر", image: IMG.p5, color: "عنبري", size: "كبير", qty: 1, price: 68000 }],
    subtotal: 68000, discount: 0, shipping: 6000, total: 74000, status: "confirmed", date: daysAgo(3),
  },
  {
    no: "384612", name: "حيدر الساعدي", phone: "07711234567", gov: "النجف", area: "الحنانة", landmark: "مكتبة الرازي",
    items: [
      { id: "nafha", name: "نفحة", image: IMG.p2, color: "كريمي", size: "وسط", qty: 1, price: 32500 },
      { id: "khashab", name: "خشاب", image: IMG.p8, color: "جوز", size: "صغير", qty: 1, price: 42500 },
    ],
    subtotal: 75000, discount: 0, shipping: 5000, total: 80000, status: "delivered", date: daysAgo(5),
  },
  {
    no: "384598", name: "آيات النعيمي", phone: "07801234567", gov: "بغداد", area: "المنصور", landmark: "شارع 14 رمضان",
    items: [{ id: "ofoq", name: "أفق", image: IMG.p7, color: "نحاسي", size: "كبير", qty: 1, price: 89000 }],
    subtotal: 89000, discount: 0, shipping: 4000, total: 93000, status: "delivered", date: daysAgo(7),
  },
  {
    no: "384570", name: "كرار التميمي", phone: "07721234567", gov: "واسط", area: "الكوت", landmark: "قرب جسر الكوت الحديدي",
    items: [{ id: "qaswa", name: "قصوى", image: IMG.p6, color: "خرساني", size: "صغير", qty: 2, price: 24000 }],
    subtotal: 48000, discount: 4800, coupon: "MISHKAT10", shipping: 5000, total: 48200, status: "cancelled", date: daysAgo(9),
  },
  {
    no: "384534", name: "زينب الموسوي", phone: "07831234567", gov: "القادسية", area: "الديوانية", landmark: "ساحة الساعة",
    items: [{ id: "ghosn", name: "غصن", image: IMG.p3, color: "أسود", size: "كبير", qty: 1, price: 52000 }],
    subtotal: 52000, discount: 0, shipping: 5500, total: 57500, status: "returned", date: daysAgo(12),
  },
  {
    no: "384501", name: "أحمد الخزرجي", phone: "07901234567", gov: "بغداد", area: "الأعظمية", landmark: "شارع عمر بن عبد العزيز",
    items: [{ id: "hala", name: "هالة ٠١", image: IMG.p1, color: "زيتوني", size: "كبير", qty: 2, price: 45000 }],
    subtotal: 90000, discount: 13500, coupon: "DAW15", shipping: 4000, total: 80500, status: "delivered", date: daysAgo(15),
  },
  {
    no: "384477", name: "ياسمين الدلوي", phone: "07511234567", gov: "دهوك", area: "زاخو", landmark: "قرب جسر دلال",
    items: [{ id: "khashab", name: "خشاب", image: IMG.p8, color: "بلوط", size: "وسط", qty: 1, price: 42500 }],
    subtotal: 42500, discount: 0, shipping: 6500, total: 49000, status: "exchanged", date: daysAgo(18),
  },
  {
    no: "384445", name: "مصطفى المشهداني", phone: "07731234567", gov: "نينوى", area: "الموصل — الجانب الأيسر", landmark: "بوابة جامعة الموصل",
    items: [{ id: "rahal", name: "رحّال", image: IMG.p4, color: "أسود", size: "صغير", qty: 3, price: 27500 }],
    subtotal: 82500, discount: 0, shipping: 7000, total: 89500, status: "delivered", date: daysAgo(21),
  },
];

/* ================= الموردون ================= */
export interface Supplier {
  id: string; name: string; contact: string; phone: string; notes: string;
  products: { productId: string; suppliedQty: number; orderedQty: number; requestedQty: number }[];
  comm: "ممتاز" | "جيد" | "بانتظار رد";
}
export const SEED_SUPPLIERS: Supplier[] = [
  {
    id: "s1", name: "الرافدين للإضاءة — بغداد", contact: "أ. رعد السامرائي", phone: "07901112233",
    notes: "يفضّل التواصل صباحًا. التوريد خلال 10 أيام من مخازن بغداد.",
    products: [
      { productId: "hala", suppliedQty: 40, orderedQty: 26, requestedQty: 0 },
      { productId: "ofoq", suppliedQty: 12, orderedQty: 8, requestedQty: 0 },
    ],
    comm: "ممتاز",
  },
  {
    id: "s2", name: "ورشة بيت الطين للسيراميك — كربلاء", contact: "أ. نور الخفاجي", phone: "07705556666",
    notes: "تشغيلة يدوية — الكميات محدودة كل شهر.",
    products: [{ productId: "nafha", suppliedQty: 25, orderedQty: 16, requestedQty: 0 }],
    comm: "جيد",
  },
  {
    id: "s3", name: "NORD Import — تركيا", contact: "Lina — orders@nord.tr", phone: "+90 532 555 0192",
    notes: "شحن بري عبر منفذ إبراهيم الخليل، مدة الوصول 2–3 أسابيع.",
    products: [
      { productId: "ghosn", suppliedQty: 60, orderedQty: 55, requestedQty: 30 },
      { productId: "rahal", suppliedQty: 50, orderedQty: 28, requestedQty: 20 },
      { productId: "khashab", suppliedQty: 30, orderedQty: 14, requestedQty: 15 },
    ],
    comm: "بانتظار رد",
  },
  {
    id: "s4", name: "سوق الصفافير للنحاس — بغداد", contact: "معلم جاسم الصفار", phone: "07811119999",
    notes: "قطع نحاس مصنعة حسب الطلب.",
    products: [{ productId: "anbar", suppliedQty: 20, orderedQty: 13, requestedQty: 10 }],
    comm: "جيد",
  },
];

/* ================= الأسئلة الشائعة ================= */
export const FAQS = [
  { q: "كيف يتم الدفع؟", a: "الدفع عند الاستلام فقط — كاش لمندوب التوصيل وقت استلام الطلب، في كل المحافظات." },
  { q: "كم تستغرق مدة التوصيل؟", a: "من 2 إلى 5 أيام عمل حسب المحافظة، ويصلك اتصال من المندوب قبل التسليم." },
  { q: "هل يوجد ضمان؟", a: "نعم، كل مصابيح مشكاة عليها ضمان من سنة إلى 3 سنوات حسب الموديل، مكتوب في صفحة المنتج." },
  { q: "هل يمكن الإرجاع أو الاستبدال؟", a: "يمكن خلال 14 يومًا من الاستلام عبر واتساب، بشرط سلامة المنتج والتغليف الأصلي." },
  { q: "كم تدوم بطارية المصابيح القابلة للشحن؟", a: "من 9 إلى 20 ساعة تشغيل حسب الموديل ومستوى الإضاءة، وتُشحن بأي شاحن USB-C." },
  { q: "كيف أتابع طلبي؟", a: "من صفحة «تتبع الطلب» باستخدام رقم الطلب ورقم الموبايل المستخدم في الطلب." },
  { q: "هل الكمية المتاحة محدودة؟", a: "الكمية المتاحة لكل منتج تظهر في صفحته، ويمكنك طلب أي عدد طالما المخزون يكفي." },
];

/* ================= ثوابت المتجر ================= */
export const WHATSAPP = "9647701234567";
export const STORE_PHONE = "0770 123 4567";
export const STORE = {
  name: "مشكاة",
  latin: "MISHKAT",
  tagline: "إضاءة صُنعت لتبقى",
  address: "شارع السعدون، الكرادة، بغداد",
  hours: "يوميًا ١٠ صباحًا – ١٠ مساءً",
};

export const fmt = (n: number) => `${n.toLocaleString("en-US")} د.ع`;
export const discountPct = (p: Product) =>
  p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
