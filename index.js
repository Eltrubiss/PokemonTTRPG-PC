import { buildMoves } from "./generators/moves.js";
import { buildPokemon } from "./generators/pokemon.js";
import { buildLearnsets } from "./generators/learnsets.js";
import { compileMoves } from "./generators/compile.js";

console.log("======================================");
console.log("Pokemon TTRPG Builder");
console.log("======================================\n");

//await buildMoves();
//await buildPokemon();
await buildLearnsets(
    "level-up",
    "level"
);
//await buildLearnsets(
    "machine",
    "tm"
//);
//await buildLearnsets(
//    "egg",
//    "egg"
//);
//await buildLearnsets(
//    "tutor",
//    "tutor"
//);
//await compileMoves();

console.log("\nTodo listo.");