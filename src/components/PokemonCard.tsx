import { getOfficialArtworkUrl } from "../lib/apiPokemon";
import TypeBadge from "./TypeBadge";
import { usePokemonTypes } from "../hooks/usePokemonTypes";

interface Props {
  id: number;
  name: string;
}

export default function PokemonCard({ id, name }: Props) {
  const { types, loading } = usePokemonTypes(id);

  return (
    <li className="mt-3 rounded-2xl border-4 border-black bg-white shadow-[8px_8px_0_#000] hover:shadow-[12px_12px_0_#000] transition-transform hover:-translate-y-0.5">
      <div className="rounded-t-2xl bg-gray-50/80">
        <img
          src={getOfficialArtworkUrl(id)}
          alt={name}
          loading="lazy"
          className="w-full aspect-[4/3] object-contain p-5"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      <div className="p-4">
        <div className="text-[14px] font-semibold tracking-wider text-gray-400">N.º {String(id).padStart(4, "0")}</div>
        <h3 className="mt-1 text-xl font-extrabold tracking-tight text-gray-800 capitalize">{name}</h3>

        <div className="mt-3 flex flex-wrap gap-2 min-h-[28px]">
          {loading && <span className="text-xs text-gray-400">Cargando tipos…</span>}
          {!loading && types?.map((t) => <TypeBadge key={t} type={t} />)}
        </div>
      </div>
    </li>
  );
}
