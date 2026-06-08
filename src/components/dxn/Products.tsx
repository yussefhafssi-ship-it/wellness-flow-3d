import { useEffect, useRef } from "react";
import { Star, Plus } from "lucide-react";
import ganoderma from "@/assets/product-ganoderma.jpg";
import spirulina from "@/assets/product-spirulina.jpg";
import coffee from "@/assets/product-coffee.jpg";
import cordyceps from "@/assets/product-cordyceps.jpg";
import lionsmane from "@/assets/product-lionsmane.jpg";
import tea from "@/assets/product-tea.jpg";

export type Product = {
  id: string;
  name: string;
  tag: string;
  price: number;
  rating: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  { id: "rg", name: "DXN Reishi Gano", tag: "Ganoderma Capsules", price: 42, rating: 4.9, image: ganoderma },
  { id: "sp", name: "DXN Spirulina", tag: "Green Algae Tablets", price: 28, rating: 4.8, image: spirulina },
  { id: "lz", name: "DXN Lingzhi Coffee", tag: "Premium 3-in-1", price: 18, rating: 4.9, image: coffee },
  { id: "co", name: "DXN Cordyceps", tag: "Energy & Endurance", price: 55, rating: 4.7, image: cordyceps },
  { id: "lm", name: "DXN Lion's Mane", tag: "Focus & Clarity", price: 48, rating: 4.8, image: lionsmane },
  { id: "te", name: "DXN Organic Tea", tag: "Heritage Blend", price: 22, rating: 4.6, image: tea },
];

export function Products({ onAdd }: { onAdd: (p: Product) => void }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".prod-head > *", {
          y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "expo.out",
          scrollTrigger: { trigger: ".prod-head", start: "top 80%" },
        });
        gsap.from(".prod-card", {
          y: 80, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out",
          scrollTrigger: { trigger: ".prod-grid", start: "top 75%" },
        });
      }, rootRef);
    })();
    return () => ctx?.revert?.();
  }, []);

  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
    card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateY(-8px)`;
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateY(0)";
  };

  return (
    <section ref={rootRef} id="products" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="prod-head max-w-2xl mb-16">
          <div className="text-sm uppercase tracking-[0.25em] text-gold font-medium">Featured Collection</div>
          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Crafted for <span className="text-gradient-primary italic">vitality</span>.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            A curated selection of DXN's most loved wellness essentials — each one a quiet ritual
            for daily balance.
          </p>
        </div>

        <div className="prod-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="prod-card group relative bg-card rounded-3xl p-6 border border-border/60 transition-transform duration-300 will-change-transform shadow-sm hover:shadow-elegant"
              onMouseMove={onTilt}
              onMouseLeave={onLeave}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/0 via-primary/0 to-gold/0 group-hover:from-gold/5 group-hover:via-primary/5 group-hover:to-gold/10 transition-colors pointer-events-none" />
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-secondary to-muted overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <button
                  onClick={() => onAdd(p)}
                  className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:scale-110"
                  aria-label={`Add ${p.name} to cart`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="relative mt-5 flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.tag}</div>
                  <h3 className="mt-1 text-xl font-display font-semibold">{p.name}</h3>
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span className="font-medium text-foreground">{p.rating}</span>
                    <span>· In stock</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display font-bold">${p.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
