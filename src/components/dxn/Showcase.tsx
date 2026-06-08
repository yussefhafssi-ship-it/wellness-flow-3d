import { useEffect, useRef } from "react";
import { useProducts } from "./Products";
import { formatMAD } from "@/lib/prices";

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const PRODUCTS = useProducts();

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        if (!trackRef.current || !sectionRef.current) return;
        const totalWidth = trackRef.current.scrollWidth - window.innerWidth;
        gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${totalWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
    })();
    return () => ctx?.revert?.();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.58_0.14_158)_0%,transparent_60%)] opacity-50" />
      <div className="relative h-screen flex items-center">
        <div ref={trackRef} className="flex gap-10 pl-[10vw] will-change-transform">
          <div className="flex-shrink-0 w-[60vw] max-w-xl flex flex-col justify-center">
            <div className="text-sm uppercase tracking-[0.3em] text-gold">عرض ثلاثي الأبعاد</div>
            <h2 className="mt-4 text-5xl md:text-7xl font-bold leading-[1.15]">
              كل <span className="text-gradient-gold italic">تفصيل</span><br /> يهمّ.
            </h2>
            <p className="mt-6 text-primary-foreground/70 text-lg max-w-md">
              تمهّل واكتشف الملمس، والطقوس، والعلم خلف كل قارورة. مرّر لتستكشف.
            </p>
          </div>
          {PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              className="flex-shrink-0 w-[70vw] md:w-[40vw] lg:w-[32vw] aspect-[3/4] rounded-3xl overflow-hidden relative group"
            >
              <img src={p.image} alt={p.name} loading="lazy" width={800} height={1066} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="text-xs uppercase tracking-[0.3em] text-gold">0{i + 1} · {p.tag}</div>
                <div className="mt-2 text-3xl font-display font-bold">{p.name}</div>
                <div className="mt-1 text-primary-foreground/70 text-sm">{formatMAD(p.price)} · الأكثر مبيعاً</div>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-[20vw]" />
        </div>
      </div>
    </section>
  );
}
