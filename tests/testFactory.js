import "../src/platform/browser/register.js";
import { loadDatabase } from "../src/core/database.js";
import { createPokemon } from "../src/systems/pokemonFactory.js";

const db = await loadDatabase();


const pokemon = createPokemon(
    db,
    "golurk",
    20
);

console.log(
    pokemon
);



