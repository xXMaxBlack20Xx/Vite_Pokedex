import type { PokemonListResponse, Pokemon } from "../types/Pokemon";

// Usamos la api de pokeapi
const BASE_URL = "https://pokeapi.co/api/v2";

/** Fetch genérico con tipado y manejo simple de errores */
async function fetchJson<T>(pathOrUrl: string): Promise<T> {
  const url = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${BASE_URL}/${pathOrUrl.replace(/^\/+/, "")}`;

  const res = await fetch(url);
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`PokeAPI ${res.status} ${res.statusText} - ${msg}`);
  }
  return (await res.json()) as T;
}

/** Extrae el ID de una URL del listado (e.g., .../pokemon/25/) */
export function extractIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  return Number(last) || Number(parts[parts.length - 2]) || NaN;
}

// Para las imagenes de los pokémon
export function getOfficialArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// Listado paginado de pokémon "normales" (endpoint principal de PokeAPI)
export function getPokemonPage(limit = 20, offset = 0) {
  return fetchJson<PokemonListResponse>(`pokemon?limit=${limit}&offset=${offset}`);
}

// Detalle de un pokémon (tipos, sprites)
export function getPokemon(idOrName: number | string) {
  return fetchJson<Pokemon>(`pokemon/${idOrName}`);
}