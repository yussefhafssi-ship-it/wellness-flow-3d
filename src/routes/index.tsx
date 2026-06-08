import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/dxn/Nav";
import { Hero } from "@/components/dxn/Hero";
import { Marquee } from "@/components/dxn/Marquee";
import { Products, type Product } from "@/components/dxn/Products";
import { Showcase } from "@/components/dxn/Showcase";
import { Benefits } from "@/components/dxn/Benefits";
import { Story } from "@/components/dxn/Story";
import { Stats } from "@/components/dxn/Stats";
import { Testimonials } from "@/components/dxn/Testimonials";
import { Newsletter } from "@/components/dxn/Newsletter";
import { Footer } from "@/components/dxn/Footer";
import { CartDrawer, type CartItem } from "@/components/dxn/CartDrawer";
import { useLenis } from "@/lib/use-lenis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DXN — منتجات صحية فاخرة من الطبيعة" },
      { name: "description", content: "غانوديرما، سبيرولينا، قهوة لينجزي ومكملات DXN الفاخرة. موثوقة من أكثر من 10 ملايين عميل في 180+ دولة." },
      { property: "og:title", content: "DXN — منتجات صحية فاخرة من الطبيعة" },
      { property: "og:description", content: "غانوديرما، سبيرولينا، قهوة لينجزي ومكملات DXN الفاخرة. موثوقة من أكثر من 10 ملايين عميل في 180+ دولة." },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const onAdd = (p: Product) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      return ex ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i)) : [...prev, { ...p, qty: 1 }];
    });
    setCartOpen(true);
  };
  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="bg-background">
      <Nav onCartOpen={() => setCartOpen(true)} cartCount={cartCount} />
      <main>
        <Hero />
        <Marquee />
        <Products onAdd={onAdd} />
        <Showcase />
        <Benefits />
        <Story />
        <Stats />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={items} setItems={setItems} />
    </div>
  );
}
