import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-ganoderma.jpg";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Entrance
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero-eyebrow", { y: 30, opacity: 0, duration: 0.9 })
          .from(".hero-word", { y: 80, opacity: 0, duration: 1.1, stagger: 0.08 }, "-=0.6")
          .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
          .from(".hero-stat", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
          .from(imgRef.current, { scale: 0.85, opacity: 0, duration: 1.4, ease: "expo.out" }, 0.2);

        // Scroll zoom
        gsap.to(imgRef.current, {
          scale: 1.25,
          y: 80,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        // Parallax title
        gsap.to(titleRef.current, {
          y: -120,
          opacity: 0.2,
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
        });
      }, rootRef);
    })();

    const onMove = (e: MouseEvent) => {
      if (!imgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      imgRef.current.style.setProperty("--mx", `${x}px`);
      imgRef.current.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      ctx?.revert?.();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section ref={rootRef} className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background gradient + glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-secondary/40" />
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-primary/15 blur-3xl animate-pulse-glow -z-10" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gold/15 blur-3xl animate-pulse-glow -z-10" />

      {/* 3D canvas layer */}
      {mounted && (
        <div className="absolute inset-0 -z-10 opacity-70 pointer-events-none">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="hero-eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium tracking-widest uppercase text-primary">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            عافية فاخرة · منذ 1993
          </div>

          <h1 ref={titleRef} className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15]">
            <span className="block overflow-hidden"><span className="hero-word inline-block">أرقى</span></span>
            <span className="block overflow-hidden"><span className="hero-word inline-block">منتجات</span></span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-gradient-primary">العافية</span>{" "}
              <span className="hero-word inline-block text-gradient-gold italic">الطبيعية</span>
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed">
            غانوديرما فاخرة، سبيرولينا، قهوة، مكملات وحلول حياة صحية —
            مصنوعة من أرقى نباتات الأرض.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="hero-cta h-14 px-8 rounded-full bg-primary hover:bg-primary/90 shadow-elegant text-base">
              <a href="#shop">تسوّق الآن <ArrowRight className="w-4 h-4 mr-1 rtl:rotate-180" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="hero-cta h-14 px-8 rounded-full border-primary/30 hover:bg-primary/5 text-base">
              <a href="#products">استكشف المنتجات</a>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { v: "+10M", l: "عميل" },
              { v: "+180", l: "دولة" },
              { v: "+30", l: "سنة" },
            ].map((s) => (
              <div key={s.l} className="hero-stat">
                <div className="text-3xl font-display font-bold text-primary">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            ref={imgRef}
            className="relative aspect-square w-full max-w-xl mx-auto animate-float"
            style={{ transform: "translate3d(var(--mx,0), var(--my,0), 0)" }}
          >
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gold/40 via-primary/20 to-transparent blur-3xl" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-elegant shimmer-border">
              <img
                src={heroImg}
                alt="DXN Ganoderma Reishi Mushroom"
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 grid place-items-center">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">الأكثر مبيعاً</div>
                <div className="font-semibold text-sm">ريشي غانوديرما</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 shadow-lg">
              <div className="text-xs text-muted-foreground">موثوق في</div>
              <div className="font-bold text-primary">180 دولة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
