// Tipos principales de la PokeAPI que usaremos en la app

export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface APIResourceList<T = NamedAPIResource> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

/** Respuesta de /pokemon?limit=&offset= */
export type PokemonListResponse = APIResourceList;

/** Detalle de /pokemon/{id|name} (recortado a lo más útil para UI inicial) */
export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: {
        front_default: string | null;
        other?: {
            /** Arte oficial útil para tarjetas */
            ['official-artwork']?: {
                front_default: string | null;
            };
        };
    };
    types: { slot: number; type: NamedAPIResource }[];
    abilities: {
        ability: NamedAPIResource;
        is_hidden: boolean;
        slot: number;
    }[];
    stats: {
        base_stat: number;
        effort: number;
        stat: NamedAPIResource;
    }[];
}

/** /pokemon-species/{id|name} (resumen útil para flavor text y cadena evolutiva) */
export interface PokemonSpecies {
    id: number;
    name: string;
    evolution_chain: { url: string | null };
    flavor_text_entries: {
        flavor_text: string;
        language: NamedAPIResource;
        version: NamedAPIResource;
    }[];
    genera: { genus: string; language: NamedAPIResource }[];
}

/** /evolution-chain/{id} (estructura en árbol) */
export interface EvolutionChain {
    id: number;
    chain: ChainLink;
}

export interface ChainLink {
    is_baby: boolean;
    species: NamedAPIResource;
    evolves_to: ChainLink[];
    evolution_details?: {
        min_level?: number | null;
        trigger?: NamedAPIResource | null;
    }[];
}
