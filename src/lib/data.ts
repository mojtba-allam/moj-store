/* ------------------------------------------------------------------ */
/*  مشكاة — بيانات المتجر (بيانات تجريبية لأغراض التصميم)               */
/* ------------------------------------------------------------------ */

export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/9fb0a1df-8612-4bec-bddd-49e24cddea4d/_result.png",
  luna: "https://image.qwenlm.ai/generated-images/1cd782d3-33a4-4d10-8fcb-bd73265cd57a/_result.png",
  nimra: "https://image.qwenlm.ai/generated-images/389a7bcc-9df3-4783-aead-ed9339e72453/_result.png",
  qamar: "https://image.qwenlm.ai/generated-images/57eaf579-b9d5-4e59-b750-6ea7a2f3408c/_result.png",
  rawda: "https://image.qwenlm.ai/generated-images/63575280-6b9e-4985-8ba8-4cb03077c161/_result.png",
  ward: "https://image.qwenlm.ai/generated-images/7409ee07-29f0-41bd-8cd0-3538e3c3755c/_result.png",
  siraj: "https://image.qwenlm.ai/generated-images/33c774c5-5155-44dd-88ef-ad0a4ee98799/_result.png",
  desk: "https://image.qwenlm.ai/generated-images/7ece1e1f-d550-4bc9-990a-61dbd22c9f5e/_result.png",
  living: "https://image.qwenlm.ai/generated-images/37da0dd1-f20a-4ac0-ada1-091c3f82fb93/_result.png",
  glow: "https://image.qwenlm.ai/generated-images/4f385c89-568c-4082-831c-bfebc2153c3e/_result.png",
};

export type ProductType = "مكتبي" | "طاولة" | "قابل للشحن";

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  price: number;
  oldPrice?: number;
  img: string;
  altImg: string;
  gallery: string[];
  hasVideo?: boolean;
  colors: string[];
  colorHex: Record<string, string>;
  sizes: string[];
  charging: "قابل للشحن" | "يعمل مباشرة بالكهرباء";
  badge?: "جديد" | "الأكثر مبيعًا" | "خصم";
  isNew?: boolean;
  isBest?: boolean;
  isOffer?: boolean;
  stock: number;
  sold: number;
  desc: string;
  features: { label: string; value: string }[];
}

