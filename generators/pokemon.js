import fs from "fs/promises";

import {
    getPokemonList,
    getPokemon,
    getSpecies,
    getType,
    getAbility
} from "../lib/api.js";

export async function buildPokemon() {

    console.log("Descargando Pokémon...\n");

    const lista = await getPokemonList();

    const pokemon = [];

    for (const entry of lista.results) {

        console.log(entry.name);

        try {

            const poke = await getPokemon(entry.url);

            const species = await getSpecies(poke.species.url);

            // Nombre español

            const nombre =
                species.names.find(n => n.language.name === "es")?.name ??
                poke.name;

            // Tipos

            const tipos = [];

            for (const tipo of poke.types) {

                const typeData = await getType(tipo.type.url);

                tipos.push(
                    typeData.names.find(n => n.language.name === "es")?.name ??
                    tipo.type.name
                );

            }

            // Habilidades

            const habilidades = [];

            const habilidadOculta = [];

            for (const habilidad of poke.abilities) {

                const abilityData = await getAbility(habilidad.ability.url);

                const nombreHabilidad =
                    abilityData.names.find(n => n.language.name === "es")?.name ??
                    habilidad.ability.name;

                if (habilidad.is_hidden)
                    habilidadOculta.push(nombreHabilidad);
                else
                    habilidades.push(nombreHabilidad);

            }

            // Stats

            const stats = {};

            for (const stat of poke.stats) {

                switch (stat.stat.name) {

                    case "hp":
                        stats.hp = stat.base_stat;
                        break;

                    case "attack":
                        stats.atk = stat.base_stat;
                        break;

                    case "defense":
                        stats.def = stat.base_stat;
                        break;

                    case "special-attack":
                        stats.sp_atk = stat.base_stat;
                        break;

                    case "special-defense":
                        stats.sp_def = stat.base_stat;
                        break;

                    case "speed":
                        stats.speed = stat.base_stat;
                        break;

                }

            }

            pokemon.push({

                id: poke.id,

                slug: poke.name,

                nombre,

                tipo: tipos,

                habilidades,

                habilidad_oculta: habilidadOculta,

                stat_base: stats

            });

        }

        catch (err) {

            console.error(err.message);

        }

    }

    pokemon.sort((a, b) => a.id - b.id);

    await fs.mkdir("./data", { recursive: true });

    await fs.writeFile(
        "./data/pokemon.json",
        JSON.stringify(pokemon, null, 2),
        "utf8"
    );

    console.log(`\n✔ ${pokemon.length} Pokémon generados.`);

}