import {

    loadDatabase,
    getPokemon,
    getMove

} from "../lib/database.js";

const db = await loadDatabase();

let errors = 0;

function ok(message) {

    console.log(`[OK] ${message}`);

}

function fail(message) {

    console.log(`[ERROR] ${message}`);

    errors++;

}

console.log("");
console.log("========================================");
console.log("Validando Base de Datos");
console.log("========================================");
console.log("");

/* ---------------------------------- */
/* Pokémon */
/* ---------------------------------- */

ok(`Pokémon cargados: ${db.pokemon.length}`);

const pokemonIds = new Set();
const pokemonSlugs = new Set();

for (const pokemon of db.pokemon) {

    if (pokemonIds.has(pokemon.id)) {

        fail(`ID duplicado: ${pokemon.id}`);

    }

    pokemonIds.add(pokemon.id);

    if (pokemonSlugs.has(pokemon.slug)) {

        fail(`Slug duplicado: ${pokemon.slug}`);

    }

    pokemonSlugs.add(pokemon.slug);

    if (!pokemon.nombre) {

        fail(`Pokémon sin nombre: ${pokemon.slug}`);

    }

    if (!pokemon.tipo?.length) {

        fail(`${pokemon.slug} no tiene tipo.`);

    }

    if (!pokemon.stat_base) {

        fail(`${pokemon.slug} no tiene estadísticas.`);

    }

}

/* ---------------------------------- */
/* Movimientos */
/* ---------------------------------- */

ok(`Movimientos cargados: ${db.moves.length}`);

const moveIds = new Set();
const moveSlugs = new Set();

for (const move of db.moves) {

    if (moveIds.has(move.id)) {

        fail(`ID de movimiento duplicado: ${move.id}`);

    }

    moveIds.add(move.id);

    if (moveSlugs.has(move.slug)) {

        fail(`Slug de movimiento duplicado: ${move.slug}`);

    }

    moveSlugs.add(move.slug);

    if (!move.name) {

        fail(`Movimiento sin nombre: ${move.slug}`);

    }

}

/* ---------------------------------- */
/* Evoluciones */
/* ---------------------------------- */

for (const pokemon of db.pokemon) {

    for (const evo of pokemon.evoluciones) {

        if (!getPokemon(db, evo.slug)) {

            fail(

                `${pokemon.nombre} evoluciona a "${evo.slug}" y no existe.`

            );

        }

    }

}

ok("Evoluciones verificadas.");

/* ---------------------------------- */
/* Learnsets */
/* ---------------------------------- */

function validateLearnset(method) {

    const learnsets = db.learnsets[method];

    ok(`Learnsets (${method}): ${learnsets.length}`);

    for (const pokemon of learnsets) {

        const vistos = new Set();

        for (const move of pokemon.moves) {

            if (!getMove(db, move.slug)) {

                fail(

                    `${pokemon.slug}: movimiento inexistente "${move.slug}"`

                );

            }

            if (vistos.has(move.slug)) {

                fail(

                    `${pokemon.slug}: movimiento duplicado "${move.slug}"`

                );

            }

            vistos.add(move.slug);

        }

    }

}

validateLearnset("level");
validateLearnset("tm");
validateLearnset("egg");
validateLearnset("tutor");

console.log("");
console.log("========================================");

if (errors === 0) {

    console.log("Base de datos válida.");

} else {

    console.log(`Se encontraron ${errors} errores.`);

    process.exit(1);

}

console.log("========================================");
console.log("");