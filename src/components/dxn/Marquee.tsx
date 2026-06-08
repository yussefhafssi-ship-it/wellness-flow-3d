export function Marquee() {
  const items = [
    "طبيعي 100%", "معتمد حلال", "معايير GMP", "ISO 9001",
    "موثوق عالمياً", "منذ 1993", "مبني على أبحاث علمية", "جودة فاخرة",
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
