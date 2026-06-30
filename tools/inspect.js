import {

    loadDatabase,
    getPokemon,
    getPokemonById,
    getLearnset,
    getMove

} from "../lib/database.js";

const input = process.argv[2];

if (!input) {

    console.log("Uso:");
    console.log("node tools/inspect.js <slug>");
    console.log("node tools/inspect.js <id>");

    process.exit(1);

}

const db = await loadDatabase();

let pokemon;

if (!isNaN(input)) {

    pokemon = getPokemonById(
        db,
        Number(input)
    );

} else {

    pokemon = getPokemon(
        db,
        input
    );

}

if (!pokemon) {

    console.log("Pokémon no encontrado.");

    process.exit(1);

}

function printTitle(title) {

    console.log("");
    console.log(title);
    console.log("-".repeat(title.length));

}

function printList(list, indent = "  ") {

    if (!list || list.length === 0) {

        console.log(`${indent}(ninguno)`);

        return;

    }

    for (const value of list) {

        console.log(`${indent}${value}`);

    }

}

console.log("");
console.log("====================================================");
console.log(`${pokemon.nombre} (#${pokemon.id})`);
console.log("====================================================");

console.log("");
console.log(`Slug: ${pokemon.slug}`);

printTitle("Tipo");

printList(
    pokemon.tipo
);

printTitle("Habilidades");

console.log("  Normales");

printList(
    pokemon.habilidades.normales,
    "    "
);

console.log("");

console.log("  Ocultas");

printList(
    pokemon.habilidades.oculta,
    "    "
);

printTitle("Género");

console.log(`  Macho : ${pokemon.genero.macho}%`);
console.log(`  Hembra: ${pokemon.genero.hembra}%`);

printTitle("Stats");

console.log(`  HP      ${pokemon.stat_base.hp}`);
console.log(`  ATK     ${pokemon.stat_base.atk}`);
console.log(`  DEF     ${pokemon.stat_base.def}`);
console.log(`  SP.ATK  ${pokemon.stat_base.sp_atk}`);
console.log(`  SP.DEF  ${pokemon.stat_base.sp_def}`);
console.log(`  SPEED   ${pokemon.stat_base.speed}`);

printTitle("Evoluciones");

if (pokemon.evoluciones.length === 0) {

    console.log("  No evoluciona.");

} else {

    for (const evo of pokemon.evoluciones) {

        console.log(`  → ${evo.nombre}`);

        if (evo.condiciones.nivel) {

            console.log(`      Nivel ${evo.condiciones.nivel}`);

        }

        if (evo.condiciones.objeto) {

            console.log(`      Objeto: ${evo.condiciones.objeto}`);

        }

        if (evo.condiciones.intercambio) {

            console.log("      Intercambio");

        }

    }

}

function printLearnset(title, method) {

    const learnset = getLearnset(
        db,
        pokemon.slug,
        method
    );

    if (!learnset || learnset.moves.length === 0) {

        return;

    }

    printTitle(title);

    if (method === "level") {

        let currentLevel = -1;

        for (const move of learnset.moves) {

            if (move.nivel !== currentLevel) {

                currentLevel = move.nivel;

                console.log(`  Nivel ${currentLevel}`);

            }

            const data = getMove(
                db,
                move.slug
            );

            console.log(
                `    ${data?.name ?? move.slug}`
            );

        }

    } else {

        for (const move of learnset.moves) {

            const data = getMove(
                db,
                move.slug
            );

            console.log(
                `  ${data?.name ?? move.slug}`
            );

        }

    }

}

printLearnset(
    "Movimientos por nivel",
    "level"
);

printLearnset(
    "MT",
    "tm"
);

printLearnset(
    "Movimientos Huevo",
    "egg"
);

printLearnset(
    "Tutor",
    "tutor"
);

console.log("");