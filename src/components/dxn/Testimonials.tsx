import { Star } from "lucide-react";

const reviews = [
  { n: "Amelia R.", c: "Lisbon", t: "I've never felt this clear in the mornings. The Lingzhi Coffee is a small daily luxury.", r: 5 },
  { n: "Kenji T.", c: "Tokyo", t: "DXN Reishi has been part of my routine for 2 years. Real quality you can feel.", r: 5 },
  { n: "Priya S.", c: "Mumbai", t: "The Spirulina is unmatched — vibrant, clean, and the packaging is gorgeous.", r: 5 },
  { n: "Marco D.", c: "Milan", t: "From farm to bottle, the standards are obvious. Trusted brand.", r: 5 },
  { n: "Sara L.", c: "Berlin", t: "Cordyceps changed my training recovery. I recommend it to my whole studio.", r: 5 },
  { n: "Oluwa N.", c: "Lagos", t: "Real wellness, not hype. DXN has earned a permanent spot on my shelf.", r: 5 },
];

export function Testimonials() {
  const row = [...reviews, ...reviews];
  return (
    <section className="py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
        <div className="text-sm uppercase tracking-[0.25em] text-gold font-medium">Loved Worldwide</div>
        <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl">
          Real rituals, <span className="text-gradient-primary italic">real people</span>.
        </h2>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-6 animate-marquee" style={{ width: "max-content" }}>
          {row.map((r, i) => (
            <article key={i} className="w-[360px] flex-shrink-0 bg-card rounded-3xl p-7 border border-border/60 shadow-sm">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.r }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed">"{r.t}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow grid place-items-center text-primary-foreground font-bold">
                  {r.n[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.n}</div>
                  <div className="text-xs text-muted-foreground">{r.c}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
