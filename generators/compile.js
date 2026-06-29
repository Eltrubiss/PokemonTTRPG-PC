import fs from "fs/promises";

import { mergeObjects } from "../lib/merge.js";

export async function compileMoves() {

    console.log("\nCompilando movimientos...");

    const generated = JSON.parse(

        await fs.readFile(

            "./data/generated/moves.json",

            "utf8"

        )

    );

    const patch = JSON.parse(

        await fs.readFile(

            "./data/manual/moves.patch.json",

            "utf8"

        )

    );

    const resultado = [];

    for (const move of generated) {

        const cambios = patch[move.slug] ?? {};

        if (Object.keys(cambios).length > 0) {
            console.log(
                `Aplicando parche a ${move.slug}:`,
                cambios
            );
        }

        resultado.push(

            mergeObjects(

                move,

                cambios

            )

        );

    }

    await fs.mkdir(

        "./data/dist",

        {

            recursive:true

        }

    );

    await fs.writeFile(

        "./data/dist/moves.json",

        JSON.stringify(

            resultado,

            null,

            2

        )

    );

    console.log("✔ Movimientos compilados.");

}