import { StoreLayout } from "../components/chrome";
import { Reveal, navigate, useStore } from "../lib/state";
import { fmtIQD } from "../lib/data";
import { OutlineBtn, Price, QtyStepper, SolidBtn, Swatches, TLink } from "../components/ui";
import { ITrash, IX, IArrow, ICheck } from "../components/icons";

/* ================================================================== */
/*  صفحة المقارنة                                                       */
/* ================================================================== */
export function ComparePage() {
  const { products, compare, toggleCompare, clearCompare, addToCart } = useStore();
  const items = compare.map((id) => products.find((p) => p.id === id)).filter(Boolean) as NonNullable<ReturnType<typeof products.find>>[];

  if (items.length === 0) {
    return (
      <StoreLayout title="مقارنة المنتجات" sub="اختر حتى 4 مصابيح من صفحات المتجر وقارنها جنبًا إلى جنب." crumb="الرئيسية / مقارنة">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
          <p className="font-display text-3xl text-ink">قائمة المقارنة فارغة</p>
          <p className="mt-3 text-sm text-mute">اضغط أيقونة المقارنة على أي منتج لبدء المقارنة.</p>
          <div className="mt-8 flex justify-center"><SolidBtn onClick={() => navigate("/products")}>تصفّح المصابيح</SolidBtn></div>
        </div>
      </StoreLayout>
    );
  }

  const rows: { label: string; render: (p: (typeof items)[number]) => React.ReactNode }[] = [
    { label: "السعر", render: (p) => <Price price={p.price} oldPrice={p.oldPrice} /> },
    { label: "النوع", render: (p) => p.type },
    { label: "التشغيل", render: (p) => p.charging },
    { label: "الألوان", render: (p) => <Swatches colors={p.colors} hex={p.colorHex} size="sm" /> },
    { label: "القياسات", render: (p) => p.sizes.join(" · ") },
    ...(["القدرة", "التعتيم", "البطارية"] as const).map((feat) => ({
      label: feat,
      render: (p: (typeof items)[number]) => p.features.find((f) => f.label === feat)?.value ?? "—",
    })),
    { label: "المتوفر", render: (p) => `${p.stock} قطعة` },
    {
      label: "",
      render: (p) => (
        <div className="flex flex-col gap-3">
          <SolidBtn onClick={() => addToCart(p, p.colors[0], p.sizes[0], 1)} className="!px-4 !py-2.5 text-xs">أضف إلى السلة</SolidBtn>
          <button onClick={() => navigate(`/product/${p.id}`)} className="tlink rev justify-center text-xs text-mute"><span>التفاصيل</span></button>
        </div>
      ),
    },
  ];

  return (
    <StoreLayout title="مقارنة المنتجات" sub="قرار واثق — كل المواصفات جنبًا إلى جنب." crumb="الرئيسية / مقارنة">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <div className="flex items-center justify-between gap-4 hairline-b pb-5">
          <p className="text-xs text-mute">{items.length} من 4 منتجات</p>
          <button onClick={clearCompare} className="text-xs text-mute hover:text-ink underline underline-offset-4">مسح الكل</button>
        </div>

        {/* الجدول — تمرير أفقي على الموبايل */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr>
                <th className="w-32 md:w-44 text-right py-6 align-bottom"><span className="text-[0.65rem] text-mute font-medium">المواصفة</span></th>
                {items.map((p) => (
                  <th key={p.id} className="py-6 px-3 text-right align-bottom min-w-44">
                    <div className="relative group">
                      <button onClick={() => navigate(`/product/${p.id}`)} className="block w-full cursor-pointer">
                        <img src={p.img} alt={p.name} className="w-full aspect-square object-cover bg-[#F1EEE7]" />
                      </button>
                      <button
                        onClick={() => toggleCompare(p.id)}
                        className="absolute top-2 left-2 w-8 h-8 grid place-items-center bg-surface/95 text-ink hover:bg-ink hover:text-paper transition-colors"
                        aria-label={`إزالة ${p.name} من المقارنة`}
                      >
                        <IX className="w-4 h-4" />
                      </button>
                      {p.badge && <span className="absolute top-2 right-2 bg-ink text-paper text-[0.6rem] px-2 py-1">{p.badge}</span>}
                      <span className="block font-medium text-[0.8rem] mt-3 leading-5">{p.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line hairline-t">
              {rows.map((r) => (
                <tr key={r.label || "cta"} className="hover:bg-surface/70 transition-colors">
                  <td className="py-4 text-xs text-mute align-top">{r.label}</td>
                  {items.map((p) => (
                    <td key={p.id} className="py-4 px-3 align-top font-medium text-[0.8rem]">{r.render(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Reveal className="mt-12 bg-surface border border-line p-6 md:p-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-display font-bold text-2xl">محتار بين قطعتين؟</p>
            <p className="text-xs text-mute mt-2">اسألنا مباشرة وسنرشّح لك الأنسب لمكانك.</p>
          </div>
          <OutlineBtn href="#/contact">تواصل معنا</OutlineBtn>
        </Reveal>
      </div>
    </StoreLayout>
  );
}

/* ================================================================== */
/*  صفحة السلة                                                          */
/* ================================================================== */
export function CartPage() {
  const { cart, products, setQty, removeFromCart, clearCart } = useStore();

  const detailed = cart
    .map((c, i) => ({ ...c, index: i, product: products.find((p) => p.id === c.productId) }))
    .filter((c) => c.product);

  const subtotal = detailed.reduce((s, c) => s + (c.product!.price * c.qty), 0);

  return (
    <StoreLayout title="سلة التسوق" crumb="الرئيسية / السلة">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        {detailed.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-3xl">سلتك فارغة</p>
            <p className="mt-3 text-sm text-mute">أضف مصباحك الأول — الضوء الجيد يستحق.</p>
            <div className="mt-8 flex justify-center"><SolidBtn onClick={() => navigate("/products")}>ابدأ التسوق</SolidBtn></div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.7fr_1fr] gap-10 items-start">
            {/* العناصر */}
            <div className="divide-y divide-line hairline-t">
              {detailed.map((c) => (
                <div key={c.index} className="py-6 flex gap-5">
                  <button onClick={() => navigate(`/product/${c.productId}`)} className="shrink-0 cursor-pointer">
                    <img src={c.product!.img} alt={c.product!.name} className="w-24 h-24 md:w-28 md:h-28 object-cover bg-[#F1EEE7]" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <button onClick={() => navigate(`/product/${c.productId}`)} className="text-right font-medium text-sm md:text-base hover:text-olive transition-colors cursor-pointer">
                        {c.product!.name}
                      </button>
                      <button onClick={() => removeFromCart(c.index)} className="p-1.5 text-mute hover:text-ink transition-colors shrink-0" aria-label="حذف من السلة">
                        <ITrash className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[0.7rem] text-mute mt-1">
                      اللون: {c.color} · القياس: {c.size}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <QtyStepper small qty={c.qty} max={c.product!.stock} onChange={(n) => setQty(c.index, n)} />
                      <span className="font-semibold text-sm">{fmtIQD(c.product!.price * c.qty)}</span>
                    </div>
                    {c.product!.stock <= 10 && (
                      <p className="mt-2 text-[0.68rem] text-olive">متبقي {c.product!.stock} فقط في المخزون</p>
                    )}
                  </div>
                </div>
              ))}
              <div className="py-5 flex items-center justify-between">
                <button onClick={clearCart} className="text-xs text-mute hover:text-ink underline underline-offset-4">إفراغ السلة</button>
                <TLink href="#/products">متابعة التسوق</TLink>
              </div>
            </div>

            {/* الملخص */}
            <aside className="bg-surface border border-line p-6 md:p-8 lg:sticky lg:top-32">
              <h2 className="font-display font-bold text-2xl">ملخص الطلب</h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-mute">المجموع الفرعي</span><span className="font-medium">{fmtIQD(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-mute">التوصيل</span><span className="text-xs text-mute self-end">حسب المحافظة — يظهر في الدفع</span></div>
                <div className="flex justify-between"><span className="text-mute">الكوبون</span><span className="text-xs text-mute self-end">يُدخل في صفحة الدفع</span></div>
              </div>
              <div className="mt-6 pt-5 hairline-t flex justify-between items-baseline">
                <span className="font-semibold">الإجمالي الحالي</span>
                <span className="font-display font-bold text-2xl">{fmtIQD(subtotal)}</span>
              </div>
              <div className="mt-7">
                <SolidBtn full onClick={() => navigate("/checkout")}>
                  إتمام الطلب <IArrow className="w-4 h-4" />
                </SolidBtn>
              </div>
              <p className="mt-4 text-[0.7rem] text-mute text-center flex items-center justify-center gap-1.5">
                <ICheck className="w-3.5 h-3.5 text-olive" /> الدفع نقدًا عند الاستلام — بلا رسوم إضافية
              </p>
            </aside>
          </div>
        )}
      </div>
    </StoreLayout>
  );
}
