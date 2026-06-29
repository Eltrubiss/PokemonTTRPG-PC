import { buildMoves } from "./generators/moves.js";
import { buildPokemon } from "./generators/pokemon.js";
import { compileMoves } from "./generators/compile.js";

console.log("======================================");
console.log("Pokemon TTRPG Builder");
console.log("======================================\n");

await buildMoves();
await buildPokemon();
await compileMoves();

console.log("\nTodo listo.");