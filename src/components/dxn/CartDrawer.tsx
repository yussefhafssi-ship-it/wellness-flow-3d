import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "./Products";

export type CartItem = Product & { qty: number };

export function CartDrawer({
  open, onClose, items, setItems,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  setItems: (fn: (prev: CartItem[]) => CartItem[]) => void;
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const setQty = (id: string, d: number) =>
    setItems((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        const q = i.qty + d;
        return q <= 0 ? [] : [{ ...i, qty: q }];
      })
    );
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-background shadow-2xl flex flex-col transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-gold">Your Bag</div>
            <h3 className="text-2xl font-display font-bold mt-1">{items.length} item{items.length !== 1 && "s"}</h3>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose}><X className="w-5 h-5" /></Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {items.length === 0 && (
            <div className="text-center text-muted-foreground py-20">Your bag is empty.</div>
          )}
          {items.map((i) => (
            <div key={i.id} className="flex gap-4 animate-in fade-in slide-in-from-right-4">
              <img src={i.image} alt={i.name} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between gap-2">
                  <div>
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-xs text-muted-foreground">{i.tag}</div>
                  </div>
                  <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center border border-border rounded-full">
                    <button onClick={() => setQty(i.id, -1)} className="p-1.5 hover:text-primary"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-8 text-center text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.id, 1)} className="p-1.5 hover:text-primary"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="font-semibold">${(i.price * i.qty).toFixed(0)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t space-y-4 bg-secondary/30">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">${subtotal.toFixed(0)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span>Free</span></div>
          <div className="flex justify-between text-xl font-display font-bold pt-2 border-t"><span>Total</span><span>${subtotal.toFixed(0)}</span></div>
          <Button className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-base">Checkout</Button>
        </div>
      </aside>
    </>
  );
}
