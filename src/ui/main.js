const pokemonList =
    document.getElementById(
        "pokemon-list"
    );

const createButton =
    document.getElementById(
        "create-pokemon"
    );

import "../platform/browser/register.js";
import { loadDatabase } from "../core/database.js";
import { createPokemon } from "../systems/pokemonFactory.js";
import { savePokemon } from "../systems/pokemonStorage.js";
import { addPokemon, getBox } from "../systems/pcManager.js";

const db = await loadDatabase();
const SLOT = "slot1";

async function renderBox() {
    const pokemon =
        await getBox( SLOT );

    console.log(pokemon);
}

await renderBox();