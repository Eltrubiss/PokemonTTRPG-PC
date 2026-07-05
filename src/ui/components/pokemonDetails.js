import { getAbility, getMove, getNature, getPokemon } from "../../core/database.js";
import { element, field, separator, subtitle, title } from "../utils/elements.js";

export function createPokemonDetails(db, pokemon) {
    if (!pokemon) {
        return createEmptyDetails();
    }

    const species = getPokemon(db, pokemon.speciesSlug);
    const ability = getAbility(db, pokemon.abilitySlug);
    const nature = pokemon.naturaleza ? getNature(db, pokemon.naturaleza) : null;

    const panel = element("article", { className: "pokemon-details" });
    const sprite = element("div", {
        text: "◓",
        className: "pokemon-details__sprite",
        ariaLabel: "Sprite pendiente"
    });

    panel.append(
        sprite,
        title(pokemon.apodo || species?.nombre || pokemon.speciesSlug || "Pokémon"),
        field("Especie", species?.nombre ?? pokemon.speciesSlug),
        field("Nivel", pokemon.nivel),
        field("Sexo", formatGender(pokemon.sexo)),
        field("Naturaleza", nature?.nombre ?? "-"),
        field("Rasgo", getTraitText(nature, pokemon.rasgo)),
        field("Habilidad", ability?.nombre ?? pokemon.abilitySlug ?? "-"),
        separator(),
        subtitle("Movimientos"),
        createMoveList(db, pokemon.moveSlug ?? [])
    );

    return panel;
}

function createEmptyDetails() {
    const panel = element("article", { className: "pokemon-details pokemon-details--empty" });

    panel.append(
        element("div", { text: "◌", className: "pokemon-details__sprite" }),
        title("Selecciona un Pokémon"),
        field("Estado", "Sin selección"),
        field("Acción", "Elige un Pokémon de la caja para ver sus datos.")
    );

    return panel;
}

function createMoveList(db, moveSlugs) {
    const list = element("div", { className: "move-list" });

    if (!moveSlugs.length) {
        list.append(field("", "Sin movimientos"));
        return list;
    }

    for (const slug of moveSlugs) {
        const move = getMove(db, slug);
        list.append(field("•", move?.nombre ?? slug));
    }

    return list;
}

function getTraitText(nature, traitSlug) {
    if (!nature || !traitSlug) return "-";

    const trait = nature.rasgos?.find(candidate => candidate.slug === traitSlug);
    return trait?.texto ?? traitSlug;
}

function formatGender(gender) {
    switch (gender) {
        case "M": return "♂";
        case "F": return "♀";
        default: return "-";
    }
}
