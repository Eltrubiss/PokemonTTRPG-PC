import { getPokemon } from "../../core/database.js";
import { getNature } from "../../core/database.js";


export function createPokemonRow(db, pokemon) {
    console.log("createPokemonRow()");
    const species = getPokemon(
        db,
        pokemon.speciesSlug
    );

    const row = document.createElement("div");

    row.className = "pokemon-row";
    row.dataset.uid = pokemon.uid;

    const gender = formatGender(
        pokemon.sexo
    );

    const nature = pokemon.naturaleza
        ? getNature(
            db,
            pokemon.naturaleza
        )?.nombre
        : "-";

    row.innerHTML = `
        <div class="pokemon-name">
            ${species.nombre}
        </div>

        <div class="pokemon-info">
            ${gender} Lv.${pokemon.nivel}
        </div>

        <div class="pokemon-nature">
            ${nature}
        </div>
    `;

    row.addEventListener("click", () => {
        row.dispatchEvent(
            new CustomEvent("pokemon-selected",
                {
                    bubbles: true,
                    detail: {uid: pokemon.uid}
                }
            )
        );
    });

    return row;

}

function formatGender(sexo) {
    switch (sexo) {
        case "M":
            return "♂";
        case "F":
            return "♀";
        default:
            return "";
    }
}