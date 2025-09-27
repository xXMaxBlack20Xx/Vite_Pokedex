import { useEffect, useMemo, useState } from "react";
import { getPokemonPage, extractIdFromUrl } from "../lib/apiPokemon";
import type { PokemonListResponse } from "../types/Pokemon";

export type RowPokemon = { id: number; name: string };

export function usePokedex(limit: 251) {
    const [pokemons, setPokemons] = useState<RowPokemon[]>([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Monta → pide lista (limit) → normaliza a {id,name} → ordena → guarda.
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data: PokemonListResponse = await getPokemonPage(limit, 0);
                const rows = data.results
                    .map((p) => ({ id: extractIdFromUrl(p.url), name: p.name }))
                    .sort((a, b) => a.id - b.id);
                setPokemons(rows);
            } catch (e) {
                setError("No se pudo cargar la lista de Pokémon.");
            } finally {
                setLoading(false);
            }
        })();
    }, [limit]);

    // filtered se recalcula solo si cambian pokemons o query.
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return pokemons;
        return pokemons.filter((p) => p.name.toLowerCase().includes(q) || String(p.id).includes(q));
    }, [pokemons, query]);

    return { pokemons, filtered, query, setQuery, loading, error };
}