export function Marquee() {
  const items = [
    "100% Natural", "Halal Certified", "GMP Standard", "ISO 9001",
    "Worldwide Trusted", "Since 1993", "Scientifically Researched", "Premium Quality",
  ];
  return (
    <section className="py-10 border-y border-border/60 bg-primary text-primary-foreground overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-4 px-8 text-sm uppercase tracking-[0.25em] font-medium">
            <span>{t}</span>
            <span className="text-gold">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
