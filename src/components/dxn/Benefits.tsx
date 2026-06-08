import { useEffect, useRef } from "react";
import { Leaf, Shield, Award, Globe, Sprout, FlaskConical } from "lucide-react";

const items = [
  { icon: Leaf, title: "مكونات طبيعية", body: "تُجمع من أنقى المزارع وتُحصد بعناية فائقة." },
  { icon: Shield, title: "دعم المناعة", body: "مركّبات نشطة بيولوجياً تعزز دفاعات الجسم." },
  { icon: Award, title: "جودة فاخرة", body: "معتمدون بمعايير GMP وISO وحلال في جميع عملياتنا." },
  { icon: Globe, title: "ثقة عالمية", body: "محبوبون من 10+ ملايين عميل في 180+ دولة." },
  { icon: Sprout, title: "عافية مستدامة", body: "ممارسات تجديدية تحترم الأرض." },
  { icon: FlaskConical, title: "أبحاث علمية", body: "عقود من الدراسات السريرية خلف كل تركيبة." },
];

export function Benefits() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".ben-card", {
          y: 60, opacity: 0, duration: 0.9, stagger: 0.08, ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
      }, ref);
    })();
    return () => ctx?.revert?.();
  }, []);
  return (
    <section ref={ref} id="benefits" className="py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <div className="text-sm uppercase tracking-[0.25em] text-gold font-medium">لماذا DXN</div>
          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold">
            عافية <span className="text-gradient-primary italic">صادقة الصُنع</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.title} className="ben-card group relative bg-card rounded-3xl p-8 border border-border/60 overflow-hidden hover:shadow-elegant transition-shadow">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-gold/15 to-primary/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative w-12 h-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center mb-5 group-hover:rotate-6 transition-transform">
                <it.icon className="w-5 h-5" />
              </div>
              <h3 className="relative text-xl font-display font-semibold">{it.title}</h3>
              <p className="relative mt-2 text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
