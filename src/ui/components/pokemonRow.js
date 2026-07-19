import { getPokemon } from "../../core/database.js";
import { element } from "../utils/elements.js";

export function createPokemonRow(db, pokemon) {
    const species = getPokemon(db, pokemon.speciesSlug);
    const displayName = getDisplayName(species, pokemon);

    const card = element("button", {
        type: "button",
        className: "pokemon-card",
        dataset: { uid: pokemon.uid },
        ariaLabel: displayName
    });

    card.append(
        createSpritePlaceholder(displayName),
        element("span", {
            text: displayName,
            className: "pokemon-card__name"
        }),
        element("span", {
            text: `Lv.${pokemon.nivel ?? "-"}`,
            className: "pokemon-card__level"
        })
    );

    return card;
}

function createSpritePlaceholder(displayName) {
    const placeholder = element("span", {
        text: "◓",
        className: "pokemon-card__sprite pokemon-card__sprite--placeholder",
        ariaLabel: `Sprite no disponible para ${displayName}`
    });

    return placeholder;
}

function getDisplayName(species, pokemon) {
    return pokemon.apodo || species?.nombre || pokemon.speciesSlug || "Pokémon";
}
