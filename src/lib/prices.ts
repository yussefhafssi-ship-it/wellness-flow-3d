import { useEffect, useState } from "react";

const KEY = "dxn:price-overrides:v1";

export function formatMAD(amount: number) {
  return `${amount.toLocaleString("fr-MA", { maximumFractionDigits: 0 })} MAD`;
}

export function loadOverrides(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveOverrides(map: Record<string, number>) {
  localStorage.setItem(KEY, JSON.stringify(map));
  window.dispatchEvent(new Event("dxn:prices-updated"));
}

export function usePriceOverrides() {
  const [map, setMap] = useState<Record<string, number>>({});
  useEffect(() => {
    const sync = () => setMap(loadOverrides());
    sync();
    window.addEventListener("dxn:prices-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("dxn:prices-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return map;
}
