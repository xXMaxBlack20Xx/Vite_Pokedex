import { useEffect, useState } from "react";
import { getPokemon } from "../lib/apiPokemon";
import type { Pokemon } from "../types/Pokemon";

const typesCache = new Map<number, string[]>();

export function usePokemonTypes(id: number) {
    const [types, setTypes] = useState<string[] | null>(typesCache.get(id) ?? null);
    const [loading, setLoading] = useState(!types);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typesCache.has(id)) return; // ya en caché

        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const p: Pokemon = await getPokemon(id);
                const t = p.types
                    .sort((a, b) => a.slot - b.slot)
                    .map((x) => x.type.name); // ej: ["grass","poison"]
                if (!cancelled) {
                    typesCache.set(id, t);
                    setTypes(t);
                }
            } catch (e) {
                if (!cancelled) setError("No se pudieron cargar los tipos.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [id]);

    return { types, loading, error };
}
