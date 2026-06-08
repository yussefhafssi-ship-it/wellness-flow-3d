import { useEffect, useRef } from "react";
import { Star, Plus } from "lucide-react";
import ganoderma from "@/assets/product-ganoderma.jpg";
import spirulinaLegacy from "@/assets/product-spirulina.jpg";
import coffeeLegacy from "@/assets/product-coffee.jpg";
import cordyceps from "@/assets/product-cordyceps.jpg";
import lionsmaneLegacy from "@/assets/product-lionsmane.jpg";
import tea from "@/assets/product-tea.jpg";

import reishi from "@/assets/products/dxn-10.png.asset.json";
import ganocelium from "@/assets/products/dxn-9.png.asset.json";
import spirulina from "@/assets/products/dxn-2.png.asset.json";
import blackCumin from "@/assets/products/dxn-16.png.asset.json";
import lionsMane from "@/assets/products/dxn-20.png.asset.json";
import teaTree from "@/assets/products/dxn-41.png.asset.json";
import lingzhiCoffee from "@/assets/products/dxn-49.png.asset.json";
import morinzhi from "@/assets/products/dxn-54.png.asset.json";
import zhiMint from "@/assets/products/dxn-58.png.asset.json";
import lemonzhi from "@/assets/products/dxn-59.png.asset.json";
import roselle from "@/assets/products/dxn-55.png.asset.json";
import aloeVita from "@/assets/products/dxn-62.png.asset.json";
import spirulinaSmall from "@/assets/products/dxn-3.png.asset.json";
import poria from "@/assets/products/dxn-15.png.asset.json";
import ganozhiShampoo from "@/assets/products/dxn-30.png.asset.json";
import zhimeko from "@/assets/products/dxn-35.png.asset.json";
import aloeScrub from "@/assets/products/dxn-36.png.asset.json";
import aloeLotion from "@/assets/products/dxn-37.png.asset.json";
import morinzhiSmall from "@/assets/products/dxn-53.png.asset.json";

import { formatMAD, usePriceOverrides } from "@/lib/prices";

export type Product = {
  id: string;
  name: string;
  tag: string;
  price: number;
  rating: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  { id: "rg", name: "DXN Reishi Gano (RG)", tag: "Ganoderma Capsules", price: 320, rating: 4.9, image: reishi.url },
  { id: "gl", name: "DXN Ganocelium (GL)", tag: "Mycelium Capsules", price: 340, rating: 4.9, image: ganocelium.url },
  { id: "sp", name: "DXN Spirulina", tag: "Green Algae Tablets", price: 280, rating: 4.8, image: spirulina.url },
  { id: "sp120", name: "DXN Spirulina 120s", tag: "Travel Pack", price: 180, rating: 4.7, image: spirulinaSmall.url },
  { id: "bc", name: "DXN Black Cumin Plus", tag: "Wellness Capsules", price: 260, rating: 4.7, image: blackCumin.url },
  { id: "ps", name: "DXN Poria S Powder", tag: "Traditional Wellness", price: 380, rating: 4.7, image: poria.url },
  { id: "lm", name: "DXN Lion's Mane", tag: "Focus & Clarity", price: 480, rating: 4.8, image: lionsMane.url },
  { id: "tt", name: "DXN Tea Tree Cream", tag: "Skincare · 30g", price: 150, rating: 4.6, image: teaTree.url },
  { id: "zk", name: "DXN Zhimeko Cream", tag: "Topical Care · 30g", price: 140, rating: 4.6, image: zhimeko.url },
  { id: "as", name: "DXN Aloe V Facial Scrub", tag: "Skincare · 75g", price: 130, rating: 4.6, image: aloeScrub.url },
  { id: "al", name: "DXN Aloe V Hand & Body Lotion", tag: "Body Care · 250ml", price: 160, rating: 4.7, image: aloeLotion.url },
  { id: "gs", name: "DXN Ganozhi Shampoo", tag: "Hair Care · 250ml", price: 170, rating: 4.7, image: ganozhiShampoo.url },
  { id: "lz", name: "DXN Lingzhi Coffee 3-in-1", tag: "Premix Coffee", price: 180, rating: 4.9, image: lingzhiCoffee.url },
  { id: "mz", name: "DXN Morinzhi 700ml", tag: "Morinda Juice", price: 420, rating: 4.7, image: morinzhi.url },
  { id: "mz285", name: "DXN Morinzhi 285ml", tag: "Morinda Juice · Travel", price: 210, rating: 4.7, image: morinzhiSmall.url },
  { id: "rs", name: "DXN Roselle Juice", tag: "Botanical Beverage · 285ml", price: 200, rating: 4.7, image: roselle.url },
  { id: "av", name: "DXN Aloe Vita", tag: "Aloe Vera Drink · 285ml", price: 190, rating: 4.7, image: aloeVita.url },
  { id: "zm", name: "DXN Zhi Mint Plus", tag: "Sugar-Free Candy", price: 220, rating: 4.6, image: zhiMint.url },
  { id: "ln", name: "DXN Lemonzhi", tag: "Lemon Tea Mix", price: 200, rating: 4.7, image: lemonzhi.url },
  { id: "gn", name: "DXN Ganoderma Classic", tag: "Heritage Blend", price: 360, rating: 4.8, image: ganoderma },
  { id: "co", name: "DXN Cordyceps", tag: "Energy & Endurance", price: 550, rating: 4.7, image: cordyceps },
];

// Legacy unused fallbacks (kept to preserve imports if user reverts)
void spirulinaLegacy; void coffeeLegacy; void lionsmaneLegacy; void tea;

export function useProducts(): Product[] {
  const overrides = usePriceOverrides();
  return PRODUCTS.map((p) => (overrides[p.id] != null ? { ...p, price: overrides[p.id] } : p));
}

export function Products({ onAdd }: { onAdd: (p: Product) => void }) {
  const rootRef = useRef<HTMLElement>(null);
  const products = useProducts();

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
          {products.map((p) => (
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
                  className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
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
                  <div className="text-xl font-display font-bold whitespace-nowrap">{formatMAD(p.price)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
