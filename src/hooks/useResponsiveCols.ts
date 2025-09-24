import { useEffect, useState } from "react";

/**
 * Devuelve # de columnas según breakpoints Tailwind que usas:
 * sm: 2, md: 3, lg: 4, xl: 6, 2xl: 8 (ajústalo a tu grid real)
 */
export function useResponsiveCols() {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    const mq = {
      sm: window.matchMedia("(min-width: 640px)"),
      md: window.matchMedia("(min-width: 768px)"),
      lg: window.matchMedia("(min-width: 1024px)"),
      xl: window.matchMedia("(min-width: 1280px)"),
      x2: window.matchMedia("(min-width: 1536px)"),
    };

    const compute = () => {
      if (mq.x2.matches) return setCols(8);
      if (mq.xl.matches) return setCols(6);
      if (mq.lg.matches) return setCols(4);
      if (mq.md.matches) return setCols(3);
      if (mq.sm.matches) return setCols(2);
      return setCols(1);
    };

    compute();
    Object.values(mq).forEach((m) => m.addEventListener?.("change", compute));
    return () => Object.values(mq).forEach((m) => m.removeEventListener?.("change", compute));
  }, []);

  return cols;
}
