// Recurso nombrado básico de PokeAPI (lo usa "types")
export interface NamedAPIResource {
  name: string;
  url: string;
}

// Lista genérica paginada (la usa /pokemon?limit&offset)
export interface APIResourceList<T = NamedAPIResource> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Alias específico para /pokemon?…
export type PokemonListResponse = APIResourceList;

// Detalles que usa tu UI (card + tipos + artwork)
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      // arte oficial para las tarjetas
      ['official-artwork']?: {
        front_default: string | null;
      };
    };
  };
  types: { slot: number; type: NamedAPIResource }[];
}