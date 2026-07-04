import { loadDatabase } from "../src/core/database.js";
import { createPokemon } from "../src/systems/pokemonFactory.js";

const db = await loadDatabase();


const pokemon = createPokemon(
    db,
    "perrserker",
    5
);

console.log(
    pokemon
);



