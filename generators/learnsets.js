import fs from "fs/promises";
import { getBestVersion } from "../lib/learnsets/version.js";
import {
    getPokemonList,
    getPokemon

} from "../lib/api.js";


export async function buildLearnsets(method, outputName = method) {
    console.log("Generando learnsets...");

    const lista = await getPokemonList();
    const learnsets = [];

    for (let i = 0; i < lista.results.length; i++) {
        const entry = lista.results[i];
        console.log(
            `Pokémon ${i + 1}/${lista.results.length}`
        );
        try{
        const pokemon = await getPokemon(
            entry.url
        );
        
        const moves = [];
        for (const move of pokemon.moves) {
            const version = getBestVersion(
                move.version_group_details
            );
            if (!version) {
                continue;
            }

            if (
                version.move_learn_method.name !== method
            ) {
                continue;
            }

            moves.push({
                slug: move.move.name,
                nivel: Math.max(
                    1,
                    Math.round(
                        version.level_learned_at / 5
                    )
                )
            });
        }
        
        moves.sort((a, b) => {
            if (a.nivel !== b.nivel) {
                return a.nivel - b.nivel;
            }
            return a.slug.localeCompare(b.slug);
        });
        const vistos = new Set();
        const filtrados = [];

        for (const move of moves) {
            if (vistos.has(move.slug)) {
                continue;
            }
            vistos.add(move.slug);
            filtrados.push(move);
        }

        learnsets.push({
            slug: entry.name,
            moves: filtrados
        });
        } catch (err) {

            console.error(
                entry.name,
                err.message
            );

        }

    }

    await fs.writeFile(
        `./data/generated/learnsets-${outputName}.json`,

        JSON.stringify(
            learnsets,
            null,
            2
        )
    );

    console.log("Learnsets generados.");

}

