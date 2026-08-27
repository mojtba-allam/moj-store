import { FAQS, STORE, STORE_PHONE, waLink } from "../data";
import { Accordion, Eyebrow, IcWhatsApp, Reveal } from "../ui";

export default function Faq() {
  return (
    <div className="page-in max-w-[860px] mx-auto px-5 py-12 md:py-16">
      <Eyebrow>إجابات قصيرة ومباشرة</Eyebrow>
      <h1 className="font-display font-bold text-4xl md:text-6xl mt-3 text-ink">الأسئلة الشائعة</h1>
      <Reveal className="mt-10">
        <Accordion items={FAQS} />
      </Reveal>
      <Reveal delay={120} className="mt-12 bg-sand/40 border border-line p-7 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-1">
          <p className="font-display font-bold text-2xl text-ink">مش لاقي إجابتك؟</p>
          <p className="text-[0.72rem] font-bold text-mute mt-1.5">كلمنا مباشرة — <span className="num" dir="ltr">{STORE_PHONE}</span> · {STORE.hours}</p>
        </div>
        <a href={waLink("مرحبًا، عندي سؤال عن منتجات مشكاة.")} target="_blank" rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-ink text-paper text-[0.75rem] font-bold px-7 h-12 hover:bg-olive transition-colors whitespace-nowrap">
          <IcWhatsApp className="w-4 h-4" />
          اسأل على واتساب
        </a>
      </Reveal>
    </div>
  );
}
