import { STORE, STORE_PHONE, waLink } from "../data";
import { Eyebrow, IcClock, IcPhone, IcPin, IcWhatsApp, Reveal } from "../ui";

export default function Contact() {
  return (
    <div className="page-in">
      <section className="hairline-b bg-sand/25">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-12 md:py-16">
          <Eyebrow>متواجدين طول اليوم</Eyebrow>
          <h1 className="font-display font-bold text-4xl md:text-6xl mt-3 text-ink">تواصل معنا</h1>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 md:px-8 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-start">
        <Reveal>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">خلّينا على ضوء</h2>
          <p className="text-[0.78rem] font-bold text-mute mt-3 max-w-md leading-7">سؤال قبل الطلب، متابعة شحنة، أو استبدال — أقرب طريق لينا هو واتساب، وبنرد في نفس اليوم.</p>
          <dl className="mt-10 hairline-t">
            {[
              { ic: <IcWhatsApp className="w-5 h-5" />, k: "واتساب", v: STORE_PHONE, href: waLink("مرحبًا، عندي استفسار.") },
              { ic: <IcPhone className="w-5 h-5" />, k: "الموبايل", v: STORE_PHONE, href: `tel:${STORE_PHONE.replace(/\s/g, "")}` },
              { ic: <IcPin className="w-5 h-5" />, k: "المعرض", v: STORE.address },
              { ic: <IcClock className="w-5 h-5" />, k: "مواعيد العمل", v: STORE.hours },
            ].map((r) => (
              <div key={r.k} className="hairline-b flex items-center gap-4 py-4.5 py-5">
                <span className="text-olive">{r.ic}</span>
                <dt className="text-[0.7rem] font-bold text-mute w-24">{r.k}</dt>
                <dd className="font-extrabold text-sm">
                  {r.href ? (
                    <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="num hover:text-olive transition-colors" dir="ltr">{r.v}</a>
                  ) : (
                    <span className="num">{r.v}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-[0.68rem] font-bold text-mute mt-6">الرد خلال دقائق في مواعيد العمل — والطلب نفسه مبيستغرقش أكتر من دقيقتين.</p>
        </Reveal>

        <Reveal delay={120} className="bg-ink text-paper p-8 md:p-12 flex flex-col justify-between min-h-[420px]">
          <div>
            <IcWhatsApp className="w-9 h-9 text-olive" strokeWidth={1.3} />
            <h3 className="font-display font-bold text-3xl md:text-5xl leading-[1.35] mt-6">
              أسرع رد في مصر
              <span className="block text-sand">يبدأ بـ«أهلًا»</span>
            </h3>
            <p className="text-paper/70 font-bold text-sm mt-4">ابعتلنا سؤالك أو رقم طلبك وهنظبطك فورًا.</p>
          </div>
          <a href={waLink("مرحبًا، عندي استفسار عن منتجات مشكاة.")} target="_blank" rel="noreferrer"
            className="mt-10 inline-flex items-center justify-center gap-2.5 bg-paper text-ink text-[0.8rem] font-bold h-14 hover:bg-olive hover:text-white transition-colors">
            <IcWhatsApp className="w-5 h-5" />
            ابدأ محادثة واتساب
          </a>
        </Reveal>
      </section>
    </div>
  );
}
