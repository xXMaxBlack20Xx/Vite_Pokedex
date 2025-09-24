import type {
  PokemonListResponse,
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
} from '../types/Pokemon';

// Base configurable por .env (VITE_API_BASE) o por defecto pokeapi
const BASE_URL =
  import.meta.env.VITE_API_BASE?.replace(/\/+$/, '') || 'https://pokeapi.co/api/v2';

/** Fetch genérico con tipado y manejo simple de errores */
async function fetchJson<T>(pathOrUrl: string): Promise<T> {
  const url = pathOrUrl.startsWith('http')
    ? pathOrUrl
    : `${BASE_URL}/${pathOrUrl.replace(/^\/+/, '')}`;

  const res = await fetch(url);
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`PokeAPI ${res.status} ${res.statusText} - ${msg}`);
  }
  return (await res.json()) as T;
}

/** Extrae el ID de una URL del listado (e.g., .../pokemon/25/) */
export function extractIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  const last = parts[parts.length - 1];
  // Algunas URLs terminan en /{id}/, otras podrían no; cubrimos ambos casos
  return Number(last) || Number(parts[parts.length - 2]) || NaN;
}

/** URL del arte oficial (ideal para tarjetas) */
export function getOfficialArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

/** Listado paginado de pokémon */
export function getPokemonPage(limit = 20, offset = 0) {
  return fetchJson<PokemonListResponse>(`pokemon?limit=${limit}&offset=${offset}`);
}

/** Detalle de un pokémon por id o nombre */
export function getPokemon(idOrName: number | string) {
  return fetchJson<Pokemon>(`pokemon/${idOrName}`);
}

/** Species para flavor text, género, y link a cadena evolutiva */
export function getPokemonSpecies(idOrName: number | string) {
  return fetchJson<PokemonSpecies>(`pokemon-species/${idOrName}`);
}

/** Cadena evolutiva por id */
export function getEvolutionChainById(id: number) {
  return fetchJson<EvolutionChain>(`evolution-chain/${id}`);
}

/** Cadena evolutiva desde URL (viene dentro de species.evolution_chain.url) */
export function getEvolutionChainByUrl(url: string) {
  return fetchJson<EvolutionChain>(url);
}

/** Helper alto nivel: pokémon + species + (opcional) evolution chain */
export async function getPokemonWithSpecies(
  idOrName: number | string,
  includeEvolutionChain = true
) {
  const [pokemon, species] = await Promise.all([
    getPokemon(idOrName),
    getPokemonSpecies(idOrName),
  ]);

  let evolutionChain: EvolutionChain | null = null;
  if (includeEvolutionChain && species.evolution_chain?.url) {
    evolutionChain = await getEvolutionChainByUrl(species.evolution_chain.url);
  }

  return { pokemon, species, evolutionChain };
}
