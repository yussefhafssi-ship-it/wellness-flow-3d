import { useEffect, useRef } from "react";

const stats = [
  { v: 10, suffix: "M+", l: "Happy Customers" },
  { v: 180, suffix: "+", l: "Countries" },
  { v: 30, suffix: "+", l: "Years of Heritage" },
  { v: 500, suffix: "M+", l: "Products Sold" },
];

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const els = ref.current!.querySelectorAll<HTMLElement>(".counter");
        els.forEach((el) => {
          const target = Number(el.dataset.target);
          gsap.fromTo(el, { innerText: 0 }, {
            innerText: target,
            duration: 2.4,
            ease: "power3.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: "top 85%" },
            onUpdate() {
              el.innerText = Math.floor(Number(el.innerText)).toLocaleString();
            },
          });
        });
      }, ref);
    })();
    return () => ctx?.revert?.();
  }, []);
  return (
    <section ref={ref} className="py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.58_0.14_158)_0%,transparent_50%)] opacity-60" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s) => (
          <div key={s.l} className="text-center md:text-left">
            <div className="text-5xl md:text-7xl font-display font-bold tracking-tight">
              <span className="counter" data-target={s.v}>0</span>
              <span className="text-gold">{s.suffix}</span>
            </div>
            <div className="mt-3 text-sm uppercase tracking-[0.2em] text-primary-foreground/70">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
