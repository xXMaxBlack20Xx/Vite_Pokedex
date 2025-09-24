import PokemonCard from "./PokemonCard";

interface RowPokemon { id: number; name: string; }
interface Props { items: RowPokemon[]; }

export default function PokemonGrid({ items }: Props) {
  if (items.length === 0) {
    // Contenedor que ocupa todo el ancho y una altura mínima
    return (
      <div className="w-full min-w-screen min-h-[60vh] grid place-items-center">
        <div className="rounded-xl border-4 border-black bg-yellow-300 px-4 py-3 text-sm font-bold shadow-[4px_4px_0_#000] text-black">
          No se encontró ningún Pokémon para esta búsqueda.
        </div>
      </div>
    );
  }

  return (
    <ul className="w-full grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-6 lg:px-8 py-8">
      {items.map((p) => (
        <PokemonCard key={p.id} id={p.id} name={p.name} />
      ))}
    </ul>
  );
}
