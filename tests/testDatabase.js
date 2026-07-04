import {
    loadDatabase,
    getPokemon,
    getMove,
    getAbility,
    getLearnset
} from "../src/core/database.js";

const db = await loadDatabase();

const pikachu = getPokemon(
    db,
    "pikachu"
);

console.log(pikachu);
console.log("==========");
const thunderbolt = getMove(
    db,
    "thunderbolt"
);

console.log(thunderbolt);
console.log("==========");

const staticAbility = getAbility(
    db,
    "static"
);

console.log(staticAbility);
console.log("==========");

const learnset = getLearnset(
    db,
    "pikachu",
    "level"
);

console.log(learnset);
console.log("==========");

console.log(

    getPokemon(
        db,
        "pikachu"
    ).nombre

);
console.log("==========");

console.log(

    getMove(
        db,
        "thunderbolt"
    ).nombre

);
console.log("==========");

console.log(

    getAbility(
        db,
        "static"
    ).nombre

);
console.log("==========");

console.log(

    getLearnset(
        db,
        "pikachu",
        "level"
    ).moves.length

);
console.log("==========");