export const PRODUCTS: Product[] = [
  {
    id: "luna", name: "لونا — مصباح القبة", type: "مكتبي", price: 45000,
    img: IMG.luna, altImg: IMG.glow, gallery: [IMG.luna, IMG.glow, IMG.desk], hasVideo: true,
    colors: ["كريمي", "زيتوني", "أسود"], colorHex: { "كريمي": "#E9E2D2", "زيتوني": "#8A8F63", "أسود": "#1C1C1A" },
    sizes: ["صغير", "وسط"], charging: "يعمل مباشرة بالكهرباء", badge: "الأكثر مبيعًا", isBest: true,
    stock: 24, sold: 268,
    desc: "قبة سيراميك بضوء دافئ يكمّل مكتبك دون أن يشغله.",
    features: [
      { label: "القدرة", value: "9 واط LED" },
      { label: "درجة اللون", value: "2700K دافئ" },
      { label: "التعتيم", value: "3 مستويات" },
      { label: "طول الكابل", value: "1.5 م" },
    ],
  },
  {
    id: "luna-mini", name: "لونا ميني", type: "مكتبي", price: 32000,
    img: IMG.luna, altImg: IMG.desk, gallery: [IMG.luna, IMG.desk],
    colors: ["كريمي", "رملي"], colorHex: { "كريمي": "#E9E2D2", "رملي": "#D8D1C3" },
    sizes: ["صغير"], charging: "قابل للشحن", badge: "جديد", isNew: true,
    stock: 40, sold: 96,
    desc: "نسخة لونا المحمولة — تعمل حتى 12 ساعة بشحنة واحدة.",
    features: [
      { label: "البطارية", value: "12 ساعة تشغيل" },
      { label: "الشحن", value: "USB-C" },
      { label: "الوزن", value: "480 غم" },
      { label: "التعتيم", value: "لمس تدريجي" },
    ],
  },
  {
    id: "nimra", name: "نمرة — مصباح الذراع", type: "مكتبي", price: 62000,
    img: IMG.nimra, altImg: IMG.desk, gallery: [IMG.nimra, IMG.desk, IMG.glow], hasVideo: true,
    colors: ["زيتوني", "أسود", "نحاسي"], colorHex: { "زيتوني": "#8A8F63", "أسود": "#1C1C1A", "نحاسي": "#B08D57" },
    sizes: ["وسط"], charging: "يعمل مباشرة بالكهرباء", badge: "الأكثر مبيعًا", isBest: true,
    stock: 18, sold: 214,
    desc: "ذراع مفصلي بتوازن مثالي، وُلد للقراءة والعمل الطويل.",
    features: [
      { label: "الذراع", value: "مفصلي مزدوج" },
      { label: "القدرة", value: "12 واط LED" },
      { label: "التعتيم", value: "5 مستويات" },
      { label: "القاعدة", value: "ثقيلة ثابتة" },
    ],
  },
  {
    id: "nimra-pro", name: "نمرة برو", type: "مكتبي", price: 78000, oldPrice: 89000,
    img: IMG.nimra, altImg: IMG.glow, gallery: [IMG.nimra, IMG.glow],
    colors: ["أسود"], colorHex: { "أسود": "#1C1C1A" },
    sizes: ["كبير"], charging: "يعمل مباشرة بالكهرباء", badge: "خصم", isOffer: true,
    stock: 9, sold: 121,
    desc: "الذراع الأطول والرأس الأعرض — للمكاتب الكبيرة.",
    features: [
      { label: "الذراع", value: "وصول 85 سم" },
      { label: "القدرة", value: "15 واط LED" },
      { label: "ذاكرة", value: "حفظ آخر إضاءة" },
      { label: "الضمان", value: "سنتان" },
    ],
  },
  {
    id: "qamar", name: "قمر — المصباح المحمول", type: "قابل للشحن", price: 35000,
    img: IMG.qamar, altImg: IMG.living, gallery: [IMG.qamar, IMG.living, IMG.glow], hasVideo: true,
    colors: ["رملي", "أبيض"], colorHex: { "رملي": "#D8D1C3", "أبيض": "#F3F1EA" },
    sizes: ["صغير"], charging: "قابل للشحن", badge: "الأكثر مبيعًا", isBest: true,
    stock: 52, sold: 320,
    desc: "حصاة مضيئة تحملها معك من المكتب إلى غرفة النوم.",
    features: [
      { label: "البطارية", value: "18 ساعة تشغيل" },
      { label: "الشحن", value: "USB-C سريع" },
      { label: "التعتيم", value: "لمس تدريجي" },
      { label: "مقاومة", value: "رذاذ الماء IPX4" },
    ],
  },
  {
    id: "qamar-duo", name: "قمر ديو", type: "قابل للشحن", price: 39000,
    img: IMG.qamar, altImg: IMG.glow, gallery: [IMG.qamar, IMG.glow],
    colors: ["رملي"], colorHex: { "رملي": "#D8D1C3" },
    sizes: ["صغير"], charging: "قابل للشحن", badge: "جديد", isNew: true,
    stock: 33, sold: 54,
    desc: "نسختان من قمر مع قاعدة شحن مزدوجة واحدة.",
    features: [
      { label: "المحتوى", value: "مصباحان + قاعدة" },
      { label: "البطارية", value: "15 ساعة لكل وحدة" },
      { label: "الشحن", value: "قاعدة مغناطيسية" },
      { label: "الوزن", value: "390 غم للوحدة" },
    ],
  },
  {
    id: "rawda", name: "روضة — مصباح الكتان", type: "طاولة", price: 58000,
    img: IMG.rawda, altImg: IMG.living, gallery: [IMG.rawda, IMG.living],
    colors: ["بيج", "رمادي"], colorHex: { "بيج": "#E3D9C6", "رمادي": "#9B968C" },
    sizes: ["وسط", "كبير"], charging: "يعمل مباشرة بالكهرباء",
    stock: 27, sold: 143,
    desc: "ظلّ كتان طبيعي ينشر ضوءًا هادئًا في زوايا البيت.",
    features: [
      { label: "الظل", value: "كتان طبيعي" },
      { label: "القاعدة", value: "خشب زان" },
      { label: "القدرة", value: "حتى 40 واط E27" },
      { label: "الارتفاع", value: "46 سم" },
    ],
  },
  {
    id: "rawda-tall", name: "روضة الطويل", type: "طاولة", price: 68000,
    img: IMG.rawda, altImg: IMG.living, gallery: [IMG.rawda, IMG.living, IMG.glow],
    colors: ["بيج"], colorHex: { "بيج": "#E3D9C6" },
    sizes: ["كبير"], charging: "يعمل مباشرة بالكهرباء", badge: "جديد", isNew: true,
    stock: 15, sold: 38,
    desc: "القامة الأطول من روضة — بجانب الكنبة أو السرير.",
    features: [
      { label: "الارتفاع", value: "62 سم" },
      { label: "الظل", value: "كتان طبيعي" },
      { label: "المفتاح", value: "دوّار على القاعدة" },
      { label: "القدرة", value: "حتى 60 واط E27" },
    ],
  },
  {
    id: "ward", name: "ورد — الكرة الزجاجية", type: "طاولة", price: 52000, oldPrice: 64000,
    img: IMG.ward, altImg: IMG.living, gallery: [IMG.ward, IMG.living, IMG.glow], hasVideo: true,
    colors: ["كهرماني", "دخاني"], colorHex: { "كهرماني": "#C98F4E", "دخاني": "#6E6A63" },
    sizes: ["وسط"], charging: "يعمل مباشرة بالكهرباء", badge: "خصم", isOffer: true,
    stock: 21, sold: 158,
    desc: "زجاج مضلّع يحبس الغروب داخل غرفتك.",
    features: [
      { label: "الزجاج", value: "مضلّع يدويًا" },
      { label: "القدرة", value: "8 واط LED مدمج" },
      { label: "درجة اللون", value: "2200K كهرماني" },
      { label: "القاعدة", value: "معدن مطفي" },
    ],
  },
  {
    id: "hala", name: "هالة", type: "طاولة", price: 61000,
    img: IMG.ward, altImg: IMG.glow, gallery: [IMG.ward, IMG.glow],
    colors: ["كهرماني"], colorHex: { "كهرماني": "#C98F4E" },
    sizes: ["وسط"], charging: "يعمل مباشرة بالكهرباء", badge: "جديد", isNew: true,
    stock: 12, sold: 47,
    desc: "حلقة ضوء محيطي — قطعة حديثَة لكل طاولة جانبية.",
    features: [
      { label: "الإضاءة", value: "محيطية 360°" },
      { label: "القدرة", value: "10 واط LED" },
      { label: "التعتيم", value: "لمس 3 مستويات" },
      { label: "الارتفاع", value: "34 سم" },
    ],
  },
  {
    id: "siraj", name: "سراج — الشريط الخشبي", type: "مكتبي", price: 41000,
    img: IMG.siraj, altImg: IMG.desk, gallery: [IMG.siraj, IMG.desk],
    colors: ["جوزي", "أسود"], colorHex: { "جوزي": "#6B4F3A", "أسود": "#1C1C1A" },
    sizes: ["وسط"], charging: "يعمل مباشرة بالكهرباء",
    stock: 36, sold: 141,
    desc: "خشب جوز وخط ضوء واحد — بساطة تكفي المكتب كله.",
    features: [
      { label: "الجسم", value: "خشب جوز طبيعي" },
      { label: "القدرة", value: "10 واط LED" },
      { label: "التعتيم", value: "مستمر بعجلة" },
      { label: "الطول", value: "45 سم" },
    ],
  },
  {
    id: "siraj-mini", name: "سراج ميني", type: "مكتبي", price: 33000, oldPrice: 38000,
    img: IMG.siraj, altImg: IMG.glow, gallery: [IMG.siraj, IMG.glow, IMG.desk],
    colors: ["جوزي"], colorHex: { "جوزي": "#6B4F3A" },
    sizes: ["صغير"], charging: "قابل للشحن", badge: "خصم", isOffer: true, isNew: true,
    stock: 44, sold: 187,
    desc: "سراج بحجم أصغر وبطارية تصمد يومًا كاملًا.",
    features: [
      { label: "البطارية", value: "10 ساعات تشغيل" },
      { label: "الشحن", value: "USB-C" },
      { label: "الطول", value: "30 سم" },
      { label: "الوزن", value: "520 غم" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  المحافظات العراقية وأجور التوصيل (دينار عراقي)                      */
/* ------------------------------------------------------------------ */
export interface Governorate { name: string; shipping: number; }

export const GOVERNORATES: Governorate[] = [
  { name: "بغداد", shipping: 3000 },
  { name: "البصرة", shipping: 5000 },
  { name: "نينوى", shipping: 5000 },
  { name: "أربيل", shipping: 5000 },
  { name: "النجف", shipping: 4000 },
  { name: "كربلاء", shipping: 4000 },
  { name: "بابل", shipping: 4000 },
  { name: "الأنبار", shipping: 5000 },
  { name: "كركوك", shipping: 5000 },
  { name: "السليمانية", shipping: 5000 },
  { name: "دهوك", shipping: 6000 },
  { name: "ديالى", shipping: 4000 },
  { name: "صلاح الدين", shipping: 5000 },
  { name: "واسط", shipping: 4000 },
  { name: "القادسية", shipping: 4500 },
  { name: "ذي قار", shipping: 5000 },
  { name: "ميسان", shipping: 5000 },
  { name: "المثنى", shipping: 5500 },
];

/* ------------------------------------------------------------------ */
/*  الكوبونات                                                          */
/* ------------------------------------------------------------------ */
export interface Coupon {
  code: string;
  percent: number;
  minOrder: number;
  active: boolean;
  used: number;
  note?: string;
}

export const COUPONS: Coupon[] = [
  { code: "NUUR10", percent: 10, minOrder: 50000, active: true, used: 132, note: "خصم 10٪ للطلبات فوق 50 ألف" },
  { code: "MISHKAT15", percent: 15, minOrder: 100000, active: true, used: 48, note: "خصم 15٪ للطلبات فوق 100 ألف" },
  { code: "DAW5", percent: 5, minOrder: 0, active: true, used: 301, note: "ترحيبي — بدون حد أدنى" },
  { code: "RAMADAN20", percent: 20, minOrder: 150000, active: false, used: 89, note: "عرض موسمي منتهٍ" },
];

/* ------------------------------------------------------------------ */
/*  الأسئلة الشائعة                                                     */
/* ------------------------------------------------------------------ */
export const FAQS: { q: string; a: string }[] = [
  { q: "كم يستغرق التوصيل؟", a: "داخل بغداد 1–2 يوم عمل، وبقية المحافظات 2–4 أيام عمل." },
  { q: "كم تبلغ أجور التوصيل؟", a: "حسب المحافظة: بغداد 3,000 د.ع وبقية المحافظات من 4,000 إلى 6,000 د.ع، وتظهر لك قبل تأكيد الطلب." },
  { q: "هل الدفع عند الاستلام؟", a: "نعم، الدفع نقدًا عند استلام الطلب في جميع المحافظات. لا توجد أي رسوم إضافية." },
  { q: "هل يمكن الإرجاع أو الاستبدال؟", a: "نعم خلال 7 أيام من الاستلام. راسلنا عبر واتساب وسنرتّب كل شيء." },
  { q: "هل المصابيح قابلة للشحن؟", a: "بعض الموديلات تعمل ببطارية قابلة للشحن عبر USB-C، والبقية تعمل مباشرة بالكهرباء. التفاصيل في صفحة كل منتج." },
  { q: "هل يوجد ضمان؟", a: "جميع المصابيح مشمولة بضمان سنة ضد عيوب التصنيع، ونمرة برو بسنتين." },
  { q: "كيف أتتبّع طلبي؟", a: "من صفحة «تتبّع الطلب» أدخل رقم الطلب ورقم الموبايل وستظهر لك حالة الطلب مباشرة." },
  { q: "هل تتوفر مصابيح بكميات كبيرة؟", a: "نعم، للطلبات الكبيرة أو تجهيز المكاتب راسلنا عبر واتساب وسنخصص لك عرضًا." },
];

/* ------------------------------------------------------------------ */
/*  الطلبات (بيانات تجريبية)                                            */
/* ------------------------------------------------------------------ */
export const ORDER_STATUSES = ["جديد", "تم التأكيد", "قيد التجهيز", "تم الشحن", "تم التسليم"] as const;
export const FINAL_STATUSES = ["ملغي", "مرتجع", "مستبدل"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number] | (typeof FINAL_STATUSES)[number];

export interface OrderItem { productId: string; name: string; img: string; color: string; size: string; qty: number; price: number; }
export interface TimelineStep { status: string; date: string; }
export interface Order {
  id: string;
  name: string;
  phone: string;
  governorate: string;
  area: string;
  landmark: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  coupon?: string;
  shipping: number;
  total: number;
  status: OrderStatus;
  date: string;
  timeline: TimelineStep[];
}

export const SEED_ORDERS: Order[] = [
  {
    id: "384721", name: "علي الكرخي", phone: "07701234567", governorate: "بغداد", area: "المنصور", landmark: "قرب مجمع المنصور مول",
    notes: "الاتصال قبل التوصيل بساعة",
    items: [
      { productId: "luna", name: "لونا — مصباح القبة", img: IMG.luna, color: "كريمي", size: "وسط", qty: 1, price: 45000 },
      { productId: "qamar", name: "قمر — المصباح المحمول", img: IMG.qamar, color: "رملي", size: "صغير", qty: 2, price: 35000 },
    ],
    subtotal: 115000, discount: 11500, coupon: "NUUR10", shipping: 3000, total: 106500, status: "تم الشحن", date: "2025-11-02",
    timeline: [
      { status: "جديد", date: "2025-11-02" }, { status: "تم التأكيد", date: "2025-11-02" },
      { status: "قيد التجهيز", date: "2025-11-03" }, { status: "تم الشحن", date: "2025-11-04" },
    ],
  },
  {
    id: "384507", name: "مريم السعدي", phone: "07811234567", governorate: "البصرة", area: "العشار", landmark: "شارع الجزائر",
    items: [{ productId: "ward", name: "ورد — الكرة الزجاجية", img: IMG.ward, color: "كهرماني", size: "وسط", qty: 1, price: 52000 }],
    subtotal: 52000, discount: 0, shipping: 5000, total: 57000, status: "تم التسليم", date: "2025-10-27",
    timeline: [
      { status: "جديد", date: "2025-10-27" }, { status: "تم التأكيد", date: "2025-10-27" },
      { status: "قيد التجهيز", date: "2025-10-28" }, { status: "تم الشحن", date: "2025-10-29" }, { status: "تم التسليم", date: "2025-10-31" },
    ],
  },
  {
    id: "385102", name: "حسين الجبوري", phone: "07712345678", governorate: "أربيل", area: "عنكاوا", landmark: "قرب مستشفى روناهي",
    items: [{ productId: "nimra", name: "نمرة — مصباح الذراع", img: IMG.nimra, color: "زيتوني", size: "وسط", qty: 1, price: 62000 }],
    subtotal: 62000, discount: 0, shipping: 5000, total: 67000, status: "جديد", date: "2025-11-06",
    timeline: [{ status: "جديد", date: "2025-11-06" }],
  },
  {
    id: "384988", name: "زهراء المالكي", phone: "07901234567", governorate: "النجف", area: "حي الأمير", landmark: "مقابل مدرسة الخورنق",
    notes: "تغليف هدية لو سمحتم",
    items: [
      { productId: "qamar-duo", name: "قمر ديو", img: IMG.qamar, color: "رملي", size: "صغير", qty: 1, price: 39000 },
      { productId: "siraj-mini", name: "سراج ميني", img: IMG.siraj, color: "جوزي", size: "صغير", qty: 1, price: 33000 },
    ],
    subtotal: 72000, discount: 3600, coupon: "DAW5", shipping: 4000, total: 72400, status: "قيد التجهيز", date: "2025-11-04",
    timeline: [{ status: "جديد", date: "2025-11-04" }, { status: "تم التأكيد", date: "2025-11-05" }, { status: "قيد التجهيز", date: "2025-11-06" }],
  },
  {
    id: "384655", name: "عمر الدليمي", phone: "07711112222", governorate: "الأنبار", area: "الرمادي", landmark: "شارع 20",
    items: [{ productId: "rawda", name: "روضة — مصباح الكتان", img: IMG.rawda, color: "بيج", size: "وسط", qty: 1, price: 58000 }],
    subtotal: 58000, discount: 0, shipping: 5000, total: 63000, status: "ملغي", date: "2025-10-30",
    timeline: [{ status: "جديد", date: "2025-10-30" }, { status: "تم التأكيد", date: "2025-10-30" }, { status: "ملغي", date: "2025-10-31" }],
  },
  {
    id: "385210", name: "رند التميمي", phone: "07709876543", governorate: "كربلاء", area: "حي الحسين", landmark: "قرب مجسر الجمهورية",
    items: [{ productId: "luna-mini", name: "لونا ميني", img: IMG.luna, color: "كريمي", size: "صغير", qty: 3, price: 32000 }],
    subtotal: 96000, discount: 9600, coupon: "NUUR10", shipping: 4000, total: 90400, status: "تم التأكيد", date: "2025-11-05",
    timeline: [{ status: "جديد", date: "2025-11-05" }, { status: "تم التأكيد", date: "2025-11-06" }],
  },
  {
    id: "384301", name: "كاروان برزنجي", phone: "07501234567", governorate: "السليمانية", area: "باختياري", landmark: "شارع سالم",
    items: [
      { productId: "siraj", name: "سراج — الشريط الخشبي", img: IMG.siraj, color: "جوزي", size: "وسط", qty: 2, price: 41000 },
      { productId: "hala", name: "هالة", img: IMG.ward, color: "كهرماني", size: "وسط", qty: 1, price: 61000 },
    ],
    subtotal: 143000, discount: 14300, coupon: "NUUR10", shipping: 5000, total: 133700, status: "تم التسليم", date: "2025-10-21",
    timeline: [
      { status: "جديد", date: "2025-10-21" }, { status: "تم التأكيد", date: "2025-10-21" },
      { status: "قيد التجهيز", date: "2025-10-22" }, { status: "تم الشحن", date: "2025-10-24" }, { status: "تم التسليم", date: "2025-10-26" },
    ],
  },
  {
    id: "385333", name: "سارة النعيمي", phone: "07801234567", governorate: "كركوك", area: "رحيم آوة", landmark: "قرب سوق القيصرية",
    items: [{ productId: "nimra-pro", name: "نمرة برو", img: IMG.nimra, color: "أسود", size: "كبير", qty: 1, price: 78000 }],
    subtotal: 78000, discount: 0, shipping: 5000, total: 83000, status: "جديد", date: "2025-11-07",
    timeline: [{ status: "جديد", date: "2025-11-07" }],
  },
];

/* ------------------------------------------------------------------ */
/*  الموردون                                                           */
/* ------------------------------------------------------------------ */
export interface SupplierProduct { name: string; requested: number; ordered: number; }
export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  city: string;
  notes: string;
  commStatus: "نشط" | "بانتظار الرد" | "معلّق";
  lastOrder?: string;
  products: SupplierProduct[];
}

export const SEED_SUPPLIERS: Supplier[] = [
  {
    id: "s1", name: "بيت الضياء للاستيراد", contact: "مصطفى الراوي", phone: "07701112233", city: "بغداد",
    notes: "المورّد الأساسي للمصابيح المكتبية. الالتزام بالمواعيد ممتاز.", commStatus: "نشط", lastOrder: "2025-10-18",
    products: [
      { name: "لونا — مصباح القبة", requested: 60, ordered: 40 },
      { name: "نمرة — مصباح الذراع", requested: 40, ordered: 24 },
    ],
  },
  {
    id: "s2", name: "دار الإنارة", contact: "حسن البصري", phone: "07811445566", city: "البصرة",
    notes: "متخصص بالزجاج والمصابيح الطاولة. بانتظار تسعيرة الدفعة الجديدة.", commStatus: "بانتظار الرد",
    products: [
      { name: "ورد — الكرة الزجاجية", requested: 50, ordered: 0 },
      { name: "هالة", requested: 30, ordered: 0 },
    ],
  },
  {
    id: "s3", name: "نور الشمال للتجارة", contact: "دلير عبدالله", phone: "07501234567", city: "أربيل",
    notes: "يستورد المصابيح المحمولة القابلة للشحن. أسعار تنافسية للشحنات الكبيرة.", commStatus: "نشط", lastOrder: "2025-10-29",
    products: [
      { name: "قمر — المصباح المحمول", requested: 80, ordered: 60 },
      { name: "سراج ميني", requested: 45, ordered: 30 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  بيانات التحليلات (للوحدة الإدارية)                                  */
/* ------------------------------------------------------------------ */
export const MONTHS_AR = ["كانون 2", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين 1", "تشرين 2", "كانون 1"];
/** الإيرادات بالألف دينار */
export const REVENUE_MONTHLY = [3240, 4180, 3860, 5230, 6410, 5940, 7820, 8640, 7260, 9410, 10830, 12140];
export const ORDERS_CITY = [
  { city: "بغداد", orders: 148 }, { city: "البصرة", orders: 86 }, { city: "أربيل", orders: 74 },
  { city: "نينوى", orders: 61 }, { city: "النجف", orders: 52 }, { city: "كربلاء", orders: 47 },
  { city: "السليمانية", orders: 39 }, { city: "أخرى", orders: 121 },
];
export const STATUS_DIST = [
  { label: "تم التسليم", value: 210, color: "#8A8F63" },
  { label: "تم الشحن", value: 31, color: "#1C1C1A" },
  { label: "قيد التجهيز", value: 24, color: "#D8D1C3" },
  { label: "تم التأكيد", value: 18, color: "#B7B19F" },
  { label: "جديد", value: 12, color: "#EFECE3" },
  { label: "ملغي", value: 9, color: "#77736B" },
];
export const WEEKLY_ORDERS = [9, 14, 11, 17, 13, 21, 18];
export const DAYS_AR = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];

export const fmtIQD = (n: number) => `${n.toLocaleString("en-US")} د.ع`;
export const fmtNum = (n: number) => n.toLocaleString("en-US");

export const WHATSAPP_NUMBER = "9647701234567";
export const STORE_PHONE = "0770 123 4567";
export const waLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
