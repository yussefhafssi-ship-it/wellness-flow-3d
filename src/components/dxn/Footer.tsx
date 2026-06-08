import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import logoAsset from "@/assets/maison-dxn-logo.png.asset.json";

export function Footer() {
  const cols = [
    { h: "Shop", l: ["Ganoderma", "Spirulina", "Coffee", "Tea", "Personal Care"] },
    { h: "Company", l: ["Our Story", "Research", "Sustainability", "Careers", "Press"] },
    { h: "Support", l: ["Help Center", "Shipping", "Returns", "Contact", "FAQ"] },
  ];
  return (
    <footer className="bg-foreground text-background pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-background/95 rounded-2xl p-4 inline-block">
              <img src={logoAsset.url} alt="Maison DXN" className="h-20 w-auto object-contain" />
            </div>
            <p className="mt-4 max-w-sm text-background/70">
              Nature's finest wellness products — crafted with science, delivered with care, since 1993.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Ic, i) => (
                <a key={i} href="#" className="w-10 h-10 grid place-items-center rounded-full border border-background/20 hover:bg-gold hover:text-gold-foreground hover:border-gold transition-colors">
                  <Ic className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-xs uppercase tracking-[0.25em] text-gold mb-4">{c.h}</div>
              <ul className="space-y-3 text-background/80">
                {c.l.map((i) => (
                  <li key={i}><a href="#" className="hover:text-gold transition-colors">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-6 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-background/60">
          <div>© {new Date().getFullYear()} DXN Wellness. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
