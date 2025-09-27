import pokemonLogo from "../assets/logos/pokemon_logo.png";

export default function Header() {
  return (
    <header className="bg-[#3B4CCA] top-0 left-0 w-full z-50 border-b-4 border-[#616161] shadow-[0_10px_0_#616161] transition-transform">
      <div className="w-full px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={pokemonLogo}
            alt="Pokémon"
            className="w-40 sm:w-48 drop-shadow-[0_4px_0_#000] select-none"
            draggable={false}
          />
        </div>
      </div>
    </header>
  );
}