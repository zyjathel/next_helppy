import { useState, useEffect, useLayoutEffect } from "react";

export function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);

  const isServer = typeof window === "undefined";
  const useEffectFn = !isServer ? useLayoutEffect : useEffect;

  useEffectFn(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
}
