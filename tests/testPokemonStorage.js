import { loadDatabase } from "../src/core/database.js";
import { createPokemon } from "../src/systems/pokemonFactory.js"
import { savePokemon, loadPokemon, pokemonExists } from "../src/systems/pokemonStorage.js";

const db = await loadDatabase();
const pokemon = createPokemon(

    db,
    "charizard",
    10

);

await savePokemon(
    "slot1",
    pokemon
);

console.log(

    await pokemonExists(
        "slot1",
        pokemon.uid
    )

);

console.log(

    await loadPokemon(
        "slot1",
        pokemon.uid
    )

);