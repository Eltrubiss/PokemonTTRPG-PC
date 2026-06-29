import { buildMoves } from "./generators/moves.js";
import { buildPokemon } from "./generators/pokemon.js";

console.log("======================================");
console.log("Pokemon TTRPG Builder");
console.log("======================================\n");

await buildMoves();

await buildPokemon();

console.log("\nTodo listo.");

export function printCacheStats(){

    console.log("\n======================");

    console.log("Cache");

    console.log("======================");

    console.log(`Tipos: ${cache.type.size}`);

    console.log(`Habilidades: ${cache.ability.size}`);

    console.log(`Especies: ${cache.species.size}`);

    console.log(`Evoluciones: ${cache.evolution.size}`);

    console.log("======================\n");

}

printCacheStats();