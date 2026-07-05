import "../platform/browser/register.js";
import { loadDatabase } from "../core/database.js";
import { createPokemon } from "../systems/pokemonFactory.js";
import { savePokemon } from "../systems/pokemonStorage.js";
import { addPokemon, getBox } from "../systems/pcManager.js";
import { createPokemonRow } from "./components/pokemonRow.js";

const db = await loadDatabase();
const SLOT = "slot1";
const pokemonList = document.getElementById("pokemon-list");
const createButton = document.getElementById("create-pokemon");
let selectedPokemonUid = null;


async function renderBox() {
    const box = await getBox(SLOT);

    pokemonList.innerHTML = "";

    for (const pokemon of box) {
        const row = createPokemonRow(
            db,
            pokemon
        );
        pokemonList.appendChild(
            row
        );
    }
}



// Escuchar selección de Pokémon

pokemonList.addEventListener(
    "pokemon-selected",

    event => {
        selectedPokemonUid = event.detail.uid;

        console.log(
            "Seleccionado:",
            selectedPokemonUid
        );
        document
            .querySelectorAll(".pokemon-row")
            .forEach(row =>
                row.classList.remove("selected")
            );

        const selectedRow =
            document.querySelector(
                `[data-uid="${selectedPokemonUid}"]`
            );
        selectedRow?.classList.add(
            "selected"
        );
    }
);



await renderBox();