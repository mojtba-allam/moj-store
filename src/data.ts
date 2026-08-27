/* ================= مشكاة — البيانات ================= */

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
    price: 1250, oldPrice: 1500, image: IMG.p1,
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
    price: 980, image: IMG.p2,
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
    price: 1450, oldPrice: 1700, image: IMG.p3,
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
    price: 890, image: IMG.p4,
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
    price: 1650, image: IMG.p5,
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
    price: 760, image: IMG.p6,
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
    price: 1980, oldPrice: 2300, image: IMG.p7,
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
    price: 1320, image: IMG.p8,
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

/* ================= المحافظات والتوصيل ================= */
export interface Gov { name: string; fee: number }
export const GOVS: Gov[] = [
  { name: "القاهرة", fee: 50 }, { name: "الجيزة", fee: 55 }, { name: "الإسكندرية", fee: 65 },
  { name: "القليوبية", fee: 60 }, { name: "الدقهلية", fee: 75 }, { name: "الشرقية", fee: 75 },
  { name: "الغربية", fee: 75 }, { name: "البحيرة", fee: 80 }, { name: "كفر الشيخ", fee: 80 },
  { name: "المنوفية", fee: 70 }, { name: "الفيوم", fee: 85 }, { name: "بني سويف", fee: 85 },
  { name: "المنيا", fee: 90 }, { name: "أسيوط", fee: 95 }, { name: "سوهاج", fee: 100 },
  { name: "قنا", fee: 105 }, { name: "الأقصر", fee: 110 }, { name: "أسوان", fee: 115 },
  { name: "البحر الأحمر", fee: 110 }, { name: "الوادي الجديد", fee: 120 },
  { name: "مطروح", fee: 110 }, { name: "شمال سيناء", fee: 115 }, { name: "جنوب سيناء", fee: 110 },
  { name: "السويس", fee: 70 }, { name: "الإسماعيلية", fee: 70 }, { name: "بورسعيد", fee: 70 },
  { name: "دمياط", fee: 75 },
];

/* ================= الكوبونات ================= */
export interface Coupon { code: string; type: "percent" | "amount"; value: number; min: number; active: boolean }
export const SEED_COUPONS: Coupon[] = [
  { code: "DAW15", type: "percent", value: 15, min: 0, active: true },
  { code: "NURO50", type: "amount", value: 50, min: 1500, active: true },
  { code: "MISHKAT10", type: "percent", value: 10, min: 800, active: true },
  { code: "NUUR25", type: "percent", value: 25, min: 3000, active: false },
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
    no: "384721", name: "سارة عبد الرحمن", phone: "01012345678", gov: "القاهرة", area: "المعادي", landmark: "برج النيل، الدور 4",
    notes: "الاتصال قبل التسليم بساعة.",
    items: [
      { id: "hala", name: "هالة ٠١", image: IMG.p1, color: "أسود", size: "وسط", qty: 1, price: 1250 },
      { id: "rahal", name: "رحّال", image: IMG.p4, color: "رملي", size: "صغير", qty: 1, price: 890 },
    ],
    subtotal: 2140, discount: 50, coupon: "NURO50", shipping: 50, total: 2140, status: "shipped", date: daysAgo(1),
  },
  {
    no: "384690", name: "محمد الشافعي", phone: "01198765432", gov: "الإسكندرية", area: "سموحة", landmark: "صيدلية العزبي",
    items: [{ id: "ghosn", name: "غصن", image: IMG.p3, color: "زيتوني", size: "وسط", qty: 2, price: 1450 }],
    subtotal: 2900, discount: 435, coupon: "DAW15", shipping: 65, total: 2530, status: "preparing", date: daysAgo(2),
  },
  {
    no: "384655", name: "ليلى حسن", phone: "01255551234", gov: "الجيزة", area: "الشيخ زايد", landmark: "مول العرب، بوابة 3",
    items: [{ id: "anbar", name: "عنبر", image: IMG.p5, color: "عنبري", size: "كبير", qty: 1, price: 1650 }],
    subtotal: 1650, discount: 0, shipping: 55, total: 1705, status: "confirmed", date: daysAgo(3),
  },
  {
    no: "384612", name: "عمر الدسوقي", phone: "01033334444", gov: "الدقهلية", area: "المنصورة", landmark: "جامعة المنصورة",
    items: [
      { id: "nafha", name: "نفحة", image: IMG.p2, color: "كريمي", size: "وسط", qty: 1, price: 980 },
      { id: "khashab", name: "خشاب", image: IMG.p8, color: "جوز", size: "صغير", qty: 1, price: 1320 },
    ],
    subtotal: 2300, discount: 0, shipping: 75, total: 2375, status: "delivered", date: daysAgo(5),
  },
  {
    no: "384598", name: "نور الهدى", phone: "01111112222", gov: "القاهرة", area: "مدينة نصر", landmark: "سيتي ستارز",
    items: [{ id: "ofoq", name: "أفق", image: IMG.p7, color: "نحاسي", size: "كبير", qty: 1, price: 1980 }],
    subtotal: 1980, discount: 0, shipping: 50, total: 2030, status: "delivered", date: daysAgo(7),
  },
  {
    no: "384570", name: "كريم فوزي", phone: "01099998888", gov: "الغربية", area: "طنطا", landmark: "محطة القطار",
    items: [{ id: "qaswa", name: "قصوى", image: IMG.p6, color: "خرساني", size: "صغير", qty: 2, price: 760 }],
    subtotal: 1520, discount: 152, coupon: "MISHKAT10", shipping: 75, total: 1443, status: "cancelled", date: daysAgo(9),
  },
  {
    no: "384534", name: "هبة سليم", phone: "01277776666", gov: "المنيا", area: "مدينة المنيا", landmark: "مستشفى الجامعة",
    items: [{ id: "ghosn", name: "غصن", image: IMG.p3, color: "أسود", size: "كبير", qty: 1, price: 1450 }],
    subtotal: 1450, discount: 0, shipping: 90, total: 1540, status: "returned", date: daysAgo(12),
  },
  {
    no: "384501", name: "أحمد مرعي", phone: "01512348765", gov: "القاهرة", area: "المقطم", landmark: "أسانسير الهضبة",
    items: [
      { id: "hala", name: "هالة ٠١", image: IMG.p1, color: "زيتوني", size: "كبير", qty: 2, price: 1250 },
    ],
    subtotal: 2500, discount: 375, coupon: "DAW15", shipping: 50, total: 2175, status: "delivered", date: daysAgo(15),
  },
  {
    no: "384477", name: "ياسمين عادل", phone: "01088887777", gov: "بورسعيد", area: "حي الشرق", landmark: "مبنى المحافظة",
    items: [{ id: "khashab", name: "خشاب", image: IMG.p8, color: "بلوط", size: "وسط", qty: 1, price: 1320 }],
    subtotal: 1320, discount: 0, shipping: 70, total: 1390, status: "exchanged", date: daysAgo(18),
  },
  {
    no: "384445", name: "مصطفى رضوان", phone: "01144443333", gov: "أسيوط", area: "شرق أسيوط", landmark: "المجمع الإداري",
    items: [{ id: "rahal", name: "رحّال", image: IMG.p4, color: "أسود", size: "صغير", qty: 3, price: 890 }],
    subtotal: 2670, discount: 0, shipping: 95, total: 2765, status: "delivered", date: daysAgo(21),
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
    id: "s1", name: "الشرق للإضاءة", contact: "أ. هشام قنديل", phone: "01022223333",
    notes: "يفضّل التواصل صباحًا. التوريد خلال 10 أيام.",
    products: [
      { productId: "hala", suppliedQty: 40, orderedQty: 26, requestedQty: 0 },
      { productId: "ofoq", suppliedQty: 12, orderedQty: 8, requestedQty: 0 },
    ],
    comm: "ممتاز",
  },
  {
    id: "s2", name: "بيت السيراميك", contact: "أ. منى الباز", phone: "01155556666",
    notes: "تشغيلة يدوية — الكميات محدودة كل شهر.",
    products: [{ productId: "nafha", suppliedQty: 25, orderedQty: 16, requestedQty: 0 }],
    comm: "جيد",
  },
  {
    id: "s3", name: "NORD Import", contact: "Lina — orders@nord.ly", phone: "+218 91 555 0192",
    notes: "شحن بحري، مدة الوصول 3–4 أسابيع.",
    products: [
      { productId: "ghosn", suppliedQty: 60, orderedQty: 55, requestedQty: 30 },
      { productId: "rahal", suppliedQty: 50, orderedQty: 28, requestedQty: 20 },
      { productId: "khashab", suppliedQty: 30, orderedQty: 14, requestedQty: 15 },
    ],
    comm: "بانتظار رد",
  },
  {
    id: "s4", name: "ورش النحاس بالقاهرة", contact: "معلم سيد", phone: "01288889999",
    notes: "قطع نحاس مصنعة حسب الطلب.",
    products: [{ productId: "anbar", suppliedQty: 20, orderedQty: 13, requestedQty: 10 }],
    comm: "جيد",
  },
];

