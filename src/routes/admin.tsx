import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PRODUCTS } from "@/components/dxn/Products";
import { loadOverrides, saveOverrides, formatMAD } from "@/lib/prices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · DXN Price Manager" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

function Admin() {
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const overrides = loadOverrides();
    const init: Record<string, string> = {};
    PRODUCTS.forEach((p) => {
      init[p.id] = String(overrides[p.id] ?? p.price);
    });
    setPrices(init);
  }, []);

  const onSave = () => {
    const map: Record<string, number> = {};
    Object.entries(prices).forEach(([id, v]) => {
      const n = Number(v);
      if (!isNaN(n) && n >= 0) map[id] = n;
    });
    saveOverrides(map);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const onReset = (id: string) => {
    const p = PRODUCTS.find((x) => x.id === id);
    if (p) setPrices((s) => ({ ...s, [id]: String(p.price) }));
  };

  const onResetAll = () => {
    if (!confirm("Reset all prices to defaults?")) return;
    localStorage.removeItem("dxn:price-overrides:v1");
    const init: Record<string, string> = {};
    PRODUCTS.forEach((p) => (init[p.id] = String(p.price)));
    setPrices(init);
    window.dispatchEvent(new Event("dxn:prices-updated"));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-3">
              <ArrowLeft className="w-4 h-4" /> Back to store
            </Link>
            <h1 className="text-4xl font-display font-bold">Price Manager</h1>
            <p className="text-muted-foreground mt-2">
              Edit product prices in MAD. Changes apply instantly across the store on this device.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onResetAll}>
              <RotateCcw className="w-4 h-4" /> Reset all
            </Button>
            <Button onClick={onSave}>
              <Save className="w-4 h-4" /> {saved ? "Saved" : "Save changes"}
            </Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl divide-y">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4">
              <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-contain bg-secondary p-1" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.tag} · Default {formatMAD(p.price)}</div>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  className="w-32"
                  value={prices[p.id] ?? ""}
                  onChange={(e) => setPrices((s) => ({ ...s, [p.id]: e.target.value }))}
                />
                <span className="text-sm text-muted-foreground">MAD</span>
                <Button variant="ghost" size="icon" onClick={() => onReset(p.id)} title="Reset to default">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Note: prices are stored in your browser (localStorage). For multi-device sync, enable Lovable Cloud.
        </p>
      </div>
    </div>
  );
}
