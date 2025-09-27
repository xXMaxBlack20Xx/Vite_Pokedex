import Header from "./components/Header";
import SearchPanel from "./components/SearchPanel";
import PokemonGrid from "./components/PokemonGrid";
import LoadingText from "./components/LoadingText";
import ErrorBanner from "./components/ErrorBanner";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import Title from "./components/Title";
import bgImage from "./assets/background/back_white.png";
import { usePokedex } from "./hooks/usePokedex";
import { useResponsiveCols } from "./hooks/useResponsiveCols";
import { useEffect, useMemo, useState } from "react";

export default function App() {
  const { pokemons, filtered, query, setQuery, loading, error } = usePokedex(251);

  // columnas actuales según viewport
  const cols = useResponsiveCols();
  const rowsPerPage = 3;
  const pageSize = rowsPerPage * Math.max(1, cols);

  const [page, setPage] = useState(1);

  // Si cambia el query o las columnas (breakpoint)
  useEffect(() => {
    setPage(1);
  }, [query, cols]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  // Scroll al top al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="bg-white w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}>
      <Header />
      <Title />
      <main className="w-full mt-2 sm:mt-4 md:mt-6 min-h-screen">
        <SearchPanel
          query={query}
          onChange={setQuery}
          shown={filtered.length}
          total={pokemons.length}
        />

        {loading && <LoadingText />}
        {error && <ErrorBanner message={error} />}

        {!loading && !error && (
          <>
            <PokemonGrid items={paginated} />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}