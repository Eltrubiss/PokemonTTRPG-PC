import fs from "/fs/promises";
import { getMove, getMoveList, getType } from "../lib/api.js";
import { getSpanishName } from "../lib/translator.js";

const DAMAGE_CLASS = {
    physical: "Físico",
    special: "Especial",
    status: "Estado"
};

export async function buildMoves() {

    const list = await getMoveList();

    const moves = [];

    for (const [index, entry] of list.results.entries()) {

        console.log(`Movimiento ${index + 1}/${list.results.length}`);

        try {

            const move = await getMove(entry.url);

            const typeData = await getType(move.type.url);

            const type = getSpanishName(
                typeData.names,
                move.type.name
            );

            const name = getSpanishName(
                move.names,
                move.name
            );

            const effect = getSpanishName(
                move.effect_entries,
                move.effect
            );

            moves.push({

                id: move.id,

                slug: move.name,

                name,

                type,

                class: DAMAGE_CLASS[move.damage_class.name],

                power: move.power,

                pres: move.accuracy,

                effect: effect.replace(
                    "$effect_chance",
                    move.effect_chance ?? ""
                )

            });

        }

        catch (err) {

            console.log(err.message);

        }

    }

    await fs.mkdir("./data", { recursive: true });

    await fs.writeFile(
        "./data/generated/moves.json",
        JSON.stringify(moves, null, 2),
        "utf8"
    );

    console.log("✔ moves.json generado.");
}