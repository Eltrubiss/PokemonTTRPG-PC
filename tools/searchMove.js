import {

    loadDatabase,
    getMove

} from "../lib/database.js";

const query = process.argv.slice(2).join(" ").toLowerCase();

if (!query) {

    console.log("Uso:");
    console.log("node tools/searchMove.js <texto>");

    process.exit(1);

}

const db = await loadDatabase();

const results = db.moves.filter(move => {

    return (

        move.name.toLowerCase().includes(query) ||

        move.slug.toLowerCase().includes(query) ||

        move.type.toLowerCase().includes(query) ||

        move.class.toLowerCase().includes(query)

    );

});

if (results.length === 0) {

    console.log("No se encontraron movimientos.");

    process.exit(0);

}

if (results.length > 1) {

    console.log("");
    console.log(`${results.length} movimientos encontrados`);
    console.log("");

    for (const move of results) {

        console.log(`${move.name} (${move.slug})`);

    }

    console.log("");

    process.exit(0);

}

const move = results[0];

console.log("");
console.log("====================================================");
console.log(move.name);
console.log("====================================================");
console.log("");

console.log(`Slug:      ${move.slug}`);
console.log(`Tipo:      ${move.type}`);
console.log(`Clase:     ${move.class}`);
console.log(`Potencia:  ${move.power}`);
console.log(`Precisión: ${move.pres}`);
console.log("");

console.log("Efecto");
console.log("------");

if (move.effect?.trim()) {

    console.log(move.effect);

} else {

    console.log("(Sin efecto)");

}

function printPokemon(methodName, title) {

    const learnset = db.learnsets[methodName];

    const pokemon = [];

    for (const entry of learnset) {

        const found = entry.moves.find(

            m => m.slug === move.slug

        );

        if (found) {

            pokemon.push(entry.slug);

        }

    }

    if (pokemon.length === 0) {

        return;

    }

    console.log("");
    console.log(title);
    console.log("-".repeat(title.length));

    pokemon.sort();

    for (const slug of pokemon) {

        const p = db.pokemon.find(

            pokemon => pokemon.slug === slug

        );

        if (p) {

            console.log(p.nombre);

        }

    }

}

printPokemon("level", "Aprendido por nivel");

printPokemon("tm", "Aprendido por MT");

printPokemon("egg", "Aprendido por huevo");

printPokemon("tutor", "Aprendido por tutor");

console.log("");