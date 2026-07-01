import { buildMoves } from "./generators/moves.js";
import { buildPokemon } from "./generators/pokemon.js";
import { buildLearnsets } from "./generators/learnsets.js";
import { buildAbilities } from "./generators/abilities.js";
import { compileMoves } from "./generators/compile.js";
import { compileAbilities } from "./generators/compileAbilities.js";

console.log("======================================");
console.log("Pokemon TTRPG Builder");
console.log("======================================\n");

//await buildMoves();
//await buildPokemon();
await buildAbilities();
//await buildLearnsets(
//    "level-up",
//    "level"
//);
//await buildLearnsets(
//    "machine",
//    "tm"
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
await compileAbilities();

console.log("\n==== Todo listo. ====");