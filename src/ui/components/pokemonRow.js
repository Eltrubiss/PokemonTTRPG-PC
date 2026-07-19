import { getNature, getPokemon } from "../../core/database.js";
import { element } from "../utils/elements.js";

export function createPokemonRow(db, pokemon, options = {}) {
    const species = getPokemon(db, pokemon.speciesSlug);
    const nature = pokemon.naturaleza
        ? getNature(db, pokemon.naturaleza)?.nombre
        : "-";

    const row = element("button", {
        type: "button",
        className: options.selected
            ? "pokemon-row selected"
            : "pokemon-row",
        dataset: { uid: pokemon.uid },
        ariaLabel: `Seleccionar ${getDisplayName(species, pokemon)}`
    });

    row.append(
        element("span", {
            text: getDisplayName(species, pokemon),
            className: "pokemon-row__name"
        }),
        element("span", {
            text: `${formatGender(pokemon.sexo)} Lv.${pokemon.nivel ?? "-"}`.trim(),
            className: "pokemon-row__meta"
        }),
        element("span", {
            text: nature ?? "-",
            className: "pokemon-row__nature"
        })
    );

    row.addEventListener("click", () => {
        row.dispatchEvent(new CustomEvent("pokemon-selected", {
            bubbles: true,
            detail: { uid: pokemon.uid }
        }));
    });

    return row;
}

function getDisplayName(species, pokemon) {
    return pokemon.apodo || species?.nombre || pokemon.speciesSlug || "Pokémon";
}

function formatGender(sexo) {
    switch (sexo) {
        case "M": return "♂";
        case "F": return "♀";
        default: return "-";
    }
}
