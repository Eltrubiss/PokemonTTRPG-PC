import fs from "fs/promises";
import { getBestVersion } from "../lib/learnsets/version.js";
import { buildSpeciesMap } from "../lib/pokemon/speciesMap.js";
import { getFormSlug } from "../lib/pokemon/forms.js";
import { buildInheritance } from "../lib/learnsets/inheritance.js";


export async function buildLearnsets(method, outputName = method) {
    console.log("Generando learnsets...");

    const speciesMap = await buildSpeciesMap();
    console.log(`Especies encontradas: ${speciesMap.size}`);
    const learnsets = [];
    const generados = new Set();

    for (const group of speciesMap.values()) {
        const base = group.base;

        console.log(
            `Generando ${group.slug}`
        );

        try{
      
        const moves = [];
        for (const move of base.moves) {
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
        const learnset = {

            slug: group.slug,

            forma: getFormSlug(
                group.slug,
                base.name
            ),

            moves: filtrados,

            formas: {}

        };

        for (const move of moves) {
            if (vistos.has(move.slug)) {
                continue;
            }
            vistos.add(move.slug);
            filtrados.push(move);
        }

        for (const form of group.forms) {
            if (form === base)
                continue;

            const formMoves = [];

            const diff = buildInheritance(
                filtrados,
                formMoves
            );
            const formSlug = getFormSlug(
                group.slug,
                form.name
            );

            learnset.formas[formSlug] = diff;
        }

        learnsets.push(learnset);
        generados.add(group.slug);
        }
        catch (err) {

            console.error(
                err.message
            );

        }



    }

    console.log("=== Comprobando ===");

    for (const group of speciesMap.values()) {
        if (!generados.has(group.slug)) {
            console.warn(
                `No se generó learnset para ${group.slug}`
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

    console.log(`Learnsets generados: ${learnsets.length}`);

}

