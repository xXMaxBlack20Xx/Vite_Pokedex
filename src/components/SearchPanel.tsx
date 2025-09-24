import searchIcon from "../assets/bottons/buscar.png";
import closeIcon from "../assets/bottons/cerrar.png";

interface Props {
  query: string;
  onChange: (v: string) => void;
  shown: number; // resultados mostrados tras el filtro/paginación
  total: number; // total filtrado (o total general, como prefieras)
}

export default function SearchPanel({ query, onChange, shown }: Props) {
  const showEmpty = query.trim().length > 0 && shown === 0;

  return (
    <section className="w-full border-b-4 border-[#616161] bg-[#313131] p-4 md:p-6 mb-8">
      <div className="mt-3 mb-3 flex flex-col md:flex-row md:items-center md:gap-6">
        {/* Etiqueta */}
        <label
          htmlFor="search"
          className="text-[21px] font-semibold tracking-wider text-white mb-3 md:mb-0 shrink-0"
        >
          Nombre o número
        </label>

        {/* Input con icono */}
        <div className="relative flex-1">
          <img
            src={searchIcon}
            alt=""
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70 pointer-events-none"
          />
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Busca un Pokémon por nombre o número de la Pokédex Nacional"
            className="w-full rounded-xl border-4 border-black bg-white pl-10 pr-10 py-2 text-sm font-medium outline-none
                       focus:ring-0 focus:border-black focus:shadow-[3px_3px_0_#000] transition"
            aria-describedby="search-help"
          />

          {/* Limpiar */}
          {query && (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center"
            >
              <img
                src={closeIcon}
                alt=""
                aria-hidden="true"
                className="w-2 h-2 opacity-70 hover:opacity-100 transition"
              />
            </button>
          )}
        </div>

      </div>

      {/* Ayuda / estados debajo del input */}
      <div
        className="w-full flex items-center justify-center"
        id="search-help"
        aria-live="polite"
      >
        {showEmpty ? (
          <div className="mt-3 w-full max-w-md text-center rounded-xl bg-red-100 text-red-800 border-4 border-red-300 px-6 py-4 text-lg font-bold shadow-[4px_4px_0_#000]">
            No se encontró ningún Pokémon para esta búsqueda.
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </section>
  );
}
