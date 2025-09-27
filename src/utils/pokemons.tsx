// hacemos un ftch a la api de pokemon para tener el id y los nombres ordenados por id

import { useEffect, useState } from 'react';
import { getPokemonPage, extractIdFromUrl } from '../lib/apiPokemon';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getPokemonPage(251 , 0);
      const mapped = data.results
        .map(p => ({ id: extractIdFromUrl(p.url), name: p.name }))
        .sort((a, b) => a.id - b.id);
      setPokemons(mapped);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Cargando…</p>;
  return (
    <ul>
      {pokemons.map(p => (
        <li key={p.id}>#{String(p.id).padStart(3, '0')} {p.name}</li>
      ))}
    </ul>
  );
}
