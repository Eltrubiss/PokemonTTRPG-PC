import "../src/platform/node/register.js";
import { loadPC, savePC, addPokemon } from "../src/systems/PCManager.js";
import  {pretty } from "../src/systems/utils/debug.js";
import { createPokemon } from "../src/systems/pokemonFactory.js";
import { loadDatabase } from "../src/core/database.js";
import { savePokemon } from "../src/systems/pokemonStorage.js";

const db = await loadDatabase();
const pokemon = createPokemon(
    db,
    "pikachu",
    5
);

await savePokemon(
    "slot1",
    pokemon
);

await addPokemon(
    "slot1",
    pokemon.uid
);

const pc = await loadPC(
    "slot1"
);

pretty(pc);