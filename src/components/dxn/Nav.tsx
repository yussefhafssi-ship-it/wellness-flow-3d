import { useEffect, useState } from "react";
import { Leaf, ShoppingBag, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Nav({ onCartOpen, cartCount }: { onCartOpen: () => void; cartCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Shop", "Products", "Story", "Benefits", "Contact"];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-primary text-primary-foreground">
            <Leaf className="w-4 h-4" />
          </span>
          <span>DXN<span className="text-gold">.</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-sm font-medium">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="story-link text-foreground/80 hover:text-primary transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" aria-label="Search"><Search className="w-4 h-4" /></Button>
          <Button size="icon" variant="ghost" className="relative" onClick={onCartOpen} aria-label="Cart">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid place-items-center w-5 h-5 rounded-full bg-gold text-gold-foreground text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </Button>
          <Button size="icon" variant="ghost" className="md:hidden" aria-label="Menu"><Menu className="w-4 h-4" /></Button>
        </div>
      </div>
    </header>
  );
}
