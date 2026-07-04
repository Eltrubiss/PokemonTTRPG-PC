import fs from "/fs/promises";
import { mergeObjects } from "../lib/merge.js";

export async function compileAbilities() {

    console.log("\nCompilando habilidades...");

    const generated = JSON.parse(
        await fs.readFile(
            "./data/generated/abilities.json",
            "utf8"
        )
    );

    const patch = JSON.parse(
        await fs.readFile(
            "./data/manual/abilities.patch.json",
            "utf8"
        )
    );

    const resultado = [];

    for (const ability of generated) {
        const cambios = patch[ability.slug] ?? {};
        if (Object.keys(cambios).length > 0) {
            console.log(
                `Aplicando parche a ${ability.slug}:`,
                cambios

            );
        }

        resultado.push(
            mergeObjects(
                ability,
                cambios
            )
        );
    }

    await fs.mkdir(
        "./data/dist",
        {
            recursive: true
        }
    );

    await fs.writeFile(
        "./data/dist/abilities.json",
        JSON.stringify(
            resultado,
            null,
            2
        )
    );

    console.log("✔ Habilidades compiladas.");

}