/* ================= الأسئلة الشائعة ================= */
export const FAQS = [
  { q: "كيف يتم الدفع؟", a: "الدفع عند الاستلام فقط — كاش لمندوب التوصيل وقت استلام الطلب." },
  { q: "كم تستغرق مدة التوصيل؟", a: "من 2 إلى 5 أيام عمل حسب المحافظة، ويصلك اتصال من المندوب قبل التسليم." },
  { q: "هل يوجد ضمان؟", a: "نعم، كل مصابيح مشكاة عليها ضمان من سنة إلى 3 سنوات حسب الموديل، مكتوب في صفحة المنتج." },
  { q: "هل يمكن الإرجاع أو الاستبدال؟", a: "يمكن خلال 14 يومًا من الاستلام عبر واتساب، بشرط سلامة المنتج والتغليف الأصلي." },
  { q: "كم تدوم بطارية المصابيح القابلة للشحن؟", a: "من 9 إلى 20 ساعة تشغيل حسب الموديل ومستوى الإضاءة، وتُشحن بأي شاحن USB-C." },
  { q: "كيف أتابع طلبي؟", a: "من صفحة «تتبع الطلب» باستخدام رقم الطلب ورقم الموبايل المستخدم في الطلب." },
  { q: "هل الكمية المتاحة محدودة؟", a: "الكمية المتاحة لكل منتج تظهر في صفحته، ويمكنك طلب أي عدد طالما المخزون يكفي." },
];

/* ================= ثوابت المتجر ================= */
export const WHATSAPP = "201012345678";
export const STORE_PHONE = "010 1234 5678";
export const STORE = {
  name: "مشكاة",
  latin: "MISHKAT",
  tagline: "إضاءة صُنعت لتبقى",
  address: "١٢ شارع النيل، الدقي، الجيزة",
  hours: "يوميًا ١٠ صباحًا – ١٠ مساءً",
};

export const fmt = (n: number) => `${n.toLocaleString("en-EG")} ج.م`;
export const discountPct = (p: Product) =>
  p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
