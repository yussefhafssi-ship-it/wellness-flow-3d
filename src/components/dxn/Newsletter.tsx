import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";

export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary to-primary-glow" />
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/20 blur-3xl -z-10 animate-pulse-glow" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-primary-glow/40 blur-3xl -z-10 animate-pulse-glow" />
      <div className="max-w-3xl mx-auto px-6 text-center text-primary-foreground">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs uppercase tracking-[0.25em] text-gold">
          <Mail className="w-3.5 h-3.5" /> نشرة DXN
        </div>
        <h2 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
          العافية في بريدك، <span className="text-gradient-gold italic">أسبوعياً</span>.
        </h2>
        <p className="mt-5 text-primary-foreground/80 text-lg">
          طقوس، أبحاث، وصفات — وعروض حصرية للمشتركين.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); setDone(true); }}
          className="mt-10 max-w-md mx-auto flex flex-col sm:flex-row gap-3"
        >
          <Input
            type="email"
            required
            placeholder="بريدك@الإلكتروني.com"
            className="h-14 rounded-full bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 px-6 focus-visible:ring-gold"
          />
          <Button type="submit" className="h-14 px-8 rounded-full bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
            {done ? <><Check className="w-4 h-4 mr-1" /> تم الاشتراك</> : "اشترك الآن"}
          </Button>
        </form>
      </div>
    </section>
  );
}
