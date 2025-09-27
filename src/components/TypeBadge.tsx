interface Props {
    type: string;
}

const MAP: Record<string, { bg: string; text: string; ring: string; label?: string }> = {
    normal: { bg: "bg-[#A8A77A]", text: "text-white", ring: "ring-[#7a7a58]" },
    fire: { bg: "bg-[#EE8130]", text: "text-white", ring: "ring-[#b45d22]" },
    water: { bg: "bg-[#6390F0]", text: "text-white", ring: "ring-[#385fb6]" },
    grass: { bg: "bg-[#7AC74C]", text: "text-white", ring: "ring-[#4f8d2e]", label: "Planta" },
    electric: { bg: "bg-[#F7D02C]", text: "text-black", ring: "ring-[#b89b1f]" },
    ice: { bg: "bg-[#96D9D6]", text: "text-black", ring: "ring-[#69a9a6]" },
    fighting: { bg: "bg-[#C22E28]", text: "text-white", ring: "ring-[#8a1f1b]" },
    poison: { bg: "bg-[#A33EA1]", text: "text-white", ring: "ring-[#6f2a6d]", label: "Veneno" },
    ground: { bg: "bg-[#E2BF65]", text: "text-black", ring: "ring-[#a38946]" },
    flying: { bg: "bg-[#A98FF3]", text: "text-white", ring: "ring-[#755cc0]" },
    psychic: { bg: "bg-[#F95587]", text: "text-white", ring: "ring-[#b53b5e]" },
    bug: { bg: "bg-[#A6B91A]", text: "text-white", ring: "ring-[#778212]" },
    rock: { bg: "bg-[#B6A136]", text: "text-white", ring: "ring-[#7f7126]" },
    ghost: { bg: "bg-[#735797]", text: "text-white", ring: "ring-[#4e3a67]" },
    dragon: { bg: "bg-[#6F35FC]", text: "text-white", ring: "ring-[#4f24b2]" },
    dark: { bg: "bg-[#705746]", text: "text-white", ring: "ring-[#4c3b2f]" },
    steel: { bg: "bg-[#B7B7CE]", text: "text-black", ring: "ring-[#82829a]" },
    fairy: { bg: "bg-[#D685AD]", text: "text-black", ring: "ring-[#9a5f7b]" },

    // equivalentes en español
    planta: { bg: "bg-[#7AC74C]", text: "text-white", ring: "ring-[#4f8d2e]", label: "Planta" },
    veneno: { bg: "bg-[#A33EA1]", text: "text-white", ring: "ring-[#6f2a6d]", label: "Veneno" },
    agua: { bg: "bg-[#6390F0]", text: "text-white", ring: "ring-[#385fb6]" },
    fuego: { bg: "bg-[#EE8130]", text: "text-white", ring: "ring-[#b45d22]" },
    eléctrico: { bg: "bg-[#F7D02C]", text: "text-black", ring: "ring-[#b89b1f]" },
};

export default function TypeBadge({ type }: Props) {
    const key = type.toLowerCase();
    const style = MAP[key] ?? { bg: "bg-gray-300", text: "text-black", ring: "ring-gray-400" };
    const label = MAP[key]?.label ?? (type.charAt(0).toUpperCase() + type.slice(1));

    return (
        <span
            className={[
                "inline-flex items-center rounded-2xl px-3 py-1 text-xs font-semibold",
                style.bg, style.text, "ring-1", style.ring, "shadow-sm"
            ].join(" ")}
            title={label}
        >
            {label}
        </span>
    );
}
