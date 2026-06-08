import { useEffect, useRef } from "react";
import storyImg from "@/assets/story-image.jpg";

const steps = [
  { y: "1993", t: "The Beginning", b: "Dato' Dr. Lim Siow Jin founded DXN with a vision: bring ancient Ganoderma wisdom to the world." },
  { y: "2000", t: "Global Expansion", b: "DXN grew into a worldwide movement, planting roots in over 100 countries." },
  { y: "2015", t: "Research & Science", b: "Investing in laboratories and clinical research to validate every formula." },
  { y: "Today", t: "10M+ Lives", b: "A global wellness family across 180+ countries, growing daily." },
];

export function Story() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".story-img", {
          scale: 1.2, opacity: 0, ease: "expo.out", duration: 1.4,
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
        gsap.from(".story-step", {
          x: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: "expo.out",
          scrollTrigger: { trigger: ".story-track", start: "top 80%" },
        });
      }, ref);
    })();
    return () => ctx?.revert?.();
  }, []);
  return (
    <section ref={ref} id="story" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          <div className="text-sm uppercase tracking-[0.25em] text-gold font-medium">Our Story</div>
          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Three decades of <span className="text-gradient-gold italic">quiet devotion</span>.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg max-w-md">
            From a single mushroom farm in Malaysia to a wellness brand trusted across continents —
            this is DXN.
          </p>
          <div className="story-img mt-8 relative aspect-[3/4] max-w-md rounded-3xl overflow-hidden shadow-elegant">
            <img src={storyImg} alt="DXN Story" loading="lazy" width={1080} height={1440} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
        </div>
        <div className="story-track relative space-y-12 lg:pt-10">
          <div className="absolute left-[28px] top-2 bottom-2 w-px bg-gradient-to-b from-gold via-primary to-transparent" />
          {steps.map((s) => (
            <div key={s.y} className="story-step relative pl-20">
              <div className="absolute left-0 top-1 w-14 h-14 rounded-full glass border border-gold/50 grid place-items-center font-display font-bold text-primary">
                {s.y}
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-semibold">{s.t}</h3>
              <p className="mt-2 text-muted-foreground max-w-md leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
