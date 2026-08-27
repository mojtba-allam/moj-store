import { fmt, waLink } from "../data";
import { useStore } from "../store";
import { IcArrow, IcCheck, IcWhatsApp, Reveal } from "../ui";

export default function Success({ no }: { no: string }) {
  const { orders } = useStore();
  const order = orders.find((o) => o.no === no);

  const waMsg = order
    ? `مرحبًا، أريد الاستفسار عن طلبي رقم #${order.no}\n\nالاسم: ${order.name}\nالمحافظة: ${order.gov} — ${order.area}\nالمنتجات: ${order.items.map((i) => `${i.name} ×${i.qty}`).join("، ")}\nالإجمالي: ${fmt(order.total)}\nطريقة الدفع: عند الاستلام`
    : `مرحبًا، أريد الاستفسار عن طلبي رقم #${no}`;

  return (
    <div className="page-in max-w-[720px] mx-auto px-5 py-16 md:py-24 text-center">
      <Reveal>
        <span className="mx-auto w-16 h-16 grid place-items-center rounded-full bg-olive text-white pop">
          <IcCheck className="w-7 h-7" strokeWidth={2} />
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl mt-8 text-ink leading-[1.3]">تم تسجيل طلبك بنجاح</h1>
        <p className="text-mute font-bold text-sm mt-4">سنتصل بك لتأكيد الطلب، والدفع كاش عند الاستلام.</p>
      </Reveal>

      <Reveal delay={120} className="mt-10 bg-surface border border-line p-8">
        <p className="text-[0.7rem] font-bold text-mute">رقم الطلب</p>
        <p className="num font-display font-bold text-5xl md:text-6xl text-ink mt-2" dir="ltr">#{no}</p>
        {order && (
          <div className="hairline-t mt-6 pt-5 grid grid-cols-2 gap-4 text-sm font-bold">
            <div className="text-start"><span className="block text-[0.62rem] text-mute mb-1">التوصيل إلى</span>{order.gov} — {order.area}</div>
            <div className="text-start"><span className="block text-[0.62rem] text-mute mb-1">عدد القطع</span><span className="num">{order.items.reduce((s, i) => s + i.qty, 0)}</span></div>
            <div className="text-start"><span className="block text-[0.62rem] text-mute mb-1">الإجمالي شامل التوصيل</span><span className="num text-base">{fmt(order.total)}</span></div>
            <div className="text-start"><span className="block text-[0.62rem] text-mute mb-1">الدفع</span>عند الاستلام</div>
          </div>
        )}
      </Reveal>

      <Reveal delay={200} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href={`#/track/${no}/${order?.phone ?? ""}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink text-paper text-[0.78rem] font-bold px-9 h-13 py-4 hover:bg-olive transition-colors">
          متابعة الطلب
          <IcArrow className="w-4 h-4" />
        </a>
        <a href={waLink(waMsg)} target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-ink/25 text-ink text-[0.78rem] font-bold px-9 h-13 py-4 hover:border-olive hover:text-olive transition-colors">
          <IcWhatsApp className="w-5 h-5" />
          التواصل عبر واتساب
        </a>
      </Reveal>

      <p className="text-[0.65rem] font-bold text-mute mt-8">احتفظ برقم الطلب لتتبع الشحنة أو لأي استفسار.</p>
    </div>
  );
}
