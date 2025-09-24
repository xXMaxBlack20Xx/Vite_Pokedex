import { useEffect, useState } from "react";

interface Props {
    page: number;
    totalPages: number;
    onPageChange: (p: number) => void;
}

/** Devuelve cuántos botones numéricos mostrar según el ancho (sm/md/lg) */
function useResponsiveCount() {
    const [count, setCount] = useState(5); // móvil por defecto

    useEffect(() => {
        const mq = {
            md: window.matchMedia("(min-width: 768px)"),
            lg: window.matchMedia("(min-width: 1024px)"),
        };

        const compute = () => {
            if (mq.lg.matches) return setCount(9);
            if (mq.md.matches) return setCount(7);
            return setCount(5);
        };

        compute();
        Object.values(mq).forEach((m) => m.addEventListener("change", compute));
        return () => Object.values(mq).forEach((m) => m.removeEventListener("change", compute));
    }, []);

    return count;
}

/** Calcula la “ventana” de páginas a mostrar con extremos y elipses */
function buildPageWindow(page: number, total: number, maxCount: number): (number | "…")[] {
    if (total <= maxCount) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Reservamos 2 para extremos + 1 para posible elipsis => lo que queda en el centro
    const middleCount = maxCount - 2; // extremos 1 y total siempre visibles
    const half = Math.floor((middleCount - 1) / 2);

    let start = Math.max(2, page - half);
    let end = Math.min(total - 1, start + middleCount - 1);

    // Ajusta inicio si estamos pegados al final
    start = Math.max(2, Math.min(start, end - (middleCount - 1)));

    const pages: (number | "…")[] = [1];

    if (start > 2) pages.push("…");
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < total - 1) pages.push("…");

    pages.push(total);
    return pages;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
    const visibleCount = useResponsiveCount();
    if (totalPages <= 1) return null;

    const pages = buildPageWindow(page, totalPages, visibleCount);

    const goFirst = () => onPageChange(1);
    const goPrev = () => onPageChange(Math.max(1, page - 1));
    const goNext = () => onPageChange(Math.min(totalPages, page + 1));
    const goLast = () => onPageChange(totalPages);

    const btnBase =
        "min-w-9 h-9 px-3 rounded-lg border-2 border-black text-sm font-bold shadow-[2px_2px_0_#000] transition active:translate-y-[1px]";
    const btnBlue =
        "bg-blue-600 text-yellow-300 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed";
    const btnYellow =
        "bg-yellow-300 text-yellow-300 hover:brightness-110";
    const btnGhost =
        "bg-white text-yellow-100 hover:brightness-95";

    return (
        <nav className="mt-12 flex items-center justify-center gap-2 select-none" aria-label="Paginación">
            {/* First / Prev */}
            <button
                className={`${btnBase} ${btnBlue}`}
                onClick={goFirst}
                disabled={page === 1}
                aria-label="Primera página"
                title="Primera"
            >
                «
            </button>
            <button
                className={`${btnBase} ${btnBlue}`}
                onClick={goPrev}
                disabled={page === 1}
                aria-label="Página anterior"
                title="Anterior"
            >
                ‹
            </button>

            {/* Números */}
            {pages.map((p, i) =>
                p === "…" ? (
                    <span
                        key={`dots-${i}`}
                        className="min-w-9 h-9 px-2 flex items-center justify-center text-sm text-gray-600"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        aria-current={p === page ? "page" : undefined}
                        className={[
                            btnBase,
                            p === page ? btnYellow : btnGhost,
                        ].join(" ")}
                        title={`Página ${p}`}
                    >
                        {p}
                    </button>
                )
            )}

            {/* Next / Last */}
            <button
                className={`${btnBase} ${btnBlue}`}
                onClick={goNext}
                disabled={page === totalPages}
                aria-label="Página siguiente"
                title="Siguiente"
            >
                ›
            </button>
            <button
                className={`${btnBase} ${btnBlue}`}
                onClick={goLast}
                disabled={page === totalPages}
                aria-label="Última página"
                title="Última"
            >
                »
            </button>
        </nav>
    );
}
