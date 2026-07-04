import fs from "/fs/promises";

import {
    getAbility,
    getAbilityList
} from "../lib/api.js";

import {
    getSpanishName
} from "../lib/translator.js";

export async function buildAbilities() {
    const list =
    await getAbilityList();
    const abilities = [];

    await fs.mkdir(
        "./data/generated",
        {
            recursive:true
        }
    );

    for (const [index, entry] of list.results.entries()) {

        console.log(
            `Habilidad ${index + 1}/${list.results.length}`
        );
        try {
            const ability =
                await getAbility(
                    entry.url
                );

            const nombre =
                getSpanishName(
                    ability.names,
                    ability.name
                );

            const descripcion =
                getSpanishName(
                    ability.effect_entries,
                    ""
                );

            abilities.push({
                id: ability.id,
                slug: ability.name,
                nombre,
                descripcion,
                efecto: "",
                tags: []
            });

        } catch (err) {
            console.log(
                err.message
            );
        }

    }
    abilities.sort(
        (a, b) => a.id - b.id
    );

    await fs.writeFile(
        "./data/generated/abilities.json",
        JSON.stringify(
            abilities,
            null,
            2
        )
    );

    console.log( "✔ abilities.json generado." );
}