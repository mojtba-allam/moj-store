import { useStore } from "../store";
import { Eyebrow, Reveal } from "../ui";
import { CardGrid } from "../sections";

const TITLES: Record<string, { t: string; s: string }> = {
  "": { t: "كل المصابيح", s: "المجموعة الكاملة — مكتبية، طاولة، وقابلة للشحن" },
  new: { t: "وصل حديثًا", s: "آخر ما أضفناه للمجموعة" },
  best: { t: "الأكثر مبيعًا", s: "القطع التي يطلبها الجميع" },
  offers: { t: "العروض", s: "خصومات حقيقية لفترة محدودة" },
};

export default function Products({ filter = "" }: { filter?: string }) {
  const { products } = useStore();
  const meta = TITLES[filter] ?? TITLES[""];
  const list =
    filter === "new" ? products.filter((p) => p.isNew)
    : filter === "best" ? products.filter((p) => p.isBestSeller)
    : filter === "offers" ? products.filter((p) => p.oldPrice)
    : products;

  return (
    <div className="page-in">
      <section className="hairline-b bg-sand/25">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-12 md:py-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>مشكاة</Eyebrow>
            <h1 className="font-display font-bold text-4xl md:text-6xl mt-3 text-ink">{meta.t}</h1>
            <p className="text-[0.78rem] font-bold text-mute mt-3">{meta.s}</p>
          </div>
          <p className="num text-[0.7rem] font-bold text-mute"><span className="text-ink text-lg font-extrabold">{list.length}</span> منتج — الدفع عند الاستلام</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <CardGrid items={list} />
        <Reveal className="mt-16 hairline-t pt-8 flex flex-wrap items-center justify-between gap-4 text-[0.72rem] font-bold text-mute">
          <span>الكمية المتاحة لكل منتج تظهر في صفحته — يمكنك طلب أي عدد يكفي له المخزون.</span>
          <a href="#/compare" className="tl text-ink">قارن قبل ما تختار</a>
        </Reveal>
      </section>
    </div>
  );
}
