import "../platform/browser/register.js";
import { loadDatabase } from "../core/database.js";
import { getBox, loadPC } from "../systems/PCManager.js";
import { createAppShell } from "./components/appShell.js";
import { createPokemonRow } from "./components/pokemonRow.js";
import { element } from "./utils/elements.js";

const DEFAULT_SLOT = "slot1";

const db = await loadDatabase();
const state = {
    boxName: "Caja 1",
    pokemon: []
};

document.body.replaceChildren(createAppShell());

const pokemonGrid = document.getElementById("pokemon-grid");
const boxSummary = document.getElementById("box-summary");
const currentBoxName = document.getElementById("current-box-name");

await loadCurrentBox(DEFAULT_SLOT);
renderPCBox();

async function loadCurrentBox(slot) {
    const pc = await loadPC(slot);
    const currentBoxIndex = pc.currentBox ?? 0;
    const currentBox = pc.boxes[currentBoxIndex];

    state.boxName = currentBox?.name ?? `Caja ${currentBoxIndex + 1}`;
    state.pokemon = await getBox(slot, currentBoxIndex);
}

function renderPCBox() {
    renderBoxSummary();
    renderPokemonGrid();
}

function renderBoxSummary() {
    currentBoxName.textContent = state.boxName;
    boxSummary.replaceChildren(
        element("strong", { text: state.boxName }),
        element("span", { text: `${state.pokemon.length} Pokémon detectados` })
    );
}

function renderPokemonGrid() {
    pokemonGrid.replaceChildren();

    if (!state.pokemon.length) {
        pokemonGrid.append(element("p", {
            text: "Esta caja no tiene Pokémon almacenados.",
            className: "empty-state"
        }));
        return;
    }

    for (const pokemon of state.pokemon) {
        pokemonGrid.append(createPokemonRow(db, pokemon));
    }
}
