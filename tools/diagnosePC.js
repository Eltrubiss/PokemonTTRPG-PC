import "../src/platform/node/register.js";
import { readdir, readFile } from "node:fs/promises";
import { joinPath } from "../src/storage/paths.js";
import { SAVES_PATH } from "../src/core/paths.js";
import { loadPC } from "../src/systems/PCManager.js";
import { pokemonExists } from "../src/systems/pokemonStorage.js";

const slot = process.argv[2] ?? "slot1";
const pokemonDir = joinPath(SAVES_PATH, slot, "pokemon");

function printProblem(message) {
    console.error(`✘ ${message}`);
}

function printOk(message) {
    console.log(`✔ ${message}`);
}

async function readStoredPokemon() {
    const stored = new Map();

    let files = [];
    try {
        files = await readdir(pokemonDir);
    } catch (error) {
        printProblem(`No se pudo leer ${pokemonDir}: ${error.message}`);
        return stored;
    }

    for (const file of files.filter(name => name.endsWith(".json"))) {
        const path = joinPath(pokemonDir, file);

        try {
            const pokemon = JSON.parse(await readFile(path, "utf8"));
            stored.set(pokemon.uid, {
                file,
                path,
                pokemon
            });
        } catch (error) {
            printProblem(`No se pudo parsear ${path}: ${error.message}`);
        }
    }

    return stored;
}

function validateStoredPokemon(stored) {
    for (const [uid, entry] of stored) {
        const expectedFile = `${uid}.json`;

        if (entry.file !== expectedFile) {
            printProblem(
                `${entry.path} declara uid ${uid}, pero el archivo debería llamarse ${expectedFile}`
            );
        }
    }
}

async function validatePCReferences(pc, stored) {
    let problems = 0;
    const referenced = new Set();

    for (const [boxIndex, box] of pc.boxes.entries()) {
        for (const reference of box.pokemon) {
            referenced.add(reference);

            const exists = await pokemonExists(slot, reference);
            if (!exists) {
                problems += 1;
                const slugMatch = [...stored.values()].find(
                    entry => entry.pokemon.speciesSlug === reference || entry.pokemon.slug === reference
                );
                const hint = slugMatch
                    ? ` Parece un slug; el uid correcto es ${slugMatch.pokemon.uid}.`
                    : "";

                printProblem(
                    `Caja ${boxIndex + 1} referencia "${reference}", pero no existe ${pokemonDir}/${reference}.json.${hint}`
                );
            }
        }
    }

    for (const uid of stored.keys()) {
        if (!referenced.has(uid)) {
            problems += 1;
            printProblem(`${pokemonDir}/${uid}.json existe, pero no está referenciado por pc.json`);
        }
    }

    return problems;
}

const pc = await loadPC(slot);
const stored = await readStoredPokemon();

console.log(`Diagnóstico PC para ${slot}`);
console.log(`Pokémon en archivos: ${stored.size}`);
console.log(`Referencias en pc.json: ${pc.boxes.flatMap(box => box.pokemon).length}`);

validateStoredPokemon(stored);
const problems = await validatePCReferences(pc, stored);

if (problems > 0) {
    process.exitCode = 1;
} else {
    printOk("Todas las referencias del PC apuntan a archivos por uid.");
}
