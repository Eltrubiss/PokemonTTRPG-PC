import "../platform/browser/register.js";
import { loadDatabase } from "../core/database.js";
import { getBox, loadPC } from "../systems/PCManager.js";
import { createAppShell } from "./components/appShell.js";
import { createPokemonDetails } from "./components/pokemonDetails.js";
import { createPokemonRow } from "./components/pokemonRow.js";
import { element } from "./utils/elements.js";

const SLOT = "slot1";
const db = await loadDatabase();
const state = {
    selectedPokemonUid: null,
    pokemon: [],
    pc: null
};

document.body.replaceChildren(createAppShell());

const pokemonList = document.getElementById("pokemon-list");
const detailsContainer = document.getElementById("pokemon-details");
const boxSummary = document.getElementById("box-summary");

pokemonList.addEventListener("pokemon-selected", event => {
    state.selectedPokemonUid = event.detail.uid;
    render();
});

await loadState();
render();

async function loadState() {
    state.pc = await loadPC(SLOT);
    state.pokemon = await getBox(SLOT, state.pc.currentBox);
    state.selectedPokemonUid ??= state.pokemon[0]?.uid ?? null;
}

function render() {
    renderBoxSummary();
    renderPokemonList();
    renderDetails();
}

function renderBoxSummary() {
    const currentBox = state.pc.boxes[state.pc.currentBox];
    boxSummary.replaceChildren(
        element("strong", { text: currentBox?.name ?? "Caja 1" }),
        element("span", { text: `${state.pokemon.length} Pokémon almacenados` }),
        element("span", { text: "Espacio reservado para futuras cajas" })
    );
}

function renderPokemonList() {
    pokemonList.replaceChildren();

    if (!state.pokemon.length) {
        pokemonList.append(element("p", {
            text: "No hay Pokémon almacenados.",
            className: "empty-state"
        }));
        return;
    }

    for (const pokemon of state.pokemon) {
        pokemonList.append(createPokemonRow(db, pokemon, {
            selected: pokemon.uid === state.selectedPokemonUid
        }));
    }
}

function renderDetails() {
    const selectedPokemon = state.pokemon.find(
        pokemon => pokemon.uid === state.selectedPokemonUid
    );

    detailsContainer.replaceChildren(createPokemonDetails(db, selectedPokemon));
}
