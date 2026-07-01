import fs from "fs/promises";
import { getBestVersion } from "../lib/learnsets/version.js";
import { buildSpeciesMap } from "../lib/pokemon/speciesMap.js";
import { getFormSlug } from "../lib/pokemon/forms.js";
import { compareLearnsets } from "../lib/learnsets/compareLearnsets.js";
import { extractMoves } from "../lib/learnsets/extractMoves.js";

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
      
        const filtrados = extractMoves(
            base,
            method
        );

        const learnset = {

            slug: group.slug,

            forma: getFormSlug(
                group.slug,
                base.name
            ),

            moves: filtrados,

            formas: {}

        };

        for (const form of group.forms) {
            if (form === base)
                continue;

            const formMoves = extractMoves(
                form,
                method
            );

            const formSlug = getFormSlug(
                group.slug,
                form.name
            );

            let diff;

            if (method === "level-up") {

                diff = compareLearnsets(
                    filtrados,
                    formMoves
                );

            } else {

                diff = {
                    moves: formMoves
                };
            }

            if (Object.keys(diff).length > 0) {
                learnset.formas[formSlug] = diff;
            } else {
                learnset.formas[formSlug] = {};
            }
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

